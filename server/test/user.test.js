// 'use strict'

// const chai = require('chai');
// const chaiHTTP = require('chai-http');

// const server = require('../app');
// const User = require('../models/User');
// const Chat = require("../models/User");

// const should = chai.should();
// chai.use(chaiHTTP);

// describe('chats', function () {
//     User.collection.drop();

//     beforeEach(function (done) {
//         let user = new User({
//             username: 'al',
//             password: '123'
//         })
//         user.save(function (err) {
//             done();
//         })
//     })

//     afterEach(function (done) {
//         done()
//     })

//     it('Should list ALL user on /api/users GET', function (done) {
//         chai.request(server)
//             .get('/api/users')
//             .end(function (err, res) {
//                 res.should.have.status(200);
//                 res.should.be.json;
//                 res.body.should.be.a('array');
//                 res.body[0].should.have.property('_id');
//                 res.body[0].should.have.property('username');
//                 res.body[0].should.have.property('password');
//                 res.body[0].username.should.equal('al');

//                 done();
//             })
//     })

//     it('Should add a SINGLE user on /api/users POST', function (done) {
//         chai.request(server)
//             .post('/api/users')
//             .send({ 'username': 'akhyar', 'password': '354' })
//             .end(function (err, res) {
//                 res.should.have.status(201);
//                 res.should.be.json;
//                 res.body.should.be.a('objeck');
//                 res.body.should.have.property('_id');
//                 res.body.should.have.proprerty('username');
//                 res.body.should.have.property('password');
//                 res.body.username.should.equal('akhyar');
//                 done();
//             })
//     })
// })