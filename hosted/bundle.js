'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function drawCar() {
  ctx.beginPath();
  ctx.fillStyle = 'green';
  ctx.fillRect(myCar.xPosition, myCar.yPosition, 40, 30);
  ctx.stroke();
}

var car = function () {
  function car(color) {
    var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
    var power = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
    var special = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
    var x = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var y = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 40;

    _classCallCheck(this, car);

    this.speed = speed;
    this.power = power;
    this.special = special;
    this.xPosition = x;
    this.yPosition = y;
    this.color = color;
  }

  _createClass(car, [{
    key: 'move',
    value: function move() {
      if (this.xPosition <= width - 40) {
        this.xPosition++;
      }
    }
  }]);

  return car;
}();

function loop() {
  requestAnimationFrame(loop);
  ctx.clearRect(0, 0, width, height);
  drawCar();
  myCar.move();
}
'use strict';

var listOfCars = [];
var activeCars = [];

var parseJSON = function parseJSON(xhr, carSelection) {
  if (xhr.response) {
    var obj = JSON.parse(xhr.response);
    console.dir(obj);

    if (obj.message) {
      var messageValueArray = Object.values(obj.message);
      var carValueArray = Object.values(messageValueArray[0]);

      if (messageValueArray[1] === 'cars') for (var el = 0; el < carValueArray.length; el++) {
        if (!carSelection.options[el]) {
          var createdCar = document.createElement("option");
          createdCar.label = carValueArray[el].name;
          createdCar.value = el; // can find reference to obj later in array
          createdCar.class = 'selectedCar';
          carSelection.appendChild(createdCar);
          listOfCars.push(carValueArray[el]);
        }
      }
    }
  }
};

var handleResponse = function handleResponse(xhr) {
  var content = document.querySelector('#content');
  var carSelection = document.querySelector('#carSelection');

  switch (xhr.status) {
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
      content.innerHTML = '<b> Car Not Found </b>';
      break;
    default:
      // 500
      content.innerHTML = '<b> Not Implemented Yet </b>';
      break;
  }

  parseJSON(xhr, carSelection);
};

var sendPost = function sendPost(e, nameForm) {
  e.preventDefault();

  var nameAction = nameForm.getAttribute('action');
  var nameMethod = nameForm.getAttribute('method');

  var nameField = nameForm.querySelector('#nameField').value;
  var speedField = nameForm.querySelector('#speedField').value;
  var specialField = nameForm.querySelector('#specialField').value;
  var powerField = nameForm.querySelector('#powerField').value;

  var xhr = new XMLHttpRequest();
  xhr.open(nameMethod, nameAction);

  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function () {
    return handleResponse(xhr);
  };

  var formData = 'name=' + nameField + '&special=' + specialField + '&speed=' + speedField + '&power=' + powerField;

  xhr.send(formData);

  return false;
};

function handleForm() {
  // nameform sends a post request
  var nameForm = document.querySelector('#nameForm');
  // user form sends a get request (either body or head)
  // const userForm = document.querySelector("#userForm");

  var getCarsButton = document.querySelector("#getCars");

  var addUser = function addUser(e) {
    return sendPost(e, nameForm);
  };

  nameForm.addEventListener('submit', addUser);

  getCarsButton.onclick = function (_) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", '/getCars');

    xhr.setRequestHeader("Accept", 'application/json');

    xhr.onload = function () {
      return handleResponse(xhr);
    };

    xhr.send();
  };
}

var handleInit = function handleInit() {
  // server code
  handleForm();
};

window.onload = handleInit;
"use strict";

var width = 600;
var height = 400;
var ctx = void 0;
var myCar = void 0;

var init = function init() {
    // canvas code
    ctx = document.querySelector("canvas").getContext('2d');
    myCar = new car();
    loop();
};

window.onload = init;
