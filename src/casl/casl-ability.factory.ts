import {
    Ability,
    AbilityBuilder,
    AbilityClass,
    ExtractSubjectType,
    InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from 'src/common/enums/action.enum';
import { Role } from 'src/common/enums/roles.enum';
import { Status } from 'src/common/enums/status.enum';
import { Student } from 'src/modules/student/student.schema';
import { tbl_user } from 'src/modules/database/schema';
import { tbl_user_dto } from 'src/modules/database/dto';
import { tbl_permissions_dto } from 'src/modules/database/dto';
import { permission_resource_dto } from 'src/modules/database/dto';
import { Logger } from '@nestjs/common';
import { TblUsersService } from '../modules/database/services/tbl_users.service';
import { PermissionsConstant } from '../config';
// type Subjects = InferSubjects<typeof Student | typeof tbl_user> | 'all';
export type PermissionObjectType = any;
export type AppAbility = Ability<[PermissionsConstant, PermissionObjectType]>;
interface CaslPermission {
    action: PermissionsConstant;
    // In our database, Invoice, Project... are called "object"
    // but in CASL they are called "subject"
    subject: string;
}
@Injectable()
export class CaslAbilityFactory {
    constructor(private userService: TblUsersService) { }
    async createForUser(user: tbl_user_dto): Promise<AppAbility> {
        const dbPermissions: permission_resource_dto[] = await this.userService.findAllPermissionsOfUser(user);
        const caslPermissions: CaslPermission[] = dbPermissions.map(p => ({
            action: PermissionsConstant.VIEW,
            subject: p.resource,
        }));
        return new Ability<[PermissionsConstant, PermissionObjectType]>(caslPermissions);
    }
}