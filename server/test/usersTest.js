import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import db from '../db/users';
import testData from '../helpers/testData'

const { expect } = chai;
chai.use(chaiHttp);

describe('test for user registration', () => {
  before('Clear data from database', (done) => {
    chai.request(server);
    db.execute('DELETE FROM users');
    done();
  });
  it('should return User created successfully', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signup')
      .set('accept', 'application/json')
      .send(testData.testData.newUser)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.message).to.be.equal('User created successfully');
        expect(res.body.data).to.have.property('token');
        done();
      });
  });
  it('should return error if an email is already exist', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signup')
      .set('accept', 'application/json')
      .send(testData.testData.newUser)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(409);
        expect(res.body.error).to.be.equal(`E-mail ${testData.testData.newUser.email} is alrady exist`);
        done();
      });
  });
    it('should return token after login', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signin')
      .set('accept', 'application/json')
      .send(testData.testData.newUser)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.data).to.have.property('token');
        done();
      });
  });
  it('should return error if Email and password did not match', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signin')
      .set('accept', 'application/json')
      .send(testData.testData.unmatchedData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.equal('E-mail and password do not match');
        done();
      });
  });
  it('should return error if user is not exit', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signin')
      .set('accept', 'application/json')
      .send(testData.testData.unexistData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.error).to.be.equal(`${testData.testData.unexistData.email} does not exist in our database`);
        done();
      });
  });
});
describe('test for entries creation', () => {
    it('should return entries created successfully', (done) => {
      chai
        .request(server)
        .post('/api/v2/auth/entries')
        .set('accept', 'application/json')
        .set('x-access-token', testData.token)
        .send(testData.testData.newEntry)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(201);
          expect(res.body.message).to.be.equal('enties created successful');
          expect(res.body.data).to.be.an('Array');
          done();
        });
    });
    it('should return error if id of entry doesnot exist', (done) => {
        chai
          .request(server)
          .patch('/api/v2/auth/entries/0')
          .set('accept', 'application/json')
          .set('x-access-token', testData.token)
          .send(testData.testData.newEntry)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.equal(404);
            expect(res.body.error).to.be.equal('id you are trying to find is not found');
            done();
          });
      });
      it('should return error if id of entry doesnot exist', (done) => {
        chai
          .request(server)
          .delete('/api/v2/auth/entries/0')
          .set('accept', 'application/json')
          .set('x-access-token', testData.token)
          .send(testData.testData.newEntry)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.equal(404);
            expect(res.body.error).to.be.equal('entry not found');
            done();
          });
      });
  });