const APIError = require('../rest').APIError;

module.exports = {
    'POST /api/login': async (ctx, next) => {

        ctx.response.type = 'application/json';

        let name = ctx.request.body.name || '';
        let password = ctx.request.body.password || '';

        if (name === 'koa' && password === '123456') {
            ctx.rest({
                name,
                password,
            });
        } else {
            throw new APIError('error', '登录失败，账号或密码不正确');
        }
    }
}