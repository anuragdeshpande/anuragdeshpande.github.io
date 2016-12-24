var verifyAuthentication;
(function () {
    var app = angular.module('swailMail', ['ui.router', 'ngCookies', 'ngRoute']);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('/login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            })
            .state('/mail', {
                url: '/mail',
                templateUrl: 'views/mail.html',
                controller: 'MailController'
            });


        $urlRouterProvider.otherwise('/login');
    }]);
})();