import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManualsRoutingModule } from './manuals-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ManualsComponent } from './manuals.component';
import { UserManualModule } from './user-manual/user-manual.module';
import { ReleaseNotesModule } from './release-notes/release-notes.module';


@NgModule({
  declarations: [ManualsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ManualsRoutingModule,
    UserManualModule,
    ReleaseNotesModule
  ]
})
export class ManualsModule { }
