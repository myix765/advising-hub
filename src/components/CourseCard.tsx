import { useState } from 'react';

interface CourseCardProps {
  courseCode: string;
  courseName: string;
  instructor: string;
  time: string;
  location: string;
  description?: string;
  requirements?: string[];
  ratings?: {
    overall: number;
    difficulty: number;
  };
}

const CourseCard = ({ 
  courseCode, 
  courseName, 
  instructor, 
  time, 
  location,
  description = "No description available.",
  requirements = [],
  ratings = { overall: 0, difficulty: 0 }
}: CourseCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false); // New state to track if the course is added

  return (
    <div className="bg-white rounded-lg p-2.5 max-w-sm shadow-sm">
      {/* Always visible content */}
      <div className="flex justify-between items-start mb-0.5">
        <h2 className="text-sm font-semibold text-gray-900">
          {courseCode} {courseName}
        </h2>
      </div>
    
   

      <p className="text-xs text-gray-600 mb-0.5">{instructor}</p>
      <p className="text-xs text-gray-600 mb-0.5">{time}</p>
      <p className="text-xs text-gray-600 mb-2">{location}</p>
      {/* Conditionally visible content based on expansion state */}
      {!isExpanded ? (
        // Condensed view
        <div 
        onClick={() => setIsExpanded(true)}
        className="cursor-pointer"
        >
          <p className="text-xs text-gray-500">Learn more ↓</p>
        </div>
      ) : (
        // Expanded view
        <div>
          
          <div className="space-y-2">
            <div>
              <h3 className="text-xs font-medium text-gray-900">Course description</h3>
              <p className="text-xs text-gray-600">{description}</p>
            </div>
            
            <div>
              <h3 className="text-xs font-medium text-gray-900">Requirements</h3>
              <p className="text-xs text-gray-600">{requirements.join(', ')}</p>
            </div>
            
            <div>
              <div className="flex items-center">
                <span className="text-xs font-medium text-gray-900">Rate my Professor Reviews</span>
                <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="mt-0.5">
                <p className="text-xs text-gray-600">Overall: {ratings.overall}</p>
                <p className="text-xs text-gray-600">Difficulty: {ratings.difficulty}</p>
              </div>
            </div>

            <button 
              onClick={() => setIsExpanded(false)}
              className="text-xs text-gray-500 mt-1"
            >
              Learn less ↑
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;