'use client'

import ReqBlock from "@/components/ReqBlock";
import { useState } from "react";

interface Course {
    courseCode: string;
    courseName: string;
    credits: number;
    status: string;
}

interface TotalCoursesProps {
    header: string;
    courses: Course[];
}

const totalCoursesExample: TotalCoursesProps[] = [
    {
        header: "Required Courses",
        courses: [
            { courseCode: "CS 15", courseName: "Data Structures", credits: 3, status: "completed" },
            { courseCode: "CS 40", courseName: "Mach. Struct. & Assembly Lang.", credits: 3, status: "completed" },
            { courseCode: "CS 105", courseName: "Programming Languages", credits: 3, status: "not started" },
            { courseCode: "CS 160", courseName: "Algorithms", credits: 3, status: "not started" },
            { courseCode: "CS 170", courseName: "Computation Theory", credits: 3, status: "not started" }
        ]
    },
    {
        header: "Three CS electives, numbered above CS 15",
        courses: [
            { courseCode: "CS 116", courseName: "Intro to Security", credits: 3, status: "completed" },
            { courseCode: "Elective 2", courseName: "", credits: 0, status: "not started" },
            { courseCode: "Elective 3", courseName: "", credits: 0, status: "not started" }
        ]
    },
    {
        header: "Two required mathematics courses",
        courses: [
            { courseCode: "MATH 34", courseName: "Calculus II or 39 Honors", credits: 3, status: "completed" },
            { courseCode: "CS/MATH 61", courseName: "Discrete Mathematics", credits: 3, status: "not started" }
        ]
    }
];

// const initialCompletedCourses: Course[] = [
//     { courseCode: "CS 15", courseName: "Data Structures", credits: 3, status: "completed" },
//     { courseCode: "CS 40", courseName: "Mach. Struct. & Assembly Lang.", credits: 3, status: "completed" },
//     { courseCode: "MATH 34", courseName: "Calculus II or 39 Honors", credits: 3, status: "completed" },
// ];
const initialCompletedCourses = ["CS 15", "CS 40", "MATH 34"]
const version1 = ["CS 15", "CS 40", "MATH 34", "CS 160"]
const version2 = ["CS 15", "CS 40", "MATH 34", "CS 160", "CS 171", "CS 138"]
const version3 = ["CS 15", "CS 40", "MATH 34", "CS 160", "CS 171"]
const inProg: string[] = [];


const majors = ["Computer Science Major Requirements"]

const DegreeAudit = () => {
    return (
        <div>
            <div className="h-full grid grid-cols-[70%_30%] bg-gray-50"> {/* Container for content */}
                <label className="m-12">
                    <h3 className="font-bold">Degree Audit</h3>
                    <label className="text-xs">Keep track of your 4 year college education level</label>
                    <ReqBlock totalCourses={totalCoursesExample} coursesCompleted={initialCompletedCourses} coursesIP={inProg} sectionTitle={majors[0]} />
                    {/* <ReqBlock totalCourses={totalCoursesExample} coursesCompleted={completedCoursesExample} coursesIP={inProg} sectionTitle={majors[0]} /> */}
                    {/* <ReqBlock totalCourses={totalCoursesExample} coursesCompleted={completedCoursesExample} coursesIP={inProg} sectionTitle={majors[0]} /> */}
                </label>
            </div>

        </div>
    );
}

export default DegreeAudit;