"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { format, parseISO, isToday, isBefore, isAfter } from "date-fns";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Triangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScheduleResult, Team } from "@/lib/types/schedules/schedules";
import {
  getAllSchedules,
  getScheduleResultById,
} from "@/lib/api/schedules/schedules";
import { useRouter } from "next/navigation";
import ScheduleSkeleton from "@/components/schedules/schedules-skeleton";

const SchedulePage: React.FC = () => {
  const [schedules, setSchedules] = useState<ScheduleResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string>("all");
  const competitionId = "66cbbc31b450ee0e0b089f88";
  const router = useRouter();

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await getAllSchedules(competitionId);
        const schedulesWithResults = await Promise.all(
          data.map(async (schedule) => {
            if (schedule.status === "finish") {
              const result = await getScheduleResultById(
                schedule._id,
                competitionId,
              );
              return { ...schedule, ...result };
            }
            return schedule;
          }),
        );
        setSchedules(schedulesWithResults);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch schedules");
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const sortSchedules = (schedules: ScheduleResult[]): ScheduleResult[] => {
    return schedules.sort((a, b) => {
      const dateA = parseISO(a.date);
      const dateB = parseISO(b.date);

      if (isBefore(dateA, dateB)) return -1;
      if (isAfter(dateA, dateB)) return 1;

      if (a.status === "finish" && b.status !== "finish") return -1;
      if (a.status !== "finish" && b.status === "finish") return 1;

      return a.startTime.localeCompare(b.startTime);
    });
  };

  const groupSchedulesByDate = (schedules: ScheduleResult[]) => {
    const sortedSchedules = sortSchedules(schedules);
    const grouped = sortedSchedules.reduce(
      (acc, schedule) => {
        const date = format(parseISO(schedule.date), "yyyy-MM-dd");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(schedule);
        return acc;
      },
      {} as Record<string, ScheduleResult[]>,
    );

    const today = format(new Date(), "yyyy-MM-dd");
    if (grouped[today]) {
      const { [today]: todaySchedules, ...rest } = grouped;
      return { [today]: todaySchedules, ...rest };
    }

    return grouped;
  };

  const filterSchedulesByTeam = (
    schedules: ScheduleResult[],
    teamId: string,
  ) => {
    if (teamId === "all") return schedules;
    return schedules.filter(
      (schedule) =>
        schedule.homeTeam._id === teamId || schedule.awayTeam._id === teamId,
    );
  };

  const handleBoxScoreClick = useCallback(
    (gameId: string) => {
      router.push(`/schedules/${gameId}`);
    },
    [router],
  );

  const groupedSchedules = groupSchedulesByDate(
    filterSchedulesByTeam(schedules, selectedTeam),
  );

  const allTeams = useMemo(() => {
    const teamSet = new Set<string>();
    const uniqueTeams: Team[] = [];

    schedules.forEach((schedule) => {
      [schedule.homeTeam, schedule.awayTeam].forEach((team) => {
        if (!teamSet.has(team._id)) {
          teamSet.add(team._id);
          uniqueTeams.push(team);
        }
      });
    });

    return uniqueTeams.sort((a, b) => a.teamName.localeCompare(b.teamName));
  }, [schedules]);

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-destructive">
        {error}
      </div>
    );

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 bg-background text-foreground">
      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8 text-center text-primary"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Summer League Schedule
      </motion.h1>
      {loading ? (
        <ScheduleSkeleton />
      ) : (
        <div className="flex flex-col items-start lg:items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col space-y-2 w-full lg:w-auto mb-4">
            <Select onValueChange={(value) => setSelectedTeam(value)}>
              <SelectTrigger className="w-full md:w-[300px]">
                <SelectValue placeholder="Filter by team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                {allTeams.map((team) => (
                  <SelectItem key={team._id} value={team._id}>
                    {team.teamName} ({team.teamGender === "boys" ? "B" : "G"})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Tabs defaultValue="all" className="w-full">
            <TabsContent value="all">
              {Object.entries(groupedSchedules).map(
                ([date, daySchedules], index) => (
                  <motion.div
                    key={date}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="mb-6 sm:mb-8"
                  >
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4 flex justify-between items-center text-primary">
                      <span>
                        {isToday(parseISO(date))
                          ? "Today"
                          : format(parseISO(date), "EEEE, MMMM d")}
                      </span>
                      <span className="text-xs sm:text-sm font-normal bg-primary-green text-primary-green-foreground px-2 py-1 rounded-md">
                        {daySchedules.length} Game
                        {daySchedules.length !== 1 ? "s" : ""}
                      </span>
                    </h2>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableBody>
                          {daySchedules.map((schedule) => (
                            <React.Fragment key={schedule._id}>
                              <TableRow className="border-0 md:border-b hover:bg-muted/50 transition-colors">
                                <TableCell className="font-medium w-[80px] sm:w-[100px] text-xs sm:text-sm py-2 sm:py-4">
                                  {schedule.status === "finish" ? (
                                    <span className="text-destructive font-bold">
                                      FINAL
                                    </span>
                                  ) : (
                                    schedule.startTime
                                  )}
                                </TableCell>
                                <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                                  <div
                                    className={
                                      schedule.matchWinner === "Home Team"
                                        ? "font-semibold"
                                        : ""
                                    }
                                  >
                                    {schedule.homeTeam.teamName} (
                                    {schedule.homeTeam.teamGender === "boys"
                                      ? "B"
                                      : "G"}
                                    )
                                  </div>
                                  <div
                                    className={
                                      schedule.matchWinner === "Away Team"
                                        ? "font-semibold"
                                        : ""
                                    }
                                  >
                                    {schedule.awayTeam.teamName} (
                                    {schedule.awayTeam.teamGender === "boys"
                                      ? "B"
                                      : "G"}
                                    )
                                  </div>
                                </TableCell>
                                <TableCell className="text-center text-xs sm:text-sm py-2 sm:py-4">
                                  <div className="flex flex-col items-center">
                                    <div className="flex items-center justify-center w-full">
                                      {schedule.matchWinner === "Home Team" && (
                                        <Triangle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-destructive transform rotate-90" />
                                      )}
                                      <span
                                        className={
                                          schedule.matchWinner === "Home Team"
                                            ? "font-semibold"
                                            : ""
                                        }
                                      >
                                        {schedule.status === "finish" &&
                                        schedule.matchScore
                                          ? schedule.matchScore.home
                                          : "0"}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-center w-full">
                                      {schedule.matchWinner === "Away Team" && (
                                        <Triangle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-destructive transform rotate-90" />
                                      )}
                                      <span
                                        className={
                                          schedule.matchWinner === "Away Team"
                                            ? "font-semibold"
                                            : ""
                                        }
                                      >
                                        {schedule.status === "finish" &&
                                        schedule.matchScore
                                          ? schedule.matchScore.away
                                          : "0"}
                                      </span>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-xs sm:text-sm py-2 sm:py-4">
                                  {schedule.stadiumLocation}
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-right py-2 sm:py-4">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-secondary text-secondary-foreground text-xs"
                                    disabled={schedule.status !== "finish"}
                                    onClick={() =>
                                      handleBoxScoreClick(schedule._id)
                                    }
                                  >
                                    Box Score
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow className="md:hidden border-b border-border/50 hover:bg-muted/50 transition-colors">
                                <TableCell
                                  colSpan={4}
                                  className="text-right py-2"
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-secondary text-secondary-foreground text-xs"
                                    disabled={schedule.status !== "finish"}
                                    onClick={() =>
                                      handleBoxScoreClick(schedule._id)
                                    }
                                  >
                                    Box Score
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </motion.div>
                ),
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;
