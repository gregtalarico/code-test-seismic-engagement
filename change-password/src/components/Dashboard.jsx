import React from "react";
import TasksCard from "./cards/TasksCard";
import { AlertsCard } from "./cards/AlertsCard";

export default function Dashboard() {
  return (
    <div>
      <h2 className="mt-3">Dashboard</h2>
      <div className="row mt-5">
        <div className="col-12">
          <AlertsCard />
          <TasksCard />
        </div>
      </div>
    </div>
  );
}