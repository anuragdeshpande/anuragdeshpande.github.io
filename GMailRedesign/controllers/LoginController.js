angular.module('swailMail').controller('LoginController', ['$scope', '$location', 'cookie', function ($scope, $location, $cookie) {

    var CLIENT_ID = '793225560426-to0jcpob9p2jklejgmp2iv0maumqe5to.apps.googleusercontent.com';
    var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/userinfo.email'];
    var isFinished = 0;

    $scope.state = 'Authorise Email Access';

    $scope.handleAuthClick = function () {

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
                    isFinished = 2;
                });
            });
        }
        else {
            $cookie.setUserDetails({});
        }
    }

    function listLabels() {
        var request = gapi.client.gmail.users.labels.list({
            'userId': 'me'
        });

        request.execute(function (resp) {
            // $sharedScope.labels.push(resp.labels);
            isFinished =1;
        });
    }
    
    function wait() {
        if(isFinished===2)
        {
            $location.path('mail').replace();
            $scope.$apply();
        }
        else
        {
            setTimeout(function () {
                wait()
            }, 100);
        }
    }
}]);