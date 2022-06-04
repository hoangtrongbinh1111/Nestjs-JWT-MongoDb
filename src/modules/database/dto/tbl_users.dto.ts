import { IsEmail, IsIn, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
export class tbl_user_dto {
    readonly username: string;
    readonly password: string;
    readonly email: string;

    readonly sex: number;
    readonly address: string;
    readonly fullname: string;
    readonly avatar: string;
    readonly roleId: Types.ObjectId;
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