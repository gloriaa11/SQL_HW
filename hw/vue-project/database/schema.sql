-- 创建 Dish 表
CREATE TABLE dish (
    DishID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    ImageURL VARCHAR(255)
);
-- 创建 Order 表，并设置外键
CREATE TABLE "Order" (
    OrderID SERIAL PRIMARY KEY,
    TableID INT NOT NULL,
    DishID INT NOT NULL,
    Quantity INT NOT NULL,
    TotalPrice DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (TableID) REFERENCES "Table"(TableID) ON DELETE CASCADE,
    FOREIGN KEY (DishID) REFERENCES "dish"(DishID) ON DELETE CASCADE
);
CREATE TABLE "Employee" (
    EmployeeID SERIAL PRIMARY KEY,
    Password VARCHAR(255) NOT NULL
);
CREATE TABLE "Desk" (
    TableID SERIAL PRIMARY KEY,
    Status SMALLINT NOT NULL CHECK (Status IN (0, 1, 2))
);
-- 为 Table 表插入 8 张桌子，状态均为 free (0)