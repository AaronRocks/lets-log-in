const width = 600;
const height = 400;
let ctx;
let myCar;


const init = () =>{
    // canvas code
    ctx = document.querySelector("canvas").getContext('2d');
    myCar = new car();
    loop();
};

window.onload = init;