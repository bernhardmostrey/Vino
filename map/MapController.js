/**
 * Created by bernhard on 10/12/14.
 */
app.controller("MapController", function($scope) {
    resetMapHeight();
    initMap();



    $( window ).resize(function() {
        resetMapHeight();
    });
});

function resetMapHeight(){
    availableHeight = window.innerHeight - 180;
    $("#map").css("height", availableHeight+"px");
}

function initMap() {
    var mapOptions = {
        center: { lat: -34.397, lng: 150.644},
        zoom: 8
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
}