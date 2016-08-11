'use strict';

// server
const fs = require('fs');
const jsonServer = require('json-server');
const yaml = require('js-yaml');

const server = jsonServer.create();
const router = jsonServer.router('db/users.json');
const middlewares = jsonServer.defaults();
const filepath = './config/secret.yml';
const port = 3005;

const config = {};

const getConfig = file => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
        console.log(err.stack);
    }
    config.token = yaml.safeLoad(data).token;
  });
};

const isAuthorized = request => {
  // Authorization logic
  const token = request.headers['fictional-token'];
  if (token && token === config.token) {
    return true;
  }
  return false;
};

server.use(middlewares);
server.use((request, response, next) => {
  if (isAuthorized(request)) {
    next(); // continue to JSON Server router
  } else {
    response.sendStatus(401);
  }
});
server.use(router);

server.listen(port, () => {
  getConfig(filepath);
  console.log(`JSON Server is running in port: ${port}`);
});
