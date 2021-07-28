import { ToastrService } from 'ngx-toastr';
import { Observable, Observer, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import {
  NgxNotificationDirection,
  NgxNotificationMsgService,
  NgxNotificationStatusMsg,
} from 'ngx-notification-msg';
import * as socketIO from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public socket = socketIO('abc.smartfactoryworx.tech/socket/notification', {});
  notifications = [];
  notificationsObserver: Observer<any> = new BehaviorSubject([]);
  notificationObserver: Observer<any> = new BehaviorSubject(null);

  constructor(
    private readonly notificationService: NgxNotificationMsgService,
    private readonly logger: NGXLogger,
    private readonly toastrService: ToastrService
  ) {
    this.socket.on('connect', () => {
      this.logger.info('notofication connected');
      this.toastrService.success('successfully Conncted with Server', 'INTAS')
    });

    this.socket.on('disconnect', () => {
      this.logger.info('connection disconnected');
    });

    this.socket.on('auth', (notification: any) => {
      notification.type = 'auth';
      this.toastrService.success(notification.message, notification.title)
      this.notificationObserver.next(notification);
      this.logger.info(notification);
    });

    this.socket.on('dashboard', (notification: any) => {
      notification.type = 'dashboard';
      this.toastrService.success(notification.message, notification.title)
      this.notificationObserver.next(notification);
      this.logger.info(notification);
    });

    this.socket.on('general', (notification: any) => {
      notification.type = 'general';
      console.log(notification, 'generalmsg');
      this.notificationObserver.next(notification);

      this.notificationService.open({
        status: NgxNotificationStatusMsg.FAILURE,
        direction: NgxNotificationDirection.TOP_RIGHT,
        header: 'info',
        delay: 100000,
        messages: [notification],
      });

      this.toastrService.success(notification.message, notification.title)
      this.logger.info(notification);
    });

    this.socket.on('all', (notifications: any) => {
      this.notifications = notifications;
      this.notificationsObserver.next(this.notifications);
      this.logger.info(notifications);
    });
  }

  getNotifications(): Observable<any> {
    this.notificationsObserver.next(this.notifications);

    return new Observable((observer) => {
      this.notificationsObserver = observer;
    });
  }

  getNotification(): Observable<any> {
    return new Observable((observer) => {
      this.notificationObserver = observer;
    });
  }
}
