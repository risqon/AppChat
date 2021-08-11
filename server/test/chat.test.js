'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const Chat = require("../models/Chat");
const should = chai.should();
chai.use(chaiHTTP);

describe('chats', function () {
    Chat.collection.drop();

    beforeEach(function (done) {
        let chat = new Chat({
            id: Date.now(),
            name: 'Risqon',
            message: 'Hallo'
        });
        chat.save(function (err) {
            done();
        })
    })

    afterEach(function (done) {
        // chatdb.collection.drop()
        done()
    })

    it('Should list ALL chat on /api/chats GET', function (done) {
        chai.request(server)
            .get('/api/chats')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0].should.have.property('message');
                res.body[0].name.should.equal('Risqon');
                res.body[0].message.should.equal('Hallo');
                done();
            })
    })

    it('should add a SINGLE chat on /api/chats POST', function (done) {
        const id = Date.now();
        chai.request(server)
            .post('/api/chats')
            .send({ id: id, 'name': 'Superman', 'message': 'Hayyyy' })
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('message');
                res.body.should.have.property('id');
                res.body.name.should.equal('Superman');
                res.body.message.should.equal('Hayyyy');
                done();
            })
    });

    it('should update a SINGLE chat on /api/chats/<id> PUT', function (done) {
        chai.request(server)
            .get('/api/chats')
            .end(function (err, res) {
                chai.request(server)
                    .put(`/api/chats/${res.body[0].id}`)
                    .send({ id: res.body[0].id, 'name': 'Risqon al akhyar', message: 'Holla' })
                    .end(function (err, response) {
                        response.should.have.status(201);
                        response.should.be.json;
                        response.body.should.be.a('object');
                        response.body.should.have.property('name');
                        response.body.should.have.property('message');
                        response.body.name.should.equal('Risqon al akhyar');
                        response.body.message.should.equal('Holla');
                        done();
                    })
            })
    })

    it('should delete a SINGLE chat on /api/chats/<id> DELETE', function(done){
        chai.request(server)
        .get('/api/chats')
        .end(function(err, res){
          chai.request(server)
          .delete(`/api/chats/${res.body[0].id}`)
          .end(function(err, response){
            response.should.have.status(200)
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('name');
            response.body.should.have.property('message');
            response.body.name.should.equal('Risqon al akhyar');
            response.body.message.should.equal('Holla');
            done();
          })
        })
      })
})
