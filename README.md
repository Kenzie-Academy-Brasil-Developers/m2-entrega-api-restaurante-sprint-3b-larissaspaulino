# Extra - Criando api para um restaurante
Vamos criar uma api para auxiliar na organização dos pedidos em um determinado restaurante.

## Objetivo
O intuito desta atividade e aplicar todos os conhecimentos acumulados nessa sprint de forma mais independente.

### Aviso!
Todos os testes para essa atividade já foram implementados, clone esse repositório para começar o desenvolvimento do projeto.

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
### Regras:
- calories e price: Deve conter duas casas decimais caso sejam diferente de 0. Ambos devem ser do tipo number. Caso contrário, retorne o status code 400 e uma mensagem de erro personalizada.
- calories: Deverá ter um valor padrão 0, portanto não é obrigatório enviar.
- session: Não é um campo obrigatório, caso não seja enviado preencher com null.
<hr>

### PATCH /product/:id
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
#### Regras:
- Deve obedecer as mesmas regras da rota POST
<hr>

### GET /product/:id
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
#### Regras:
Caso o produto não exista, deve ser retornado o status 404 e um objeto vazio {}.
<hr>

#### DELETE/product/:id
Deve deletar o produto com determinado id.

#### Requisição:
Não possui corpo de requisição

#### Resposta: Status 204
```json
{}
```
#### Regras:
- Caso o produto não exista deve ser retornado o status 404 e um objeto vazio {}.
<hr>

### GET /product
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
#### Regras:
- page: Caso não seja passado nenhum valor deve ser atribuído 1.
- perPage: Caso não seja passado nenhum valor deve ser atribuído 15.
<hr>

### POST /order
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
#### Regras:
- total: Deve retornar o total da soma de todos os produtos inseridos no pedido dinamicamente.
- createdAt: Retorna a data do instante que o pedido foi criado.
- paid: Sempre será iniciado como false.
- productsList: Aceita apenas um array dos id's dos produtos porém no retorno deve ser apresentado o objeto inteiro de cada produto.
- productsList: Caso algum produto não exista, retorne uma mensagem de erro personalizada e o status 404.
<hr>

### PATCH /order/:id
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
#### Regras:
- total: Não pode ser alterado.
- createdAt: Não pode ser alterado.
- productsList: Não pode ser atualizado e deve ser retornado apenas os id's dos produtos.
<hr>

### GET /order/:id
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
#### Regras:
- Caso o pedido não exista deve ser retornado o status 404 e um objeto vazio {}.
<hr>

### DELETE /order/:id
Deve deletar um pedido através do id.

#### Requisição:
Não possui corpo de requisição

#### Resposta: Status 204
```json
{}
```
#### Regras:
- Caso o pedido não exista deve ser retornado o status 404 e um objeto vazio {}.
<hr>

### PATCH /order/:id/pay
Deve atualizar o status paid do pedido para true.

#### Requisição:
Não possui corpo de requisição

#### Resposta: Status 204
Não possui corpo de requisição

#### Regras:
- Caso o pedido não exista deve ser retornado o status 404 e um objeto vazio {}.
<hr>

### GET /order
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
#### Regras:
- Caso não exista pedidos em aberto, retornar as informações da paginação e data: [].
