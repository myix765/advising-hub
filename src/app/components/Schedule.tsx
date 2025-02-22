"use client"

import { useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Course from './Course'

const Schedule = ({term}: {term: string}) => {
    const days = ["Hours", "MON", "TUES", "WED", "THURS", "FRI"]
    const [version, setVersion] = useState("1")

    const sampleCourses = [
        {
            "courseCode": "ANTH-0028",
            "courseName": "The Anthropology of Capitalism",
            "description": "Anthropology of labor and economy examining capitalism as a complex, diverse, and historically-specific sociocultural period. Topics include industrial labor and exploitation; the development of the commodity form; exchange, debt, and the history of markets; global finance and de-industrialization; transformation and resilience of distinct cultures around the globe; environmental extraction; and post-capitalist movements and practices. Course materials are drawn from around the globe to illustrate the many forms of capitalism operating today.",
            "sections": [
                {
                    "section": "01-LEC",
                    "classNo": "23445",
                    "schedule": "Tu, Th 10:30AM - 11:45AM",
                    "location": "Tu, Th 10:30AM - 11:45AM",
                    "session": "Lane Hall, Room 100",
                    "faculty": "Alex Blanchette",
                    "credits": "3",
                    "status": ""
                },
                {
                    "section": "02-LEC",
                    "classNo": "25304",
                    "schedule": "Time Not Specified",
                    "location": "Time Not Specified",
                    "session": "TBA",
                    "faculty": "Alex Blanchette",
                    "credits": "3",
                    "status": ""
                }
            ]
        },
        {
            "courseCode": "AAST-0193",
            "courseName": "Independent Study",
            "description": "Upon consent of the director of the minor, a student may design an independent study to be guided by the director or a faculty member associated with the minor.",
            "sections": [
                {
                    "section": "01-IND",
                    "classNo": "23562",
                    "schedule": "Time Not Specified",
                    "location": "Time Not Specified",
                    "session": "TBA",
                    "faculty": "STAFF",
                    "credits": "3",
                    "status": ""
                }
            ]
        },
        {
            "courseCode": "ACL-0013",
            "courseName": "RISE seminar",
            "description": "Redefining the Image of Science and Engineering (RISE) is a first-year advising class designed to give first-year science and engineering students the opportunity to participate in academic- and college-life workshops where you will not only be supported in your transition to college but also exposed to faculty research and professional networking. It is also an amazing opportunity to join a community of peers with similar backgrounds, and to network with many people on the Tufts campus and beyond.",
            "sections": [
                {
                    "section": "01-LEC",
                    "classNo": "21874",
                    "schedule": "Tu, Th 3:00PM - 4:15PM",
                    "location": "Tu, Th 3:00PM - 4:15PM",
                    "session": "Eaton Hall, 211",
                    "faculty": "Grace Marie Festin Caldara, Sehba M. Hasan, Tara Zantow",
                    "credits": "2",
                    "status": ""
                }
            ]
        }
    ]

    const handleChangeVersion = (event: SelectChangeEvent) => {
        setVersion(event.target.value);
    };
    
    return (
        <div className="flex flex-col p-8">
            <div className="flex justify-between">
                <div className="flex">
                    <button><MdArrowBackIos /></button>
                    <h1 className="text-left m-8 text-xl">{term}</h1>
                    <button><MdArrowForwardIos /></button>
                </div>

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        value={version}
                        onChange={handleChangeVersion}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="1">Version 1</MenuItem>
                        <MenuItem value="2">Version 2</MenuItem>
                        <MenuItem value="3">Version 3</MenuItem>
                        <MenuItem value="4">Version 4</MenuItem>
                    </Select>
                </FormControl>
                
            </div>

            <div className="grid grid-cols-[1fr_repeat(5,_3fr)] max-w-full">
                {/* schedule layout */}
                {days.map(day => (
                    <div key={day}>
                        <h1 className={`py-2 px-4 border-none ${day === "Hours" ? "invisible" : "text-center"}`}>{day}</h1>
                        <div className={`${day !== "Hours" && "border-r-1 border-gray-300"}`}>
                            <div className="h-12"></div>
                            {day === "Hours" ? <div className="grid-rows-14 text-right pr-[1.125rem]">
                                {[...Array(14).keys()].map(i => (
                                    <div key={i} className="leading-none h-16">{(i + 8) % 12 || 12}{i + 8 < 12 ? " AM" : " PM"}</div>
                                ))}
                            </div> : <div className="grid-rows-56">
                                {[...Array(56).keys()].map(i => (
                                    <div key={i} className={`${i % 4 == 0 && "border-t-1 border-gray-300"} h-4`}></div>
                                ))}
                            </div>}
                        </div>
                    </div>
                ))}
            </div>
            {/* putting classes in schedule */}
            {sampleCourses.map(course => {
                const sectionsList = course.sections.map(section => ({
                    courseCode: course.courseCode,
                    courseName: course.courseName,
                    description: course.description,
                    section: section.section,
                    classNo: section.classNo,
                    schedule: section.schedule,
                    location: section.location,
                    session: section.session,
                    faculty: section.faculty,
                    credits: section.credits,
                    status: section.status
                }))
                console.log(sectionsList)
                return <div key={course.courseCode}></div>;
            })}
        </div>
    )
}

export default Schedule;