angular.module('swailMail').controller('LoginController', ['$scope', '$location', 'sharedScope', function ($scope, $location, $sharedScope) {

    $scope.renderSignInButton = function ($sharedScope, $location) {
        gapi.signin2.render('signInButton',
            {
                'scope': 'profile email',
                'width': 240,
                'height': 50,
                'longtitle': true,
                'theme': 'dark',
                'onsuccess': function (googleUser) {
                    var profile = googleUser.getBasicProfile();
                    $sharedScope.userdata.name = profile.getName();
                    $sharedScope.userdata.imgUrl = profile.getImageUrl();
                    $sharedScope.userdata.email = profile.getEmail();
                    $sharedScope.userdata.id_token = googleUser.getAuthResponse().id_token;
                    $sharedScope.isLoggedIn = true;
                    if($sharedScope.isLoggedIn)
                    {
                        $location.path('mail');
                    }
                    else
                    {
                        console.log('Login is false');
                        console.log($sharedScope);
                    }
                },
                'onfailure': function (error) {
                    console.log(error);
                }
            }
        );
    };

    $scope.logout = function () {
        gapi.auth2.getAuthInstance().signOut().then(function () {
            console.log('Signed Out');
        });
    };


    $scope.renderSignInButton($sharedScope, $location);
}]);