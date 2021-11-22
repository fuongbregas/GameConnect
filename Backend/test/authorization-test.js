let User = require('../models/Users/UserSchema')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server');

let expect = require("chai").expect;
let should = require("chai").should;
chai.use(chaiHttp)


process.env.NODE_ENV = 'test'; 
console.log()
  
 describe('User', () => {
    it('it should register a test user', (done) => {
        let register_user = {
            username: "testuser",
            email: "tester@gmail.com",
            password: "test"
        }
      chai.request(server)
          .post('/backend/auth/register')
          .send(register_user)
          .set("Accept", "application/json")
          .end((err, res) =>{  
            expect(res).to.have.status(200);
            done()
          })
        
    });

  it('test user should be able to login', (done) => {
      let user = {
          username: "testuser",
          email: "tester@gmail.com",
          password: "test"
      }
    chai.request(server)
        .post('/backend/auth/login')
        .send(user) 
        .end((err, res) =>{  
          expect(res).to.have.status(200);
          done()
        })
      
  });
  after((done) => { //empty userData database when done with test
   User.remove({}, (err) => {
       done();
    });
  })
});
