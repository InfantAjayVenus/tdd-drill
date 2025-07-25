import { NestFactory } from '@nestjs/core';
import { TodoistModule } from './todoist.module';

async function bootstrap() {
  const app = await NestFactory.create(TodoistModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
