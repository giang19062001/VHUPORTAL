export interface ITeachState {
    semeters: ISemeter[] 
    teachs: ITeach[] 
    signs: ISign[]
    loading: boolean
    currentRequestId: undefined | string
  }

  export interface ISignTeachPost {
    teach: number,
    student: string;
  }
  export interface ISemeter {
    ID: number,
    NAME: string;
    YEAR: string;
    ON: string;
  }

  export interface ISign {
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

  export interface IPayloadActionSemeter{
    result : boolean,
    data : ISemeter[]
  }
  
  export interface IPayloadActionTeach{
    result : boolean,
    data : ITeach[]
  }
  
  export interface IPayloadActionSignTeach{
    result : boolean,
    data : ISign[]
  }