
const CalendarCourse = ({
    courseData
}: {
    courseData: CalendarCourseData
}) => {
    return (
        <div className="py-2 px-2 bg-violet-200 rounded-lg h-full overflow-hidden">
            <p className="text-[0.7rem]">{courseData.day} {courseData.startTime} - {courseData.endTime}</p>
            <p className="font-bold text-xs line-clamp-1">{courseData.courseName}</p>
            <p className="text-xs">{courseData.courseCode}-{courseData.section}</p>
        </div>
    )
}

export default CalendarCourse;