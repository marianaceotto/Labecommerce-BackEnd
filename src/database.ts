import { TUser, TProduct, TPurchase, CATEGORY_PRODUCT } from "./types"

export const user: TUser [] = [ {
    id: "u001",
    email: "usuario1@gmail.com",
    password: "123"
}, {
    id: "u002",
    email: "usuario2@gmail.com",
    password: "456"
}
]

export const product: TProduct[] = [ {
    id: "p001",
    name: "Arroz",
    price: 11.86,
    category: CATEGORY_PRODUCT.FOOD
}, {
    id: "p002",
    name: "Shampoo",
    price: 18,
    category: CATEGORY_PRODUCT.HYGIENE
}
]

export const purchase: TPurchase []= [{
    userId: "pr001",
    productId: "p001",
    quantity: 2,
    totalPrice: 23.72
}, {
    userId: "pr002",
    productId: "p002",
    quantity: 1,
    totalPrice: 18
}]

//Criar usuário (TypeScript)
function CreateUser (id: string, email: string, password: string): void {
    
    const users: TUser = {id, email, password}
    user.push(users)
    console.log(`O usuário ${id}, ${email} foi cadastrado com sucesso!`)
}

console.log("Criando usuário")
CreateUser("Mariana", "mariana@gmail.com", "123")

//Todos os usuários (TypeScript)
function getAllUser(): void{
    user.map((users) => {
        console.table(user)
    })
}

console.log("Todos os usuários")
getAllUser()

//Criar produto (TypeScript)
function createProduct (id: string, name: string, price: number, category: CATEGORY_PRODUCT): void {
    
    const products: TProduct = {id, name, price, category}
    product.push(products)
    console.log("Produto criado com sucesso")
}

console.log("Novo produto")
createProduct("03", "Detergente", 1.99, CATEGORY_PRODUCT.CLEANING)

//Buscar todos os produtos (TypeScript)
function getAllProducts():void{
    product.map((products) =>{
        console.table(product)
    })
}

console.log("Todos os produtos")
getAllProducts()

//Buscar produto por id (TypeScript)
function getProductById(idSearch: string): void {
    console.table(
        product.find(product => product.id === idSearch)
    )
}

console.log("Buscar produto pelo Id")
getProductById("p002")

//Buscar produto por nome (TypeScript)
export const getProductByName = (q: string): Array<TProduct> => {
    return product.filter((product) =>{
        return product.name.includes(q)
    })
}
console.table(getProductByName)


//Criar nova compra na lista de purchase (TypeScript)
function createPurchase (userId: string, productId: string, quantity: number, totalPrice: number): void {
    
    const purchases: TPurchase = {userId, productId, quantity, totalPrice}
    purchase.push(purchases)
    console.log("Compra realizada com sucesso")
}

console.log("Realizando compra")
createPurchase("pr003", "p002", 3, 36)

//Buscar todas as comprar pelo id (TypeScript)
export const getAllPurchasesFromUserId = (userIdSearch: string): Array<TPurchase> => {
    return purchase.filter((purchase) => {
        return purchase.userId.includes(userIdSearch)
    })
}
console.table(getAllPurchasesFromUserId)


