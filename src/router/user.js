const mongo = require('koa-mongo');

function userRoute(router) {
  router.get('/api/userlist', async ctx => {
    if (!ctx.isAuthenticated()) {
      ctx.throw(401);
    }
    const { request } = ctx;
    const { name, job, startDate, endDate } = request.query;
    let where = {};
    if (name && job && startDate && endDate) {
      where = { name, job, date : { $lte: Number(endDate), $gte: Number(startDate) } }
    }
    const result = await ctx.db.collection('users').find(where).toArray();
    const data = result.map(record => ({...record, id: record['_id']}));
    ctx.body = {
      data: {
        code: 1,
        tableData: data
      }
    };
  });
  router.post('/api/addUser', async ctx => {
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
