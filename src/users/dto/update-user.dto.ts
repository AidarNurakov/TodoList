import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'user1234', description: 'username of user' })
  username: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'email of user' })
  email: string;

  @ApiProperty({ example: 'qwerty1234', description: 'password of user' })
  password: string;
}
