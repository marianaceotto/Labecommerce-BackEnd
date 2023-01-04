"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.product = exports.user = void 0;
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
        name: "bananinha",
        price: 30,
        category: "usuario"
    }, {
        id: "02",
        name: "astrodev",
        price: 20,
        category: "usuario"
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
//# sourceMappingURL=database.js.map