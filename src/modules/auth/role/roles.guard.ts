import { Injectable, CanActivate, ExecutionContext, Logger, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/modules/users/users.schema';
import { UsersService } from 'src/modules/users/users.service';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
      private reflector: Reflector, 
      private readonly usersService:UsersService
    ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean>  {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    return this.validateRequest(context, requiredRoles);
  }
  async validateRequest(execContext: ExecutionContext, requiredRoles): Promise<boolean>{
    const request = execContext.switchToHttp().getRequest();
    const user = request.user;
    let _user = await this.usersService.findOne({_id: user._id});
    Logger.log(_user);
    let flag = requiredRoles.some((role) => _user.roles?.includes(role));
    return flag;
  }
}
