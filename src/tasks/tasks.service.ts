import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './tasks.entity';
import { UserEntity } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}
  getAllTasks(filterDto: GetTasksFilterDto, user: UserEntity): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: UserEntity): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async getSingleTaskById(id: string, user: UserEntity): Promise<Task> {
    const foundTask = await this.tasksRepository.findOne({
      where: { id, user },
    });
    if (!foundTask)
      throw new NotFoundException(`Task with ID "${id}" not found`);
    return foundTask;
  }

  async deleteTask(id: string, user: UserEntity): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });
    console.log(result);
    if (result.affected === 0)
      throw new NotFoundException(`Task with ID "${id}" not found`);
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: UserEntity,
  ): Promise<Task> {
    const task = await this.getSingleTaskById(id, user);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
