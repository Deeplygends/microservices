function GetCurrentBorrow(){
	$("#maincontent").html("");
	$("#maincontent").append("<div id='btnCreateBorrow' class=\"btn btn-primary\">Create Book</div>");
	$("#maincontent").append("<h1 class=\"text-center\">Borrow</h1>");
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
    			$("#books table tbody").append("<tr><td>"+data[book]["isbn"]+"</td><td>"+data[book]["titre"]+"</td><td>"+data[book]["auteur"]+"</td><td>"+data[book]["editeur"]+"</td><td>"+data[book]["edition"]+"</td><td><div id=\"delete"+data[book]["isbn"]+"\" class=\"btn btn-danger delete\">delete</div></td><td><div id=\"update"+data[book]["isbn"]+"\" class=\"btn btn-info update\">modify</div></td></tr>")
      }
       $(".delete").on('click', function(){
          deleteBook($(this).attr("id").substring(6));
        });
       $(".update").on('click', function(){
          updateBook($(this).attr("id").substring(6));
        });
       $ ("#btnCreateBook").on('click', function(){
          CreateBook();
       });
   }
 });
  }