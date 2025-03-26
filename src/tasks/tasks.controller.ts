import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    console.log(title, description);
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  getSingleTaskById(@Param('id') id: string): Task | null {
    console.log(id);
    return this.tasksService.getSingleTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    console.log(id);
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task | null {
    console.log(id, status);
    return this.tasksService.updateTaskStatus(id, status);
  }
}
