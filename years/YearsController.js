/**
 * Created by bernhard on 26/11/14.
 */

app.controller("YearsController", function($scope) {
    //voor elk jaar nu -> 1964, de 10 beste wijnen laden

    var numberOfYears = 30;
    var years = [];
    $scope.selectedYear = [];


    if(localStorage.getItem("years")){
        var json = JSON.parse(localStorage.getItem("years"));

        for(var i = (2014 - numberOfYears)+1; i <= 2014; i++) {
            //years[i] = [];

            var year = new Object();
            year.year = i;
            year.wines = [];

            var currentYear = i+numberOfYears-1-2014;
            currentWines = json[currentYear].wines;
            for(var i2 = 0; i2 < currentWines.length; i2++){
                var value = currentWines[i2];
                var w = new Wijn(value.id, value.name, value.url, value.appellationName, value.regionName, value.labelUrl, value.varietal, value.wineType, value.vineyardName, value.vineyardImage, value.highestReview, value.highestRating, value.priceRetail, value.attributes);

                year.wines.push(w);
            }

            years.push(year);

        }

        $scope.years = years;
        $scope.selectedYear = years[numberOfYears-30];
    }else{
        $("#year-list").append('<div class="loader-div"><span class="loader"><span class="loader-inner"></span></span></div>');
        var wines = getTop10OfLastIYears(numberOfYears);

        wines.then(function(data){
            $(".years-div").text("All glasses poured! :)");


            for(var i = (2014 - numberOfYears)+1; i <= 2014; i++) {
                //var result = $.grep(data, function(e){ return e.Year == i; });
                var year = new Object();
                year.year = i;
                year.wines = [];
                year.wines = $.grep(data, function(e){ return e.Year == i; });
                years.push(year);
            }
            var string = JSON.stringify(years);
            localStorage.setItem("years", string);
            $scope.years = years;
            $scope.selectedYear = years[numberOfYears-30];
            console.log($scope.selectedYear);
            //location.reload();

            $("#year-list .loader-div").remove();
            $scope.$apply();
        }, function(error) {
            console.error("Failed!", error);
            showPageError();
        });

        wines.progress(function(p){
            $(".years-div").text("Pouring wine bottle "+p+" of "+numberOfYears+"...");
        });
    }


    $scope.prevYear = function() {
        find = $.grep($scope.years, function(e){return e.year == $scope.selectedYear.year - 1});
        if(find.length > 0)$scope.selectedYear = find[0];
    };
    $scope.nextYear = function(){
        find = $.grep($scope.years, function(e){return e.year == $scope.selectedYear.year + 1});
        if(find.length > 0)$scope.selectedYear = find[0];
    };
    $scope.detailsList = [];
    $scope.addToDetails = function(w){
        //console.log(w);
        $scope.detailsList[0] = w;
        setTimeout(function(){showClass(".wineDetails");}, 300);
    };
    $scope.hideDetails = function(){
        hideClass(".wineDetails");
        $scope.detailsList = [];
    };


});

function getTop10OfLastIYears(numberOfYears){

    var def = $.Deferred();

    var list = [];
    var promises = [];
    var wines = [];
    var progress = 0;
    for(var i = (2014 - numberOfYears)+1; i <= 2014; i++){
        var promise = promiseJSON(jsonPopular+catRedWhiteRose+"&search="+i, 15, 0)
        promise.done(function(data){
            var temp = getWinesFromData(data);
            list.push(temp);

            promises.push(promise);

            def.notify(progress++);

            if(promises.length == numberOfYears){
                $.when(promises).done(function(data){

                    var merged = [];
                    merged = merged.concat.apply(merged, list);
                    def.resolve(merged);
                });
            }
        });


    }

    return def.promise();
}