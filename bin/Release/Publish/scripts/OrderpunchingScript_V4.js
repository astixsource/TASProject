$.widget('custom.mcautocompleteProductlist', $.ui.autocomplete, {
    _create: function () {
        this._super();
        this.widget().menu("option", "items", "> :not(.ui-widget-header)");
    },
    _renderMenu: function (ul, items) {
        var self = this;
        var $thead = "<thead style='display:none;'><tr><td style=\"width:60px;text-align:center\"></td><td style=\"width:250px\" ></td><td style=\"width:150px\"></td><td style=\"width:200px\" ></td><td style=\"width:130px\"></td><td style=\"width:80px\"></td><td style=\"width:80px\"></td></tr></thead>";
        var $table = $('<table id="tblPrdContainer" cellpadding="3" cellspacing="0">');
        $table.append($thead);
        $tbody = $('<tbody>');
        $table.append($tbody);
        var divs = $("#dvPrdContainer");
        divs.html($table);
        var cnt = 1;
        $.each(items, function (index, item) {
            if ($("#tblPrdItemsMain tr[skunodeid='" + item.SBFNodeId + "']").length == 0) {
                self._renderItemData(divs, divs.find("table tbody"), item, cnt);
                cnt++;
            }
        });
        $("#txtFindPrdCode").removeClass("ui-autocomplete-loading");
    },

    _renderItemData: function (divs, table, item, cnt) {
        return this._renderItem(table, item, cnt)
    },
    _renderItem: function (table, item, cnt) {
        var self = this;
        if (item.label == undefined) {
            var MRP = item["MRP"];
            var SBF = item["SBF"];
            var RLP = item["RLP"];
            var SKUNodeID = item["SBFNodeId"];
            var SKUNodeType = item["SBFNodeType"];
            var Category = item["Category"];
            var Categoryid = item["CatNodeID"];
            var UPC = item["PCSINBOX"];
            var flgInitiative = item["flgInitiative"];
            var flgFB = item["flgFB"];
            var FBID = item["FBID"];
            var flgSBD = item["flgSBD"];
            var sbdgroupid = item["SBDGroupId"];
            var $tr = $("<tr FBID='" + FBID + "' flgFB='" + flgFB + "' RLP='" + RLP + "'  flgSBD='" + flgSBD + "' sbdgroupid='" + sbdgroupid + "' flgInitiative='" + flgInitiative + "' MRP='" + MRP + "' SBF='" + SBF + "'  categoryid='" + Categoryid + "' SKUNodeID='" + SKUNodeID + "' UPC='" + UPC + "' SKUNodeType='" + SKUNodeType + "' Category='" + Category + "'>");

            $.each(self.options.columns, function (index, columnMapping) {
                var cellContent = item[columnMapping.valueField];
                if (columnMapping.valueField == "id") {
                    $('<td style="width:' + columnMapping.width + '" class="mcacAnchor" align="center" >').html('<input type="checkbox" id="chkprd' + (parseInt(cnt) - 1) + '"  />' + cnt).appendTo($tr);
                } else if (columnMapping.valueField == "MRP") {
                    $('<td style="width:' + columnMapping.width + '" class="mcacAnchor" onclick="fnFillOrder(this,2,event)" align="right" >').text(parseFloat(cellContent).toFixed(2)).appendTo($tr);
                }
                else if (columnMapping.valueField == "RLP") {
                    $('<td style="width:' + columnMapping.width + ';padding-right:8px" class="mcacAnchor" onclick="fnFillOrder(this,2,event)" align="right" >').text(parseFloat(cellContent).toFixed(2)).appendTo($tr);
                }
                else {
                    $('<td style="width:' + columnMapping.width + '" class="mcacAnchor" onclick="fnFillOrder(this,2,event)" >').text(cellContent).appendTo($tr);
                }
            });
        } else {
            var $tr = $('<tr>');
            $('<td colspan="5">').html(item.label).appendTo($tr);
        }

        return $tr.appendTo(table);
    }
});

function Focus(objname, waterMarkText) {
    obj = $(objname)[0];
    if (obj.value == waterMarkText) {
        obj.value = "";
        obj.style.color = "black";
    }
}
function Blur(objname, waterMarkText) {
    obj = $(objname)[0];
    if (obj.value == "") {
        obj.value = waterMarkText;
        obj.className = "WaterMarkedTextBox";
    }
    if (obj.value == waterMarkText) {
        obj.style.color = "gray";
    }
}


var SchemeDetailByStore = [];
var arredtboc_OderQuantityFinalSchemesToApply;
var arrGetDistinctProductIdAgainstStoreProduct;
var arrGetDistinctSchIdsAgainstStoreProduct;
var arrStoreProductAppliedSchemesBenifitsRecords = new Array();
var arrStoreProductAppliedSchemesBenifitsRecordsForDatabase;
var arrStoreProductAppliedSchemesBenifitsRecords_Temp = new Array();
var flgreqcount = 0;
var flgEditOrder = 0;
var Items = [];
var DlryData = [];
var DlvryData;
var strRequestType = 1;
var monthss = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var resultViewData = [];
var SkuCodeIndx = 0;
var MRPIndx = 1;
var UPCIndx = 2;
var SQtyIndx = 3;
var OrderQntyIndx = 4;
var UOMIndx = 5;
var RateIndx = 6;
var DiscountIndx = 7;
var currRateIndx = 8;
var BestRateIndx = 9;
var ValueBeforeTaxIndx = 10;
var ValueAfterTaxIndx = 11;


var flgCal = true;
var btnType = 1;
//End Transaction Coloumn Enum
var deliveryDate = "";
var HolidateList = []; //
//tips are optional but good to have
var OldSKUCode = "";
var flgDeleteBool = false;
var AdvChqIDD = 0;
var flgCloseDialog = 0;
var arrAddCharges = [];
var TotOtherCharges = 0;
var IsReturn = 0;
var flgApproved = 1;
var MaxTaxper = 0;
var sNodeId = 0;
var sNodeType = 0;
var IsFiveStarApplicable = 0;
$(document).ready(function () {
    $("body").addClass("clsbody")
    window.parent.sendparams();
    window.parent.fnRemoveClass();
    $("#dvFadeForProcessing").css("display", "block");
    $("#txtOrderDate").focus();
    IsFiveStarApplicable = $("#cphRight_hdnIsFiveStarApplicable").val();

    //if (IsFiveStarApplicable == 1) {
    //    $("#tblTarget0").show();
    //    $("#tblTarget1").show();
    //    $("#tblTarget2").show();
    //    $("#tblTarget").hide();
    //}
    fnSetDateTimePicker();
    var OrderId = $("#cphRight_hdnOrderID").val();
    var currDate = $("#cphRight_hdnCurrentDate").val();
    $("#dvFadeForProcessing").css("display", "block");
    var d = new Date(currDate);
    $("#txtOrderDate").val(d.localeFormat("dd-MMM-yyyy"));
    var OrderDate = $("#txtOrderDate").val();
    var SalesNodeId = $("#cphRight_hdnSalesNodeId").val();
    var SalesNodeType = $("#cphRight_hdnSalesNodeType").val();
    var SalesPersonID = 0;
    $('.slidable').hide();
    $(".click-side").click(function () {
        $('.slidable').animate({ width: 'toggle' }, 500);
    });
    fnGetStoreDetail();

});

function fnGetStoreDetail() {
    var strs = $("#cphRight_hdnNewStoreDetail").val();// = "5^ABC^2^1";//StoreId^StoreName^flgApproved^flgGST
    var StoreID = strs.split("^")[0];
    var TelecallingId = strs.split("^")[3];
    $("#cphRight_hdnSalesNodeType").val(strs.split("^")[2]);
    $("#cphRight_hdnSalesNodeId").val(strs.split("^")[1]);
    $("#cphRight_hdnTelecallingId").val(TelecallingId);


    //$("#txtStoreName").attr("storeid", StoreID);
    $("#hdnStoreID").val(StoreID);
    // $("#txtStoreName").closest("td").next().find("img").css("display", "block");
    $("#hdnNodeType").val(0);
    //$("#tdContactNo").html(strs.split("^")[4]);
    //$("#tdReason").html(strs.split("^")[5]);
    //$("#cphRight_ddlDSR").html("<option value='-1'>NA</option>");

    $("#hdnGSTType").val(0);
    // fnSetGSTCellHideNShow();
    $("#dvFadeForProcessing").css("display", "block");
    flgreqcount = 1;
    fnSchemeDetailByStore();
    //fnFillExistDetailForEditing(StoreID, 0, 1);
    $("#dvOrderListWait").show();
    $("#dvOrderListWait1").show();
    //fnVCTGetCompetitorDet(StoreID);
    fnGetLastOrders(StoreID, TelecallingId);

    //fnGetOrderByStore(StoreID);
}

function fnFailed(result) {
    flgCheckPmtTems = 0;
    $("#dvFadeForProcessing").css("display", "none");
    alert(result._message);
}
function fnSchemeDetailByStore() {
    //$("#dvFadeForProcessing").css("display", "block");
    var storeidd = $("#hdnStoreID").val();
    $.ajax({
        url: "frmOrderPunching_Telecaller.aspx/fnSchemeDetailByStore",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{storeid:' + storeidd + ',dt:' + JSON.stringify($("#txtOrderDate").val()) + '}',
        success: function (response) {
            //debugger;
            flgreqcount++;
            var str = response.d;
            if (str.split("|")[0] == 2) {
                alert("Error in Initiative Data Loading-" + str.split("|")[1] + "\n Kindly refresh the page before continue");
            } else {
                SchemeDetailByStore = $.parseJSON('[' + str + ']');
            }

            if (flgreqcount == 3) {
                $("#dvFadeForProcessing").css("display", "none");
            }
        },
        error: function (msg) {
            flgreqcount++;
            $("#dvFadeForProcessing").css("display", "none");
            alert('Error-' + msg.responseJSON.Message);

        }
    });
}
function fnTDCLICK() {
    //$("#tblPrdItemsMain").on("click", "td", function () {
    //    var x = $(this).closest('td').index();
    //    var y = $(this).closest('tr').index();
    //    alert("y=" + y + "\nx=" + x)
    //});
}

function fnSetDeliveryDate(date) {
    date.setDate(date.getDate() + 1);
    var isdlvydata = false;

    var weekoff = $("#cphRight_hdnDlvryWeeklyOffDay").val();
    if (HolidateList.length > 0) {
        weekoff = parseInt(weekoff) == 7 ? 0 : parseInt(weekoff == 0 ? -1 : weekoff);
        for (var i = 0; i < HolidateList.length; i++) {
            var HolidayDate = HolidateList[i].HolidayDate;
            var dayno = date.getDay();
            if (dayno == weekoff && new Date(parseInt(HolidayDate.substr(6))).localeFormat("d-MMM-yyyy") == date.localeFormat("d-MMM-yyyy")) {
                date.setDate(date.getDate() + 1);
            }
            else if (dayno == weekoff && new Date(parseInt(HolidayDate.substr(6))).localeFormat("d-MMM-yyyy") != date.localeFormat("d-MMM-yyyy")) {
                date.setDate(date.getDate() + 1);
            }
            else if (new Date(parseInt(HolidayDate.substr(6))).localeFormat("d-MMM-yyyy") == date.localeFormat("d-MMM-yyyy")) {
                date.setDate(date.getDate() + 1);
            }

        }
        $("#txtRequiredDlvryDate").val(date.localeFormat("dd-MMM-yyyy"));
        deliveryDate = $("#txtRequiredDlvryDate").val();
    } else {
        if (parseInt(weekoff) > 0) {
            weekoff = parseInt(weekoff) == 7 ? 0 : parseInt(weekoff);
            var dayno = date.getDay();
            if (dayno == weekoff) {
                date.setDate(date.getDate() + 1);
                $("#txtRequiredDlvryDate").val(date.localeFormat("dd-MMM-yyyy"));
                deliveryDate = $("#txtRequiredDlvryDate").val();
            } else {
                //date.setDate(date.getDate() + 1);
                $("#txtRequiredDlvryDate").val(date.localeFormat("dd-MMM-yyyy"));
                deliveryDate = $("#txtRequiredDlvryDate").val();
            }
        } else {
            //date.setDate(date.getDate() );
            $("#txtRequiredDlvryDate").val(date.localeFormat("dd-MMM-yyyy"));
            deliveryDate = $("#txtRequiredDlvryDate").val();
        }
    }
}
//muk

function fnGetLastOrders(storeid, TeleCallingId) {
    $.ajax({
        url: "frmOrderPunching_Telecaller.aspx/fnGetLastOrders",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{storeid:' + storeid + ',TeleCallingId:' + TeleCallingId + ',RoleId:' + $("#cphRight_hdnRoleId").val() + ',flgReleasingForTesting:' + $("#cphRight_hdnflgReleasingForTesting").val() + '}',
        async: true,
        success: function (response) {
            flgreqcount++;
            if (flgreqcount == 3) {
                $("#dvFadeForProcessing").css("display", "none");
            }
            if (response.d.split("|")[0] == "2") {
                $("#divSKUFiveOrderlstbasedOnstore").html("");
                $("#dvFadeForProcessing").css("display", "none");
                alert("Error-" + response.d.split("|")[1]);
            } else {
                var arrData = $.parseJSON("[" + response.d + "]");
                $("#divSKUFiveOrderlstbasedOnstore").html("");
                fnShowLastFiveOrders(arrData);
            }

            $("#dvOrderListWait1").hide();

        },
        error: function (msg) {
            $("#dvFadeForProcessing").css("display", "none");
            $("#dvOrderListWait1").hide();
            alert("Error-" + msg.statusText);
        }
    });
}


function multilvlPopuptbl(dt, col_ind, row_ind, totRowSpanLength) {
    var cntr = 1;
    var arrstr = dt.key(col_ind).split('^');
    var str = dt.key(col_ind).split('^')[row_ind];

    var flgcolor = "background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;padding:2px;";
    if (totRowSpanLength - 1 <= (row_ind + 1)) {
        flgcolor += "min-width:70px;width:70px";
    }

    //#728cd4
    var isMultiple = 1;
    for (var i = col_ind + 1; i < dt; i++) {
        var sname = dt.key(i).split('^')[row_ind];
        if (str == sname) {
            cntr++;
        }
        else {
            isMultiple = 0;
            break;
        }
    }

    var sscolspan = "colspan='" + cntr + "'";
    var cntrowspan = 0;
    if (totRowSpanLength - 1 == (row_ind + 1)) {
        if (arrstr[row_ind + 1].Trim() == "") {
            cntrowspan = row_ind + 1;
        }
    }
    cntrowspan = cntrowspan == 0 ? 1 : cntrowspan;
    return " <th style='" + flgcolor + "'   " + sscolspan + " rowspan='" + cntrowspan + "' > " + str + " </th>|" + cntr;
}

var arrProductList = []; var arrSBDGrp = []; var flgTaskEnable = 0;
function fnShowLastFiveOrders(arrData) {
    flgTaskEnable = 0;
    var strHML = "";
    var arr = ["PrdNodeId", "PrdNodeType", "PcsInBox", "Category", "CategoryId", "CategoryNetValue", "SBFNetValue", "OrderType", "SBDGroup", "CatNodeID", "SBDGroupId", "flgBaseProduct", "SBDPrdCnt", "InvLevelDisc", "flgInitiative", "flgInactive", "flgFB", "Brand", "brandNetValue", "FBName", "FBID", "IsFBProductShow", "flgSBD", "SBDStrCnt", "Reco_Strategy", "SeqNo", "flgSmartBasket", "flgDefaultSmartBasket", "CategorySB","SqNo"];
    var currDate = $("#cphRight_hdnCurrentDate").val();
    var d = new Date(currDate);
    // $("#tdCallStartTIme")[0].innerHTML = "<b>Call Start At : </b>" + (d.localeFormat("hh:mm tt"));

    if (arrData.length > 0) {
        if (arrData[0].Table.length == 0) {
            $("#anchorbtn2").hide();
        }
        arrProductList = arrData[0].Table7;
        var callRemarks = "";
        if (arrData[0].Table6.length > 0) {
            // $("#tdBranchName").html(arrData[0].Table6[0]["Branch"]);
            var DSEName = arrData[0].Table6[0]["PersonName"];
            //$("#tdDSEName").html(DSEName.split("(")[0]);
            var strname = arrData[0].Table6[0]["StoreName"];
            callRemarks = arrData[0].Table6[0]["Remarks"];
            flgTaskEnable = arrData[0].Table6[0]["flgTaskEnable"];
            if (flgTaskEnable == 1) {
                $("#btnDSERemarks,#btnTaskList").closest("td").css("display", "table-cell");
            }
            $("#txtRemarksToDsr")[0].value = arrData[0].Table6[0]["DSEComments"];
            $("#tdRCallingRemarks").html(callRemarks);
            if (callRemarks.trim() != "") {
                $("#tdRCallingRemarks").closest("tr").css("display", "table-row");
            }
            $("#tdRStoreName").html(strname);
            $("#tdRCustType").html(arrData[0].Table6[0]["Customer Type"]);
            if (arrData[0].Table6[0]["BirthDate"] == null || arrData[0].Table6[0]["BirthDate"] == "") {
                $("#tdRStoreDOB").closest("table").hide();
            } else {
                $("#tdRStoreDOB").html(arrData[0].Table6[0]["BirthDate"]);
            }


            //$("#tblStoreInfo tbody").find("td").eq(5).html(arrData[0].Table6[0]["BirthDate"]);

            //strname = strname.length > 31 ? strname.substr(0, 30) + ".." : strname;
            //if (strname.length > 31) {
            //    $("#txtStoreName").attr("title", arrData[0].Table6[0]["StoreName"]);
            //}
            //$("#txtStoreName").html(strname);

            var Channel = arrData[0].Table6[0]["Channel"];
            $("#tdRChannelName").html(Channel);
            Channel = Channel.length > 20 ? Channel.substr(0, 19) + ".." : Channel;
            if (Channel.length > 20) {
                $("#tdStoreChannel").attr("title", arrData[0].Table6[0]["Channel"]);
            }
            $("#tdStoreChannel").html(Channel);

            var subchannel = arrData[0].Table6[0]["subchannel"] == null ? "" : arrData[0].Table6[0]["subchannel"];
            subchannel = subchannel.length > 20 ? subchannel.substr(0, 19) + ".." : subchannel;
            if (subchannel.length > 20) {
                $("#tdStoreSubChannel").attr("title", arrData[0].Table6[0]["subchannel"]);
            }
            $("#tdStoreSubChannel").html(subchannel);

            //subchannel 

            var SectorCode = arrData[0].Table6[0]["SectorCode"];
            SectorCode = SectorCode.length > 20 ? SectorCode.substr(0, 19) + ".." : SectorCode;
            if (strname.length > 20) {
                $("#tdSector").attr("title", arrData[0].Table6[0]["SectorCode"]);
            }
            $("#tdSector").html(SectorCode);


            $("#tdCallType").html(arrData[0].Table6[0]["Call Type"]);

            // $("#tdReason").html(arrData[0].Table6[0]["Reason"]);
            $("#tdRCallingReason").html(arrData[0].Table6[0]["Reason"]);

            // $("#tdScheduledDT").html(arrData[0].Table6[0]["ScheduleDate"]);
            var sContactno = arrData[0].Table6[0]["ContactNo"];
            var TokenNo = $("#cphRight_hdnTokenNo").val();
            var strContactNo = "";
            if (TokenNo == "") {
                strContactNo = "<a href='tel:" + sContactno.split(",")[0].split("/")[0] + "' flg='1'  style ='color:blue !important;text-decoration:underline !important;' title='Click to make call' id='aLinkContactNo'>" + sContactno.split(",")[0].split("/")[0] + "</a>";//<input type='text' value='" + sContactno.split(",")[0].split("/")[0] + "' onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' autocomplete=\"off\" style='display:none;width:70px' /><a href='###'  onclick='fnEditContactNo(this)'  style='font-size:9pt;margin:0px 7px'><span class='glyphicon glyphicon-pencil'></span></a><a href='###'  style='display:none;font-size:9pt;color:green;margin:0px 3px' onclick='fnUpdateAndCancelContactInfo(this,1)'><span class='glyphicon glyphicon-ok'></a><a href='###' onclick='fnUpdateAndCancelContactInfo(this,2)' style='display:none;font-size:9pt;color:red'><span class='glyphicon glyphicon-remove'></span></a>";
            } else {
                strContactNo = "<a href ='###' flg='1' onclick ='fnSentNotification(this)' style ='color:blue !important;text-decoration:underline !important;' title='Click to make call' id='aLinkContactNo'>" + sContactno.split(",")[0].split("/")[0] + "</a>";//<input type='text' value='" + sContactno.split(",")[0].split("/")[0] + "' onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' autocomplete=\"off\" style='display:none;width:70px' /><a href='###'  onclick='fnEditContactNo(this)'  style='font-size:9pt;margin:0px 7px'><span class='glyphicon glyphicon-pencil'></span></a><a href='###'  style='display:none;font-size:9pt;color:green;margin:0px 3px' onclick='fnUpdateAndCancelContactInfo(this,1)'><span class='glyphicon glyphicon-ok'></a><a href='###' onclick='fnUpdateAndCancelContactInfo(this,2)'  style='display:none;font-size:9pt;color:red'><span class='glyphicon glyphicon-remove'></span></a>";
            }
            $("#tdContactNo").html(strContactNo);
            var AlternateContactNo = arrData[0].Table6[0]["AlternateContactNo"];

            var strCont = AlternateContactNo != null && AlternateContactNo != "" ? "<a href ='###' flg='1' id='linkAlternateContactNo' onclick ='fnSentNotification(this)' style ='color:blue !important;text-decoration:underline !important;' title='Click to make call'>" + AlternateContactNo + "</a><a href='###' style='font-size:9.5pt;margin-left:5px' onclick='fnAddAlternateContactNo()'><span class='glyphicon glyphicon-pencil'></span></a>" : "<a href='###' style='font-size:9.5pt' onclick='fnAddAlternateContactNo()'><span class='glyphicon glyphicon-plus'></span></a>";
            $("#tdAltContactNo").html(strCont);

            $("#tdROwnerName").html(arrData[0].Table6[0]["ContactPerson"]);
            // $("#txtRemarks").html(arrData[0].Table6[0]["Remarks"]);

            $("#tdProductivityBal").data("FiveStarProductivityTgt", arrData[0].Table6[0]["FiveStarProductivityTgt"]);
            $("#tdGPBal").data("FiveStarNoOfGPTgt", arrData[0].Table6[0]["FiveStarNoOfGPTgt"]);
            $("#tdFBBal").data("FiveStarNoOfLSSTgt", arrData[0].Table6[0]["FiveStarNoOfLSSTgt"]);
            $("#tdSHTBal").data("FiveStarIndTgtDlvryVal", arrData[0].Table6[0]["FiveStarIndTgtDlvryVal"]);


            $("#tblTarget0 tr")[1].cells[1].innerHTML = "&#8377; " + Math.round(arrData[0].Table6[0]["FiveStarTotIndTgtDlvryVal"]);
            $("#tblTarget0 tr")[1].cells[2].innerHTML = "&#8377; " + Math.round(arrData[0].Table6[0]["FiveStarIndTgtDlvryVal"]);

            // $("#tblTarget1 tr")[1].cells[1].innerHTML = arrData[0].Table6[0]["TotMnthGPTgt"];
            $("#tblTarget1 tr")[1].cells[2].innerHTML = arrData[0].Table6[0]["FiveStarNoOfGPTgt"];
            var FiveStarNoOfLSSAct = arrData[0].Table6[0]["FiveStarNoOfLSSAct"];
            FiveStarNoOfLSSAct = FiveStarNoOfLSSAct == null ? 0 : FiveStarNoOfLSSAct;
            //  $("#tblTarget2 tr")[1].cells[1].innerHTML = arrData[0].Table6[0]["NoOfLSSSchme"];
            $("#tblTarget2 tr")[1].cells[1].innerHTML = arrData[0].Table6[0]["FiveStarNoOfLSSTgt"];
            for (var ls = 0; ls < FiveStarNoOfLSSAct; ls++) {
                arrLssApplied.push(ls);
            }

        }


        if (arrData[0].Table4.length > 0) {
            //var str = "<table>";
            //for (var i in arrData[0].Table4) {
            //    str += "<tr>";

            //    str += "<td style='padding:2px'><b>" + arrData[0].Table4[i]["PreviousText"] + "</b></td><td  style='padding:2px'>:</td><td  style='padding:2px'>" + arrData[0].Table4[i]["PreviousValue"] + "</td>";

            //    str += "</tr>";
            //}
            //str += "</table>";
            //$("#divPrevContactedData")[0].innerHTML = str;
        }

        if (arrData[0].Table5.length > 0) {
            var str = "<table>";
            for (var i in arrData[0].Table5) {
                str += "<tr>";

                str += "<td><b>" + arrData[0].Table5[i]["OutStandingText"] + "</b></td><td>:</td><td>&#8377; " + arrData[0].Table5[i]["OutStandingValue"] + "</td>";

                str += "</tr>";

            }
            str += "</table>";
            //$("#divOutstandingData")[0].innerHTML = str;
            $("#tdRTotOustamt")[0].innerHTML = "&#8377; " + arrData[0].Table5[i]["OutStandingValue"];
        }

        if (arrData[0].Table9.length > 0) {
            var str = "";
            for (var i in arrData[0].Table9) {
                var LastOrdered = arrData[0].Table9[i]["Last Ordered"] == null ? "" : arrData[0].Table9[i]["Last Ordered"];
                var LastVisit = arrData[0].Table9[i]["Last Visit"] == null ? "" : arrData[0].Table9[i]["Last Visit"];
                var LastTASCall = arrData[0].Table9[i]["Last TAS Call"] == null ? "" : arrData[0].Table9[i]["Last TAS Call"];
                str += "<tr>";
                str += "<td>" + arrData[0].Table9[i]["Particular"] + "</td>";
                str += "<td>" + LastOrdered + "</td>";
                str += "<td style='text-align:center'>" + LastVisit + "</td>";
                str += "<td>" + LastTASCall + "</td>";
                str += "</tr>";
            }
            $("#tblStoreLastVisit tbody")[0].innerHTML = str;
        }
        if (arrData[0].Table1.length > 0) {
            var strHML = ""; var strHML1 = "";
            var style = "border-left: 1px solid #A0A0A0; border-bottom: 1px solid #A0A0A0;";
            //strHML1 += ("<table cellpadding='2' class='table table-bordered' cellspacing='0' style='border-right: 1px solid #A0A0A0; border-top: 1px solid #A0A0A0;text-align:center;width:100%'>");
            //strHML1 += ("<tr bgcolor='#26a6e7'><td style='" + style + ";color:#fff;padding:2px;text-align:left'>Inv#</td><td style='" + style + ";color:#fff;padding:2px'>Inv.Date</td><td style='" + style + ";color:#fff;padding:2px;text-align:right'>Inv Val</td><td style='" + style + ";color:#fff;padding:2px;text-align:right'>Outs Amt</td></tr>");
            var strHTML1 = "";
            for (var i in arrData[0].Table1) {
                var InvId = 0;// dr["InvId"].ToString();
                var flgTeleOrderInv = arrData[0].Table1[i]["flgTeleOrderInv"];
                var bgcolr = flgTeleOrderInv == 1 ? "bgcolor='#9fff9f'  title='Inovoiced through Tele Order '" : "";
                var OutstandingAmt = arrData[0].Table1[i]["OutstandingAmt"] == null ? "" : "&#8377; " + arrData[0].Table1[i]["OutstandingAmt"];
                strHML += "<tr>";
                strHML += "<td style='padding:2px'>" + arrData[0].Table1[i]["InvNo"] + "</td>";
                strHML += "<td style='padding:2px;text-align:center'>" + arrData[0].Table1[i]["Inv Date"] + "</td>";
                strHML += "<td style='padding:2px;text-align:right'>&#8377; " + arrData[0].Table1[i]["NetValue"] + "</td>";
                strHML += "<td style='padding:2px;text-align:right'>" + OutstandingAmt + "</td>";
                strHML += "</tr>";
            }
            // $("#divOrderlstbasedOnstore")[0].innerHTML = strHML1 + strHML + "</table>";
            $("#tblInvStoreOutstading tbody")[0].innerHTML = strHML;
            strHML = "";
            strHML1 = "";
        }
        $("#tblTarget_PlannedCall tbody").html("");
        if (arrData[0].Table6[0]["RuleId"] == 3) {
            $("#tblTarget0,#tblTarget1,#tblTarget2,#tblTarget_OtherCall,#tblRFocusDelivered").hide();
            if (arrData[0].Table10.length > 0) {
                //multilvlPopuptbl(dt, col_ind, row_ind, totRowSpanLength)
                var strhtml = "";
                for (var i in arrData[0].Table10) {
                    strhtml += "<tr>";
                    strhtml += "<td>" + arrData[0].Table10[i]["Particular"] + "</td>";
                    strhtml += "<td style='text-align:center'>" + arrData[0].Table10[i]["Month Target^TAS"] + "</td>";
                    strhtml += "<td style='text-align:center'>" + arrData[0].Table10[i]["Month Target^DSE"] + "</td>";
                    strhtml += "<td style='text-align:center'>" + arrData[0].Table10[i]["Month Target^Total"] + "</td>";
                    strhtml += "<td style='text-align:center'>" + arrData[0].Table10[i]["MTD Achievement^TAS"] + "</td>";
                    strhtml += "<td style='text-align:center'>" + arrData[0].Table10[i]["MTD Achievement^DSE"] + "</td>";
                    strhtml += "<td style='text-align:center'>" + arrData[0].Table10[i]["MTD Achievement^Total"] + "</td>";
                    strhtml += "<td style='text-align:center'>" + arrData[0].Table10[i]["MTD Achievement^Call Target"] + "</td>";
                    strhtml += "<tr>";
                }
                $("#tblTarget_PlannedCall tbody").html(strhtml);
            } else {
                $("#tblRFocusDelivered,#tblTarget_PlannedCall").hide();
            }
        } else {
            $("#tblRFocusDelivered,#tblTarget_PlannedCall").hide();
        }
        $("#tblTarget_OtherCall tbody").html("");
        if (arrData[0].Table6[0]["RuleId"] == 4) {

            $("#tblTarget_OtherCall").hide();
            $("#tblTarget0,#tblTarget1,#tblTarget2,#tblRFocusDelivered").show();
            if (arrData[0].Table13.length > 0) {
                //multilvlPopuptbl(dt, col_ind, row_ind, totRowSpanLength)
                var strhtml = "";
                for (var i in arrData[0].Table13) {
                    strhtml += "<tr>";
                    strhtml += "<td>" + arrData[0].Table13[i]["Particular"] + "</td>";
                    strhtml += "<td style='text-align:center'>" + arrData[0].Table13[i]["Month Target"] + "</td>";
                    strhtml += "<td style='text-align:center'>" + arrData[0].Table13[i]["MTD Achievement"] + "</td>";
                    strhtml += "<td style='text-align:center'>" + arrData[0].Table13[i]["Call Target"] + "</td>";
                    strhtml += "<tr>";
                }
                $("#tblTarget_OtherCall tbody").html(strhtml);
            } else {
                $("#tblTarget_OtherCall").hide();
            }
        } else {
            $("#tblRFocusDelivered,#tblTarget_OtherCall").hide();
        }


        if (arrData[0].Table11.length > 0) {
            var str = ""; var str1 = ""; var totFocusBrand = 0; var TotAchievement = 0;
            for (var i in arrData[0].Table11) {
                totFocusBrand++;
                var FBName = arrData[0].Table11[i]["FBName"];
                var Target = arrData[0].Table11[i]["Target"];
                var IsAchieved = arrData[0].Table11[i]["IsAchieved"];
                var Achievement = arrData[0].Table11[i]["Achievement"];
                var SlabTypeId = arrData[0].Table11[i]["SlabTypeId"];
                var InOrder = arrData[0].Table11[i]["InOrder"];
                Achievement = parseInt(arrData[0].Table11[i]["Achievement"]) + parseInt(arrData[0].Table11[i]["InOrder"]);
                var GAP = (parseInt(arrData[0].Table11[i]["Target"]) - Achievement);
                GAP = GAP < 0 ? 0 : GAP;
                var flgNewAchievement = 0;
                if (parseInt(GAP) == 0) {
                    TotAchievement++;
                    if (parseInt(arrData[0].Table11[i]["InOrder"]) > 0) {
                        flgNewAchievement = 1;
                    }
                }
                var FBID = arrData[0].Table11[i]["FBID"];

                var fbAchPer = parseInt(Achievement) * 100 / parseInt(Target);
                var sbgclass = "";
                if (fbAchPer > 60 && fbAchPer < 100) {
                    sbgclass = "clsOrangeBg";
                } else if (fbAchPer >= 100) {
                    sbgclass = "clsGreenBg";
                }

                str += "<tr class='" + sbgclass + "' FBID='" + FBID + "'>";
                str += "<td >" + FBName + "></td>";
                str += "<td style='text-align:center'>" + Target + "</td>";
                str += "<td style='text-align:center'>" + Achievement + "</td>";
                str += "<td style='text-align:center'>" + GAP + "</td>";
                str += "</tr>";
                var oldfbachievement = Achievement;
                if (parseInt(arrData[0].Table11[i]["Achievement"]) == 0 && parseInt(arrData[0].Table11[i]["InOrder"]) > 0) {
                    oldfbachievement = 0;
                } else {
                    oldfbachievement = arrData[0].Table11[i]["Achievement"];
                }
                str1 += "<tr class='" + sbgclass + "' FBID='" + FBID + "' flgOldAchievement='" + IsAchieved + "' flgNewAchievement='" + flgNewAchievement + "' SlabTypeId='" + SlabTypeId + "' fbtarget='" + Target + "' fbachievement='0' oldfbachievement='" + oldfbachievement + "'  OldInOrder='" + arrData[0].Table11[i]["InOrder"] + "' onclick=\"fnShowFocusBrandSBF(this,'" + FBID + "')\" style='cursor:pointer'>";
                str1 += "<td style='line-height:normal;color:blue;text-decotation:underline' id='tdfb_" + FBID + "'>" + FBName + "></td>";
                str1 += "<td style='text-align:center;line-height:normal'>" + Achievement + " / " + Target + "</td>";
                str1 += "<td style='text-align:center;line-height:normal'>" + GAP + "</td>";
                str1 += "<td style='text-align:left;line-height:normal'>" + parseInt(InOrder) + "</td>";
                str1 += "</tr>";

            }
            $("#tblFocusBrand tbody")[0].innerHTML = str;

            $("#tblFocusBrandMain tbody")[0].innerHTML = str1;
        } else {
            $("#tblFocusBrand").hide();
        }
        if (arrData[0].Table11.length > 0) {
            // $("#tblRFocusDelivered").hide();

            $("#tdTotFocusDelivered")[0].innerHTML = TotAchievement + " / " + totFocusBrand;
        } else {
            $("#tblRFocusDelivered").hide();
        }

        $("#tdAltContactNo").closest("tr").hide();
        var RoleId = $("#cphRight_hdnRoleId").val();
        if (RoleId != 10) {
            $("#tdAltContactNo").closest("tr").css("display", "table-row");
            $(window).scrollTop(0);
            // $("body").removeClass("clsbody").addClass("bodyScrollHidden");
            $("#dvRestorecheck").dialog({
                title: "Review Plan",
                modal: true,
                width: "80%",
                height: window.innerHeight - 5,
                open: function () {
                    $("div[aria-describedby='dvRestorecheck']").find("div.ui-dialog-titlebar").css({
                        "background-color": "#DEEBF7",
                        "text-align": "center",
                        "border-color": "#DEEBF7",
                        "color": "#000000",
                        "border-bottom-left-radius": "0px",
                        "border-bottom-right-radius": "0px",
                    })
                    $("div[aria-describedby='dvRestorecheck']").find("div.ui-dialog-titlebar").html("Review Plan");
                    if (flgTaskEnable == 1) {
                        $("div[aria-describedby='dvRestorecheck']").find("div.ui-dialog-buttonpane").append("<div style='float:left;display:inline-block;margin:10px'><a href='###' onclick='fnShowTaskList()' style='color:blue;text-decoration:underline'>All Task List</a></div>")
                    }
                },
                close: function () {
                    $(this).dialog("destroy");
                    //  $("body").removeClass("bodyScrollHidden").addClass("clsbody");
                },
                buttons: {
                    "Place Call": function () {
                        $("#tblStoreLastVisit").appendTo($("#divslidable"));
                        $("#tblInvStoreOutstading").appendTo($("#divslidable"));
                        $("#dvRestorecheck").dialog('close');
                        $("#aLinkContactNo").click();
                    },
                    "Close": function () {
                        $("#tblStoreLastVisit").appendTo($("#divslidable"));
                        $("#tblInvStoreOutstading").appendTo($("#divslidable"));
                        $("#dvRestorecheck").dialog('close');
                    }
                }
            })
        }
        if (arrData[0].Table.length > 0) {
            var flgwidhtValid = false; var cntdates = 0; var cntKeys = 0;
            var style = "border-left: 1px solid #6f6f6f; border-bottom: 1px solid #6f6f6f;";
            strHML += ("<thead>");//<table cellpadding='2' cellspacing='0' style='font-family:arial narrow;font-size:9px;border-right: 1px solid #A0A0A0; border-top: 1px solid #A0A0A0;text-align:center;width:100%'>
            strHML += ("<tr bgcolor='#26a6e7'>");
            var cntrowspan = 2; var cntcol = 0;
            $.each(arrData[0].Table[0], function (key, value) {
                if ($.inArray(key, arr) == -1) {
                    var scol = key;
                    var salign = "text-align:center;"
                    if (key == "Category" || key == "Product Name") {
                        salign = "text-align:left;padding-left:3px"
                    }
                    var swidth = "";
                    if (key == "Order Qty") {
                        swidth = ";width:7%";
                    }
                    else if (key == "UOM") {
                        swidth = ";width:5%";
                    }
                    else if (key == "Suggested Qty") {
                        swidth = ";width:7%";
                        scol = "Suggstd. Qty";
                    }
                    else if (key == "Disc Value") {
                        swidth = ";width:7%";
                        scol = "Current RLP";
                    }
                    else if (key == "Rate") {
                        swidth = ";width:6.5%";
                        scol = "Standard RLP";
                    }
                    else if (key == "MRP") {
                        swidth = ";width:6.5%";
                    }
                    else if (key == "Best rate") {
                        swidth = ";width:6.5%";
                        scol = "Best RLP";
                    }
                    else if (key == "Line Value") {
                        flgwidhtValid = true;
                        swidth = ";width:9%";
                    }

                    if (flgwidhtValid == true && key != "Line Value") {
                        if (cntcol == 0) {
                            cntcol = 1;
                            cntrowspan = 0;
                            strHML += "<th colspan='5' style='" + style + ";color:#ffffff;text-align:center;position:relative;background-color:#005329;'>Past Order History</th>";
                            strHML += ("</tr><tr>");
                        }
                        swidth = ";width:5%;background-color:#00ca65";
                        scol = key.indexOf("NA") > -1 ? "NA" : key;
                    }
                    cntKeys++;
                    if (key == "Disc Value") {
                        strHML += "<th rowspan='" + cntrowspan + "' style='" + style + ";color:#ffffff;" + salign + swidth + ";position:relative'>Disc Value</th>";
                        strHML += "<th rowspan='" + cntrowspan + "' style='" + style + ";color:#ffffff;" + salign + swidth + ";position:relative'>" + scol + "</th>";
                    }
                    else {
                        strHML += "<th rowspan='" + cntrowspan + "' style='" + style + ";color:#ffffff;" + salign + swidth + ";position:relative'>" + scol + "</th>";
                    }
                    
                }
            });
            strHML += ("</tr></thead><tbody>");
            var cntTotSKUs = 0;
            var cntTotNetVal = 0;
            var cnt = 1;
            var oldVal = "";
            var oldSBDGroup = "";
            //var Table = arrData[0].Table;
            var TotSBD = 0;
            var TotSBDOrdered = 0;
            var cntTotDiscVal = 0;
            arrSBDGrp = [];
            var TotalIdealValue = 0;
            var TotalIdealLine = 0;
            var OderValueBrforeTax = 0;

           // let arrSlabsachievementDetails = flgSchemeExistAgainStore.slice().sort((a, b) => parseInt(b.SlabId) - parseInt(a.SlabId));
            var arrTable1 = jQuery.grep(arrData[0].Table, function (element, index) {
                return (element.flgSmartBasket > 0);
            });
            var Table = arrTable1.slice().sort((a, b) => parseInt(a.SeqNo) - parseInt(b.SeqNo));
            //var Table = jQuery.grep(arrData[0].Table, function (element, index) {
            //    return (element.CategorySB == "Priority Smart Basket");
            //});
            for (var i in Table) {
                cnt++;
                cntTotNetVal += parseFloat(Table[i]["Line Value"]);
                cntTotDiscVal += parseFloat(Table[i]["Disc Value"]);
                var standardratebeforetax = Table[i]["Rate"];
                var bestrate = Table[i]["Best rate"];
                var SeqNo = Table[i]["SeqNo"];
                var flgBaseProduct = parseInt(Table[i]["flgBaseProduct"]);
                var flgDefaultSmartBasket = Table[i]["flgDefaultSmartBasket"]
                var flgSBDChild = parseInt(Table[i]["SBDPrdCnt"]);
                var MRP = parseFloat(Table[i]["MRP"]);
                var UPC = parseInt(Table[i]["UPC"]);
                var SuggestedQty = parseInt(Table[i]["Suggested Qty"]);
                var Qty = Table[i]["Order Qty"];
                var flgInitiative = Table[i]["flgInitiative"] == undefined ? 0 : Table[i]["flgInitiative"];
                var flgInactive = Table[i]["flgInactive"] == undefined ? 0 : Table[i]["flgInactive"];
                var flgfb = Table[i]["flgFB"] == undefined ? 0 : Table[i]["flgFB"];
                var FBName = Table[i]["FBName"];
                var FBID = Table[i]["FBID"];
                var flgSBD = Table[i]["flgSBD"];
                var flgSmartBasket = Table[i]["flgSmartBasket"];
                var IsFBProductShow = Table[i]["IsFBProductShow"];
                OderValueBrforeTax += parseInt(Qty) * parseFloat(standardratebeforetax);
                if (Qty > 0) {
                    cntTotSKUs++;
                }
                var tcpoints = 0;// arrData["TCPoints"] == null ? "0" : arrData["TCPoints"];
                //if (oldVal != Table[i]["CategorySB"]) {
                //    strHML += ("<tr flgdata='2' " + (flgDefaultSmartBasket == 0 ? "style='display:none;" : "") + " flgDefaultSmartBasket='" + flgDefaultSmartBasket + "' flgsbdgap='0' sbdgroupid='" + Table[i]["SBDGroupId"] + "' categoryid='" + Table[i]["CatNodeID"] + "' category='" + Table[i]["CategorySB"] + "'>");
                //    strHML += ("<td  colspan='" + (cntKeys + 1) + "' style='" + style + ";background-color:#b0b0ff;font-weight:bold;padding:3px 5px;'>");

                //    if (flgDefaultSmartBasket == 1) {
                //        strHML += Table[i]["CategorySB"];
                //    } else {
                //        strHML += Table[i]["Category"];
                //    }
                //    strHML += ("</td>");
                //    strHML += ("</tr>");
                //}
                //oldVal = Table[i]["CategorySB"];

                if (oldVal != Table[i]["CatNodeID"]) {
                    strHML += ("<tr flgdata='2' " + (flgDefaultSmartBasket == 0 ? "style='display:none;" : "") + " flgDefaultSmartBasket='" + flgDefaultSmartBasket + "' flgsbdgap='0' sbdgroupid='" + Table[i]["SBDGroupId"] + "' categoryid='" + Table[i]["CatNodeID"] + "' category='" + Table[i]["Category"] + "'>");
                    strHML += ("<td  colspan='" + (cntKeys + 1) + "' style='" + style + ";background-color:#b0b0ff;font-weight:bold;padding:3px 5px;'>");

                    //if (flgDefaultSmartBasket == 1) {
                    //    strHML += Table[i]["CategorySB"];
                    //} else {
                        strHML += Table[i]["Category"];
                    //}
                    strHML += ("</td>");
                    strHML += ("</tr>");
                }
                oldVal = Table[i]["CatNodeID"];

                var tdbgcolor = "";
                if ((parseInt(Table[i]["OrderType"]) == 1 || parseInt(Table[i]["OrderType"]) == 3) && flgBaseProduct == 0) {
                    tdbgcolor = flgSBD == 2 ? "#ffc489" : "#f9f2f2";
                } else if (parseInt(Table[i]["OrderType"]) == 3 && flgBaseProduct == 1) {
                    tdbgcolor = flgSBD == 2 ? "#ff962d" : "#e0c5c5";
                } else if (parseInt(Table[i]["OrderType"]) == 1 && flgBaseProduct == 1) {
                    tdbgcolor = flgSBD == 2 ? "#ff962d" : "#e8d2d2";
                }

                var sbdgrouphightlight = "";
                if (parseInt(Table[i]["OrderType"]) == 1 || parseInt(Table[i]["OrderType"]) == 3) {
                    if (Qty > 0) {
                        var sbdgrpid = Table[i]["SBDGroupId"];
                        if ($.inArray(sbdgrpid, arrSBDGrp) == -1) {
                            sbdgrouphightlight = "class='trHightlightSBD'";
                            arrSBDGrp.push(sbdgrpid);
                        }
                    }
                }

                if ((parseInt(Table[i]["OrderType"]) == 1 || parseInt(Table[i]["OrderType"]) == 3) && flgBaseProduct == 1) {
                    TotSBD++;
                    strHML += ("<tr SeqNo='" + SeqNo +"' bestrate='" + bestrate + "' Reco_Strategy='" + Table[i]["Reco_Strategy"] + "' flgInactive='" + flgInactive + "' FBID='" + FBID + "' flgDefaultSmartBasket='" + flgDefaultSmartBasket + "' flgSmartBasket='" + flgSmartBasket + "' flgSBD='" + flgSBD + "'  SuggestedQty='" + SuggestedQty + "' UPC='" + UPC + "' flgInitiative='" + flgInitiative + "' flgfb='" + flgfb + "' SBDChild='" + Table[i]["SBDPrdCnt"] + "' flgsearch='1' oqty='" + Qty + "' flgbaseproduct='1' flgtrconsider='" + (Table[i]["SBDPrdCnt"] > 1 ? 0 : 1) + "' OrderType='" + Table[i]["OrderType"] + "' flgsbdgap='" + ((parseInt(Table[i]["OrderType"]) == 1 || parseInt(Table[i]["OrderType"]) == 3) ? 1 : 0) + "' style='" + style + "'  flgdata='1' sbdgroupid='" + Table[i]["SBDGroupId"] + "' categoryid='" + Table[i]["CatNodeID"] + "' category='" + Table[i]["CategorySB"] + "' skunodeid=" + Table[i]["PrdNodeId"] + " standardratebeforetax='" + standardratebeforetax + "' " + sbdgrouphightlight + "   mrp='" + MRP + "' >");
                } else {
                    strHML += ("<tr SeqNo='" + SeqNo +"' bestrate='" + bestrate + "' Reco_Strategy='" + Table[i]["Reco_Strategy"] + "' flgInactive='" + flgInactive + "' FBID='" + FBID + "' flgDefaultSmartBasket='" + flgDefaultSmartBasket + "'  flgSmartBasket='" + flgSmartBasket + "'  flgSBD='" + flgSBD + "'  SuggestedQty='" + SuggestedQty + "'  UPC='" + UPC + "' flgInitiative='" + flgInitiative + "' flgfb='" + flgfb + "' SBDChild='" + Table[i]["SBDPrdCnt"] + "' flgdata='1' oqty='" + Qty + "' flgbaseproduct='0' flgtrconsider='" + (Table[i]["SBDPrdCnt"] > 1 ? 0 : 1) + "' flgsearch='1' OrderType='" + Table[i]["OrderType"] + "' flgsbdgap='" + ((parseInt(Table[i]["OrderType"]) == 1 || parseInt(Table[i]["OrderType"]) == 3) ? "1" : "0") + "' " + tdbgcolor + "  sbdgroupid='" + Table[i]["SBDGroupId"] + "' categoryid='" + Table[i]["CatNodeID"] + "' category='" + Table[i]["CategorySB"] + "' skunodeid=" + Table[i]["PrdNodeId"] + " standardratebeforetax='" + standardratebeforetax + "'  mrp='" + MRP + "' >");
                }

                $.each(Table[i], function (key, value) {
                    if ($.inArray(key, arr) == -1) {
                        var Searchable = 0;
                        var salign = ";text-align:center;"
                        if (key == "Product Name") {
                            Searchable = 1;
                            var scolor = flgSBD == 2 ? ";color:#000000" : "";
                            salign = ";text-align:left;padding-left:9px;background-color:" + tdbgcolor + scolor;
                        }
                        else if (key == "UOM") {
                            Searchable = 1;
                            salign = ";text-align:left;padding-left:5px;"
                        }
                        else if (key == "MRP" || key == "Rate" || key == "Line Value" || key == "Disc Value" || key == "Best rate") {
                            salign = ";text-align:right;padding-right:4px;"
                        }
                        if (key == "Product Name") {
                            var prdName = "<input type='hidden' id='hdnprdName' value='" + Table[i]["Product Name"] + "' />";
                            var strPromoimgage = ""; var strFBLink = "";
                            var strPrdname = parseInt(Table[i]["SBDStrCnt"]) > 0 ? ((value == null ? "" : value) + " (" + parseInt(Table[i]["SBDStrCnt"]) + " <i class='fas fa-store' style='color:darkmagenta'></i>)") : (value == null ? "" : value);
                            //if ((parseInt(Table[i]["OrderType"]) == 1 || parseInt(Table[i]["OrderType"]) == 3) && flgDefaultSmartBasket == 0) {
                            //    strPromoimgage = flgSBD == 1 ? " <img src='../btnImg/sbd_icon.png' style='width:8%;cursor:default' />" : "";
                            //}

                            if (flgDefaultSmartBasket == 1) {
                                strPromoimgage = " <div class='clsDivSBIcon' style='border:2px solid #FE4225;'>SB</div>";
                            }
                            else if (flgSmartBasket == 2 && flgDefaultSmartBasket == 0) {
                                strPromoimgage = " <div class='clsDivSBIcon' style='border:2px solid #FE4225'>SB</div>";
                            }

                            if (flgSBD == 1) {
                                strPromoimgage += " <img src='../btnImg/sbd_icon.png' style='width:8%;cursor:default' />";
                            }




                            if ((parseInt(flgfb) == 1)) {
                                // value = IsFBProductShow == 1 ? "<a href='###' style='color:blue;text-decoration:underline' onclick='fnFilterFBSBF(this)'>" + value + "</a>" : value;
                                strPromoimgage += "<img src='../btnImg/fb-icon.png' style='width:8%;margin-left:3px;cursor:default' />";
                            }
                            if (flgInitiative == 1) {
                                strPromoimgage += "<img src='../btnImg/offers-icon.png' style='width:8%;margin-left:3px;cursor:default' />";
                            }
                            var recomandstring = Table[i]["Reco_Strategy"] != "" && Table[i]["Reco_Strategy"] != null ? "<br/><i style='font-size:7.8pt' class='clsrecom'>" + Table[i]["Reco_Strategy"] + "</i>" : "";
                            if ((parseInt(Table[i]["OrderType"]) == 1 || parseInt(Table[i]["OrderType"]) == 3) && flgBaseProduct == 1 && flgSBDChild > 1) {
                                strHML += ("<td flgconsider='1' style='" + style + salign + "' Searchable='" + Searchable + "'><img src='../NewImages/icoMinus.gif' onclick='fnColapse(this)' >&nbsp;" + strPrdname + strPromoimgage + recomandstring + prdName + "</td>");
                            }
                            else if ((parseInt(Table[i]["OrderType"]) == 1 || parseInt(Table[i]["OrderType"]) == 3) && flgBaseProduct == 0) {
                                strHML += ("<td flgconsider='1'  style='" + style + salign + ";padding-left:15px' Searchable='" + Searchable + "'>&nbsp;" + strPrdname + strPromoimgage + recomandstring + prdName + "</td>");
                            }
                            else {
                                strHML += ("<td flgconsider='1'  style='" + style + salign + "' Searchable='" + Searchable + "'>" + strPrdname + strPromoimgage + recomandstring + prdName + "</td>");
                            }
                        }
                        else if (key == "Order Qty") {

                            if (flgBaseProduct == 1 && flgInactive == 1) {
                                strHML += ("<td flgconsider='1'  style='" + style + salign + ";height:20px'>NA</td>");
                            } else {
                                strHML += ("<td flgconsider='1'  style='" + style + salign + "'><input type='text' flgSBDChild='" + flgSBDChild + "' style='width: 40px;height:99.5%;text-align:right;padding-right:4px; border: 1px solid #bbbbbb;background-color:#ffffff;z-index: 150' sgtval='" + arrData[0].Table[i]["Suggested Qty"] + "' value='" + value + "' onfocus=\"Focus(this,'0')\" onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' onblur=\"Blur(this,'0')\" onchange=\"fnCalculateData(this)\" autocomplete=\"off\" /><img src='../btnImg/UomInPC.png' style='width:20px' onclick='fnShowUOMDetail(this)' /></td>");
                            }
                        } else if (key == "UOM") {
                            strHML += ("<td flgconsider='1'  style='" + style + ";text-align:center' >" + value + "</td>");
                        }
                        else if (key == "MRP") {

                            strHML += ("<td flgconsider='1' style='" + style + salign + "'>&#8377; " + Math.round(value) + "</td>");
                        }
                        else if (key == "Rate") {

                            strHML += ("<td flgconsider='1' style='" + style + salign + "'>&#8377; " + parseFloat(value).toFixed(2) + "</td>");
                        }
                        else if (key == "Best rate") {

                            strHML += ("<td flgconsider='1' style='" + style + salign + "'>&#8377; " + parseFloat(value).toFixed(2) + "</td>");
                        }
                        else if (key == "Disc Value") {
                            var crRate = parseInt(Qty) == 0 ? standardratebeforetax : (parseFloat(Table[i]["Line Value"]) - parseFloat(Table[i]["InvLevelDisc"])) / parseInt(Qty);
                            strHML += ("<td flgconsider='1' style='" + style + salign + ";' currentrate='" + crRate + "'  DiscountAmount='" + value + "' InvLevelDisc='" + arrData[0].Table[i]["InvLevelDisc"] + "'  iden='disc' >&#8377; " + parseFloat(Table[i]["InvLevelDisc"]).toFixed(2) + "</td>");
                            strHML += ("<td flgconsider='1' style='" + style + salign + ";color:blue;cursor:pointer;text-decoration:underline' currentrate='" + crRate + "'  DiscountAmount='" + value + "' InvLevelDisc='" + arrData[0].Table[i]["InvLevelDisc"] + "'  iden='currRate' onclick='fnShowSchemeAndRelatedSKUsDetails(this)'>&#8377; " + parseFloat(crRate).toFixed(2) + "</td>");
                        }
                        else if (key == "UPC") {
                            strHML += ("<td flgconsider='1' style='" + style + salign + ";'>" + value + "</td>");
                        }
                        else if (key == "Suggested Qty") {
                            strHML += ("<td flgconsider='1' style='" + style + salign + ";padding-right:4px' flgsgt='1' sgtvalue='" + value + "' ><table style='width:100%' cellspacing='0' cellpadding='0'><tr prdid=" + arrData[0].Table[i]["PrdNodeId"] + "><td style='text-align:right'>" + value + "</td><td style='text-align:right;width:24px' sgtval='" + value + "'><span class='glyphicon glyphicon-arrow-right' style='margin-left:2px;cursor:pointer' onclick='fnMoveQty(this,0)' title='click to move into Order Qty' ></span></td></tr></table></td>");
                        }
                        else if (key == "Line Value") {
                            flgwidhtValid = true;
                            strHML += ("<td flgconsider='1' style='" + style + salign + "' valaftertax='" + value + "'  iden='netval'>&#8377; " + parseFloat(value).toFixed(2) + "</td>");
                        }

                        else {
                            if (flgwidhtValid == true && key != "Line Value") {
                                strHML += ("<td flgconsider='1' style='" + style + salign + ";font-size:10px;font-family:Arial Narrow;padding-right:8px;text-align:right' >" + (value == null ? "" : value) + "</td>");
                            } else {
                                strHML += ("<td flgconsider='1' style='" + style + salign + "' Searchable=" + Searchable + ">" + (value == null ? "" : value) + "</td>");
                            }

                        }

                    }
                });
                strHML += ("</tr>");
            }

            //var Table = jQuery.grep(arrData[0].Table, function (element, index) {
            //    return (element.CategorySB != "Priority Smart Basket");
            //});
            var Table = jQuery.grep(arrData[0].Table, function (element, index) {
                return (element.flgSmartBasket == 0);
            });
           
            for (var i in Table) {
                cnt++;
                cntTotNetVal += parseFloat(Table[i]["Line Value"]);
                cntTotDiscVal += parseFloat(Table[i]["Disc Value"]);
                var standardratebeforetax = Table[i]["Rate"];
                var bestrate = Table[i]["Best rate"];
                var SeqNo = Table[i]["SeqNo"];
                var flgBaseProduct = parseInt(Table[i]["flgBaseProduct"]);
                var flgDefaultSmartBasket = 0;// Table[i]["flgDefaultSmartBasket"]
                var flgSBDChild = parseInt(Table[i]["SBDPrdCnt"]);
                var MRP = parseFloat(Table[i]["MRP"]);
                var UPC = parseInt(Table[i]["UPC"]);
                var SuggestedQty = parseInt(Table[i]["Suggested Qty"]);
                var Qty = Table[i]["Order Qty"];
                var flgInitiative = Table[i]["flgInitiative"] == undefined ? 0 : Table[i]["flgInitiative"];
                var flgInactive = Table[i]["flgInactive"] == undefined ? 0 : Table[i]["flgInactive"];
                var flgfb = Table[i]["flgFB"] == undefined ? 0 : Table[i]["flgFB"];
                var FBName = Table[i]["FBName"];
                var FBID = Table[i]["FBID"];
                var flgSBD = Table[i]["flgSBD"];
                var flgSmartBasket = Table[i]["flgSmartBasket"];
                var IsFBProductShow = Table[i]["IsFBProductShow"];
                OderValueBrforeTax += parseInt(Qty) * parseFloat(standardratebeforetax);
                if (Qty > 0) {
                    cntTotSKUs++;
                }
                var tcpoints = 0;// arrData["TCPoints"] == null ? "0" : arrData["TCPoints"];
                if (oldVal != Table[i]["CatNodeID"]) {
                    strHML += ("<tr flgdata='2' " + (flgDefaultSmartBasket == 0 ? "style='display:none;" : "") + " flgDefaultSmartBasket='" + flgDefaultSmartBasket + "' flgsbdgap='0' sbdgroupid='" + Table[i]["SBDGroupId"] + "' categoryid='" + Table[i]["CatNodeID"] + "' category='" + Table[i]["Category"] + "'>");
                    strHML += ("<td  colspan='" + (cntKeys + 1) + "' style='" + style + ";background-color:#b0b0ff;font-weight:bold;padding:3px 5px;'>");

                    //if (flgDefaultSmartBasket == 1) {
                    //    strHML += Table[i]["CategorySB"];
                    //} else {
                        strHML += Table[i]["Category"];
                    //}
                    strHML += ("</td>");
                    strHML += ("</tr>");
                }
                oldVal = Table[i]["CatNodeID"];
                var tdbgcolor = "";
                if ((parseInt(Table[i]["OrderType"]) == 1 || parseInt(Table[i]["OrderType"]) == 3) && flgBaseProduct == 0) {
                    tdbgcolor = flgSBD == 2 ? "#ffc489" : "#f9f2f2";
                } else if (parseInt(Table[i]["OrderType"]) == 3 && flgBaseProduct == 1) {
                    tdbgcolor = flgSBD == 2 ? "#ff962d" : "#e0c5c5";
                } else if (parseInt(Table[i]["OrderType"]) == 1 && flgBaseProduct == 1) {
                    tdbgcolor = flgSBD == 2 ? "#ff962d" : "#e8d2d2";
                }

                var sbdgrouphightlight = "";
                if (parseInt(Table[i]["OrderType"]) == 1 || parseInt(Table[i]["OrderType"]) == 3) {
                    if (Qty > 0) {
                        var sbdgrpid = Table[i]["SBDGroupId"];
                        if ($.inArray(sbdgrpid, arrSBDGrp) == -1) {
                            sbdgrouphightlight = "class='trHightlightSBD'";
                            arrSBDGrp.push(sbdgrpid);
                        }
                    }
                }

                if ((parseInt(Table[i]["OrderType"]) == 1 || parseInt(Table[i]["OrderType"]) == 3) && flgBaseProduct == 1) {
                    TotSBD++;
                    strHML += ("<tr SeqNo='" + SeqNo +"' bestrate='" + bestrate + "' Reco_Strategy='" + Table[i]["Reco_Strategy"] + "' flgInactive='" + flgInactive + "' FBID='" + FBID + "' flgDefaultSmartBasket='" + flgDefaultSmartBasket + "' flgSmartBasket='" + flgSmartBasket + "' flgSBD='" + flgSBD + "'  SuggestedQty='" + SuggestedQty + "' UPC='" + UPC + "' flgInitiative='" + flgInitiative + "' flgfb='" + flgfb + "' SBDChild='" + Table[i]["SBDPrdCnt"] + "' flgsearch='1' oqty='" + Qty + "' flgbaseproduct='1' flgtrconsider='" + (Table[i]["SBDPrdCnt"] > 1 ? 0 : 1) + "' OrderType='" + Table[i]["OrderType"] + "' flgsbdgap='" + ((parseInt(Table[i]["OrderType"]) == 1 || parseInt(Table[i]["OrderType"]) == 3) ? 1 : 0) + "' style='" + style + "'  flgdata='1' sbdgroupid='" + Table[i]["SBDGroupId"] + "' categoryid='" + Table[i]["CatNodeID"] + "' category='" + Table[i]["Category"] + "' skunodeid=" + Table[i]["PrdNodeId"] + " standardratebeforetax='" + standardratebeforetax + "' " + sbdgrouphightlight + "   mrp='" + MRP + "' >");
                } else {
                    strHML += ("<tr SeqNo='" + SeqNo +"' bestrate='" + bestrate + "' Reco_Strategy='" + Table[i]["Reco_Strategy"] + "' flgInactive='" + flgInactive + "' FBID='" + FBID + "' flgDefaultSmartBasket='" + flgDefaultSmartBasket + "'  flgSmartBasket='" + flgSmartBasket + "'  flgSBD='" + flgSBD + "'  SuggestedQty='" + SuggestedQty + "'  UPC='" + UPC + "' flgInitiative='" + flgInitiative + "' flgfb='" + flgfb + "' SBDChild='" + Table[i]["SBDPrdCnt"] + "' flgdata='1' oqty='" + Qty + "' flgbaseproduct='0' flgtrconsider='" + (Table[i]["SBDPrdCnt"] > 1 ? 0 : 1) + "' flgsearch='1' OrderType='" + Table[i]["OrderType"] + "' flgsbdgap='" + ((parseInt(Table[i]["OrderType"]) == 1 || parseInt(Table[i]["OrderType"]) == 3) ? "1" : "0") + "' " + tdbgcolor + "  sbdgroupid='" + Table[i]["SBDGroupId"] + "' categoryid='" + Table[i]["CatNodeID"] + "' category='" + Table[i]["Category"] + "' skunodeid=" + Table[i]["PrdNodeId"] + " standardratebeforetax='" + standardratebeforetax + "'  mrp='" + MRP + "' >");
                }

                $.each(Table[i], function (key, value) {
                    if ($.inArray(key, arr) == -1) {
                        var Searchable = 0;
                        var salign = ";text-align:center;"
                        if (key == "Product Name") {
                            Searchable = 1;
                            var scolor = flgSBD == 2 ? ";color:#000000" : "";
                            salign = ";text-align:left;padding-left:9px;background-color:" + tdbgcolor + scolor;
                        }
                        else if (key == "UOM") {
                            Searchable = 1;
                            salign = ";text-align:left;padding-left:5px;"
                        }
                        else if (key == "MRP" || key == "Rate" || key == "Line Value" || key == "Disc Value" || key == "Best rate") {
                            salign = ";text-align:right;padding-right:4px;"
                        }
                        if (key == "Product Name") {
                            var prdName = "<input type='hidden' id='hdnprdName' value='" + Table[i]["Product Name"] + "' />";
                            var strPromoimgage = ""; var strFBLink = "";
                            var strPrdname = parseInt(Table[i]["SBDStrCnt"]) > 0 ? ((value == null ? "" : value) + " (" + parseInt(Table[i]["SBDStrCnt"]) + " <i class='fas fa-store' style='color:darkmagenta'></i>)") : (value == null ? "" : value);
                            //if ((parseInt(Table[i]["OrderType"]) == 1 || parseInt(Table[i]["OrderType"]) == 3) && flgDefaultSmartBasket == 0) {
                            //    strPromoimgage = flgSBD == 1 ? " <img src='../btnImg/sbd_icon.png' style='width:8%;cursor:default' />" : "";
                            //}

                            flgSmartBasket
                            if (flgDefaultSmartBasket == 1) {
                                strPromoimgage = " <div class='clsDivSBIcon' style='border:2px solid #FE4225;'>SB</div>";
                            }
                            else if (flgSmartBasket == 2 && flgDefaultSmartBasket == 0) {
                                strPromoimgage = " <div class='clsDivSBIcon' style='border:2px solid #FE4225'>SB</div>";
                            }

                            if (flgSBD == 1 && flgDefaultSmartBasket == 0) {
                                strPromoimgage += " <img src='../btnImg/sbd_icon.png' style='width:8%;cursor:default' />";
                            }




                            if ((parseInt(flgfb) == 1)) {
                                // value = IsFBProductShow == 1 ? "<a href='###' style='color:blue;text-decoration:underline' onclick='fnFilterFBSBF(this)'>" + value + "</a>" : value;
                                strPromoimgage += "<img src='../btnImg/fb-icon.png' style='width:8%;margin-left:3px;cursor:default' />";
                            }
                            if (flgInitiative == 1) {
                                strPromoimgage += "<img src='../btnImg/offers-icon.png' style='width:8%;margin-left:3px;cursor:default' />";
                            }
                            var recomandstring = Table[i]["Reco_Strategy"] != "" && Table[i]["Reco_Strategy"] != null ? "<br/><i style='font-size:7.8pt' class='clsrecom'>" + Table[i]["Reco_Strategy"] + "</i>" : "";
                            if ((parseInt(Table[i]["OrderType"]) == 1 || parseInt(Table[i]["OrderType"]) == 3) && flgBaseProduct == 1 && flgSBDChild > 1) {
                                strHML += ("<td flgconsider='1' style='" + style + salign + "' Searchable='" + Searchable + "'><img src='../NewImages/icoMinus.gif' onclick='fnColapse(this)' >&nbsp;" + strPrdname + strPromoimgage + recomandstring + prdName + "</td>");
                            }
                            else if ((parseInt(Table[i]["OrderType"]) == 1 || parseInt(Table[i]["OrderType"]) == 3) && flgBaseProduct == 0) {
                                strHML += ("<td flgconsider='1'  style='" + style + salign + ";padding-left:15px' Searchable='" + Searchable + "'>&nbsp;" + strPrdname + strPromoimgage + recomandstring + prdName + "</td>");
                            }
                            else {
                                strHML += ("<td flgconsider='1'  style='" + style + salign + "' Searchable='" + Searchable + "'>" + strPrdname + strPromoimgage + recomandstring + prdName + "</td>");
                            }
                        }
                        else if (key == "Order Qty") {

                            if (flgBaseProduct == 1 && flgInactive == 1) {
                                strHML += ("<td flgconsider='1'  style='" + style + salign + ";height:20px'>NA</td>");
                            } else {
                                strHML += ("<td flgconsider='1'  style='" + style + salign + "'><input type='text' flgSBDChild='" + flgSBDChild + "' style='width: 40px;height:99.5%;text-align:right;padding-right:4px; border: 1px solid #bbbbbb;background-color:#ffffff;z-index: 150' sgtval='" + arrData[0].Table[i]["Suggested Qty"] + "' value='" + value + "' onfocus=\"Focus(this,'0')\" onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' onblur=\"Blur(this,'0')\" onchange=\"fnCalculateData(this)\" autocomplete=\"off\" /><img src='../btnImg/UomInPC.png' style='width:20px' onclick='fnShowUOMDetail(this)' /></td>");
                            }
                        } else if (key == "UOM") {
                            strHML += ("<td flgconsider='1'  style='" + style + ";text-align:center' >" + value + "</td>");
                        }
                        else if (key == "MRP") {

                            strHML += ("<td flgconsider='1' style='" + style + salign + "'>&#8377; " + Math.round(value) + "</td>");
                        }
                        else if (key == "Rate") {

                            strHML += ("<td flgconsider='1' style='" + style + salign + "'>&#8377; " + parseFloat(value).toFixed(2) + "</td>");
                        }
                        else if (key == "Best rate") {

                            strHML += ("<td flgconsider='1' style='" + style + salign + "'>&#8377; " + parseFloat(value).toFixed(2) + "</td>");
                        }
                        //else if (key == "Disc Value") {
                        //    var crRate = parseInt(Qty) == 0 ? standardratebeforetax : (parseFloat(Table[i]["Line Value"]) - parseFloat(Table[i]["InvLevelDisc"])) / parseInt(Qty);
                        //    strHML += ("<td flgconsider='1' style='" + style + salign + ";color:blue;cursor:pointer;text-decoration:underline' currentrate='" + crRate + "'  DiscountAmount='" + value + "' InvLevelDisc='" + arrData[0].Table[i]["InvLevelDisc"] + "'  iden='disc' onclick='fnShowSchemeAndRelatedSKUsDetails(this)'>&#8377; " + parseFloat(crRate).toFixed(2) + "</td>");
                        //}
                        else if (key == "Disc Value") {
                            var crRate = parseInt(Qty) == 0 ? standardratebeforetax : (parseFloat(Table[i]["Line Value"]) - parseFloat(Table[i]["InvLevelDisc"])) / parseInt(Qty);
                            strHML += ("<td flgconsider='1' style='" + style + salign + ";' currentrate='" + crRate + "'  DiscountAmount='" + value + "' InvLevelDisc='" + arrData[0].Table[i]["InvLevelDisc"] + "'  iden='disc' >&#8377; " + parseFloat(Table[i]["InvLevelDisc"]).toFixed(2) + "</td>");
                            strHML += ("<td flgconsider='1' style='" + style + salign + ";color:blue;cursor:pointer;text-decoration:underline' currentrate='" + crRate + "'  DiscountAmount='" + value + "' InvLevelDisc='" + arrData[0].Table[i]["InvLevelDisc"] + "'  iden='currRate' onclick='fnShowSchemeAndRelatedSKUsDetails(this)'>&#8377; " + parseFloat(crRate).toFixed(2) + "</td>");
                        }
                        else if (key == "UPC") {
                            strHML += ("<td flgconsider='1' style='" + style + salign + ";'>" + value + "</td>");
                        }
                        else if (key == "Suggested Qty") {
                            strHML += ("<td flgconsider='1' style='" + style + salign + ";padding-right:4px' flgsgt='1' sgtvalue='" + value + "' ><table style='width:100%' cellspacing='0' cellpadding='0'><tr prdid=" + arrData[0].Table[i]["PrdNodeId"] + "><td style='text-align:right'>" + value + "</td><td style='text-align:right;width:24px' sgtval='" + value + "'><span class='glyphicon glyphicon-arrow-right' style='margin-left:2px;cursor:pointer' onclick='fnMoveQty(this,0)' title='click to move into Order Qty' ></span></td></tr></table></td>");
                        }
                        else if (key == "Line Value") {
                            flgwidhtValid = true;
                            strHML += ("<td flgconsider='1' style='" + style + salign + "' valaftertax='" + value + "'  iden='netval'>&#8377; " + parseFloat(value).toFixed(2) + "</td>");
                        }

                        else {
                            if (flgwidhtValid == true && key != "Line Value") {
                                strHML += ("<td flgconsider='1' style='" + style + salign + ";font-size:10px;font-family:Arial Narrow;padding-right:8px;text-align:right' >" + (value == null ? "" : value) + "</td>");
                            } else {
                                strHML += ("<td flgconsider='1' style='" + style + salign + "' Searchable=" + Searchable + ">" + (value == null ? "" : value) + "</td>");
                            }

                        }

                    }
                });
                strHML += ("</tr>");
            }
            strHML += ("</tbody>");


            $("#tblTarget1 tr")[1].cells[1].innerHTML = TotSBD;

            //if (arrData[0].Table12.length > 0) {
            //    $("#tblTarget tr")[1].cells[1].innerHTML = "&#8377; " + parseFloat(arrData[0].Table12[0]["TargetValue"]).toFixed(0);
            //    $("#tblTarget tr")[1].cells[2].innerHTML = "&#8377; " + parseFloat(arrData[0].Table12[0]["ActSalesValue"]).toFixed(0);
            //    var sbalance = parseFloat(arrData[0].Table12[0]["TargetValue"]) - parseFloat(arrData[0].Table12[0]["ActSalesValue"])
            //    sbalance = sbalance < 0 ? 0 : sbalance;
            //    $("#tblTarget tr")[1].cells[3].innerHTML = "&#8377; " + parseFloat(sbalance).toFixed(0);
            //}





            if (parseFloat(cntTotNetVal) > 0) {
                $("#anchorbtn2").css("background-color", "#00b72e;");
                $("#anchorbtn2").find("div").html("Review Order")
                $("#anchorbtn2").find("div").css("width", "80px");
                $("#anchorbtn2").find("span").removeClass("Delete").addClass("Save");
            } else {
                $("#anchorbtn2").find("span").removeClass("Save").addClass("Delete");
                $("#anchorbtn2").css("background-color", "#ff9d3c;");
                $("#anchorbtn2").find("div").html("Close Call")
                $("#anchorbtn2").find("div").css("width", "65px");
            }
            var stylefooter = "";
            var strFooter = "<tr>";
            strFooter += "<td><div class=\"example\" style=\"height:25px\"><input type='text' id='txtsearchPrd' placeholder='Search New Products' class='form-control' onfocus=\"Focus(this,'Search New Products')\" onblur=\"Blur(this,'Search New Products')\" value='Search New Products' onkeyup='fnGetPrdList(this)'   style='width:80%;padding-left:3px;border-radius:0' /><button  type=\"button\"><img src='../btnImg/SearchIconWithGlass.png' style='width:27px;height:23px'></button></div></td>";
            strFooter += "<td class='clssku'></td>";
            strFooter += "<td class='clssku'></td>";
            strFooter += "<td class='clssku'></td>";
            strFooter += "<td id='tdTotSKUs' style='font-weight:bold;text-align:right;font-size:8pt;padding-right:9px'>0</td>";
            strFooter += "<td class='clsnet'></td>";
            strFooter += "<td class='clsnet'></td>";
            strFooter += "<td id='tdTotDisValue' style='text-align:right;padding-right:4px;font-weight:bold;'></td>";
            strFooter += "<td></td>";
            strFooter += "<td></td>";
            strFooter += "<td id='tdTotNetLineValue' style='text-align:right;padding-right:4px;font-weight:bold;'>0.00</td>";
            strFooter += "<td class='clsnettlbl'>Nett. Val:</td>";
            strFooter += "<td class='clsnettlbl'></td>";
            strFooter += "<td class='clsnett' >&#8377; 0.00</td>";
            strFooter += "<td class='clsnett'></td>";
            strFooter += "<td class='clsnett'></td>";

            strFooter += "</tr>";
            $("#tblPrdItemsMain")[0].innerHTML = strHML;
            fnSetFocustOnText();
            $("#tblSBDOrdered tbody tr")[0].cells[0].innerHTML = TotSBD;
            $("#tblSBDOrdered tbody tr")[0].cells[1].innerHTML = arrSBDGrp.length;
            $("#tblSBDOrdered tbody tr").eq(0).find("td").eq(1).attr("gpvalue", arrSBDGrp.length);
            $("#tblSBDOrdered tbody tr")[0].cells[2].innerHTML = parseInt(TotSBD) - parseInt(arrSBDGrp.length);


            $("#tblPrdItemsMain").css({ "border-right": "1px solid #bbbbbb" });
            var thead = $("#tblPrdItemsMain").find("thead").eq(0).html();
            $("#divfixedHeader").html("<table id='tbl_Status_fixedhead' cellspacing='0'><thead>" + thead + "</thead><tbody></tbody></table>");
            $("#divFixedFooter").html("<table id='tbl_Status_fixedfooter' cellspacing='0'>" + strFooter + "</table>");
            $("#tdTotSKUs")[0].innerHTML = cntTotSKUs;
            $("#tdTotDisValue").data("TotDisValue", cntTotDiscVal);
            // $("#tdTotDisValue")[0].innerHTML = "&#8377; " + parseFloat(cntTotDiscVal).toFixed(2);
            $("#tdTotNetLineValue").data("OderValueBrforeTax", OderValueBrforeTax);
            $("#tdTotNetLineValue").data("netvalue", cntTotNetVal);
            $("#tdTotNetLineValue")[0].innerHTML = "&#8377; " + parseFloat(cntTotNetVal).toFixed(2);
            for (i = 0; i < $("#tblPrdItemsMain thead").find("th").length; i++) {
                $("#tbl_Status_fixedhead").find("th").eq(i).css("width", $("#tblPrdItemsMain thead").find("th")[i].offsetWidth);
                $("#tblPrdItemsMain thead").find("th").eq(i).css("width", $("#tblPrdItemsMain thead").find("th")[i].offsetWidth);
            }

            for (i = 0; i < $("#tblPrdItemsMain tr[flgtrconsider=1]").eq(0).find("td[flgconsider=1]").length; i++) {
                $("#tbl_Status_fixedfooter tr").eq(0).find("td").eq(i).css("width", $("#tblPrdItemsMain tr[flgtrconsider=1]").eq(0).find("td[flgconsider=1]")[i].offsetWidth);
                //$("#tbl_Status_fixedfooter tr").eq(1).find("td").eq(i).css("width", $("#tblPrdItemsMain tr[flgdata=1][flgsbd=0]").eq(0).find("td[flgconsider=1]")[i].offsetWidth);
            }

            //  fnTDCLICK();
            $("#divFixedFooter").css("width", $("#divtblMain")[0].clientWidth);
            $("#divfixedHeader").css("width", $("#divtblMain")[0].clientWidth);
            var w1 = parseInt($("td.clsnet")[0].offsetWidth) + parseInt($("td.clsnet")[1].offsetWidth);
            $("td.clsnet").eq(0).remove();
            $("td.clsnet").prop("colspan", "2");
            $("td.clsnet").css({
                "width": w1,
                "text-align": "right"
            });
            var w2 = parseInt($("td.clssku")[0].offsetWidth) + parseInt($("td.clssku")[1].offsetWidth) + parseInt($("td.clssku")[2].offsetWidth);
            $("td.clssku").eq(0).remove();
            $("td.clssku").eq(1).remove();

            $("td.clssku").prop("colspan", "3");
            $("td.clssku").css({
                "width": w2,
                "text-align": "right"
            });

            var w1 = parseInt($("td.clsnettlbl")[0].offsetWidth) + parseInt($("td.clsnettlbl")[1].offsetWidth);
            $("td.clsnettlbl").eq(0).remove();
            $("td.clsnettlbl").prop("colspan", "2");
            $("td.clsnettlbl").css({
                "width": w1,
                "text-align": "right"
            });

            var w1 = parseInt($("td.clsnett")[0].offsetWidth) + parseInt($("td.clsnett")[1].offsetWidth) + parseInt($("td.clsnett")[2].offsetWidth);
            $("td.clsnett").eq(0).remove();
            $("td.clsnett").eq(0).remove();
            $("td.clsnett").prop("colspan", "3");
            $("td.clsnett").css({
                "width": w1,
                "text-align": "left",
                "padding-left": "5px",
                "font-weight": "bold"
            });
            $("td.clsnett")[0].id = "tdTotNetInvValue";
            $("#tdTotNetInvValue")[0].innerHTML = "&#8377; 0.00";
            $("td.clsnettlbl").html("<b>Nett. Inv Val:</b>");
            $("td.clssku").html("<b># of Ordered SKU's:</b>");
            $("td.clsnet").html("<b>Total : </b>");
            $("#txtsearchPrd").val("Search New Products");
            //$("#txtsearchPrd").focus();

            if ($("#tblPrdItemsMain tr[flgdata=1]").length > 0) {
                $("#tblPrdItemsMain tr[flgdata=1]").eq(0).find("input").focus();
            }
            fnFilterSBFBasedOnLegend(5);
            //fnTDCLICK();
        } else {
            $("#tblPrdItemsMain")[0].innerHTML = "<tr><td style='font-size:30px;padding:130px'>No Product List found against this store</td></tr>";
        }

        var strHTML1 = ""; var strHTML2 = ""; var strHTML3 = "";
        var strHTMLHeader1 = ""; var strHTMLHeader2 = "";
        for (var i in arrData[0].Table2) {
            strHTMLHeader1 = arrData[0].Table2[i].REASNCODE_LVL1NAME;
            strHTML1 += "<tr><td style='padding-left:10px;text-align:left'><label style='color:#5b6367'><input type='radio' name='rdoCnted' onclick='fnshowhideCallRemarksDiv(this)' value=" + arrData[0].Table2[i].ReasonCodeID + ">" + arrData[0].Table2[i].REASNCODE_LVL2NAME + "</label></td><tr>";
        }
        for (var i in arrData[0].Table3) {
            strHTMLHeader2 = arrData[0].Table3[i].REASNCODE_LVL1NAME;
            if (arrData[0].Table3[i].flgProductiveCall == 1) {
                strHTML3 += "<tr><td style='padding-left:10px;text-align:left'><label style='color:#5b6367'><input type='checkbox' name='chkCnted' flgSchedule=" + arrData[0].Table3[i].flgSchedule + "  value=" + arrData[0].Table3[i].ReasonCodeID + "> " + arrData[0].Table3[i].REASNCODE_LVL2NAME + "</label></td></tr>";
            } else {
                if (arrData[0].Table3[i].flgSchedule == 1) {
                    strHTML2 += "<tr><td style='padding-left:10px;text-align:left'><label style='color:#5b6367'><input type='radio' name='rdoCnted' flgSchedule=" + arrData[0].Table3[i].flgSchedule + "  onclick='fnshowhideCallRemarksDiv(this)' value=" + arrData[0].Table3[i].ReasonCodeID + ">" + arrData[0].Table3[i].REASNCODE_LVL2NAME + "</label>&nbsp; &nbsp;    <i>Schedule Time :</i><select id='ddlschedulecall'></select><div style='display:none' id='divcallRemarks'><textarea rows='2' style='width:98%' id='txtCallRemarks' placeholder='enter some remarks'>" + callRemarks + "</textarea></div></td></tr>";
                } else {
                    strHTML2 += "<tr><td style='padding-left:10px;text-align:left'><label style='color:#5b6367'><input type='radio' name='rdoCnted' flgSchedule=" + arrData[0].Table3[i].flgSchedule + "  onclick='fnshowhideCallRemarksDiv(this)' value=" + arrData[0].Table3[i].ReasonCodeID + ">" + arrData[0].Table3[i].REASNCODE_LVL2NAME + "</label></td></tr>";
                }
            }
        }
        $("#divConnectedReason")[0].innerHTML = "<div><table style='width:100%'>" + strHTML3 + "</table></div>";
        $("#dvReason")[0].innerHTML = "<div><table style='width:100%'><tr><td style='text-align:left;padding:4px 0px 4px 6px;background-color:#8080ff;color:#ffffff'><b>" + strHTMLHeader1 + "</b></td></tr>" + strHTML1 + "<tr><td style='text-align:left;padding:4px 0px 4px 6px;background-color:#8080ff;color:#ffffff'><b>" + strHTMLHeader2 + "</b><td></tr>" + strHTML2 + "</table></div>";


        var DSEIssueIds = arrData[0].Table6[0]["DSEIssueIds"];
        if (DSEIssueIds != null) {
            for (var d = 0; d < DSEIssueIds.split(',').length; d++) {
                $("#divConnectedReason input[name='chkCnted'][value='" + DSEIssueIds.split(',')[d] + "']").prop("checked", true);
            }
        }

        for (var i in arrData[0].Table3) {
            strHTMLHeader2 = arrData[0].Table3[i].REASNCODE_LVL1NAME;
            if (arrData[0].Table3[i].flgProductiveCall == 1) {
                strHTML3 += "<tr><td style='padding-left:10px;text-align:left'><label style='color:#5b6367'><input type='checkbox' name='chkCnted' flgSchedule=" + arrData[0].Table3[i].flgSchedule + "  value=" + arrData[0].Table3[i].ReasonCodeID + "> " + arrData[0].Table3[i].REASNCODE_LVL2NAME + "</label></td></tr>";
            } else {
                if (arrData[0].Table3[i].flgSchedule == 1) {
                    strHTML2 += "<tr><td style='padding-left:10px;text-align:left'><label style='color:#5b6367'><input type='radio' name='rdoCnted' flgSchedule=" + arrData[0].Table3[i].flgSchedule + "  onclick='fnshowhideCallRemarksDiv(this)' value=" + arrData[0].Table3[i].ReasonCodeID + ">" + arrData[0].Table3[i].REASNCODE_LVL2NAME + "</label>&nbsp; &nbsp;    <i>Schedule Time :</i><select id='ddlschedulecall'></select><div style='display:none' id='divcallRemarks'><textarea rows='2' style='width:98%' id='txtCallRemarks' placeholder='enter some remarks'>" + callRemarks + "</textarea></div></td></tr>";
                } else {
                    strHTML2 += "<tr><td style='padding-left:10px;text-align:left'><label style='color:#5b6367'><input type='radio' name='rdoCnted' flgSchedule=" + arrData[0].Table3[i].flgSchedule + "  onclick='fnshowhideCallRemarksDiv(this)' value=" + arrData[0].Table3[i].ReasonCodeID + ">" + arrData[0].Table3[i].REASNCODE_LVL2NAME + "</label></td></tr>";
                }
            }
        }
        var strTask = ""; var strPendingTask = ""; var strPendingTaskHeader = "";
        var arrPendingTask = ["TaskCode", "Task Date", "Description", "Created By", "TaskStatus"];
        if (arrData[0].Table12.length > 0 && flgTaskEnable == 1) {
            var style = "border-left: 1px solid #6f6f6f; border-bottom: 1px solid #6f6f6f;";
            strTask = "<table id='tblTaskListAll' cellpadding='2' cellspacing='0' style='font-size:8.5pt;border-right: 1px solid #A0A0A0; border-top: 1px solid #A0A0A0;text-align:center;width:100%'>";
            strTask += "<thead><tr bgcolor='#26a6e7'>";
            var cntrowspan = 2; var cntcol = 0;
            var arrTask = ["statusId", "TaskId", "flgClosed"];

            $.each(arrData[0].Table12[0], function (key, value) {
                if ($.inArray(key, arrTask) == -1) {
                    strTask += "<th style='" + style + ";color:#ffffff;position:relative;padding:3px'>" + key + "</th>";
                }

                if ($.inArray(key, arrPendingTask) > -1) {
                    strPendingTaskHeader += "<th style='" + style + ";color:#ffffff;position:relative;padding:3px'>" + key + "</th>";
                }
            });
            strTask += "<th style='" + style + ";padding:3px'></th>";
            if (strPendingTaskHeader != "") {
                strPendingTaskHeader = "<tr>" + strPendingTaskHeader + "<th style='" + style + ";padding:3px'></th></tr>";
            }
            strTask += ("</thead><tbody>");
            for (var i in arrData[0].Table12) {
                strTask += ("<tr TaskId='" + arrData[0].Table12[i]["TaskId"] + "' statusId='" + arrData[0].Table12[i]["statusId"] + "'>");
                if (arrData[0].Table12[i]["statusId"] == 1) {
                    strPendingTask += ("<tr TaskId='" + arrData[0].Table12[i]["TaskId"] + "' statusId='" + arrData[0].Table12[i]["statusId"] + "'>");
                }
                $.each(arrData[0].Table12[i], function (key, value) {
                    if ($.inArray(key, arrTask) == -1) {
                        strTask += "<td style='" + style + ";padding:2px'>" + value + "</td>";
                    }
                    if (arrData[0].Table12[i]["statusId"] == 1) {
                        if ($.inArray(key, arrPendingTask) > -1) {
                            strPendingTask += "<td style='" + style + ";padding:2px'>" + value + "</td>";
                        }
                    }
                });
                if (arrData[0].Table12[i]["statusId"] == 1) {
                    strTask += "<td style='" + style + ";padding:2px'><a href='###' class='clstaskbtn' flg='" + (arrData[0].Table12[i]["flgClosed"] == 0 ? "1" : "0") + "' value='" + (arrData[0].Table12[i]["flgClosed"] == 0 ? "Mark To Close" : "Mark To Open") + "' onclick='fnTaskClose(this)'><img src='../images/" + (arrData[0].Table12[i]["flgClosed"] == 0 ? "TaskCLosed.png" : "UndoIcon.png") + "' style='width:25px;height:25px' /></a></td>";
                    strPendingTask += "<td style='" + style + ";padding:2px'><a href='###' class='clstaskbtn' flg='" + (arrData[0].Table12[i]["flgClosed"] == 0 ? "1" : "0") + "' value='" + (arrData[0].Table12[i]["flgClosed"] == 0 ? "Mark To Close" : "Mark To Open") + "' onclick='fnTaskClose(this)'><img src='../images/" + (arrData[0].Table12[i]["flgClosed"] == 0 ? "TaskCLosed.png" : "UndoIcon.png") + "' style='width:25px;height:25px' /></a></td>";
                } else {
                    strTask += "<td style='" + style + ";padding:2px'></td>";
                    //strPendingTask += "<td style='" + style + ";padding:2px'></td>";
                }
                strTask += ("</tr>");
                strPendingTask += ("</tr>");
            }
            strTask += ("</tbody></table>");
        } else {
            strTask = "<br/>No Task List Available";
        }
        if (flgTaskEnable == 1) {
            $("#divTasksList")[0].innerHTML = strTask;
            if (strPendingTask == "") {
                strPendingTask = "<tr><td>No Pending Task Found!</td></tr>";
            }
            $("#tblTaskList")[0].innerHTML = "<thead><tr><th colspan='" + (arrPendingTask.length + 1) + "' class='th-td-black text-center'>Pending Task List</th></tr>" + strPendingTaskHeader + "</thead><tbody>" + strPendingTask + "</tbody>";
        } else {
            $("#tblTaskList").hide();
        }
        //GenTimePullDown($("#ddlschedulecall")[0]);

        //Create Scheme Benefit Array
        var strSchemeBenefitDetail = arrData[0].Table8.length > 0 ? arrData[0].Table8[0].strSchemeBenefit : "";
        //var TotLineOrderVal = arrData[0].Table8[0].TotLineOrderVal;
        if (arrData[0].Table8.length > 0) {
            var TotalProductLevelDiscount = arrData[0].Table8[0].TotLineLevelDisc;
            var TotOrderVal = arrData[0].Table8[0].TotOrderVal;
            var TotInvMRP = arrData[0].Table8[0].TotMRPValue;
            $("#tdInvMRP").data("InvMRP", TotInvMRP);
            $("#tdInvMRP")[0].innerHTML = "&#8377; " + parseFloat(TotInvMRP).toFixed(2);

            $("#tdInvValue")[0].innerHTML = "&#8377; " + parseFloat(TotOrderVal).toFixed(2);
            $("#tdInvValue").data("InvValue", TotOrderVal);

            var BranMargin = parseFloat(TotInvMRP) - parseFloat(TotOrderVal);
            $("#tdBranMargin")[0].innerHTML = "&#8377; " + parseFloat(BranMargin).toFixed(2);
            $("#tdBranMargin").next()[0].innerHTML = parseFloat(parseFloat(BranMargin) * 100 / parseFloat(TotInvMRP)).toFixed(0) + "%";

            $("#tdLineSchemeDiscount")[0].innerHTML = "&#8377; " + parseFloat(TotalProductLevelDiscount).toFixed(2);
            $("#tdLineSchemeDiscount").next()[0].innerHTML = parseFloat(parseFloat(TotalProductLevelDiscount) * 100 / parseFloat(TotInvMRP)).toFixed(0) + "%";
            $("#tdLineSchemeDiscount").data("LineSchemeDiscount", TotalProductLevelDiscount);

            var OverallInvSchemeDiscount = arrData[0].Table8[0].TotDiscVal;

            $("#tdOverallInvSchemeDiscount")[0].innerHTML = "&#8377; " + parseFloat(OverallInvSchemeDiscount).toFixed(2);
            $("#tdOverallInvSchemeDiscount").next()[0].innerHTML = parseFloat(parseFloat(OverallInvSchemeDiscount) * 100 / parseFloat(TotInvMRP)).toFixed(0) + "%";
            $("#tdOverallInvSchemeDiscount").data("OverallInvSchemeDiscount", OverallInvSchemeDiscount);

            var InvSchemeDiscount = parseFloat(TotalProductLevelDiscount + OverallInvSchemeDiscount);
            $("#tdInvSchemeDiscount").data("InvSchemeDiscount", InvSchemeDiscount);
            $("#tdInvSchemeDiscount")[0].innerHTML = "&#8377; " + parseFloat(InvSchemeDiscount).toFixed(2);
            $("#tdInvSchemeDiscount").next()[0].innerHTML = parseFloat(parseFloat(InvSchemeDiscount) * 100 / parseFloat(TotInvMRP)).toFixed(0) + "%";


            var TotalBranMargin = parseFloat(BranMargin) + parseFloat(TotalProductLevelDiscount) + parseFloat(OverallInvSchemeDiscount);
            $("#tdTotalBranMargin")[0].innerHTML = "&#8377; " + parseFloat(TotalBranMargin).toFixed(2);
            $("#tdTotalBranMargin").next()[0].innerHTML = parseFloat(parseFloat(TotalBranMargin) * 100 / parseFloat(TotInvMRP)).toFixed(0) + "%";
            var NettInvValue = parseFloat(TotInvMRP) - parseFloat(TotalBranMargin);
            $("#tdNettInvValue")[0].innerHTML = "&#8377; " + parseFloat(NettInvValue).toFixed(2);
            $("#tdNettInvValue").data("NettInvValue", NettInvValue);

            $("#tdTotNetInvValue")[0].innerHTML = "&#8377; " + parseFloat(NettInvValue).toFixed(2);

        }


        //var TotOrderValWDisc = arrData[0].Table8[0].TotOrderValWDisc;
        //var TotTaxVal = arrData[0].Table8[0].TotTaxVal;
        //var NetOrderValue = arrData[0].Table8[0].NetOrderValue;
        //var TotMRPValue = arrData[0].Table8[0].TotMRPValue;

        if (strSchemeBenefitDetail != "" && strSchemeBenefitDetail != null) {
            for (var i = 0; i < strSchemeBenefitDetail.split("|").length - 1; i++) {
                var arrayAllValues = strSchemeBenefitDetail.split("|")[i];
                var storeID = parseInt(arrayAllValues.split("~")[0]);
                var ProductId = parseInt(arrayAllValues.split("~")[1]);
                var schemeId = parseInt(arrayAllValues.split("~")[2]);

                var schemeSlabId = parseInt(arrayAllValues.split("~")[3]);

                var schemeSlabBcktId = parseInt((arrayAllValues.split("~")[4]));

                var schemeSlabSubBcktVal = parseFloat(arrayAllValues.split("~")[5]);

                var schemeSubBucktValType = parseInt(arrayAllValues.split("~")[6]);
                //[10.0, 41, 60, 1, 500.0, 0, 4, 2, 6, 0, 10.0, 0, 0, 0, 0, 0, 0.0, 0.0, 2]
                var schemeSlabSubBucktType = parseInt(arrayAllValues.split("~")[7]);

                var benifitRowId = parseInt(arrayAllValues.split("~")[8]);

                var benSubBucketType = parseInt(arrayAllValues.split("~")[9]);

                var freeProductId = parseInt(arrayAllValues.split("~")[10]);

                var benifitSubBucketValue = (arrayAllValues.split("~")[11].indexOf(".") > -1 ? arrayAllValues.split("~")[11] : arrayAllValues.split("~")[11] + ".00");

                var benifitMaxValue = benifitSubBucketValue;

                var benifitAssignedVal = (arrayAllValues.split("~")[13].indexOf(".") > -1 ? arrayAllValues.split("~")[13] : arrayAllValues.split("~")[13] + ".00");


                var benifitAssignedValueType = parseInt(arrayAllValues.split("~")[14]);

                var benifitDiscountApplied = parseFloat(arrayAllValues.split("~")[15]);

                var benifitCoupnCode = arrayAllValues.split("~")[16];

                var per = parseFloat(arrayAllValues.split("~")[17]);

                var UOM = parseFloat(arrayAllValues.split("~")[18]);
                var WhatFinallyApplied = 1;

                var schSlbRowId = parseInt(arrayAllValues.split("~")[20]);
                var SchTypeId = parseInt(arrayAllValues.split("~")[21]);
                var TotalWeightage = parseFloat(arrayAllValues.split("~")[22]);
                var Prorata = parseInt(arrayAllValues.split("~")[23]);
                var exceptionvalue = arrayAllValues.split("~").length > 25 ? arrayAllValues.split("~")[24] : benifitSubBucketValue + "^default^" + benifitAssignedValueType;
                var withoutexceptionbenvalue = arrayAllValues.split("~").length > 25 ? (arrayAllValues.split("~")[25].indexOf(".") > -1 ? arrayAllValues.split("~")[25] : arrayAllValues.split("~")[25] + ".00") : "0.00";
                var flgAddOnScheme = arrayAllValues.split("~").length > 26 ? parseInt(arrayAllValues.split("~")[26]) : 0;
                var flgAddOnBenefit = arrayAllValues.split("~").length > 27 ? parseInt(arrayAllValues.split("~")[27]) : 0;
                var IsPayoutFixed = 0;// arrayAllValues.split("~").length > 28 ? parseInt(arrayAllValues.split("~")[28]) : 1;
                var IsPayoutFixedApplieds = 0;// arrayAllValues.split("~").length > 29 ? parseInt(arrayAllValues.split("~")[29]) : 0;


                var orderqty = 0;
                if ($("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").length > 0) {
                    orderqty = parseInt($("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]")[0].cells[OrderQntyIndx].children[0].value);
                }
                if ($("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").length > 0) {
                    var Grammage = "0.00";// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").data("grammage") == undefined ? "0.00" : $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").data("grammage");
                    var ProductName = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").text();
                    var SKUCode = "";
                    var StandardRate = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").attr("StandardRateBeforeTax") == undefined ? "0.00" : $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").attr("standardratebeforetax");
                    var StandardRateBeforeTax = StandardRate;// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").attr("standardratebeforetax") == undefined ? "0.00" : $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").data("standardratebeforetax");
                    var Tax = "0.00";// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").data("tax") == undefined ? "0.00" : $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").data("tax");
                    var MRP = "0.00";// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").data("mrp") == undefined ? "0.00" : $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").data("mrp");
                    var CurrentInvStock = 0;// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").data("currentinvstock") == undefined ? 0 : parseInt($("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").data("currentinvstock"));
                    var BookingInvStock = 0;// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").data("bookinginvstock") == undefined ? 0 : parseInt($("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").data("bookinginvstock"));
                }
                else {
                    var Grammage = "0.00";
                    var ProductName = "";
                    var SKUCode = "";
                    var StandardRate = "0.00";
                    var StandardRateBeforeTax = "0.00";
                    var Tax = "0.00";
                    var MRP = "0.00";
                    var CurrentInvStock = 0;// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").data("currentinvstock") == undefined ? 0 : parseInt($("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").data("currentinvstock"));
                    var BookingInvStock = 0;
                }


                var arrProductAppliedSchemesBenifitsRecords = new Array();
                arrProductAppliedSchemesBenifitsRecords = [{
                    storeID: storeID, ProductID: ProductId, schemeId: schemeId, schemeSlabId: schemeSlabId,
                    schemeSlabBcktId: schemeSlabBcktId, schemeSlabSubBcktVal: schemeSlabSubBcktVal, schemeSubBucktValType: schemeSubBucktValType, schemeSlabSubBucktType: schemeSlabSubBucktType, benifitRowId: benifitRowId, benSubBucketType: benSubBucketType,
                    freeProductId: freeProductId, benifitSubBucketValue: benifitSubBucketValue, benifitMaxValue: benifitMaxValue, benifitAssignedVal: benifitAssignedVal,
                    benifitAssignedValueType: benifitAssignedValueType, benifitDiscountApplied: benifitDiscountApplied, benifitCoupnCode: benifitCoupnCode,
                    per: per, UOM: UOM, WhatFinallyApplied: WhatFinallyApplied, schSlbRowId: schSlbRowId, SchTypeId: SchTypeId, TotalWeightage: TotalWeightage, Prorata: Prorata, ProductName: ProductName, SKUCode: SKUCode, UOMID: UOM, StandardRate: parseFloat(StandardRate).toFixed(4), StandardRateBeforeTax: parseFloat(StandardRateBeforeTax).toFixed(4), Tax: parseFloat(Tax).toFixed(4),
                    MRP: parseFloat(MRP).toFixed(4), CurrentInvStock: CurrentInvStock, BookingInvStock: BookingInvStock, Grammage: parseFloat(Grammage).toFixed(2), orderqty: orderqty, exceptionvalue: exceptionvalue, withoutexceptionbenvalue: withoutexceptionbenvalue, flgAddOnScheme: flgAddOnScheme, flgAddOnBenefit: flgAddOnBenefit, IsPayoutFixed: IsPayoutFixed, IsPayoutFixedApplied: IsPayoutFixedApplieds
                }];

                arrStoreProductAppliedSchemesBenifitsRecords.push(arrProductAppliedSchemesBenifitsRecords[0]);
            }
        }

        if (IsFiveStarApplicable == 1) {
            fnCalculateStarEarned();
        }
    }
}

function fnshowhideCallRemarksDiv(sender) {
    $("#divcallRemarks").hide();
    if ($(sender).val() == 8) {
        $("#divcallRemarks").show();
    }
}

function sortTable() {
    var tableData = $("#tblPrdItemsMain tbody");
    var rowData = $("#tblPrdItemsMain tr[flgdata=1][flgSmartBasket>0]");
    //var rowData = tableData.getElementsByTagName('tr');
    for (var i = 0; i < rowData.length - 1; i++) {
        for (var j = 0; j < rowData.length - (i + 1); j++) {
            if (Number(rowData.item(j).attr("SqNo")) < Number(rowData.item(j+1).attr("SqNo"))) {
                tableData.insertBefore(rowData.item(j + 1), rowData.item(j));
            }
        }
    }
}

function fnFilterSBFBasedOnLegend(flg) {
    $("#tblPrdItemsMain").find("tr[flgfbgrp='1']").remove();
    $("#tblPrdItemsMain tr[flgdata=1]").hide();
    $("#tblbtnsLegends td.clsSelectOne").removeClass("clsSelectOne");
    var flgReleasingForTesting = $("#cphRight_hdnflgReleasingForTesting").val();
    $("td.clsnewrelease").css("display", "table-cell");
    $("#tblPrdItemsMain tr[flgdata=2]").css("display", "table-row");
    if (flg == 0) {//All Products
        $("#tblPrdItemsMain tr[flgdata=1]").css("display", "table-row");
        $("#tblPrdItemsMain tr[flgdata=1][flgsbd=1]").css("display", "none");
        $("#tblPrdItemsMain tr[flgdata=1][SuggestedQty!=0]").css("display", "table-row");
        $("#tblPrdItemsMain tr[flgdata=1][flgfb=1]").css("display", "table-row");
        $("#tblPrdItemsMain tr[flgdata=1][flgSmartBasket=2]").css("display", "none");
        $("#tblbtnsLegends td").eq(3).addClass("clsSelectOne");
    }
    else if (flg == 1) {//All Products
        $("#tblPrdItemsMain tr[flgdata=1]").css("display", "table-row");
        $("#tblPrdItemsMain tr[flgdata=1][flgsbd=1]").css("display", "none");
        $("#tblPrdItemsMain tr[flgdata=1][SuggestedQty!=0]").css("display", "table-row");
        $("#tblPrdItemsMain tr[flgdata=1][flgfb=1]").css("display", "table-row");
        $("#tblPrdItemsMain tr[flgdata=1][flgSmartBasket=2]").css("display", "none");
        $("#tblbtnsLegends td").eq(3).addClass("clsSelectOne");
    }
    else if (flg == 2) {//All SBD Products
        $("#tblPrdItemsMain tr[flgdata=1][flgsbd=1]").css("display", "table-row");
        $("#tblbtnsLegends td").eq(6).addClass("clsSelectOne");
        $("#tblbtnsLegends td").eq(7).addClass("clsSelectOne");
    }
    else if (flg == 5) {//All Priority Products
        ////$("#tblPrdItemsMain tr[flgdata=1][flgsbd=2]").css("display", "table-row");
        //var txt = $("#tblbtnsLegends td").eq(1).text();
        //if (txt == "Smart Basket All") {
        //    $("#tblbtnsLegends td").eq(1).html("Smart Basket");
        //    $("#tblPrdItemsMain tr[flgdata=1][flgSmartBasket=1]").css("display", "table-row");
        //    $("#tblPrdItemsMain tr[flgdata=1][flgSmartBasket=2]").css("display", "table-row");
        //}
        //else {
        //    $("#tblPrdItemsMain tr[flgdata=2]").css("display", "none");
        //    $("#tblPrdItemsMain tr[flgdata=2][flgDefaultSmartBasket=1]").css("display", "table-row");
        //    $("#tblPrdItemsMain tr[flgdata=1][flgDefaultSmartBasket=1]").css("display", "table-row");

        //    $("#tblbtnsLegends td").eq(1).html("Smart Basket All");
        //}
        // $("#tblbtnsLegends td").eq(1).html("Smart Basket");
        $("#tblPrdItemsMain tr[flgdata=1][flgSmartBasket=1]").css("display", "table-row");
        $("#tblPrdItemsMain tr[flgdata=1][flgSmartBasket=2]").css("display", "table-row");
        $("#tblPrdItemsMain tr[flgdata=1][flgDefaultSmartBasket=1]").css("display", "table-row");

        $("#tblbtnsLegends td").eq(0).addClass("clsSelectOne");
        $("#tblbtnsLegends td").eq(1).addClass("clsSelectOne");
    }
    else if (flg == 3) {//All Focus Brand Products
        $("#tblbtnsLegends td").eq(4).addClass("clsSelectOne");
        $("#tblbtnsLegends td").eq(5).addClass("clsSelectOne");
        var trFocus = $("#tblFocusBrandMain tbody tr");
        for (var i = 0; i < trFocus.length; i++) {
            var FBID = trFocus.eq(i).attr("FBID");
            var FBName = $("#tdfb_" + FBID).html();

            var fbSKU = $("#tblPrdItemsMain tr[flgdata=1][flgfb=1][FBID=" + FBID + "]");
            if (fbSKU.length > 0) {
                var categoryId = fbSKU.eq(0).attr("categoryid");
                var shtml = "<tr id='fb_" + FBID + "' flgfbgrp='1'><td colspan='15' style='padding:3px;line-height:1.5;background-color:#595959;color:#fff;font-weight:bold'>" + FBName + "</td></tr>";
                $("#tblPrdItemsMain tr[flgdata=2][categoryid=" + categoryId + "]").before(shtml);
                $(fbSKU).css("display", "table-row");
            }
        }

    }
    else {//flg ==4 All Initiative Products
        $("#tblPrdItemsMain tr[flgdata=1][flginitiative=1]").css("display", "table-row");
        $("#tblbtnsLegends td").eq(8).addClass("clsSelectOne");
        $("#tblbtnsLegends td").eq(9).addClass("clsSelectOne");
    }
}
function fnFilterFBSBF(sender) {
    var FBID = $(sender).closest("tr").attr("fbid");

    fnShowFocusBrandSBF("", FBID);
}
function fnFBUndo(sender) {
    $("#tblPrdItemsMain").find("tr[flgfbgrp='1']").remove();
    $("#tblPrdItemsMain tr[flgdata=1]").css("display", "table-row");
}
function fnShowFocusBrandSBF(sender, FBID) {
    var FBName = $("#tdfb_" + FBID).html();//<button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-arrow-left"></span> Left        </button>
    var shtml = "<tr id='fb_" + FBID + "' flgfbgrp='1'><td colspan='15' style='padding:3px;line-height:1.5;background-color:#595959;color:#fff;font-weight:bold'>" + FBName + "</td></tr>";
    $("#tblPrdItemsMain").find("tr[flgfbgrp='1']").remove();
    var categoryid = $("#tblPrdItemsMain tr[flgdata=1][flgfb=1][fbid='" + FBID + "']").eq(0).attr("categoryid")
    $("#tblPrdItemsMain tr[flgdata=2][categoryid='" + categoryid + "']").eq(0).before(shtml);
    $("#tblPrdItemsMain tr[flgdata=1]").hide();
    $("#tblPrdItemsMain tr[flgdata=1][flgfb=1][fbid='" + FBID + "']").css("display", "table-row");
    $("#tblbtnsLegends td.clsSelectOne").removeClass("clsSelectOne");
    $("#tblbtnsLegends td").eq(4).addClass("clsSelectOne");
    $("#tblbtnsLegends td").eq(5).addClass("clsSelectOne");
}
function fnEditContactNo(sender) {
    $(sender).closest("td").find("a").hide();
    $(sender).closest("td").find("a").eq(2).show();
    $(sender).closest("td").find("a").eq(3).show();
    $(sender).closest("td").find("input[type='text']").show();

}
function fnUpdateAndCancelContactInfo(sender, flg) {
    if (flg == 1) {
        var contactNo = $(sender).closest("td").find("input[type='text']").val();
        $(sender).closest("td").find("a").eq(0).html(contactNo);
        $(sender).closest("td").find("a").hide();
        $(sender).closest("td").find("a").eq(0).show();
        $(sender).closest("td").find("a").eq(1).show();
        $(sender).closest("td").find("input[type='text']").hide();
    } else {
        // var contactNo = $(sender).closest("td").find("input[type='text']").val();
        //  $(sender).closest("td").find("a").eq(0).html(contactNo);
        $(sender).closest("td").find("a").hide();
        $(sender).closest("td").find("a").eq(0).show();
        $(sender).closest("td").find("a").eq(1).show();
        $(sender).closest("td").find("input[type='text']").hide();
    }
}

function fnHighlightSBD(flg) {
    if (flg == 1) {
        var $tr = $("#tblPrdItemsMain tbody tr[flgbaseproduct=1][flgsbdgap=1]");
        $("#tblPrdItemsMain tbody tr[flgbaseproduct=1][flgsbdgap=1]").removeClass("trHightlightSBD");
        arrSBDGrp = [];
        for (var i = 0; i < $tr.length; i++) {
            var sbdgrpid = $tr.eq(i).attr("sbdgroupid");
            if ($tr.eq(i).find("input[type=text]").eq(0).val() > 0) {
                $tr.eq(i).addClass("trHightlightSBD");
                if ($.inArray(sbdgrpid, arrSBDGrp) == -1) {
                    arrSBDGrp.push(sbdgrpid);
                }
                continue;
            } else {
                var $trChild = $("#tblPrdItemsMain tbody tr[flgbaseproduct=0][flgsbdgap=1][sbdgroupid='" + sbdgrpid + "']");
                for (var j = 0; j < $trChild.length; j++) {
                    if ($trChild.eq(j).find("input[type=text]").eq(0).val() > 0) {
                        $tr.eq(i).addClass("trHightlightSBD");
                        if ($.inArray(sbdgrpid, arrSBDGrp) == -1) {
                            arrSBDGrp.push(sbdgrpid);
                        }
                        break;
                    }
                }
            }
        }
        $("#tdsbdCount")[0].innerHTML = arrSBDGrp.length + " OF " + $tr.length;
        $("#tdsbdCount").attr("gpvalue", arrSBDGrp.length);
    }
}

function fnChangePcInCase(sender, flg) {
    var upc = $(sender).attr("pcsinbox");
    var qty = $(sender).val() == "" ? 0 : $(sender).val();
    if (flg == 1) {
        var sCase = parseInt(qty) / parseInt(upc);
        sCase = sCase.toString().indexOf(".") != -1 ? parseFloat(sCase).toFixed(2) : sCase;
        $(sender).closest("tr").find("input:text").eq(0).val(sCase);
    } else {
        var tQty = parseInt(qty) * parseInt(upc);
        $(sender).closest("tr").find("input:text").eq(1).val(tQty);
    }
    var QTY = $(sender).closest("tr").find("input:text").eq(1).val();
    var rate = $("#tblUOMDescr tbody tr").eq(0).attr("rate");
    var netval = parseInt(QTY) * parseFloat(rate);
    $("#tdTotUOMLineValue")[0].innerHTML = "&#8377; " + parseFloat(netval).toFixed(2);
}

function fnShowUOMDetail(sender) {
    var upc = $(sender).closest("tr").attr("upc");
    var rate = $(sender).closest("tr").attr("standardratebeforetax");
    var qty = $(sender).closest("td").find("input[type='text']").val();
    qty = qty == "" ? 0 : qty;
    var sgtval = $(sender).closest("td").find("input[type='text']").attr("sgtval");
    var oCase = parseInt(qty) / parseInt(upc);
    oCase = oCase.toString().indexOf(".") != -1 ? parseFloat(oCase).toFixed(2) : oCase;
    var sCase = parseInt(sgtval) / parseInt(upc);
    sCase = sCase.toString().indexOf(".") != -1 ? parseFloat(sCase).toFixed(2) : sCase;

    var sRate = parseFloat(rate) * parseInt(upc);
    var netval = parseInt(qty) * parseFloat(rate);
    $("#tdTotUOMLineValue")[0].innerHTML = "&#8377; " + parseFloat(netval).toFixed(2);
    $("#tblUOMDescr tbody tr").eq(0).find("td").eq(1).find("input:text").attr("pcsinbox", upc);
    $("#tblUOMDescr tbody tr").eq(0).find("td").eq(2).find("input:text").attr("pcsinbox", upc);
    $("#tblUOMDescr tbody tr").eq(0).attr("rate", rate);
    $("#tblUOMDescr tbody tr").eq(0).find("td").eq(2).find("input:text").val(qty);
    $("#tblUOMDescr tbody tr").eq(0).find("td").eq(1).find("input:text").val(oCase);
    $("#tblUOMDescr tbody tr").eq(1).find("td").eq(2).html(sgtval);
    $("#tblUOMDescr tbody tr").eq(1).find("td").eq(1).html(sCase);
    $("#tblUOMDescr tbody tr").eq(2).find("td").eq(2).html("&#8377; " + parseFloat(rate).toFixed(2));
    $("#tblUOMDescr tbody tr").eq(2).find("td").eq(1).html("&#8377; " + parseFloat(sRate).toFixed(2));
    $("#divUOMDetail").dialog({
        title: $(sender).closest("tr").find("td").eq(0).text(),
        modal: true,
        width: "350",
        height: "auto",
        buttons: {
            "OK": function () {
                if ($(sender).closest("td").find("input[type='text']").val() != $("#tblUOMDescr tbody tr").eq(0).find("td").eq(2).find("input:text").val()) {
                    $(sender).closest("td").find("input[type='text']").val($("#tblUOMDescr tbody tr").eq(0).find("td").eq(2).find("input:text").val());
                    var ctrnl = $(sender).closest("td").find("input[type='text']");
                    fnCalculateData(ctrnl);
                    var skuID = $(sender).closest("tr").attr("skunodeid");
                    fnShowBenefitSchemeWise(skuID, 3);
                }

                $("#divUOMDetail").dialog('close');
            }
        }

    })
}



function fnColapse(ctrl) {
    var sbdgroupid = $(ctrl).closest("tr").attr("sbdgroupid");
    var categoryid = $(ctrl).closest("tr").attr("categoryid");

    if ($(ctrl)[0].src.indexOf("icoAdd") > -1) {
        $(ctrl)[0].src = "../Images/icoMinus.gif";
        $("#tblPrdItemsMain tbody").find("tr[flgbaseproduct=0][flgdata=1][flgsbdgap=1][sbdgroupid='" + sbdgroupid + "'][categoryid='" + categoryid + "']").css("display", "table-row");
    } else {
        $(ctrl)[0].src = "../Images/icoAdd.gif";
        $("#tblPrdItemsMain tbody").find("tr[flgbaseproduct=0][flgdata=1][flgsbdgap=1][sbdgroupid='" + sbdgroupid + "'][categoryid='" + categoryid + "']").css("display", "none");
    }
}

function fnHideDv() {
    $("body").css("overflow", "auto");
    try {
        $("#dvPrdContainer")[0].innerHTML = "";
        if ($("#dvContextFinishedPrd").dialog('isOpen') == true) {
            $("#dvContextFinishedPrd").dialog('close');
            $("#dvContextFinishedPrd").dialog('destroy');
        } else {
            $("#dvContextFinishedPrd").hide();
        }
    } catch (err) {
        $("#dvContextFinishedPrd").hide();
    }
}

function fnFillOrder(cntrlTR, flg, e) {
    //debugger;
    $("#txtsearchPrd").val("");
    var SKUNodeID = 0;
    var cntrl;
    if (flg == 1) {
        SKUNodeID = $(cntrlTR).attr("SKUNodeID");
        cntrl = cntrlTR;
    } else {
        SKUNodeID = $(cntrlTR).closest("tr").attr("SKUNodeID");
        cntrl = $(cntrlTR).closest("tr");
    }

    $("body").css("overflow", "auto");
    //strHML += ("<td style='" + style + ";text-align:left;padding-left:6px;'>&#8377; " + parseFloat(value).toFixed(2) + "</td>");
    $("#dvFadeForProcessing").show();
    setTimeout(function () {
        var IntCategoryId = 0;
        if ($("#tblPrdContainer input[type=checkbox]:checked").length > 0) {
            var $checked = $("#tblPrdContainer input[type=checkbox]:checked");
            for (var c = 0; c < $checked.length; c++) {
                cntrl = $($checked[c]).closest("tr");
                var Category = $(cntrl).attr("category");
                var CategoryId = $(cntrl).attr("categoryid");
                IntCategoryId = CategoryId;
                var strHML1 = fnAddNewProductsHTML(cntrl);

                if ($("#tblPrdItemsMain tbody").find("tr[flgdata=2][categoryid='" + CategoryId + "'][flgsbdgap=0]").length == 0) {
                    var strHML = ("<tr flgdata='2' category='" + Category + "' categoryid='" + CategoryId + "' flgsbdgap='0' sbdgroupid='0'>");
                    strHML += ("<td  colspan='15' style='background-color:#b0b0ff;font-weight:bold;color:#ffffff;padding:3px 5px;'>");
                    strHML += Category;
                    strHML += ("</td>");
                    strHML += ("</tr>");
                    var len = $("#tblPrdItemsMain tbody").find("[flgdata=1]").length - 1;
                    $("#tblPrdItemsMain tbody").find("[flgdata=1]").eq(len).after(strHML);
                    $("#tblPrdItemsMain tbody").find("tr[flgdata=1]").removeClass("highlightedProduct");
                    $("#tblPrdItemsMain tbody").find("tr[flgdata=2][categoryid='" + CategoryId + "']").after(strHML1);
                } else {

                    var trs = $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + CategoryId + "']");
                    var len1 = trs.length - 1;
                    len1 = len1 < 0 ? 0 : len1;
                    $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + CategoryId + "']").eq(len1).after(strHML1);

                }

            }
        } else {
            if ($("#tblPrdContainer input[type=checkbox]").length > 0 && cntrl.length > 0) {
                var Category = $(cntrl).attr("category");
                var CategoryId = $(cntrl).attr("CategoryId");
                IntCategoryId = CategoryId;
                var strHML1 = fnAddNewProductsHTML(cntrl);
                if ($("#tblPrdItemsMain tbody").find("tr[flgdata=2][categoryid='" + CategoryId + "']").length == 0) {
                    var strHML = ("<tr flgdata='2' category='" + Category + "' categoryid='" + CategoryId + "'>");
                    strHML += ("<td  colspan='15' style='background-color:#b0b0ff;font-weight:bold;color:black;padding:3px 5px;'>");
                    strHML += Category;
                    strHML += ("</td>");
                    strHML += ("</tr>");
                    var len = $("#tblPrdItemsMain tbody").find("[flgdata=1]").length - 1;
                    $("#tblPrdItemsMain tbody").find("[flgdata=1]").eq(len).after(strHML);
                    $("#tblPrdItemsMain tbody").find("tr[flgdata=1]").removeClass("highlightedProduct");
                    $("#tblPrdItemsMain tbody").find("tr[flgdata=2][categoryid='" + CategoryId + "']").after(strHML1);
                } else {
                    var trs = $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + CategoryId + "']");
                    var len1 = trs.length - 1;
                    len1 = len1 < 0 ? 0 : len1;
                    $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + CategoryId + "']").eq(len1).after(strHML1);
                    //var trs = $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + CategoryId + "']");
                    //$("#tblPrdItemsMain tbody").find("tr[flgdata=1]").removeClass("highlightedProduct");
                    //$("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + CategoryId + "']").eq(trs.length - 1).find("input[type=text]").eq(0).focus();
                    //$("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + CategoryId + "']").eq(trs.length - 1).addClass("highlightedProduct");
                }
            }

        }
        $("#dvFadeForProcessing").hide();
        fnSetFocustOnText();
        fnHideDv();
        var trs = $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + IntCategoryId + "']");
        $("#tblPrdItemsMain tbody").find("tr[flgdata=1]").removeClass("highlightedProduct");
        $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + IntCategoryId + "']").eq(trs.length - 1).find("input[type=text]").eq(0).focus();
        $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + IntCategoryId + "']").eq(trs.length - 1).addClass("highlightedProduct");
        //var scrollPos = $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + IntCategoryId + "']").eq(trs.length - 1).find("input").eq(0).offset().top;
        //$(window).scrollTop(scrollPos);
        $("#dvPrdContainer")[0].innerHTML = "";
        e.preventDefault();
    }, 50);
}

function fnAddNewProductsHTML(cntrl) {
    var style = "border-left: 1px solid #A0A0A0; border-bottom: 1px solid #A0A0A0;";
    var rlp = $(cntrl).attr("rlp");
    var mrp = $(cntrl).attr("mrp");
    var SBF = $(cntrl).attr("sbf");
    var Category = $(cntrl).attr("category");
    var CategoryId = $(cntrl).attr("categoryid");
    var SKUNodeID = $(cntrl).attr("SKUNodeID");
    var UPC = $(cntrl).attr("UPC");
    var flgInitiative = $(cntrl).attr("flgInitiative");
    var FBID = $(cntrl).attr("FBID");
    var flgFB = $(cntrl).attr("flgFB");
    var flgSBD = $(cntrl).attr("flgSBD");
    var flgDefaultSmartBasket = $(cntrl).attr("flgDefaultSmartBasket");
    var flgSmartBasket = $(cntrl).attr("flgSmartBasket");
    flgSmartBasket = flgSmartBasket == undefined ? 0 : flgSmartBasket;
    flgDefaultSmartBasket = flgDefaultSmartBasket == undefined ? 0 : flgDefaultSmartBasket;
    var sbdgroupid = $(cntrl).attr("sbdgroupid");

    var strPromoimgage = "";
    if ((parseInt(flgFB) == 1)) {
        SBF = "<a href='###' style='color:blue;text-decoration:underline' onclick='fnFilterFBSBF(this)'>" + SBF + "</a>";
        strPromoimgage += "<img src='../btnImg/fb-icon.png' style='width:5%;margin-left:3px' />";
    }
    if (flgInitiative == 1) {
        SBF = "<a href='###' style='color:blue;text-decoration:underline' onclick='fnFilterFBSBF(this)'>" + SBF + "</a>";
        strPromoimgage += "<img src='../btnImg/offers-icon.png' style='width:5%;margin-left:3px' />";
    }
    var strHML = ("<tr flgdata='1' FBID='" + FBID + "' flgFB='" + flgFB + "' flgDefaultSmartBasket='" + flgDefaultSmartBasket + "'  flgSBD='" + flgSBD + "' flgSmartBasket='" + flgSmartBasket + "' sbdgroupid='" + sbdgroupid + "' oqty='0' flgInitiative='" + flgInitiative + "' flgbaseproduct='0' mrp='" + mrp + "' category='" + Category + "' categoryid='" + CategoryId + "' flgsbdgap='0' skunodeid=" + SKUNodeID + " standardratebeforetax='" + rlp + "'>");
    strHML += ("<td flgconsider='1'  style='" + style + ";text-align:left;padding-left:9px;' Searchable='1'>" + SBF + strPromoimgage + "</td>");
    strHML += ("<td flgconsider='1'  style='" + style + ";text-align:right;padding-right:6px;'>&#8377; " + parseFloat(mrp).toFixed(2) + "</td>");
    strHML += ("<td flgconsider='1'  style='" + style + ";text-align:center;'>" + UPC + "</td>");
    strHML += ("<td flgconsider='1'  style='" + style + ";padding-right:4px' flgsgt='1' sgtvalue='0' ><table style='width:100%' cellspacing='0' cellpadding='0'><tr prdid=" + SKUNodeID + "><td style='text-align:right'>0</td><td style='text-align:right;width:24px' sgtval='0'></td></tr></table></td>");//<span class='glyphicon glyphicon-arrow-right' style='margin-left:2px;cursor:pointer' onclick='fnMoveQty(this)' title='click to move into Order Qty' ></span>
    strHML += ("<td flgconsider='1'  style='" + style + ";text-align:center;'><input type='text' style='width: 40px;height:99.5%;text-align:right;padding-right:4px; border: 1px solid #bbbbbb;background-color:#ffffff;z-index: 150' value='0' onfocus=\"Focus(this,'0')\" sgtval='0' onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' onblur=\"Blur(this,'0')\" onchange=\"fnCalculateData(this)\" /><img src='../btnImg/UomInPC.png' style='width:20px' onclick='fnShowUOMDetail(this)' /></td>");
    strHML += ("<td flgconsider='1'  style='" + style + ";text-align:left;padding-left:6px;'>PCS</td>");
    strHML += ("<td flgconsider='1'  style='" + style + ";text-align:right;padding-right:6px;'>&#8377; " + parseFloat(rlp).toFixed(2) + "</td>");
    strHML += ("<td flgconsider='1'  style='" + style + ";text-align:right;padding-right:6px;' invdiscountamount='0.00' DiscountAmount='0.00' iden='disc'>&#8377; 0.00</td>");
    strHML += ("<td flgconsider='1'  style='" + style + ";text-align:right;padding-right:6px;'>&#8377; " + parseFloat(rlp).toFixed(2) + "</td>");
    strHML += ("<td flgconsider='1'  style='" + style + ";text-align:right;padding-right:6px;' valbeforetax='0.00' iden='netval'>&#8377; 0.00</td>");
    strHML += ("<td flgconsider='1'  style='" + style + ";text-align:right;padding-right:6px;'></td>");
    strHML += ("<td flgconsider='1'  style='" + style + ";text-align:right;padding-right:6px;'></td>");
    strHML += ("<td flgconsider='1'  style='" + style + ";text-align:right;padding-right:6px;'></td>");
    strHML += ("<td flgconsider='1'  style='" + style + ";text-align:right;padding-right:6px;'></td>");
    strHML += ("<td flgconsider='1'  style='" + style + ";text-align:right;padding-right:6px;'></td>");
    strHML += "</tr>";
    return strHML;
}


var cache = {};
function fnGetPrdList(sender) {

    var contextMenuPopup = document.getElementById("dvContextFinishedPrd");
    //debugger;

    $('tr.highlighted').removeClass("highlighted");
    //$("#divPrdInfo").html("");
    var text = $(sender).val().trim();
    if (text.length < 2) {
        return false;
    }

    $("#txtFindPrdCode").val($(sender).val());
    $("#txtFindPrdCode").addClass("ui-autocomplete-loading");
    $("#dvContextFinishedPrd").dialog({
        height: "500",
        width: "70%",
        modal: true,
        show: {
            effect: "blind",
            duration: 100
        },
        hide: {
            duration: 100
        },
        buttons: {
            "OK": function (s, e) {
                fnFillOrder($(".highlighted"), 1, s);
            }
        },
        open: function () {
            $("#dvFadeForProcessing").hide();
            $("#txtFindPrdCode").focus();
            $("#txtFindPrdCode").addClass("ui-autocomplete-loading");
            $("div[aria-describedby=dvContextFinishedPrd]").find(".ui-dialog-titlebar").hide();
            $("#dvContextFinishedPrd").css("height", "400px");
            $("div[aria-describedby=dvContextFinishedPrd]").css("overflow", "hidden");
            $("body").css("overflow", "hidden");
            setTimeout(function () {
                $("#txtFindPrdCode").mcautocompleteProductlist({
                    // These next two options are what this plugin adds to the autocomplete widget.
                    open: function () {
                        $("#ui-id-1").removeAttr("style");
                        $("#ui-id-1").css({
                            "display": "none",
                            "max-height": "350px",
                            "overflow-y": "auto"
                        });
                        $("#ui-id-1").remove();
                        // $("#ui-id-2").removeClass("ui-autocomplete");
                        EnableKeySelection();
                    },
                    delay: 500,
                    appendTo: "#dvPrdContainer",
                    showHeader: false,
                    columns: [{
                        name: 'SNo',
                        width: '60px',
                        valueField: 'id'
                    },
                    {
                        name: 'Product Name',
                        width: '250px',
                        valueField: 'SBF'
                    },
                    {
                        name: 'Brand',
                        width: '150px',
                        valueField: 'Brand'
                    },
                    {
                        name: 'BrandForm',
                        width: '200px',
                        valueField: 'BrandForm'
                    },
                    {
                        name: 'Category',
                        width: '130px',
                        valueField: 'Category'
                    },
                    {
                        name: 'MRP',
                        width: '80px',
                        valueField: 'MRP'
                    }
                        , {
                        name: 'RLP',
                        width: '80px',
                        valueField: 'RLP'
                    }
                    ],
                    focus: function (event, ui) {
                        event.preventDefault();
                    },
                    // Event handler for when a list item is selected.
                    select: function (event, ui) {
                        //alert("hi");
                        return false;
                    },
                    // The rest of the options are for configuring the ajax webservice call.
                    minLength: 2,
                    source: function (request, response) {
                        var text = request.term;
                        if (text.indexOf(",") > -1) {
                            if (text.split(",")[text.split(",").length - 1].length < 2) {
                                $("#txtFindPrdCode").removeClass("ui-autocomplete-loading");
                                return false;
                            }
                        }
                        $('tr.highlighted').removeClass("highlighted");
                        if (text in cache) {
                            response(cache[text]);
                            return;
                        }
                        //var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term.toLowerCase(), ""));
                        var arrSKUList = jQuery.grep(arrProductList, function (element, index) {
                            return (element.flgSearchList == true);
                        });
                        var dd = $.grep(arrSKUList, function (item) {
                            for (var i = 0; i < text.split(",").length; i++) {
                                if (item.Search.toLowerCase().indexOf(text.split(",")[i].toLowerCase()) == -1) {
                                    return false;
                                }
                            }
                            return true;
                        })
                        if (dd.length > 0) {
                            response(dd);
                        } else {
                            var lbl = [{
                                label: "No Record Found!"
                            }]
                            response(lbl);
                        }
                    }
                });
                $("#txtFindPrdCode").mcautocompleteProductlist("search", text);

            }, 500);

        }

    });

}


function GenTimePullDown(selector) {
    $(selector).html("");
    var currDate = $("#cphRight_hdnCurrentDate").val();
    var dt1 = new Date(currDate);
    var dt = new Date(currDate);
    dt.setMinutes(dt.getMinutes() + 30);
    var minss = dt.getHours() * 60 + dt.getMinutes();
    var select = $(selector);
    var hours, minutes, ampm;
    var min = dt.getHours() * 60;
    min = min <= (dt.getHours() * 60 + dt.getMinutes()) ? min + 30 : min;
    var sSselected = false;
    for (var i = min; i <= 1200; i += 30) {
        hours = Math.floor(i / 60);
        minutes = i % 60;
        if (minutes < 10) {
            minutes = '0' + minutes; // adding leading zero
        }
        ampm = hours % 24 < 12 ? 'AM' : 'PM';
        hours = hours % 12;
        if (hours === 0) {
            hours = 12;
        }

        //var actmin = hours * 60 + minutes;
        if (minss > min && minss < i && sSselected == false) {
            sSselected = true;
            select.append($('<option selected></option>')
                .attr('value', i)
                .text(hours + ':' + minutes + ' ' + ampm));
        } else {
            select.append($('<option></option>')
                .attr('value', i)
                .text(hours + ':' + minutes + ' ' + ampm));
        }
        //' + (sSselected==true?"selected='selected'":"") + '

    }

}
function fnNoOrderReason() {
    $("#dvReason").dialog({
        title: "Select Reason For No Order",
        modal: true,
        width: "500",
        height: window.innerHeight - 5,
        resizable: false,
        open: function () {
            GenTimePullDown($("#ddlschedulecall")[0]);
        },
        buttons: {
            "Submit": function () {

                try {
                    var OrderMaster = new Array();
                    var OrderDetail = new Array();
                    if ($("input[type=radio][name='rdoCnted']:checked").length == 0) {
                        alert("Kindly select reason first!!");
                        return false;
                    }
                    var ReasonId = $("input[type=radio][name='rdoCnted']:checked").val();

                    var flgSchedule = $("input[type=radio][name='rdoCnted']:checked").attr("flgSchedule");
                    var ScheduleCall = flgSchedule == 1 ? $("#ddlschedulecall option:selected").text() : "";
                    var Remarks = "";// $("#txtRemarks").val();
                    if (flgSchedule == "1") {
                        if (ScheduleCall == "") {
                            alert("Kindly select call schedule time first!!")
                            return false;
                        }
                        var t1 = ScheduleCall.split(" ")[0] + ":00" + " " + ScheduleCall.split(" ")[1];
                        var t2 = new Date().localeFormat("hh:mm:00 tt");
                        if (new Date('1/1/1999 ' + t2) > new Date('1/1/1999 ' + t1)) {
                            alert("Current time greater than selected schedule time kindly another time!!");
                            return false;
                        }

                        Remarks = $("#txtCallRemarks").val().trim();
                    }

                    $(this).dialog("close");
                    var strs = $("#cphRight_hdnNewStoreDetail").val();// = "5^ABC^2^1";//StoreId^StoreName^flgApproved^flgGST

                    var StoreID = strs.split("^")[0];
                    var TeleCallID = strs.split("^")[3];
                    var flgProductive = 0;

                    var OrderId = $("#cphRight_hdnOrderID").val();
                    var OrderDate = $("#txtOrderDate").val();
                    var OrderByCustomerNodeId = StoreID; //$($("#tblBasicDetail")[0].rows[0].cells[2]).find("input").attr("custid");
                    var OrderByCustomerNodeType = 0;// $("#ddlCmpnyCustomer option[value=" + OrderByCustomerNodeId + "]").attr("NodeType");
                    var CustomerPONo = 0;
                    var CustomerPODate = "";

                    //debugger;
                    var NetOrderValue = "0.00";// $("#tdNettInvValue").data("NettInvValue") == undefined ? "0.00" : $("#tdNettInvValue").data("NettInvValue");
                    var TotInvSchemeDiscount = "0.00";// $("#tdInvSchemeDiscount").data("InvSchemeDiscount") == undefined ? "0.00" : $("#tdInvSchemeDiscount").data("InvSchemeDiscount");
                    var flgInvoiceOnDelivery = 1;// $("#ddlDelivryRqrd").val();
                    var flgCollectionOnDelivery = 1;// $("#ddlInvoiceReq").val();
                    var FreightRuleId = 3;// $("#ddInsurance").val();
                    var CollectionRuleId = 1;// $("#ddCST").val();
                    var DlvryRuleId = 1;// $("#ddFreight").val();
                    var InvRuleId = 2;//$("#txtAgentName").val();
                    var InsRuleId = 4;// $("#ddlInvoicePhasing").val();
                    var TaxRuleId = 1;// $("#rdoCanDeliverInPart input[type=radio]:checked").val();
                    var OrdPrcsId = 6;
                    var OrderStatusId = 1;
                    var OrdPrcsIdOLD = 6;
                    var OrderStatusIdOLD = 1;

                    //return false;
                    var flgOrderClosed = 0;
                    var SalesPersonId = 0;
                    SalesPersonId = -1;
                    var SalesPersonNodeType = 0;
                    var OrderSourceID = 2;
                    var flgOffline = 7

                    var ReasonText = $("#tdRStoreName").html();
                    var DeliveryDate = "";
                    var TotOrderVal = "0.00";
                    var TotMRPValue = "0.00";
                    var TotLineLevelDisc = "0.00";
                    var TotDiscVal = "0.00";

                    var DSEIssueIds = "";
                    for (var d = 0; d < $("#divConnectedReason input[name='chkCnted']:checked").length; d++) {
                        if (DSEIssueIds == "") {
                            DSEIssueIds = $("#divConnectedReason input[name='chkCnted']:checked").eq(d).val();
                        } else {
                            DSEIssueIds += "," + $("#divConnectedReason input[name='chkCnted']:checked").eq(d).val();
                        }
                    }
                    var DSEComments = $("#txtRemarksToDsr").val().trim();

                    var arrStarsDet = [];
                    arrayRowData = [{
                        OrderId: OrderId, OrderDate: OrderDate, OrderByCustomerNodeId: OrderByCustomerNodeId, OrderByCustomerNodeType: OrderByCustomerNodeType, CustomerPONo: CustomerPONo,
                        CustomerPODate: CustomerPODate, Remarks: Remarks, NetOrderValue: NetOrderValue, OrderStatusId: OrderStatusId, flgOrderClosed: flgOrderClosed, SalesPersonId: SalesPersonId
                        , SalesPersonNodeType: SalesPersonNodeType, OrderSourceID: OrderSourceID, flgOffline: flgOffline, OrdPrcsId: OrdPrcsId, ReasonId: ReasonId, ReasonText: ReasonText, DeliveryDate: DeliveryDate,
                        TotOrderVal: TotOrderVal, TotMRPValue: TotMRPValue, TotLineLevelDisc: TotLineLevelDisc, TotDiscVal: TotDiscVal, DSEComments: DSEComments, DSEIssueIds: DSEIssueIds
                    }];
                    OrderMaster.push(arrayRowData[0]);

                    $("#dvFadeForProcessing").css("display", "block");
                    PageMethods.fnspPopulateOrderDetail(OrderMaster, OrderDetail, arrStoreProductAppliedSchemesBenifitsRecords, flgProductive, TeleCallID, ReasonId, ScheduleCall, $("#cphRight_hdnSalesNodeId").val(), $("#cphRight_hdnSalesNodeType").val(), $("#cphRight_hdnLoginId").val(), arrStarsDet, function (result) {
                        $("#dvFadeForProcessing").css("display", "none");
                        if (result.split("^")[1] == 4) {

                            alert(result.split("^")[0]);
                            window.location.href = "../frmLogin.aspx";
                        }
                        else if (result.split("^")[1] == 2) {
                            alert(result.split("^")[0]);
                        } else {

                            //alert(result.split("^")[0]);
                            window.parent.fnClosedvOrderPop(2);

                        }
                    }, function (result) {
                        alert(result._message);
                    });
                }
                catch (err) {

                    $("#dvFadeForProcessing").css("display", "none");
                    alert(err);
                }
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        }
    })

}
function fnSetDateTimePicker() {
    //var ddd = new Date();
    var currDate = $("#cphRight_hdnCurrentDate").val();
    var ddd = new Date(currDate);
    ddd.setDate(ddd.getDate() + 1);
    $("#txtRequiredDlvryDate").val(ddd.localeFormat("dd-MMM-yyyy"));
    $("#txtRequiredDlvryDate").datepicker({
        dateFormat: "dd-M-yy",
        minDate: new Date(),
        changeMonth: true,
        changeYear: true,
        showOn: "button",
        buttonImage: "../images/calender.jpg",
        buttonImageOnly: true,
        buttonText: "Select date",
        onSelect: function (d, el) {

            //debugger;
            if ($(this)[0].id == "txtCustPODate") {
                //if (d > $("#txtOrderDate").val()) {
                //    $(this).val("");
                //    alert("This date should not be greater than Order Date.");
                //    return false;
                //}
            }
            else {
                var orderdate = $("#txtOrderDate").val();
                orderdate = orderdate.replace(/\-/g, ' ');
                var d_orderdate = new Date(orderdate);

                var currDate = d;
                currDate = currDate.replace(/\-/g, ' ');
                var d_currDate = new Date(currDate);

                if (d_currDate < d_orderdate) {
                    $(this).val(deliveryDate);
                    alert("This date should not be less than Order Date.");
                    return false;
                }
                var len = $(this).closest("table").find('.dtp').map(function () { if ($(this).val() == d) { return 1 } }).get().join('+');
                if (eval(len) > 1) {
                    $(this).val("");
                    alert("Duplicate dates not allowed for same delivery.");
                    return false;
                }
                if ($(this)[0].id == "txtOrderDate") {
                    var orderdate = $("#txtOrderDate").val();
                    orderdate = orderdate.replace(/\-/g, ' ');
                    var d = new Date(orderdate);
                    var currDate = $("#cphRight_hdnCurrentDate").val();
                    var curDate = new Date(currDate);
                    if (new Date(d.localeFormat("yyyy/M/d")) > new Date(curDate.localeFormat("yyyy/M/d"))) {
                        alert("Order Date should not be greater than Current Date!");
                        $("#txtOrderDate").val(curDate.localeFormat("dd-MMM-yyyy"));
                        d = curDate;
                        return false;
                    }

                    var lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);
                    var n = d.getDay();
                    d.setDate(d.getDate() + 1);
                    loop1: do {
                        var ael = $(el.dpDiv).find('[data-year="' + d.getFullYear() + '"][data-month="' + d.getMonth() + '"]').filter(function () {
                            return $(this).find('a').text().trim() == d.getDate();
                        });
                        if (ael.closest("td").hasClass('highlightedWeekOffDate') || ael.closest("td").hasClass('highlightedDate')) {
                            if (ael.closest("td").next().hasClass('highlightedWeekOffDate') || ael.closest("td").next().hasClass('highlightedDate')) {
                                d.setDate(d.getDate() + 2);
                                continue loop1;
                            } else {
                                d.setDate(d.getDate() + 1);
                                $("#txtRequiredDlvryDate").val(d.localeFormat("dd-MMM-yyyy"));
                                break loop1;
                            }
                        } else {
                            $("#txtRequiredDlvryDate").val(d.localeFormat("dd-MMM-yyyy"));
                            break loop1;
                        }

                    } while (1);

                    deliveryDate = $("#txtRequiredDlvryDate").val();
                    var SalesNodeId = $("#cphRight_hdnSalesNodeId").val();
                    var SalesNodeType = $("#cphRight_hdnSalesNodeType").val();
                    var SalesPersonID = 0;
                    var CustNodeId = $("#hdnStoreID").val();
                    if (parseInt(CustNodeId) > 0) {
                        // fnFillExistDetailForEditing(CustNodeId, 0, 1);
                    }
                    //fnGetDSRList(orderdate, SalesNodeId, SalesNodeType, SalesPersonID);
                }
                if ($(this)[0].id == "txtRequiredDlvryDate") {
                    // fnCalCreditDate();
                    var RequiredDlvryDate = $("#txtRequiredDlvryDate").val();
                    RequiredDlvryDate = RequiredDlvryDate.replace(/\-/g, ' ');
                    var d = new Date(RequiredDlvryDate);
                    var lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);
                    var n = d.getDay();
                    var orderdate = $("#txtOrderDate").val();
                    orderdate = orderdate.replace(/\-/g, ' ');
                    var d_orderdate = new Date(orderdate);

                    var ael = $(el.dpDiv).find('[data-year="' + el.selectedYear + '"][data-month="' + el.selectedMonth + '"]').filter(function () {
                        return $(this).find('a').text().trim() == el.selectedDay;
                    });

                    if (ael.closest("td").hasClass('highlightedWeekOffDate')) {
                        alert("The date you select is Weekly Off, Please select another date");
                        $("#txtRequiredDlvryDate").val(deliveryDate);
                        return false;
                    }
                    else if (ael.closest("td").hasClass('highlightedDelTrueDate')) {
                        var strconfirm = confirm("Are you sure want to deliver on this date because this date is Off due to " + ael.closest("td").attr("title") + "?");
                        if (!strconfirm) {
                            $("#txtRequiredDlvryDate").val(deliveryDate);
                            return false;
                        } else {
                            deliveryDate = $("#txtRequiredDlvryDate").val();
                        }
                    }
                    else if (ael.closest("td").hasClass('highlightedDate')) {
                        alert("The date you select is Off due to " + ael.closest("td").attr("title") + ", Please select another date");
                        $("#txtRequiredDlvryDate").val(deliveryDate);
                        return false;
                    }
                    else {
                        HasProductStock = new Array();
                        HasProductLastFiveRate = new Array();
                    }
                    var CustNodeId = $("#hdnStoreID").val();
                    //if (parseInt(CustNodeId) > 0) {
                    //    fnFillExistDetailForEditing(CustNodeId, 0, 1);
                    //}
                }
            }
        }

    });

    $('img.ui-datepicker-trigger').css({ 'cursor': 'pointer', "vertical-align": 'middle' });
}

function orderBookingTotalCalc(Sender, ProductID, alrtBenSubBucketType, listfreeProductQty, schemAllString) {
    //debugger;
    var StandardRate = 0.00;
    var StandardRateBeforeTax = 0.00;
    var StandardTax = 0.00;
    var ActualRateAfterDiscountBeforeTax = 0.00;
    var DiscountAmount = 0.00;
    var ActualTax = 0.00;
    var ActualRateAfterDiscountAfterTax = 0.00;

    var PrdMaxValuePercentageDiscount = "";
    var PrdMaxValueFlatDiscount = "";
    var Grammage = 0.00;

    var OrderQuantity = $(Sender).closest("tr").find("input[type=text]").eq(0).val();
    var schSlabID = 0;
    var schID = 0;
    var Per = 0;
    var UOM = 0;
    var flgQuoteApplied = 0;
    var invdiscountamount = 0;
    var trPrdItemsMain = $("#tblPrdItemsMain tr[flgdata=1]").filter("[SKUNodeID=" + ProductID + "]");
    //debugger;
    if (trPrdItemsMain.length > 0) {
        for (var i = 0; i < trPrdItemsMain.length; i++) {
            StandardRate = 0;
            StandardRateBeforeTax = $(trPrdItemsMain).eq(i).attr("standardratebeforetax");
            ActualTax = 0;
            trPrdItemsMain.eq(i).find("input[type=text]").eq(0).val(OrderQuantity);

            DiscountAmount = 0;

            trPrdItemsMain.eq(i).find("td[iden='netval']").attr("discountamount", DiscountAmount);

            trPrdItemsMain[i].cells[currRateIndx].innerHTML = "&#8377; " + parseFloat(StandardRateBeforeTax).toFixed(2);
            trPrdItemsMain[i].cells[DiscountIndx].innerHTML = "&#8377; " + parseFloat(DiscountAmount).toFixed(2);
            $(trPrdItemsMain[i].cells[DiscountIndx]).attr("discountamount", DiscountAmount);
            $(trPrdItemsMain[i].cells[DiscountIndx]).attr("CurrentRate", StandardRateBeforeTax);

            $(trPrdItemsMain[i].cells[DiscountIndx]).attr("invdiscountamount", invdiscountamount);

            ValBeforeTax = ((parseFloat(StandardRateBeforeTax) * parseInt(OrderQuantity)) - parseFloat(DiscountAmount));

            trPrdItemsMain.eq(i).find("td[iden='netval']")[0].innerHTML = "&#8377; " + parseFloat(ValBeforeTax).toFixed(2);
            trPrdItemsMain.eq(i).find("td[iden='netval']").attr("valbeforetax", ValBeforeTax);
            trPrdItemsMain.eq(i).find("td[iden='netval']").attr("valaftertax", ValBeforeTax);
        }
    }
    //  fnHighlightSBD(1);
    //Now the its Time to Show the OverAll Summary Code Starts Here
}
function fnApplyPercentageDiscountOnProduct_Temp(PrdID) {

    var trPrdItemsMain = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][skunodeid=" + PrdID + "]");
    var OldFreePrdID = 0;
    var arrSchemeAchieved = [];
    for (var i = 0; i < trPrdItemsMain.length; i++) {
        var PrdID = $(trPrdItemsMain[i]).attr("SKUNodeID");
        var OldQty = trPrdItemsMain.eq(i).find("td.clsOldQ").text();
        var OrderQuantity = parseFloat(trPrdItemsMain.eq(i).find("input:text").val() == "" ? 0 : trPrdItemsMain.eq(i).find("input:text").val());
        OrderQuantity = parseInt(OrderQuantity) + parseInt(OldQty);
        var StandardRate = 0;// $(trPrdItemsMain[i]).data("standardrate");
        var StandardRateBeforeTax = $(trPrdItemsMain[i]).attr("standardratebeforetax");
        var CurrentRLP = $(trPrdItemsMain[i]).attr("standardratebeforetax");
        var ActualTax = 0;// $(trPrdItemsMain[i]).data("tax");
        var Grammage = 0;// $(trPrdItemsMain[i]).data("grammage");
        var flgPriceChange = 0;// $(trPrdItemsMain[i]).data("flgbatchpricechange") ? 0 : $(trPrdItemsMain[i]).data("flgbatchpricechange");
        var flgQuoteApplied = 0;// $(trPrdItemsMain[i]).is("[flgQuoteApplied]") ? 1 : 0;

        var ValBeforeTax = parseInt(OrderQuantity) == 0 ? parseFloat(StandardRateBeforeTax) : parseFloat(StandardRateBeforeTax) * parseFloat(OrderQuantity);
        arrSchemeAchieved = [];
        var OriValBeforeTax = ValBeforeTax;
        var SchemeProduct = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords_Temp, function (element, index) {
            return (element.ProductID == PrdID && (element.benSubBucketType == 2 || element.benSubBucketType == 3 || element.benSubBucketType == 6 || element.benSubBucketType == 7 || element.benSubBucketType == 8 || element.benSubBucketType == 9 || element.benSubBucketType == 10));
        });

        //invdiscountamount
        var DiscountAmount = 0.00; var invdiscountamount = 0;
        for (var discnt in SchemeProduct) {
            var benSubBucketType = SchemeProduct[discnt].benSubBucketType;
            var benifitSubBucketValue = parseFloat(SchemeProduct[discnt].benifitSubBucketValue);
            var benifitAssignedVal = parseFloat(SchemeProduct[discnt].benifitAssignedVal);
            var flgAddOnScheme = SchemeProduct[discnt].flgAddOnScheme;
            var flgAddOnBenefit = SchemeProduct[discnt].flgAddOnBenefit;
            var SchTypeId = SchemeProduct[discnt].SchTypeId;
            var schemeSlabId = SchemeProduct[discnt].schemeSlabId;
            var schemeId = SchemeProduct[discnt].schemeId;
            var schemeSlabBcktId = SchemeProduct[discnt].schemeSlabBcktId;
            var strException = SchemeProduct[discnt].exceptionvalue;
            var distval = 0;
            var IsPayoutFixed = SchemeProduct[discnt].IsPayoutFixed;
            if (benSubBucketType == 3 || benSubBucketType == 7 || benSubBucketType == 10) {
                distval = parseFloat(benifitSubBucketValue);
                DiscountAmount += parseFloat(distval);
                ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(distval);
                arrSchemeAchieved.push({ schemeId: schemeId, DiscountAmount: distval, invdiscountamount: 0, PrdID: PrdID });
            }
            else if (benSubBucketType == 8) {
                // distval = parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;

                distval = parseInt(OrderQuantity) == 0 ? parseFloat(StandardRateBeforeTax) * parseFloat(benifitSubBucketValue) / 100 : parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
                invdiscountamount += parseFloat(distval);
                if (parseFloat(ValBeforeTax) == 0) {
                    ValBeforeTax = parseFloat(StandardRateBeforeTax) - parseFloat(distval);
                }
                else {
                    ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(distval);
                }

                arrSchemeAchieved.push({ schemeId: schemeId, DiscountAmount: 0, invdiscountamount: distval, PrdID: PrdID });
                //console.log(JSON.stringify(arrSchemeAchieved))
                //alert("ValBeforeTax:" + ValBeforeTax + "\n distval:" + distval + "\n benSubBucketType:" + benSubBucketType);
            }
            else if (benSubBucketType == 9) {
                distval = parseFloat(benifitSubBucketValue);
                invdiscountamount += parseFloat(distval);
                //OrderQuantity = parseInt(OrderQuantity) == 0 ? 1 : parseInt(OrderQuantity);
                if (parseFloat(ValBeforeTax) == 0) {
                    ValBeforeTax = parseFloat(StandardRateBeforeTax) - parseFloat(distval);
                }
                else {
                    ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(distval);
                }
                //ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(distval);
                arrSchemeAchieved.push({ schemeId: schemeId, DiscountAmount: 0, invdiscountamount: distval, PrdID: PrdID });
                //console.log(JSON.stringify(arrSchemeAchieved))
            }
            else {
                if (flgAddOnBenefit > 0) {
                    distval = parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
                } else {
                    distval = parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
                }
                arrSchemeAchieved.push({ schemeId: schemeId, DiscountAmount: distval, invdiscountamount: 0, PrdID: PrdID });

                ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(distval);
                //alert("ValBeforeTax:" + ValBeforeTax + "\n distval:" + distval + "\n benSubBucketType:" + benSubBucketType);
                DiscountAmount += parseFloat(distval);
            }
        }

        // DiscountAmount = parseFloat(DiscountAmount);
        // OrderQuantity = parseInt(OrderQuantity) == 0 ? 1 : parseInt(OrderQuantity);
        var CurrentRate = parseInt(OrderQuantity) > 0 ? parseFloat(ValBeforeTax) / parseInt(OrderQuantity) : ValBeforeTax;
        // console.log("OrderQuantity:" + OrderQuantity + "\nValBeforeTax:" + ValBeforeTax + "\nCurrentRate:" + CurrentRate);
        //trPrdItemsMain[i].cells[DiscountIndx].innerHTML = "&#8377; " + parseFloat(DiscountAmount).toFixed(2);
        trPrdItemsMain.eq(i).find("td.clscurrentrate")[0].innerHTML = "&#8377; " + parseFloat(CurrentRate).toFixed(2);
        $(trPrdItemsMain.eq(i).find("td.clscurrentrate")[0]).attr("discountamount", DiscountAmount);
        $(trPrdItemsMain.eq(i).find("td.clscurrentrate")[0]).attr("CurrentRate", CurrentRLP);
        $(trPrdItemsMain.eq(i).find("td.clscurrentrate")[0]).attr("invdiscountamount", invdiscountamount);

        // var ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(DiscountAmount);
        // trPrdItemsMain[i].cells[ValueBeforeTaxIndx].innerHTML = "&#8377; " + parseFloat(ValBeforeTax).toFixed(2);
        //$(trPrdItemsMain[i].cells[ValueBeforeTaxIndx]).attr("valbeforetax", ValBeforeTax);


    }
    // console.log("StandardRateBeforeTax:" + StandardRateBeforeTax + "\ninvdiscountamount:" + invdiscountamount + "\norderqty:" + OrderQuantity);
    // arrSchemeAchieved.push({ schemeId: schemeId, DiscountAmount: 0, invdiscountamount: distval });
    //  console.log(JSON.stringify(arrSchemeAchieved))
    var SchemeCells = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][skunodeid=" + PrdID + "]").find("td.clsscheme");
    for (var j = 0; j < SchemeCells.length; j++) {
        var schId = SchemeCells.eq(j).attr("schId");
        var CurrentDisc = SchemeCells.eq(j).attr("CurrentDiscount");
        CurrentDisc = CurrentDisc == undefined || CurrentDisc == "" ? 0 : CurrentDisc;
        var SchemeProduct = jQuery.grep(arrSchemeAchieved, function (element, index) {
            return (element.schemeId == schId);
        });
        //invdiscountamount
        var DiscountAmount = 0.00;
        for (var discnt in SchemeProduct) {
            var distval = SchemeProduct[discnt].DiscountAmount;
            DiscountAmount += parseFloat(distval);
        }
        var AdditionalDisc = parseFloat(DiscountAmount) - parseFloat(CurrentDisc);
        AdditionalDisc = AdditionalDisc < 0 ? 0 : AdditionalDisc;
        SchemeCells.eq(j).find("a").html(parseFloat(CurrentDisc).toFixed(2) + "/" + parseFloat(AdditionalDisc).toFixed(2));
    }




    //$("#tdAdditionalDiscount").data("adddiscountamount", DiscountAmountOnInvoice)
    //$("#tdAdditionalDiscount").val(parseFloat(DiscountAmountOnInvoice).toFixed(2));
}

function fnGetDiscountSchemeWise_Temp(SchemeID) {

    var DiscountAmount = 0.00; var invdiscountamount = 0;

    var SchemeProduct = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords_Temp, function (element, index) {
        return (element.schemeId == SchemeID);// && (element.benSubBucketType == 2 || element.benSubBucketType == 3 || element.benSubBucketType == 6 || element.benSubBucketType == 7 || element.benSubBucketType == 8 || element.benSubBucketType == 9 || element.benSubBucketType == 10));
    });

    //console.log(JSON.stringify(SchemeProduct))
    //invdiscountamount
    // alert(SchemeProduct.length)
    var orderqty = 0; var StandardRateBeforeTax = 0;
    for (var discnt in SchemeProduct) {
        var benSubBucketType = SchemeProduct[discnt].benSubBucketType;
        var benifitSubBucketValue = parseFloat(SchemeProduct[discnt].benifitSubBucketValue);
        var benifitAssignedVal = parseFloat(SchemeProduct[discnt].benifitAssignedVal);
        StandardRateBeforeTax = SchemeProduct[discnt].StandardRateBeforeTax;
        orderqty = SchemeProduct[discnt].orderqty;
        orderqty = isNaN(orderqty) ? 0 : parseFloat(orderqty);
        StandardRateBeforeTax = isNaN(StandardRateBeforeTax) ? 0 : parseFloat(StandardRateBeforeTax);
        var OriValBeforeTax = parseFloat(StandardRateBeforeTax) * parseInt(orderqty);

        var distval = 0;
        if (benSubBucketType == 3 || benSubBucketType == 7 || benSubBucketType == 10) {
            distval = parseFloat(benifitSubBucketValue);
            DiscountAmount += parseFloat(distval);
            //ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(distval);
            //arrSchemeAchieved.push({ schemeId: schemeId, DiscountAmount: distval, invdiscountamount: 0 });
        }
        else if (benSubBucketType == 8) {
            // distval = parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
            distval = parseInt(orderqty) == 0 ? parseFloat(StandardRateBeforeTax) * parseFloat(benifitSubBucketValue) / 100 : parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
            DiscountAmount += parseFloat(distval);
            // ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(distval);
            //arrSchemeAchieved.push({ schemeId: schemeId, DiscountAmount: 0, invdiscountamount: distval });
            //alert("ValBeforeTax:" + ValBeforeTax + "\n distval:" + distval + "\n benSubBucketType:" + benSubBucketType);
        }
        else if (benSubBucketType == 9) {
            distval = parseFloat(benifitSubBucketValue);
            DiscountAmount += parseFloat(distval);
            //ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(distval);
            //arrSchemeAchieved.push({ schemeId: schemeId, DiscountAmount: 0, invdiscountamount: distval });
        }
        else {

            distval = parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
            // arrSchemeAchieved.push({ schemeId: schemeId, DiscountAmount: distval, invdiscountamount: 0 });

            //ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(distval);
            //alert("ValBeforeTax:" + ValBeforeTax + "\n distval:" + distval + "\n benSubBucketType:" + benSubBucketType);
            DiscountAmount += parseFloat(distval);
        }

    }

    // console.log("StandardRateBeforeTax:" + StandardRateBeforeTax + "\nDiscountAmount:" + DiscountAmount + "\norderqty:" + orderqty);

    return DiscountAmount;
    //$("#tdAdditionalDiscount").data("adddiscountamount", DiscountAmountOnInvoice)
    //$("#tdAdditionalDiscount").val(parseFloat(DiscountAmountOnInvoice).toFixed(2));
}
function fnRecalculateScheme_Temp(flg) {

    var SchemeCells = $("#tblLtrSchemeCalculation tr[flg=1]");
    for (var j = 0; j < SchemeCells.length; j++) {
        var schId = SchemeCells.eq(j).attr("schId");
        // alert(schId)
        var disc = fnGetDiscountSchemeWise_Temp(schId);
        disc = isNaN(disc) ? 0 : disc;
        // alert(disc)
        var flgSchemeExistAgainStore = jQuery.grep(arrSchemeSlabachievement_Temp, function (element, index) {
            return (element.SchemeId == schId);
        });
        let arrSlabsachievementDetails = flgSchemeExistAgainStore.slice().sort((a, b) => parseInt(b.SlabId) - parseInt(a.SlabId));
        // console.log(JSON.stringify(arrSlabsachievementDetails));
        var SlabTypePer = 0; var clsbg = ""; var OldSlabId = 0;
        if (arrSlabsachievementDetails.length > 0) {
            OldSlabId = arrSlabsachievementDetails[0].SlabId;
        }
        SchemeCells.eq(j).find("td").eq(1).removeAttr("class");
        SchemeCells.eq(j).find("td").eq(2).removeAttr("class");
        for (var sl in arrSlabsachievementDetails) {
            var SlabId = arrSlabsachievementDetails[sl].SlabId;
            var SlabDesc = arrSlabsachievementDetails[sl].SlabTypeDesc;
            var SlabTypeRequiredDesc = arrSlabsachievementDetails[sl].SlabTypeRequiredDesc;
            SlabTypePer = parseInt(arrSlabsachievementDetails[sl].SlabTypePer);
            var flgApplied = 0;
            if (SlabTypePer >= 100 && OldSlabId == SlabId) {
                clsbg = "clsCellGreenBg";
            }
            else if (SlabTypePer > 40 && SlabTypePer < 100) {
                clsbg = "clsCellOrangeBg";
            }

        }
        SchemeCells.eq(j).find("td").eq(3).html("&#8377; " + parseFloat(disc).toFixed(2));
        if (flg == 2) {
            if (clsbg == "clsCellGreenBg") {
                SchemeCells.eq(j).find("td").eq(2).find("a").html("");
            }
        }
        else if (flg == 3) {
            if (clsbg == "clsCellGreenBg") {
                SchemeCells.eq(j).find("td").eq(2).find("a").html("Remove");
            } else {
                SchemeCells.eq(j).find("td").eq(2).find("a").html("Apply");
            }
        }
        else {
            if (clsbg == "clsCellGreenBg") {
                SchemeCells.eq(j).find("td").eq(2).find("a").html("");
            } else {
                SchemeCells.eq(j).find("td").eq(2).find("a").html("Apply");
            }
        }
        SchemeCells.eq(j).find("td").eq(0).removeAttr("class").addClass(clsbg);
        SchemeCells.eq(j).find("td").eq(1).removeAttr("class").addClass(clsbg);
    }

    //var SchemeCells = $("#tblLssSchemeCalculation tr[flg=1]");
    //for (var j = 0; j < SchemeCells.length; j++) {
    //    var schId = SchemeCells.eq(j).attr("schId");
    //    // alert(schId)
    //    var disc = fnGetDiscountSchemeWise_Temp(schId);
    //    disc = isNaN(disc) ? 0 : disc;
    //    // alert(disc)
    //    var CurrentDisc = SchemeCells.eq(j).attr("currdisc");
    //    var AdditionalDisc = parseFloat(disc) - parseFloat(CurrentDisc);
    //    SchemeCells.eq(j).find("td").eq(5).html("&#8377; " + parseFloat(AdditionalDisc).toFixed(2));

    //    SchemeCells.eq(j).find("td").eq(6).html("&#8377; " + parseFloat(disc).toFixed(2));
    //}

}

function fnApplyPercentageDiscountOnProduct(PrdID) {

    var trPrdItemsMain = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + PrdID + "]");
    var OldFreePrdID = 0;

    for (var i = 0; i < trPrdItemsMain.length; i++) {
        var PrdID = $(trPrdItemsMain[i]).attr("SKUNodeID");
        var OrderQuantity = parseFloat(trPrdItemsMain[i].cells[OrderQntyIndx].children[0].value == "" ? 0 : trPrdItemsMain[i].cells[OrderQntyIndx].children[0].value);
        var StandardRate = 0;// $(trPrdItemsMain[i]).data("standardrate");
        var StandardRateBeforeTax = $(trPrdItemsMain[i]).attr("standardratebeforetax");
        var ActualTax = 0;// $(trPrdItemsMain[i]).data("tax");
        var Grammage = 0;// $(trPrdItemsMain[i]).data("grammage");
        var flgPriceChange = 0;// $(trPrdItemsMain[i]).data("flgbatchpricechange") ? 0 : $(trPrdItemsMain[i]).data("flgbatchpricechange");
        var flgQuoteApplied = 0;// $(trPrdItemsMain[i]).is("[flgQuoteApplied]") ? 1 : 0;
        var ValBeforeTax = parseFloat(StandardRateBeforeTax) * parseFloat(OrderQuantity);

        var OriValBeforeTax = ValBeforeTax;
        var SchemeProduct = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords, function (element, index) {
            return (element.ProductID == PrdID && (element.benSubBucketType == 2 || element.benSubBucketType == 3 || element.benSubBucketType == 6 || element.benSubBucketType == 7 || element.benSubBucketType == 8 || element.benSubBucketType == 9 || element.benSubBucketType == 10));
        });
        //invdiscountamount
        var DiscountAmount = 0.00; var invdiscountamount = 0;
        for (var discnt in SchemeProduct) {
            var benSubBucketType = SchemeProduct[discnt].benSubBucketType;
            var benifitSubBucketValue = parseFloat(SchemeProduct[discnt].benifitSubBucketValue);
            var benifitAssignedVal = parseFloat(SchemeProduct[discnt].benifitAssignedVal);
            var flgAddOnScheme = SchemeProduct[discnt].flgAddOnScheme;
            var flgAddOnBenefit = SchemeProduct[discnt].flgAddOnBenefit;
            var SchTypeId = SchemeProduct[discnt].SchTypeId;
            var schemeSlabId = SchemeProduct[discnt].schemeSlabId;
            var schemeId = SchemeProduct[discnt].schemeId;
            var schemeSlabBcktId = SchemeProduct[discnt].schemeSlabBcktId;
            var strException = SchemeProduct[discnt].exceptionvalue;
            var distval = 0;
            var IsPayoutFixed = SchemeProduct[discnt].IsPayoutFixed;
            if (benSubBucketType == 3 || benSubBucketType == 7 || benSubBucketType == 10) {
                distval = parseFloat(benifitSubBucketValue);
                DiscountAmount += parseFloat(distval);
                ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(distval);
            }
            else if (benSubBucketType == 8) {
                // distval = parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
                distval = parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
                invdiscountamount += parseFloat(distval);
                ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(distval);
                //alert("ValBeforeTax:" + ValBeforeTax + "\n distval:" + distval + "\n benSubBucketType:" + benSubBucketType);
            }
            else if (benSubBucketType == 9) {
                distval = parseFloat(benifitSubBucketValue);
                invdiscountamount += parseFloat(distval);
                ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(distval);
            }
            else {
                if (flgAddOnBenefit > 0) {
                    distval = parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
                } else {
                    distval = parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
                }

                ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(distval);
                //alert("ValBeforeTax:" + ValBeforeTax + "\n distval:" + distval + "\n benSubBucketType:" + benSubBucketType);
                DiscountAmount += parseFloat(distval);
            }

        }

        // DiscountAmount = parseFloat(DiscountAmount);
        var CurrentRate = parseInt(OrderQuantity) > 0 ? parseFloat(ValBeforeTax) / parseFloat(OrderQuantity) : StandardRateBeforeTax;
        trPrdItemsMain[i].cells[DiscountIndx].innerHTML = "&#8377; " + parseFloat(DiscountAmount).toFixed(2);
        trPrdItemsMain[i].cells[currRateIndx].innerHTML = "&#8377; " + parseFloat(CurrentRate).toFixed(2);
        $(trPrdItemsMain[i].cells[DiscountIndx]).attr("discountamount", DiscountAmount);
        $(trPrdItemsMain[i].cells[DiscountIndx]).attr("CurrentRate", CurrentRate);
        $(trPrdItemsMain[i].cells[DiscountIndx]).attr("invdiscountamount", invdiscountamount);

        // var ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(DiscountAmount);
        trPrdItemsMain[i].cells[ValueBeforeTaxIndx].innerHTML = "&#8377; " + parseFloat(ValBeforeTax).toFixed(2);
        $(trPrdItemsMain[i].cells[ValueBeforeTaxIndx]).attr("valbeforetax", ValBeforeTax);

        var TaxValue = (parseFloat(ValBeforeTax) * parseFloat(ActualTax)) / 100;
        //trPrdItemsMain[i].cells[TaxValueIndx].innerHTML = parseFloat(TaxValue).toFixed(2);
        // $(trPrdItemsMain[i].cells[TaxValueIndx]).data("taxvalue", TaxValue);

        var valAfterTax = ValBeforeTax + TaxValue;
        //trPrdItemsMain[i].cells[ValueAfterTaxIndx].children[0].value = parseFloat(valAfterTax).toFixed(2);
        //$(trPrdItemsMain[i].cells[ValueAfterTaxIndx].children[0]).data("valaftertax", valAfterTax);
    }

    //$("#tdAdditionalDiscount").data("adddiscountamount", DiscountAmountOnInvoice)
    //$("#tdAdditionalDiscount").val(parseFloat(DiscountAmountOnInvoice).toFixed(2));
}

function fnCurrentDiscountOnProductForScheme(PrdID, SchemeID) {

    var trPrdItemsMain = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + PrdID + "]");
    var OldFreePrdID = 0;
    var DiscountAmount = 0.00; var invdiscountamount = 0;
    for (var i = 0; i < trPrdItemsMain.length; i++) {
        var PrdID = $(trPrdItemsMain[i]).attr("SKUNodeID");
        var OrderQuantity = parseFloat(trPrdItemsMain[i].cells[OrderQntyIndx].children[0].value == "" ? 0 : trPrdItemsMain[i].cells[OrderQntyIndx].children[0].value);
        var StandardRate = 0;// $(trPrdItemsMain[i]).data("standardrate");
        var StandardRateBeforeTax = $(trPrdItemsMain[i]).attr("standardratebeforetax");
        var ActualTax = 0;// $(trPrdItemsMain[i]).data("tax");
        var Grammage = 0;// $(trPrdItemsMain[i]).data("grammage");
        var flgPriceChange = 0;// $(trPrdItemsMain[i]).data("flgbatchpricechange") ? 0 : $(trPrdItemsMain[i]).data("flgbatchpricechange");
        var flgQuoteApplied = 0;// $(trPrdItemsMain[i]).is("[flgQuoteApplied]") ? 1 : 0;
        var ValBeforeTax = parseFloat(StandardRateBeforeTax) * parseFloat(OrderQuantity);

        var OriValBeforeTax = ValBeforeTax;
        var SchemeProduct = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords, function (element, index) {
            return (element.schemeId == SchemeID && element.ProductID == PrdID && (element.benSubBucketType == 2 || element.benSubBucketType == 3 || element.benSubBucketType == 6 || element.benSubBucketType == 7 || element.benSubBucketType == 8 || element.benSubBucketType == 9 || element.benSubBucketType == 10));
        });
        //invdiscountamount

        for (var discnt in SchemeProduct) {
            var benSubBucketType = SchemeProduct[discnt].benSubBucketType;
            var benifitSubBucketValue = parseFloat(SchemeProduct[discnt].benifitSubBucketValue);
            var benifitAssignedVal = parseFloat(SchemeProduct[discnt].benifitAssignedVal);
            var flgAddOnScheme = SchemeProduct[discnt].flgAddOnScheme;
            var flgAddOnBenefit = SchemeProduct[discnt].flgAddOnBenefit;
            var SchTypeId = SchemeProduct[discnt].SchTypeId;
            var schemeSlabId = SchemeProduct[discnt].schemeSlabId;
            var schemeId = SchemeProduct[discnt].schemeId;
            var schemeSlabBcktId = SchemeProduct[discnt].schemeSlabBcktId;
            var strException = SchemeProduct[discnt].exceptionvalue;
            var distval = 0;
            var IsPayoutFixed = SchemeProduct[discnt].IsPayoutFixed;
            if (benSubBucketType == 3 || benSubBucketType == 7 || benSubBucketType == 10) {
                distval = parseFloat(benifitSubBucketValue);
                DiscountAmount += parseFloat(distval);
                ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(distval);
            }
            else if (benSubBucketType == 8) {
                // distval = parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
                distval = parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
                invdiscountamount += parseFloat(distval);
                ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(distval);
                //alert("ValBeforeTax:" + ValBeforeTax + "\n distval:" + distval + "\n benSubBucketType:" + benSubBucketType);
            }
            else if (benSubBucketType == 9) {
                distval = parseFloat(benifitSubBucketValue);
                invdiscountamount += parseFloat(distval);
                ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(distval);
            }
            else {
                if (flgAddOnBenefit > 0) {
                    distval = parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
                } else {
                    distval = parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
                }

                ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(distval);
                //alert("ValBeforeTax:" + ValBeforeTax + "\n distval:" + distval + "\n benSubBucketType:" + benSubBucketType);
                DiscountAmount += parseFloat(distval);
            }
        }

        //// DiscountAmount = parseFloat(DiscountAmount);
        //var CurrentRate = parseFloat(ValBeforeTax) / parseFloat(OrderQuantity);
        ////trPrdItemsMain[i].cells[DiscountIndx].innerHTML = "&#8377; " + parseFloat(DiscountAmount).toFixed(2);
        //trPrdItemsMain[i].cells[DiscountIndx].innerHTML = "&#8377; " + parseFloat(CurrentRate).toFixed(2);
        //$(trPrdItemsMain[i].cells[DiscountIndx]).attr("discountamount", DiscountAmount);
        //$(trPrdItemsMain[i].cells[DiscountIndx]).attr("invdiscountamount", invdiscountamount);

        //// var ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(DiscountAmount);
        //trPrdItemsMain[i].cells[ValueBeforeTaxIndx].innerHTML = "&#8377; " + parseFloat(ValBeforeTax).toFixed(2);
        //$(trPrdItemsMain[i].cells[ValueBeforeTaxIndx]).attr("valbeforetax", ValBeforeTax);

        //var TaxValue = (parseFloat(ValBeforeTax) * parseFloat(ActualTax)) / 100;
        ////trPrdItemsMain[i].cells[TaxValueIndx].innerHTML = parseFloat(TaxValue).toFixed(2);
        //// $(trPrdItemsMain[i].cells[TaxValueIndx]).data("taxvalue", TaxValue);

        //var valAfterTax = ValBeforeTax + TaxValue;
        ////trPrdItemsMain[i].cells[ValueAfterTaxIndx].children[0].value = parseFloat(valAfterTax).toFixed(2);
        ////$(trPrdItemsMain[i].cells[ValueAfterTaxIndx].children[0]).data("valaftertax", valAfterTax);
    }

    return DiscountAmount;
    //$("#tdAdditionalDiscount").data("adddiscountamount", DiscountAmountOnInvoice)
    //$("#tdAdditionalDiscount").val(parseFloat(DiscountAmountOnInvoice).toFixed(2));
}

function fnCurrentInvoiceDiscountForLSSScheme(SchemeID) {

    var DiscountAmount = 0.00; var invdiscountamount = 0;

    var SchemeProduct = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords, function (element, index) {
        return (element.schemeId == SchemeID && element.benSubBucketType >= 8);
    });
    //invdiscountamount

    for (var discnt in SchemeProduct) {
        var benSubBucketType = SchemeProduct[discnt].benSubBucketType;
        var benifitSubBucketValue = parseFloat(SchemeProduct[discnt].benifitSubBucketValue);
        var benifitAssignedVal = parseFloat(SchemeProduct[discnt].benifitAssignedVal);
        var flgAddOnScheme = SchemeProduct[discnt].flgAddOnScheme;
        var flgAddOnBenefit = SchemeProduct[discnt].flgAddOnBenefit;
        var SchTypeId = SchemeProduct[discnt].SchTypeId;
        var schemeSlabId = SchemeProduct[discnt].schemeSlabId;
        var schemeId = SchemeProduct[discnt].schemeId;
        var schemeSlabBcktId = SchemeProduct[discnt].schemeSlabBcktId;
        var StandardRateBeforeTax = SchemeProduct[discnt].StandardRateBeforeTax;
        var orderqty = SchemeProduct[discnt].orderqty;
        var OriValBeforeTax = parseFloat(StandardRateBeforeTax) * parseInt(orderqty);
        var distval = 0;
        var IsPayoutFixed = SchemeProduct[discnt].IsPayoutFixed;
        if (benSubBucketType == 8) {
            // distval = parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
            distval = parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
            invdiscountamount += parseFloat(distval);
            //alert("ValBeforeTax:" + ValBeforeTax + "\n distval:" + distval + "\n benSubBucketType:" + benSubBucketType);
        }
        else {
            distval = parseFloat(benifitSubBucketValue);
            invdiscountamount += parseFloat(distval);
        }
    }



    return invdiscountamount;
    //$("#tdAdditionalDiscount").data("adddiscountamount", DiscountAmountOnInvoice)
    //$("#tdAdditionalDiscount").val(parseFloat(DiscountAmountOnInvoice).toFixed(2));
}

var arrLssApplied = [];
function fnShowBenefitSchemeWise(skunodeid, flg) {
    try {

        if (flg == 2) {
            $("#divFreeQuantitySectionSub").html("");
            $("#divFreeQuantitySectionSubWait").show();
            var arrStoreProductAppliedSchemesBenifits = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords, function (element, index) {
                return (parseInt(element.freeProductId) == parseInt(skunodeid));
            });
            var NoschemeSlabId = [];
            $.each(arrStoreProductAppliedSchemesBenifits, function (index, value) {
                if ($.inArray(value['schemeSlabId'], NoschemeSlabId) === -1) {
                    NoschemeSlabId.push(value['schemeSlabId']);
                }
            });

            var schInfo = "<table cellpadding=\"2\" cellspacing=\"0\" style=\"border-right: 1px solid #A0A0A0; border-top: 1px solid #A0A0A0;font-size:8pt;width:95%\">";
            var style = "border-left: 1px solid #A0A0A0; border-bottom: 1px solid #A0A0A0;";
            schInfo += "<tr><th style='" + style + "'>Scheme Name</th><th style='" + style + "'>Benefit</th></tr>";
            var schDescr = "";
            for (var k in NoschemeSlabId) {
                var schSlabID = parseInt(NoschemeSlabId[k]);
                var sss = $.grep(arrStoreProductAppliedSchemesBenifits, function (element, index) {
                    return parseInt(element.schemeSlabId) == schSlabID;
                });

                if (sss.length > 0) {
                    var BenType = 0;
                    var benifitSubBucketValue = 0;
                    if (sss[0].SchTypeId == 3) {
                        var OldPrd = 0;
                        for (var h in sss) {
                            if (parseInt(sss[h].benSubBucketType) > 0) {
                                if (OldPrd != sss[h].ProductID) {
                                    benifitSubBucketValue = parseInt(sss[h].benifitAssignedVal);
                                }
                            } else {
                                benifitSubBucketValue = parseInt(sss[h].benifitAssignedVal);
                            }
                            OldPrd = sss[h].ProductID;
                        }
                        BenType = sss[0].benSubBucketType;
                    } else {
                        BenType = sss[0].benSubBucketType;
                        benifitSubBucketValue = sss[0].benifitAssignedVal;
                    }

                    var schId = sss[0].schemeId;

                    var flgSchemeExistAgainStore = jQuery.grep(SchemeDetailByStore[0].Table1, function (element, index) {
                        return (element.SchemeID == schId);
                    });
                    if (flgSchemeExistAgainStore.length > 0) {
                        var schmesName = flgSchemeExistAgainStore[0].SchemeName;
                        if (schmesName != "") {
                            schDescr += "<tr>";
                            schDescr += "<td style='" + style + "'>" + schmesName + "</td>";
                            if (parseInt(BenType) == 1 || parseInt(BenType) == 5) {
                                schDescr += "<td style='" + style + ";text-align:center'><a href='###' onclick=\"fnShowSchemeBenefit('" + schId + "','" + schmesName + "','" + skunodeid + "','" + schSlabID + "')\" style='border-style:none;color:blue;text-decoration:underline' >" + benifitSubBucketValue + " Free</a></td>";
                            }
                            else if (parseInt(BenType) == 2 || parseInt(BenType) == 6 || parseInt(BenType) == 8) {
                                schDescr += "<td style='" + style + ";text-align:center'><a href='###' onclick=\"fnShowSchemeBenefit('" + schId + "','" + schmesName + "','" + skunodeid + "','" + schSlabID + "')\" style='border-style:none;color:blue;text-decoration:underline' >" + benifitSubBucketValue + "%</a></td>";
                            }
                            else if (parseInt(BenType) == -2) {
                                schDescr += "<td style='" + style + ";text-align:center'><a href='###' onclick=\"fnShowSchemeBenefit('" + schId + "','" + schmesName + "','" + skunodeid + "','" + schSlabID + "')\" style='border-style:none;color:blue;text-decoration:underline' title='Issued Credit Note For Pending Quantity' >" + benifitSubBucketValue + " Credit Note</a></td>";
                            }
                            else if (parseInt(BenType) == -3) {
                                schDescr += "<td style='" + style + ";text-align:center'><a href='###' onclick=\"fnShowSchemeBenefit('" + schId + "','" + schmesName + "','" + skunodeid + "','" + schSlabID + "')\" style='border-style:none;color:blue;text-decoration:underline' title='Convert Unexecuted Into Discount' >" + parseFloat(benifitSubBucketValue).toFixed(2) + "</a></td>";
                            }
                            else {
                                schDescr += "<td style='" + style + ";text-align:center'><a href='###' onclick=\"fnShowSchemeBenefit('" + schId + "','" + schmesName + "','" + skunodeid + "','" + schSlabID + "')\" style='border-style:none;color:blue;text-decoration:underline' >&#8377; " + parseFloat(benifitSubBucketValue).toFixed(2) + "</a></td>";
                            }
                            schDescr += "</tr>";
                        }
                    }
                }
            }

            schInfo += schDescr;
            schInfo += "</table>";
            $("#divFreeQuantitySectionSubWait").hide();
            if (schDescr != "") {
                $("#divFreeQuantitySectionSub").html(schInfo);
            } else {
                $("#divFreeQuantitySectionSub").html("");
            }
        }
        else if (flg == 3) {
            //var schemeData = SchemeDetailByStore[0].Table8;
            var SchIdsCompleteSchemeIdListOnProductID = jQuery.grep(SchemeDetailByStore[0].Table8, function (element, index) {
                return (parseInt(element.ProductID) == parseInt(skunodeid));
            });

            if (SchIdsCompleteSchemeIdListOnProductID.length > 0) {
                arrLssApplied = [];
            }
            $("#divSchemeAppliedSectionAchievement").html("");
            $("#divCorporatePlan").html("");
            var style = "padding:1px 2px;border-left: 1px solid #A0A0A0; border-bottom: 1px solid #A0A0A0;";
            var schInfo = "<table cellpadding=\"2\" cellspacing=\"0\" class=\"table\" style=\"border-right: 1px solid #A0A0A0; border-top: 1px solid #A0A0A0;font-size:7.5pt;margin:0px !important\" >";
            schInfo += "<thead><tr class='bg-info'><th style='" + style + "'>Slab</th><th style='" + style + "'>Slab Required</th><th style='" + style + "'>GAP</th><th style='" + style + "'>Benefit</th></tr></thead><tbody>";

            var LSSScheme = "<table cellpadding=\"2\" cellspacing=\"0\" class=\"table\" style=\"border-right: 1px solid #A0A0A0; border-top: 1px solid #A0A0A0;font-size:7.5pt;margin:0px !important\" >";
            LSSScheme += "<thead><tr class='bg-info'><th style='" + style + "'>Slab</th><th style='" + style + "'>Slab Required</th><th style='" + style + "'>GAP</th><th style='" + style + "'>Benefit</th></tr></thead><tbody>";

            var schDescr = "";
            IsSchemeAvailble = 0;
            var schemeName = fnShowSchemesName(skunodeid);
            for (var s = 0; s < schemeName.split("|").length; s++) {
                if (schemeName.split("|")[s] != "") {
                    schId = schemeName.split("|")[s].split("^")[0];
                    var schmeName = schemeName.split("|")[s].split("^")[1];
                    var schmeCode = schemeName.split("|")[s].split("^")[2];
                    var SchemeTypeId = schemeName.split("|")[s].split("^")[3];
                    var flgSchemeExistAgainStore = jQuery.grep(arrSchemeSlabachievement, function (element, index) {
                        return (element.SchemeId == schId);
                    });

                    if (flgSchemeExistAgainStore.length == 0) {
                        if (SchIdsCompleteSchemeIdListOnProductID.length > 0) {
                            // var strSchIdsCompleteSchemeIdListOnProductID = SchIdsCompleteSchemeIdListOnProductID.length > 0 ? SchIdsCompleteSchemeIdListOnProductID[0].PrdString : "";
                            var strSchIdsCompleteSchemeIdListOnProductID = "";
                            for (var i = 0; i < SchIdsCompleteSchemeIdListOnProductID.length; i++) {
                                if (strSchIdsCompleteSchemeIdListOnProductID == "") {
                                    strSchIdsCompleteSchemeIdListOnProductID = SchIdsCompleteSchemeIdListOnProductID[i].PrdString;
                                } else {
                                    strSchIdsCompleteSchemeIdListOnProductID += "#" + SchIdsCompleteSchemeIdListOnProductID[i].PrdString;
                                }
                            }

                            fnCheckNewSchemeIDsAppliedAfterValueChange(strSchIdsCompleteSchemeIdListOnProductID, skunodeid, "", 0);
                            flgSchemeExistAgainStore = jQuery.grep(arrSchemeSlabachievement, function (element, index) {
                                return (element.SchemeId == schId);
                            });
                        }
                    }
                    if (flgSchemeExistAgainStore.length > 0) {
                        var strname = schmeName.length > 50 ? schmeName.substr(0, 49) + ".." : schmeName;
                        IsSchemeAvailble = 1;
                        var cnt = flgSchemeExistAgainStore.length;
                        if (schmeCode.indexOf("LSS") != -1) {
                           // var strimg = SchemeTypeId == 2 ? "<img src=\"../images/Yellowstar.png\" style=\"width:16px;height:14px;\" />" : "";
                            var strimg = "<img src=\"../images/Yellowstar.png\" style=\"width:16px;height:14px;\" />";
                            LSSScheme += "<tr>";
                            LSSScheme += "<td style='" + style + ";text-align:left' colspan='4'><a href='###' onclick=\"fnShowSchemeBenefit('" + schId + "','','0','0')\" style='border-style:none;color:blue;text-decoration:underline;' title='" + schmeName + "'>" + strname + "</a>" + strimg + "</td>";
                            LSSScheme += "</tr>";
                        } else {
                            schInfo += "<tr>";
                            schInfo += "<td style='" + style + ";text-align:left' colspan='4'><a href='###' onclick=\"fnShowSchemeBenefit('" + schId + "','','0','0')\" style='border-style:none;color:blue;text-decoration:underline' title='" + schmeName + "'>" + strname + "</a></td>";
                            schInfo += "</tr>";
                        }

                        flgSchemeExistAgainStore.sort(function (a, b) {
                            return parseInt(b.SlabId) - parseInt(a.SlabId);
                        });
                        var SlabTypePer = 0;
                        for (var sl in flgSchemeExistAgainStore) {
                            var SlabId = flgSchemeExistAgainStore[sl].SlabId;
                            var SlabDesc = flgSchemeExistAgainStore[sl].SlabTypeDesc;
                            var SlabTypeRequiredDesc = flgSchemeExistAgainStore[sl].SlabTypeRequiredDesc;
                            SlabTypePer = SlabTypePer >= 100 ? SlabTypePer : flgSchemeExistAgainStore[sl].SlabTypePer;
                            var clsbg = "";
                            var strBenefit = "";
                            var flgApplied = 0;
                            if (SlabTypePer > 60 && SlabTypePer < 100) {
                                clsbg = "class='clsOrangeBg'";
                            }
                            else if (SlabTypePer >= 100) {
                                flgApplied = 1;
                                SlabTypeRequiredDesc = "achieved";
                                var arrBenefit = $.grep(arrStoreProductAppliedSchemesBenifitsRecords, function (element, index) {
                                    return parseInt(element.schemeSlabId) == parseInt(SlabId);
                                });
                                if (arrBenefit.length > 0) {

                                    clsbg = "class='clsGreenBg'";
                                    var BenType = arrBenefit[0].benSubBucketType;
                                    var benifitSubBucketValue = arrBenefit[0].benifitAssignedVal;
                                    if (parseInt(BenType) == 2 || parseInt(BenType) == 6 || parseInt(BenType) == 8) {
                                        strBenefit = benifitSubBucketValue + "%";
                                    }
                                    else {
                                        strBenefit = "&#8377; " + parseFloat(benifitSubBucketValue).toFixed(2);
                                    }
                                }
                                else {
                                    SlabTypeRequiredDesc = "";
                                    clsbg = "class='clsGrayBg'";
                                }
                            }
                            if (schmeCode.indexOf("LSS") != -1) {
                                //if (flgApplied == 1 && SchemeTypeId == 2) {//CHanged By AK on 11July2024
                                if (flgApplied == 1) {
                                    if ($.inArray(schmeCode, arrLssApplied) == -1) {
                                        arrLssApplied.push(schmeCode);
                                    }
                                }
                                LSSScheme += "<tr " + clsbg + " flg='1' style='cursor:pointer' onclick=\"fnShowSlabAchievementDetail(this,'" + schId + "','" + SlabId + "')\">";
                                LSSScheme += "<td style='" + style + ";font-size:7.5pt'>Slab" + cnt + "</td>";
                                LSSScheme += "<td style='" + style + ";font-size:7.5pt'>" + SlabDesc + "</td>";
                                LSSScheme += "<td style='" + style + ";font-size:7.5pt'>" + SlabTypeRequiredDesc + "</td>";
                                LSSScheme += "<td style='" + style + ";font-size:7.5pt'>" + strBenefit + "</td>";
                                LSSScheme += "</tr>";
                            } else {
                                schInfo += "<tr " + clsbg + " flg='1' style='cursor:pointer' onclick=\"fnShowSlabAchievementDetail(this,'" + schId + "','" + SlabId + "')\">";
                                schInfo += "<td style='" + style + ";font-size:7.5pt'>Slab" + cnt + "</td>";
                                schInfo += "<td style='" + style + ";font-size:7.5pt'>" + SlabDesc + "</td>";
                                schInfo += "<td style='" + style + ";font-size:7.5pt'>" + SlabTypeRequiredDesc + "</td>";
                                schInfo += "<td style='" + style + ";font-size:7.5pt'>" + strBenefit + "</td>";
                                schInfo += "</tr>";
                            }

                            cnt--;
                        }
                    }
                }
            }
            if (IsSchemeAvailble == 0) {
                schInfo += "<tr>";
                schInfo += "<td style='" + style + ";text-align:center' colspan='4'>No Initiative Applicable</td>";
                schInfo += "</tr>";
            }
            schInfo += "</tbody></table>";
            $("#divSchemeAppliedSectionAchievement").html(schInfo);
            $("#divCorporatePlan").html("");
            if (LSSScheme != "") {
                LSSScheme += "</tbody></table>";
                $("#divCorporatePlan")[0].innerHTML = LSSScheme;
                if (IsFiveStarApplicable == 1) {
                    fnCalculateStarEarned();
                }
            }
        }
        else {
            $("#divSchemeAppliedSectionSub").html("");
            $("#dvSchemeAppliedSectionSubWait").show();
            if ($("#tblPrdItemsMain tr[skunodeid=" + skunodeid + "]").length > 0) {
                var qty = $("#tblPrdItemsMain tr[skunodeid=" + skunodeid + "]")[0].cells[OrderQntyIndx].children[0].value == "" ? 0 : $("#tblPrdItemsMain tr[skunodeid=" + skunodeid + "]")[0].cells[OrderQntyIndx].children[0].value;
                // if (parseInt(qty) > 0) {
                var schemeName = fnShowSchemesName(skunodeid);

                if (schemeName != "") {

                    var str = "<table cellpadding=\"2\" cellspacing=\"0\" style=\"border-right: 1px solid #A0A0A0; border-top: 1px solid #A0A0A0;font-size:8pt;width:99%\">";
                    var style = "border-left: 1px solid #A0A0A0; border-bottom: 1px solid #A0A0A0;";
                    //str += "<tr><th style='" + style + "'>Scheme Name</th></tr>";
                    for (var s = 0; s < schemeName.split("|").length; s++) {
                        if (schemeName.split("|")[s] != "") {
                            schId = schemeName.split("|")[s].split("^")[0];
                            var schmeName = schemeName.split("|")[s].split("^")[1];
                            var schmeCode = schemeName.split("|")[s].split("^")[2];
                            var arrStoreProductAppliedSchemesBenifits = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords, function (element, index) {
                                return (parseInt(element.ProductID) == parseInt(skunodeid));
                            });
                            if (arrStoreProductAppliedSchemesBenifits.length > 0) {
                                schSlabID = arrStoreProductAppliedSchemesBenifits[0].schemeSlabId;
                            } else {
                                schSlabID = 0;
                            }
                            var flgSchemeExistAgainStore = jQuery.grep(SchemeDetailByStore[0].Table2, function (element, index) {
                                return (element.SchemeID == schId);
                            });
                            var slabDescr = "";
                            for (var sl in flgSchemeExistAgainStore) {
                                slabDescr += flgSchemeExistAgainStore[sl].BenifitDescr + ","
                            }
                            str += "<tr>";
                            str += "<td style='" + style + "'><a href='###' onclick=\"fnShowSchemeBenefit('" + schId + "','" + schmeName + "','" + skunodeid + "','" + schSlabID + "')\" style='border-style:none;color:blue;text-decoration:underline'>" + schmeName + "</a></td>";
                            //str += "<td style='" + style + "' title='" + slabDescr + "'>" + (slabDescr == "" ? "No Slab Applicable" : (slabDescr.length > 30 ? slabDescr.substr(0, 30) + "..." : slabDescr)) + "</td>";
                            str += "</tr>";
                        }
                    }
                    str += "</table>";
                    $("#divSchemeAppliedSectionSub").html(str);
                } else {
                    $("#divSchemeAppliedSectionSub").html("No Scheme Applied");
                }
                //}
            }
            $("#dvSchemeAppliedSectionSubWait").hide();
        }
    } catch (err) {
        $("#dvSchemeAppliedSectionSubWait").hide();
        $("#divFreeQuantitySectionSubWait").hide();
    }
}

function fnDeleteCurrTable(skunodeid) {
    $("#tblSchemeCalculationSKUs1 tr.clstemprow").remove();
}

function fnShowBenefitSchemeWise_Temp(sender, skunodeid, SchemeID) {
    try {
        // console.log(JSON.stringify(arrStoreProductAppliedSchemesBenifitsRecords_Temp));
        $(sender).closest("table").find("tr.clstemprow").remove();
        //var schemeData = SchemeDetailByStore[0].Table8;
        var SchIdsCompleteSchemeIdListOnProductID = jQuery.grep(SchemeDetailByStore[0].Table8, function (element, index) {
            return (parseInt(element.ProductID) == parseInt(skunodeid));
        });

        var arrSchemes = jQuery.grep(SchemeDetailByStore[0].Table1, function (element, index) {
            return (element.SchemeID == SchemeID);
        });


        var style = "padding:1px 2px 1px 8px;border-left: 1px solid #A0A0A0; border-bottom: 1px solid #A0A0A0";
        var schInfo = "<table cellpadding=\"2\" cellspacing=\"0\" class=\"table\" style=\"border-right: 1px solid #A0A0A0; border-top: 1px solid #A0A0A0;font-size:7.5pt;margin:0px !important\" >";
        schInfo += "<thead>";
        schInfo += "<tr class='bg-info'>";
        schInfo += "<th style='" + style + "text-align:left;'>Slab</th>";
        schInfo += "<th style='" + style + "text-align:left;'>Requirement</th>";
        schInfo += "<th style='" + style + "text-align:left;'>GAP In Sales</th>";
        schInfo += "<th style='" + style + "text-align:left;'>Current Benefit</th>";
        schInfo += "<th style='" + style + "text-align:left;'><span>Full Benefit</span> <img style='float:right;margin-right:7px' src='../images/cancel.png' onclick=\"fnDeleteCurrTable(" + skunodeid + ")\" /></th>";
        schInfo += "</tr>";
        schInfo += "</thead>";
        schInfo += "<tbody>";


        var schDescr = "";
        IsSchemeAvailble = 0;

        for (var s in arrSchemes) {
            schId = arrSchemes[s]["SchemeID"];
            var currentDisc = fnCurrentDiscountOnProductForScheme(skunodeid, SchemeID);

            var schmeName = arrSchemes[s]["SchemeName"];
            var schmeCode = arrSchemes[s]["schemecode"];
            var SchemeTypeId = arrSchemes[s]["SchemeTypeId"];
            var flgSchemeExistAgainStore = jQuery.grep(arrSchemeSlabachievement_Temp, function (element, index) {
                return (element.SchemeId == SchemeID);
            });

            if (flgSchemeExistAgainStore.length == 0) {
                if (SchIdsCompleteSchemeIdListOnProductID.length > 0) {
                    // var strSchIdsCompleteSchemeIdListOnProductID = SchIdsCompleteSchemeIdListOnProductID.length > 0 ? SchIdsCompleteSchemeIdListOnProductID[0].PrdString : "";
                    var strSchIdsCompleteSchemeIdListOnProductID = "";
                    for (var i = 0; i < SchIdsCompleteSchemeIdListOnProductID.length; i++) {
                        if (strSchIdsCompleteSchemeIdListOnProductID == "") {
                            strSchIdsCompleteSchemeIdListOnProductID = SchIdsCompleteSchemeIdListOnProductID[i].PrdString;
                        } else {
                            strSchIdsCompleteSchemeIdListOnProductID += "#" + SchIdsCompleteSchemeIdListOnProductID[i].PrdString;
                        }
                    }

                    fnCheckNewSchemeIDsAppliedAfterValueChange_Temp(strSchIdsCompleteSchemeIdListOnProductID, skunodeid, "", 0);
                    flgSchemeExistAgainStore = jQuery.grep(arrSchemeSlabachievement_Temp, function (element, index) {
                        return (element.SchemeId == SchemeID);
                    });
                }
            }
            if (flgSchemeExistAgainStore.length > 0) {
                var strname = schmeName.length > 50 ? schmeName.substr(0, 49) + ".." : schmeName;
                IsSchemeAvailble = 1;
                var cnt = flgSchemeExistAgainStore.length;

                flgSchemeExistAgainStore.sort(function (a, b) {
                    return parseInt(b.SlabId) - parseInt(a.SlabId);
                });
                var SlabTypePer = 0;
                for (var sl in flgSchemeExistAgainStore) {
                    var SlabId = flgSchemeExistAgainStore[sl].SlabId;
                    var SlabDesc = flgSchemeExistAgainStore[sl].SlabTypeDesc;
                    var SlabTypeRequiredDesc = flgSchemeExistAgainStore[sl].SlabTypeRequiredDesc;
                    SlabTypePer = SlabTypePer >= 100 ? SlabTypePer : flgSchemeExistAgainStore[sl].SlabTypePer;
                    var clsbg = "";
                    var strBenefit = "";
                    var flgApplied = 0;
                    if (SlabTypePer > 60 && SlabTypePer < 100) {
                        clsbg = "class='clsOrangeBg'";
                    } else if (SlabTypePer >= 100) {
                        flgApplied = 1;
                        SlabTypeRequiredDesc = "achieved";

                        var arrBenefit = $.grep(arrStoreProductAppliedSchemesBenifitsRecords_Temp, function (element, index) {
                            return (element.schemeSlabId == parseInt(SlabId) && element.schemeId == parseInt(SchemeID) && parseInt(element.ProductID) == parseInt(skunodeid))
                        });

                        if (arrBenefit.length > 0) {

                            clsbg = "class='clsGreenBg'";
                            var BenType = arrBenefit[0].benSubBucketType;
                            var benifitAssignedVal = arrBenefit[0].benifitAssignedVal;
                            var benifitSubBucketValue = arrBenefit[0].benifitSubBucketValue;
                            var StandardRateBeforeTax = arrBenefit[0].StandardRateBeforeTax;
                            var orderqty = arrBenefit[0].orderqty;
                            orderqty = isNaN(orderqty) ? 0 : parseFloat(orderqty);
                            StandardRateBeforeTax = isNaN(StandardRateBeforeTax) ? 0 : parseFloat(StandardRateBeforeTax);
                            var OriValBeforeTax = parseFloat(StandardRateBeforeTax) * parseInt(orderqty);
                            if (parseInt(BenType) == 2 || parseInt(BenType) == 6 || parseInt(BenType) == 8) {
                                //strBenefit = benifitSubBucketValue + "%";
                                var distval = parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
                                strBenefit = "&#8377; " + parseFloat(distval).toFixed(2);
                            }
                            else {
                                strBenefit = "&#8377; " + parseFloat(benifitSubBucketValue).toFixed(2);
                            }
                        } else {
                            SlabTypeRequiredDesc = "";
                            clsbg = "class='clsGrayBg'";
                        }
                    }

                    schInfo += "<tr " + clsbg + " flg='1'>";
                    schInfo += "<td style='" + style + ";font-size:7.5pt;text-align:left;'>Slab" + cnt + "</td>";
                    schInfo += "<td style='" + style + ";font-size:7.5pt;text-align:left;'>" + SlabDesc + "</td>";
                    schInfo += "<td style='" + style + ";font-size:7.5pt;text-align:left;'>" + SlabTypeRequiredDesc + "</td>";
                    if (clsbg == "class='clsGreenBg'") {
                        schInfo += "<td style='" + style + ";font-size:7.5pt;text-align:left;'>&#8377; " + parseFloat(currentDisc).toFixed(2) + "</td>";
                    } else {
                        schInfo += "<td style='" + style + ";font-size:7.5pt;text-align:left;'></td>";
                    }
                    schInfo += "<td style='" + style + ";font-size:7.5pt;text-align:left;'>" + strBenefit + "</td>";
                    schInfo += "</tr>";


                    cnt--;
                }
            }

        }

        schInfo += "</tbody></table>";

        $(sender).closest("tr").after("<tr class='clstemprow'><td colspan='15' style='padding:4px 0 10px 0px !important'>" + schInfo + "</td></tr>");
        //$("#divSchemeAppliedSectionAchievement").html(schInfo);



    } catch (err) {
        $(sender).closest("tr").after("<tr class='clstemprow'><td colspan='15' style='padding:4px 0 10px 0px !important;text-align:center'>" + err + "</td></tr>");
    }
}

function fnShowSchemeAndRelatedSKUsDetails(sender) {
    $("#tblPrdItemsMain input:text").eq(0).focus();
    $("body#orderpunchingbody").addClass("clsOverflowhide");
    $("body#orderpunchingbody").removeClass("clsbody");
    var Currentskunodeid = $(sender).closest("tr").attr("skunodeid");
    $("#divSchemeAchievementTemp")[0].innerHTML = "<br/><div style='margin:60px 40%;display:inline-block'><img src='../NewImages/ajax-loader.gif' /></div>";
    $("#divSchemeAchievementTemp").dialog({
        title: "Initiative Achievement Calculation Details",
        modal: true,
        modal: true,
        width: "100%",
        height: window.innerHeight,
        open: function () {
            $("div[aria-describedby='divSchemeAchievementTemp']").addClass("clsDialogWithzeroPadding");
            $("div[aria-describedby='divSchemeAchievementTemp']").removeClass("ui-corner-all");
            $("div[aria-describedby='divSchemeAchievementTemp']").find("div.ui-dialog-titlebar").removeClass("ui-corner-all");
            $("div[aria-describedby='divSchemeAchievementTemp']").find("div.ui-dialog-titlebar").css("background", "darkcyan");
            $("div[aria-describedby='divSchemeAchievementTemp']").find("div.ui-dialog-titlebar").html("Initiative Achievement Calculation Details");
            var str1 = "<div style='float-left;display:inline-block' ><table><tr><td>Search Products : </td><td><input style='width:200px' onkeyup='fnsearchsku(this)' class='form-control' placeholder='type here' /></td></tr></table></div>";
            $("div[aria-describedby='divSchemeAchievementTemp']").find("div.ui-dialog-buttonpane").append(str1);
            arrStoreProductAppliedSchemesBenifitsRecords_Temp = arrStoreProductAppliedSchemesBenifitsRecords;

            arrSchemeSlabachievement_Temp = arrSchemeSlabachievement;
            setTimeout(function () {
                try {
                    var arrSchemesUnique = [];
                    var OrderQuantity = $(sender).closest("tr").find("input:text").val();
                    OrderQuantity = OrderQuantity == "" ? 0 : parseInt(OrderQuantity);
                    var StandardRateBeforeTax = $(sender).closest("tr").attr("standardratebeforetax");
                    var ValBeforeTax = parseFloat(StandardRateBeforeTax) * parseFloat(OrderQuantity);
                    var BestRate = $(sender).closest("tr").attr("bestrate");
                    //var schemeName = fnShowSchemesName(skunodeid);

                    var style = "padding:1px 2px;border-left: 1px solid #A0A0A0; border-bottom: 1px solid #A0A0A0;vertical-align:middle;";
                    var schInfo = "<table id='tblLtrSchemeCalculation' cellpadding=\"2\" cellspacing=\"0\" class=\"table\" style=\"border-right: 1px solid #A0A0A0; border-top: 1px solid #A0A0A0;font-size:7.5pt;margin:0px !important\" >";
                    schInfo += "<thead><tr class='bg-info'><th style='" + style + "text-align:left'>Scheme Code</th><th style='" + style + "text-align:left'>Scheme Description</th><th style='" + style + "text-align:left'></th><th style='" + style + "text-align:right;padding-right:5px'>Discount Achieved</th><th style='" + style + "text-align:right;padding-right:5px'>Best Price</th></tr></thead><tbody>";

                    var schInfoLSS = "<table id='tblLssSchemeCalculation' cellpadding=\"2\" cellspacing=\"0\" class=\"table\" style=\"border-right: 1px solid #A0A0A0; border-top: 1px solid #A0A0A0;font-size:7.5pt;margin:10px 0px 10px 0px !important\" >";
                    schInfoLSS += "<thead>";
                    schInfoLSS += "<tr class='bg-info'>";
                    schInfoLSS += "<th style='" + style + "text-align:left'>Scheme Code</th>";
                    schInfoLSS += "<th style='" + style + "text-align:left'>Scheme Description</th>";
                    schInfoLSS += "<th style='" + style + "text-align:right;padding-right:5px'>Current Value</th>";
                    schInfoLSS += "<th style='" + style + "text-align:right;padding-right:5px'>Additional Value</th>";
                    schInfoLSS += "<th style='" + style + "text-align:right;padding-right:5px'>Current Discount</th>";
                    schInfoLSS += "<th style='" + style + "text-align:right;padding-right:5px'>Additional Discount</th>";
                    schInfoLSS += "<th style='" + style + "text-align:right;padding-right:5px'>Total Discount</th>";
                    schInfoLSS += "</tr>";
                    schInfoLSS += "</thead>";
                    schInfoLSS += "<tbody>";


                    var schDescr = "";
                    var IsSchemeAvailble = 0;

                    var schLTRInfo = "";
                    var schHeaderstr = "";
                    var schBodystr = "";
                    var schemeName = fnShowSchemesName(Currentskunodeid);
                    var flgBestratecell = 0;
                    for (var s = 0; s < schemeName.split("|").length; s++) {

                        if (schemeName.split("|")[s] != "") {
                            var schmeCode = schemeName.split("|")[s].split("^")[2];
                            schId = schemeName.split("|")[s].split("^")[0];
                            var schmeName = schemeName.split("|")[s].split("^")[1];

                            var SchemeTypeId = schemeName.split("|")[s].split("^")[3];
                            IsSchemeAvailble = 1;
                            if (schmeCode.indexOf("LSS") == -1) {
                                arrSchemesUnique.push({ schId: schId, schmeCode: schmeCode })

                                schHeaderstr += "<th style='" + style + ";font-size:7.5pt;padding-left:8px !important;text-align:left;min-width:80px'>" + schmeCode + " <br/>(curr disc/add disc)</th>";
                            }

                            var flgSchemeExistAgainStore = jQuery.grep(arrSchemeSlabachievement, function (element, index) {
                                return (element.SchemeId == schId);
                            });

                            var totatlBenfit = 0;

                            if (flgSchemeExistAgainStore.length > 0) {
                                var strname = schmeName.length > 50 ? schmeName.substr(0, 49) + ".." : schmeName;

                                var cnt = flgSchemeExistAgainStore.length;

                                flgSchemeExistAgainStore.sort(function (a, b) {
                                    return parseInt(b.SlabId) - parseInt(a.SlabId);
                                });
                                var SlabTypePer = 0;
                                for (var sl in flgSchemeExistAgainStore) {
                                    var SlabId = flgSchemeExistAgainStore[sl].SlabId;
                                    var SlabDesc = flgSchemeExistAgainStore[sl].SlabTypeDesc;
                                    var SlabTypeRequiredDesc = flgSchemeExistAgainStore[sl].SlabTypeRequiredDesc;
                                    SlabTypePer = SlabTypePer >= 100 ? SlabTypePer : flgSchemeExistAgainStore[sl].SlabTypePer;
                                    var clsbg = "";
                                    var strBenefit = "";
                                    var flgApplied = 0;
                                    if (SlabTypePer > 60 && SlabTypePer < 100) {
                                        clsbg = "class='clsOrangeBg'";
                                    }
                                    else if (SlabTypePer >= 100) {
                                        flgApplied = 1;
                                        SlabTypeRequiredDesc = "achieved";
                                        var arrBenefit = $.grep(arrStoreProductAppliedSchemesBenifitsRecords, function (element, index) {
                                            return parseInt(element.schemeSlabId) == parseInt(SlabId);
                                        });
                                        if (arrBenefit.length > 0) {

                                            clsbg = "class='clsGreenBg'";
                                            var BenType = arrBenefit[0].benSubBucketType;
                                            var benifitSubBucketValue = arrBenefit[0].benifitAssignedVal;
                                            if (parseInt(BenType) == 2 || parseInt(BenType) == 6 || parseInt(BenType) == 8) {
                                                var distval = parseFloat(ValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
                                                totatlBenfit += parseFloat(distval);
                                            }
                                            else {
                                                totatlBenfit += parseFloat(benifitSubBucketValue);
                                            }
                                        } else {
                                            SlabTypeRequiredDesc = "";
                                            clsbg = "class='clsGrayBg'";
                                        }
                                    }
                                    cnt--;
                                }

                            }

                            schLTRInfo += "<tr flg='1' schId='" + schId + "'>";
                            schLTRInfo += "<td style='" + style + ";font-size:7.5pt;text-align:left'><a href='###' onclick=\"fnShowSchemeBenefit('" + schId + "','','0','0')\" style='border-style:none;color:blue;text-decoration:underline;' >" + schmeCode + "</a></td>";
                            schLTRInfo += "<td style='" + style + ";font-size:7.5pt;text-align:left'><a href='###' onclick=\"fnShowSchemeBenefit('" + schId + "','','0','0')\" style='border-style:none;color:blue;text-decoration:underline;' title='" + schmeName + "'>" + schmeName + "</a></td>";
                            if (schmeCode.indexOf("LSS") != -1) {
                                schLTRInfo += "<td style='" + style + ";font-size:7.5pt;text-align:center'><a href='###' onclick=\"fnCalculateSchemeOnInvoice_Temp(this,'" + schId + "')\" class='clslnkapply' style='border-style:none;color:blue;text-decoration:underline;' title='" + schmeName + "'>Apply</a></td>";
                            }
                            else {
                                schLTRInfo += "<td style='" + style + ";font-size:7.5pt;text-align:left'></td>";
                            }
                            schLTRInfo += "<td style='" + style + ";font-size:7.5pt;text-align:right;padding-right:5px'>&#8377; " + parseFloat(totatlBenfit).toFixed(2) + "</td>";

                            if (flgBestratecell == 0) {
                                flgBestratecell = 1;
                                schLTRInfo += "<td rowspan='" + schemeName.split("|").length + "' style='" + style + ";font-size:7.5pt;text-align:right;padding-right:5px;background:#ffffff !important'>&#8377; " + parseFloat(BestRate).toFixed(2) + "</td>";
                            }
                            schLTRInfo += "</tr>";
                            //}

                        }
                    }
                    if (IsSchemeAvailble == 0) {
                        schInfo += "<tr>";
                        schInfo += "<td style='" + style + ";text-align:center' colspan='4'>No Initiative Applicable</td>";
                        schInfo += "</tr>";
                    } else {
                        schInfo += schLTRInfo;
                    }
                    schInfo += "</tbody></table>";
                    schInfoLSS += "</tbody></table>";
                    $("#divSchemeAchievementTemp").html("<div id='divfixedHeader111' style='background-color:#ffffff;margin-left: 0px; position: fixed; z-index: 2; '>" + schInfo + "</div>");
                    fnRecalculateScheme_Temp(2);
                    var strPRDHTML = "<div  id='dvprdTemContainer'><div id='divfixedHeader11' style='margin-left: 0px; position: fixed; z-index: 1; '></div><div id='divMainData'><table id='tblSchemeCalculationSKUs1' style='font-size:8pt;margin:0px' class='table table-bordered table-condensed' cellpadding='2' cellspacing='0'>";
                    strPRDHTML += ("<thead><tr class='success'>");
                    strPRDHTML += ("<th style='padding:2px;vertical-align:middle;width:15%'>Product Name</th>");
                    strPRDHTML += ("<th style='text-align:center;padding:2px;vertical-align:middle;width:60px'>Current O.Qty</th>");
                    strPRDHTML += ("<th style='text-align:right;padding:2px;vertical-align:middle;width:65px'>Standard RLP</th>");
                    strPRDHTML += ("<th style='text-align:right;padding:2px;vertical-align:middle;width:65px'>Additional Qty</th>");
                    strPRDHTML += ("<th style='text-align:right;padding:2px;vertical-align:middle;width:65px'>Dynamic RLP</th>");
                    strPRDHTML += ("<th style='text-align:right;padding:2px;vertical-align:middle;width:60px'>Best RLP</th>");
                    strPRDHTML += schHeaderstr;
                    strPRDHTML += ("<tr></thead>");
                    strPRDHTML += "<tbody></tbody></table></div></div>";
                    $("#divSchemeAchievementTemp").append(strPRDHTML);
                    var strSchIdsCompleteSchemeIdListOnProductID = "";
                    var SchIdsCompleteSchemeIdListOnProductID = jQuery.grep(SchemeDetailByStore[0].Table8, function (element, index) {
                        return (parseInt(element.ProductID) == parseInt(Currentskunodeid));
                    });
                    for (var i = 0; i < SchIdsCompleteSchemeIdListOnProductID.length; i++) {
                        if (strSchIdsCompleteSchemeIdListOnProductID == "") {
                            strSchIdsCompleteSchemeIdListOnProductID = SchIdsCompleteSchemeIdListOnProductID[i].PrdString;
                        } else {
                            strSchIdsCompleteSchemeIdListOnProductID += "#" + SchIdsCompleteSchemeIdListOnProductID[i].PrdString;
                        }
                    }
                    var arrPRDExist = [];
                    var strHTMLSKU = "";
                    var strHTMLCurrentSKU = "";
                    var OLDCatId = 0;
                    // alert(arrSchemesUnique.length)
                    for (var s = 0; s < arrSchemesUnique.length; s++) {
                        schId = arrSchemesUnique[s]["schId"];
                        IsSchemeAvailble = 1;


                        //strHTML += "<td>Group" + schSlbSubBuckID + "</td>";
                        //schSlabSubBucketType
                        //1. Product Quantity
                        //2. Invoice Value
                        //3. Product Lines
                        //4. Product Value
                        //5. Product Volume

                        var arrProductIDMappedInSchSlbSub = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                            return (element.SchemeID == schId);
                        });
                        if (arrProductIDMappedInSchSlbSub.length > 0) {
                            for (var i in arrProductIDMappedInSchSlbSub) {
                                var SKUName = "";
                                var Qty = "0";
                                var MRP = "0";
                                var lineBestPrice = 0;
                                var currentRLP = 0;
                                var standardratebeforetax = "0";
                                var UPC = "0";
                                var SaleValue = "";
                                var Category = "";
                                var CatId = 0;
                                var sbf = "";
                                var ProductID = arrProductIDMappedInSchSlbSub[i].ProductID;
                                var IsExist = 0;
                                var grammage = 0;
                                //var style = "";
                                var IsLink = 0;
                                var flgInitiative = 0;
                                var flgSmartBasket = 0;
                                var flgDefaultSmartBasket = 0;// $(cntrl).attr("flgDefaultSmartBasket");
                                var flgFB = 0;// $(cntrl).attr("flgFB");
                                var flgSBD = 0;// $(cntrl).attr("flgSBD");

                                if ($.inArray(ProductID, arrPRDExist) == -1) {
                                    arrPRDExist.push(ProductID);
                                    var style1 = "background-color:#b0b0ff;";
                                    if ($("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductID + "]").length > 0) {
                                        CatId = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductID + "]").eq(0).attr("categoryid");
                                        flgInitiative = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductID + "]").eq(0).attr("flgInitiative");
                                        flgSmartBasket = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductID + "]").eq(0).attr("flgSmartBasket");
                                        flgFB = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductID + "]").eq(0).attr("flgFB");
                                        flgSBD = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductID + "]").eq(0).attr("flgSBD");
                                        flgDefaultSmartBasket = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductID + "]").eq(0).attr("flgDefaultSmartBasket");
                                        Category = $("#tblPrdItemsMain tr[flgdata=2][categoryid=" + CatId + "]").eq(0).find("td").eq(0).html();
                                        SKUName = $("#tblPrdItemsMain tr[flgdata=1][categoryid=" + CatId + "][skunodeid=" + ProductID + "]").find("td").eq(0).find("input#hdnprdName").val();
                                        currentRLP = $("#tblPrdItemsMain tr[flgdata=1][categoryid=" + CatId + "][skunodeid=" + ProductID + "]").find("td[iden='disc']").attr("currentrate");
                                        MRP = $("#tblPrdItemsMain tr[flgdata=1][categoryid=" + CatId + "][skunodeid=" + ProductID + "]").attr("mrp");
                                        grammage = $("#tblPrdItemsMain tr[flgdata=1][categoryid=" + CatId + "][skunodeid=" + ProductID + "]").attr("grammage");
                                        lineBestPrice = $("#tblPrdItemsMain tr[flgdata=1][categoryid=" + CatId + "][skunodeid=" + ProductID + "]").attr("bestrate");
                                        standardratebeforetax = $("#tblPrdItemsMain tr[flgdata=1][categoryid=" + CatId + "][skunodeid=" + ProductID + "]").attr("standardratebeforetax");
                                        UPC = $("#tblPrdItemsMain tr[flgdata=1][categoryid=" + CatId + "][skunodeid=" + ProductID + "]").attr("UPC");
                                        Qty = $("#tblPrdItemsMain tr[flgdata=1][categoryid=" + CatId + "][skunodeid=" + ProductID + "]")[0].cells[4].children[0].value;
                                        Qty = Qty == "" ? 0 : Qty;
                                        IsExist = 1;
                                        skuAvailable = 1;
                                        IsLink = 1;
                                        //style = $("#tblPrdItemsMain tr[flgdata=1][categoryid=" + CatId + "][skunodeid=" + ProductID + "]").eq(0).is("[style]") ? $("#tblPrdItemsMain tr[flgdata=1][categoryid=" + CatId + "][skunodeid=" + ProductID + "]").eq(0).attr("style") : "";
                                    }
                                    else {
                                        var arrSKU = jQuery.grep(arrProductList, function (element, index) {
                                            return (parseInt(element.SBFNodeId) == parseInt(ProductID));
                                        });
                                        if (arrSKU.length > 0) {
                                            skuAvailable = 1;
                                            IsExist = 1;
                                            SKUName = arrSKU[0].SBF;
                                            grammage = arrSKU[0].grammage;
                                            MRP = arrSKU[0].MRP;
                                            lineBestPrice = arrSKU[0]["BestRate"];
                                            lineBestPrice = lineBestPrice == undefined || lineBestPrice == null ? 0 : lineBestPrice;
                                            standardratebeforetax = arrSKU[0].RLP;
                                            currentRLP = standardratebeforetax;
                                            Qty = 0;
                                            CatId = arrSKU[0].CatNodeID;
                                            Category = arrSKU[0].Category;
                                            UPC = arrSKU[0].PCSINBOX;
                                            flgInitiative = arrSKU[0].flgInitiative;
                                            flgFB = arrSKU[0].flgFB;
                                            flgSBD = arrSKU[0].flgSBD;
                                            IsLink = arrSKU[0].flgSearchList == true ? 1 : 0;
                                        }
                                    }
                                    //totQty += parseInt(Qty);
                                    if (IsExist == 1) {

                                        var salevalue = parseInt(Qty) * parseFloat(standardratebeforetax);
                                        var strCellSch = "";
                                        for (var s1 = 0; s1 < arrSchemesUnique.length; s1++) {

                                            var schId1 = arrSchemesUnique[s1]["schId"];
                                            var schmeCode1 = arrSchemesUnique[s1]["schmeCode"];
                                            var CurrentDiscount = fnCurrentDiscountOnProductForScheme(ProductID, schId1);
                                            strCellSch += "<td style='" + style + ";font-size:7.5pt;padding-left:8px !important;text-align:left;' schId='" + schId1 + "' class='clsscheme' CurrentDiscount='" + CurrentDiscount + "'><a href='###' onclick=\"fnShowBenefitSchemeWise_Temp(this," + ProductID + "," + schId1 + ")\">" + parseFloat(CurrentDiscount).toFixed(2) + "/0.00" + "</a></td>";

                                        }


                                        if ($("#tblSchemeCalculationSKUs1").find("tr[flgdata=2][categoryid='" + CatId + "']").length == 0) {
                                            var strHTMLCat = ("<tr style='" + style1 + "' flgdata='2' categoryid='" + CatId + "' >");
                                            strHTMLCat += ("<td  colspan='17' style='font-size:8.7pt;font-weight:bold;text-align:left;padding:3px 10px'>");
                                            strHTMLCat += Category;
                                            strHTMLCat += ("</td>");
                                            strHTMLCat += ("</tr>");
                                            $("#tblSchemeCalculationSKUs1").append(strHTMLCat);
                                        }

                                        if (Currentskunodeid == ProductID) {
                                            var strHTMLCurrentSKU = "";
                                            strHTMLCurrentSKU += "<tr class='clsSchhighlighted' flgdata='1' skunodeid='" + ProductID + "' oqty='" + Qty + "' flgInitiative='" + flgInitiative + "' flgFB='" + flgFB + "'  flgSBD='" + flgSBD + "' flgDefaultSmartBasket='" + flgDefaultSmartBasket + "' flgSmartBasket='" + flgSmartBasket + "' sbf='" + SKUName + "' UPC='" + UPC + "' categoryid='" + CatId + "' Category='" + Category + "'  MRP='" + MRP + "' grammage='0'  standardratebeforetax='" + standardratebeforetax + "'  rlp='" + standardratebeforetax + "'>";
                                            strHTMLCurrentSKU += "<td style='" + style + "text-align:left;'>" + SKUName + "</td>";
                                            strHTMLCurrentSKU += "<td style='" + style + "text-align:center;' class='clsOldQ'>" + Qty + "</td>";
                                            strHTMLCurrentSKU += "<td style='" + style + "text-align:right;'>&#8377; " + parseFloat(standardratebeforetax).toFixed(2) + "</td>";
                                            strHTMLCurrentSKU += "<td style='" + style + "text-align:center;'  class='clsqty'><input style='width:65px;text-align:center' type='text' value='0' onfocus=\"Focus(this,'0')\" onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' onblur=\"Blur(this,'0')\" onchange=\"fnCalculateData_Temp(this,'0')\" ></td>";
                                            strHTMLCurrentSKU += "<td style='" + style + "text-align:right;' class='clscurrentrate' currentrate='" + currentRLP + "'>&#8377; " + parseFloat(currentRLP).toFixed(2) + "</td>";
                                            strHTMLCurrentSKU += "<td style='" + style + "text-align:right;' >&#8377; " + parseFloat(lineBestPrice).toFixed(2) + "</td>";
                                            strHTMLCurrentSKU += strCellSch;
                                            strHTMLCurrentSKU += "</tr>";
                                            $("#tblSchemeCalculationSKUs1").find("tr[flgdata=2][categoryid='" + CatId + "']").after(strHTMLCurrentSKU);
                                            //$("#tblSchemeCalculationSKUs1").append(strHTMLCurrentSKU);

                                        } else {
                                            //strHTMLSKU += strHTMLCat;
                                            var strHTMLSKU = "<tr  flgdata='1' skunodeid='" + ProductID + "' oqty='" + Qty + "' flgInitiative='" + flgInitiative + "' flgDefaultSmartBasket='" + flgDefaultSmartBasket + "'  flgFB='" + flgFB + "'  flgSBD='" + flgSBD + "'  flgSmartBasket='" + flgSmartBasket + "' sbf='" + SKUName + "' UPC='" + UPC + "' categoryid='" + CatId + "' Category='" + Category + "'  MRP='" + MRP + "' grammage='0'  standardratebeforetax='" + standardratebeforetax + "'  rlp='" + standardratebeforetax + "'>";
                                            strHTMLSKU += "<td style='" + style + "text-align:left;'>" + SKUName + "</td>";
                                            strHTMLSKU += "<td style='" + style + "text-align:center;' class='clsOldQ'>" + Qty + "</td>";
                                            strHTMLSKU += "<td style='" + style + "text-align:right;'>&#8377; " + parseFloat(standardratebeforetax).toFixed(2) + "</td>";
                                            strHTMLSKU += "<td style='" + style + "text-align:center;'  class='clsqty'><input style='width:65px;text-align:center' type='text' value='0' onfocus=\"Focus(this,'0')\" onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' onblur=\"Blur(this,'0')\"  onchange=\"fnCalculateData_Temp(this,'0')\" ></td>";
                                            strHTMLSKU += "<td style='" + style + "text-align:right;' class='clscurrentrate' currentrate='" + currentRLP + "'>&#8377; " + parseFloat(currentRLP).toFixed(2) + "</td>";
                                            strHTMLSKU += "<td style='" + style + "text-align:right;' >&#8377; " + parseFloat(lineBestPrice).toFixed(2) + "</td>";
                                            strHTMLSKU += strCellSch;
                                            strHTMLSKU += "</tr>";
                                            $("#tblSchemeCalculationSKUs1").find("tr[flgdata=2][categoryid='" + CatId + "']").after(strHTMLSKU);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    $("#tblSchemeCalculationSKUs1").find("tr[flgdata=1][skunodeid='" + Currentskunodeid + "']").find("input:text").focus();
                    fntblFixedHeader();
                }
                catch (ee) {
                    alert(ee)
                }
            }, 1000);

        },
        close: function (e) {
            $("body#orderpunchingbody").addClass("clsbody");
            $("body#orderpunchingbody").removeClass("clsOverflowhide");
            $("#divSchemeAchievementTemp").html("");
            $("#divSchemeAchievementTemp").dialog('destroy');
            $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + Currentskunodeid + "]").find("input:text").focus();
        },
        buttons: {
            "Apply On Order": function () {
                $("#dvConfirationSchemeApplied").html("Are you sure to apply on order?");
                $("#dvConfirationSchemeApplied").dialog({
                    title: "Confirmation:",
                    modal: true,
                    width: "auto",
                    height: "auto",
                    close: function (e) {
                        $("#dvConfirationSchemeApplied").html("");
                        $("#dvConfirationSchemeApplied").dialog('destroy');
                    },
                    buttons: {
                        "Yes": function () {
                            var $inputs = $("#tblSchemeCalculationSKUs1 input:text");
                            for (var i = 0; i < $inputs.length; i++) {
                                var AdditionalQty = $inputs.eq(i).val();
                                if (parseInt(AdditionalQty) == 0) {
                                    continue;
                                }
                                var CurrentQty = $inputs.eq(i).closest("tr").find("td.clsOldQ").text();
                                var skunodeid = $inputs.eq(i).closest("tr").attr("skunodeid");
                                var TotQty = parseInt(AdditionalQty) + parseInt(CurrentQty);
                                var $tr = $("#tblPrdItemsMain tr[flgdata=1][skunodeid='" + skunodeid + "']");
                                if ($tr.length > 0) {
                                    $tr.find("input:text").val(TotQty);
                                    fnCalculateData($tr.find("input:text"));
                                } else {
                                    fnInsertSKUInMainScreen($inputs.eq(i));
                                    var $tr = $("#tblPrdItemsMain tr[flgdata=1][skunodeid='" + skunodeid + "']");
                                    if ($tr.length > 0) {
                                        $tr.find("input:text").val(TotQty);
                                        fnCalculateData($tr.find("input:text"));
                                    }
                                }
                            }
                            arrStoreProductAppliedSchemesBenifitsRecords_Temp = [];
                            $("#dvConfirationSchemeApplied").dialog('close');
                            $("#divSchemeAchievementTemp").dialog('close');

                            $("#tblPrdItemsMain tr[flgdata=1][skunodeid='" + Currentskunodeid + "']").find("input:text").focus();
                        },
                        "No": function () {
                            $("#dvConfirationSchemeApplied").dialog('close');
                        }
                    }
                });

            },
            "Cancel": function () {

                $("#divSchemeAchievementTemp").dialog('close');
            }
        }
    });
}



function fnsearchsku(sender) {

    var text = $(sender).val().toUpperCase();
    $("#tblSchemeCalculationSKUs1").find("tbody").eq(0).find("tr[flgdata=2]").css("display", "none");
    $("#tblSchemeCalculationSKUs1").find("tbody").eq(0).find("tr[flgdata=1]").css("display", "none");
    var tbl = $("#tblSchemeCalculationSKUs1").find("tr[flgdata=1]");
    var tr;
    for (var i = 0; i < tbl.length; i++) {
        tr = $(tbl[i]);
        var searchstr = $(tr).find("td").eq(0).text() + "," + $(tr).attr("category") + "," + $(tr).attr("mrp");
        var flgValid = 1;
        for (var t = 0; t < text.split(",").length; t++) {
            if (searchstr.toLowerCase().indexOf(text.split(",")[t].toLowerCase()) == -1) {
                flgValid = 0;
            }
        }
        if (flgValid == 1) {
            var categoryid = $(tr).attr("categoryid");
            $("#tblSchemeCalculationSKUs1").find("tbody").eq(0).find("tr[flgdata='2'][categoryid='" + categoryid + "']").css("display", "table-row");
            //$("#tblSchemeCalculationSKUs1").find("tbody").eq(0).find("tr[flgdata='1'][categoryid='" + categoryid + "']").css("display", "table-row");
            $(tr).css("display", "table-row");
        }
    }
}
function fntblFixedHeader() {
    var thead = $("#tblSchemeCalculationSKUs1").find("thead").eq(0).html();
    $("#divfixedHeader11").html("<table id='tbl_Status_fixedhead1' class='table table-bordered table-condensed' cellpadding='2' cellspacing='0'   style='font-size:8pt;margin:0px;width:100%'><thead>" + thead + "</thead><tbody></tbody></table>");
    for (i = 0; i < $("#tblSchemeCalculationSKUs1 thead").find("th").length; i++) {
        $("#tbl_Status_fixedhead1").find("th").eq(i).css("width", $("#tblSchemeCalculationSKUs1 thead").find("th")[i].offsetWidth);
        //$("#tbldbrlist thead").find("th").eq(i).css("width", $("#tbldbrlist thead").find("th")[i].offsetWidth);
    }

    $("#dvprdTemContainer").css({
        "margin-top": $("#divfixedHeader111").height(),
    });
    $("#divfixedHeader111").css({
        "width": $("#divMainData").width(),
    });
    $("#divfixedFooter111").css({
        "width": $("#divMainData").width(),
    });



    $("#divfixedHeader11").css({
        "width": $("#divMainData").width(),
        "height": $("#tbl_Status_fixedhead1").find("th").eq(0).height()
    });
    $("#divMainData").css("width", $("#divMainData")[0].clientWidth);
}
function fnShowSlabAchievementDetail(sender, schmeId, SlbId) {
    $("#dvSchemeDescr")[0].innerHTML = "<br/><img src='../NewImages/ajax-loader.gif' /><div id='divTempcontainer' style='display:none'></div>";
    $("#dvSchemeDescr").dialog({
        title: "Initiative Achievement Details",
        modal: true,
        width: "60%",
        height: window.innerHeight - 50,
        open: function () {
            setTimeout(function () {
                var strHTML = "<table style='margin:5px 0px 0px 0px;font-size:8.8pt' class='table table-bordered table-condensed' cellpadding='2' cellspacing='0'>";
                var style = "";
                var flgSchemeSlabDescrAgainStore = jQuery.grep(SchemeDetailByStore[0].Table1, function (element, index) {
                    return (parseInt(element.SchemeID) == parseInt(schmeId));
                });
                strHTML += ("<tbody>");
                var SchemeCode = flgSchemeSlabDescrAgainStore[0].schemecode;
                var SchemeName = flgSchemeSlabDescrAgainStore[0].SchemeName;
                var Description = flgSchemeSlabDescrAgainStore[0].SchemeDescr;
                var ApplicableBrands = flgSchemeSlabDescrAgainStore[0].ApplicableBrands;
                strHTML += "<tr><td style='font-weight:bold;text-align:left;padding:2px;width:20%'>Initiative Code</td><td style='font-weight:bold'>:</td><td style='text-align:left'>" + SchemeCode + "</td></tr>";
                strHTML += "<tr><td style='font-weight:bold;text-align:left;padding:2px;'>Initiative Name</td><td style='font-weight:bold'>:</td><td style='text-align:left'>" + SchemeName + "</td></tr>";
                strHTML += "<tr><td style='font-weight:bold;text-align:left;padding:2px;'>Initiative Brand</td><td style='font-weight:bold'>:</td><td style='text-align:left'>" + ApplicableBrands + "</td></tr>";
                var style1 = "text-align:center;padding:1px 2px;border-left: 1px solid #A0A0A0; border-bottom: 1px solid #A0A0A0;";
                strHTML += "<tr><td style='padding:0px' colspan='3'><table style='width:100%;text-align:center;font-size:8.6pt;' id='tblAchievementChild'><thead><tr class='bg-info'><th style='" + style1 + "'>Slab</th><th style='" + style1 + "'>Slab Required</th><th style='" + style1 + "'>GAP</th><th style='" + style1 + "'>Benefit</th></tr></thead><tbody>" + $(sender)[0].outerHTML + "</tbody></table></td></tr>";
                strHTML += "</tbody></table>";
                if (SchemeCode.indexOf("LSS") == 0) {
                    $("#divTempcontainer").html(strHTML);
                } else {

                    strHTML += "<table id='tblSchemeCalculationSKUs1' style='font-size:8pt;margin:0px' class='table table-bordered table-condensed' cellpadding='2' cellspacing='0'>";
                    strHTML += ("<thead><tr class='success'>");
                    //strHTML += ("<th style='padding:2px'>Group</th>");
                    //strHTML += ("<th style='padding:2px'>Slab Type</th>");
                    //strHTML += ("<th style='padding:2px'>Slab Value</th>");
                    strHTML += ("<th style='padding:2px;'>Product Name</th>");
                    strHTML += ("<th style='text-align:center;padding:2px;width:10%'>Qty</th>");
                    strHTML += ("<th style='text-align:right;padding:2px;width:10%'>Rate</th>");
                    strHTML += ("<th style='text-align:right;padding:2px;width:15%'>Sales Value</th>");
                    strHTML += ("<tr></thead>");
                    strHTML += "<tbody></tbody></table>";
                    $("#divTempcontainer").html(strHTML);
                    $("#tblAchievementChild tbody tr[flg=1]").removeAttr("onclick");
                    var arrSubBucketDetails = jQuery.grep(SchemeDetailByStore[0].Table3, function (element, index) {
                        return (element.BucketID == 1 && element.SchemeSlabID == SlbId);
                    });
                    for (var cntSubBucket in arrSubBucketDetails) {
                        var schSlbSubBuckID = parseInt(arrSubBucketDetails[cntSubBucket]["SubBucketID"]);
                        var schSlbSubRowID = parseInt(arrSubBucketDetails[cntSubBucket]["RowID"]);
                        var schSlabSubBucketType = parseInt(arrSubBucketDetails[cntSubBucket]["SlabSubBucketType"]);

                        //strHTML += "<td>Group" + schSlbSubBuckID + "</td>";
                        //schSlabSubBucketType
                        //1. Product Quantity
                        //2. Invoice Value
                        //3. Product Lines
                        //4. Product Value
                        //5. Product Volume
                        var schSlabSubBucketValue = parseFloat(arrSubBucketDetails[cntSubBucket]["SlabSubBucketValue"]);
                        var schSubBucketValType = parseInt(arrSubBucketDetails[cntSubBucket]["SubBucketValType"]);
                        var arrProductIDMappedInSchSlbSub = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                            return (element.RowID == schSlbSubRowID);
                        });
                        var schemeslabtype = "";
                        if (schSlabSubBucketType == 1)//1. Product Quantity
                        {
                            schemeslabtype = "Sales Quantity";
                        } else if (schSlabSubBucketType == 3)//1. Product Lines
                        {
                            schemeslabtype = "Sales Lines";
                        } else if (schSlabSubBucketType == 4)//1. Product Value
                        {
                            schemeslabtype = "Sales Value";
                        }
                        //strHTML += "<td style='text-align:center'>" + schSlabSubBucketValue + "</td>";

                        var strHTML = "<tr>";
                        strHTML += "<td colspan='4' style='padding:0px'>";
                        strHTML += "<table class='table' style='margin-bottom:0px'>";
                        strHTML += "<tr class='bg-info text-white'>";
                        strHTML += "<td style='text-align:center;padding: 5px;'><b>Group : </b>Group" + schSlbSubBuckID + "</td>";
                        strHTML += "<td style='text-align:center;padding: 5px;'><b>Slab Type : </b>" + schemeslabtype + "</td>";
                        strHTML += "<td style='text-align:center;padding: 5px;'><b>Slab Value : </b>" + schSlabSubBucketValue + "</td>";
                        strHTML += "</tr>";
                        strHTML += "</table>";
                        strHTML += "</td>";
                        strHTML += "</tr>";
                        strHTML += "<tr>";
                        strHTML += "<td style='text-align:center;padding:0px' colspan='4' ><table id='tbl" + schSlbSubBuckID + "' style='width:100%;font-size:8pt' class='table-bordered table-condensed' cellpadding='0' cellspacing='0'></table></td>";
                        strHTML += "</tr>";
                        $("#tblSchemeCalculationSKUs1").append(strHTML);
                        if (arrProductIDMappedInSchSlbSub.length > 0) {
                            var totQty = 0; var totSaleValue = 0; var skuAvailable = 0;
                            for (var i in arrProductIDMappedInSchSlbSub) {
                                var SKUName = "";
                                var Qty = "0";
                                var MRP = "0";
                                var standardratebeforetax = "0";
                                var UPC = "0";
                                var SaleValue = "";
                                var Category = "";
                                var CatId = 0;
                                var sbf = "";
                                var ProductID = arrProductIDMappedInSchSlbSub[i].ProductID;
                                var IsExist = 0;
                                var style = "";
                                var IsLink = 0;
                                var flgInitiative = 0;
                                var style1 = "background-color:#b0b0ff;";
                                if ($("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductID + "]").length > 0) {
                                    CatId = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductID + "]").eq(0).attr("categoryid");
                                    flgInitiative = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductID + "]").eq(0).attr("flgInitiative");
                                    Category = $("#tblPrdItemsMain tr[flgdata=2][categoryid=" + CatId + "]").eq(0).find("td").eq(0).html();
                                    SKUName = $("#tblPrdItemsMain tr[flgdata=1][categoryid=" + CatId + "][skunodeid=" + ProductID + "]").find("td").eq(0).text();
                                    MRP = $("#tblPrdItemsMain tr[flgdata=1][categoryid=" + CatId + "][skunodeid=" + ProductID + "]").attr("mrp");
                                    standardratebeforetax = $("#tblPrdItemsMain tr[flgdata=1][categoryid=" + CatId + "][skunodeid=" + ProductID + "]").attr("standardratebeforetax");
                                    UPC = $("#tblPrdItemsMain tr[flgdata=1][categoryid=" + CatId + "][skunodeid=" + ProductID + "]").attr("UPC");
                                    Qty = $("#tblPrdItemsMain tr[flgdata=1][categoryid=" + CatId + "][skunodeid=" + ProductID + "]")[0].cells[4].children[0].value;
                                    Qty = Qty == "" ? 0 : Qty;
                                    IsExist = 1;
                                    skuAvailable = 1;
                                    IsLink = 1;
                                    style = $("#tblPrdItemsMain tr[flgdata=1][categoryid=" + CatId + "][skunodeid=" + ProductID + "]").eq(0).is("[style]") ? $("#tblPrdItemsMain tr[flgdata=1][categoryid=" + CatId + "][skunodeid=" + ProductID + "]").eq(0).attr("style") : "";
                                }
                                else {
                                    var arrSKU = jQuery.grep(arrProductList, function (element, index) {
                                        return (parseInt(element.SBFNodeId) == parseInt(ProductID));
                                    });
                                    if (arrSKU.length > 0) {
                                        skuAvailable = 1;
                                        IsExist = 1;
                                        SKUName = arrSKU[0].SBF;
                                        MRP = arrSKU[0].MRP;
                                        standardratebeforetax = arrSKU[0].RLP;
                                        Qty = 0;
                                        CatId = arrSKU[0].CatNodeID;
                                        Category = arrSKU[0].Category;
                                        UPC = arrSKU[0].PCSINBOX;
                                        flgInitiative = arrSKU[0].flgInitiative;
                                        IsLink = arrSKU[0].flgSearchList == true ? 1 : 0;
                                    }
                                }
                                totQty += parseInt(Qty);
                                if (IsExist == 1) {
                                    if ($("#tbl" + schSlbSubBuckID).find("tr[flgdata=2][categoryid='" + CatId + "']").length == 0) {
                                        var strHTMLCat = ("<tr style='" + style1 + "' flgdata='2' categoryid='" + CatId + "' >");
                                        strHTMLCat += ("<td  colspan='4' style='font-size:8.7pt;font-weight:bold;text-align:left;padding:3px 10px'>");
                                        strHTMLCat += Category;
                                        strHTMLCat += ("</td>");
                                        strHTMLCat += ("</tr>");
                                        $("#tbl" + schSlbSubBuckID).append(strHTMLCat);
                                    }
                                    var salevalue = parseInt(Qty) * parseFloat(standardratebeforetax);
                                    totSaleValue += parseFloat(salevalue);
                                    var strHTMLSKU = "<tr style='" + style + "' flgdata='1' skunodeid='" + ProductID + "' flgInitiative='" + flgInitiative + "' sbf='" + SKUName + "' UPC='" + UPC + "' categoryid='" + CatId + "' Category='" + Category + "'  MRP='" + MRP + "'  standardratebeforetax='" + standardratebeforetax + "'  rlp='" + standardratebeforetax + "'>";
                                    if (IsLink == 1) {
                                        strHTMLSKU += "<td style='text-align:left;padding:2px 3px;'><a href='###' style='color:blue;text-decoration:underline' onclick='fnInsertSKUInMainScreen(this)' >" + SKUName.trim() + "</a></td>";
                                    } else {
                                        strHTMLSKU += "<td style='text-align:left;padding:2px 3px;background-color:#d3d3d3;' title='This SKU is not the part of scheme'>" + SKUName.trim() + "</td>";
                                    }
                                    strHTMLSKU += "<td style='text-align:center;padding:2px;width:10%'>" + Qty + "</td>";
                                    //strHTMLSKU += "<td style='text-align:center;padding:2px;width:15%'><input type='text' value='" + Qty + "' /></td>";
                                    strHTMLSKU += "<td style='text-align:right;padding:2px 3px;width:10%'>&#8377; " + parseFloat(standardratebeforetax).toFixed(2) + "</td>";
                                    strHTMLSKU += "<td style='text-align:right;padding:2px 3px;width:15%'>&#8377; " + parseFloat(salevalue).toFixed(2) + "</td>";
                                    strHTMLSKU += "</tr>";
                                    $("#tbl" + schSlbSubBuckID).find("tr[flgdata=2][categoryid='" + CatId + "']").after(strHTMLSKU);
                                    //$("#tbl" + schSlbSubBuckID).append(strHTMLSKU);
                                }
                            }
                            if (skuAvailable == 1) {
                                var strHTMLSKUTotal = "<table class='table' style='margin-bottom:0px;font-size:8.8pt;'><tr style='background-color:#f8f9fa;color:#000'>";
                                strHTMLSKUTotal += "<td style='text-align:right;font-weight:bold;padding:2px;width:45%'>Total</td>";
                                strHTMLSKUTotal += "<td style='text-align:center;padding:2px;width:15%'>" + totQty + "</td>";
                                strHTMLSKUTotal += "<td style='text-align:right;padding:2px;width:15%'></td>";
                                var salevalue = parseInt(Qty) * parseFloat(MRP);
                                strHTMLSKUTotal += "<td style='text-align:right;padding:2px;width:25%'>&#8377; " + parseFloat(totSaleValue).toFixed(2) + "</td>";
                                strHTMLSKUTotal += "</tr></table>";
                                $("#tbl" + schSlbSubBuckID).before(strHTMLSKUTotal);
                            } else {
                                $("#tbl" + schSlbSubBuckID).append("<tr><td colspan='4'> No Producct Found</td></tr>");
                            }
                        } else {
                            $("#tbl" + schSlbSubBuckID).append("<tr><td colspan='4'> No Producct Found</td></tr>");
                        }
                    }
                }
                $("#dvSchemeDescr").html($("#divTempcontainer").html());
                $("#divTempcontainer").remove();
            }, 1000);
        },
        close: function (e) {
            $("#dvSchemeDescr").html("");
            $("#dvSchemeDescr").dialog('destroy');
        }
    });
}
function fnProductLineInitiative(sender) {
    var TotDiscountValue = $(sender).closest("td").next().html();
    $("#dvSchemeDescr")[0].innerHTML = "<br/><img src='../NewImages/ajax-loader.gif' />";
    $("#dvSchemeDescr").dialog({
        title: "Product Line Initiative Details",
        modal: true,
        width: "80%",
        height: "440",
        close: function (e) {
            $("#dvSchemeDescr").html("");
            $("#dvSchemeDescr").dialog('destroy');
        },
        open: function () {
            var strHTML = "<table id='tblSchemeCalculationSKUs1' style='font-size:8pt;margin:0px' class='table table-bordered table-condensed' cellpadding='2' cellspacing='0'>";
            strHTML += ("<thead><tr class='success'>");
            strHTML += ("<th style='padding:2px;'>Product Name</th>");
            strHTML += ("<th style='text-align:center;padding:2px;width:7%'>MRP</th>");
            strHTML += ("<th style='text-align:center;padding:2px;width:6%'>Qty</th>");
            strHTML += ("<th style='text-align:right;padding:2px;width:7%'>Rate</th>");
            strHTML += ("<th style='text-align:center;padding:2px;'>Initiative Applied</th>");
            // strHTML += ("<th style='text-align:right;padding:2px;width:10%'>Disc %</th>");
            strHTML += ("<th style='text-align:right;padding:2px;width:7%'>Disc Val</th>");
            strHTML += ("<th style='text-align:right;padding:2px;width:8%'>Sales Value</th>");
            strHTML += ("<tr></thead>");
            strHTML += "<tbody>";
            var trPrdItemsMain = $("#tblPrdItemsMain tr[flgdata=1][oqty!=0]");
            for (var i = 0; i < trPrdItemsMain.length; i++) {
                var PrdID = trPrdItemsMain.eq(i).attr("skunodeid");
                var CatId = trPrdItemsMain.eq(i).attr("categoryid");
                var Category = trPrdItemsMain.eq(i).attr("category");
                var SKUName = trPrdItemsMain.eq(i).find("td").eq(0).text();
                var MRP = trPrdItemsMain.eq(i).attr("mrp");
                var standardratebeforetax = trPrdItemsMain.eq(i).attr("standardratebeforetax");
                var salevalue = trPrdItemsMain[i].cells[ValueBeforeTaxIndx].innerHTML;
                var DiscText = trPrdItemsMain[i].cells[DiscountIndx].innerHTML;
                var DiscVal = parseFloat(trPrdItemsMain.eq(i).find("td[iden='disc']").is("[discountamount]") ? trPrdItemsMain.eq(i).find("td[iden='disc']").attr("discountamount") : 0);
                var Qty = trPrdItemsMain.eq(i).find("input").val();
                var OriValBeforeTax = parseInt(Qty) * parseFloat(standardratebeforetax);
                if (parseFloat(DiscVal) > 0) {
                    var SchemeProduct = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords, function (element, index) {
                        return (element.ProductID == PrdID && (element.benSubBucketType == 6 || element.benSubBucketType == 7));
                    });
                    //invdiscountamount
                    var DiscountAmount = 0.00; var invdiscountamount = 0;

                    for (var discnt in SchemeProduct) {
                        var benSubBucketType = SchemeProduct[discnt].benSubBucketType;
                       // alert("benifitSubBucketValue:" + SchemeProduct[discnt].benifitSubBucketValue + "\n benSubBucketType:" + benSubBucketType)
                        var benifitSubBucketValue = parseFloat(SchemeProduct[discnt].benifitSubBucketValue);
                        var schemeId = SchemeProduct[discnt].schemeId;
                        var schemeCode = "";
                        var flgSchemeSlabDescrAgainStore = jQuery.grep(SchemeDetailByStore[0].Table1, function (element, index) {
                            return (parseInt(element.SchemeID) == parseInt(schemeId));
                        });
                        var SchemeCode = flgSchemeSlabDescrAgainStore[0].schemecode;
                        var SchemeName = flgSchemeSlabDescrAgainStore[0].SchemeName;
                        var Description = flgSchemeSlabDescrAgainStore[0].SchemeDescr;
                        var ApplicableBrands = flgSchemeSlabDescrAgainStore[0].ApplicableBrands;

                        if (benSubBucketType == 3 || benSubBucketType == 7 || benSubBucketType == 10) {
                            distval = parseFloat(benifitSubBucketValue);
                        } else if (benSubBucketType == 8) {
                            distval = parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
                        }
                        else if (benSubBucketType == 9) {
                            distval = parseFloat(benifitSubBucketValue);
                        }
                        else {
                            distval = parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
                        }


                        Qty = trPrdItemsMain[i].cells[OrderQntyIndx].children[0].value;
                        Qty = Qty == "" ? 0 : Qty;
                        var style = "";// trPrdItemsMain.eq(i).is("[style]") ? trPrdItemsMain.eq(i).attr("style") : "";
                        strHTML += "<tr style='" + style + "'>";
                        strHTML += "<td style='text-align:left;padding:2px 3px;'>" + SKUName.trim() + "</td>";
                        strHTML += "<td style='text-align:center;padding:2px;'>&#8377; " + parseFloat(MRP).toFixed(2) + "</td>";
                        strHTML += "<td style='text-align:center;padding:2px;'>" + Qty + "</td>";
                        strHTML += "<td style='text-align:right;padding:2px 3px;'>&#8377; " + parseFloat(standardratebeforetax).toFixed(2) + "</td>";
                        strHTML += "<td style='text-align:left;padding:2px 3px;'>" + SchemeName + "</td>";
                        //strHTML += "<td style='text-align:center;padding:2px 3px;'>" + benifitSubBucketValue + "%</td>";
                        strHTML += "<td style='text-align:right;padding:2px 3px;'>&#8377; " + parseFloat(DiscVal).toFixed(2) + "</td>";
                        strHTML += "<td style='text-align:right;padding:2px 3px;'>" + salevalue + "</td>";
                        strHTML += "</tr>";
                    }
                }

            }
            strHTML += "</tbody>";
            strHTML += "<tfoot>";
            strHTML += "<tr>";
            strHTML += "<td style='text-align:right;padding:2px 3px;' colspan='5'>Total Line Discount:</td>";
            strHTML += "<td style='text-align:right;padding:2px 3px;'>" + TotDiscountValue + "</td>";
            strHTML += "<td style='text-align:right;padding:2px 3px;'></td>";
            strHTML += "</tr>";
            strHTML += "</tfoot>";
            strHTML += "</table>";
            $("#dvSchemeDescr")[0].innerHTML = strHTML;
        }
    });
}

function fnShowStoreInitiative() {
    $("#dvSchemeDescr")[0].innerHTML = "<br/><img src='../NewImages/ajax-loader.gif' />";
    $("#dvSchemeDescr").dialog({
        title: "Store Initiative List",
        modal: true,
        width: "65%",
        height: "450",
        close: function (e) {
            $("#dvSchemeDescr").html("");
            $("#dvSchemeDescr").dialog('destroy');
        },
        open: function () {
            var strHTML = "<table id='tblSchemeCalculationSKUs1' style='font-size:8pt;' class='table table-bordered table-condensed' cellpadding='2' cellspacing='0'>";
            strHTML += ("<thead><tr class='success'>");
            strHTML += ("<th style='width:13%'>Initiative Code</th>");
            strHTML += ("<th style='text-align:left;'>Initiative Name</th>");
            strHTML += ("<th style='text-align:left;'>Initiative Brand</th>");
            strHTML += ("<tr></thead>");
            strHTML += "<tbody>";
            var StoreId = $("#hdnStoreID").val();
            var arrStoreInitiativeLists = jQuery.grep(SchemeDetailByStore[0].Table, function (element, index) {
                return (parseInt(element.StoreID) == parseInt(StoreId));
            });
            for (var i in arrStoreInitiativeLists) {
                var SchemeID = arrStoreInitiativeLists[i]["SchemeID"];
                var flgSchemeSlabDescrAgainStore = jQuery.grep(SchemeDetailByStore[0].Table1, function (element, index) {
                    return (parseInt(element.SchemeID) == parseInt(SchemeID));
                });
                var SchemeCode = flgSchemeSlabDescrAgainStore[0].schemecode;
                var ApplicableBrands = flgSchemeSlabDescrAgainStore[0].ApplicableBrands;
                var SchemeName = flgSchemeSlabDescrAgainStore[0].SchemeName;
                strHTML += "<tr>";
                strHTML += "<td style='text-align:left;'>" + SchemeCode + "</td>";
                strHTML += "<td style='text-align:left;'>" + SchemeName + "</td>";
                strHTML += "<td style='text-align:left;'>" + ApplicableBrands + "</td>";
                strHTML += "</tr>";
            }
            strHTML += "</tbody></table>";
            $("#dvSchemeDescr")[0].innerHTML = strHTML;
        }
    });
}

function fnInsertSKUInMainScreen(Sender) {
    // $("#dvFadeForProcessing").show();
    setTimeout(function () {
        var CategoryId = $(Sender).closest("tr").attr("categoryId");
        var skunodeid = $(Sender).closest("tr").attr("skunodeid");
        var Category = $(Sender).closest("tr").attr("category");
        $("#tblPrdItemsMain tbody").find("tr.highlightedProduct").removeClass("highlightedProduct");
        if ($("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + CategoryId + "'][skunodeid='" + skunodeid + "']").length > 0) {
            $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + CategoryId + "'][skunodeid='" + skunodeid + "']").find("input").eq(0).focus();
            $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + CategoryId + "'][skunodeid='" + skunodeid + "']").addClass("highlightedProduct");
        } else {
            var strHML1 = fnAddNewProductsHTML($(Sender).closest("tr"));
            if ($("#tblPrdItemsMain tbody").find("tr[flgdata=2][categoryid='" + CategoryId + "'][flgsbdgap=0]").length == 0) {
                var strHML = ("<tr flgdata='2' category='" + Category + "' categoryid='" + CategoryId + "' flgsbdgap='0' sbdgroupid='0'>");
                strHML += ("<td  colspan='15' style='background-color:#b0b0ff;font-weight:bold;color:#ffffff;padding:3px 5px;'>");
                strHML += Category;
                strHML += ("</td>");
                strHML += ("</tr>");
                var len = $("#tblPrdItemsMain tbody").find("[flgdata=1]").length - 1;
                $("#tblPrdItemsMain tbody").find("[flgdata=1]").eq(len).after(strHML);
                $("#tblPrdItemsMain tbody").find("tr[flgdata=2][categoryid='" + CategoryId + "']").after(strHML1);
                $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + CategoryId + "'][skunodeid='" + skunodeid + "']").find("input").eq(0).focus();
                $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + CategoryId + "'][skunodeid='" + skunodeid + "']").addClass("highlightedProduct");
            }
            else {
                var trs = $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + CategoryId + "']");
                var len1 = trs.length - 1;
                len1 = len1 < 0 ? 0 : len1;
                $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + CategoryId + "']").eq(len1).after(strHML1);
                $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + CategoryId + "'][skunodeid='" + skunodeid + "']").find("input").eq(0).focus();
                $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + CategoryId + "'][skunodeid='" + skunodeid + "']").addClass("highlightedProduct");
            }
        }
        $("#dvFadeForProcessing").hide();
        $("#dvSchemeDescr").dialog('close');
        fnSetFocustOnText();
    }, 200);
}



function fnShowSchemesName(skunodeid) {
    var strHTML = "";
    try {
        var arrSchIdsListOnProductID = jQuery.grep(SchemeDetailByStore[0].Table8, function (element, index) {
            return (parseInt(element.ProductID) == parseInt(skunodeid));
        });

        var arrSchIdsListOnProductID1 = jQuery.grep(SchemeDetailByStore[0].Table11, function (element, index) {
            return (parseInt(element.ProductID) == parseInt(skunodeid));
        });
        var arrSchIdsListOnProductID3 = "";
        //if (SchemeDetailByStore[0].Table12.length > 0) {
        //    arrSchIdsListOnProductID3 = SchemeDetailByStore[0].Table12[0]["InvString"];
        //}

        //if (arrSchIdsListOnProductID.length > 0) {
        //    if (arrSchIdsListOnProductID1.length > 0) {
        //        arrSchIdsListOnProductID = arrSchIdsListOnProductID[0].PrdString + "#" + arrSchIdsListOnProductID1[0].PrdString + "#" + arrSchIdsListOnProductID3;
        //    } else {
        //        arrSchIdsListOnProductID = arrSchIdsListOnProductID[0].PrdString + "#" + arrSchIdsListOnProductID3;
        //    }
        //} else {
        //    arrSchIdsListOnProductID = arrSchIdsListOnProductID3;
        //}
        var str = "";
        for (var i = 0; i < arrSchIdsListOnProductID.length; i++) {
            if (str == "") {
                str = arrSchIdsListOnProductID[i].PrdString;
            } else {
                str += "#" + arrSchIdsListOnProductID[i].PrdString;
            }
        }
        arrSchIdsListOnProductID = str;
        arrSchIdsListOnProductID = (arrSchIdsListOnProductID.length > 0 ? arrSchIdsListOnProductID : "") + "#" + (arrSchIdsListOnProductID1.length > 0 ? arrSchIdsListOnProductID1[0].PrdString : "") + "#" + (SchemeDetailByStore[0].Table12.length > 0 ? arrSchIdsListOnProductID3 : "");
        if (arrSchIdsListOnProductID != "") {
            arrSchIdsListOnProductID = arrSchIdsListOnProductID.split("#");
            //debugger;

            for (var pSchIdsAppliCount = 0; pSchIdsAppliCount < arrSchIdsListOnProductID.length; pSchIdsAppliCount++) {
                var schOverviewDetails = arrSchIdsListOnProductID[pSchIdsAppliCount].split("!")[0];
                if (schOverviewDetails == "") {
                    continue;
                }
                var schOverviewOtherDetails = arrSchIdsListOnProductID[pSchIdsAppliCount].split("!")[1];
                var schId = parseInt(schOverviewDetails.split("_")[0]);

                var arrschSlbIDsOnSchIdBasis = schOverviewOtherDetails.split("@");
                var exitWhenSlabToExit = 0;
                //Chk if Scheme Id is mapped to that store Id or not starts here

                var flgSchemeExistAgainStore = jQuery.grep(SchemeDetailByStore[0].Table1, function (element, index) {
                    return (element.SchemeID == schId);
                });

                if (flgSchemeExistAgainStore.length > 0) {
                    var schemeName = flgSchemeExistAgainStore[0].SchemeName.replace(/\|/g, ',')
                    var schemecode = flgSchemeExistAgainStore[0].schemecode;
                    var SchemeTypeId = flgSchemeExistAgainStore[0].SchemeTypeId;
                    strHTML += schId + "^" + schemeName + "^" + schemecode + "^" + SchemeTypeId + "|";
                }
            }

        }
    } catch (err) {
        strHTML = "";
    }
    return strHTML;
}

function fnGetSlabDesc(SlbId, flgSchemeExistAgainStore) {
    var strHTML = "";
    try {
        var flgSchemeExistAgainStore1 = jQuery.grep(flgSchemeExistAgainStore, function (element, index) {
            return (element.SchemeSlabID == SlbId);
        });

        for (var sl in flgSchemeExistAgainStore1) {
            var SlabSubBucketType = flgSchemeExistAgainStore1[sl].SlabSubBucketType;
            var SlabSubBucketValue = flgSchemeExistAgainStore1[sl].SlabSubBucketValue;
            if (SlabSubBucketType == 1) {
                strHTML += strHTML != "" ? " and Buy " + SlabSubBucketValue + " Pc" : "Buy " + SlabSubBucketValue + " Pc";
            } else if (SlabSubBucketType == 4) {
                strHTML += strHTML != "" ? " and Buy " + SlabSubBucketValue + " Rs" : "Buy " + SlabSubBucketValue + " Rs";
            }
        }
    } catch (err) {
        strHTML = "";
    }
    return strHTML;
}

function fnShowSchemeBenefit(schmeId, SchemeName, skunodeid, AppliedschmSlabId) {
    $("#dvSchemeDescr")[0].innerHTML = "<br/><img src='../NewImages/ajax-loader.gif' />";
    $("#dvSchemeDescr").dialog({
        title: "Initiative Summary",
        modal: true,
        width: "65%",
        height: "450",
        open: function () {
            PageMethods.fnGetSchemeMasterPopupDetail(schmeId, function (result) {
                if (result.split("|")[0] == "2") {
                    $("#dvSchemeDescr")[0].innerHTML = "Error-" + result.split("|")[1];
                } else {
                    var strHTML = "<table style='margin:5px 0px 0px 0px;font-size:8.5pt' class='table table-bordered table-condensed' cellpadding='2' cellspacing='0'>";
                    var style = "";
                    var flgSchemeSlabDescrAgainStore = jQuery.grep(SchemeDetailByStore[0].Table1, function (element, index) {
                        return (parseInt(element.SchemeID) == parseInt(schmeId));
                    });
                    strHTML += ("<tbody>");
                    var SchemeCode = flgSchemeSlabDescrAgainStore[0].schemecode;
                    var SchemeName = flgSchemeSlabDescrAgainStore[0].SchemeName;
                    var ApplicableBrands = flgSchemeSlabDescrAgainStore[0].ApplicableBrands;
                    strHTML += "<tr><td style='font-weight:bold;text-align:left;padding:2px;width:20%'>Initiative Code</td><td style='font-weight:bold'>:</td><td style='text-align:left'>" + SchemeCode + "</td></tr>";
                    strHTML += "<tr><td style='font-weight:bold;text-align:left;padding:2px;'>Initiative Name</td><td style='font-weight:bold'>:</td><td style='text-align:left'>" + SchemeName + "</td></tr>";
                    strHTML += "<tr><td style='font-weight:bold;text-align:left;padding:2px;'>Initiative Brand</td><td style='font-weight:bold'>:</td><td style='text-align:left'>" + ApplicableBrands + "</td></tr>";
                    strHTML += "</tbody></table>";
                    strHTML += "<table id='tblSchemeCalculationSKUs1' style='font-size:8pt;margin:0px 0px 0px 0px' class='table table-bordered table-condensed' cellpadding='2' cellspacing='0'>";
                    strHTML += ("<thead><tr class='success'>");
                    //strHTML += ("<th style='padding:2px'>Group</th>");
                    //strHTML += ("<th style='padding:2px'>Slab Type</th>");
                    //strHTML += ("<th style='padding:2px'>Slab Value</th>");
                    strHTML += ("<th style='text-align:left;padding:4px'>Level Type</th>");
                    strHTML += ("<th style='text-align:left;padding:4px'>Level Desc</th>");
                    strHTML += ("<th style='text-align:left;padding:2px;text-align:center;'>Benefit</th>");
                    strHTML += ("<th style='width:90px;text-align:center;padding:2px'>Max Limit</th>");
                    strHTML += ("<th style='width:90px;text-align:center;padding:2px'># Of Lines</th>");
                    strHTML += ("<tr></thead>");
                    strHTML += "<tbody>";
                    var arrData = $.parseJSON("[" + result + "]");
                    var arrSubBucketDetails = arrData[0].Table;
                    var schSlbSubBuckIDOLD = ""; var slablcount = 1;
                    for (var cntSubBucket in arrSubBucketDetails) {
                        var SchemeSlabID = parseInt(arrSubBucketDetails[cntSubBucket]["SchemeSlabID"]);
                        var schSlbSubBuckID = parseInt(arrSubBucketDetails[cntSubBucket]["SubBucketID"]);
                        var schSlbSubRowID = parseInt(arrSubBucketDetails[cntSubBucket]["rowid"]);
                        var schSlabSubBucketType = parseInt(arrSubBucketDetails[cntSubBucket]["SlabSubBucketType"]);
                        var schSlabSubBucketValue = parseFloat(arrSubBucketDetails[cntSubBucket]["SlabSubBucketValue"]);
                        var GroupBucket = arrSubBucketDetails[cntSubBucket]["GroupBucket"];
                        var schemeslabtype = arrSubBucketDetails[cntSubBucket]["schemeslabtype"];
                        var Variance = arrSubBucketDetails[cntSubBucket]["Variance"];
                        var BenValue = arrSubBucketDetails[cntSubBucket]["BenValue"];
                        var Max_Limit = arrSubBucketDetails[cntSubBucket]["Max_Limit"];
                        if (SchemeSlabID != schSlbSubBuckIDOLD) {
                            strHTML += "<tr class='bg-warning text-white'>";
                            strHTML += "<td colspan='5' style='text-align:left;text-weight:bold;font-size:9.5pt'><b>Slab-" + slablcount + "</b></td>";
                            strHTML += "</tr>";
                            slablcount++;
                        }
                        schSlbSubBuckIDOLD = SchemeSlabID;
                        strHTML += "<tr>";
                        var arrCategoryDetail = jQuery.grep(arrData[0].Table1, function (element, index) {
                            return (parseInt(element.rowid) == parseInt(schSlbSubRowID));
                        });
                        strHTML += "<td colspan='5' style='padding:0px'>";
                        strHTML += "<table class='table' style='margin-bottom:0px;font-size:8.6pt'>";
                        strHTML += "<tr class='bg-info text-white'>";
                        strHTML += "<td style='text-align:left;padding: 5px 0px 5px 10px;'><b>Group : </b>" + GroupBucket + "</td>";
                        strHTML += "<td style='text-align:left;padding: 5px;'><b>Slab Type : </b>" + schemeslabtype + "</td>";
                        strHTML += "<td style='text-align:left;padding: 5px;'><b>Slab Value : </b>" + schSlabSubBucketValue + "</td>";
                        strHTML += "</tr>";
                        strHTML += "</table>";
                        strHTML += "</td>";
                        strHTML += "</tr>";
                        strHTML += "<tr>";
                        var totQty = 0; var totSaleValue = 0;
                        for (var i in arrCategoryDetail) {
                            var CatType = arrCategoryDetail[i]["Type"];
                            var CatDescr = arrCategoryDetail[i]["Descr"];
                            if (i == 0) {
                                strHTML += "<td style='text-align:left'>" + CatType + "</td>";
                                strHTML += "<td style='text-align:left'>" + CatDescr + "</td>";
                                strHTML += "<td rowspan='" + arrCategoryDetail.length + "' style='text-align:center'>" + BenValue + "</td>";
                                strHTML += "<td rowspan='" + arrCategoryDetail.length + "' style='text-align:center'>" + Max_Limit + "</td>";
                                strHTML += "<td rowspan='" + arrCategoryDetail.length + "' style='text-align:center'>" + Variance + "</td>";
                                strHTML += "</tr>";
                            } else {
                                strHTML += "<tr>";
                                strHTML += "<td style='text-align:left'>" + CatType + "</td>";
                                strHTML += "<td style='text-align:left'>" + CatDescr + "</td>";
                                strHTML += "</tr>";
                            }
                        }
                    }
                    strHTML += "</tbody>";
                    strHTML += "</table>";
                    $("#dvSchemeDescr")[0].innerHTML = strHTML;
                }
            })
        },
        close: function (e) {
            $("#dvSchemeDescr").html("");
        }
    });
}
var arrSKUCheck = [];
function fnFinalTotol(flg) {
    flgCheckPmtTems = 0;
    //fnSetFreeProductQnty();
    // fnApplyPercentageDiscountOnOtherProduct();
    var TotalFreeQTY = 0;
    var TotalProductLevelDiscount = 0.00;
    var TotalOrderValBeforeTax = 0.00;
    var TotAdditionaDiscount = 0.00;
    var TotOderValueAfterAdditionaDiscount = 0.00;
    var TotTaxAmount = 0.00;
    var TotOderValueAfterTax = 0.00;
    var TotalOrderQnty = 0;
    var trPrdItemsMain = $("#tblPrdItemsMain tr[flgdata=1][oqty!=0]");
    var TotTCPoints = 0; var cntTotSKUs = 0;
    var arrSKUCheck = [];
    arrSBDGrp = [];
    var arrFBGrp = [];
    var TotInvMRP = 0;
    var OverallInvSchemeDiscount = 0;
    var trFBs = $("#tblFocusBrandMain tbody tr");
    for (var f = 0; f < trFBs.length; f++) {
        var oldfbachievement = $("#tblFocusBrandMain tbody tr").eq(f).attr("oldfbachievement");
        var fbslabtypeid = $("#tblFocusBrandMain tbody tr").eq(f).attr("slabtypeid");
        var fbtarget = $("#tblFocusBrandMain tbody tr").eq(f).attr("fbtarget");
        var GAP = parseFloat(fbtarget) - parseFloat(oldfbachievement);
        GAP = GAP < 0 ? 0 : GAP;
        $("#tblFocusBrandMain tbody tr").eq(f).find("td").eq(1).html(oldfbachievement + "/" + fbtarget);
        $("#tblFocusBrandMain tbody tr").eq(f).find("td").eq(2).html(GAP);
        $("#tblFocusBrandMain tbody tr").eq(f).find("td").eq(3).html(0);
        $("#tblFocusBrandMain tbody tr").eq(f).attr("flgNewAchievement", "0");
        $("#tblFocusBrandMain tbody tr").eq(f).attr("fbachievement", "0");
        $("#tblFocusBrandMain tbody tr").eq(f).attr("OldInOrder", "0");

        var fbAchPer = parseInt(oldfbachievement) * 100 / parseInt(fbtarget);
        var sbgclass = "";
        if (fbAchPer > 60 && fbAchPer < 100) {
            sbgclass = "clsOrangeBg";
        } else if (fbAchPer >= 100) {
            sbgclass = "clsGreenBg";
        }

        $("#tblFocusBrandMain tbody tr").eq(f).removeClass("clsOrangeBg");
        $("#tblFocusBrandMain tbody tr").eq(f).removeClass("clsGreenBg");
        $("#tblFocusBrandMain tbody tr").eq(f).addClass(sbgclass);
    }



    $("#tblPrdItemsMain tbody tr[flgbaseproduct=1][flgsbdgap=1]").removeClass("trHightlightSBD");
    for (var i = 0; i < trPrdItemsMain.length; i++) {

        var flgInactive = parseInt(trPrdItemsMain.eq(i).attr("flgInactive"));
        if (flgInactive == 1) {
            continue;
        }
        var Qty = trPrdItemsMain.eq(i).find("input[type=text]").val();
        Qty = Qty == "" ? 0 : Qty;
        var skunodeid = parseInt(trPrdItemsMain.eq(i).attr("skunodeid"));
        if (flg == 1) {
            Qty = parseInt(trPrdItemsMain.eq(i).find("input[type=text]").attr("sgtval"));
            trPrdItemsMain.eq(i).find("input[type=text]").val(Qty);
        }
        else if (flg == 2) {
            Qty = 0;
            trPrdItemsMain.eq(i).find("input[type=text]").val(Qty);
        }
        fnApplyPercentageDiscountOnProduct(skunodeid);
        var standardratebeforetax = parseFloat(trPrdItemsMain.eq(i).attr("standardratebeforetax"));
        var mrp = parseFloat(trPrdItemsMain.eq(i).attr("mrp"));
        var FBID = trPrdItemsMain.eq(i).attr("fbid");
        var flgFB = trPrdItemsMain.eq(i).attr("flgfb");
        if ($.inArray(skunodeid, arrSKUCheck) == -1) {
            if (Qty > 0) {
                cntTotSKUs++;
                if (trPrdItemsMain.eq(i).attr("flgsbdgap") == "1") {
                    var sbdgrpid = trPrdItemsMain.eq(i).attr("sbdgroupid");
                    if ($.inArray(sbdgrpid, arrSBDGrp) == -1) {
                        $("#tblPrdItemsMain tbody tr[flgbaseproduct=1][flgsbdgap=1][sbdgroupid=" + sbdgrpid + "]").removeClass("trHightlightSBD").addClass("trHightlightSBD");
                        arrSBDGrp.push(sbdgrpid);
                    }
                }

            }
            arrSKUCheck.push(skunodeid);

            var tcpoints = 0;
            TotalOrderQnty = parseInt(TotalOrderQnty) + parseInt(Qty);
            TotalFreeQTY = 0
            var DiscountAmount = parseFloat(trPrdItemsMain.eq(i).find("td[iden='disc']").is("[discountamount]") ? trPrdItemsMain.eq(i).find("td[iden='disc']").attr("discountamount") : 0);
            var invdiscountamount = parseFloat(trPrdItemsMain.eq(i).find("td[iden='disc']").is("[invdiscountamount]") ? trPrdItemsMain.eq(i).find("td[iden='disc']").attr("invdiscountamount") : 0);
            OverallInvSchemeDiscount += parseFloat(invdiscountamount);
            TotalProductLevelDiscount = parseFloat(TotalProductLevelDiscount) + parseFloat(DiscountAmount);

            TotTaxAmount = 0;
            var ValBeforeTax = parseInt(Qty) * standardratebeforetax;
            if (flgFB == 1) {
                var newAchievement = $("#tblFocusBrandMain tr[fbid='" + FBID + "']").attr("fbachievement");
                var fbslabtypeid = $("#tblFocusBrandMain tr[fbid='" + FBID + "']").attr("slabtypeid");
                var OldAchievement = $("#tblFocusBrandMain tr[fbid='" + FBID + "']").attr("oldfbachievement");
                var OldInOrder = $("#tblFocusBrandMain tr[fbid='" + FBID + "']").attr("OldInOrder");
                var fbTarget = $("#tblFocusBrandMain tr[fbid='" + FBID + "']").attr("fbtarget");

                if (fbslabtypeid == 1) {
                    var totAchivement = parseInt(Qty) + parseInt(newAchievement);
                    var totInOrder = parseInt(Qty) + parseInt(OldInOrder);
                } else {
                    var totAchivement = Math.round(parseFloat(ValBeforeTax) + parseFloat(newAchievement));
                    var totInOrder = Math.round(parseFloat(ValBeforeTax) + parseInt(OldInOrder));
                }
                var fbGap = parseInt(fbTarget) - (parseInt(totAchivement) + parseInt(OldAchievement));
                fbGap = fbGap < 0 ? 0 : fbGap;
                var displayAchievement = parseFloat(totAchivement) + parseFloat(OldAchievement);
                var fbAchPer = parseInt(displayAchievement) * 100 / parseInt(fbTarget);
                var sbgclass = "";
                var flgNewAchievement = 0;
                if (fbAchPer > 60 && fbAchPer < 100) {
                    sbgclass = "clsOrangeBg";
                } else if (fbAchPer >= 100) {
                    sbgclass = "clsGreenBg";
                    flgNewAchievement = 1;
                }

                $("#tblFocusBrandMain tr[fbid='" + FBID + "']").addClass(sbgclass);
                $("#tblFocusBrandMain tr[fbid='" + FBID + "']").attr("flgNewAchievement", flgNewAchievement);
                $("#tblFocusBrandMain tr[fbid='" + FBID + "']").attr("fbachievement", totAchivement);
                $("#tblFocusBrandMain tr[fbid='" + FBID + "']").attr("OldInOrder", totInOrder);
                $("#tblFocusBrandMain tr[fbid='" + FBID + "']").find("td").eq(1).html(displayAchievement + " / " + fbTarget);
                $("#tblFocusBrandMain tr[fbid='" + FBID + "']").find("td").eq(2).html(parseFloat(fbGap).toFixed(0));
                $("#tblFocusBrandMain tr[fbid='" + FBID + "']").find("td").eq(3).html(totInOrder);
            }


            TotalOrderValBeforeTax += parseFloat(ValBeforeTax);
            ValBeforeTax = (parseFloat(ValBeforeTax) - parseFloat(DiscountAmount));
            ValBeforeTax += parseFloat(TotTaxAmount);
            TotOderValueAfterTax += ValBeforeTax;

            TotInvMRP += parseFloat(parseInt(Qty) * mrp);

            trPrdItemsMain.eq(i).find("td[iden='disc']").attr("discountamount", DiscountAmount);

            //trPrdItemsMain.eq(i).find("td[iden='netval']")[0].innerHTML = "&#8377; " + parseFloat(ValBeforeTax).toFixed(2);
            trPrdItemsMain.eq(i).find("td[iden='netval']").attr("valbeforetax", ValBeforeTax);
            trPrdItemsMain.eq(i).find("td[iden='netval']").attr("valaftertax", ValBeforeTax);


        }
    }

    var TotSBD = $("#tblSBDOrdered tbody tr")[0].cells[0].innerHTML.trim();
    $("#tblSBDOrdered tbody tr")[0].cells[1].innerHTML = arrSBDGrp.length;
    $("#tblSBDOrdered tbody tr").eq(0).find("td").eq(1).attr("gpvalue", arrSBDGrp.length);
    $("#tblSBDOrdered tbody tr")[0].cells[2].innerHTML = parseInt(TotSBD) - parseInt(arrSBDGrp.length);




    $("#tdTotSKUs")[0].innerHTML = cntTotSKUs;
    $("#tdTotNetLineValue")[0].innerHTML = "&#8377; " + parseFloat(parseFloat(TotOderValueAfterTax) - parseFloat(OverallInvSchemeDiscount)).toFixed(2);
    $("#tdTotNetLineValue").data("netvalue", TotOderValueAfterTax);
    $("#tdTotNetLineValue").data("OderValueBrforeTax", TotalOrderValBeforeTax);

    //$("#tdTotDisValue")[0].innerHTML = "&#8377; " + parseFloat(TotalProductLevelDiscount).toFixed(2);
    $("#tdTotDisValue").data("TotDisValue", parseFloat(TotalProductLevelDiscount));

    $("#tdInvMRP").data("InvMRP", TotInvMRP);
    $("#tdInvMRP")[0].innerHTML = "&#8377; " + parseFloat(TotInvMRP).toFixed(2);
    var BranMargin = parseFloat(TotInvMRP) - parseFloat(TotalOrderValBeforeTax);
    BranMargin = BranMargin < 0 ? 0 : BranMargin;
    $("#tdBranMargin")[0].innerHTML = "&#8377; " + parseFloat(BranMargin).toFixed(2);
    $("#tdBranMargin").next()[0].innerHTML = TotInvMRP > 0 ? parseFloat(parseFloat(BranMargin) * 100 / parseFloat(TotInvMRP)).toFixed(0) + "%" : "0%";
    $("#tdInvValue")[0].innerHTML = "&#8377; " + parseFloat(TotalOrderValBeforeTax).toFixed(2);
    $("#tdInvValue").data("InvValue", TotalOrderValBeforeTax);

    $("#tdLineSchemeDiscount")[0].innerHTML = "&#8377; " + parseFloat(TotalProductLevelDiscount).toFixed(2);
    $("#tdLineSchemeDiscount").next()[0].innerHTML = TotInvMRP > 0 ? parseFloat(parseFloat(TotalProductLevelDiscount) * 100 / parseFloat(TotInvMRP)).toFixed(0) + "%" : "0%";
    $("#tdLineSchemeDiscount").data("LineSchemeDiscount", TotalProductLevelDiscount);

    $("#tdOverallInvSchemeDiscount")[0].innerHTML = "&#8377; " + parseFloat(OverallInvSchemeDiscount).toFixed(2);
    $("#tdOverallInvSchemeDiscount").next()[0].innerHTML = TotInvMRP > 0 ? parseFloat(parseFloat(OverallInvSchemeDiscount) * 100 / parseFloat(TotInvMRP)).toFixed(0) + "%" : "0%";
    $("#tdOverallInvSchemeDiscount").data("OverallInvSchemeDiscount", OverallInvSchemeDiscount);

    var InvSchemeDiscount = parseFloat(TotalProductLevelDiscount + OverallInvSchemeDiscount);
    $("#tdInvSchemeDiscount").data("InvSchemeDiscount", InvSchemeDiscount);
    $("#tdInvSchemeDiscount")[0].innerHTML = "&#8377; " + parseFloat(InvSchemeDiscount).toFixed(2);
    $("#tdInvSchemeDiscount").next()[0].innerHTML = TotInvMRP > 0 ? parseFloat(parseFloat(InvSchemeDiscount) * 100 / parseFloat(TotInvMRP)).toFixed(0) + "%" : "0%";


    var TotalBranMargin = parseFloat(BranMargin) + parseFloat(TotalProductLevelDiscount) + parseFloat(OverallInvSchemeDiscount);
    $("#tdTotalBranMargin")[0].innerHTML = "&#8377; " + parseFloat(TotalBranMargin).toFixed(2);
    $("#tdTotalBranMargin").next()[0].innerHTML = TotInvMRP > 0 ? parseFloat(parseFloat(TotalBranMargin) * 100 / parseFloat(TotInvMRP)).toFixed(0) + "%" : "0%";
    var NettInvValue = parseFloat(TotInvMRP) - parseFloat(TotalBranMargin);
    $("#tdNettInvValue")[0].innerHTML = "&#8377; " + parseFloat(NettInvValue).toFixed(2);
    $("#tdNettInvValue").data("NettInvValue", NettInvValue);
    $("#tdTotNetInvValue")[0].innerHTML = "&#8377; " + parseFloat(NettInvValue).toFixed(2);
    if (IsFiveStarApplicable == 1) {
        fnCalculateStarEarned();
    }
    if (parseFloat(TotOderValueAfterTax) > 0) {
        $("#anchorbtn2").css("background-color", "#00b72e;");
        $("#anchorbtn2").find("div").html("Review Order")
        $("#anchorbtn2").find("div").css("width", "80px");
        $("#anchorbtn2").find("span").removeClass("Delete").addClass("Save");
    } else {
        $("#anchorbtn2").find("span").removeClass("Save").addClass("Delete");
        $("#anchorbtn2").css("background-color", "#ff9d3c;");
        $("#anchorbtn2").find("div").html("Close Call")
        $("#anchorbtn2").find("div").css("width", "65px");
    }
}
function fnFinalTotol_Temp(flg) {
    flgCheckPmtTems = 0;
    var TotalFreeQTY = 0;
    var TotalProductLevelDiscount = 0.00;
    var TotalOrderValBeforeTax = 0.00;
    var TotAdditionaDiscount = 0.00;
    var TotOderValueAfterAdditionaDiscount = 0.00;
    var TotTaxAmount = 0.00;
    var TotOderValueAfterTax = 0.00;
    var TotalOrderQnty = 0;
    var trPrdItemsMain = $("#tblSchemeCalculationSKUs1 tr[flgdata=1]");
    var TotTCPoints = 0; var cntTotSKUs = 0;
    var arrSKUCheck = [];
    arrSBDGrp = [];
    var arrFBGrp = [];
    var TotInvMRP = 0;
    var OverallInvSchemeDiscount = 0;
    //console.log("Step2");

    for (var i = 0; i < trPrdItemsMain.length; i++) {
        var skunodeid = parseInt(trPrdItemsMain.eq(i).attr("skunodeid"));
        fnApplyPercentageDiscountOnProduct_Temp(skunodeid);
    }

    fnRecalculateScheme_Temp(flg);
}

function fnCalculateStarEarned() {
    var TotLineSku = $("#tdTotSKUs").html().trim();
    TotLineSku = TotLineSku == "" ? 0 : TotLineSku;
    var strTotalStargained = "";
    $("#tblStarEarnedSummary tr.clsbgRed").removeClass("clsbgRed");
    $("#tblStarEarnedSummary tr.clsbgGrey").removeClass("clsbgGrey");

    //clsbgRed
    if (parseInt(TotLineSku) > 0) {
        $("#tdCallConBal").closest("tr").data("achieved", "1");
        strTotalStargained += "<img src=\"../images/Yellowstar.png\" style=\"width:25px;height:20px\" />";
        $("#tdCallConBal").prev()[0].innerHTML = "<img src=\"../images/Yellowstar.png\" style=\"width:25px;height:20px\" />";
    } else {
        $("#tdCallConBal").closest("tr").addClass("clsbgRed");
        $("#tdCallConBal").closest("tr").data("achieved", "0");
        $("#tdCallConBal").prev()[0].innerHTML = "<img src=\"../images/blackstar.png\" style=\"width:25px;height:20px\" />";
    }
    var OderValueBrforeTax = $("#tdTotNetLineValue").data("OderValueBrforeTax");
    OderValueBrforeTax = (OderValueBrforeTax == undefined || OderValueBrforeTax == null || OderValueBrforeTax == "") ? 0 : OderValueBrforeTax;
    var FiveStarProductivityTgt = $("#tdProductivityBal").data("FiveStarProductivityTgt");
    FiveStarProductivityTgt = (FiveStarProductivityTgt == undefined || FiveStarProductivityTgt == null || FiveStarProductivityTgt == "") ? 0 : FiveStarProductivityTgt;
    var Balance = parseFloat(FiveStarProductivityTgt) - parseFloat(OderValueBrforeTax);
    Balance = Balance < 0 ? 0 : Balance;
    $("#tdProductivityBal")[0].innerHTML = parseFloat(FiveStarProductivityTgt) > 0 ? "&#8377; " + Math.round(Balance) : "NA";
    if (Math.round(Balance) == 0 && parseFloat(FiveStarProductivityTgt) > 0) {
        $("#tdProductivityBal").closest("tr").data("achieved", "1");
        strTotalStargained += "<img src=\"../images/Yellowstar.png\" style=\"width:25px;height:20px;margin-left:10px\" />";
        $("#tdProductivityBal").prev()[0].innerHTML = "<img src=\"../images/Yellowstar.png\" style=\"width:25px;height:20px\" />";
    } else {

        $("#tdProductivityBal").closest("tr").data("achieved", "0");
        $("#tdProductivityBal").prev()[0].innerHTML = parseFloat(FiveStarProductivityTgt) > 0 ? "<img src=\"../images/blackstar.png\" style=\"width:25px;height:20px\" />" : "";
        if (parseFloat(FiveStarProductivityTgt) > 0) {
            $("#tdProductivityBal").closest("tr").addClass("clsbgRed");
        } else {
            $("#tdProductivityBal").closest("tr").addClass("clsbgGrey");
        }
    }

    var FiveStarNoOfGPTgt = $("#tdGPBal").data("FiveStarNoOfGPTgt");
    FiveStarNoOfGPTgt = (FiveStarNoOfGPTgt == undefined || FiveStarNoOfGPTgt == null || FiveStarNoOfGPTgt == "") ? 0 : FiveStarNoOfGPTgt;
    var Balance = parseInt(FiveStarNoOfGPTgt) - arrSBDGrp.length;
    Balance = Balance < 0 ? 0 : Balance;
    $("#tdGPBal")[0].innerHTML = parseFloat(FiveStarNoOfGPTgt) > 0 ? Balance : "NA";
    if (Math.round(Balance) == 0 && parseFloat(FiveStarNoOfGPTgt) > 0) {
        $("#tdGPBal").closest("tr").data("achieved", "1");
        strTotalStargained += "<img src=\"../images/Yellowstar.png\" style=\"width:25px;height:20px;margin-left:10px\" />";
        $("#tdGPBal").prev()[0].innerHTML = "<img src=\"../images/Yellowstar.png\" style=\"width:25px;height:20px\" />";
    } else {
        $("#tdGPBal").closest("tr").data("achieved", "0");
        $("#tdGPBal").prev()[0].innerHTML = parseFloat(FiveStarNoOfGPTgt) > 0 ? "<img src=\"../images/blackstar.png\" style=\"width:25px;height:20px\" />" : "";
        if (parseFloat(FiveStarNoOfGPTgt) > 0) {
            $("#tdGPBal").closest("tr").addClass("clsbgRed");
        } else {
            $("#tdGPBal").closest("tr").addClass("clsbgGrey");
        }
    }

    var FiveStarNoOfLSSTgt = $("#tdFBBal").data("FiveStarNoOfLSSTgt");
    FiveStarNoOfLSSTgt = (FiveStarNoOfLSSTgt == undefined || FiveStarNoOfLSSTgt == null || FiveStarNoOfLSSTgt == "") ? 0 : FiveStarNoOfLSSTgt;
    var Balance = parseInt(FiveStarNoOfLSSTgt) - arrLssApplied.length;
    Balance = Balance < 0 ? 0 : Balance;
    $("#tdFBBal")[0].innerHTML = parseFloat(FiveStarNoOfLSSTgt) > 0 ? Balance : "NA";
    if (Math.round(Balance) == 0 && parseFloat(FiveStarNoOfLSSTgt) > 0) {
        $("#tdFBBal").closest("tr").data("achieved", "1");
        strTotalStargained += "<img src=\"../images/Yellowstar.png\" style=\"width:25px;height:20px;margin-left:10px\" />";
        $("#tdFBBal").prev()[0].innerHTML = "<img src=\"../images/Yellowstar.png\" style=\"width:25px;height:20px\" />";
    } else {
        $("#tdFBBal").closest("tr").data("achieved", "0");
        $("#tdFBBal").prev()[0].innerHTML = parseFloat(FiveStarNoOfLSSTgt) > 0 ? "<img src=\"../images/blackstar.png\" style=\"width:25px;height:20px\" />" : "";
        if (parseFloat(FiveStarNoOfLSSTgt) > 0) {
            $("#tdFBBal").closest("tr").addClass("clsbgRed");
        } else {
            $("#tdFBBal").closest("tr").addClass("clsbgGrey");
        }
    }

    var OderValueBrforeTax = $("#tdTotNetLineValue").data("OderValueBrforeTax");
    OderValueBrforeTax = (OderValueBrforeTax == undefined || OderValueBrforeTax == null || OderValueBrforeTax == "") ? 0 : OderValueBrforeTax;
    var FiveStarIndTgtDlvryVal = $("#tdSHTBal").data("FiveStarIndTgtDlvryVal");
    FiveStarIndTgtDlvryVal = (FiveStarIndTgtDlvryVal == undefined || FiveStarIndTgtDlvryVal == null || FiveStarIndTgtDlvryVal == "") ? 0 : FiveStarIndTgtDlvryVal;
    var Balance = parseFloat(FiveStarIndTgtDlvryVal) - parseFloat(OderValueBrforeTax);
    Balance = Balance < 0 ? 0 : Balance;
    $("#tdSHTBal")[0].innerHTML = parseFloat(FiveStarIndTgtDlvryVal) > 0 ? "&#8377; " + Math.round(Balance) : "NA";
    if (Math.round(Balance) == 0 && parseFloat(FiveStarIndTgtDlvryVal) > 0) {
        $("#tdSHTBal").closest("tr").data("achieved", "1");
        strTotalStargained += "<img src=\"../images/Yellowstar.png\" style=\"width:25px;height:20px;margin-left:10px\" />";
        $("#tdSHTBal").prev()[0].innerHTML = "<img src=\"../images/Yellowstar.png\" style=\"width:25px;height:20px\" />";
    } else {
        $("#tdSHTBal").closest("tr").data("achieved", "0");
        $("#tdSHTBal").prev()[0].innerHTML = parseFloat(FiveStarIndTgtDlvryVal) > 0 ? "<img src=\"../images/blackstar.png\" style=\"width:25px;height:20px\" />" : "";
        if (parseFloat(FiveStarIndTgtDlvryVal) > 0) {
            $("#tdSHTBal").closest("tr").addClass("clsbgRed");
        } else {
            $("#tdSHTBal").closest("tr").addClass("clsbgGrey");
        }
    }
    window.parent.$("#tdTotalStar")[0].innerHTML = "Stars Earned This Call : " + strTotalStargained;
    //$("#tdSHTBal").data("FiveStarIndTgtDlvryVal", arrData[0].Table6[0]["FiveStarIndTgtDlvryVal"]);

}

function fnMoveQty(sender, flg) {
    if (flg == 0) {
        var ctrl = "";
        var skuID = $(sender).closest("tr").attr("prdid");
        if ($(sender).hasClass("glyphicon-arrow-right")) {
            ctrl = $(sender).closest("table").closest("tr").find("input[type=text]")[0];
            $(sender).closest("table").closest("tr").find("input[type=text]")[0].value = $(sender).closest("td").attr("sgtval");
            $(sender).removeClass("glyphicon-arrow-right").addClass("glyphicon-arrow-left");
        } else {
            ctrl = $(sender).closest("table").closest("tr").find("input[type=text]")[0];
            $(sender).closest("table").closest("tr").find("input[type=text]")[0].value = 0;
            $(sender).removeClass("glyphicon-arrow-left").addClass("glyphicon-arrow-right");
        }

        fnCalculateData(ctrl);
        fnShowBenefitSchemeWise(skuID, 3);
    } else {
        if ($(sender).hasClass("glyphicon-arrow-right")) {
            flg = 1;
            $(sender).removeClass("glyphicon-arrow-right").addClass("glyphicon-arrow-left");
            $("#tblPrdItemsMain").find("span.glyphicon-arrow-right").removeClass("glyphicon-arrow-right").addClass("glyphicon-arrow-left");
        } else {
            flg = 2;
            $(sender).removeClass("glyphicon-arrow-left").addClass("glyphicon-arrow-right");
            $("#tblPrdItemsMain").find("span.glyphicon-arrow-left").removeClass("glyphicon-arrow-left").addClass("glyphicon-arrow-right");
        }
        fnFinalTotol(flg);
    }

}

function fnCalculateData_Temp(cntrl, flg) {
    //Mukiii
    //debugger;
    var rowIndex = $(cntrl).closest("tr").index();
    var tblCurrentTR = $(cntrl).closest("tr");
    var skuID = $(cntrl).closest("tr").attr("SKUNodeID");
    var orderqty = $(cntrl).val();
    if (skuID != undefined) {
        orderqty = orderqty == "" ? 0 : orderqty;
        $(cntrl).val(orderqty);
        var OldQty = $(cntrl).closest("tr").find("td.clsOldQ").text();
        $(cntrl).closest("tr").attr("oqty", parseInt(orderqty) + parseInt(OldQty));
        $(cntrl).addClass("ui-autocomplete-loading");
        var schemeData = SchemeDetailByStore[0].Table8;
        var SchIdsCompleteSchemeIdListOnProductID = jQuery.grep(schemeData, function (element, index) {
            return (element.ProductID == skuID);
        });

        $(cntrl).closest("tr").find("a").html("0.00/0.00");
        $(cntrl).closest("td").next().html("&#8377; " + parseFloat($(cntrl).closest("tr").attr("standardratebeforetax")).toFixed(2));

        //setTimeout(function () {
        if (SchIdsCompleteSchemeIdListOnProductID.length > 0) {
            var strSchIdsCompleteSchemeIdListOnProductID = SchIdsCompleteSchemeIdListOnProductID.length > 0 ? SchIdsCompleteSchemeIdListOnProductID[0].PrdString : "";
            for (var i = 0; i < SchIdsCompleteSchemeIdListOnProductID.length; i++) {
                if (strSchIdsCompleteSchemeIdListOnProductID == "") {
                    strSchIdsCompleteSchemeIdListOnProductID = SchIdsCompleteSchemeIdListOnProductID[i].PrdString;
                } else {
                    strSchIdsCompleteSchemeIdListOnProductID += "#" + SchIdsCompleteSchemeIdListOnProductID[i].PrdString;
                }
            }
            // alert(strSchIdsCompleteSchemeIdListOnProductID)
            fnDeletePreviousEntriesSchemeIDsAppliedOverProductAfterValueChange_Temp(strSchIdsCompleteSchemeIdListOnProductID, skuID, tblCurrentTR);
            if (flg == 0) {
                fnFinalTotol_Temp(0);
            }
        }
        else {
            var listfreeProductQty = new Array();
            orderBookingTotalCalc_Temp(cntrl, skuID, 0, listfreeProductQty, "");
            if (flg == 0) {
                fnFinalTotol_Temp(0);
            }
        }

        $(cntrl).removeClass("ui-autocomplete-loading");
        // }, 500);

    }
}




function fnCalculateData(cntrl) {
    //Mukiii
    //debugger;
    var rowIndex = $(cntrl).closest("tr").index();
    var tblCurrentTR = $(cntrl).closest("tr");
    var skuID = $(cntrl).closest("tr").attr("SKUNodeID");
    var orderqty = $(cntrl).val();
    if (skuID != undefined) {
        orderqty = orderqty == "" ? 0 : orderqty;
        $(cntrl).val(orderqty);
        $(cntrl).closest("tr").attr("oqty", orderqty);
        var schemeData = SchemeDetailByStore[0].Table8;
        var SchIdsCompleteSchemeIdListOnProductID = jQuery.grep(schemeData, function (element, index) {
            return (element.ProductID == skuID);
        });
        var standardratebeforetax = $(cntrl).closest("tr").attr("standardratebeforetax");
        standardratebeforetax = isNaN(standardratebeforetax) ? 0 : standardratebeforetax;
        $(cntrl).closest("tr").find("td[iden='currRate']").html("&#8377; " + parseFloat(standardratebeforetax).toFixed(2));
        $(cntrl).closest("tr").find("td[iden='netval']").html("&#8377; 0.00");
        $(cntrl).closest("tr").find("td[iden='disc']").attr("discountamount", "0.00");
        $(cntrl).closest("tr").find("td[iden='netval']").attr("valbeforetax", "0.00");
        $(cntrl).closest("tr").find("td[iden='netval']").attr("valaftertax", "0.00");
        $(cntrl).closest("tr").find("td[iden='disc']").attr("invdiscountamount", "0.00");
        if (SchIdsCompleteSchemeIdListOnProductID.length > 0) {
            var strSchIdsCompleteSchemeIdListOnProductID = "";// SchIdsCompleteSchemeIdListOnProductID.length > 0 ? SchIdsCompleteSchemeIdListOnProductID[0].PrdString : "";
            for (var i = 0; i < SchIdsCompleteSchemeIdListOnProductID.length; i++) {
                if (strSchIdsCompleteSchemeIdListOnProductID == "") {
                    strSchIdsCompleteSchemeIdListOnProductID = SchIdsCompleteSchemeIdListOnProductID[i].PrdString;
                } else {
                    strSchIdsCompleteSchemeIdListOnProductID += "#" + SchIdsCompleteSchemeIdListOnProductID[i].PrdString;
                }
            }
            fnDeletePreviousEntriesSchemeIDsAppliedOverProductAfterValueChange(strSchIdsCompleteSchemeIdListOnProductID, skuID, tblCurrentTR);
            fnFinalTotol(0);
        }
        else {
            var listfreeProductQty = new Array();
            orderBookingTotalCalc(cntrl, skuID, 0, listfreeProductQty, "");
            fnFinalTotol(0);
        }

    }
}


function fnDeletePreviousEntriesSchemeIDsAppliedOverProductAfterValueChange(SchIdsCompleteSchemeIdListOnPrdID, prdID, tblCurrentTR) {
    var arrSchIdsListOnProductID = SchIdsCompleteSchemeIdListOnPrdID != "" ? SchIdsCompleteSchemeIdListOnPrdID.split("#") : [];
    var AllProductInSchSlab = [];
    arrStoreProductAppliedSchemesBenifitsRecords = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords, function (element, index) {
        return ((element.ProductID == prdID && element.SchTypeId == 3) == false);
    });
    for (var pSchIdsAppliCount = 0; pSchIdsAppliCount < arrSchIdsListOnProductID.length; pSchIdsAppliCount++) {
        var schOverviewDetails = arrSchIdsListOnProductID[pSchIdsAppliCount].split("!")[0];
        var schId = parseInt(schOverviewDetails.split("_")[0]);
        var schmTypeId = parseInt(schOverviewDetails.split("_")[3]);
        var storeID = $("#hdnStoreID").val();

        if (schmTypeId == 3) {
            arrStoreProductAppliedSchemesBenifitsRecords = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords, function (element, index) {
                return ((element.storeID == storeID && element.ProductID == prdID && element.schemeId == schId) == false);
            });
        } else {
            var arrSchmesRelatedToProject = fnGetDistinctSchIdsAgainstStoreProduct(storeID, schId);
            if (arrSchmesRelatedToProject.length > 0) {

                for (var i = 0; i < arrSchmesRelatedToProject.length; i++) {
                    if (arrSchmesRelatedToProject[i] != null) {
                        var schSlbId = parseInt(arrSchmesRelatedToProject[i].split("^")[9]);
                        AllProductInSchSlab = fnGetProductsSchIdSlabRow(storeID, schSlbId);
                        break;
                    }
                }
            }
            arrStoreProductAppliedSchemesBenifitsRecords = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords, function (element, index) {
                return (element.storeID == storeID && element.schemeId != schId);
            });
        }
    }

    fnCheckNewSchemeIDsAppliedAfterValueChange(SchIdsCompleteSchemeIdListOnPrdID, prdID, tblCurrentTR, 1);
}

function fnGetDistinctSchIdsAgainstStoreProduct(storeID, schId) {
    //Cursor cursor = db.rawQuery("SELECT BenSubBucketType,FreeProductID,BenifitAssignedValue,BenifitDiscountApplied,IFNULL(BenifitCouponCode,0),schId,schSlbRowId,SchTypeId,ProductID FROM tblStoreProductAppliedSchemesBenifitsRecords WHERE StoreID ='"+ StoreID + "' and  schId="+schId+" and BenSubBucketType in(1,5,2,6,3,7,10)", null);
    var cursor = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords, function (element, index) {
        return (element.storeID == storeID && element.schemeId == schId && (element.benSubBucketType == 1 || element.benSubBucketType == 2 || element.benSubBucketType == 3 || element.benSubBucketType == 5 || element.benSubBucketType == 6 || element.benSubBucketType == 7 || element.benSubBucketType == 8 || element.benSubBucketType == 9 || element.benSubBucketType == 10));
    });
    var chkI = new Array();
    if (cursor.length > 0) {
        for (var i in cursor) {
            //if (cursor.getString(0) != null && cursor.getString(1) != null && cursor.getString(2) != null && cursor.getString(3) != null) {
            if (cursor[i].benSubBucketType != null && cursor[i].freeProductId != null && cursor[i].benifitSubBucketValue != null && cursor[i].benifitDiscountApplied != null)
                //  chk.push(cursor.getString(0) + "^" + cursor.getString(1) + "^" + cursor.getString(2) + "^" + cursor.getString(3) + "^" + cursor.getString(4) + "^" + cursor.getString(5) + "^" + cursor.getString(6) + "^" + cursor.getString(7) + "^" + cursor.getString(8);
                chkI.push(cursor[i].benSubBucketType + "^" + cursor[i].freeProductId + "^" + cursor[i].benifitSubBucketValue + "^" + cursor[i].benifitDiscountApplied + "^" + cursor[i].benifitCoupnCode + "^" + cursor[i].schemeId + "^" + cursor[i].schSlbRowId + "^" + cursor[i].SchTypeId + "^" + cursor[i].ProductID + "^" + cursor[i].schemeSlabId);
        }
    }
    return chkI;
}


function fnGetProductsSchIdSlabRow_Temp(StoreID, schSlbId) {
    //tblSchemeSlabBenefitsProductMappingDetail (RowID text null,ProductID text null)
    //var cursorE2 = db.rawQuery("SELECT ProductID FROM  tblStoreProductAppliedSchemesBenifitsRecords where schSlbRowId="+RowID +"  and StoreID='"+StoreID+"'", null);
    var cursorE2 = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords_Temp, function (element, index) {
        return (element.storeID == StoreID && element.schemeSlabId == schSlbId);
    });
    var AllProductInSlab = new Array();


    if (cursorE2.length > 0) {
        for (var i in cursorE2) {
            var ids = (cursorE2[i].ProductID + "^" + cursorE2[i].freeProductId);
            AllProductInSlab.push(ids);
            //cursor.moveToNext();
        }
    }
    return AllProductInSlab;
}
function fnGetProductsSchIdSlabRow(StoreID, schSlbId) {
    //tblSchemeSlabBenefitsProductMappingDetail (RowID text null,ProductID text null)
    //var cursorE2 = db.rawQuery("SELECT ProductID FROM  tblStoreProductAppliedSchemesBenifitsRecords where schSlbRowId="+RowID +"  and StoreID='"+StoreID+"'", null);
    var cursorE2 = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords, function (element, index) {
        return (element.storeID == StoreID && element.schemeSlabId == schSlbId);
    });
    var AllProductInSlab = new Array();


    if (cursorE2.length > 0) {
        for (var i in cursorE2) {
            var ids = (cursorE2[i].ProductID + "^" + cursorE2[i].freeProductId);
            AllProductInSlab.push(ids);
            //cursor.moveToNext();
        }
    }
    return AllProductInSlab;
}

function fnGetProductsSchIdSlabCombind(StoreID, PrdID, schSlbId) {
    var cursorE2 = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords, function (element, index) {
        return (element.storeID == StoreID && element.ProductID == PrdID && element.schemeSlabId == schSlbId);
    });
    var AllProductInSlab = new Array();


    if (cursorE2.length > 0) {
        for (var i in cursorE2) {
            var ids = (cursorE2[i].ProductID + "^" + cursorE2[i].freeProductId + "~" + cursorE2[i].benifitSubBucketValue);
            AllProductInSlab.push(ids);
            //cursor.moveToNext();
        }
    }
    return AllProductInSlab;
}



function fectStatusIfBeniftRowIdExistsInSchemeSlabBenefitsValueDetail(BenifitRowID, toMultiply, defaultValue, BenSubBucketType) {
    var cursor2 = jQuery.grep(SchemeDetailByStore[0].Table7, function (element, index) {
        return (element.RowID == BenifitRowID);
    });

    //Cursor cursor2 = db.rawQuery("SELECT BenValue FROM tblSchemeSlabBenefitsValueDetail where RowID="+BenifitRowID, null);
    if (BenSubBucketType == 2 || BenSubBucketType == 6 || BenSubBucketType == 8) {
        toMultiply = 1;
    }
    //////////System.out.println("SELECT Sum(flgIsStrachApplicable) FROM tblStrachApplicableOnScheme");
    var chkI;

    //if (cursor2.length > 0) {
    //    chkI = new Array();
    //    for (var i in cursor2) {
    //        if (i == 0) {
    //            chkI.push(defaultValue * toMultiply);

    //        }

    //        chkI.push(cursor2[i].BenValue);
    //    }


    //}
    //else {
    chkI = new Array();
    chkI.push(cursor2[0].Column1);
    //}

    //////////System.out.println("fnCheckflgToShowStrachRowOrNot : " +chkI);
    return chkI;
}
var arrSchemeSlabachievement = []; var arrSchemeSlabachievement_Temp = [];


function fnCalculateSchemeOnInvoice_Temp(sender, schId) {


    // alert(totalOderProductsRatesAgainstRowId);
    $(sender).addClass("ui-autocomplete-loading");
    setTimeout(function () {
        //alert(schId)


        if ($(sender).html() == "Apply") {
            var arrSlabsDetailsObj = jQuery.grep(SchemeDetailByStore[0].Table3, function (element, index) {
                return (element.SchemeID == schId);
            });



            //console.log(JSON.stringify(SchemeDetailByStore[0].Table3));
            //console.log(JSON.stringify(arrSlabsDetailsObj));
            let arrSlabsDetails = arrSlabsDetailsObj.slice().sort((a, b) => b.SlabSubBucketValue - a.SlabSubBucketValue);

            arrStoreProductAppliedSchemesBenifitsRecords_Temp = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords_Temp, function (element, index) {
                return (element.schemeId != schId);
            });

            //console.log(JSON.stringify(arrSlabsDetails))

            arredtboc_OderQuantityFinalSchemesToApply = new Array();
            var arrMaintainDetailsOfBucketConditionsAgainstBuckId = new Array();
            var TotalVolumeQtyValueInSlab = 0;
            var TotalValueInSlab = 0;
            var SlabTypeDesc = "";
            var SlabTypeRequiredDesc = "";
            var SlabTypePer = 0;
            var exitWhenSlabToExit = 0;

            //for (var cntSlab in arrSlabsDetails) {
            var schSlabId = parseInt(arrSlabsDetails[0]["SchemeSlabID"]);
            //alert(schSlabId)
            schSlbBuckId = parseInt(arrSlabsDetails[0]["BucketID"]);
            var schSlbSubBuckID = parseInt(arrSlabsDetails[0]["SubBucketID"]);
            var schSlbSubRowID = parseInt(arrSlabsDetails[0]["RowID"]);
            var schSlabSubBucketType = parseInt(arrSlabsDetails[0]["SlabSubBucketType"]);
            var BucketSchemeType = parseInt(arrSlabsDetails[0]["BucketSchemeType"]);
            var schSlabSubBucketValue = parseFloat(arrSlabsDetails[0]["SlabSubBucketValue"]);
            var schSubBucketValType = parseInt(arrSlabsDetails[0]["SubBucketValType"]);
            var schSubBucketValTypeGreaterThanOne = schSlabSubBucketType;
            //var arrSubBucketDetails = jQuery.grep(SchemeDetailByStore[0].Table3, function (element, index) {
            //    return (element.SchemeID == schId && element.SchemeSlabID == schSlabId);
            //});
            var schSlbBuckId = 1;
            var schSlbBuckCnt = 0;


            //schSlabSubBucketType
            //1. Product Quantity
            //2. Invoice Value
            //3. Product Lines
            //4. Product Value
            //5. Product Volume



            var arrDuplicateSKUCheck = [];

            arrSchemeSlabachievement_Temp = jQuery.grep(arrSchemeSlabachievement_Temp, function (element, index) {
                return ((element.SchemeId == schId) == false);
            });


            if (schSlabSubBucketType == 4 || schSlabSubBucketType == 2 || schSlabSubBucketType == 1)//4. Product Value
            {
                var totalOderProductsRatesAgainstRowId = 0.00;
                var arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                    return (element.RowID == schSlbSubRowID);
                });
                if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                    var cntTotPrd = 0;
                    var SubBucketValid = true; var flgIndividualSubBucketValid = false;
                    var trPrdctOdrQty = $("#tblSchemeCalculationSKUs1 tr[flgdata=1]");
                    for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < trPrdctOdrQty.length; cntProdcutsRowIdCnt++) {
                        var oderQtyOnProd = 0;
                        var PId = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("skunodeid");
                        var OldQty = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("td.clsOldQ").text();
                        var OrderQuantity = parseFloat(trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("input:text").val() == "" ? 0 : trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("input:text").val());
                        var qty = parseInt(OldQty) + parseInt(OrderQuantity);
                        qty = parseInt(qty) == 0 ? 1 : qty;
                        var ProExist = jQuery.grep(arrProductIDMappedInSchSlbSubBukRowId, function (element, index) {
                            return (element.ProductID == PId);
                        });
                        if (ProExist.length > 0) {
                            if ($.inArray(PId, arrDuplicateSKUCheck) == -1) {
                                cntTotPrd++;
                                arrDuplicateSKUCheck.push(PId);
                                oderQtyOnProd = parseInt(qty);
                                arrStoreProductAppliedSchemesBenifitsRecords_Temp = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords_Temp, function (element, index) {
                                    return ((element.ProductID == PId && element.SchTypeId == 3) == false);
                                });
                                var flgPriceChange = 0;// $(trPrdctOdrQty[cntProdcutsRowIdCnt]).data("flgbatchpricechange") == undefined ? 0 : $(trPrdctOdrQty[cntProdcutsRowIdCnt]).data("flgbatchpricechange");
                                var oderRateOfCurrentMapedProduct = 0.00;
                                var ProductID = PId;
                                var flgQuoteApplied = 0;// $(trPrdctOdrQty[cntProdcutsRowIdCnt]).is("[flgQuoteApplied]") ? 1 : 0;
                                flgIndividualSubBucketValid = true;
                                var prodRate = parseFloat($(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("standardratebeforetax"));
                                oderRateOfCurrentMapedProduct = prodRate * oderQtyOnProd;
                                totalOderProductsRatesAgainstRowId = totalOderProductsRatesAgainstRowId + oderRateOfCurrentMapedProduct;
                            }
                        }
                        //if (cntTotPrd == arrProductIDMappedInSchSlbSubBukRowId.length) {
                        //    break;
                        //}
                    }


                    //if (parseFloat(totalOderProductsRatesAgainstRowId1) >= parseFloat(schSlabSubBucketValue)) {
                    schSlbBuckCnt++;
                    chkBuckConditons = true;
                    //if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                    TotalVolumeQtyValueInSlab += parseFloat(totalOderProductsRatesAgainstRowId);
                    arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^0^0^" + 0 + "^" + schSlbSubRowID + "^2^0^0"]);
                    //}
                    //}

                }

                SlabTypeDesc += SlabTypeDesc != "" ? " & Buy " + schSlabSubBucketValue + " Rs" : "Buy " + schSlabSubBucketValue + " Rs";
                var Requiredbalance = 0;// parseFloat(schSlabSubBucketValue) - parseFloat(totalOderProductsRatesAgainstRowId);
                Requiredbalance = Requiredbalance < 0 ? 0 : Requiredbalance;
                SlabTypePer += 100;
                SlabTypeRequiredDesc += SlabTypeRequiredDesc != "" ? " & Buy " + parseFloat(Requiredbalance).toFixed(0) + " Rs" : "Buy " + parseFloat(Requiredbalance).toFixed(0) + " Rs";
            }

            SlabTypePer = 100;
            arrSchemeSlabachievement_Temp.push({ SlabId: schSlabId, SchemeId: schId, SlabTypeDesc: SlabTypeDesc, SlabTypeRequiredDesc: SlabTypeRequiredDesc, SlabTypePer: SlabTypePer });

            arredtboc_OderQuantityFinalSchemesToApply.push(arrMaintainDetailsOfBucketConditionsAgainstBuckId[0] + "|" + TotalVolumeQtyValueInSlab + "|" + TotalVolumeQtyValueInSlab);
            $(sender).html("Remove");
            //console.log("TotalVolumeQtyValueInSlab:"+TotalVolumeQtyValueInSlab)
            if (arredtboc_OderQuantityFinalSchemesToApply.length > 0) {
                fnAssignSchemeIDsAppliedOverProductAfterValueChange_Temp(0, "", 0);
                fnFinalTotol_Temp(3);
            }
        }
        else {

            arrStoreProductAppliedSchemesBenifitsRecords_Temp = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords_Temp, function (element, index) {
                return ((element.schemeId == schId) == false);
            });

            var $inputs = $("#tblSchemeCalculationSKUs1 input:text");
            for (var i = 0; i < $inputs.length; i++) {

                var CurrentQty = $inputs.eq(i).closest("tr").find("td.clsOldQ").text();
                var skunodeid = $inputs.eq(i).closest("tr").attr("skunodeid");
                var AdditionalQty = $inputs.eq(i).val();
                AdditionalQty = AdditionalQty == "" ? 0 : AdditionalQty;
                var TotQty = parseInt(AdditionalQty) + parseInt(CurrentQty);

                if (TotQty == 0) {
                    continue;
                }
                fnCalculateData_Temp($inputs.eq(i), 1);
            }
            //$(sender).html("Apply");
            fnFinalTotol_Temp(1);
        }


        $(sender).removeClass("ui-autocomplete-loading");
    }, 500);

}
function fnGetDistinctSchIdsAgainstStoreProduct_Temp(storeID, schId) {
    //Cursor cursor = db.rawQuery("SELECT BenSubBucketType,FreeProductID,BenifitAssignedValue,BenifitDiscountApplied,IFNULL(BenifitCouponCode,0),schId,schSlbRowId,SchTypeId,ProductID FROM tblStoreProductAppliedSchemesBenifitsRecords WHERE StoreID ='"+ StoreID + "' and  schId="+schId+" and BenSubBucketType in(1,5,2,6,3,7,10)", null);
    var cursor = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords_Temp, function (element, index) {
        return (element.storeID == storeID && element.schemeId == schId && (element.benSubBucketType == 1 || element.benSubBucketType == 2 || element.benSubBucketType == 3 || element.benSubBucketType == 5 || element.benSubBucketType == 6 || element.benSubBucketType == 7 || element.benSubBucketType == 8 || element.benSubBucketType == 9 || element.benSubBucketType == 10));
    });
    var chkI = new Array();
    if (cursor.length > 0) {
        for (var i in cursor) {
            //if (cursor.getString(0) != null && cursor.getString(1) != null && cursor.getString(2) != null && cursor.getString(3) != null) {
            if (cursor[i].benSubBucketType != null && cursor[i].freeProductId != null && cursor[i].benifitSubBucketValue != null && cursor[i].benifitDiscountApplied != null)
                //  chk.push(cursor.getString(0) + "^" + cursor.getString(1) + "^" + cursor.getString(2) + "^" + cursor.getString(3) + "^" + cursor.getString(4) + "^" + cursor.getString(5) + "^" + cursor.getString(6) + "^" + cursor.getString(7) + "^" + cursor.getString(8);
                chkI.push(cursor[i].benSubBucketType + "^" + cursor[i].freeProductId + "^" + cursor[i].benifitSubBucketValue + "^" + cursor[i].benifitDiscountApplied + "^" + cursor[i].benifitCoupnCode + "^" + cursor[i].schemeId + "^" + cursor[i].schSlbRowId + "^" + cursor[i].SchTypeId + "^" + cursor[i].ProductID + "^" + cursor[i].schemeSlabId);
        }
    }
    return chkI;
}

function fectStatusIfBeniftRowIdExistsInSchemeSlabBenefitsValueDetail_Temp(BenifitRowID, toMultiply, defaultValue, BenSubBucketType) {
    var cursor2 = jQuery.grep(SchemeDetailByStore[0].Table7, function (element, index) {
        return (element.RowID == BenifitRowID);
    });

    if (BenSubBucketType == 2 || BenSubBucketType == 6 || BenSubBucketType == 8) {
        toMultiply = 1;
    }
    var chkI;


    chkI = new Array();
    chkI.push(cursor2[0].Column1);

    return chkI;
}



function fnDeletePreviousEntriesSchemeIDsAppliedOverProductAfterValueChange_Temp(SchIdsCompleteSchemeIdListOnPrdID, prdID, tblCurrentTR) {
    var arrSchIdsListOnProductID = SchIdsCompleteSchemeIdListOnPrdID != "" ? SchIdsCompleteSchemeIdListOnPrdID.split("#") : [];
    var AllProductInSchSlab = [];
    arrStoreProductAppliedSchemesBenifitsRecords_Temp = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords_Temp, function (element, index) {
        return ((element.ProductID == prdID && element.SchTypeId == 3) == false);
    });
    for (var pSchIdsAppliCount = 0; pSchIdsAppliCount < arrSchIdsListOnProductID.length; pSchIdsAppliCount++) {
        var schOverviewDetails = arrSchIdsListOnProductID[pSchIdsAppliCount].split("!")[0];
        var schId = parseInt(schOverviewDetails.split("_")[0]);
        var schmTypeId = parseInt(schOverviewDetails.split("_")[3]);
        var storeID = $("#hdnStoreID").val();

        if (schmTypeId == 3) {
            arrStoreProductAppliedSchemesBenifitsRecords_Temp = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords_Temp, function (element, index) {
                return ((element.storeID == storeID && element.ProductID == prdID && element.schemeId == schId) == false);
            });
        } else {
            var arrSchmesRelatedToProject = fnGetDistinctSchIdsAgainstStoreProduct_Temp(storeID, schId);
            if (arrSchmesRelatedToProject.length > 0) {

                for (var i = 0; i < arrSchmesRelatedToProject.length; i++) {
                    if (arrSchmesRelatedToProject[i] != null) {
                        var schSlbId = parseInt(arrSchmesRelatedToProject[i].split("^")[9]);
                        AllProductInSchSlab = fnGetProductsSchIdSlabRow_Temp(storeID, schSlbId);
                        break;
                    }
                }
            }
            arrStoreProductAppliedSchemesBenifitsRecords_Temp = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords_Temp, function (element, index) {
                return (element.storeID == storeID && element.schemeId != schId);
            });
        }
    }

    fnCheckNewSchemeIDsAppliedAfterValueChange_Temp(SchIdsCompleteSchemeIdListOnPrdID, prdID, tblCurrentTR, 1);
}
function fnCheckNewSchemeIDsAppliedAfterValueChange_Temp(SchIdsCompleteListOnProductID, prdID, tblCurrentTR, flgAddOnScheme) {
    arredtboc_OderQuantityFinalSchemesToApply = new Array();
    var arrSchIdsListOnProductID = SchIdsCompleteListOnProductID != "" ? SchIdsCompleteListOnProductID.split("#") : [];
    debugger;
    var chkBuckConditons = false;
    var PrdForAddOnScheme = "";
    var SchemeForAddOnBenefit = "";

    for (var pSchIdsAppliCount = 0; pSchIdsAppliCount < arrSchIdsListOnProductID.length; pSchIdsAppliCount++) {
        var schOverviewDetails = arrSchIdsListOnProductID[pSchIdsAppliCount].split("!")[0];
        var schOverviewOtherDetails = arrSchIdsListOnProductID[pSchIdsAppliCount].split("!")[1];
        var schId = parseInt(schOverviewDetails.split("_")[0]);
        var schAppRule = parseInt(schOverviewDetails.split("_")[1]);
        var schApplicationId = parseInt(schOverviewDetails.split("_")[2]);
        var SchTypeId = parseInt(schOverviewDetails.split("_")[3]);//3=Simple with Check on Individual SKU, 1=Check Combined Skus, 2=Bundle
        var IsPayoutFixed = 0;// parseInt(schOverviewDetails.split("_")[4]);
        var arrschSlbIDsOnSchIdBasis = schOverviewOtherDetails.split("@");
        var exitWhenSlabToExit = 0;
        var flgSchemeExistAgainStore = jQuery.grep(SchemeDetailByStore[0].Table, function (element, index) {
            return (element.SchemeID == schId);
        });
        if (flgSchemeExistAgainStore.length > 0) {

            for (var pSchSlbCount = 0; pSchSlbCount < arrschSlbIDsOnSchIdBasis.length; pSchSlbCount++) {
                var schSlabId = parseInt(arrschSlbIDsOnSchIdBasis[pSchSlbCount].split("$")[0]);
                var schPrdSlabBuckets = arrschSlbIDsOnSchIdBasis[pSchSlbCount].split("$")[1];
                //int slbBenBuckID=Integer.parseInt(schSlabOtherDetails.split(Pattern.quote("^"))[0]);
                var arrSchSlabBuckWiseDetails = jQuery.grep(SchemeDetailByStore[0].Table10, function (element, index) {
                    return (element.SchemeSlabID == schSlabId);
                });


                arrSchemeSlabachievement_Temp = jQuery.grep(arrSchemeSlabachievement_Temp, function (element, index) {
                    return ((element.SlabId == schSlabId && element.SchemeId == schId) == false);
                });

                // var arrSchSlabBuckWiseDetails = schSlabOtherDetails.split("~");
                for (var pSchSlbBuckCnt in arrSchSlabBuckWiseDetails) {
                    var schSlbBuckId = parseInt(arrSchSlabBuckWiseDetails[pSchSlbBuckCnt]["BucketId"]);

                    var arrSubBucketDetails = jQuery.grep(SchemeDetailByStore[0].Table3, function (element, index) {
                        return (element.BucketID == schSlbBuckId && element.SchemeSlabID == schSlabId);
                    });

                    var schSlbBuckCnt = 0;
                    var arrMaintainDetailsOfBucketConditionsAgainstBuckId = new Array();
                    var TotalVolumeQtyValueInSlab = 0;
                    var UniqueSKu = [];
                    var arrUniqueProduct = [];
                    var TotalValueInSlab = 0;
                    var SlabTypeDesc = "";
                    var SlabTypeRequiredDesc = "";
                    var SlabTypePer = 0;
                    for (var cntSubBucket in arrSubBucketDetails) {
                        var schSlbSubBuckID = parseInt(arrSubBucketDetails[cntSubBucket]["SubBucketID"]);
                        var schSlbSubRowID = parseInt(arrSubBucketDetails[cntSubBucket]["RowID"]);
                        var schSlabSubBucketType = parseInt(arrSubBucketDetails[cntSubBucket]["SlabSubBucketType"]);
                        var BucketSchemeType = parseInt(arrSubBucketDetails[cntSubBucket]["BucketSchemeType"]);
                        //schSlabSubBucketType
                        //1. Product Quantity
                        //2. Invoice Value
                        //3. Product Lines
                        //4. Product Value
                        //5. Product Volume
                        var schSlabSubBucketValue = parseFloat(arrSubBucketDetails[cntSubBucket]["SlabSubBucketValue"]);
                        var schSubBucketValType = parseInt(arrSubBucketDetails[cntSubBucket]["SubBucketValType"]);
                        var schSubBucketValTypeGreaterThanOne = schSlabSubBucketType;

                        if (SchTypeId == 3) {

                            if (schSlabSubBucketType == 1)//1. Product Quantity
                            {

                                var totalOderQtyProductsAgainstRowId = 0;
                                var oderQtyOnProd = 0;
                                var trPrdctOdrQty = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][skunodeid=" + prdID + "]");
                                if (trPrdctOdrQty.length > 0) {
                                    var OldQty = trPrdctOdrQty.eq(0).find("td.clsOldQ").text();
                                    var OrderQuantity = parseFloat(trPrdctOdrQty.eq(0).find("input:text").val() == "" ? 0 : trPrdctOdrQty.eq(0).find("input:text").val());
                                    var val = parseInt(OldQty) + parseInt(OrderQuantity);

                                    oderQtyOnProd = val;
                                    //TotalVolumeQtyValueInSlab = val;

                                    var prodRate = parseFloat($(trPrdctOdrQty).attr("standardratebeforetax"));
                                    var flgQuoteApplied = 0;// $(trPrdctOdrQty).is("[flgQuoteApplied]") ? 1 : 0;
                                    var oderRateOfCurrentMapedProduct = 0;
                                    var flgPriceChange = 0;// $(trPrdctOdrQty).data("flgbatchpricechange") == undefined ? 0 : $(trPrdctOdrQty).data("flgbatchpricechange");

                                    var oderRateOfCurrentMapedProduct = prodRate * oderQtyOnProd;

                                    var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                        return (element.ProductID == prdID);
                                    });
                                    if (UniqueSKu.length == 0) {
                                        arrUniqueProduct.push({ ProductID: prdID });
                                        TotalVolumeQtyValueInSlab += parseFloat(oderRateOfCurrentMapedProduct);
                                    }

                                    TotalValueInSlab = parseFloat(TotalValueInSlab) + parseFloat(oderRateOfCurrentMapedProduct);
                                }
                                totalOderQtyProductsAgainstRowId = totalOderQtyProductsAgainstRowId + oderQtyOnProd;
                                if (totalOderQtyProductsAgainstRowId >= parseInt(schSlabSubBucketValue)) {
                                    schSlbBuckCnt++;
                                    var freeQtyofProducts = 0;
                                    var valofFQty = (parseFloat(("" + totalOderQtyProductsAgainstRowId).trim()) / parseFloat(("" + schSlabSubBucketValue).trim()));
                                    var valForFreeQTYToMultiply = Math.abs(valofFQty);
                                    chkBuckConditons = true;
                                    //if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                    arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSubBucketValTypeGreaterThanOne + "^" + prdID + "^" + valForFreeQTYToMultiply + "^" + schSlbSubRowID + "^" + SchTypeId + "^" + totalOderQtyProductsAgainstRowId + "^0"]);
                                    //}
                                }
                                else {
                                    chkBuckConditons = false;
                                    break;
                                }
                            }
                            if (schSlabSubBucketType == 3)//3. Product Lines
                            {

                            }
                            if (schSlabSubBucketType == 4)//4. Product Value
                            {
                                var totalOderProductsRatesAgainstRowId = 0.00;

                                var oderQtyOnProd = 0;
                                var trPrdctOdrQty = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][skunodeid=" + prdID + "]");
                                var flgPriceChange = 0;// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + prdID + "]").data("flgbatchpricechange") == undefined ? 0 : $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + prdID + "]").data("flgbatchpricechange");
                                if (trPrdctOdrQty.length > 0) {
                                    var OldQty = trPrdctOdrQty.eq(0).find("td.clsOldQ").text();
                                    var OrderQuantity = parseFloat(trPrdctOdrQty.eq(0).find("input:text").val() == "" ? 0 : trPrdctOdrQty.eq(0).find("input:text").val());
                                    oderQtyOnProd = parseInt(OldQty) + parseInt(OrderQuantity);

                                    var prodRate = parseFloat($(trPrdctOdrQty).attr("standardratebeforetax"));
                                    var flgQuoteApplied = 0;// $(trPrdctOdrQty).is("[flgQuoteApplied]") ? 1 : 0;

                                    var oderRateOfCurrentMapedProduct = prodRate * oderQtyOnProd;

                                    TotalValueInSlab = parseFloat(TotalValueInSlab) + parseFloat((prodRate * oderQtyOnProd));
                                    totalOderProductsRatesAgainstRowId = totalOderProductsRatesAgainstRowId + oderRateOfCurrentMapedProduct;
                                    var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                        return (element.ProductID == prdID);
                                    });
                                    if (UniqueSKu.length == 0) {
                                        arrUniqueProduct.push({ ProductID: prdID });
                                        TotalVolumeQtyValueInSlab += parseFloat(oderRateOfCurrentMapedProduct);
                                    }
                                }

                                if (parseFloat(totalOderProductsRatesAgainstRowId) >= parseFloat(schSlabSubBucketValue)) {
                                    schSlbBuckCnt++;
                                    chkBuckConditons = true;
                                    // if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                    arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSubBucketValTypeGreaterThanOne + "^" + prdID + "^" + 0 + "^" + schSlbSubRowID + "^" + SchTypeId + "^" + totalOderProductsRatesAgainstRowId + "^0"]);
                                    // }
                                }
                                else {
                                    chkBuckConditons = false;
                                    break;
                                }

                            }
                            if (schSlabSubBucketType == 5)//5. Product Volume
                            {
                                var totalOderVolumeProductsAgainstRowId = 0.00;
                                var oderQtyOnProd = 0;
                                var trPrdctOdrQty = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][skunodeid=" + prdID + "]");
                                var flgPriceChange = 0;// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + prdID + "]").data("flgbatchpricechange") == undefined ? 0 : $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + prdID + "]").data("flgbatchpricechange");
                                if (trPrdctOdrQty.length > 0) {

                                    var OldQty = trPrdctOdrQty.eq(0).find("td.clsOldQ").text();
                                    var OrderQuantity = parseFloat(trPrdctOdrQty.eq(0).find("input:text").val() == "" ? 0 : trPrdctOdrQty.eq(0).find("input:text").val());
                                    oderQtyOnProd = parseInt(OldQty) + parseInt(OrderQuantity);
                                    var prodRate = parseFloat($(trPrdctOdrQty).attr("standardratebeforetax"));
                                    var prodVolume = parseFloat($(trPrdctOdrQty).attr("grammage"));
                                    var oderVolumeOfCurrentMapedProduct = (parseFloat(prodVolume) * 1000) * parseInt(oderQtyOnProd);
                                    totalOderVolumeProductsAgainstRowId = totalOderVolumeProductsAgainstRowId + oderVolumeOfCurrentMapedProduct;
                                    // TotalVolumeQtyValueInSlab = parseFloat(totalOderVolumeProductsAgainstRowId);
                                    var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                        return (element.ProductID == prdID);
                                    });
                                    if (UniqueSKu.length == 0) {
                                        arrUniqueProduct.push({ ProductID: prdID });
                                        TotalVolumeQtyValueInSlab += parseFloat((prodRate * oderQtyOnProd));
                                    }


                                    TotalValueInSlab = parseFloat(TotalValueInSlab) + parseFloat((prodRate * oderQtyOnProd));
                                }

                                schSlabSubBucketValue = schSlabSubBucketValue * 1000;
                                if (totalOderVolumeProductsAgainstRowId >= schSlabSubBucketValue) {
                                    schSlbBuckCnt++;
                                    chkBuckConditons = true;
                                    var valofVolumeQty = (parseFloat(("" + totalOderVolumeProductsAgainstRowId).trim()) / parseFloat(("" + schSlabSubBucketValue).trim()));
                                    var valForVolumetQTYToMultiply = Math.abs(valofVolumeQty);
                                    // if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                    arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSubBucketValTypeGreaterThanOne + "^" + prdID + "^" + valForVolumetQTYToMultiply + "^" + schSlbSubRowID + "^" + SchTypeId + "^" + totalOderVolumeProductsAgainstRowId + "^0"]);
                                    // }
                                }
                                else {
                                    chkBuckConditons = false;
                                    break;
                                }
                            }
                        }
                        else {
                            var arrDuplicateSKUCheck = [];
                            if (schSlabSubBucketType == 1)//1. Product Quantity
                            {

                                // debugger;
                                var totalOderQtyProductsAgainstRowId = 0; var totalOderValueProductsAgainstRowId = 0;
                                var arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                    return (element.RowID == schSlbSubRowID);
                                });

                                if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                                    var SubBucketValid = true; var flgIndividualSubBucketValid = false;
                                    var cntTotPrd = 0;
                                    var trPrdctOdrQty = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][oqty!=0]");
                                    for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < trPrdctOdrQty.length; cntProdcutsRowIdCnt++) {
                                        var PId = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("skunodeid");
                                        var oderQtyOnProd = 0;
                                        var OldQty = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("td.clsOldQ").text();
                                        var OrderQuantity = parseFloat(trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("input:text").val() == "" ? 0 : trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("input:text").val());
                                        var qty = parseInt(OldQty) + parseInt(OrderQuantity);
                                        var ProExist = jQuery.grep(arrProductIDMappedInSchSlbSubBukRowId, function (element, index) {
                                            return (element.ProductID == PId);
                                        });
                                        if (ProExist.length > 0) {
                                            oderQtyOnProd = parseInt(qty);
                                            flgIndividualSubBucketValid = true;
                                            if ($.inArray(PId, arrDuplicateSKUCheck) == -1) {
                                                cntTotPrd++;
                                                arrDuplicateSKUCheck.push(PId);
                                                var prodRate = parseFloat($(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("standardratebeforetax"));
                                                var oderRateOfCurrentMapedProduct = prodRate * oderQtyOnProd;
                                                var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                                    return (element.ProductID == PId);
                                                });
                                                if (UniqueSKu.length == 0) {
                                                    arrUniqueProduct.push({ ProductID: PId });
                                                    TotalVolumeQtyValueInSlab += parseFloat(oderRateOfCurrentMapedProduct);
                                                }
                                                totalOderValueProductsAgainstRowId += parseFloat(prodRate * oderQtyOnProd);
                                                TotalValueInSlab = parseFloat(TotalValueInSlab) + parseFloat((prodRate * oderQtyOnProd));
                                                totalOderQtyProductsAgainstRowId = totalOderQtyProductsAgainstRowId + oderQtyOnProd;
                                                arrStoreProductAppliedSchemesBenifitsRecords_Temp = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords_Temp, function (element, index) {
                                                    return ((element.ProductID == PId && element.SchTypeId == 3) == false);
                                                });
                                            }
                                        }

                                        if (cntTotPrd == arrProductIDMappedInSchSlbSubBukRowId.length) {
                                            break;
                                        }
                                    }


                                    if (totalOderQtyProductsAgainstRowId >= parseInt(schSlabSubBucketValue)) {
                                        schSlbBuckCnt++;
                                        var freeQtyofProducts = 0;
                                        chkBuckConditons = true;
                                        var valofFQty = (parseFloat(("" + oderQtyOnProd).trim()) / parseFloat(("" + schSlabSubBucketValue).trim()));
                                        var valForFreeQTYToMultiply = Math.abs(valofFQty);
                                        //if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                        //TotalVolumeQtyValueInSlab += parseFloat(totalOderValueProductsAgainstRowId);
                                        //}
                                        arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSubBucketValTypeGreaterThanOne + "^" + prdID + "^" + valForFreeQTYToMultiply + "^" + schSlbSubRowID + "^" + SchTypeId + "^" + oderQtyOnProd + "^0"]);

                                    }
                                    //else {
                                    //    chkBuckConditons = false;
                                    //    break;
                                    //}
                                }
                                SlabTypeDesc += SlabTypeDesc != "" ? " & Buy " + schSlabSubBucketValue + " Pc" : "Buy " + schSlabSubBucketValue + " Pc";
                                var Requiredbalance = parseInt(schSlabSubBucketValue) - parseInt(totalOderQtyProductsAgainstRowId);
                                Requiredbalance = Requiredbalance < 0 ? 0 : Requiredbalance;
                                SlabTypePer += parseInt(schSlabSubBucketValue) <= parseInt(totalOderQtyProductsAgainstRowId) ? 100 : parseInt(parseInt(totalOderQtyProductsAgainstRowId) * 100 / parseInt(schSlabSubBucketValue));
                                SlabTypeRequiredDesc += SlabTypeRequiredDesc != "" ? " & Buy " + Requiredbalance + " Pc" : "Buy " + Requiredbalance + " Pc";
                            }
                            if (schSlabSubBucketType == 2)//2. Invoice Value
                            {
                                var totalOderProductsRatesAgainstRowId = 0.00;
                                var arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                    return (element.RowID == schSlbSubRowID);
                                });
                                if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                                    var cntTotPrd = 0;
                                    var SubBucketValid = true; var flgIndividualSubBucketValid = false;
                                    var trPrdctOdrQty = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][oqty!=0]");
                                    for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < trPrdctOdrQty.length; cntProdcutsRowIdCnt++) {
                                        var oderQtyOnProd = 0;
                                        var PId = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("skunodeid");
                                        var OldQty = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("td.clsOldQ").text();
                                        var OrderQuantity = parseFloat(trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("input:text").val() == "" ? 0 : trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("input:text").val());
                                        var qty = parseInt(OldQty) + parseInt(OrderQuantity);

                                        var ProExist = jQuery.grep(arrProductIDMappedInSchSlbSubBukRowId, function (element, index) {
                                            return (element.ProductID == PId);
                                        });
                                        if (ProExist.length > 0) {
                                            if ($.inArray(PId, arrDuplicateSKUCheck) == -1) {
                                                cntTotPrd++;
                                                arrDuplicateSKUCheck.push(PId);
                                                oderQtyOnProd = parseInt(qty);
                                                arrStoreProductAppliedSchemesBenifitsRecords_Temp = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords_Temp, function (element, index) {
                                                    return ((element.ProductID == PId && element.SchTypeId == 3) == false);
                                                });
                                                var flgPriceChange = 0;// $(trPrdctOdrQty[cntProdcutsRowIdCnt]).data("flgbatchpricechange") == undefined ? 0 : $(trPrdctOdrQty[cntProdcutsRowIdCnt]).data("flgbatchpricechange");
                                                var oderRateOfCurrentMapedProduct = 0.00;
                                                var ProductID = PId;
                                                var flgQuoteApplied = 0;// $(trPrdctOdrQty[cntProdcutsRowIdCnt]).is("[flgQuoteApplied]") ? 1 : 0;
                                                flgIndividualSubBucketValid = true;
                                                var prodRate = parseFloat($(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("standardratebeforetax"));
                                                oderRateOfCurrentMapedProduct = prodRate * oderQtyOnProd;
                                                var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                                    return (element.ProductID == PId);
                                                });
                                                if (UniqueSKu.length == 0) {
                                                    arrUniqueProduct.push({ ProductID: PId });
                                                    TotalVolumeQtyValueInSlab += parseFloat(oderRateOfCurrentMapedProduct);
                                                }
                                                TotalValueInSlab = parseFloat(TotalValueInSlab) + parseFloat((prodRate * oderQtyOnProd));
                                                totalOderProductsRatesAgainstRowId = totalOderProductsRatesAgainstRowId + oderRateOfCurrentMapedProduct;
                                            }
                                        }
                                        if (cntTotPrd == arrProductIDMappedInSchSlbSubBukRowId.length) {
                                            break;
                                        }
                                    }


                                    if (parseFloat(totalOderProductsRatesAgainstRowId) >= parseFloat(schSlabSubBucketValue)) {
                                        schSlbBuckCnt++;
                                        chkBuckConditons = true;
                                        //if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                        //TotalVolumeQtyValueInSlab += parseFloat(totalOderProductsRatesAgainstRowId);
                                        arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSubBucketValTypeGreaterThanOne + "^" + prdID + "^" + 0 + "^" + schSlbSubRowID + "^" + SchTypeId + "^" + oderRateOfCurrentMapedProduct + "^0"]);
                                        //}
                                    }
                                    //else {
                                    //    chkBuckConditons = false;
                                    //    break;
                                    //}

                                }
                                SlabTypeDesc += SlabTypeDesc != "" ? " & Buy " + schSlabSubBucketValue + " Rs" : "Buy " + schSlabSubBucketValue + " Rs";
                                var Requiredbalance = parseFloat(schSlabSubBucketValue) - parseFloat(totalOderProductsRatesAgainstRowId);
                                Requiredbalance = Requiredbalance < 0 ? 0 : Requiredbalance;
                                SlabTypePer += parseFloat(schSlabSubBucketValue) <= parseFloat(totalOderProductsRatesAgainstRowId) ? 100 : parseInt(parseFloat(totalOderProductsRatesAgainstRowId) * 100 / parseFloat(schSlabSubBucketValue));
                                SlabTypeRequiredDesc += SlabTypeRequiredDesc != "" ? " & Buy " + parseFloat(Requiredbalance).toFixed(0) + " Rs" : "Buy " + parseFloat(Requiredbalance).toFixed(0) + " Rs";
                            }
                            if (schSlabSubBucketType == 3)//3. Product Lines
                            {
                                var arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                    return (element.RowID == schSlbSubRowID);
                                });
                                var cntprd = 0;
                                if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                                    var chlIfProdHasAnyOrders = false;
                                    var cntTotPrd = 0;
                                    var trPrdctOdrQty = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][oqty!=0]");
                                    for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < trPrdctOdrQty.length; cntProdcutsRowIdCnt++) {
                                        var oderQtyOnProd = 0;
                                        var PId = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("skunodeid");
                                        var OldQty = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("td.clsOldQ").text();
                                        var OrderQuantity = parseFloat(trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("input:text").val() == "" ? 0 : trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("input:text").val());
                                        var qty = parseInt(OldQty) + parseInt(OrderQuantity);
                                        var ProExist = jQuery.grep(arrProductIDMappedInSchSlbSubBukRowId, function (element, index) {
                                            return (element.ProductID == PId);
                                        });

                                        var oderQtyOnProd = 0;
                                        if (ProExist.length > 0) {
                                            if ($.inArray(PId, arrDuplicateSKUCheck) == -1) {
                                                cntTotPrd++;
                                                arrDuplicateSKUCheck.push(PId);
                                                arrStoreProductAppliedSchemesBenifitsRecords_Temp = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords_Temp, function (element, index) {
                                                    return ((element.ProductID == PId && element.SchTypeId == 3) == false);
                                                });
                                                var QtyPerLine = ProExist[0].QtyPerLine;
                                                oderQtyOnProd = parseInt(qty);
                                                if (parseInt(oderQtyOnProd) >= parseInt(QtyPerLine)) {
                                                    chlIfProdHasAnyOrders = true;
                                                    var prodRate = parseFloat($(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("standardratebeforetax"));
                                                    TotalValueInSlab = parseFloat(TotalValueInSlab) + parseFloat((prodRate * oderQtyOnProd));
                                                    var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                                        return (element.ProductID == PId);
                                                    });
                                                    if (UniqueSKu.length == 0) {
                                                        arrUniqueProduct.push({ ProductID: PId });
                                                        TotalVolumeQtyValueInSlab += parseFloat((prodRate * oderQtyOnProd));
                                                    }

                                                    cntprd++;
                                                }
                                            }
                                        }
                                        if (cntTotPrd == arrProductIDMappedInSchSlbSubBukRowId.length) {
                                            break;
                                        }
                                    }

                                    if (cntprd >= schSlabSubBucketValue) {
                                        schSlbBuckCnt++;
                                        chkBuckConditons = true;
                                        // TotalVolumeQtyValueInSlab += parseInt(TotalValueInSlab);
                                        if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                            arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSlabSubBucketType + "^" + prdID + "^" + 0 + "^" + schSlbSubRowID + "^" + SchTypeId + "^0^1"]);
                                        }
                                    }
                                }
                                SlabTypeDesc += SlabTypeDesc != "" ? " & Buy " + schSlabSubBucketValue + " " : "Buy " + schSlabSubBucketValue + " ";
                                var Requiredbalance = parseInt(schSlabSubBucketValue) - parseInt(cntprd);
                                Requiredbalance = Requiredbalance < 0 ? 0 : Requiredbalance;
                                SlabTypePer += parseFloat(schSlabSubBucketValue) <= parseFloat(cntprd) ? 100 : parseInt(parseFloat(cntprd) * 100 / parseFloat(schSlabSubBucketValue));
                                SlabTypeRequiredDesc += SlabTypeRequiredDesc != "" ? " & Buy " + parseFloat(Requiredbalance).toFixed(0) + " " : "Buy " + parseFloat(Requiredbalance).toFixed(0) + " ";
                            }
                            if (schSlabSubBucketType == 4)//4. Product Value
                            {
                                var totalOderProductsRatesAgainstRowId = 0.00;
                                var arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                    return (element.RowID == schSlbSubRowID);
                                });
                                if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                                    var cntTotPrd = 0;
                                    var SubBucketValid = true; var flgIndividualSubBucketValid = false;
                                    var trPrdctOdrQty = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][oqty!=0]");
                                    for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < trPrdctOdrQty.length; cntProdcutsRowIdCnt++) {
                                        var oderQtyOnProd = 0;
                                        var PId = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("skunodeid");
                                        var OldQty = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("td.clsOldQ").text();
                                        var OrderQuantity = parseFloat(trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("input:text").val() == "" ? 0 : trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("input:text").val());
                                        var qty = parseInt(OldQty) + parseInt(OrderQuantity);
                                        var ProExist = jQuery.grep(arrProductIDMappedInSchSlbSubBukRowId, function (element, index) {
                                            return (element.ProductID == PId);
                                        });
                                        if (ProExist.length > 0) {
                                            if ($.inArray(PId, arrDuplicateSKUCheck) == -1) {
                                                cntTotPrd++;
                                                arrDuplicateSKUCheck.push(PId);
                                                oderQtyOnProd = parseInt(qty);
                                                arrStoreProductAppliedSchemesBenifitsRecords_Temp = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords_Temp, function (element, index) {
                                                    return ((element.ProductID == PId && element.SchTypeId == 3) == false);
                                                });
                                                var flgPriceChange = 0;// $(trPrdctOdrQty[cntProdcutsRowIdCnt]).data("flgbatchpricechange") == undefined ? 0 : $(trPrdctOdrQty[cntProdcutsRowIdCnt]).data("flgbatchpricechange");
                                                var oderRateOfCurrentMapedProduct = 0.00;
                                                var ProductID = PId;
                                                var flgQuoteApplied = 0;// $(trPrdctOdrQty[cntProdcutsRowIdCnt]).is("[flgQuoteApplied]") ? 1 : 0;
                                                flgIndividualSubBucketValid = true;
                                                var prodRate = parseFloat($(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("standardratebeforetax"));
                                                oderRateOfCurrentMapedProduct = prodRate * oderQtyOnProd;
                                                var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                                    return (element.ProductID == PId);
                                                });
                                                if (UniqueSKu.length == 0) {
                                                    arrUniqueProduct.push({ ProductID: PId });
                                                    TotalVolumeQtyValueInSlab += parseFloat(oderRateOfCurrentMapedProduct);
                                                }
                                                TotalValueInSlab = parseFloat(TotalValueInSlab) + parseFloat((prodRate * oderQtyOnProd));
                                                totalOderProductsRatesAgainstRowId = totalOderProductsRatesAgainstRowId + oderRateOfCurrentMapedProduct;
                                            }
                                        }
                                        if (cntTotPrd == arrProductIDMappedInSchSlbSubBukRowId.length) {
                                            break;
                                        }
                                    }


                                    if (parseFloat(totalOderProductsRatesAgainstRowId) >= parseFloat(schSlabSubBucketValue)) {
                                        schSlbBuckCnt++;
                                        chkBuckConditons = true;
                                        //if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                        //TotalVolumeQtyValueInSlab += parseFloat(totalOderProductsRatesAgainstRowId);
                                        arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSubBucketValTypeGreaterThanOne + "^" + prdID + "^" + 0 + "^" + schSlbSubRowID + "^" + SchTypeId + "^" + oderRateOfCurrentMapedProduct + "^0"]);
                                        //}
                                    }
                                    //else {
                                    //    chkBuckConditons = false;
                                    //    break;
                                    //}
                                }

                                SlabTypeDesc += SlabTypeDesc != "" ? " & Buy " + schSlabSubBucketValue + " Rs" : "Buy " + schSlabSubBucketValue + " Rs";
                                var Requiredbalance = parseFloat(schSlabSubBucketValue) - parseFloat(totalOderProductsRatesAgainstRowId);
                                Requiredbalance = Requiredbalance < 0 ? 0 : Requiredbalance;
                                SlabTypePer += parseFloat(schSlabSubBucketValue) <= parseFloat(totalOderProductsRatesAgainstRowId) ? 100 : parseInt(parseFloat(totalOderProductsRatesAgainstRowId) * 100 / parseFloat(schSlabSubBucketValue));
                                SlabTypeRequiredDesc += SlabTypeRequiredDesc != "" ? " & Buy " + parseFloat(Requiredbalance).toFixed(0) + " Rs" : "Buy " + parseFloat(Requiredbalance).toFixed(0) + " Rs";
                            }
                            if (schSlabSubBucketType == 5)//5. Product Volume
                            {
                                schSlabSubBucketValue = schSlabSubBucketValue * 1000;
                                var totalOderVolumeProductsAgainstRowId = 0.00;
                                var arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                    return (element.RowID == schSlbSubRowID);
                                });

                                if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                                    var cntTotPrd = 0;
                                    var SubBucketValid = true; var flgIndividualSubBucketValid = false;
                                    var trPrdctOdrQty = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][oqty!=0]");
                                    for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < trPrdctOdrQty.length; cntProdcutsRowIdCnt++) {
                                        var oderQtyOnProd = 0;
                                        var PId = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("skunodeid");
                                        var OldQty = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("td.clsOldQ").text();
                                        var OrderQuantity = parseFloat(trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("input:text").val() == "" ? 0 : trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("input:text").val());
                                        var qty = parseInt(OldQty) + parseInt(OrderQuantity);
                                        var ProExist = jQuery.grep(arrProductIDMappedInSchSlbSubBukRowId, function (element, index) {
                                            return (element.ProductID == PId);
                                        });

                                        var oderQtyOnProd = 0;
                                        if (ProExist.length > 0) {
                                            if ($.inArray(PId, arrDuplicateSKUCheck) == -1) {
                                                cntTotPrd++;
                                                arrDuplicateSKUCheck.push(PId);
                                                flgIndividualSubBucketValid = true;
                                                arrStoreProductAppliedSchemesBenifitsRecords_Temp = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords_Temp, function (element, index) {
                                                    return ((element.ProductID == PId && element.SchTypeId == 3) == false);
                                                });
                                                oderQtyOnProd = parseInt(qty);
                                                var prodVolume = parseFloat($(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("grammage"));
                                                var oderVolumeOfCurrentMapedProduct = (parseFloat(prodVolume) * 1000) * parseInt(oderQtyOnProd);

                                                var prodRate = parseFloat($(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("standardratebeforetax"));

                                                var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                                    return (element.ProductID == PId);
                                                });
                                                if (UniqueSKu.length == 0) {
                                                    arrUniqueProduct.push({ ProductID: PId });
                                                    TotalVolumeQtyValueInSlab += parseFloat((prodRate * oderQtyOnProd));
                                                }

                                                TotalValueInSlab = parseFloat(TotalValueInSlab) + parseFloat((prodRate * oderQtyOnProd));

                                                totalOderVolumeProductsAgainstRowId = totalOderVolumeProductsAgainstRowId + oderVolumeOfCurrentMapedProduct;

                                            }
                                        }
                                        if (cntTotPrd == arrProductIDMappedInSchSlbSubBukRowId.length) {
                                            break;
                                        }
                                    }

                                    if (parseFloat(totalOderVolumeProductsAgainstRowId) >= parseFloat(schSlabSubBucketValue)) {
                                        schSlbBuckCnt++;
                                        chkBuckConditons = true;
                                        // if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                        //TotalVolumeQtyValueInSlab += parseFloat(TotalValueInSlab);
                                        var valofVolumeQty = (parseFloat(("" + oderVolumeOfCurrentMapedProduct).trim()) / parseFloat(("" + schSlabSubBucketValue).trim()));
                                        var valForVolumetQTYToMultiply = Math.abs(valofVolumeQty);
                                        arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSubBucketValTypeGreaterThanOne + "^" + prdID + "^" + valForVolumetQTYToMultiply + "^" + schSlbSubRowID + "^" + SchTypeId + "^" + oderVolumeOfCurrentMapedProduct + "^0"]);
                                        // }
                                    }
                                }
                            }
                        }
                    }
                    SlabTypePer = parseInt(SlabTypePer / arrSubBucketDetails.length);
                    arrSchemeSlabachievement_Temp.push({ SlabId: schSlabId, SchemeId: schId, SlabTypeDesc: SlabTypeDesc, SlabTypeRequiredDesc: SlabTypeRequiredDesc, SlabTypePer: SlabTypePer });
                    //mk

                    if (schSlbBuckCnt == (arrSubBucketDetails.length)) {
                        if (chkBuckConditons == true)//This checks if All Sub Bucket Conditions of Bucket is true
                        {
                            for (var cntNoOfTrueConditions = 0; cntNoOfTrueConditions < arrSubBucketDetails.length; cntNoOfTrueConditions++) {
                                arredtboc_OderQuantityFinalSchemesToApply.push(arrMaintainDetailsOfBucketConditionsAgainstBuckId[cntNoOfTrueConditions] + "|" + TotalVolumeQtyValueInSlab);
                                if ($.inArray(schSlbBuckId.toString(), schPrdSlabBuckets.split("^")) != -1) {
                                    exitWhenSlabToExit = 1;
                                }
                            }
                            break;
                        }
                    }
                }
                if (exitWhenSlabToExit == 1) {
                    break;
                }
            }
        }
    }
    if (flgAddOnScheme == 1) {
        if (arredtboc_OderQuantityFinalSchemesToApply.length > 0) {
            fnAssignSchemeIDsAppliedOverProductAfterValueChange_Temp(prdID, tblCurrentTR, 0);
        }
    }
}


function fnAssignSchemeIDsAppliedOverProductAfterValueChange_Temp(prdID, tblCurrentTR, flgAddOnScheme) {
    //debugger;
    var noAlrtHshMaptoSaveData = new Array();
    var noAlrtStringSchemeIdWthAllVal = new Array();
    var stringSchemeIdWthAllVal = new Array();
    var listArrayHashmapProduct = new Array();
    var listArrayFreePrdctQty = new Array();
    var arrProductIDMappedInSchSlbSubBukRowId = new Array();
    var arrUniqueProduct = [];
    if (arredtboc_OderQuantityFinalSchemesToApply.length > 0) {
        //console.log(JSON.stringify(arredtboc_OderQuantityFinalSchemesToApply))
        for (var cntNoOfTrueConditions = 0; cntNoOfTrueConditions < arredtboc_OderQuantityFinalSchemesToApply.length; cntNoOfTrueConditions++) {
            //schId+"^"+schSlabId+"^"+schSlbBuckId+"^"+schSlabSubBucketValue+"^"+schSubBucketValType
            //+"^"+schSlabSubBucketType+"^"+ProductIdOnClicked+"^"+valForFreeQTYToMultiply
            var strBenefitsSchemes = arredtboc_OderQuantityFinalSchemesToApply[cntNoOfTrueConditions].split("|")[0];
            var schId = parseInt(strBenefitsSchemes.split("^")[0]);
            var schSlabId = parseInt(strBenefitsSchemes.split("^")[1]);
            var schSlbBuckId = parseInt(strBenefitsSchemes.split("^")[2]);
            var schSlabSubBucketValue = (strBenefitsSchemes.split("^")[3]);
            var schSubBucketValType = parseInt(strBenefitsSchemes.split("^")[4]);
            var schSlabSubBucketType = parseInt(strBenefitsSchemes.split("^")[5]);
            var Pid = parseInt(strBenefitsSchemes.split("^"));
            //var sdfs = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords, function (element, index) {
            //     return (element.ProductID != Pid && element.schemeId != schId && element.schemeSlabId != schSlabId);
            // });
            var toMultiply = parseInt(strBenefitsSchemes.split("^")[7]);
            var schSlbSubRowID = parseInt(strBenefitsSchemes.split("^")[8]);
            var SchTypeId = parseInt(strBenefitsSchemes.split("^")[9]);
            var TotalWeightage = parseFloat(arredtboc_OderQuantityFinalSchemesToApply[cntNoOfTrueConditions].split("|")[1]);
            var TotalWeightageInvoiceTemp = arredtboc_OderQuantityFinalSchemesToApply[cntNoOfTrueConditions].split("|").length > 2 ? parseFloat(arredtboc_OderQuantityFinalSchemesToApply[cntNoOfTrueConditions].split("|")[2]) : 0;
            var flgAddOnScheme = parseInt(strBenefitsSchemes.split("^")[11]);
            var flgSchemeExistAgainStore = jQuery.grep(SchemeDetailByStore[0].Table, function (element, index) {
                return (element.SchemeID == schId);
            });

            if (flgSchemeExistAgainStore.length > 0) {

                var arrProductIDBenifitsListOnPurchase = jQuery.grep(SchemeDetailByStore[0].Table5, function (element, index) {
                    return (element.SchemeID == schId && element.SchemeSlabID == schSlabId);// & element.BucketID == schSlbBuckId
                });
                for (var productIDBenifitsListCnt in arrProductIDBenifitsListOnPurchase) {

                    var BenifitRowID = parseInt(arrProductIDBenifitsListOnPurchase[productIDBenifitsListCnt].RowID);
                    var BenSubBucketType = parseInt(arrProductIDBenifitsListOnPurchase[productIDBenifitsListCnt].BenSubBucketType);
                    var BenDiscApplied = parseInt(arrProductIDBenifitsListOnPurchase[productIDBenifitsListCnt].BenDiscApplied);

                    // MinValueQty of free product
                    var BenSubBucketValue = parseFloat(arrProductIDBenifitsListOnPurchase[productIDBenifitsListCnt].BenSubBucketValue);

                    var Per = parseFloat(arrProductIDBenifitsListOnPurchase[productIDBenifitsListCnt].Per);
                    var UOM = parseFloat(arrProductIDBenifitsListOnPurchase[productIDBenifitsListCnt].UOM);
                    var Prorata = parseFloat(arrProductIDBenifitsListOnPurchase[productIDBenifitsListCnt].Prorata);
                    var IsDiscountOnTotalAmount = parseInt(arrProductIDBenifitsListOnPurchase[productIDBenifitsListCnt].IsDiscountOnTotalAmount);
                    var Slab_Max_Limit = parseFloat(arrProductIDBenifitsListOnPurchase[productIDBenifitsListCnt].Slab_Max_Limit);
                    if (BenSubBucketType == 6) {
                        var TotSlabDiscountValue = parseFloat(TotalWeightage) * parseFloat(BenSubBucketValue) / 100;
                        if (parseFloat(TotSlabDiscountValue) > parseFloat(Slab_Max_Limit)) {
                            BenSubBucketValue = Slab_Max_Limit;
                            BenSubBucketType = 7;
                        }
                    }
                    else if (BenSubBucketType == 8) {
                        var TotSlabDiscountValue = parseFloat(TotalWeightageInvoiceTemp) > 0 ? parseFloat(TotalWeightageInvoiceTemp) * parseFloat(BenSubBucketValue) / 100 : parseFloat(TotalWeightage) * parseFloat(BenSubBucketValue) / 100;

                        //console.log("TotalVolumeQtyValueInSlab:" + TotalVolumeQtyValueInSlab)
                        if (parseFloat(TotalWeightageInvoiceTemp) > 0) {
                            if (parseFloat(TotSlabDiscountValue) > parseFloat(Slab_Max_Limit)) {
                                BenSubBucketValue = TotSlabDiscountValue;
                                BenSubBucketType = 9;
                            }
                        }
                        //console.log("TotalWeightageInvoiceTemp:" + TotalWeightageInvoiceTemp + "\nTotalWeightage:" + TotalWeightage + "\nTotSlabDiscountValue:" + TotSlabDiscountValue + "\nBenSubBucketType:" + BenSubBucketType + "\nSlab_Max_Limit:" + Slab_Max_Limit);
                        if (parseFloat(TotSlabDiscountValue) > parseFloat(Slab_Max_Limit)) {
                            BenSubBucketValue = Slab_Max_Limit;
                            BenSubBucketType = 9;
                        }
                    }
                    //BenSubBucketType
                    //1. Free Other Product =
                    //2. Discount in Percentage with other product
                    //3. Discount in Amount with other product
                    //4. Coupons
                    //5. Free Same Product
                    //6. Discount in Percentage with same product
                    //7. Discount in Amount with same product
                    //8. Percentage On Invoice
                    //9.  Amount On Invoice
                    //10. PerVolume Discount

                    if (BenSubBucketType == 1) //1. Free Other Product 	
                    {
                        var arrProductIDMappedInSchSlbSubBukBenifits = jQuery.grep(SchemeDetailByStore[0].Table6, function (element, index) {
                            return (element.RowID == BenifitRowID);
                        });
                        var arrrr = new Array();
                        arrrr.push(arrProductIDMappedInSchSlbSubBukBenifits[0]);
                        arrProductIDMappedInSchSlbSubBukBenifits = new Array();
                        arrProductIDMappedInSchSlbSubBukBenifits.push(arrrr[0]);

                        var strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail = fectStatusIfBeniftRowIdExistsInSchemeSlabBenefitsValueDetail_Temp(BenifitRowID, toMultiply, BenSubBucketValue, BenSubBucketType);

                        if (SchTypeId == 3) {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID && element.ProductID == prdID);
                            });
                        } else {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID);
                            });
                        }
                        var BenSubBucketAssingnedValue = BenSubBucketValue;
                        if (Prorata == 1) {
                            BenSubBucketValue = (parseFloat(TotalWeightage) * parseFloat(BenSubBucketValue)) / parseFloat(schSlabSubBucketValue);
                        }
                        BenSubBucketValue = parseInt(BenSubBucketValue);
                        alrtStopResult = false;
                        var strFreePrdList = "";
                        var arrProductIDMappedInSchSlbSubBukBenifitsForCalculation = new Array();
                        if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                            var flgAddOnBenefit = IsDiscountOnTotalAmount;
                            var cntTotPrd = 0;
                            for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < arrProductIDMappedInSchSlbSubBukRowId.length; cntProdcutsRowIdCnt++) {

                                var productid = arrProductIDMappedInSchSlbSubBukRowId[cntProdcutsRowIdCnt].ProductID;
                                var trPrdctOdrQty = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][skunodeid=" + productid + "]");
                                cntTotPrd++;


                                var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                    return (element.schId == schId && element.ProductID == productid);
                                });
                                if (UniqueSKu.length == 0) {
                                    arrUniqueProduct.push({ schId: schId, ProductID: productid });
                                    var OldQty = trPrdctOdrQty.eq(0).find("td.clsOldQ").text();
                                    var OrderQuantity = parseFloat(trPrdctOdrQty.eq(0).find("input:text").val() == "" ? 0 : trPrdctOdrQty.eq(0).find("input:text").val());
                                    var productNameValue = parseInt(OldQty) + parseInt(OrderQuantity);

                                    var noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                        BenSubBucketType + "~" + 0 + "~" + BenSubBucketValue + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                        0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit
                                    if (SchTypeId == 3) {
                                        var trOrderQty = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][skunodeid=" + prdID + "]");
                                        if (trOrderQty.length > 0) {
                                            var OldQty = trOrderQty.eq(0).find("td.clsOldQ").text();
                                            var OrderQuantity = parseFloat(trOrderQty.eq(0).find("input:text").val() == "" ? 0 : trOrderQty.eq(0).find("input:text").val());
                                            productNameValue = parseInt(OldQty) + parseInt(OrderQuantity);
                                        }

                                        var noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                            BenSubBucketType + "~" + 0 + "~" + BenSubBucketValue + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                            0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit

                                        var arr = new Array();
                                        arr = [{ productNameValue: 0, ProductID: prdID }];
                                        arrProductIDMappedInSchSlbSubBukBenifitsForCalculation.push(arr[0]);
                                        var arr = new Array();
                                        arr = [{ ProductID: prdID, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrProductIDMappedInSchSlbSubBukBenifits }];
                                        noAlrtHshMaptoSaveData.push(arr[0]);
                                        break;
                                    } else {

                                        var arr = new Array();
                                        arr = [{ productNameValue: 0, ProductID: productid }];
                                        arrProductIDMappedInSchSlbSubBukBenifitsForCalculation.push(arr[0]);
                                        var arr = new Array();
                                        arr = [{ ProductID: productid, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrProductIDMappedInSchSlbSubBukBenifits }];
                                        noAlrtHshMaptoSaveData.push(arr[0]);
                                    }
                                }
                            }
                            stringSchemeIdWthAllVal = new Array()
                            stringSchemeIdWthAllVal.push(noAlrtsubValues);

                            listArrayHashmapProduct.push(arrProductIDMappedInSchSlbSubBukBenifitsForCalculation);
                            listArrayFreePrdctQty.push(strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail);
                        }
                    }

                    if (BenSubBucketType == 2) //2. Discount in Percentage with other product 	
                    {
                        var arrProductIDMappedInSchSlbSubBukBenifits = jQuery.grep(SchemeDetailByStore[0].Table6, function (element, index) {
                            return (element.RowID == BenifitRowID);
                        });

                        if (SchTypeId == 3) {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID && element.ProductID == prdID);
                            });
                        } else {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID);
                            });
                        }


                        var arrProductIDMappedInSchSlbSubBukBenifitsForCalculation = new Array();
                        var strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail = fectStatusIfBeniftRowIdExistsInSchemeSlabBenefitsValueDetail(BenifitRowID, toMultiply, BenSubBucketValue, BenSubBucketType);
                        var BenSubBucketAssingnedValue = BenSubBucketValue;
                        alrtStopResult = false;
                        var noAlrtsubValues;


                        var flgAddOnBenefit = IsDiscountOnTotalAmount;

                        if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                            for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < arrProductIDMappedInSchSlbSubBukRowId.length; cntProdcutsRowIdCnt++) {
                                var trPrdctOdrQty = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][skunodeid=" + arrProductIDMappedInSchSlbSubBukRowId[cntProdcutsRowIdCnt].ProductID + "]");

                                var productid = arrProductIDMappedInSchSlbSubBukRowId[cntProdcutsRowIdCnt].ProductID;
                                var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                    return (element.schId == schId && element.ProductID == productid);
                                });
                                if (UniqueSKu.length == 0) {
                                    arrUniqueProduct.push({ schId: schId, ProductID: productid });
                                    var OldQty = trPrdctOdrQty.eq(0).find("td.clsOldQ").text();
                                    var OrderQuantity = parseFloat(trPrdctOdrQty.eq(0).find("input:text").val() == "" ? 0 : trPrdctOdrQty.eq(0).find("input:text").val());
                                    var productNameValue = parseInt(OldQty) + parseInt(OrderQuantity);
                                    noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                        BenSubBucketType + "~" + 0 + "~" + BenSubBucketValue + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                        0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit
                                    stringSchemeIdWthAllVal.push(noAlrtsubValues);
                                    if (SchTypeId == 3) {
                                        var trOrderQty = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][skunodeid=" + prdID + "]");
                                        if (trOrderQty.length > 0) {
                                            var OldQty = trOrderQty.eq(0).find("td.clsOldQ").text();
                                            var OrderQuantity = parseFloat(trOrderQty.eq(0).find("input:text").val() == "" ? 0 : trOrderQty.eq(0).find("input:text").val());
                                            productNameValue = parseInt(OldQty) + parseInt(OrderQuantity);
                                        }
                                        var arr = new Array();
                                        arr = [{ ProductID: prdID, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrProductIDMappedInSchSlbSubBukBenifits }];
                                        noAlrtHshMaptoSaveData.push(arr[0]);

                                        var noAlrtsubValues1 = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                            BenSubBucketType + "~" + 0 + "~" + 0 + "~" + 0 + "~" + 0 + "~" +
                                            0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit

                                        var arr = new Array();
                                        arr = [{ ProductID: prdID, stringSchemeIdWthAllVal: noAlrtsubValues1 }];
                                        arrProductIDMappedInSchSlbSubBukBenifitsForCalculation.push(arr[0]);
                                        break;
                                    }
                                    else {
                                        var arr = new Array();
                                        arr = [{ ProductID: productid, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrProductIDMappedInSchSlbSubBukBenifits }];
                                        noAlrtHshMaptoSaveData.push(arr[0]);

                                        var noAlrtsubValues1 = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                            BenSubBucketType + "~" + 0 + "~" + 0 + "~" + 0 + "~" + 0 + "~" +
                                            0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit

                                        var arr = new Array();
                                        arr = [{ ProductID: productid, stringSchemeIdWthAllVal: noAlrtsubValues1 }];
                                        arrProductIDMappedInSchSlbSubBukBenifitsForCalculation.push(arr[0]);
                                    }
                                }

                            }
                        }

                        listArrayHashmapProduct.push(arrProductIDMappedInSchSlbSubBukBenifitsForCalculation);
                        listArrayFreePrdctQty.push(strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail);
                    }
                    if (BenSubBucketType == 3) //3. Discount in Amount with other product 	
                    {
                        var arrProductIDMappedInSchSlbSubBukBenifits = jQuery.grep(SchemeDetailByStore[0].Table6, function (element, index) {
                            return (element.RowID == BenifitRowID);
                        });

                        if (SchTypeId == 3) {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID && element.ProductID == prdID);
                            });
                        } else {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID);
                            });
                        }

                        var arrProductIDMappedInSchSlbSubBukBenifitsForCalculation = new Array();
                        var strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail = fectStatusIfBeniftRowIdExistsInSchemeSlabBenefitsValueDetail_Temp(BenifitRowID, toMultiply, BenSubBucketValue, BenSubBucketType);
                        var BenSubBucketAssingnedValue = BenSubBucketValue;
                        alrtStopResult = false;


                        var flgAddOnBenefit = IsDiscountOnTotalAmount;
                        var noAlrtsubValues;
                        if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                            for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < arrProductIDMappedInSchSlbSubBukRowId.length; cntProdcutsRowIdCnt++) {
                                var trPrdctOdrQty = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][skunodeid=" + arrProductIDMappedInSchSlbSubBukRowId[cntProdcutsRowIdCnt].ProductID + "]");

                                var OldQty = trPrdctOdrQty.eq(0).find("td.clsOldQ").text();
                                var OrderQuantity = parseFloat(trPrdctOdrQty.eq(0).find("input:text").val() == "" ? 0 : trPrdctOdrQty.eq(0).find("input:text").val());
                                var productNameValue = parseInt(OldQty) + parseInt(OrderQuantity);

                                var productid = arrProductIDMappedInSchSlbSubBukRowId[cntProdcutsRowIdCnt].ProductID;
                                var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                    return (element.schId == schId && element.ProductID == productid);
                                });
                                if (UniqueSKu.length == 0) {
                                    arrUniqueProduct.push({ schId: schId, ProductID: productid });
                                    noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                        BenSubBucketType + "~" + 0 + "~" + BenSubBucketValue + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                        0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit
                                    stringSchemeIdWthAllVal.push(noAlrtsubValues);

                                    var arr = new Array();
                                    arr = [{ ProductID: productid, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrProductIDMappedInSchSlbSubBukBenifits }];
                                    noAlrtHshMaptoSaveData.push(arr[0]);

                                    var noAlrtsubValues1 = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                        BenSubBucketType + "~" + 0 + "~" + 0 + "~" + 0 + "~" + 0 + "~" +
                                        0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit

                                    var arr = new Array();
                                    arr = [{ ProductID: productid, stringSchemeIdWthAllVal: noAlrtsubValues1 }];
                                    arrProductIDMappedInSchSlbSubBukBenifitsForCalculation.push(arr[0]);
                                }
                            }
                        }

                        listArrayHashmapProduct.push(arrProductIDMappedInSchSlbSubBukBenifitsForCalculation);
                        listArrayFreePrdctQty.push(strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail);
                    }



                    if (BenSubBucketType == 5) //5. Free Same Product 	
                    {
                        var arrProductIDMappedInSchSlbSubBukBenifits = new Array();

                        var strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail = fectStatusIfBeniftRowIdExistsInSchemeSlabBenefitsValueDetail_Temp(BenifitRowID, toMultiply, BenSubBucketValue, BenSubBucketType);

                        alrtStopResult = false;

                        if (SchTypeId == 3) {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID && element.ProductID == prdID);
                            });
                        } else {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID);
                            });
                        }

                        var BenSubBucketAssingnedValue = BenSubBucketValue;
                        if (Prorata == 1) {
                            BenSubBucketValue = (parseFloat(TotalWeightage) * parseFloat(BenSubBucketValue)) / parseFloat(schSlabSubBucketValue);
                        }
                        BenSubBucketValue = parseInt(BenSubBucketValue);
                        var productNameValue = "";
                        var arr = new Array();
                        var strFreePrdList = "";

                        var flgAddOnBenefit = IsDiscountOnTotalAmount;

                        var arrProductIDMappedInSchSlbSubBukBenifitsForCalculation = new Array();
                        if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                            for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < arrProductIDMappedInSchSlbSubBukRowId.length; cntProdcutsRowIdCnt++) {
                                var trPrdctOdrQty = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][skunodeid=" + arrProductIDMappedInSchSlbSubBukRowId[cntProdcutsRowIdCnt].ProductID + "]");

                                var productid = arrProductIDMappedInSchSlbSubBukRowId[cntProdcutsRowIdCnt].ProductID;
                                var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                    return (element.schId == schId && element.ProductID == productid);
                                });
                                if (UniqueSKu.length == 0) {
                                    arrUniqueProduct.push({ schId: schId, ProductID: productid });


                                    var OldQty = trPrdctOdrQty.eq(0).find("td.clsOldQ").text();
                                    var OrderQuantity = parseFloat(trPrdctOdrQty.eq(0).find("input:text").val() == "" ? 0 : trPrdctOdrQty.eq(0).find("input:text").val());
                                    var productNameValue = parseInt(OldQty) + parseInt(OrderQuantity);

                                    var noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                        BenSubBucketType + "~" + 0 + "~" + BenSubBucketValue + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                        0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit;
                                    if (SchTypeId == 3) {

                                        var trOrderQty = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][skunodeid=" + prdID + "]");
                                        if (trOrderQty.length > 0) {
                                            var OldQty = trOrderQty.eq(0).find("td.clsOldQ").text();
                                            var OrderQuantity = parseFloat(trOrderQty.eq(0).find("input:text").val() == "" ? 0 : trOrderQty.eq(0).find("input:text").val());
                                            productNameValue = parseInt(OldQty) + parseInt(OrderQuantity);
                                        }
                                        var noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                            BenSubBucketType + "~" + 0 + "~" + BenSubBucketValue + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                            0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit;
                                        var arr = new Array();
                                        arr = [{ productNameValue: 0, ProductID: prdID }];
                                        arrProductIDMappedInSchSlbSubBukBenifitsForCalculation.push(arr[0]);
                                        arrProductIDMappedInSchSlbSubBukBenifits.push(arr[0]);
                                        var arr = new Array();
                                        arr = [{ ProductID: prdID, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrProductIDMappedInSchSlbSubBukBenifits }];
                                        noAlrtHshMaptoSaveData.push(arr[0]);
                                        break;
                                    }
                                    else {
                                        var productid = arrProductIDMappedInSchSlbSubBukRowId[cntProdcutsRowIdCnt].ProductID;
                                        var arr = new Array();
                                        arr = [{ productNameValue: 0, ProductID: productid }];
                                        arrProductIDMappedInSchSlbSubBukBenifitsForCalculation.push(arr[0]);
                                        if (arrProductIDMappedInSchSlbSubBukBenifits.length == 0) {
                                            arrProductIDMappedInSchSlbSubBukBenifits.push(arr[0]);
                                        }
                                        var arr = new Array();
                                        arr = [{ ProductID: productid, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrProductIDMappedInSchSlbSubBukBenifits }];
                                        noAlrtHshMaptoSaveData.push(arr[0]);

                                    }
                                }

                            }
                            stringSchemeIdWthAllVal = new Array()
                            stringSchemeIdWthAllVal.push(noAlrtsubValues);

                            listArrayHashmapProduct.push(arrProductIDMappedInSchSlbSubBukBenifitsForCalculation);
                            listArrayFreePrdctQty.push(strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail);
                        }
                    }

                    if (BenSubBucketType == 6) //6. Discount in Percentage with same product 	
                    {
                        var arrProductIDMappedInSchSlbSubBukBenifits = new Array();

                        var strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail = fectStatusIfBeniftRowIdExistsInSchemeSlabBenefitsValueDetail_Temp(BenifitRowID, toMultiply, BenSubBucketValue, BenSubBucketType);

                        alrtStopResult = false;
                        if (SchTypeId == 3) {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID && element.ProductID == prdID);
                            });
                        } else {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID);
                            });
                        }

                        var BenSubBucketAssingnedValue = BenSubBucketValue;

                        if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                            var cntTotPrd = 0;
                            var flgAddOnBenefit = IsDiscountOnTotalAmount;
                            var trPrdctOdrQty = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][oqty!=0]");

                            for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < trPrdctOdrQty.length; cntProdcutsRowIdCnt++) {
                                var PID = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("skunodeid");
                                var PrdExist = jQuery.grep(arrProductIDMappedInSchSlbSubBukRowId, function (element, index) {
                                    return (element.ProductID == PID);
                                });
                                // alert(PrdExist.length);
                                if (PrdExist.length > 0) {
                                    cntTotPrd++;
                                    var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                        return (element.schId == schId && element.ProductID == PID);
                                    });
                                    if (UniqueSKu.length == 0) {
                                        arrUniqueProduct.push({ schId: schId, ProductID: PID });

                                        var OldQty = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("td.clsOldQ").text();
                                        var OrderQuantity = parseFloat(trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("input:text").val() == "" ? 0 : trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("input:text").val());
                                        var productNameValue = parseInt(OldQty) + parseInt(OrderQuantity);
                                        // alert(productNameValue);
                                        var productid = PID;
                                        var arr = new Array();
                                        arr = [{ productNameValue: productNameValue, ProductID: productid }];
                                        arrProductIDMappedInSchSlbSubBukBenifits.push(arr[0]);
                                        var noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                            BenSubBucketType + "~" + 0 + "~" + BenSubBucketValue + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                            0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit;

                                        stringSchemeIdWthAllVal.push(noAlrtsubValues);
                                        if (SchTypeId == 3) {
                                            var trOrderQty = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][skunodeid=" + prdID + "]");
                                            if (trOrderQty.length > 0) {
                                                var OldQty = trOrderQty.eq(0).find("td.clsOldQ").text();
                                                var OrderQuantity = parseFloat(trOrderQty.eq(0).find("input:text").val() == "" ? 0 : trOrderQty.eq(0).find("input:text").val());
                                                productNameValue = parseInt(OldQty) + parseInt(OrderQuantity);
                                            }

                                            var noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                                BenSubBucketType + "~" + 0 + "~" + BenSubBucketValue + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                                0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit;
                                            var arr = new Array();
                                            arr = [{ productNameValue: 0, ProductID: prdID }];
                                            arrProductIDMappedInSchSlbSubBukBenifits.push(arr[0]);
                                            var arrBenifit = new Array();
                                            arrBenifit = [{ productNameValue: productNameValue, ProductID: prdID }]
                                            var arr = new Array();
                                            arr = [{ ProductID: prdID, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrBenifit }];
                                            noAlrtHshMaptoSaveData.push(arr[0]);
                                            break;
                                        }
                                        else {
                                            var arr = new Array();
                                            arr = [{ productNameValue: productNameValue, ProductID: productid }];
                                            arrProductIDMappedInSchSlbSubBukBenifits.push(arr[0]);
                                            var arrBenifit = new Array();
                                            arrBenifit = [{ productNameValue: productNameValue, ProductID: productid }]
                                            var arr = new Array();
                                            arr = [{ ProductID: productid, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrBenifit }];
                                            noAlrtHshMaptoSaveData.push(arr[0]);
                                        }
                                    }
                                }

                                //if (cntTotPrd == arrProductIDMappedInSchSlbSubBukRowId.length) {
                                //    break;
                                //}
                            }
                        }
                        listArrayHashmapProduct.push(arrProductIDMappedInSchSlbSubBukBenifits);
                        listArrayFreePrdctQty.push(strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail);
                    }

                    if (BenSubBucketType == 7) //7. Discount in Amount with same product 	
                    {
                        if (SchTypeId == 3) {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID && element.ProductID == prdID);
                            });
                        } else {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID);
                            });
                        }

                        var countProdPurchased = 0;
                        var TotalValueWeightage = 0.00;
                        var DiscountValue = 0.00;

                        var BenSubBucketAssingnedValue = BenSubBucketValue;
                        if (Prorata == 1) {
                            BenSubBucketValue = (parseFloat(TotalWeightage) * parseFloat(BenSubBucketValue)) / parseFloat(schSlabSubBucketValue);
                        }

                        var arrProductIDMappedInSchSlbSubBukBenifits = new Array();

                        var strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail = fectStatusIfBeniftRowIdExistsInSchemeSlabBenefitsValueDetail_Temp(BenifitRowID, toMultiply, BenSubBucketValue, BenSubBucketType);

                        var flgAddOnBenefit = IsDiscountOnTotalAmount;

                        alrtStopResult = false;
                        if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                            var cntTotPrd = 0;
                            var trPrdctOdrQty = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][oqty!=0]");
                            for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < trPrdctOdrQty.length; cntProdcutsRowIdCnt++) {
                                var PID = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("skunodeid");
                                var PrdExist = jQuery.grep(arrProductIDMappedInSchSlbSubBukRowId, function (element, index) {
                                    return (element.ProductID == PID);
                                });
                                if (PrdExist.length > 0) {
                                    cntTotPrd++;
                                    var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                        return (element.schId == schId && element.ProductID == PID);
                                    });
                                    if (UniqueSKu.length == 0) {
                                        arrUniqueProduct.push({ schId: schId, ProductID: PID });

                                        var OldQty = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("td.clsOldQ").text();
                                        var OrderQuantity = parseFloat(trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("input:text").val() == "" ? 0 : trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("input:text").val());
                                        var productNameValue = parseInt(OldQty) + parseInt(OrderQuantity);

                                        var productid = PID;

                                        var StandardRateBeforeTax = $(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("standardratebeforetax") == undefined ? 0 : $(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("standardratebeforetax");
                                        var StandardRate = $(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("standardratebeforetax") == undefined ? 0 : $(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("standardratebeforetax");
                                        var Grammage = $(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("grammage");
                                        var flgPriceChange = 0;// $(trPrdctOdrQty[0]).data("flgbatchpricechange") ? 0 : $(trPrdctOdrQty[0]).data("flgbatchpricechange");
                                        var flgQuoteApplied = 0;// $(trPrdctOdrQty[0]).is("[flgQuoteApplied]") ? 1 : 0;
                                        var ValBeforeTax = 0.00;

                                        var DiscountedVal = 0;
                                        if (schSlabSubBucketType == 5) {
                                            var TotalIndivisualWeight = parseFloat(Grammage) * 1000 * parseInt(productNameValue);
                                            DiscountedVal = (parseFloat(TotalIndivisualWeight) * parseFloat(BenSubBucketValue)) / parseFloat(TotalWeightage);
                                        }
                                        else {
                                            var TotalIndivisualWeight = parseFloat(StandardRate) * parseInt(productNameValue);
                                            DiscountedVal = (parseFloat(TotalIndivisualWeight) * parseFloat(BenSubBucketValue)) / parseFloat(TotalWeightage);
                                        }


                                        var noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                            BenSubBucketType + "~" + 0 + "~" + DiscountedVal + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                            0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit;
                                        stringSchemeIdWthAllVal.push(noAlrtsubValues);
                                        if (SchTypeId == 3) {
                                            var trOrderQty = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][skunodeid=" + prdID + "]");
                                            if (trOrderQty.length > 0) {
                                                var OldQty = trOrderQty.eq(0).find("td.clsOldQ").text();
                                                var OrderQuantity = parseFloat(trOrderQty.eq(0).find("input:text").val() == "" ? 0 : trOrderQty.eq(0).find("input:text").val());
                                                productNameValue = parseInt(OldQty) + parseInt(OrderQuantity);
                                            }

                                            var noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                                BenSubBucketType + "~" + 0 + "~" + DiscountedVal + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                                0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit;
                                            var arr = new Array();
                                            arr = [{ productNameValue: 0, ProductID: prdID }];
                                            arrProductIDMappedInSchSlbSubBukBenifits.push(arr[0]);
                                            var arrBenifit = new Array();
                                            arrBenifit = [{ productNameValue: 0, ProductID: prdID }]
                                            var arr = new Array();
                                            arr = [{ ProductID: prdID, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrBenifit }];
                                            noAlrtHshMaptoSaveData.push(arr[0]);
                                            break;
                                        }
                                        else {
                                            var arr = new Array();
                                            arr = [{ productNameValue: productNameValue, ProductID: productid }];
                                            arrProductIDMappedInSchSlbSubBukBenifits.push(arr[0]);
                                            var arrBenifit = new Array();
                                            arrBenifit = [{ productNameValue: productNameValue, ProductID: productid }]
                                            var arr = new Array();
                                            arr = [{ ProductID: productid, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrBenifit }];
                                            noAlrtHshMaptoSaveData.push(arr[0]);
                                        }
                                    }

                                }
                                //if (cntTotPrd == arrProductIDMappedInSchSlbSubBukRowId.length) {
                                //    break;
                                //}
                            }
                            listArrayHashmapProduct.push(arrProductIDMappedInSchSlbSubBukBenifits);
                            listArrayFreePrdctQty.push(strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail);
                        }

                    }

                    if (BenSubBucketType == 8 || BenSubBucketType == 9) //8. Percentage On Invoice	
                    {
                        var arrProductIDMappedInSchSlbSubBukBenifits = new Array();
                        var strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail = fectStatusIfBeniftRowIdExistsInSchemeSlabBenefitsValueDetail_Temp(BenifitRowID, toMultiply, BenSubBucketValue, BenSubBucketType);

                        alrtStopResult = false;
                        var BenSubBucketAssingnedValue = BenSubBucketValue;
                        if (BenSubBucketType == 9) {
                            if (Prorata == 1) {
                                BenSubBucketValue = (parseFloat(TotalWeightage) * parseFloat(BenSubBucketValue)) / parseFloat(schSlabSubBucketValue);
                            }
                        }
                        // alert(BenSubBucketValue)

                        arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                            return (element.RowID == schSlbSubRowID);
                        });
                        if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                            var cntTotPrd = 0;
                            var flgAddOnBenefit = IsDiscountOnTotalAmount;
                            var trPrdctOdrQty = parseFloat(TotalWeightageInvoiceTemp) > 0 ? $("#tblSchemeCalculationSKUs1 tr").filter("[flgdata=1]") : $("#tblSchemeCalculationSKUs1 tr").filter("[flgdata=1][oqty!=0]");

                            for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < trPrdctOdrQty.length; cntProdcutsRowIdCnt++) {
                                var ProductID = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("skunodeid");
                                var PrdExist = jQuery.grep(arrProductIDMappedInSchSlbSubBukRowId, function (element, index) {
                                    return (element.ProductID == ProductID);
                                });
                                var curntProdRate = parseFloat(trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("standardratebeforetax"));
                                var flgPriceChange = 0;// trPrdctOdrQty.eq(cntProdcutsRowIdCnt).data("flgbatchpricechange") == undefined ? 0 : trPrdctOdrQty.eq(cntProdcutsRowIdCnt).data("flgbatchpricechange");
                                var flgQuoteApplied = 0;// trPrdctOdrQty.eq(cntProdcutsRowIdCnt).is("[flgQuoteApplied]") ? 1 : 0;
                                var Grammage = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("grammage");
                                Grammage = Grammage == undefined ? 0 : Grammage;
                                if (PrdExist.length > 0) {
                                    cntTotPrd++;
                                    var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                        return (element.schId == schId && element.ProductID == ProductID);
                                    });
                                    if (UniqueSKu.length == 0) {
                                        arrUniqueProduct.push({ schId: schId, ProductID: ProductID });

                                        var OldQty = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("td.clsOldQ").text();
                                        var OrderQuantity = parseFloat(trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("input:text").val() == "" ? 0 : trPrdctOdrQty.eq(cntProdcutsRowIdCnt).find("input:text").val());
                                        var productNameValue = parseInt(OldQty) + parseInt(OrderQuantity);
                                        if (parseFloat(TotalWeightageInvoiceTemp) > 0) {
                                            productNameValue = parseInt(productNameValue) == 0 ? 1 : productNameValue;
                                        }
                                        if (productNameValue > 0) {
                                            var DiscountedVal = 0;

                                            var TotalIndivisualWeight = 0;
                                            TotalIndivisualWeight = productNameValue * curntProdRate;
                                            if (BenSubBucketType == 9) {
                                                DiscountedVal = (parseFloat(TotalIndivisualWeight) * parseFloat(BenSubBucketValue)) / parseFloat(TotalWeightage);
                                            } else {
                                                DiscountedVal = BenSubBucketValue;
                                            }
                                            var arr1 = new Array();
                                            arr1 = [{ productNameValue: "", ProductID: ProductID }];
                                            arrProductIDMappedInSchSlbSubBukBenifits.push(arr1[0]);
                                            var noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                                BenSubBucketType + "~" + 0 + "~" + DiscountedVal + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                                0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit;

                                            stringSchemeIdWthAllVal.push(noAlrtsubValues);

                                            var arr = new Array();
                                            arr = [{ ProductID: ProductID, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arr1 }];
                                            noAlrtHshMaptoSaveData.push(arr[0]);

                                        }
                                    }
                                }
                                //if (cntTotPrd == arrProductIDMappedInSchSlbSubBukRowId.length) {
                                //    break;
                                //}
                            }
                            listArrayHashmapProduct.push(arrProductIDMappedInSchSlbSubBukBenifits);
                            listArrayFreePrdctQty.push(strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail);
                        }
                    }

                }
            }
        }
        if (noAlrtHshMaptoSaveData.length > 0) {
            saveFreeProductDataWithSchemeToDatabase_Temp(noAlrtHshMaptoSaveData, prdID);
        }

    }

}


function saveFreeProductDataWithSchemeToDatabase_Temp(hashMapSelectionFreeQty, savProductIdOnClicked) {
    // debugger;
    var freeProduct;
    var listFreeProdctQtyScheme;
    var storeID = $("#hdnStoreID").val();
    var freeProductId = 0;
    var ProductId = 0;
    var OldFreePrdID = 0;
    var OldSlabID = 0;
    for (var entry in hashMapSelectionFreeQty) {
        ProductId = hashMapSelectionFreeQty[entry].ProductID;
        listFreeProdctQtyScheme = hashMapSelectionFreeQty[entry].stringSchemeIdWthAllVal;
        var arrOtherBenfit = hashMapSelectionFreeQty[entry].freeProduct;

        var arrayAllValues = listFreeProdctQtyScheme.split("~");
        var exception = arrayAllValues[0];
        //var exceptionvalue = exception.split("^")[0];
        var schemeId = parseInt(arrayAllValues[1]);
        var schemeSlabId = parseInt(arrayAllValues[2]);
        var schemeSlabBcktId = parseInt((arrayAllValues[3]));
        var schemeSlabSubBcktVal = parseFloat(arrayAllValues[4]);
        var schemeSubBucktValType = parseInt(arrayAllValues[5]);
        var schemeSlabSubBucktType = parseInt(arrayAllValues[6]);
        var benifitRowId = parseInt(arrayAllValues[7]);
        var benSubBucketType = parseInt(arrayAllValues[8]);
        var benifitSubBucketValue = (arrayAllValues[10].indexOf(".") > -1 ? arrayAllValues[10] : arrayAllValues[10] + ".00");
        var benifitMaxValue = (arrayAllValues[11].indexOf(".") > -1 ? arrayAllValues[11] : arrayAllValues[11] + ".00");
        var benifitAssignedVal = (arrayAllValues[11].indexOf(".") > -1 ? arrayAllValues[11] : arrayAllValues[11] + ".00");
        var benifitAssignedValueType = parseInt(arrayAllValues[13]);
        var benifitDiscountApplied = parseFloat(arrayAllValues[14]);
        var benifitCoupnCode = arrayAllValues[15];
        var per = parseFloat(arrayAllValues[16]);
        var orderqty = parseInt(arrayAllValues[22]);
        var UOM = parseFloat(arrayAllValues[17]);
        var schSlbRowId = parseInt(arrayAllValues[18]);
        var SchTypeId = parseInt(arrayAllValues[19]);
        var TotalWeightage = parseFloat(arrayAllValues[20]);
        var Prorata = parseInt(arrayAllValues[21]);
        var flgAddOnScheme = parseInt(arrayAllValues[23]);
        var flgAddOnBenefit = parseInt(arrayAllValues[24]);
        var WhatFinallyApplied = 0;
        var withoutexceptionbenvalue = benifitSubBucketValue;
        var IsPayoutFixedData = jQuery.grep(SchemeDetailByStore[0].Table1, function (element, index) {
            return (element.SchemeID == schemeId);
        });
        var IsPayoutFixed = 0;
        //var orderqty = parseInt($("#tblSchemeCalculationSKUs1 tr[flgdata=1][skunodeid=" + ProductId + "]").find("input:text").val());
        if ((benSubBucketType == 1 || benSubBucketType == 5) && OldSlabID != schemeSlabId)//Free Different Product, Free Same Product
        {
            OldFreePrdID = freeProductId;
            WhatFinallyApplied = 1;
        }

        if (benSubBucketType == 8 || benSubBucketType == 9) {
            freeProductId = 0;
        }
        if (benSubBucketType == 10) {
            benifitAssignedVal = benifitSubBucketValue;
        }

        for (var i in arrOtherBenfit) {
            freeProductId = arrOtherBenfit[i].ProductID;
            var ProductName = arrOtherBenfit[i].FreeProductName == undefined ? "" : arrOtherBenfit[i].FreeProductName;
            var SKUCode = arrOtherBenfit[i].SKUCode == undefined ? "" : arrOtherBenfit[i].SKUCode;

            if ($("#tblSchemeCalculationSKUs1 tr[flgdata=1][skunodeid=" + freeProductId + "]").length > 0) {
                var Grammage = "0.00";// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").data("grammage") == undefined ? "0.00" : $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").data("grammage");
                var ProductName = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][skunodeid=" + freeProductId + "]").text();
                var SKUCode = "";
                var StandardRate = $("#tblSchemeCalculationSKUs1 tr[flgdata=1][skunodeid=" + freeProductId + "]").attr("StandardRateBeforeTax") == undefined ? "0.00" : $("#tblSchemeCalculationSKUs1 tr[flgdata=1][skunodeid=" + freeProductId + "]").attr("standardratebeforetax");
                var StandardRateBeforeTax = StandardRate;// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").attr("standardratebeforetax") == undefined ? "0.00" : $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").data("standardratebeforetax");
                var Tax = "0.00";// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").data("tax") == undefined ? "0.00" : $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").data("tax");
                var MRP = "0.00";// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").data("mrp") == undefined ? "0.00" : $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").data("mrp");
                var CurrentInvStock = 0;// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").data("currentinvstock") == undefined ? 0 : parseInt($("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").data("currentinvstock"));
                var BookingInvStock = 0;// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").data("bookinginvstock") == undefined ? 0 : parseInt($("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").data("bookinginvstock"));
            } else {
                var Grammage = "0.00";
                var StandardRate = "0.00";
                var StandardRateBeforeTax = "0.00";
                var Tax = "0.00";
                var MRP = "0.00";
                var CurrentInvStock = 0;
                var BookingInvStock = 0;
            }

            //BenSubBucketType
            //1. Free Other Product 
            //2. Discount in Percentage with other product
            //3. Discount in Amount with other product
            //4. Coupons
            //5. Free Same Product
            //6. Discount in Percentage with same product
            //7. Discount in Amount with same product
            //8. Percentage On Invoice
            //9.  Amount On Invoice
            //10. Volume Based Per KG
            StandardRate = parseFloat(StandardRate).toFixed(4);
            var arrProductAppliedSchemesBenifitsRecords = new Array();
            arrProductAppliedSchemesBenifitsRecords = [{
                storeID: storeID, ProductID: ProductId, schemeId: schemeId, schemeSlabId: schemeSlabId,
                schemeSlabBcktId: schemeSlabBcktId, schemeSlabSubBcktVal: schemeSlabSubBcktVal, schemeSubBucktValType: schemeSubBucktValType, schemeSlabSubBucktType: schemeSlabSubBucktType, benifitRowId: benifitRowId, benSubBucketType: benSubBucketType,
                freeProductId: freeProductId, benifitSubBucketValue: benifitSubBucketValue, benifitMaxValue: benifitMaxValue, benifitAssignedVal: benifitAssignedVal,
                benifitAssignedValueType: benifitAssignedValueType, benifitDiscountApplied: benifitDiscountApplied, benifitCoupnCode: benifitCoupnCode,
                per: per, UOM: UOM, WhatFinallyApplied: WhatFinallyApplied, schSlbRowId: schSlbRowId, SchTypeId: SchTypeId, TotalWeightage: TotalWeightage, Prorata: Prorata, ProductName: ProductName, SKUCode: SKUCode, UOMID: UOM, StandardRate: parseFloat(StandardRate).toFixed(4), StandardRateBeforeTax: parseFloat(StandardRateBeforeTax).toFixed(4), Tax: parseFloat(Tax).toFixed(4),
                MRP: parseFloat(MRP).toFixed(4), CurrentInvStock: CurrentInvStock, BookingInvStock: BookingInvStock, Grammage: parseFloat(Grammage).toFixed(2), orderqty: orderqty, exceptionvalue: exception, withoutexceptionbenvalue: withoutexceptionbenvalue, flgAddOnScheme: flgAddOnScheme, flgAddOnBenefit: flgAddOnBenefit, IsPayoutFixed: IsPayoutFixed, IsPayoutFixedApplied: 0
            }];

            arrStoreProductAppliedSchemesBenifitsRecords_Temp.push(arrProductAppliedSchemesBenifitsRecords[0]);
        }
        OldSlabID = schemeSlabId;
    }
    //console.log("schemeId:" + schemeId);
    //console.log(JSON.stringify(arrStoreProductAppliedSchemesBenifitsRecords_Temp));

}


function fnCheckNewSchemeIDsAppliedAfterValueChange(SchIdsCompleteListOnProductID, prdID, tblCurrentTR, flgAddOnScheme) {
    //arrSchemeSlabachievement = [];
    arredtboc_OderQuantityFinalSchemesToApply = new Array();
    // SchIdsCompleteListOnProductID = "4003_1_0_1!4674$1#4038_1_0_2!4710$1";
    var arrSchIdsListOnProductID = SchIdsCompleteListOnProductID != "" ? SchIdsCompleteListOnProductID.split("#") : [];

    var chkBuckConditons = false;
    var PrdForAddOnScheme = "";
    var SchemeForAddOnBenefit = "";
    for (var pSchIdsAppliCount = 0; pSchIdsAppliCount < arrSchIdsListOnProductID.length; pSchIdsAppliCount++) {
        var schOverviewDetails = arrSchIdsListOnProductID[pSchIdsAppliCount].split("!")[0];
        var schOverviewOtherDetails = arrSchIdsListOnProductID[pSchIdsAppliCount].split("!")[1];
        var schId = parseInt(schOverviewDetails.split("_")[0]);
        var schAppRule = parseInt(schOverviewDetails.split("_")[1]);
        var schApplicationId = parseInt(schOverviewDetails.split("_")[2]);
        var SchTypeId = parseInt(schOverviewDetails.split("_")[3]);//3=Simple with Check on Individual SKU, 1=Check Combined Skus, 2=Bundle
        var IsPayoutFixed = 0;// parseInt(schOverviewDetails.split("_")[4]);
        var arrschSlbIDsOnSchIdBasis = schOverviewOtherDetails.split("@");
        var exitWhenSlabToExit = 0;
        //Chk if Scheme Id is mapped to that store Id or not starts here

        var flgSchemeExistAgainStore = jQuery.grep(SchemeDetailByStore[0].Table, function (element, index) {
            return (element.SchemeID == schId);
        });


        if (flgSchemeExistAgainStore.length > 0) {

            for (var pSchSlbCount = 0; pSchSlbCount < arrschSlbIDsOnSchIdBasis.length; pSchSlbCount++) {
                var schSlabId = parseInt(arrschSlbIDsOnSchIdBasis[pSchSlbCount].split("$")[0]);
                var schPrdSlabBuckets = arrschSlbIDsOnSchIdBasis[pSchSlbCount].split("$")[1];
                //int slbBenBuckID=Integer.parseInt(schSlabOtherDetails.split(Pattern.quote("^"))[0]);
                var arrSchSlabBuckWiseDetails = jQuery.grep(SchemeDetailByStore[0].Table10, function (element, index) {
                    return (element.SchemeSlabID == schSlabId);
                });


                arrSchemeSlabachievement = jQuery.grep(arrSchemeSlabachievement, function (element, index) {
                    return ((element.SlabId == schSlabId && element.SchemeId == schId) == false);
                });

                // var arrSchSlabBuckWiseDetails = schSlabOtherDetails.split("~");
                for (var pSchSlbBuckCnt in arrSchSlabBuckWiseDetails) {
                    var schSlbBuckId = parseInt(arrSchSlabBuckWiseDetails[pSchSlbBuckCnt]["BucketId"]);

                    var arrSubBucketDetails = jQuery.grep(SchemeDetailByStore[0].Table3, function (element, index) {
                        return (element.BucketID == schSlbBuckId && element.SchemeSlabID == schSlabId);
                    });

                    var schSlbBuckCnt = 0;
                    var arrMaintainDetailsOfBucketConditionsAgainstBuckId = new Array();
                    var TotalVolumeQtyValueInSlab = 0;
                    var arrUniqueProduct = [];
                    var TotalValueInSlab = 0;
                    var SlabTypeDesc = "";
                    var SlabTypeRequiredDesc = "";
                    var SlabTypePer = 0;
                    for (var cntSubBucket in arrSubBucketDetails) {
                        var schSlbSubBuckID = parseInt(arrSubBucketDetails[cntSubBucket]["SubBucketID"]);
                        var schSlbSubRowID = parseInt(arrSubBucketDetails[cntSubBucket]["RowID"]);
                        var schSlabSubBucketType = parseInt(arrSubBucketDetails[cntSubBucket]["SlabSubBucketType"]);
                        var BucketSchemeType = parseInt(arrSubBucketDetails[cntSubBucket]["BucketSchemeType"]);
                        //schSlabSubBucketType
                        //1. Product Quantity
                        //2. Invoice Value
                        //3. Product Lines
                        //4. Product Value
                        //5. Product Volume
                        var schSlabSubBucketValue = parseFloat(arrSubBucketDetails[cntSubBucket]["SlabSubBucketValue"]);
                        var schSubBucketValType = parseInt(arrSubBucketDetails[cntSubBucket]["SubBucketValType"]);
                        var schSubBucketValTypeGreaterThanOne = schSlabSubBucketType;

                        if (SchTypeId == 3) {

                            if (schSlabSubBucketType == 1)//1. Product Quantity
                            {

                                var totalOderQtyProductsAgainstRowId = 0;
                                var oderQtyOnProd = 0;
                                var trPrdctOdrQty = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + prdID + "]")
                                if (trPrdctOdrQty.length > 0) {


                                    var val = 0;
                                    if (trPrdctOdrQty[0].cells[OrderQntyIndx].children[0].value == "0" || trPrdctOdrQty[0].cells[RateIndx].children[0].innerHTML == "Select Rate") {
                                        val = 0;
                                    }
                                    else {
                                        val = parseInt(trPrdctOdrQty[0].cells[OrderQntyIndx].children[0].value);
                                    }
                                    oderQtyOnProd = val;


                                    var prodRate = parseFloat($(trPrdctOdrQty).attr("standardratebeforetax"));
                                    var flgQuoteApplied = 0;// $(trPrdctOdrQty).is("[flgQuoteApplied]") ? 1 : 0;
                                    var oderRateOfCurrentMapedProduct = 0;
                                    var flgPriceChange = 0;// $(trPrdctOdrQty).data("flgbatchpricechange") == undefined ? 0 : $(trPrdctOdrQty).data("flgbatchpricechange");

                                    var oderRateOfCurrentMapedProduct = prodRate * oderQtyOnProd;
                                    var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                        return (element.ProductID == prdID);
                                    });
                                    if (UniqueSKu.length == 0) {
                                        arrUniqueProduct.push({ ProductID: prdID });
                                        TotalVolumeQtyValueInSlab += parseFloat(oderRateOfCurrentMapedProduct);
                                    }

                                    TotalValueInSlab = parseFloat(TotalValueInSlab) + parseFloat(oderRateOfCurrentMapedProduct);
                                }
                                totalOderQtyProductsAgainstRowId = totalOderQtyProductsAgainstRowId + oderQtyOnProd;
                                if (totalOderQtyProductsAgainstRowId >= parseInt(schSlabSubBucketValue)) {
                                    schSlbBuckCnt++;
                                    var freeQtyofProducts = 0;
                                    var valofFQty = (parseFloat(("" + totalOderQtyProductsAgainstRowId).trim()) / parseFloat(("" + schSlabSubBucketValue).trim()));
                                    var valForFreeQTYToMultiply = Math.abs(valofFQty);
                                    chkBuckConditons = true;
                                    //if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                    arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSubBucketValTypeGreaterThanOne + "^" + prdID + "^" + valForFreeQTYToMultiply + "^" + schSlbSubRowID + "^" + SchTypeId + "^" + totalOderQtyProductsAgainstRowId + "^0"]);
                                    //}
                                }
                                else {
                                    chkBuckConditons = false;
                                    break;
                                }
                            }
                            if (schSlabSubBucketType == 3)//3. Product Lines
                            {

                            }
                            if (schSlabSubBucketType == 4)//4. Product Value
                            {
                                var totalOderProductsRatesAgainstRowId = 0.00;

                                var oderQtyOnProd = 0;
                                var trPrdctOdrQty = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + prdID + "]");
                                var flgPriceChange = 0;// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + prdID + "]").data("flgbatchpricechange") == undefined ? 0 : $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + prdID + "]").data("flgbatchpricechange");
                                if (trPrdctOdrQty.length > 0) {
                                    oderQtyOnProd = parseInt(trPrdctOdrQty[0].cells[OrderQntyIndx].children[0].value);
                                    var prodRate = parseFloat($(trPrdctOdrQty).attr("standardratebeforetax"));
                                    var flgQuoteApplied = 0;// $(trPrdctOdrQty).is("[flgQuoteApplied]") ? 1 : 0;

                                    var oderRateOfCurrentMapedProduct = prodRate * oderQtyOnProd;

                                    TotalValueInSlab = parseFloat(TotalValueInSlab) + parseFloat((prodRate * oderQtyOnProd));
                                    totalOderProductsRatesAgainstRowId = totalOderProductsRatesAgainstRowId + oderRateOfCurrentMapedProduct;

                                    var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                        return (element.ProductID == prdID);
                                    });
                                    if (UniqueSKu.length == 0) {
                                        arrUniqueProduct.push({ ProductID: prdID });
                                        TotalVolumeQtyValueInSlab += parseFloat(oderRateOfCurrentMapedProduct);
                                    }

                                }

                                if (parseFloat(totalOderProductsRatesAgainstRowId) >= parseFloat(schSlabSubBucketValue)) {
                                    schSlbBuckCnt++;
                                    chkBuckConditons = true;
                                    // if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                    arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSubBucketValTypeGreaterThanOne + "^" + prdID + "^" + 0 + "^" + schSlbSubRowID + "^" + SchTypeId + "^" + totalOderProductsRatesAgainstRowId + "^0"]);
                                    // }
                                }
                                else {
                                    chkBuckConditons = false;
                                    break;
                                }

                            }
                            if (schSlabSubBucketType == 5)//5. Product Volume
                            {
                                var totalOderVolumeProductsAgainstRowId = 0.00;
                                var oderQtyOnProd = 0;
                                var trPrdctOdrQty = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + prdID + "]");
                                var flgPriceChange = 0;// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + prdID + "]").data("flgbatchpricechange") == undefined ? 0 : $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + prdID + "]").data("flgbatchpricechange");
                                if (trPrdctOdrQty.length > 0) {
                                    oderQtyOnProd = parseInt(trPrdctOdrQty[0].cells[OrderQntyIndx].children[0].value);
                                    var prodVolume = parseFloat($(trPrdctOdrQty).attr("grammage"));
                                    var oderVolumeOfCurrentMapedProduct = (parseFloat(prodVolume) * 1000) * parseInt(oderQtyOnProd);
                                    totalOderVolumeProductsAgainstRowId = totalOderVolumeProductsAgainstRowId + oderVolumeOfCurrentMapedProduct;
                                    TotalVolumeQtyValueInSlab = parseFloat(totalOderVolumeProductsAgainstRowId);

                                    var prodRate = parseFloat($(trPrdctOdrQty).attr("standardratebeforetax"));

                                    var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                        return (element.ProductID == prdID);
                                    });
                                    if (UniqueSKu.length == 0) {
                                        arrUniqueProduct.push({ ProductID: prdID });
                                        TotalVolumeQtyValueInSlab += parseFloat((prodRate * oderQtyOnProd));
                                    }
                                    TotalValueInSlab = parseFloat(TotalValueInSlab) + parseFloat((prodRate * oderQtyOnProd));
                                }

                                schSlabSubBucketValue = schSlabSubBucketValue * 1000;
                                if (totalOderVolumeProductsAgainstRowId >= schSlabSubBucketValue) {
                                    schSlbBuckCnt++;
                                    chkBuckConditons = true;
                                    var valofVolumeQty = (parseFloat(("" + totalOderVolumeProductsAgainstRowId).trim()) / parseFloat(("" + schSlabSubBucketValue).trim()));
                                    var valForVolumetQTYToMultiply = Math.abs(valofVolumeQty);
                                    // if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                    arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSubBucketValTypeGreaterThanOne + "^" + prdID + "^" + valForVolumetQTYToMultiply + "^" + schSlbSubRowID + "^" + SchTypeId + "^" + totalOderVolumeProductsAgainstRowId + "^0"]);
                                    // }
                                }
                                else {
                                    chkBuckConditons = false;
                                    break;
                                }
                            }
                        }
                        else {
                            var arrDuplicateSKUCheck = [];
                            if (schSlabSubBucketType == 1)//1. Product Quantity
                            {

                                // debugger;
                                var totalOderQtyProductsAgainstRowId = 0; var totalOderValueProductsAgainstRowId = 0;
                                var arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                    return (element.RowID == schSlbSubRowID);
                                });

                                if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                                    var SubBucketValid = true; var flgIndividualSubBucketValid = false;
                                    var cntTotPrd = 0;
                                    var trPrdctOdrQty = $("#tblPrdItemsMain tr[flgdata=1][oqty!=0]");
                                    for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < trPrdctOdrQty.length; cntProdcutsRowIdCnt++) {
                                        var oderQtyOnProd = 0;
                                        var PId = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("skunodeid");
                                        var qty = trPrdctOdrQty[cntProdcutsRowIdCnt].cells[OrderQntyIndx].children[0].value;
                                        var ProExist = jQuery.grep(arrProductIDMappedInSchSlbSubBukRowId, function (element, index) {
                                            return (element.ProductID == PId);
                                        });
                                        if (ProExist.length > 0) {
                                            oderQtyOnProd = parseInt(qty);
                                            flgIndividualSubBucketValid = true;
                                            if ($.inArray(PId, arrDuplicateSKUCheck) == -1) {
                                                cntTotPrd++;
                                                arrDuplicateSKUCheck.push(PId);
                                                var prodRate = parseFloat($(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("standardratebeforetax"));
                                                var oderRateOfCurrentMapedProduct = prodRate * oderQtyOnProd;
                                                var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                                    return (element.ProductID == PId);
                                                });
                                                if (UniqueSKu.length == 0) {
                                                    arrUniqueProduct.push({ ProductID: PId });
                                                    TotalVolumeQtyValueInSlab += parseFloat(oderRateOfCurrentMapedProduct);
                                                }
                                                totalOderValueProductsAgainstRowId += parseFloat(prodRate * oderQtyOnProd);
                                                TotalValueInSlab = parseFloat(TotalValueInSlab) + parseFloat((prodRate * oderQtyOnProd));
                                                totalOderQtyProductsAgainstRowId = totalOderQtyProductsAgainstRowId + oderQtyOnProd;
                                                arrStoreProductAppliedSchemesBenifitsRecords = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords, function (element, index) {
                                                    return ((element.ProductID == PId && element.SchTypeId == 3) == false);
                                                });
                                            }
                                        }

                                        if (cntTotPrd == arrProductIDMappedInSchSlbSubBukRowId.length) {
                                            break;
                                        }
                                    }


                                    if (totalOderQtyProductsAgainstRowId >= parseInt(schSlabSubBucketValue)) {
                                        schSlbBuckCnt++;
                                        var freeQtyofProducts = 0;
                                        chkBuckConditons = true;
                                        var valofFQty = (parseFloat(("" + oderQtyOnProd).trim()) / parseFloat(("" + schSlabSubBucketValue).trim()));
                                        var valForFreeQTYToMultiply = Math.abs(valofFQty);
                                        //if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {

                                        //}
                                        arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSubBucketValTypeGreaterThanOne + "^" + prdID + "^" + valForFreeQTYToMultiply + "^" + schSlbSubRowID + "^" + SchTypeId + "^" + oderQtyOnProd + "^0"]);

                                    }
                                    //else {
                                    //    chkBuckConditons = false;
                                    //    break;
                                    //}
                                }
                                SlabTypeDesc += SlabTypeDesc != "" ? " & Buy " + schSlabSubBucketValue + " Pc" : "Buy " + schSlabSubBucketValue + " Pc";
                                var Requiredbalance = parseInt(schSlabSubBucketValue) - parseInt(totalOderQtyProductsAgainstRowId);
                                Requiredbalance = Requiredbalance < 0 ? 0 : Requiredbalance;
                                SlabTypePer += parseInt(schSlabSubBucketValue) <= parseInt(totalOderQtyProductsAgainstRowId) ? 100 : parseInt(parseInt(totalOderQtyProductsAgainstRowId) * 100 / parseInt(schSlabSubBucketValue));
                                SlabTypeRequiredDesc += SlabTypeRequiredDesc != "" ? " & Buy " + Requiredbalance + " Pc" : "Buy " + Requiredbalance + " Pc";
                            }
                            if (schSlabSubBucketType == 2)//2. Invoice Value
                            {
                                var totalOderProductsRatesAgainstRowId = 0.00;
                                var arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                    return (element.RowID == schSlbSubRowID);
                                });
                                if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                                    var cntTotPrd = 0;
                                    var SubBucketValid = true; var flgIndividualSubBucketValid = false;
                                    var trPrdctOdrQty = $("#tblPrdItemsMain tr[flgdata=1][oqty!=0]");
                                    for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < trPrdctOdrQty.length; cntProdcutsRowIdCnt++) {
                                        var oderQtyOnProd = 0;
                                        var PId = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("skunodeid");
                                        var qty = trPrdctOdrQty[cntProdcutsRowIdCnt].cells[OrderQntyIndx].children[0].value;
                                        var ProExist = jQuery.grep(arrProductIDMappedInSchSlbSubBukRowId, function (element, index) {
                                            return (element.ProductID == PId);
                                        });
                                        if (ProExist.length > 0) {
                                            if ($.inArray(PId, arrDuplicateSKUCheck) == -1) {
                                                cntTotPrd++;
                                                arrDuplicateSKUCheck.push(PId);
                                                oderQtyOnProd = parseInt(qty);
                                                arrStoreProductAppliedSchemesBenifitsRecords = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords, function (element, index) {
                                                    return ((element.ProductID == PId && element.SchTypeId == 3) == false);
                                                });
                                                var flgPriceChange = 0;// $(trPrdctOdrQty[cntProdcutsRowIdCnt]).data("flgbatchpricechange") == undefined ? 0 : $(trPrdctOdrQty[cntProdcutsRowIdCnt]).data("flgbatchpricechange");
                                                var oderRateOfCurrentMapedProduct = 0.00;
                                                var ProductID = PId;
                                                var flgQuoteApplied = 0;// $(trPrdctOdrQty[cntProdcutsRowIdCnt]).is("[flgQuoteApplied]") ? 1 : 0;
                                                flgIndividualSubBucketValid = true;
                                                var prodRate = parseFloat($(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("standardratebeforetax"));
                                                oderRateOfCurrentMapedProduct = prodRate * oderQtyOnProd;

                                                var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                                    return (element.ProductID == PId);
                                                });
                                                if (UniqueSKu.length == 0) {
                                                    arrUniqueProduct.push({ ProductID: PId });
                                                    TotalVolumeQtyValueInSlab += parseFloat(oderRateOfCurrentMapedProduct);
                                                }

                                                TotalValueInSlab = parseFloat(TotalValueInSlab) + parseFloat((prodRate * oderQtyOnProd));
                                                totalOderProductsRatesAgainstRowId = totalOderProductsRatesAgainstRowId + oderRateOfCurrentMapedProduct;
                                            }
                                        }
                                        if (cntTotPrd == arrProductIDMappedInSchSlbSubBukRowId.length) {
                                            break;
                                        }
                                    }


                                    if (parseFloat(totalOderProductsRatesAgainstRowId) >= parseFloat(schSlabSubBucketValue)) {
                                        schSlbBuckCnt++;
                                        chkBuckConditons = true;
                                        //if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                        //TotalVolumeQtyValueInSlab += parseFloat(totalOderProductsRatesAgainstRowId);
                                        arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSubBucketValTypeGreaterThanOne + "^" + prdID + "^" + 0 + "^" + schSlbSubRowID + "^" + SchTypeId + "^" + oderRateOfCurrentMapedProduct + "^0"]);
                                        //}
                                    }
                                    //else {
                                    //    chkBuckConditons = false;
                                    //    break;
                                    //}

                                }
                                SlabTypeDesc += SlabTypeDesc != "" ? " & Buy " + schSlabSubBucketValue + " Rs" : "Buy " + schSlabSubBucketValue + " Rs";
                                var Requiredbalance = parseFloat(schSlabSubBucketValue) - parseFloat(totalOderProductsRatesAgainstRowId);
                                Requiredbalance = Requiredbalance < 0 ? 0 : Requiredbalance;
                                SlabTypePer += parseFloat(schSlabSubBucketValue) <= parseFloat(totalOderProductsRatesAgainstRowId) ? 100 : parseInt(parseFloat(totalOderProductsRatesAgainstRowId) * 100 / parseFloat(schSlabSubBucketValue));
                                SlabTypeRequiredDesc += SlabTypeRequiredDesc != "" ? " & Buy " + parseFloat(Requiredbalance).toFixed(0) + " Rs" : "Buy " + parseFloat(Requiredbalance).toFixed(0) + " Rs";
                            }
                            if (schSlabSubBucketType == 3)//3. Product Lines
                            {
                                var arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                    return (element.RowID == schSlbSubRowID);
                                });
                                var cntprd = 0;
                                if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                                    var chlIfProdHasAnyOrders = false;
                                    var cntTotPrd = 0;
                                    var trPrdctOdrQty = $("#tblPrdItemsMain tr[flgdata=1][oqty!=0]");
                                    for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < trPrdctOdrQty.length; cntProdcutsRowIdCnt++) {
                                        var oderQtyOnProd = 0;
                                        var PId = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("skunodeid");
                                        var qty = trPrdctOdrQty[cntProdcutsRowIdCnt].cells[OrderQntyIndx].children[0].value;
                                        var ProExist = jQuery.grep(arrProductIDMappedInSchSlbSubBukRowId, function (element, index) {
                                            return (element.ProductID == PId);
                                        });

                                        var oderQtyOnProd = 0;
                                        if (ProExist.length > 0) {
                                            if ($.inArray(PId, arrDuplicateSKUCheck) == -1) {
                                                cntTotPrd++;
                                                arrDuplicateSKUCheck.push(PId);
                                                arrStoreProductAppliedSchemesBenifitsRecords = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords, function (element, index) {
                                                    return ((element.ProductID == PId && element.SchTypeId == 3) == false);
                                                });
                                                var QtyPerLine = ProExist[0].QtyPerLine;
                                                oderQtyOnProd = parseInt(trPrdctOdrQty[cntProdcutsRowIdCnt].cells[OrderQntyIndx].children[0].value);
                                                if (parseInt(oderQtyOnProd) >= parseInt(QtyPerLine)) {
                                                    chlIfProdHasAnyOrders = true;
                                                    var prodRate = parseFloat($(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("standardratebeforetax"));
                                                    TotalValueInSlab = parseFloat(TotalValueInSlab) + parseFloat((prodRate * oderQtyOnProd));
                                                    cntprd++;
                                                    var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                                        return (element.ProductID == PId);
                                                    });
                                                    if (UniqueSKu.length == 0) {
                                                        arrUniqueProduct.push({ ProductID: PId });
                                                        TotalVolumeQtyValueInSlab += oparseFloat((prodRate * oderQtyOnProd));
                                                    }
                                                }
                                            }
                                        }
                                        if (cntTotPrd == arrProductIDMappedInSchSlbSubBukRowId.length) {
                                            break;
                                        }
                                    }

                                    if (cntprd >= schSlabSubBucketValue) {
                                        schSlbBuckCnt++;
                                        chkBuckConditons = true;
                                        //TotalVolumeQtyValueInSlab += parseInt(TotalValueInSlab);
                                        if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                            arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSlabSubBucketType + "^" + prdID + "^" + 0 + "^" + schSlbSubRowID + "^" + SchTypeId + "^0^1"]);
                                        }
                                    }
                                    //else {
                                    //    chkBuckConditons = false;
                                    //    break;
                                    //}
                                }
                                SlabTypeDesc += SlabTypeDesc != "" ? " & Buy " + schSlabSubBucketValue + " " : "Buy " + schSlabSubBucketValue + " ";
                                var Requiredbalance = parseInt(schSlabSubBucketValue) - parseInt(cntprd);
                                Requiredbalance = Requiredbalance < 0 ? 0 : Requiredbalance;
                                SlabTypePer += parseFloat(schSlabSubBucketValue) <= parseFloat(cntprd) ? 100 : parseInt(parseFloat(cntprd) * 100 / parseFloat(schSlabSubBucketValue));
                                SlabTypeRequiredDesc += SlabTypeRequiredDesc != "" ? " & Buy " + parseFloat(Requiredbalance).toFixed(0) + " " : "Buy " + parseFloat(Requiredbalance).toFixed(0) + " ";
                            }
                            if (schSlabSubBucketType == 4)//4. Product Value
                            {
                                var totalOderProductsRatesAgainstRowId = 0.00;
                                var arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                    return (element.RowID == schSlbSubRowID);
                                });
                                if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                                    var cntTotPrd = 0;
                                    var SubBucketValid = true; var flgIndividualSubBucketValid = false;
                                    var trPrdctOdrQty = $("#tblPrdItemsMain tr[flgdata=1][oqty!=0]");
                                    for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < trPrdctOdrQty.length; cntProdcutsRowIdCnt++) {
                                        var oderQtyOnProd = 0;
                                        var PId = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("skunodeid");
                                        var qty = trPrdctOdrQty[cntProdcutsRowIdCnt].cells[OrderQntyIndx].children[0].value;
                                        var ProExist = jQuery.grep(arrProductIDMappedInSchSlbSubBukRowId, function (element, index) {
                                            return (element.ProductID == PId);
                                        });
                                        if (ProExist.length > 0) {
                                            if ($.inArray(PId, arrDuplicateSKUCheck) == -1) {
                                                cntTotPrd++;
                                                arrDuplicateSKUCheck.push(PId);
                                                oderQtyOnProd = parseInt(qty);
                                                arrStoreProductAppliedSchemesBenifitsRecords = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords, function (element, index) {
                                                    return ((element.ProductID == PId && element.SchTypeId == 3) == false);
                                                });
                                                var flgPriceChange = 0;// $(trPrdctOdrQty[cntProdcutsRowIdCnt]).data("flgbatchpricechange") == undefined ? 0 : $(trPrdctOdrQty[cntProdcutsRowIdCnt]).data("flgbatchpricechange");
                                                var oderRateOfCurrentMapedProduct = 0.00;
                                                var ProductID = PId;
                                                var flgQuoteApplied = 0;// $(trPrdctOdrQty[cntProdcutsRowIdCnt]).is("[flgQuoteApplied]") ? 1 : 0;
                                                flgIndividualSubBucketValid = true;
                                                var prodRate = parseFloat($(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("standardratebeforetax"));
                                                oderRateOfCurrentMapedProduct = prodRate * oderQtyOnProd;
                                                var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                                    return (element.ProductID == PId);
                                                });
                                                if (UniqueSKu.length == 0) {
                                                    arrUniqueProduct.push({ ProductID: PId });
                                                    TotalVolumeQtyValueInSlab += parseFloat(oderRateOfCurrentMapedProduct);
                                                }
                                                TotalValueInSlab = parseFloat(TotalValueInSlab) + parseFloat((prodRate * oderQtyOnProd));
                                                totalOderProductsRatesAgainstRowId = totalOderProductsRatesAgainstRowId + oderRateOfCurrentMapedProduct;
                                            }
                                        }
                                        if (cntTotPrd == arrProductIDMappedInSchSlbSubBukRowId.length) {
                                            break;
                                        }
                                    }


                                    if (parseFloat(totalOderProductsRatesAgainstRowId) >= parseFloat(schSlabSubBucketValue)) {
                                        schSlbBuckCnt++;
                                        chkBuckConditons = true;
                                        //if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                        // TotalVolumeQtyValueInSlab += parseFloat(totalOderProductsRatesAgainstRowId);
                                        arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSubBucketValTypeGreaterThanOne + "^" + prdID + "^" + 0 + "^" + schSlbSubRowID + "^" + SchTypeId + "^" + oderRateOfCurrentMapedProduct + "^0"]);
                                        //}
                                    }
                                    //else {
                                    //    chkBuckConditons = false;
                                    //    break;
                                    //}
                                }

                                SlabTypeDesc += SlabTypeDesc != "" ? " & Buy " + schSlabSubBucketValue + " Rs" : "Buy " + schSlabSubBucketValue + " Rs";
                                var Requiredbalance = parseFloat(schSlabSubBucketValue) - parseFloat(totalOderProductsRatesAgainstRowId);
                                Requiredbalance = Requiredbalance < 0 ? 0 : Requiredbalance;
                                SlabTypePer += parseFloat(schSlabSubBucketValue) <= parseFloat(totalOderProductsRatesAgainstRowId) ? 100 : parseInt(parseFloat(totalOderProductsRatesAgainstRowId) * 100 / parseFloat(schSlabSubBucketValue));
                                SlabTypeRequiredDesc += SlabTypeRequiredDesc != "" ? " & Buy " + parseFloat(Requiredbalance).toFixed(0) + " Rs" : "Buy " + parseFloat(Requiredbalance).toFixed(0) + " Rs";
                            }
                            if (schSlabSubBucketType == 5)//5. Product Volume
                            {
                                schSlabSubBucketValue = schSlabSubBucketValue * 1000;
                                var totalOderVolumeProductsAgainstRowId = 0.00;
                                var arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                    return (element.RowID == schSlbSubRowID);
                                });

                                if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                                    var cntTotPrd = 0;
                                    var SubBucketValid = true; var flgIndividualSubBucketValid = false;
                                    var trPrdctOdrQty = $("#tblPrdItemsMain tr[flgdata=1][oqty!=0]");
                                    for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < trPrdctOdrQty.length; cntProdcutsRowIdCnt++) {
                                        var oderQtyOnProd = 0;
                                        var PId = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("skunodeid");
                                        var qty = trPrdctOdrQty[cntProdcutsRowIdCnt].cells[OrderQntyIndx].children[0].value;
                                        var ProExist = jQuery.grep(arrProductIDMappedInSchSlbSubBukRowId, function (element, index) {
                                            return (element.ProductID == PId);
                                        });

                                        var oderQtyOnProd = 0;
                                        if (ProExist.length > 0) {
                                            if ($.inArray(PId, arrDuplicateSKUCheck) == -1) {
                                                cntTotPrd++;
                                                arrDuplicateSKUCheck.push(PId);
                                                flgIndividualSubBucketValid = true;
                                                arrStoreProductAppliedSchemesBenifitsRecords = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords, function (element, index) {
                                                    return ((element.ProductID == PId && element.SchTypeId == 3) == false);
                                                });
                                                oderQtyOnProd = parseInt(trPrdctOdrQty[cntProdcutsRowIdCnt].cells[OrderQntyIndx].children[0].value);
                                                var prodVolume = parseFloat($(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("grammage"));
                                                var oderVolumeOfCurrentMapedProduct = (parseFloat(prodVolume) * 1000) * parseInt(oderQtyOnProd);

                                                var prodRate = parseFloat($(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("standardratebeforetax"));
                                                TotalValueInSlab = parseFloat(TotalValueInSlab) + parseFloat((prodRate * oderQtyOnProd));
                                                var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                                    return (element.ProductID == PId);
                                                });
                                                if (UniqueSKu.length == 0) {
                                                    arrUniqueProduct.push({ ProductID: PId });
                                                    TotalVolumeQtyValueInSlab += parseFloat((prodRate * oderQtyOnProd));
                                                }
                                                totalOderVolumeProductsAgainstRowId = totalOderVolumeProductsAgainstRowId + oderVolumeOfCurrentMapedProduct;

                                            }
                                        }
                                        if (cntTotPrd == arrProductIDMappedInSchSlbSubBukRowId.length) {
                                            break;
                                        }
                                    }

                                    if (parseFloat(totalOderVolumeProductsAgainstRowId) >= parseFloat(schSlabSubBucketValue)) {
                                        schSlbBuckCnt++;
                                        chkBuckConditons = true;
                                        // if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                        //TotalVolumeQtyValueInSlab += parseFloat(TotalValueInSlab);
                                        var valofVolumeQty = (parseFloat(("" + oderVolumeOfCurrentMapedProduct).trim()) / parseFloat(("" + schSlabSubBucketValue).trim()));
                                        var valForVolumetQTYToMultiply = Math.abs(valofVolumeQty);
                                        arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSubBucketValTypeGreaterThanOne + "^" + prdID + "^" + valForVolumetQTYToMultiply + "^" + schSlbSubRowID + "^" + SchTypeId + "^" + oderVolumeOfCurrentMapedProduct + "^0"]);
                                        // }
                                    }
                                    //else {
                                    //    chkBuckConditons = false;
                                    //    break;
                                    //}
                                }
                            }
                        }
                    }
                    SlabTypePer = parseInt(SlabTypePer / arrSubBucketDetails.length);
                    arrSchemeSlabachievement.push({ SlabId: schSlabId, SchemeId: schId, SlabTypeDesc: SlabTypeDesc, SlabTypeRequiredDesc: SlabTypeRequiredDesc, SlabTypePer: SlabTypePer, TotalValueInSlab: TotalValueInSlab });
                    //mk

                    if (schSlbBuckCnt == (arrSubBucketDetails.length)) {
                        if (chkBuckConditons == true)//This checks if All Sub Bucket Conditions of Bucket is true
                        {
                            for (var cntNoOfTrueConditions = 0; cntNoOfTrueConditions < arrSubBucketDetails.length; cntNoOfTrueConditions++) {
                                arredtboc_OderQuantityFinalSchemesToApply.push(arrMaintainDetailsOfBucketConditionsAgainstBuckId[cntNoOfTrueConditions] + "|" + TotalVolumeQtyValueInSlab);
                                if ($.inArray(schSlbBuckId.toString(), schPrdSlabBuckets.split("^")) != -1) {
                                    exitWhenSlabToExit = 1;
                                }
                            }
                            break;
                        }
                    }
                }

                if (exitWhenSlabToExit == 1) {
                    break;
                }
            }
        }
        //if (exitWhenSlabToExit == 1) {
        //    break;
        //}
        //Chk if Scheme Id is mapped to that store ends here
    }
    if (flgAddOnScheme == 1) {
        if (arredtboc_OderQuantityFinalSchemesToApply.length > 0) {
            fnAssignSchemeIDsAppliedOverProductAfterValueChange(prdID, tblCurrentTR, 0);
        }
    }
}

function fnAssignSchemeIDsAppliedOverProductAfterValueChange(prdID, tblCurrentTR, flgAddOnScheme) {
    //debugger;
    var noAlrtHshMaptoSaveData = new Array();
    var noAlrtStringSchemeIdWthAllVal = new Array();
    var stringSchemeIdWthAllVal = new Array();
    var listArrayHashmapProduct = new Array();
    var listArrayFreePrdctQty = new Array();
    var arrProductIDMappedInSchSlbSubBukRowId = new Array();
    var arrUniqueProduct = [];
    if (arredtboc_OderQuantityFinalSchemesToApply.length > 0) {

        for (var cntNoOfTrueConditions = 0; cntNoOfTrueConditions < arredtboc_OderQuantityFinalSchemesToApply.length; cntNoOfTrueConditions++) {

            //schId+"^"+schSlabId+"^"+schSlbBuckId+"^"+schSlabSubBucketValue+"^"+schSubBucketValType
            //+"^"+schSlabSubBucketType+"^"+ProductIdOnClicked+"^"+valForFreeQTYToMultiply
            var strBenefitsSchemes = arredtboc_OderQuantityFinalSchemesToApply[cntNoOfTrueConditions].split("|")[0];
            var schId = parseInt(strBenefitsSchemes.split("^")[0]);
            var schSlabId = parseInt(strBenefitsSchemes.split("^")[1]);
            var schSlbBuckId = parseInt(strBenefitsSchemes.split("^")[2]);
            var schSlabSubBucketValue = (strBenefitsSchemes.split("^")[3]);
            var schSubBucketValType = parseInt(strBenefitsSchemes.split("^")[4]);
            var schSlabSubBucketType = parseInt(strBenefitsSchemes.split("^")[5]);
            var Pid = parseInt(strBenefitsSchemes.split("^"));
            //var sdfs = jQuery.grep(arrStoreProductAppliedSchemesBenifitsRecords, function (element, index) {
            //     return (element.ProductID != Pid && element.schemeId != schId && element.schemeSlabId != schSlabId);
            // });
            var toMultiply = parseInt(strBenefitsSchemes.split("^")[7]);
            var schSlbSubRowID = parseInt(strBenefitsSchemes.split("^")[8]);
            var SchTypeId = parseInt(strBenefitsSchemes.split("^")[9]);
            var TotalWeightage = parseFloat(arredtboc_OderQuantityFinalSchemesToApply[cntNoOfTrueConditions].split("|")[1]);
            var flgAddOnScheme = parseInt(strBenefitsSchemes.split("^")[11]);
            var flgSchemeExistAgainStore = jQuery.grep(SchemeDetailByStore[0].Table, function (element, index) {
                return (element.SchemeID == schId);
            });

            if (flgSchemeExistAgainStore.length > 0) {

                var arrProductIDBenifitsListOnPurchase = jQuery.grep(SchemeDetailByStore[0].Table5, function (element, index) {
                    return (element.SchemeID == schId && element.SchemeSlabID == schSlabId);// & element.BucketID == schSlbBuckId
                });
                for (var productIDBenifitsListCnt in arrProductIDBenifitsListOnPurchase) {

                    var BenifitRowID = parseInt(arrProductIDBenifitsListOnPurchase[productIDBenifitsListCnt].RowID);
                    var BenSubBucketType = parseInt(arrProductIDBenifitsListOnPurchase[productIDBenifitsListCnt].BenSubBucketType);
                    var BenDiscApplied = parseInt(arrProductIDBenifitsListOnPurchase[productIDBenifitsListCnt].BenDiscApplied);

                    // MinValueQty of free product
                    var BenSubBucketValue = parseFloat(arrProductIDBenifitsListOnPurchase[productIDBenifitsListCnt].BenSubBucketValue);

                    var Per = parseFloat(arrProductIDBenifitsListOnPurchase[productIDBenifitsListCnt].Per);
                    var UOM = parseFloat(arrProductIDBenifitsListOnPurchase[productIDBenifitsListCnt].UOM);
                    var Prorata = parseFloat(arrProductIDBenifitsListOnPurchase[productIDBenifitsListCnt].Prorata);
                    var IsDiscountOnTotalAmount = parseInt(arrProductIDBenifitsListOnPurchase[productIDBenifitsListCnt].IsDiscountOnTotalAmount);
                    var Slab_Max_Limit = parseFloat(arrProductIDBenifitsListOnPurchase[productIDBenifitsListCnt].Slab_Max_Limit);
                    if (BenSubBucketType == 6) {
                        var TotSlabDiscountValue = parseFloat(TotalWeightage) * parseFloat(BenSubBucketValue) / 100;
                        if (parseFloat(TotSlabDiscountValue) > parseFloat(Slab_Max_Limit)) {
                            BenSubBucketValue = Slab_Max_Limit;
                            BenSubBucketType = 7;
                        }
                    } else if (BenSubBucketType == 8) {
                        var TotSlabDiscountValue = parseFloat(TotalWeightage) * parseFloat(BenSubBucketValue) / 100;
                        if (parseFloat(TotSlabDiscountValue) > parseFloat(Slab_Max_Limit)) {
                            BenSubBucketValue = Slab_Max_Limit;
                            BenSubBucketType = 9;
                        }
                    }
                    //BenSubBucketType
                    //1. Free Other Product =
                    //2. Discount in Percentage with other product
                    //3. Discount in Amount with other product
                    //4. Coupons
                    //5. Free Same Product
                    //6. Discount in Percentage with same product
                    //7. Discount in Amount with same product
                    //8. Percentage On Invoice
                    //9.  Amount On Invoice
                    //10. PerVolume Discount

                    if (BenSubBucketType == 1) //1. Free Other Product 	
                    {
                        var arrProductIDMappedInSchSlbSubBukBenifits = jQuery.grep(SchemeDetailByStore[0].Table6, function (element, index) {
                            return (element.RowID == BenifitRowID);
                        });
                        var arrrr = new Array();
                        arrrr.push(arrProductIDMappedInSchSlbSubBukBenifits[0]);
                        arrProductIDMappedInSchSlbSubBukBenifits = new Array();
                        arrProductIDMappedInSchSlbSubBukBenifits.push(arrrr[0]);

                        var strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail = fectStatusIfBeniftRowIdExistsInSchemeSlabBenefitsValueDetail(BenifitRowID, toMultiply, BenSubBucketValue, BenSubBucketType);

                        if (SchTypeId == 3) {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID && element.ProductID == prdID);
                            });
                        } else {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID);
                            });
                        }
                        var BenSubBucketAssingnedValue = BenSubBucketValue;
                        if (Prorata == 1) {
                            BenSubBucketValue = (parseFloat(TotalWeightage) * parseFloat(BenSubBucketValue)) / parseFloat(schSlabSubBucketValue);
                        }
                        BenSubBucketValue = parseInt(BenSubBucketValue);
                        alrtStopResult = false;
                        var strFreePrdList = "";
                        var arrProductIDMappedInSchSlbSubBukBenifitsForCalculation = new Array();
                        if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                            var flgAddOnBenefit = IsDiscountOnTotalAmount;
                            var cntTotPrd = 0;
                            for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < arrProductIDMappedInSchSlbSubBukRowId.length; cntProdcutsRowIdCnt++) {

                                var productid = arrProductIDMappedInSchSlbSubBukRowId[cntProdcutsRowIdCnt].ProductID;
                                var trPrdctOdrQty = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + productid + "]");
                                cntTotPrd++;


                                var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                    return (element.schId == schId && element.ProductID == productid);
                                });
                                if (UniqueSKu.length == 0) {
                                    arrUniqueProduct.push({ schId: schId, ProductID: productid });
                                    var productNameValue = trPrdctOdrQty[0].cells[OrderQntyIndx].children[0].value;
                                    var noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                        BenSubBucketType + "~" + 0 + "~" + BenSubBucketValue + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                        0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit
                                    if (SchTypeId == 3) {
                                        var trOrderQty = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + prdID + "]");
                                        if (trOrderQty.length > 0 && trOrderQty[0].cells[RateIndx].children[0].innerHTML != "Select Rate") {
                                            productNameValue = trOrderQty[0].cells[OrderQntyIndx].children[0].value;
                                        }
                                        var noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                            BenSubBucketType + "~" + 0 + "~" + BenSubBucketValue + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                            0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit

                                        var arr = new Array();
                                        arr = [{ productNameValue: 0, ProductID: prdID }];
                                        arrProductIDMappedInSchSlbSubBukBenifitsForCalculation.push(arr[0]);
                                        var arr = new Array();
                                        arr = [{ ProductID: prdID, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrProductIDMappedInSchSlbSubBukBenifits }];
                                        noAlrtHshMaptoSaveData.push(arr[0]);
                                        break;
                                    } else {

                                        var arr = new Array();
                                        arr = [{ productNameValue: 0, ProductID: productid }];
                                        arrProductIDMappedInSchSlbSubBukBenifitsForCalculation.push(arr[0]);
                                        var arr = new Array();
                                        arr = [{ ProductID: productid, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrProductIDMappedInSchSlbSubBukBenifits }];
                                        noAlrtHshMaptoSaveData.push(arr[0]);
                                    }
                                }
                            }
                            stringSchemeIdWthAllVal = new Array()
                            stringSchemeIdWthAllVal.push(noAlrtsubValues);

                            listArrayHashmapProduct.push(arrProductIDMappedInSchSlbSubBukBenifitsForCalculation);
                            listArrayFreePrdctQty.push(strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail);
                        }
                    }

                    if (BenSubBucketType == 2) //2. Discount in Percentage with other product 	
                    {
                        var arrProductIDMappedInSchSlbSubBukBenifits = jQuery.grep(SchemeDetailByStore[0].Table6, function (element, index) {
                            return (element.RowID == BenifitRowID);
                        });

                        if (SchTypeId == 3) {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID && element.ProductID == prdID);
                            });
                        } else {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID);
                            });
                        }


                        var arrProductIDMappedInSchSlbSubBukBenifitsForCalculation = new Array();
                        var strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail = fectStatusIfBeniftRowIdExistsInSchemeSlabBenefitsValueDetail(BenifitRowID, toMultiply, BenSubBucketValue, BenSubBucketType);
                        var BenSubBucketAssingnedValue = BenSubBucketValue;
                        alrtStopResult = false;
                        var noAlrtsubValues;


                        var flgAddOnBenefit = IsDiscountOnTotalAmount;

                        if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                            for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < arrProductIDMappedInSchSlbSubBukRowId.length; cntProdcutsRowIdCnt++) {
                                var trPrdctOdrQty = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + arrProductIDMappedInSchSlbSubBukRowId[cntProdcutsRowIdCnt].ProductID + "]");

                                var productid = arrProductIDMappedInSchSlbSubBukRowId[cntProdcutsRowIdCnt].ProductID;
                                var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                    return (element.schId == schId && element.ProductID == productid);
                                });
                                if (UniqueSKu.length == 0) {
                                    arrUniqueProduct.push({ schId: schId, ProductID: productid });
                                    var productNameValue = trPrdctOdrQty[0].cells[OrderQntyIndx].children[0].value;
                                    noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                        BenSubBucketType + "~" + 0 + "~" + BenSubBucketValue + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                        0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit
                                    stringSchemeIdWthAllVal.push(noAlrtsubValues);
                                    if (SchTypeId == 3) {
                                        var trOrderQty = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + prdID + "]");
                                        if (trOrderQty.length > 0) {
                                            productNameValue = trOrderQty[0].cells[OrderQntyIndx].children[0].value;
                                        }
                                        var arr = new Array();
                                        arr = [{ ProductID: prdID, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrProductIDMappedInSchSlbSubBukBenifits }];
                                        noAlrtHshMaptoSaveData.push(arr[0]);

                                        var noAlrtsubValues1 = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                            BenSubBucketType + "~" + 0 + "~" + 0 + "~" + 0 + "~" + 0 + "~" +
                                            0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit

                                        var arr = new Array();
                                        arr = [{ ProductID: prdID, stringSchemeIdWthAllVal: noAlrtsubValues1 }];
                                        arrProductIDMappedInSchSlbSubBukBenifitsForCalculation.push(arr[0]);
                                        break;
                                    }
                                    else {
                                        var arr = new Array();
                                        arr = [{ ProductID: productid, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrProductIDMappedInSchSlbSubBukBenifits }];
                                        noAlrtHshMaptoSaveData.push(arr[0]);

                                        var noAlrtsubValues1 = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                            BenSubBucketType + "~" + 0 + "~" + 0 + "~" + 0 + "~" + 0 + "~" +
                                            0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit

                                        var arr = new Array();
                                        arr = [{ ProductID: productid, stringSchemeIdWthAllVal: noAlrtsubValues1 }];
                                        arrProductIDMappedInSchSlbSubBukBenifitsForCalculation.push(arr[0]);
                                    }
                                }

                            }
                        }

                        listArrayHashmapProduct.push(arrProductIDMappedInSchSlbSubBukBenifitsForCalculation);
                        listArrayFreePrdctQty.push(strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail);
                    }
                    if (BenSubBucketType == 3) //3. Discount in Amount with other product 	
                    {
                        var arrProductIDMappedInSchSlbSubBukBenifits = jQuery.grep(SchemeDetailByStore[0].Table6, function (element, index) {
                            return (element.RowID == BenifitRowID);
                        });

                        if (SchTypeId == 3) {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID && element.ProductID == prdID);
                            });
                        } else {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID);
                            });
                        }

                        var arrProductIDMappedInSchSlbSubBukBenifitsForCalculation = new Array();
                        var strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail = fectStatusIfBeniftRowIdExistsInSchemeSlabBenefitsValueDetail(BenifitRowID, toMultiply, BenSubBucketValue, BenSubBucketType);
                        var BenSubBucketAssingnedValue = BenSubBucketValue;
                        alrtStopResult = false;


                        var flgAddOnBenefit = IsDiscountOnTotalAmount;
                        var noAlrtsubValues;
                        if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                            for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < arrProductIDMappedInSchSlbSubBukRowId.length; cntProdcutsRowIdCnt++) {
                                var trPrdctOdrQty = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + arrProductIDMappedInSchSlbSubBukRowId[cntProdcutsRowIdCnt].ProductID + "]");

                                var productNameValue = trPrdctOdrQty[0].cells[OrderQntyIndx].children[0].value;
                                var productid = arrProductIDMappedInSchSlbSubBukRowId[cntProdcutsRowIdCnt].ProductID;
                                var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                    return (element.schId == schId && element.ProductID == productid);
                                });
                                if (UniqueSKu.length == 0) {
                                    arrUniqueProduct.push({ schId: schId, ProductID: productid });
                                    noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                        BenSubBucketType + "~" + 0 + "~" + BenSubBucketValue + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                        0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit
                                    stringSchemeIdWthAllVal.push(noAlrtsubValues);

                                    var arr = new Array();
                                    arr = [{ ProductID: productid, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrProductIDMappedInSchSlbSubBukBenifits }];
                                    noAlrtHshMaptoSaveData.push(arr[0]);

                                    var noAlrtsubValues1 = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                        BenSubBucketType + "~" + 0 + "~" + 0 + "~" + 0 + "~" + 0 + "~" +
                                        0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit

                                    var arr = new Array();
                                    arr = [{ ProductID: productid, stringSchemeIdWthAllVal: noAlrtsubValues1 }];
                                    arrProductIDMappedInSchSlbSubBukBenifitsForCalculation.push(arr[0]);
                                }
                            }
                        }

                        listArrayHashmapProduct.push(arrProductIDMappedInSchSlbSubBukBenifitsForCalculation);
                        listArrayFreePrdctQty.push(strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail);
                    }



                    if (BenSubBucketType == 5) //5. Free Same Product 	
                    {
                        var arrProductIDMappedInSchSlbSubBukBenifits = new Array();

                        var strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail = fectStatusIfBeniftRowIdExistsInSchemeSlabBenefitsValueDetail(BenifitRowID, toMultiply, BenSubBucketValue, BenSubBucketType);

                        alrtStopResult = false;

                        if (SchTypeId == 3) {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID && element.ProductID == prdID);
                            });
                        } else {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID);
                            });
                        }

                        var BenSubBucketAssingnedValue = BenSubBucketValue;
                        if (Prorata == 1) {
                            BenSubBucketValue = (parseFloat(TotalWeightage) * parseFloat(BenSubBucketValue)) / parseFloat(schSlabSubBucketValue);
                        }
                        BenSubBucketValue = parseInt(BenSubBucketValue);
                        var productNameValue = "";
                        var arr = new Array();
                        var strFreePrdList = "";

                        var flgAddOnBenefit = IsDiscountOnTotalAmount;

                        var arrProductIDMappedInSchSlbSubBukBenifitsForCalculation = new Array();
                        if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                            for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < arrProductIDMappedInSchSlbSubBukRowId.length; cntProdcutsRowIdCnt++) {
                                var trPrdctOdrQty = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + arrProductIDMappedInSchSlbSubBukRowId[cntProdcutsRowIdCnt].ProductID + "]");
                                if (trPrdctOdrQty.length > 0 && trPrdctOdrQty[0].cells[RateIndx].children[0].innerHTML != "Select Rate") {
                                    var productid = arrProductIDMappedInSchSlbSubBukRowId[cntProdcutsRowIdCnt].ProductID;
                                    var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                        return (element.schId == schId && element.ProductID == productid);
                                    });
                                    if (UniqueSKu.length == 0) {
                                        arrUniqueProduct.push({ schId: schId, ProductID: productid });
                                        var productNameValue = trPrdctOdrQty[0].cells[OrderQntyIndx].children[0].value;
                                        var noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                            BenSubBucketType + "~" + 0 + "~" + BenSubBucketValue + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                            0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit;
                                        if (SchTypeId == 3) {

                                            var trOrderQty = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + prdID + "]");
                                            if (trOrderQty.length > 0 && trOrderQty[0].cells[RateIndx].children[0].innerHTML != "Select Rate") {
                                                productNameValue = trOrderQty[0].cells[OrderQntyIndx].children[0].value;
                                            }
                                            var noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                                BenSubBucketType + "~" + 0 + "~" + BenSubBucketValue + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                                0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit;
                                            var arr = new Array();
                                            arr = [{ productNameValue: 0, ProductID: prdID }];
                                            arrProductIDMappedInSchSlbSubBukBenifitsForCalculation.push(arr[0]);
                                            arrProductIDMappedInSchSlbSubBukBenifits.push(arr[0]);
                                            var arr = new Array();
                                            arr = [{ ProductID: prdID, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrProductIDMappedInSchSlbSubBukBenifits }];
                                            noAlrtHshMaptoSaveData.push(arr[0]);
                                            break;
                                        }
                                        else {
                                            var productid = arrProductIDMappedInSchSlbSubBukRowId[cntProdcutsRowIdCnt].ProductID;
                                            var arr = new Array();
                                            arr = [{ productNameValue: 0, ProductID: productid }];
                                            arrProductIDMappedInSchSlbSubBukBenifitsForCalculation.push(arr[0]);
                                            if (arrProductIDMappedInSchSlbSubBukBenifits.length == 0) {
                                                arrProductIDMappedInSchSlbSubBukBenifits.push(arr[0]);
                                            }
                                            var arr = new Array();
                                            arr = [{ ProductID: productid, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrProductIDMappedInSchSlbSubBukBenifits }];
                                            noAlrtHshMaptoSaveData.push(arr[0]);

                                        }
                                    }
                                }
                            }
                            stringSchemeIdWthAllVal = new Array()
                            stringSchemeIdWthAllVal.push(noAlrtsubValues);

                            listArrayHashmapProduct.push(arrProductIDMappedInSchSlbSubBukBenifitsForCalculation);
                            listArrayFreePrdctQty.push(strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail);
                        }
                    }

                    if (BenSubBucketType == 6) //6. Discount in Percentage with same product 	
                    {
                        var arrProductIDMappedInSchSlbSubBukBenifits = new Array();

                        var strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail = fectStatusIfBeniftRowIdExistsInSchemeSlabBenefitsValueDetail(BenifitRowID, toMultiply, BenSubBucketValue, BenSubBucketType);

                        alrtStopResult = false;
                        if (SchTypeId == 3) {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID && element.ProductID == prdID);
                            });
                        } else {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID);
                            });
                        }

                        var BenSubBucketAssingnedValue = BenSubBucketValue;

                        if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                            var cntTotPrd = 0;
                            var flgAddOnBenefit = IsDiscountOnTotalAmount;
                            var trPrdctOdrQty = $("#tblPrdItemsMain tr[flgdata=1][oqty!=0]");

                            for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < trPrdctOdrQty.length; cntProdcutsRowIdCnt++) {
                                var PID = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("skunodeid");
                                var PrdExist = jQuery.grep(arrProductIDMappedInSchSlbSubBukRowId, function (element, index) {
                                    return (element.ProductID == PID);
                                });

                                if (PrdExist.length > 0) {
                                    cntTotPrd++;
                                    var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                        return (element.schId == schId && element.ProductID == PID);
                                    });
                                    if (UniqueSKu.length == 0) {
                                        arrUniqueProduct.push({ schId: schId, ProductID: PID });
                                        var productNameValue = trPrdctOdrQty[cntProdcutsRowIdCnt].cells[OrderQntyIndx].children[0].value;
                                        var productid = PID;
                                        var arr = new Array();
                                        arr = [{ productNameValue: productNameValue, ProductID: productid }];
                                        arrProductIDMappedInSchSlbSubBukBenifits.push(arr[0]);
                                        var noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                            BenSubBucketType + "~" + 0 + "~" + BenSubBucketValue + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                            0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit;
                                        stringSchemeIdWthAllVal.push(noAlrtsubValues);
                                        if (SchTypeId == 3) {
                                            var trOrderQty = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + prdID + "]");
                                            if (trOrderQty.length > 0) {
                                                productNameValue = trOrderQty[0].cells[OrderQntyIndx].children[0].value;
                                            }
                                            var noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                                BenSubBucketType + "~" + 0 + "~" + BenSubBucketValue + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                                0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit;
                                            var arr = new Array();
                                            arr = [{ productNameValue: 0, ProductID: prdID }];
                                            arrProductIDMappedInSchSlbSubBukBenifits.push(arr[0]);
                                            var arrBenifit = new Array();
                                            arrBenifit = [{ productNameValue: productNameValue, ProductID: prdID }]
                                            var arr = new Array();
                                            arr = [{ ProductID: prdID, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrBenifit }];
                                            noAlrtHshMaptoSaveData.push(arr[0]);
                                            break;
                                        }
                                        else {
                                            var arr = new Array();
                                            arr = [{ productNameValue: productNameValue, ProductID: productid }];
                                            arrProductIDMappedInSchSlbSubBukBenifits.push(arr[0]);
                                            var arrBenifit = new Array();
                                            arrBenifit = [{ productNameValue: productNameValue, ProductID: productid }]
                                            var arr = new Array();
                                            arr = [{ ProductID: productid, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrBenifit }];
                                            noAlrtHshMaptoSaveData.push(arr[0]);
                                        }
                                    }
                                }

                                if (cntTotPrd == arrProductIDMappedInSchSlbSubBukRowId.length) {
                                    break;
                                }
                            }
                        }
                        listArrayHashmapProduct.push(arrProductIDMappedInSchSlbSubBukBenifits);
                        listArrayFreePrdctQty.push(strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail);
                    }

                    if (BenSubBucketType == 7) //7. Discount in Amount with same product 	
                    {
                        if (SchTypeId == 3) {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID && element.ProductID == prdID);
                            });
                        } else {
                            arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                                return (element.RowID == schSlbSubRowID);
                            });
                        }

                        var countProdPurchased = 0;
                        var TotalValueWeightage = 0.00;
                        var DiscountValue = 0.00;

                        var BenSubBucketAssingnedValue = BenSubBucketValue;
                        if (Prorata == 1) {
                            BenSubBucketValue = (parseFloat(TotalWeightage) * parseFloat(BenSubBucketValue)) / parseFloat(schSlabSubBucketValue);
                        }

                        var arrProductIDMappedInSchSlbSubBukBenifits = new Array();

                        var strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail = fectStatusIfBeniftRowIdExistsInSchemeSlabBenefitsValueDetail(BenifitRowID, toMultiply, BenSubBucketValue, BenSubBucketType);

                        var flgAddOnBenefit = IsDiscountOnTotalAmount;

                        alrtStopResult = false;
                        if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                            var cntTotPrd = 0;
                            var trPrdctOdrQty = $("#tblPrdItemsMain tr[flgdata=1][oqty!=0]");
                            for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < trPrdctOdrQty.length; cntProdcutsRowIdCnt++) {
                                var PID = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("skunodeid");
                                var PrdExist = jQuery.grep(arrProductIDMappedInSchSlbSubBukRowId, function (element, index) {
                                    return (element.ProductID == PID);
                                });
                                if (PrdExist.length > 0) {
                                    cntTotPrd++;
                                    var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                        return (element.schId == schId && element.ProductID == PID);
                                    });
                                    if (UniqueSKu.length == 0) {
                                        arrUniqueProduct.push({ schId: schId, ProductID: PID });
                                        var productNameValue = trPrdctOdrQty[cntProdcutsRowIdCnt].cells[OrderQntyIndx].children[0].value;
                                        var productid = PID;

                                        var StandardRateBeforeTax = $(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("standardratebeforetax") == undefined ? 0 : $(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("standardratebeforetax");
                                        var StandardRate = $(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("standardratebeforetax") == undefined ? 0 : $(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("standardratebeforetax");
                                        var Grammage = $(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("grammage");
                                        var flgPriceChange = 0;// $(trPrdctOdrQty[0]).data("flgbatchpricechange") ? 0 : $(trPrdctOdrQty[0]).data("flgbatchpricechange");
                                        var flgQuoteApplied = 0;// $(trPrdctOdrQty[0]).is("[flgQuoteApplied]") ? 1 : 0;
                                        var ValBeforeTax = 0.00;

                                        var DiscountedVal = 0;
                                        if (schSlabSubBucketType == 5) {
                                            var TotalIndivisualWeight = parseFloat(Grammage) * 1000 * parseInt(productNameValue);
                                            DiscountedVal = (parseFloat(TotalIndivisualWeight) * parseFloat(BenSubBucketValue)) / parseFloat(TotalWeightage);
                                        }
                                        else {
                                            var TotalIndivisualWeight = parseFloat(StandardRate) * parseInt(productNameValue);
                                            DiscountedVal = (parseFloat(TotalIndivisualWeight) * parseFloat(BenSubBucketValue)) / parseFloat(TotalWeightage);
                                        }


                                        var noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                            BenSubBucketType + "~" + 0 + "~" + DiscountedVal + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                            0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit;
                                        stringSchemeIdWthAllVal.push(noAlrtsubValues);
                                        if (SchTypeId == 3) {
                                            var trOrderQty = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + prdID + "]");
                                            if (trOrderQty.length > 0) {
                                                productNameValue = trOrderQty[0].cells[OrderQntyIndx].children[0].value;
                                            }
                                            var noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                                BenSubBucketType + "~" + 0 + "~" + DiscountedVal + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                                0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit;
                                            var arr = new Array();
                                            arr = [{ productNameValue: 0, ProductID: prdID }];
                                            arrProductIDMappedInSchSlbSubBukBenifits.push(arr[0]);
                                            var arrBenifit = new Array();
                                            arrBenifit = [{ productNameValue: 0, ProductID: prdID }]
                                            var arr = new Array();
                                            arr = [{ ProductID: prdID, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrBenifit }];
                                            noAlrtHshMaptoSaveData.push(arr[0]);
                                            break;
                                        }
                                        else {
                                            var arr = new Array();
                                            arr = [{ productNameValue: productNameValue, ProductID: productid }];
                                            arrProductIDMappedInSchSlbSubBukBenifits.push(arr[0]);
                                            var arrBenifit = new Array();
                                            arrBenifit = [{ productNameValue: productNameValue, ProductID: productid }]
                                            var arr = new Array();
                                            arr = [{ ProductID: productid, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrBenifit }];
                                            noAlrtHshMaptoSaveData.push(arr[0]);
                                        }
                                    }

                                }
                                if (cntTotPrd == arrProductIDMappedInSchSlbSubBukRowId.length) {
                                    break;
                                }
                            }
                            listArrayHashmapProduct.push(arrProductIDMappedInSchSlbSubBukBenifits);
                            listArrayFreePrdctQty.push(strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail);
                        }

                    }

                    if (BenSubBucketType == 8 || BenSubBucketType == 9) //8. Percentage On Invoice	
                    {
                        var arrProductIDMappedInSchSlbSubBukBenifits = new Array();
                        var strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail = fectStatusIfBeniftRowIdExistsInSchemeSlabBenefitsValueDetail(BenifitRowID, toMultiply, BenSubBucketValue, BenSubBucketType);

                        alrtStopResult = false;
                        var BenSubBucketAssingnedValue = BenSubBucketValue;
                        if (BenSubBucketType == 9) {
                            if (Prorata == 1) {
                                BenSubBucketValue = (parseFloat(TotalWeightage) * parseFloat(BenSubBucketValue)) / parseFloat(schSlabSubBucketValue);
                            }
                        }

                        arrProductIDMappedInSchSlbSubBukRowId = jQuery.grep(SchemeDetailByStore[0].Table4, function (element, index) {
                            return (element.RowID == schSlbSubRowID);
                        });
                        if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {
                            var cntTotPrd = 0;
                            var flgAddOnBenefit = IsDiscountOnTotalAmount;
                            var trPrdctOdrQty = $("#tblPrdItemsMain tr").filter("[flgdata=1][oqty!=0]");
                            for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < trPrdctOdrQty.length; cntProdcutsRowIdCnt++) {
                                var ProductID = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("skunodeid");
                                var PrdExist = jQuery.grep(arrProductIDMappedInSchSlbSubBukRowId, function (element, index) {
                                    return (element.ProductID == ProductID);
                                });
                                var curntProdRate = parseFloat(trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("standardratebeforetax"));
                                var flgPriceChange = 0;// trPrdctOdrQty.eq(cntProdcutsRowIdCnt).data("flgbatchpricechange") == undefined ? 0 : trPrdctOdrQty.eq(cntProdcutsRowIdCnt).data("flgbatchpricechange");
                                var flgQuoteApplied = 0;// trPrdctOdrQty.eq(cntProdcutsRowIdCnt).is("[flgQuoteApplied]") ? 1 : 0;
                                var Grammage = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("grammage");
                                Grammage = Grammage == undefined ? 0 : Grammage;
                                if (PrdExist.length > 0) {
                                    cntTotPrd++;
                                    var UniqueSKu = jQuery.grep(arrUniqueProduct, function (element, index) {
                                        return (element.schId == schId && element.ProductID == ProductID);
                                    });
                                    if (UniqueSKu.length == 0) {
                                        arrUniqueProduct.push({ schId: schId, ProductID: ProductID });
                                        var productNameValue = trPrdctOdrQty[cntProdcutsRowIdCnt].cells[OrderQntyIndx].children[0].value;
                                        var TotalIndivisualWeight = 0;
                                        TotalIndivisualWeight = curntProdRate * parseInt(productNameValue);
                                        if (BenSubBucketType == 9) {
                                            if (schSlabSubBucketType == 5) {
                                                var TotalIndivisualWeight = parseFloat(Grammage) * 1000 * parseInt(productNameValue);
                                                var DiscountedVal = (parseFloat(TotalIndivisualWeight) * parseFloat(BenSubBucketValue)) / parseFloat(TotalWeightage);
                                            }

                                            else {
                                                var DiscountedVal = (parseFloat(TotalIndivisualWeight) * parseFloat(BenSubBucketValue)) / parseFloat(TotalWeightage);
                                            }
                                        } else {
                                            var DiscountedVal = BenSubBucketValue;
                                        }
                                        var arr1 = new Array();
                                        arr1 = [{ productNameValue: "", ProductID: ProductID }];
                                        arrProductIDMappedInSchSlbSubBukBenifits.push(arr1[0]);
                                        var noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                            BenSubBucketType + "~" + 0 + "~" + DiscountedVal + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                            0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit;

                                        stringSchemeIdWthAllVal.push(noAlrtsubValues);

                                        var arr = new Array();
                                        arr = [{ ProductID: ProductID, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arr1 }];
                                        noAlrtHshMaptoSaveData.push(arr[0]);
                                    }
                                }
                                if (cntTotPrd == arrProductIDMappedInSchSlbSubBukRowId.length) {
                                    break;
                                }
                            }
                            listArrayHashmapProduct.push(arrProductIDMappedInSchSlbSubBukBenifits);
                            listArrayFreePrdctQty.push(strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail);
                        }
                    }

                }
            }
        }
        if (noAlrtHshMaptoSaveData.length > 0) {
            saveFreeProductDataWithSchemeToDatabase(noAlrtHshMaptoSaveData, prdID);
        }

    }

}

function saveFreeProductDataWithSchemeToDatabase(hashMapSelectionFreeQty, savProductIdOnClicked) {
    // debugger;
    var freeProduct;
    var listFreeProdctQtyScheme;
    var storeID = $("#hdnStoreID").val();
    var freeProductId = 0;
    var ProductId = 0;
    var OldFreePrdID = 0;
    var OldSlabID = 0;
    for (var entry in hashMapSelectionFreeQty) {
        ProductId = hashMapSelectionFreeQty[entry].ProductID;
        listFreeProdctQtyScheme = hashMapSelectionFreeQty[entry].stringSchemeIdWthAllVal;
        var arrOtherBenfit = hashMapSelectionFreeQty[entry].freeProduct;

        var arrayAllValues = listFreeProdctQtyScheme.split("~");
        var exception = arrayAllValues[0];
        //var exceptionvalue = exception.split("^")[0];
        var schemeId = parseInt(arrayAllValues[1]);
        var schemeSlabId = parseInt(arrayAllValues[2]);
        var schemeSlabBcktId = parseInt((arrayAllValues[3]));
        var schemeSlabSubBcktVal = parseFloat(arrayAllValues[4]);
        var schemeSubBucktValType = parseInt(arrayAllValues[5]);
        var schemeSlabSubBucktType = parseInt(arrayAllValues[6]);
        var benifitRowId = parseInt(arrayAllValues[7]);
        var benSubBucketType = parseInt(arrayAllValues[8]);
        var benifitSubBucketValue = (arrayAllValues[10].indexOf(".") > -1 ? arrayAllValues[10] : arrayAllValues[10] + ".00");
        var benifitMaxValue = (arrayAllValues[11].indexOf(".") > -1 ? arrayAllValues[11] : arrayAllValues[11] + ".00");
        var benifitAssignedVal = (arrayAllValues[11].indexOf(".") > -1 ? arrayAllValues[11] : arrayAllValues[11] + ".00");
        var benifitAssignedValueType = parseInt(arrayAllValues[13]);
        var benifitDiscountApplied = parseFloat(arrayAllValues[14]);
        var benifitCoupnCode = arrayAllValues[15];
        var per = parseFloat(arrayAllValues[16]);
        var orderqty = parseInt(arrayAllValues[22]);
        var UOM = parseFloat(arrayAllValues[17]);
        var schSlbRowId = parseInt(arrayAllValues[18]);
        var SchTypeId = parseInt(arrayAllValues[19]);
        var TotalWeightage = parseFloat(arrayAllValues[20]);
        var Prorata = parseInt(arrayAllValues[21]);
        var flgAddOnScheme = parseInt(arrayAllValues[23]);
        var flgAddOnBenefit = parseInt(arrayAllValues[24]);
        var WhatFinallyApplied = 0;
        var withoutexceptionbenvalue = benifitSubBucketValue;
        var IsPayoutFixedData = jQuery.grep(SchemeDetailByStore[0].Table1, function (element, index) {
            return (element.SchemeID == schemeId);
        });
        var IsPayoutFixed = 0;
        var orderqty = parseInt($("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]")[0].cells[OrderQntyIndx].children[0].value);
        if ((benSubBucketType == 1 || benSubBucketType == 5) && OldSlabID != schemeSlabId)//Free Different Product, Free Same Product
        {
            OldFreePrdID = freeProductId;
            WhatFinallyApplied = 1;
        }

        if (benSubBucketType == 8 || benSubBucketType == 9) {
            freeProductId = 0;
        }
        if (benSubBucketType == 10) {
            benifitAssignedVal = benifitSubBucketValue;
        }

        for (var i in arrOtherBenfit) {
            freeProductId = arrOtherBenfit[i].ProductID;
            var ProductName = arrOtherBenfit[i].FreeProductName == undefined ? "" : arrOtherBenfit[i].FreeProductName;
            var SKUCode = arrOtherBenfit[i].SKUCode == undefined ? "" : arrOtherBenfit[i].SKUCode;

            if ($("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").length > 0) {
                var Grammage = "0.00";// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").data("grammage") == undefined ? "0.00" : $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").data("grammage");
                var ProductName = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").text();
                var SKUCode = "";
                var StandardRate = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").attr("StandardRateBeforeTax") == undefined ? "0.00" : $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").attr("standardratebeforetax");
                var StandardRateBeforeTax = StandardRate;// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").attr("standardratebeforetax") == undefined ? "0.00" : $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").data("standardratebeforetax");
                var Tax = "0.00";// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").data("tax") == undefined ? "0.00" : $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").data("tax");
                var MRP = "0.00";// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").data("mrp") == undefined ? "0.00" : $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").data("mrp");
                var CurrentInvStock = 0;// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").data("currentinvstock") == undefined ? 0 : parseInt($("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").data("currentinvstock"));
                var BookingInvStock = 0;// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").data("bookinginvstock") == undefined ? 0 : parseInt($("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").data("bookinginvstock"));
            } else {
                var Grammage = "0.00";
                var StandardRate = "0.00";
                var StandardRateBeforeTax = "0.00";
                var Tax = "0.00";
                var MRP = "0.00";
                var CurrentInvStock = 0;
                var BookingInvStock = 0;
            }

            //BenSubBucketType
            //1. Free Other Product 
            //2. Discount in Percentage with other product
            //3. Discount in Amount with other product
            //4. Coupons
            //5. Free Same Product
            //6. Discount in Percentage with same product
            //7. Discount in Amount with same product
            //8. Percentage On Invoice
            //9.  Amount On Invoice
            //10. Volume Based Per KG
            StandardRate = parseFloat(StandardRate).toFixed(4);
            var arrProductAppliedSchemesBenifitsRecords = new Array();
            arrProductAppliedSchemesBenifitsRecords = [{
                storeID: storeID, ProductID: ProductId, schemeId: schemeId, schemeSlabId: schemeSlabId,
                schemeSlabBcktId: schemeSlabBcktId, schemeSlabSubBcktVal: schemeSlabSubBcktVal, schemeSubBucktValType: schemeSubBucktValType, schemeSlabSubBucktType: schemeSlabSubBucktType, benifitRowId: benifitRowId, benSubBucketType: benSubBucketType,
                freeProductId: freeProductId, benifitSubBucketValue: benifitSubBucketValue, benifitMaxValue: benifitMaxValue, benifitAssignedVal: benifitAssignedVal,
                benifitAssignedValueType: benifitAssignedValueType, benifitDiscountApplied: benifitDiscountApplied, benifitCoupnCode: benifitCoupnCode,
                per: per, UOM: UOM, WhatFinallyApplied: WhatFinallyApplied, schSlbRowId: schSlbRowId, SchTypeId: SchTypeId, TotalWeightage: TotalWeightage, Prorata: Prorata, ProductName: ProductName, SKUCode: SKUCode, UOMID: UOM, StandardRate: parseFloat(StandardRate).toFixed(4), StandardRateBeforeTax: parseFloat(StandardRateBeforeTax).toFixed(4), Tax: parseFloat(Tax).toFixed(4),
                MRP: parseFloat(MRP).toFixed(4), CurrentInvStock: CurrentInvStock, BookingInvStock: BookingInvStock, Grammage: parseFloat(Grammage).toFixed(2), orderqty: orderqty, exceptionvalue: exception, withoutexceptionbenvalue: withoutexceptionbenvalue, flgAddOnScheme: flgAddOnScheme, flgAddOnBenefit: flgAddOnBenefit, IsPayoutFixed: IsPayoutFixed, IsPayoutFixedApplied: 0
            }];

            arrStoreProductAppliedSchemesBenifitsRecords.push(arrProductAppliedSchemesBenifitsRecords[0]);
        }
        OldSlabID = schemeSlabId;
    }
}
function isPercentKey(evt) {
    var val1;
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

    if (val1 > 100)
        return false;
    if (parts.length == 2 && parts[1].length >= 2)
        return false;
}




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

function isNumberKeyNotDecimal(evt) {
    //debugger;
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;


    return true;
}

function isNumericWithOneDecimal(evt) {
    var val1;
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




var FocBndSBFOrd = 0; var FocBndSBFQtyOrd = 0; var FocBndSBFValueOrd = 0;
var SBDSBFOrd = 0; var SBDTotalGap = 0;
function fnSaveOrderData(flg, OrderDetail) {
    $("#cphRight_hdnPrdId").val("");
    $("#dvConfirmButton").html("");

    btnType = flg;
    var ProcessType = 1;

    var strs = $("#cphRight_hdnNewStoreDetail").val();// = "5^ABC^2^1";//StoreId^StoreName^flgApproved^flgGST

    var StoreID = strs.split("^")[0];

    var TeleCallID = strs.split("^")[3];
    var flgProductive = 0;

    var OrderMaster = new Array();

    var OrderId = $("#cphRight_hdnOrderID").val();
    var OrderDate = $("#txtOrderDate").val();
    var OrderByCustomerNodeId = $("#hdnStoreID").val(); //$($("#tblBasicDetail")[0].rows[0].cells[2]).find("input").attr("custid");
    var OrderByCustomerNodeType = 0;// $("#ddlCmpnyCustomer option[value=" + OrderByCustomerNodeId + "]").attr("NodeType");
    var CustomerPONo = 0;
    var CustomerPODate = "";
    var Remarks = "";// $("#txtRemarks").val();
    //debugger;
    var NetOrderValue = $("#tdNettInvValue").data("NettInvValue") == undefined ? "0.00" : $("#tdNettInvValue").data("NettInvValue");
    var TotInvSchemeDiscount = $("#tdInvSchemeDiscount").data("InvSchemeDiscount") == undefined ? "0.00" : $("#tdInvSchemeDiscount").data("InvSchemeDiscount");
    var flgInvoiceOnDelivery = 1;// $("#ddlDelivryRqrd").val();
    var flgCollectionOnDelivery = 1;// $("#ddlInvoiceReq").val();
    var FreightRuleId = 3;// $("#ddInsurance").val();
    var CollectionRuleId = 1;// $("#ddCST").val();
    var DlvryRuleId = 1;// $("#ddFreight").val();
    var InvRuleId = 2;//$("#txtAgentName").val();
    var InsRuleId = 4;// $("#ddlInvoicePhasing").val();
    var TaxRuleId = 1;// $("#rdoCanDeliverInPart input[type=radio]:checked").val();
    var OrdPrcsId = 6;
    var OrderStatusId = 1;
    var OrdPrcsIdOLD = 6;
    var OrderStatusIdOLD = 1;


    if (parseFloat(NetOrderValue) == 0) {
        //fnNoOrderReason();
        //$("#dvFadeForProcessing").css("display", "none");
        // return false;

    } else {
        flgProductive = 1;
    }



    if (flg == 2) {
        OrdPrcsId = 1;
        OrderStatusId = 1;
        $("#cphRight_hdnOrdPrcsId").val("1");
        $("#cphRight_hdnOrderStatusID").val("1");
    }

    //return false;
    var flgOrderClosed = 0;
    var SalesPersonId = 0;
    SalesPersonId = -1;
    var SalesPersonNodeType = 0;
    var OrderSourceID = 2;
    var flgOffline = $("#cphRight_hdnflgOffline").val();
    var ReasonId = 0;
    var ReasonText = "";
    var DeliveryDate = $("#txtRequiredDlvryDate").val();
    var TotOrderVal = $("#tdInvValue").data("InvValue");
    var TotMRPValue = $("#tdInvMRP").data("InvMRP");
    var TotLineLevelDisc = $("#tdLineSchemeDiscount").data("LineSchemeDiscount");
    var TotDiscVal = $("#tdOverallInvSchemeDiscount").data("OverallInvSchemeDiscount");
    var GPValue = $("#tdsbdCount").attr("gpvalue");
    SBDTotalGap = $("#tdsbdCount").prev().html().trim();
    var trFBs = $("#tblFocusBrandMain tbody tr");
    var FocBndAlrAch = 0; var FocBndNowAch = 0;
    for (var f = 0; f < trFBs.length; f++) {
        var flgOldAchievement = $("#tblFocusBrandMain tbody tr").eq(f).attr("flgOldAchievement");
        var flgNewAchievement = $("#tblFocusBrandMain tbody tr").eq(f).attr("flgNewAchievement");
        if (flgOldAchievement == 1) {
            FocBndAlrAch++;
        }
        if (flgOldAchievement == 0 && flgNewAchievement == 1) {
            FocBndNowAch++;
        }
    }
    var NoOfLSSAct = arrLssApplied.length;
    var arrStarsDet = [];
    var FiveStar = 0;
    if (IsFiveStarApplicable == 1) {
        for (var s = 0; s < $("#tblStarEarnedSummary tbody tr").length; s++) {
            var IsAchieved = $("#tblStarEarnedSummary tbody tr").eq(s).data("achieved");
            IsAchieved = (IsAchieved == undefined || IsAchieved == null || IsAchieved == "") ? 0 : IsAchieved;
            IsAchieved = isNaN(IsAchieved) ? 0 : IsAchieved;
            FiveStar += parseInt(IsAchieved);
            arrStarsDet.push({ ParametrId: (s + 1), IsAchieved: IsAchieved });
        }
    }

    var DSEIssueIds = "";
    for (var d = 0; d < $("#divConnectedReason input[name='chkCnted']:checked").length; d++) {
        if (DSEIssueIds == "") {
            DSEIssueIds = $("#divConnectedReason input[name='chkCnted']:checked").eq(d).val();
        } else {
            DSEIssueIds += "," + $("#divConnectedReason input[name='chkCnted']:checked").eq(d).val();
        }
    }
    var DSEComments = $("#txtRemarksToDsr").val().trim();

    // alert(JSON.stringify(arrStarsDet));
    arrayRowData = [{
        OrderId: OrderId, OrderDate: OrderDate, OrderByCustomerNodeId: OrderByCustomerNodeId, OrderByCustomerNodeType: OrderByCustomerNodeType, CustomerPONo: CustomerPONo,
        CustomerPODate: CustomerPODate, Remarks: Remarks, NetOrderValue: NetOrderValue, OrderStatusId: OrderStatusId, flgOrderClosed: flgOrderClosed, SalesPersonId: SalesPersonId
        , SalesPersonNodeType: SalesPersonNodeType, OrderSourceID: OrderSourceID, flgOffline: flgOffline, OrdPrcsId: OrdPrcsId, ReasonId: ReasonId, ReasonText: ReasonText, DeliveryDate: DeliveryDate,
        TotOrderVal: TotOrderVal, TotMRPValue: TotMRPValue, TotLineLevelDisc: TotLineLevelDisc, TotDiscVal: TotDiscVal, GPValue: GPValue
        , FocBndAlrAch: FocBndAlrAch, FocBndNowAch: FocBndNowAch, FocBndSBFOrd: FocBndSBFOrd, FocBndSBFQtyOrd: FocBndSBFQtyOrd,
        FocBndSBFValueOrd: FocBndSBFValueOrd, SBDSBFOrd: SBDSBFOrd, SBDTotalGap: SBDTotalGap, NoOfLSSAct: NoOfLSSAct, FiveStar: FiveStar, DSEComments: DSEComments, DSEIssueIds: DSEIssueIds
    }];

    OrderMaster.push(arrayRowData[0]);


    try {

        PageMethods.fnspPopulateOrderDetail(OrderMaster, OrderDetail, arrStoreProductAppliedSchemesBenifitsRecords, flgProductive, TeleCallID, 0, "", $("#cphRight_hdnSalesNodeId").val(), $("#cphRight_hdnSalesNodeType").val(), $("#cphRight_hdnLoginId").val(), arrStarsDet, fnSuccessPopulateOrderDetail, fnFailed);
    }
    catch (err) {
        alert(err);
        $("#dvFadeForProcessing").css("display", "none");
    }
}



var isreturnavailYes = 0;
function fnSaveFinalData(flg) {
    isreturnavailYes = 0;
    //debugger;
    var sessionVal = $("#cphRight_hdnLoginId").val();
    if (sessionVal == "") {
        alert("Session expired. Please re-login again!!");
        window.location.href = "../frmLogin.aspx";
        return false;
    }
    $("#dvFadeForProcessing").css("display", "block");
    if ($("#txtOrderDate").val() == "") {
        var msgAlert = "Please Enter Order Date!";
        alert(msgAlert);
        $("#dvFadeForProcessing").css("display", "none");
        $("#txtOrderDate").focus();
        return false;
    }


    if ($("#hdnStoreID").val() == "0") {
        var msgAlert = "Please select store fisrt!";
        alert(msgAlert);
        $("#dvFadeForProcessing").css("display", "none");
        $("#txtStoreName").focus();
        return false;
    }


    var NetOrderValue = $("#tdNettInvValue").data("NettInvValue") == undefined ? "0.00" : $("#tdNettInvValue").data("NettInvValue");
    var TotalProductLevelDiscount = $("#tdTotDisValue").data("TotDisValue") == undefined ? "0.00" : $("#tdTotDisValue").data("TotDisValue");
    if (parseFloat(NetOrderValue) == 0) {
        fnNoOrderReason();
        $("#dvFadeForProcessing").css("display", "none");
        return false;

    } else {
        flgProductive = 1;
    }


    var OrderDetail = new Array();
    var trPrdItemsMain = $("#tblPrdItemsMain tr").filter("[flgdata=1]");
    if (trPrdItemsMain.length == 0) {
        var msgAlert = "Please place order first";
        alert(msgAlert);
        $("#dvFadeForProcessing").css("display", "none");
        return false;
    }
    var arrSKUCheck = []; SBDSBFOrd = 0; FocBndSBFOrd = 0; FocBndSBFQtyOrd = 0; FocBndSBFValueOrd = 0;
    var strHTML = "<tbody>"; var OldCategory = ""; var totQqty = 0;
    var arrSKUCheck = [];
    for (var i = 0; i < trPrdItemsMain.length; i++) {
        var Item_ROWNO = i + 1;
        var PrdID = $(trPrdItemsMain[i]).attr("SKUNodeID");
        var PrdCode = "";
        var Category = $(trPrdItemsMain[i]).attr("category");
        var SKUName = $(trPrdItemsMain[i]).find("td").eq(0).find("#hdnprdName").val();
        var MRP = $(trPrdItemsMain[i]).find("td").eq(1).html();
        var OrderQty = parseInt(trPrdItemsMain.eq(i).find("input:text").val());
        var SalesUnitId = 8
        var PriceTermId = 0;
        var ProductPrice = $(trPrdItemsMain[i]).attr("standardratebeforetax");
        var flgsbdgap = $(trPrdItemsMain[i]).attr("flgsbdgap");
        var flgbaseproduct = $(trPrdItemsMain[i]).attr("flgbaseproduct");
        var systemPrice = "0.00";
        var StandardRateBeforeTax = $(trPrdItemsMain[i]).attr("standardratebeforetax");
        var OrderVal = parseFloat(StandardRateBeforeTax) * parseInt(OrderQty); //$(trPrdItemsMain[i].cells[ValueBeforeTaxIndx].children[0]).data("valbeforetax") == undefined ? "0.00" : $(trPrdItemsMain[i].cells[ValueBeforeTaxIndx].children[0]).data("valbeforetax");
        var TotLineDiscVal = $(trPrdItemsMain[i].cells[DiscountIndx]).attr("discountamount") == undefined ? "0.00" : $(trPrdItemsMain[i].cells[DiscountIndx]).attr("discountamount");
        var invdiscountamount = $(trPrdItemsMain[i].cells[DiscountIndx]).attr("invdiscountamount") == undefined ? "0.00" : $(trPrdItemsMain[i].cells[DiscountIndx]).attr("invdiscountamount");
        var LineOrderValWDisc = parseFloat(OrderVal) - parseFloat(TotLineDiscVal);
        var TotTaxValue = 0;
        var NetLineOrderVal = parseFloat(LineOrderValWDisc) + parseFloat(TotTaxValue);
        var TotTaxRate = 0;
        var flgRateChange = 0;
        var flgQuotationApplied = 0;
        var flgCessApplied = 0;

        flgCessApplied = 0;
        var SalesQuoteId = 0;
        var OrderDetailId = 0;
        var SampleQty = 0;
        var FreeQty = 0;
        var PrcBatchID = 0;
        var strSchemeSource = "";
        //debugger;
        var strDeliveryDetail = "";
        var pricechangestr = "";
        var ProductBatch = "";

        var flgPriceChange = 0;
        ProductBatch = "";
        strSchemeSource = ProductBatch;

        var strDeliveryDetailwithTax = ""; // $(trPrdItemsMain[i]).attr("OrderDelivryWithTax");

        var flgsbdgap = $(trPrdItemsMain[i]).attr("flgsbdgap");
        var flgFB = $(trPrdItemsMain[i]).is("[flgfb]") ? $(trPrdItemsMain[i]).attr("flgfb") : 0;
        var flgsbd = $(trPrdItemsMain[i]).is("[flgsbd]") ? $(trPrdItemsMain[i]).attr("flgsbd") : 0;
        var flgInitiative = $(trPrdItemsMain[i]).attr("flgInitiative");
        var SBDGroupid = $(trPrdItemsMain[i]).attr("sbdgroupid");
        var FBId = $(trPrdItemsMain[i]).is("[fbid]") ? $(trPrdItemsMain[i]).attr("fbid") : 0;
        if (parseInt(OrderQty) > 0) {
            if ($.inArray(PrdID, arrSKUCheck) == -1) {
                arrSKUCheck.push(PrdID);
                if (flgFB == 1) {
                    FocBndSBFOrd++;

                    var fbslabtypeid = $("#tblFocusBrandMain tr[fbid='" + FBId + "']").attr("slabtypeid");
                    if (fbslabtypeid == 1) {
                        FocBndSBFQtyOrd += parseInt(OrderQty);
                    } else {
                        FocBndSBFValueOrd += parseFloat(OrderVal);
                    }
                }
                if (flgsbd > 0) {
                    if ($.inArray(SBDGroupid, arrSKUCheck) == -1) {
                        SBDSBFOrd++;
                    }
                }

                arrayRowData = new Array();
                OrderVal = OrderVal.toString().split(".").length == 1 ? OrderVal + ".00" : OrderVal;
                ProductPrice = ProductPrice.toString().split(".").length == 1 ? ProductPrice + ".00" : ProductPrice
                TotLineDiscVal = TotLineDiscVal.toString().split(".").length == 1 ? TotLineDiscVal + ".00" : TotLineDiscVal;
                LineOrderValWDisc = LineOrderValWDisc.toString().split(".").length == 1 ? LineOrderValWDisc + ".00" : LineOrderValWDisc;
                TotTaxRate = TotTaxRate.toString().split(".").length == 1 ? TotTaxRate + ".00" : TotTaxRate;
                TotTaxValue = TotTaxValue.toString().split(".").length == 1 ? TotTaxValue + ".00" : TotTaxValue;
                NetLineOrderVal = NetLineOrderVal.toString().split(".").length == 1 ? NetLineOrderVal + ".00" : NetLineOrderVal;
                invdiscountamount = invdiscountamount.toString().split(".").length == 1 ? invdiscountamount + ".00" : invdiscountamount;

                arrayRowData = [{
                    PrdNodeID: PrdID, PrdNodeType: 40, OrderQty: OrderQty, SalesUnitId: SalesUnitId, ProductPrice: ProductPrice,
                    LineOrderValue: OrderVal, DiscValue: TotLineDiscVal, LineOrderValueAfterDisc: LineOrderValWDisc,
                    NetValue: NetLineOrderVal, InvLevelDisc: invdiscountamount, flgSBDGap: flgsbdgap, flgFB: flgFB, flgInitiative: flgInitiative, SBDGroupid: SBDGroupid, flgSBD: flgsbd, FBId: FBId
                }];
                totQqty += parseInt(OrderQty);
                OrderDetail.push(arrayRowData[0]);
                var sborder = "border-style:none;";
                var sCategory = Category;
                if (OldCategory != Category) {
                    sborder = "border-style:none;border-top:1px solid #636464;"

                } else {
                    sCategory = "";
                }
                strHTML += "<tr>";
                strHTML += "<td style='height:20px;padding-left:5px;" + sborder + "'>" + sCategory + "</td>";
                strHTML += "<td style='text-align:left;padding-left:5px;background-color:" + (flgsbdgap == 1 ? (flgbaseproduct == 1 ? "#e8d2d2" : "#f9f2f2") + "" : "") + "'>" + SKUName.trim() + "</td>";
                strHTML += "<td style='text-align:right;padding-right:5px'>" + MRP + "</td>";
                strHTML += "<td style='text-align:right;padding-right:5px'>" + OrderQty + "</td>";
                strHTML += "<td style='text-align:center;'>Pcs</td>";
                strHTML += "<td style='text-align:right;padding-right:5px'>&#8377; " + parseFloat(StandardRateBeforeTax).toFixed(2) + "</td>";
                strHTML += "<td style='text-align:right;padding-right:5px'>&#8377; " + parseFloat(TotLineDiscVal).toFixed(2) + "</td>";
                strHTML += "<td style='text-align:right;padding-right:5px'>&#8377; " + parseFloat(LineOrderValWDisc).toFixed(2) + "</td>";
                strHTML += "</tr>";
                OldCategory = Category;
            }
        }
    }

    var TotNetLineValue = $("#tdTotNetLineValue").html();
    strHTML += "</tbody><tfoot><tr bgcolor='#5b5b5b' style='color:#ffffff;font-weight:bold'>";
    strHTML += "<td colspan=\"3\" style='text-align:left;padding-left:5px;height:25px'># of Ordered SKU's:&nbsp;&nbsp;" + OrderDetail.length + "</td>";
    strHTML += "<td style='text-align:right;padding-right:5px'>" + totQqty + "</td>";
    strHTML += "<td align='center'>Pcs</td>";
    strHTML += "<td></td>";
    strHTML += "<td style='text-align:right;padding-right:5px'>&#8377; " + parseFloat(TotalProductLevelDiscount).toFixed(2) + "</td>";
    strHTML += "<td style='text-align:right;padding-right:5px'>" + TotNetLineValue + "</td>";
    strHTML += "</tr></tfoot></table>";

    var strHTML1 = "<thead><tr>";
    strHTML1 += "<td align='center' style='height:25px;background-color:#066b60;color:#ffffff;font-weight:bold'>Category</td>";
    strHTML1 += "<td align='center' style='height:25px;background-color:#066b60;color:#ffffff;font-weight:bold'>Product Description</td>";
    strHTML1 += "<td style='text-align:center;background-color:#066b60;color:#ffffff;font-weight:bold;width:10%'>MRP</td>";
    strHTML1 += "<td style='text-align:center;background-color:#066b60;color:#ffffff;font-weight:bold'>Order Qty</td>";
    strHTML1 += "<td style='text-align:center;background-color:#066b60;color:#ffffff;font-weight:bold'>UOM</td>";
    strHTML1 += "<td style='text-align:center;background-color:#066b60;color:#ffffff;font-weight:bold;width:10%'>Rate</td>";
    strHTML1 += "<td style='text-align:center;background-color:#066b60;color:#ffffff;font-weight:bold;width:10%'>DiscVal</td>";
    strHTML1 += "<td style='text-align:center;background-color:#066b60;color:#ffffff;font-weight:bold;width:12%'>Net Line Val</td>";
    strHTML1 += "</tr></thead><tbody></tbody>";
    if (IsFiveStarApplicable == 1) {
        fnCalculateStarEarned();
    }
    var alertmsg = "<div style='text-align:left;margin-bottom:4px;padding:3px'><b>Kindly review below order before submitting : </b></div>";
    alertmsg += "<div id='divfixedHeaderPOP' style='position:fixed'><table id='tbl_Status_fixedheadPop' border='1' rules='all' style='text-align:left;' cellpadding='2' cellspacing='0'>" + strHTML1 + "</table></div>";
    alertmsg += "<div style='max-height:208px;overflow-y:auto' id='divdrmmainPOP'><table id='tbldbrlistPop' border='1' rules='all' style='text-align:left;width:100%' cellpadding='2' cellspacing='0'>" + strHTML1 + strHTML + "</div>";
    alertmsg += "<div style='margin:4px auto;width:99%'>";
    alertmsg += "<fieldset>";
    if (IsFiveStarApplicable == 1) {
        alertmsg += "<div style='width:48%;float:left'>";
    } else {
        alertmsg += "<div style='width:100%;'>";
    }
    alertmsg += "<div style='padding:5px;background-color:#1f4e78;color:#fff;width:150px;margin:0px auto'>Invoice Summary</div>";
    alertmsg += "<div>";
    alertmsg += "<table class='table table-bordered table-condensed' style='margin-bottom:0px'>" + $("#tblInvSummary")[0].innerHTML + "</table>";
    alertmsg += "</div>";
    alertmsg += "</div>";
    if (IsFiveStarApplicable == 1) {

        alertmsg += "<div style='width:44%;float:right;margin-right:10px'>";
        alertmsg += "<div style='padding:5px;background-color:#1f4e78;color:#fff;width:150px;margin:0px auto'>Star Earned</div>";
        alertmsg += "<div>";
        alertmsg += "<table class='table table-bordered table-condensed' style='margin-bottom:0px' id='tblStarEarnedSummaryPop'>" + $("#tblStarEarnedSummary")[0].innerHTML + "</table>";
        alertmsg += "</div>";
        alertmsg += "</div>";
    }
    alertmsg += "</fieldset>";
    alertmsg += "</div>";
    $("#dvIsreturn")[0].innerHTML = alertmsg;
    $("#tblStarEarnedSummaryPop").find("td[flg=2]").remove();
    $(window).scrollTop(0);
    $("body").removeClass("clsbody").addClass("bodyScrollHidden");
    $("#dvIsreturn").dialog({
        title: "Review Order",
        resizable: false,
        modal: true,
        width: "75%",
        height: window.innerHeight - 5,
        close: function () {
            $(this).dialog("destroy");
            $("body").removeClass("bodyScrollHidden").addClass("clsbody");
        },
        open: function () {

            $("#dvFadeForProcessing").hide();
            if ($("#tbldbrlistPop").length > 0) {
                for (i = 0; i < $("#tbldbrlistPop thead").find("td").length; i++) {
                    $("#tbl_Status_fixedheadPop").find("td").eq(i).css("width", $("#tbldbrlistPop thead").find("td")[i].offsetWidth);
                }
            }

            if ($("#divConnectedReason input[name='chkCnted']:checked").length > 0) {
                $("div[aria-describedby='dvIsreturn']").find("div.ui-dialog-buttonpane").append("<div style='float:left;display:inline-block;margin:10px'><a href='###' onclick='fnShowRemarksToDSR()' style='color:blue;text-decoration:underline'>Newly Added Task List</a></div>")
            }
        },
        buttons: {
            "Submit Order": function () {
                $(this).dialog("close");
                $("#dvFadeForProcessing").css("display", "block");
                fnSaveOrderData(2, OrderDetail);
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        }
    })


}


function fnSuccessPopulateOrderDetail(result, flgProductive) {
    flgCheckPmtTems = 0;
    if (result.split("^")[1] == 1) {
        $("#dvFadeForProcessing").css("display", "none");
        window.parent.fnClosedvOrderPop(2);
    }
    else if (result.split("^")[1] == 4) {
        $("#dvFadeForProcessing").css("display", "none");
        alert(result.split("^")[0]);
        window.location.href = "../frmLogin.aspx";
    }
    else {
        $("#dvFadeForProcessing").css("display", "none");
        alert(result.split("^")[0]);
    }
}



function fnStartLoading() {
    $("#dvFadeForProcessing").css("display", "block");
}
function fnEndLoading() {
    $("#dvFadeForProcessing").css("display", "none");
}
function fnBack() {
    window.location.href = "frmOrderlst.aspx";
}

var arrss = true;
function EnableKeySelection() {
    var trows = document.getElementById('tblPrdContainer').rows, t = trows.length, trow, nextrow,
        addEvent = (function () {
            return window.addEventListener ? function (el, ev, f) {
                el.addEventListener(ev, f, false); //modern browsers
            } : window.attachEvent ? function (el, ev, f) {
                el.attachEvent('on' + ev, function (e) { f.apply(el, [e]); }); //IE 8 and less
            } : function () { return; }; //a very old browser (IE 4 or less, or Mozilla, others, before Netscape 6), so let's skip those
        })();

    while (--t > -1) {
        trow = trows[t];
        trow.className = 'normal';
        addEvent(trow, 'click', highlightRow);
    } //end while

    function highlightRow(gethighlight) { //now dual use - either set or get the highlighted row

        gethighlight = gethighlight === true;
        var t = trows.length;
        while (--t > -1) {
            trow = trows[t];
            if (gethighlight && trow.className === 'highlighted') {
                return t;
            }
            else if (!gethighlight && trow !== this) {
                trow.className = 'normal';
            }
        } //end while
        //var $checked = $("#tblPrdContainer input:checked");
        //$("#tblPrdContainer tr.SelectedCheckBox").removeClass("SelectedCheckBox");
        //for (var k = 0; k < $checked.length; k++) {
        //    $($checked[k]).closest("tr").addClass("SelectedCheckBox");
        //}
        return gethighlight ? null : this.className = this.className === 'highlighted' ? 'normal' : 'highlighted';
    } //end function

    function movehighlight(way, e) {
        e.preventDefault && e.preventDefault();
        e.returnValue = false;
        var idx = highlightRow(true); //gets current index or null if none highlighted
        if (typeof idx === 'number') {//there was a highlighted row
            idx += way; //increment\decrement the index value
            if (idx && (nextrow = trows[idx])) {
                $(nextrow).find("input:checkbox").focus();
                return highlightRow.apply(nextrow);
            } //index is > 0 and a row exists at that index
            else if (idx) {
                $(trows[1]).find("input:checkbox").focus();
                return highlightRow.apply(trows[1]);
            } //index is out of range high, go to first row

            $(trows[trows.length - 1]).find("input:checkbox").focus();
            return highlightRow.apply(trows[trows.length - 1]); //index is out of range low, go to last row
        }
        $(trows[way > 0 ? 1 : trows.length - 1]).find("input:checkbox").focus();
        return highlightRow.apply(trows[way > 0 ? 1 : trows.length - 1]); //none was highlighted - go to 1st if down arrow, last if up arrow
    } //end function
    var flgbooool = 0;
    function processkey(e) {
        switch (e.keyCode) {
            case 38:
                {//up arrow
                    arrss = true;
                    return movehighlight(-1, e)
                }
            case 40:
                {//down arrow
                    arrss = true;
                    $("#chkprd0").focus();
                    return movehighlight(1, e);
                }
            case 9:
                {//Tab
                    if ($("#chkprd0").length > 0) {
                        arrss = true;
                        $("#chkprd0").focus();
                        return movehighlight(1, e);
                    } else {
                        return false;
                    }
                }
            case 13:
                {
                    arrss = true;
                    //GetValue($(".highlighted"));
                    if ($("#tblPrdContainer tr.highlighted").length > 0) {
                        var tr = $("#tblPrdContainer tr.highlighted").eq(0);
                        fnFillOrder(tr, 1, e);
                    }
                }
            case 32:
                {

                    $(e.currentTarget.activeElement).closest("tr").addClass("highlightedRowInChecked");
                    return false;
                }

        }
    } //end function
    addEvent(document, 'keydown', processkey);
}
function killBackSpace() {

}



var isAltlKey = false;
var isSHIFTKey = false;
document.onkeyup = function (evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode == 18) isAltlKey = false;

    if (charCode == 16) isSHIFTKey = false;
}
var active; var activePOP;

document.onkeydown = function (evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode == 18) isAltlKey = true;
    if (charCode == 16) isSHIFTKey = true;
    if (charCode == 27) return false;
    //if (evt.srcElement.type == 'text' || evt.srcElement.type == 'textarea' || evt.srcElement.type == 'select') return true;
    if (charCode === 8) {
        // alert("charCode-" + charCode + "\nnodeName=" + evt.srcElement.nodeName);
        if (evt.srcElement.nodeName == "TD" || evt.target.readOnly == true || evt.srcElement.nodeName == "DIV" || evt.srcElement.nodeName == "BODY" || evt.srcElement.nodeName == "SELECT" || evt.srcElement.type == "checkbox" || evt.srcElement.nodeName == "A") {
            evt.preventDefault();
        }
    }
    else if ((charCode == 38 || charCode == 40)) {

        if ($(evt.target).closest("table").length > 0) {
            if ($(evt.target).closest("table")[0].id == "tblPrdItemsMain") {
                var $table = $("#tblPrdItemsMain tbody");
                $("#tblPrdItemsMain tbody tr").removeClass("highlightedProduct");
                var flgbaseproduct = $(evt.target).closest('tr').attr("flgbaseproduct");
                var flgSBDChild = $(evt.target).closest('tr').find('input[type=text]').attr("flgSBDChild");
                var x = $(evt.target).closest('tr').find("input[type=text]").closest("td").index();
                var y = $(evt.target).closest('tr').index();



                if (charCode == 38) {// <Up>     
                    y--;
                    if (y == 0) {
                        y = $table[0].rows.length - 1;
                    }
                }

                if (charCode == 40) {// <Down>
                    if (flgSBDChild > 1 && flgbaseproduct == 1) {
                        if ($(evt.target).closest('tr').next().css("display") != "table-row") {
                            y = y + parseInt(flgSBDChild) - 1;
                        }
                    }
                    y++;
                    if (y == 0) {
                        y++;
                        x++;
                    }
                    else if (y == $table[0].rows.length) {
                        y = 1;
                    }

                }
                var active = $($("#tblPrdItemsMain tbody")[0].rows[y]).find('input[type=text]');
                if (active.length == 0) {
                    if (charCode == 40) {
                        if (y + 1 == $table[0].rows.length) {
                            y = 1;
                        } else {
                            y = y + 1;
                        }
                    } else {

                        if (y - 1 <= 0) {
                            y = $table[0].rows.length - 1;
                        } else {
                            y = y - 1;
                        }
                        if ($($("#tblPrdItemsMain tbody")[0].rows[y]).attr("flgsbdgap") == 1) {
                            if ($($("#tblPrdItemsMain tbody")[0].rows[y]).css("display") != "table-row") {
                                var sbdgrpnodeid = $($("#tblPrdItemsMain tbody")[0].rows[y]).attr("sbdgroupid");
                                var flgSBDChild = $("#tblPrdItemsMain tbody tr[flgbaseproduct=1][sbdgroupid='" + sbdgrpnodeid + "']").find('input[type=text]').attr("flgSBDChild");
                                if (flgSBDChild > 1) {
                                    y = y - parseInt(flgSBDChild) + 1;
                                }
                            }
                        }
                    }
                    active = $($("#tblPrdItemsMain tbody")[0].rows[y]).find('input[type=text]');
                } else {
                    if ($($("#tblPrdItemsMain tbody")[0].rows[y]).attr("flgsbdgap") == 1 && charCode == 38) {
                        if ($($("#tblPrdItemsMain tbody")[0].rows[y]).css("display") != "table-row") {
                            var sbdgrpnodeid = $($("#tblPrdItemsMain tbody")[0].rows[y]).attr("sbdgroupid");
                            var flgSBDChild = $("#tblPrdItemsMain tbody tr[flgbaseproduct=1][sbdgroupid='" + sbdgrpnodeid + "']").find('input[type=text]').attr("flgSBDChild");
                            if (flgSBDChild > 1) {
                                y = y - parseInt(flgSBDChild) + 1;
                                active = $($("#tblPrdItemsMain tbody")[0].rows[y]).find('input[type=text]');
                            }
                        }
                    }
                }

                if (active.length > 0) {

                    var ctrl = active;
                    var skunodeid = 0;
                    if (active[0].children.length > 0) {
                        active[0].children[0].focus();
                        skunodeid = $(active).closest("tr").attr("skunodeid");
                    } else {
                        active.focus();
                        skunodeid = $(active).closest("tr").attr("skunodeid");
                    }
                    evt.preventDefault();
                    //$(active).closest("tr").addClass("highlightedProduct");
                    //fnShowBenefitSchemeWise(skunodeid, 1);
                }


            }
        }

    }

}

function fnSetFocustOnText() {
    //$("div.divRecomandation").html("");
    $("#tblPrdItemsMain tbody").find('input').focus(function () {
        $("#tblPrdItemsMain tbody tr").removeClass("highlightedProduct");
        $(this).closest("tr").addClass("highlightedProduct");
        var skunodeid = $(this).closest("tr").attr("skunodeid");
        $("#divRecomandation").html($(this).closest("tr").attr("Reco_Strategy"));
        fnShowBenefitSchemeWise(skunodeid, 3);
    }).change(function () {
        $("#tblPrdItemsMain tbody tr").removeClass("highlightedProduct");
        $(this).closest("tr").addClass("highlightedProduct");
        var skunodeid = $(this).closest("tr").attr("skunodeid");
        $("#divRecomandation").html($(this).closest("tr").attr("Reco_Strategy"));
        fnShowBenefitSchemeWise(skunodeid, 3);
    });
}
function StopDefaultAction(e) {
    if (e.preventDefault) { e.preventDefault() }
    else { e.stop() };

    e.returnValue = false;
    e.stopPropagation();
}

function TriggerPreviousButton() {
    //javascript: __doPostBack('btnPrevious>', '');
}

function TriggerSaveButton() {
    //javascript: __doPostBack('btnSave>', '');
}

function TriggerNextButton() {
    // javascript: __doPostBack('btnNext>', '');
}
// ]]></script>



$(document).ready(function () {
    $('#txtSearchproduct').keyup(function () {
        var text = $(this).val().toUpperCase();
        $("#tblPrdItemsMain").find("tbody").eq(0).find("tr[flgdata=2]").css("display", "none");
        $("#tblPrdItemsMain").find("tbody").eq(0).find("tr[flgdata=1][flgsearch=1]").css("display", "none");
        $("#tblPrdItemsMain").find("tr[flgfbgrp='1']").remove();
        var tbl = $("#tblPrdItemsMain").find("tr[flgdata=1][flgsearch=1]");
        var tr;
        for (var i = 0; i < tbl.length; i++) {
            tr = $(tbl[i]);
            var searchstr = $(tr).find("td").eq(0).text() + "," + $(tr).attr("category") + "," + $(tr).attr("mrp");
            var flgValid = 1;
            for (var t = 0; t < text.split(",").length; t++) {
                if (searchstr.toLowerCase().indexOf(text.split(",")[t].toLowerCase()) == -1) {
                    flgValid = 0;
                }
            }
            if (flgValid == 1) {
                var sbdgroupid = $(tr).attr("sbdgroupid");
                var categoryid = $(tr).attr("categoryid");
                $("#tblPrdItemsMain").find("tbody").eq(0).find("tr[flgdata='2'][categoryid='" + categoryid + "']").css("display", "table-row");
                $("#tblPrdItemsMain").find("tbody").eq(0).find("tr[flgdata='1'][categoryid='" + categoryid + "'][flgbaseproduct='1'][sbdgroupid='" + sbdgroupid + "']").css("display", "table-row");
                $(tr).css("display", "table-row");
            }
        }
    });
})



function fnStoreEdit() {
    $("#IframeStore")[0].src = "about:blank";
    $("#StoreDialog").dialog({
        modal: true,
        title: $("#txtStoreName").val(),
        width: 1000,
        height: 600,
        close: function (event, ui) {
            $("#IframeStore")[0].src = "about:blank";
        },
        open: function (event, ui) {
            $("#IframeStore").prop("src", "frmStoreAddEdit.aspx?storeid=" + $("#hdnStoreID").val() + "&login=" + $("#cphRight_hdnLoginId").val() + "&nid=" + $("#cphRight_hdnSalesNodeId").val() + "&ntype=" + $("#cphRight_hdnSalesNodeType").val());
        }
    });
}
function fnSentNotification(ctrl) {
    var MobileNo = $(ctrl).html().trim();
    var TokenNo = $("#cphRight_hdnTokenNo").val();
    if (TokenNo == "") {
        alert("Token Number is blank,kindly contact to sysadmin");
        return false;
    }
    var strs = $("#cphRight_hdnNewStoreDetail").val();// = "5^ABC^2^1";//StoreId^StoreName^flgApproved^flgGST

    var StoreId = strs.split("^")[0];

    var TeleCallingId = strs.split("^")[3];
    var flgRecording = strs.split("^")[6];
    $("#dvFadeForProcessing").show();
    $.ajax({
        url: "frmRouteList_Telecaller.aspx/fnSentNotification",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{MobileNo:' + MobileNo + ',TokenNo:' + JSON.stringify(TokenNo) + ',StoreId:' + StoreId + ',TeleCallingId:' + TeleCallingId + ',flgRecording:' + flgRecording + '}',
        success: function (response) {
            //debugger;
            $("#dvFadeForProcessing").hide();
            var result = response.d;
            if (result.split("^")[0] == "1") {
                alert("Notification for dialing sent successfully");
            } else {
                alert("Error:" + result.split("^")[1]);
            }
        },
        error: function (msg) {
            $("#dvFadeForProcessing").hide();
            alert('Error-' + msg.statusText);
        }
    });
}

function fnAddAlternateContactNo() {
    var scontact = "";
    if ($("#linkAlternateContactNo").length > 0) {
        scontact = $("#linkAlternateContactNo").html().trim();
        $("#txtAlternateContactNo").val(scontact);
    }
    $("#divAlternateContactDetail").dialog({
        title: "Alternate Contact Details:",
        modal: true,
        width: "380",
        height: "auto",
        close: function () {
            $("#divAlternateContactDetail").dialog('destroy');
        },
        buttons: {
            "Close": function () {
                $("#divAlternateContactDetail").dialog('close');
            }
        }

    })
}
function fnUpdateAlternateNoForTeleCaller() {
    var AlternateContactNo = $("#txtAlternateContactNo").val().trim();
    var TeleCallingId = $("#cphRight_hdnTelecallingId").val();
    var LoginId = $("#cphRight_hdnLoginId").val();
    if (AlternateContactNo == "") {
        alert("Enter Contact Number First!!");
        $("#txtAlternateContactNo").focus();
        return false;
    } else if (AlternateContactNo.length < 10) {
        alert("Enter Valid Contact Number First!!");
        $("#txtAlternateContactNo").focus();
        return false;
    }
    var scon = confirm("Are you sure to add this alternate contact number?");
    if (scon == false) {
        return false;
    }
    $("#dvFadeForProcessing").show();
    PageMethods.fnUpdateAlternateNoForTeleCaller(AlternateContactNo, TeleCallingId, LoginId, function (result) {
        $("#dvFadeForProcessing").hide();
        if (result.split("|")[0] == 2) {
            alert("Error-" + result.split("|")[1]);
        } else {
            alert("Added Successfully");
            var strCont = AlternateContactNo != "" ? "<a href ='###' flg='1' id='linkAlternateContactNo' onclick ='fnSentNotification(this)' style ='color:blue !important;text-decoration:underline !important;' title='Click to make call' >" + AlternateContactNo + "</a><a href='###' style='font-size:9.5pt;margin-left:5px' onclick='fnAddAlternateContactNo()'><span class='glyphicon glyphicon-pencil'></span></a>" : "<a href='###' style='font-size:9.5pt' onclick='fnAddAlternateContactNo()'><span class='glyphicon glyphicon-plus'></span></a>";
            $("#tdAltContactNo").html(strCont)
            $("#divAlternateContactDetail").dialog('close');
        }

    }, function (result) {
        $("#dvFadeForProcessing").hide();
        alert("Error-" + result._message);
    })
}




function fnShowRemarksToDSR() {
    $("#divRemarksToDSR").dialog({
        title: "Remarks To DSE:",
        modal: true,
        width: "550",
        height: window.innerHeight - 5,
        close: function () {
            $("#divRemarksToDSR").dialog('destroy');
        },
        buttons: {
            "OK": function () {
                $("#divRemarksToDSR").dialog('close');
            },
            "Close": function () {
                $("#divRemarksToDSR").dialog('close');
            }
        }
    })
}

function fnTaskClose(sender) {
    var TaskId = $(sender).closest("tr").attr("taskid");
    var TeleCallingId = $("#cphRight_hdnTelecallingId").val();
    var StatusId = $(sender).attr("flg");
    var flgOrderSource = 1;
    var LoginId = $("#cphRight_hdnLoginId").val();
    var scon = confirm("Are you sure to " + (StatusId == 1 ? "Close" : "Open") + " this Task?");
    if (scon == false) {
        return false;
    }
    $("#dvFadeForProcessing").show();
    PageMethods.fnUpdateLeapTaskStatus(TaskId, StatusId, flgOrderSource, TeleCallingId, LoginId, function (result) {
        $("#dvFadeForProcessing").hide();
        if (result.split("|")[0] == 2) {
            alert("Error-" + result.split("|")[1]);
        } else {
            alert("Action Taken Successfully");
            if (StatusId == 1) {
                $("#tblTaskList tr[taskid='" + TaskId + "']").find("a.clstaskbtn").html("<img src='../images/UndoIcon.png' style='width:25px;height:20px' title='Click to open task' />");
                $("#tblTaskList tr[taskid='" + TaskId + "']").find("a.clstaskbtn").attr("flg", 0);

                $("#tblTaskListAll tr[taskid='" + TaskId + "']").find("a.clstaskbtn").html("<img src='../images/UndoIcon.png' style='width:25px;height:20px' title='Click to open task' />");
                $("#tblTaskListAll tr[taskid='" + TaskId + "']").find("a.clstaskbtn").attr("flg", 0);

            } else {
                $("#tblTaskList tr[taskid='" + TaskId + "']").find("a.clstaskbtn").html("<img src='../images/TaskCLosed.png' style='width:25px;height:20px' title='Click to close task' />");
                $("#tblTaskList tr[taskid='" + TaskId + "']").find("a.clstaskbtn").attr("flg", 1);

                $("#tblTaskListAll tr[taskid='" + TaskId + "']").find("a.clstaskbtn").html("<img src='../images/TaskCLosed.png' style='width:25px;height:20px' title='Click to close task' />");
                $("#tblTaskListAll tr[taskid='" + TaskId + "']").find("a.clstaskbtn").attr("flg", 1);
            }
            // $(sender).closest("td").html("");
            //$("#divTasksList").dialog('close');
        }

    }, function (result) {
        $("#dvFadeForProcessing").hide();
        alert("Error-" + result._message);
    })
}
function fnShowTaskList() {
    $("#divTasksList").dialog({
        title: "Task List:",
        modal: true,
        width: "95%",
        height: window.innerHeight - 50,
        close: function () {
            $("#divTasksList").dialog('destroy');
        },
        buttons: {
            "Close": function () {
                $("#divTasksList").dialog('close');
            }
        }
    })
}



$(document).ready(function () {

    //<div class="tab-content" id="myTabContent">
    //  <div class="tab-pane show active" id="home" role="tabpanel"
    if (IsFiveStarApplicable == 1) {
        $("#myTab li").eq(0).show();
        $("#myTab a.active").removeClass("active");
        $("#myTabContent div.active").removeClass("active");
        $("#myTabContent div.show").removeClass("show");
        $("#myTab a").eq(0).addClass("active");
        $("#" + $("#myTab a").eq(0).attr("aria-controls")).addClass("active");
        $("#" + $("#myTab a").eq(0).attr("aria-controls")).addClass("show");
    }
    $('#myTab a').on('click', function (e) {
        e.preventDefault()
        $("#myTab a.active").removeClass("active");
        $(this).addClass("active");
        $("#myTabContent div.active").removeClass("active");
        $("#myTabContent div.show").removeClass("show");
        $("#" + $(this).attr("aria-controls")).addClass("active");
        $("#" + $(this).attr("aria-controls")).addClass("show");
    })
})
