angular.module('swailMail').controller('MailController', ['$scope', '$state', 'storageService', '$window', 'googleApi', '$stateParams', '$http', 'helper', '$location', function ($scope, $state, storage, $window, googleApi, $stateParams, $http, helper, $location) {
    $scope.logout = function () {
        storage.removeAll();
        $window.location.href = 'https://www.google.com/accounts/Logout?continue=http://www.google.com';
    };

    $scope.isActive = function (path) {
        return $location.path().toLowerCase() === path.toLowerCase();
    };

    $scope.$on('$stateChangeSuccess', function () {
        helper.verify().then(function (response) {
            if (response && response.status) {
                emailProcessing();
            } else {
                $state.go('/login');
            }
        });
    });

    function emailProcessing() {
        var apiToLoad = 3;
        var apiLoaded = 0;

        googleApi.getProfileDetails().then(function (response) {
            if(response.status) {
                apiLoaded += 1;
                $scope.userDetails = response.profile;
            }
            else
            {
                console.log(JSON.parse(JSON.stringify('Profile Fetching Failed')));
            }
        });

        googleApi.getLabels().then(function (response) {
            if(response.status)
            {
                apiLoaded+=1;
                $scope.emailLabels = response.labels;

            }
            else
            {
                console.log(JSON.parse(JSON.stringify('Label Fetching Failed')));
            }
        });



    }
}]);