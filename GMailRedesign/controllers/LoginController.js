angular.module('swailMail').controller('LoginController', ['$scope', '$location', 'cookie', function ($scope, $location, $cookie) {

    var CLIENT_ID = '793225560426-to0jcpob9p2jklejgmp2iv0maumqe5to.apps.googleusercontent.com';
    var SCOPES = ['https://mail.google.com/','https://www.googleapis.com/auth/gmail.modify', 'https://www.googleapis.com/auth/userinfo.email'];
    var isFinished = 0;
    var waiting;

    $scope.state = 'Checking Authentication';
    $scope.isProcessing = true;

    function checkingAuth() {
        $scope.isProcessing = true;
        $scope.state = 'Checking Aunthentication';
        gapi.auth.authorize(
            {
                'client_id': CLIENT_ID,
                'scope': SCOPES.join(' '),
                'immediate': true
            }, handleAuthResult);
        wait();
    }

    $scope.handleAuthClick = function () {

        $scope.isProcessing = true;
        $scope.state = 'Processing';

        gapi.auth.authorize(
            {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
            handleAuthResult);
        wait();
        return false;
    };


    function handleAuthResult(authResult) {
        if (authResult && !authResult.error) {
            gapi.client.load('gmail', 'v1', listLabels);
            gapi.client.load('plus', 'v1', function () {
                gapi.client.plus.people.get({userId: 'me'}).execute(function (resp) {

                    var userData = {
                        name: resp.result.displayName,
                        image: resp.result.image.url,
                        emailID: resp.result.emails[0].value,
                        isLoggedIn: true
                    };

                    $cookie.setUserDetails(userData);
                    isFinished++;

                });
            });
        }
        else {
            $scope.$apply(function () {
                $scope.isProcessing = false;
                $scope.state = 'Login';
                clear();
            });
            $cookie.setUserDetails({});
        }
    }

    function listLabels() {
        var request = gapi.client.gmail.users.labels.list({
            'userId': 'me'
        });

        request.execute(function (resp) {
            $cookie.saveLabels(resp.labels);
            isFinished++;
        });

    }

    function wait() {
        if (isFinished === 2 || $cookie.getUserDetails().isLoggedIn) {
            $location.path('mail').replace();
            $scope.$apply();
        }
        else {
            waiting = setTimeout(function () {
                wait()
            }, 100);
        }

    }

    function clear() {
        clearTimeout(waiting);
    }

    verifyAuthentication = checkingAuth;

}]);