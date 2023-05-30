import { Injectable } from '@angular/core';
import { Client, Message, over, Subscription } from 'stompjs';
import { BehaviorSubject, filter, Observable, switchMap } from 'rxjs';
import { SocketClientState } from '../model/socket-client-state.enum';
import { environment } from '../../../environments/environment';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private client: Client;
  private state: BehaviorSubject<SocketClientState>;

  constructor() {
    this.client = over(new SockJS(environment.api));
    this.state = new BehaviorSubject<SocketClientState>(
      SocketClientState.ATTEMPTING
    );
    this.client.connect({}, () => {
      this.state.next(SocketClientState.CONNECTED);
    });
    this.client.debug = () => {};
  }

  connect(): Observable<Client> {
    return new Observable<Client>((observer) => {
      this.state
        .pipe(filter((state) => state === SocketClientState.CONNECTED))
        .subscribe(() => {
          observer.next(this.client);
        });
    });
  }

  onMessage(
    topic: string,
    handler = WebsocketService.jsonHandler
  ): Observable<any> {
    return this.connect().pipe(
      switchMap((inst) => {
        return new Observable<any>((observer) => {
          const subscription: Subscription = inst.subscribe(
            topic,
            (message) => {
              observer.next(handler(message));
            }
          );
          return () => inst.unsubscribe(subscription.id);
        });
      })
    );
  }

  static jsonHandler(message: Message): any {
    return JSON.parse(message.body);
  }
}
