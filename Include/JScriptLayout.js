function FnCreateLayout(RowCnt,CellCnt,QstArr,ViewByArr,GrpByArr)
{    
    var ArrSelected = FnGetparametersForSelected();
    $("#Panel1").empty();
    var tableOuter = $("<table></table>");
    tableOuter.attr("border", "0");
    tableOuter.attr("cellpadding", "2");
    tableOuter.attr("cellspacing", "2");
    
    tableOuter.attr('id','tableOuterLayout');
    var ArrSelectedIndex = 0;
    for (var i = 1; i <= RowCnt; i++) 
    {
        var rowOuter = $('<tr></tr>');
        tableOuter.append(rowOuter);
        for (var j = 1; j <= CellCnt; j++) {
            var cellOuter = $("<td valign='top'></td>");            
            rowOuter.append(cellOuter);
            cellOuter.append(FnCreateTableInner(QstArr,ViewByArr,GrpByArr,ArrSelected));
            ArrSelectedIndex = ArrSelectedIndex + 1;
        }
    }
    FnAssignlayout(ArrSelected); 
    return tableOuter;
}
function FnGetparametersForSelected()
{
     var ArrSelected = new Array();
     var childTr = $('#tableOuterLayout tbody').first().children('tr');
     var childTd = $('#tableOuterLayout tbody').first().children('tr').first().children();
     //$('#tableOuterLayout tbody').children('tr').eq(cnt).children('td').eq(0).find('td').eq(0).html()
     for(var cnt=0;cnt<childTr.length;cnt++)
     {
        for(var cnt1=0;cnt1<childTd.length;cnt1++)
        {
            var Qstddl = $('#tableOuterLayout tbody').children('tr').eq(cnt).children('td').eq(cnt1).find('td').eq(0).children('select');
            var Viewddl = $('#tableOuterLayout tbody').children('tr').eq(cnt).children('td').eq(cnt1).find('td').eq(1).children('select');
            var Grpddl = $('#tableOuterLayout tbody').children('tr').eq(cnt).children('td').eq(cnt1).find('td').eq(2).children('select');            
            var obj = new Object();
            obj.Qstddl = Qstddl.val(); obj.Viewddl = Viewddl.val(); obj.Grpddl = Grpddl.val();
            ArrSelected.push(obj);
        }
     }
     return ArrSelected;
}
function FnCreateTableInner(QstArr1,ViewByArr1,GrpByArr1,ArrSelected)
{
    var tableInner = $("<table style='border:1px solid #CCC; padding:5px 10px 10px 10px;'></table>");
        tableInner.attr("border", "0");
        tableInner.attr("cellpadding", "0");
        tableInner.attr("cellspacing", "0");

        var rowInner = $('<tr></tr>');
        tableInner.append(rowInner);
        var cellInner = $('<td><div class=\"title-line1\">Select below to define structure Of Graph</div></td>');
        rowInner.append(cellInner);    

        var rowInner = $('<tr></tr>');
        tableInner.append(rowInner);        
        var cellInner = $('<td></td>');            
        rowInner.append(cellInner);                 

        var sel = $('<select>');        
        sel.append($("<option>").attr('value',0).text('-Please Select Question-'));
        $(QstArr).each(function() {
            sel.append($("<option>").attr('value',this.MainQuestionID).text(this.MainQuestionText));
        });
        
        sel.change(function() 
        {
            FnQstChange($(this),ViewByArr1,GrpByArr1);           
        });
        cellInner.append(sel);       
        
        rowInner = $('<tr></tr>');
        tableInner.append(rowInner);        
        cellInner = $('<td></td>');            
        rowInner.append(cellInner);                 

        var sel = $('<select>');
        cellInner.append(sel);
        rowInner.hide();
        
        
        rowInner = $('<tr></tr>');
        tableInner.append(rowInner);        
        var cellInner = $('<td></td>');            
        rowInner.append(cellInner);                 

        var sel = $('<select>');
        cellInner.append(sel);
        rowInner.hide();

       
        
        
                       
                
        
        return tableInner;
}
function FnAssignlayout(obj)
{
    var cnt3=0;
    var childTr = $('#tableOuterLayout tbody').first().children('tr');
    var childTd = $('#tableOuterLayout tbody').first().children('tr').first().children();
     //alert($('#tableOuterLayout tbody').children('tr').eq(cnt).children('td').eq(0).find('td').eq(0).html())
    for(var cnt=0;cnt<childTr.length;cnt++)
    {
       for(var cnt1=0;cnt1<childTd.length;cnt1++)
       {
           var Qstddl = $('#tableOuterLayout tbody').children('tr').eq(cnt).children('td').eq(cnt1).find('td').eq(0).children('select');
           var Viewddl = $('#tableOuterLayout tbody').children('tr').eq(cnt).children('td').eq(cnt1).find('td').eq(1).children('select');
           var Grpddl = $('#tableOuterLayout tbody').children('tr').eq(cnt).children('td').eq(cnt1).find('td').eq(2).children('select');            
           Qstddl.$("option[value='"+ArrSelected[cnt3].Qstddl+"']").attr("selected", "selected");
//           var obj = new Object();
//           obj.Qstddl = Qstddl.val(); obj.Viewddl = Viewddl.val(); obj.Grpddl = Grpddl.val();
//           ArrSelected.push(obj);
       }
    }
}
function FnQstChange(Qstddl,ViewByArr1,GrpByArr1)    
{    
    //alert('Value change to ' + Qstddl.val());
    var RowQst = Qstddl.parent().parent();
    var IsViewForQst = 0;
    var Viewddl = RowQst.next().children('td').children('select');
    Viewddl.empty();
    for(var cnt = 0;cnt<ViewByArr1.length;cnt++)
    {
        if(ViewByArr1[cnt].MainQuestionID==Qstddl.val())
        {
            IsViewForQst = 1;
            Viewddl.append($("<option>").attr('value',ViewByArr1[cnt].ViewByID).text(ViewByArr1[cnt].ViewBy));
        }
    }
    if(IsViewForQst==1)
        RowQst.next().show();
    else if(IsViewForQst==0)
        RowQst.next().hide();
   
   
   
    var IsGrpForQst = 0;
    var Grpddl = RowQst.next().next().children('td').children('select');
    Grpddl.empty();
    for(var cnt = 0;cnt<GrpByArr1.length;cnt++)
    {
        if(GrpByArr1[cnt].MainQuestionID==Qstddl.val())
        {
            IsGrpForQst = 1;
            Grpddl.append($("<option>").attr('value',GrpByArr1[cnt].GroupByID).text(GrpByArr1[cnt].GroupBy));
        }
    }
    if(IsGrpForQst==1)
        RowQst.next().next().show();
    else if(IsGrpForQst==0)
        RowQst.next().next().hide();
    
}