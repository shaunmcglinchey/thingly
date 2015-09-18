// Load the packages required for testing
var should = require('chai').should();
var expect = require('chai').expect();
var supertest = require('supertest');
var api = supertest('http://localhost:4000');

describe('Thing', function() {

    it('should return a 200 response', function(done) {
        api.get('/api/things')
        .set('Accept','application/json')
        .expect(200,done);
    });

});