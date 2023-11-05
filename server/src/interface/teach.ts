export interface ITeach {
    ID: number,
    CREDIT:number,
    SUBJECT: string;
    TEACHER: string;
    CLASS: string;
    SEMETER: string;
    MAJOR: string;
    DAY: string;
    SESSION: string;

  }
  export interface ISignTeach {
    ID:number,
    CREDIT:number,
    C_TIME: string,
    STUDENT: string,
    TEACH: number,
    PAY: string,
    SUBJECT: string;
    TEACHER: string;
    CLASS: string;
    SEMETER: string;
    MAJOR: string;
    DAY: string;
    SESSION: string;

  }

  export interface ISignTeachOfTeacher {
   SEMETER: string,
   YEAR:string,
   TEACHER:string,
   SUBJECT:string;
  NUMBER_STUDENT:number;

  }
  export interface ISignTeachPost {
    teach: number,
    student: string;
  }

  export interface ISignTeachOfTeacherAndSubjectPost {
    teacher: string,
    subject: string;
  }
  export interface ISignTeachOfTeacherAndSubject {
    EMAIL: string,
    NAME: string;
    AVATAR: string;
    TEACHER:string;
    SUBJECT:string;
    BIRTHDAY:string;
  }
  export type ITeachResponse = ITeach[]
  export type ISignTeachResponse = ISignTeach[]
  export type ISignTeachOfTeacherResponse = ISignTeachOfTeacher[]
  export type ISignTeachOfTeacherAndSubjectResponse = ISignTeachOfTeacherAndSubject[]

  export interface ISemeter {
    ID: number,
    NAME: string;
    YEAR: string;
    ON: string;
  }
  export type ISemeterResponse = ISemeter[]
