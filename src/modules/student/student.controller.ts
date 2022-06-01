import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import {Request} from "express";
import { JwtAuthGuard } from '../auth/jwt.guard';
import { StudentService } from './student.service';
import { Student } from './student.schema';
import { RolesGuard } from '../auth/role/roles.guard';
import { Roles } from '../auth/role/roles.decorator';
import { Role } from '../auth/role/role.enum';
@Controller('student')
// @UseGuards(RolesGuard)
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get()
    async getAllStudents(@Req() req: Request) {
        return this.studentService.getAllStudents(req);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getStudent(@Param('id') studentId: string) {
        return this.studentService.getStudent(studentId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addStudent(@Body() payload: Student) {
        return this.studentService.createStudent(payload);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateStudent(@Param('id') studentId: string, @Body() payload: Student) {
        return this.studentService.updateStudent(studentId, payload);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removeStudent(@Param('id') studentId: string) {
        return this.studentService.deleteStudent(studentId);
    }
}
