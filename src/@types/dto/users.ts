export interface ICreateUserDto {
  username: string;
  email: string;
  password: string;
  roles: string[];
}

export interface ISignInUserDto {
  email: string;
  password: string;
}
