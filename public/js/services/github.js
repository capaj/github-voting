angular.module('Github', []).service('github', function github($rootScope, $q, $http, RPCserver) {
    var self = this;
    var baseUrl = 'https://api.github.com';
    var token;
	var tokenKey = 'github_token';
    var ready;
    var deferredCall;

	/**
	 * @param {String} clientID from your github app(can be found in settings)
	 */
    this.logIn = function (clientID) {  //has to be called first
		location.href = 'https://github.com/login/oauth/authorize?client_id=' + clientID + '&redirect_uri='
			+ location.origin + '/login/success';
    };

	/**
	 * @param {String} token
	 */
	this.authorizeWithToken = function (token) {
		self.authDeferred.resolve(token);
	};

    this.init = function () {
        self.authDeferred = $q.defer();
        ready = self.authDeferred.promise.then(function (t) {
            if (t) {
                $rootScope.authorized = true;
                localStorage[tokenKey] = t;
                $rootScope.currUser = self.getAuthenticatedUser();
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
        self.init();
    };

    this.getAccessToken = function (code) {
        RPCserver.loadChannel('GithubAuth').then(function (authChannel) {
            authChannel.getAccessToken(code).then(function (token) {
                self.authDeferred.resolve(token);
            });
        });
        return self.authDeferred.promise;
    };

    var getFromApi = function (path) {
        var pr;
        if (token) {
            pr = $http.get(baseUrl + path + '?access_token=' + token);
        } else {
            pr = $http.get(baseUrl + path);
        }
        return pr.then(function (res) {
                if (res.status !== 200) {
                    console.warn('Github api responded with http code ' + res.status);
                }
                return res;
            },
            function (res) {
                if (res.status == 401 || res.status == 403) {
                    delete localStorage[tokenKey];
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