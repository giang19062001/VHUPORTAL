export interface ISubject {
    ID: number
    NAME: string
    MAJOR: string
    CREDIT: number
  }
  export interface IMajor {
    ID: number
    NAME: string
    CHAR: string
  }
  
  export interface IPayloadActionSubject{
    result : boolean,
    data : ISubject[]
  }
  
  export interface IPayloadActionMajor{
    result : boolean,
    data : IMajor[]
  }

  
  export interface ISubjectState {
    subjects: ISubject[] 
    majors: IMajor[] 
    loading: boolean
    currentRequestId: undefined | string
  }