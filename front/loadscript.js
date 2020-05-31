$(document).ready(function() {

   // DÃ¨s le chargement on masque l'Ã©lÃ©ment portant l'id #masque
   // grÃ¢ce Ã  la fonction hide() de jQuery
   fillAllBooks();

   $("#bookmenu").on('click', function(){
      fillAllBooks();
   });
   //delet un element
   

   // Faites bien attention Ã  la syntaxe et Ã  l'imbrication des
   // parenthÃ¨ses et accolades

});
// ******************************
//               Index BOOKS
//*******************************
function fillAllBooks(){
	$("#maincontent").html("");
	$("#maincontent").append("<div id='btnCreateBook' class=\"btn btn-primary\">Create Book</div>");
	$("#maincontent").append("<div class=\"text-center\">Books</div>");
	$("#maincontent").append("<div id='books'><table class='table'><thead></thead><tbody></tbody></table></div>");
	 $.ajax({
    xhrFields: {
        withCredentials: true
    },
    type: "GET",
    url: "http://localhost:8001/book",
    success : function (data) {
      console.log(data);
   		$("#books table thead").append("<tr><th>isbn</th><th>titre</th><th>auteur</th><th>editeur</th><th>edition</th><th></th><th></th></tr>");
    	for(var book in data)
    	{
    		console.log(book);
    			$("#books table tbody").append("<tr><td>"+data[book]["isbn"]+"</td><td>"+data[book]["titre"]+"</td><td>"+data[book]["auteur"]+"</td><td>"+data[book]["editeur"]+"</td><td>"+data[book]["edition"]+"</td><td><div id=\""+data[book]["isbn"]+"\"class=\"btn btn-alert delete\">delete</div></td></tr>")
    	
      }
       $(".delete").on('click', function(){
          deleteBook($(this).attr("id"));
        });
       $ ("#btnCreateBook").on('click', function(){
          CreateBook();
       });
   }
 });
 
}
// ******************************
//               Delete one BOOK
//*******************************

function deleteBook(isbn){
  $("#maincontent").html("");
  $("#maincontent").append("<div class=\"text-center\">deleting " + isbn +" </div>");
   $.ajax({
    xhrFields: {
        withCredentials: true
    },
    type: "GET",
    url: "http://localhost:8001/book/"+isbn
   }).done(function (data) {
      $("#maincontent").append("<div class=\"text-center\"><label>Titre : </label><label>"+data["titre"]+"</label></div>");
      $("#maincontent").append("<div class=\"text-center\"><label>Auteur : </label><label>"+data["auteur"]+"</label></div>");
      $("#maincontent").append("<div class=\"text-center\"><label>Editeur : </label><label>"+data["editeur"]+"</label></div>");
      $("#maincontent").append("<div class=\"text-center\"><label>Edition : </label><label>"+data["edition"]+"</label></div>");
      $("#maincontent").append("<div class=\"text-center\"><div id='btnDeleteConfirm' class='btn btn-danger'>Delete</div></div>");
      $("#maincontent").append("<div class=\"text-center\"><div id='btnReturnToBook' class='btn btn-primary'>Back to list</div></div>");
      $("#btnDeleteConfirm").on('click', function(){
            $.ajax({
              xhrFields: {
                  withCredentials: true
              },
              type: "DELETE",
              url: "http://localhost:8001/book/delete/"+isbn
             }).done(function (data) {
                fillAllBooks();
             });
      });
      $("#btnReturnToBook").on('click', function(){
          fillAllBooks();
      });
   });
}
// ******************************
//               create one BOOK
//*******************************
function CreateBook()
{
   $("#maincontent").html("");
   $("#maincontent").append("<div class=\"text-center\">Create a new book </div>");
   $("#maincontent").append("<form>");
   $("#maincontent").append("<div id='error' class='hidden'><label></label></div>");
   $("#maincontent").append("<div class='form-group'><label for='inputIsbn'> ISBN</label> <input type='text' class='form-control' id='inputIsbn' placeholder='Enter the isbn'/></div>");
   $("#maincontent").append("<div class='form-group'><label for='inputTitre'> Titre</label> <input type='text' class='form-control' id='inputTitre' placeholder='Enter the title'/></div>");
   $("#maincontent").append("<div class='form-group'><label for='inputAuteur'> Author</label> <input type='text' class='form-control' id='inputAuteur' placeholder='Enter the author'/></div>");
   $("#maincontent").append("<div class='form-group'><label for='inputEditeur'> Editor</label> <input type='text' class='form-control' id='inputEditeur' placeholder='Enter the editor'/></div>");
   $("#maincontent").append("<div class='form-group'><label for='inputEdition'> Edition</label> <input type='text' class='form-control' id='inputEdition' placeholder='Enter the year of edition (yyyy)'/></div>");
   $("#maincontent").append("<div class='form-group'><div id='btnCreateBookValidation' class='btn btn-primary'>Create</div></div>");
   $("#btnCreateBookValidation").on('click', function(){
        console.log("validation create");
        var isbn = $("#inputIsbn").val()
        var yearEdition = $("#inputEdition").val();
         $("#error label").html("");
         $("#error").addClass("hidden").removeClass("alert alert-danger");
         $.ajax({
              xhrFields: {
                  withCredentials: true
              },
              type: "GET",
              url: "http://localhost:8001/book/",
              success : function (data) {
                var ok = true;
                console.log(data);
                $.each(data, function(i, ele)
                {
                  console.log(ele)
                  if(ele.isbn == isbn)
                  {
                    ok = false;
                    $("#error label").html("ISBN already exists in base. Please enter a new one");
                  }
                });
                if(!$.isNumeric(yearEdition))
                {
                  ok = false;
                  $("#error label").html(" The year must be a numeric integer");
                }
                if(ok) // pas d'erreur
                {
                  console.log( JSON.stringify({"isbn": isbn, "titre" : $('#inputTitre'), "auteur" : $('#inputAuteur').val(), "editeur" : $('#inputEditeur').val(), "edition" : $('inputEdition').val()}))
                    // On POST le book et on revient à la liste
                    $.ajax({
                      xhrFields: {
                            withCredentials: true
                      },
                      type: "POST",
                      url: "http://localhost:8001/book/create",
                      contentType : "application/json",
                      data : JSON.stringify({"isbn": isbn, "titre" : $('#inputTitre').val(), "auteur" : $('#inputAuteur').val(), "editeur" : $('#inputEditeur').val(), "edition" : $('inputEdition').val()}),
                      success : function(data){
                            fillAllBooks();
                      },
                      error: function( jqXhr, textStatus, errorThrown ){
                          console.log( errorThrown );
                       }
                    });
                }
                else //si l'isbn exist ou l'année d'edition n'est pas un entier
                {
                    console.log(ok);
                    $("#error").removeClass("hidden").addClass("alert alert-danger");
                }
              }
        });

   });
}
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

