import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FaultnameComponent } from './faultname.component';



@NgModule({
  declarations: [FaultnameComponent],
  imports: [
    CommonModule,SharedModule
  ]
})
export class FaultnameModule { }
