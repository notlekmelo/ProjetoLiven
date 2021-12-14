import request from 'supertest';
import server from '../../infra/server/server';

var token : string;

describe('Address', () => {

    it('create user', (done) => {
        request(server)
            .post('/createUser')
            .send({
                "User": {
                    "name": "TesteEndereço",
                    "login": "address",
                    "password": "add",
                    "nickname": "Teste"
                }
            })
            .end((err, response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body.userId).toBeDefined;
                done();
            });
    });

    it('Login',(done) => {
        request(server)
            .get('/login')
            .send({
                "User":{
                    "login" : "address",
                    "password" : "add"
                }
            })
            .end((err, response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body.token).toBeDefined;
                if (response.body.token){
                    token = response.body.token;
                } 
                done();
            });
    });

    it('Criar um endereço vinculado a um usuário', (done) => {
        request(server)
            .post('/createAddress')
            .set('x-access-token', token)
            .send({
                "Address":{
                    "country" : "Brasil",
                    "state" : "Minas Gerais",
                    "city" : "Belo Horizonte",
                    "district": "São João Batista",
                    "street" : "Rua Oswaldo Rosa Teixeira",
                    "number" : 159,
                    "zipCode" : "31510-500",
                    "aditionalInformation" : "A"
                }
            })
            .end((err, response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body.insertId).toBeDefined;
                done();
            }); 
    });

    it("Exclusão de usuário",(done) => {
        request(server)
            .post('/deleteUser')
            .set('x-access-token', token)
            .send({
                "User":{
                }
            })
            .end((err, response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body.deleted).toBe(true);
                done();
            })
    });

});