import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router service
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'; // Importing swal for notifications

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup; // Declare a FormGroup for your form

  formData = { username: '', password: '' };

  errorMessages = {
    username: [{ type: 'required', message: 'Username is required.' }],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minLength', message: 'Insert atleast 5 characters.' },
    ],
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    // Initialize the form using FormBuilder
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
    if (this.authService.isAuthenticatedReturn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.authenticateUser(username, password).subscribe(
        (response) => {
          if (response.error) {
            Swal.fire({
              icon: 'error',
              title: 'Incorrect Password',
              text: 'The password you entered is incorrect. Please try again.',
            });
          } else {
            this.authService.setAuthenticated(true);
            this.router.navigate(['/dashboard']);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
