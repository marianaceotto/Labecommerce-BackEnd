import {user, product, purchase} from "./database"
import express, {Request, Response} from 'express'
import cors from "cors"
import { TProduct, TPurchase, TUser } from "./types"

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

//Pesquisar produto pelo nome
app.get("/product/search", (req: Request, res: Response) => {

    const q = req.query.q as string

    const productSearch =  product.filter (
        (product) => product.name.toLowerCase().includes(q.toLowerCase()))

    res.status(200).send(productSearch)
} )

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

//Procurar produtos pelo Id
app.get("/product/:id", (req: Request, res: Response) => {
    
})