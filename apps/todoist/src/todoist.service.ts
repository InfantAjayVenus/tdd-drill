import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoistService {
  getHello(): string {
    return 'Hello World!';
  }
}
