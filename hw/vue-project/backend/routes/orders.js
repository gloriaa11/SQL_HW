const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Dish = require('../models/dish');
const Table = require('../models/desk');

// 创建新订单
router.post('/', async (req, res) => {
    const { TableID, DishID, Quantity } = req.body;

    try {
        const dish = await Dish.findByPk(DishID);
        const table = await Table.findByPk(TableID);

        if (!dish || !table) {
            return res.status(400).json({ error: '无效的菜品或餐桌' });
        }

        const totalPrice = dish.Price * Quantity;

        const order = await Order.create({
            TableID,
            DishID,
            Quantity,
            TotalPrice: totalPrice
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: '创建订单失败' });
    }
});

// 获取某个订单的详情
router.get('/:orderID', async (req, res) => {
    const { orderID } = req.params;

    try {
        const order = await Order.findByPk(orderID, {
            include: [Dish, Table]
        });

        if (!order) {
            return res.status(404).json({ error: '订单不存在' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: '获取订单详情失败' });
    }
});

module.exports = router;
