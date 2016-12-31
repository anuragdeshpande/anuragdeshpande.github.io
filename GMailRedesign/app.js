var startProcess = function () {
};
(function () {
    var app = angular.module('swailMail', ['ui.router', 'ngCookies']);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('/login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'newLoginController'
            })
            .state('/mail', {
                url: '/mail/:label',
                templateUrl: 'views/mail.html',
                controller: 'MailController'
            });
        $urlRouterProvider.otherwise('/login');
    }]);
})();