import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
      let cityData =  search.split("=");
      // console.log(cityData[1]);
      return cityData[1];

  // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  try {
    const adventureResponse =  await fetch(config.backendEndpoint + `/adventures/detail/?adventure=${adventureId}`);
    const adventureCity = await adventureResponse.json();
    console.log(adventureCity);
    return adventureCity; 
  } catch (error) {  
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
    document.getElementById("adventure-name").innerHTML=adventure.name;
    document.getElementById("adventure-subtitle").innerHTML=adventure.subtitle;

    const adventureImage = adventure.images;
    adventureImage.forEach(element => {
      const imageContainer = document.createElement("div");
      imageContainer.innerHTML=`
      <img src="${element}" class="activity-card-image" alt="">
      `;
      document.getElementById("photo-gallery").append(imageContainer);
    });

    document.getElementById("adventure-content").innerHTML=adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  console.log(images);
  document.getElementById("photo-gallery").innerHTML=`
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators" id="slide-indicators">
  </div>
  <div class="carousel-inner" id="unique-slide">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;

  images.forEach((imgelement,i)=>{
    document.getElementById("unique-slide").innerHTML +=`
    <div class="${"carousel-item" + (i === 0 ? " active" : "")}">
    <img src="${imgelement}" class="d-block w-100 activity-card-image" alt="...">
    </div>
    `;
    document.getElementById("slide-indicators").innerHTML += `
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="${i === 0 ? "active" : ""}" aria-current="true" aria-label="Slide ${i+1}"></button>
    `;
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

    // console.log(adventure);
  
   if (adventure.available) {
     document.getElementById("reservation-panel-sold-out").style.display="none";
     document.getElementById("reservation-panel-available").style.display="block";
     document.getElementById("reservation-person-cost").textContent = adventure.costPerHead;
    //  console.log( adventure.costPerHead);
   } else {
    document.getElementById("reservation-panel-available").style.display="none";
    document.getElementById("reservation-panel-sold-out").style.display="block";
   }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
    // console.log(adventure,persons);
    // console.log(adventure.costPerHead*persons);
    document.getElementById("reservation-cost").textContent = adventure.costPerHead*persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  document.getElementById("myForm").addEventListener("submit",async event => {
    event.preventDefault();
    try {     
      console.log(document.getElementById("myForm").elements);
      let form = document.getElementById("myForm");
      console.log(form.elements.name.value);
      console.log(form.elements.date.value);
      console.log(form.elements.person.value);
      console.log(adventure.id);

    await fetch(config.backendEndpoint + '/reservations/new',{
        method : 'POST',
        body : JSON.stringify({
          name : form.elements.name.value,
          date: form.elements.date.value,
          person : form.elements.person.value,
          adventure : adventure.id
        }),
        headers : {
          "Content-Type" : "application/json",
        },
      })
        alert('success')
    } catch (error) {
      alert('Error')
    }    
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display="block";
  } else {
    document.getElementById("reserved-banner").style.display="none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
