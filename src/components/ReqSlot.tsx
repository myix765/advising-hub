import React from 'react';

interface Course {
    courseCode: string;
    courseName: string;
    credits: number;
    status: string;
}

interface TotalCoursesProps {
    header: string;
    courses: Course[];
    isCompleted: string[];
    inProgress: string[];
}

const ReqSlot: React.FC<TotalCoursesProps> = ({ header, courses, isCompleted, inProgress }) => {

    return (
        <div className='mb-4 text-xs'>
            <h2 className='mb-1'>{header}</h2>
            <ul>
                {courses.map((course, index) => (
                    <li key={index} className='flex items-center'>
                        {
                            isCompleted.includes(course.courseCode) ? (
                                <div className="w-2 h-2 bg-green-500 rounded-full p-1 flex items-center justify-center">
                                    <svg className="text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M20 6L9 17l-5-5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            ) : inProgress.includes(course.courseCode) ? (
                                <div className="w-2 h-2 bg-yellow-500 rounded-full p-1 flex items-center justify-center">
                                    <svg className="text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M20 6L9 17l-5-5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            ) : (
                                <div className="w-2 h-2 border border-gray-500 rounded-full p-1 flex items-center justify-center">
                                    <svg className="text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <circle cx="12" cy="12" r="10" strokeWidth="4" />
                                    </svg>
                                </div>
                            )
                        }
                        <label
                            className={`ml-2 ${isCompleted.includes(course.courseCode) ? "text-gray-400" : "text-black"}`}
                        >{course.courseCode}: {course.courseName}</label>
                    </li>
                ))
                }
            </ul >
        </div >
    );
}

export default ReqSlot;