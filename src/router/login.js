const passport = require('koa-passport');
const { getPermissions, accessList, grantAccess, createView } = require('../controller/login');

const userInfo = {
  'admin': {
    email: 'admin@shopee.com',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  'user': {
    email: 'user@shopee.com',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  }
};

function loginRoute(router) {
  router.post('/api/doLogin', async ctx => {
    return passport.authenticate('local', (err, user, info, status) => {
      if (user === false) {
        ctx.body = {
          data: {
            code: 1,
            ok: 0,
          }
        };
      } else {
        ctx.body = {
          data: {
            code: 1,
            ok: 1,
            userInfo: {
              name: ''+user.employeeID,
            }
          }
        };
        return ctx.login(user)
      }
    })(ctx);
  });
  router.get('/api/loginStatus', async ctx => {
    if (!ctx.isAuthenticated()) {
      return ctx.body = {
        data: {
          code: 1,
          status: '0',
        }
      };
    }
    const { user } = ctx.state;
    const { employeeID } = user;
    ctx.body = {
      data: {
        code: 1,
        status: '1',
        userInfo: {
          name: ''+employeeID,
        },
      }
    };
  });

  router.get('/api/permissions', async ctx => {
    if (!ctx.isAuthenticated()) {
      ctx.throw(401);
    }
    const { employeeID } = ctx.state.user;
    const list = await getPermissions(employeeID);
    ctx.body = {
      data: {
        code: 1,
        permissions: list.map(item => item.permissionName),
      }
    }
  });

  router.post('/api/doLogout', async (ctx) => {
    if (ctx.isAuthenticated()) {
      ctx.logout();
      ctx.body = {
        data: {
          code: 1,
          ok: 1
        }
      };
    } else {
      ctx.body = { success: false };
      ctx.throw(401);
    }
  })

  const roleMap = {
    '1': 'admin',
    '2': 'engineer',
    '3': 'HR',
    '4': 'sales',
  };

  router.get('/api/accesslist', async (ctx) => {
    if (!ctx.isAuthenticated()) {
      ctx.throw(401);
    }
    const list = await accessList();
    const result = list.map(record => {
      return {
        ...record,
        roleName: roleMap[record.roleID],
      };
    });
    ctx.body = {
      data: {
        code: 1,
        list: result,
      }
    }
  })

  router.post('/api/grantAccess', async (ctx) => {
    if (!ctx.isAuthenticated()) {
      ctx.throw(401);
    }
    const list = await grantAccess(ctx.request.body);
    ctx.body = {
      data: {
        code: 1,
      }
    }
  })

  router.post('/api/createView', async (ctx) => {
    if (!ctx.isAuthenticated()) {
      ctx.throw(401);
    }
    const list = await createView(ctx.request.body);
    ctx.body = {
      data: {
        code: 1,
      }
    }
  })

}

module.exports = loginRoute;
