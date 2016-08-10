'use strict';

// server
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db/users.json');
const middlewares = jsonServer.defaults();
const port = 3000;

const isAuthorized = request => {
  // Authorization logic
  return true;
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
  console.log('JSON Server is running');
});
