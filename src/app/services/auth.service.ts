import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router service
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private previousUrl: string = ''; // Initialize previousUrl

  constructor(private router: Router, private http: HttpClient) {
    // Check if there's a stored authentication state in local storage on service initialization
    // const storedAuth = localStorage.getItem('isAuthenticated');
    // if (storedAuth) {
    //   this.isAuthenticated = JSON.parse(storedAuth); // Parse the stored value to a boolean
    // }
  }

  isAuthenticatedReturn(): boolean {
    return this.isAuthenticated;
  }

  setAuthenticated(status: boolean): void {
    this.isAuthenticated = status;
  }

  // Set the previous URL
  setPreviousUrl(url: string): void {
    this.previousUrl = url;
  }

  // Get the previous URL
  getPreviousUrl(): string {
    return this.previousUrl;
  }

  logout(): void {
    this.isAuthenticated = false;

    // Remove the stored authentication state from local storage
    // localStorage.removeItem('isAuthenticated');

    this.router.navigate(['/login']);
  }

  authenticateUser(username:string, password:string): Observable<any>
  {
    const apiUrl = 'http://localhost:3000/api/users/login';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let payload = {
      username: username,
      password: password
    }

    return this.http.post<any>(apiUrl, payload, {headers});
  }

  setLocal():void
  {
    localStorage.setItem(
      'isAuthenticated',
      JSON.stringify(this.isAuthenticated)
    );
  }
}
