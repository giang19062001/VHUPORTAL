export interface ISubject {
    ID: number,
    NAME: string;
    MAJOR: number,
    CREDIT: number
  }
  export interface ISubjectJoin {
    ID: number,
    NAME: string;
    MAJOR: string,
    CREDIT: number
  }
  export type ISubjectResponse = ISubject[]  
  export type ISubjectResponseJoin = ISubjectJoin[]

  export interface IMajor {
    ID: number,
    NAME: string;
    CHAR: string
  }

  export type IMajorResponse = IMajor[]