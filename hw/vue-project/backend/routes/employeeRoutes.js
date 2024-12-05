const express = require('express');
const router = express.Router();
const { Employee } = require('../models');  // 引入员工模型（Employee）
const bcrypt = require('bcrypt');  // 用于密码验证

// 服务员登录验证路由
router.post('/login', async (req, res) => {
    const { id, password } = req.body;  // 获取请求中的ID和密码

    try {
        const employee = await Employee.findOne({ where: { id } });

        if (!employee) {
            return res.status(404).json({ message: '员工不存在' });
        }

        // 使用 bcrypt 比较密码（假设密码是加密存储的）
        const match = await bcrypt.compare(password, employee.password);
        if (match) {
            // 验证成功，跳转到菜品管理页面
            return res.redirect('/admin/menu');  // 重定向到服务员菜单管理页面
        } else {
            return res.status(401).json({ message: '密码错误' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: '服务员登录失败' });
    }
});

module.exports = router;
