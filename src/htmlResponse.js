const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../hosted/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const mainJs = fs.readFileSync(`${__dirname}/../client/src/main.js`);
const canvasJs = fs.readFileSync(`${__dirname}/../client/src/draw.js`);
const serverJS = fs.readFileSync(`${__dirname}/../client/src/handleResponse.js`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getCanvasJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(canvasJs);
  response.end();
};
const getMainJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(mainJs);
  response.end();
};
const getServerJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(serverJS);
  response.end();
};

module.exports = {
  getIndex,
  getCSS,
  getCanvasJS,
  getMainJS,
  getServerJS,
};
