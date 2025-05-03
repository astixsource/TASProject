// Common Add Rows Function To Table
function fnAddDynamicRowInProductItemsTable(flg, tableName, col, row, numericColIndex, dateColIndex, isfileUpload, fileUploadColIndex, selectBankColIndex, selectBankBranchColIndex,selectModeColIndex,selectRefColIndex, result) {
    //debugger;
    result = result || "";
    var jRecord = "";
    if (result != "")
        jRecord = result;
    
    var tblPrdItemsMain = document.getElementById(tableName);
    var tbody = "<tbody>";
    var numericCol = numericColIndex.split("^");
    var dateCol = dateColIndex.split("^");
    var fileUploadCol = fileUploadColIndex.split("^");
    var bankcolIndex = selectBankColIndex.split("^");
    var bankBranchcolIndex = selectBankBranchColIndex.split("^");
    var modeColIndex = selectModeColIndex.split("^");
    var RefColIndex = selectRefColIndex.split("^");
    
    var d = new Date();
    var sumAmount = 0;
    if (flg == 0) {
        $("#" + tableName).append(tbody);
        if (jRecord != "") {
            if (jRecord.length > 0)
                row = jRecord.length;
        }

        for (var i = 0; i < row; i++) {
            if (jRecord != "")
            {
                if (jRecord[i].InstrumentMode == "1")
                    continue;
            }

            var tr = "<tr flgdata='1' rowName='" + tableName + "' id='tr" + tableName + i + "'>";
            var flgbbranch = 0;
            for (var j = 0; j < col; j++) {
                var value = ""; var bbranch = ""; var flgbbranch = 0; var flgbank = 0; var flgTrnRefNo = 0; var flgDate = 0; var flgAmount = 0; var flgRemarks = 0;var flgInsMode = 0;
                if (jRecord != "") {
                    var tblId = $("#" + tableName).attr("id");
                    if (tblId == "tbldd" || tblId == "tblCheque") {
                        if (j == 0) {
                            value = jRecord[i].TrnRefNo;
                            flgTrnRefNo = 1;
                        }
                        else if (j == 1) 
                            {
                            value = jRecord[i].TrnDate;
                            flgDate=1;
                        }
                        else if (j == 2) {
                            value = jRecord[i].RcptAmt;
                            sumAmount = sumAmount + parseFloat(value);
                            flgAmount=1;
                        }
                        else if (j == 3) {
                            flgbank = 1;
                            value = jRecord[i].BankId;
                        }
                        else if (j == 4) {
                            value = jRecord[i].BankBranchId;
                            bbranch = jRecord[i].IFSCCode + "- " + jRecord[i].BankBranchName;
                            flgbbranch = 1;
                        }
                        else if (j == 5){
                            value = jRecord[i].Remarks;
                            flgRemarks=1;
                        }
                    }
                    if (tblId == "tblElectronic") {

                        if (j == 0) {
                            value = jRecord[i].InstrumentMode;
                            flgInsMode = 1;
                        }
                        else if (j == 1) {
                            value = jRecord[i].TrnRefNo;
                            flgTrnRefNo = 1;
                        }
                        else if (j == 2) {
                            value = jRecord[i].TrnDate;
                            flgDate = 1;
                        }
                        else if (j == 3) {
                            value = jRecord[i].RcptAmt;
                            sumAmount = sumAmount + parseFloat(value);
                            flgAmount = 1;
                        }
                        else if (j == 4) {
                            value = jRecord[i].BankId;
                            flgbank = 1;
                        }
                        else if (j == 5) {
                            value = jRecord[i].BankBranchId;
                            bbranch = jRecord[i].IFSCCode + "- " + jRecord[i].BankBranchName;
                            flgbbranch = 1;
                        }
                        else if (j == 6) {
                            value = jRecord[i].Remarks;
                            flgRemarks = 1;

                        }
                    }
                }
                else {
                    var tblId = $("#" + tableName).attr("id");
                    if (tblId == "tbldd" || tblId == "tblCheque") {
                        if (j == 2)
                            value = "0";
                    }
                    else if (tblId == "tblElectronic")
                    {
                        if (j == 3)
                            value = "0";
                    }
                }

                tr += "<td style=\"border-left: 1px solid #A0A0A0; border-bottom: 1px solid #A0A0A0;border-right: 1px solid #A0A0A0;text-align:center;\">";
                if ($.inArray("" + j + "", numericCol) != -1)
                    tr += "<input type='text' style='width: 65%;text-align:center; border-style: none;background-color:#fff;text-align:right;' value='"+value+"' onkeypress='return isNumericWithOneDecimal(event)' onmousedown='whichButton(event)' onfocus='Focus(this,0)' onkeydown='return noCTRL(event)' onblur=\"CalculateTotal(this," + tableName + "," + j + ",this.value)\"/>";
                else if ($.inArray("" + j + "", dateCol) != -1){
                    if (value == "")
                        value = d.localeFormat("dd-MMM-yyyy");
                    tr += "<input type='text' style='width: 80%; border-style: none;background-color:#fff' autocomplete='off' value='" + value + "' class='dtp'/>";
                }
                else if ($.inArray("" + j + "", fileUploadCol) != -1 && isfileUpload)
                    tr += "<input type='file' size='20' style='width:71%;'/>";
                else if ($.inArray("" + j + "", bankcolIndex) != -1)
                    tr += "<select style='width: 150px;' flg='banklist' onchange='fnPopulateBranch(this)'>" + $("#cphRight_hdnBankList").val() + "</select>";
                else if ($.inArray("" + j + "", bankBranchcolIndex) != -1)
                    tr += "<input type='text' style='width: 93%; border-style: none;background-color:#fff' class='clsbranch' branchid='" + value + "' value='" + bbranch + "' />";
                else if ($.inArray("" + j + "", modeColIndex) != -1)
                    tr += "<select style='width: 99%;' flg='modeList'>" + $("#cphRight_hdnModeList").val() + "</select>";
                else if ($.inArray("" + j + "", RefColIndex) != -1)
                    tr += "<input type='text' style='width: 93%; border-style: none;background-color:#fff'  autocomplete='off' value='" + value + "' onkeypress='return ValidationControls(this," + j + "," + tableName + ",event)'/>";
                else
                    tr += "<input type='text' style='width: 93%; border-style: none;background-color:#fff'  autocomplete='off' value='" + value + "' />";

                tr += "</td>";
                
            }
            if (i != row - 1) {
                tr += "<td style=\"border-left: 1px solid #A0A0A0; border-bottom: 1px solid #A0A0A0;border-right: 1px solid #A0A0A0;text-align:center;\"><a href='javascript:void(0)' style='border-style:none;color:#fff;' onclick='fnDeleteRow(this)'><img src='../images/icoMinus.gif' style='margin-top:-2px'  title='click to delete row'></a></td>";

            }
            else if (i == row - 1) {
                tr += "<td style=\"border-left: 1px solid #A0A0A0; border-bottom: 1px solid #A0A0A0;border-right: 1px solid #A0A0A0;text-align:center;\"><a href='javascript:void(0)' style='border-style:none;color:#fff;' onclick='fnAddRows(" + tableName + ",this)'><img src='../images/icoAdd.gif' style='margin-top:-2px'  title='click to Add row'></a></td>";
            }
            tr += "</tr>";
            $("#" + tableName).append(tr);
        }
        $("#" + tableName).append("</tbody>");

        if (tableName == "tbldd" && result != "") {
            var tr = $("#" + tableName).find("tbody tr");
            for (var i = 0; i < tr.length; i++) {
                $($(tr)[i].cells[3].children[0]).val(result[i].BankId);
            }
            $("#spnTotalDD").html(parseFloat(sumAmount).toFixed(2));
        }
        else if (tableName == "tblCheque" && result != "") {
            var tr = $("#" + tableName).find("tbody tr");
            for (var i = 0; i < tr.length; i++) {
                $($(tr)[i].cells[3].children[0]).val(result[i].BankId);
            }
            $("#spnTotalCheque").html(parseFloat(sumAmount).toFixed(2));
        }
        else if (tableName == "tblElectronic" && result != "") {
            var tr = $("#" + tableName).find("tbody tr");
            for (var i = 0; i < tr.length; i++) {
                $($(tr)[i].cells[0].children[0]).val(result[i].InstrumentMode);
                $($(tr)[i].cells[4].children[0]).val(result[i].BankId);
            }
            $("#spnElectronic").html(parseFloat(sumAmount).toFixed(2));
        }

    }
    else {
        var count = $(tblPrdItemsMain).find("tbody tr").length;
        count = count + 1;
        for (var i = 0; i < row; i++) {
            var tr = "<tr flgdata='1' rowName='" + tableName + "' id='tr" + tableName + count + "'>";
            for (var j = 0; j < col; j++) {
                tr += "<td style=\"border-left: 1px solid #A0A0A0; border-bottom: 1px solid #A0A0A0;border-right: 1px solid #A0A0A0;text-align:center;\">";
                //alert($.inArray(j, arr));a
                //alert(temp);
                if ($.inArray("" + j + "", numericCol) != -1)
                    tr += "<input type='text' style='width: 89%;text-align:center; border-style: none;background-color:#fff;text-align:right;' value='0' onkeypress='return isNumericWithOneDecimal(event)' onmousedown='whichButton(event)' onfocus='Focus(this,0)' onkeydown='return noCTRL(event)' onblur=\"CalculateTotal(this," + tableName + "," + j + ",this.value)\"/>";
                else if ($.inArray("" + j + "", dateCol) != -1)
                    tr += "<input type='text' style='width: 80%; border-style: none;background-color:#fff' autocomplete='off' value='"+d.localeFormat("dd-MMM-yyyy")+"' class='dtp'/>";
                else if ($.inArray("" + j + "", fileUploadCol) != -1 && isfileUpload)
                    tr += "<input type='file' size='20' style='width:71%;'/>";
                else if ($.inArray("" + j + "", bankcolIndex) != -1)
                    tr += "<select style='width: 99%;' flg='banklist' onchange='fnPopulateBranch(this)'>" + $("#cphRight_hdnBankList").val() + "</select>";
                else if ($.inArray("" + j + "", bankBranchcolIndex) != -1)
                    tr += "<input type='text' style='width: 93%; border-style: none;background-color:#fff' autocomplete='off' value='' class='clsbranch' />";
                else if ($.inArray("" + j + "", modeColIndex) != -1)
                    tr += "<select style='width: 99%;' flg='modeList'>" + $("#cphRight_hdnModeList").val() + "</select>";
                else if ($.inArray("" + j + "", RefColIndex) != -1)
                    tr += "<input type='text' style='width: 93%; border-style: none;background-color:#fff'  autocomplete='off' value='' onkeypress='return ValidationControls(this," + j + "," + tableName + ",event)'/>";
                else
                    tr += "<input type='text' style='width: 93%; border-style: none;background-color:#fff' autocomplete='off' value=''  />";

                tr += "</td>";
            }
            if (i != row - 1) {
                tr += "<td style=\"border-left: 1px solid #A0A0A0; border-bottom: 1px solid #A0A0A0;border-right: 1px solid #A0A0A0;text-align:center;\"><a href='javascript:void(0);' style='border-style:none;color:#fff;' onclick='fnDeleteRow(this)'><img src='../images/icoMinus.gif' style='margin-top:-2px'  title='click to delete row'></a></td>";

            }
            else if (i == row - 1) {
                tr += "<td style=\"border-left: 1px solid #A0A0A0; border-bottom: 1px solid #A0A0A0;border-right: 1px solid #A0A0A0;text-align:center;\"><a href='javascript:void(0);' style='border-style:none;color:#fff;' onclick='fnAddRows(" + tableName + ",this)'><img src='../images/icoAdd.gif' style='margin-top:-2px'  title='click to Add row'></a></td>";
            }
            tr += "</tr>";
            $("#" + tableName).append(tr);
        }
    }
}


// Start Calcalute Method
function CalculateCashTotal(val) {
    
    if (parseInt(val) >= 0)
        $("#spnTotalCash").html(parseFloat(val).toFixed(2));
    else {
       // alert("Please enter correct amount.");
        $("#txtCash").val("0.00");
        //$("#txtCash").focus();
    }
    fnAutomaticAdjustMent();
}
function CalculateTotal(sender,tableName, colIndex, val) {
    if ($(sender).val() == "" || $(sender).val() == "-1")
    {
        $(sender).val("0");
    }
    var totalAmt = 0;
    var tr = $(tableName).find("tbody tr");
    for (var i = 0; i < tr.length; i++) {
        if ($(tr)[i].cells[colIndex].children[0].value != "0" && $($(tr)[i]).attr("flgdata") == "1")
            totalAmt = totalAmt + parseFloat($(tr)[i].cells[colIndex].children[0].value);
    }
    if ($(tableName).attr('id') == "tbldd") {
        $("#spnTotalDD").html(parseFloat(totalAmt).toFixed(2));
    }
    if ($(tableName).attr('id') == "tblCheque") {
        $("#spnTotalCheque").html(parseFloat(totalAmt).toFixed(2));
    }
    if ($(tableName).attr('id') == "tblElectronic") {
        $("#spnElectronic").html(parseFloat(totalAmt).toFixed(2));
    }
    fnAutomaticAdjustMent();
}
//End Here


// Start here Automatic Adjustment 
function fnAutomaticAdjustMent() {
  //  debugger;
    var sumOfTotalAmount = 0;
    var amount1 = parseFloat($("#spnTotalCash").html());
    var amount2 = parseFloat($("#spnTotalDD").html());
    var amount3 = parseFloat($("#spnTotalCheque").html());
    var amount4 = parseFloat($("#spnElectronic").html());
    sumOfTotalAmount = amount1 + amount2 + amount3 + amount4;
    //if (parseInt(sumOfTotalAmount) <= 0) {
    //    // alert("No enter amount is found ");
       
    //    return;
    //}
    $("#lblTotalPaidAmount").html(parseFloat(sumOfTotalAmount).toFixed(2));

    var rows = $("#tblInv1").find("tbody tr");
    if (rows.length > 0) {
        var totalamount = 0;
        //for (var i = 0; i < rows.length; i++) {
        //    totalamount = parseFloat(totalamount) + parseFloat($(rows)[i].cells[5].innerHTML);
        //    $(rows)[i].cells[6].children[0].value = 0;
        //}
        
        for (var i = 0; i < rows.length; i++) {
            var amount = $(rows)[i].cells[5].innerHTML;
            amount = parseFloat(amount);
            if (sumOfTotalAmount > amount) {
                sumOfTotalAmount = sumOfTotalAmount - amount;
                $(rows)[i].cells[6].children[0].value = parseFloat(amount).toFixed(2);
                totalamount = parseFloat(totalamount) + parseFloat(amount);
            }
            else {
                $(rows)[i].cells[6].children[0].value = parseFloat(sumOfTotalAmount).toFixed(2);
                totalamount = parseFloat(totalamount) + parseFloat(sumOfTotalAmount);
                break;
            }
        }
        $("#lblTotalInvoiceAmount").html(parseFloat(totalamount).toFixed(2));
        var balance = parseFloat(parseFloat($("#lblTotalInvoiceAmount").html()) - parseFloat($("#lblTotalPaidAmount").html())).toFixed(2);
        if (balance < 0)
            $("#lblBalance").html(Math.abs(balance));
        else
            $("#lblBalance").html("0.00");
    }
    else
        $("#lblBalance").html(parseFloat(sumOfTotalAmount).toFixed(2));
}
// End here Automatic Adjustment

// Validations Controls
function ValidationControls(ctrl, index, tableName,evt)
{
    var tblId = $(tableName).attr("id");
    if (tblId == "tbldd" || tblId == "tblCheque")
    {
        if (index == 0)
        {
            isNumber(evt);
        }
    }
}
//End Validation Table
// Common Function related to simple requirement
function whichButton(event) {
    if (event.button == 2)//RIGHT CLICK
    {
        alert("Not Allow Right Click!");
    }
}
function noCTRL(e) {
    //alert(e);
    //e.preventDefault();

    var code = (document.all) ? event.keyCode : e.which;
    var msg = "Sorry, this functionality is disabled.";
    if (parseInt(code) == 17) //CTRL
    {
        alert(msg);
        window.event.returnValue = false;
    }
}
function isNumber(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    if (key.length == 0) return;
    var regex = /^[0-9\b]+$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
        alert('Please enter Number Only');
    }
}
function isNumberKeyNotDecimal(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function isNumericWithOneDecimal(evt) {
    var val1; var elem;
    if (!(evt.keyCode == 46 || (evt.keyCode >= 48 && evt.keyCode <= 57)))
        return false;
    var parts = evt.srcElement.value.split('.');
    if (parts.length > 2)
        return false;
    if (evt.keyCode == 46)
        return (parts.length == 1);
    if (evt.keyCode != 46) {
        var currVal = String.fromCharCode(evt.keyCode);
        val1 = parseFloat(String(parts[0]) + String(currVal));
        if (parts.length == 2)
            val1 = parseFloat(String(parts[0]) + "." + String(currVal));
    }
    if ($(evt.srcElement).is("[crlt]")) {
        if (parseFloat(val1) > parseFloat($(evt.srcElement).data("creditLimit"))) {
            alert("Value can not be greater than Credit Limit!!");
            return false;
        }
        if (parts.length == 2 && parts[1].length >= 2) {
            return false;
        }
    }

    return true;
}
function validateEmail(sEmail) {
    var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    if (filter.test(sEmail)) {
        return true;
    }
    else {
        return false;
    }
}
// End here Common Function