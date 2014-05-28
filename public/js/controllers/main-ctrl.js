app.controller('mainCtrl', function ($scope, $rootScope, $location, $routeParams, RPCserver, github) {
    $scope.logIn = github.logIn;
    $scope.setPath = $location.path;
    $scope.$on('$routeChangeSuccess', function() {
        $scope.view = $location.path().split('/')[1];
    });

});