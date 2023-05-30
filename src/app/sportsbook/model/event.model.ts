export interface MarketEvent extends Event {
  home: string;
  draw: string;
  away: string;
}

export interface Event extends BaseEvent {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  marketId: number;
}

export interface BaseEvent {
  id: number;
}
