import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IStudent } from 'src/@types';

@Schema()
export class Student implements IStudent {
  @Prop({ required: true })
  fullname: string;
  @Prop({ required: true })
  age: number;
  @Prop({ required: true })
  sex: string;
  @Prop({ required: true })
  address: string;
  @Prop({ default: () => new Date() })
  createdAt: Date;
  @Prop({ default: () => new Date() })
  updatedAt: Date;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
