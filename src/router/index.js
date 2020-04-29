const router = require('koa-router')();
const userRoute = require('./user');
const loginRoute = require('./login');
const employeeRoute = require('./employee');
const customerRoute = require('./customer');
const productRoute = require('./product');
const orderRoute = require('./order');

function route(app) {
  userRoute(router);
  loginRoute(router);
  employeeRoute(router);
  customerRoute(router);
  productRoute(router);
  orderRoute(router);

  app.use(router.routes());
  app.use(router.allowedMethods());
}

module.exports = route;
