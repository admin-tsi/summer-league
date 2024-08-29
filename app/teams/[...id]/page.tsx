"use client";

import React from "react";

const Page: React.FC<{ params: { id: string[] } }> = ({ params }) => {
  const [teamName, teamId] = params.id;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Team Details</h1>
      {teamId && teamName ? (
        <>
          <p className="text-lg">
            You are viewing the team: {teamName.replace("-", " ")}
          </p>
          <p className="text-lg">Team ID: {teamId}</p>
        </>
      ) : (
        <p className="text-lg">Loading...</p>
      )}
    </div>
  );
};

export default Page;
