import {user, product, purchase} from "./database"
import express, {Request, Response} from 'express'
import cors from "cors"
import { TProduct, TPurchase, TUser, CATEGORY_PRODUCT } from "./types"
import { db } from "./database/knex"

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})


//Todos os usuários
app.get("/users", async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
            SELECT * FROM users;
        `)
        res.status(200).send({users: result})

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
app.get("/products", async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
            SELECT * FROM products;
        `)
        res.status(200).send({products: result})

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
        const result = await db.raw(`
            SELECT * FROM purchases;
        `)
        res.status(200).send({purchases: result})

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
app.post('/users', async (req: Request, res: Response) => {

    try {
        const {id, email, name, password, createdAt} = req.body.id
    
        if (id !== undefined){
            
        if (typeof id !== "string"){
         res.status(400);
                throw new Error ("Id precisa ser uma string");
        }     
        } else {
            res.status(400);
            throw new Error ("Cliente precisa ter uma ID");
        }

        if (email !== undefined){
            if (typeof email !== "string"){
                res.status(400);
                throw new Error ("E-mail do cliente precisa ser um string");
            }

            
        } else {
            res.status(400);
            throw new Error ("É necessário cadastrar um e-mail");
        }

        if (password !== undefined){
            if (typeof password !== "string"){
                res.status(400);
                throw new Error ("Password do cliente deve ser uma string");
            }
        } else {
            res.status(400);
            throw new Error ("É necessário cadastrar uma senha");
        }

        await db.raw(`
        INSERT INTO clients (id, email, password)
        VALUES("${id}","${name},"${email}","${password}", {${createdAt}})
    `)

    res.status(201).send(`Usuario cadastrado com sucesso.`);
        
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
app.post('/product', async (req: Request, res: Response) => {

    try {
        const { id, name, price, category, imageUrl } = req.body;
  
              if (typeof id != "string") {
                res.status(400);
                throw new Error("'id' invalido, deve ser uma string");
              }
          
              if (typeof name != "string") {
                res.status(400);
                throw new Error("'name' invalido, deve ser uma string");
              }
          
              if (id.length < 1 || name.length < 1) {
                res.status(400);
                throw new Error("'id' ou 'name' devem ter no minimo 1 caractere");
              }
          
              if (typeof price != "number") {
                res.status(400);
                throw new Error("'price' invalido, deve ser um number");
              }
          
              if (typeof category != "string") {
                res.status(400);
                throw new Error("'category' invalido, deve ser uma string");
              }
          
              if (typeof imageUrl != "string") {
                res.status(400);
                throw new Error("'imageUrl' invalido, deve ser uma string");
              }
          
              await db.raw(`
                INSERT INTO products ( id, name, price, category, imageUrl)
                VALUES ("${id}", "${name}", "${price}", "${category}", "${imageUrl}")
              `);
          
              res.status(200).send(`Produto adicionado com sucesso.`);

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
app.post('/purchase', async (req: Request, res: Response) => {
    try {
        const { id, total_price, paid, delivered_at, buyer_id } = req.body;
  
      if (typeof id != "string") {
        res.status(400);
        throw new Error("'id' invalido, deve ser uma string");
      }
  
      if (typeof delivered_at != "string") {
        res.status(400);
        throw new Error("'delivered_at' invalido, deve ser uma string");
      }
  
      if (typeof buyer_id != "string") {
        res.status(400);
        throw new Error("'buyer_id' invalido, deve ser uma string");
      }
  
      if (typeof total_price != "number") {
        res.status(400);
        throw new Error("'total_price' invalido, deve ser um number");
      }
  
      if (paid > 1 && paid < 0) {
        res.status(400);
        throw new Error("'paid' invalido, deve ser 0 ou 1");
      }
  
      if (
        id.length < 1 ||
        paid.length < 1 ||
        delivered_at.length < 1 ||
        buyer_id.length < 1
      ) {
        res.status(400);
        throw new Error("As informações devem ter no minimo 1 caractere");
      }
  
      await db.raw(`
        INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
        VALUES ("${id}", "${total_price}", "${paid}", "${delivered_at}", "${buyer_id}")
      `);
  
      res.status(200).send(`Compra cadastrada com sucesso`);

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
app.get("/products/search", async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        if (q.length <= 1) {
            res.status(400)
            throw new Error ("Query params deve possuir pelo menos um caractere")
        }

        const [product] = await db.raw(`
            SELECT * FROM products
            WHERE LOWER (name) LIKE ("%${q}%");
        `)

        res.status(200).send({product: product})   
        
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
app.get("/product/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
  
      const [product] = await db.raw(`
        SELECT * FROM products
        WHERE id = "${id}";
      `);
  
      if (!product) {
        res.status(400);
        throw new Error("Produto não encontrado")
      }
  
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

//Pesquisar array de compras pelo Id
app.get("/users/:id/purchase", async (req: Request, res: Response) => {
    try {
    const id = req.params.id;
  
      const purchases = await db.raw(`
        SELECT * FROM purchases
        WHERE buyer_id = "${id}";
      `);
  
      res.status(200).send({ purchases: purchases });
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

