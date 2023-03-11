import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import RequestWithUser from 'src/auth/interfaces/requestUser.interface';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  public create(
    @Body() createTodoDto: CreateTodoDto,
    @Req() request: RequestWithUser,
  ) {
    createTodoDto.user = request.user;
    return this.todosService.createTodo(createTodoDto);
  }

  @Get()
  public findAll(@Req() req: RequestWithUser) {
    return this.todosService.findAllTodos(req.user.id);
  }

  @Get(':id')
  public findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.todosService.findOneTodo(+id, req.user.id);
  }

  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req: RequestWithUser,
  ) {
    return this.todosService.updateTodo(+id, updateTodoDto, req.user.id);
  }

  @Delete(':id')
  public remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.todosService.removeTodo(+id, req.user.id);
  }
}
