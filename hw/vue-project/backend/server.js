const express = require('express');
const sequelize = require('./config/db');
const app = express();
const port = 3001;

app.use(express.json()); // 解析请求体中的 JSON 数据

sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
// API 路由
app.get('/', (req, res) => {
    res.send('欢迎来到餐厅点餐系统!');
});

// 启动服务器并同步数据库
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`服务器已启动，端口号：${port}`);
    });
});

// 导入路由
const dishesRouter = require('./routes/dishes');
const tablesRouter = require('./routes/tables');
const ordersRouter = require('./routes/orders');

// 中间件
app.use(express.json()); // 解析 JSON 请求体

// 使用路由
app.use('/api/dishes', dishesRouter);
app.use('/api/tables', tablesRouter);
app.use('/api/orders', ordersRouter);

// 启动服务器并同步数据库
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`服务器已启动，端口号：${port}`);
    });
});
module.exports = app;
