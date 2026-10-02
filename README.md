# Full Cycle Challenge - Nginx + Node + MySQL

Projeto Docker Compose com Nginx como proxy reverso, uma aplicação Node.js e banco MySQL.

## Estrutura

- `docker-compose.yml` - orquestra os containers
- `node/index.js` - aplicação Node.js
- `node/Dockerfile` - imagem da aplicação
- `node/package.json` - dependências do Node
- `nginx/nginx.conf` - configuração do Nginx

## Como executar

No diretório raiz do projeto, execute:

```bash
docker compose up --build
```

ou em modo detached:

```bash
docker compose up --build -d
```

## Acesso

Após os containers subirem, acesse:

```text
http://localhost:8080
```

A página deve exibir:

```html
<h1>Full Cycle Rocks!</h1>
```

E uma lista de nomes cadastrados no banco `nodedb`.

## Banco de dados

O MySQL fica no serviço `db`, com:

- banco: `nodedb`
- usuário: `root`
- senha: `root`
- porta exposta na máquina: `3307`

## Observações

- O Node espera o MySQL ficar disponível antes de iniciar, usando `dockerize`.
- O Nginx encaminha requisições para `http://node_app:3000`.
- O volume `mysql_data` mantém os dados do banco entre reinicializações.

## Resetar tudo

```bash
docker compose down -v
```

Isso remove o banco e os dados persistidos.
