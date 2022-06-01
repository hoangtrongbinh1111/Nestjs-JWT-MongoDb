import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student, StudentSchema } from './student.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from '../auth/jwt.strategy';
import { RolesGuard } from '../auth/role/roles.guard';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    UsersModule,
  ],
  providers: [StudentService],
  exports: [StudentService],
  controllers: [StudentController]
})
export class StudentModule {}
