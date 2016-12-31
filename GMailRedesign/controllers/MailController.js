angular.module('swailMail').controller('MailController', ['$scope','cookie','$location','$window', 'emailManager','googleApi' , function ($scope, $cookie, $location, $window, $emailManager, $googleApi) {

    $scope.logout = function () {
        $cookie.deleteUserObject();
        $cookie.delete('authKey');
        $window.location.href = 'https://www.google.com/accounts/Logout?continue=http://www.google.com';
    };

    $scope.isActive = function(path)
    {
        return $location.path().toLowerCase()==path.toLowerCase();
    };


    if($emailManager.isTokenValid())
    {
        console.log($cookie.getUserObject());

    }
    else
    {
        $location.path('login');
    }

}]);