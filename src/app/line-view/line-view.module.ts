import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineViewRoutingModule } from './line-view-routing.module';
import { LineViewComponent } from './line-view.component';
import { LineDetailsComponent } from './line-details/line-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LineViewComponent, LineDetailsComponent],
  imports: [
  CommonModule,
    LineViewRoutingModule,
    SharedModule,
  ],
})
export class LineViewModule { }
