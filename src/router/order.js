const mongo = require('koa-mongo');
const { orderList, createOrder } = require('../controller/order');

function userRoute(router) {
  router.get('/api/orderlist', async ctx => {
    if (!ctx.isAuthenticated()) {
      ctx.throw(401);
    }
    const { request } = ctx;
    const { name, job, startDate, endDate } = request.query;
    const list = await orderList();
    ctx.body = {
      data: {
        code: 1,
        list: list
      }
    };
  });
  router.get('/api/inventorylist', async ctx => {
    if (!ctx.isAuthenticated()) {
      ctx.throw(401);
    }
    const { request } = ctx;
    const { name, job, startDate, endDate } = request.query;
    const list = await inventoryList();
    ctx.body = {
      data: {
        code: 1,
        list: list
      }
    };
  });
  router.post('/api/createOrder', async ctx => {
    const { request } = ctx;
    await createOrder(request.body);
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
