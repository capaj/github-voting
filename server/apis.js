var mongoose = require('mongoose');
var secrets = require('../secrets.json');


mongoose.connect(secrets.mongoConnP, {
    user: 'gVoting',
    pass: secrets.dbPswd
});


