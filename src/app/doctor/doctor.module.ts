import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDoctorComponent } from './view-doctor/view-doctor.component';

import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ViewDoctorComponent
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
