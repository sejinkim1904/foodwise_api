import express from 'express';
import controller from '../controllers/health';

const router = express.Router();

router.get('/ping', controller.serverHealthCheck);

export { router as healthCheckRouter };
