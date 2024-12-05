-- 为 Table 表插入 8 张桌子，状态均为 free (0)
INSERT INTO "Table" (Status)
VALUES (0),
    (0),
    (0),
    (0),
    (0),
    (0),
    (0),
    (0);
-- 添加注释以解释 Status 的含义
COMMENT ON COLUMN "Table".Status IS '0: free, 1: using, 2: booked';
INSERT INTO "Employee" (EmployeeID, Password)
VALUES (1111, '1111'),
    (0113, '1111');
-- 插入6道菜品到 Dish 表
INSERT INTO Dish (Name, Price, ImageURL)
VALUES (
        'Chicken Meal',
        33.00,
        'client/public/assets/dish1.jpg'
    ),
    (
        'Beef Meal',
        45.00,
        'client/public/assets/dish2.jpg'
    ),
    (
        'Vegetable Salad',
        20.00,
        'client/public/assets/dish3.jpg'
    ),
    (
        'Chicken Salad',
        28.00,
        'client/public/assets/dish4.jpg'
    ),
    (
        'Salad Pita',
        30.00,
        'client/public/assets/dish5.jpg'
    ),
    (
        'Chicken Pita',
        22.00,
        'client/public/assets/dish6.jpg'
    );
SELECT *
FROM Dish;