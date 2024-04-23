import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDoctorComponent } from './view-doctor/view-doctor.component';

import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AddDoctorDialogComponent } from './add-doctor-dialog/add-doctor-dialog.component';

@NgModule({
  declarations: [
    ViewDoctorComponent,
    AddDoctorDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    
  ]
})
export class DoctorModule { }
