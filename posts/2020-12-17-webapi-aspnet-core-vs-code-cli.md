---
title: Web API ASPNET CORE com Visual Studio Code usando CLI
description: 'Criando uma Web API básica do zero'
date: '2020-12-17 20:00:00'
category: .NET
background: '#6959CD'
---
## Criando a base do projeto

Primeiramente vamos criar a estrutura do projeto através do Prompt de Comandos, logo em seguida abriremos o Visual Studio Code e seguiremos utilizando o terminal do próprio VS Code.

Abra o Prompt, navegue até a pasta em que deseja criar o projeto, em seguida crie uma pasta para o projeto e utilize o seguinte comando para criar a estrutura WebAPI do ASPNET core na pasta criada:
````jsx
mkdir HeroApi
cd HeroApi
dotnet new webapi
````

Em seguida de um ````code .```` no Prompt para abrir o VS Code.

## Criando a model e o context

Crie uma classe com o nome “Hero” dentro da pasta Models e adicione os atributos nela, a classe ficará da seguinte forma:

````jsx
using System;
using System.ComponentModel.DataAnnotations;

namespace WebApiHeroes.Models {
    public class Hero {
        [Key]
        public Guid Id { get; set; }

        [Required (ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength (100, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Nome { get; set; }

        [Required (ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength (100, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 11)]
        public string Poderes { get; set; }
        
        [Display(Name ="Descrição")]
        [Required (ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength (100, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 11)]
        public string Descricao { get; set; }
        public bool Ativo { get; set; }
    }
}
````
Adicionar a dependência do Entity Framework para ser usada no contexto com o seguinte comando no terminal:<br>
````jsx
dotnet add package Microsoft.EntityFrameworkCore --version 3.1.10
````

Crie um arquivo chamado ApiContext dentro da pasta Models, ele deverá ficar da seguinte forma:

````jsx
using Microsoft.EntityFrameworkCore;
namespace WebApiHeroes.Models {
    public class ApiContext : DbContext {
        public ApiContext (DbContextOptions options) : base (options) {

        }

        public DbSet<Hero> Heroes { get; set; }
    }
}

````

## Configurando o appsettings.json

Agora precisamos configurar a connection string, para isso adicione adicione as seguintes linhas no arquivo appsettings.json:

````jsx
  "ConnectionStrings": {
        "DefaultConnection": "Server=DESKTOP-KMPQU7D\\SQLEXPRESS;Database=ApiHeroes;MultipleActiveResultSets=true;Trusted_Connection=True;"
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
        "DefaultConnection": "Server=DESKTOP-KMPQU7D\\SQLEXPRESS;Database=ApiHeroes;MultipleActiveResultSets=true;Trusted_Connection=True;"
    }

}
````

## Configurando o Startup.cs

Adicionar a dependência do SQL Server, executando o seguinte comando no terminal:<br>
````jsx
dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 3.1.10
````

No arquivo Startup.cs no método ConfigureServices adicione a seguinte linha:

````jsx
services.AddDbContext<ApiDbContext> (options => options.UseSqlServer (Configuration.GetConnectionString ("DefaultConnection")));

````

O método completo ficará da seguinte forma:

````jsx
 public void ConfigureServices (IServiceCollection services) {
      services.AddDbContext<ApiDbContext> (options => options.UseSqlServer (Configuration.GetConnectionString ("DefaultConnection")));
      services.AddControllers ();
  }


````

Agora iremos adicionar a dependência para gerar as migrations que servira como base para a criação do banco de dados, digite o seguinte comando no terminal:
````jsx
dotnet add package Microsoft.EntityFrameworkCore.Design --version 3.1.10
````

Em seguida gere as migrations usando o seguinte comando no terminal:
````jsx
dotnet ef migrations add Initial
````

E para gerar o banco de dados usando nossas migrations execute o seguinte comando no terminal:
````jsx
dotnet ef database update
````

## Criando a Controller de forma automática usando o Scaffold

Primeiramente vamos adicione a dependência CodeGeneration que é utilizada no Scaffold, execute a seguinte linha de comando no terminal:
````jsx
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design --version 3.1.4
````

Com a dependência adicionada vamos criar nossa Controller de forma automática com o Scaffold através do CodeGeneration executando o seguinte comando no terminal:
````jsx
dotnet aspnet-codegenerator controller -name HeroesController -m Hero -dc ApiContext -api --relativeFolderPath Controllers
````

Com esse comando, será criado forma automática a controller com todos os métodos base de uma API no padrão Microsoft (GET/POST/PUT/DELETE)

Pronto, finalizamos. Agora vamos rodar nosso projeto utilizando ````dotnet run ```` para ver se tudo saiu conforme o planejado.


#### Referências

<a href="https://dotnet.microsoft.com/apps/aspnet/apis">ASP.NET Web APIs</a>

<a href="https://docs.microsoft.com/pt-br/aspnet/core/fundamentals/tools/dotnet-aspnet-codegenerator?view=aspnetcore-5.0">dotnet aspnet-codegenerator</a>

<a href="https://code.visualstudio.com/docs/editor/command-line">Command Line Interface (CLI)</a>

<a href="https://docs.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations?view=net-5.0">System.ComponentModel.DataAnnotations Namespace</a>

<a href="https://docs.microsoft.com/pt-br/aspnet/core/data/ef-mvc/intro?view=aspnetcore-5.0">Tutorial: introdução ao EF Core em um aplicativo Web ASP.NET MVC</a>