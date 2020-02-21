const width = 600;
const height = 400;
let ctx;
let car1;
let currentCars = [];

const init = () =>{
  console.log(listOfCars);

  let app = new Vue({
    el: "#app",
    data:{
      carText: 'Get Cars',
      options: {},
    },
    methods:{
      addMyCar(){
        let myCar = document.querySelector("#carSelection");
        let currentCar = myCar.options[myCar.selectedIndex].value -1;
        activeCars.push(listOfCars.splice(currentCar, 1));
        console.log(listOfCars);
        console.log(activeCars);
      },
      retrieveCars(){
        const xhr = new XMLHttpRequest();
        xhr.open("GET", '/getCars');
    
        xhr.setRequestHeader("Accept", 'application/json');
    
        xhr.onload = () => handleResponse(xhr);
    
        xhr.send();
      }
    },
    computed:{
      isDisabled: function(){

      }
    }
  });
  // server code
  handleForm();
  ctx = document.querySelector("canvas").getContext('2d');
  document.querySelector("#race").onclick = () =>{
    for (let i = 0; i < activeCars.length; i++){
      let newCar = new car(activeCars[i][0].color, activeCars[i][0].speed, activeCars[i][0].power, activeCars[i][0].special, ctx, 5, (i*40)+30);
      console.log(newCar);
      currentCars.push(newCar);
    }
  }
    // canvas code
    loop();
};

window.onload = init;