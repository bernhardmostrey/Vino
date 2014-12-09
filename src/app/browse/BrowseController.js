/**
 * Created by bernhard on 28/11/14.
 */
app.controller("BrowseController", function($scope) {

    //$scope.hideContainer = true;


    $scope.browseList = [];

    $scope.offlineMode = false;


    if($scope.offlineMode == true){
        //Offline

        var promise = promiseJSONOffline("../../../scripts/json/popular.json");
        promise.done(function(data){
            //console.log(data);
            offlinePopular = data;
            //console.log(offlinePopular);
            //$scope.$apply();
            //setTimeout(function(){$scope.hideContainer = false;$scope.$apply();}, 500);

            $scope.browseList = [];

            //console.log(offlinePopular);
            $scope.browseList = getCertainWines(offlinePopular, $scope.currentPage*10, $scope.pageSize);
            console.log($scope.browseList);

            $scope.$apply();
        });
        promise.fail(function(){
            console.log("Something went wrong with json: "+json);
        });
    }else{
        //ONLINE

        promiseJSON(jsonPopular+catRedWhiteRose, $scope.pageSize, $scope.currentPage*10)
            .done(function(data){


                $scope.browseList = getCertainWines(data, 0, $scope.pageSize);
                $scope.$apply();

            })
            .fail(function(){
                console.log("Something went wrong with json: "+json);
            });
    }

    $scope.currentPage = 0;
    $scope.pageSize = 10;

    /*$scope.fullLoader = false;
    //$scope.$apply();
    setInterval(function(){$scope.hideContainer = false;$scope.$apply();}, 500);*/


    $scope.nextPage = function(){
        $scope.currentPage++;
        hideClass(".browse ul");
        showClass(".browse .loader-div");
        if($scope.offlineMode == true)$scope.browseList = getCertainWines(offlinePopular, $scope.currentPage*10, $scope.pageSize);hideClass(".browse .loader-div");setInterval(function(){showClass(".browse ul");}, 1000);
        if($scope.offlineMode == false){
            promiseJSON(jsonPopular+catRedWhiteRose, $scope.pageSize, $scope.currentPage*10)
                .done(function(data){
                    $scope.browseList = getCertainWines(data, 0, $scope.pageSize);
                    $scope.$apply();


                })
                .fail(function(){
                    console.log("Something went wrong with json: "+json);
                });
        }
    };

    $scope.previousPage = function(){
        $scope.currentPage--;
        hideClass(".browse ul");
        showClass(".browse .loader-div");
        if($scope.offlineMode == true)$scope.browseList = getCertainWines(offlinePopular, $scope.currentPage*10, $scope.pageSize);hideClass(".browse .loader-div");setInterval(function(){showClass(".browse ul");}, 1000);
        if($scope.offlineMode == false){
            promiseJSON(jsonPopular+catRedWhiteRose, $scope.pageSize, $scope.currentPage*10)
                .done(function(data){
                    $scope.browseList = getCertainWines(data, 0, $scope.pageSize);
                    $scope.$apply();
                })
                .fail(function(){
                    console.log("Something went wrong with json: "+json);
                });
        }
    };

});



function getCertainWines(list, start, length){
    var result = [];

        for (i = start; i < start+length; i++) {
            if(list[i] != null){
                try {
                    var value = list[i];
                    var w = new Wijn(value.Id, value.Name, value.Url, value.Appellation.Name, value.Appellation.Region.Name, value.Labels[0].Url, value.Varietal.Name, value.Varietal.WineType.Name, value.Vineyard.Name, value.Vineyard.ImageUrl, value.Community.Reviews.HighestScore, value.Ratings.HighestScore, value.PriceRetail, value.ProductAttributes);
                    result.push(w);
                }catch(err){
                        console.log(err);
                        console.log(value);
                        console.log(list);
                    }
            }

        }

    hideClass(".browse .loader-div");
    setTimeout(function(){showClass(".browse ul")}, 500);
    return result;
}