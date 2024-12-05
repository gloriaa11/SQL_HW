const { DataTypes } = require('sequelize');
//const sequelize = require('../config/db');
const sequelize = require('C:/Users/1/Desktop/three1/sql/hw/vue-project/backend/config/db.js');
const Employee = sequelize.define('Employee', {
    EmployeeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false, // 取消默认生成的createdAt、updatedAt字段
    tableName: 'Employee', // 指定表名为 Employee
});

module.exports = Employee;
