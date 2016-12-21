angular.module('swailMail').controller('MailController', ['$scope','cookie', '$window', function ($scope, $cookie, $window) {

    $scope.logout = function () {
        $window.location.href = 'https://www.google.com/accounts/Logout?continue=http://www.google.com';
        $cookie.delete('userDetails');
    }

}] );