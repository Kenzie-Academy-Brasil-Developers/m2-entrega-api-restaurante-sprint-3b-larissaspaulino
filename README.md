
# API restaurante
Criação de uma api para auxiliar na organização dos pedidos em um determinado restaurante. Primeiro projeto back-end - desenvolvido em **Node.js** e Express.
##### base_URL: [https://api-restaurante-extra.herokuapp.com/products](https://api-restaurante-extra.herokuapp.com)
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/><space><space>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/><space><space>

## Rotas
### POST /product
Os dados deverão ser salvos em um arquivo JSON.

#### Requisição:
```json
{
    "name": "Coca-Cola lata",
    "calories": 90.45,
    "price": 4.00,
    "session": "Bebidas"
}
```
#### Resposta: Status 201
```json
{
    "id": 1,
    "name": "Coca-Cola lata",
    "calories": 90.45,
    "price": 4.00,
    "session": "Bebidas"
}
```

### PATCH /products/:id
Deve atualizar os campos do produto com determinado id no JSON e retornar todos os campos com as atualizações.

#### Requisição:
```json
{
    "price": 4.50,
}
```
#### Resposta: Status 200
```json
{
    "id": 1,
    "name": "Coca-Cola lata",
    "calories": 90.45,
    "price": 4.50,
    "session": "Bebidas"
}
```

### GET /products/:id
Deve retornar o produto com determinado id.

#### Requisição:
Não possui corpo de requisição

#### Resposta: Status 200
```json
{
    "id": 1,
    "name": "Coca-Cola lata",
    "calories": 90.45,
    "price": 4.50,
    "session": "Bebidas"
}
```

#### DELETE/products/:id
Deve deletar o produto com determinado id.

#### Requisição:
Não possui corpo de requisição

#### Resposta: Status 204
```json
{}
```

### GET /products
Deve retornar as informações da paginação e um array dos produtos em determinada página.

#### Requisição:
Não possui corpo de requisição

#### Resposta: Status 200
```json
 [
    {
        "id": 1,
        "name": "Coca-Cola lata",
        "price": 4.50,
        "calories": 90.45,
        "session": "Bebidas"
    },
    {
        "id": 2,
        "name": "Creme de cupuaçu",
        "price": 8.85,
        "calories": 332.45,
        "session": "Sobremesa"
    },
    {
        "id": 3,
        "name": "Risotto alla mialese",
        "price": 16.80,
        "calories": 673.59,
        "session": "Prato principal"
    },
    {
        "id": 4,
        "name": "Macarrao ao molho branco",
        "price": 11.35,
        "calories": 722.43,
        "session": "Prato principal"
    },
    {
        "id": 5,
        "name": "Lasanha Bolonhesa",
        "price": 5.83,
        "calories": 932.45,
        "session": "Prato principal"
    }
]
```

### POST /orders
Deve criar um pedido com o número da mesa e o id de cada um dos produtos.

#### Requisição:
```json
{
    "table": "10",
    "productsList": [1,3,5]
}
```
#### Resposta: Status 201
```json
{
    "id": 1,
    "table": "10",
    "total": 26.00,
    "createdAt": "Wed, 20 Oct 2021 16:10:38 GMT",
    "paid": false,
    "productsList": [
        {
            "id": 1,
            "name": "Coca-Cola lata",
            "price": 4.50,
            "calories": 90.45,
            "session": "Bebidas"
        },
        {
            "id": 3,
            "name": "Risotto alla mialese",
            "price": 16.80,
            "calories": 673.59,
            "session": "Prato principal"
        },
        {
            "id": 5,
            "name": "Lasanha Bolonhesa",
            "price": 5.83,
            "calories": 932.45,
            "session": "Prato principal"
        }
    ]
}
```

### PATCH /orders/:id
Deve atualizar um pedido através do seu id.

#### Requisição:
```json
{
    "table": "2",
}
```

#### Resposta: Status 200
```json
{
    "id": 1,
    "table": "2",
    "total": 26.00,
    "createdAt": "Wed, 20 Oct 2021 16:10:38 GMT"
    "paid": false,
    "productsList": [1,3,5]
}
```

### GET /orders/:id
Deve um pedido através do id.

#### Requisição:
Não possui corpo de requisição

#### Resposta: Status 200
```json
{
    "id": 1,
    "table": "2",
    "total": 26.00,
    "createdAt": "Wed, 20 Oct 2021 16:10:38 GMT"
    "paid": false,
    "productsList": [
        {
            "id": 1,
            "name": "Coca-Cola lata",
            "price": 4.50,
            "calories": 90.45,
            "session": "Bebidas"
        },
        {
            "id": 3,
            "name": "Risotto alla mialese",
            "price": 16.80,
            "calories": 673.59,
            "session": "Prato principal"
        },
        {
            "id": 5,
            "name": "Lasanha Bolonhesa",
            "price": 5.83,
            "calories": 932.45,
            "session": "Prato principal"
        }
    ]
}
```
### DELETE /orders/:id
Deve deletar um pedido através do id.

#### Requisição:
Não possui corpo de requisição

#### Resposta: Status 204
```json
{}
```

### PATCH /orders/:id/pay
Deve atualizar o status paid do pedido para true.

#### Requisição:
Não possui corpo de requisição

#### Resposta: Status 204
Não possui corpo de requisição

### GET /orders
Deve retornar todos os pedidos com o status paid === false.

#### Requisição:
Não possui corpo de requisição

#### Resposta: Status 200
```json
[
    {
        "id": 6,
        "table": "3",
        "total": 42.0,
        "createdAt": "Wed, 20 Oct 2021 16:10:38 GMT",
        "paid": false,
        "productsList": [4,5,7]
    },
    {
        "id": 5,
        "table": "2",
        "total": 26.0,
        "createdAt": "Thu, 14 Oct 2021 14:38:57 GMT",
        "paid": false,
        "productsList": [1,3,5]
    },
    {
        "id": 4,
        "table": "7",
        "total": 46.0,
        "createdAt": "Thu, 16 Oct 2021 02:25:47 GMT",
        "paid": false,
        "productsList": [1,3,5,10]
    },
    {
        "id": 3,
        "table": "5",
        "total": 26.00,
        "createdAt": "Thu, 14 Oct 2021 02:25:21 GMT",
        "paid": false,
        "productsList": [1,3,5]
    },
    {
        "id": 2,
        "table": "6",
        "total": 26.00,
        "createdAt": "Thu, 14 Oct 2021 02:25:21 GMT",
        "paid": false,
        "productsList": [1,3,5]
    }
]
```
