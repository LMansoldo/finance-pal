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

Após o comando de preview, acesse a aplicação pelo endereço exibido no terminal, geralmente `http://localhost:5173`.

---

**Observação:**  
Certifique-se de que todas as variáveis de ambiente necessárias estejam corretamente configuradas no arquivo `.env`.
