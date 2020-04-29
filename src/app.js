const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const MongoClient = require('mongodb').MongoClient;
const mongo = require('koa-mongo');
const route = require('./router/index');
const session = require('koa-session');
const passport = require('koa-passport');

const app = new Koa();
const url = "mongodb://localhost:27017/";

app.keys = ['secret'];

app.use(session({}, app));

app.use(bodyParser());

// authentication
require('./auth');
app.use(passport.initialize());
app.use(passport.session());

  /*
app.use(async (ctx, next) => {
  console.log('ctx session', ctx.session.user);
  await next();
});
*/

app.use(mongo({
  host: 'localhost',
  port: 27017,
  db: 'ims',
  authSource: 'admin',
  max: 100,
  min: 1,
  acquireTimeoutMillis: 100
}));

route(app);

app.listen(5000);
