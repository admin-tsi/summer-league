"use client";
import React, { useEffect, useState } from "react";
import { TeamList, Team } from "@/lib/types/teams/teams";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { getAllSTeams } from "@/lib/api/teams/teams";
import { SquareArrowOutUpRight, Wind, Flame, Waves } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import TeamsListSkeleton from "@/components/home/skeleton/teams-list-skeleton";
import Link from "next/link";
import YewaGuardians from "../../public/team-textures/YEWA-GUARDIANS.png";
import OlokunDepths from "../../public/team-textures/OLOKUN-DEPTHS.png";
import OgunWarriors from "../../public/team-textures/OGUN-WARRIORS.png";
import XeviosoArtisans from "../../public/team-textures/XEVIOSO-ARTISANS.png";
import MawuSunrays from "../../public/team-textures/MAWU-SUNRAYS.png";
import GletiScholars from "../../public/team-textures/GLETI-SCHOLARS.png";
import ObatalaTitans from "../../public/team-textures/OBATALA-TITANS.png";
import LokoRoots from "../../public/team-textures/LOKO-ROOTS.png";
import LissaRainbows from "../../public/team-textures/LISSA-RAINBOWS.png";
import GbaduDancers from "../../public/team-textures/GBADU-DANCERS.png";
import OriDestinies from "../../public/team-textures/ORI-DESTINIES.png";
import IbejiYouth from "../../public/team-textures/IBEJI-YOUTH.png";
import DamballahWisdom from "../../public/team-textures/DAMBALLAH-WISDOM.png";
import OrunmilaStars from "../../public/team-textures/ORUNMILA-STARS.png";

type Gender = "boys" | "girls";

const teamImages: { [key: string]: any } = {
  "YEWA GUARDIANS": YewaGuardians,
  "OLOKUN DEPTHS": OlokunDepths,
  "OGUN WARRIORS": OgunWarriors,
  "XEVIOSO ARTISANS": XeviosoArtisans,
  "MAWU SUNRAYS": MawuSunrays,
  "GLETI SCHOLARS": GletiScholars,
  "OBATALA TITANS": ObatalaTitans,
  "LOKO ROOTS": LokoRoots,
  "LISSA RAINBOWS": LissaRainbows,
  "GBADU DANCERS": GbaduDancers,
  "ORI DESTINIES": OriDestinies,
  "IBEJI YOUTH": IbejiYouth,
  "DAMBALLAH WISDOM": DamballahWisdom,
  "ORUNMILA STARS": OrunmilaStars,
};

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

  const getTeamImage = (teamName: string) => {
    return teamImages[teamName.toUpperCase()] || YewaGuardians;
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
                <div className="flex items-center mb-2">
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
                        className="p-3 grid grid-cols-1 gap-2 group cursor-pointer shadow-md border-l-4 transition-all duration-300 ease-in-out relative overflow-hidden"
                      >
                        <div
                          className="absolute inset-0 bg-repeat opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                          style={{
                            backgroundImage: `url(${getTeamImage(team.teamName).src})`,
                            backgroundSize: "100px 100px",
                          }}
                        ></div>
                        <div className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-white">
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
