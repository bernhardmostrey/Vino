/**
 * Created by bernhard on 28/11/14.
 */
app.controller("BrowseController", function($scope) {

    $scope.browseList = [];
    $scope.currentPage = 0;
    $scope.pageSize = 20;

    //var loadedWines = checkStorage("wines", jsonPopular+catRedWhiteRose, 0, 100);
    var loadedWines = [];
    var promise = checkStorage("wines", jsonPopular+catRedWhiteRose, 0, 100);
    promise.done(function(data){
        loadedWines = data;
        if(loadedWines.length > 0){
            var list = loadedWines.slice($scope.currentPage*$scope.pageSize,$scope.pageSize);
            angular.forEach(list, function(value, key){

                angular.forEach(value.Attributes, function(a, key){
                    a.Name = a.Name.replace("&amp;","&");
                })
            });
            $scope.browseList = list;
            /*$(".browse .list img").each(function() {
                console.log("each"+this.src);
            });*/
            //$scope.$apply();
            hideClass(".browse .list ul .loader-div");
            setTimeout(function(){showClass(".browse .list ul li");}, 500);
        }
    });
    //wel cookies load page

    $scope.compareList = [];
    $scope.addToCompare = function(w, $event){
        $scope.compareList.push(w);
    };
    $scope.removeFromCompare = function(w, $event){
        var index = $scope.compareList.indexOf(w);
        if (index > -1) {
            $scope.compareList.splice(index, 1);
        }
    };



    //$scope.hideContainer = true;


    /*$scope.browseList = [];

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
    $scope.pageSize = 10;*/

    /*$scope.fullLoader = false;
    //$scope.$apply();
    setInterval(function(){$scope.hideContainer = false;$scope.$apply();}, 500);*/


    $scope.nextPage = function(){
        /*$scope.currentPage++;
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
        }*/


        $scope.currentPage++;



        var needed = ($scope.currentPage*$scope.pageSize)+$scope.pageSize;
        //console.log("current: "+loadedWines.length+" needed: "+needed);
        if(loadedWines.length >= needed){
            $scope.browseList = loadedWines.slice($scope.currentPage*$scope.pageSize,needed);
        }else{
            hideClass(".browse .list ul li");
            showClass(".browse .list ul .loader-div");
            //add 100 wines to storage
            var promise = addWinesToStorage("wines", jsonPopular+catRedWhiteRose, $scope.currentPage*$scope.pageSize, 100);
            promise.done(function(data){
                loadedWines = data;
                console.log(loadedWines.length);
                console.log(loadedWines);
                $scope.browseList = data.slice(($scope.currentPage*$scope.pageSize)-$scope.pageSize,needed);
                console.log($scope.browseList);
                console.log("current: "+loadedWines.length+" needed: "+needed);
                $scope.$apply();

                hideClass(".browse .list ul .loader-div");
                setTimeout(function(){showClass(".browse .list ul li");}, 500);
            });

        }

    };

    $scope.previousPage = function(){
        /*$scope.currentPage--;
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
        }*/
        $scope.currentPage--;
        //console.log("current: "+loadedWines.length+" needed: "+needed);
        var needed = ($scope.currentPage*$scope.pageSize)+$scope.pageSize;
        if(loadedWines.length > needed){
            $scope.browseList = loadedWines.slice($scope.currentPage*$scope.pageSize,needed);
            //console.log($scope.browseList);

        }else{
            hideClass(".browse .list ul li");
            showClass(".browse .list ul .loader-div");
            //add 100 wines to storage
            var promise = addWinesToStorage("wines", jsonPopular+catRedWhiteRose, $scope.currentPage*$scope.pageSize, 100);
            promise.done(function(data){
                loadedWines = data;
                $scope.browseList = data.slice(($scope.currentPage*$scope.pageSize),needed);
                console.log($scope.browseList);
                $scope.$apply();
                hideClass(".browse .list ul .loader-div");
                setTimeout(function(){showClass(".browse .list ul li");}, 500);
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
    return result;
}

