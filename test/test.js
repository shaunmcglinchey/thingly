// Load the packages required for testing
var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http://localhost:4000');
var thingsUrl = '/api/things';
var thingUrl;

describe('Thing', function() {

    var test_thing  = { description: 'visit Africa', note: 'Go to the Serengeti' };
    var alternative_thing = { description: 'visit Asia', note: 'Trek in Vietnam' };
    var nonExistentId = '53fbf4615c3b9f41c381b6a3';
    var invalidId = '232';

    it('should check GET all things response contains an array', function(done) {
        api.get(thingsUrl)
            .expect(200)
            .end(function(err, res){
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should check POST object returns valid properties in the response', function(done) {
        api.post(thingsUrl)
            .set('Content-Type','application/x-www-form-urlencoded')
            .send(test_thing)
            .expect(200)
            .end(function(err, res) {
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.deep.property('data.description',test_thing.description);
                expect(res.body).to.have.deep.property('data.tags');
                expect(res.body).to.have.deep.property('data.note',test_thing.note);
                expect(res.body).to.have.deep.property('data._id');
                if(res.body.data._id){
                    test_thing._id = res.body.data._id;
                }
                done();
            });
    });

    it('should check GET single object returns valid code and response data', function(done) {
       thingUrl = thingsUrl + '/' + test_thing._id;
       api.get(thingUrl)
           .expect(200)
           .end(function(err, res) {
               expect(res.body).to.have.property('_id',test_thing._id);
               expect(res.body).to.have.property('description',test_thing.description);
               expect(res.body).to.have.property('note',test_thing.note);
               done();
           });
    });

    it('should check GET single object with invalid identifier returns status 400', function(done) {
        thingUrl = thingsUrl + '/' + invalidId;
        api.get(thingUrl)
            .expect(400,done);
    });

    it('should check GET single object with non-existent identifier returns status 404', function(done) {
        thingUrl = thingsUrl + '/' + nonExistentId;
        api.get(thingUrl)
            .expect(404,done);
    });

    it('should check UPDATE object works', function(done) {
       thingUrl = thingsUrl + '/' + test_thing._id;
       api.put(thingUrl)
           .set('Content-Type','application/x-www-form-urlencoded')
           .send({description: alternative_thing.description})
           .expect(200)
           .end(function(err, res) {
               expect(res.body).to.have.deep.property('description',alternative_thing.description);
               done();
           });
    });

    it('should check DELETE object works', function(done) {
       api.del(thingUrl)
           .expect(200)
           .end(function(err, res) {
               expect(res.body).to.have.property('message','Item removed from your todo list!');
               done();
           });
    });
});