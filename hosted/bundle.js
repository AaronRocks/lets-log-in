'use strict';

var parseJSON = function parseJSON(xhr, content) {
    if (xhr.response) {
        var obj = JSON.parse(xhr.response);
        console.dir(obj);

        if (obj.message) {
            var myString = JSON.stringify(obj.message);
            content.innerHTML += '<p> ' + myString + '</p>';
        }
    }
};

var handleResponse = function handleResponse(xhr) {
    var content = document.querySelector('#content');

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

    parseJSON(xhr, content);
};

var sendPost = function sendPost(e, nameForm) {
    e.preventDefault();

    var nameAction = nameForm.getAttribute('action');
    var nameMethod = nameForm.getAttribute('method');

    var nameField = nameForm.querySelector('#nameField').value;
    var ageField = nameForm.querySelector('#ageField').value;

    var xhr = new XMLHttpRequest();
    xhr.open(nameMethod, nameAction);

    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function () {
        return handleResponse(xhr);
    };

    var formData = 'name=' + nameField + '&age=' + ageField;

    xhr.send(formData);

    return false;
};

// for handling get
var sendAjax = function sendAjax(e, userForm) {
    e.preventDefault();

    var userRequestType = userForm.getAttribute('method');
    userRequestType = userForm.querySelector("#methodSelect").value.toUpperCase();
    var userUrl = userForm.getAttribute('action');
    userUrl = userForm.querySelector("#urlField").value;

    var xhr = new XMLHttpRequest();
    xhr.open(userRequestType, userUrl);

    xhr.setRequestHeader("Accept", 'application/json');

    xhr.onload = function () {
        return handleResponse(xhr);
    };

    xhr.send();
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var width = 600;
var height = 400;
var ctx = void 0;
var myCar = void 0;

var init = function init() {
  // server code
  // nameform sends a post request
  var nameForm = document.querySelector('#nameForm');
  // user form sends a get request (either body or head)
  var userForm = document.querySelector("#userForm");

  var addUser = function addUser(e) {
    return sendPost(e, nameForm);
  };

  nameForm.addEventListener('submit', addUser);

  var getUser = function getUser(e) {
    return sendAjax(e, userForm);
  };

  userForm.addEventListener('submit', getUser);

  // canvas code
  ctx = document.querySelector("canvas").getContext('2d');
  myCar = new car();
  loop();
};
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

window.onload = init;
