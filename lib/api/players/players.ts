import { BasketballTeamStats, Player } from "@/lib/types/players/players";
import { Schedule } from "@/lib/types/schedules/schedules";
import { TeamList } from "@/lib/types/teams/teams";
import axios, { AxiosResponse } from "axios";

const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";

export async function getSpecificTeamPlayer(
  teamId: string | null,
  competitionId: string | null
): Promise<Player> {
  const url: string = `${baseUrl}/players/specific/teams/${teamId}`;

  const config = {
    headers: {
      "x-competition-id": competitionId,
    },
  };

  return axios
    .get(url, config)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: any) => {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `${error.response.data.message || error.response.statusText}`
        );
      } else {
        throw new Error(
          "Failed to get this teamm players: Network or server error"
        );
      }
    });
}

export async function getPlayerStats(
  teamId: string | null,
  competitionId: string | null
): Promise<BasketballTeamStats> {
  const url: string = `${baseUrl}/players-stats/team/${teamId}`;

  const config = {
    headers: {
      "x-competition-id": competitionId,
    },
  };

  return axios
    .get(url, config)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: any) => {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `${error.response.data.message || error.response.statusText}`
        );
      } else {
        throw new Error(
          "Failed to get this team stat: Network or server error"
        );
      }
    });
}
