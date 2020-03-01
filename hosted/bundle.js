'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var car = function () {
  function car() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "purple";
    var speed = arguments[1];
    var power = arguments[2];
    var special = arguments[3];
    var ctx = arguments[4];
    var x = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 5;
    var y = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 90;
    var name = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 'elizabeth';

    _classCallCheck(this, car);

    this.ctx = ctx;
    this.speed = speed;
    this.power = power;
    this.special = special;
    this.xPosition = x;
    this.yPosition = y;
    this.color = color;
    this.name = name;
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
        this.xPosition += (this.special * (Math.random() + 1) + this.speed * 2 + this.power) / 10;
      } else if (!winning) {
        this.winning = true;
        winning = true;
      }
    }
  }]);

  return car;
}();

function loop() {
  requestAnimationFrame(loop);
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  // draw race lines on canvas
  for (var i = 0; i < height / 30; i++) {
    ctx.moveTo(0, 40 * i);
    ctx.lineTo(width, 40 * i);
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }
  ctx.restore();
  // daw all the cars
  if (currentCars != []) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = currentCars[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var carToDraw = _step.value;

        carToDraw.drawMyCar();
        carToDraw.move();
        if (carToDraw.winning) {
          document.querySelector("#content").innerHTML = '<b>' + carToDraw.name + ' WINS</b>';
        }
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
}
'use strict';

var listOfCars = [];
var activeCars = [];

var parseJSON = function parseJSON(xhr, carSelection) {
  if (xhr.response) {
    var obj = JSON.parse(xhr.response);

    if (obj.message) {
      var messageValueArray = Object.values(obj.message);
      var carValueArray = Object.values(messageValueArray[0]);

      if (messageValueArray[1] === 'cars') {
        var carExist = {
          current: {}
        };
        for (var el = 0; el < carValueArray.length; el++) {
          carExist.current = carValueArray[el];
          if (carSelection.options[el] !== undefined) {
            if (listOfCars[el].name === carSelection.options[el].label) {
              continue;
            } else {
              var createdCar = document.createElement("option");
              createdCar.label = carExist.current.name;
              createdCar.value = el; // can find reference to obj later in array
              createdCar.class = 'selectedCar';
              carSelection.add(createdCar, carSelection[el]);
            }
          } else {
            // should only run if the nlist of cars is completely empty
            if (carExist.current.name !== 'undefined') {
              var _createdCar = document.createElement("option");
              _createdCar.label = carExist.current.name;
              _createdCar.value = el; // can find reference to obj later in array
              _createdCar.class = 'selectedCar';
              carSelection.appendChild(_createdCar);
              listOfCars.push(carExist.current);
            }
          }
        }
        activeCars = []; // every time retrieve list, epty currenty race track
        currentCars = [];
      }
    }
  }
};

var handleResponse = function handleResponse(xhr) {
  var content = document.querySelector('#content');
  var carSelection = document.querySelector('#carSelection');

  switch (xhr.status) {
    case 200:
      if (content.innerHTML !== 'Car Not Found') ;
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
  var colorField = nameForm.querySelector('#colorField').value;
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

  var formData = 'name=' + nameField + '&special=' + specialField + '&speed=' + speedField + '&power=' + powerField + '&color=' + colorField;

  xhr.send(formData);

  var carToSave = {
    name: nameField,
    color: colorField,
    special: specialField,
    speed: speedField,
    power: powerField
  };

  allCars._saveCar(carToSave);
  return false;
};

var sendPostNoForm = function sendPostNoForm(nameField, specialField, speedField, powerField, colorField) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/addCar');

  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function () {
    return handleResponse(xhr);
  };

  var formData = 'name=' + nameField + '&special=' + specialField + '&speed=' + speedField + '&power=' + powerField + '&color=' + colorField;
  xhr.send(formData);

  return false;
};
"use strict";

var width = 600;
var height = 400;
var ctx = void 0;
var car1 = void 0;
var currentCars = [];
var winning = false;

var init = function init() {
  var app = new Vue({
    el: "#app",
    data: {
      carText: 'Rest Car List',
      options: {},
      racing: true,
      carsInRace: []
    },
    methods: {
      addMyCar: function addMyCar() {
        var myCar = document.querySelector("#carSelection");
        // check to make sure the value they are entering is not null
        if (!myCar.options[myCar.selectedIndex]) {
          // if this code runs, the value is null - user makes bad request as not having any cars left to race
          this.retrieveCars('/badRequest');
          if (currentCars) {
            this.racing = false;
          }
          return;
        }
        // update list of cars that will be racing from list of all cars
        // check to make sure not over 10 cars in race
        if (activeCars.length < 10) {
          var currentCar = myCar.options[myCar.selectedIndex].value;
          var carToAdd = listOfCars[currentCar];
          activeCars.push(carToAdd);
          myCar.remove(myCar.selectedIndex);
          this.racing = false; // can now click racing button
          this.carsInRace.push(carToAdd);
        } else {
          document.querySelector("#content").innerHTML = "<b>10 is the limit of cars in the race. Reset to add change cars</b>";
          return;
        }
      },
      retrieveCars: function retrieveCars(url) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);

        xhr.setRequestHeader("Accept", 'application/json');

        xhr.onload = function () {
          return handleResponse(xhr);
        };

        xhr.send();

        this.racing = true;
        this.carsInRace = [];
      },

      // add car to server (reactive)
      addCar: function addCar(e) {
        var nameForm = document.querySelector('#nameForm');
        sendPost(e, nameForm);
        this.interemGetCar();
      },

      // since grabing button from form, sends proper url to retreive all cars
      interemGetCar: function interemGetCar() {
        var url = '/getCars';
        this.retrieveCars(url);
      },
      race: function race() {
        // when racing, chacks to make sure there are at least 2 cars (min for race)
        currentCars = [];

        winning = false;

        if (activeCars.length < 2) {
          document.querySelector("#content").innerHTML = '<b>Not enough cars in race. Need at least 2 cars</b>';
          return;
        } else {
          document.querySelector("#content").innerHTML = '<b>The race begins!</b>';
        }

        // when time to race, cares list of cars to race, creates car class and starts drawing cars
        for (var i = 0; i < activeCars.length; i++) {
          var newCar = new car(activeCars[i].color, activeCars[i].speed, activeCars[i].power, activeCars[i].special, ctx, 5, i * 40, activeCars[i].name);
          currentCars.push(newCar);
        }
      }
    },
    created: function created() {
      // when vue is first instantiated on the client side, it makes a call 
      //to the server for all the cars that are there and will also send a call to 
      // add and cars in local storage to the list by adding them
      var carsToCreate = allCars._load();
      if (carsToCreate) {
        var createdCar = carsToCreate.split('|'); // addto to local storage withj a | marker seperating them
        var carsFromStorage = [];
        for (var i = 0; i < createdCar.length; i++) {
          var interemCar = JSON.parse(createdCar[i]); // parses the split strings back into objects
          for (var j = 0; j < carsFromStorage.length; j++) {
            if (interemCar.name === carsFromStorage[j].name) {
              // checks if the car being parsed is an updated version of a previous car
              carsFromStorage[j] = interemCar;
              interemCar.updated = true;
              continue;
            }
          }
          if (!interemCar.updated) {
            // if the car is not an update of the previous car, add to list of cars to push/ request from server
            carsFromStorage.push(interemCar);
          }
        }
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = carsFromStorage[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _car = _step.value;

            sendPostNoForm(_car.name, _car.special, _car.speed, _car.power, _car.color);
          }
          //sendPostNoForm(carsToCreate.name, carsToCreate.special, carsToCreate.speed, carsToCreate.power, carsToCreate.color);
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
      this.interemGetCar();
    },

    computed: {
      isDisabled: function isDisabled() {
        return this.racing;
      }
    }
  });

  // canvas code
  ctx = document.querySelector("canvas").getContext('2d');
  loop();
};

window.onload = init;
// clear storage if need to analyze why local storage is throwing an error
//window.localStorage.clear();
'use strict';

// variables for local storage
var prefix = 'axf8278-';
var numCarsSaved = 1;
var carKey = prefix + 'car';
var myCurrentCars = {};

var allCars = {
    _saveCar: function _saveCar(val) {
        // gat all cars already there, and add a new car to the list
        var storedCars = this._load();
        // val is stringified JSON the user endered into the form
        var valToStore = JSON.stringify(val);
        var toStore = storedCars;
        if (storedCars) {
            toStore += '|' + valToStore;
            localStorage.setItem(carKey, toStore);
        } else {
            localStorage.setItem(carKey, valToStore);
        }
        //localStorage.setItem(carKey, valToStore);
    },
    _load: function _load() {
        var storedCars = localStorage.getItem(carKey); // atempt to retrieve stored cars from sotrage
        if (storedCars) // if stored cars returns something
            {
                myCurrentCars = storedCars; // parse the retruned object of stored cars
            } else {
            return null; // no car returned 
        }
        return myCurrentCars; // return new carObjects
    }
};
