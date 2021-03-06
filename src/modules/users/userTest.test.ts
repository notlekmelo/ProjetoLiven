import request from 'supertest';
import server from '../../infra/server/server';

var token : string;

describe('User', () => {

    it('create user', (done) => {
        request(server)
            .post('/createUser')
            .send({
                "User": {
                    "name": "Kelton Melo de Oliveira Fonseca",
                    "login": "notlekmel1o",
                    "password": "123",
                    "nickname": "Kelton",
                    "email": "keltonmof@gmail.com",
                    "phoneNumber": "994701172",
                    "job": "Programador"
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
                    "login" : "notlekmel1o",
                    "password" : "123"
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

    it("Atualização de usuário",(done) => {
        request(server)
            .post('/updateUser')
            .set('x-access-token', token)
            .send({
                "User":{
                    "name": "Kelton Melo de Oliveira Fonseca",
                    "login": "string",
                    "password": "123",
                    "nickname": "Moço"
                }
            })
            .end((err, response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body.updated).toBe(true);
                done();
            })
    });

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
})