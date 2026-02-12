
export interface Team {
  id: number;
  name: string;
  logo: string;
}

export interface League {
  id: number;
  name: string;
  type: string;
  logo: string;
  country: {
    name: string;
    code: string;
    flag: string;
  };
}

export interface Game {
  id: number;
  date: string;
  time: string;
  timestamp: number;
  timezone: string;
  status: {
    long: string;
    short: string;
  };
  league: League;
  teams: {
    home: Team;
    away: Team;
  };
  scores: {
    home: number;
    away: number;
  };
}

export interface Standing {
  position: number;
  team: Team;
  league: League;
  country: string;
  season: number;
  games: {
    played: number;
    win: {
      total: number;
      percentage: string;
    };
    lose: {
      total: number;
      percentage: string;
    };
  };
  points: number;
  goals: {
    for: number;
    against: number;
  };
}

export interface ApiResponse<T> {
  get: string;
  parameters: any;
  errors: any[];
  results: number;
  response: T;
}
