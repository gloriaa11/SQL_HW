//数据库连接配置
/*
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '1111', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
});

module.exports = sequelize; */
// db.js
// db.js
const { Sequelize } = require('sequelize');

// 创建 Sequelize 实例，连接到 PostgreSQL 数据库
const sequelize = new Sequelize('postgres', 'postgres', '1111', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    //logging: console.log
    logging: false,  // 禁用 SQL 日志
});

module.exports = sequelize;

