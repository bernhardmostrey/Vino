/**
 * Created by bernhard on 28/11/14.
 */
app.controller("MainController", function($scope, $location) {

    $scope.isActive = function(route) {
        return route === $location.path();
    };

    if(window.innerWidth <= 650){
        $("#mobile-nav").click(function(){
            $("nav").toggleClass("open");
        });
        $("header > nav > ul li a").click(function(){
            $("nav").toggleClass("open");
        });
    }

});
