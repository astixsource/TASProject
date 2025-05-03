function fnAddComboFormula(cntrl) {
    //debugger;
    //var dv = $($(cntrl).parent().parent().parent().parent().parent())[0].outerHTML;
    var table = document.getElementById("tblCombo");

    var row = table.insertRow(table.rows.length);
    var cell = row.insertCell(0);
    cell.innerHTML = $(document).data("Combo");
    var ss = $('#tblCombo table');
    for (var i = 0; i < ss.length; i++) {
        ss[i].id = "ExCombo" + i;
    }
    var i = 1;
    //#555555
    for (j = 0; j < document.getElementById("tblCombo").rows.length; j++) {

        if (i % 2 == 0) {
            $(document.getElementById("tblCombo").rows[j].cells[0]).find("[flg=tblE1]").css("background-color", "#B7D9C8");
            $(document.getElementById("tblCombo").rows[j].cells[0]).find("[flg=E1]").css("background-color", "#A2A2A2");
        }
     
        i++;
    }
    for (var k = 0; k < $(document.getElementById("tblCombo")).find("[flgCmbName=1]").length; k++) {
        $(document.getElementById("tblCombo")).find("[flgCmbName=1]")[k].id = "txtCombEX" + k;
    }
    var rlength = document.getElementById("tblCombo").rows.length;
    //debugger;
    $(document.getElementById("tblCombo").rows[rlength - 1].cells[0]).find("input[type=text]").eq(0).focus();
   // fnBindRMText();
    $('.watermark').watermark("0.000", "watermark");
    return false;
}
function fnRemoveComboFormula(cntrl) {
    //debugger;
    var table = document.getElementById("tblCombo");
    if (table.rows.length > 1) {
        var rwIndex = $(cntrl).parent().parent().parent().parent().parent().parent().parent();
        rwIndex.remove();
    }

    var i = 1;
    if (i % 2 == 0) {
        $(document.getElementById("tblCombo").rows[j].cells[0]).find("[flg=tblE1]").css("background-color", "#B7D9C8");
        $(document.getElementById("tblCombo").rows[j].cells[0]).find("[flg=E1]").css("background-color", "#A2A2A2");
    }
    i++;
}


function fnAddRowinCombo(cntrl) {
    //debugger;
    var tbl = $(cntrl).parent().parent().parent();
    var trHTML = $(cntrl).parent().parent()[0].innerHTML;
    $(tbl).append(
		          "<tr>" + $(document).data("exForm") + "</tr>");

 //   var ggroup = $($(cntrl).parent().parent().parent().parent()).find("input[type=radio]")[0].name;
//    if ($($(cntrl).parent().parent().parent().parent()).find("input[type=radio]").length > 1) {
//        $($(cntrl).parent().parent().parent().parent()).find("input[type=radio]").removeAttr("name").attr("name", ggroup);
//    }
    for (var k = 0; k < $(document.getElementById("tblCombo")).find("[flgCmbName=1]").length; k++) {
        $(document.getElementById("tblCombo")).find("[flgCmbName=1]")[k].id = "txtCombEX" + k;
    }
    //fnBindComboText();
    $('.watermark').watermark("0.000", "watermark");
}
function fnRemoveRowFromCombo(cntrl) {
    //debugger;;
    var table = $(cntrl).parent().parent().parent();
    var rowInx = cntrl.parentNode.parentNode.rowIndex;
    var ddVal = $(table[0].rows[rowInx].cells[0]).find("option:selected").val();
    if (table[0].rows.length > 2) {
        var tblRow = $(cntrl).parent().parent();
        tblRow.remove();
    }


    //$(table).find('[flgdd=1]').find('option[value=' + ddVal + ']').removeAttr("disabled"); 
}


function fnCreateSTRForComboBackDetails()
 {
    
     var tableCombo = document.getElementById("tblCombo");
     var FormulaComboID = 1;
     var strCombo = "";

     for (var i = 0; i < tableCombo.rows.length; i++)
      {

          var tblExID = $(tableCombo.rows[i].cells[0].children[0].children[0].children[0].children[0].children[0].innerHTML)[0].id;
          var tblEx = document.getElementById(tblExID);
          
          for (var j = 0; j < tblEx.rows.length; j++)
           {
              if (j >= 1)
                {
                    var ComboName = tblEx.rows[j].cells[0].children[0].value;
                      var Qty = tblEx.rows[j].cells[1].children[0].value;
                      var UOMID = tblEx.rows[j].cells[2].children[0].value;
                      var Descr = tblEx.rows[j].cells[3].children[0].value;

                          if (ComboName == "")
                           {
                               alert("Please Enter ComboName " + FormulaComboID);
                              //$("#dvSaveWait").css("display", "none");
                              $(tblEx.rows[j].cells[0]).find('input[type=text]').focus();
                              return;
                          }
                          if (Qty.trim() == "" || Qty.trim() == "0" || Qty.trim() == "0.000") {
                              alert("Please enter Quantity in Row " + FormulaComboID);
                         //     $("#dvSaveWait").css("display", "none");
                              $(tblEx.rows[j].cells[1]).find('input[type=text]').focus();
                              return;
                          }
                          if (UOMID == "0") {
                              alert("Please select Unit of Measure in Combo in Formula " + FormulaComboID);
                            //  $("#dvSaveWait").css("display", "none");
                              $(tblEx.rows[j].cells[2].children[0]).focus();
                              return;
                          }
                          if (Descr.trim() == "") {
                              alert("Please enter Description in Row " + FormulaComboID);
                              //     $("#dvSaveWait").css("display", "none");
                              $(tblEx.rows[j].cells[3]).find('input[type=text]').focus();
                              return;
                          }
                         strCombo += FormulaComboID + "^" + ComboName + "^" + Qty + "^" + UOMID + "^" + Descr + "^|";
                  }
                 else if (j == 0)
                    {
                          /*  //$(tblEx.rows(j).cells[0].innerHTML)[0].id)
                          var tbForm = document.getElementById($(tblEx.rows[j].cells[0].innerHTML)[0].id);
                          FormulaName = tbForm.rows[j].cells[2].children[0].value;
                          strExtractionFormulaName += FormulaExtractionID + "^" + FormulaName + "^|";*/
                   }
             }

              FormulaComboID++;
          }

          alert("strCombo=" + strCombo)

    }



    function fnBindComboText() {
        $(".tb").autocomplete({
            position: { my: "left bottom", at: "left top", collision: "flip" },
            orientation: 'auto',
            source: function (request, response) {

                //debugger;
                var RMIDList = "";
                var txtLen = $("#" + $(this)[0].element[0].id).closest("table").parent().find("[flgCmbName=1]").length;
                var cntrl = $("#" + $(this)[0].element[0].id).closest("table").parent().find("[flgCmbName=1]");
                if ($("#" + $(this)[0].element[0].id).is("[CMBID]")) {
                    $("#" + $(this)[0].element[0].id).removeAttr("CMBID");
                }
                for (var i = 0; i < txtLen; i++) {
                    if (cntrl[i].getAttribute("CMBID") != null) {
                        RMIDList += cntrl[i].getAttribute("CMBID") + ",";
                    }
                }
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                response(jQuery.grep(ItemsRM, function (element, index) {
                    //debugger;
                   
                        return (RMIDList.indexOf(element.value) == -1 &&  matcher.test(element.label));
                    
                }))
            },
            change: function (event, ui) {
                if (!ui.item) {
                    alert("Incorrect Combo Type.Please Enter Correct Combo");
                    $(this).val("");
                    if ($(this).is("[CMBID]")) {
                        $(this).removeAttr("CMBID");
                    }
                    $(this).focus();
                }
            },
            select: function (e, i) {
                $(this).val(i.item.label);
               // fnddlFilterUOM2(this, i.item.value, i.item.PrdPharmID)
                return false;
            },
            minLength: 1
        });


    }
