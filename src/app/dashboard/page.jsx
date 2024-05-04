"use client";
import React from "react";
import SidebarDash from "@/components/dashSidebar/SidebarDash";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import {
  chartLineConfig,
  chartPieConfig,
  chartBarConfig,
} from "../../lib/datacharts";

const Dashboard = () => {
  return (
    <div className="bg-[#1e1e3d] flex">
      <SidebarDash />
      <div className="min-h-screen w-full max-w-screen-3xl overflow-hidden pr-8 flex flex-col gap-8">
        <Card className="mt-12">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div>
              <Typography variant="h6" color="blue-gray">
                Visitas mensuales
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            <Chart {...chartLineConfig} />
          </CardBody>
        </Card>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 items-center">
          <div>
            <Card>
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
              >
                <Typography variant="h6" color="blue-gray">
                  Categorias recetas
                </Typography>
              </CardHeader>
              <CardBody className="mt-4 grid place-items-center px-2">
                <Chart {...chartPieConfig} />
              </CardBody>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card>
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
              >
                <Typography variant="h6" color="blue-gray">
                  Recetas creadas
                </Typography>
              </CardHeader>
              <CardBody className="px-2 pb-0">
                <Chart {...chartBarConfig} />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
