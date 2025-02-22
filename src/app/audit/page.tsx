'use client'

import Navbar from "@/components/Navbar";
import ReqBlock from "@/components/ReqBlock";

const DegreeAudit = () => {
    return (
        <div>
            <div className="fixed"><Navbar/></div>
            <div className="p-6 mt-10 ml-10"> {/* Container for content */}
                <div className="grid grid-cols-2 gap-4 max-w-max max-h-max bg-slate-100 h-screen p-8 gap-0">
                    <ReqBlock creditType= "Math/NS" totalCourses={6} coursesCompleted={5} />
                    <ReqBlock creditType= "CS Core" totalCourses={4} coursesCompleted={3} />
                    <ReqBlock creditType= "HASS" totalCourses={12} coursesCompleted={6} />
                    <ReqBlock creditType= "Engineering" totalCourses={8} coursesCompleted={0} />
                    {/* Add more ReqBlocks as needed */}
                </div>
            </div>
        </div>
    );
} 

export default DegreeAudit;