import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { tbl_permissions } from './tbl_permissions.schema';
import { tbl_roles } from './tbl_roles.schema';
export type tblRolePermissionDocument = tbl_role_permissions & Document;

@Schema()
export class tbl_role_permissions {

    @Prop({ type: Types.ObjectId, ref: tbl_roles.name })
    roleId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: tbl_permissions.name })
    permissionId: Types.ObjectId;

}

export const RolePermissionSchema = SchemaFactory.createForClass(tbl_role_permissions);