import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Todo } from './src/todos/entities/todo.entity';
import { DataSource } from 'typeorm';
import { CreateTodoTable1678517524979 } from './migrations/1678517524979-CreateTodoTable';
import { User } from './src/users/entities/user.entity';
import { UpdateTable1678524800015 } from './migrations/1678524800015-UpdateTable';
import { RelationsTodoUser1678525016248 } from './migrations/1678525016248-RelationsTodoUser';
import { MakeEmailUnique1678533779413 } from './migrations/1678533779413-MakeEmailUnique';
config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [Todo, User],
  migrations: [
    CreateTodoTable1678517524979,
    UpdateTable1678524800015,
    RelationsTodoUser1678525016248,
    MakeEmailUnique1678533779413,
  ],
});
