// Add to collection - in local storage
const addToCollection = (plant) => {
  const collection = JSON.parse(localStorage.getItem("plantCollection")) || [];
  collection.push(plant);
  localStorage.setItem("plantCollection", JSON.stringify(collection));
  console.log(`${plant.common_name} added to collection`);

  const myCollection = document.getElementById("my-collection");
  myCollection.innerHTML += `<p>${plant.common_name}</p>`;
};
