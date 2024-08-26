export type Team = {
  _id: string;
  teamName: string;
  teamGender: string;
};

export type Schedule = {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  homeTeam: Team;
  awayTeam: Team;
  stadiumLocation: string;
  division: string;
  conference: string;
  match_type: "division" | "conference" | "playoffs" | "final";
  isPlay: boolean;
  status: "not started" | "in progress" | "finish";
  saison: string;
};

export type ScheduleResult = Schedule & {
  matchScore?: {
    home: number;
    away: number;
  };
  matchResult?: string;
  matchWinner?: string;
};

export type Game = {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  homeTeam: { teamName: string };
  awayTeam: { teamName: string };
  stadiumLocation: string;
};
