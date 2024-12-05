const express = require('express');
const router = express.Router();
const { Order, Dish } = require('../models');  // 引入订单和菜品模型

// 客户登录路由，输入餐桌号后跳转到菜单页面
router.post('/login', async (req, res) => {
    const { tableId } = req.body;  // 获取餐桌号

    try {
        // 检查餐桌是否存在
        const table = await Table.findByPk(tableId);
        if (!table) {
            return res.status(404).json({ message: '餐桌不存在' });
        }

        // 跳转到菜单页面
        return res.redirect(`/menu/${tableId}`);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: '餐桌验证失败' });
    }
});

// 查看菜品（用于客户点餐）
router.get('/menu/:tableId', async (req, res) => {
    const { tableId } = req.params;

    try {
        // 查询所有菜品
        const dishes = await Dish.findAll();
        return res.render('menu', { dishes, tableId });  // 渲染菜品页面
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: '无法加载菜品' });
    }
});

// 提交订单（客户提交选择的菜品）
router.post('/order', async (req, res) => {
    const { tableId, dishId, quantity } = req.body;

    try {
        const order = await Order.create({ TableID: tableId, DishID: dishId, Quantity: quantity });
        return res.status(201).json(order);  // 返回创建的订单
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: '提交订单失败' });
    }
});

module.exports = router;
