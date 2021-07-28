import { Injectable } from '@angular/core';
import {
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouteConfigLoadEnd,
  Router,
} from '@angular/router';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root',
})
export class UserActivityService {
  logoutTimer;
  constructor(private router: Router, private readonly logger: NGXLogger) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        this.logger.info(event);
      }

      if (event instanceof NavigationError) {
        this.logger.error(event);
      }

      if (event instanceof RouteConfigLoadEnd) {
      }
    });
  }
}
