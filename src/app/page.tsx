"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Schedule from '@/app/components/Schedule'
import { CourseData, TermCourses } from '@/util/types';
import ScheduleNav from './components/ScheduleNav';

const AISidebar = dynamic(() => import('../components/AISidebar'), {
  ssr: false,
});

export default function Home() {
  const [editorContent, setEditorContent] = useState('');
  const [scheduleVer, setScheduleVer] = useState("1");
  const terms = ["Fall 2023", "Spring 2024", "Fall 2024", "Spring 2025"];
  const [currTermIndex, setCurrTermIndex] = useState(terms.length - 1);
  const [courseList, setCourseList] = useState<CourseData[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<CourseData[]>([]);
  const [termCourses, setTermsCourses] = useState<TermCourses[][]>([]);
  const [scheduleVersList, setScheduleVerList] = useState<TermCourses[][]>([])

  const handleUpdateContent = (content: string) => {
    setEditorContent(content);
  };

  // load json of courses
  useEffect(() => {
    fetch("/SP25_courses.json")
      .then((res) => res.json())
      .then((json) => setCourseList(json))
      .catch((err) => console.error("Error fetching data:", err));
    fetch("/past_term_course_info.json")
      .then((res) => res.json())
      .then((json) => setTermsCourses(json))
      .catch((err) => console.error("Error fetching data:", err));
    fetch("/curr_term_schedule_versions.json")
      .then((res) => res.json())
      .then((json) => setScheduleVerList(json))
      .catch((err) => console.error("Error fetching data:", err));
  }, [])

  // load selected courses for past terms
  useEffect(() => {
    handleChangeTerm(currTermIndex);
  }, [currTermIndex])

  useEffect(() => {

  }, [])

  const handleChangeTerm = (newTermIndex: number) => {
    console.log(newTermIndex)
    if (newTermIndex < 0 || newTermIndex > terms.length - 1) {
      return;
    }
    setCurrTermIndex(newTermIndex);

    if (newTermIndex === terms.length - 1) {
      setSelectedCourses([])
    } else {
      // get past term schedules
      console.log(termCourses)
      const query = termCourses[newTermIndex];
      console.log(query)
      setSelectedCourses(courseList.filter(course =>
        query.some(queryItem =>
          course.courseCode === queryItem.courseCode &&
          course.sections.some(section => section.section === queryItem.section)
        )
      ));
    }
  }

  if (!courseList || courseList.length == 0 || !termCourses || termCourses.length == 0) {
    return <></>
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className='flex flex-col m-8'>
        <ScheduleNav
          terms={terms}
          version={scheduleVer}
          setVersion={setScheduleVer}
          currTermIndex={currTermIndex}
          handleChangeTerm={handleChangeTerm} />
        <Schedule
          courseList={selectedCourses}
          selectedClassSections={currTermIndex !== terms.length - 1 ? termCourses[currTermIndex] : []} />
      </div>
      {/* AI Sidebar */}
      <aside className="w-80 border-l border-gray-200 bg-white">
        <AISidebar onUpdateContent={handleUpdateContent} />
      </aside>
    </div>
  );
}
