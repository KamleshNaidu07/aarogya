import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

import * as moment from 'moment';

import { MatDialog } from '@angular/material/dialog';
import { AddDoctorDialogComponent } from '../add-doctor-dialog/add-doctor-dialog.component';

export interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.css']
})
export class ViewDoctorComponent {

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit() {
    this.fetchDoctors(); // Call the method to fetch users on component initialization
    this.fetchTotalDoctorsCount();
  }

  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];
  searchTerm: string = '';
  // for pagination
  pageIndex = 0;
  pageSize = 5; // Set the initial page size
  pageSizeOptions: number[] = [5, 10, 25, 30]; // Options for the page size dropdown
  totalDoctors = 0;

  fetchDoctors() {
    const apiUrl = 'http://localhost:3000/api/doctors';
    const queryParams = `?page=${this.pageIndex + 1}&limit=${this.pageSize}&searchTerm=${this.searchTerm}`;

    this.http.get<{ data: Doctor[], totalCount: number }>(apiUrl + queryParams).subscribe(
      (response) => {
        if (response.data.length > 0) {
          this.doctors = response.data;
          this.totalDoctors = response.totalCount;
          this.applyFilter();
        } else {
          this.doctors = []; // Clear the users array if no data
          this.applyFilter(); // Remove this line if we want to put the last searched data but not matching current searched data
          this.totalDoctors = 0; // Reset the total user count
        }
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }

  fetchTotalDoctorsCount() {
    const apiUrl = 'http://localhost:3000/api/doctors'; // Change the API endpoint as needed
    const queryParams = `?searchTerm=${this.searchTerm}`;

    this.http.get<{ data: Doctor[] }>(apiUrl + queryParams).subscribe(
      (response) => {
        this.totalDoctors = response.data.length;
      },
      (error) => {
        console.error('Error fetching total patients count:', error);
      }
    );
  }

  applyFilter() {
    this.filteredDoctors = this.doctors.filter(
      (doctor) =>
        doctor.first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doctor.last_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doctor.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doctor.phone_number.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doctor.first_name.toLowerCase() + " " + doctor.last_name.toLowerCase().includes(this.searchTerm.toLowerCase()) // For full name filter case
    );
  }

  async onFilterChange() {
    this.pageIndex = 0; // Reset to the first page when filtering
    this.fetchDoctors(); // Call the fetchUsers function with the updated search term
    this.fetchTotalDoctorsCount(); // Fetch the total users count
  }

  clearFilter() {
    this.searchTerm = ''; // Clear the filter
    this.onFilterChange(); // Call the filter change function
  }

  sortData(event: any) {
    // Implement sorting logic based on event
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchDoctors();
    this.fetchTotalDoctorsCount();
  }

  addDoctor(): void {
    const dialogRef = this.dialog.open(AddDoctorDialogComponent, {
      width: '400px', // You can adjust the width as needed
    });
    dialogRef.afterClosed().subscribe(result => {
      // This function will be called when the dialog is closed

      if (result === true) {
        this.fetchDoctors();
        this.fetchTotalDoctorsCount();
      }
    });
  }

}
