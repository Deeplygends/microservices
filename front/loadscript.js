$(document).ready(function() {

   // DÃ¨s le chargement on masque l'Ã©lÃ©ment portant l'id #masque
   // grÃ¢ce Ã  la fonction hide() de jQuery

   $.ajax({
    xhrFields: {
        withCredentials: true
    },
    type: "GET",
    url: "http://localhost:8001/book"
   }).done(function (data) {
    console.log(data);
   });

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

