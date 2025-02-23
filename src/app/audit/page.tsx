'use client'

import AISidebar from "@/components/AISidebar";
import Navbar from "@/components/Navbar";
import ReqBlock from "@/components/ReqBlock";
import { AuditCourseProps } from "@/types/AIMessage";
import { useState } from "react";

const DegreeAudit = () => {
    const [selectedCourses, setSelectedCourses] = useState<Set<AuditCourseProps>>(new Set());

    const handleUpdateContent = (_content: string) => {
        // Implement content update logic here
    };

    return (
        <div>
            <div className="fixed"><Navbar/></div>
            <div className="grid grid-cols-[70%_30%] pt-20"> {/* Container for content */}
                <div className="grid grid-cols-2 gap-4 max-w-max max-h-max h-screen p-8">                    
                    <ReqBlock creditType="Math/NS" totalCourses={6} coursesCompleted={5} />
                    <ReqBlock creditType="CS Core" totalCourses={4} coursesCompleted={3} />
                    <ReqBlock creditType="HASS" totalCourses={12} coursesCompleted={6} />
                    <ReqBlock creditType="Engineering" totalCourses={8} coursesCompleted={0} />
                    {/* Add more ReqBlocks as needed */}
                </div>
                <div className="h-screen border-l">
                    <AISidebar 
                        selectedCourses={selectedCourses}
                        onUpdateContent={handleUpdateContent} 
                    />
                </div>
            </div>
        </div>
    );
} 

export default DegreeAudit;