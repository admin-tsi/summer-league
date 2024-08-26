import { Articles } from "@/types/blog/blog";
import { GamesResult } from "@/types/games/games";
import axios, { AxiosResponse } from "axios";

const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";

export async function getAllBlogArticles(
  competitionId: string
): Promise<Articles> {
  const url: string = `${baseUrl}/blog/specific/competition?competId=${competitionId}`;

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
        throw new Error("Failed to get blog article: Network or server error");
      }
    });
}
