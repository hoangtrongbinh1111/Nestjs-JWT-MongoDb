import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from 'src/@types';

@Schema()
export class User implements IUser {
  @Prop({ required: true})
  username: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  roles: string[];
  @Prop({ default: () => new Date() })
  createdAt: Date;
  @Prop({ default: () => new Date() })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
