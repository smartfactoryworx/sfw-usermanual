import { Injectable, NgModule, OnInit } from '@angular/core';
import { Observable, Observer, BehaviorSubject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, Event, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root',
})
export class LineViewService {
  line: string;
  //lineQuery = 'line_id=5f0809fdc2b1ce30cc53eb8d';
  //lineQuery = 'line_id=6076d65c4b1bc322740e238e';
  lineQuery = 'line_id=607d03a32b6c0b48e4ece014';
  
  lines: any = {};
  dataLoaded= false;

  constructor(
    public httpClient: HttpClient,
    public router: Router,
    public route: ActivatedRoute,
    private readonly logger: NGXLogger,
    private toastr: ToastrService,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.logger.info(event);
      }
    });
  }

  getLinesData() {
    console.log('lines called')
    this.httpClient.get('/api/manual/company').subscribe((data: any) => {
      console.log('lines called')

      // this.lines[]
      let fullpathRoutes = ''
      data.forEach((company: any) => {
        // const route1 = fullpathRoutes + '/' + company.company_code.toLowerCase()
        const route1 = fullpathRoutes;

        company.countries.forEach((country: any) => {
          const route2 = route1 + '/' + country.country_code.toLowerCase()

          country.states.forEach((state: any) => {
            const route3 = route2 + '/' + state.state_code.toLowerCase()

            state.locations.forEach((location: any) => {
              const route4 = route3 + '/' + location.location_code.toLowerCase()

              location.plants.forEach((plant: any) => {
                const route5 = route4 + '/' + plant.plant_code.toLowerCase()
                plant.lines.forEach((line: any) => {
                  const route = route5 + '/' + line.line_code.toLowerCase()
                  this.lines[route] = line._id;
                  // console.log(this.lines[route], 'Final')
                });
              });
            });
          });
        });
      });
      this.dataLoaded = true;


    }, err => {
      console.log(err, 'lines not loaded')
    })
  }

  getData () {
    this.httpClient.get('https://abc.smartfactoryworx.tech/v1/api').subscribe(d => {
      console.log(d);
    })
  }


  path2LineID(path) {
    // console.log(path,'final')
    console.log(this.lines, this.lines[path],'Final')
    if(this.lines && this.lines[path]) {
      // console.log(this.lines,"path2LineID");
      return this.lines[path];
     
    } else {
      //return '5f0809fdc2b1ce30cc53eb8d';
      //return '6076d65c4b1bc322740e238e';
      return '607d03a32b6c0b48e4ece014';
    }
  }
}
