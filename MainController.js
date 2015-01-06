/**
 * Created by bernhard on 28/11/14.
 */
app.controller("MainController", function($scope, $location) {

    $scope.isActive = function(route) {
        return route === $location.path();
    }

});
