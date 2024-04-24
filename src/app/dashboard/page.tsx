import React from "react";
import "./dashboard.css";
import SidebarDash from "@/components/dashSidebar/SidebarDash";
import BarChart from "./BarChart";

const Dashboard = () => {
  return (
    <div className="dashboardHome">
      <SidebarDash />
      <div className="homeContainer"></div>
    </div>
  );
};
export default Dashboard;
