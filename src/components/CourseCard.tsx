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
  const [isConfirmed, setIsConfirmed] = useState(false); // Tracks if the course is "added"

  // Minimal confirmed view: show course info on the left and a green check on the right.
  if (isConfirmed) {
    return (
      <div className="mb-4 text-xs bg-white rounded-3xl p-4 px-5 mx-1.5 border border-slate-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-full p-1 flex items-center justify-center">
              <svg className="text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 6L9 17l-5-5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-xs font-semibold text-gray-900 ml-2">
              {courseCode} {courseName}
            </h2>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => setIsConfirmed(false)}
              className="w-6 h-4 rounded-full text-xs text-red-500 border border-red-500 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Regular card view (not confirmed)
  return (
    <div className='mx-4'>
      <div className="bg-white rounded-3xl p-4 px-5 max-w-sm border border-slate-300">
        {/* Always visible: course code and name */}
        <div className="flex justify-between items-start mb-0.5">
          <h2 className="text-sm font-semibold text-gray-900">
            {courseCode} {courseName}
          </h2>
        </div>
        <p className="text-xs text-gray-600 mb-0.5">{instructor}</p>
        <p className="text-xs text-gray-600 mb-0.5">{time}</p>
        <p className="text-xs text-gray-600 mb-2">{location}</p>

        {/* Expanded content */}
        {!isExpanded ? (
          <div onClick={() => setIsExpanded(true)} className="cursor-pointer">
            <p className="text-xs text-gray-500 flex items-center justify-end cursor-pointer pt-3 mb-[-5px]">
              Learn more
              <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </p>
          </div>
        ) : (
          <div>
            <div className="space-y-2">
              <div className='w-12 h-1 rounded-full bg-slate-200'>&nbsp;</div>
              <div>
                <h3 className="mt-4 mb-1 text-xs font-bold text-gray-900">Course description</h3>
                <p className="text-xs text-gray-600">{description}</p>
              </div>
              <div>
                <h3 className="mt-4 mb-1 text-xs font-bold text-gray-900">Requirements</h3>
                <p className="text-xs text-gray-600">{requirements.length > 0 ? requirements.join(', ') : 'None'}</p>
              </div>
              <div>
                <div className="mt-4 mb-1 flex items-center cursor-pointer" onClick={() => window.location.href = 'https://www.ratemyprofessors.com/'}>
                  <span className="text-xs text-gray-900 font-bold underline underline-offset-2">Rate my Professor Reviews</span>
                  <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="mt-0.5">
                  <p className="text-xs text-gray-600">Overall: {ratings.overall}</p>
                  <p className="text-xs text-gray-600">Difficulty: {ratings.difficulty}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-xs text-gray-500 mt-1 flex items-center cursor-pointer"
                >
                  Learn less
                  <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M18 15l-6-6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add button */}
        {/* <div className="mt-2 flex justify-end">
          <button
            onClick={() => setIsConfirmed(true)}
            className="px-4 py-2 text-white bg-lime-500 rounded-full hover:bg-green-600 transition-colors"
          >
            Add
          </button>
        </div> */}
      </div>
      <div className="flex justify-between mt-2 mb-4 text-xs">
        <button
          className="border px-4 py-2 rounded-full flex-1 mx-1 text-white bg-indigo-500"
          onClick={() => setIsConfirmed(true)}>Add Course</button>
        <button className="border px-4 py-2 rounded-full flex-1 mx-1 bg-slate-100">Cancel</button>
      </div>
    </div>
  );
};

export default CourseCard;
