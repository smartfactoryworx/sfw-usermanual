import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LineViewComponent } from './line-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'in/gj/osd1/h02/line11',
    pathMatch: 'full'
  },
  {
    path: ':country/:location/:category/:hall/:line',
    component: LineViewComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../masters/masters.module').then((m) => m.MastersModule),
        data: { breadcrumb: 'Masters' },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LineViewRoutingModule { }
