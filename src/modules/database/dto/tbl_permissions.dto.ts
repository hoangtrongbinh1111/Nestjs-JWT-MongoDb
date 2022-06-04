import { Types } from "mongoose";
export class tbl_permissions_dto {
    readonly action: string;
    readonly objectId: Types.ObjectId;
}