angular.module('swailMail').controller('MailController', ['$scope','sharedScope','$location', function ($scope, $sharedScope, $location) {

    if(!$sharedScope.isLoggedIn)
    {
        $location.path('login');
    }

    console.log($sharedScope);




    $scope.logout = function () {
        gapi.auth2.getAuthInstance().signOut().then(function () {
            console.log('Signed Out');
        });
    };



}] );