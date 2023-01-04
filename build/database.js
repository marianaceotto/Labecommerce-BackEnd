"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.getProductByName = exports.purchase = exports.product = exports.user = void 0;
const types_1 = require("./types");
exports.user = [{
        id: "01",
        email: "teste.com",
        password: "123"
    }, {
        id: "02",
        email: "teste2.com",
        password: "456"
    }
];
exports.product = [{
        id: "01",
        name: "blusa",
        price: 30,
        category: types_1.Category_Product.CLOTHES_AND_SHOES
    }, {
        id: "02",
        name: "brinco",
        price: 20,
        category: types_1.Category_Product.ACCESSORIES
    }
];
exports.purchase = [{
        userId: "01",
        productId: "01",
        quantity: 2,
        totalPrice: 30
    }, {
        userId: "02",
        productId: "02",
        quantity: 1,
        totalPrice: 20
    }];
function CreateUser(id, email, password) {
    const users = { id, email, password };
    exports.user.push(users);
    console.log(`O usuário ${id}, ${email} foi cadastrado com sucesso!`);
}
console.log("Criando usuário");
CreateUser("Mariana", "mariana@email.com", "123");
function getAllUser() {
    exports.user.map((users) => {
        console.table(exports.user);
    });
}
console.log("Todos os usuários");
getAllUser();
function createProduct(id, name, price, category) {
    const products = { id, name, price, category };
    exports.product.push(products);
    console.log("Produto criado com sucesso");
}
console.log("Novo produto");
createProduct("03", "colar", 40, types_1.Category_Product.ACCESSORIES);
function getAllProducts() {
    exports.product.map((products) => {
        console.table(exports.product);
    });
}
console.log("Todos os produtos");
getAllProducts();
function getProductById(idSearch) {
    console.table(exports.product.find(product => product.id === idSearch));
}
console.log("Buscar produto pelo Id");
getProductById("02");
const getProductByName = (q) => {
    return exports.product.filter((product) => {
        return product.name.includes(q);
    });
};
exports.getProductByName = getProductByName;
console.table(exports.getProductByName);
function createPurchase(userId, productId, quantity, totalPrice) {
    const purchases = { userId, productId, quantity, totalPrice };
    exports.purchase.push(purchases);
    console.log("Compra realizada com sucesso");
}
console.log("Realizando compra");
createPurchase("05", "05", 3, 50);
const getAllPurchasesFromUserId = (userIdSearch) => {
    return exports.purchase.filter((purchase) => {
        return purchase.userId.includes(userIdSearch);
    });
};
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
console.table(exports.getAllPurchasesFromUserId);
//# sourceMappingURL=database.js.map