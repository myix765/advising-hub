import { AuditCourseProps } from "@/types/AIMessage";
import AIClassSlot from "./AuditClassSlot";

const AIAuditClassList: React.FC<{ courseList: AuditCourseProps[], onFinishSelecting: () => void }> = ({ courseList, onFinishSelecting }) => {
    return (
        <div className="flex justify-center text-xs">
            <div>
                <div className="grid grid-cols-1 gap-1.5 p-4 px-6 border border-gray-200 rounded-3xl mx-2">
                    {courseList && Array.isArray(courseList) && courseList.map((course) => (
                        <AIClassSlot
                            key={course.courseCode}
                            courseCode={course.courseCode}
                            courseName={course.courseName}
                            attributes={course.attributes}
                            credits={course.credits}
                            name={undefined} />
                    ))}
                </div>
                <div className="flex justify-between mt-3 mx-2">
                    <button 
                        className="border px-4 py-2 rounded-full flex-1 mx-1 text-white bg-indigo-500"
                        onClick={onFinishSelecting}
                        >
                        Finished selecting</button>
                    <button className="border px-4 py-2 rounded-full flex-1 mx-1 bg-slate-100">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default AIAuditClassList;
