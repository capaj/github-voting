app.controller('mainCtrl', function ($scope, $rootScope, $location, $routeParams, RPCserver, github) {
    $scope.logIn = function () {
        github.logIn('230472f58dc8a46c170c');
    };
    $scope.setPath = $location.path;
    github.getAuthenticatedUser().then(function (res) {
        $scope.currUser = res.data;

    });
    $scope.$on('$routeChangeSuccess', function() {
        $scope.view = $location.path().split('/')[1];
    });

});