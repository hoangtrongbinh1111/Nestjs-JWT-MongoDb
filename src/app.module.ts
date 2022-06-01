import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { StudentModule } from './modules/student/student.module';
import { RolesGuard } from './modules/auth/role/roles.guard';
import { JwtAuthGuard } from './modules/auth/jwt.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGODB_URI'),
          // auth: {
          //   user: configService.get<string>('MONGODB_USER'),
          //   password: configService.get<string>('MONGODB_PASS'),
          // },
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard
    // }
  ],
})
export class AppModule {}
