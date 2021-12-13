# ProjetoLiven

Este projeto foi desenvolvido em TypeScript com uso de um banco de dados MySql. Trata-se de um controle de usuários e endereços de relacionamento (1:N) com uso de Json Web Tokens e documentação no Swagger.
Para execução do projeto é necessário o uso do comando 
```
npm install
```
Seguido do comando 
```
npm run dev.
```
Tecnologias utilizadas: 
* TypeScript para desenvolvimento do código
* Visual Stude Code como editor de texto 
* Github para armazenamento do repositório
* XAMPP para utilização do banco de dados MySQL
* Testes Automatizados feitos com Jest
* Documentação feita com Swagger

Observação para Verificar os testes automatizados basta comentar as linhas referentes ao Swagger no arquivo routes.ts e rodar o comando 
```
npm test.
```