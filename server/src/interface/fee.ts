
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
export type IFeeResponse = IFee[]