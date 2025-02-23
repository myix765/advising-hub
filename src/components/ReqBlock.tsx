import StatusIcon from "@/components/ReqStatus";
import ReqSlot from "@/components/ReqSlot";
import { ReqBlockProps } from "@/types/status";

const ReqBlock: React.FC<ReqBlockProps> = ({ totalCourses, coursesCompleted, creditType }) => {
    const renderedSlots = () => {
        return Array.from({ length: totalCourses }, (_, index) => (
            <ReqSlot 
                key={index} 
                // Implement later
                // isCompleted={index < coursesCompleted}
            />
        ));
    };
    
    return (
        <div className="flex flex-col border border-blue-300/60 gap-4 p-4 bg-white rounded-lg shadow">
            <div className="grid grid-cols-1 gap-2">
                <StatusIcon totalCourses={totalCourses} coursesCompleted={coursesCompleted} />
                <span className="text-gray-700">{creditType}</span>
                <span className="text-gray-400 text-sm pb-4">Insert blurb here</span>
                <div className="grid gap-2 grid-cols-2 gap-x-6 gap-y-4">
                    {renderedSlots()}
                </div>
            </div>
        </div>
    );
}

export default ReqBlock;