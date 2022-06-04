import { Injectable, CanActivate, ExecutionContext, Logger, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { tbl_user } from 'src/modules/database/schema';
import { TblUsersService} from '../../modules/database/services/tbl_users.service'
import { TblRolesService } from 'src/modules/database/services/tbl_roles.service';
import { Role } from '../enums/roles.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
      private reflector: Reflector, 
      private readonly usersService: TblUsersService,
      private readonly rolesService: TblRolesService
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
    let _user = await this.usersService.getOneById(user._id);
    let role = await this.rolesService.getOneById(_user.roleId);
    Logger.log(_user);
    let flag = requiredRoles.some((role) => role.name?.includes(role));
    return flag;
  }
}
