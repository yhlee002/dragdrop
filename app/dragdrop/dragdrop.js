angular
    .module('ngDragDrop', [])
    .directive('uiDraggable', ['$parse', '$rootScope', function ($parse, $rootScope) {
        return function (scope, element, attrs) { // link 함수와 유사
            if (window.jQuery && !window.jQuery.event.props.dataTransfer) {
                //window.jQuery.event.props.dataTransfer란?
                window.jQuery.event.props.push('dataTransfer'); // 무슨 의미?
            }

            element.attr("draggable", false);
            attrs.$observe('uiDraggable', function (newValue) {
                element.attr('draggable', newValue);
            });

            var dragData = "";
            scope.$watch(attrs.ondrag, function (newValue) { // attrs.drag = "man" 혹은 "woman"
                dragData = newValue;
            });

            // drag start
            element.bind("dragstart", function (e) {
                var sendData = angular.toJson(dragData); // json으로 변환
                var sendChannel = attrs.dragChannel || "defaultchannel"; // dragChannel이 html 어디에 존재하는지 보기
                e.dataTransfer.setData("Text", sendData);
                $rootScope.$broadcast("ANGULAR_DRAG_START", sendChannel);
            });

            // drag end
            element.bind("dragend", function (e) {
                var sendChannel = attrs.dragChannel || "defaultchannel";
                $rootScope.$broadcast("ANGULAR_DRAG_END", sendChannel);

                if (e.dataTransfer && e.dataTransfer.dropEffect !== "none") {
                    if (attrs.ondragend) { // cf. onDropSuccess : angularJS 1.8 버전에서 제공하는 기능이 아닌 듯
                        var fn = $parse(attrs.ondragend);
                        scope.$apply(function () {
                            fn(scope, {$event: e});
                        });
                    }
                }
            })
        };
    }
    ]); // $parse란?
/**
 * DataTransfer(event.dataTransfer) : Drag & Drop 되는 대상 Data를 담는 역할
 *
 * 1) setData(format, data)
 *  - format : 포맷 문자열 지정
 *  - data : 지정한 포맷(format)과 일치하는 값. 문자열만 가능
 *
 * 2) getData(format)
 *  - format : 포맷 문자열 지정
 *  cf. 리턴값 : 지정한 포맷(format)의 전송 데이터를 반환. 지정된 포맷의 데이터가 지정되어 있지 않으면 공백 문자열("") 반환
 *  ex. event.dataTransfer.setData("Text", "a");
 *      event.dataTransfer.setData("Text2"); // 포맷으로 지정할 수 있는 인자 형태가 정해져 있는지?
 *
 *      event.dataTransfer.getData("Text"); -> "a" 반환
 *      event.dataTransfer.getData("Text2"); -> "" 반환
 *
 * 3) clear(format) : 해당 포맷과 일치하는 데이터 제거. format 인자 전달하지 않을 경우 데이터 전송용으로 지정된 데이터 모두 제거.
 *
 * 4) types : dragstart 이벤트 발생 시 DOM 목록에 있는 data formate을 설정하며, setData() 함수 호출할 때 지정되는 format 문자열을 배열형식으로 얻을 수 있음
 *
 * 5) dropEffect : Drop시 일어날 이벤트(이는 Drop Target의 ondragenter나 ondragover에 지정하는 핸들러 내부에 명시해야함)
 *  - "copy" : 원본 항목의 복사본이 새 위치에 만들어짐
 *  - "move" : 항목이 새 위치로 이동
 *  - "link" : 새 위치의 소스에 대한 링크가 설정
 *  - "none" : 아이템을 드롭할 수 없음
 *
 *  cf. 값을 셋팅하면 변경됨!
 *      "On setting, if the new value is one of the values listed below, then the property's current value will be set to the new value and other values will be ignored."
 *  cf. "Assigning any other value to dropEffect has no effect and the old value is retained." - ???
 *
 * 6) effectAllowed : Drag 대상에 허용할 dropEffect 지정(이는 Drop 대상에 명시해야함 - draggable="true")
 *  - "uninitialized" : 아무것도 지정안함
 *  - "none" : 아무것도 허용안함
 *  - "copy" : dropEffect copy만 허용
 *  - "move" : dropEffect move만 허용
 *  - "link" : dropEffect link만 허용
 *  - "copyLink" : dropEffect copy와 link만 허용
 *  - "copyMove" : dropEffect copy와 move만 허용
 *  - "linkMove" : dropEffect link와 move만 허용
 *  - "all" : dropEffect값 모두 허용용
 *
 *  dropEffect 프로퍼티는 effectAllowed도 함께 지정해야 의미 있음
 * */
