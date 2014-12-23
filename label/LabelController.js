/**
 * Created by bernhard on 23/12/14.
 */
app.controller("BrowseController", function($scope) {

    var game = new LabelGame();
    game.determineObjects();

    $scope.objects = game.getObjects();

    $scope.selectedObject = $scope.objects[1];
    game.resetActive();
    $scope.selectedObject.active = true;
    game.drawObjects();

    $scope.numberCorrect = 0;

    selectedObjectChange = function(s){
        var o = $.grep($scope.objects, function(e){ return e.name == s; })[0];
        $scope.selectedObject = o;

        game.resetActive();
        $scope.selectedObject.active = true;

        console.log(o.name);
        $scope.$apply();
        game.drawObjects();
    };

    //$scope.selectedName = "percentage";



    $scope.radioChanged = function(s){
        $scope.selectedObject.guessedName = s;
        //console.log($scope.selectedObject.guessedName);
        if($scope.selectedObject.name == s){
            $scope.selectedObject.bGuessed = true;
            //console.log("correct");
            $scope.numberCorrect++;
        }
        //$scope.selectedObject.guessedName = s;
        /*console.log($scope.selectedObject.name);
        if($scope.selectedObject.name = s){
            $scope.selectedObject.bGuessed = true;
            console.log("correct!");
        }*/

    }

});