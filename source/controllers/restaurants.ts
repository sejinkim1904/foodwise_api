import { NextFunction, Request, Response } from 'express';
import { getRandomRestaurant } from '../services/yelp.service';

const getRestaurant = async (req: Request, res: Response, _next: NextFunction) => {
    const zip_code: string = req.query.zip_code as string;
    const categories: string = req.query.categories as string;
    const radius: string = req.query.radius as string;
    const restaurant = await getRandomRestaurant(zip_code, categories, radius);

    if (!zip_code) {
        res.status(400).json({
            error: 'Please provide a zip_code'
        });
        return;
    }

    if (parseInt(radius) < 1 || parseInt(radius) > 24) {
        res.status(400).json({
            error: 'Please provide a radius between 1 and 24'
        });
        return;
    }

    res.status(200).json(restaurant);
};

export default { getRestaurant };
