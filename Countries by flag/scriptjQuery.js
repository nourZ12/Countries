window.addEventListener("load", function(){
    var loader = document.querySelector('.loader');
    loader.className += " fade";
});
var countriesFlags;
fetch("https://restcountries.eu/rest/v2/all?fields=flag;name;numericCode;capital;region;alpha3Code")
    .then( res => {return res.json();})
    .then( data => initialize(data))
    .catch(error => alert("Error"+error));

function initialize (data){
    countriesFlags = data;
    var classRow = "row mr-0  style-row", classColumn= "col pt-5 pl-4", classCard = "card style-card card-background", classImg = "card-img-top";
    var lenOfCountries = countriesFlags.length;
    var divMain = $("<div></div>").attr({'class': classRow});
    for(var i=0; i< lenOfCountries; i++){
        //overlay
        var overlay = document.createElement('div');
        creationOfOverlay(overlay, i);
        // Card creation + attrivutes
        var cardDiv = $("<div></div>").attr({
            "class" : classCard,
            "style" : "background-image: url("+countriesFlags[i].flag+")"
        }).append(overlay);
        // column creation + adding attributes
        var columnDiv = $("<div></div>").attr({"class" : classColumn}).append(cardDiv);
        $(divMain).append(columnDiv);
    }
    $("body").append(divMain);
}
function creationOfOverlay (overlay, i){
    //Header of overlay with country name
    var nameTitle = $("<h3></h3>").text(countriesFlags[i].name);
    //Brief imformation on overlay card
    var briefInfo = $("<p></p>").html("Code: " + countriesFlags[i].numericCode + "<br> Capital: " + countriesFlags[i].capital + "<br> Region: " + countriesFlags[i].region);
    var aLink = $("<a></a>").text("More Details").attr({"href" : "countries-details.html?AlphaCode="+countriesFlags[i].alpha3Code });
    //Button Details and attributes
    var moreDetailsButton = $("<button></button>").append(aLink).attr({ "name" : "AlphaCode" , "value" : countriesFlags[i].alpha3Code,
                               "class" : "btn btn-secondary " });
    $(overlay).attr({ "class" : "overlay"}).append(nameTitle,briefInfo, moreDetailsButton);
}


