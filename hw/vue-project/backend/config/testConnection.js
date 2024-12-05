// testConnection.js测试sequelize连接是否成功
//db.js的测试代码如下：
const sequelize = require('./db');

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
}

testConnection();
