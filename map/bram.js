/**
 * Created by bernhard on 27/12/14.
 */
var mapLat = 0;
var mapLong = 0;
var mapZoom = 6;
//var WijnArray = [];
var wijnenF = [];
var wijnenI = [];
var wijnenS = [];
var wijnenA = [];


var infowindow = new google.maps.InfoWindow();
var map;
var marker, i;
var markers = [];

var MapStyle = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"hue":"#ff4400"}]},{"featureType":"landscape.natural.landcover","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"saturation":"38"},{"gamma":"6.33"},{"color":"#f2d9d4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}];

/*function mapInit(region, length){
    var def = $.Deferred();
    var promise;
    var wines;
    switch(region){
        case "France":
            promise = checkMapStorage("mapFrance", jsonPopular+catFrance, length, 0);
        break;
        case "Italy":
            promise = checkMapStorage("mapItaly", jsonPopular+catItaly, length, 0);
            break;
        case "Spain":
            promise = checkMapStorage("mapSpain", jsonPopular+catSpain, length, 0);
            break;
        case "America":
            promise = checkMapStorage("mapAmerica", jsonPopular+catAmerica, length, 0);
            break;
        case "All":
            var count = 0;
            var promise1 = checkMapStorage("mapFrance", jsonPopular+catFrance, length, 0).done(function(data){
                count++;
                def.notify("Done with "+count+" of 4 winebottles.");
            });
            var promise2 = checkMapStorage("mapItaly", jsonPopular+catItaly, length, 0).done(function(data){
                count++;
                def.notify("Done with "+count+" of 4 winebottles.");
            });
            var promise3 = checkMapStorage("mapSpain", jsonPopular+catSpain, length, 0).done(function(data){
                count++;
                def.notify("Done with "+count+" of 4 winebottles.");
            });
            var promise4 = checkMapStorage("mapAmerica", jsonPopular+catAmerica, length, 0).done(function(data){
                count++;
                def.notify("Done with "+count+" of 4 winebottles.");
            });
            $.when(promise1, promise2, promise3, promise4).done(function (d1, d2, d3, d4) {
                BerekenMapCenterEnMaakMap(d1);
                addMarker(d2);
                addMarker(d3);
                addMarker(d4);
                def.resolve();
            });
    }

    if(promise){
        promise.done(function(data){


            BerekenMapCenterEnMaakMap(data);

            promise.fail(function(err){
                console.log("A promise from Bernhard failed: "+err);
            });
            def.resolve();
        });

        promise.fail(function(err){
            console.log("A promise from Bernhard failed: "+err);
            def.reject();
        });
    }

    return def.promise();
}*/
function mapInitPan(pan, length){
    var def = $.Deferred();

    var count = 0;
    var promise1 = checkMapStorage("mapFrance", jsonPopular+catFrance, length, 0).done(function(data){
        count++;
        def.notify("Done with "+count+" of 4 winebottles.");
    });
    var promise2 = checkMapStorage("mapItaly", jsonPopular+catItaly, length, 0).done(function(data){
        count++;
        def.notify("Done with "+count+" of 4 winebottles.");
    });
    var promise3 = checkMapStorage("mapSpain", jsonPopular+catSpain, length, 0).done(function(data){
        count++;
        def.notify("Done with "+count+" of 4 winebottles.");
    });
    var promise4 = checkMapStorage("mapAmerica", jsonPopular+catAmerica, length, 0).done(function(data){
        count++;
        def.notify("Done with "+count+" of 4 winebottles.");
    });
    $.when(promise1, promise2, promise3, promise4).done(function (d1, d2, d3, d4) {

        wijnenF = d1;
        wijnenI = d2;
        wijnenS = d3;
        wijnenA = d4;

        BerekenMapCenterEnMaakMap(d1);
        ToonMap(d1);
        addMarker(d2);
        addMarker(d3);
        addMarker(d4);

        def.resolve();
    });

    return def.promise();
}
function PanTo(lat, long){
    var latLng = new google.maps.LatLng(lat, long);
    map.panTo(latLng);
    console.log("Centered to " +lat +" "+long);
}
function GetWijnLijst(url){
    var gegevens;
    $.ajax({
        url: url,
        dataType: 'json',
        async: false,
        success: function(data) {
            console.log(data);
            console.log("wijn json ingeladen");
            //getWineLocation(data);
            gegevens= data;
        }
    });
    return gegevens;
}

function MaakWijnArray(data){
    console.log("start MaakWijnArrays");
    var TempWineArray=[];
    for (var i = 0; i <= data.length; i++) {
        try{
            //console.log(data[i]);
            var wijn = new Object();



            /*wijn.location = "";
            if(data[i].Appellation.Name.indexOf("Other") < 0){
                wijn.location = data[i].Appellation.Name;
            }else{
                if(data[i].Appellation.Region.Name.indexOf("Other") < 0){
                    wijn.location = data[i].Appellation.Region.Name;
                }
            }
            console.log(wijn.location);*/

            wijn.location = data[i].Appellation.Name+" "+data[i].Appellation.Region.Name;
            console.log(wijn.location);

            wijn.latitude = 666;
            wijn.longitude = 666;
            wijn.name = data[i].Name;
            wijn.url = data[i].Url;
            wijn.label = data[i].Labels[0].Url;
            TempWineArray.push(wijn);
        }
        catch(err)
        {
            console.log("Wijn nummer "+i+" is gefaald");
        }
    }
    return TempWineArray;
}

function GetLatEnLong(Wijnen){
    var def = $.Deferred();

    for (var i = 0; i <= Wijnen.length-1; i++) {

        if(Wijnen[i].location.length > 0 && Wijnen[i].location != ""){
            var basisURL = "http://query.yahooapis.com/v1/public/yql?q=";
            var geoYQL = basisURL + "select * from geo.places where text='"+Wijnen[i].location+"'&format=json";

            $.ajax({
                url: geoYQL,
                dataType: 'json',
                async: false,
                success: function(data) {
                    try {
                        Wijnen[i].latitude=data.query.results.place.centroid.latitude;
                        Wijnen[i].longitude=data.query.results.place.centroid.longitude;
                    }
                    catch(err) {
                        Wijnen[i].latitude=data.query.results.place[0].centroid.latitude;
                        Wijnen[i].longitude=data.query.results.place[0].centroid.longitude;
                    }
                    console.log("geolocatie toegenkend aan locatie "+i + " lat= "+  Wijnen[i].latitude +" en long= "+  Wijnen[i].longitude);
                }
            });
        }else{
            console.log("geen location");
        }


    }


    console.log(Wijnen);
    return def.resolve(Wijnen);;
}

/*function BerekenMapCenterEnMaakMap(Wijnen){
    console.log("dit");
    var long=0;
    var lat = 0;
    for (var i = 0; i <= Wijnen.length-1; i++) {
        if(Wijnen[i].latitude != 666 && Wijnen[i].longitude != 666 && Wijnen[i].location.length > 0){
            lat +=parseFloat(Wijnen[i].latitude);
            long +=parseFloat(Wijnen[i].longitude);
        }

    }
    lat =lat/Wijnen.length;
    long =lat/Wijnen.length;
    mapLat=lat;
    mapLong=long;
    ToonMap(Wijnen);


}*/
function BerekenMapCenterEnMaakMap(Wijnen){

    var l = new Object();
    long=0;
    lat = 0;
    for (var i = 0; i <= Wijnen.length-1; i++) {

        lat +=parseFloat(Wijnen[i].latitude);
        long +=parseFloat(Wijnen[i].longitude);
    }
    lat = lat/Wijnen.length;
    long = lat/Wijnen.length;
    l.lat = lat;
    l.long = long;
    return l;

}
var image = {
    url: '../assets/WineBotleMin.png',
    size: new google.maps.Size(16, 58),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(16, 29)
};
var shape = {
    coords: [1, 1, 1, 58, 16, 58, 16 , 1],
    type: 'poly'
};
function ToonMap(Wijnen){
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: mapZoom,
        center: new google.maps.LatLng(mapLat, mapLong),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    map.setOptions({styles: MapStyle});



    addMarker(Wijnen);

    /*for (var i = 0; i <= Wijnen.length-1; i++) {

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(Wijnen[i].latitude, Wijnen[i].longitude),
            map: map,
            icon: image,
            shape: shape
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                var contentString = '<div id="content"><h2>'+Wijnen[i].location+'</h2><h3>'+Wijnen[i].name+'</h3><button><a href="'+Wijnen[i].url+'">More Info</a></button></div>';
                infowindow.setContent(contentString);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }*/
}
function addMarker(Wijnen) {
    for (var i = 0; i <= Wijnen.length-1; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(Wijnen[i].latitude, Wijnen[i].longitude),
            map: map,
            icon: image,
            shape: shape
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            console.log(Wijnen[i]);
            return function () {
                //var contentString = '<div id="content"><h2>'+Wijnen[i].location+'</h2><h3>'+Wijnen[i].name+'</h3><img src="'+Wijnen[i].label+'" /><button><a target="_blank" href="'+Wijnen[i].url+'">More Info</a></button></div>';
                var contentString = '<div id="content"><h2>'+Wijnen[i].location+'</h2><h3>'+Wijnen[i].name+'</h3><button><a target="_blank" href="'+Wijnen[i].url+'">More Info</a></button></div>';
                infowindow.setContent(contentString);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}

function checkMapStorage(storagename, json, length, begin){
    var def = $.Deferred();

    var loadedWines = [];
    //check for cookies
    if(typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.

        if(localStorage.getItem(storagename) && JSON.parse(localStorage.getItem(storagename).length >= 100)){
            console.log("got wines from storage");
            loadedWines = JSON.parse(localStorage.getItem(storagename));
            /*loadedWines = MaakWijnArray(loadedWines);
            loadedWines = GetLatEnLong(loadedWines);*/
            def.resolve(loadedWines);
        }else{
            //store 100 json objects in localstorage
            promiseJSON(json, length, begin)
                .done(function(data){
                    console.log("try to get wines from api");
                    loadedWines = data;
                    loadedWines = MaakWijnArray(loadedWines);
                    promise = GetLatEnLong(loadedWines);
                    promise.done(function(wines){
                        var string = JSON.stringify(wines);
                        localStorage.setItem(storagename, string);
                        def.resolve(loadedWines);
                    });

                })
                .fail(function(){
                    console.log("Problem when trying to get 100 wines with json"+json);
                    def.reject();
                });

        }
    }
    return def.promise();
}