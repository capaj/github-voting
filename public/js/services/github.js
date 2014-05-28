angular.module('Github', [])
    .service('github', function github($rootScope, $q, $http, RPCserver) {
        var that = this;
        var base = 'https://api.github.com';
        var token;
        var ready;
        var deferredCall;

        this.logIn = function (token) {  //has to be called first
            if (token) { // when it is cached in localStorage
                that.authDeferred.resolve(token);
                that.getAuthenticatedUser().then(function (res) {
                    $rootScope.currUser = res.data;

                });
            } else {
                location.href = 'https://github.com/login/oauth/authorize?client_id=230472f58dc8a46c170c&redirect_uri=http://voteapull.tk/login/success';
            }

        };
        this.init = function () {
            that.authDeferred = $q.defer();
            ready = that.authDeferred.promise.then(function (t) {
                if (t) {
                    $rootScope.authorized = true;
                    localStorage['token'] = t;
                    $rootScope.currUser = that.getAuthenticatedUser();
                    token = t;

                }
            });

            deferredCall = function (fn) {
                return function (params) {
                    var def = $q.defer();
                    ready.then(function () {
                        def.resolve(fn(params));
                    });
                    return def.promise;
                }
            };
        };
        this.init();
        this.logOut = function () {
            that.init();
        };

        this.getAccessToken = function (code) {
            RPCserver.loadChannel('GithubAuth').then(function (authChannel) {
                authChannel.getAccessToken(code).then(function (token) {
                    that.authDeferred.resolve(token);
                });
            });
            return that.authDeferred.promise;
        };

        var getFromApi = function (path) {
            var pr;
            if (token) {
                pr = $http.get(base + path + '?access_token=' + token);
            } else {
                pr = $http.get(base + path);
            }
            return pr.then(function (res) {
                    if (res.status !== 200) {
                        console.warn('Github api responded with http code ' + res.status);
                    }
                    return res;
                },
                function (res) {
                    if (res.status == 401 || res.status == 403) {
                        delete localStorage['token'];
                    }
                    console.error("Github api call ended in error.");
                });
        };
        this.getAuthenticatedUser = deferredCall(function () {
            return getFromApi('/user');
        });
        this.getUser = deferredCall(function (name) {
            return getFromApi('/users/' + name);
        });
        this.listPulls = function (param) {
            var p = angular.copy(param);
            if (p.number) {
                p.number = '/' + p.number;
            } else {
                p.number = '';
            }
            if (p.owner && p.repo) {
                return getFromApi('/repos/' + p.owner + '/' + p.repo + '/pulls' + p.number).then(
                    function (res) {
                        var lastPL = res.headers('link').split(';')[1];
                        res.page_count = Number(S(lastPL).between('/pulls?page=', '>').s);
                        return res.data;
                    }
                );

            }
        };
        this.listIssues = function (param) {
            var p = angular.copy(param);
            if (p.number) {
                p.number = '/' + p.number;
            } else {
                p.number = '';
            }
            if (p.owner && p.repo) {
                return getFromApi('/repos/' + p.owner + '/' + p.repo + '/issues' + p.number);
            }
        };


    });