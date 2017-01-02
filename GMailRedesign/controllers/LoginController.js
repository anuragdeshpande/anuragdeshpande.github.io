angular.module('swailMail').controller('newLoginController', ['$scope', 'googleApi', 'storageService','$state', function ($scope, googleApi, storage, $state) {
    startProcess = autoLogin;

    $scope.isProcessing = true;
    $scope.state = 'Checking Authentication';

    function setState(status, message) {
        $scope.isProcessing = status;
        $scope.state = message;
    }

    function autoLogin() {
        setState(true, 'Checking Authentication');
        googleApi.requestAuth(true).then(function (result) {
            setState(result.status, result.message);
            if(result.status) {
                $state.go('/mail', {label: 'inbox'});
            }
        });
    }

    $scope.login = function () {
        setState(true, 'Checking Authentication');
        googleApi.requestAuth(false).then(function (result) {
            setState(result.status, result.message);
            if(result.status) {
                $state.go('/mail', {label:'inbox'});
            }
        });
    };
}]);