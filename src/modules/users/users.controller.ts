import { Controller, UseGuards, Request, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { tblUserDocument } from '../database/schema';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { TblUsersService } from '../database/services/tbl_users.service';
import { TblRolesService } from '../database/services/tbl_roles.service';
import { TblObjectsService } from '../database/services/tbl_objects.service';
import { TblPermissionsService } from '../database/services/tbl_permissions.service';
import { TblRolesPermissionsService } from '../database/services/tbl_roles_permissions.service';
import { tbl_roles_dto, tbl_user_dto, tbl_objects_dto, tbl_permissions_dto, tbl_roles_permissions_dto } from '../database/dto';
import { CheckPolicies } from 'src/common/decorators/check-policies.decorator';
import { PoliciesGuard } from 'src/common/guards/policies.guard';
// import { ReadStudentPolicyHandler } from 'src/common/policies/read.policy';
import { Types } from 'mongoose';

@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('users')
export class UsersController {
  constructor(
    private usersService: TblUsersService,
    private rolesService: TblRolesService,
    private objectsService: TblObjectsService,
    private permissionsService: TblPermissionsService,
    private rolepermissionService: TblRolesPermissionsService
  ) { }

  @Get('me')
  @CheckPolicies()
  async me(@Request() req): Promise<tblUserDocument> {
    return this.usersService.findOne({ _id: req.user._id });
  }

  @Patch(':id')
  @CheckPolicies()
  async updateUser(@Param('id') userId: Types.ObjectId, @Body() payload: tbl_user_dto) {
    return this.usersService.update(userId, payload);
  }

  @Post('roles')
  @CheckPolicies()
  async insertRoles(@Body() payload: tbl_roles_dto) {
    return this.rolesService.insert(payload);
  }

  @Post('resources')
  @CheckPolicies()
  async insertResource(@Body() payload: tbl_objects_dto) {
    return this.objectsService.insert(payload);
  }

  @Post('permissions')
  @CheckPolicies()
  async insertPermissions(@Body() payload: tbl_permissions_dto) {
    return this.permissionsService.insert(payload);
  }

  @Post('rolepermissions')
  @CheckPolicies()
  async insertRolePermissions(@Body() payload: tbl_roles_permissions_dto[]) {
    return this.rolepermissionService.insertMany(payload);
  }

}
