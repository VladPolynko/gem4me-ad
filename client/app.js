(function () {
  'use strict';

  angular
      .module('gemForMe', [
        'ngRoute',
        'gemForMe.auth',
        'gemForMe.dashboard'
      ])
      .config(configRouter);

  configRouter.$inject = ['$routeProvider'];

  function configRouter($routeProvider) {
    $routeProvider
        .when('/auth', {
          templateUrl: './auth/auth.html'
        })
        .when('/dashboard', {
          templateUrl: './dashboard/dashboard.html'
        })
        .otherwise({
          redirectTo: '/auth'
        });
  }
})();