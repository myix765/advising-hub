export interface Section {
    section: string;    // e.g. "01-IND"
    classNo: string;    // e.g. "23562"
    schedule: string;   // e.g. "Time Not Specified"
    location: string;   // e.g. "TBA"
    session: string;    // e.g. "Medford/Somerville"
    instructor: string; // e.g. "STAFF"
    credits: string;    // e.g. "3"
    status: string;     // e.g. "open"
}

export interface Course {
    courseCode: string;   // e.g. "AAST-0193"
    courseName: string;   // e.g. "Independent Study"
    description: string;  // e.g. "Upon consent of the director..."
    sections: Section[];
} 