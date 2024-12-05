const express = require('express');
const router = express.Router();
const { dish, Order } = require('../models');  // 引入模型
const sequelize = require('../config/db');

// 中间件：身份验证
function isServer(req, res, next) {
    // 假设已经验证用户身份并通过 req.user 存储
    if (req.user && req.user.role === 'server') {
        return next();  // 如果是服务员，继续执行后续操作
    }
    return res.status(403).json({ message: 'Permission denied' });  // 如果不是服务员，返回权限拒绝
}

// 1. 查询菜品（按名称查询或者全部展示）
router.get('/dishes', async (req, res) => {
    const { name } = req.query;  // 客户端请求的菜品名称

    try {
        if (name) {
            // 按名称查询菜品
            const dish = await Dish.findOne({ where: { Name: name } });
            if (dish) {
                return res.json(dish);
            }
            return res.status(404).json({ message: 'Dish not found' });
        } else {
            // 查询所有菜品
            const dishes = await Dish.findAll();
            return res.json(dishes);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch dishes' });
    }
});

// 2. 添加或更新菜品（只有服务员可以执行）
router.post('/dishes', isServer, async (req, res) => {
    const { name, price, imageUrl } = req.body;  // 从请求体中获取菜品信息

    try {
        const newDish = await Dish.create({ Name: name, Price: price, ImageURL: imageUrl });
        return res.status(201).json(newDish);  // 返回新创建的菜品
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to add dish' });
    }
});

// 3. 修改菜品信息（只有服务员可以执行）
router.put('/dishes/:id', isServer, async (req, res) => {
    const { id } = req.params;  // 获取菜品 ID
    const { name, price, imageUrl } = req.body;  // 获取修改后的菜品信息

    try {
        const dish = await Dish.findByPk(id);
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        // 更新菜品信息
        dish.Name = name || dish.Name;
        dish.Price = price || dish.Price;
        dish.ImageURL = imageUrl || dish.ImageURL;
        await dish.save();

        return res.json(dish);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to update dish' });
    }
});

// 4. 客户提交订单
router.post('/order', async (req, res) => {
    const { tableId, dishId, quantity } = req.body;  // 从请求体中获取订单信息

    try {
        const order = await Order.create({
            TableID: tableId,
            DishID: dishId,
            Quantity: quantity
        });
        return res.status(201).json(order);  // 返回新创建的订单
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to place order' });
    }
});

module.exports = router;
