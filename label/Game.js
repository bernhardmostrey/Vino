/**
 * Created by bernhard on 23/12/14.
 */
function LabelGame(){
    this.objects = [];
    this.clicks = [];
};

LabelGame.prototype = {
    constructor: LabelGame,
    determineObjects: function(){
        this.objects.push(new GameObject("percentage", "80%", "30%", "8%", "7%", "", false, false));
        this.objects.push(new GameObject("name", "42%", "30%", "42%", "16%", "", false, false));
        this.objects.push(new GameObject("appellation", "58%", "30%", "42%", "14%", "", false, false));
        this.objects.push(new GameObject("year", "72%", "45%", "12%", "8%", "", false, false));
        this.objects.push(new GameObject("type", "37%", "53%", "13%", "8%", "", false, false));
    },
    drawObjects: function(){
        $("#label").find(".object").remove();
        $.each(this.objects, function(name, value){
            if(value.active)var newObject = $( '<div class="object active" onclick=\'selectedObjectChange("'+value.name+'")\' style="width: '+value.width+'; height: '+value.height+'; top: '+value.top+'; left: '+value.left+'"></div>' );
            if(!value.active)var newObject = $( '<div class="object" onclick=\'selectedObjectChange("'+value.name+'")\' style="width: '+value.width+'; height: '+value.height+'; top: '+value.top+'; left: '+value.left+'"></div>' );
            $("#label").append(newObject);
        });
    },
    resetActive: function(){
        $.each(this.objects, function(name, value){
           value.active = false;
        });
    },
    getObjectNamesList: function(){
        var list = [];
        $.each(this.objects, function(name, value) {
            list.push(value.name);
        });
        return list;
    },
    getObjects: function(){
        return this.objects;
    }
};

function GameObject(name, top, left, width, height, guessedName, bGuessed, active){
    this.name = name;
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;
    this.guessedName = guessedName;
    this.bGuessed = bGuessed;
    this.active = false;
};
function getHTMLFromList(list){
    var options = "<ul>";
    $.each(list, function(name, value) {
        options += "<li>"+value.name+"</li>";
    });
    return options+"</ul>";
};