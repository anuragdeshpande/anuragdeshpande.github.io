angular.module('swailMail').directive('gmailLabels', function () {
   return{
       restrict: 'E',
       templateUrl: 'directiveTemplates/label.html',
       controller: 'MailController',
       scope: {
           userDefinedLabels: '=',
           systemLabels: '='
       }
   }
});

