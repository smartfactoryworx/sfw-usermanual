import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LineViewService } from './line-view/line-view.service';

@Injectable({
  providedIn: 'root'
})
export class ManualEntryService {
  path;
  public lineId;
  constructor(private httpClient: HttpClient, private lineViewService: LineViewService, private router: Router,) {
    this.path = this.getLineId();
    this.lineId = this.lineViewService.path2LineID(this.path);
    console.log(this.lineId, 'ghostly')

  }

  getLineId() {
    let exactLineRoute = '';
    const lineRoute = this.router.url.split('/');
    // console.log(lineRoute, lineRoute.length, "Novo")
    for (let i = 1; i < 6; i++) {
      exactLineRoute += '/' + lineRoute[i]

    }
    console.log(exactLineRoute, 'ghostly');
    return exactLineRoute;
  }

  // GetServerAPIPath(): Observable<object> {
  //   return this.httpClient.get('configs/apix/api_server.json');
  // }

    GetUserManualData(): Observable<object> {
      return this.httpClient.get('configs/apix/user-manual.json');
    }
    GetReleaseNotesData(): Observable<object> {
      return this.httpClient.get('configs/apix/release_notes.json');
    }
    
}
