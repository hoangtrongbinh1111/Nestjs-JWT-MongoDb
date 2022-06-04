import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { tbl_user, UserSchema } from '../database/schema/tbl_user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TblUsersService } from '../database/services/tbl_users.service';
import { CaslModule } from 'src/casl/casl.module';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    // forwardRef(() => AuthModule),
    forwardRef(() => CaslModule),
    DatabaseModule,
    MongooseModule.forFeature([{ name: tbl_user.name, schema: UserSchema }]),
  ],
  providers: [TblUsersService],
  exports: [TblUsersService],
  controllers: [UsersController],
})
export class UsersModule {}
