import express from 'express';
import { getAllPlants } from '../services/plants.mjs';

const appRoutes = express.Router();

// insert code in the space available to fetch the data you need.
// There is a controller available for you to use to fetch some plant data.
// getAllPlants()
// Will Return: all plants
// Extension: if you implement a search feature, you can pass the query parameter
// as an argument to the above controller to return a result for a specific plant.

// Route to render a list of plants
appRoutes.get('/', async (req, res, next) => {
	// TODO: use the provided function to return the plant data
	// and render your njk file(s)
});

export default appRoutes;
