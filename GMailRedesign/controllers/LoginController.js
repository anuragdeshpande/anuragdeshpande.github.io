angular.module('swailMail').controller('newLoginController', ['$scope', 'googleApi', 'storageService', '$state', 'helper', function ($scope, googleApi, storage, $state, helper) {
    startProcess = checkAuth;

    $scope.$on('$stateChangeSuccess', function () {
       setState(true, 'Verifying Token Validity');
    });

    function setState(status, message) {
        $scope.isProcessing = status;
        $scope.state = message;
    }

    function checkAuth() {
        setState(true, 'Verifying Login');
        console.log(JSON.parse(JSON.stringify('Default Method Fired')));
        helper.verify().then(function (response) {
            if (response && response.status) {
                autoLogin();
            } else {
                console.log(JSON.parse(JSON.stringify('No Valid Token Found')));
                setState(false, 'Login');
            }
        });
    }

    function autoLogin() {
        console.log(JSON.parse(JSON.stringify('Auto Login Begins')));
        setState(true, 'Checking Authentication');
        googleApi.requestAuth(true).then(function (result) {
            console.log(JSON.parse(JSON.stringify('AutoLogin Result')));
            console.log(JSON.parse(JSON.stringify(result)));
            setState(result.status, result.message);
            if (result.status) {
                console.log(JSON.parse(JSON.stringify('Auto Redirection')));
                $state.go('/mail', {label: 'inbox'});
            } else {
                console.log(JSON.parse(JSON.stringify('Auto login Failed')));
            }
        });
    }

    $scope.login = function () {
        setState(true, 'Checking Authentication!!!');
        googleApi.requestAuth(false).then(function (result) {
            setState(result.status, result.message);
            if (result.status) {
                $state.go('/mail', {label: 'inbox'});
            } else {
                console.log(JSON.parse(JSON.stringify('Manual Login Redirection Failed for some reason')));
            }
        });
    };
}]);