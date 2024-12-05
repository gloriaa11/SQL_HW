// models/index.js
/*const sequelize = require('C:/Users/1/Desktop/three1/sql/hw/vue-project/backend/config/db.js');
const Dish = require('./dish')
const Table = require('./table');
const Order = require('./order');
const { Pool } = require('pg');
const pool = new Pool();  // 创建数据库连接池
// 同步模型到数据库
const testQuery = async () => {
    try {
        const result = await pool.query('SELECT * FROM "Dish";');
        res.json(result.rows);  // 返回查询结果
    } catch (error) {
        res.status(500).json({ error: '获取菜品列表失败' });
    }
};

testQuery();  // 测试查询数据*/
// index.js

const sequelize = require('C:/Users/1/Desktop/three1/sql/hw/vue-project/backend/config/db.js');
const Dish = require('C:/Users/1/Desktop/three1/sql/hw/vue-project/backend//models/dish');
const Table = require('./desk');
const Order = require('C:/Users/1/Desktop/three1/sql/hw/vue-project/backend//models/order');
const employee = require('C:/Users/1/Desktop/three1/sql/hw/vue-project/backend//models/employee');
// 测试数据库连接
// index.js

// 测试数据库连接
// index.js

const testDatabaseConnection = async () => {
    try {
        // 连接到数据库
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        //await sequelize.sync();  // 如果你希望强制同步模型，可以使用 { force: true }
        await sequelize.sync({ force: true })
        //await sequelize.sync();
        console.log('Models synced successfully.');
        // 查询所有表名
        // 使用 SQL 查询用户定义的表，并排除系统表
        const [results, metadata] = await sequelize.query(`
         SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
        `);
        console.log('Tables in the database:', results);

        // 根据实际需要，你也可以循环打印表名
        results.forEach((table, index) => {
            console.log(`Table ${index + 1}: ${table.table_name}`);
        });

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

// 执行数据库连接和查询操作
testDatabaseConnection();
