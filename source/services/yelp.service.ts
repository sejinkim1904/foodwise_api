import axios from 'axios';
import { NoResults, YelpBusiness } from '../interfaces/yelp';
import _ from 'lodash';

export const getRandomRestaurant = async (location: string, categories?: string, radius?: string): Promise<YelpBusiness | NoResults> => {
    const convertedRadius = radius ? Math.round(parseInt(radius)) * 1609 : undefined;

    try {
        const res = await axios.get(`${process.env.YELP_BASE_URL}/search`, {
            headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` },
            params: {
                term: 'restaurants',
                categories: categories,
                location: location,
                radius: convertedRadius,
                open_now: true
            }
        });

        if (res.data.total === 0) {
            return { error: 'No results within provided parameters' };
        }

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
    } catch (error) {
        if (error.isAxiosError) {
            return error.response.data;
        }

        throw error;
    }
};
