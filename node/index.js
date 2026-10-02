// Parte A: Importação e Conexão com o Banco
    // Explicação:
        // O banco de dados vai rodar em outro container
        // Entao o Node não pode procurar o banco no localhost
        // (porque o localhost do container Node é ele mesmo)
        // Os containers conversam pelo nome do serviço
        // Por isso, definimos o host padrão como 'db' 
        // Nome dele que sera usado no Docker Compose
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'nodedb'
});


// Parte B: Garantindo que a tabela existe
    // Explicação:  
        // Cria a tabela assim que o app inicia:
        // O desafio exige que não precisemos rodar scripts manuais para criar tabelas.
        // Portanto, quando o Node liga, a primeira coisa que ele faz é mandar um comando 
        // para o MySQL dizendo: 
        // "Ei, se a tabela people não existir, crie ela para mim agora".
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255)
    )
`;

connection.query(createTableQuery, (err) => {
    if (err) console.error('Erro ao criar tabela:', err);
    else console.log('Tabela "people" pronta!');
});

// Parte C: A Rota Principal e Regra de Negócio
    // Explicação:
        // Adicinado a rota que o Nginx vai chamar
            // Toda vez que alguém entra na página, o Node faz o fluxo completo: 
            // Salva um nome -> Busca todos do banco -> cospe o HTML estruturado com a lista atualizada para quem pediu.
const nomes = ['Wescley', 'Luiz', 'Ana', 'Carlos', 'Beatriz'];

app.get('/', (req, res) => {
    // Escolhe um nome aleatório da lista acima
    const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
    
    // 1. Insere o nome aleatório no banco
    connection.query('INSERT INTO people(name) VALUES(?)', [nomeAleatorio], (err) => {
        if (err) return res.status(500).send('Erro ao inserir: ' + err.message);

        // 2. Busca todos os nomes cadastrados até agora
        connection.query('SELECT name FROM people', (err, results) => {
            if (err) return res.status(500).send('Erro ao buscar: ' + err.message);

            // 3. Monta a resposta HTML exatamente como o desafio pede
            let html = '<h1>Full Cycle Rocks!</h1>\n<ul>\n';
            results.forEach(person => {
                html += `  <li>- ${person.name}</li>\n`;
            });
            html += '</ul>';

            res.send(html);
        });
    });
});

app.listen(port, () => console.log(`Node rodando na porta ${port}`));
