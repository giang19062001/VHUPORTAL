interface IErrorField{
    location: string,
    msg: string,
    path:   string,
    type: string
}

export function CheckErrorField(error: unknown): error is IErrorField[] {
    return  error instanceof Array && 'msg' in error[0] && 'location' in error[0]  && 'path' in error[0]  && 'type' in error[0] 
}
  
