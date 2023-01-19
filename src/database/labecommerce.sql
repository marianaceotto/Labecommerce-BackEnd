-- Active: 1673878471398@@127.0.0.1@3306


------ Tabela users
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
    );

DROP TABLE users;

SELECT * FROM users;

INSERT INTO users (id, email, password)
VALUES 
("u001", "usuario1@gmail.com", "1234"), 
("u002", "usuario2@gmail.com", "5678"), 
("u003", "usuario3@gmail.com", "9012"),
("u004", "usuario4@gmail.com", "4567"),
("u005", "usuario5@gmail.com", "9876");


------ Tabela products
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
("p001", "Shampoo", 20, "Higiene"), 
("p002", "Condicionador", 30, "Higiene"), 
("p003", "Pasta de dente", 12.58, "Higiene"), 
("p004", "Sabonete", 3.50, "Higiene"), 
("p005", "Escova de cabelo", 36.90, "Higiene");

-------------------

SELECT * FROM users WHERE id = "u001";

SELECT * FROM products WHERE name = "Shampoo";

INSERT INTO users (id, email, password)
VALUES 
("u006", "usuario6@gmail.com", "1357");

INSERT INTO products (id, name, price, category)
VALUES 
("p006", "Sabão em pó", 20.90, "Limpeza"), 
("p007", "Limpador multiuso", 2.60, "Limpeza"), 
("p008", "Agua sanitária", 20, "Limpeza"), 
("p009", "Esponja de cozinha", 6.49, "Limpeza"), 
("p010", "Amaciante", 29.90, "Limpeza"),
("p011", "Pão francês", 0.40, "Padaria"), 
("p012", "Pão na chapa", 5, "Padaria"), 
("p013", "Bolo", 13, "Padaria"), 
("p014", "Feijão", 8.29, "Alimentos"), 
("p015", "Macarrão", 6.70, "Alimentos"),
("p016", "Milho", 4.99, "Alimentos"), 
("p017", "Café", 17.60, "Alimentos"), 
("p018", "Suco", 7, "Bebidas"), 
("p019", "Refrigerante", 4.50, "Bebidas"), 
("p020", "Cerveja", 6.50, "Bebidas");

SELECT * FROM products WHERE id = "p008";

DELETE FROM users WHERE id = "u006";

DELETE FROM products WHERE id = "p020";

UPDATE users
SET
    email = "usuario4.email.com",
    password = "2343"
WHERE id = "u004";

UPDATE products
SET
    name = "Hidratente corporal",
    price = 20.99,
    category = "Higiene"
WHERE id = "p004";

SELECT * FROM users ORDER BY email ASC;

SELECT * FROM products ORDER BY price ASC LIMIT 20;

SELECT * FROM products
WHERE
    price >= "6"
    AND price <= "40"
ORDER BY price ASC;

--------------------------

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        total_price REAL NOT NULL,
        paid INTEGER NOT NULL,
        delivered_at TEXT,
        buyer_id TEXT NOT NULL,
        FOREIGN KEY (buyer_id) REFERENCES users (id)
    );

DROP TABLE purchases;

SELECT * FROM purchases;

INSERT INTO purchases (id, total_price, paid, buyer_id)
VALUES 
("pr001", 200, 20, "u001"), 
("pr002", 60, 0, "u001"),
("pr003", 19.99, 0, "u002"),
("pr004", 120, 0, "u003");

UPDATE purchases
SET delivered_at = datetime('now', 'localtime')
WHERE id = "pr004";

SELECT * FROM purchases
INNER JOIN users
ON buyer_id = users.id
WHERE users.id="u002"