import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type tblRolesDocument = tbl_roles & Document;

@Schema()
export class tbl_roles {
    _id: string;

    @Prop()
    name: string;
}

export const RolesSchema = SchemaFactory.createForClass(tbl_roles);