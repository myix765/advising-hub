import { AuditCourseProps } from "@/types/AIMessage";
import { useState, useCallback } from "react";

interface AIClassSlotProps extends AuditCourseProps {
    onToggle?: (course: AuditCourseProps, isSelected: boolean) => void;
}

const AIClassSlot: React.FC<AIClassSlotProps> = ({ courseCode, courseName, attributes, credits, onToggle }) => {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [bgColor, setBgColor] = useState<string>("bg-white");
    const [textColor, setTextColor] = useState<string>("text-black");
    const [hoverBgColor, setHoverBgColor] = useState<string>("hover:bg-slate-300");

    const toggleSelection = useCallback(() => {
        const newState = !isSelected;
        setIsSelected(newState);

        // Update styles based on selection state
        setBgColor(newState ? "bg-indigo-600" : "bg-white");
        setTextColor(newState ? "text-white" : "text-black");
        setHoverBgColor(newState ? "hover:bg-indigo-700" : "hover:bg-slate-300");

        // Notify parent component if callback exists
        if (onToggle) {
            onToggle({
                courseCode, courseName, attributes, credits,
            }, newState);
        }
    }, [isSelected, onToggle, courseCode, courseName, attributes, credits]);

    return (
        <button
            className={`rounded-full ${hoverBgColor} ${bgColor} ${textColor} py-2 px-5 text-left w-full ${isSelected ? "font-bold" : ""}`}
            onClick={toggleSelection}
        >
            {courseCode} {courseName}
        </button>
    );
}

export default AIClassSlot;
