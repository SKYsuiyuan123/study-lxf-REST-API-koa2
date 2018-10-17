class APIError {
    constructor(msg, result) {
        this.msg = msg || 'internal: unknown_error';
        this.result = result || '';
    }
}

module.exports = {
    APIError,

    restify: (pathPrefix) => {
        // REST API 前缀，默认为 /api/
        pathPrefix = pathPrefix || '/api/';

        return async (ctx, next) => {
            // 是否是 REST API 前缀
            if (ctx.request.path.startsWith(pathPrefix)) {

                // 绑定 rest() 方法
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        message: 'success',
                        result: data
                    };
                }

                try {
                    await next();
                } catch (e) {
                    // 返回错误
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        msg: e.msg || 'internal: unknown_error',
                        result: e.result || ''
                    };
                }
            } else {
                await next();
            }
        };
    }
};