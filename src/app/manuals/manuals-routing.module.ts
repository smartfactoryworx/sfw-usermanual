import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManualsComponent } from './manuals.component';
import { ReleaseNotesComponent } from './release-notes/release-notes.component';
import { UserManualComponent } from './user-manual/user-manual.component';

const routes: Routes = [
  {
    path: '',
    component: ManualsComponent,
    children: [
      {
        path: '',
        redirectTo: 'user-manual',
        pathMatch: 'full'
      },
      {
        path: 'user-manual',
        component: UserManualComponent ,
        pathMatch: 'full'
      },
      {
        path: 'release-notes',
        component: ReleaseNotesComponent ,
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManualsRoutingModule { }
