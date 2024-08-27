import { GameStats } from "@/lib/types/games/games";

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
