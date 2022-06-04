import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type tblObjectsDocument = tbl_objects & Document;

@Schema()
export class tbl_objects {

    @Prop()
    name: string;
}

export const ObjectsSchema = SchemaFactory.createForClass(tbl_objects);