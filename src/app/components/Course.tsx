type courseSection = {
    section: string,
    courseNo: string,
    schedule: string,
    location: string,
    session: string,
    faculty: string,
    credits: string,
    status: string
}

type CourseData = {
    courseCode: string,
    courseName: string,
    description: string,
    section: courseSection
}

const Course = ({
    courseData
}: {
    courseData: CourseData
}) => {
    return (
        <div className="py-2 px-1">
            <p>{courseData.section.schedule}</p>
            <p className="font-bold">{courseData.courseName}</p>
            <p>{courseData.courseCode}</p>
        </div>
    )
}

export default Course;