---
title: CRUD simples com ASP.NET Core
description: 'Criando uma CRUD básica do zero usando CLI'
date: '2021-07-02 21:00:00'
category: .NET
background: '#6959CD'
---
### Dificuldade
Iniciante

### Descrição
Vamos criar um CRUD simples de Herois, usando o ASP.NET Core 5, Entity Framwork que ficará responsavel pela parte de persistencia de dados com o banco de dados.


## Criando a base do projeto

Primeiramente vamos criar a estrutura do projeto através do Prompt de Comandos, logo em seguida abriremos o Visual Studio Code e seguiremos utilizando o terminal do próprio VS Code.

Abra o Prompt, navegue até a pasta em que deseja criar o projeto, em seguida crie uma pasta para o projeto e utilize o seguinte comando para criar a estrutura MVC do ASPNET core na pasta criada:
````jsx
mkdir hero
cd hero
dotnet new mvc
````

Em seguida de um ````code .```` no Prompt para abrir o VS Code.

## Criando a model e o context

Crie uma classe com o nome “Hero” dentro da pasta Models e adicione os atributos nela, a classe ficará da seguinte forma:

````jsx
using System;
using System.ComponentModel.DataAnnotations;

namespace hero.Models
{
    public class Hero
    {
        [Key]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(100, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(100, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 11)]
        public string Poderes { get; set; }

        [Display(Name = "Descrição")]
        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(100, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 11)]
        public string Descricao { get; set; }
        public string Foto { get; set; }
        public bool Ativo { get; set; }
    }
}
````
Adicionar a dependência do Entity Framework para ser usada no contexto com o seguinte comando no terminal:<br>
````jsx
dotnet add package Microsoft.EntityFrameworkCore --version 5.0.7
````

Crie um arquivo chamado Context dentro da pasta Models, ele deverá ficar da seguinte forma:

````jsx
using Microsoft.EntityFrameworkCore;

namespace hero.Models
{
    public class Context: DbContext {
        public Context (DbContextOptions options) : base (options) {
        }
        public DbSet<Hero> Heroes { get; set; }
    }
}
````

## Configurando o appsettings.json

Agora precisamos configurar a connection string, para isso adicione adicione as seguintes linhas no arquivo appsettings.json:

````jsx
  "ConnectionStrings": {
        "DefaultConnection": "Server=DESKTOP-KMPQU7D\\SQLEXPRESS;Database=Heroes;MultipleActiveResultSets=true;Trusted_Connection=True;"
    }

````
OBS: A String de conexão vai ser diferente dependendo do nome da instancia do seu servidor SQL.

O arquivo completo appsettings.json ficará da seguinte forma:

````jsx
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=Heroes;MultipleActiveResultSets=true;Trusted_Connection=True;"
  }
}
````

## Configurando o Startup.cs

Adicionar a dependência do SQL Server, executando o seguinte comando no terminal:<br>
````jsx
dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 5.0.7
````

No arquivo Startup.cs no método ConfigureServices adicione a seguinte linha:

````jsx
services.AddDbContext<Context> (options => options.UseSqlServer (Configuration.GetConnectionString ("DefaultConnection")));

````

O método completo ficará da seguinte forma:

````jsx
 public void ConfigureServices (IServiceCollection services) {
      services.AddDbContext<Context> (options => options.UseSqlServer (Configuration.GetConnectionString ("DefaultConnection")));
      services.AddControllers ();
  }


````

Agora iremos adicionar a dependência para gerar as migrations que servira como base para a criação do banco de dados, digite o seguinte comando no terminal:
````jsx
dotnet add package Microsoft.EntityFrameworkCore.Design --version 5.0.7
````

Em seguida gere as migrations usando o seguinte comando no terminal:
````jsx
dotnet ef migrations add Initial
````

E para gerar o banco de dados usando nossas migrations execute o seguinte comando no terminal:
````jsx
dotnet ef database update
````

## Criando a Controller e Views de forma automática usando o Scaffold

Primeiramente vamos adicione a dependência CodeGeneration que é utilizada no Scaffold, execute a seguinte linha de comando no terminal:
````jsx
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design --version 5.0.2
````

Com a dependência adicionada vamos criar nossa Controller e Views de forma automática com o Scaffold através do CodeGeneration executando o seguinte comando no terminal:
````jsx
dotnet aspnet-codegenerator controller -name HeroesController -m Hero -dc Context --relativeFolderPath Controllers --useDefaultLayout
````

Com esse comando, será criado forma automática a controller e views com todos os métodos base de um CRUD (Index/Create/Edit/Delete/Details) 

Na pasta View/Shared no arquivo _Layout.cshtml, vá até as tags `<li>` e adicione as seguintes linhas de comando para nosso CRUD ficar disponivel no menu do "sistema":
````
<li class="nav-item">
        <a class="nav-link text-dark" asp-area="" asp-controller="Heroes" asp-action="Index">Hero</a>
</li>
````

Pronto, finalizamos. Agora vamos rodar nosso projeto utilizando ````dotnet run ```` para ver se tudo saiu conforme o planejado.
Acesse o sistema utilizando o seguinte endereço: 
`https://localhost:5001/Heroes`

Observe que já vem um padrão de layout da Microsoft utilizando o Bootstrap. Se tudo ocorrer bem, quando você entrar no sistema pelo navegador vera essa tela:
![Index](assets/img/home.png)

Clicando na opção "Hero" verá essa segunda tela(nela contém a lista de Heroes cadastrados, é possivel criar novos, editar, apagar e ver detalhes):
![CRUD](assets/img/crud_index.png)

Se você reparou bem, tem um campo que chamamos de "Foto", parece estranho não? Mas não se preocupe, no proximo artigo iremos utilizar ele para aprender a fazer uploads de foto, com isso além das informações basicas cadastradas iremos também adicionar uma foto ao cadastro.



#### Referências

<a href="https://docs.microsoft.com/pt-br/dotnet/">.NET Core 5</a>

<a href="https://docs.microsoft.com/pt-br/ef/">Entity Framework</a>

<a href="https://docs.microsoft.com/pt-br/aspnet/core/fundamentals/tools/dotnet-aspnet-codegenerator?view=aspnetcore-5.0">dotnet aspnet-codegenerator</a>

<a href="https://code.visualstudio.com/docs/editor/command-line">Command Line Interface (CLI)</a>

<a href="https://docs.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations?view=net-5.0">System.ComponentModel.DataAnnotations Namespace</a>
