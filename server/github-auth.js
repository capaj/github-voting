var qs = require('querystring');
var request = require('request');
var secrets = require('../secrets.json');
var rpc = require('socket.io-rpc');

var codeKeyPairs = {};
var cache = function (code, authKey) {
    console.log("authenticated a code: " + code + "and token:" + authKey);
    for(var index in codeKeyPairs){
        if(codeKeyPairs[index] == authKey){
            delete codeKeyPairs[index];
            break;
        }
    }
    codeKeyPairs[code] = authKey;

};

rpc.expose('GithubAuth', {
    getAccessToken: function (code) {
        if (codeKeyPairs[code]) {
            //TODO find a user or create new one
            return codeKeyPairs[code];
        } else {
            return null;
        }
    }
});

module.exports = {
    routeFn: function (req, res) {
        if (req.query.code) {
            var postData = {
                form: {
                    client_id: secrets.github.clientId,
                    client_secret: secrets.github.secret,
                    code: req.query.code
                }
            };
            request.post(
                'https://github.com/login/oauth/access_token', postData, function (e, r, body) {
                    if (!e) {
                        var authRes = qs.parse(body);
                        authRes.access_token && cache(req.query.code, authRes.access_token);
                    } else {
                        console.error("Failed to fetch acces token for code");
                    }
                    res.sendfile('./public/index.html');
                }
            );
        } else {
            res.status(401);
            res.sendfile('./public/index.html');
        }
    },
    cache: cache
};