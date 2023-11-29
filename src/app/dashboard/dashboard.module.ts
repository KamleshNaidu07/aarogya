import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary/summary.component';
import { ChartsComponent } from './charts/charts.component';

import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    SummaryComponent,
    ChartsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class DashboardModule { }
