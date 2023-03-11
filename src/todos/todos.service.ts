import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  public async createTodo(createTodoDto: CreateTodoDto) {
    const newTodo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(newTodo);
  }

  public async findAllTodos() {
    return this.todoRepository.find();
  }

  public async findOneTodo(id: number) {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  public async updateTodo(id: number, updateTodoDto: UpdateTodoDto) {
    const updatedTodo = await this.todoRepository.update(id, updateTodoDto);
    if (!updatedTodo.affected) {
      throw new NotFoundException('Todo not found');
    }
    return updatedTodo;
  }

  public async removeTodo(id: number) {
    const removedTodo = await this.todoRepository.delete(id);
    if (!removedTodo.affected) {
      throw new NotFoundException('Todo not found');
    }
    return removedTodo;
  }
}
