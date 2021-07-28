import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { EquipmentComponent } from './equipment.component';


@NgModule({
  declarations: [EquipmentComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EquipmentModule { }
