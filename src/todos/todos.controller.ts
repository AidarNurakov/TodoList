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
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Todo } from './entities/todo.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('todos')
@ApiTags('Todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: 'Create Todo' })
  @ApiCreatedResponse({ type: Todo })
  public create(
    @Body() createTodoDto: CreateTodoDto,
    @Req() request: RequestWithUser,
  ) {
    createTodoDto.user = request.user;
    return this.todosService.createTodo(createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all todos' })
  @ApiOkResponse({ type: [Todo] })
  public findAll(@Req() req: RequestWithUser) {
    return this.todosService.findAllTodos(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find Todo By id' })
  @ApiOkResponse({ type: Todo })
  @ApiNotFoundResponse({ description: 'Todo not found' })
  public findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.todosService.findOneTodo(+id, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Todo' })
  @ApiOkResponse({ type: UpdateResult })
  @ApiNotFoundResponse({ description: 'Todo not found' })
  public update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req: RequestWithUser,
  ) {
    return this.todosService.updateTodo(+id, updateTodoDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Todo' })
  @ApiOkResponse({ type: DeleteResult })
  @ApiNotFoundResponse({ description: 'Todo not found' })
  public remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.todosService.removeTodo(+id, req.user.id);
  }
}
