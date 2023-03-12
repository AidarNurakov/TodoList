import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  public async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(newTodo);
  }

  public async findAllTodos(userId: number) {
    return this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId } },
    });
  }

  public async findOneTodo(id: number, userId: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      relations: ['user'],
      where: { user: { id: userId }, id },
    });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  public async updateTodo(
    id: number,
    updateTodoDto: UpdateTodoDto,
    userId: number,
  ): Promise<UpdateResult> {
    const updatedTodo = await this.todoRepository.update(
      { id, user: { id: userId } },
      updateTodoDto,
    );
    if (!updatedTodo.affected) {
      throw new NotFoundException('Todo not found');
    }
    return updatedTodo;
  }

  public async removeTodo(id: number, userId: number): Promise<DeleteResult> {
    const todo = await this.findOneTodo(id, userId);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return this.todoRepository.delete(todo.id);
  }
}
