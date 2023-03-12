import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto {
  @ApiProperty({
    example: 'go to the swimming pool',
    description: 'content of todo task',
  })
  todoContent: string;
}
