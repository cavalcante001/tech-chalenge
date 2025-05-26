# Desafio SOAT Tech

## Como Executar o Projeto

### Pré-requisitos
- Docker
- Docker Compose

### Passos para Execução

1. Copie o arquivo de ambiente de exemplo:
```bash
cp .env.example .env
```

2. Para iniciar os containers, use o comando:
```bash
make init
```

3. Para executar a aplicação, use o comando:
```bash
make run
```

4. Acesse a aplicação em:
```
http://localhost:3000
```

5. Acesse a documentação Swagger em:
```
http://localhost:3000/docs
```

6. Caso queira criar uma migração, use o comando:
```
make migrate-create -- name=nomeDaSuaMigracao
```

7. Caso queira limpar os containers, use o comando:
```bash
make clean
```

## Arquitetura Hexagonal (Ports and Adapters)

Este projeto implementa a Arquitetura Hexagonal, também conhecida como Ports and Adapters, que é um padrão arquitetural que visa criar aplicações mais flexíveis, testáveis e independentes de frameworks externos. A arquitetura é dividida em três camadas principais:

### 1. Domínio (Núcleo da Aplicação)
- Contém as regras de negócio e entidades principais
- É a camada mais interna e independente
- Não possui dependências externas
- Exemplos:
  - Entidades (Category, Payment, etc.)
  - Value Objects
  - Regras de negócio

### 2. Aplicação (Casos de Uso)
- Orquestra o fluxo entre o domínio e o mundo exterior
- Implementa os casos de uso da aplicação
- Define as portas (interfaces) para comunicação com o mundo exterior
- Exemplos:
  - Portas (interfaces) para repositórios e serviços externos
  - Command/Query Handlers
  - Serviços específicos do módulo

### 3. Infraestrutura (Adaptadores)
- Implementa as interfaces definidas nas camadas internas
- Gerencia a comunicação com o mundo exterior
- Exemplos:
  - Adaptadores de Banco de Dados
  - Adaptadores de APIs Externas
  - Frameworks e Bibliotecas

### 4. Apresentação (Presenters)
- Responsável pela transformação e apresentação dos dados
- Implementa a interface entre a aplicação e o mundo exterior
- Exemplos:
  - Controllers HTTP (REST, GraphQL)
  - Transformadores de DTOs
  - Serializadores de Resposta
  - Validação de Entrada
  - Tratamento de Erros HTTP

### Portas e Adaptadores

#### Portas Primárias (Driving/Input)
- Interfaces que o mundo exterior usa para se comunicar com a aplicação
- Exemplo: Controllers HTTP, CLI Commands

#### Portas Secundárias (Driven/Output)
- Interfaces que a aplicação usa para se comunicar com o mundo exterior
- Exemplo: Repositories, External Services

#### Adaptadores Primários
- Implementam as portas primárias
- Exemplo: REST Controllers, GraphQL Resolvers

#### Adaptadores Secundários
- Implementam as portas secundárias
- Exemplo: Database Repositories, External API Clients

### Benefícios da Arquitetura Hexagonal

1. **Independência de Frameworks**
   - O domínio não depende de frameworks externos
   - Fácil trocar tecnologias sem afetar a lógica de negócio

2. **Testabilidade**
   - Domínio pode ser testado isoladamente
   - Adaptadores podem ser mockados facilmente
   - Testes de integração mais focados

3. **Manutenibilidade**
   - Separação clara de responsabilidades
   - Mudanças em uma camada não afetam as outras
   - Código mais organizado e previsível

4. **Flexibilidade**
   - Fácil adicionar novos adaptadores
   - Possibilidade de múltiplas interfaces (REST, GraphQL, CLI)
   - Troca de implementações sem afetar o domínio

### Fluxo de Dados na Arquitetura

1. **Entrada de Dados**
   - Request HTTP → Presenter (Controller)
   - Presenter valida e transforma os dados
   - Presenter chama o caso de uso apropriado

2. **Processamento**
   - Caso de uso orquestra a lógica de negócio
   - Utiliza portas para comunicação com o domínio
   - Domínio executa regras de negócio

3. **Saída de Dados**
   - Domínio retorna resultado
   - Presenter transforma o resultado em DTO
   - Resposta HTTP formatada e enviada

### Exemplo de Implementação

```
src/
├── common/             # Código compartilhado entre módulos
├── categories/         # Módulo de Categorias
│   ├── domain/        # Camada de domínio
│   │   └── entities/  # Entidades de domínio
│   ├── application/   # Camada de aplicação
│   │   ├── ports/     # Portas (interfaces)
│   │   ├── queries/   # Query handlers (CQRS)
│   │   └── categories.service.ts
│   ├── infrastructure/# Camada de infraestrutura
│   │   └── persistence/# Adaptadores de banco
│   └── presenters/    # Camada de apresentação
│       └── http/      # Controllers HTTP
├── customers/         # Módulo de Clientes
├── orders/           # Módulo de Pedidos
├── products/         # Módulo de Produtos
├── webhook/          # Módulo de Webhooks
├── health/           # Módulo de Health Check
├── app.module.ts     # Módulo principal
├── app.controller.ts # Controller principal
└── main.ts          # Ponto de entrada da aplicação
```

### Estrutura dos Módulos

Cada módulo (categories, customers, orders, products, webhook) segue a arquitetura hexagonal:

1. **Domain**
   - Contém as entidades e regras de negócio
   - Independente de frameworks externos
   - Não define interfaces externas

2. **Application**
   - Implementa os casos de uso
   - Define as portas (interfaces) para comunicação externa
   - Implementa o padrão CQRS com queries
   - Serviços específicos do módulo

3. **Infrastructure**
   - Implementa os adaptadores de persistência
   - Gerencia a comunicação com o banco de dados

4. **Presenters**
   - Contém os controllers HTTP
   - Gerencia a apresentação dos dados
   - Implementa os endpoints REST

### Padrão CQRS (Command Query Responsibility Segregation)

O projeto implementa o padrão CQRS, que separa as operações de leitura (queries) e escrita (commands) em diferentes modelos:

1. **Commands (Comandos)**
   - Responsáveis por operações de escrita
   - Modificam o estado da aplicação
   - Exemplo: Criar categoria, Atualizar pagamento
   - Localização: `application/commands/`

2. **Queries (Consultas)**
   - Responsáveis por operações de leitura
   - Não modificam o estado
   - Exemplo: Buscar categorias, Consultar pagamento
   - Localização: `application/queries/`

3. **Benefícios do CQRS**
   - Separação clara entre leitura e escrita
   - Otimização independente para cada tipo de operação
   - Melhor escalabilidade
   - Código mais organizado e manutenível

## Integração com Mercado Pago

### Credenciais de Teste

Para testar as integrações com o Mercado Pago, utilize as seguintes credenciais:

```
Usuário de Teste: TESTUSER501385545
Senha: vZuULBwsJJ
```

### Observações sobre o Ambiente de Teste

- As credenciais acima são exclusivas para o ambiente de sandbox
- Transações realizadas não geram cobranças reais
- Cartões de teste disponíveis no ambiente de sandbox do Mercado Pago
- Recomendado para desenvolvimento e testes
