![](https://i.imgur.com/xG74tOh.png)

# Backend TypeScript - ORM

O Objetivo dessa aula é abordar alguns conceitos mais avançados em um projeto com TypeScript de acordo com os requisitos de um projeto real.

Antes de implementar o código da aplicação é necessário entender alguns conceitos relacionados a padrões e ferramentas que vamos usar ao longo do projeto.

Então vamos lá!

## ORM - Object Relational Mapper

<details style="margin-bottom: 20px;">
    <summary style="margin-bottom: 20px;">Conceito</summary>

Basicamente é uma técnica que une o paradigma de programação orientada a objetos de uma aplicação ao paradigma relacional do banco de dados.

Cada tabela no banco de dados é representada por uma classe que geralmente são chamadas de entidades.

<details>
<summary>Exemplo</summary>

```ts
class Usuario {
	id: number
	nome: string
	email: string
}
```

</details>

Os dois padrões mais utilizados para implementação de um ORM é o Data Mapper e o Active Record.

No Data Mapper, a classe que representa a entidade possui apenas as características relacionadas a tabela e o ORM disponibiliza uma classe/função para realizar as transações do banco de dados (inserir, ler, atualizar...).

<details>
<summary>Exemplo</summary>

```ts
const entidadeUsuario = conexao.obterEntidade(Usuario)

const usuario = new Usuario()
usuario.nome = 'Guido Cerqueira'
usuario.email = 'guido@email.com'
usuario.senha = '12345'

entidadeUsuario.inserir(usuario)
```

</details>

No Active Record a classe que representa a entidade possui todas as funcionalidades para realizar as transações do banco de dados (inserir, ler, atualizar...).

<details>
<summary>Exemplo</summary>

```ts
const usuario = new Usuario()
usuario.nome = 'Guido Cerqueira'
usuario.email = 'guido@email.com'
usuario.senha = '12345'
usuario.salvar()
```

</details>

O ORM que vamos utilizar no curso é o `TypeORM` e ele premite trabalhar com os dois padrões apresentados anteriormente.

</details>

## Database Migrations

<details style="margin-bottom: 20px;">
    <summary style="margin-bottom: 20px;">Conceito</summary>

As migrations ou migrações é uma forma de versionamento do banco de dados de uma aplicação que gerencia a construção e manutenção das tabelas, mantendo sua integridade.

A cada nova implementação no banco de dados, uma nova migration é criada e após executada, a mesma não poderá ser alterada.

Uma migration é como se fosse um commit do GIT e caso precise voltar para uma versão anterior da estrutura do banco de dados, é possível fazer um rollback.

Uma grande vantagem de usar migrations é a automatização da modelagem de um banco de dados. Isso significa que, ao clonar um projeto e rodar as migrations, toda estrutura de tabelas serão criadas automaticamente da forma em que foi implementada, mantendo a compatibilidade em qualquer ambiente que o projeto seja instalado.

<details>
<summary>Principais Comandos</summary>

```bash
# cria uma nova migration
typeorm migration:create ./caminho/nomeDaMigration

# executa todas as migrations pendentes
typeorm -d ./caminho/data-source.ts migration:run

# desfaz as alterações da ultima migration executada
typeorm -d ./caminho/data-source.ts migration:revert
```

</details>

</details>

## Repository Pattern

<details style="margin-bottom: 20px;">
    <summary style="margin-bottom: 20px;">Conceito</summary>

O padrão repository é um padrão de projeto que abstrai as operações com o banco de dados, desacoplando a interação da camada de modelo (entidades) com a camada de dados.

No typeORM, por exemplo, usamos repository quando trabalhamos com Data Mapper. A entidade só possui suas características específicas e o repository fornece todas as funcionalidades para interação com o banco de dados.

<details>
<summary>Exemplo</summary>

```ts
const usuarioRepository = conexao.getRepository(Usuario)

// busca usuario com id = 1
usuarioRepository.find(1)

// cadastra um novo usuário
const novoUsuario = usuarioRepository.create({
	nome: 'Guido Cerqueira',
	email: 'guido@email.com',
	senha: '12345',
})

usuarioRepository.save(novoUsuario)
```

</details>

</details>

###### tags: `backend` `typescript` `nodejs` `javascript`
