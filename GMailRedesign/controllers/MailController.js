angular.module('swailMail').controller('MailController', ['$scope', '$location', 'helper', 'googleApi', '$rootScope', '$state', function ($scope, $location, helper, googleApi, $rootScope, $state) {

    //Scope Functions
    $scope.logout = function () {
        helper.logout();
    };

    $scope.$on('$stateChangeSuccess', function () {
        console.log(JSON.parse(JSON.stringify('Mail Loaded')));
        helper.verify().then(function (response) {
            if (response && response.status) {
                var searchParams = $location.search();
                if (searchParams.label && searchParams.labelID) {
                    emailProcessing(searchParams);
                }
                else {
                    searchParams.label = 'inbox';
                    searchParams.labelID = btoa('INBOX');
                    $location.search(searchParams);
                    emailProcessing(searchParams);
                }
            } else {
                // console.log(JSON.parse(JSON.stringify('Redirecting to login')));
                $state.go('/login');
            }
        });
    });

    $scope.changeLabel = function (labelName, labelID) {
        $location.search('label=' + labelName.toLowerCase() + '&id=' + btoa(labelID));
    };

    $scope.isActive = function (path) {
        return $location.search().label.toLowerCase() === path.toLowerCase();
    };

    $scope.getThread = function (mail) {
        changeThreadState(mail.threadID);
        googleApi.getThreads(mail).then(function (response) {
            if (response.status) {
                console.log(JSON.parse(JSON.stringify(response.thread)));
                $scope.threads = response.thread;
            }
            else {
                console.log(JSON.parse(JSON.stringify('Thread Fetch Failed')));
            }
        });
    };

    $scope.getEmailsInLabel = function() {
        var params = $location.search();
        getEmails(params.labelID);
    };




    //Controller Functions
    function emailProcessing(label) {
        console.log(JSON.parse(JSON.stringify(label)));
        console.log(JSON.parse(JSON.stringify('Recieved Email Label: ' + label.labelID)));
        console.log(JSON.parse(JSON.stringify('Beginning Email Responsibilities')));

        getProfileDetails();
        getLabels();
        // getEmails(atob(label.labelID));
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

    function getLabels() {
        googleApi.getLabels().then(function (response) {
            if (response && response.status) {
                $scope.systemLabels = response.labels.system;
                $scope.userDefinedLabels = response.labels.user;
                console.log(JSON.parse(JSON.stringify('Binded the labels to the scope')));
            } else {
                console.log(JSON.parse(JSON.stringify('Fetching Labels Failed')));
            }
        });
    }

    function changeThreadState(threadID) {
        var searchTerms = $location.search();
        searchTerms.threadID = threadID;
        $location.search(searchTerms);
    }

    function getThread(mail) {
        changeThreadState(mail.threadID);
        googleApi.getThreads(mail).then(function (response) {
            if (response.status) {
                console.log(JSON.parse(JSON.stringify('Recieved Thread')));
                console.log(JSON.parse(JSON.stringify(response.thread)));
                $scope.threads = response.thread;
            }
            else {
                console.log(JSON.parse(JSON.stringify('Thread Fetch Failed')));
            }
        });
    };

}]);