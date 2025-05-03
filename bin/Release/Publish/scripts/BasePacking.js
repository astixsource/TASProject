


function fnAddRow(cntrl, flg) {
    if (flg == 1) {
       // debugger;
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
        //$($(tbl)[0].rows[rowIndex]).after("<tr flg='0'>" + $(tbl)[0].rows[rowIndex].innerHTML + "</tr>");
        $(tbl).append("<tr flg='0'>" + $(tbl)[0].rows[rowIndex].innerHTML + "</tr>");
        var rowCount = $(tbl)[0].rows.length;
        rowCount = rowCount - 1;
        $($(tbl)[0].rows[rowCount].cells[4].children[0]).prop("disabled", false);
        $(tbl)[0].rows[eval(rowCount)].cells[1].children[0].value = "1";
        $(tbl)[0].rows[eval(rowCount)].cells[2].innerHTML = $($(tbl)[0].rows[rowIndex].cells[4]).find('option:selected').text();
        $($(tbl)[0].rows[eval(rowCount)].cells[2]).attr("basepackid", $($(tbl)[0].rows[rowIndex].cells[4]).find('option:selected').val());
        $($(tbl)[0].rows[eval(rowCount)].cells[4]).find('option[value=0]').prop("selected", true);
        $(tbl)[0].rows[eval(rowCount)].cells[6].children[1].value = 0;

        //        $($(tbl)[0].rows[rowIndex+1].cells[4].children[0]).prop("disabled", false);
        //        $(tbl)[0].rows[eval(rowIndex + 1)].cells[1].children[0].value = "1";      
        //        $(tbl)[0].rows[eval(rowIndex + 1)].cells[2].innerHTML = $($(tbl)[0].rows[rowIndex].cells[4]).find('option:selected').text();
        //        $($(tbl)[0].rows[eval(rowIndex + 1)].cells[2]).attr("basepackid", $($(tbl)[0].rows[rowIndex].cells[4]).find('option:selected').val());
        //        $($(tbl)[0].rows[eval(rowIndex + 1)].cells[4]).find('option[value=0]').prop("selected", true);
        //        $(tbl)[0].rows[eval(rowIndex + 1)].cells[6].children[1].value = 0;

        var count = 1;
        var rowNo = 1;
        for (var i = 1; i < $(tbl)[0].rows.length; i++) {
            if ($("#hdnRowRemove").val() == "1") {
                if ($(tbl)[0].rows[i].getAttribute("flg") == "0") {
                    $(tbl)[0].rows[i].cells[0].innerHTML = count;
                    count++;
                }
            }
            else {
                if ($(tbl)[0].rows[i].style.display != 'none') {
                    $(tbl)[0].rows[i].cells[0].innerHTML = eval(rowNo).toString();
                    rowNo = rowNo + 1;
                }
            }

        }
        $(cntrl).hide()
        $(cntrl).next().hide();
    }
}




function fnRemoveRow(cntrl, flg) {
 //   debugger;
    var table = $(cntrl).parent().parent().parent();
    var rowInx = cntrl.parentNode.parentNode.rowIndex;

    if (flg == 1) {
        if ($(table).find("tr[flg=0]").length > 1) {
            var tblRow = $(cntrl).parent().parent();
            $($(table)[0].rows[rowInx].cells[6].children[1]).val(1);

            if ($(table).find("tr[flg=0]").length > 1) {
                var index = rowInx - 1;
                table[0].rows[index].cells[7].innerHTML = "<img src=\"../NewImages/plus_sign.gif\" onclick=\"fnAddRow(this,1)\" style=\"cursor: pointer; margin-right: 5px;\" /><img src=\"../NewImages/minus_sign.gif\" onclick=\"fnRemoveRow(this,1)\" style=\"cursor: pointer;\" />";

                $($(table)[0].rows[index].cells[4].children[0]).prop("disabled", true);
            }
            tblRow.hide();
            $(tblRow).removeAttr("flg");
            $(tblRow).attr("flg", "1");
        }
        else if ($(table).find("tr[flg=0]").length == 1 || $(table).find("tr[flg=0]").length == 0) {

            var tblRowNew = $(cntrl).parent().parent();
            var SelectedEditPkey = document.getElementById("cphRight_hdnPkeyForEdit").value;
            var SelectedPkey = document.getElementById("cphRight_hdnPkey").value;
            var Pkey = SelectedPkey.split("|")[0];
            var NodeType = SelectedPkey.split("|")[3];
            var NodeID = SelectedPkey.split("|")[2];

            $("#hdnRowRemove").val("1");

            if (NodeType == 3) {

                $("#cphRight_ddlBasePackProd").prop("disabled", false);
                $("#cphRight_ddlBasePackProd option[value=0]").prop("selected", true);
                $("#cphRight_ddlBasePack").prop("disabled", false);
                $("#cphRight_ddlBasePack option[value=0]").prop("selected", true);
            }
            else if (NodeType == 4) {

                $("#cphRight_ddlBasePack").prop("disabled", false);
                $("#cphRight_ddlBasePack option[value=0]").prop("selected", true);
            }
            else if (NodeType == 2) {

                $("#cphRight_ddlBasePackProd").prop("disabled", false);
                $("#cphRight_ddlBasePackProd option[value=0]").prop("selected", true);
            }
            tblRowNew.hide();
            $(tblRowNew).removeAttr("flg");
            $(tblRowNew).attr("flg", "1");

        }
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
    // debugger;
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
        //        $($(tbl)[0].rows[rowIndex]).after("<tr flg='0'>" + $(tbl)[0].rows[rowIndex].innerHTML + "</tr>");
        $(tbl).append("<tr flg='0'>" + $(document).data("ComboDetail") + "</tr>");
        $(".combo").combobox();
        $(".combo").combobox().parent().find("input.ui-autocomplete-input").css('width', '200px');
        $(".ui-autocomplete").css("max-height", "150px");
        $(".ui-autocomplete").css("overflow-Y", "scroll");
        $(tbl)[0].rows[eval(rowIndex + 1)].cells[2].children[1].value = 0;
        $('.watermark').watermark("0.00", "watermark");
        $($(tbl)[0].rows[rowIndex]).attr("flg", "0");

        $(cntrl).hide()
        $(cntrl).next().hide();
    }
}

function fnRemoveRowForCombo(cntrl, flg) {
    //  debugger;
    var table = $(cntrl).parent().parent().parent();

    var rowInx = cntrl.parentNode.parentNode.rowIndex;
    if (flg == 1) {
        if ($(table).find("tr[flg=0]").length >= 1) {
            //if (table[0].rows.length > 2) {
            var tblRow = $(cntrl).parent().parent();
            $($(table)[0].rows[rowInx].cells[2].children[1]).val(1);
            // tblRow.remove();

            if ($(table).find("tr[flg=0]").length >= 1) {
                var index = rowInx - 1;  //table[0].rows.length - 2;
                table[0].rows[index].cells[4].innerHTML = "<img src=\"../NewImages/plus_sign.gif\" onclick=\"fnAddRowForCombo(this,1)\" style=\"cursor: pointer; margin-right: 5px;\" /><img src=\"../NewImages/minus_sign.gif\" onclick=\"fnRemoveRowForCombo(this,1)\" style=\"cursor: pointer;\" />";
            }

            tblRow.hide();
            $(tblRow).removeAttr("flg");
            $(tblRow).attr("flg", "1");

        }


    }
}