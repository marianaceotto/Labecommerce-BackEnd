import {user, product, purchase} from "./database"
import express, {Request, Response} from 'express'
import cors from "cors"
import { TProduct, TPurchase, TUser, Category_Product } from "./types"

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

//Todos os usuários
app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(user)
} )

//Todos os produtos
app.get("/product", (req: Request, res: Response) => {
    res.status(200).send(product)
})

//Criar usuário
app.post('/users', (req: Request, res: Response) => {

    const id = req.body.id
    const email = req.body.email
    const password = req.body.password

    const newUser: TUser = {
        id,
        email,
        password
    }

    user.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso.")
})

//Criar produto
app.post('/product', (req: Request, res: Response) => {

    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const category = req.body.category

    const newProduct: TProduct = {
        id,
        name,
        price,
        category
    }
    
    product.push(newProduct)
    res.status(201).send("Produto criado com sucesso.")
})


//Fazer nova compra
app.post('/purchase', (req: Request, res: Response) => {
    
    const userId = req.body.userId
    const productId = req.body.productId
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice

    const newPurchase: TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchase.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso.")
})

//Pesquisar produto pelo nome
app.get("/product/search", (req: Request, res: Response) => {

    const q = req.query.q as string

    const productSearch =  product.filter (
        (product) => product.name.toLowerCase().includes(q.toLowerCase()))

    res.status(200).send(productSearch)
} )


//Pesquisar produtos pelo Id
app.get("/product/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const result = product.find((products) => products.id === id)

    res.status(200).send(result)
})

//Pesquisar array de compras pelo Id
app.get("/users/:id/purchases", (req: Request, res: Response) => {
    const id = req.params.userId
    const result = purchase.find((purchases) => purchases.userId === id)

    res.status(200).send(result)
})

//Deletar usuário pelo Id
app.delete("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const indexToRemove = user.findIndex((users) => users.id === id)

    if (indexToRemove >= 0) {
        user.splice(indexToRemove, 1)
    }

    res.status(200).send("User deletado com sucesso.")
})

//Deletar produto pelo Id
app.delete("/product/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const indexToRemove = product.findIndex((products) => products.id === id)

    if (indexToRemove >= 0) {
        product.splice(indexToRemove, 1)
    }

    res.status(200).send("Produto deletado com sucesso.")
})

//Editar usuário pelo Id
app.put("/users/:id", (req: Request, res: Response) => {

    const id = req.body.id 

    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const users = user.find((users) => users.id === id)

    if (users) {

        users.email = newEmail || users.email
        users.password = newPassword || users.password
    }

    res.status(200).send("Cadastro atualizado com sucesso.")
} )

//Editar produto pelo Id
app.put("/product/:id", (req: Request, res: Response) => {

    const id = req.body.Id

    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number 
    const newCategory = req.body.category as Category_Product | undefined

    const products = product.find((products) => products.id === id)

    if (products) {

        products.name = newName || products.name
        products.category = newCategory || products.category

        products.price = isNaN(newPrice) ? products.price : newPrice
    }

    res.status(200).send("Produto atualizado com sucesso")
})