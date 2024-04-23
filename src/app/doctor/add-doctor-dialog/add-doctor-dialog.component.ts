import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

interface Doctor {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  specialization: string;
}

@Component({
  selector: 'app-add-doctor-dialog',
  templateUrl: './add-doctor-dialog.component.html',
  styleUrls: ['./add-doctor-dialog.component.css']
})
export class AddDoctorDialogComponent {
  doctorForm: FormGroup;
  specializationForm?: string;

  errorMessages = {
    first_name: [
      { type: 'required', message: 'First Name is required.' },
    ],
    last_name: [
      { type: 'required', message: 'Last Name is required.' },
    ],
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
    public dialogRef: MatDialogRef<AddDoctorDialogComponent>,
    private formBuilder: FormBuilder,
  ) {
    this.doctorForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      specialization: '',
    });
  }

  submitAddForm() {
    if (this.doctorForm.invalid) {
      return;
    }
    // Assuming your API endpoint is '/api/patients'
    const apiUrl = 'http://localhost:3000/api/doctors';

    this.http.post(apiUrl, this.doctorForm.value).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Doctor Added',
          text: 'The doctor has been added successfully!',
          confirmButtonText: 'OK',
        }).then(() => {
          this.dialogRef.close(true); // Close the dialog and signal success
        });
      },
      (error) => {
        console.error('Error adding user:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while adding the doctor.',
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
