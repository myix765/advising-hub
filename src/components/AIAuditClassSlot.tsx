import { AuditCourseProps } from "@/types/AIMessage";
import { useState } from "react";

interface AIClassSlotProps extends AuditCourseProps {
    onToggle?: (course: AuditCourseProps, isSelected: boolean) => void;
}

const AIClassSlot: React.FC<AIClassSlotProps> = ({ courseCode, courseName, attributes, credits, onToggle }) => {
    const [isSelected, setIsSelected] = useState<boolean>(false);

    const toggleSelection = () => {
        const newState = !isSelected;
        setIsSelected(newState);

        // Update styles based on selection state
        if (newState) {
            // Selected state
            setBgColor("bg-indigo-800");
            setTextColor("text-white");
            setHoverBgColor("hover:bg-indigo-900");
        } else {
            // Unselected state
            setBgColor("bg-white");
            setTextColor("text-black");
            setHoverBgColor("hover:bg-slate-300");
        }

        // Notify parent component if callback exists
        if (onToggle) {
            onToggle({ courseCode, courseName, attributes, credits }, newState);
        }
    };

    const [bgColor, setBgColor] = useState<string>("bg-white");
    const [textColor, setTextColor] = useState<string>("text-black");
    const [hoverBgColor, setHoverBgColor] = useState<string>("hover:bg-slate-300");

    return (
        <button
            className={`rounded ${hoverBgColor} ${bgColor} ${textColor} py-2 px-4 text-left w-full`}
            onClick={toggleSelection}
        >
            <span className="font-bold">{courseCode}</span>
            <span className="pl-2">{courseName}</span>
        </button>
    );
}

export default AIClassSlot;