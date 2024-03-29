<div align="center">


# Poll
</div>

  > 🚧 em desenvolvimento

<br/>


Essa aplicacao foi desenvolvida para sustentar um projeto de votos oline, se destacando pelo ponto de utilizar um padrao Rest, mas traz conecao WebSocket.

## Description:

Desenvolvida com o intuito de alimentar uma aplicacao fron-end _(em desenvolvimento)_, com o intuito de extender meus cohecimentos e praticar novos bancos como o Redis e a tech WebSocket, e trazer funcionalidades interesante para uma aplicacao web como:
 - Retorno em tempo real
 - Validacao segura
  
### Tech:
![redis](https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![ts--node](https://img.shields.io/badge/ts--node-3178C6?style=for-the-badge&logo=ts-node&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-4000BF?logo=insomnia&logoColor=white&style=for-the-badge)
<img src="https://fastify.dev/img/logos/fastify-white.svg" alt="fastify" width="120" height="67">


### Getting Started


<details>

  <summary>⚙️ Get Started Setup</summary>
  

  
  Primeiro, execute o a instalação dos pacotes:

 ```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

inicie o docker:
```bash
docker compose up -d
# ou
sudo docker compose up -d
```

A maneira mais fácil de explorar e manipular seus dados em todos os seus projetos Prisma.
 > - [Prisma/studio](https://github.com/prisma/studio)
 > 
 > __para melhor visualizacao do banco de cados utilize__:
 > ```bash
 >  npx prsima studio
 > 
 >  # certifique que o docker e o servidor esteja rodando
 > ``` 

</details>

</br>

execute o servidor de desenvolvimento:

 ```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

### Routes:

| 👉 [rotas em mais detalhes](./MD/routers.md)

##### Creat polls
criar uma enquetes
 - post
```http
http://localhost:3333/polls
```
```json
{
	"title": "",
	"options": []
}
```

##### New Vote
criar um voto entre as opcoes
 - post
```http
http://localhost:3333/polls/[:pollId]/voto
```
```json
{
	"pollOptionId": ""
}
```

##### get all polls
puxar todas as pesquisas
 - get
```http
http://localhost:3333/polls/all
```

##### get polls
puxar uma enquetes expecifica
 - get
```http
http://localhost:3333/polls/[:pollId]
```

##### delete polls
deletar uma enquetes expecifica
 - delete
```http
http://localhost:3333/polls/[:pollId]
```
```json
{
	"approval": boolean
}
```
