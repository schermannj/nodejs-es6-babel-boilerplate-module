import chai from 'chai';
import chaiHttp from 'chai-http';
import {User} from '../main/models/user.model';
import {UserToken} from '../main/models/user-token.model';
import server from '../main/app';

const assert = chai.assert;

chai.use(chaiHttp);

describe('User', () => {
    beforeEach(beforeEachFunction);

    describe('User POST /api/login', () => {

        it('it should return authToken', itShouldReturnAuthToken);
        it('it should fail when password is wrong', itShouldFailWhenPasswordIsWrong);
        it('it should fail when username is wrong', itShouldFailWhenUsernameIsWrong);

    });
});

function beforeEachFunction(done) {
    Promise
        .all([
            User.remove({}),
            UserToken.remove({})
        ])
        .then(() => {
            return new User({username: 'test', password: 'test'}).save()
        })
        .then(() => {
            done();
        });
}

function itShouldReturnAuthToken(done) {
    chai.request(server)
        .post('/api/login')
        .send({username: 'test', password: 'test'})
        .then((res) => {
            assert.equal(res.status, 200);
            assert.isOk(res.body.authToken, 'Token doesn\'t exist');
            done();
        });
}

function itShouldFailWhenPasswordIsWrong() {
    chai.request(server)
        .post('/api/login')
        .send({username: 'test', password: 'wrongpassword'})
        .catch((res) => {
            assert.equal(res.status, 403);
        });
}

function itShouldFailWhenUsernameIsWrong() {
    chai.request(server)
        .post('/api/login')
        .send({username: 'wrongusername', password: 'test'})
        .catch((res) => {
            assert.equal(res.status, 403);
        });
}