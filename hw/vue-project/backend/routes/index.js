const express = require('express');
const router = express.Router();

// 主页：选择身份（服务员或客户）
router.get('/', (req, res) => {
    res.render('index');  // 渲染主页HTML
});

module.exports = router;
