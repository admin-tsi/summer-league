import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Team } from "@/lib/types/teams/teams";

type TeamCardProps = {
  team: Team;
};

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => (
  <Card>
    <CardHeader>
      <CardTitle>{team.teamName}</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Ville</TableCell>
            <TableCell>{team.city}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Genre</TableCell>
            <TableCell>
              {team.teamGender === "boys" ? "Garçons" : "Filles"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Saison</TableCell>
            <TableCell>{team.saison}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Manager</TableCell>
            <TableCell>{`${team.teamManager.firstName} ${team.teamManager.lastName}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Email du manager</TableCell>
            <TableCell>{team.teamManager.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Spécialisation</TableCell>
            <TableCell>{team.teamManager.specialization}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
