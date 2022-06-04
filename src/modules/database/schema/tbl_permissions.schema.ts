import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { tbl_objects } from './tbl_objects.schema';
export type tblPermissionsDocument = tbl_permissions & Document;

@Schema()
export class tbl_permissions {

    @Prop()
    action: string;

    @Prop({ type: Types.ObjectId, ref: tbl_objects.name })
    objectId: Types.ObjectId;

}

export const PermissionSchema = SchemaFactory.createForClass(tbl_permissions);