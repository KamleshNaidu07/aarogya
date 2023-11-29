import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'aarogya';
  @ViewChild('sidenav') sidenav!: MatSidenav;
  constructor(public authService: AuthService) {}
  ngOnInit() {}

  notifications = [
    {
      title: 'New Message',
      message: 'You have a new message from John.',
    },
    {
      title: 'Reminder',
      message: "Don't forget your appointment at 2 PM.",
    },
    {
      title: 'Update Available',
      message: 'A new version of the app is available.',
    },
  ];

  toggleSidenav() {
    this.sidenav.toggle();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticatedReturn();
  }

  logout(): void {
    this.authService.logout();
  }
}
