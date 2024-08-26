import { CompetitionsResponse } from "@/types/competition/competion";
import axios, { AxiosResponse } from "axios";

const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";

export async function getAllCompetition(): Promise<CompetitionsResponse> {
  const url: string = `${baseUrl}/competitions`;
  return axios
    .get(url)
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
          "Failed to get all competion list: Network or server error"
        );
      }
    });
}
