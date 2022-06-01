import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Model, Types } from 'mongoose';
import { StudentDocument, ICreateStudentDto } from 'src/@types';
import { Student } from './student.schema';

@Injectable()
export class StudentService {
    constructor(
        @InjectModel(Student.name)
        private readonly studentSchema: Model<StudentDocument>,
    ) { }

    async getAllStudents(req) {
        let options = {};
        if (req.query.search) {
            options = {
                $or : [
                    {fullname: new RegExp(req.query.search.toString(), 'i')},
                    {address: new RegExp(req.query.search.toString(), 'i')},
                ]
            }
        }
        const query = this.studentSchema.find(options);
        const page: number = parseInt(req.query.page as any) || 1;
        const limit: number = parseInt(req.query.limit as any) || 5;
        const total = await this.studentSchema.count(options);
        const data = await query.skip((page - 1) * limit).limit(limit).exec();
        return {
            data,
            total,
            page,
            last_page: Math.ceil(total / limit),
        };
    }

    async getStudent(studentId: string) {
        const student = this.findStudent(studentId);
        return student;
    }

    async createStudent(payload: ICreateStudentDto) {
        try {
            const student = await this.studentSchema.create(payload);
            return {
                fullname: student.fullname,
                age: student.age,
                sex: student.sex,
                address: student.address,
            };
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async updateStudent(studentId: string, payload: ICreateStudentDto) {
        try {
            const student = await this.studentSchema.findByIdAndUpdate({ _id: Types.ObjectId(studentId) }, payload, { new: true });
            if (!student) {
                throw new NotFoundException();
            }
            return student;
        }
        catch (e) {
            throw new NotFoundException(e.message);
        }
    }

    async deleteStudent(studentId: string) {
        try {
            const student = await this.studentSchema.findByIdAndDelete({ _id: Types.ObjectId(studentId) });
            if (!student) {
                throw new NotFoundException();
            }
            return "delete";
        }
        catch (e) {
            throw new NotFoundException(e.message);
        }
    }

    private findStudent(id: string) {
        try {
            const student = this.studentSchema.findOne({ _id: Types.ObjectId(id) });
            if (!student) {
                throw new NotFoundException('Could not find student.');
            }
            return student;
        }
        catch (e) {
            throw new NotFoundException(e.message);
        }
    }
}
