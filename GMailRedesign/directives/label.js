angular.module('swailMail').directive('gmailLabels', function () {
   return{
       restrict: 'E',
       templateUrl: 'directiveTemplates/label.html',
       controller: 'MailController',
       scope: {
           userDefinedLabels: '=',
           systemLabels: '='
       },
       link: function ($scope, element) {
           var unbind = $scope.$on('$locationChangeSuccess', function () {
               MailController.testing();
           });

           element.on('$destroy', function () {
               unbind();
           })
       }
   }
});

