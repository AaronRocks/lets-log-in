'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var car = function () {
  function car(color) {
    var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
    var power = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
    var special = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
    var ctx = arguments[4];
    var x = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 5;
    var y = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 90;

    _classCallCheck(this, car);

    this.ctx = ctx;
    this.speed = speed;
    this.power = power;
    this.special = special;
    this.xPosition = x;
    this.yPosition = y;
    this.color = color;
  }

  _createClass(car, [{
    key: 'drawMyCar',
    value: function drawMyCar() {
      var x = this.xPosition;
      var y = this.yPosition;

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.fillStyle = this.color;
      this.ctx.moveTo(x, y); // start
      this.ctx.lineTo(x - 5, y + 10); // back - top/ middle
      this.ctx.lineTo(x - 5, y + 25); // back - middle
      this.ctx.lineTo(x, y + 25); // back - middle/ bottom
      this.ctx.lineTo(x, y + 30); // back - bottom

      this.ctx.lineTo(x + 5, y + 30); // bottom to back wheel
      this.ctx.bezierCurveTo(x + 5, y + 22, x + 15, y + 22, x + 15, y + 30); // back wheel
      this.ctx.lineTo(x + 25, y + 30); // bottom to front wheel
      this.ctx.bezierCurveTo(x + 25, y + 22, x + 35, y + 22, x + 35, y + 30); // front wheel
      this.ctx.lineTo(x + 40, y + 30); // bottom to front

      this.ctx.lineTo(x + 40, y + 25); // front - bottom
      this.ctx.lineTo(x + 45, y + 25); // front - bottom/ middle
      this.ctx.lineTo(x + 45, y + 15); // front - middle
      this.ctx.lineTo(x + 35, y); // front - top
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.strokeStyle = 'green';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      this.ctx.restore();
      this.drawWheel(x, y);
    }
  }, {
    key: 'drawWheel',
    value: function drawWheel(x, y) {
      this.ctx.save();
      this.ctx.fillStyle = this.color;
      this.ctx.arc(x + 10, y + 30, 5, 0, 2 * Math.PI, false); // back wheel
      this.ctx.moveTo(x + 30, y + 30);
      this.ctx.arc(x + 30, y + 30, 5, 0, 2 * Math.PI, false); // front wheel
      this.ctx.fill();
      this.ctx.restore();
    }
  }, {
    key: 'move',
    value: function move() {
      if (this.xPosition <= width - 45) {
        this.xPosition++;
      }
    }
  }]);

  return car;
}();

function loop() {
  requestAnimationFrame(loop);
  ctx.clearRect(0, 0, width, height);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = currentCars[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _car = _step.value;

      _car.drawMyCar();
      _car.move();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
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
"use strict";

var width = 600;
var height = 400;
var ctx = void 0;
var car1 = void 0;
var currentCars = [];

var init = function init() {

  var addCarButton = document.querySelector("#addToRace");
  addCarButton.onclick = function (e) {
    var currentCar = document.querySelector(".selectedCar").nodeValue;
    activeCars.push(listOfCars.splice(listOfCars[currentCar], 1));
  };
  var app = new Vue({
    el: "#app",
    data: {
      carText: 'Get Cars'
    },
    methods: {}
  });
  // server code
  handleForm();
  ctx = document.querySelector("canvas").getContext('2d');
  document.querySelector("#race").onclick = function () {
    for (var i = 0; i < activeCars.length; i++) {
      var newCar = new car(activeCars[i].color, activeCars[i].speed, activeCars[i].power, activeCars[i].special, ctx);
      currentCars.push(newCar);
    }
  };
  // canvas code
  loop();
};

window.onload = init;
