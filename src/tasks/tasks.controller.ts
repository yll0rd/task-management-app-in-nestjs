import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
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
}
