'use strict';

var Checkers = angular.module('checkers', ['ui.bootstrap', 'ngRoute']).config(function ($routeProvider) {
    $routeProvider.when("/", {templateUrl: "/views/Landing.html",}).when("/play/black", {
        templateUrl: "/views/Game.html",
        controller: 'CheckerBoardCtrl',
        orientation: 'black'
    }).
    when ("/play/white", {
        templateUrl: "/views/Game.html",
        controller: 'CheckerBoardCtrl',
        orientation: 'white'
    });
});

Checkers.controller('CheckersController', ['$scope', '$log', '$uibModal', 'SocketService', '$http', function ($scope, $log, $uibModal, SocketService, $http) {
    var vm = this;

    $scope.animationsEnabled = true;
    $scope.isCollapsed = false;

    $http({
        method: 'GET',
        url: '/getAnalytics'
    }).then(function successCallback(response) {
        $scope.gamesPlayed = response.data.total_rows;
    }, function errorCallback(response) {

    });
    // play modal start
    $scope.open = function (name) {
        if (!name) {
            return;
        }

        SocketService.connect(name);

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/views/playModal.html',
            controller: 'PlayModalCtrl',
            resolve: {
                user: function () {
                    return name;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };
}]);
