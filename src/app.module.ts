import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config/dist';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        PORT: Joi.number(),
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_ACCESS_EXP: Joi.string().required(),
      }),
    }),
    TodosModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
