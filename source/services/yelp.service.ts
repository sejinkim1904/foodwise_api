import axios from 'axios';
import { YelpBusiness } from '../interfaces/yelp';
import _ from 'lodash';

export const getRandomRestaurant = async (location: number, categories?: string, radius?: number): Promise<YelpBusiness> => {
    const convertedRadius = radius ? Math.round(radius) : undefined;

    const res = await axios.get(`${process.env.YELP_BASE_API}/search`, {
        params: {
            term: 'restaurants',
            categories: categories,
            location: location,
            radius: convertedRadius,
            open_now: true
        }
    });

    const randomPick = _.sample(res.data.businesses);

    return {
        name: randomPick.name,
        url: randomPick.url,
        rating: randomPick.rating,
        // Default unit from Yelp is meters. Conversion to miles
        distance: Math.round((randomPick.distance * 0.000621371 + Number.EPSILON) * 100) / 100,
        location: {
            address1: randomPick.location.address1,
            address2: randomPick.location.address2,
            address3: randomPick.location.address3,
            city: randomPick.location.city,
            zip_code: randomPick.location.zip_code,
            country: randomPick.location.country,
            state: randomPick.location.state
        },
        phone: randomPick.display_phone
    };
};
