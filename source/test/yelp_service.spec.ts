import { getRandomRestaurant } from '../services/yelp.service';
import yelpResponse from '../../__fixtures__/yelp-response.json';
import axios from 'axios';

jest.mock('axios', () => {
    return {
        get: jest.fn()
    };
});

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Yelp service', () => {
    describe('getRandomRestaurant', () => {
        test('It returns a random restaurant', async () => {
            mockedAxios.get.mockResolvedValue({ data: yelpResponse });
            const response = await getRandomRestaurant(80229);
            expect(response.name).toBe('Bonchon Central Park');
            expect(response.url).toBe(
                'https://www.yelp.com/biz/bonchon-central-park-denver?adjust_creative=Gw2G3s-8y_nwhyQj-esq8Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Gw2G3s-8y_nwhyQj-esq8Q'
            );
            expect(response.rating).toBe(4.0);
            expect(response.distance).toBe(5.4);
            expect(response.location.address1).toBe('8340 Northfield Blvd');
            expect(response.location.address2).toBe('Ste 1590');
            expect(response.location.address3).toBe('');
            expect(response.location.city).toBe('Denver');
            expect(response.location.zip_code).toBe('80238');
            expect(response.location.country).toBe('US');
            expect(response.location.state).toBe('CO');
            expect(response.phone).toBe('(303) 248-3220');
        });
    });
});
