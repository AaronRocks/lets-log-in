const width = 600;
const height = 400;
let ctx;
let myCar;

const parseJSON = (xhr, content) => {
  if (xhr.response){
    const obj = JSON.parse(xhr.response);
    console.dir(obj);

    if (obj.message){
      let myString = JSON.stringify(obj.message);
      content.innerHTML += `<p> ${myString}</p>`;
    }
  }
};

const handleResponse = (xhr) => {
  const content = document.querySelector('#content');
  
  switch(xhr.status){
    case 200:
      content.innerHTML = '<b> Success! Retrieved Car </b>';
      break;
    case 201:
      content.innerHTML = '<b> Created Car</b>';
      break;
    case 204:
      content.innerHTML = '<b> Updated Existing Car </b>';
      break;
    case 400:
      content.innerHTML = '<b> Bad Request, Need more info on car </b>';
      break;
    case 404:
      content.innerHTML = `<b> Car Not Found </b>`;
      break;
    default: // 500
      content.innerHTML = '<b> Not Implemented Yet </b>';
      break;
  }

  parseJSON(xhr, content);
};

const sendPost = (e, nameForm) => {
  e.preventDefault();

  const nameAction = nameForm.getAttribute('action');
  const nameMethod = nameForm.getAttribute('method');

  const nameField = nameForm.querySelector('#nameField').value;
  const speedField = nameForm.querySelector('#speedField').value;
  const specialField = nameForm.querySelector('#specialField').value;
  const powerField = nameForm.querySelector('#powerField').value;

  const xhr = new XMLHttpRequest();
  xhr.open(nameMethod, nameAction);

  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = () => handleResponse(xhr);

  const formData = `name=${nameField}&special=${specialField}&speed=${speedField}&power=${powerField}`;

  xhr.send(formData);

  return false;
};

// for handling get
const sendAjax = (e, userForm) => {
  e.preventDefault();
  
  let userRequestType = userForm.getAttribute('method');
  userRequestType = userForm.querySelector("#methodSelect").value.toUpperCase();
  let userUrl = userForm.getAttribute('action');
  userUrl = userForm.querySelector("#urlField").value;

  const xhr = new XMLHttpRequest();
  xhr.open(userRequestType, userUrl);

  xhr.setRequestHeader("Accept", 'application/json');

  xhr.onload = () => handleResponse(xhr);

  xhr.send();
};

const init = () =>{
  // server code
    // nameform sends a post request
    const nameForm = document.querySelector('#nameForm');
    // user form sends a get request (either body or head)
    const userForm = document.querySelector("#userForm");
        
    const addUser = (e) => sendPost(e, nameForm);
        
    nameForm.addEventListener('submit', addUser);

    const getUser = (e) => sendAjax(e, userForm);

    userForm.addEventListener('submit', getUser);

    // canvas code
    ctx = document.querySelector("canvas").getContext('2d');
    myCar = new car();
    loop();
};
function drawCar(){
  ctx.beginPath();
  ctx.fillStyle = 'green';
  ctx.fillRect(myCar.xPosition, myCar.yPosition, 40, 30);
  ctx.stroke();
}

class car{
  constructor(color, speed = 8, power = 3, special = 2,x = 0, y = 40){
    this.speed = speed;
    this.power = power;
    this.special = special;
    this.xPosition = x;
    this.yPosition = y;
    this.color = color;
  }

  move(){
    if (this.xPosition <= width - 40){
      this.xPosition++;
    }
  }
}

function loop(){
  requestAnimationFrame(loop);
  ctx.clearRect(0, 0, width, height);
  drawCar();
  myCar.move();
}

window.onload = init;