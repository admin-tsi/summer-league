import { GamesResult, GameStats, Matchs } from "@/lib/types/games/games";
import axios, { AxiosResponse } from "axios";

const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";

export async function getGameStats(
  gameId: string,
  competitionId: string,
): Promise<GameStats> {
  try {
    const response = await fetch(
      `${baseUrl}/players-stats/game/${gameId}/teams-players-stats`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-competition-id": competitionId,
        },
      },
    );
    return await response.json();
  } catch (error: any) {
    console.error("Error in getGameStats:", error);
    throw new Error(`Error fetching game stats: ${(error as Error).message}`);
  }
}

export async function getAllGameResults(
  competitionId: string,
): Promise<GamesResult> {
  const url: string = `${baseUrl}/games`;

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
          `${error.response.data.message || error.response.statusText}`,
        );
      } else {
        throw new Error("Failed to get schedule: Network or server error");
      }
    });
}

export async function getTodayGame(competitionId: string): Promise<Matchs> {
  const url: string = `${baseUrl}/schedules/date/today`;

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
          `${error.response.data.message || error.response.statusText}`,
        );
      } else {
        throw new Error(
          "Failed to get today schedule: Network or server error",
        );
      }
    });
}
