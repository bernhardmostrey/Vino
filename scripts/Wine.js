/**
 * Created by bernhard on 27/11/14.
 */
/*function Wijn(id, name, url, appellation, labels, type, varietal, vineyard, community, description, priceRetail, ProductAttributes, Ratings) {
 this.id = id;
 this.name = name;
 this.url = url;
 this.appellation = appellation;
 this.labels = labels;
 this.type = type;
 this.varietal = varietal;
 this.vineyard = vineyard;
 this.community = community;
 this.description = description;
 this.priceRetail = priceRetail;
 this.ProductAttributes = ProductAttributes;
 this.Ratings = Ratings;
 //this.attributes = attributes;
 };

 Wijn.prototype = {
 get Id() { return this.id },
 set Id(id) {this.id = id},
 get Name() { return this.name },
 set Name(name) {this.name = name},
 get URL() { return this.url },
 set URL(url) {this.url = url},
 get AppellationName() { return this.appellationName },
 set AppellationName(appellationName) {this.appellationName = appellationName},
 get RegionName() { return this.regionName },
 set RegionName(regionName) {this.regionName = regionName},
 get Label() { return this.label },
 set Label(label) {this.label = label},
 get Varietal() { return this.varietal },
 set Varietal(varietal) {this.varietal = varietal},
 get WineType() { return this.wineType },
 set WineType(wineType) {this.wineType = wineType},
 get VineyardName() { return this.vineyardName },
 set VineyardName(vineyardName) {this.vineyardName = vineyardName},
 get VineyardImage() { return this.vineyardImage },
 set VineyardImage(vineyardImage) {this.vineyardImage = vineyardImage},
 get HighestReview() { return this.highestReview },
 set HighestReview(highestReview) {this.highestReview = highestReview},
 get HighestRating() { return this.highestRating },
 set HighestRating(highestRating) {this.highestRating = highestRating},
 get PriceRetail() { return this.priceRetail },
 set PriceRetail(priceRetail) {this.priceRetail = priceRetail},
 get Attributes() { return this.attributes },
 set Attributes(attributes) {this.attributes = attributes}
 }/*

 /**
 * Created by bernhard on 27/11/14.
 */
function Wijn(id, name, url, appellationName, regionName,labelUrl, varietal, wineType, vineyardName, vineyardImage, highestReview, highestRating, priceRetail, attributes, link) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.appellationName = appellationName;
    this.regionName = regionName;
    this.labelUrl = labelUrl;
    this.varietal = varietal;
    this.wineType = wineType;
    this.vineyardName = vineyardName;
    this.vineyardImage = vineyardImage;
    this.highestReview = highestReview;
    this.highestRating = highestRating;
    this.priceRetail = priceRetail;
    this.attributes = attributes;
    this.link = link;
}

Wijn.prototype = {
    get Id() { return this.id },
    set Id(id) {this.id = id},
    get Name() { return this.name },
    set Name(name) {this.name = name},
    get URL() { return this.url },
    set URL(url) {this.url = url},
    get AppellationName() { return this.appellationName },
    set AppellationName(appellationName) {this.appellationName = appellationName},
    get RegionName() { return this.regionName },
    set RegionName(regionName) {this.regionName = regionName},
    get LabelUrl() { return this.labelUrl },
    set LabelUrl(labelUrl) {this.labelUrl = labelUrl},
    get ImageUrl() {
        var image = this.labelUrl.substr(0, this.labelUrl.length - 5)+"d.jpg";
        var img = new Image();
        img.src = image;

        if(img.width < 100){
            return this.labelUrl;
        }else{
            return this.labelUrl.substr(0, this.labelUrl.length - 5)+"d.jpg";
        }
        //return this.labelUrl.substr(0, this.labelUrl.length - 5)+"d.jpg";
    },
    get Year() {
        //var year = this.name.substr(this.name.length - 4, 4);
        var year = this.name.split(/[^\d]/).filter(function(n){if((n>=1900)&&(n<=2099))return n});
        return year[0];
    },
    //set ImageUrl(imageUrl) {this.imageUrl = imageUrl},
    get Varietal() { return this.varietal },
    set Varietal(varietal) {this.varietal = varietal},
    get WineType() { return this.wineType },
    set WineType(wineType) {this.wineType = wineType},
    get VineyardName() { return this.vineyardName },
    set VineyardName(vineyardName) {this.vineyardName = vineyardName},
    get VineyardImage() { return this.vineyardImage },
    set VineyardImage(vineyardImage) {this.vineyardImage = vineyardImage},
    get HighestReview() { return this.highestReview },
    set HighestReview(highestReview) {this.highestReview = highestReview},
    get HighestRating() { return this.highestRating },
    set HighestRating(highestRating) {this.highestRating = highestRating},
    get PriceRetail() { return this.priceRetail },
    set PriceRetail(priceRetail) {this.priceRetail = priceRetail},
    get Attributes() { return this.attributes },
    set Attributes(attributes) {this.attributes = attributes},
    get Link() { return this.link },
    set Link(link) {this.link = link}
};