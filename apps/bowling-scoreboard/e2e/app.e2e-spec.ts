import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { BowlingScoreboardModule } from '../src/bowling-scoreboard.module';

describe('BowlingScoreboardController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BowlingScoreboardModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('post endpoint should', () => {
    it('take in number of pins knocked on a roll and return the frames of the game', async () => {
      const roll = 5;

      const response = await request(app.getHttpServer())
        .post('/roll')
        .send({roll})
        .expect(200);

      expect(response.body).toEqual({
        frames: [[5]]
      });
    });
  });
});
