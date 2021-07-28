import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { MaterialModules } from './material-modules';
import { NgPipesModule } from 'ngx-pipes';
import { RandomcolorModule } from 'angular-randomcolor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from 'ngx-perfect-scrollbar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TourMatMenuModule } from 'ngx-tour-md-menu';
import { ToastrModule } from 'ngx-toastr';

// import { D3ChartService } from "./core/nvD3/nvD3.service";

import { environment } from '../../environments/environment';
import { LineHandlingInterceptor } from '../line-view/line-handling.interceptor';
import { WebDataRocksPivot } from "./webdatarocks/webdatarocks.angular4";
import { GoogleChartsModule } from 'angular-google-charts';
import {TabModule} from 'angular-tabs-component';
import { SpecialCharacterDirective } from './special-character.directive';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [ WebDataRocksPivot, SpecialCharacterDirective],
  imports: [
    CommonModule,
    MaterialModules,
    FlexLayoutModule,
    HttpClientModule,
    LoggerModule.forRoot({
      // serverLoggingUrl: '/api/logs',
      level: !environment.production ? NgxLoggerLevel.INFO : NgxLoggerLevel.OFF,
      serverLogLevel: NgxLoggerLevel.ERROR,
    }),
    NgPipesModule,
    RandomcolorModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    // PagesModule,
    TourMatMenuModule.forRoot(),
    PerfectScrollbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ToastrModule.forRoot(),
    GoogleChartsModule.forRoot(),
    TabModule,
    

  ],
  exports: [
    MaterialModules,
    FlexLayoutModule,
    HttpClientModule,
    LoggerModule,
    NgPipesModule,
    RandomcolorModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    TourMatMenuModule,
    PerfectScrollbarModule,
    TranslateModule,
    ToastrModule,
    WebDataRocksPivot,
    TabModule,
    SpecialCharacterDirective
    // WidgetComponentModule,
  ],
  providers: [
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: HTTP_INTERCEPTORS, useClass: LineHandlingInterceptor, multi: true },
  ],

})

export class SharedModule {}