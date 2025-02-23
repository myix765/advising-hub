import { StatusProps, RequirementStatus } from '@/types/status';
import { useState, useEffect } from 'react';

const StatusIcon: React.FC<StatusProps> = ({ totalCourses, coursesCompleted }) => {
    const [bgColor, setBgColor] = useState<string>("");
    const [status, setStatus] = useState<RequirementStatus>(RequirementStatus.IN_PROGRESS);

    // console.log(totalCourses, coursesCompleted)

    useEffect(() => {
        const remaining = totalCourses - coursesCompleted;

        switch (remaining) {
            case 0:
                setBgColor("bg-green-400");
                setStatus(RequirementStatus.COMPLETED);
                break;
            case totalCourses:
                setBgColor("bg-rose-400");
                setStatus(RequirementStatus.NOT_STARTED);
                break;
            default:
                setBgColor("bg-amber-300");
                setStatus(RequirementStatus.IN_PROGRESS);
                break;
        }
    }, [totalCourses, coursesCompleted]); // Only run when these props change

    // bg-lime-400 = completed
    // bg-rose-600 = not started
    // bg-amber-300 = in progress

    return (
        <div className="flex items-center gap-2 text-xs">
            <div className={`w-2 h-2 rounded-full ${bgColor}`}></div>
            <span>{status}</span>
        </div>
    );
}

export default StatusIcon;