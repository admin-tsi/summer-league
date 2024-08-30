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
  playerStatus: {
    status: boolean;
    comment?: string;
  };
  saison: string;
  playerTeam: {
    _id: string;
    teamName: string;
    city: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};
