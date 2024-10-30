import express from 'express';
import { getAllPlants } from '../services/plants.mjs';

const apiRoutes = express.Router();

// Get all plants
apiRoutes.get('/plants', getAllPlants);

export default apiRoutes;
