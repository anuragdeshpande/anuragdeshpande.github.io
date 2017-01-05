function startProcess() {
}
(function () {
    var app = angular.module('swailMail', ['ui.router', 'ngCookies','LocalStorageModule']);

    app.config(['$stateProvider', '$urlRouterProvider','localStorageServiceProvider', function ($stateProvider, $urlRouterProvider, $localStorage) {
        $stateProvider
            .state('/login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'newLoginController'
            })
            .state('/mail', {
                url: '/mail?label',
                templateUrl: 'views/mail.html',
                controller: 'MailController',
                params:{label: 'inbox', labelID:'INBOX'}
            });
        $urlRouterProvider.otherwise('/login');

        $localStorage.setPrefix('swailMail');

    }]);
})();