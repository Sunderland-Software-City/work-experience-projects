import Streetlight from '../model/streetlight.mjs';

const streetlights = [];
function getRandomCoordinate(min, max) {
	return Math.random() * (max - min) + min;
}

const generateStreetlights = (param = null) => {
	for (let i = 1; i <= 50; i++) {
		const randomLatitude = getRandomCoordinate(-90, 90);
		const randomLongitude = getRandomCoordinate(-180, 180);
		const streetlight = new Streetlight(i, `Street ${i}`, randomLatitude, randomLongitude);
		streetlights.push(streetlight);
	}
};

export const getStreetlights = async () => {
	try {
		if (streetlights.length == 0) {
			generateStreetlights();
		}
		return streetlights;
	} catch {
		throw new Error(error.message);
	}
};

// Function to get a streetlight by ID
export const getStreetlightById = async (id) => {
	try {
		if (streetlights.length === 0) {
			generateStreetlights();
		}
		// Find the streetlight by ID
		const streetlight = streetlights.find((light) => light.id === parseInt(id));
		if (!streetlight) {
			throw new Error('Streetlight not found');
		}
		return streetlight;
	} catch (error) {
		throw new Error(error.message);
	}
};
