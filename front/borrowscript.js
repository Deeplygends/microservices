function mainBorrow()
{
    $("#maincontent").html("");
  $("#maincontent").append("<h1 class=\"text-center\">Borrow</h1>");
  $("#maincontent").append("<div class='form-inline d-flex justify-content-around'><div id='fieldReaderSearch' class='form-inline  d-flex justify-content-around'><select name='reader' id='reader'></select> <div class='btn btn-info' id='btnSearchReader'>&nbsp Get Historic </div></div>"+
    "<div id='fieldDateBorrowSearch' class='d-flex justify-content-around form-inline'><input type='date' id='dateBorrowSearch' /><div id='btnSearchDate' class='btn btn-info'>&nbsp;&nbsp;&nbsp;Search for date</div></div>"+
    "<div id='fieldCurrentBorrow'><div id='btnCurrentBorrow' class='btn btn-info'>Get Current Borrow</div></div>"+
    "<div id='fieldAll'><div id='btnGetAll' class='btn btn-info'>Get All</div></div>"+
    "</div>");
  $("#maincontent").append("<div id='borrows'><table class='table table-striped table-dark'><thead></thead><tbody></tbody></table></div>");
 $("#btnSearchReader").on('click', function(){
      FillSpecificReader($("#reader").val())
   });
     $("#btnSearchDate").on('click', function(){
      FillSpecificDate($("#dateBorrowSearch").val())
   });
       $("#btnCurrentBorrow").on('click', function(){
      FillCurrentBorrow()
   });
         $("#btnGetAll").on('click', function(){
      FillAllBorrow()
   });
}

function FillAllBorrow(){
  mainBorrow();
  var readers = GetAllReaders();
  $.each(readers, function(i, read){
      $("#fieldReaderSearch select").append("<option value='"+read.id+"'>"+read.lastName+" "+read.firstName+"</option>");
  });
  
	 $.ajax({
    xhrFields: {
        withCredentials: true
    },
    type: "GET",
    url: "http://localhost:8003/borrow",
    success : function (data) {
      console.log(data);
   		$("#borrows table thead").append("<tr><th>reader</th><th>book title</th><th>date of borrow</th><th>return date</th><th></th><th></th></tr>");
    	$.each(data, function(i, borrow)
    	{
         console.log(borrow);
         console.log(borrow.reader);
    		  var book =  GetOneBook(borrow.isbn);
          var reader = GetOneReader(borrow.reader);
    			 addBorrowToTable(borrow, reader, book);  
          });
       $(".delete").on('click', function(){
          deleteBorrow($(this).attr("id").substring(6));
        });
       $(".returnBook").on('click', function(){
          console.log("return the book" + $(this).attr("id").substring(6));
          returnBorrow($(this).attr("id").substring(6));
        });
   },
   error : function(data)
   {
    console.log(data);
   }
 });


  }

  function FillSpecificReader(id){
    console.log(id);
     $.ajax({
    xhrFields: {
        withCredentials: true
    },
    type: "GET",
    url: "http://localhost:8003/borrow/byreader/"+id,
    success : function (data) {

      $("#borrows table tbody").html("");
      $.each(data, function(i, borrow)
      {
          var book =  GetOneBook(borrow.isbn);
          var reader = GetOneReader(borrow.reader);
          addBorrowToTable(borrow, reader, book);
          //$("#borrows table tbody").append("<tr><td>"+reader.lastName+"</td><td>"+book.titre+"</td><td>"+borrow.dateBorrow+"</td><td>"+borrow.dateReturn+"</td><td><div id=\"delete"+borrow.id+"\" class=\"btn btn-danger delete\">delete</div></td><td><div id=\"update"+borrow.id+"\" class=\"btn btn-info update\">modify</div></td></tr>")
      });
       $(".delete").on('click', function(){
          deleteBorrow($(this).attr("id").substring(6));
        });
       $(".returnBook").on('click', function(){
        console.log("Hello");
          returnBorrow($(this).attr("id").substring(6));
        });
   }
 });
  }
  function FillCurrentBorrow()
  {
     $.ajax({
    xhrFields: {
        withCredentials: true
    },
    type: "GET",
    url: "http://localhost:8003/borrow/current",
    success : function (data) {

      $("#borrows table tbody").html("");
      $.each(data, function(i, borrow)
      {
          var book =  GetOneBook(borrow.isbn);
          var reader = GetOneReader(borrow.reader);
          addBorrowToTable(borrow, reader, book);
          //$("#borrows table tbody").append("<tr><td>"+reader.lastName+"</td><td>"+book.titre+"</td><td>"+borrow.dateBorrow+"</td><td>"+borrow.dateReturn+"</td><td><div id=\"delete"+borrow.id+"\" class=\"btn btn-danger delete\">delete</div></td><td><div id=\"update"+borrow.id+"\" class=\"btn btn-info update\">modify</div></td></tr>")
      });
       $(".delete").on('click', function(){
          deleteBorrow($(this).attr("id").substring(6));
        });
       $(".returnBook").on('click', function(){
        console.log("Hello");
          returnBorrow($(this).attr("id").substring(6));
        });
   }
  });
   }
  function FillSpecificDate(sdate)
  {
        $.ajax({
    xhrFields: {
        withCredentials: true
    },
    type: "GET",
    url: "http://localhost:8003/borrow/bydateborrow/"+sdate,
    success : function (data) {
      console.log(data);
      $("#borrows table tbody").html("");
      $.each(data, function(i, borrow)
      {
         console.log(borrow);
         console.log(borrow.reader);
          var book =  GetOneBook(borrow.isbn);
          var reader = GetOneReader(borrow.reader);
           addBorrowToTable(borrow, reader, book);
          });
       $(".delete").on('click', function(){
          deleteBorrow($(this).attr("id").substring(6));
        });
       $(".returnBook").on('click', function(){
        console.log("Hello");
          returnBorrow($(this).attr("id").substring(6));
        });
   }
  });
}

function returnBorrow(id)
{
  console.log("in method");
   $.ajax({
    xhrFields: {
        withCredentials: true
    },
    type: "POST",
    contentType : "application/json",
    url: "http://localhost:8003/borrow/return/"+id,
    success : function (data) {
      console.log("Success");
      FillCurrentBorrow();
   },
    error: function( jqXhr, textStatus, errorThrown ){
        console.log( textStatus );
   }
  });
}

function addBorrowToTable(borrow, reader, book)
{
   var line = "<tr><td>"+reader.lastName+"</td><td>"+book.titre+"</td><td>"+borrow.dateBorrow+"</td><td>"+borrow.dateReturn+"</td><td><div id=\"delete"+borrow.id+"\" class=\"btn btn-danger delete\">delete</div></td>";
   console.log(borrow.dateReturn == null)
   if(borrow.dateReturn == null)
      line += "<td><div id='return"+borrow.id+"'' class='btn btn-info returnBook'>return the book</div></td>";
    line += "</tr>"

     $("#borrows table tbody").append(line);
}