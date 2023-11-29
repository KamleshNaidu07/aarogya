import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPatientComponent } from './view-patient/view-patient.component';

import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';

@NgModule({
  declarations: [
    ViewPatientComponent,
    AddUserDialogComponent,
    EditUserDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AddUserDialogComponent, // Export the component
  ]
})
export class PatientModule { }
