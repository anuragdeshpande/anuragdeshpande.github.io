function startProcess() {
}
(function () {
    var app = angular.module('swailMail', ['ui.router','LocalStorageModule', 'angular.filter']);

    app.config(['$stateProvider', '$urlRouterProvider','localStorageServiceProvider', function ($stateProvider, $urlRouterProvider, $localStorage) {
        $stateProvider
            .state('/login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'newLoginController'
            })
            .state('/mail', {
                url: '/mail',
                templateUrl: 'views/mail.html',
                controller: 'MailController'
            });
        $urlRouterProvider.otherwise('/login');

        $localStorage.setPrefix('swailMail');

    }]);
})();