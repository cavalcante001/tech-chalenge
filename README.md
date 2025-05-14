# Desafio SOAT Tech

## Como Executar o Projeto

### Pré-requisitos
- Docker
- Docker Compose

### Passos para Execução

1. Para iniciar os containers, use o comando:
```bash
make init
```

2. Para executar a aplicação, use o comando:
```bash
make run
```

3. Acesse a aplicação em:
```
http://localhost:3000
```

4. Acesse a documentação Swagger em:
```
http://localhost:3000/docs
```

5. Caso queira criar uma migração, use o comando:
```
make migrate-create -- name=nomeDaSuaMigracao
```

6. Caso queira limpar os containers, use o comando:
```bash
make clean
```

## Arquitetura do Projeto

Este projeto segue o padrão de Arquitetura Hexagonal (também conhecida como Portas e Adaptadores), que promove a separação de responsabilidades e a manutenibilidade. Veja como a arquitetura está implementada:

### Estrutura de Diretórios

```
src/
├── categories/
│   ├── application/         # Camada de aplicação (casos de uso)
│   │   ├── ports/           # Portas (interfaces)
│   │   ├── queries/         # Handlers de consultas
│   │   └── categories.service.ts
│   ├── domain/              # Camada de domínio (lógica de negócio)
│   │   ├── category.ts      # Entidades de domínio
│   │   └── read-models/     # Modelos de leitura para apresentação
│   ├── infrastructure/      # Camada de infraestrutura (adaptadores)
│   │   └── persistence/     # Adaptadores de banco de dados
│   └── presenters/          # Camada de apresentação
│       └── http/            # Controladores HTTP
```

### Componentes Principais

1. **Camada de Domínio** (`domain/`)
   - Contém a lógica de negócio central e entidades
   - Independente de frameworks e bibliotecas externas
   - Exemplo: entidade `Category`

2. **Camada de Aplicação** (`application/`)
   - Implementa casos de uso e regras de negócio
   - Define portas (interfaces) para comunicação externa
   - Exemplo: `CategoriesService` e porta `FindCategoriesRepository`

3. **Camada de Infraestrutura** (`infrastructure/`)
   - Implementa adaptadores para serviços externos
   - Gerencia persistência, APIs externas, etc.
   - Exemplo: `OrmFindCategoriesRepository` implementando a porta do repositório

4. **Camada de Apresentação** (`presenters/`)
   - Gerencia aspectos da interface do usuário
   - Exemplo: `CategoriesController` para endpoints HTTP

### Benefícios

- **Separação de Responsabilidades**: Cada camada tem uma responsabilidade específica
- **Testabilidade**: A lógica de negócio pode ser testada independentemente
- **Manutenibilidade**: Mudanças em uma camada não afetam as outras
- **Flexibilidade**: Fácil trocar implementações (ex: banco de dados, UI)

### Fluxo de Exemplo

1. Requisição HTTP → `CategoriesController`
2. Controller chama `CategoriesService`
3. Service usa `QueryBus` para executar consultas
4. Query Handler usa a porta `FindCategoriesRepository`
5. Implementação do repositório (`OrmFindCategoriesRepository`) gerencia operações do banco de dados
6. Resultados fluem de volta através das camadas
