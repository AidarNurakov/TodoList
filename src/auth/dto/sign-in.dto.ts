import { ApiProperty } from '@nestjs/swagger';

export class SingInDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'email of user' })
  email: string;

  @ApiProperty({ example: 'qwerty1234', description: 'password of user' })
  password: string;
}
