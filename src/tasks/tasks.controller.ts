import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateUserDto } from './application/dto/createUser.dto';

@Controller('tasks')
export class TasksController {
  tasks: any;
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.tasksService.create(createUserDto);
  }

  @Get('/return-tasks')
  findAll() {
    console.log('Tasks armazenadas:', this.tasks);
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('Received ID:', id);

    return this.tasksService.findOne(id);
  }
}
