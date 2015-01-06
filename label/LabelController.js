/**
 * Created by bernhard on 23/12/14.
 */
app.controller("LabelController", function($scope) {

    $scope.labelComplete = false;

    var game = new LabelGame();
    game.determineObjects();

    $scope.objects = game.getObjects();

    $scope.selectedObject = $scope.objects[1];
    game.resetActive();
    $scope.selectedObject.active = true;
    game.drawObjects();
    $("#options").css({"top":(parseInt($scope.selectedObject.top) + (parseInt($scope.selectedObject.height)/2)-12) + "%", "left": "80%"});

    $scope.numberCorrect = 0;

    selectedObjectChange = function(s){
        var o = $.grep($scope.objects, function(e){ return e.name == s; })[0];
        $scope.selectedObject = o;

        game.resetActive();
        $scope.selectedObject.active = true;

        $("#options").css({"top":(parseInt(o.top) + (parseInt(o.height)/2)-12) + "%", "left": "80%"});

        console.log(o.name);
        $scope.$apply();
        game.drawObjects();
    };

    $scope.radioChanged = function(s){
        $scope.selectedObject.guessedName = s;
        $scope.selectedObject.bGuessed = false;
        if($scope.selectedObject.name == s){
            $scope.selectedObject.bGuessed = true;
            $scope.objects[$scope.objects.indexOf($scope.selectedObject)].bGuessed = true;

            var g = $.grep($scope.objects, function(e){ return e.bGuessed == true; });
            console.log(g.length);
            if(g.length == $scope.objects.length){
                $scope.labelComplete = true;
                $scope.$apply();
            }
        }
    };
    $scope.copyToClipboard = function(text){
            window.prompt("Copy to clipboard: Ctrl+C (or CMD+C on Mac), Enter", text);
    }

});