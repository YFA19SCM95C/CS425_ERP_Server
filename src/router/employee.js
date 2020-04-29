const mongo = require('koa-mongo');
const { employeeList, roleList, addEmployee } = require('../controller/employee');

function userRoute(router) {
  router.get('/api/employeelist', async ctx => {
    if (!ctx.isAuthenticated()) {
      ctx.throw(401);
    }
    const { request } = ctx;
    const { employeeID } = ctx.state.user;
    const { name, job, startDate, endDate } = request.query;
    const list = await employeeList(employeeID);
    ctx.body = {
      data: {
        code: 1,
        list,
      }
    };
  });
  router.post('/api/addEmployee', async ctx => {
    const { request } = ctx;
    await addEmployee(request.body);
    ctx.body = {
      data: {
        code: 1
      }
    };
  });
  router.get('/api/rolelist', async ctx => {
    if (!ctx.isAuthenticated()) {
      ctx.throw(401);
    }
    const list = await roleList();
    ctx.body = {
      data: {
        code: 1,
        list,
      }
    };
  });
  router.post('/api/deleteUserById', async ctx => {
    const { request } = ctx;
    const { id } = request.body;
    const result = await ctx.db.collection('users').remove({
      _id: mongo.ObjectId(id)
    });
    ctx.body = {
      data: {
        code: 1
      }
    };
  });
  router.post('/api/updateUsername', async ctx => {
    const { request } = ctx;
    const { id, name } = request.body;
    const result = await ctx.db.collection('users').update({
      _id: mongo.ObjectId(id)
    }, {$set: { name }});
    ctx.body = {
      data: {
        code: 1
      }
    };
  });
}

module.exports = userRoute;
