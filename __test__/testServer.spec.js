const app = require('../src/server/server');
const supertest = require('supertest');
const request = supertest(app);


describe('test endpoint for 200 status', () => {
  it('/test', async () => {
    const response = await request.get('/test');
    expect(response.status).toBe(200);
  });
});