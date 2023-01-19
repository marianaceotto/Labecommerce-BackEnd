//Pessoa Cadastrada
export type TUser = {
    id: string
    email: string
    password: string
}

//Produto Cadastrado
export type TProduct = {
    id: string
    name: string
    price: number
    category: CATEGORY_PRODUCT
}

//Compra realizada pelo cliente
export type TPurchase = {
    userId: string
    productId: string
    quantity: number
    totalPrice: number
}

//enum definindo três categorias de produto
export enum CATEGORY_PRODUCT {
    CLEANING = "Limpeza",
    FOOD = "Alimentos",
    BAKERY = "Padaria",
    HYGIENE = "Higiene",
    DRINKS = "Bebidas"
}
