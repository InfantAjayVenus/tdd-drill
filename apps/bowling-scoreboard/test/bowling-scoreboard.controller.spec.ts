import { beforeEach, describe, expect, it } from 'vitest';
import { DeepMockProxy, mockDeep } from 'vitest-mock-extended';
import { BowlingScoreboardController } from '../src/bowling-scoreboard.controller';
import { BowlingScoreboardService } from '../src/bowling-scoreboard.service';

describe('BowlingScoreboardController should', () => {
  let bowlingScoreboardServiceMock: DeepMockProxy<BowlingScoreboardService>;
  let controller: BowlingScoreboardController;

  beforeEach(() => {
    bowlingScoreboardServiceMock = mockDeep<BowlingScoreboardService>();
    controller = new BowlingScoreboardController(bowlingScoreboardServiceMock);
  });

  it('update roll value to Game service', () => {
    const roll = '5';

    controller.addRoll(roll);

    expect(bowlingScoreboardServiceMock.addRoll).toHaveBeenCalledWith(5);
  });

  it('throw validation error if input is invalid string', () => {
    const roll = 'abc';

    expect(() => controller.addRoll(roll)).toThrow('Invalid Input. Please pass a valid number');
  });

  it('throw validation error if input is negative', () => {
    const roll = '-1';

    expect(() => controller.addRoll(roll)).toThrow('Invalid Input. Please pass a positive number');
  });

  it('throw validation error if input is greater than 10 (max number of pins)', () => {
    const roll = '11';

    expect(() => controller.addRoll(roll)).toThrow('Invalid Input. Value should not be greater than 10');
  })
});
