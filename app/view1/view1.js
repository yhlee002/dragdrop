'use strict';

angular
    .module('myApp.view1', ['ngRoute', 'ngDragDrop'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])
    .controller('View1Ctrl', function ($scope, $parse) {

        $scope.men = [
            'John',
            'Jack',
            'Mark',
            'Ernie'
        ];

        $scope.women = [
            'Jane',
            'Jill',
            'Betty',
            'Mary'
        ];

        $scope.addText = "";

        // // drop element(draggable element)에서 실행
        // $scope.onDrop = function ($event, drag, array) {
        //     // array.push($data);
        //     event.dataTransfer.effectAllowed = "move";
        // };
        //
        // // drop target에서 실행
        // $scope.dropSuccessHandler = function ($event, index, array) {
        //     // array.splice(index, 1);
        //     event.dataTransfer.dropEffect = "move";
        // };

        /** */
        if (window.jQuery && !window.jQuery.event.props.dataTransfer) {
            //window.jQuery.event.props.dataTransfer란?
            window.jQuery.event.props.push('dataTransfer'); // 무슨 의미?
        }
        // $scope.obj = "";
        var dragData = "";

        $scope.onclick= function($element){
            dragData = $element;
        }
        //
        // $scope.$watch($scope.obj, function (newValue) { // attrs.drag = "man" 혹은 "woman"
        //     dragData = newValue;
        // });

        $scope.drop_handler = function () {
            event.dataTransfer.dropEffect = "move";
        }

        $scope.dragstart_handler = function (e) {
            var sendData = angular.toJson(dragData); // json으로 변환
            e.dataTransfer.setData("Text", sendData);
        }

        $scope.dragend_handler = function (e) {
            event.dataTransfer.effectAllowed = "move";

            if (e.dataTransfer && e.dataTransfer.dropEffect !== "none") {
                // if ($attrs.ondragend) { // cf. onDropSuccess : angularJS 1.8 버전에서 제공하는 기능이 아닌 듯
                    // var fn = $parse($attrs.ondragend);
                    // $scope.$apply(function () {
                    //     fn($scope, {$event: e});
                    // });
                // }
                var str = e.dataTransfer.getData("Text");
                alert(str);
            }
        }

    });