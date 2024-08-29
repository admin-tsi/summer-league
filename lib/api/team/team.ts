import axios, { AxiosResponse } from "axios";

const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";

export async function getTeamRankingGirls(
  competitionId: string | null,
): Promise<any> {
  try {
    const response: AxiosResponse<any> = await axios.get(
      `${baseUrl}/teams-stats/gender/girls`,
      {
        headers: {
          "x-competition-id": competitionId,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while fetching the team ranking",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

export async function getTeamRankingBoys(
  competitionId: string | null,
): Promise<any> {
  try {
    const response: AxiosResponse<any> = await axios.get(
      `${baseUrl}/teams-stats/gender/boys`,
      {
        headers: {
          "x-competition-id": competitionId,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while fetching the team ranking",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}
