import axios, { AxiosResponse } from "axios";
import { Schedule } from "@/lib/types/schedules/schedules";

const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";
export async function getAllSchedules(
  competitionId: string | null,
): Promise<Schedule[]> {
  try {
    const response: AxiosResponse<Schedule[]> = await axios.get(
      `${baseUrl}/schedules`,
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
          "An error occurred while fetching the schedules",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}

export async function getScheduleResultById(
  scheduleId: string,
  competitionId: string | null,
): Promise<Schedule> {
  try {
    const response: AxiosResponse<Schedule> = await axios.get(
      `${baseUrl}/results/schedule/${scheduleId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-competition-id": competitionId,
        },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while fetching the schedule",
      );
    } else {
      throw new Error("A non-Axios error occurred");
    }
  }
}
