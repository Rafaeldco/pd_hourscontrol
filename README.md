# PD Hours Control
Desafio técnico para o processo seletivo da PD Soluções.

## **Endpoints**

### **Cadastrar Squad**
#### `POST` `/squad`
Essa rota permite o cadastro do squad.
É obrigatório informar o seguinte campo no body da requisição: name.

Exemplo de cadastro:

```javascript
{
  "name": "Back-end",
}
```

### **Cadastrar Usuário**
#### `POST` `/usuario`
Essa rota permite o cadastro do usuário.
É obrigatório informar os seguintes campos no body da requisição: name e squad_id.

Exemplo de cadastro:

```javascript
{
  "name": "João",
  "squad_id: 1"
}
```

### **Cadastrar Report**
#### `POST` `/report`
Essa rota permite a inserção de um report.
É obrigatório informar os seguintes campos no body da requisição: description, user_id, spent_hours.

Exemplo de cadastro:

```javascript
{
  "spent_hours": 8,
  "user_id": 4,
  "description": "Teste"
}
```
### **Listar horas gastas**
#### `GET` `'/horas/:squad_id/:periodoInicio/:periodoFim'`
>O padrão de uso nos parâmetros de rota do período (peridioInicio e periodoFim), em todos os endpoints que os utilizam, é: **YYYY-MM-DD**.

Essa rota retorna a listagem contendo as horas gastas de cada membro de um determinado squad, em um determinado período.


É obrigatório informar o seguintes campos como parâmetro de rota: squad_id, periodoInicio, periodoFim.

Exemplo de consulta:
http://localhost:3000/horas/1/2021-11-05/2021-12-03

Exemplo de retorno: 
```javascript
[
  {
    "nome": "Pedro",
    "horas_gastas": "8"
  },
  {
    "nome": "Rafael",
    "horas_gastas": "28"
  }
]
```

### **Listar tempo total**
#### `GET` `'/total/:squad_id/:periodoInicio/:periodoFim'`
>O padrão de uso nos parâmetros de rota do período (peridioInicio e periodoFim), em todos os endpoints que os utilizam, é: **YYYY-MM-DD**.

Essa rota retorna o tempo total gasto de uma squad em um determinado período, ou seja, a quantidade total de horas realizadas pelos membros daquela squad.


É obrigatório informar o seguintes campos como parâmetro de rota: squad_id, periodoInicio, periodoFim.

Exemplo de consulta:
http://localhost:3000/total/1/2021-11-05/2021-12-03

Exemplo de retorno: 
```javascript
{
  "nome": "Back-end",
  "total": "46"
}
```
### **Listar média**
#### `GET` `'/media/:squad_id/:periodoInicio/:periodoFim'`
>O padrão de uso nos parâmetros de rota do período (peridioInicio e periodoFim), em todos os endpoints que os utilizam, é: **YYYY-MM-DD**.

Essa rota retorna o tempo total gasto de uma squad em um determinado período, ou seja, a quantidade total de horas realizadas pelos membros daquela squad.


É obrigatório informar o seguintes campos como parâmetro de rota: squad_id, periodoInicio, periodoFim.

Exemplo de consulta:
http://localhost:3000/media/1/2021-11-05/2021-12-03

Exemplo de retorno: 
```javascript
{
  "media": 23
}
```