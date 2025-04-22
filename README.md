# Finance Pal

Deploy do app [Aqui](https://lmansoldo.github.io/finance-pal):

# Instruções para Configuração e Execução do Projeto

## 1. Clonar o repositório
```bash
git clone https://github.com/LMansoldo/finance-pal.git
cd finance-pal
```

## 2. Instalar as dependências
```bash
npm install
```

## 3. Criar arquivo `.env` a partir do `.env.example`
Copie o arquivo `.env.example` para `.env` e ajuste as variáveis de ambiente conforme necessário:
```bash
cp .env.example .env
```
Depois, edite o arquivo `.env` para inserir suas chaves e configurações específicas.

## 4. Rodar o build do projeto
```bash
npm run build
```

## 5. Rodar o servidor de preview
```bash
npm run preview
```

Após o comando de preview, acesse a aplicação pelo endereço exibido no terminal, geralmente `http://localhost:4173/finance-pal`.

---

**Observação:**  
Certifique-se de que todas as variáveis de ambiente necessárias estejam corretamente configuradas no arquivo `.env`.

**Sobre o projeto**

O projeto Finance Pal é uma SPA de auxílio financeiro desenvolvida com React e Typescript. O Intuito dela é mostrar aos usuários dados sobre cambio, acoes e criptomoedas, e também permitir que eles recebam essas informações via Whatsapp de acordo com sua escolha, assim como links dos serviços mais benéficos para realizar compra e venda. Claro, esta feature virá em uma versão futura como uma espécie de Agente financeiro personalizado.

**Arquitetura**

A aplicação foi desenvolvida seguindo a arquitetura DDD (Domain-Driven Design) e a arquitetura de camadas. O intuito dessa organização é separar as responsabilidades de cada componente da aplicação, bem como facilitar a manutenção e evolução do projeto ao adicionarmos novas funcionalidades, endpoints e componentes visuais. 

Na construção dos componentes, utilizei o conceito de pure components e compound components visando a reutilização de acordo com o contexto sem causar rerenderizamento desnecessário.

Para a estilização adotei TailwindCSS, que é uma biblioteca de estilos que permite a criação de estilos personalizados de forma rápida e eficiente. Adotei-o para ganhar tração no projeto e também para facilitar a estilização dos componentes sem precisar me preocupar com quebra de estilos. 

Sobre a autenticação, os dados persistem no localStorage do navegador, mas cabe a refatoração para um auth guard real em uma versão futura, com uma API de autenticação.

E sobre API Services, adotei uma forma de cache de dados durante a navegação para que os dados não sejam atualizados constantemente, e também para evitar chamadas desnecessárias à API. Há outras formas de implementar esse cache, porém como não tenho controle sobre a API, optei por essa solução.


**Facilidades e Desafios**

Com a adoção da arquitetura DDD a aplicação se tornou mais organizada e escalável. A separação de responsabilidades entre os módulos e as camadas facilitou a manutenção e a evolução do projeto. Como facilidades, destaco:

- **Elaboração dos componentes compartilhados:** Não havia componentes complexos a serem compartilhados entre os módulos.

 - **Elaboração dos componentes de tabela:** Adotei o compound pattern para a criação de componentes de tabela e pure components para os específicos do módulo financeiro.

- **Elaboração dos componentes de layout:** Adotei cores primária e secundária para o projeto, isso facilitou a estilização e consistência visual.

- **Estruturação do projeto:** Implementar a arquitetura por módulos facilitou a manutenção e a evolução do projeto, como haviam apenas dois módulos, a separação foi mais simples.

Como desafios, destaco:

- **Elaboração dos componentes de gráficos:** Implementar Charts.js sem uma endpoint de retorno de mais dados sobre Moedas, Ações e Criptomoedas foi um desafio, precisei criar uma estrutura de persistencia para armazenar os dados de histórico financeiro.

- **Persistencia dos dados de histórico financeiro:** Como não havia uma endpoint externa para obter os dados de histórico financeiro foi necessário persistir os dados em localStorage e criar um histórico.

