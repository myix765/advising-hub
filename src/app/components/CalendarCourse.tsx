
type CalendarCourseData = {
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

const CalendarCourse = ({
    courseData
}: {
    courseData: CalendarCourseData
}) => {
    return (
        <div className="py-2 px-2 bg-violet-200 rounded-lg h-full">
            <p className="text-xs">{courseData.day} {courseData.startTime} - {courseData.endTime}</p>
            <p className="font-bold text-xs">{courseData.courseName}</p>
            <p className="text-xs">{courseData.courseCode}-{courseData.section}</p>
        </div>
    )
}

export default CalendarCourse;