const { DataTypes } = require('sequelize');
const sequelize = require('C:/Users/1/Desktop/three1/sql/hw/vue-project/backend/config/db.js');

const Desk = sequelize.define('Desk', {
    TableID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Status: {
        type: DataTypes.SMALLINT, // 使用 SMALLINT 类型，符合数据库表设计
        allowNull: false,
        validate: {
            isIn: [[0, 1, 2]],  // 限制 Status 值只能是 0, 1, 或 2
        }
    },


}
    , {
        // 模型选项
        timestamps: false, // 自动添加 createdAt 和 updatedAt
        tableName: 'Desk', // 确保表名与数据库一致
    }
);

// 可以在这里添加其他方法或关系
module.exports = Desk;
