import { IsEmail, IsIn, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
export class tbl_user_dto {
    username: string;
    password: string;
    email: string;

    sex: number;
    address: string;
    fullname: string;
    avatar: string;
    roleId: Types.ObjectId;
}

export class CreateUserDto {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;

    username: string;
    sex: number;
    address: string;
    fullname: string;
    avatar: string;
}

export class SignInUserDto {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}