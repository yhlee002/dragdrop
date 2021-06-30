'use strict';

angular
    .module('myApp.view1', ['ngDragDrop'])
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

        /** */
        if (window.jQuery && !window.jQuery.event.props.dataTransfer) {
            window.jQuery.event.props.push('dataTransfer'); // 무슨 의미?
        }

        $scope.dragData = "";

        $scope.$watch($scope.dragData, function (newValue, oldValue) { // attrs.drag = "man" 혹은 "woman"
            $scope.dragData = newValue;
            console.log("change value of dragData");
        }); // 처음에만 두번 동작 - 왜?

    })
    .directive("dragItem", function () {
        return {
            restrict: "A",
            link: function ($scope, $element, $attr, ctrl) {
                $element.attr("draggable", true);
                $element.bind("dragstart", function (e) {
                    $scope.dragData = e.target.id; // drag 되는 대상의 id

                    e.dataTransfer.setData("text", $scope.dragData);
                    e.dataTransfer.effectAllowed = "move"; // 요소 이동을 허용
                });

                $element.bind("dragend", function (e) {
                    
                });
            }
        }
    })
    .directive("dropItem", function () {
        return {
            restrict: "A",
            link: function ($scope, $element, $attr, controller) {

                $element.bind("dragover", function (e) {
                    e.dataTransfer.dropEffect = "move";
                    if (e.preventDefault) { // 기본적인 Dom element의 동작 방지
                        e.preventDefault();
                    }
                    if (e.stopPropagation) {
                        e.stopPropagation();
                    }
                });

                $element.bind("drop", function (e) {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = "move"; // drop시 요소 move 허용

                    var types = e.dataTransfer.types;
                    if (e.dataTransfer && e.dataTransfer.types !== undefined && e.dataTransfer.types !== null) {
                        for (let i = 0; i < types.length; i++) {
                            var jsonData = e.dataTransfer.getData("text");
                        }
                    }

                    // 현재 요소(ul)에 자식으로 요소 추가
                    $element[0].appendChild(document.getElementById(jsonData));
                });
            }
        }
    });