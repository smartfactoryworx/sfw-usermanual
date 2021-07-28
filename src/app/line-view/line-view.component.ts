import { Component, OnInit } from '@angular/core';
import { LineViewService } from './line-view.service';

@Component({
  selector: 'app-line-view',
  templateUrl: './line-view.component.html',
  styleUrls: ['./line-view.component.scss']
})
export class LineViewComponent implements OnInit {

  constructor(
    public lineViewService: LineViewService
  ) {
    lineViewService.getLinesData();
  }

  ngOnInit(): void {
  }

}
