export type Team = {
  _id: string;
  teamName: string;
  teamGender: string;
};

type Schedule = {
  _id: string;
  date: string;
};

type MatchScore = {
  home: number;
  away: number;
};

type Game = {
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

type ScoreboardOfficer = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
};

type Match = {
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
