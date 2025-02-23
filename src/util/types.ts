type SectionData = {
    section: string,
    classNo: string,
    classTime: string,
    location: string,
    session: string,
    faculty: string,
    credits: string,
    status: string
}

export type CourseData = {
    courseCode: string,
    courseName: string,
    description: string,
    sections: SectionData[]
}

export type TermCourses = {
    courseCode: string,
    section: string,
}

export type CalendarCourseData = {
    courseCode: string,
    courseName: string,
    description: string,
    section: string,
    classNo: string,
    day: string,
    startTime: string,
    endTime: string,
    location: string,
    session: string,
    faculty: string,
    credits: string,
    status: string
}