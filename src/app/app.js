/**
 * Created by bernhard on 26/11/14.
 */

    var app = angular.module('app', []);

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
    $.when(promise).done(function(){
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