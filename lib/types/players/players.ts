export type PlayerTeam = {
  _id: string;
  teamName: string;
  city: string;
};

export type PlayerStatus = {
  status: boolean;
  comment?: string;
};

export type Player = {
  _id: string;
  firstName: string;
  lastName: string;
  position: string;
  college: string;
  playerEmail: string;
  birthdate: string;
  height: number;
  yearOfExperience: number;
  dorseyNumber: number;
  weight: number;
  nationality: string;
  countryCode: string;
  phoneNumber: string;
  playerImage: string;
  playerStatus: PlayerStatus;
  saison: string;
  playerTeam: PlayerTeam;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type PlayerStats = {
  points: number;
  rebonds: number;
  fouls: number;
  assists: number;
  turnOver: number;
  blocks: number;
  steal: number;
  totalGames: number;
};

export type BasketballPlayerStats = {
  player: Player;
  stats: PlayerStats;
};

export type BasketballTeamStats = BasketballPlayerStats[];
