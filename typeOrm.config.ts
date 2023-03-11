import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Todo } from './src/todos/entities/todo.entity';
import { DataSource } from 'typeorm';
import { CreateTodoTable1678517524979 } from './migrations/1678517524979-CreateTodoTable';
config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [Todo],
  migrations: [CreateTodoTable1678517524979],
});
