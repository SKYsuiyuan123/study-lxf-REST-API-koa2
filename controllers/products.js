const products = require('../model/products');
const APIError = require('../rest').APIError;


module.exports = {
    // 获取全部
    'GET /api/products': async (ctx) => {
            ctx.rest({
                products: products.getProducts()
            });
        },

        // 获取某一个
        'GET /api/products/:id': async (ctx) => {
                let p = products.getProduct(ctx.params.id);
                if (p) {
                    ctx.rest({
                        products: p
                    });
                } else {
                    throw new APIError('error', '查找失败，该商品不存在。');
                }
            },

            // 添加一个新的        
            'POST /api/products': async (ctx) => {
                    let p = products.addProduct(ctx.request.body.name, ctx.request.body.manufacturer, parseFloat(ctx.request.body.price));
                    if (p) {
                        ctx.rest({
                            products: p
                        });
                    } else {
                        throw new APIError('error', '添加失败，该商品已存在，不可重复添加。');
                    }
                },

                // 删除某一个
                'DELETE /api/products/:id': async (ctx) => {
                        let p = products.deleteProduct(ctx.params.id);
                        if (p) {
                            ctx.rest({
                                products: p
                            });
                        } else {
                            throw new APIError('error', '删除失败，该商品不存在。');
                        }
                    },

                    // 更新某一个
                    'PUT /api/products/:id': async (ctx) => {
                        let p = products.updateProduct(ctx.params.id, ctx.request.body.price);
                        if (p) {
                            ctx.rest({
                                products: p
                            });
                        } else {
                            throw new APIError('error', '更新失败，该商品不存在。');
                        }
                    }
}