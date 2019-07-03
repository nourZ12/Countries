window.addEventListener("load", function(){
   var loader = document.querySelector('.loader');
    loader.className += " fade";
});

var countriesFlags;
fetch("https://restcountries.eu/rest/v2/all?fields=flag;name;numericCode;capital;region;alpha3Code")
    .then( res => {return res.json();})
    .then( data => initialize(data))
    .catch(error => console.error("Error"+error));

function initialize (data){
    
    countriesFlags = data;
    var bodyDOM = document.getElementById('my-body');
    var classRow = "row mr-0  style-row", classColumn= "col pt-5 pl-4", classCard = "card style-card card-background", classImg = "card-img-top";
    var lenOfCountries = countriesFlags.length;
    var divMain = document.createElement('div');
    divMain.setAttribute('class', classRow);
    for(var i=0; i< lenOfCountries; i++){
        //Column
        var columnDiv = document.createElement('div');
        columnDiv.setAttribute('class', classColumn);
        //Card
        var cardDiv = document.createElement('div');
        cardDiv.setAttribute('class', classCard );
        cardDiv.setAttribute('style','background-image: url('+countriesFlags[i].flag+')');
        //Overlay Creation
        var overlay = document.createElement('div');
        creationOfOverlay(overlay, i);
        //Appending elements
        cardDiv.appendChild(overlay);
        columnDiv.appendChild(cardDiv);
        divMain.appendChild(columnDiv);
    }
    bodyDOM.appendChild(divMain);
}
function creationOfOverlay (overlay, i){
    overlay.setAttribute("class", "overlay");
    //Header of overlay with country name
    var nameTitle = document.createElement('h3');
    nameTitle.innerHTML = countriesFlags[i].name;
    //Brief imformation on overlay card
    var briefInfo = document.createElement("p");
    briefInfo.innerHTML = "Code: " + countriesFlags[i].numericCode + "<br> Capital: " + countriesFlags[i].capital + "<br> Region: "+ countriesFlags[i].region;
    overlay.appendChild(nameTitle);
    overlay.appendChild(briefInfo);
    //Button Details and attributes
    var moreDetailsButton = document.createElement('button');
    creationOfDetailsButton(i, moreDetailsButton);
    var aLink = document.createElement('a');
    aLink.innerHTML =  "More Details";
    aLink.setAttribute('href','countries-details.html?AlphaCode='+countriesFlags[i].alpha3Code);
    moreDetailsButton.appendChild(aLink);
    //form to get GET mehod
   //var formRedirect = document.createElement("form");
  //  formRedirect.setAttribute("method", "GET");
  //  formRedirect.setAttribute("action","countries-details.html");
   overlay.appendChild(moreDetailsButton);
   // overlay.appendChild(formRedirect);//
   //formRedirect.appendChild(moreDetailsButton);
}
function creationOfDetailsButton(i,moreDetailsButton ){ 
    moreDetailsButton.setAttribute("name","AlphaCode");
    moreDetailsButton.setAttribute('value', countriesFlags[i].alpha3Code);
    moreDetailsButton.setAttribute('class',"btn btn-secondary ");
    //moreDetailsButton.setAttribute('href', '')
    
    //moreDetailsButton.innerHTML= "More Details";
}

/*setTimeout(() => {
    console.log(countriesFlags)
},500); */
