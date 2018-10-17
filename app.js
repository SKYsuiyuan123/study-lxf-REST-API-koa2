const Koa = require('koa');

const controller = require('./controller');

const app = new Koa();

// add router middleware;
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');