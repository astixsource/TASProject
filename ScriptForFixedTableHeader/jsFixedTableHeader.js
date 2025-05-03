function fnFixedTableHeader(sHeight) {
    var $table = $("table.fixed_header"),
        $bodyCells = $table.find('tbody tr:first').find("td");
    $table.find('tbody').height(sHeight);

    // Get the tbody columns width array
    $bodyCells.each(function (i, v) {
        if ($(this).index() < ($bodyCells.length - 1)) {
            $table.find('thead tr').children().eq($(this).index()).width($(this).width());
            $table.find('tfoot tr').children().eq($(this).index()).width($(this).width());
        }
    });
}