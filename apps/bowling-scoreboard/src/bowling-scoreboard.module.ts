import { Module } from '@nestjs/common';
import { BowlingScoreboardController } from './bowling-scoreboard.controller';
import { BowlingScoreboardService } from './bowling-scoreboard.service';
import { BowlingScoreboardRepository } from './bowling-scoreboard.repository';

@Module({
  imports: [],
  controllers: [BowlingScoreboardController],
  providers: [BowlingScoreboardService, BowlingScoreboardRepository],
})
export class BowlingScoreboardModule {}
