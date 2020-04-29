const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const { employeeAccount } = require('./controller/employee');

passport.serializeUser((user, done) => {
  done(null, user.employeeID)
});

passport.deserializeUser(async (id, done) => {
  try {
    const users = await employeeAccount();
    const user = users.find(user => id == user.employeeID);
    done(null, user);
  } catch(err) {
    done(err);
  }
});

passport.use(new LocalStrategy((username, password, done) => {
  employeeAccount()
    .then(users => {
      const user = users.find(user => username == user.employeeID && password == user.password);
      return user;
    })
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch((err) => { done(err) });
}));
