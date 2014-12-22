/**
 * Created by bernhard on 26/11/14.
 */

app.controller("YearsController", function($scope) {
    //voor elk jaar nu -> 1964, de 10 beste wijnen laden

    var selectedYear = 1990;
    var years = {};


    if(localStorage.getItem("years")){
        var json = JSON.parse(localStorage.getItem("years"));

        for(var i = (2014 - 30)+1; i <= 2014; i++) {
            years[i] = [];
            for(var i2 = 0; i2 < json[i].length; i2++){
                var value = json[i][i2];
                var w = new Wijn(value.id, value.name, value.url, value.appellationName, value.regionName, value.labelUrl, value.varietal, value.wineType, value.vineyardName, value.vineyardImage, value.highestReview, value.highestRating, value.priceRetail, value.attributes);

                years[i].push(w);
            }


        }

        console.log(years);
    }else{
        var wines = getTop10OfLastIYears(30);

        wines.done(function(data){
            /*var result = $.grep(data, function(e){ return e.Year == selectedYear; });
             console.log(result);*/
            $(".years-div").text("All glasses poured! :)");


            for(var i = (2014 - 30)+1; i <= 2014; i++) {
                //var result = $.grep(data, function(e){ return e.Year == i; });
                years[i] = $.grep(data, function(e){ return e.Year == i; });
                var string = JSON.stringify(years);
                localStorage.setItem("years", string);
            }
            console.log(years);

        });

        wines.progress(function(p){
            $(".years-div").text("Pouring wine bottle "+p+" of 30...");
        });
    }





});

function getTop10OfLastIYears(years){

    var def = $.Deferred();

    var list = [];
    var promises = [];
    var wines = [];
    var progress = 0;
    for(var i = (2014 - years)+1; i <= 2014; i++){
        var promise = promiseJSON(jsonPopular+catRedWhiteRose+"&search="+i, 15, 0)
        promise.done(function(data){
            var temp = getWinesFromData(data);
            list.push(temp);

            promises.push(promise);

            def.notify(progress++);

            if(promises.length == years){
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