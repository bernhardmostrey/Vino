/**
 * Created by bernhard on 28/11/14.
 */
app.controller("BrowseController", function($scope) {

    $scope.browseList = [];
    $scope.currentPage = 0;
    $scope.pageSize = 20;

    $scope.sortOrder = "",

    $scope.compareList = [];
    var promise = checkCompareStorage($scope.compareList, false).fail();
    promise.then(function(compare){
        $scope.compareList = compare;
    }, function(error) {
        console.error("Failed!", error);
        showPageError();
    });

    var loadedWines = [];
    var promise = checkStorage("wines", jsonPopular+catRedWhiteRose, 0, 100);
    promise.then(function(data){
        loadedWines = data;
        if(loadedWines.length > 0){
            var list = loadedWines.slice($scope.currentPage*$scope.pageSize,$scope.pageSize);
            angular.forEach(list, function(value, key){

                angular.forEach(value.Attributes, function(a, key){
                    a.Name = a.Name.replace("&amp;","&");
                    a.Name = a.Name.replace("&AMP;","&");
                })
            });
            $scope.browseList = list;
            //$scope.$apply();
            hideClass(".browse .list ul .loader-div");
            setTimeout(function(){showClass(".browse .list ul li");}, 500);
        }
    }, function(error) {
        console.error("Failed!", error);
        showPageError();
    });

    $scope.addToCompare = function(w, $event){
        $scope.compareList.push(w);
        var promise = checkCompareStorage($scope.compareList, false);
        promise.then(function(compare){
            $scope.compareList = compare;
            $scope.$apply();
        }, function(error) {
            console.error("Failed!", error);
            showPageError();
        });

    };
    $scope.removeFromCompare = function(w, $event){

        var index = $scope.compareList.indexOf(w);
        if (index > -1) {
            $scope.compareList.splice(index, 1);
            var promise = checkCompareStorage($scope.compareList, true);
            promise.then(function(compare){
                $scope.compareList = compare;
            }, function(error) {
                console.error("Failed!", error);
                showPageError();
            });
        }
    };

    $scope.hideCompareBig = function(){
        hideClass(".compare-big");
        showClass(".list");
    };
    $scope.showCompareBig = function(){
        if($scope.compareList.length > 0){
            hideClass(".list");
            showClass(".compare-big");
        }


    };
    $scope.nextPage = function(){
        $scope.currentPage++;

        var needed = ($scope.currentPage*$scope.pageSize)+$scope.pageSize;
        if(loadedWines.length >= needed){
            $scope.browseList = loadedWines.slice($scope.currentPage*$scope.pageSize,needed);
        }else{
            hideClass(".browse .list ul li");
            showClass(".browse .list ul .loader-div");
            //add 100 wines to storage
            var promise = addWinesToStorage("wines", jsonPopular+catRedWhiteRose, $scope.currentPage*$scope.pageSize, 100);
            promise.then(function(data){
                loadedWines = data;
                console.log(loadedWines.length);
                console.log(loadedWines);
                $scope.browseList = data.slice(($scope.currentPage*$scope.pageSize)-$scope.pageSize,needed);
                console.log($scope.browseList);
                console.log("current: "+loadedWines.length+" needed: "+needed);
                $scope.$apply();

                hideClass(".browse .list ul .loader-div");
                setTimeout(function(){showClass(".browse .list ul li");}, 500);
            }, function(error) {
                console.error("Failed!", error);
                showPageError();
            });

        }

    };

    $scope.previousPage = function(){
        $scope.currentPage--;
        var needed = ($scope.currentPage*$scope.pageSize)+$scope.pageSize;
        if(loadedWines.length > needed){
            $scope.browseList = loadedWines.slice($scope.currentPage*$scope.pageSize,needed);
        }else{
            hideClass(".browse .list ul li");
            showClass(".browse .list ul .loader-div");
            //add 100 wines to storage
            var promise = addWinesToStorage("wines", jsonPopular+catRedWhiteRose, $scope.currentPage*$scope.pageSize, 100);
            promise.then(function(data){
                loadedWines = data;
                $scope.browseList = data.slice(($scope.currentPage*$scope.pageSize),needed);
                console.log($scope.browseList);
                $scope.$apply();
                hideClass(".browse .list ul .loader-div");
                setTimeout(function(){showClass(".browse .list ul li");}, 500);
            }, function(error) {
                console.error("Failed!", error);
                showPageError();
            });
        }
    };

    $scope.grepLength = function(list, w){
        var result = $.grep(list, function(e){ return e.Name == w.Name; });
        return result.length;
    };

    $scope.detailsList = [];
    $scope.addToDetails = function(w){
        $scope.detailsList[0] = w;
        setTimeout(function(){showClass(".wineDetails");}, 300);
    };
    $scope.hideDetails = function(){
        hideClass(".wineDetails");
        $scope.detailsList = [];
    };

    $scope.searchList = [];
    $scope.searching = false;
    $scope.search = function(){
        var input = $("#search")[0].value;

        if(input.length > 0){
            input = input.replace(" ", "+");

            hideClass(".browse .list ul li");
            showClass(".browse .list ul .loader-div");

            var promise = searchWine(input);
            promise.then(function(search){
                $scope.searchList = search;
                $scope.currentPage = 0;
                $scope.searching = true;
                $scope.$apply();
                hideClass(".browse .list ul .loader-div");
                setTimeout(function(){showClass(".browse .list ul li");}, 500);
            }, function(error) {
                console.error("Failed!", error);

                $scope.searching = true;
                $scope.searchList = [];

                $scope.error = true;
                $scope.errorMessage = "No results were found. :(";
                $scope.$apply();
                hideClass(".browse .list ul .loader-div");
                setTimeout(function(){showClass(".browse .list ul li");}, 500);
            });
            promise.fail(function(){

            });


        }else{
            $scope.searching = false;
        }


    }

});



function getCertainWines(list, start, length){
    var result = [];

        for (i = start; i < start+length; i++) {
            if(list[i] != null){
                try {
                    var value = list[i];
                    angular.forEach(value.ProductAttributes, function(a, key){
                        a.Name = a.Name.replace("&amp;","&");
                        a.Name = a.Name.replace("&AMP;","&");
                    });
                    var w = new Wijn(value.Id, value.Name, value.Url, value.Appellation.Name, value.Appellation.Region.Name, value.Labels[0].Url, value.Varietal.Name, value.Varietal.WineType.Name, value.Vineyard.Name, value.Vineyard.ImageUrl, value.Community.Reviews.HighestScore, value.Ratings.HighestScore, value.PriceRetail, value.ProductAttributes, value.Url);
                    result.push(w);
                }catch(err){
                        console.log(err);
                        console.log(value);
                        console.log(list);
                    console.error("Failed!", error);
                    showPageError();
                    }
            }

        }
    return result;
}

function checkCompareStorage(currentList, bRemove){
    var def = $.Deferred();

    var compareList = [];
    //check for cookies
    if(typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.

        if(localStorage.getItem("compare") && currentList.length == 0 && bRemove == false){
            compareList = getWinesFromData(JSON.parse(localStorage.getItem("compare")));
            def.resolve(compareList);

        }else{
            //store 100 json objects in localstorage

            var currentIDs = "";
            if(currentList.length > 0){

                angular.forEach(currentList, function(value, key){
                    currentIDs += value.Id+"+";
                });
                currentIDs = currentIDs.substring(0, currentIDs.length-1);

                promiseJSONDefault("http://services.wine.com/api/beta2/service.svc/json/catalog?apikey="+apikey+"&filter=product("+currentIDs+")")
                    .done(function(compare){
                        compareList = getWinesFromData(compare);
                        console.log(compareList.length - currentList.length);
                        if((compareList.length - currentList.length) > 0){
                            console.log("extra wijn");
                            compareList.shift();
                            compare.shift();
                            console.log(compareList.length - currentList.length);
                        }
                        var string = JSON.stringify(compare);
                        localStorage.setItem("compare", string);
                        def.resolve(compareList);
                    })
                    .fail(function(){
                        console.log("Problem when storing currentlist");
                        showPageError();
                        def.reject();
                    });
            }else{
                localStorage.setItem("compare", "");
                def.resolve(compareList);
            }
        }
    }
    return def.promise();
}

