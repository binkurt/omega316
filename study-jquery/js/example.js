$(document).ready(function () {
    // $("#movies tbody tr").css("border","solid 3px red");
    // $("#movies tbody tr:odd").css("border","solid 3px red");
    // $("#movies tbody tr:odd").hide();
    /*
     var isOdd= true;
     setInterval(function(){
     if (isOdd){
     isOdd=false;
     $("#movies tbody tr:odd").hide();
     $("#movies tbody tr:even").show();
     } else {
     isOdd=true;
     $("#movies tbody tr:even").hide();
     $("#movies tbody tr:odd").show();
     }
     },1000);
     setInterval(function(){
     var rows = $("#movies tbody tr");
     if (rows.length>0){
     $("#movies tbody tr:eq(0)").remove();
     }
     },1000);
     $(".panel-heading").css("border","solid 3px red");
     $("#movies tbody tr").each(function(){
     var year= Number(
     $(this).find('td:eq(4)').text().trim()
     );
     if (year<1970 || year >1979)
     $(this).hide();
     });
     $("#movies tbody tr").each(function(){
     var numOfDirectors=
     $(this).find('td:eq(2) a').length;
     if (numOfDirectors<2)
     $(this).hide();

     });
     */
    $("#movies tbody tr").each(function () {
        var genres = $(this).find('td:eq(3)').text().trim();
        genres = genres.replace(/\s+/g, '').split(",");
        if (genres.length != 2)
            $(this).hide();
        else if (genres.indexOf("Drama") < 0)
            $(this).hide();
        else if (genres.indexOf("Comedy") < 0)
            $(this).hide();
    });
});