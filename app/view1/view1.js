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
            link: function ($scope, $element, $attr) {
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
            link: function ($scope, $element, $attr) {

                let targetId;

                $element.bind("dragover", function (e) {
                    e.dataTransfer.dropEffect = "move";
                    if (e.preventDefault) { // 기본적인 Dom element의 동작 방지
                        e.preventDefault();
                    }
                    if (e.stopPropagation) {
                        e.stopPropagation();
                    }

                    // 드래그해온 element(A)를 dragover하는 element(B)의 '다음' 순서로 존재하기 위한 코드
                    targetId = e.target.id; // 현재 dragover 되고 있는 대상(B)

                });

                $element.bind("drop", function (e) {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = "move"; // drop시 요소 move 허용

                    var types = e.dataTransfer.types;
                    if (e.dataTransfer && e.dataTransfer.types !== undefined && e.dataTransfer.types !== null) {
                        var data = e.dataTransfer.getData("text");
                    }

                    let newNode = document.getElementById(data);
                    // insertBefore의 기준이 되는 노드(2번째 인자)는 반드시 해당 (부모) 노드의 자식 노트여야함
                    let refNode = document.getElementById(targetId);

                    $element[0].insertBefore(newNode, refNode);
                });
            }
        }
    });