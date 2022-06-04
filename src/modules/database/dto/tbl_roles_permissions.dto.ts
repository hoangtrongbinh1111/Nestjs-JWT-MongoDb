import { Types } from "mongoose";
export class tbl_roles_permissions_dto {
    readonly roleId: Types.ObjectId;
    readonly permissionId: Types.ObjectId;
}