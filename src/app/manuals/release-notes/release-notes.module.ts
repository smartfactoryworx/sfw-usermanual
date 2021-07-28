import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReleaseNotesComponent } from './release-notes.component';



@NgModule({
  declarations: [ReleaseNotesComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ReleaseNotesModule { }
