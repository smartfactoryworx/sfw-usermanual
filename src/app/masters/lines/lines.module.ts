import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LinesComponent } from './lines.component';


@NgModule({
  declarations: [LinesComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class LinesModule { }
