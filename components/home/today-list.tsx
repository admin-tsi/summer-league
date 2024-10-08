import React from "react";
import Image from "next/image";
import img from "../../public/ddkdk.jpg";

type Team = {
  _id: string;
  teamName: string;
  teamGender: string;
};

type ScoreboardOfficer = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
};

type Match = {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  homeTeam: Team;
  homeScoreboardOfficier: ScoreboardOfficer;
  awayTeam: Team;
  awayScoreboardOfficier: ScoreboardOfficer;
  stadiumLocation: string;
  division: string;
  conference: string;
  match_type: string;
  isPlay: boolean;
  status: string;
  saison: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type MatchesListProps = {
  matches: Match[] | null;
};

const MatchesList: React.FC<MatchesListProps> = ({ matches }) => {
  return (
    <div className="w-full container mx-auto py-6">
      <div className="w-full grid grid-cols-1">
        <span className="text-2xl font-bold">Match Schedule</span>
        <span className="text-xs">View all matches</span>
      </div>
      <div className="grid grid-cols-1 gap-4 py-8">
        {matches && matches.length > 0 ? (
          matches.slice(0, 6).map((match) => (
            <div key={match._id} className="p-2 flex">
              <h3 className="text-sm font-semibold w-1/2">
                {match.homeTeam.teamName} vs {match.awayTeam.teamName}
              </h3>
              <div className="w-1/2 flex flex-col justify-end items-center text-sm">
                <span>
                  {match.startTime} - {match.endTime}
                </span>
                <span>
                  {match.division}, {match.stadiumLocation}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
            <Image
              src={img}
              alt="Summer League"
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-8">
              <h2 className="text-3xl font-bold mb-4">Summer League</h2>
              <p className="text-xl mb-4">
                There are no matches scheduled at the moment.
              </p>
              <p className="text-lg">
                Come back next year for the next edition of the Summer League!
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex justify-end items-center px-12">
        <span className="text-xs">View all matches</span>
      </div>
    </div>
  );
};

export default MatchesList;
