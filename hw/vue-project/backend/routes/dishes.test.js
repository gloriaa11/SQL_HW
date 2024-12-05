const request = require('supertest');
const app = require('../server'); // 引入 Express 应用
const { dish } = require('../models/dish'); // 引入 Dish 模型
const { describe, it } = require('mocha');  // 显式引入
/*
describe('GET /dishes/:name', () => {
    let server;
    beforeAll(done => {
        server = app.listen(0, () => {
            console.log(`Test server running on port ${server.address().port}`);
            done();
        });
    });



    // 测试查找名为 "Chicken Meal" 的菜品
    test('GET /dishes/Chicken Meal should return price of Chicken Meal', async () => {


        const response = await request(server).get(`/dishes/Chicken%20Meal`); // 发送 GET 请求
        expect(response.status).toBe(200); // 期望返回状态码 200
        expect(response.body.Name).toBe('Chicken Meal'); // 期望返回的菜品名称是 "Chicken Meal"
        expect(response.body.Price).toBe(25.99); // 期望返回的价格是 25.99
    });

    // 测试错误情况：菜品未找到
    test('GET /dishes/Nonexistent Dish should return 404', async () => {
        const response = await request(server).get('/dishes/Nonexistent%20Dish'); // 查找不存在的菜品
        expect(response.status).toBe(404); // 期望返回状态码 404
        expect(response.body.error).toBe('菜品未找到'); // 期望返回错误信息
    });
});
*/
// 重新同步所有模型
describe('GET /dishes/:name', () => {
    it('should return the dish price when the dish is found', (done) => {
        request(app)
            .get('/dishes/Chicken Meal')
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.body).toHaveProperty('price');
                done();  // 确保测试结束时调用 done()
            })
            .catch(done);
    });

    it('should return 404 if dish not found', (done) => {
        request(app)
            .get('/dishes/Nonexistent Dish')
            .then(res => {
                expect(res.status).toBe(404);
                expect(res.body.message).toBe('Dish not found');
                done();
            })
            .catch(done);
    });
});
