import { Schedule } from "@/lib/types/schedules/schedules";
import { TeamList } from "@/lib/types/teams/teams";
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
