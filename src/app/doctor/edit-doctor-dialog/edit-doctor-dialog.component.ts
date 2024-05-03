import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  specialization: string;
}

@Component({
  selector: 'app-edit-doctor-dialog',
  templateUrl: './edit-doctor-dialog.component.html',
  styleUrls: ['./edit-doctor-dialog.component.css'],
})
export class EditDoctorDialogComponent implements OnInit {
  doctorForm!: FormGroup;

  errorMessages = {
    first_name: [{ type: 'required', message: 'First Name is required.' }],
    last_name: [{ type: 'required', message: 'Last Name is required.' }],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Invalid email format.' },
    ],
    phone_number: [
      { type: 'required', message: 'Phone Number is required.' },
      { type: 'pattern', message: 'Invalid phone number format.' },
    ],
  };

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<EditDoctorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public doctorData: Doctor,
    private formBuilder: FormBuilder
  ) {
    this.doctorForm = this.formBuilder.group({
      first_name: [doctorData.first_name, Validators.required],
      last_name: [doctorData.last_name, Validators.required],
      email: [doctorData.email, [Validators.required, Validators.email]],
      phone_number: [
        doctorData.phone_number,
        [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)],
      ],
      specialization: [doctorData.specialization],
    });
  }

  ngOnInit(): void {}

  submitEditForm() {
    // Assuming your API endpoint is '/api/patients/:id'
    const apiUrl = `http://localhost:3000/api/doctors/${this.doctorData.id}`;

    const updatedDoctorData = this.doctorForm.value; // Get the form data

    this.http.put(apiUrl, updatedDoctorData).subscribe(
      (response) => {
        // console.log('User updated successfully:', response);
        Swal.fire({
          icon: 'success',
          title: 'Doctor Updated',
          text: 'The doctor has been updated successfully!',
          confirmButtonText: 'OK',
        }).then(() => {
          this.dialogRef.close(true); // Close the dialog and signal success
        });
      },
      (error) => {
        console.error('Error updating doctor:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating the doctor.',
          confirmButtonText: 'OK',
        });
        // Handle error and show appropriate message
      }
    );
  }

  onCancelClick(): void {
    this.dialogRef.close(); // Close the dialog without saving
  }
}
