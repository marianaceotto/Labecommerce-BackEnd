-- Active: 1673878471398@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users (id, email, password)
VALUES
("1", "usuario1.email", "1234"), 
("2", "usuario2.email", "5678"), 
("3", "usuario3.email", "9012");

SELECT * FROM users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL, 
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)
VALUES
("1", "Brinco", 30, "Acessorios"), 
("2", "Colar", 40, "Acessorios"), 
("3", "Anel", 25, "Acessorios"), 
("4", "Blusa", 35, "Roupas"),
("5", "Vestido", 50, "Roupas");

SELECT * FROM products