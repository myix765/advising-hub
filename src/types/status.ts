export enum RequirementStatus {
    COMPLETED = 'Completed',
    IN_PROGRESS = 'In Progress',
    NOT_STARTED = 'Not Started'
}

export interface StatusProps {
    totalCourses: number;
    coursesCompleted: number;
}

export interface ReqBlockProps extends StatusProps {
    creditType: string;
}