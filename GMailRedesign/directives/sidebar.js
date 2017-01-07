angular.module('swailMail').directive('sidebar', function () {
   return{
       restrict: 'E',
       scope: {
           userDefinedLabels: '=',
           systemLabels: '=',
           userDetails: '='
       },
       templateUrl:'directiveTemplates/sidebar.html',
       controller: 'sideBarController'
   }
});