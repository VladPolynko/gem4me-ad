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
    '$http', '$q'
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

            alert(err.message);
          });
    };

    $scope.register = function (user) {
      AuthUtils.register(user)
          .then(function (ok) {
            alert('User created');
          }, function (err) {
            console.log(err);

            alert(err.message);
          });
    };
  }

  function AuthUtils($http, $q) {
    var user = sessionStorage.getItem('user');
    user = angular.fromJson(user);

    return {
      login: function (credentials) {
        var defer = $q.defer();

        $http.post('/api/auth/login', { credentials: credentials })
            .success(function (ok) {
              sessionStorage.setItem('user', angular.toJson(ok));
              user = ok;
              defer.resolve(user);
            })
            .error(defer.reject);

        return defer.promise;
      },
      logout: function () {
        var defer = $q.defer();

        $http.post('/api/auth/logout')
            .success(function (ok) {
              sessionStorage.removeItem('user');
              defer.resolve(ok);
            })
            .error(defer.reject);

        return defer.promise;
      },
      register:function (credentials) {
        var defer = $q.defer();

        $http.post('/api/auth/register', { credentials: credentials })
            .success(defer.resolve)
            .error(defer.reject);

        return defer.promise;
      },
      isAuthorization: function () {
        return !!user;
      },
      getUser: function () {
        return user;
      }
    };
  }

})();
