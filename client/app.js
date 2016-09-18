(function () {
  'use strict';

  angular
      .module('gemForMe', [
        'ngRoute',
        'satellizer',
        'gemForMe.auth',
        'gemForMe.dashboard'
      ])
      .config(configRouter)
      .config(configInterceptor)
      .config(configAuth);

  configRouter.$inject = ['$routeProvider'];
  configInterceptor.$inject = ['$provide', '$httpProvider'];
  configAuth.$inject = ['$authProvider'];

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

  function configInterceptor($provide, $httpProvider) {
    $provide.factory('unauthorizedInterceptor', function($q, $location) {
      return {
        'responseError': function(rejection) {
          if (rejection.status == 401) {
            $location.path('/auth');
          }

          return $q.reject(rejection);
        }
      };
    });

    $httpProvider.interceptors.push('unauthorizedInterceptor');
  }

  function configAuth($authProvider) {
    $authProvider.httpInterceptor = function() { return true; };
    $authProvider.baseUrl = window.location.origin;
    $authProvider.loginUrl = '/api/auth/login';
    $authProvider.signupUrl = '/api/auth/register';
    $authProvider.tokenName = 'token';
    $authProvider.storageType = 'sessionStorage';
    $authProvider.authToken = 'Bearer';
    $authProvider.authHeader = 'Authorization';
  }
})();