const mongo = require('koa-mongo');
const { customerList, addCustomer } = require('../controller/customer');

function userRoute(router) {
  router.get('/api/customerlist', async ctx => {
    if (!ctx.isAuthenticated()) {
      ctx.throw(401);
    }
    const { request } = ctx;
    const { name, job, startDate, endDate } = request.query;
    const list = await customerList();
    ctx.body = {
      data: {
        code: 1,
        list: list
      }
    };
  });
  router.post('/api/addCustomer', async ctx => {
    const { request } = ctx;
    await addCustomer(request.body);
    ctx.body = {
      data: {
        code: 1
      }
    };
  });
  router.post('/api/createCustomer', async ctx => {
    const { request } = ctx;
    const userInfo = {
      ...request.body,
      date: new Date(request.body.date).getTime()
    };
    const result = await ctx.db.collection('users').insert(userInfo);
    ctx.body = {
      data: {
        code: 1
      }
    };
  });
  router.post('/api/deleteCustomerById', async ctx => {
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
  router.post('/api/updateCustomerName', async ctx => {
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
