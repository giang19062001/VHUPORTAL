export interface IStudentPost {
    name: string,
    gender : string,
    birthday : string,
    major: string,
    avatar : string
  }
  export interface IStudent {
    ID: number
    NAME: string
    EMAIL: string
    GENDER: number
    BIRTHDAY: string
    MAJOR: string
    AVATAR: number
  }

  export interface ITeacher {
    ID: number
    NAME: string
   MAJOR: string
   AVATAR:string
   EMAIL: string
  }
  
  export interface IStudentState {
    students : IStudent[]
    teachers : ITeacher[]

    loading: boolean
    currentRequestId: undefined | string
  }

  export interface IPayloadActionDefault{
    result : boolean,
    data : any
  }
  export interface IPayloadActionStudent{
    result : boolean,
    data : IStudent[]
  }
  export interface IPayloadActionTeacher{
    result : boolean,
    data : ITeacher[]
  }