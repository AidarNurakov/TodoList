import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

export class CreateTodoDto {
  @ApiProperty({
    example: 'go to the swimming pool',
    description: 'content of todo task',
  })
  todoContent: string;

  @ApiProperty({ example: 1, description: 'id of user' })
  user: User;
}
