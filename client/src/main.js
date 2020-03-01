const width = 600;
const height = 400;
let ctx;
let car1;
let currentCars = [];
let winning = false;

const init = () =>{
  let app = new Vue({
    el: "#app",
    data:{
      carText: 'Rest Car List',
      options: {},
      racing: true,
      carsInRace: [],
    },
    methods:{
      addMyCar(){
        let myCar = document.querySelector("#carSelection");
        // check to make sure the value they are entering is not null
        if (!myCar.options[myCar.selectedIndex]){
          // if this code runs, the value is null - user makes bad request as not having any cars left to race
          this.retrieveCars('/badRequest');
          if (currentCars){
            this.racing = false;
          }
          return;
        }
        // update list of cars that will be racing from list of all cars
          // check to make sure not over 10 cars in race
        if(activeCars.length < 10){
          let currentCar = myCar.options[myCar.selectedIndex].value;
          let carToAdd = listOfCars[currentCar];
          activeCars.push(carToAdd);
          myCar.remove(myCar.selectedIndex);
          this.racing = false; // can now click racing button
          this.carsInRace.push(carToAdd);
        }
        else{
          document.querySelector("#content").innerHTML = "<b>10 is the limit of cars in the race. Reset to add change cars</b>";
          return;
        }
      },
      retrieveCars(url){
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
    
        xhr.setRequestHeader("Accept", 'application/json');
    
        xhr.onload = () => handleResponse(xhr);
    
        xhr.send();

        this.racing = true;
        this.carsInRace = [];
      },
      // add car to server (reactive)
      addCar(e){
        const nameForm = document.querySelector('#nameForm');
        sendPost(e, nameForm);
        this.interemGetCar();
      },
      // since grabing button from form, sends proper url to retreive all cars
      interemGetCar(){
        let url = '/getCars'
        this.retrieveCars(url);
      },
      race(){
        // when racing, chacks to make sure there are at least 2 cars (min for race)
        currentCars = [];

        winning = false;

        if (activeCars.length < 2){
          document.querySelector("#content").innerHTML = '<b>Not enough cars in race. Need at least 2 cars</b>';
          return;
        }
        else{
          document.querySelector("#content").innerHTML = '<b>The race begins!</b>';
        }
        
        // when time to race, cares list of cars to race, creates car class and starts drawing cars
        for (let i = 0; i < activeCars.length; i++){
          let newCar = new car(activeCars[i].color, activeCars[i].speed, activeCars[i].power, activeCars[i].special, ctx, 5, (i*40), activeCars[i].name);
          currentCars.push(newCar);
        }
      },
    },
    created(){
      // when vue is first instantiated on the client side, it makes a call 
      //to the server for all the cars that are there and will also send a call to 
      // add and cars in local storage to the list by adding them
      let carsToCreate = allCars._load();
      if (carsToCreate){
        let createdCar = carsToCreate.split('|'); // addto to local storage withj a | marker seperating them
        let carsFromStorage = [];
        for(let i = 0; i < createdCar.length; i++){
          let interemCar = JSON.parse(createdCar[i]); // parses the split strings back into objects
          for (let j = 0; j < carsFromStorage.length; j++){
            if (interemCar.name === carsFromStorage[j].name){ // checks if the car being parsed is an updated version of a previous car
              carsFromStorage[j] = interemCar;
              interemCar.updated = true;
              continue;
            }
          }
          if(!interemCar.updated){ // if the car is not an update of the previous car, add to list of cars to push/ request from server
            carsFromStorage.push(interemCar);
          }
        }
        for (let car of carsFromStorage){
          sendPostNoForm(car.name, car.special, car.speed, car.power, car.color);
        }
        //sendPostNoForm(carsToCreate.name, carsToCreate.special, carsToCreate.speed, carsToCreate.power, carsToCreate.color);
      }
      this.interemGetCar();
    },
    computed:{
      isDisabled: function(){
        return this.racing;
      },
    }
  });

  // canvas code
  ctx = document.querySelector("canvas").getContext('2d');
  loop();
};

window.onload = init;
// clear storage if need to analyze why local storage is throwing an error
//window.localStorage.clear();