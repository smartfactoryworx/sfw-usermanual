import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserManualComponent } from './user-manual.component';



@NgModule({
  declarations: [UserManualComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UserManualModule { }
