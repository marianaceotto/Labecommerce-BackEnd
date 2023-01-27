import express, { Request, Response } from "express"
import cors from "cors"
import { db } from "./database/knex"

// import { user, product, purchase } from "./database"
// import { TProduct, TPurchase, TUser, CATEGORY_PRODUCT } from "./types"

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

const regexEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{4,12}$/g;

//Teste de conexão
app.get('/ping',(req: Request, res:Response)=>{
    res.send('Pong!')
})

//Todos os usuários
app.get("/users", async (req: Request, res: Response) => {
    try {
    
        // const result = await db.raw(`
        //     SELECT * FROM users;
        // `);

        const result = await db("users")

        res.status(200).send({ users: result })
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

//Todos os produtos
app.get("/products", async (req: Request, res: Response) => {
    try {
        // const result = await db.raw(`
        //     SELECT * FROM products;
        // `);

        const result = await db("products")
        res.status(200).send({ products: result });
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
app.get("/purchases", async (req: Request, res: Response) => {
    try {
        // const result = await db.raw(`
        //     SELECT * FROM purchases;
        // `)

        const result = await db("purchases")
        res.status(200).send({ purchases: result })
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

//Criar usuário
app.post("/users", async (req: Request, res: Response) => { 
    try {
        const { id, name, email, password} = req.body

        //Validar id
        if (id !== undefined){
            if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' invalido, deve ser uma string")
            }
            }  else {
            res.status(400);
            throw new Error ("Usuário não possui 'id'")
        }

        //Validar nome
        if (name !== undefined){
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'name' invalido, deve ser uma string")
            }
            }  else {
                res.status(400);
                throw new Error ("Usuário não possui 'nome'")
        }

        //Validar email
        if (email !== undefined){
            if (!email.match(regexEmail)) {
                res.status(400)
                throw new Error("'email' invalido")
            }
            }  else {
                res.status(400);
                throw new Error ("Usuário não possui 'email'")
        }

        //Validar password
        if (password !== undefined) {
            if (typeof password !== "string") {
              res.status(400);
              throw new Error("'name' invalido, deve ser uma string");
            }
            if (!password.match(regexPassword)) {
              res.status(400);
              throw new Error(
                "'password' deve possuir entre 4 e 12 caracteres, ter letras maiúsculas e minúsculas, com no mínimo um número e um caractere especial"
              );
            }
          }

        //Id e/ou name devem possuir no minimo 1 caractere
        if (id.length < 1 || name.length < 1) {
            res.status(400)
            throw new Error("'id' ou 'name' devem ter no minimo 1 caractere")
        }

        const newUser ={
            id: id,
            name: name,
            email:email,
            password:password
        }


        await db ("users").insert(newUser)
        res.status(201).send("Usuário cadastrado com sucesso")

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
app.post("/products", async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, imageUrl } = req.body;

        if (typeof id != "string") {
            res.status(400)
            throw new Error("'id' invalido, deve ser uma string")
        }

        if (typeof name != "string") {
            res.status(400)
            throw new Error("'name' invalido, deve ser uma string")
        }

        if (id.length < 1 || name.length < 1) {
            res.status(400)
            throw new Error("'id' ou 'name' devem ter no minimo 1 caractere")
        }

        if (typeof price != "number") {
            res.status(400)
            throw new Error("'price' invalido, deve ser um number")
        }

        if (typeof description != "string") {
            res.status(400)
            throw new Error("'description' invalido, deve ser uma string")
        }

        if (typeof imageUrl != "string") {
            res.status(400)
            throw new Error("'imageUrl' invalido, deve ser uma string")
        }

        // await db.raw(`
        //         INSERT INTO products ( id, name, price, category, imageUrl)
        //         VALUES ("${id}", "${name}", "${price}", "${category}", "${imageUrl}");
        //       `)

        const newProduct = {
            id: id,
            name: name,
            price: price,
            description: description,
            imageUrl: description
        }

        await db("products").insert(newProduct)

        res.status(201).send(`Produto adicionado com sucesso.`)
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
app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const { id, total_price, paid, delivered_at, buyer_id } = req.body

        if (typeof id != "string") {
            res.status(400)
            throw new Error("'id' invalido, deve ser uma string")
        }

        if (typeof delivered_at != "string") {
            res.status(400)
            throw new Error("'delivered_at' invalido, deve ser uma string")
        }

        if (typeof buyer_id != "string") {
            res.status(400)
            throw new Error("'buyer_id' invalido, deve ser uma string")
        }

        if (typeof total_price != "number") {
            res.status(400)
            throw new Error("'total_price' invalido, deve ser um number")
        }

        if (paid > 1 && paid < 0) {
            res.status(400)
            throw new Error("'paid' invalido, deve ser 0 ou 1")
        }

        if (
            id.length < 1 ||
            paid.length < 1 ||
            buyer_id.length < 1
        ) {
            res.status(400)
            throw new Error("As informações devem ter no minimo 1 caractere")
        }

    //     await db.raw(`
    //     INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
    //     VALUES ("${id}", "${total_price}", "${paid}", "${delivered_at}", "${buyer_id}");
    //   `)

        const newPurchase = {
            id:id,
            total_price: total_price,
            paid: paid, 
            delivered_at: delivered_at,
            buyer_id: buyer_id 
        }

        await db("purchases").insert(newPurchase)

        res.status(201).send(`Compra cadastrada com sucesso`)
    } catch (error) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        }
    }
})

//Pesquisar produto pelo nome
app.get("/products/search", async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        if (q.length <= 1) {
            res.status(400)
            throw new Error("Query params deve possuir pelo menos um caractere")
        }

        // const [product] = await db.raw(`
        //     SELECT * FROM products
        //     WHERE LOWER (name) LIKE ("%${q}%");
        // `)

        const [product]= await db("products").where({name:q})

        res.status(200).send({ product: product })
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

//Pesquisar produtos pelo Id
app.get("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

    //     const [product] = await db.raw(`
    //     SELECT * FROM products
    //     WHERE id = "${id}";
    //   `);

    //     if (!product) {
    //         res.status(400)
    //         throw new Error("Produto não encontrado")
    //     }

    // res.status(200).send({ product: product })

        const productId = await db("products").where({id: id})
        res.status(200).send({ product: productId })
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
app.get("/users/:id/purchases", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

    //     const purchases = await db.raw(`
    //     SELECT * FROM purchases
    //     WHERE buyer_id = "${id}";
    //   `)

    //     res.status(200).send({ purchases: purchases })

    if(!id){
    res.status(400)
    throw new Error ("Usuário não encontrado")
    }

    const [searchUserId] = await db("purchases").where({buyer_id:id})
    res.status(200).send({purchases:searchUserId})
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


//Pesquisar compra pelo Id
app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {

        const id = req.params.id

        const purchaseId = await db("purchases").where({id: id})
        res.status(200).send({ purchase: purchaseId })
        
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
app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        
        const [user] = await db("users").where({id: idToDelete})

        if (!user){
            res.status(400)
            throw new Error("'id' não encontrada")
        }

        await db("users").del().where({id: idToDelete})
        res.status(200).send("User deletado com sucesso.")

        // const indexToRemove = user.findIndex((users) => users.id === id)

        // if (indexToRemove >= 0) {
        //     user.splice(indexToRemove, 1)
        // }

        // //Validar usuário
        // const findUser = user.find((user) => user.id === id)

        // if (findUser) {
        //     res.status(400)
        //     throw new Error("Usuário não existe")
        // }
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
app.delete("/products/:id", async(req: Request, res: Response) => {
    try {

        const idToDelete = req.params.id
        const [product] = await db("products").where({id: idToDelete})

        if (!product) {
            res.status(400)
            throw new Error("'id' não encontrada")
        }

        await db("products").del().where({id: idToDelete})
        res.status(200).send("Produto deletado com sucesso")
        // const id = req.params.id

        // const indexToRemove = product.findIndex((products) => products.id === id)

        // if (indexToRemove >= 0) {
        //     product.splice(indexToRemove, 1)
        // }

        // //Validar produto
        // const findProduct = product.find((products) => products.id === id)

        // if (findProduct) {
        //     res.status(400)
        //     throw new Error("Produto não existe")
        // }

        // res.status(200).send("Produto deletado com sucesso.")
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

//Deletar purchase pelo Id
app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {

        const idToDelete = req.params.id
        
        const [purchase] = await db("purchases").where({id: idToDelete})

        if (!purchase){
            res.status(400)
            throw new Error("'id' não encontrada")
        }

        await db("purchases").del().where({id: idToDelete})
        res.status(200).send("Purchase deletada com sucesso.")
        
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
app.put("/users/:id", async (req: Request, res: Response) => {
    try {
        // const id = req.body.id

        // const newEmail = req.body.email as string | undefined
        // const newPassword = req.body.password as string | undefined

        // const users = user.find((users) => users.id === id)

        // if (users) {
        //     users.email = newEmail || users.email
        //     users.password = newPassword || users.password
        // }

        // //Validar usuário
        // if (!users) {
        //     res.status(400)
        //     throw new Error("Usuário não existe")
        // }

        // res.status(200).send("Cadastro atualizado com sucesso.")

        const idEdit = req.params.id
        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            } 
        }

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("'name' deve ser string")
        }
        }

        if (newEmail !== undefined) {
            if (typeof newEmail !== "string") {
                res.status(400)
                throw new Error("'email' deve ser string")
            } 
        }

        if (newPassword !== undefined) {
            if (typeof newPassword !== "string") {
                res.status(400)
                throw new Error("'name' deve ser string")
        }
        }
      

        const [userEdit] = await db("users").where({id: idEdit})
        if(userEdit){

            const userUpdate={
                id: newId ||userEdit.id,
                name: newName ||userEdit.name,
                email: newEmail ||userEdit.email,
                password: newPassword || userEdit.password
        }
        await db("users")
        .update(userUpdate)
        .where({id:idEdit})
        }
        res.status(200).send("Usuário atualizado com sucesso")

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

//Editar produto pelo Id
app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const idEdit = req.params.id
        const newId = req.body.id
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newDescription = req.body.description as string | undefined
        const newImage = req.body.imageUrl as string | undefined
    
        const [product]= await db("products").where({id:idEdit})
        if(product){
            const updateProduct= {
                id: newId || product.id,
                name: newName || product.name,
                price: newPrice || product.price,
                description: newDescription || product.description,
                imageURL: newImage || product.imageUrl
            }
            await db("products")
            .update(updateProduct)
            .where({id:idEdit})
        } else {
            res.status(404)
            throw new Error("'id' não encontrada")
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

//Editar purchase pelo id
app.put("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const idEdit = req.params.id
        const newId = req.body.id
        const newTotalPrice = req.body.total_price as number | undefined
        const newPaid = req.body.paid as number | undefined
        const newDeliveredAt = req.body.delivered_at as string | undefined
        const newBuyerId= req.body.buyer_id as string | undefined
    
        const [purchase]= await db("purchases").where({id:idEdit})
        if(purchase){
            const updatePurchase= {
                id: newId || purchase.id,
                total_price: newTotalPrice || purchase.total_price,
                paid: newPaid || purchase.paid,
                delivered_at: newDeliveredAt || purchase.delivered_at,
                buyer_id: newBuyerId || purchase.buyer_id
            }
            await db("purchases")
            .update(updatePurchase)
            .where({id:idEdit})
        } else {
            res.status(404)
            throw new Error("'id' não encontrada")
        }
        
        res.status(200).send("Purchase atualizada com sucesso")
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
