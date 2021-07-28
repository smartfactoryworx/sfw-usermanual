import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentComponent } from './equipment/equipment.component';
import { FaultcauseformComponent } from './faultcauseform/faultcauseform.component';
import { FaultnameComponent } from './faultname/faultname.component';
import { FgexComponent } from './fgex/fgex.component';
import { LinesComponent } from './lines/lines.component';
import { MastersComponent } from './masters.component';
import { OperatorAssignmentComponent } from './operator-assignment/operator-assignment.component';
//import { OperatorAssignmentComponent } from './operator-assignment/operator-assignment.component';
import { OperatorentryComponent } from './operatorentry/operatorentry.component';
import { PoDetailsComponent } from './po-details/po-details.component';
import { ShiftPdtBreaksComponent } from './shift-pdt-breaks/shift-pdt-breaks.component';

const routes: Routes =  [
  
  {
    path: '',
    component: MastersComponent,
    children: [
      {
        path: '',
        redirectTo: 'fgex',
        pathMatch: 'full'
      },
      {
        path: 'fgex',
        component: FgexComponent ,
        pathMatch: 'full'
      },
      {
        path: 'otherstatedefinition',
        component: FaultcauseformComponent ,
        pathMatch: 'full'
      },
      {
        path: 'faultcause',
        component: FaultnameComponent ,
        pathMatch: 'full'
      },
      {
        path: 'operator',
        component: OperatorentryComponent ,
        pathMatch: 'full'
      },
      {
        path: 'addpodetails',
        component: PoDetailsComponent ,
        pathMatch: 'full'
      },
      {
        path: 'operatorassignment',
        component: OperatorAssignmentComponent ,
        pathMatch: 'full'
      },
      {
        path: 'equipment',
        component: EquipmentComponent ,
        pathMatch: 'full'
      },
      {
        path: 'shiftpdtbreaks',
        component: ShiftPdtBreaksComponent ,
        pathMatch: 'full'
      },
      {
        path: 'lines',
        component: LinesComponent ,
        pathMatch: 'full'
      }
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
