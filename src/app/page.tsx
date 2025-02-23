
import Schedule from "@/app/components/Schedule"
import { CourseData } from "@/util/types";

export default function Home() {
  const sampleCourses: CourseData[] = [
    {
      "courseCode": "CS-0114",
      "courseName": "Network Security",
      "description": "Vulnerabilities, attacks, and mitigations at all layers of the network\nstack. Public and private key cryptography, confidentiality and\nauthentication protocols, botnets, firewalls, intrusion detection\nsystems, and communication privacy and anonymity.\nRecommendations: CS 40.",
      "sections": [
        {
          "section": "01-LEC",
          "classNo": "22716",
          "classTime": "Tu, Th 12:00PM - 1:15PM",
          "location": "Tu, Th 12:00PM - 1:15PM",
          "session": "Joyce Cummings Center, 180",
          "faculty": "Daniel Jared Votipka",
          "credits": "3",
          "status": ""
        }
      ]
    },
    {
      "courseCode": "CS-0115",
      "courseName": "Database Systems",
      "description": "Fundamental concepts of database systems, including conceptual design, relational and object-oriented data models, query languages (SQL, QBE), and implementation issues (indexing, transaction processing, concurrent control). The concepts and algorithms covered encompass many of those used in commercial and experimental database systems. Other topics include distributed databases and distributed query processing.\nRecommendations: CS 40",
      "sections": [
        {
          "section": "01-LEC",
          "classNo": "22846",
          "classTime": "Mo 7:00PM - 8:30PM",
          "location": "Joyce Cummings Center, 270",
          "session": "Regular",
          "faculty": "Cody Doucette",
          "credits": "3",
          "status": ""
        },
        {
          "section": "M1-LEC",
          "classNo": "22890",
          "classTime": "Tu 7:00PM - 8:30PM",
          "location": "Online",
          "session": "Regular",
          "faculty": "Cody Doucette",
          "credits": "3",
          "status": ""
        }
      ]
    },
    {
      "courseCode": "CS-0116",
      "courseName": "Introduction to Security",
      "description": "A holistic and broad perspective on cyber security. Attacking and defending networks, cryptography, vulnerabilities, reverse engineering, web security, static and dynamic analysis, malware, forensics. Principles illustrated through hands-on labs and projects, including Capture The Flag (CTF) games.",
      "sections": [
        {
          "section": "01-LEC",
          "classNo": "22630",
          "classTime": "Tu, Th 4:30PM - 5:45PM",
          "location": "Joyce Cummings Center, 270",
          "session": "Regular",
          "faculty": "Ming Yan Chow",
          "credits": "3",
          "status": ""
        },
        {
          "section": "M1-LEC",
          "classNo": "22891",
          "classTime": "We 5:30PM - 7:00PM",
          "location": "Online",
          "session": "Regular",
          "faculty": "Ming Yan Chow",
          "credits": "3",
          "status": ""
        }
      ]
    }
  ]

  return (
    <Schedule courseList={sampleCourses} />
  );
}
