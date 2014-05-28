app.controller('issuesCtrl', function ($scope, $rootScope, github, $location) {
    $scope.search = $location.search();

    $scope.load = function () {
        github.listIssues($scope.search).then(function (res) {
            if (res.data instanceof Array) {
                $scope.issues = res.data;
            } else {
                $scope.issues = [res.data];
            }
            $location.search($scope.search);

        });
    };

    if ($scope.search.owner && $scope.search.repo) {
        $scope.load();
    }
});