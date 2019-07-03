var alphaCodeFromURL = new URLSearchParams(window.location.search);
alphaCodeFromURL = alphaCodeFromURL.get('AlphaCode');

fetch('https://restcountries.eu/rest/v2/alpha/'+alphaCodeFromURL)
    .then( res => { return res.json();})
    .then( data => initialize(data))

function initialize(data){
    countriesInfo = data;
    $("#flag").attr({"src" : countriesInfo.flag});
    $("#name").text(countriesInfo.name);
    $("#native-name").text(countriesInfo.nativeName);
    $("#alpha-code").text(countriesInfo.alpha3Code);
    $("#capital").text(countriesInfo.capital);
    $("#region").text(countriesInfo.region);
    $("#subregion").text(countriesInfo.subregion);
    $("#code").text(countriesInfo.numericCode);
    $("#population").text(countriesInfo.population);
    //borders array
    createBordersColumn();
    //Calling codes
    createCallingCodeColumn();
    //Currencies
    createCurrenciesColumn();
    //Languages
    createLanguagesColumn();
    //Lat-Lng
    $("#lat").text(countriesInfo.latlng[0]);
    $("#lng").text(countriesInfo.latlng[1]);
}

function createBordersColumn(){
    var bordersLength = countriesInfo.borders.length;
    if ( bordersLength == 0 ){
        $("#borders").append( $("<span></span>").text('No Borders'));
    }
    for(var i=0; i < bordersLength ; i++){
        if( i == (bordersLength-1)){
            $("#borders").append( $("<span></span>").text(countriesInfo.borders[i]+' .'));
            break;
        }
        $("#borders").append( $("<span></span>").text(countriesInfo.borders[i]+' ,'));
    }
}
function createCallingCodeColumn(){
    var callingLength = countriesInfo.callingCodes.length;
    for(var i=0; i < callingLength ; i++){
        if( i == (callingLength - 1)){
            $("#calling-codes").append( $("<span></span>").text(countriesInfo.callingCodes[i]+' .'));
            break;
        }
        $("#calling-codes").append( $("<span></span>").text(countriesInfo.callingCodes[i]+' ,'));
    }
}
function createCurrenciesColumn(){
    var currencyLength = countriesInfo.currencies.length;
    for(var i=0; i < currencyLength ; i++){
        for (var y=0 ; y < 3 ; y++ ){
            var liList = $("<li></li>").text('Name: ' + countriesInfo.currencies[i].name);
            var liList1 = $("<li></li>").text('Code: ' + countriesInfo.currencies[i].code);
            var liList2 =  $("<li></li>").text('Symbol: ' + countriesInfo.currencies[i].symbol);
            var ulList = $("<ul></ul>").append(liList,liList1,liList2);
        }
        createSpan = $("<span></span>").append(ulList);
    }
    $("#currencies").append(createSpan);
}
function createLanguagesColumn(){
    var langLength = countriesInfo.languages.length;
    for(var i=0; i< langLength; i++){ 
        var liListItem1 = $("<li></li>").text("-Name: "+countriesInfo.languages[i].name);
        var liListItem2 = $("<li></li>").text(" Native Name: "+countriesInfo.languages[i].nativeName);
        $("#lang").append($("<ul></ul>").append(liListItem1,liListItem2));
    }
}