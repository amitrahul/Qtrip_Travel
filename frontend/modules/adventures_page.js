
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  //  1st approach
    const city = search;
    const newCity = city.slice(6);
    // console.log(newCity);
    return newCity;yes

    //2nd approach (appropriate)
    //  let obj = new URLSearchParams(search);
    //  return obj.get(city);

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  
  try {
    // 1st way
    //  const cityResponse = await fetch(`http://65.1.197.19:8082/adventures/?city=${city}`);
      // 2nd way
     const cityResponse = await fetch(config.backendEndpoint + `/adventures/?city=${city}`);
     const city_Adventure = await cityResponse.json();
     console.log(city_Adventure);
     return city_Adventure;
    
   } catch (error) {
      return null;
   }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  // console.log(adventures[0].id);
  adventures.forEach(element => {
    // console.log(element);  
    const cards = document.createElement("div");
    // 1st way
     cards.className="col-6 col-lg-3 mb-4"
    //  2nd way
    // cards.classList.add('col-6','col-lg-3','mb-4');
  
     cards.innerHTML =`
    <a href="detail/?adventure=${element.id}" id="${element.id}">
    <div class="activity-card">
        <img src="${element.image}"
         alt="${element.name}"/>
         <div class="category-banner">
            <h4>${element.category}</h4>
         </div>
         <div class="adventure_Price">
              <p>${element.name}</p>
              <p>${element.costPerHead}</p>
         </div>
         <div class="adventure_Price">
              <p>Duration</p>
              <p>${element.duration}</p>
         </div>
    </div>
  </a>
    `;
    
    const card_Row = document.getElementById("data");
    card_Row.append(cards);
  });
  


}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredDurationlist = [];
  
  for (let i = 0; i < list.length; i++) {
    let updatedDuration = list[i].duration;
      if (updatedDuration >= low && updatedDuration <= high) {
        filteredDurationlist.push(list[i]);
      }
  }

  return filteredDurationlist;
 
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  //   1st way : -

  // console.log(categoryList);
  // let categoryData = [];
  // for(let i=0;i<list.length;i++)
  // {
  //   let updatedCategory = list[i].category;
  //   for (let j = 0; j < categoryList.length; j++) {
  //     if(categoryList[j]=== updatedCategory)
  //     {
  //       categoryData.push(list[i]);
  //     }   
  //     // console.log(categoryList);  
  //   }
  // }
  // console.log("Filered List: \n");
  // console.log(categoryData);
  // return categoryData;  

  // 2nd way :- 
  let categoryData = [];
//   list.filter((e)=> if(categoryList.includes(e.category)) {
//     categoryData.push(e.category);
// });

  list.filter((function (e){
    if (categoryList.includes(e.category)) {
      categoryData.push(e);
    }
  }));
  return categoryData;
}


// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
 
  // let keyList = Object.keys(filters);
  // if(keyList.length>0){
  //   if(keyList.includes(filters["category"])){
  //   }
  // }
  // console.log(Object.keys(filters).length);
  // console.log(filters.category.length);
  // console.log(filters.duration.length);

  let durationArr =[];

  let durationData = filters.duration;
  // console.log(durationData);
  durationArr = durationData.split("-");
  // console.log(durationArr);
  
    if (filters.category.length > 0 && filters.duration.length > 0) {
      let durationFilter = filterByDuration(list,durationArr[0],durationArr[1]);//first filter duration filter then after apply it to duration filter
        return filterByCategory(durationFilter,filters.category); // filter category on the basis of duration filter.
    }
    else if (filters.category.length >0) {
      // console.log(filters.category.length);

      const updatedCategoryList =  filterByCategory(list,filters.category);
      return updatedCategoryList;
      
    }
    else if (filters.duration.length > 0) {
      // console.log(filters.duration.length);
      const updatedDurationList =  filterByDuration(list,durationArr[0],durationArr[1]);
      // console.log(updatedDurationList);
      return updatedDurationList;
    }
    else{
      return list;
    }

  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

 let data = window.localStorage.getItem("filters");
  // Place holder for functionality to work in the Stubs
  return JSON.parse(data); // convert String into json format, here data is now string format and it will convert into json format.
  // return null; // return null value when local storage dosenot have any data.
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  if(filters.category.length  > 0)
  {
    for(let i=0; i< filters.category.length; i++)
    {
     let selectedItems =  document.getElementById("category-list");
       const filteredItems = document.createElement("div");
       filteredItems.className = "category-filter";
       filteredItems.innerText = filters.category[i];

      //  const filteredDurationItems = document.createElement("div");
      //  filteredDurationItems.className="category-filter";
      //  filteredDurationItems.innerText = filters.duration;

       selectedItems.append(filteredItems);
      //  selectedItems.append(filteredDurationItems);
    }
  }

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
