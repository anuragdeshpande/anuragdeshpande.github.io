angular.module('swailMail').directive('emails', function () {
    return {
        restrict: 'E',
        scope: {
            emails: '='
        },
        templateUrl:'directiveTemplates/emailListEntry.html',
        controller: 'MailController'
    }
});