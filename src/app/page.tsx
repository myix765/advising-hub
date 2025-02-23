"use client";

import dynamic from 'next/dynamic';
import { useState } from 'react';
import Schedule from '@/app/components/Schedule'
import { CourseData } from '@/util/types';

const AISidebar = dynamic(() => import('../components/AISidebar'), {
  ssr: false,
});

export default function Home() {
  const [editorContent, setEditorContent] = useState('');

  const handleUpdateContent = (content: string) => {
    setEditorContent(content);
  };

  const sampleCourses: CourseData[] = [
    {
      "courseCode": "CS-0135",
      "courseName": "Introduction To Machine Learning And Data Mining",
      "description": "An overview of methods whereby computers can learn from data or experience and make decisions accordingly. Topics include supervised learning, unsupervised learning, reinforcement learning, and knowledge extraction from large databases with applications to science, engineering, and medicine.\nRecommendations: CS 160 is highly recommended.",
      "sections": [
        {
          "section": "01-LEC",
          "classNo": "22633",
          "classTime": "Tu, Th 12:00PM - 1:15PM",
          "location": "Barnum Dana Complex, Room LL08",
          "session": "Regular",
          "faculty": "Michael C. Hughes",
          "credits": "3",
          "status": ""
        }
      ]
    },
    {
      "courseCode": "CS-0165",
      "courseName": "Probability",
      "description": "Probability, conditional probability, random variables and distributions, expectation, special distributions, joint distributions, laws of large numbers, and the central limit theorem.\nPrerequisite: MATH 34 or graduate standing.",
      "sections": [
        {
          "section": "01-LEC",
          "classNo": "21775",
          "classTime": "Tu, Th 3:00PM - 4:15PM",
          "location": "Joyce Cummings Center, 260",
          "session": "Regular",
          "faculty": "David Smyth",
          "credits": "4",
          "status": ""
        }
      ]
    },
    {
      "courseCode": "EE-0024",
      "courseName": "Probabilistic Systems Analysis",
      "description": "Development of analytical tools for the modeling and analysis of random phenomena with application to problems across a range of engineering and applied science disciplines. Probability theory, sample and event spaces, discrete and continuous random variables, conditional probability, expectations and conditional expectations, and derived distributions. Sums of random variables, moment generating functions, central limit theorem, laws of large numbers. Statistical analysis methods including hypothesis testing, confidence intervals and nonparametric methods. Undergraduates may not take both EE 0024 and EE 0104 for degree credit.\nPrerequisite: Math 0042 or equivalent",
      "sections": [
        {
          "section": "01-LEC",
          "classNo": "22516",
          "classTime": "Tu, Th 10:30AM - 11:45AM",
          "location": "Anderson Wing TTC, Room 211",
          "session": "Regular",
          "faculty": "Mai Vu",
          "credits": "3",
          "status": ""
        }
      ]
    }
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <Schedule courseList={sampleCourses} />
      {/* AI Sidebar */}
      <aside className="w-80 border-l border-gray-200 bg-white">
        <AISidebar onUpdateContent={handleUpdateContent} />
      </aside>
    </div>
  );
}
