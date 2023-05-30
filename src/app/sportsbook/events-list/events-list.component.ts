import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventsService } from '../service/events.service';
import { BaseEvent, Event, MarketEvent } from '../model/event.model';
import { combineLatest, Subject, switchMap, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
})
export class EventsListComponent implements OnInit, OnDestroy {
  events: MarketEvent[] = [];
  displayedColumns: string[] = ['teams', 'score', 'home', 'draw', 'away'];
  private destroy$ = new Subject<void>();

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.updateEvents();
  }

  private updateEvents(): void {
    this.eventsService
      .findAllEventIds()
      .pipe(
        switchMap((events: BaseEvent[]) =>
          combineLatest(
            events.map((baseEvent: BaseEvent) =>
              this.eventsService.findEventDetails(baseEvent.id).pipe(
                switchMap((event: Event) =>
                  this.eventsService.findMarketDetails(event.marketId).pipe(
                    map((marketEvent: MarketEvent) => {
                      return {
                        ...event,
                        home: marketEvent.home,
                        away: marketEvent.away,
                        draw: marketEvent.draw,
                      };
                    })
                  )
                ),
                takeUntil(this.destroy$)
              )
            )
          )
        ),
        takeUntil(this.destroy$) // Unsubscribe when destroy$ emits
      )
      .subscribe((updatedEvents: MarketEvent[]) => {
        this.events = updatedEvents;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
