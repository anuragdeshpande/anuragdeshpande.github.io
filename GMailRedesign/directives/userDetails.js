angular.module('swailMail').directive('userDetails', function () {
    return{
        restrict: 'E',
        templateUrl: 'directiveTemplates/userDetails.html',
        controller: 'MailController',
        scope: {
            userDetails: '='
        }
    }
});