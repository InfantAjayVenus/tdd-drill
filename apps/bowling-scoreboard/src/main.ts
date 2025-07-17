import { NestFactory } from '@nestjs/core';
import { BowlingScoreboardModule } from './bowling-scoreboard.module';

async function bootstrap() {
  const app = await NestFactory.create(BowlingScoreboardModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
