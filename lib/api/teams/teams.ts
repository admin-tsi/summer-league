import { Schedule } from "@/lib/types/schedules/schedules";
import { TeamList, TeamStats } from "@/lib/types/teams/teams";
import axios, { AxiosResponse } from "axios";

const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";

export async function getAllSTeams(
  competitionId: string | null
): Promise<TeamList> {
  try {
    const response: AxiosResponse<TeamList> = await axios.get(
      `${baseUrl}/teams`,
      {
        headers: {
          "x-competition-id": competitionId,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while fetching the list of summer league team"
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

export async function getTeamStats(
  teamId: string | null,
  competitionId: string | null
): Promise<TeamStats> {
  const url: string = `${baseUrl}/teams-stats/team/${teamId}`;

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
