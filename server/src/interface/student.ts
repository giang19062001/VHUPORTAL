
export interface IStudentCreate {
  email: string;
  isAdmin?: boolean;
  password: string;
  name: string,
  gender : string,
  birthday: string,
  major: string,
  avatar: string
}

export interface IStudent {
  ID: number,
  EMAIL: string;
  NAME: string;
  AVATAR: string,
  GENDER : number,
  BIRTHDAY: string,
  MAJOR: number,
  IS_ADMIN?: boolean
  PASSWORD?: string
}


export interface IStudentJoin {
  ID: number,
  EMAIL: string;
  NAME: string;
  AVATAR: string,
  GENDER : number,
  BIRTHDAY: string,
  MAJOR: string,
  IS_ADMIN?: boolean
  PASSWORD?: string
}

export interface ITeacher {
  ID: number,
  NAME: string;
  MAJOR: string,
  AVATAR: string,
  EMAIL: string
}

export type IStudentResponse  = IStudent[]
export type IStudentResponseJoin  = IStudentJoin[]

export type ITeacherResponse  = ITeacher[]
