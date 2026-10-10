# Projeto Raízes do Nordeste

## Sobre

O projeto Raízes do Nordeste visa atender as necessidade de um estabelecimento do ramo alimentício em relação ao gerenciamento de pedidos.
Nesse sistema é possível que o estabelecimento crie pedidos, faça o gerenciamento de estoque, cancelamento de pedidos, criação e autenticação de funcionários, bem como registro e autenticação de clientes.
O fluxo principal do sistema segue a criação do pedido --> pagamento por um mock --> atualização do status do pedido.

## Requisitos

- **Git**: para clonar o repositório
- **Node.js**: 24.20.0
- **Docker**: 29.7.2
- **Docker Compose**: 5.3.1
- **PostgreSQL**: 16 (container Docker)

## Instalação

```bash
# clonar o repositório usando HTTPS
git clone https://github.com/letlm/proj-raizes-do-nordeste.git

# ou clonar o repositório usando chave SSH
git clone git@github.com:letlm/proj-raizes-do-nordeste.git

# entrar na pasta em que você clonou o repositório
cd proj-raizes-do-nordeste

# instalar as dependências
npm install
```

## Configuração das variáveis de ambiente

Copie o arquivo `.env.example` para `.env` com o seguinte comando `cp .env.example .env`. O arquivo contém as variáveis de ambiente necessárias para a execução do projeto:
- `DATABASE_URL`
- `JWT_SECRET`
- `ADMIN_PASSWORD`

A variável `DATABASE_URL` ja está configurada no arquivo .env.example para a conexão com o PostgreSQL executado pelo Docker Compose: 
`DATABASE_URL='postgresql://postgres:postgres@localhost:5432/raizes_nordeste'`

Caso sejam utilizadas configurações diferentes de usuário, senha, porta ou nome do banco de dados, a variável deverá ser ajustada conforme o ambiente. 

As variáveis `JWT_SECRET` e `ADMIN_PASSWORD`devem ser definidas antes da execução do projeto

Você pode gerar uma chave aleatória para a `JWT_SECRET` com o seguinte comando:

```bash
# gerar uma chave para JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Após a geração, adicione o valor gerado na variável `JWT_SECRET` no arquivo `.env`

A `ADMIN_PASSWORD` é a senha utilizada para o primeiro usuário ADMIN, você pode escolher uma senha que quiser e adicionar na variável.

## Banco de dados

O projeto utiliza o PostgreSQL, que é executado através do `docker-compose.yml`

```bash
# iniciar o container do banco de dados
docker compose up -d

# gerar o Prisma Client
npx prisma generate

# aplicar as migrations
npx prisma migrate deploy

# criar usuário ADMIN inicial
npx prisma db seed
```

O comando para criar o usuário ADMIN criará o usuário com o seguinte email: admin.da.api@teste.com
A senha do usuário é o valor que foi adicionado anteriormente a variável `ADMIN_PASSWORD`.

## Execução

```bash
# iniciar a aplicação em modo de desenvolvimento:
npm run start:dev
```

Após a execução a aplicação estará rodando em http://localhost:3000

## Documentação da API

A documentação foi feita com Swagger/OpenApi e com a aplicação em execução você poderá acessar em: http://localhost:3000/docs

## Testes

A collection do postman utilizada para a execução dos testes está disponível na pasta `postman` com o nome `raizes-nordeste.postman_collection.json`

Para importar a Collection no Postman, abra o Postman e selecione a opção para importar uma Collection. Em seguida, acesse a pasta onde o repositório foi clonado e selecione o arquivo da Collection disponivel na pasta `postman`.

![Importação da collection no postman](./assets/import-postman.png)

A Collection utiliza algumas variáveis para armazenar a URL da API, tokens de autenticação e IDs usados nas requisições. Os IDs deverão ser ajustados de acordo com os registros criados ao longo da execução dos testes.
![Variáveis da collection no postman](./assets/variaveis-postman.png)

Ao importar a Collection você verá que os tokens de autenticação estarão vazios, porém eles serão preenchidos automaticamente quando as requisições de login de cada um dos usuários forem realizadas.

A Collection está organizada em duas pastas: `endpoints`, que contém as requisições disponíveis na API, e `testes`, que reúne cinco cenários descritos abaixo, então poderá utilizar a pasta `testes` para facilitar a reprodução deles..

#### 1. Preparação dos dados

1. Execute o comando `npx prisma db seed`, informado anteriormente, para criar o primeiro usuário ADMIN.
2. Realize o login do usuário ADMIN utilizando o email informado neste README e a senha definida anteriormente na variável ADMIN_PASSWORD.
3. Crie uma unidade e armazene o ID retornado na variável `unitId` da Collection.
4. Crie um produto e armazene o ID retornado na variável `productId` da Collection.
5. Cadastre um funcionário com perfil COZINHA e outro com perfil ATENDENTE. Em seguida, realize o login de cada funcionário.
6. Crie um usuário CLIENTE e armazene o ID retornado na variável `clientId` da Collection. Em seguida, realize o login desse cliente.
7. Cadastre o estoque do produto na unidade criada anteriormente.
8. Execute a requisição de consulta ao cardápio da unidade, utilizando a variável `unitId`. Verifique se a resposta apresenta os produtos disponíveis na unidade, considerando os dados cadastrados anteriormente.

#### 2. Cenário de pedido com pagamento aprovado

1. Crie um pedido e armazene o ID retornado na variável `orderId` da Collection.
2. Execute a requisição de pagamento do pedido.
3. Consulte o pedido por ID e verifique se o status foi atualizado para CONFIRMADO.
4. Atualize o status do pedido de CONFIRMADO para EM_PREPARO.
5. Consulte novamente o pedido por ID e verifique se o status foi atualizado para EM_PREPARO.
6. Atualize o status do pedido de EM_PREPARO para PRONTO.
7. Consulte novamente o pedido por ID e verifique se o status foi atualizado para PRONTO.
8. Atualize o status do pedido de PRONTO para ENTREGUE.
9. Consulte novamente o pedido por ID e verifique se o status foi atualizado para ENTREGUE.

#### 3. Cenário de pedido com pagamento recusado

1. Crie um novo pedido utilizando o canal APP.
2. Armazene o ID retornado na variável `rejectedOrderId` da collection.
3. Execute a requisiçao de consulta de pedidos filtrados por canal. Consulte os canais WEB e APP e verique se os pedidos criados anteriormente aparecem nas respectivas listagens. A API também permite consultar os canais TOTEM e BALCAO.
4. Execute a requisição de pagamento recusado.
5. Consulte o pedido por ID e verifique se o status permanece como AGUARDANDO_PAGAMENTO.

#### 4. Cenário de cancelamento de pedido

1. Crie um novo pedido.
2. Armazene o ID retornado na variável `orderCancelId` da collection.
3. Execute a requisição de cancelamento do pedido.
4. Consulte o pedido por ID e verifique se o status foi atualizado para CANCELADO.

#### 5. Cenário de testes negativos

Além dos fluxos descritos anteriormente, a collection possui cenários de testes negativos, identificados nos nomes das requisições. Esses cenários podem ser executados após a preparação dos dados, conforme as instruções anteriores.
O resultado esperado de cada cenário está indicado pelo código HTTP presente no nome da respectiva requisição.
