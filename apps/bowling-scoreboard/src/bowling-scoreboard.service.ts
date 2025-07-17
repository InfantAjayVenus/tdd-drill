import { Injectable } from '@nestjs/common';
import { BowlingScoreboardRepository } from './bowling-scoreboard.repository';

@Injectable()
export class BowlingScoreboardService {

  private readonly MAX_FRAME_SCORE = 10;
  private readonly MAX_FRAME_COUNT = 10;

  constructor(private readonly bowlingScoreboardRepository: BowlingScoreboardRepository) { }

  getHello(): string {
    return 'Hello Bowling World!';
  }

  public addRoll(rollScore: number) {
    const previousRolls = this.bowlingScoreboardRepository.getRolls();
    if (this.isRollInValidForFrame(previousRolls, rollScore)) {
      throw 'Invalid score for Frame';
    }
    this.bowlingScoreboardRepository.saveRoll(rollScore);
    const savedRolls = this.bowlingScoreboardRepository.getRolls();

    const board = this.buildBoardFromRolls(savedRolls)

    return {
      frames: board,
    }
  }

  private isRollInValidForFrame(previousRolls: number[], rollScore: number) {
    if (previousRolls.length < 19)
      return previousRolls.length % 2 !== 0 && (this.MAX_FRAME_SCORE - previousRolls[previousRolls.length - 1] < rollScore);
    else if (previousRolls.length === 20) {
      return (previousRolls[previousRolls.length - 1] + previousRolls[previousRolls.length - 2]) < this.MAX_FRAME_SCORE;
    }

    return previousRolls.length === 21;
  }

  private buildBoardFromRolls(savedRolls: number[]) {
    return savedRolls.reduce((accumulatedBoard, currentRoll) => {
      const lastFrame = accumulatedBoard.at(accumulatedBoard.length - 1);
      if (lastFrame && lastFrame.length === 2 && accumulatedBoard.length !== this.MAX_FRAME_COUNT) {
        accumulatedBoard.push([]);
      }

      accumulatedBoard.at(accumulatedBoard.length - 1)?.push(currentRoll);
      return accumulatedBoard;
    }, [[]] as number[][]);
  }
}
