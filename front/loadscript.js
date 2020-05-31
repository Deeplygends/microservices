$(document).ready(function() {

   // DÃ¨s le chargement on masque l'Ã©lÃ©ment portant l'id #masque
   // grÃ¢ce Ã  la fonction hide() de jQuery
   fillAllBooks();

   $("#bookmenu").on('click', function(){
      fillAllBooks();
   });
   $("#readermenu").on('click', function(){
      fillAllReaders();
   });
   //delet un element
   

   // Faites bien attention Ã  la syntaxe et Ã  l'imbrication des
   // parenthÃ¨ses et accolades

});


function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    console.log(url);
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}
function isValidDate(dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if(!dateString.match(regEx)) return false;  // Invalid format
  var d = new Date(dateString);
  var dNum = d.getTime();
  if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0,10) === dateString;
}

function timeFormat(date){
  if(date instanceof Date){
    var month = (date.getMonth() + 1);
    if(month < 10)
      month = "0"+month;
    var day = date.getDate();
    if(day < 10)
      day = "0"+day;
    var isoDate = date.getFullYear() + '-' + month + '-' + day;
    return isoDate; 
  }else{
    return "";
  }
}
