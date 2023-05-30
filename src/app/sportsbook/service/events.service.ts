import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable } from 'rxjs';
import { BaseEvent, Event, MarketEvent } from '../model/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private websocketService: WebsocketService) {}

  findAllEventIds(): Observable<BaseEvent[]> {
    return this.websocketService.onMessage('/topic/inplay');
  }

  findEventDetails(id: number): Observable<Event> {
    return this.websocketService.onMessage(`/topic/event/${id}`);
  }

  findMarketDetails(id: number): Observable<MarketEvent> {
    return this.websocketService.onMessage(`/topic/market/${id}`);
  }
}
