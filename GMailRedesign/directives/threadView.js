angular.module('swailMail').directive('threadsView', function () {
   return{
       restrict: 'E',
       scope: {
           threads:'='
       },
       controller: 'MailController',
       templateUrl:'directiveTemplates/threadView.html'
   }
});