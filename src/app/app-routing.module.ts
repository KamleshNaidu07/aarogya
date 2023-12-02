import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewPatientComponent } from './patient/view-patient/view-patient.component';
import { ViewDoctorComponent } from './doctor/view-doctor/view-doctor.component';
import { SummaryComponent } from './dashboard/summary/summary.component';
import { LoginComponent } from './authenticate/login/login.component';

import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: SummaryComponent, canActivate: [AuthGuard] },
  { path: 'patient', component: ViewPatientComponent, canActivate: [AuthGuard] },
  { path: 'doctor', component: ViewDoctorComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
