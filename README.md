# Desafio Stefanini
## _Serverless Challenger_



Neste desafio, foi provisionado uma infraestrutura na AWS, com uma lambda function capaz de registrar em um banco de dados MongoDB, dados sobre funcionários de uma empresa. Abaixo listo descrições tecnicas utilizadas no desenvolvimento.

- Linguagem - Javascript
- Plataforma Nodejs Runtime (nodejs12.x)
- Framework Express.js
- Yarn
- Banco de Dados - MongoDB, rodando externamente com MongoDB Atlas (AWS)
- Arquitetura separada conforme abaixo
#
    1 - Model - Extrutura entity de Funcionarios
    2 - Repository - Persistência de Dados
    3 - Service - Regras de Negócio
    4 - Controller - Privisionamento dos Services
    5 - Database - Configuração do Banco de dados
#
- Utilização de variável de hambiente com DotEnv

## Configurações de API
As informações abaixo simulam um passo a passo para testes locais assim como o próprio deploy da Lambda na AWS, que foi o Serviço de Clound implantado em questão. Se você já tem o Framework do Serverless instalado na máquina, pode passar diretamente para o passo clone do projeto, conforme comandos abaixo. 

## Observações

Não estou abordando aqui configuração de usuários, grupo de susuário e permissões dentro da Amazon, assim como geração de credenciais de acesso como o key e o secret.

## Instalação

Meu teste inicial foi com a versão 14.17.3 do  NodeJS instalada localmente.

Com o Node e NPM instalados, siga os passos abaixo.

```sh
~$ npm i -g serverless
~$ serverless config credentials -o --provider aws --key=[AWS_KEY] --secret [AWS_SECRET]
~$ serverless create --template aws-nodejs --path desafio-stefanini
~$ git clone https://github.com/viniciusgoliver/desafio-stefanini.git
~$ cd desafio-stefanini
~$ yarn
```

Agora, precisaremos criar um novo arquivo chamado variables.env e adicionar os dados de acesso refernete ao seu Banco de dados MONGODB.

```sh
DB_HOST=
DB_USER=
DB_PASS=
DB_DATABASE=
```

## Considerações

> O arquivo serverless, resopnsável pelas configurações do Labda, no final adicionei um plugin chamado `serverless-offline` Com esse plugin é possível rodarmos ou ter uma prévia das nossas functions Labda, isso é de grande ajuda pra corrigirmos possíveis falhas, ou criarmos novas features antes mesmo de rodar o Deploy Final. is required for PDF rendering.

## Testando local

Para inicializarmos nossos primeiros passas, vamos simular o deploy da nossa API. Para isso, execute o comando abaixo.

```sh
~$ sls offline start --skipCacheInvalidation
```

Este comando utiliza o mecanismo de execução do framework serveless, justamente pra simular o UP dos endpoints. Se tudo der certo, o retorno deve ser algo parecido com o que está abaixo.

```sh
offline: Starting Offline: dev/us-east-1.
offline: Offline [http for lambda] listening on http://localhost:3002
offline: Function names exposed for local invocation by aws-sdk:
           * create: desafio-stefanini-dev-create
           * getOne: desafio-stefanini-dev-getOne
           * getAll: desafio-stefanini-dev-getAll
           * update: desafio-stefanini-dev-update
           * delete: desafio-stefanini-dev-delete

   ┌────────────────────────────────────────────────────────────────────────────┐
   │                                                                            │
   │   POST   | http://localhost:3000/dev/users                                 │
   │   POST   | http://localhost:3000/2015-03-31/functions/create/invocations   │
   │   GET    | http://localhost:3000/dev/users/{id}                            │
   │   POST   | http://localhost:3000/2015-03-31/functions/getOne/invocations   │
   │   GET    | http://localhost:3000/dev/users                                 │
   │   POST   | http://localhost:3000/2015-03-31/functions/getAll/invocations   │
   │   PUT    | http://localhost:3000/dev/users/{id}                            │
   │   POST   | http://localhost:3000/2015-03-31/functions/update/invocations   │
   │   DELETE | http://localhost:3000/dev/users/{id}                            │
   │   POST   | http://localhost:3000/2015-03-31/functions/delete/invocations   │
   │                                                                            │
   └────────────────────────────────────────────────────────────────────────────┘

```

> Note: `/dev/` é por que eu específiquei dentro do arquivo serverless o stage de execução como dev. 

Seguindo, teste os endpoints com o insomnia ou postman.

Após a previa, vamo executar nosso deploy para o ambiente AWS.

```sh
~$ serverless deploy -v
```

> Note: `-v` utilizei o parâmetro -v, pra acompanhar todo o processo de deploy, no modo verbose. É uma forma de acompanhar o passo a passo da configuração para AWS.

Se tudo der certo, vamos ter o retorno mais uo menos o abaixo.

```sh
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service desafio-stefanini.zip file to S3 (3.88 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
CloudFormation - UPDATE_IN_PROGRESS - AWS::CloudFormation::Stack - desafio-stefanini-dev
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - GetAllLambdaFunction
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - DeleteLambdaFunction
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - UpdateLambdaFunction
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - GetOneLambdaFunction
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - CreateLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - GetOneLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - DeleteLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - GetAllLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - CreateLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - UpdateLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - GetOneLambdaVersionxMpQOjFKoxxB3tMTIgAgya9hy01mGli1Zw9Mla0hY
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - DeleteLambdaVersionYMXQIw9KDC30G7KHX0Z71d3xy1Q5sAMp8Xz7BxMdQ
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - CreateLambdaVersiongD3cyCnrWYrgQ68tftzQXszQGOwWm9489OxAxUvVtwU
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - GetAllLambdaVersionWQbV6q5O4dCb4hCrO4UH4jpH2A9ia0Ctnqg0dlIpA6s
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - GetOneLambdaVersionxMpQOjFKoxxB3tMTIgAgya9hy01mGli1Zw9Mla0hY
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - UpdateLambdaVersionNtbpBC38kp9iw4ZAk29wykJqTbvHb64ZIcfio
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - GetOneLambdaVersionxMpQOjFKoxxB3tMTIgAgya9hy01mGli1Zw9Mla0hY
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - DeleteLambdaVersionYMXQIw9KDC30G7KHX0Z71d3xy1Q5sAMp8Xz7BxMdQ
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - CreateLambdaVersiongD3cyCnrWYrgQ68tftzQXszQGOwWm9489OxAxUvVtwU
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - GetAllLambdaVersionWQbV6q5O4dCb4hCrO4UH4jpH2A9ia0Ctnqg0dlIpA6s
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - UpdateLambdaVersionNtbpBC38kp9iw4ZAk29wykJqTbvHb64ZIcfio
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - DeleteLambdaVersionYMXQIw9KDC30G7KHX0Z71d3xy1Q5sAMp8Xz7BxMdQ
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - GetAllLambdaVersionWQbV6q5O4dCb4hCrO4UH4jpH2A9ia0Ctnqg0dlIpA6s
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - UpdateLambdaVersionNtbpBC38kp9iw4ZAk29wykJqTbvHb64ZIcfio
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - CreateLambdaVersiongD3cyCnrWYrgQ68tftzQXszQGOwWm9489OxAxUvVtwU
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1632615563736
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1632615563736
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Deployment - ApiGatewayDeployment1632615563736
CloudFormation - UPDATE_COMPLETE_CLEANUP_IN_PROGRESS - AWS::CloudFormation::Stack - desafio-stefanini-dev
CloudFormation - DELETE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1632604795557
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - CreateLambdaVersioneYy5YBxuSpWfMpqsFo1N3Iyo9BN2fCMiA9euucfTHI
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - GetAllLambdaVersionQLvdoXTRTijRXXLm1LAG62yMQd67NfCG1YbQBuZaY
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - GetOneLambdaVersionk9hlVeQS97eO0Q5p6UPAh9inJpbCQh8AD40WznNep9E
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - DeleteLambdaVersionDHvtijC2AtWQmyC303is3UmhfYXlMOQOtnTvujmZjs
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - UpdateLambdaVersionhycWhhZyOsnFWr3OnkblVrazCQQL7mPkiwkWnjk
CloudFormation - DELETE_COMPLETE - AWS::ApiGateway::Deployment - ApiGatewayDeployment1632604795557
CloudFormation - UPDATE_COMPLETE - AWS::CloudFormation::Stack - desafio-stefanini-dev
Serverless: Stack update finished...
Service Information
service: desafio-stefanini
stage: dev
region: us-east-1
stack: desafio-stefanini-dev
resources: 34
api keys:
  None
endpoints:
  POST - https://i6a805ndy0.execute-api.us-east-1.amazonaws.com/dev/users
  GET - https://i6a805ndy0.execute-api.us-east-1.amazonaws.com/dev/users/{id}
  GET - https://i6a805ndy0.execute-api.us-east-1.amazonaws.com/dev/users
  PUT - https://i6a805ndy0.execute-api.us-east-1.amazonaws.com/dev/users/{id}
  DELETE - https://i6a805ndy0.execute-api.us-east-1.amazonaws.com/dev/users/{id}
functions:
  create: desafio-stefanini-dev-create
  getOne: desafio-stefanini-dev-getOne
  getAll: desafio-stefanini-dev-getAll
  update: desafio-stefanini-dev-update
  delete: desafio-stefanini-dev-delete
layers:
  None

Stack Outputs
GetOneLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:934954887435:function:desafio-stefanini-dev-getOne:3
GetAllLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:934954887435:function:desafio-stefanini-dev-getAll:3
DeleteLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:934954887435:function:desafio-stefanini-dev-delete:3
CreateLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:934954887435:function:desafio-stefanini-dev-create:3
UpdateLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:934954887435:function:desafio-stefanini-dev-update:3
ServiceEndpoint: https://i6a805ndy0.execute-api.us-east-1.amazonaws.com/dev
ServerlessDeploymentBucketName: desafio-stefanini-dev-serverlessdeploymentbucket-1a4q6cp0gisbe
```

> Note: `endpoints` é interessante destacar que, o processo de deploy já cria os endpoints já com as uri que se encontram na AWS. 

Com isso, finalizo o processo de implantação de Lambda Functions com NodeJS na AWS.

## License

MIT

**"Só conquista quem sonha, só sonha quem acredita (my principle)" - Free Software, Tanks**