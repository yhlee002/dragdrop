'use strict';

// Declare app level module which depends on views, and core components
angular
    .module('myApp', [
        'ngRoute',
        'myApp.view1',
        'myApp.view2',
        'myApp.version',
        'ngDragDrop',
    ])
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        // $routeProvider.otherwise({redirectTo: '/view1'});
    }])
    .controller("AppCtrl", function ($scope) {

        var viewList = [];
        var viewNumList = [1, 2];
        for (var i = 0; i < viewNumList.length; i++) {
            viewList[i] = "view" + viewNumList[i];
        }

        $scope.view = "view1";
        $scope.viewList = viewList;
        $scope.includeUrl = "view1/view1.html";

        $scope.$watch("view", function (newValue) {
            $scope.includeUrl = $scope.view + "/" + $scope.view + ".html";
        });
    });
