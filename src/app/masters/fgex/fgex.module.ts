import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FgexComponent } from './fgex.component';
import { FgexdailogComponent } from './fgexdailog/fgexdailog.component';



@NgModule({
  declarations: [FgexComponent,FgexdailogComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class FgexModule { }
