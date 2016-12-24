angular.module('swailMail').controller('MailController', ['$scope','cookie','$location','$window', '$stateParams', function ($scope, $cookie, $location, $window, $stateParams) {

    $scope.logout = function () {
        $cookie.delete('userDetails');
        $window.location.href = 'https://www.google.com/accounts/Logout?continue=http://www.google.com';
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

    $scope.isActive = function(path)
    {
        return $location.path()==path.toLowerCase();
    };
}] );