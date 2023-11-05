  
export interface IAuthLogin {
    email: string;
    password: string;
  }
  

export interface IAuthInfo {
    data: any;
    id: number;
    email: string;
    isAdmin: number;
    name: string,
    gender : number,
    birthday: string,
    major: string,
    avatar: string,
    accessToken : string
  }

  export interface IAuthState {
    userInfo: IAuthInfo | null
    loading: boolean
    currentRequestId: undefined | string
  }


  export interface IPayloadActionAuth{
    result : boolean,
    data : IAuthInfo
  }