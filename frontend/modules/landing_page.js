import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    // const response = await fetch("http://65.1.197.19:8082/cities");
    const response = await fetch(config.backendEndpoint +'/cities');
    const data = await response.json();
    return data;
    
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  const responsive_Container = document.createElement("div");
  responsive_Container.className = "col-6 col-lg-3 mb-4";
  // 1st approach :-

  // const cityLink = document.createElement("a");
  // cityLink.id = id;
  // cityLink.href = `pages/adventures/?city=${id}`
  // responsive_Container.append(cityLink);

  // const cards = document.createElement("div");
  // cards.className = "tile";
  // const cityImage = document.createElement("img");
  // cityImage.src = image;
  // cards.append(cityImage);

  // const text_Container = document.createElement("div");
  // text_Container.className = "tile-text text-center";
  // const cityName = document.createElement("h4");
  // cityName.innerText = city;
  // const places = document.createElement("div");
  // places.innerText = description;
  // text_Container.append(cityName);
  // text_Container.append(places);

  // cards.append(text_Container);
  // cityLink.append(cards);

  //**   2nd approach       */

  responsive_Container.innerHTML = `
    <a href="pages/adventures/?city=${id}" id="${id}">
    <div class="tile">
      <img src="${image}"/>
          <div class="tile-text text-center">
              <h4>${city}</h4>
              <div>${description}</div>
          </div>
    </div>
  </a>
    `;

  const cardRow = document.getElementById("data");
  cardRow.appendChild(responsive_Container);
}

export { init, fetchCities, addCityToDOM };
