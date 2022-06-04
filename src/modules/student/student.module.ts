import { forwardRef, Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student, StudentSchema } from './student.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { CaslModule } from 'src/casl/casl.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => CaslModule),
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    UsersModule,
  ],
  providers: [StudentService],
  exports: [StudentService],
  controllers: [StudentController]
})
export class StudentModule {}
