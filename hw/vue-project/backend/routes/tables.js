const express = require('express');
const router = express.Router();
const Table = require('../models/desk');

// 获取所有餐桌信息
router.get('/', async (req, res) => {
    try {
        const tables = await Table.findAll();
        res.json(tables);
    } catch (error) {
        res.status(500).json({ error: '获取餐桌信息失败' });
    }
});

module.exports = router;
