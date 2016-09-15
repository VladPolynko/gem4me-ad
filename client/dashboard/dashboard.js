(function () {

  'use strict';

  angular
      .module('gemForMe.dashboard', [])
      .controller('DashboardController', DashboardController)
      .factory('DashboardUtils', DashboardUtils);

  DashboardController.$inject = [
    '$scope', '$location',
    'AuthUtils', 'DashboardUtils'
  ];
  DashboardUtils.$inject = [
    '$http', '$q'
  ];

  function DashboardController($scope, $location,
                               AuthUtils, DashboardUtils) {
    if (!AuthUtils.isAuthorization()) {
      return $location.path('/auth');
    }

    var user = AuthUtils.getUser();
    $scope.advertisingContent = '';

    getGroups();
    getAdvertising();
    function getGroups() {
      DashboardUtils.getGroups(user)
          .then(function (groups) {
            $scope.groups = groups;
          }, function (err) {
            console.log(err);

            alert(err.message);
          });
    }

    function getAdvertising() {
      DashboardUtils.getAdvertising(user)
          .then(function (advertising) {
            $scope.advertising = advertising;
          }, function (err) {
            console.log(err);

            alert(err.message);
          });
    }

    $scope.addPublic = function () {
      var groupName = prompt('Group name', 'my group');

      DashboardUtils.addGroup({ name: groupName, author: user.phone })
          .then(function (ok) {
            getGroups();
          }, function (err) {
            console.log(err);

            alert(err.message);
          });
    };

    $scope.setupPublicGroup = function () {
      for(var i in $scope.groups) {
        DashboardUtils.updateGroup($scope.groups[i])
            .then(function (ok) {
            }, function (err) {
              console.log(err);

              alert(err.message);
            })
      }
    };

    $scope.saveAdvertisingContent = function () {
      DashboardUtils.saveAdvertisingContent($scope.advertisingContent, user.phone)
          .then(function (ok) {
            $scope.advertisingContent = '';
            getAdvertising();
          }, function (err) {
            console.log(err);

            alert(err.message);
          })
    };
  }

  function DashboardUtils($http, $q) {
    return {
      getGroups: function (user) {
        var defer = $q.defer();

        $http.get('/api/groups/' + user.phone)
            .success(defer.resolve)
            .error(defer.reject);

        return defer.promise;
      },
      addGroup: function (group) {
        var defer = $q.defer();

        $http.post('/api/groups', { group: group })
            .success(defer.resolve)
            .error(defer.reject);

        return defer.promise;
      },
      updateGroup: function (group) {
        var defer = $q.defer();

        $http.put('/api/groups/' + group._id, { group: group })
            .success(defer.resolve)
            .error(defer.reject);

        return defer.promise;
      },
      getAdvertising: function (author) {
        var defer = $q.defer();

        $http.get('/api/advertising/' + author.phone)
            .success(defer.resolve)
            .error(defer.reject);

        return defer.promise;
      },
      saveAdvertisingContent: function (advertising, author) {
        var defer = $q.defer();

        $http.post('/api/advertising', {
          data: {
            advertising: advertising,
            author: author
          }
        })
            .success(defer.resolve)
            .error(defer.reject);

        return defer.promise;
      }
    };
  }

})();