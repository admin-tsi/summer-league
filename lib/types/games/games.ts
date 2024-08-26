export type PlayerStats = {
  player: {
    _id: string;
    firstName: string;
    lastName: string;
    position: string;
    dorseyNumber: number;
  };
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

export type GameStats = PlayerStats[];
