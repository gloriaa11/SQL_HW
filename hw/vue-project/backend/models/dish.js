//
const { DataTypes } = require('sequelize');
//const sequelize = require('../config/db');
const sequelize = require('C:/Users/1/Desktop/three1/sql/hw/vue-project/backend/config/db.js');

const dish = sequelize.define('dish', {

    dishid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    imageurl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
    {
        // 模型选项
        timestamps: false, // 自动添加 createdAt 和 updatedAt
        tableName: 'dish', // 确保表名与数据库一致
    }
);

module.exports = dish;
