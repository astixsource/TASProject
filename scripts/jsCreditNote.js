// Start Calcalute Method
function CalculateCashTotal() {

    var amount1 = parseFloat($("#txtCash").val() == "" ? 0 : $("#txtCash").val());
    //if (parseInt(amount1) == 0)
    //{
    //    alert("Please enter correct amount.");
    //    $("#txtCash").val("0.00");
    //    $("#txtCash").focus();
    //}
    
    fnAutomaticAdjustMent();
}


// Start here Automatic Adjustment 
function fnAutomaticAdjustMent() {

    var sumOfTotalAmount = 0;
    var amount1 = parseFloat($("#txtCash").val() == "" ? "0.00" : $("#txtCash").val());
    sumOfTotalAmount = amount1;
    //if (parseInt(sumOfTotalAmount) <= 0) {
    //    alert("No enter amount is found ");
    //    return;
    //}
    $("#lblTotalPaidAmount").html(parseFloat(sumOfTotalAmount).toFixed(2));
    var CreditNoteActionId = $("#cphRight_rdoCrNoteActionList input:checked").val();
    var rows = $("#tblInv1").find("tbody tr");
    if (CreditNoteActionId == 1) {
        if (rows.length > 0) {
            var totalamount = 0;
            for (var i = 0; i < rows.length; i++) {
                totalamount = parseFloat(totalamount) + parseFloat($(rows)[i].cells[5].innerHTML);
                $(rows)[i].cells[6].children[0].value = 0;
            }
            $("#lblTotalInvoiceAmount").html(parseFloat(totalamount).toFixed(2));
            for (var i = 0; i < rows.length; i++) {
                var amount = $(rows)[i].cells[5].innerHTML;
                amount = parseFloat(amount);
                if (sumOfTotalAmount > amount) {
                    sumOfTotalAmount = sumOfTotalAmount - amount;
                    $(rows)[i].cells[6].children[0].value = parseFloat(amount).toFixed(2);
                }
                else {
                    $(rows)[i].cells[6].children[0].value = parseFloat(sumOfTotalAmount).toFixed(2);
                    break;
                }
            }
            var balance = parseFloat(parseFloat($("#lblTotalInvoiceAmount").html()) - parseFloat($("#lblTotalPaidAmount").html())).toFixed(2);
            if (balance < 0)
                $("#lblBalance").html(Math.abs(balance));
            else
                $("#lblBalance").html("0.00");
        }
        else
            $("#lblBalance").html(parseFloat(sumOfTotalAmount).toFixed(2));
    } else {
        if (rows.length > 0) {
            var totalamount = 0;
            for (var i = 0; i < rows.length; i++) {
                totalamount = parseFloat(totalamount) + parseFloat($(rows)[i].cells[5].innerHTML);
                $(rows)[i].cells[6].children[0].value = 0;
            }
            $("#lblTotalInvoiceAmount").html(parseFloat(totalamount).toFixed(2));
        }
        var balance = parseFloat($("#lblTotalPaidAmount").html()).toFixed(2);
        $("#lblBalance").html(Math.abs(balance));
    }
}


// End here Automatic Adjustment

// Validations Controls
function ValidationControls(ctrl, index, tableName, evt) {
    var tblId = $(tableName).attr("id");
    if (tblId == "tbldd" || tblId == "tblCheque") {
        if (index == 0) {
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