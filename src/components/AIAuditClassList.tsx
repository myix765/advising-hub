import { AuditCourseProps } from "@/types/AIMessage";
import AIClassSlot from "./AIAuditClassSlot";

const AIAuditClassList: React.FC<AuditCourseProps[]> = ({ courseList }) => {
    return (
        <div className="grid grid-cols-1 gap-1.5 pb-4">
            {courseList && Array.isArray(courseList) && courseList.map((course) => (
                <AIClassSlot
                    courseCode={course.courseCode}
                    courseName={course.courseName}
                    attributes={course.attributes}
                    credits={course.credits}
                />
            ))}
        </div>
    );
}

export default AIAuditClassList;
