import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Req,
  Res,
  Get,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { Response } from 'express';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { SingInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import RequestWithUser from './interfaces/requestUser.interface';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'user registration' })
  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse({ description: 'User with that email already exists' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  public async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  @ApiBody({ type: SingInDto })
  @ApiOperation({ summary: 'signing in system' })
  @ApiOkResponse({ type: User })
  @ApiBadRequestResponse({ description: 'Wrong credentials provided' })
  @HttpCode(200)
  public async signIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    request.res.setHeader('Set-Cookie', cookie);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  @ApiOperation({ summary: 'signing out of system' })
  @ApiOkResponse({ description: 'ok' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  public async logOut(@Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'get authenticated user' })
  @ApiOkResponse({ type: User })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  public async getAuthenticatedUser(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
