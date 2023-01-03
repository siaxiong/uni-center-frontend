export namespace Auth_Types {
    export type CredentialsContext = {
        credentials: Credentials,
        setCredentials: SetCredentials
    }

    export type Credentials = {
        userRecord: UserRecord,
        tokens: Tokens
        professorCourse: ProfessorCourseRecord[]
    };

    export type UserRecord = {
        id: string,
        name: string,
        email: string,
        role: string,
        enrollmentStatus: "Accepted" | "Rejected" | "Pending",
    }

    export type Tokens = {
        idToken: string,
        accessToken: string,
        refreshToken: string,
        expiresIn?: number,
        tokenType?: string
    }

    export type CourseRecord = {
        id: string,
        name: string,
        description: string
    }

    export type ProfessorCourseRecord = {
        id: string
        professorId: string,
        professorCourseId?: string
        courseId: string,
        course: CourseRecord
        user: UserRecord,
    }

    export type StudentCourseRecord = {
        studentCourseId:string
        professorCourse: {
            professorCourseId: string;
            courseName: string;
            courseDescription: string;
            professorName: string;
        }
    }

    export type ModifiedStudentCourseRecord = {
        studentCourseId: string;
        professorCourse: {
            professorCourseId: string;
            courseName: string;
            courseDescription: string;
            professorName: string;
        }
    }

    export type AssignmentRecord = {
        id: string
        pdfId: string
        pdfName: string
        pointsWorth: string
        name: string
        description: string
        assigned_date: string
        due_date: string
        professorCourseId: string
    }

    export type AssignmentSubmission = {
        id: string,
        name: string,
        description: string,
        pointsEarned: string,
        pdfId: string,
        studentCourseId: string
    }

    export type SetCredentials = ((userData: Credentials)=>void )| null;

    export interface RegisterData {
        email: string,
        password: string,
        name: string,
        role: string,
    }

    export type CardItemType = {
        name: string,
        pagePath: string,
        id?: string
    }



}