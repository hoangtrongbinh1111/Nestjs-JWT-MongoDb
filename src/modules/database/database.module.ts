import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    tbl_user,
    tbl_role_permissions,
    tbl_objects,
    tbl_permissions,
    tbl_roles,
    UserSchema,
    RolePermissionSchema,
    ObjectsSchema,
    PermissionSchema,
    RolesSchema
} from './schema';
import { TblRolesService } from './services/tbl_roles.service';
import { TblUsersService } from './services/tbl_users.service';
import { TblObjectsService } from './services/tbl_objects.service';
import { TblPermissionsService } from './services/tbl_permissions.service';
import { TblRolesPermissionsService } from './services/tbl_roles_permissions.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: tbl_user.name,
                schema: UserSchema,
            },
            {
                name: tbl_role_permissions.name,
                schema: RolePermissionSchema,
            },
            {
                name: tbl_objects.name,
                schema: ObjectsSchema,
            },
            {
                name: tbl_permissions.name,
                schema: PermissionSchema
            },
            {
                name: tbl_roles.name,
                schema: RolesSchema
            }
        ]),
    ],
    providers: [
        TblUsersService,
        TblRolesService,
        TblObjectsService,
        TblPermissionsService,
        TblRolesPermissionsService
    ],
    exports: [
        TblUsersService,
        TblRolesService,
        TblObjectsService,
        TblPermissionsService,
        TblRolesPermissionsService
    ],
})
export class DatabaseModule { }