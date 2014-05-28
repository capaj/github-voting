var GitHubApi = require("github");

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    timeout: 5000
});
//gettting a repo sample
github.repos.get({
    user: "capaj",
    repo: "backbone-calc"
}, function(err, res) {
    console.log(JSON.stringify(res));
});

//getting an issue sample
github.issues.getRepoIssue({
    user: "capaj",
    repo: "backbone-calc",
    number: 1,
    type: "sdsd"
}, function(err, res) {
    console.log(JSON.stringify(res));
});

//getting an issue sample
github.pullRequests.get({
    user: "capaj",
    repo: "socket.io-rpc",
    number: 3,
    type: "sdsd"
}, function(err, res) {
    console.log(JSON.stringify(res));
});


