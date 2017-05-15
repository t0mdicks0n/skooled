var expect = require('chai').expect;
var services = require('../../services');


xdescribe('Hash functions', () => {

  it('createHashPassword', (done) => {
    services.createHashPassword('password')
    .then((hash) => {
      expect(hash.length).to.equal(60);
      done();
    })
    .catch(done);
  });

  it('checkHashPassword', (done) => {
    services.checkHashPassword('password', '$2a$10$jNfza3YH4cPsk39aCkwczesnkhtgX/g8q6fYY0u3HDzOmHFJ5/gcC')
      .then((match) => {
        expect(match).to.equal(true);
        done();
      })
      .catch(done);
  });

});