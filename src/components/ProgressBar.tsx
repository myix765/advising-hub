import React from 'react';

interface ProgressBarProps {
    completed: number;
    inProgress: number;
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completed, inProgress, total }) => {
    const completedPercentage = (completed / total) * 100;
    const inProgressPercentage = (inProgress / total) * 100;

    return (
        <div className="w-full bg-slate-300 rounded-lg overflow-hidden h-2 flex">
            <div className="bg-[#53CD7C] h-5" style={{ width: `${completedPercentage}%` }}></div>
            <div className="bg-[#FAEB6A] h-5" style={{ width: `${inProgressPercentage}%` }}></div>
        </div>
    );
};

export default ProgressBar;