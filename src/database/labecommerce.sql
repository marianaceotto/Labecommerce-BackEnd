-- Active: 1673878471398@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

DROP TABLE users;

SELECT * FROM users;

INSERT INTO users (id, email, password)
VALUES
("1", "usuario1.email", "1234"), 
("2", "usuario2.email", "5678"), 
("3", "usuario3.email", "9012");


CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL, 
    price REAL NOT NULL,
    category TEXT NOT NULL
);

DROP TABLE products;

SELECT * FROM products;

INSERT INTO products (id, name, price, category)
VALUES
("1", "Brinco", 30, "Acessorios"), 
("2", "Colar", 40, "Acessorios"), 
("3", "Anel", 25, "Acessorios"), 
("4", "Blusa", 35, "Roupas"),
("5", "Vestido", 50, "Roupas");


-------------------

SELECT * FROM users
WHERE id = "1";

SELECT * FROM products
WHERE name = "Brinco";

INSERT INTO users (id, email, password)
VALUES
("4", "usuario4.email", "1357");

INSERT INTO products (id, name, price, category)
VALUES
("6", "Pulseira", 30, "Acessorios");

SELECT * FROM products
WHERE id = 2;

DELETE FROM users 
WHERE id = 2;

DELETE FROM products 
WHERE id =2;

UPDATE users SET
    email = "usuario3.email.com", 
    password = "234"
WHERE id = 3;

UPDATE products SET
    name = "Saia",
    price= "60",
    category = "Roupas"
WHERE id = 3;

SELECT * FROM users
ORDER BY email ASC;

SELECT * FROM products
ORDER BY price ASC
LIMIT 20;

SELECT * FROM products
WHERE price >="25" AND price <="35"
ORDER BY price ASC;