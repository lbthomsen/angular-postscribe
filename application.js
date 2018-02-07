/*
 * Creates a postscribe directive for AngularJS
 */
(function() {

    var appName = "angular-postscribe";

    var app = angular.module(appName, [
        "ngPostscribe"
    ]);

    app.run(["$log", 
        function($log) {
            $log.debug(appName + " started");
        }
    ]);

    app.controller("BodyController", ["$log", "$scope", "$interval", "SnippetService", 
        function($log, $scope, $interval, snippetService) {
            $log.debug("BodyController: starting");

            var that = this;
            that.snippetService = snippetService;
            that.content1 = "";
            that.content2 = "";
            that.content3 = "";

            that.replaceAll = function() {
                if (snippetService.snippets.length > 0) {
                    that.content1 = snippetService.snippets[Math.floor(Math.random() * snippetService.snippets.length)];
                    that.content2 = snippetService.snippets[Math.floor(Math.random() * snippetService.snippets.length)];
                    that.content3 = snippetService.snippets[Math.floor(Math.random() * snippetService.snippets.length)];
                }
            }


            $scope.$watchCollection("bodyCtrl.snippetService.snippets", function() {
                if (snippetService.snippets.length > 0) {
                    $interval(function() {
                        that.replaceAll();
                    }, 10000);
        
                    that.replaceAll();    
                }
            });
            
        }
    ]);

    app.factory("SnippetService", ["$log", "$http", 
        function($log, $http) {

            $log.debug("SnippetService: starting");

            var me = {
                snippets: []
            };

            $http.get("snippets.json")
            .then(function(response) {
                $log.debug("Response is: %o", response);
                response.data.forEach(function(value) {
                    me.snippets.push(value);
                });
            });

            return me;
        }
    ]);

})();
/*
 * vim: ts=4 et nowrap autoindent
 */