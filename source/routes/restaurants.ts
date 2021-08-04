import express from 'express';
import controller from '../controllers/restaurants';

const router = express.Router();

router.get('/random', controller.getRestaurant);

export { router as restaurantsRouter };
