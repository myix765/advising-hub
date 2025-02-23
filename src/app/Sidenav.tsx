"use client";
import { useState } from "react";
import Image from 'next/image';
import cloud from "./cloud-outline-512.png";
import { MdOutlineCalendarToday, MdChecklist } from "react-icons/md"; 

const Sidenav = () => {
  const [activeTab, setActiveTab] = useState("degrees");
  const [activeSemester, setActiveSemester] = useState<string | null>(null);

  const sems = ["Fall 2024", "Spring 2025", "Summer 2025", "Fall 2025"];

  const handleSemClick = (sem: string) => {
    setActiveTab("schedules");
    setActiveSemester(sem);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-60 bg-white text-black border-r border-gray-300">
        <nav className="flex flex-col p-4 space-y-4">
          {/* Logo */}
          <div className="p-4">
            <h1 className="flex items-center font-semibold text-xl space-x-2">
              <Image src={cloud} alt="Cloud Icon" width={40} height={40} />
              <span>Hub</span>
            </h1>
          </div>

          {/* Degree Audit Button */}
          <div>
            {/* <h1 className="p-2 font-bold text-gray-500">Degrees</h1> */}
            <button
              onClick={() => {
                setActiveTab("degrees");
                setActiveSemester(null);
              }}
              className={`px-4 py-2 flex items-center w-full text-left font-semibold text-black rounded-xl ${activeTab === "degrees" ? "bg-gray-200" : ""}`}
            >
              <MdChecklist className="mr-2"/>Degree Audit
            </button>
          </div>

          {/* Schedules Section */}
          <div className="p-4">
            <h1 className="flex items-center font-bold text-gray-500 space-x-2"><MdOutlineCalendarToday className="mr-2"/>Schedules</h1>
            {sems.map((sem) => (
              <button
                key={sem}
                onClick={() => handleSemClick(sem)}
                className={`p-2 ml-4 w-4/5 text-left rounded-xl ${activeSemester === sem ? "bg-gray-200" : ""}`}
              >
                {sem}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-4">
        {/* Show Degree Audit */}
        {activeTab === "degrees" && <DegreesComponent />}

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
const DegreesComponent = () => <div>Degree Audit Content</div>;
const SchedulesComponent = ({ semester }: { semester: string }) => (
  <div>Schedule Content for {semester}</div>
);

export default Sidenav;
