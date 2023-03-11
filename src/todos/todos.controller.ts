import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  public create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.createTodo(createTodoDto);
  }

  @Get()
  public findAll() {
    return this.todosService.findAllTodos();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.todosService.findOneTodo(+id);
  }

  @Put(':id')
  public update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.updateTodo(+id, updateTodoDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.todosService.removeTodo(+id);
  }
}
