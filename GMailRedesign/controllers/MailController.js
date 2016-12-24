angular.module('swailMail').controller('MailController', ['$scope','cookie','$location', function ($scope, $cookie, $location) {

    $scope.logout = function () {
        $cookie.delete('userDetails');
        $location.url('https://www.google.com/accounts/Logout?continue=http://www.google.com');
        $location.replace();
    };

    if(!$cookie.getUserDetails().isLoggedIn)
    {
      $location.path('login');
    }
    else
    {
        $scope.userDetails = $cookie.getUserDetails();
        $scope.emailLabels = $cookie.getLabels();
    }

    $scope.isActive = function (path) {
        return $location.path() === path;
    };


}] );