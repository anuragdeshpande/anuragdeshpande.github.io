angular.module('swailMail').controller('MailController', ['$scope', '$state', 'storageService', '$window', 'googleApi', '$stateParams', '$http', 'helper', '$location', function ($scope, $state, storage, $window, googleApi, $stateParams, $http, helper, $location) {
    $scope.logout = function () {
        storage.removeAll();
        $window.location.href = 'https://www.google.com/accounts/Logout?continue=http://www.google.com';
    };

    $scope.isActive = function (path) {
        return $location.search().label.toLowerCase() === path.toLowerCase();
    };

    $scope.$on('$stateChangeSuccess', function () {
        console.log(JSON.parse(JSON.stringify('Mail Loaded')));
        console.log(JSON.parse(JSON.stringify($stateParams)));
        helper.verify().then(function (response) {
            if (response && response.status) {
                $location.search('label=' + $stateParams.label);
                emailProcessing($stateParams.label, $stateParams.labelID);
            } else {
                // console.log(JSON.parse(JSON.stringify('Redirecting to login')));
                $state.go('/login');
            }
        });
    });

    function emailProcessing(labelName, labelID) {
        console.log(JSON.parse(JSON.stringify('Recieved Email Label: ' + labelID)));
        console.log(JSON.parse(JSON.stringify('Beginning Email Responsibilities')));

        getProfileDetails();
        getLabels(labelID, labelName);
        getEmails(labelID);
    }

    $scope.getMail = function (labelID, labelName) {
        changeMailState(labelName, labelID);
    };

    function changeMailState(labelName, labelID) {
        $state.go('/mail', {label: labelName, labelID: labelID});
    }

    function getProfileDetails() {
        googleApi.getProfileDetails().then(function (response) {
            if (response.status) {
                $scope.userDetails = response.profile;
                console.log(JSON.parse(JSON.stringify(response.profile.id)));
            }
            else {
                console.log(JSON.parse(JSON.stringify('Profile Fetching Failed')));
            }
        });
    }

    function getLabels(labelID, labelName) {
        googleApi.getLabels().then(function (response) {
            if (response && response.status) {
                $scope.systemLabels = response.labels.system;
                $scope.userDefinedLabels = response.labels.user;
                console.log(JSON.parse(JSON.stringify('Binded the labels to the scope')));
                if ($location.search().label.toLowerCase() === labelName) {
                    $scope.getMail(labelID, labelName);
                }
            } else {
                console.log(JSON.parse(JSON.stringify('Fetching Labels Failed')));
            }
        });
    }


    function getEmails(labelID) {
        googleApi.getEmails(labelID).then(function (response) {
            $scope.emails = response.mails;
            $scope.getThread(response.mails[0].threadID);
        });
    }

    $scope.getThread = function (threadID) {
        changeThreadState(threadID);
        googleApi.getThreads(threadID).then(function (response) {
            if (response.status) {
                console.log(JSON.parse(JSON.stringify(response.thread)));
                $scope.threads = response.thread;
            }
            else {
                console.log(JSON.parse(JSON.stringify('Thread Fetch Failed')));
            }
        });
    };

    $scope.isThreadActive = function (threadID) {
        return $location.search().threadID === threadID;
    };

    function changeThreadState(threadID) {
        var searchTerms = $location.search();
        searchTerms.threadID = threadID;
        $location.search(searchTerms);
    };
}]);


