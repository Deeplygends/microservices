// ******************************
//               Index ReaderS
//*******************************
function fillAllReaders(){
	$("#maincontent").html("");
	$("#maincontent").append("<div id='btnCreateReader' class=\"btn btn-primary\">Create Reader</div>");
	$("#maincontent").append("<h1 class=\"text-center\">Reader</h1>");
	$("#maincontent").append("<div id='readers'><table class='table'><thead></thead><tbody></tbody></table></div>");
	 $.ajax({
    xhrFields: {
        withCredentials: true
    },
    type: "GET",
    url: "http://localhost:8002/reader",
    success : function (data) {
      console.log(data);
   		$("#readers table thead").append("<tr><th>last name</th><th>first name</th><th>gender</th><th>birth date</th><th>address</th><th></th><th></th></tr>");
    	for(var reader in data)
    	{
    		console.log(reader);
    			$("#readers table tbody").append("<tr><td>"+data[reader]["lastName"]+"</td><td>"+data[reader]["firstName"]+"</td><td>"+data[reader]["gender"]+"</td><td>"+data[reader]["dateBirth"]+"</td><td>"+data[reader]["address"]+"</td><td><div id=\"delete"+data[reader]["id"]+"\" class=\"btn btn-danger delete\">delete</div></td><td><div id=\"update"+data[reader]["id"]+"\" class=\"btn btn-info update\">modify</div></td></tr>")
      }
       $(".delete").on('click', function(){
          deleteReader($(this).attr("id").substring(6));
        });
       $(".update").on('click', function(){
          updateReader($(this).attr("id").substring(6));
        });
       $ ("#btnCreateReader").on('click', function(){
          createReader();
       });
   }
 });
 
}
// ******************************
//               Delete one reader
//*******************************

function deleteReader(id){
  $("#maincontent").html("");
 
   $.ajax({
    xhrFields: {
        withCredentials: true
    },
    type: "GET",
    url: "http://localhost:8002/reader/"+id
   }).done(function (data) {
     $("#maincontent").append("<div class=\"text-center\">deleting a reader of id " + id +" </div>");
      $("#maincontent").append("<div class=\"text-center\"><label>Titre : </label><label>"+data["lastName"]+"</label></div>");
      $("#maincontent").append("<div class=\"text-center\"><label>Auteur : </label><label>"+data["firstName"]+"</label></div>");
      $("#maincontent").append("<div class=\"text-center\"><label>Editeur : </label><label>"+data["gender"]+"</label></div>");
      $("#maincontent").append("<div class=\"text-center\"><label>Edition : </label><label>"+data["dateBirth"]+"</label></div>");
      $("#maincontent").append("<div class=\"text-center\"><label>Edition : </label><label>"+data["address"]+"</label></div>");
      $("#maincontent").append("<div class=\"text-center\"><div id='btnDeleteConfirm' class='btn btn-danger'>Delete</div></div>");
      $("#maincontent").append("<div class=\"text-center\"><div id='btnReturnToReader' class='btn btn-primary'>Back to list</div></div>");
      $("#btnDeleteConfirm").on('click', function(){
            $.ajax({
              xhrFields: {
                  withCredentials: true
              },
              type: "DELETE",
              url: "http://localhost:8002/reader/delete/"+id
             }).done(function (data) {
                fillAllReaders();
             });
      });
      $("#btnReturnToReader").on('click', function(){
          fillAllReaders();
      });
   });
}
// ******************************
//               create one Reader
//*******************************
function createReader()
{
    var readers = null;
     $.ajax({
              xhrFields: {
                  withCredentials: true
              },
              async : false,
              type: "GET",
              url: "http://localhost:8002/reader/",
              success : function (data) {
                readers = data;
              }
        });
    var id = 0;
    $.each(readers, function(i, reader){
        if(reader.id > id)
          id = reader.id + 1 
    });
    console.log("id : " + id);

   $("#maincontent").html("");
   $("#maincontent").append("<div class=\"text-center\">Create a new reader </div>");
   $("#maincontent").append("<form>");
   $("#maincontent").append("<div id='error' class='hidden'><label></label></div>");
   $("#maincontent").append("<div class='form-group'><label for='inputLastName'> Last Name</label> <input type='text' class='form-control' id='inputLastName' placeholder='Enter the last name'/></div>");
   $("#maincontent").append("<div class='form-group'><label for='inputFirstName'> First Name</label> <input type='text' class='form-control' id='inputFirstName' placeholder='Enter the first name'/></div>");
   $("#maincontent").append("<div class='form-group'><label for='inputGender'> Gender</label> <input type='text' class='form-control' id='inputGender' placeholder='Enter the gender (M / F)'/></div>");
   $("#maincontent").append("<div class='form-group'><label for='inputBirthDate'> Birth Date</label> <input type='date' class='form-control' id='inputBirthDate' placeholder='Enter the birth date (yyyy-MM-dd)'/></div>");
   $("#maincontent").append("<div class='form-group'><label for='inputAddress'> Address</label> <input type='text' class='form-control' id='inputAddress' placeholder='Enter the address'/></div>");
   $("#maincontent").append("<div class='form-group'><div id='btnCreateReaderValidation' class='btn btn-primary'>Create</div></div>");
   $("#btnCreateReaderValidation").on('click', function(){
         console.log("validation create");
         var validBirthDate = isValidDate($("#inputBirthDate").val());
         $("#error label").html("");
         $("#error").addClass("hidden").removeClass("alert alert-danger");
        

          if(validBirthDate) // pas d'erreur
          {
            var birthdate = new Date($('#inputBirthDate').val());
            birthdate = timeFormat(birthdate);
          
            console.log(birthdate);
                         // On POST le Reader et on revient à la liste
                    $.ajax({
                      xhrFields: {
                            withCredentials: true
                      },
                      type: "POST",
                      url: "http://localhost:8002/reader/create",
                      contentType : "application/json",
                      data : JSON.stringify({"id": id, "lastName" : $('#inputLastName').val(), "firstName" : $('#inputFirstName').val(), "gender" : $('#inputGender').val(), "dateBirthString" : birthdate, "address" : $('#inputAddress').val()}),
                      success : function(data){
                        console.log("Success post");
                            fillAllReaders();
                      },
                      error: function( jqXhr, textStatus, errorThrown ){
                          console.log( errorThrown );
                       }
                    });
          }
          else //si l'isbn exist ou l'année d'edition n'est pas un entier
          {
              console.log(ok);
              $("#error label").html(" the birth date must be in yyyy-MM-dd format");
              $("#error").removeClass("hidden").addClass("alert alert-danger");
         }
  
   });
}

function updateReader(id)
{

    $.ajax({ 
              xhrFields: {
                  withCredentials: true
              },
              type: "GET",
              url: "http://localhost:8002/reader/"+id,
              success : function(Reader)
                      {
                        console.log(Reader);
                        console.log(Reader.dateBirth);
                         $("#maincontent").html("");
                         $("#maincontent").append("<div class=\"text-center\">Update Reader "+Reader.id+" </div>");
                         $("#maincontent").append("<form>");
                         $("#maincontent").append("<div id='error' class='hidden'><label></label></div>");
                         $("#maincontent").append("<div id='error' class='hidden'><label></label></div>");
                         $("#maincontent").append("<div class='form-group'><label for='inputLastName'> Last Name</label> <input type='text' class='form-control' id='inputLastName' placeholder='Enter the last name' value='"+Reader.lastName+"'/></div>");
                         $("#maincontent").append("<div class='form-group'><label for='inputFirstName'> First Name</label> <input type='text' class='form-control' id='inputFirstName' placeholder='Enter the first name' value='"+Reader.firstName+"'/></div>");
                         $("#maincontent").append("<div class='form-group'><label for='inputGender'> Gender</label> <input type='text' class='form-control' id='inputGender' placeholder='Enter the gender (M / F)' value='"+Reader.gender+"'/></div>");
                         $("#maincontent").append("<div class='form-group'><label for='inputBirthDate'> Birth Date</label> <input type='date' class='form-control' id='inputBirthDate' placeholder='Enter the birth date (yyyy-MM-dd)' value='"+Reader.dateBirth+"'/></div>");
                         $("#maincontent").append("<div class='form-group'><label for='inputAddress'> Address</label> <input type='text' class='form-control' id='inputAddress' placeholder='Enter the address' value='"+Reader.address+"'/></div>");
                         $("#maincontent").append("<div class='form-group'><div id='btnUpdateReaderValidation' class='btn btn-primary'>Create</div></div>");
                         $("#btnUpdateReaderValidation").on('click', function(){
                               console.log("validation create");
                               var validBirthDate = isValidDate($("#inputBirthDate").val());
                               $("#error label").html("");
                               $("#error").addClass("hidden").removeClass("alert alert-danger");
                              

                                if(validBirthDate) // pas d'erreur
                                {
                                  var birthdate = new Date($('#inputBirthDate').val());
                                  birthdate = timeFormat(birthdate);
                                
                                  console.log(birthdate);
                                               // On POST le Reader et on revient à la liste
                                          $.ajax({
                                            xhrFields: {
                                                  withCredentials: true
                                            },
                                            type: "PUT",
                                            url: "http://localhost:8002/reader/update",
                                            contentType : "application/json",
                                            data : JSON.stringify({"id": id, "lastName" : $('#inputLastName').val(), "firstName" : $('#inputFirstName').val(), "gender" : $('#inputGender').val(), "birthDate" : birthdate, "address" : $('#inputAddress').val()}),
                                            success : function(data){
                                              console.log("Success put");
                                                  fillAllReaders();
                                            },
                                            error: function( jqXhr, textStatus, errorThrown ){
                                                console.log( errorThrown );
                                             }
                                          });
                                }
                                else //si l'isbn exist ou l'année d'edition n'est pas un entier
                                {
                                    console.log(ok);
                                    $("#error label").html(" the birth date must be in yyyy-MM-dd format");
                                    $("#error").removeClass("hidden").addClass("alert alert-danger");
                               }
                                    
                        });
                       }
      });
}