import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LineViewService } from './line-view.service';
import { catchError, finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class LineHandlingInterceptor implements HttpInterceptor {
  constructor(
    private lineViewService: LineViewService,
    private router: Router,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // const httpRequest = new HttpRequest(<any>request.method, request.url +  '/' + this.lineViewService.line);
    // request = Object.assign(request, httpRequest)
    let exactLineRoute = '';
    const lineRoute = this.router.url.split('/');
    // console.log(lineRoute, lineRoute.length, "Novo")
    for (let i = 1; i < 6; i++) {
      exactLineRoute += '/' + lineRoute[i]

    }
    console.log(exactLineRoute,'Final')
    
    const lineHandellingRoute = !request.url.includes('line_id') ? request.url.includes('?')? request.url + '&' + 'line_id=' + this.lineViewService.path2LineID(exactLineRoute): request.url + '?' + 'line_id=' + this.lineViewService.path2LineID(exactLineRoute) : request.url;

    const req = request.clone({
      url: lineHandellingRoute  ,
    });
    return next.handle(req).pipe(
      finalize(() => {
        console.log(req.url, 'finalize');
      }),
      catchError((err) => {
        console.log('catch error');
        return throwError(err);
      })
    );
  }
}
