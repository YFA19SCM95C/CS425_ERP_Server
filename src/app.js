const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const route = require('./router/index');
const session = require('koa-session');
const passport = require('koa-passport');

const app = new Koa();

app.keys = ['secret'];

app.use(session({}, app));

app.use(bodyParser());

// authentication
require('./auth');
app.use(passport.initialize());
app.use(passport.session());

route(app);

app.listen(5000);
