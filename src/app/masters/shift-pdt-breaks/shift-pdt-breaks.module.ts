import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShiftPdtBreaksComponent } from './shift-pdt-breaks.component';



@NgModule({
  declarations: [ShiftPdtBreaksComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ShiftPdtBreaksModule { }
