/**
 * Created by bernhard on 10/12/14.
 */
app.controller("MapController", function($scope) {
    resetMapHeight();

    var promise = mapInitPan("America", 50);
    promise.done(function(){
        $(".loader-div").animate({opacity: 0}, 1000, function(){
            $(".loader-div").hide();
        });
        $("#map").animate({opacity: 1}, 1000);
        l = new Object({lat: 47, long: 1});
        PanTo(l.lat, l.long);
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


});

function resetMapHeight(){
    availableHeight = window.innerHeight - 180;
    $("#map").css("height", availableHeight+"px");
}