/**
 * Created by bernhard on 23/12/14.
 */
/*function LabelGame (theName, theEmail) {
    this.name = theName;
    this.email = theEmail;
    this.quizScores = [];
    this.currentScore = 0;
}
​
LabelGame.prototype = {
    constructor: LabelGame,
    saveScore:function (theScoreToAdd)  {
        this.quizScores.push(theScoreToAdd)
    },
    showNameAndScores:function ()  {
        var scores = this.quizScores.length > 0 ? this.quizScores.join(",") : "No Scores Yet";
        return this.name + " Scores: " + scores;
    },
    changeEmail:function (newEmail)  {
        this.email = newEmail;
        return "New Email Saved: " + this.email;
    }
}*/

function LabelGame(){
    this.objects = [];
    this.clicks = [];
}

LabelGame.prototype = {
    constructor: LabelGame,
    determineObjects: function(){
        this.objects.push(new Object("percentage", "80%", "30%", "8%", "7%", "", false, false));
        this.objects.push(new Object("name", "42%", "30%", "42%", "16%", "", false, false));
        this.objects.push(new Object("appellation", "58%", "30%", "42%", "14%", "", false, false));
        this.objects.push(new Object("year", "72%", "45%", "12%", "8%", "", false, false));
        this.objects.push(new Object("type", "37%", "53%", "13%", "8%", "", false, false));
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
    },
    clickListener: function(mouseX, mouseY){

    }
};

function Object(name, top, left, width, height, guessedName, bGuessed, active){
    this.name = name;
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;
    this.guessedName = guessedName;
    this.bGuessed = bGuessed;
    this.active = false;
}
function getHTMLFromList(list){
    var options = "<ul>";
    $.each(list, function(name, value) {
        options += "<li>"+value.name+"</li>";
    });
    return options+"</ul>";
}