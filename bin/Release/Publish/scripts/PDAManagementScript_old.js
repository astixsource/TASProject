
// Declare Global Variable
var _mainPanelName = "cphRight_", _leftPanelName = "cphRight_";
var _isLastAdded = false, _PDAvalue = "", _SIMvalue = "";
//Show and hide the PDA Div Box depend on Request type
function fnInitialize() {
    var pdaType = $("#" + _mainPanelName + "hdnType").val();
    $("#" + _mainPanelName + "divServiceProvider").hide();
    $("#" + _mainPanelName + "divSimMstr").hide();
    $("#" + _mainPanelName + "divPDAMstr").hide();
    $("#" + _mainPanelName + "divUserPdaMapping").hide();
    if (pdaType == 1) {
        $("#" + _mainPanelName + "divPDAMstr").show();
        $("#" + _leftPanelName + "divPdaM").show();
    }
    else if (pdaType == 2) {
        $("#" + _mainPanelName + "divSimMstr").show();
        $("#" + _leftPanelName + "divPdaSimM").show();
    }
    else if (pdaType == 3) {
        $("#" + _mainPanelName + "divServiceProvider").show();
        $("#" + _leftPanelName + "divPdaServiceM").show();
    }
    else if (pdaType == 4) {
        $("#" + _mainPanelName + "divUserPdaMapping").show();
       // $("#" + _leftPanelName + "divUsrPdaMapping").show();
    }
}

// Setting Data After Complete Page Load
$(document).ready(function () {

    // Calling First Un Mapped User List
    if ($("#rdUserUnMapped").is(":checked"))
        fnGetPDAMappedUnMappedUserList(1);
    else
        fnGetPDAMappedUnMappedUserList(2);

    // Bind Event For PDA Mapping and UnMapping User Section
    $("input[name='pdaMapped']:radio").on("change", function () {
        $("#dvFadeForProcessing").css("display", "block");
        fnResetMaster(1);
        fnGetPDAMappedUnMappedUserList($(this).val());
        $("#dvFadeForProcessing").css("display", "none");
    });

    var allocDate = new Date();
    $("#" + _mainPanelName + "txtAllocationDate").val(allocDate.localeFormat("dd-MMM-yyyy"));
});

// function To Call other function depend on request type on PDA User MApping Details
function fnCallPDAFunctionForMapDetails(element) {
    
        var checkedVal = 0;
        if ($("#rdUserUnMapped").is(":checked"))
            checkedVal = $("#rdUserUnMapped").val();
        if ($("#rdUserMapped").is(":checked"))
            checkedVal = $("#rdUserMapped").val();

        if (checkedVal == 2)
            fnDisplayPdaMapedMaster(element)
        else
            fnDisplayPdaMappingMaster(element);
    
}


// Get User Mapped and UnMapped List By Request Type
function fnGetPDAMappedUnMappedUserList(id) {
    
    $.ajax({
        type: "POST",
        async: true,
        url: "frmAllPDPMastersManagement.aspx/fnGetUserMappedUnMappedList",
        data: '{"RequestType":' + id + '}',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var jsdata = JSON.parse(data.d);
            $("#" + _mainPanelName + "ddlUserDetails").empty();
            $.each(jsdata, function (key, value) {
                $("#" + _mainPanelName + "ddlUserDetails").append($("<option></option>").val(
                        value.NodeType).html(value.NodeDesc));
            });
        },
        error: function (data) {
            alert(data.d);
        }
    });
}

// Display PDA Master Data For Edit in Main Section On Click
function fnDisplayPdaMaster(elementId) {
    // Spliting Value Binded in ListBox
    var val = $("#" + elementId + " option:selected").val();
    var txt = $("#" + elementId + " option:selected").text();
    var splitValue = val.split("^");
    var splitTxt = txt.split(",");

    //Check Text Value
    if (splitTxt.length > 0) {
        if (splitTxt[0] != undefined)
            $("#" + _mainPanelName + "txtPdaSerielMstr").val(splitTxt[0]);
        if (splitTxt[1] != undefined)
            $("#" + _mainPanelName + "txtPdaIEMIMaster2").val(splitTxt[1]);
    }
    else
        $("#" + _mainPanelName + "txtPdaSerielMstr").val(txt);

    //Check Split Value Is not undefined and length and assign value to field
    if (splitValue.length > 0) {
        if (splitValue[0] != undefined) {
            $("#hiddenNodeID").val(splitValue[0]);

        }
        if (splitValue[1] != undefined) {
            var pDate = "";
            if (splitValue[1] != '') {
                var dateParts = splitValue[1].split(' ')[0].split('-');
                pDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]).localeFormat("dd-MMM-yyyy")
            }
          $("#" + _mainPanelName + "txtPdaPurchseDate").val(pDate);
        }
        if (splitValue[2] != undefined) {
            $("#" + _mainPanelName + "txtPdaPurchseFrom").val(splitValue[2]);
        }
    }
}
// Display PDA SIM Master Data For Edit in Main Section On Click
function fnDisplayPdaSimMaster(elementId) {
    // Spliting Value Binded in ListBox
    var val = $("#" + elementId + " option:selected").val();
    var txt = $("#" + elementId + " option:selected").text();
    var splitValue = val.split("^");

    //Check Split Value Is not undefined and length and assign value to field
    if (splitValue.length > 0) {
        if (splitValue[0] != undefined) {
            $("#hiddenNodeID").val(splitValue[0]);
            $("#" + _mainPanelName + "txtPdaSimSeriel").val(txt);
        }
        if (splitValue[1] != undefined) {
            $("#" + _mainPanelName + "ddlServiceProvider").val(splitValue[1]);
        }
        if (splitValue[2] != undefined) {
            $("#" + _mainPanelName + "txtCellNumber").val(splitValue[2]);
        }
    }
}

// Display PDA Service Provider Master Data For Edit in Main Section On Click
function fnDisplayPdaServiceProviderMaster(elementId) {
    // Spliting Value Binded in ListBox
    var val = $("#" + elementId + " option:selected").val();
    var txt = $("#" + elementId + " option:selected").text();
    $("#" + _mainPanelName + "txtServiceProviderName").val(txt);
    //$("#" + _mainPanelName + "txtServiceProviderName").attr("title", val);
    $("#hiddenNodeID").val(val);
}

// Display PDA Un Mapping Master Data For Save in Main Section On Click
function fnDisplayPdaMappingMaster(elementId) {
    // Spliting Value Binded in ListBox
    fnRemoveLastItemForMapping();

    fnResetMaster(1);
    var val = $("#" + elementId + " option:selected").val();
    var txt = $("#" + elementId + " option:selected").text();
    $("#" + _mainPanelName + "txtUserDetail").val(txt);
    //$("#" + _mainPanelName + "txtUserDetail").attr("title", val);
    var splitValue = val.split("^");

    //Check Split Value Is not undefined and length and assign value to field
    if (splitValue.length > 0) {
        if (splitValue[0] != undefined) {
            $("#hiddenNodeID").val(splitValue[0]);
        }
        if (splitValue[1] != undefined) {
            $("#hdnPersonType").val(splitValue[1]);
        }
    }
}

// Display PDA Mapped Master Data For Edit in Main Section On Click
function fnDisplayPdaMapedMaster(elementId) {
    // Spliting Value Binded in ListBox
    var val = $("#" + elementId + " option:selected").val();
    var txt = $("#" + elementId + " option:selected").text();
    $("#" + _mainPanelName + "txtUserDetail").val(txt);
    //$("#" + _mainPanelName + "txtUserDetail").attr("title", val);
    var splitValue = val.split("^");

    //Check Split Value Is not undefined and length and assign value to field
    if (splitValue.length > 0) {
        if (splitValue[0] != undefined) {
            $("#hiddenNodeID").val(splitValue[0]);
        }
        if (splitValue[1] != undefined) {
            $("#hdnPersonType").val(splitValue[1]);
        }

        PageMethods.fnGetMappedAllocationUserDetails(parseInt(splitValue[0]), parseInt(splitValue[1]), fnGetMappedUserDetails_Success, fnGetMappedUserDetails_Fail);
    }
}
function fnGetMappedUserDetails_Success(res) {

    var dtItems = $.parseJSON('[' + res + ']');

    if (_isLastAdded) {
        if (_SIMvalue != 0) {
            $("#" + _mainPanelName + "ddlSim option[value='" + _SIMvalue + "']").remove();
        }
        if (_PDAvalue != 0) {
            $("#" + _mainPanelName + "ddlPda option[value='" + _PDAvalue + "']").remove();
        }
        _isLastAdded = false;
    }
    var simExists = false;
    $("#" + _mainPanelName + "ddlSim").each(function () {
  
        if (this.value == dtItems[0][0].PDASIMId) {
            simExists = true;
        }
    });
    var pdaExists = false;
    $("#" + _mainPanelName + "ddlPda").each(function () {
   
        if (this.value == dtItems[0][0].PDAId) {
            pdaExists = true;
        }
    });
    if (!simExists && dtItems[0][0].PDASIMId != null) {
        $("#" + _mainPanelName + "ddlSim").append($('<option></option>').val(dtItems[0][0].PDASIMId).html(dtItems[0][0].SerialNmbr));
        $("#" + _mainPanelName + "ddlSim").val(dtItems[0][0].PDASIMId);
    }
    else {
        if (dtItems[0][0].PDASIMId != null)
            $("#" + _mainPanelName + "ddlSim").val(dtItems[0][0].PDASIMId);
        else
            $("#" + _mainPanelName + "ddlSim").val("0");
    }
    if (!pdaExists && dtItems[0][0].PDAId != null) {
        $("#" + _mainPanelName + "ddlPda").append($('<option></option>').val(dtItems[0][0].PDAId).html(dtItems[0][0].PDA_IMEI + (dtItems[0][0].PDA_IMEI_Sec != "" ? (dtItems[0][0].PDA_IMEI_Sec == null ? "" : "," + dtItems[0][0].PDA_IMEI_Sec) : "")));
        $("#" + _mainPanelName + "ddlPda").val(dtItems[0][0].PDAId);
    }
    else {
        if (dtItems[0][0].PDAId != null)
            $("#" + _mainPanelName + "ddlPda").val(dtItems[0][0].PDAId);
        else
            $("#" + _mainPanelName + "ddlPda").val("0");
    }

    var allocDate = "";
    if (dtItems[0][0].Allocationdate != '') {
        var dateParts = dtItems[0][0].Allocationdate.split(' ')[0].split('-');
        var allocDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]).localeFormat("dd-MMM-yyyy")
    }

    $("#" + _mainPanelName + "txtAllocationDate").val(allocDate);
    $("#hiddenUserMapID").val(dtItems[0][0].PDAPersonMapID)
    _isLastAdded = true;
    _PDAvalue = dtItems[0][0].PDAId;
    _SIMvalue = dtItems[0][0].PDASIMId;
}
function fnGetMappedUserDetails_Fail(res) {
    alert(res);
}

//--------------------- Start Saving PDA Record In Database -------------------->
function fnSavePDARecordInDataBase() {
    var pdaType = $("#" + _mainPanelName + "hdnType").val();
    // Save PDA Master in Database
    if (pdaType == 1) {
        try {
            if (fnValidateControls()) {
                var PDAId = parseInt($("#hiddenNodeID").val());
                var modelName = "";
                var serialNo = $("#" + _mainPanelName + "txtPdaSerielMstr").val();
                var serialNo2 = $("#" + _mainPanelName + "txtPdaIEMIMaster2").val();
                var purchaseDate = $("#" + _mainPanelName + "txtPdaPurchseDate").val();
                var purchaseFrom = $("#" + _mainPanelName + "txtPdaPurchseFrom").val();
                PageMethods.SavePDAMaster(PDAId, modelName, serialNo, serialNo2, purchaseDate, purchaseFrom, fnSavePDARecord_Success, fnSavePDARecord_Fail);
            }
        }
        catch (err) {
            alert(err);
        }
    }
    // End Here Save PDA Master Function

    // Save PDA Sim Master in Database
    if (pdaType == 2) {
        try {
            if (fnValidateControls()) {
                var PDASimId = parseInt($("#hiddenNodeID").val());
                var serialNo = $("#" + _mainPanelName + "txtPdaSimSeriel").val();
                var ServiceProviderId = $("#" + _mainPanelName + "ddlServiceProvider").val();
                var CallNumber = $("#" + _mainPanelName + "txtCellNumber").val();
                PageMethods.SavePDASIMManageMaster(PDASimId, serialNo, ServiceProviderId, CallNumber, fnSavePDARecord_Success, fnSavePDARecord_Fail);
            }
        }
        catch (err) {
            alert(err);
        }
    }
    // End Here Save PDA Sim Master Function

    // Save PDA Service Provider Master in Database
    if (pdaType == 3) {
        try {
            if (fnValidateControls()) {
                var serviceId = parseInt($("#hiddenNodeID").val());
                var serivceProviderName = $("#" + _mainPanelName + "txtServiceProviderName").val();
                PageMethods.spPDASrvPrvManageMstr(serviceId, serivceProviderName, fnSavePDARecord_Success, fnSavePDARecord_Fail);
            }
        }
        catch (err) {
            alert(err);
        }
    }
    // End Here Save PDA Service Provider Master Function

    // Save PDA Mapping Master in Database
    if (pdaType == 4) {
        try {
            if (fnValidateControls()) {
                var PDAMappingId = parseInt($("#hiddenUserMapID").val());
                var personId = $("#hiddenNodeID").val();
                var personType = $("#hdnPersonType").val();
                var PDAId = $("#" + _mainPanelName + "ddlPda").val();
                var PDASimId = $("#" + _mainPanelName + "ddlSim").val();
                var AllocationDate = $("#" + _mainPanelName + "txtAllocationDate").val();
                PageMethods.SavePDAAllocationMapping(PDAMappingId, personId, personType, PDAId, PDASimId, AllocationDate, fnSavePDARecord_Success, fnSavePDARecord_Fail);
            }
        }
        catch (err) {
            alert(err);
        }
    }
    // End Here Save PDA Mapping Master Function

}
function fnSavePDARecord_Success(res) {
    if (res == 0) {
        alert("Information Added Successfully");
        fnResetMaster();
    }
    else if (res == 1) {
        alert("Information Updated Successfully");
        fnResetMaster();
    }
    else
        alert(res);
}
function fnSavePDARecord_Fail(res) {
    alert(res);
}
//<---------------- End Saving PDA Record in Database ------------------->


// Validate Controls Depend on Condition
function fnValidateControls() {
    var pdaType = $("#" + _mainPanelName + "hdnType").val();
    var _validMessage = "";
    var _isValid = false;
    // Validate PDA Master
    if (pdaType == 1) {
        if ($("#" + _mainPanelName + "txtPdaSerielMstr").val() == "")
            _validMessage = "Prd Seriel Number is Requird";
        else if ($("#" + _mainPanelName + "txtPdaPurchseDate").val() == "")
            _validMessage = "Purchase Date is Requird";
        else if ($("#" + _mainPanelName + "txtPdaPurchseFrom").val() == "")
            _validMessage = "Purchase From is Requird";
    }
    // Validate SIM Master
    if (pdaType == 2) {
        if ($("#" + _mainPanelName + "txtPdaSimSeriel").val() == "")
            _validMessage = "SIM Number is Requird";
        else if ($("#" + _mainPanelName + "ddlServiceProvider").val() == "0")
            _validMessage = "Please Select Service Provider";
        else if ($("#" + _mainPanelName + "txtCellNumber").val() == "")
            _validMessage = "Cell Number is Requird";
    }
    // Validate Service Provider
    if (pdaType == 3) {
        if ($("#" + _mainPanelName + "txtServiceProviderName").val() == "")
            _validMessage = "Service Provider name is Requird";
    }
    // Validate PDA Mapping
    if (pdaType == 4) {

        if ($("#" + _mainPanelName + "ddlUserDetails").val() == "0")
            _validMessage = "Please Select PDA User";
//        else if ($("#" + _mainPanelName + "ddlSim").val() == "0" && $("#hiddenUserMapID").val() == "0")
//            _validMessage = "Please Make SIM Selection";
        else if ($("#" + _mainPanelName + "ddlPda").val() == "0" && $("#hiddenUserMapID").val() == "0")
            _validMessage = "Please Make PDA Selection";
        else if ($("#" + _mainPanelName + "txtAllocationDate").val() == "")
            _validMessage = "Allcation Date is Requird";

        var allocationDate = new Date($("#" + _mainPanelName + "txtAllocationDate").val());
        var currentDate = new Date;

        if (allocationDate.getDate() < currentDate.getDate())
            _validMessage = "Allocation date is less than current date.";
    }

    if (_validMessage != "") {
        alert(_validMessage);
    }
    else
        _isValid = true;
    return _isValid;
}

// Checking Input value is number or not
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

// Remove Last Item For Mapping Select Box
function fnRemoveLastItemForMapping() {
    if (_isLastAdded) {
        if (_SIMvalue != 0) {
            $("#" + _mainPanelName + "ddlSim option[value='" + _SIMvalue + "']").remove();
        }
        if (_PDAvalue != 0) {
            $("#" + _mainPanelName + "ddlPda option[value='" + _PDAvalue + "']").remove();
        }
    }
}

// Reset All Filed For Add Case and Reset Case
function fnResetMaster(resetType) {

    // Page Reload or not using this variable 
    // 1 for not reload and 0 fro reload
    resetType = resetType || 0;


    // Clear PDA Master Value
    $("#" + _mainPanelName + "txtPdaSerielMstr").val("");
    $("#" + _mainPanelName + "txtPdaIEMIMaster2").val("");
    $("#" + _mainPanelName + "txtPdaPurchseDate").val("");
    $("#" + _mainPanelName + "txtPdaPurchseFrom").val("");

    // Clear Sim Master Value
    $("#" + _mainPanelName + "txtPdaSimSeriel").val("");
    $("#" + _mainPanelName + "ddlServiceProvider").val("");
    $("#" + _mainPanelName + "txtCellNumber").val("");

    // Clear Service Provider Value
    $("#" + _mainPanelName + "txtServiceProviderName").val("");

    // Clear PDA Mapping Value
    $("#" + _mainPanelName + "txtUserDetail").val("");
    $("#" + _mainPanelName + "ddlSim").val(0)
    $("#" + _mainPanelName + "ddlPda").val(0)
    var allocDate = new Date();
    $("#" + _mainPanelName + "txtAllocationDate").val(allocDate.localeFormat("dd-MMM-yyyy"));
    $("#hiddenUserMapID").val("0");
    $("#hdnPersonType").val("0");

    // Reseting Mapping Setting
    fnRemoveLastItemForMapping();
    //Making False Last Item Added
    _isLastAdded = false;

    // Reset NodeId
    $("#hiddenNodeID").val("0");
    if (resetType == 0)
        window.location.reload();

}

function fnHome() {
    // window.location = "../default.aspx";
}
//Loading Default Value After Page Load
$(document).ready(function () {

    // Function to Initialize the default Value after page load
    fnInitialize();
});
