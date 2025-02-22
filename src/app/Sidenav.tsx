"use client";
import { useState } from "react";
import Image from 'next/image';
import cloud from "./cloud-outline-512.png";

const Sidenav = () => {
  const [activeTab, setActiveTab] = useState("degrees");
  const [activeSemester, setActiveSemester] = useState<string | null>(null); 
  const [activeMajor, setActiveMajor] = useState<string | null>(null); // Track selected major

  const sems = ["Fall 2024", "Spring 2025", "Summer 2025", "Fall 2025"];
  const majors = ["Computer Science", "Psychology"]; // Example double major

  const handleSemClick = (sem: string) => {
    setActiveTab("schedules");
    setActiveSemester(sem);
    setActiveMajor(null); // Hide major if switching to schedule
  };

  const handleMajorClick = (major: string) => {
    setActiveTab("degrees");
    setActiveMajor(major);
    setActiveSemester(null); // Hide semester if switching to major
  };

  return (
    <div className="flex ">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-60 bg-white text-black border-r border-gray-300">
        <nav className="flex flex-col p-4 space-y-4">
          {/* Logo */}
          <div className=" p-4 space-y-4">
          <h1 className="flex items-center font-semibold text-xl space-x-2">
                <Image src={cloud} alt="Cloud Icon" width={40} height={40} />
                <span>Hub</span>
            </h1>
          </div>

          {/* Degrees Section */}
          <div className="p-2">
            <h1 className="p-2 font-bold text-gray-500">Degrees</h1>
            {majors.map((major) => (
              <button
                key={major}
                onClick={() => handleMajorClick(major)}
                className={`p-2 ml-4 w-4/5 text-left rounded ${activeMajor === major ? "bg-gray-200" : ""}`}
              >
                {major}
              </button>
            ))}
          </div>

          {/* Schedules Section */}
          <div className="p-4">
            <h1 className="p-2 font-bold text-gray-500">Schedules</h1>
            {sems.map((sem) => (
              <button
                key={sem}
                onClick={() => handleSemClick(sem)}
                className={`p-2 ml-4 w-4/5 text-left rounded ${activeSemester === sem ? "bg-gray-200" : ""}`}
              >
                {sem}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-4">
        {/* Show Major's Degree Progress */}
        {activeTab === "degrees" && activeMajor && (
          <div>
            <h2 className="text-lg font-bold">{activeMajor} Degree Progress</h2>
            <DegreesComponent major={activeMajor} />
          </div>
        )}

        {/* Show Semester Schedule */}
        {activeTab === "schedules" && activeSemester && (
          <div>
            <h2 className="text-lg font-bold">{activeSemester} Schedule</h2>
            <SchedulesComponent semester={activeSemester} />
          </div>
        )}
      </div>
    </div>
  );
};

// Components for displaying content
const DegreesComponent = ({ major }: { major: string }) => (
  <div>Degree Progress for {major}</div>
);

const SchedulesComponent = ({ semester }: { semester: string }) => (
  <div>Schedule Content for {semester}</div>
);

export default Sidenav;
