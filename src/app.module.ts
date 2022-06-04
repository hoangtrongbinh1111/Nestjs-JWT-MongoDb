import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { StudentModule } from './modules/student/student.module';
import { CaslModule } from './casl/casl.module';
import { DatabaseModule } from './modules/database/database.module';
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
    CaslModule,
    DatabaseModule
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
