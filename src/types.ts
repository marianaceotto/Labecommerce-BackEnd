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
    category: string
}

//Compra realizada pelo cliente
export type TPurchase = {
    userId: string
    productId: string
    quantity: number
    totalPrice: number
}