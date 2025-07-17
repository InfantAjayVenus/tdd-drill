import { Body, Controller, Get, ParseEnumPipe, Post } from '@nestjs/common';
import { BowlingScoreboardService } from './bowling-scoreboard.service';

@Controller('bowling')
export class BowlingScoreboardController {
  constructor(
    private readonly bowlingScoreboardService: BowlingScoreboardService,
  ) {}

  @Get()
  getHello(): string {
    return this.bowlingScoreboardService.getHello();
  }

  @Post('roll')
  public addRoll(@Body() roll: string) {

    const parsedInput = parseInt(roll);
    if (isNaN(parsedInput)) {
      throw 'Invalid Input. Please pass a valid number';
    }

    if(parsedInput < 0) {
      throw 'Invalid Input. Please pass a positive number';
    }

    if(parsedInput > 10) {
      throw 'Invalid Input. Value should not be greater than 10';
    }

    this.bowlingScoreboardService.addRoll(parseInt(roll));
  }
}
