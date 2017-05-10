var findHeaderIndex= function(id,columnName){
    var headers= [];
    $(id.concat(' thead th')).each(function(){
        var header= $(this).text().trim();
        headers.push(header);
    });
    return headers.indexOf(columnName);
}

$(document).ready(function(){
        var columnNo= findHeaderIndex('#movies','Genres');
        $('#movies tbody tr').each(function(){
        var td= $(this).find('td:eq('+columnNo+')');
        var genres= td.text().trim().replace(/\s+/g,'').split(',');
        if ( genres.length!=2 || genres.indexOf('Comedy')<0
                           || genres.indexOf('Drama')<0 )
            $(this).hide();
    });
});