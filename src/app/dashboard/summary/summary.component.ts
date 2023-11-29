import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent {
  patientsCount = 0; // Dummy data for patients
  doctorsCount = 20; // Dummy data for doctors
  appointmentsCount = 50; // Dummy data for appointments

  constructor(private http: HttpClient){}

  ngOnInit() {
    this.fetchTotalPatientsCount('patient');
  }

  fetchTotalPatientsCount(userType: String) {
    if(userType == 'patient'){

    }else if(userType == 'doctor'){

    }else if(userType == 'appointment'){

    }
    const apiUrl = 'http://localhost:3000/api/patients'; // Change the API endpoint as needed
    
    this.http.get<{ data: any }>(apiUrl).subscribe(
      (response) => {
        this.patientsCount = response.data.length;
      },
      (error) => {
        console.error('Error fetching total patients count:', error);
      }
    );
  }


}
