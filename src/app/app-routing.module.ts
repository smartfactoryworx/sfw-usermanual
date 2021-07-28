import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./line-view/line-view.module').then((m) => m.LineViewModule),
    data: { breadcrumb: 'Line-View' },
  },
  // {
  //   path: 'masters',
  //   loadChildren: () =>
  //     import('./masters/masters.module').then((m) => m.MastersModule),
  //   data: { breadcrumb: 'Masters' },
  // },
 
  // {
  //   path: 'supervisor',
  //   loadChildren: () =>
  //     import('./supervisor/supervisor.module').then((m) => m.SupervisorModule),
  //   data: { breadcrumb: 'supervisor' },
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
