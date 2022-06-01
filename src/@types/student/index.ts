import { Document } from 'mongoose';

export interface IStudent {
  fullname: string;
  age: number;
  sex: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export type StudentDocument = IStudent & Document;
