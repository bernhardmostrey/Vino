/**
 * Created by bernhard on 26/11/14.
 */

app.controller("YearsController", function($scope) {
    //voor elk jaar nu -> 1964, de 10 beste wijnen laden
    getTop10OfLastIYears(10);

});

function getTop10OfLastIYears(years){
    for(var i = (2014 - years); i <= 2014; i++){
        console.log("Get "+i);
        promiseJSON(jsonPopular+catRedWhiteRose+"&search"+i, 15, 0).done(function(data){
            console.log(data);
        });
    }
}