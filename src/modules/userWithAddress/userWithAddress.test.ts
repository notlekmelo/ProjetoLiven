import request from 'supertest';
import server from '../../infra/server/server';

var token : string;

describe('User with address', () => {

    it('create user', (done) => {
        request(server)
            .post('/createUser')
            .send({
                "User": {
                    "name": "TesteGetAllInfo",
                    "login": "testeGet",
                    "password": "teste",
                    "nickname": "Kelton"
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
            .post('/login')
            .send({
                "User":{
                    "login" : "testeGet",
                    "password" : "teste"
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
                    "country" : "teste",
                    "state" : "testeInfo",
                    "city" : "teste",
                    "district": "teste",
                    "street" : "teste",
                    "number" : 15,
                    "zipCode" : "teste"
                }
            })
            .end((err, response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body.insertId).toBeDefined;
                done();
            }); 
    });

    it('Recupera todas as informações do usuário',(done) => {
        request(server)
            .get('/getAllInfo')
            .set('x-access-token', token)
            .end((err, response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body.data).toBeDefined;
                done();
            })
    });

    // Exclui o usuário para (método on cascade exclui tambem o endereço) para realização de novos testes no futuro
    it("Exclusão de usuário",(done) => {
        request(server)
            .post('/deleteUser')
            .set('x-access-token', token)
            .end((err, response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body.deleted).toBe(true);
                done();
            })
    });
});
