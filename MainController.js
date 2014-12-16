/**
 * Created by bernhard on 28/11/14.
 */
app.controller("MainController", function($scope) {

    var loadedWines = [];
    var promise = checkStorage("wines", jsonPopular+catRedWhiteRose, 0, 100);
    promise.done(function(data){
        loadedWines = data;
        //wel cookies load page
        if(loadedWines.length > 0){
            $scope.top4 = [];
            $scope.top4 = loadedWines.slice(0, 4);
            hideClass(".top4 .loader-div");
            setTimeout(function(){showClass(".top4 ul");}, 500);
        }
    });







    //$scope.hideContainer = true;
    //$scope.fullLoader = true;

    /*$scope.offlineMode = false;
    if($scope.offlineMode == true){
        //Offline
        console.log("offline");
        var promise = promiseJSONOffline("scripts/json/popular.json");
        promise.done(function(data){
            offlinePopular = data;

            //$scope.loaded = true;
            setTimeout(function(){$scope.hideContainer = false;$scope.$apply();}, 500);

            $scope.top4 = [];
            $scope.top4 = getTop4(offlinePopular);

        });
        promise.fail(function(){
            console.log("Something went wrong with json: "+json);
        });
    }else{
        //online
        console.log("online");
        hideClass(".top4 ul");
        promiseJSON(jsonPopular+catRedWhiteRose, 4, 0)
            .done(function(data){

                //$scope.loaded = true;
                setTimeout(function(){$scope.hideContainer = false;$scope.$apply();}, 500);

                $scope.top4 = [];
                $scope.top4 = getTop4(data);

                hideClass(".top4 .loader-div");
                setTimeout(function(){showClass(".top4 ul");}, 500);

            })
            .fail(function(){
                console.log("Something went wrong with json: "+json);
            });

    }


    $scope.error =  "";
    $scope.big = true;*/
});

function getTop4(list){
    var top4 = [];
    for (i = 0; i < 4; i++) {
        try {
            var value = list[i];
            var w = new Wijn(value.Id, value.Name, value.Url, value.Appellation.Name, value.Appellation.Region.Name, value.Labels[0].Url, value.Varietal.Name, value.Varietal.WineType.Name, value.Vineyard.Name, value.Vineyard.ImageUrl, value.Community.Reviews.HighestScore, value.Ratings.HighestScore, value.PriceRetail, value.ProductAttributes);
            top4.push(w);
        }catch(err){
            console.log(err);
            console.log(value);
            console.log(list);
        }

    }
    return top4;
}

