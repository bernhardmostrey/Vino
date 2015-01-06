/**
 * Created by bernhard on 26/11/14.
 */

    var app = angular.module('app', ['ngRoute']);
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'home/home.html',
                controller: 'HomeController'
            }).
            when('/browse', {
                templateUrl: 'browse/index.html',
                controller: 'BrowseController'
            }).
            when('/map', {
                templateUrl: 'map/index.html',
                controller: 'MapController'
            }).
            when('/label', {
                templateUrl: 'label/index.html',
                controller: 'LabelController'
            }).
            when('/years', {
                templateUrl: 'years/index.html',
                controller: 'YearsController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

app.directive('fallbackSrc', function () {
    var fallbackSrc = {
        link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function() {
                angular.element(this).attr("src", iAttrs.fallbackSrc);
            });
        }
    }
    return fallbackSrc;
});

/*app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});*/

/*var jsonFrance = "http://services.wine.com/api/beta2/service.svc/json/catalog?apikey=21d7fc7d0b855bad2ce0330eaf84bedc&sortBy=popularity&filter=categories(490+10038+10039+102)";
var jsonItaly = "http://services.wine.com/api/beta2/service.svc/json/catalog?apikey=21d7fc7d0b855bad2ce0330eaf84bedc&sortBy=popularity&filter=categories(7155+105)";
var jsonSpain = "http://services.wine.com/api/beta2/service.svc/json/catalog?apikey=21d7fc7d0b855bad2ce0330eaf84bedc&sortBy=popularity&filter=categories(7155+109)";*/
var jsonPopular = "http://services.wine.com/api/beta2/service.svc/json/catalog?apikey=21d7fc7d0b855bad2ce0330eaf84bedc&sortBy=popularity|descending";
var jsonRating = "http://services.wine.com/api/beta2/service.svc/json/catalog?apikey=21d7fc7d0b855bad2ce0330eaf84bedc&sortBy=rating|descending";
var catRedWhiteRose = "&filter=categories(490+124+125+126)";
var catFrance = "&filter=categories(490+124+125+126+10039+10038+102)";
var catItaly = "&filter=categories(490+124+125+126+105)";
var catSpain = "&filter=categories(490+124+125+126+109)";
var catAmerica = "&filter=categories(490+124+125+126+101+103+104)";
var catAll = "&filter=categories(490+124+125+126+10039+10038+102+105+109+101+103+104)";

var onlinePopular = [];
function promiseJSON500(json){
    var defer = $.Deferred();
    var count = 0;
    var promise1 = $.getJSON(json);
    var promise2 = $.getJSON(json+"&offset=100");
    var promise3 = $.getJSON(json+"&offset=200");
    var promise4 = $.getJSON(json+"&offset=300");
    var promise5 = $.getJSON(json+"&offset=400");
    var list = [];
    /*var list1 = [];
    var list2 = [];
    var list3 = [];
    var list4 = [];
    var list5 = [];*/
    $.when(promise1).done(function(){
        count++;
        defer.notify(count);
        //list1.push(promise1.responseJSON.Products.List);
    });
    $.when(promise2).done(function(){
        count++;
        defer.notify(count);
        //list2.push(promise2.responseJSON.Products.List);
    });
    $.when(promise3).done(function(){
        count++;
        defer.notify(count);
        //list3.push(promise3.responseJSON.Products.List);
    });
    $.when(promise4).done(function(){
        count++;
        defer.notify(count);
        //list4.push(promise4.responseJSON.Products.List);
    });
    $.when(promise5).done(function(){
        count++;
        defer.notify(count);
        //list5.push(promise5.responseJSON.Products.List);
    });
    $.when(promise1, promise2, promise3, promise4, promise5).done(function() {
        list = promise1.responseJSON.Products.List.concat(promise2.responseJSON.Products.List).concat(promise3.responseJSON.Products.List).concat(promise4.responseJSON.Products.List).concat(promise5.responseJSON.Products.List);
        defer.resolve(list);
    });
    return defer.promise();
}
function promiseJSON(json, size, offset){
    var defer = $.Deferred();
    var promise = $.getJSON(json+"&offset="+offset+"&size="+size).error(function() { defer.reject(); });
    $.when(promise).done(function(){
        if(promise.responseJSON.Products.List.length >= 1){
            defer.resolve(promise.responseJSON.Products.List);
        }else{
            defer.reject();
        }
    });
    $.when(promise).fail(function(){
        defer.reject();
    });
    return defer.promise();
}
function promiseJSONDefault(json){
    var defer = $.Deferred();
    var promise = $.getJSON(json).error(function() { defer.reject(); });
    $.when(promise).done(function(){
        if(promise.responseJSON.Products.List.length >= 1){
            defer.resolve(promise.responseJSON.Products.List);
        }else{
            defer.reject();
        }
    });
    $.when(promise).fail(function(){
        defer.reject();
    });
    return defer.promise();
}

var offlinePopular = [];
function promiseJSONOffline(json){
    var defer = $.Deferred();
    var promise1 = $.getJSON(json);
    $.when(promise1).done(function() {
        defer.resolve(promise1.responseJSON.Products.List);
    });
    return defer.promise();
}

function hideClass(klasse){
    $(klasse).fadeOut();
}
function showClass(klasse){
    $(klasse).fadeIn();
}
function showClass(klasse, time){
    $(klasse).fadeIn(time);
}

var createCookie = function(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function checkStorage(storagename, json, begin, length){
    var def = $.Deferred();

    var loadedWines = [];
    //check for cookies
    if(typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.

        if(localStorage.getItem(storagename) && JSON.parse(localStorage.getItem(storagename).length >= 100)){

            loadedWines = getWinesFromData(JSON.parse(localStorage.getItem(storagename)));
            console.log("just load");
            def.resolve(loadedWines);

        }else{
            //store 100 json objects in localstorage
            console.log("Getting 100 wines for localstorage");
            promiseJSON(json, length, begin)
                .done(function(data){
                    loadedWines = getWinesFromData(data);
                    console.log(loadedWines.length);
                    var string = JSON.stringify(data);
                    localStorage.setItem(storagename, string);
                    console.log("Done getting "+length+" wines for localstorage"+loadedWines.length);
                    def.resolve(loadedWines);
                })
                .fail(function(){
                    console.log("Problem when trying to get 100 wines.");
                    def.reject();
                });

        }
    }
    return def.promise();
}
function addWinesToStorage(storagename, json, begin, length){
    var def = $.Deferred();

    var loadedWines = [];
    //check for cookies
    if(typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.

        if(localStorage.getItem(storagename)){
            console.log("Getting 100 wines for localstorage");
            promiseJSON(json, length, begin)
                .done(function(data){
                    //loadedWines = getWinesFromData(JSON.parse(localStorage.getItem(storagename)));
                    //loadedWines.concat(getWinesFromData(data));
                    var string = JSON.stringify(JSON.parse(localStorage.getItem(storagename)).concat(data));

                    localStorage.setItem(storagename, string);
                    console.log("Done getting 100 wines for localstorage");
                    console.log(JSON.parse(localStorage.getItem(storagename)).length);
                    loadedWines = getWinesFromData(JSON.parse(string));
                    console.log(JSON.parse(localStorage.getItem(storagename)));
                    console.log(loadedWines);
                    def.resolve(loadedWines);
                })
                .fail(function(){
                    console.log("Problem when trying to get 100 wines.");
                    def.reject();
                });
        }
    }

    return def.promise();
}
function getWinesFromData(list){
    var wines = [];
    for (i = 0; i < list.length; i++) {
        try {
            var value = list[i];
            angular.forEach(value.ProductAttributes, function(a, key){
                a.Name = a.Name.replace("&amp;","&");
                a.Name = a.Name.replace("&AMP;","&");
            });
            var w = new Wijn(value.Id, value.Name, value.Url, value.Appellation.Name, value.Appellation.Region.Name, value.Labels[0].Url, value.Varietal.Name, value.Varietal.WineType.Name, value.Vineyard.Name, value.Vineyard.ImageUrl, value.Community.Reviews.HighestScore, value.Ratings.HighestScore, value.PriceRetail, value.ProductAttributes, value.Url);

            wines.push(w);
        }catch(err){
            console.log(err);
            console.log(w);
        }

    }
    return wines;
}

function showPageError(){
    $(".error").html("Something went wrong, try reloading the page...");
    showClass(".error");
    $("html, body").animate({ scrollTop: 0 });
    setTimeout(function(){hideClass(".error")}, 5000);
}