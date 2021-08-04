import { httpServer } from '../app';
import yelpResponse from '../../__fixtures__/yelp-response.json';
import noResults from '../../__fixtures__/no-results.json';
import request from 'supertest';
import axios from 'axios';

jest.mock('axios', () => {
    return {
        get: jest.fn()
    };
});

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GET random restaurant request', () => {
    test('It returns a random restaurant', async () => {
        mockedAxios.get.mockResolvedValue({ data: yelpResponse });
        const response = await request(httpServer).get('/api/v1/restaurants/random?zip_code=80229');
        expect(response.status).toBe(200);
        expect(response.body.url).toBe(
            'https://www.yelp.com/biz/bonchon-central-park-denver?adjust_creative=Gw2G3s-8y_nwhyQj-esq8Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Gw2G3s-8y_nwhyQj-esq8Q'
        );
        expect(response.body.rating).toBe(4.0);
        expect(response.body.distance).toBe(5.4);
        expect(response.body.location.address1).toBe('8340 Northfield Blvd');
        expect(response.body.location.address2).toBe('Ste 1590');
        expect(response.body.location.address3).toBe('');
        expect(response.body.location.city).toBe('Denver');
        expect(response.body.location.zip_code).toBe('80238');
        expect(response.body.location.country).toBe('US');
        expect(response.body.location.state).toBe('CO');
        expect(response.body.phone).toBe('(303) 248-3220');
    });

    test('Must provide radius greater than or equal to 1', async () => {
        const response = await request(httpServer).get('/api/v1/restaurants/random?zip_code=80229&radius=0');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Please provide a radius between 1 and 24');
    });

    test('Must provide radius less than or equal to 24', async () => {
        const response = await request(httpServer).get('/api/v1/restaurants/random?zip_code=80229&radius=0');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Please provide a radius between 1 and 24');
    });
    test('No results', async () => {
        mockedAxios.get.mockResolvedValue({ data: noResults });
        const response = await request(httpServer).get('/api/v1/restaurants/random?zip_code=80229&radius=1');
        expect(response.status).toBe(200);
        expect(response.body.error).toBe('No results within provided parameters');
    });

    test('Must provide zip_code', async () => {
        const response = await request(httpServer).get('/api/v1/restaurants/random');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Please provide a zip_code');
    });
});
