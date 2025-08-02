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

  describe('GET /projects/:id', () => {
    it('should return a specific project by id', async () => {
      const newProject = {
        name: 'Specific Project',
        description: 'A project to find'
      };

      // Create a project first
      const createResponse = await request(app.getHttpServer())
        .post('/projects')
        .send(newProject)
        .expect(201);

      // Then get it by ID
      return request(app.getHttpServer())
        .get(`/projects/${createResponse.body.id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject({
            id: createResponse.body.id,
            name: 'Specific Project',
            description: 'A project to find'
          });
        });
    });

    it('should return 404 for non-existent project', () => {
      return request(app.getHttpServer())
        .get('/projects/non-existent-id')
        .expect(404);
    });
  });

  describe('PUT /projects/:id', () => {
    it('should update an existing project', async () => {
      const newProject = {
        name: 'Original Project',
        description: 'Original description'
      };

      // Create a project first
      const createResponse = await request(app.getHttpServer())
        .post('/projects')
        .send(newProject)
        .expect(201);

      const updateData = {
        name: 'Updated Project',
        description: 'Updated description'
      };

      // Update the project
      return request(app.getHttpServer())
        .put(`/projects/${createResponse.body.id}`)
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject({
            id: createResponse.body.id,
            name: 'Updated Project',
            description: 'Updated description',
            createdAt: createResponse.body.createdAt,
            updatedAt: expect.any(String)
          });
          expect(res.body.updatedAt).not.toBe(createResponse.body.updatedAt);
        });
    });

    it('should return 404 when updating non-existent project', () => {
      const updateData = {
        name: 'Updated Project',
        description: 'Updated description'
      };

      return request(app.getHttpServer())
        .put('/projects/non-existent-id')
        .send(updateData)
        .expect(404);
    });
  });

  describe('DELETE /projects/:id', () => {
    it('should delete an existing project', async () => {
      const newProject = {
        name: 'Project to Delete',
        description: 'Will be deleted'
      };

      // Create a project first
      const createResponse = await request(app.getHttpServer())
        .post('/projects')
        .send(newProject)
        .expect(201);

      // Delete the project
      await request(app.getHttpServer())
        .delete(`/projects/${createResponse.body.id}`)
        .expect(204);

      // Verify it's gone
      return request(app.getHttpServer())
        .get(`/projects/${createResponse.body.id}`)
        .expect(404);
    });

    it('should return 404 when deleting non-existent project', () => {
      return request(app.getHttpServer())
        .delete('/projects/non-existent-id')
        .expect(404);
    });
  });
});
