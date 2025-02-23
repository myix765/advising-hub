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