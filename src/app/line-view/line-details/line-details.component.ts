import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineViewService } from './../line-view.service';

@Component({
  selector: 'app-line-details',
  templateUrl: './line-details.component.html',
  styleUrls: ['./line-details.component.scss']
})
export class LineDetailsComponent implements OnInit {
  lineDetails;
  @Input() shift;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private lineViewService: LineViewService
  ) { }

  ngOnInit(): void {
    const routes = this.router.url.split('/');
    // const routeURL = this.router.url.replace('/'+ routes[routes.length-1], '')
    const routeURL = this.router.url

    this.lineViewService.lineQuery = routeURL;
    console.log(routes[routes.length-1])
    this.activatedRoute.params.subscribe(lineDetails => {
      this.lineDetails = lineDetails

      this.lineViewService.line = lineDetails.line;
      this.lineViewService.getData()
    })
  }

}
