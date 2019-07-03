var alphaCodeFromURL = new URLSearchParams(window.location.search);
alphaCodeFromURL = alphaCodeFromURL.get('AlphaCode');
var createSpan, i=0,y=0;

fetch('https://restcountries.eu/rest/v2/alpha/'+alphaCodeFromURL)
    .then( res => { return res.json();})
    .then( data => initialize(data))

function initialize(data){
    countriesInfo = data;
    document.querySelector('#flag').src = countriesInfo.flag;
    document.getElementById('name').innerHTML = countriesInfo.name;
    document.getElementById('native-name').innerHTML = countriesInfo.nativeName;
    document.getElementById('alpha-code').innerHTML = countriesInfo.alpha3Code;
    document.getElementById('capital').innerHTML = countriesInfo.capital;
    document.getElementById('region').innerHTML = countriesInfo.region;
    document.getElementById('subregion').innerHTML = countriesInfo.subregion;
    document.getElementById('code').innerHTML = countriesInfo.numericCode;
    document.getElementById('population').innerHTML = countriesInfo.population;
    //borders array
    createBordersColumn();
    //Calling codes
    createCallingCodeColumn();
    //Currencies
    createCurrenciesColumn();
    //Languages
    createLanguagesColumn();
    //Lat-Lng
    document.getElementById('lat').innerHTML = countriesInfo.latlng[0];
    document.getElementById('lng').innerHTML = countriesInfo.latlng[1];

}

function createBordersColumn(){
    var borders = document.getElementById('borders');
    var bordersLength = countriesInfo.borders.length;
    if ( bordersLength == 0 ){
        createSpan = document.createElement('span');
        createSpan.innerHTML = 'No Borders';
        borders.appendChild(createSpan);
    }
    for(i=0; i < bordersLength ; i++){
        createSpan = document.createElement('span');
        borders.appendChild(createSpan);
        if( i == (bordersLength-1)){
            createSpan.innerHTML = countriesInfo.borders[i]+'.';
            break;
        }
        createSpan.innerHTML = countriesInfo.borders[i]+' ,';
    }
}
function createCallingCodeColumn(){
    var callingCodes = document.getElementById('calling-codes');
    var callingLength = countriesInfo.callingCodes.length;
    for(i=0; i < callingLength ; i++){
        createSpan = document.createElement('span');
        callingCodes.appendChild(createSpan);
        if( i == (callingLength - 1)){
            createSpan.innerHTML = countriesInfo.callingCodes[i]+'.';
            break;
        }
        createSpan.innerHTML = countriesInfo.callingCodes[i]+' ,';
    }
}
function createCurrenciesColumn(){
    var currencies = document.getElementById('currencies');
    var currencyLength = countriesInfo.currencies.length;
    var ulList , liList, liList1, liList2;
    createSpan = document.createElement('span');
    for(i=0; i < currencyLength ; i++){
        for (y=0 ; y < 3 ; y++ ){
            ulList = document.createElement('ul');
            liList = document.createElement('li');
            liList.innerHTML = 'Name: ' + countriesInfo.currencies[i].name;
            liList1 = document.createElement('li');
            liList1.innerHTML = 'Code: ' + countriesInfo.currencies[i].code;
            liList2 = document.createElement('li');
            liList2.innerHTML = 'Symbol: ' + countriesInfo.currencies[i].symbol;
            ulList.append(liList,liList1,liList2);	

        }
        createSpan.appendChild(ulList);
    }
    currencies.appendChild(createSpan);
}
function createLanguagesColumn(){
    var languageColumn = document.getElementById('lang');
    var langLength = countriesInfo.languages.length;
    for(var i=0; i< langLength; i++){ 
        var ulListHolder = document.createElement('ul');
        var liListItem1 = document.createElement('li');
        liListItem1.innerHTML = "-Name: "+countriesInfo.languages[i].name;
        var liListItem2 = document.createElement('li');
        liListItem2.innerHTML = " Native Name: "+countriesInfo.languages[i].nativeName;
        languageColumn.append(liListItem1,liListItem2);
    }
}