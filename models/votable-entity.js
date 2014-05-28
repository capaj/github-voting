var MR = require('../moonridge');

module.exports = MR( 'VotableEntity', {
    user: { type: String, required: true},
    repo: { type: String, required: true },
    number: { type: String, required: true },
    upvote_count: { type: Number, default: 0 },
    downvote_count: { type: Number, default: 0 },
    type: { type: String, required: true, enum: ['pull', 'issue'] }, //either a pull request or an issue
    created_at: { type: Date, default: Date.now }
});