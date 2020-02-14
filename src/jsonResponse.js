const cars = {

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
    message: 'name and age are both required',
  };

  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (cars[body.name]) {
    responseCode = 204;
  } else {
    cars[body.name] = {};
  }

  cars[body.name].name = body.name;
  cars[body.name].age = body.age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
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
