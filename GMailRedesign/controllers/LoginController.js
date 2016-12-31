angular.module('swailMail').controller('newLoginController', ['$scope', 'googleApi', 'cookie','$location', function ($scope, $googleApi, $cookie, $location) {
    startProcess = autoLogin;

    $scope.isProcessing = true;
    $scope.state = 'Checking Authentication';

    function setState(status, message) {
        $scope.isProcessing = status;
        $scope.state = message;
    }

    function autoLogin() {
        setState(true, 'Checking Authentication');
        $googleApi.requestAuth(true).then(function (result) {
            setState(result.status, result.message);
            if(result.status)
            emailProcessing($cookie.getData('authObject').access_token);
        });

    }

    $scope.login = function () {
        setState(true, 'Checking Authentication');
        $googleApi.requestAuth(false).then(function (result) {
            setState(result.status, result.message);
            if(result.status)
            emailProcessing($cookie.getData('authObject').access_token);

        });

    };

    function emailProcessing(access_token) {
        $googleApi.setProfileDetails(access_token).then(function (result) {
            setState(result.status, result.message);
            $googleApi.fetchLabels(access_token);
        });
    }
}]);