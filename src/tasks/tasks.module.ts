import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { TasksRepository } from './tasks.repository';
import { AuthModule } from 'src/auth/auth.module';
// import { TasksRepository } from './tasks.repository';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
})
export class TasksModule {}
