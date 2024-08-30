"use client";
import React, { useEffect, useState } from "react";
import { TeamList, Team } from "@/lib/types/teams/teams";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getAllSTeams } from "@/lib/api/teams/teams";
import { SquareArrowOutUpRight, Wind, Flame, Waves } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import TeamsListSkeleton from "@/components/home/skeleton/teams-list-skeleton";
import Link from "next/link";

type Gender = "boys" | "girls";

const TeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<TeamList>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<Gender>("boys");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const competitionId = localStorage.getItem("competitionId");
        const response = await getAllSTeams(competitionId);
        setTeams(response);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch teams");
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  const groupTeamsByDivision = (
    teams: TeamList,
    gender: Gender,
  ): Record<string, Team[]> => {
    return teams
      .filter((team) => team.teamGender.toLowerCase() === gender)
      .reduce(
        (acc, team) => {
          if (!acc[team.divisionName]) {
            acc[team.divisionName] = [];
          }
          acc[team.divisionName].push(team);
          return acc;
        },
        {} as Record<string, Team[]>,
      );
  };

  const getDivisionIcon = (divisionName: string) => {
    switch (divisionName) {
      case "Djo & Ayi":
        return <Wind size={20} className="ml-4 text-primary-yellow" />;
      case "Mion":
        return <Flame size={20} className="ml-4 text-destructive" />;
      case "Sin":
        return <Waves size={20} className="ml-4 text-primary" />;
      default:
        return null;
    }
  };

  if (error)
    return (
      <div className="h-[80vh] w-full flex justify-center items-center">
        Error: {error}
      </div>
    );

  const teamsByDivision = groupTeamsByDivision(teams, selectedGender);

  const defaultAccordionValues = Object.keys(teamsByDivision).map(
    (_, index) => `division-${index}`,
  );

  return (
    <div className="container mx-auto px-4 py-10 h-fit">
      <div className="w-full flex justify-between items-center mb-6">
        <span className="text-2xl font-bold w-fit">All Teams</span>
        <div className="flex justify-end items-center">
          <div className="flex justify-center items-center gap-2">
            <span className={selectedGender === "boys" ? "font-bold" : ""}>
              Boys
            </span>
            <Switch
              checked={selectedGender === "girls"}
              onCheckedChange={(checked) =>
                setSelectedGender(checked ? "girls" : "boys")
              }
            />
            <span className={selectedGender === "girls" ? "font-bold" : ""}>
              Girls
            </span>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="h-[80vh] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TeamsListSkeleton />
          <TeamsListSkeleton />
          <TeamsListSkeleton />
          <TeamsListSkeleton />
          <TeamsListSkeleton />
          <TeamsListSkeleton />
        </div>
      ) : (
        <Accordion
          type="multiple"
          defaultValue={defaultAccordionValues}
          className="w-full"
        >
          {Object.entries(teamsByDivision).map(
            ([division, divisionTeams], divisionIndex) => (
              <AccordionItem value={`division-${divisionIndex}`} key={division}>
                <div className="flex items-center">
                  {division}
                  {getDivisionIcon(division)}
                </div>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {divisionTeams.map((team) => (
                      <Link
                        key={team._id}
                        href={`/teams/${team.teamName
                          .toLowerCase()
                          .replace(/ /g, "-")}/${team.city
                          .toLowerCase()
                          .replace(
                            / /g,
                            "-",
                          )}/${team.teamGender.toLowerCase()}/${team.divisionName
                          .toLowerCase()
                          .replace(/ /g, "-")}/${team._id}`}
                        className="bg-background p-3 grid grid-cols-1 gap-2 group cursor-pointer shadow-md border-l-4"
                      >
                        <div className="w-full flex justify-between items-center">
                          <h3 className="font-medium">{team.teamName}</h3>
                          <SquareArrowOutUpRight
                            size={16}
                            className="hidden group-hover:flex"
                          />
                        </div>
                        <div className="w-full flex items-center gap-3">
                          <p>City: {team.city}</p>
                          {team.teamManager && (
                            <p>
                              Manager: {team.teamManager.firstName}{" "}
                              {team.teamManager.lastName}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ),
          )}
        </Accordion>
      )}
    </div>
  );
};

export default TeamsPage;
