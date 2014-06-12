app.controller('mainCtrl', function ($scope, $rootScope, $location, $routeParams, RPCserver, github) {
    $scope.logIn = github.logIn;
    $scope.setPath = $location.path;
    github.getAuthenticatedUser().then(function (res) {
        $scope.currUser = res.data;

    });
    $scope.$on('$routeChangeSuccess', function() {
        $scope.view = $location.path().split('/')[1];
    });

});