/**
 * Created by bernhard on 10/12/14.
 */
app.controller("MapController", function($scope) {
    resetMapHeight();

    var promise = mapInitPan("America", 50);
    promise.then(function(){
        $(".loader-div").animate({opacity: 0}, 1000, function(){
            $(".loader-div").hide();
        });
        $("#map").animate({opacity: 1}, 1000);
        l = new Object({lat: 47, long: 1});
        PanTo(l.lat, l.long);
    }, function(error) {
        console.error("Failed!", error);
        showPageError();
    });

    promise.progress(function(data){
        console.log(data);
        $(".loader-div .message").html(data);
    });


    $( window ).resize(function() {
        resetMapHeight();
    });

    $scope.panTo = function(pan){
        var l;
        switch(pan){
            case "France":
                //l = BerekenMapCenterEnMaakMap(wijnenF);
                l = new Object({lat: 47, long: 1});
                break;
            case "Italy":
                //l = BerekenMapCenterEnMaakMap(wijnenI);
                l = new Object({lat: 42, long: 12});
                break;
            case "Spain":
                //l = BerekenMapCenterEnMaakMap(wijnenS);
                l = new Object({lat: 40, long: -3});
                break;
            case "America":
                //l = BerekenMapCenterEnMaakMap(wijnenA);
                l = new Object({lat: 40, long: -120});
                break;
        }
        PanTo(l.lat, l.long);
    };

    $scope.detailsList = [];
    $scope.addToDetails = function(w){
        $scope.detailsList[0] = w;
        setTimeout(function(){showClass(".wineDetails");}, 300);
    };
    addToDetailsString = function(id){
        console.log("klik");
        promiseJSONDefault("http://services.wine.com/api/beta2/service.svc/json/catalog?apikey="+apikey+"&filter=product("+id+")")
            .done(function(found){
                if(found.length > 0){
                    search = getWinesFromData(found);
                    $scope.detailsList[0] = search[0];
                    $scope.$apply();
                    setTimeout(function(){showClass(".wineDetails");}, 300);
                }else{
                    showPageError();
                }


            })
            .fail(function(){
                console.log("Problem when storing currentlist");
                showPageError();
            });
    };
    $scope.hideDetails = function(){
        hideClass(".wineDetails");
        $scope.detailsList = [];
    };


});

function resetMapHeight(){
    if(window.innerWidth > 550){
        availableHeight = window.innerHeight - 180;
    }else{
        availableHeight = window.innerHeight - 265;
    }

    $("#map").css("height", availableHeight+"px");
}