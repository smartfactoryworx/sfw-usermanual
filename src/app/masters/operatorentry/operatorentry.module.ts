import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperatorentryComponent } from './operatorentry.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OperatordailogentryComponent } from './operatordailogentry/operatordailogentry.component';



@NgModule({
  declarations: [OperatorentryComponent,OperatordailogentryComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class OperatorentryModule { }
