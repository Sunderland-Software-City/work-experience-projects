async function fetchStreetlights() {
	const input = document.getElementById('searchInput').value;
	const response = await fetch(`/api/streetlights?name=${encodeURIComponent(input)}`);

	if (response.ok) {
		const streetlights = await response.json();
		displayStreetlights(streetlights);
	} else {
		console.error('Error fetching streetlights:', response.statusText);
	}
}

function displayStreetlights(streetlights) {
	const list = document.getElementById('streetlightList');
	list.innerHTML = ''; // Clear previous results

	streetlights.forEach((streetlight) => {
		const li = document.createElement('li');
		li.textContent = `ID: ${streetlight.id}, Street: ${
			streetlight.street
		}, Location: (${streetlight.latitude.toFixed(6)}, ${streetlight.longitude.toFixed(6)})`;

		// Create a "Select" button
		const selectButton = document.createElement('button');
		selectButton.textContent = 'Select';
		selectButton.addEventListener('click', () => {
			// Navigate to the details page with the streetlight ID as a query parameter
			window.location.href = `/api/streetlight/${streetlight.id}`;
		});

		li.appendChild(selectButton); // Append the button to the list item
		list.appendChild(li); // Append the list item to the list
	});
}
