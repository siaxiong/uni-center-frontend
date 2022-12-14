export namespace Auth_Types {
    export type CredentialsContext = {
        credentials: Credentials,
        setCredentials: SetCredentials
    }


    export type Credentials = {
            userRecord: UserRecord,
            tokens: Tokens
    };

    export type UserRecord = {
        id: string,
        name: string,
        email: string,
        role: string,
        enrollmentStatus: string,
    }

    export type Tokens = {
        idToken: string,
        accessToken: string,
        refreshToken: string,
        expiresIn?: number,
        tokenType?: string
    }
    export type SetCredentials = ((userData: Credentials)=>void )| null;

    export interface RegisterData {
        email: string,
        password: string,
        name: string,
        role: string,
    }

    export type CardArrayType = {
        name: string,
        pagePath: string
    }[]



}