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

    it('should return created projects', async () => {
      const newProject = {
        name: 'My Test Project',
        description: 'A project for testing'
      };

      // Create a project first
      const createResponse = await request(app.getHttpServer())
        .post('/projects')
        .send(newProject)
        .expect(201);

      // Then verify it appears in the list
      return request(app.getHttpServer())
        .get('/projects')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(1);
          expect(res.body[0]).toMatchObject({
            id: createResponse.body.id,
            name: 'My Test Project',
            description: 'A project for testing'
          });
        });
    });
  });

  describe('POST /projects', () => {
    it('should create a new project and return it', () => {
      const newProject = {
        name: 'My First Project',
        description: 'A test project'
      };

      return request(app.getHttpServer())
        .post('/projects')
        .send(newProject)
        .expect(201)
        .expect((res) => {
          expect(res.body).toMatchObject({
            id: expect.any(String),
            name: 'My First Project',
            description: 'A test project',
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          });
        });
    });
  });
});
