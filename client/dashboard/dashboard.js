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
    init();
    function init() {
      if (!AuthUtils.isAuthorization()) {return $location.path('/auth') }

      $scope.advertisingContent = '';
      getGroups();
      getAdvertising();
    }

    function getGroups() {
      DashboardUtils.getGroups()
          .then(function (groups) {
            $scope.groups = groups;
          }, function (err) {
            console.log(err);
          });
    }

    function getAdvertising() {
      DashboardUtils.getAdvertising()
          .then(function (advertising) {
            $scope.advertising = advertising;
          }, function (err) {
            console.log(err);
          });
    }

    $scope.addPublic = function () {
      var groupName = prompt('Group name', 'my group');

      DashboardUtils.addGroup({ name: groupName })
          .then(function (ok) {
            getGroups();
          }, function (err) {
            console.log(err);
          });
    };

    $scope.setupPublicGroup = function () {
      for(var i in $scope.groups) {
        DashboardUtils.updateGroup($scope.groups[i])
            .then(function (ok) {
            }, function (err) {
              console.log(err);
            })
      }
    };

    $scope.saveAdvertisingContent = function () {
      DashboardUtils.saveAdvertisingContent($scope.advertisingContent)
          .then(function (ok) {
            $scope.advertisingContent = '';
            getAdvertising();
          }, function (err) {
            console.log(err);
          })
    };
  }

  function DashboardUtils($http, $q) {

    var service = {
      getGroups: getGroups,
      addGroup: addGroup,
      updateGroup: updateGroup,
      getAdvertising: getAdvertising,
      saveAdvertisingContent: saveAdvertisingContent
    };

    function getGroups() {
      var defer = $q.defer();

      $http.get('/api/groups')
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function addGroup(group) {
      var defer = $q.defer();

      $http.post('/api/groups', { group: group })
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function updateGroup(group) {
      var defer = $q.defer();

      $http.put('/api/groups/' + group._id, { group: group })
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function getAdvertising() {
      var defer = $q.defer();

      $http.get('/api/advertising')
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function saveAdvertisingContent(advertising) {
      var defer = $q.defer();

      $http.post('/api/advertising', { advertising: advertising })
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    return service;
  }

})();
