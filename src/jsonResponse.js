const cars = {
  raceCars: {
    TheMobBoss: {
      name: 'TheMobBoss',
      speed: 3,
      special: 5,
      power: 7,
      color: 'red',
    },
    Andire: {
      name: 'Andire',
      speed: 1,
      special: 10,
      power: 10,
      color: 'orange',
    },
    TheRipper: {
      name: 'TheRipper',
      speed: 8,
      special: 10,
      power: 4,
      color: 'yellow',
    },
    TheCrusher: {
      name: 'TheCrusher',
      speed: 4,
      special: 5,
      power: 7,
      color: 'green',
    },
    TheMasher: {
      name: 'TheMasher',
      speed: 2,
      special: 1,
      power: 7,
      color: 'blue',
    },
    Scottland: {
      name: 'Scottland',
      speed: 1,
      special: 9,
      power: 7,
      color: 'purple',
    },
    Russia: {
      name: 'Russia',
      speed: 10,
      special: 0,
      power: 10,
      color: 'white',
    },
  },
  id: 'cars',
};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getCars = (request, response) => {
  const responseJSON = {
    message: cars,
  };

  respondJSON(request, response, 200, responseJSON);
};

const addCar = (request, response, body) => {
  const responseJSON = {
    message: 'name, speed special, and power are required',
  };

  if (!body.name || !body.power || !body.speed || !body.special) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;
  const { name } = body;

  if (cars.raceCars[name]) {
    responseCode = 204;
    responseJSON.id = 'updated';
  } else {
    cars.raceCars[name] = {};
    cars.raceCars[name].name = name;
  }

  cars.raceCars[name].power = body.power;
  cars.raceCars[name].speed = body.speed;
  cars.raceCars[name].special = body.special;
  if (!body.color)
  body.color = 'purple';
  cars.raceCars[name].color = body.color;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    responseJSON.id = 'created';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

const noCar = (request, response, status) => {
  const notFound = {
    message: 'car not found',
    id: 'notFound',
  };
  if (status === 'GET') {
    respondJSON(request, response, 404, notFound);
  } else {
    respondJSONMeta(request, response, 404);
  }
};

module.exports = {
  getCars,
  addCar,
  noCar,
};