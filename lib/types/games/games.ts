export type Player = {
  _id: string;
  firstName: string;
  lastName: string;
  position: string;
  dorseyNumber: number;
  playerTeam: {
    _id: string;
    teamName: string;
    city: string;
  };
};

export type PlayerStats = {
  player: Player;
  stats: {
    points: number;
    rebonds: number;
    fouls: number;
    assists: number;
    turnover: number;
    blocks: number;
    steal: number;
  };
};

export type TeamStats = PlayerStats[];

export type GameStats = {
  homeTeam: TeamStats;
  awayTeam: TeamStats;
};

export type Team = {
  _id: string;
  teamName: string;
  teamGender: string;
};

export type Schedule = {
  _id: string;
  date: string;
};

export type MatchScore = {
  home: number;
  away: number;
};

export type Game = {
  _id: string;
  homeTeam: Team;
  awayTeam: Team;
  matchType: string;
  scheduleId: Schedule;
  saison: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  matchScore: MatchScore;
  matchResult: string;
  matchWinner: string;
};

export type GamesResult = Game[];

export type ScoreboardOfficer = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
};

export type Match = {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  homeTeam: Team;
  homeScoreboardOfficier: ScoreboardOfficer;
  awayTeam: Team;
  awayScoreboardOfficier: ScoreboardOfficer;
  stadiumLocation: string;
  division: string;
  conference: string;
  match_type: string;
  isPlay: boolean;
  status: string;
  saison: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Matchs = Match[];
