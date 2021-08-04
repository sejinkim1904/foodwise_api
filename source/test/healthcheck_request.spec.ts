import { httpServer } from '../app';
import request from 'supertest';

describe('Health check request', () => {
    test('It returns pong', async () => {
        const response = await request(httpServer).get('/api/v1/healthcheck/ping');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('pong');
    });
});
