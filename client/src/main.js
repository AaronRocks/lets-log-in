const width = 600;
const height = 400;
let ctx;
let car1;
let currentCars = [];
let app;

const init = () =>{

  app = new Vue({
    el: "#app",
    data:{
      carText: 'Get Cars',
      options: {},
      //racing: true,
    },
    methods:{
      addMyCar(){
        let myCar = document.querySelector("#carSelection");
        // check to make sure the value they are entering is not null
        if (!myCar.options[myCar.selectedIndex]){
          // if this code runs, the value is null
          this.retrieveCars('/badRequest');
          return;
        }
        let currentCar = myCar.options[myCar.selectedIndex].value;
        let carToAdd = listOfCars.splice(currentCar, 1);
        activeCars.push(carToAdd);
        myCar.remove(myCar.selectedIndex);
        //racing = false;
      },
      retrieveCars(url){
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
    
        xhr.setRequestHeader("Accept", 'application/json');
    
        xhr.onload = () => handleResponse(xhr);
    
        xhr.send();

        currentCars = []; // every time retrieve list, epty currenty race track
      },
      addCar(e){
        const nameForm = document.querySelector('#nameForm');
        sendPost(e, nameForm);
      },
      interemGetCar(){
        let url = '/getCars'
        this.retrieveCars(url);
      },
      race(){
        for (let i = 0; i < activeCars.length; i++){
          console.log(activeCars[i][0]);
          let newCar = new car(activeCars[i][0].color, activeCars[i][0].speed, activeCars[i][0].power, activeCars[i][0].special, ctx, 5, (i*40)+30, activeCars[i][0].name);
          currentCars.push(newCar);
          console.log(newCar);
        }
        //racing = false;
      },
    },
    computed:{
      isDisabled: function(){
        //return racing;
      }
    }
  });

  // canvas code
  ctx = document.querySelector("canvas").getContext('2d');
  loop();
};

window.onload = init;