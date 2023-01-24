-- Active: 1674571875442@@127.0.0.1@3306

------ Tabela users
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createdAt TEXT NOT NULL
    );

DROP TABLE users;

SELECT * FROM users;

INSERT INTO users (id, name, email, password, createdAt)
VALUES 
("u001", "usuario1", "usuario1@gmail.com", "1234", ""), 
("u002", "usuario2","usuario2@gmail.com", "5678", ""), 
("u003", "usuario3", "usuario3@gmail.com", "9012", ""),
("u004", "usuario4","usuario4@gmail.com", "4567", ""),
("u005", "usuario5","usuario5@gmail.com", "9876", "");


------ Tabela products
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    imageUrl TEXT NOT NULL
);

DROP TABLE products;

SELECT * FROM products;

INSERT INTO products (id, name, price, category, imageUrl)
VALUES 
("p001", "Shampoo", 37.99, "Higiene", "https://images.tcdn.com.br/img/img_prod/950183/shampoo_siage_cauterizacao_dos_fios_250ml_eudora_1523_1_0fb5f1a17f7391b3c7c50d1850a82b31.jpg" ), 
("p002", "Condicionador", 39.99, "Higiene", "https://images.tcdn.com.br/img/img_prod/950183/condicionador_siage_cauterizacao_dos_fios_200ml_eudora_1521_2_1fbb2186bf4e30bb1e39f70a903869c2.jpg"), 
("p003", "Creme dental", 13.98, "Higiene", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRquScqh6JlAGjknTJwOamVnFvQMl6ys24sVA&usqp=CAU"), 
("p004", "Sabonete", 3.29, "Higiene", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDP8Z17YZ2SqNW9fZjF46StLVjNr5tmOlw7g&usqp=CAU"), 
("p005", "Escova de cabelo", 34, "Higiene", "https://m.media-amazon.com/images/I/61oa0vQZ7KL._AC_SX679_.jpg");

------ Updates e testes (users | products)

SELECT * FROM users WHERE id = "u001";

SELECT * FROM products WHERE name = "Shampoo";

INSERT INTO users (id, name, email, password, createdAt)
VALUES 
("u006", "usuario6", "usuario6@gmail.com", "1357", "");

INSERT INTO products (id, name, price, category, imageUrl)
VALUES 
("p006", "Sabão em pó", 24.90, "Limpeza", "https://http2.mlstatic.com/D_NQ_NP_705128-MLB51850851902_102022-O.webp"), 
("p007", "Limpa vidros", 17.81, "Limpeza", "https://m.media-amazon.com/images/I/61GWEj0j16L.__AC_SX300_SY300_QL70_ML2_.jpg"), 
("p008", "Agua sanitária", 24.90, "Limpeza", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo3UAYOq2myU6TeTJdzpHHwITKvNcvgJ1cXG9JpfUvkKwlfqB7-3D398V8tN-VCGoTKLA&usqp=CAU"),
("p009", "Esponja de cozinha", 1.80, "Limpeza", "https://a-static.mlcdn.com.br/800x560/esponja-dupla-face-scotch-brite-1-unidade-3m/dona/172230/5e9e957a343488e015f27002253c0a5f.jpeg"), 
("p010", "Amaciante", 29.90, "Limpeza", "https://m.media-amazon.com/images/I/71VjJ57rylL._AC_SX425_.jpg"),
("p011", "Pão francês", 0.40, "Padaria", "https://img.itdg.com.br/tdg/images/recipes/000/002/658/277270/277270_original.jpg?mode=crop&width=710&height=400"), 
("p012", "Pão na chapa", 5, "Padaria", "https://i.ytimg.com/vi/rTiOA1L23mU/maxresdefault.jpg"), 
("p013", "Bolo de laranja", 13, "Padaria", "https://i.ytimg.com/vi/buDd7e5wkuA/maxresdefault.jpg")
("p014", "Feijão", 8.29, "Alimentos", "https://cf.shopee.com.br/file/2174952e392f98b1a59e54a7c173ed61"), 
("p015", "Macarrão", 6.70, "Alimentos", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZtls_HipSdPw6DCNyedl2aQS61Sx0kM4RWw&usqp=CAU"),
("p016", "Milho", 4.99, "Alimentos", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX-EDBQc3dKihk0p00UXIBHPBTbVPvVT95eQ&usqp=CAU"), 
("p017", "Café", 17.60, "Alimentos", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRea9xkd8Hbgeg9fubzLXGoiclV8P1yIWz27vfBwNuzB9vemC5J82M7xsWTZh032iyhLSE&usqp=CAU"), 
("p018", "Suco", 7, "Bebidas", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4mEp1jefTlTNQDiYAIyN0sZUBQy8Zzqcv6Q&usqp=CAU"), 
("p019", "Refrigerante", 4.50, "Bebidas", "https://img.kalunga.com.br/FotosdeProdutos/348210d.jpg"), 
("p020", "Cerveja", 6.50, "Bebidas", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlxVyonTP9NSBqMjsQKErks_Ex9q0CJcCLBw&usqp=CAU");

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
    imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnzVgA12hX-RySS4dsrXAZVexwxyx-kUXgOg&usqp=CAU"
WHERE id = "p004";

SELECT * FROM users ORDER BY email ASC;

SELECT * FROM products ORDER BY price ASC LIMIT 20;

SELECT * FROM products
WHERE
    price >= "6"
    AND price <= "40"
ORDER BY price ASC;

------ Tabela purchases

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
WHERE users.id="u002";


------ Tabela purchases_products
CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);

DROP TABLE purchases_products;

SELECT * FROM purchases_products;

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
("pr001", "p001", 3),
("pr001", "p002", 2),
("pr002", "p003", 1);

SELECT 
purchases.id AS purchasesId,
purchases.total_price AS totalPrice,
purchases.paid,
purchases.buyer_id AS buyerId,
products.id AS productsId,
products.name AS productName,
products.price
FROM purchases
LEFT JOIN purchases_products
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id
