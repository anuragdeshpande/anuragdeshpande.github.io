angular.module('swailMail').controller('LoginController', ['$scope', '$location', function ($scope, $location) {
    // This flag we use to show or hide the button in our HTML.
    $scope.signedIn = false;

    // Here we do the authentication processing and error handling.
    // Note that authResult is a JSON object.
    $scope.processAuth = function(authResult) {
        // Do a check if authentication has been successful.
        if(authResult['access_token']) {
            // Successful sign in.
            $scope.signedIn = true;
            console.log('Successfully signed in');

        } else if(authResult['error']) {
            // Error while signing in.
            $scope.signedIn = false;
            $location.path('login');
        }
    };

    // When callback is received, we need to process authentication.
    $scope.signInCallback = function(authResult) {
        $scope.$apply(function() {
            $scope.processAuth(authResult);
        });
    };

    // Render the sign in button.
    $scope.renderSignInButton = function() {
        gapi.signin.render('signInButton',
            {
                'callback': $scope.signInCallback, // Function handling the callback.
                'clientid': '793225560426-to0jcpob9p2jklejgmp2iv0maumqe5to.apps.googleusercontent.com', // CLIENT_ID from developer console which has been explained earlier.
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
                'cookiepolicy': 'single_host_origin'
            }
        );
    };

    // Start function in this example only renders the sign in button.
    $scope.start = function() {
        $scope.renderSignInButton();
    };

    // Call start function on load.
    $scope.start();

    $scope.logout = function () {
        gapi.auth.signOut();
    }
}]);