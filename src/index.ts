import {user, product, purchase} from "./database"
import express, {Request, Response} from 'express'
import cors from "cors"
import { TProduct, TPurchase, TUser, CATEGORY_PRODUCT } from "./types"

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

//Todos os usuários
app.get("/users", (req: Request, res: Response) => {
    try {
        res.status(200).send(user)

    } catch (error) {
        console.log(error)
        
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } 
    }
    
} )

//Todos os produtos
app.get("/product", (req: Request, res: Response) => {
    try {
        res.status(200).send(product)

    } catch (error) {
        console.log(error)
        
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } 
    }
})

//Todas as compras
app.get("/purchase", (req: Request, res: Response) => {
    try {
        res.status(200).send(purchase)

    } catch (error) {
        console.log(error)
        
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } 
    }
    
} )

//Criar usuário
app.post('/users', (req: Request, res: Response) => {

    try {
        const id = req.body.id
        const email = req.body.email
        const password = req.body.password

        const newUser: TUser = {
        id,
        email,
        password
    }

    //Verificar se o id já existe
    const findId = user.find((user) => user.id === id)

    if (findId) {
        res.status(400)
        throw new Error ("Id indisponível")
    
    }

    //Verificar se o email já existe
    const findEmail = user.find((user) => user.email === email)

    if (findEmail) {
        res.status(400)
        throw new Error("Email já cadastrado")
        
    }

    user.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso.")
        
    } catch (error) {
        console.log(error)
        
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } 
    }

})

//Criar produto
app.post('/product', (req: Request, res: Response) => {

    try {
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
    
    //Verificar se o id já existe
    const findId = product.find((product) => product.id === id)

    if (findId) {
        res.status(400)
        throw new Error("Id indisponível. Esse produto já existe")
    }

    product.push(newProduct)
    res.status(201).send("Produto criado com sucesso.")


    } catch (error) {
        console.log(error)
        
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } 
    }
    
})


//Fazer nova compra - create purchase
app.post('/purchase', (req: Request, res: Response) => {
    try {
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

        //Verificar se o id do usuário existe
        const findUserId = purchase.find((purchase) => purchase.userId === userId)
        
        if (!findUserId) {
            res.status(400)
            throw new Error("Id do usuário não existe");
        }

        //Verificar se o id do produto existe
        const findProductId = product.find((product) => product.id === productId)

        if (!findProductId) {
            res.status(400)
            throw new Error("Id do produto não existe");
            
        }

        //Calcular quantidade e total da compra
        if (findProductId.price * quantity === totalPrice){
            res.status(400)
            throw new Error("Total incorreto")            
        }

    purchase.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso.")

    } catch (error) {
        console.log(error)
        
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } 
    }
    })

//Pesquisar produto pelo nome
app.get("/product/search", (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        const productSearch =  product.filter (
        (product) => product.name.toLowerCase().includes(q.toLowerCase()))

        if (q.length < 1) {
            res.status(400)
            throw new Error ("Query params deve possuir pelo menos um caractere")
        }

        res.status(200).send(productSearch)   
        
    } catch (error) {
        console.log(error)
        
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } 
    }
    
} )


//Pesquisar produtos pelo Id
app.get("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const findProduct = product.find((products) => products.id === id)

        //Validar produto
        if (!findProduct) {
            res.status(400)
            throw new Error ("Produto não existe")
        }

        
    res.status(200).send(findProduct)
    } catch (error) {
        console.log(error)
        
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } 
    }
    
})

//Pesquisar array de compras pelo Id
app.get("/users/:id/purchase", (req: Request, res: Response) => {
    try {
        const id = req.params.userId
        const result = purchase.find((purchases) => purchases.userId === id)

        //Validar produto
        const findProduct = product.find((products) => products.id === id)

        if (!findProduct) {
            res.status(400)
            throw new Error ("Produto não existe")
        }

    res.status(200).send(result)
    } catch (error) {
        console.log(error)
        
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } 
    }
    
})

//Deletar usuário pelo Id
app.delete("/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const indexToRemove = user.findIndex((users) => users.id === id)

        if (indexToRemove >= 0) {
        user.splice(indexToRemove, 1)
        }

        //Validar usuário
        const findUser = user.find((user) => user.id === id)

        if (findUser) {
            res.status(400)
            throw new Error ("Usuário não existe")
        }

    res.status(200).send("User deletado com sucesso.")
    } catch (error) {
        console.log(error)
        
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } 
    }
})

//Deletar produto pelo Id
app.delete("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const indexToRemove = product.findIndex((products) => products.id === id)

        if (indexToRemove >= 0) {
        product.splice(indexToRemove, 1)
        }

        //Validar produto
        const findProduct = product.find((products) => products.id === id)

        if (findProduct) {
            res.status(400)
            throw new Error ("Produto não existe")
        }

    res.status(200).send("Produto deletado com sucesso.")
    } catch (error) {
        console.log(error)
        
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } 
    }
    
})

//Editar usuário pelo Id
app.put("/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.body.id 

        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined
    
        const users = user.find((users) => users.id === id)
    
        if (users) {
    
            users.email = newEmail || users.email
            users.password = newPassword || users.password
        }
        
        //Validar usuário
        if (!users) {
            res.status(400)
            throw new Error ("Usuário não existe")
        }

        res.status(200).send("Cadastro atualizado com sucesso.")
    } catch (error) {
        console.log(error)
        
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } 
    }
   
} )

//Editar produto pelo Id
app.put("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.body.Id

        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number 
        const newCategory = req.body.category as CATEGORY_PRODUCT | undefined

        const products = product.find((products) => products.id === id)

    if (products) {

        products.name = newName || products.name
        products.category = newCategory || products.category

        products.price = isNaN(newPrice) ? products.price : newPrice
    }

    //Validar produto
    if (products) {
        res.status(400)
        throw new Error ("Produto não existe")
    }

    res.status(200).send("Produto atualizado com sucesso")
    } catch (error) {
        console.log(error)
        
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } 
    }
    
})