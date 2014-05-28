var MR = require('../moonridge');
var votableEntity = require('./votable-entity.js');

var voteModel = MR('vote', {
    on: { type: mongoose.Schema.Types.ObjectId, ref: 'VotableEntity', required: true},
    positive: { type: Boolean, required: true },
    caster: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    created_at: { type: Date, default: Date.now }
});

var subscriptions = {
    onSave: function (doc) {
        var incObj = {};
        if (doc.isNew) {
            if (doc.positive) {
                incObj.upvotes = 1;
            } else {
                incObj.downvotes = 1;
            }
        } else {
            if (doc.positive) { // only case of updating a vote is when user changes it from positive to negative or the other way around
                incObj.upvotes = 1;
                incObj.downvotes = -1;
            } else {
                incObj.downvotes = 1;
                incObj.upvotes = -1;
            }
        }
        votableEntity.findByIdAndUpdate(doc.on, {$inc: incObj}, function (obj) {
            //TODO send updated votable to connected clients
        });
    },
    onRemove: function (doc) {
        var incObj = {};
        if (doc.positive) {
            incObj.upvotes = -1;
        } else {
            incObj.downvotes = -1;

        }
        votableEntity.findByIdAndUpdate(doc.on, {$inc: incObj}, function (obj) {
            //TODO send updated votable to connected clients
        });
    }
};
voteModel.subscribe(subscriptions);

module.exports = voteModel;