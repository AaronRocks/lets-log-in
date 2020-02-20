const width = 600;
const height = 400;
let ctx;
let car1;
let currentCars = [];

const init = () =>{

  const addCarButton = document.querySelector("#addToRace");
  addCarButton.onclick = function(){
    let currentCar = document.querySelector(".selectedCar").value;
    activeCars.push(listOfCars.splice(listOfCars[currentCar], 1));
  }

  let app = new Vue({
    el: "#app",
    data:{
      carText: 'Get Cars',
    },
    methods:{}
  });
  // server code
  handleForm();
  ctx = document.querySelector("canvas").getContext('2d');
  document.querySelector("#race").onclick = () =>{
    for (let i = 0; i < activeCars.length; i++){
      let newCar = new car(activeCars[i].color, activeCars[i].speed, activeCars[i].power, activeCars[i].special, ctx);
      currentCars.push(newCar);
    }
  }
    // canvas code
    loop();
};

window.onload = init;