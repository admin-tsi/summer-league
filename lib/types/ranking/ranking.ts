export interface TeamRanking {
  teamId: {
    _id: string;
    teamName: string;
  };
  stats: {
    wins: number;
    losses: number;
  };
}
