angular.module('swailMail').controller('threadController', ['$rootScope', '$scope', 'helper', '$location', 'googleApi', function ($rootScope, $scope, helper, $location, googleApi) {
    $scope.$on('$locationChangeSuccess', function (event, newUrl, oldUrl) {
        if ($location.search().threadID) {
            var threadID = $location.search().threadID;
            getThreads(threadID);

        }
    });

    function getThreads(threadID) {
        googleApi.getThreads(threadID).then(function (response) {
            if (response.status) {
                console.log(JSON.parse(JSON.stringify('Thread recieved in thread Controller')));
                console.log(JSON.parse(JSON.stringify(response.thread)));
                $scope.threads = response.thread;
            }
            else {
                console.log(JSON.parse(JSON.stringify('Thread Fetch Failed')));
            }
        });
    }
}]);