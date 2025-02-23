"use client"

import React, { useEffect, useState } from "react";
import CalendarCourse from './CalendarCourse'
import { CourseData, TermCourses, CalendarCourseData } from "@/util/types";

const Schedule = ({
    courseList,
    selectedClassSections,
}: {
    courseList: CourseData[],
    selectedClassSections: TermCourses[]
}) => {
    const days = ["Hours", "MON", "TUE", "WED", "THU", "FRI"]
    const [formattedCourses, setFormattedCourses] = useState<CalendarCourseData[]>([])

    // schedule grid dimensions
    const rows = 14;
    const cols = 5;
    const cells = Array.from({ length: rows * cols });

    const calcRowStart = (startTime: string): number => {
        const startTimeHourMin = startTime.split(":");
        const hour = parseInt(startTimeHourMin[0]) % 12 + (startTimeHourMin[1].slice(-2) === "PM" ? 12 : 0);
        const minutes = parseInt(startTimeHourMin[1].slice(0, 2))
        return ((hour * 4 - 26) + Math.floor(minutes / 15));
    }

    const calcRowEnd = (startTime: string): number => {
        const endTimeHourMin = startTime.split(":");
        const hour = parseInt(endTimeHourMin[0]) % 12 + (endTimeHourMin[1].slice(-2) === "PM" ? 12 : 0);
        const minutes = parseInt(endTimeHourMin[1].slice(0, 2))
        return ((hour * 4 - 26) + Math.floor(minutes / 15));
    }

    const splitSections = (courses: CourseData[]) => {
        return courses.flatMap(course =>
            course.sections
                // extract only desired sections
                .filter(section =>
                    selectedClassSections.some(tc =>
                        tc.courseCode === course.courseCode && tc.section === section.section
                    )
                )
                .map(section => ({
                    courseCode: course.courseCode,
                    courseName: course.courseName,
                    description: course.description,
                    section: section.section,
                    classNo: section.classNo,
                    classTime: section.classTime,
                    location: section.location,
                    session: section.session,
                    faculty: section.faculty,
                    credits: section.credits,
                    status: section.status
                }))
        );
    }

    // const extractSpecificSections = (courses: ClassSections[]) => {
    //     return courses.
    // }

    type ClassSections = {
        courseCode: string;
        courseName: string;
        description: string;
        section: string;
        classNo: string;
        classTime: string;
        location: string;
        session: string;
        faculty: string;
        credits: string;
        status: string;
    }

    const splitClassTimes = (courses: ClassSections[]) => {
        return courses.flatMap(course => {
            if (course.classTime === "Time Not Specified") {
                return [];
            }

            const days = course.classTime.split(", ").flatMap(day => {
                return [day.substring(0, 2).trim(), day.substring(2, day.length).trim()].filter(str => str !== "");
            });
            return days.map((day, index) => {
                if (index !== days.length - 1) {
                    const { classTime, ...rest } = course;
                    return {
                        ...rest,
                        day,
                        startTime: days[days.length - 1].split(" - ")[0],
                        endTime: days[days.length - 1].split(" - ")[1]
                    };
                }
                return null;
            }).filter((course) => course !== null);
        })
    }

    // splits sections and different days into individual classes
    useEffect(() => {
        console.log(courseList)
        const splittedSections = splitSections(courseList);
        console.log(splittedSections)
        // extract specific sections

        const splittedClassTimes = splitClassTimes(splittedSections);
        setFormattedCourses(splittedClassTimes ?? []);
    }, [courseList])

    return (
        <div className={`grid grid-cols-[1fr_repeat(5,_3fr)] grid-rows-[auto_repeat(60,1rem)] max-w-full box-border pr-8`}>
            {/* display days */}
            {days.map(day => (
                <React.Fragment key={day}>
                    <h1 className={`row-start-1 py-2 px-4 border-none ${day === "Hours" ? "invisible" : "text-center"}`}>{day}</h1>
                </React.Fragment>
            ))}
            {/* add empty space in first row to get grid lines */}
            {[...Array(5).keys()].map(i => (
                <div key={i} className={`row-start-3 row-span-3 border-gray-300 ${i !== 4 && "border-r-1"}`} style={{
                    gridColumn: `${i + 2}`
                }}></div>
            ))}
            {/* display the hours */}
            {[...Array(14).keys()].map(i => (
                <div
                    key={i}
                    className={`leading-none row-span-2 col-start-1 col-span-1 place-self-center`}
                    style={{
                        gridRowStart: `${i * 4 + 5}`
                    }}
                >{(i + 8) % 12 || 12}{i + 8 < 12 ? " AM" : " PM"}
                </div>
            ))}
            {/* add empty divs in each cell to get grid lines */}
            {cells.map((_, index) => (
                <div
                    key={index}
                    className={`border-gray-300 h-16 row-span-4 border-t-1 ${(index % 5) !== 4 && "border-r-1"}`}
                    style={{
                        gridColumnStart: `${(index % 5) + 2}`,
                        gridRowStart: `${Math.floor(index / 5) * 4 + 6}`,
                    }}
                ></div>
            ))}
            {/* putting classes in schedule */}
            {formattedCourses.map((course, index) => {
                const colStart = 1 + days.findIndex(day => day.slice(0, 2).toLowerCase() === course.day.toLowerCase())
                const rowStart = calcRowStart(course.startTime)
                const rowEnd = calcRowEnd(course.endTime);
                return <div key={index} className={`z-10 m-0.5`} style={{
                    gridColumnStart: `${colStart}`,
                    gridRowStart: `${rowStart}`,
                    gridRowEnd: `${rowEnd}`
                }}>
                    <CalendarCourse courseData={course} />
                </div>
            })}
        </div>
    )
}

export default Schedule;