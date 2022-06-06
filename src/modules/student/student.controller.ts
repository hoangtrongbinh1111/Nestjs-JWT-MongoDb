import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import {Request} from "express";
import { JwtAuthGuard } from '../auth/jwt.guard';
import { StudentService } from './student.service';
import { Student } from './student.schema';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/roles.enum';
import { CheckPolicies } from 'src/common/decorators/check-policies.decorator';
import { PoliciesGuard } from 'src/common/guards/policies.guard';
// import { CreateStudentPolicyHandler } from 'src/common/policies/create.policy';
// import { ReadStudentPolicyHandler } from 'src/common/policies/read.policy';
// import { UpdateStudentPolicyHandler } from 'src/common/policies/update.policy';
// import { DeleteStudentPolicyHandler } from 'src/common/policies/delete.policy';

@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('student')
// @UseGuards(RolesGuard)
export class StudentController {
    constructor(private readonly studentService: StudentService) { }
   
    @CheckPolicies()
    // @Roles(Role.Admin)
    @Get()
    async getAllStudents(@Req() req: Request) {
        return this.studentService.getAllStudents(req);
    }

    @CheckPolicies()
    @Get(':id')
    async getStudent(@Param('id') studentId: string) {
        return this.studentService.getStudent(studentId);
    }

    @CheckPolicies()
    @Post()
    async addStudent(@Body() payload: Student) {
        return this.studentService.createStudent(payload);
    }

    @CheckPolicies()
    @Patch(':id')
    async updateStudent(@Param('id') studentId: string, @Body() payload: Student) {
        return this.studentService.updateStudent(studentId, payload);
    }

    @CheckPolicies()
    @Delete(':id')
    async removeStudent(@Param('id') studentId: string) {
        return this.studentService.deleteStudent(studentId);
    }
}
