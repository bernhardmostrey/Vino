/**
 * Created by bernhard on 26/11/14.
 */

app.controller("MainController", function($scope) {

    $scope.wines = [];
    $scope.sortOrder = "Year";

    hideClass(".timeline-div ul");
    showClass(".timeline-div .loader-div");
    $scope.showError = false;
    console.log("Getting 50 best rated wines...");




    var promise = promiseJSON(jsonRating+catRedWhiteRose, 200, 0);
    promise.done(function(data){
        angular.forEach(data, function(value, key){
            var w = new Wijn(value.Id, value.Name, value.Url, value.Appellation.Name, value.Appellation.Region.Name, value.Labels[0].Url, value.Varietal.Name, value.Varietal.WineType.Name, value.Vineyard.Name, value.Vineyard.ImageUrl, value.Community.Reviews.HighestScore, value.Ratings.HighestScore, value.PriceRetail, value.ProductAttributes);
            $scope.wines.push(w);
        });




        var uniqueWines = [];
        var uCount = 0;
        for(var i = 1950; i <= 2014;i++){
            var result = $.grep($scope.wines, function(e){ return e.Year == i; });
            if (result.length == 1) {
                uniqueWines.push(result[0]);
                console.log(result[0].Year);
            }else if(result.length > 1){
                uniqueWines.push(result[0]);
                console.log(result[0].Year);
            }
        }
        console.log(uniqueWines.length);

        $scope.wines = uniqueWines;
        $(".timeline").css("width", (uniqueWines.length * 184).toString());
        $scope.$apply();


        hideClass(".timeline-div .loader-div");
        setTimeout(function(){showClass(".timeline-div ul")}, 500);

    });
    promise.fail(function(){
        $scope.error = "Something went wrong while pouring the wine :(";
        $scope.showError = true;
    });


    /*var promise = promiseJSON(jsonRating+catRedWhiteRose, 50, 0);
     promise.done(function(data){
     angular.forEach(data, function(value, key){
     var w = new Wijn(value.Id, value.Name, value.Url, value.Appellation.Name, value.Appellation.Region.Name, value.Labels[0].Url, value.Varietal.Name, value.Varietal.WineType.Name, value.Vineyard.Name, value.Vineyard.ImageUrl, value.Community.Reviews.HighestScore, value.Ratings.HighestScore, value.PriceRetail, value.ProductAttributes);
     $scope.wines.push(w);
     });

     $scope.showLoader = false;
     $scope.showTimeline = true;
     $scope.$apply()
     });
     promise.fail(function(){
     $scope.error = "Something went wrong while pouring the wine :(";
     $scope.showLoader = false;
     $scope.showError = true;
     $scope.$apply()
     });*/

    /*$(".timeline").mousewheel(function(event, delta) {

     this.scrollLeft -= (delta * 30);

     event.preventDefault();

     });*/


    //progress bar
    //$scope.progressValue = 0;
    //$scope.progressText = "";

    //JSON inladen
    //getJSON(jsonPopular, 20, 0, "Getting 20 popular wines...");
    //getFrance($scope);
    //getItaly();
    //getSpain();
    //als gelukt, timeline tonen

    //als niet gelukt fout geven
});

function showLoadError(message){
    $("#wines").html('<div class="error">'+message+'</div>');
}

function getWineOfEeachYear(){
    $scope.wines = [];
    for(var i = 1950; i <= 2014; i++){
        var promise = promiseJSON(jsonRating+catRedWhiteRose+"&search="+i, 1, 0);
        promise.done(function(data){
            var w = new Wijn(value.Id, value.Name, value.Url, value.Appellation.Name, value.Appellation.Region.Name, value.Labels[0].Url, value.Varietal.Name, value.Varietal.WineType.Name, value.Vineyard.Name, value.Vineyard.ImageUrl, value.Community.Reviews.HighestScore, value.Ratings.HighestScore, value.PriceRetail, value.ProductAttributes);
            $scope.wines.push(w);
        });
        promise.fail();
    }
}