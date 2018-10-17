const fs = require('fs');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const rest = require('./rest');


router.use(bodyParser());
router.use(rest.restify());

// add url-router in /controllers

function addMapping(router, mapping) {
    for (let url in mapping) {

        if (url.startsWith('GET ')) {

            let path = url.substring(4);
            router.get(path, mapping[url]);

        } else if (url.startsWith('POST ')) {

            let path = url.substring(5);
            router.post(path, mapping[url]);

        } else if (url.startsWith('DELETE ')) {

            let path = url.substring(7);
            router.del(path, mapping[url]);

        } else if (url.startsWith('PUT ')) {

            let path = url.substring(4);
            router.put(path, mapping[url]);

        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}


function addControllers(router) {
    // 这里可以用sync是因为启动时只运行一次，不存在性能问题:
    let js_files = fs.readdirSync(__dirname + '/controllers').filter((f) => {
        return f.endsWith('.js');
    });

    for (let f of js_files) {
        console.log(`process controller: ${f}...`);

        let mapping = require(__dirname + '/controllers/' + f);

        addMapping(router, mapping);
    }
}


module.exports = function (dir) {
    // 如果不传参数，扫描目录默认为 'controllers'
    let controller_dir = dir || 'controllers';

    addControllers(router, controller_dir);

    return router.routes();
};