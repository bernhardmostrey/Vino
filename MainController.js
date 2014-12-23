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

    $scope.detailsList = [];
    $scope.addToDetails = function(w){
        $scope.detailsList[0] = w;
    };
    $scope.hideDetails = function(){
        hideClass(".wineDetails");
        $scope.detailsList = [];
    };

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

