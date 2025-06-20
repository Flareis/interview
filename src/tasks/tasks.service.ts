import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateUserDto } from './application/dto/createUser.dto';
import { CryptoService } from 'src/helper/crypto.service';

@Injectable()
export class TasksService {
  constructor() { }
  private readonly tasks: any[] = [];

  create(createUserDto: CreateUserDto) {
    const encryptedEmail = CryptoService.encrypt(createUserDto.email);

    const newTask = {
      id: Date.now().toString(),
      title: createUserDto.title,
      description: createUserDto.description,
      taskDate: createUserDto.taskDate,
      email: encryptedEmail
    };
    this.tasks.push(newTask);

    return newTask;
  }

  findAll() {
    return this.tasks.map(task => {
      return {
        ...task,
        email: CryptoService.decrypt(task.email)
      };
    })
  }

  findOne(id: string) {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new NotImplementedException(`Task with id ${id} not found`);
    }
    return {
      ...task,
      email: CryptoService.decrypt(task.email)
    }
  }
}
