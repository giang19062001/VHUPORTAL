
export interface IPayPost {
    total: number,
    student: string;
  }

  export interface IFee {
    ID: number,
    STUDENT: string;
    C_TIME: string;
    TOTAL: number;
  }
    
  export interface IFeeState {
    fees: IFee[] 
    loading: boolean
    currentRequestId: undefined | string
  }

  export interface IPayloadActionFee{
    result : boolean,
    data : IFee[]
  }