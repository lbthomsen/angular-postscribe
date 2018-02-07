/*
 * Creates a postscribe directive for AngularJS
 */
(function() {

    var module = angular.module("ngPostscribe", []);

    module.controller("PostscribeController", ["$log", "$scope", 
        function($log, $scope) {
            $log.debug("PostscribeController: starting");
            $scope.$watch(function() {
                return $scope.element + $scope.content;
            }, function() {
                if ($scope.element && $scope.content) {
                    $scope.element.innerHTML = "";
                    postscribe($scope.element, $scope.content);
                }
            });
        }
    ]);

    module.directive("postscribe", [
        function() {
            return {
                restrict: "E", 
                scope: {
                    content: "@"
                },
                link: function(scope, elem, attrs) {
                    scope.element = elem[0];
                }, 
                controller: "PostscribeController", 
                replace: true, 
                template: "<div></div>"
            };
        }
    ]);

})();
/*
 * vim: ts=4 et nowrap autoindent
 */