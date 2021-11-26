let User = require('../models/Users/UserSchema')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server');

let expect = require("chai").expect;
let should = require("chai").should;
chai.use(chaiHttp)


describe("healthcheck ", () => {
    it("welcome to gameconnect", done => {
   chai
    .request(server)
   .get("/healthcheck").end((err, res) => {
    expect(res).to.have.status(200);
    done();
   });
    })
})   