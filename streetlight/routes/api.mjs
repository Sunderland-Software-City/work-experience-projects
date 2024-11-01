import express from 'express';
import { getStreetlights, getStreetlightById } from '../controllers/streetlightcontroller.mjs';

const apiRoutes = express.Router();

apiRoutes.get('/streetlights', async (req, res) => {
	const name = req.query.name || '';
	try {
		const streetlights = await getStreetlights();
		const filteredStreetlights = streetlights.filter((streetlight) =>
			streetlight.street.toLowerCase().includes(name.toLowerCase()),
		);
		res.json(filteredStreetlights);
	} catch (error) {
		console.error('Error fetching streetlights:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Get streetlight by ID and render details page
apiRoutes.get('/streetlight/:id', async (req, res) => {
	try {
		const streetlight = await getStreetlightById(req.params.id);
		res.render('streetlight.njk', { streetlight });
	} catch (error) {
		console.error('Error fetching streetlight:', error);
		res.status(404).render('404.njk', { message: 'Streetlight not found' });
	}
});

// Report streetlight as broken
apiRoutes.post('/streetlight/:id/report', async (req, res) => {
	try {
		const streetlight = await getStreetlightById(req.params.id);
		const message = streetlight.reportBroken();

		// Render `streetlight.njk` with updated streetlight data
		res.render('streetlight.njk', { streetlight, message });
	} catch (error) {
		console.error('Error reporting streetlight as broken:', error);
		res.status(500).render('500.njk', { message: 'Failed to report streetlight' });
	}
});

// Mark streetlight as fixed
apiRoutes.post('/streetlight/:id/fix', async (req, res) => {
	try {
		const streetlight = await getStreetlightById(req.params.id);
		streetlight.markFixed(); // Call the method to mark it as fixed

		// Optionally, you can return a success message or render a page
		res.json({ message: 'Streetlight has been marked as fixed.' });
	} catch (error) {
		console.error('Error marking streetlight as fixed:', error);
		res.status(500).json({ error: 'Failed to mark streetlight as fixed' });
	}
});

export default apiRoutes;
