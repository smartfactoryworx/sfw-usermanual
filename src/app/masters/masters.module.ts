import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersRoutingModule } from './masters-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FgexModule } from './fgex/fgex.module';
import { MastersComponent } from './masters.component';
import { FaultcauseformModule } from './faultcauseform/faultcauseform.module';
import { FaultnameModule } from './faultname/faultname.module';
import { OperatorentryModule } from './operatorentry/operatorentry.module';
import { PoDetailsModule } from './po-details/po-details.module';
import { OperatorAssignmentModule } from './operator-assignment/operator-assignment.module';
import { EquipmentModule } from './equipment/equipment.module';
import { ShiftPdtBreaksModule } from './shift-pdt-breaks/shift-pdt-breaks.module';
import { LinesModule } from './lines/lines.module';

@NgModule({
  declarations: [MastersComponent],
  imports: [
    CommonModule,
    MastersRoutingModule,
    SharedModule,
    FgexModule,
    FaultcauseformModule,
    FaultnameModule,
    OperatorentryModule,
    PoDetailsModule,
    OperatorAssignmentModule,
    EquipmentModule,
    ShiftPdtBreaksModule,
    LinesModule
  ]
})
export class MastersModule { }
