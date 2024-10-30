const API_URL = 'https://trefle.io/api/v1/plants';
const API_TOKEN = process.env.TREFLE_API_TOKEN;

const handleRequest = async (path, params = {}) => {
	const queryParams = new URLSearchParams({ ...params, token: API_TOKEN });
	const response = await fetch(`${API_URL}${path}?${queryParams}`);

	if (!response.ok) {
		const errorBody = await response.text();
		console.error(`Error ${response.status}: ${response.statusText}`, errorBody);
		throw new Error(`API request failed: ${errorBody}`);
	}
	return response.json();
};

export const getAllPlants = async (params = null) => {
	if (params) {
		console.log(params, 'in services');
		try {
			const results = await handleRequest('/', {
				'filter[common_name]': params,
			});
			console.log(results.data[0]);
			return {
				id: results.data[0].id,
				common_name: results.data[0].common_name,
				scientific_name: results.data[0].scientific_name,
				image_url: results.data[0].image_url,
				year: results.data[0].year,
				bibliography: results.data[0].bibliography,
				family: results.data[0].family,
			};
		} catch (error) {
			console.error('Caught error:', error);
			throw new Error('Sorry, no plant found with that name. Details: ' + error.message);
		}
	} else {
		try {
			const results = await handleRequest('/');
			return results.data.map((result) => ({
				id: result.id,
				common_name: result.common_name,
				scientific_name: result.scientific_name,
				image_url: result.image_url,
				year: result.year,
				bibliography: result.bibliography,
				family: result.family,
			}));
		} catch (error) {
			console.error('Caught error:', error);
			throw new Error('Sorry, no plants found. Details: ' + error.message);
		}
	}
};
