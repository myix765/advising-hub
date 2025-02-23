'use client'

import AISidebar from "@/components/AISidebar";
import Navbar from "@/components/Navbar";
import ReqBlock from "@/components/ReqBlock";

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
            { courseCode: "CS 105", courseName: "Programming Languages", credits: 3, status: "completed" },
            { courseCode: "CS 160", courseName: "Algorithms", credits: 3, status: "completed" },
            { courseCode: "CS 170", courseName: "Computation Theory", credits: 3, status: "completed" }
        ]
    },
    {
        header: "Three CS electives, numbered above CS 15",
        courses: [
            { courseCode: "CS 116", courseName: "Intro to Security", credits: 3, status: "completed" },
            { courseCode: "Elective 2", courseName: "", credits: 0, status: "pending" },
            { courseCode: "Elective 3", courseName: "", credits: 0, status: "pending" }
        ]
    },
    {
        header: "Two required mathematics courses",
        courses: [
            { courseCode: "MATH 34", courseName: "Calculus II or 39 Honors", credits: 3, status: "completed" },
            { courseCode: "CS/MATH 61", courseName: "Discrete Mathematics", credits: 3, status: "completed" }
        ]
    }
];

const completedCoursesExample: string[] = ["CS 15", "CS 40", "MATH 34"];
const inProg: string[] = ["CS 105", "CS/MATH 61"];


const majors = ["Computer Science Major Requirements"]

const DegreeAudit = () => {

    const handleUpdateContent = (_content: string) => {
        // Implement content update logic here
    };

    return (
        <div>
            <div className="fixed w-full z-10"><Navbar /></div>
            <div className="grid grid-cols-[70%_30%]"> {/* Container for content */}
                <label className="mx-12 mt-30">
                    <h3 className="font-bold">Degree Audit</h3>
                    <label className="text-xs">Keep track of your 4 year college education level</label>
                    <ReqBlock totalCourses={totalCoursesExample} coursesCompleted={completedCoursesExample} coursesIP={inProg} sectionTitle={majors[0]} />
                    <ReqBlock totalCourses={totalCoursesExample} coursesCompleted={completedCoursesExample} coursesIP={inProg} sectionTitle={majors[0]} />
                    <ReqBlock totalCourses={totalCoursesExample} coursesCompleted={completedCoursesExample} coursesIP={inProg} sectionTitle={majors[0]} />
                </label>
                <div className="mt-20 border-l" style={{ height: 'calc(100vh - 5rem)' }}>
                    <AISidebar
                        onUpdateContent={handleUpdateContent}
                    />
                </div>
            </div>
        </div>
    );
}

export default DegreeAudit;