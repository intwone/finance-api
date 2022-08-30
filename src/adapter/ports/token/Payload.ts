interface IUser {
  id: string;
  name: string;
  email: string;
}

export default interface IPayload {
  user: IUser;
  iat: number;
  exp: number;
}
