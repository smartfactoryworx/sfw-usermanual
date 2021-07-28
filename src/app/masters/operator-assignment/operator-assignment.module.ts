import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { OperatorAssignmentComponent } from './operator-assignment.component';



@NgModule({
  declarations: [OperatorAssignmentComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class OperatorAssignmentModule { }
