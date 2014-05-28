var express = require('express');
var pathChecker = require('./server/pathChecker.js');
var app = module.exports = express();
var fs = require('fs');
var pjson = require('./package.json');


app.configure(function(){
    app.set('port', process.env.PORT || pjson.port);
    app.use(express.favicon());
    app.use(require('connect').compress());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

//
//process.on('uncaughtException', function(err) {
//    console.log(err);
//});

var server = app.listen(app.get('port'), function () {
    require('./moonridge/index.js')(server, app);

    var githubAuth = require('./server/github-auth.js');

    app.get('/login/success', githubAuth.routeFn);
    app.get('/github-api.js', function (req, res) {
        res.sendfile('./node_modules/github-api/github.js');
    });

    app.get('*', function(req, res){
        var pathName = req._parsedUrl.pathname;
        var filePath = './public' + pathName;
        fs.exists(filePath, function (exists)
        {
            if(exists)
            {
                res.sendfile(filePath);
            } else {
                if(pathChecker(pathName)){
                    res.sendfile('./public/index.html');
                } else {
                    res.status(404);
                    res.sendfile('./public/index.html');
                }
            }

        });

    });
    console.info("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


//require('./server/github-api-calls.js');