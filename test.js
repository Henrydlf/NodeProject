var index = require('./index');
var conn = require('./modules/bdd.js');

describe('Testing displaying', function() {
    it('Display', (done) => {
        index.get('/Display')
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('prenom');
                done();
            })
    })
});