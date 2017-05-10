$(document).ready(function(){
    $('#movies tbody tr').each(function(){
        var numOfDirs= $(this).find('td:eq(2) a').length;
        if (numOfDirs<2) $(this).hide();
    });
});