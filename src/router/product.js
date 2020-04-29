const mongo = require('koa-mongo');
const { productList, inventoryList, addModel, addInventory } = require('../controller/product');

function userRoute(router) {
  router.get('/api/productList', async ctx => {
    if (!ctx.isAuthenticated()) {
      ctx.throw(401);
    }
    const { request } = ctx;
    const list = await productList(request.query);
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
  router.post('/api/addModel', async ctx => {
    const { request } = ctx;
    const { modelNumber, salePrice, cost } = request.body;
    console.log(modelNumber, salePrice, cost);
    const result = addModel({ modelNumber, salePrice, cost});
    ctx.body = {
      data: {
        code: 1
      }
    };
  });
  router.post('/api/addInventory', async ctx => {
    const { request } = ctx;
    const result = addInventory( request.body );
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
