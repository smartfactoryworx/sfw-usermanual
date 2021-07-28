import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FaultcauseformComponent } from './faultcauseform.component';



@NgModule({
  declarations: [FaultcauseformComponent],
  imports: [
    CommonModule,SharedModule
  ]
})
export class FaultcauseformModule { }
