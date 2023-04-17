
function getRandomIntInclusive(min, max){
    min = Math.ceil(min);
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  function injectHTML(list) {
    console.log('fired injectHTML')
    const target = document.querySelector('#restaurant_list')
    target.innerHTML = '';
    list.forEach((item) => {
      const str = `<li>${item.name}</li>`;
      target.innerHTML += str
    })
  }
  
  
  
  function filterList(list, query) {
    return list.filter((item) => {
      const lowerCaseName = item.name.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();
      return lowerCaseName.includes(lowerCaseQuery);
    });
    
   
  }
  
  function cutRestaurantList(list) {
    console.log('fired cut list');
    const range = [...Array(15).keys()]
    return newArray = range.map((item) => {
      const index = getRandomIntInclusive(0, list.length -1);
      return list[index]
    })
  }
  
  async function mainEvent() { // the async keyword means we can make API requests
    const mainForm = document.querySelector(".main_form"); // This class name needs to be set on your form before you can listen for an event on it
    const loadDataButton = document.querySelector("#data_load");
    const generateListButton = document.querySelector("#generate");
    const textField = document.querySelector("#resto");
    
    const loadAnimation = document.querySelector("#data_load_animation");
    loadAnimation.style.display = "none";
    generateListButton.classList.add("hidden");

    const storedData = localStorage.getItem('storedData');
    const parsedData = JSON.parse(storedData);
    if (parsedData.length > 0){
      generateListButton.classList.remove("hidden");
    }
  
    let currentList = []; // this is "scoped" to the main event function
    
    /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
    loadDataButton.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
      console.log('Loading Data'); 
      loadAnimation.style.display = 'inline-block';
  
      
  
      // Basic GET request - this replaces the form Action
      const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
      //console.long(results);
  
      // This changes the response from the GET into data we can use - an "object"
      const storedList = await results.json();
      localStorage.setItem('storedData', JSON.stringify(storedList));
      
      loadAnimation.style.display = 'none';
      //console.table(storedList); 
      injectHTML(currentList);
    });

    generateListButton.addEventListener('click', (event) => {
        console.log("generate new list");
        //console.log('what is the type of recallList:', typeof recallList);
        currentList = cutRestaurantList(parsedData);
        console.log(currentList);
        injectHTML(currentList); 
        
    })
    /*
      Now that you HAVE a list loaded, write an event listener set to your filter button
      it should use the 'new FormData(target-form)' method to read the contents of your main form
      and the Object.fromEntries() method to convert that data to an object we can work with
  
      When you have the contents of the form, use the placeholder at line 7
      to write a list filter
  
      Fire it here and filter for the word "pizza"
      you should get approximately 46 results
    */
   textField.addEventListener('input', (event) => {
      console.log("input", event.target.value);
      const newList = filterList(currentList, event.target.value);
      console.log(newList);
      injectHTML(newList);  
   })
  }
  
  
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
  