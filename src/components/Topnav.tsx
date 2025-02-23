"use client";
import { useState } from "react";
import { MdOutlineCalendarToday, MdChecklist, MdIosShare, MdArrowLeft, MdArrowDropDown } from "react-icons/md";
import { useRouter } from "next/navigation"

const Topnav = () => {
  const [activeTab, setActiveTab] = useState("degrees");
  // const [activeSemester, setActiveSemester] = useState<string | null>(null);
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  // const sems = ["Fall 2024", "Spring 2025", "Summer 2025", "Fall 2025"];

  // const handleSemClick = (sem: string) => {
  //   setActiveTab("schedules");
  //   setActiveSemester(sem);
  //   setDropdownOpen(false);
  // };

  return (
    <div className="w-full flex flex-row justify-between items-center p-4 bg-white border-b-1 border-gray-300">

      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Schedule Dropdown */}
        <div className="relative">
          {/* <button
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
              setActiveTab("schedules");
            }}
            className={`px-4 py-1 flex items-center border rounded-full transition ${activeTab === "schedules" ? "bg-[#3D0DFF] text-white" : "text-black"
              }`}
          >
            <MdOutlineCalendarToday className="mr-2 w-1/2" />
            <span>Schedule</span>
            {dropdownOpen ? <MdArrowDropDown className="ml-2 border-l pl-1 w-2/3" /> : <MdArrowLeft className="ml-2 border-l pl-1 w-2/3" />}
          </button>
          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg">
              {sems.map((sem) => (
                <button
                  key={sem}
                  onClick={() => handleSemClick(sem)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  {sem}
                </button>
              ))}
            </div>
          )} */}
          <button
            onClick={() => {
              setActiveTab("schedules");
              router.push('/schedule')
            }}
            className={`px-4 py-1 flex items-center border rounded-full transition ${activeTab === "schedules" ? "bg-[#3D0DFF] text-white" : "text-black"
              }`}
          >
            <MdOutlineCalendarToday className="mr-2 w-1/2" />
            <span>Schedule</span>
          </button>
        </div>
        {/* Degree Audit Button */}
        <button
          onClick={() => {
            setActiveTab("degrees");
            // setActiveSemester(null);
            // setDropdownOpen(false);
            router.push('/audit')
          }}
          className={`px-6 py-1 flex items-center text-black border rounded-full transition ${activeTab === "degrees" ? "bg-[#3D0DFF] text-white" : ""
            }`}
        >
          <MdChecklist className="mr-2" /> Degree Audit
        </button>

      </div>

      {/* Right Section */}
      <button className="px-6 py-1 flex items-center border text-black rounded-full">
        <MdIosShare className="mr-2" /> Share with advisor
      </button>
    </div>
  );
};



export default Topnav;
