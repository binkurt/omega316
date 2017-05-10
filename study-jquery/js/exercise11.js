$(document).ready(function(){
    $('#movies tbody tr').each(function(){
        directors= $('td:eq(2)',this);
        genres= $('td:eq(3)',this);
        $(genres).after($(directors));
    });
    thead= $('#movies thead tr');
    $('th:eq(3)',thead).after($('th:eq(2)',thead));
});