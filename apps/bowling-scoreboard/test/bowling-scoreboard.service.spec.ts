import { beforeEach, describe, expect, it } from "vitest";
import { BowlingScoreboardService } from "../src/bowling-scoreboard.service";
import { BowlingScoreboardRepository } from "../src/bowling-scoreboard.repository";
import { DeepMockProxy, mockDeep } from "vitest-mock-extended";

describe('bowling score board service should', () => {
    let service: BowlingScoreboardService;
    let bowlingScoreboardRepositoryMock: DeepMockProxy<BowlingScoreboardRepository>;

    beforeEach(() => {
        bowlingScoreboardRepositoryMock = mockDeep<BowlingScoreboardRepository>();
        service = new BowlingScoreboardService(bowlingScoreboardRepositoryMock);
    });

    describe('add roll should', () => {
        it('returns the game board with the roll when first called', () => {
            const roll = 5;
            bowlingScoreboardRepositoryMock.getRolls
                .mockReturnValueOnce([])
                .mockReturnValueOnce([roll]);

            const result = service.addRoll(roll);

            expect(bowlingScoreboardRepositoryMock.saveRoll).toHaveBeenCalledWith(5);
            expect(result).toEqual({
                frames: [
                    [roll]
                ]
            });
        });

        it('returns the updated game board in frames with multiple rolls', () => {
            const roll1 = 5;
            const roll2 = 4;

            bowlingScoreboardRepositoryMock.getRolls
                .mockReturnValueOnce([])
                .mockReturnValueOnce([roll1])
                .mockReturnValueOnce([roll1])
                .mockReturnValueOnce([roll1, roll2]);

            service.addRoll(roll1);
            const result = service.addRoll(roll2);

            expect(bowlingScoreboardRepositoryMock.saveRoll).toHaveBeenNthCalledWith(1, 5);
            expect(bowlingScoreboardRepositoryMock.saveRoll).toHaveBeenNthCalledWith(2, 4);
            expect(result).toEqual({
                frames: [
                    [5, 4]
                ]
            });
        });

        it('returns the game board with multiple frames when more than 2 rolls are added', () => {
            const roll1 = 5;
            const roll2 = 4;
            const roll3 = 5;

            bowlingScoreboardRepositoryMock.getRolls
                .mockReturnValueOnce([])
                .mockReturnValueOnce([roll1])
                .mockReturnValueOnce([roll1])
                .mockReturnValueOnce([roll1, roll2])
                .mockReturnValueOnce([roll1, roll2])
                .mockReturnValueOnce([roll1, roll2, roll3]);

            service.addRoll(roll1);
            service.addRoll(roll2);
            const result = service.addRoll(roll3);

            expect(result).toEqual({
                frames: [
                    [roll1, roll2],
                    [roll3]
                ]
            });
        });

        it('not save roll if the frame total is more than 10', () => {
            const roll1 = 6;
            const roll2 = 5;

            bowlingScoreboardRepositoryMock.getRolls
                .mockReturnValueOnce([])
                .mockReturnValueOnce([roll1])
                .mockReturnValueOnce([roll1]);

            service.addRoll(roll1);
            expect(() => service.addRoll(roll2)).toThrow('Invalid score for Frame');
        });

        it('allow third roll in the last frame if the last frame is a spare', () => {
            const lastRoll = 5;
            const mockRolls = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
            const expectedGameboard = [
                [5, 5],
                [5, 5],
                [5, 5],
                [5, 5],
                [5, 5],
                [5, 5],
                [5, 5],
                [5, 5],
                [5, 5],
                [5, 5, 5],
            ]
            bowlingScoreboardRepositoryMock.getRolls
                .mockReturnValueOnce(mockRolls)
                .mockReturnValueOnce([...mockRolls, lastRoll]);

            const result = service.addRoll(lastRoll);

            expect(bowlingScoreboardRepositoryMock.saveRoll).toHaveBeenCalledWith(lastRoll);
            expect(result).toEqual({
                frames: expectedGameboard
            });
        });

        it('allow second roll in the last frame if the last frame is a strike', () => {
            const lastRoll = 5;
            const mockRolls = [10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10];
            const expectedGameboard = [
                [10, 0],
                [10, 0],
                [10, 0],
                [10, 0],
                [10, 0],
                [10, 0],
                [10, 0],
                [10, 0],
                [10, 0],
                [10, lastRoll],
            ];

            bowlingScoreboardRepositoryMock.getRolls
                .mockReturnValueOnce(mockRolls)
                .mockReturnValueOnce([...mockRolls, lastRoll]);

            const result = service.addRoll(lastRoll);

            expect(bowlingScoreboardRepositoryMock.saveRoll).toHaveBeenCalledWith(lastRoll);
            expect(result).toEqual({
                frames: expectedGameboard,
            })
        });

        it('allow third roll in the last frame  if the 2 strikes in the last frame', () => {
            const lastRoll = 5;
            const mockRolls = [10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10];
            const expectedGameboard = [
                [10, 0],
                [10, 0],
                [10, 0],
                [10, 0],
                [10, 0],
                [10, 0],
                [10, 0],
                [10, 0],
                [10, 0],
                [10, 10, lastRoll],
            ];

            bowlingScoreboardRepositoryMock.getRolls
                .mockReturnValueOnce(mockRolls)
                .mockReturnValueOnce([...mockRolls, lastRoll]);

            const result = service.addRoll(lastRoll);

            expect(bowlingScoreboardRepositoryMock.saveRoll).toHaveBeenCalledWith(lastRoll);
            expect(result).toEqual({
                frames: expectedGameboard,
            })
        });

        it('not allow third roll in the last frame if the frame is neither spare nor strike', () => {
            const lastRoll = 5;
            const mockRolls = [10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 4, 4];
            bowlingScoreboardRepositoryMock.getRolls
                .mockReturnValueOnce(mockRolls);

            expect(() => service.addRoll(lastRoll)).toThrow('Invalid score for Frame');

            expect(bowlingScoreboardRepositoryMock.saveRoll).not.toHaveBeenCalledWith(lastRoll);
        });

        it('not allow fourth roll in the last frame even if all the rolls in the frame are a strike', () => {
            const lastRoll = 5;
            const mockRolls = [10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 10];
            bowlingScoreboardRepositoryMock.getRolls
                .mockReturnValueOnce(mockRolls);

            expect(() => service.addRoll(lastRoll)).toThrow('Invalid score for Frame');

            expect(bowlingScoreboardRepositoryMock.saveRoll).not.toHaveBeenCalledWith(lastRoll);
        });
    });
}); 