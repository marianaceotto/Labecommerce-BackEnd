import { TUser, TProduct, TPurchase, Category_Product } from "./types"

export const user: TUser [] = [ {
    id: "01",
    email: "teste.com",
    password: "123"
}, {
    id: "02",
    email: "teste2.com",
    password: "456"
}
]

export const product: TProduct[] = [ {
    id: "01",
    name: "blusa",
    price: 30,
    category: Category_Product.CLOTHES_AND_SHOES
}, {
    id: "02",
    name: "brinco",
    price: 20,
    category: Category_Product.ACCESSORIES 
}
]

export const purchase: TPurchase []= [{
    userId: "01",
    productId: "01",
    quantity: 2,
    totalPrice: 30
}, {
    userId: "02",
    productId: "02",
    quantity: 1,
    totalPrice: 20
}]

//criar usuário 

function CreateUser (id: string, email: string, password: string): void {
    
    const users: TUser = {id, email, password}
    user.push(users)
    console.log(`O usuário ${id}, ${email} foi cadastrado com sucesso!`)
}

console.log("Criando usuário")
CreateUser("Mariana", "mariana@email.com", "123")

//mostrar usuários

function getAllUser(): void{
    user.map((users) => {
        console.table(user)
    })
}

console.log("Todos os usuários")
getAllUser()

//criar produto

function createProduct (id: string, name: string, price: number, category: Category_Product): void {
    
    const products: TProduct = {id, name, price, category}
    product.push(products)
    console.log("Produto criado com sucesso")
}

console.log("Novo produto")
createProduct("03", "colar", 40, Category_Product.ACCESSORIES)

//buscar todos os produtos

function getAllProducts():void{
    product.map((products) =>{
        console.table(product)
    })
}

console.log("Todos os produtos")
getAllProducts()

//buscar produto por id

function getProductById(idSearch: string): void {
    console.table(
        product.find(product => product.id === idSearch)
    )
}

console.log("Buscar produto pelo Id")
getProductById("02")

//buscar produto por nome

export const getProductByName = (q: string): Array<TProduct> => {
    return product.filter((product) =>{
        return product.name.includes(q)
    })
}
console.table(getProductByName)


//criar nova compra na lista de purchase
function createPurchase (userId: string, productId: string, quantity: number, totalPrice: number): void {
    
    const purchases: TPurchase = {userId, productId, quantity, totalPrice}
    purchase.push(purchases)
    console.log("Compra realizada com sucesso")
}

console.log("Realizando compra")
createPurchase("05", "05", 3, 50)

//buscar todas as comprar pelo id
export const getAllPurchasesFromUserId = (userIdSearch: string): Array<TPurchase> => {
    return purchase.filter((purchase) => {
        return purchase.userId.includes(userIdSearch)
    })
}
console.table(getAllPurchasesFromUserId)