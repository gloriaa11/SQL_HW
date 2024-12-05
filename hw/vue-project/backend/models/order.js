const { DataTypes } = require('sequelize');
const sequelize = require('C:/Users/1/Desktop/three1/sql/hw/vue-project/backend/config/db.js');
const Table = require('./desk');   // 引入餐桌模型
const Dish = require('../models/dish');     // 引入菜品模型

const Order = sequelize.define('Order', {
    OrderID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,  // 至少选择一份菜品
        },
    },
    DishID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    TableID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    TotalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,  // 可选，通常会在创建订单时计算并填充
    },
    // 显式指定表名为 Order
}, {
    // 模型选项
    timestamps: false, // 自动添加 createdAt 和 updatedAt
    tableName: 'Order', // 确保表名与数据库一致
});

// 关联外键

// 导出模型
module.exports = Order;
