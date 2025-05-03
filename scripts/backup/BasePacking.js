function fnAddRow(cntrl, flg) {
    if (flg == 1) {
        //debugger;
        var tbl = $(cntrl).parent().parent().parent();

        var rowIndex = $(cntrl).parent().parent()[0].rowIndex;
        if ($(tbl)[0].rows[rowIndex].cells[1].children[0].value == "") {
            alert("Please Enter Unit First!");
            return false;
        }
        if ($(tbl)[0].rows[rowIndex].cells[2].innerHTML == "") {
            alert("Please Select Base Pack Type First!");
            return false;
        }
        if ($(tbl)[0].rows[rowIndex].cells[4].children[0].value == 0) {
            alert("Please Select Pack Packing First!");
            return false;
        }
        $($(tbl)[0].rows[rowIndex].cells[4].children[0]).prop("disabled", true);
       // $($(tbl)[0].rows[rowIndex].cells[4].children[0]).prop("disabled", false);
        $($(tbl)[0].rows[rowIndex]).after("<tr flg='0'>" + $(tbl)[0].rows[rowIndex].innerHTML + "</tr>");
        $($(tbl)[0].rows[rowIndex+1].cells[4].children[0]).prop("disabled", false);
        //     $($(tbl)[0].rows[rowIndex + 1].cells[6].children[0]).removeAttr("imgdata");

       
        
        //debugger;
        $(tbl)[0].rows[eval(rowIndex + 1)].cells[1].children[0].value = "1";
      
        $(tbl)[0].rows[eval(rowIndex + 1)].cells[2].innerHTML = $($(tbl)[0].rows[rowIndex].cells[4]).find('option:selected').text();
        $($(tbl)[0].rows[eval(rowIndex + 1)].cells[2]).attr("basepackid", $($(tbl)[0].rows[rowIndex].cells[4]).find('option:selected').val());
        $($(tbl)[0].rows[eval(rowIndex + 1)].cells[4]).find('option[value=0]').prop("selected", true);

        $(tbl)[0].rows[eval(rowIndex + 1)].cells[6].children[1].value = 0;
        
        for (var i = 1; i < $(tbl)[0].rows.length; i++) {
            $(tbl)[0].rows[i].cells[0].innerHTML = eval(i).toString();
        //    $($(tbl)[0].rows[rowIndex].cells[4].children[0]).prop("disabled", true);
          
        }
      
        

        $(cntrl).hide()
        $(cntrl).next().hide();
        //       $('.watermark').watermark("0.000", "watermarkCS");
        //     $('.watermarkOver').watermark("0", "watermarkCS");
        //$('.watermarkSizeThree').watermark("0.000", "watermarkCS");
    }


}



function fnRemoveRow(cntrl, flg) {
    //debugger;
    var table = $(cntrl).parent().parent().parent();
    var rowInx = cntrl.parentNode.parentNode.rowIndex;
    if (flg == 1) {
        if ($(table).find("tr[flg=0]").length > 1) {
        
            var tblRow = $(cntrl).parent().parent();
            //    tblRow.remove();
            $($(table)[0].rows[rowInx].cells[6].children[1]).val(1);

            if ($(table).find("tr[flg=0]").length > 1) {
                var index = rowInx-1;  //table[0].rows.length-1;
                table[0].rows[index].cells[7].innerHTML = "<img src=\"../NewImages/plus_sign.gif\" onclick=\"fnAddRow(this,1)\" style=\"cursor: pointer; margin-right: 5px;\" /><img src=\"../NewImages/minus_sign.gif\" onclick=\"fnRemoveRow(this,1)\" style=\"cursor: pointer;\" />";
                /// <reference path="../NewImages/plus_sign.gif" />
                $($(table)[0].rows[index].cells[4].children[0]).prop("disabled", true);
            }

            tblRow.hide();
            $(tblRow).removeAttr("flg");
            $(tblRow).attr("flg", "1");
        }

        //debugger;
        for (var i = 1; i < table[0].rows.length-1; i++) {
            table[0].rows[i].cells[0].innerHTML = eval(i).toString();
        }



        
      
       
        

        //            var packConfig = "";
        //            for (var i = $(table).find("input[type=text]").length - 1; i >= 0; i--) {
        //                if ($($(table).find("select")[i]).find("option:selected").val() != 0) {
        //                    packConfig += $(table).find("input[type=text]")[i].value + "X";
        //                }
        //            }
        //            packConfig += $($(table).closest("div").prev().prev()).find("input[type=text]")[1].value;
        //            //$($(table).closest("div").prev().prev()).find("label#lblPackConfig")[3].innerHTML = packConfig;
        //            $($(table).closest("div").prev().prev()).find("label:eq(2)").html(packConfig);
        //            $($(table).closest("div").prev().prev().prev()).find("table")[0].rows[0].cells[4].innerHTML = "Packing Configuration : " + packConfig.substr(0, packConfig.length);
    }
}

function whichButton(event) {
    //alert(event.button)
    if (event.button == 2)//RIGHT CLICK
    {
        alert("Right Click Not Allow !");
    }
}


function noCTRL(e) {

    var code = (document.all) ? event.keyCode : e.which;
    //alert(code)
    var msg = "Sorry, this functionality is disabled.";
    if (parseInt(code) == 17) //CTRL
    {
        alert(msg);
        window.event.returnValue = false;
    }
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;

    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    var parts = evt.srcElement.value.split('.');
    if (parts.length > 1 && charCode == 46)
        return false;

    return true;
}


function fnAddRowForCombo(cntrl, flg) {
    if (flg == 1) {
        //debugger;
        var tbl = $(cntrl).parent().parent().parent();
        var rowIndex = $(cntrl).parent().parent()[0].rowIndex;
        if ($(tbl)[0].rows[rowIndex].cells[0].children[0].value == "") {
            alert("Please select the combo Type");
            return false;
        }
        if ($(tbl)[0].rows[rowIndex].cells[1].children[0].value == "") {
            alert("Please enter the quantity");
            return false;
        }

       $(tbl).append("<tr>" + $(document).data("ComboDetail") + "</tr>");

        $(".combo").combobox();
        $(".combo").combobox().parent().find("input.ui-autocomplete-input").css('width', '200px');

        $(".ui-autocomplete").css("max-height", "150px");
        $(".ui-autocomplete").css("overflow-Y", "scroll");

//        $(".combo").combobox().parent().find("input.ui-autocomplete-input").css("max-height", "150px");
        //        $(".combo").combobox().parent().find("input.ui-autocomplete-input").css("overflow-Y", "scroll");

        $(tbl)[0].rows[eval(rowIndex + 1)].cells[2].children[1].value = 0;

        $('.watermark').watermark("0.00", "watermark");

      
        
        $(cntrl).hide()
        $(cntrl).next().hide();

    }


}

function fnRemoveRowForCombo(cntrl, flg) {

    var table = $(cntrl).parent().parent().parent();
    var rowInx = cntrl.parentNode.parentNode.rowIndex;
    if (flg == 1) {
        if (table[0].rows.length > 2) {
            var tblRow = $(cntrl).parent().parent();
            $($(table)[0].rows[rowInx].cells[2].children[1]).val(1);
            // tblRow.remove();
            tblRow.hide();
        }
        //debugger;
//        for (var i = 1; i < table[0].rows.length; i++) {
//            table[0].rows[i].cells[0].innerHTML = eval(i).toString();
//        }
        var index = table[0].rows.length - 2;
        table[0].rows[index].cells[4].innerHTML = "<img src=\"../NewImages/plus_sign.gif\" onclick=\"fnAddRowForCombo(this,1)\" style=\"cursor: pointer; margin-right: 5px;\" /><img src=\"../NewImages/minus_sign.gif\" onclick=\"fnRemoveRowForCombo(this,1)\" style=\"cursor: pointer;\" />";
        /// <reference path="../NewImages/plus_sign.gif" />

       // $($(table)[0].rows[index].cells[4].children[0]).prop("disabled", false);


    }
}