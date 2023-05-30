import { NgModule } from '@angular/core';
import { EventsListComponent } from './events-list/events-list.component';
import { CommonModule } from '@angular/common';
import { SportsbookRoutingModule } from './sportsbook-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [EventsListComponent],
  imports: [
    CommonModule,
    SportsbookRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
  ],
})
export class SportsbookModule {}
