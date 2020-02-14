'use strict';

var width = 600;
var height = 400;
var ctx = void 0;

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
            content.innerHTML = '<b> Success </b>';
            break;
        case 201:
            content.innerHTML = '<b> Created </b>';
            break;
        case 204:
            content.innerHTML = '<b> Updated (no Content) </b>';
            break;
        case 400:
            content.innerHTML = '<b> Bad Request </b>';
            break;
        case 404:
            content.innerHTML = '<b> Resource Not Found </b>';
            break;
        default:
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
    debugger;
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

var init = function init() {
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

    ctx = document.querySelector("canvas").getContext('2d');
};

window.onload = init;
