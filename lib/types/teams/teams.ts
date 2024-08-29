type TeamManager = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  specialization: string;
};

export type Team = {
  _id: string;
  teamName: string;
  city: string;
  teamManager?: TeamManager;
  divisionName: string;
  stepLevelId: string;
  teamGender: "boys" | "girls";
  saison: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TeamList = Team[];
