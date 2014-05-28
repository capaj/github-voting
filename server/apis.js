var mongoose = require('mongoose');
var when = require('when');
var secrets = require('../secrets.json');


mongoose.connect(secrets.mongoConnP, {
    user: 'gVoting',
    pass: secrets.dbPswd
});


