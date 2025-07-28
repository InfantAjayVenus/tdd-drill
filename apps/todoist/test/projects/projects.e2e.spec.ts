import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { beforeEach, describe, expect, it, afterEach } from 'vitest';
import { ProjectsModule } from '../../src/projects/projects.module';

describe('Projects (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProjectsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /projects', () => {
    it('should return an empty array when no projects exist', () => {
      return request(app.getHttpServer())
        .get('/projects')
        .expect(200)
        .expect([]);
    });
  });
});
