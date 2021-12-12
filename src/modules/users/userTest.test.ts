import request from 'supertest';
import server from '../../infra/server/server';

describe('User', () => {

    it('create user', (done) => {    

        request(server)
            .post('/createUser')
            .send({
                "name": "Kelton Melo de Oliveira Fonseca",
                "login": "notlekmelo",
                "password": "123",
                "nickname": "Kelton",
                "email": "keltonmof@gmail.com",
                "phoneNumber": "994701172",
                "job": "Programador"
            })
            .end((err, response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });

})