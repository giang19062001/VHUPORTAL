export interface IToken {
    email: string;
    iat: number;
    exp: number
}
export interface IAuthInfo {
  id: number;
  email: string;
  isAdmin: boolean;
  name: string,
  gender : number,
  birthday: string,
  major: string,
  avatar: string,
  accessToken : string
}

export interface ITokenExpired {
    name: string
    message: string
    expiredAt: string
  }


  
export interface IAuthLogin {
    email: string;
    password: string;
  }
  