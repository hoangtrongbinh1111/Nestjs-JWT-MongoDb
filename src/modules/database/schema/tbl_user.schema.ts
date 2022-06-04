import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { tbl_roles } from './tbl_roles.schema';
export type tblUserDocument = tbl_user & Document;

@Schema()
export class tbl_user {
    _id: Types.ObjectId;
    
    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    sex: number;

    @Prop()
    address: string;

    @Prop()
    fullname: string;

    @Prop()
    avatar: string;

    @Prop({ type: Types.ObjectId, ref: tbl_roles.name })
    roleId: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(tbl_user);