var MR = require('../moonridge');
var base = {
    name: { type: String, required: true, unique: true},
    upvote_count: { type: Number, default: 0 },
    downvote_count: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now }
};

module.exports = {
    user: MR('User', base),
    repo: MR('Repo', base)
};