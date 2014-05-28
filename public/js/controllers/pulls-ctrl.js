app.controller('pullsCtrl', function ($scope, $rootScope, github, $location) {
    $scope.search = $location.search();

    $scope.load = function () {
        github.listPulls($scope.search).then(function (pulls) {
            if (pulls instanceof Array) {
                $scope.pulls = pulls
            } else {
                $scope.pulls = [pulls];
            }
            $location.search($scope.search);

        });
    };

    if ($scope.search.owner && $scope.search.repo) {
        $scope.load();
    }
});