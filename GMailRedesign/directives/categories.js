angular.module('swailMail').directive('categories', function () {
    return{
        restrict: 'E',
        templateUrl: 'directiveTemplates/categories.html',
        controller: 'MailController',
        scope: {
            categories: '=emailLabels'
        }
    }
});