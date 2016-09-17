(function () {

  'use strict';

  angular
      .module('gemForMe.auth', [])
      .controller('AuthController', AuthController)
      .factory('AuthUtils', AuthUtils);

  AuthController.$inject = [
    '$scope', '$location',
    'AuthUtils'
  ];
  AuthUtils.$inject = [
    '$http', '$q',
    '$auth'
  ];

  function AuthController($scope, $location,
                          AuthUtils) {
    if (AuthUtils.isAuthorization()) {
      return $location.path('/dashboard');
    }
    $scope.user = {};

    $scope.login = function (user) {
      AuthUtils.login(user)
          .then(function (ok) {
            $location.path('/dashboard');
          }, function (err) {
            console.log(err);
          });
    };

    $scope.register = function (user) {
      AuthUtils.register(user)
          .then(function (ok) {
            alert('User created');
          }, function (err) {
            console.log(err);
          });
    };
  }

  function AuthUtils($http, $q,
                     $auth) {
    var service = {
      login: login,
      logout: logout,
      register: register,
      isAuthorization: isAuthorization,
      getUser: getUser
    };

    function login(credentials) {
      var defer = $q.defer();

      $auth.login({ credentials: credentials })
          .then(defer.resolve)
          .catch(defer.reject);

      return defer.promise;
    }

    function logout() {
      var defer = $q.defer();
      $auth.logout();

      $http.get('api/auth/logout')
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function register(credentials) {
      var defer = $q.defer();

      $auth.signup({ credentials: credentials })
          .then(defer.resolve)
          .catch(defer.reject);

      return defer.promise;
    }

    function isAuthorization() {
      return $auth.isAuthenticated();
    }

    function getUser() {
      var defer = $q.defer();

      $http.get('/api/auth/user')
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    return service;
  }

})();
