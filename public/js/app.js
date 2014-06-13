
app = angular.module('githubVoting', appModuleDependencies)
    .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

        $locationProvider.html5Mode(true);

        routesModule.routes.forEach(function(routeDefinition){
            $routeProvider.when(routeDefinition.route, routeDefinition.resolve);
        });
        $routeProvider.otherwise({redirectTo:'/404'});
    }]).config(function () {

    }).run(
    function($rootScope, $location, github){
        $rootScope.setPath = function (path) {
            $location.path(path);
        };

        $rootScope.safeApply = function(fn) {   //this can get rid of digest phase errors, but use it as last resort, it is still a hack
            var phase = this.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        var cachedToken = localStorage['token'];  // for production
        if (cachedToken) {
            github.authorizeWithToken(cachedToken);
        }
    }
);

app.factory('RPCserver', function RPCbackend ($rpc) {
    $rpc.connect('http:'+serverURL);
    return $rpc;
});
