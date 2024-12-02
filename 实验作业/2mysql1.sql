-- 创建人员表 PERSON
CREATE TABLE PERSON (
    P SERIAL PRIMARY KEY, -- P 为主键，并且是自动增长的序列号
    Pname VARCHAR(100) NOT NULL,
    Page INT CHECK (Page > 18), -- Page 必须大于 18
    Pgender VARCHAR(10) NOT NULL
);

-- 创建房间表 ROOM
CREATE TABLE ROOM (
    R SERIAL PRIMARY KEY, -- R 为主键，并且是自动增长的序列号
    Rname VARCHAR(100) NOT NULL,
    Rarea NUMERIC(10, 2) NOT NULL 
);

-- 创建人员与房间关系表 P-R
CREATE TABLE PandR (
    P INT NOT NULL,
    R INT NOT NULL,
    Date DATE NOT NULL,
    PRIMARY KEY (P, R), -- 假设 P 和 R 联合作为主键
    FOREIGN KEY (P) REFERENCES PERSON(P) ON DELETE CASCADE, -- P 为外键，引用 PERSON 表的 P
    FOREIGN KEY (R) REFERENCES ROOM(R) ON DELETE CASCADE -- R 为外键，引用 ROOM 表的 R
);

--  添加唯一性约束
ALTER TABLE PandR ADD CONSTRAINT unique_p_r UNIQUE (P, R);
