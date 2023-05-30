import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsListComponent } from './events-list.component';
import { EventsService } from '../service/events.service';
import { BaseEvent, Event, MarketEvent } from '../model/event.model';
import { of } from 'rxjs';
import { MockModule } from 'ng-mocks';
import { MatTableModule } from '@angular/material/table';

describe('EventsListComponent', () => {
  let component: EventsListComponent;
  let fixture: ComponentFixture<EventsListComponent>;
  let eventsService: jasmine.SpyObj<EventsService>;

  beforeEach(() => {
    const eventsServiceSpy = jasmine.createSpyObj('EventsService', [
      'findAllEventIds',
      'findEventDetails',
      'findMarketDetails',
    ]);

    TestBed.configureTestingModule({
      declarations: [EventsListComponent],
      imports: [MockModule(MatTableModule)],
      providers: [{ provide: EventsService, useValue: eventsServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsListComponent);
    component = fixture.componentInstance;
    eventsService = TestBed.inject(
      EventsService
    ) as jasmine.SpyObj<EventsService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update events when initialized', () => {
    // Given
    const baseEvent: BaseEvent = { id: 1 };
    const event: Event = { id: 1, marketId: 2 } as Event;
    const marketEvent: MarketEvent = {
      id: 2,
      home: 'Home',
      away: 'Away',
      draw: 'Draw',
    } as MarketEvent;

    eventsService.findAllEventIds.and.returnValue(of([baseEvent]));
    eventsService.findEventDetails.and.returnValue(of(event));
    eventsService.findMarketDetails.and.returnValue(of(marketEvent));

    // When
    component.ngOnInit();

    // Then
    expect(eventsService.findAllEventIds).toHaveBeenCalled();
    expect(eventsService.findEventDetails).toHaveBeenCalledWith(baseEvent.id);
    expect(eventsService.findMarketDetails).toHaveBeenCalledWith(
      event.marketId
    );
    expect(component.events).toEqual([
      {
        ...event,
        home: marketEvent.home,
        away: marketEvent.away,
        draw: marketEvent.draw,
      },
    ]);
  });

  it('should unsubscribe when component is destroyed', () => {
    // Given
    eventsService.findAllEventIds.and.returnValue(of([]));
    eventsService.findEventDetails.and.returnValue(of());
    eventsService.findMarketDetails.and.returnValue(of());

    // When
    component.ngOnInit();
    component.ngOnDestroy();

    // Then
    expect(eventsService.findAllEventIds).toHaveBeenCalled();
    expect(eventsService.findEventDetails).not.toHaveBeenCalled();
    expect(eventsService.findMarketDetails).not.toHaveBeenCalled();
  });
});
