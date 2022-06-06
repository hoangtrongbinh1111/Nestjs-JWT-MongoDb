import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { TblUsersService } from '../database/services/tbl_users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, SignInUserDto } from '../database/dto/tbl_users.dto';
import bcrypt = require('bcrypt');
import { SALT_ROUNDS } from 'src/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: TblUsersService,
    private jwtService: JwtService
  ) {}

  async login(payload: SignInUserDto) {
    try {
      const user = await this.usersService.findOne({ email: payload.email });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      const isPasswordValid = bcrypt.compareSync(
        payload.password,
        user.password,
      );
      if (isPasswordValid) {
        return {
          email: user.email,
          username: user.username,
          access_token: this.jwtService.sign({
            _id: user._id,
          }),
        };
      } else {
        throw new UnauthorizedException('Invalid password');
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async createAccount(payload: CreateUserDto) {
    try {
      const pass = bcrypt.hashSync(payload.password, SALT_ROUNDS);
      const user = await this.usersService.insert({
        ...payload,
        password: pass,
      });
      return {
        email: user.email,
        username: user.username,
        access_token: this.jwtService.sign({
          _id: user._id,
        }),
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
