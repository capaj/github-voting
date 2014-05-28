app.controller('logInCtrl', function ($scope, $location, $rootScope, github) {
    $scope.code = $location.search().code;
    if ($scope.code) {
        github.getAccessToken($scope.code);
        github.getAuthenticatedUser().then(function (res) {
            $rootScope.currUser = res.data;
            $location.path('/profile');

        });

    }
});

app.controller('profileCtrl', function ($scope, $rootScope, github, $location) {
    angular.extend($scope, $rootScope.currUser);
    $scope.logOut = function () {
        $rootScope.currUser = null;
        github.logOut();
        $location.path('/');
    };
});