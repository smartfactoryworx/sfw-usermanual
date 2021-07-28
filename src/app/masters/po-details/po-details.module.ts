import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PoDetailsComponent } from './po-details.component';
import { PoDetailsDialogComponent } from './po-details-dialog/po-details-dialog.component';



@NgModule({
  declarations: [PoDetailsComponent,PoDetailsDialogComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PoDetailsModule { }
