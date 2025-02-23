import StatusIcon from "@/components/ReqStatus";
import ReqSlot from "@/components/ReqSlot";
import ProgressBar from "./ProgressBar";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { KeyboardArrowDown } from "@mui/icons-material";


interface Course {
    courseCode: string;
    courseName: string;
    credits: number;
    status: string;
}

interface TotalCoursesProps {
    header: string;
    courses: Course[];
}

interface LocalReqBlockProps {
    totalCourses: TotalCoursesProps[];
    coursesCompleted: string[];
    coursesIP: string[];
    sectionTitle: string;
}

const ReqBlock: React.FC<LocalReqBlockProps> = ({ totalCourses, coursesCompleted, coursesIP, sectionTitle }) => {
    const renderedSlots = () => {
        return Array.isArray(totalCourses) ? totalCourses.map((section, index) => (
            <ReqSlot
                key={index}
                header={section.header}
                courses={section.courses}
                isCompleted={coursesCompleted}
                inProgress={coursesIP}
            />
        )) : null;
    };

    return (
        <div className="my-4">
            <Accordion
                sx={{
                    border: 1,
                    maxHeight: 'max-content',
                    borderRadius: '50%',
                    margin: '0.75em 0',
                    borderColor: 'rgba(0, 0, 0, 0.15)',
                    boxShadow: "none", '&:before': { display: 'none' },
                    padding: "0.5em"
                }}
                disableGutters>
                <AccordionSummary expandIcon={<KeyboardArrowDown sx={{ transform: 'translateY(0.35em)' }} />}
                    aria-controls="panel1-content"
                    id="panel1-header">
                    <div className="grid grid-cols-1">
                        <StatusIcon
                            totalCourses={totalCourses.reduce((acc, section) => acc + section.courses.length, 0)}
                            coursesCompleted={coursesCompleted.length} />
                        <Typography style={{ fontWeight: 'bold' }}>{sectionTitle}</Typography>
                    </div>
                </AccordionSummary>

                <AccordionDetails>
                    <div>
                        {renderedSlots()}
                    </div>
                </AccordionDetails>
                <Typography component="span">
                </Typography>
            </Accordion>
        </div>
    );
}

export default ReqBlock;