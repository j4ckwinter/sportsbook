import { TestBed } from '@angular/core/testing';
import { EventsService } from './events.service';
import { WebsocketService } from './websocket.service';
import { Observable } from 'rxjs';
import { BaseEvent, Event, MarketEvent } from '../model/event.model';

describe('EventsService', () => {
  let eventsService: EventsService;
  let websocketService: jasmine.SpyObj<WebsocketService>;

  beforeEach(() => {
    const websocketSpy = jasmine.createSpyObj('WebsocketService', [
      'onMessage',
    ]);
    TestBed.configureTestingModule({
      providers: [
        EventsService,
        { provide: WebsocketService, useValue: websocketSpy },
      ],
    });
    eventsService = TestBed.inject(EventsService);
    websocketService = TestBed.inject(
      WebsocketService
    ) as jasmine.SpyObj<WebsocketService>;
  });

  it('should be created', () => {
    expect(eventsService).toBeTruthy();
  });

  describe('findAllEventIds', () => {
    it('should call onMessage with the correct topic', () => {
      // Given
      const expectedTopic = '/topic/inplay';
      const mockBaseEvent = new Observable<BaseEvent[]>();
      websocketService.onMessage.and.returnValue(mockBaseEvent);

      // When
      const result = eventsService.findAllEventIds();

      // Then
      expect(result).toBe(mockBaseEvent);
      expect(websocketService.onMessage).toHaveBeenCalledWith(expectedTopic);
    });
  });

  describe('findEventDetails', () => {
    it('should call onMessage with the correct topic', () => {
      // Given
      const id = 123;
      const expectedTopic = `/topic/event/${id}`;
      const mockEvent = new Observable<Event>();
      websocketService.onMessage.and.returnValue(mockEvent);

      // When
      const result = eventsService.findEventDetails(id);

      // Then
      expect(result).toBe(mockEvent);
      expect(websocketService.onMessage).toHaveBeenCalledWith(expectedTopic);
    });
  });

  describe('findMarketDetails', () => {
    it('should call onMessage with the correct topic', () => {
      // Given
      const id = 456;
      const expectedTopic = `/topic/market/${id}`;
      const mockMarketEvent = new Observable<MarketEvent>();
      websocketService.onMessage.and.returnValue(mockMarketEvent);

      // When
      const result = eventsService.findMarketDetails(id);

      // Then
      expect(result).toBe(mockMarketEvent);
      expect(websocketService.onMessage).toHaveBeenCalledWith(expectedTopic);
    });
  });
});
