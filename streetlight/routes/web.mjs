import express from 'express';
import { getStreetlights } from '../controllers/streetlightcontroller.mjs';

const appRoutes = express.Router();

appRoutes.get('/', (req, res) => {
	// res.json("hello world from web.mjs")
  res.render('index.njk'); // Render search page
});

appRoutes.get('/results', async (req, res) => {
  try {
    const streetlights = await getStreetlights();
    res.render('results.njk', { response: streetlights });
  } catch (error) {
    res.status(500).send('Error loading results: ' + error.message);
  }
});

export default appRoutes;
