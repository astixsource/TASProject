function fnShowAndHidetbl(sender, flg) {
    if (flg == 1) {
        $("#tdReturnWhen")[0].innerHTML = "";
        $("#tdReturnResolution")[0].innerHTML = "";
        if ($(sender)[0].checked == true) {
            var ReturnActionId = $(sender)[0].value;
            var ReturnResolutionData = jQuery.grep(arrReturnActionMstr[0].Table4, function (element, index) {
                return (element.ReturnActionId == ReturnActionId);
            });
            var ReturnResolutionStr = "";
            var OldReturnResolutionID = 0;
            for (k in ReturnResolutionData) {
                var ReturnResolutionID = ReturnResolutionData[k].ReturnResolutionId;
                if (OldReturnResolutionID != ReturnResolutionID) {
                    var OrderReturnResolution = jQuery.grep(arrReturnActionMstr[0].Table2, function (element, index) {
                        return (element.OrderReturnResolutionId == ReturnResolutionID);
                    });
                    if ($("#tblBasicDetailsInfo").find("input[type=checkbox][flg=1]:checked").length > 1 && ReturnResolutionID == 2) {
                        ReturnResolutionStr += "<div><label title='Replace with other product option will be enabled for single product selection only'><input type='radio' name='level2' value='" + ReturnResolutionID + "' ReturnActionId='" + ReturnActionId + "' disabled='disabled'>" + OrderReturnResolution[0].OrderReturnResolution + "</label></div>";
                    }
                    else if ($("#tblBasicDetailsInfo").find("input[type=checkbox][flg=1]:checked").length > 1 && ReturnResolutionID == 3) {
                        ReturnResolutionStr += "<div><label title='Replace with other product option will be enabled for single product selection only'><input type='radio' name='level2' value='" + ReturnResolutionID + "' ReturnActionId='" + ReturnActionId + "' disabled='disabled'>" + OrderReturnResolution[0].OrderReturnResolution + "</label></div>";
                    }
                    else {
                        ReturnResolutionStr += "<div><label  value='" + OrderReturnResolution[0].OrderReturnResolution + "' ><input type='radio' name='level2' value='" + ReturnResolutionID + "' ReturnActionId='" + ReturnActionId + "' onchange='fnShowAndHidetbl(this,2)'>" + OrderReturnResolution[0].OrderReturnResolution + "</label></div>";
                    }

                }
                OldReturnResolutionID = ReturnResolutionID;
            }
            fnSetSponsorActionWiseMain();
            if (ReturnActionId == 3) {
                var divs = "<div flg=ReturnResolution>Reason For Reject Return : <textarea rows=3 style='width:90%;height:100%'></textarea></div>";
                $("#tdReturnResolution")[0].innerHTML = divs;
            } else {
                $("#tdReturnResolution")[0].innerHTML = ReturnResolutionStr;
            }
        }
    } else if (flg == 2) {
        $("#tdReturnWhen")[0].innerHTML = "";
        var ReturnActionId = $(sender).closest("tr").attr("ReturnActionId");
        var ReturnResolutionId = $(sender)[0].value;
        $("#divMultipleData").hide();
        if (ReturnResolutionId != 4 && ReturnResolutionId != 5) {
            var ReturnActionId = $(sender).attr("ReturnActionId");
            var ReturnWhen = jQuery.grep(arrReturnActionMstr[0].Table4, function (element, index) {
                return (element.ReturnActionId == ReturnActionId && element.ReturnResolutionId == ReturnResolutionId);
            });
            var ReturnWhenStr = "";
            for (k in ReturnWhen) {
                var ReturnResolutionWhenId = ReturnWhen[k].ReturnResolutionWhenId;
                var OrderReturnWhen = jQuery.grep(arrReturnActionMstr[0].Table3, function (element, index) {
                    return (element.OrderReturnResolutionWhenId == ReturnResolutionWhenId);
                });
                ReturnWhenStr += "<div><label value='" + OrderReturnWhen[0].OrderReturnResolutionWhen + "'><input type='radio' name='level3' value='" + ReturnResolutionWhenId + "'  ReturnActionId='" + ReturnActionId + "' ReturnResolutionId='" + ReturnResolutionId + "' >" + OrderReturnWhen[0].OrderReturnResolutionWhen + "</label></div>";
            }
            $("#tdReturnWhen")[0].innerHTML = ReturnWhenStr;
            if ($("#tblBasicDetailsInfo").find("input[type=checkbox][flg=1]:checked").length > 1) {
                fnCreateGridForMultiple(ReturnResolutionId);
            }
        }
    } else if (flg == 3) {
        if ($(sender).closest("table").find("input[type=radio][flg=1][value=" + $(sender).val() + "]:checked").length > 1) {
            alert("This Return Action already selected!");
            $(sender).prop("checked", false);
            $(sender).closest("table").find("input[type=radio][flg=1][flgchecked=1]").prop("checked", true);
            return false;
        }

        var trIndex = $(sender).closest("tr").index();
        $(sender).closest("td").next().html("");
        $(sender).closest("td").next().next().next().find("a").css("display", "table-cell");
        if ($(sender)[0].checked == true) {
            $(sender).closest("td").find("input[type=radio][flg=1]").attr("flgchecked", "0");
            $(sender).attr("flgchecked", "1");
            var ReturnActionId = $(sender)[0].value;
            if (ReturnActionId == 3 || ReturnActionId == 4) {
                $(sender).closest("td").next().next().next().find("a").css("display", "none");
            } else {
                $(sender).closest("td").next().next().next().find("a").css("display", "table-cell");
            }
            if (ReturnActionId == 4) {
                $("#divSponsor").show();
                $("#divSponsor").find("input:text").val("0");
                $("#divSponsor").find("input:text").prop("disabled", true);
                $("#divSponsor tr[SponsorID=1]").find("input:text").eq(0).val(Math.round(parseFloat($("#tdtotVal").attr("totval"))));
                $("#divSponsor tr[SponsorID=1]").find("input:text").eq(1).val("100");
            }
            else {
                $("#divSponsor").find("input:text").val("0");
                $("#divSponsor").find("input:text").prop("disabled", false);
                $("#divSponsor").show();
            }


            var groupName = $(sender)[0].name;
            groupName = groupName.substr(0, groupName.length - 1) + "2";
            var ReturnResolutionData = jQuery.grep(arrReturnActionMstr[0].Table5, function (element, index) {
                return (element.ReturnActionId == ReturnActionId);
            });
            var ReturnResolutionStr = "";
            var OldReturnResolutionID = 0;
            for (k in ReturnResolutionData) {
                var ReturnResolutionID = ReturnResolutionData[k].ReturnResolutionId;
                if (OldReturnResolutionID != ReturnResolutionID) {
                    var OrderReturnResolution = jQuery.grep(arrReturnActionMstr[0].Table3, function (element, index) {
                        return (element.OrderReturnResolutionId == ReturnResolutionID);
                    });
                    if (ReturnResolutionID == 5) {
                        if (trIndex > 1) {
                            ReturnResolutionStr += "<div><label><input type='checkbox' name='" + groupName + "' text='" + OrderReturnResolution[0].OrderReturnResolution + "' value='" + ReturnResolutionID + "' ReturnActionId='" + ReturnActionId + "' onchange='fnShowAndHidetbl(this,4)' disabled='disabled' >" + OrderReturnResolution[0].OrderReturnResolution + "</label></div>";
                        } else {
                            ReturnResolutionStr += "<div><label><input type='checkbox' name='" + groupName + "' text='" + OrderReturnResolution[0].OrderReturnResolution + "' value='" + ReturnResolutionID + "' ReturnActionId='" + ReturnActionId + "' onchange='fnShowAndHidetbl(this,4)'>" + OrderReturnResolution[0].OrderReturnResolution + "</label></div>";
                        }
                    }
                    else {
                        ReturnResolutionStr += "<div><label><input type='checkbox' name='" + groupName + "' text='" + OrderReturnResolution[0].OrderReturnResolution + "' value='" + ReturnResolutionID + "' ReturnActionId='" + ReturnActionId + "' onchange='fnShowAndHidetbl(this,4)'>" + OrderReturnResolution[0].OrderReturnResolution + "</label></div>";
                    }
                }
                OldReturnResolutionID = ReturnResolutionID;
            }
            if (ReturnActionId == 3) {
                var divs = "<div flg=ReturnResolution>Reason For Reject Return : <textarea rows=3 style='width:90%'></textarea></div>";
                $(sender).closest("td").next().html(divs);
            } else {
                $(sender).closest("td").next().html(ReturnResolutionStr);
            }
        }
        fnCalculateResolutionval();
    }
    else if (flg == 4) {
        $(sender).closest("td").find("input[type=checkbox]").prop("disabled", false);
        $(sender).closest("td").next().find("a").css("display", "table-cell");
        if ($(sender)[0].checked == true) {
            var trIndex = $(sender).closest("tr").index();
            var ReturnActionId = $(sender).closest("tr").attr("ReturnActionId");

            var ReturnResolutionId = $(sender)[0].value;
            var groupName = $(sender)[0].name;
            groupName = groupName.substr(0, groupName.length - 1) + "3";
            if ($(sender)[0].value == 4) {
                //$(sender).closest("td").find("div[flg=ReturnResolution]").remove();
                //$(sender).closest("td").find("input[type=checkbox]").prop("checked", false);
                //$(sender).closest("td").find("input[type=checkbox]").prop("disabled", true);
                //$(sender).prop("disabled", false);
                //$(sender).prop("checked", true);

                //var qty = $(sender).closest("tr")[0].cells[0].children[0].value;
                //var totAmt = parseFloat($("#tdPrdName").attr("rate")) * parseInt(qty);
                //var subQty = 0; var totResAmt = 0;
                //for (var tcnt = 0; tcnt < $(sender).closest("td").find("input[type='text'][flg='q']").length; tcnt++) {
                //    var qt = $(sender).closest("td").find("input[type='text'][flg='q']")[tcnt].value = "" ? "0" : $(sender).closest("td").find("input[type='text'][flg='q']")[tcnt].value;
                //    subQty += parseInt(qt);
                //    var rate = $(sender).closest("td").find("input[type='text'][flg='q']").eq(tcnt).closest("tr").attr("rate");
                //    totResAmt += parseFloat(rate) * parseInt(qt);
                //}
                //if ($(sender).closest("td").find("input[type=checkbox][value=3]:checked").length > 0) {
                //    totResAmt += parseFloat($(sender).closest("td").find("table#tblReturnResolutionChildCredit").find("tr").eq(1).find("td").eq(1).attr("amt"));
                //}
                //var val = parseFloat(totAmt) - parseFloat(totResAmt);
                //$(sender).closest("label").find("span").remove();
                //$(sender).closest("label").append("<span> ("+parseFloat(val).toFixed(2)+")</span>");
                //$(sender).attr("amt", val);
                fnCalculateResolutionval();
                return false;
            }
            if ($(sender)[0].value == 5) {
                $(sender).closest("td").find("div[flg=ReturnResolution]").remove();
                $(sender).closest("td").find("input[type=checkbox]").prop("checked", false);
                $(sender).closest("td").find("input[type=checkbox]").prop("disabled", true);
                $(sender).closest("td").next().find("a").css("display", "none");
                $(sender).prop("disabled", false);
                $(sender).prop("checked", true);
                fnCalculateResolutionval();
                return false;
            }
            if (ReturnResolutionId != 4 && ReturnResolutionId != 5) {
                var ReturnActionId = $(sender).attr("ReturnActionId");
                var ReturnWhen = jQuery.grep(arrReturnActionMstr[0].Table5, function (element, index) {
                    return (element.ReturnActionId == ReturnActionId && element.ReturnResolutionId == ReturnResolutionId);
                });
                var ReturnWhenStr = "";
                for (k in ReturnWhen) {
                    var ReturnResolutionWhenId = ReturnWhen[k].ReturnResolutionWhenId;
                    var OrderReturnWhen = jQuery.grep(arrReturnActionMstr[0].Table4, function (element, index) {
                        return (element.OrderReturnResolutionWhenId == ReturnResolutionWhenId);
                    });
                    ReturnWhenStr += "<div><label><input type='radio' text='" + OrderReturnWhen[0].OrderReturnResolutionWhen + "' name='" + groupName + "_" + ReturnActionId + "_" + ReturnResolutionId + "' value='" + ReturnResolutionWhenId + "'  ReturnActionId='" + ReturnActionId + "' ReturnResolutionId='" + ReturnResolutionId + "' flg='3' >" + OrderReturnWhen[0].OrderReturnResolutionWhen + "</label></div>";
                }
                if (ReturnResolutionId == 1 || ReturnResolutionId == 2) {
                    if ($(sender).closest("td").find("input[type=checkbox][value=3]:checked").length > 0) {
                        $(sender).closest("td").find("input[type=checkbox][value=3]").prop("checked", false);
                        $(sender).closest("td").find("table#tblReturnResolutionChildCredit").closest("td").closest("div").remove();
                    }
                    if ($(sender).closest("td").find("input[type=checkbox][value=4]:checked").length > 0) {
                        $(sender).closest("td").find("input[type=checkbox][value=4]").prop("checked", false);
                        $(sender).closest("td").find("input[type=checkbox][value=4]").closest("label").find("span").remove();
                    }
                }

                var qty = $(sender).closest("tr")[0].cells[0].children[0].value;
                var totAmt = parseFloat($("#tdPrdName").attr("rate")) * parseInt(qty);
                var subQty = 0; var totResAmt = 0;
                for (var tcnt = 0; tcnt < $(sender).closest("td").find("input[type='text'][flg='q']").length; tcnt++) {
                    var qt = $(sender).closest("td").find("input[type='text'][flg='q']")[tcnt].value = "" ? "0" : $(sender).closest("td").find("input[type='text'][flg='q']")[tcnt].value;
                    subQty += parseInt(qt);
                    var rate = $(sender).closest("td").find("input[type='text'][flg='q']").eq(tcnt).closest("tr").attr("rate");
                    totResAmt += parseFloat(rate) * parseInt(qt);
                }
                qty = parseInt(qty) - parseInt(subQty);
                qty = qty < 0 ? 0 : qty;
                if (ReturnResolutionId == 3) {
                    if ($(sender).closest("td").find("input[type=checkbox][value=4]:checked").length > 0) {
                        $(sender).closest("td").find("input[type=checkbox][value=4]").prop("checked", false);
                        $(sender).closest("td").find("input[type=checkbox][value=4]").closest("label").find("span").remove();
                    }
                    qty = qty + "^" + (parseFloat(totAmt) - parseFloat(totResAmt));
                }
                var style = "border-left:1px solid #bbb;border-bottom:1px solid #bbb";
                var tblres = "<div flg='ReturnResolution' style='margin:5px;'><table cellpadding='0' cellspacing='0' style='width:100%;border-top:1px solid #bbb;border-right:1px solid #bbb' flg='ReturnResolution'><tr><th style='" + style + "'>Resolution</th><th style='" + style + "'>When</th></tr>";
                tblres += "<tr>";
                tblres += "<td style='" + style + "'>" + fnCreateGrid(sender, ReturnResolutionId, qty, "", 1) + "</td>";
                tblres += "<td style='" + style + "'>" + ReturnWhenStr + "</td>";
                tblres += "<td style='" + style + "'>&nbsp;</td>";
                tblres += "</tr></table></div>";
                $(sender).closest("div").after(tblres);

            }
        } else {
            if ($(sender)[0].value == 4) {
                $(sender).closest("label").find("span").remove();
            }
            if ($(sender).closest("div").next("div[flg='ReturnResolution']").length > 0) {
                $(sender).closest("div").next("div[flg='ReturnResolution']").remove();
            }
        }
        fnCalCreditAmtOrNoAction(sender, 1);
        fnCalculateResolutionval();
    }
    else if (flg == 5) {
        var inputs = $(sender).closest("td").prev().find("input[flg=q]");
        var qty = 0;
        for (var k = 0; k < inputs.length; k++) {
            qty += parseInt(inputs[k].value == "" ? 0 : inputs[k].value);
        }
        ///Ashw
        if ($("#dvreturnStepMain").find("input[type=radio][flg=3][value=8]:checked").length > 0 && PrdCnt == 1 && (OrderReturnType == 1 || OrderReturnType == 2)) {
            $("#btnSaveSteps").val("Save & Generate PickList");
            $("#btnSaveSteps").attr("onclick", "fnPopulateOrderReturnSteps(3)");
        } else {
            $("#btnSaveSteps").val("OK");
            $("#btnSaveSteps").attr("onclick", "fnPopulateOrderReturnSteps(2)");
        }

        if (qty == 0) {
            if (ReturnResolutionId == 3) {
                var amt = $(sender).closest("td").prev().find("input[flg=q]").closest("td").next().is("[amt]") ? $(sender).closest("td").prev().find("input[flg=q]").closest("td").next().attr("amt") : 0;
                if (parseFloat(amt) <= 0) {
                    alert("Credit Amount is zero or less than zero,so you cant select");
                    $(sender).prop("checked", false);
                    return false;
                }
            } else {
                alert("Resolution Qty is zero,so you cant select");
                $(sender).prop("checked", false);
                return false;
            }
        }
    }
}
function fnCheckPhysicalStock(sender) {
    var PhyQty = $(sender).closest("tr").find("td").eq(4).text();
    var acQty = $(sender).val();
    acQty = acQty == "" ? 0 : acQty;
    $(sender).val(acQty);
    if (parseInt(acQty) > parseInt(PhyQty)) {
        $(sender).closest("tr").addClass("trHeilight");
    } else {
        $(sender).closest("tr").removeClass("trHeilight");
    }
}
function fnCreateGrid(sender, ReturnResolutionId, qty, Resolutiondata, flg) {
    var style = "border-left:1px solid #bbb;border-bottom:1px solid #bbb";
    //processid 
    // 0 for pending,1 for Inprocess,2 for Completed
    if (flg == 1) {
        if (ReturnResolutionId == 1) {
            var div1 = "<table id='tblReturnResolutionChildSame' cellpadding='2' cellspacing='0' style='width:95%;border-top:1px solid #bbb;border-right:1px solid #bbb'>";
            div1 += "<tr>";
            div1 += "<th style='" + style + ";background-color:#23AED8;color:#fff'>Product Name</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Qty</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Rate</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Amount</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Available Stock</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Status</th>";
            div1 += "</tr>";
            div1 += "<tr rate='" + $("#tdPrdName").attr("rate") + "'>";
            div1 += "<td style='" + style + "'>" + $("#tdPrdName").attr("PrdName") + "</td>";
            div1 += "<td style='" + style + ";text-align:center'><input type='text' style='width:40px' onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' onfocus=\"Focus(this,'0')\" onblur=\"fnCheckPhysicalStock(this)\" value='" + qty + "' onkeyup='fnCalculteAmount(this,1)' flg='q' /></td>";
            div1 += "<td style='" + style + ";text-align:right'>" + ($("#tdPrdName").is("[rate]") ? parseFloat($("#tdPrdName").attr("rate")).toFixed(2) : "0.00") + "</td>";
            div1 += "<td style='" + style + ";text-align:right'>" + parseFloat(qty * parseFloat($("#tdPrdName").attr("rate"))).toFixed(2) + "</td>";
            var PrdId = $("#tdPrdName").attr("prdid");
            div1 += "<td style='" + style + ";text-align:center'>" + $("#ddlProductStock option[value=" + PrdId + "]").text() + "</td>";
            div1 += "<td style='" + style + ";text-align:right' processid='0'>pending</td>";
            div1 += "</tr>";
            div1 += "</table>";
            div1 += "</div>";
            return div1;
        }
        else if (ReturnResolutionId == 2) {
            var div1 = "<table id='tblReturnResolutionChildOrder' cellpadding='2' cellspacing='0' style='width:95%;border-top:1px solid #bbb;border-right:1px solid #bbb'>";
            div1 += "<tr>";
            div1 += "<th style='" + style + ";background-color:#23AED8;color:#fff'>Product Name</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Qty</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Rate</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Amount</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Available Stock</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Status</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Action</th>";
            div1 += "</tr>";
            div1 += "<tr>";
            div1 += "<td style='" + style + "'><input style='width: 96%; text-align: left' type='text' onkeyup='fnGetFPrdList(this)' /></td>";
            div1 += "<td style='" + style + ";text-align:center'><input type='text' style='width:40px' onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' onfocus=\"Focus(this,'0')\" onblur=\"fnCheckPhysicalStock(this)\" value='" + qty + "' onkeyup='fnCalculteAmount(this,1)' flg='q' /></td>";
            div1 += "<td style='" + style + ";text-align:right'>0.00</td>";
            div1 += "<td style='" + style + ";text-align:right'>0.00</td>";
            div1 += "<td style='" + style + ";text-align:center'>0</td>";
            div1 += "<td style='" + style + ";text-align:right' processid='0'>pending</td>";
            div1 += "<td style='" + style + "'><a href='###' onclick='fnAddRowForSinglePrd(this,2,0)' style='color:transparent' ><img src='../images/icoAdd.gif'/></a><a href='###' onclick='fnRemoveRowForSinglePrd(this,2)' style='color:transparent'><img src='../images/icoMinus.gif'/></a></td>";
            div1 += "</tr>";
            div1 += "</table>";
            return div1;
        } else {
            var div1 = "<table id='tblReturnResolutionChildCredit' cellpadding='2' cellspacing='0' style='width:99%;border-top:1px solid #bbb;border-right:1px solid #bbb'>";
            div1 += "<tr>";
            div1 += "<th style='" + style + ";background-color:#23AED8;color:#fff;display:none'>Qty</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Amount</th><th style='" + style + ";background-color:#23AED8;color:#fff;display:none'>Available Stock</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Status</th>";
            div1 += "</tr>";
            div1 += "<tr>";
            div1 += "<td style='" + style + ";text-align:center;display:none' rate='" + $("#tdPrdName").attr("rate") + "'><input type='text' style='background-color:#ffffff;width:30px;border-style:none' value=" + qty.split("^")[0] + "  disabled='disabled'/></td>";
            var rate = $("#tdPrdName").attr("rate");
            var amount = qty.split("^")[1];
            div1 += "<td style='" + style + ";text-align:right' amt='" + amount + "'>" + parseFloat(amount).toFixed(2) + "</td>";
            var PrdId = $("#tdPrdName").attr("prdid");
            div1 += "<td style='" + style + ";text-align:center;display:none'>" + $("#ddlProductStock option[value=" + PrdId + "]").text() + "</td>";
            div1 += "<td style='" + style + ";text-align:right' processid='0'>pending</td>";
            div1 += "</tr>";
            div1 += "</table>";
            return div1;
        }
    }
    else {
        if (ReturnResolutionId == 1) {
            var div1 = "<div flg='ReturnResolution' style='margin:5px;'><table id='tblReturnResolutionChildSame' cellpadding='2' cellspacing='0' style='width:99%;border-top:1px solid #bbb;border-right:1px solid #bbb'>";
            div1 += "<tr>";
            div1 += "<th style='" + style + ";background-color:#23AED8;color:#fff'>Product Name</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Qty</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Rate</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Amount</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Available Stock</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Status</th>";
            div1 += "</tr>";

            for (cnt in Resolutiondata) {
                var PrdId = Resolutiondata[cnt].ReplacementPrdId;
                var ReplacementQty = Resolutiondata[cnt].ReplacementQty;
                var rate = Resolutiondata[cnt].StandardRateBeforeTax;
                var amount = parseFloat(rate) * parseInt(ReplacementQty);
                var ShortDescr = Resolutiondata[cnt].ShortDescr;
                var status = Resolutiondata[cnt].Status;
                var IsProcessed = Resolutiondata[cnt].IsProcessed;

                div1 += "<tr prdid='" + PrdId + "' rate='" + rate + "'>";
                div1 += "<td style='" + style + "'>" + ShortDescr + "</td>";
                if (IsProcessed == 0) {
                    div1 += "<td style='" + style + ";text-align:center'><input type='text' style='width:40px' onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' onfocus=\"Focus(this,'0')\" onblur=\"fnCheckPhysicalStock(this)\" value='" + ReplacementQty + "' onkeyup='fnCalculteAmount(this,1)' flg='q' /></td>";
                } else {
                    div1 += "<td style='" + style + ";text-align:center'><input type='text' style='width:40px' onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' onfocus=\"Focus(this,'0')\" onblur=\"fnCheckPhysicalStock(this)\" value='" + ReplacementQty + "' onkeyup='fnCalculteAmount(this,1)' flg='q' disabled='disabled' /></td>";
                }
                div1 += "<td rate='" + rate + "' style='" + style + ";text-align:right'>" + parseFloat(rate).toFixed(2) + "</td>";
                div1 += "<td style='" + style + ";text-align:right'>" + parseFloat(amount).toFixed(2) + "</td>";
                div1 += "<td style='" + style + ";text-align:center'>" + $("#ddlProductStock option[value=" + PrdId + "]").text() + "</td>";
                div1 += "<td style='" + style + ";text-align:right' IsProcessed='" + IsProcessed + "'>" + status + "</td>";
                div1 += "</tr>";
            }
            div1 += "</table>";
            div1 += "</div>";
            return div1;
        }
        if (ReturnResolutionId == 2) {
            var div1 = "<div flg='ReturnResolution' style='margin:5px;'><table id='tblReturnResolutionChildOther' cellpadding='2' cellspacing='0' style='width:99%;border-top:1px solid #bbb;border-right:1px solid #bbb'>";
            div1 += "<tr>";
            div1 += "<th style='" + style + ";background-color:#23AED8;color:#fff'>Product Name</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Qty</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Rate</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Amount</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Available Stock</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Status</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Action</th>";
            div1 += "</tr>";

            for (cnt in Resolutiondata) {
                var PrdId = Resolutiondata[cnt].ReplacementPrdId;
                var ReplacementQty = Resolutiondata[cnt].ReplacementQty;
                var rate = Resolutiondata[cnt].StandardRateBeforeTax;
                var amount = parseFloat(rate) * parseInt(ReplacementQty);
                var ShortDescr = Resolutiondata[cnt].ShortDescr;
                var skucode = Resolutiondata[cnt].SKUCode;
                var status = Resolutiondata[cnt].Status;
                var IsProcessed = Resolutiondata[cnt].IsProcessed;
                div1 += "<tr prdid='" + PrdId + "' skucode='" + skucode + "' rate='" + rate + "'>";
                div1 += "<td style='" + style + "'>" + ShortDescr + "</td>";
                if (IsProcessed == 0) {
                    div1 += "<td style='" + style + ";text-align:center'><input type='text' style='width:40px' onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' onfocus=\"Focus(this,'0')\" onblur=\"fnCheckPhysicalStock(this)\" value='" + ReplacementQty + "' onkeyup='fnCalculteAmount(this,1)' flg='q' /></td>";
                } else {
                    div1 += "<td style='" + style + ";text-align:center'><input type='text' style='width:40px' onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' onfocus=\"Focus(this,'0')\" onblur=\"fnCheckPhysicalStock(this)\" value='" + ReplacementQty + "' onkeyup='fnCalculteAmount(this,1)' flg='q' disabled='disabled' /></td>";
                }
                div1 += "<td rate='" + rate + "' style='" + style + ";text-align:right'>" + parseFloat(rate).toFixed(2) + "</td>";
                div1 += "<td style='" + style + ";text-align:right'>" + parseFloat(amount).toFixed(2) + "</td>";
                div1 += "<td style='" + style + ";text-align:center'>" + $("#ddlProductStock option[value=" + PrdId + "]").text() + "</td>";
                div1 += "<td style='" + style + ";text-align:right' IsProcessed='" + IsProcessed + "'>" + status + "</td>";
                if (IsProcessed == 0) {
                    div1 += "<td style='" + style + "'><a href='###' onclick='fnAddRowForSinglePrd(this,2,0)' style='color:transparent' ><img src='../images/icoAdd.gif'/></a><a href='###' onclick='fnRemoveRowForSinglePrd(this,2)' style='color:transparent'><img src='../images/icoMinus.gif'/></a></td>";
                } else {
                    div1 += "<td style='" + style + "'><a href='###' style='color:transparent' ><img src='../images/icoAdd.gif'/></a><a href='###'  style='color:transparent'><img src='../images/icoMinus.gif'/></a></td>";
                }

                div1 += "</tr>";
            }
            div1 += "</table>";
            div1 += "</div>";
            return div1;
        }
        else {
            var div1 = "<div flg='ReturnResolution' style='margin:5px;'><table id='tblReturnResolutionChildCredit' cellpadding='2' cellspacing='0' style='width:50%;border-top:1px solid #bbb;border-right:1px solid #bbb'>";
            div1 += "<tr>";
            div1 += "<th style='" + style + ";background-color:#23AED8;color:#fff;;display:none'>Qty</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Amount</th><th style='" + style + ";background-color:#23AED8;color:#fff;display:none'>Available Stock</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Status</th>";
            div1 += "</tr>";

            for (cnt in Resolutiondata) {
                div1 += "<tr>";
                var ReplacementQty = parseInt(Resolutiondata[cnt].Qty) - qty;
                var PrdId = $("#hdnPrdId").val();
                //var rate = $("#tdPrdName").attr("rate");
                var amount = Resolutiondata[cnt].CreditAmount;
                var status = Resolutiondata[cnt].Status;
                var IsProcessed = Resolutiondata[cnt].IsProcessed;
                div1 += "<td style='" + style + ";text-align:center;display:none' rate='" + rate + "'><input type='text' style='background-color:#fff;width:30px;border-style:none' value=" + ReplacementQty + "   disabled='disabled'/></td>";
                div1 += "<td style='" + style + ";text-align:right' amt='" + amount + "'>" + parseFloat(amount).toFixed(2) + "</td>";
                div1 += "<td style='" + style + ";text-align:center;display:none'>" + $("#ddlProductStock option[value=" + PrdId + "]").text() + "</td>";
                div1 += "<td style='" + style + ";text-align:right' IsProcessed='" + IsProcessed + "'>" + status + "</td>";
                div1 += "</tr>";
            }
            div1 += "</table>";
            div1 += "</div>";
            return div1;
        }
    }
}

function fnCalCreditAmtOrNoAction(sender, flg) {
    if (flg == 1) {
        if ($(sender).closest("td").find("input[type=checkbox][value=3]:checked").length > 0) {
            var qty = $(sender).closest("tr")[0].cells[0].children[0].value == "" ? 0 : $(sender).closest("tr")[0].cells[0].children[0].value;
            var totAmt = parseFloat($("#tdPrdName").attr("rate")) * parseInt(qty);
            var subQty = 0; var totResAmt = 0;
            for (var tcnt = 0; tcnt < $(sender).closest("td").find("input[type='text'][flg='q']").length; tcnt++) {
                var qt = $(sender).closest("td").find("input[type='text'][flg='q']")[tcnt].value = "" ? "0" : $(sender).closest("td").find("input[type='text'][flg='q']")[tcnt].value;
                subQty += parseInt(qt);
                var rate = $(sender).closest("td").find("input[type='text'][flg='q']").eq(tcnt).closest("tr").attr("rate");
                totResAmt += parseFloat(rate) * parseInt(qt);
            }
            var remval = parseFloat(totAmt) - parseFloat(totResAmt);
            $(sender).closest("td").find("table#tblReturnResolutionChildCredit").find("tr").eq(1).find("td").eq(1).html(parseFloat(remval).toFixed(2));
            $(sender).closest("td").find("table#tblReturnResolutionChildCredit").find("tr").eq(1).find("td").eq(1).attr("amt", remval);
        }
        else if ($(sender).closest("td").find("input[type=checkbox][value=4]:checked").length > 0) {
            var qty = $(sender).closest("tr")[0].cells[0].children[0].value == "" ? 0 : $(sender).closest("tr")[0].cells[0].children[0].value;
            var totAmt = parseFloat($("#tdPrdName").attr("rate")) * parseInt(qty);
            var subQty = 0; var totResAmt = 0;
            for (var tcnt = 0; tcnt < $(sender).closest("td").find("input[type='text'][flg='q']").length; tcnt++) {
                var qt = $(sender).closest("td").find("input[type='text'][flg='q']")[tcnt].value = "" ? "0" : $(sender).closest("td").find("input[type='text'][flg='q']")[tcnt].value;
                subQty += parseInt(qt);
                var rate = $(sender).closest("td").find("input[type='text'][flg='q']").eq(tcnt).closest("tr").attr("rate");
                totResAmt += parseFloat(rate) * parseInt(qt);
            }
            if ($(sender).closest("td").find("input[type=checkbox][value=3]:checked").length > 0) {
                totResAmt += parseFloat($(sender).closest("td").find("table#tblReturnResolutionChildCredit").find("tr").eq(1).find("td").eq(1).attr("amt"));
            }
            var val = parseFloat(totAmt) - parseFloat(totResAmt);
            $(sender).closest("td").find("input[type=checkbox][value=4]:checked").closest("label").find("span").remove();
            $(sender).closest("td").find("input[type=checkbox][value=4]:checked").closest("label").append("<span> (" + parseFloat(val).toFixed(2) + ")</span>");
            $(sender).closest("td").find("input[type=checkbox][value=4]:checked").attr("amt", val);
        }
    } else {

        if ($(sender).closest("table").closest("td").closest("table").closest("td").find("input[type=checkbox][value=3]:checked").length > 0) {
            var ctrl = $(sender).closest("table").closest("td").closest("table").closest("td").find("input[type=checkbox][value=3]");
            var qty = $(ctrl).closest("tr")[0].cells[0].children[0].value == "" ? 0 : $(ctrl).closest("tr")[0].cells[0].children[0].value;
            var totAmt = parseFloat($("#tdPrdName").attr("rate")) * parseInt(qty);
            var subQty = 0; var totResAmt = 0;
            for (var tcnt = 0; tcnt < $(ctrl).closest("td").find("input[type='text'][flg='q']").length; tcnt++) {
                var qt = $(ctrl).closest("td").find("input[type='text'][flg='q']")[tcnt].value = "" ? "0" : $(ctrl).closest("td").find("input[type='text'][flg='q']")[tcnt].value;
                subQty += parseInt(qt);
                var rate = $(ctrl).closest("td").find("input[type='text'][flg='q']").eq(tcnt).closest("tr").attr("rate");
                totResAmt += parseFloat(rate) * parseInt(qt);
            }
            var remval = parseFloat(totAmt) - parseFloat(totResAmt);
            $(ctrl).closest("td").find("table#tblReturnResolutionChildCredit").find("tr").eq(1).find("td").eq(1).html(parseFloat(remval).toFixed(2));
            $(ctrl).closest("td").find("table#tblReturnResolutionChildCredit").find("tr").eq(1).find("td").eq(1).attr("amt", remval);
        }
        else if ($(sender).closest("table").closest("td").closest("table").closest("td").find("input[type=checkbox][value=4]:checked").length > 0) {
            var ctrl = $(sender).closest("table").closest("td").closest("table").closest("td").find("input[type=checkbox][value=4]");
            var qty = $(ctrl).closest("tr")[0].cells[0].children[0].value == "" ? 0 : $(ctrl).closest("tr")[0].cells[0].children[0].value;
            var totAmt = parseFloat($("#tdPrdName").attr("rate")) * parseInt(qty);
            var subQty = 0; var totResAmt = 0;
            for (var tcnt = 0; tcnt < $(ctrl).closest("td").find("input[type='text'][flg='q']").length; tcnt++) {
                var qt = $(ctrl).closest("td").find("input[type='text'][flg='q']")[tcnt].value = "" ? "0" : $(sender).closest("td").find("input[type='text'][flg='q']")[tcnt].value;
                subQty += parseInt(qt);
                var rate = $(ctrl).closest("td").find("input[type='text'][flg='q']").eq(tcnt).closest("tr").attr("rate");
                totResAmt += parseFloat(rate) * parseInt(qt);
            }
            if ($(ctrl).closest("td").find("input[type=checkbox][value=3]:checked").length > 0) {
                totResAmt += parseFloat($(ctrl).closest("td").find("table#tblReturnResolutionChildCredit").find("tr").eq(1).find("td").eq(1).attr("amt"));
            }
            var val = parseFloat(totAmt) - parseFloat(totResAmt);
            $(ctrl).closest("label").find("span").remove();
            $(ctrl).closest("label").append("<span> (" + parseFloat(val).toFixed(2) + ")</span>");
            $(ctrl).attr("amt", val);
        }
    }
}
function fnCalculteAmount(sender, flg) {
    if (flg == 1) {
        var rate = $(sender).closest("tr").is("[rate]") ? $(sender).closest("tr").attr("rate") : 0;
        var qty = $(sender).val() == "" ? 0 : $(sender).val();
        var amount = parseFloat(rate) * parseInt(qty);
        $(sender).closest("td").next().next()[0].innerHTML = parseFloat(amount).toFixed(2);
        $(sender).closest("td").next().next().attr("amount", amount);

        var inputs = $(sender).closest("table").find("input[flg=q]");
        var qty = 0;
        for (var k = 0; k < inputs.length; k++) {
            qty += parseInt(inputs[k].value == "" ? 0 : inputs[k].value);
        }
        if (parseInt(qty) == 0) {
            $(sender).closest("table").closest("td").next().find("input[type=radio]").prop("checked", false);
        }
        fnCalCreditAmtOrNoAction(sender, 2);
        fnCalculateResolutionval();
    }
}

var PrdCnt = 0; var OrderReturnType = 0;
function fnGetOrderReturnStepsBySingleproduct(sender) {
    groupcnt = 1;
    PrdCnt = 0;
    var OrderReturnDetailId = $(sender).closest("tr").attr("OrderReturnDetailId")
    var OrderReturnStepsId = $(sender).closest("tr").is("[orderreturnstepid]")?$(sender).closest("tr").attr("orderreturnstepid"):0;
    var prdId = $(sender).closest("tr").attr("prdid");
    $("#hdnPrdId").val(prdId);
    var PrdName = $(sender).closest("tr").find("input#hdnSKUName").val();
    var OrderReturnId = $(sender).closest("tr").attr("OrderReturnId");
    $("#hdnOrderReturnId").val();
    groupcnt = 1;
    $("#dvreturnStepMain").html("<br/><br/><br/><br/><center><img src='../Images/blue-loading.gif' /></center>");
    $("#dvreturnStepMain").dialog({
        width: "95%",
        height: "630",
        title: "Return Resolution",
        modal: true,
        show: {
            effect: "blind",
            duration: 100
        },
        hide: {
            duration: 100
        }
    });

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../dmswebservice.asmx/fnGetOrderReturnStepsBySingleproduct",
        dataType: "json",
        data: '{OrderReturnDetailId:' + OrderReturnDetailId+ ',flgReqFrom:' + $("#hdnflgReqFrom").val() + '}',
        success: function (data) {
            $("#dvFadeForProcessing").hide();
            ////if ($("#hdnflgReqFrom").val() == "0") {
            //try {
            //    window.parent.$("#dvprocessing").css("display", "none");
            //    window.parent.$("#dvExpandedGraph").toggle(500, "linear");
            //} catch (err) { }
            ////}
            var arrReturnStepsBySingleproduct = $.parseJSON('[' + data.d + ']');
            arrReturnActionMstr = arrReturnStepsBySingleproduct;
            $("#dvreturnStepMain")[0].innerHTML = ""; var ReturnActionIdd = 0; var OrderReturnStepsId = 0;
            if (arrReturnStepsBySingleproduct.length > 0) {
                var strDiv1 = ""; var stockstatusid = 0; var stockstatus = 0; var IsApproved = 0; var cntAction = 1;
                var trIndex = 1; var cntAction = 1;
                var strDiv1 = ""; var IsApproved = 0; var stockstatus = ""; var stockstatusid = 0; var ReturnActionIdd = 0; var OrderReturnDetailID = 0; var trIndex = 1;
                var tblMain = "<table id='tblMainPOP' style='width:100%'>";
                if (arrReturnStepsBySingleproduct[0].Table.length > 0) {
                    var strReason = "";
                    var totQty = 0;

                    for (m in arrReturnStepsBySingleproduct[0].Table) {
                        strDiv1 = "";
                        OrderReturnDetailID = arrReturnStepsBySingleproduct[0].Table[m].OrderReturnDetailID;
                        strReason = arrReturnStepsBySingleproduct[0].Table[m].QtyDescr + ",";
                        totQty = parseInt(arrReturnStepsBySingleproduct[0].Table[m].Qty);
                        tblMain += "<tr><td>";
                        IsApproved = arrReturnStepsBySingleproduct[0].Table[m].IsApproved;
                        stockstatus = arrReturnStepsBySingleproduct[0].Table[m].StockStatus;
                        stockstatusid = arrReturnStepsBySingleproduct[0].Table[m].StockStatusId;
                        PrdCnt = arrReturnStepsBySingleproduct[0].Table[m].PrdCnt;
                        OrderReturnType = arrReturnStepsBySingleproduct[0].Table[m].OrderReturnType;
                        var dvApproved = "";

                        //if (IsApproved == 1) {
                        //    dvApproved = "<div style='margin-bottom:5px;background-color:#c0c0c0'><label><input type='radio' checked='checked' value='1' onchange='fnShowDetailTable(this)' name='rdoapprove' >Approve</label></div>";
                        //} else {
                        //    dvApproved = "<div style='margin-bottom:5px;background-color:#c0c0c0'><label><input type='radio' onchange='fnShowDetailTable(this)' value='1' name='rdoapprove' >Approve</label></div>";
                        //}

                        var totResQty = 0;
                        if (arrReturnStepsBySingleproduct[0].Table1.length > 0) {
                            for (var r in arrReturnStepsBySingleproduct[0].Table1) {
                                totResQty += parseInt(arrReturnStepsBySingleproduct[0].Table1[r].Qty);
                            }
                        }

                        var pname = PrdName;
                        var st = "";
                        if (IsApproved == 1) {
                            st = "Approved";
                        } else if (IsApproved == 2) {
                            st = "UnApproved";
                        }
                        //strDiv1 = "<div><table style='width:100%'><tr><td id='tdPrdName' OrderReturnStepsId=" + OrderReturnStepsId + " OrderReturnDetailID=" + OrderReturnDetailID + "  prdId='" + prdId + "' PrdName='" + PrdName + "' rate='" + arrReturnStepsBySingleproduct[0].Table[0].RateBeforeTax + "' tax='" + arrReturnStepsBySingleproduct[0].Table[0].Tax + "' title='" + PrdName + "' ><b>SKU Name: </b>" + (pname.length > 10 ? pname.substr(0, 10) + ".." : pname) + "</td><td><b>Return Qty: </b>" + strReason + "</td><td id='tdtotQty' totQty='" + totQty + "'><b>Total Qty: </b>" + totQty + "</td><td id='tdtotVal' totval='" + parseFloat(arrReturnStepsBySingleproduct[0].Table[0].TotalValue) + "'><b>Total Val(Rs.): </b>" + parseFloat(arrReturnStepsBySingleproduct[0].Table[0].TotalValue).toFixed(2) + "</td><td id='tdtotResVal' totResVal='" + parseInt(totResQty) * parseFloat(arrReturnStepsBySingleproduct[0].Table[0].RateBeforeTax) + "'><b>Total Resltion Val(Rs.): </b>" + parseFloat(parseInt(totResQty) * parseFloat(arrReturnStepsBySingleproduct[0].Table[0].RateBeforeTax)).toFixed(2) + "</td><td><b>Net Val(Rs.):</b></td><td>" + Math.round(parseInt(totQty) * parseFloat(arrReturnStepsBySingleproduct[0].Table[0].RateBeforeTax)) + "</td><td><b>Stock Status:</b>" + stockstatus + "</td></tr></table></div>";
                        strDiv1 = "<div><table style='width:100%;font-size:8.5pt'>";
                        strDiv1 += "<tr>";
                        strDiv1 += "<td id='tdPrdName' OrderReturnStepsId=" + OrderReturnStepsId + " OrderReturnDetailID=" + OrderReturnDetailID + "  prdId='" + prdId + "'  rate='" + arrReturnStepsBySingleproduct[0].Table[0].RateBeforeTax + "' tax='" + arrReturnStepsBySingleproduct[0].Table[0].Tax + "' PrdName='" + PrdName + "' ><b>SKU Name</b></td><td>:</td><td>" + pname + "</td>";
                        strDiv1 += "<td><b>Reason</b></td><td>:</td><td>" + strReason.split(" ")[1] + "</td>";
                        strDiv1 += "<td><b>Stock Status</b></td><td>:</td><td>" + stockstatus + "</td><td><b>Approval Status</b></td><td>:</td>" + st + "</td>";
                        strDiv1 += "</tr>";
                        strDiv1 += "<tr>";
                        strDiv1 += "<td id='tdtotQty' totQty='" + totQty + "'><b>Total Qty</b></td><td>:</td><td>" + totQty + "</td>";
                        strDiv1 += "<td id='tdtotVal' totval='" + parseFloat(arrReturnStepsBySingleproduct[0].Table[0].TotalValue) + "'><b>Total Value(Rs.)</b></td><td>:</td><td>" + parseFloat(arrReturnStepsBySingleproduct[0].Table[0].TotalValue).toFixed(2) + "</td>";
                        strDiv1 += "<td><b>Total Resolution Value ( Rs.)</b></td><td>:</td><td id='tdtotResVal' totResVal='" + parseInt(totResQty) * parseFloat(arrReturnStepsBySingleproduct[0].Table[0].RateBeforeTax) + "'>" + parseFloat(parseInt(totResQty) * parseFloat(arrReturnStepsBySingleproduct[0].Table[0].RateBeforeTax)).toFixed(2) + "</td>";
                        strDiv1 += "<td><b>Net Value(Rs.)</b></td><td>:</td><td id='tdNetVal'>" + Math.round(parseInt(totQty) * parseFloat(arrReturnStepsBySingleproduct[0].Table[0].RateBeforeTax)) + "</td>";
                        strDiv1 += "</tr>";
                        strDiv1 += "<tr>";
                        strDiv1 += "</tr></table></div>";


                        tblMain += strDiv1;
                        tblMain += dvApproved;
                        var strDiv2 = "";

                        if (arrReturnStepsBySingleproduct[0].Table1.length > 0) {
                            var tblReturnData1 = jQuery.grep(arrReturnStepsBySingleproduct[0].Table1, function (element, index) {
                                return (element.OrderReturnDetailID == OrderReturnDetailID);
                            });
                            if (tblReturnData1.length > 0) {
                                strDiv2 = "<div id='dvDetails1' style='height:476px;overflow-y:auto;'>";
                                strDiv2 += "<table id='tblReturnStepsBySingleproduct" + m + "' style='width:100%;border-top:1px solid #bbb;border-right:1px solid #bbb;' cellspacing='0' cellpadding='2' OrderReturnDetailID='" + OrderReturnDetailID + "' >";
                                var style = "border-left:1px solid #bbb;border-bottom:1px solid #bbb";
                                strDiv2 += "<tr><th style='" + style + ";width:45px;background-color:#23AED8;color:#fff'>Qty</th><th style='" + style + ";width:170px;background-color:#23AED8;color:#fff'>Return Action</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Resolution</th><th style='" + style + ";width:100px;background-color:#23AED8;color:#fff'>Returns Cost to be Borned By</th><th style='" + style + ";width:40px;background-color:#23AED8;color:#fff'>Action</th></tr>";
                                var OLDOrderReturnActionId = 0;
                                var OLDOrderReturnResolutionId = 0;
                                for (i in tblReturnData1) {
                                    var qty = tblReturnData1[i].Qty;
                                    var OrderReturnActionId = tblReturnData1[i].OrderReturnActionId;
                                    var OrderReturnResolutionId = tblReturnData1[i].OrderReturnResolutionId;
                                    var OrderReturnResolutionWhenId = tblReturnData1[i].OrderReturnResolutionWhenId;
                                    var OrderReturnSubActionId = tblReturnData1[i].OrderReturnSubActionId;
                                    var Reason = tblReturnData1[i].Reason;
                                    if (OLDOrderReturnActionId != OrderReturnActionId) {
                                        groupcnt++;
                                        ReturnActionIdd = OrderReturnActionId;
                                        if (arrReturnActionMstr[0].Table2.length == 1) {
                                            strDiv2 += "<tr flg='flgaction'><td style='" + style + "'><input type='text' style='width:40px;border-style:none;background-color:#ffffff;text-align:center' onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' onfocus=\"Focus(this,'0')\" onblur=\"fnCheckQtyValidate(this)\" value='" + qty + "' oldqty='" + qty + "' disabled='disabled' /></td>";
                                        } else {
                                            strDiv2 += "<tr flg='flgaction'><td style='" + style + "'><input type='text' style='width:40px' onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' onfocus=\"Focus(this,'0')\" onblur=\"fnCheckQtyValidate(this)\" value='" + qty + "' oldqty='" + qty + "' /></td>";
                                        }
                                        strDiv2 += "<td style='" + style + "'>";
                                        if (arrReturnActionMstr.length > 0) {
                                            var strAction = "";
                                            for (k in arrReturnActionMstr[0].Table2) {
                                                var iddd = arrReturnActionMstr[0].Table2[k].OrderReturnActionId;
                                                //if (iddd != 6 && iddd != 7) {
                                                //    if (stockstatusid == 1) {
                                                //        if (iddd > 3) {
                                                //            continue;
                                                //        }
                                                //    } else {
                                                //        if (iddd > 4) {
                                                //            continue;
                                                //        }
                                                //    }
                                                //}
                                                if (OrderReturnActionId == arrReturnActionMstr[0].Table2[k].OrderReturnActionId) {
                                                    strDiv2 += "<div><label value='" + OrderReturnActionId + "'><input type='radio' name='tr" + m + "" + groupcnt + "lvl1' onchange='fnShowAndHidetbl(this,3)' text='" + arrReturnActionMstr[0].Table2[k].OrderReturnAction + "' value='" + arrReturnActionMstr[0].Table2[k].OrderReturnActionId + "' checked='checked' flg='1' flgchecked='1'>" + arrReturnActionMstr[0].Table2[k].OrderReturnAction + "</label></div>";

                                                }
                                                else {
                                                    strDiv2 += "<div><label value='" + OrderReturnActionId + "'><input type='radio' name='tr" + m + "" + groupcnt + "lvl1' onchange='fnShowAndHidetbl(this,3)' text='" + arrReturnActionMstr[0].Table2[k].OrderReturnAction + "' value='" + arrReturnActionMstr[0].Table2[k].OrderReturnActionId + "'  flg='1'>" + arrReturnActionMstr[0].Table2[k].OrderReturnAction + "</label></div>";

                                                }
                                            }
                                        }
                                        strDiv2 += "</td>";
                                        strDiv2 += "<td style='" + style + "'>";

                                        var ReturnResolutionStr = "";
                                        var OldReturnResolutionID = 0;
                                        var ReturnResolutionData = jQuery.grep(arrReturnActionMstr[0].Table5, function (element, index) {
                                            return (element.ReturnActionId == OrderReturnActionId);
                                        });
                                        var remqty = 0;

                                        var strdisabled = OrderReturnResolutionId == 5 ? "disabled='disabled'" : "";

                                        for (k in ReturnResolutionData) {
                                            var ReturnResolutionID = ReturnResolutionData[k].ReturnResolutionId;
                                            if (OldReturnResolutionID != ReturnResolutionID) {
                                                var OrderReturnResolution = jQuery.grep(arrReturnActionMstr[0].Table3, function (element, index) {
                                                    return (element.OrderReturnResolutionId == ReturnResolutionID);
                                                });
                                                var subData = jQuery.grep(tblReturnData1, function (element, index) {
                                                    return (element.OrderReturnActionId == OrderReturnActionId && element.OrderReturnResolutionId == ReturnResolutionID);
                                                });

                                                if (subData.length > 0) {
                                                    remqty += parseInt(subData[0].ReplacementQty);
                                                    // var style = "border-left:1px solid #bbb;border-bottom:1px solid #bbb";

                                                    ReturnResolutionStr += "<div><label><input type='checkbox' onchange='fnShowAndHidetbl(this,4)' text='" + OrderReturnResolution[0].OrderReturnResolution + "' name='tr" + m + "" + (i + 1) + "lvl2' value='" + ReturnResolutionID + "' ReturnActionId='" + OrderReturnActionId + "' checked='checked'  >" + OrderReturnResolution[0].OrderReturnResolution + "</label></div>";
                                                    if (ReturnResolutionID != 4 && ReturnResolutionID != 5) {
                                                        ReturnResolutionStr += "<div flg='ReturnResolution' style='margin:5px;'><table cellpadding='0' cellspacing='0' style='border-top:1px solid #bbb;border-right:1px solid #bbb;width:100%' flg='ReturnResolution'><tr><th style='" + style + "'>Resolution</th><th style='" + style + "'>When</th></tr>";
                                                        ReturnResolutionStr += "<tr>";
                                                        ReturnResolutionStr += "<td style='" + style + "'>" + fnCreateGrid("", ReturnResolutionID, remqty, subData, 2) + "</td>";
                                                        ReturnResolutionStr += "<td style='" + style + "'>";
                                                        var ReturnWhen = jQuery.grep(arrReturnActionMstr[0].Table5, function (element, index) {
                                                            return (element.ReturnActionId == OrderReturnActionId && element.ReturnResolutionId == ReturnResolutionID);
                                                        });
                                                        var ReturnWhenStr = "";
                                                        for (k in ReturnWhen) {
                                                            var ReturnResolutionWhenId = ReturnWhen[k].ReturnResolutionWhenId;
                                                            if (parseInt(ReturnResolutionWhenId) > 0) {
                                                                var OrderReturnWhen = jQuery.grep(arrReturnActionMstr[0].Table4, function (element, index) {
                                                                    return (parseInt(element.OrderReturnResolutionWhenId) == parseInt(ReturnResolutionWhenId));
                                                                });
                                                                var subDatad = jQuery.grep(subData, function (element, index) {
                                                                    return (element.OrderReturnActionId == OrderReturnActionId && element.OrderReturnResolutionId == ReturnResolutionID && element.OrderReturnResolutionWhenId == ReturnResolutionWhenId);
                                                                });
                                                                if (subDatad.length > 0) {
                                                                    ReturnWhenStr += "<div><label><input type='radio' name='tr" + m + "" + (i + 1) + "lvl3_" + OrderReturnActionId + "_" + ReturnResolutionID + "' value='" + ReturnResolutionWhenId + "'  ReturnActionId='" + OrderReturnActionId + "' ReturnResolutionId='" + ReturnResolutionID + "' checked='checked' text='" + OrderReturnWhen[0].OrderReturnResolutionWhen + "' onchange='fnShowAndHidetbl(this,5)' flg='3' >" + OrderReturnWhen[0].OrderReturnResolutionWhen + "</label></div>";
                                                                } else {
                                                                    ReturnWhenStr += "<div><label><input type='radio' name='tr" + m + "" + (i + 1) + "lvl3_" + OrderReturnActionId + "_" + ReturnResolutionID + "' value='" + ReturnResolutionWhenId + "'  ReturnActionId='" + OrderReturnActionId + "' ReturnResolutionId='" + ReturnResolutionID + "' text='" + OrderReturnWhen[0].OrderReturnResolutionWhen + "' onchange='fnShowAndHidetbl(this,5)' flg='3' >" + OrderReturnWhen[0].OrderReturnResolutionWhen + "</label></div>";
                                                                }
                                                            }
                                                        }
                                                        ReturnResolutionStr += ReturnWhenStr;
                                                        ReturnResolutionStr += "</td>";
                                                        ReturnResolutionStr += "</tr>";
                                                        ReturnResolutionStr += "</table>";
                                                        ReturnResolutionStr += "</div>";
                                                    }
                                                } else {
                                                    ReturnResolutionStr += "<div><label><input type='checkbox' onchange='fnShowAndHidetbl(this,4)' text='" + OrderReturnResolution[0].OrderReturnResolution + "' name='tr" + m + "" + (i + 1) + "lvl2' value='" + ReturnResolutionID + "' ReturnActionId='" + OrderReturnActionId + "'   " + strdisabled + ">" + OrderReturnResolution[0].OrderReturnResolution + "</label></div>";
                                                }
                                            }
                                            OldReturnResolutionID = ReturnResolutionID;
                                        }
                                        if (OrderReturnActionId == 3) {
                                            strDiv2 += "<div flg=ReturnResolution>Reason For Reject Return : <textarea rows=3 style='width:90%'>" + Reason + "</textarea></div>";
                                        } else {
                                            strDiv2 += ReturnResolutionStr;
                                        }
                                        strDiv2 += "</td>";
                                        if (cntAction == 1) {
                                            strDiv2 += "<td id='tbCostborneby' style='" + style + ";text-align:center'>";
                                            strDiv2 += "&nbsp;";
                                            strDiv2 += "</td>";
                                        }
                                        strDiv2 += "<td style='" + style + ";text-align:center'>";
                                        var styles = "";
                                        if (OrderReturnResolutionId == 5 || OrderReturnActionId == 4 || arrReturnActionMstr[0].Table2.length == 1) {
                                            styles = ";display:none"
                                        }
                                        if (cntAction == 1) {
                                            strDiv2 += "<a href='###' onclick='fnAddRowForSinglePrd(this,1," + stockstatusid + ")' style='color:transparent" + styles + "' ><img src='../images/icoAdd.gif'/></a>";
                                        } else {
                                            strDiv2 += "<a href='###' onclick='fnAddRowForSinglePrd(this,1," + stockstatusid + ")' style='color:transparent' ><img src='../images/icoAdd.gif'/></a><a href='###' onclick='fnRemoveRowForSinglePrd(this,1)' style='color:transparent'><img src='../images/icoMinus.gif'/></a>";
                                        }
                                        strDiv2 += "</td>";
                                        strDiv2 += "</tr>";
                                        cntAction++;
                                    }
                                    OLDOrderReturnActionId = OrderReturnActionId;
                                    OLDOrderReturnResolutionId = OrderReturnResolutionId;
                                }
                                strDiv2 += "</table>";
                                strDiv2 += "</div>";
                                tblMain += strDiv2;
                            } else {
                                strDiv2 = "<div id='dvDetails1' style='height:476px;overflow-y:auto;'>";
                                strDiv2 += "<table id='tblReturnStepsBySingleproduct" + m + "' style='width:98%;border-top:1px solid #bbb;border-right:1px solid #bbb;' cellspacing='0' cellpadding='2' OrderReturnDetailID='" + OrderReturnDetailID + "' >";
                                var style = "border-left:1px solid #bbb;border-bottom:1px solid #bbb";
                                strDiv2 += "<tr><th style='" + style + ";width:45px;background-color:#23AED8;color:#fff'>Qty</th><th style='" + style + ";width:170px;background-color:#23AED8;color:#fff'>Return Action</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Resolution</th><th style='" + style + ";width:100px;background-color:#23AED8;color:#fff'>Returns Cost to be Borned By</th><th style='" + style + ";width:40px;background-color:#23AED8;color:#fff'>Action</th></tr>";
                                strDiv2 += "<tr flg='flgaction'><td style='" + style + "'><input type='text' style='width:40px' onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' onfocus=\"Focus(this,'0')\" onblur=\"fnCheckQtyValidate(this)\" value='" + totQty + "' oldqty='" + totQty + "' /></td>";
                                strDiv2 += "<td style='" + style + "'>";
                                if (arrReturnActionMstr.length > 0) {
                                    var strAction = "";
                                    groupcnt++;
                                    for (k in arrReturnActionMstr[0].Table2) {
                                        var iddd = arrReturnActionMstr[0].Table2[k].OrderReturnActionId;
                                        //if (iddd != 6 && iddd != 7) {
                                        //    if (stockstatusid == 1) {
                                        //        if (iddd > 3) {
                                        //            continue;
                                        //        }
                                        //    } else {
                                        //        if (iddd > 4) {
                                        //            continue;
                                        //        }
                                        //    }
                                        //}
                                        strDiv2 += "<div><label><input type='radio' name='tr" + m + "" + groupcnt + "lvl1' onchange='fnShowAndHidetbl(this,3)' value='" + arrReturnActionMstr[0].Table2[k].OrderReturnActionId + "' text='" + arrReturnActionMstr[0].Table2[k].OrderReturnAction + "' flg='1'>" + arrReturnActionMstr[0].Table2[k].OrderReturnAction + "</label></div>";

                                    }
                                }
                                strDiv2 += "</td>";
                                strDiv2 += "<td style='" + style + "'>&nbsp;";
                                strDiv2 += "</td>";
                                if (cntAction == 1) {
                                    strDiv2 += "<td id='tbCostborneby' style='" + style + ";text-align:center'>";
                                    strDiv2 += "&nbsp;";
                                    strDiv2 += "</td>";
                                }
                                strDiv2 += "<td style='" + style + ";text-align:center'>";
                                strDiv2 += "<a href='###' onclick='fnAddRowForSinglePrd(this,1," + stockstatusid + ")' style='color:transparent' ><img src='../images/icoAdd.gif'/></a>";
                                strDiv2 += "</td>";
                                strDiv2 += "</tr>";
                                strDiv2 += "</table>";
                                strDiv2 += "</div>";
                                tblMain += strDiv2;
                            }
                        }
                        else {
                            strDiv2 = "<div id='dvDetails1' style='height:476px;overflow-y:auto;'>";
                            strDiv2 += "<table id='tblReturnStepsBySingleproduct" + m + "' style='width:100%;border-top:1px solid #bbb;border-right:1px solid #bbb;' cellspacing='0' cellpadding='2' OrderReturnDetailID='" + OrderReturnDetailID + "' >";
                            var style = "border-left:1px solid #bbb;border-bottom:1px solid #bbb";
                            strDiv2 += "<tr><th style='" + style + ";width:45px;background-color:#23AED8;color:#fff'>Qty</th><th style='" + style + ";width:170px;background-color:#23AED8;color:#fff'>Return Action</th><th style='" + style + ";background-color:#23AED8;color:#fff'>Resolution</th><th style='" + style + ";width:100px;background-color:#23AED8;color:#fff'>Returns Cost to be Borned By</th><th style='" + style + ";width:40px;background-color:#23AED8;color:#fff'>Action</th></tr>";
                            strDiv2 += "<tr flg='flgaction'><td style='" + style + "'><input type='text' style='width:40px' onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' onfocus=\"Focus(this,'0')\" onblur=\"fnCheckQtyValidate(this)\" value='" + totQty + "' oldqty='" + totQty + "' /></td>";
                            strDiv2 += "<td style='" + style + "'>";
                            if (arrReturnActionMstr.length > 0) {
                                var strAction = "";
                                groupcnt++;
                                for (k in arrReturnActionMstr[0].Table2) {
                                    var iddd = arrReturnActionMstr[0].Table2[k].OrderReturnActionId;
                                    //if (iddd != 6 && iddd != 7) {
                                    //    if (stockstatusid == 1) {
                                    //        if (iddd > 3) {
                                    //            continue;
                                    //        }
                                    //    } else {
                                    //        if (iddd > 4) {
                                    //            continue;
                                    //        }
                                    //    }
                                    //}
                                    strDiv2 += "<div><label><input type='radio' name='tr" + m + "" + groupcnt + "lvl1' onchange='fnShowAndHidetbl(this,3)' value='" + arrReturnActionMstr[0].Table2[k].OrderReturnActionId + "' text='" + arrReturnActionMstr[0].Table2[k].OrderReturnAction + "' flg='1'>" + arrReturnActionMstr[0].Table2[k].OrderReturnAction + "</label></div>";
                                    //if (iddd == 1) {
                                    //    var divsentManuf = "<div id='divSentmanu' style='display:none;padding-left:15px'><label><input type='radio' name='rdotr" + m + "" + groupcnt + "lvl1' value='1' />Sent to Manufacturer</label></br><label><input type='radio' name='rdotr" + m + "" + groupcnt + "lvl1' value='2' />Destroy at Self Warehouse</label></div>";
                                    //    strDiv2 += divsentManuf;
                                    //}
                                }
                            }
                            strDiv2 += "</td>";
                            strDiv2 += "<td style='" + style + "'>&nbsp;";
                            strDiv2 += "</td>";
                            if (cntAction == 1) {
                                strDiv2 += "<td id='tbCostborneby' style='" + style + ";text-align:center'>";
                                strDiv2 += "&nbsp;";
                                strDiv2 += "</td>";
                            }
                            strDiv2 += "<td style='" + style + ";text-align:center'>";
                            strDiv2 += "<a href='###' onclick='fnAddRowForSinglePrd(this,1," + stockstatusid + ")' style='color:transparent' ><img src='../images/icoAdd.gif'/></a>";
                            strDiv2 += "</td>";
                            strDiv2 += "</tr>";
                            strDiv2 += "</table>";
                            strDiv2 += "</div>";
                            tblMain += strDiv2;
                        }
                        tblMain += "</td></tr>";
                    }
                    tblMain += "</table>";
                    $("#dvreturnStepMain").append(tblMain);
                    $("#tbCostborneby").attr("rowspan", cntAction);
                    if (trIndex > 1) {
                        $("#dvreturnStepMain").find("input[type=checkbox][value=5]").prop("disabled", true);
                    }
                    var flgSponser = 0;
                    var divSponser = "<div id='divSponsor'>";
                    if (arrReturnStepsBySingleproduct[0].Table6.length > 0) {
                        divSponser += "<table style='font-size:8.5pt'>";
                        divSponser += "<tr>";
                        divSponser += "<td></td>";
                        divSponser += "<td>Amount</td>";
                        divSponser += "<td>%age</td>";
                        divSponser += "</tr>";
                        var arrSponsor = arrReturnStepsBySingleproduct[0].Table6;
                        for (var s in arrSponsor) {
                            if (parseFloat(arrSponsor[s].TotalValue) > 0) {
                                if (flgSponser == 0) {
                                    flgSponser = 1;
                                }
                            }
                            divSponser += "<tr sponsorid=" + arrSponsor[s].OrderReturnSponsorID + ">";
                            divSponser += "<td>" + arrSponsor[s].SponsorDescr + "</td>";
                            divSponser += "<td><input type='text' style='width:50px;text-align:right' onkeyup='return isKeyUPAmount(event)' onkeypress='return isNumericWithOneDecimalAmount(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' onfocus=\"Focus(this,'0')\" onblur=\"Blur(this,'0')\" value='" + Math.round(parseFloat(arrSponsor[s].TotalValue)) + "' /></td>";
                            divSponser += "<td><input type='text' style='width:30px;text-align:center' onkeyup='return isKeyUPPercentage(event)' onkeypress='return isPercentage(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' onfocus=\"Focus(this,'0')\" onblur=\"Blur(this,'0')\" value='" + Math.round(parseFloat(arrSponsor[s].Percentage)) + "' maxlength='3' /></td>";
                            divSponser += "</tr>";
                        }
                        divSponser += "</table>";
                    }
                    divSponser += "</div>";
                    $("#tbCostborneby").html(divSponser);
                    if (flgSponser == 0) {
                        fnSetSponsorActionWise();
                    }

                    //if (IsApproved == 2) {
                    //    dvApproved = "<div style='margin-left:3px;margin-bottom:5px;background-color:#c0c0c0;width:99.5%'><label><input type='radio' checked='checked' value='2' onchange='fnShowDetailTable(this)' name='rdoapprove' >Not Approve</label></div>";
                    //} else {
                    //    dvApproved = "<div style='margin-left:3px;margin-bottom:5px;background-color:#c0c0c0;width:99.5%'><label><input type='radio' onchange='fnShowDetailTable(this)' value='2' name='rdoapprove' >Not Approve</label></div>";
                    //}

                    // $("#dvreturnStepMain").append(dvApproved);

                }
                if ($("#dvreturnStepMain").find("input[type=radio][flg=3][value=8]:checked").length > 0 && PrdCnt == 1 && (OrderReturnType == 1 || OrderReturnType == 2)) {
                    var strDiv3 = "<div style='border:1px solid #a6c9e2;border-width: 1px 0 0 0;'><div style='float:right;display:inline'><input value='Save & Generate PickList' type='button' id='btnSaveSteps' class='button' onclick='fnPopulateOrderReturnSteps(3)'/><input value='Cancel' type='button' class='button' onclick=\"javascript:$('#dvreturnStepMain').dialog('close')\"/></div></div>"
                } else {
                    var strDiv3 = "<div  style='border:1px solid #a6c9e2;border-width: 1px 0 0 0;'><div style='float:right;display:inline'><input value='OK' type='button' class='button' onclick='fnPopulateOrderReturnSteps(2)'/><input value='Cancel' type='button' class='button' onclick=\"javascript:$('#dvreturnStepMain').dialog('close')\"/></div></div>"
                }
                $("#dvreturnStepMain").append(strDiv3);
                //$("#divProductDescr")[0].innerHTML = strDiv1 + strDiv2 + strDiv3;
               fnCalculateResolutionvalOnLLoad();
            }
            else {
                $("#dvreturnStepMain")[0].innerHTML = "No Record Found!";
            }

        },
        error: function (result) {
            $("#dvreturnStepMain")[0].innerHTML = "Error-" + result.responseText;
            return false;
        }
    });
}

function fnCalculateResolutionval() {
    var OrderReturnActionId = 0;
    var OrderReturnResolutionId = 0;
    var OrderReturnResolutionWhenId = 0;
    var Qty = 0;
    var totResVal = 0; var totResValTopLevel = 0;
    for (var trcnt = 0; trcnt < document.getElementById("tblMainPOP").rows.length; trcnt++) {

        for (var i = 1; i < document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows.length; i++) {
            totResVal = 0;
            OrderReturnActionId = $(document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows[i].cells[1]).find("input:checked").val();
            OrderReturnActionId = OrderReturnActionId == undefined ? 0 : OrderReturnActionId;
            Qty = document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows[i].cells[0].children[0].value == "" ? 0 : document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows[i].cells[0].children[0].value;
            if (Qty != 0) {
                if (OrderReturnActionId != 3 && OrderReturnActionId != 4) {
                    var checkedBox = $(document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows[i].cells[2]).find("input[type=checkbox]:checked");
                    if (checkedBox.length > 0) {
                        for (var chkcnt = 0; chkcnt < checkedBox.length; chkcnt++) {
                            OrderReturnResolutionId = checkedBox[chkcnt].value;
                            OrderReturnResolutionId = OrderReturnResolutionId == undefined ? 0 : OrderReturnResolutionId;

                            if (OrderReturnResolutionId != 4 && OrderReturnResolutionId != 5) {
                                var tblMain = $(checkedBox[chkcnt]).closest("div").next().find("table[flg=ReturnResolution]");
                                if (tblMain.length > 0) {
                                    for (var tb = 0; tb < tblMain.length; tb++) {
                                        var tblSub = $(tblMain[tb].rows[1].cells[0]).find("table");

                                        OrderReturnResolutionWhenId = $(tblMain[tb].rows[1].cells[1]).find("input[type=radio]:checked").val();
                                        OrderReturnResolutionWhenId = OrderReturnResolutionWhenId == undefined ? 0 : OrderReturnResolutionWhenId;

                                        var k = 0;
                                        var totqt = 0; var totRs = 0;
                                        for (var k = 1; k < tblSub[0].rows.length; k++) {
                                            if (OrderReturnResolutionId == 1 || OrderReturnResolutionId == 2) {
                                                var subQty = tblSub[0].rows[k].cells[1].children[0].value;
                                                var rate = $(tblSub[0].rows[k]).is("[rate]") ? $(tblSub[0].rows[k]).attr("rate") : 0;
                                                totResVal += subQty * parseFloat(rate);
                                            } else {
                                                var qt = $(tblSub[0].rows[k].cells[1]).is("[amt]") ? $(tblSub[0].rows[k].cells[1]).attr("amt") : 0;
                                                //var rate = $("#tdPrdName").attr("rate");
                                                qt = parseFloat(qt) < 0 ? 0 : parseFloat(qt);
                                                totResVal += parseFloat(qt);
                                            }
                                        }
                                    }


                                }
                            } else {
                                if (OrderReturnResolutionId == 4) {
                                    var rate = $("#tdPrdName").attr("rate");
                                    var totv = Qty * parseFloat(rate);
                                    var remVal = parseFloat(totv) - parseFloat(totResVal);
                                    $(checkedBox[chkcnt]).attr("amt", remVal);
                                    $(checkedBox[chkcnt]).closest("label").find("span").remove();
                                    $(checkedBox[chkcnt]).closest("label").append("<span> (" + parseFloat(remVal).toFixed(2) + ")</span>");
                                    totResVal += parseFloat($(checkedBox[chkcnt]).attr("amt"));
                                } else {
                                    var rate = $("#tdPrdName").attr("rate");
                                    totResVal += Qty * parseFloat(rate);
                                }
                            }
                        }
                    }
                } else {
                    var rate = $("#tdPrdName").attr("rate");
                    totResVal += Qty * parseFloat(rate);
                }
            }
            totResValTopLevel += parseFloat(totResVal);
        }

    }
    $("#tdtotResVal")[0].innerHTML = parseFloat(totResValTopLevel).toFixed(2);
    $("#tdtotResVal").attr("totResVal", totResValTopLevel);
    fnSetSponsorActionWise();
}

function fnCalculateResolutionvalOnLLoad() {
    var OrderReturnActionId = 0;
    var OrderReturnResolutionId = 0;
    var OrderReturnResolutionWhenId = 0;
    var Qty = 0;
    var totResVal = 0; var totResValTopLevel = 0;
    for (var trcnt = 0; trcnt < document.getElementById("tblMainPOP").rows.length; trcnt++) {

        for (var i = 1; i < document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows.length; i++) {
            totResVal = 0;
            OrderReturnActionId = $(document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows[i].cells[1]).find("input[flg=1]:checked").val();
            OrderReturnActionId = OrderReturnActionId == undefined ? 0 : OrderReturnActionId;
            Qty = document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows[i].cells[0].children[0].value == "" ? 0 : document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows[i].cells[0].children[0].value;
            if (Qty != 0) {
                if (OrderReturnActionId != 3) {
                    var checkedBox = $(document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows[i].cells[2]).find("input[type=checkbox]:checked");
                    if (checkedBox.length > 0) {
                        for (var chkcnt = 0; chkcnt < checkedBox.length; chkcnt++) {
                            OrderReturnResolutionId = checkedBox[chkcnt].value;
                            OrderReturnResolutionId = OrderReturnResolutionId == undefined ? 0 : OrderReturnResolutionId;

                            if (OrderReturnResolutionId != 4 && OrderReturnResolutionId != 5) {
                                var tblMain = $(checkedBox[chkcnt]).closest("div").next().find("table[flg=ReturnResolution]");
                                if (tblMain.length > 0) {
                                    for (var tb = 0; tb < tblMain.length; tb++) {
                                        var tblSub = $(tblMain[tb].rows[1].cells[0]).find("table");

                                        OrderReturnResolutionWhenId = $(tblMain[tb].rows[1].cells[1]).find("input[type=radio]:checked").val();
                                        OrderReturnResolutionWhenId = OrderReturnResolutionWhenId == undefined ? 0 : OrderReturnResolutionWhenId;

                                        var k = 0;
                                        var totqt = 0; var totRs = 0;
                                        for (var k = 1; k < tblSub[0].rows.length; k++) {
                                            if (OrderReturnResolutionId == 1 || OrderReturnResolutionId == 2) {
                                                var subQty = tblSub[0].rows[k].cells[1].children[0].value;
                                                var rate = $(tblSub[0].rows[k]).is("[rate]") ? $(tblSub[0].rows[k]).attr("rate") : 0;
                                                totResVal += subQty * parseFloat(rate);
                                            } else {
                                                var qt = $(tblSub[0].rows[k].cells[1]).is("[amt]") ? $(tblSub[0].rows[k].cells[1]).attr("amt") : 0;
                                                //var rate = $("#tdPrdName").attr("rate");
                                                qt = parseFloat(qt) < 0 ? 0 : parseFloat(qt);
                                                totResVal += parseFloat(qt);
                                            }
                                        }
                                    }


                                }
                            } else {
                                if (OrderReturnResolutionId == 4) {
                                    var rate = $("#tdPrdName").attr("rate");
                                    var totv = Qty * parseFloat(rate);
                                    var remVal = parseFloat(totv) - parseFloat(totResVal);
                                    $(checkedBox[chkcnt]).attr("amt", remVal);
                                    $(checkedBox[chkcnt]).closest("label").find("span").remove();
                                    $(checkedBox[chkcnt]).closest("label").append("<span> (" + parseFloat(remVal).toFixed(2) + ")</span>");
                                    totResVal += parseFloat($(checkedBox[chkcnt]).attr("amt"));
                                } else {
                                    var rate = $("#tdPrdName").attr("rate");
                                    totResVal += Qty * parseFloat(rate);
                                }
                            }
                        }
                    }
                } else {
                    var rate = $("#tdPrdName").attr("rate");
                    totResVal += Qty * parseFloat(rate);
                }
            }
            totResValTopLevel += parseFloat(totResVal);
        }

    }
    $("#tdtotResVal")[0].innerHTML = parseFloat(totResValTopLevel).toFixed(2);
    $("#tdtotResVal").attr("totResVal", totResValTopLevel);

}

function fnPopulateOrderReturnSteps(flg) {
    var arrOrderReturnSteps = new Array();
    var storeid = $("#hdnStoreId").val();
    var OrderReturnStepsId = 0;
    var OrderReturnDetailID = 0;
    var RowNo = 1;
    var OrderReturnActionId = 0;
    var OrderReturnResolutionId = 0;
    var OrderReturnResolutionWhenId = 0;
    var Qty = 0;
    var ReplacementString = "";
    var PrdId = 0;
    var ReturnAction = "";
    var Resolution = "";
    var ResolutionWhen = "";
    var totQty = 0;
    var flgValid = 0;
    var SponsorId = 0;
    var IsApproved = 0;
    var Reasons = "";
    var OrderReturnSubActionId = 0;
    if (flg == 1) {
        if ($("#tblBasicDetailsInfo input[type=checkbox]:checked").length == 0) {
            alert("Submit Successfully");
            window.parent.fnClosedvOrderReturnPop(1);
            return false;
        }
        OrderReturnActionId = $("#tdReturnAction").find("input[type=radio]:checked").length > 0 ? $("#tdReturnAction").find("input[type=radio]:checked").val() : 0;
        if (OrderReturnActionId == 0) {
            alert("Please select Return Action!");
            $("#tdReturnAction").find("input[type=radio]").eq(0).focus();
            return false;
        }
        if (OrderReturnActionId != 3 && OrderReturnActionId != 4) {
            IsApproved = 1;
            OrderReturnResolutionId = $("#tdReturnResolution").find("input[type=radio]:checked").length > 0 ? $("#tdReturnResolution").find("input[type=radio]:checked").val() : 0;
            if (OrderReturnResolutionId == 0) {
                alert("Please select Return Resolution!");
                $("#tdReturnResolution").find("input[type=radio]").eq(0).focus();
                return false;
            }
            if (OrderReturnResolutionId != 4 && OrderReturnResolutionId != 5) {
                OrderReturnResolutionWhenId = $("#tdReturnWhen").find("input[type=radio]:checked").length > 0 ? $("#tdReturnWhen").find("input[type=radio]:checked").val() : 0;
                if (OrderReturnResolutionWhenId == 0) {
                    alert("Please select Return Resolution When!");
                    $("#tdReturnWhen").find("input[type=radio]").eq(0).focus();
                    return false;
                }
            }
        } else {
            if (OrderReturnActionId == 4) {
                IsApproved = 0;
            } else {
                IsApproved = 1;
            }
            OrderReturnResolutionId = 0;
            OrderReturnResolutionWhenId = 0;
            ReplacementString = "";
            ReturnAction = "";// Qty + " Qty " + $(document.getElementById("tblReturnStepsBySingleproduct").rows[i].cells[1]).find("input[type=radio]:checked").closest("label").attr("value");
            Resolution = "";
            ResolutionWhen = "";
        }
        for (var i = 1; i < document.getElementById("tblBasicDetailsInfo").rows.length; i++) {
            if (document.getElementById("tblBasicDetailsInfo").rows[i].cells[0].children[0] != undefined) {
                if (document.getElementById("tblBasicDetailsInfo").rows[i].cells[0].children[0].checked == true) {
                    ReplacementString = "";
                    RowNo = 1;
                    Qty = document.getElementById("tblBasicDetailsInfo").rows[i].cells[4].innerHTML;
                    var AvailableStock = $(document.getElementById("tblBasicDetailsInfo").rows[i]).attr("AvailableStock");
                    if (parseInt(AvailableStock) < parseInt(Qty)) {
                        continue;
                    }
                    PrdId = $(document.getElementById("tblBasicDetailsInfo").rows[i]).attr("prdid");
                    var StandardRateBeforeTax = $(document.getElementById("tblBasicDetailsInfo").rows[i]).attr("StandardRateBeforeTax");
                    OrderReturnDetailID = $(document.getElementById("tblBasicDetailsInfo").rows[i]).attr("OrderReturnDetailID");
                    if (OrderReturnActionId != 3 || OrderReturnActionId != 4) {
                        ReturnAction = Qty + " Pcs " + $("#tdReturnAction").find("input[type=radio]:checked").closest("label").attr("value");
                        if (OrderReturnResolutionId != 4 && OrderReturnResolutionId != 5) {
                            Resolution = Qty + " Pcs " + $("#tdReturnResolution").find("input[type=radio]:checked").closest("label").attr("value");
                        } else {
                            Resolution = $("#tdReturnResolution").find("input[type=radio]:checked").closest("label").attr("value");
                        }
                        ResolutionWhen = $("#tdReturnWhen").find("input[type=radio]:checked").length > 0 ? $("#tdReturnWhen").find("input[type=radio]:checked").closest("label").attr("value") : "";
                    } else {
                        if (OrderReturnActionId == 4) {
                            IsApproved = 0;
                        } else {
                            IsApproved = 1;
                        }
                        OrderReturnResolutionId = 0;
                        OrderReturnResolutionWhenId = 0;
                        ReplacementString = "";
                        ReturnAction = Qty + " Pcs " + $("#tdReturnAction").find("input[type=radio]:checked").closest("label").attr("value");
                        Resolution = "";
                        if (OrderReturnActionId == 3) {
                            Reasons = $(document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows[i].cells[2]).find("textarea").val();
                            Resolution = Reasons;
                        }
                        ResolutionWhen = "";
                    }
                    var arr = [{
                        OrderReturnStepsId: OrderReturnStepsId, OrderReturnDetailID: OrderReturnDetailID, RowNo: RowNo,
                        OrderReturnActionId: OrderReturnActionId,
                        Qty: Qty, ReplacementString: ReplacementString, PrdId: PrdId, ReturnAction: ReturnAction, Resolution: Resolution, ResolutionWhen: ResolutionWhen, IsApproved: IsApproved, OrderReturnSubActionId: OrderReturnSubActionId, Reason: Reasons
                    }];
                    arrOrderReturnSteps.push(arr[0]);



                }
            }
        }
        var trInput = $("#divSponsor tr"); var totSponserval = 0;
        for (var b = 1; b < trInput.length; b++) {
            var SponsorId = $(trInput[b]).attr("sponsorid");
            var Percentage = $(trInput[b]).find("input:text").eq(1).val();
            Percentage = Percentage == "" ? 0 : Percentage
            var TotalAmount = $(trInput[b]).find("input:text").eq(0).val();
            TotalAmount = TotalAmount == "" ? 0 : TotalAmount
            totSponserval = totSponserval + parseFloat(TotalAmount);
            var arr = { OrderReturnDetailId: OrderReturnDetailID, SponsorId: SponsorId, Percentage: Percentage, TotalAmount: TotalAmount }
            arrOrderReturnSponsorMapping.push(arr);
        }
        var netval = $("#tblBasicDetailsInfo").attr("totval")
        netval = Math.round(netval);
        if (parseInt(totSponserval) != parseInt(netval)) {
            alert("Borne by value (" + totSponserval + ") can not be less than or greater than Total Value (" + netval + ")");
            $("#divSponsor").find("input:text").eq(0).focus();
            return false;
        }
        if (arrOrderReturnSteps.length > 0) {
            $("#dvFadeForProcessing").show();
            fnPopuplateData(arrOrderReturnSteps, arrOrderReturnSponsorMapping, storeid, flg);
        }
    }
    else {

        try {
            var isManApproved = $("#tdPrdName").is("[IsApproved]") ? $("#tdPrdName").attr("IsApproved") : 0;
            if (isManApproved > 0) {
                fnCloseDialogparent();
                return false;
            }
            var totOQuantity = $("#tdtotQty").attr("totqty"); var totDQty = 0;
            for (var trcnt = 0; trcnt < document.getElementById("tblMainPOP").rows.length; trcnt++) {
                var totResVal = 0.00;
                OrderReturnDetailID = $("#tblReturnStepsBySingleproduct" + trcnt).attr("OrderReturnDetailID");
                for (var i = 1; i < document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows.length; i++) {
                    var qt = document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows[i].cells[0].children[0].value;
                    qt = qt == "" ? 0 : qt;
                    totDQty = totDQty + parseInt(qt);
                }
            }
            if (parseInt(totOQuantity) != parseInt(totDQty)) {
                alert("Total Qty (" + totOQuantity + ") does not match with resolution qty (" + totDQty + ")");
                document.getElementById("tblReturnStepsBySingleproduct0").rows[1].cells[0].children[0].focus();
                return false;
            }
            for (var trcnt = 0; trcnt < document.getElementById("tblMainPOP").rows.length; trcnt++) {
                var totResVal = 0.00;
                OrderReturnDetailID = $("#tblReturnStepsBySingleproduct" + trcnt).attr("OrderReturnDetailID");
                for (var i = 1; i < document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows.length; i++) {
                    totResVal = 0.00;
                    var UOM = $(document.getElementById("tblReturnStepsBySingleproduct" + trcnt)).is("[UOM]") == true ? $(document.getElementById("tblReturnStepsBySingleproduct" + trcnt)).attr("UOM") : "Pcs";
                    ReplacementString = "";
                    OrderReturnStepsId = 0;

                    OrderReturnActionId = $(document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows[i].cells[1]).find("input[type=radio]:checked").val();
                    OrderReturnActionId = OrderReturnActionId == undefined ? 0 : OrderReturnActionId;
                    if (OrderReturnActionId == 0) {
                        alert("Please select Return Action!");
                        $(document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows[i].cells[1]).find("input[type=radio]").eq(0).focus();
                        return false;
                    }
                    Qty = document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows[i].cells[0].children[0].value;
                    Qty = Qty == "" ? 0 : Qty;
                    if (Qty != 0) {

                        if (OrderReturnActionId != 3 && OrderReturnActionId != 4) {
                            IsApproved = 1;
                            var checkedBox = $(document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows[i].cells[2]).find("input[type=checkbox]:checked");
                            if (checkedBox.length > 0) {
                                for (var chkcnt = 0; chkcnt < checkedBox.length; chkcnt++) {
                                    OrderReturnResolutionId = checkedBox[chkcnt].value;
                                    OrderReturnResolutionId = OrderReturnResolutionId == undefined ? 0 : OrderReturnResolutionId;

                                    if (OrderReturnResolutionId != 4 && OrderReturnResolutionId != 5) {

                                        var tblMain = $(checkedBox[chkcnt]).closest("div").next().find("table[flg=ReturnResolution]");
                                        if (tblMain.length > 0) {
                                            for (var tb = 0; tb < tblMain.length; tb++) {
                                                var tblSub = $(tblMain[tb].rows[1].cells[0]).find("table");

                                                OrderReturnResolutionWhenId = $(tblMain[tb].rows[1].cells[1]).find("input[type=radio]:checked").val();
                                                OrderReturnResolutionWhenId = OrderReturnResolutionWhenId == undefined ? 0 : OrderReturnResolutionWhenId;

                                                if (OrderReturnResolutionWhenId == 0) {
                                                    alert("Please select Return Resolution When!");
                                                    $(tblMain[tb].rows[1].cells[1]).find("input[type=radio]").eq(0).focus();
                                                    return false;
                                                }

                                                var k = 0;
                                                var totqt = 0; var totRs = 0;
                                                for (var k = 1; k < tblSub[0].rows.length; k++) {

                                                    var SubRowNo = k;


                                                    if (OrderReturnResolutionId == 1) {
                                                        var subQty = tblSub[0].rows[k].cells[1].children[0].value;
                                                        var PhyQty = tblSub[0].rows[k].cells[4].innerHTML;
                                                        PhyQty = PhyQty.trim() == "" ? 0 : PhyQty.trim();
                                                        if (parseInt(subQty) > parseInt(PhyQty)) {
                                                            flgValid = 1;
                                                            $(tblSub[0].rows[k]).addClass("trHeilight");
                                                        }
                                                        totqt += parseInt(subQty);
                                                        if (parseInt(subQty) > 0) {

                                                            var rate = $(tblSub[0].rows[k]).is("[rate]") ? $(tblSub[0].rows[k]).attr("rate") : 0;
                                                            totResVal += subQty * parseFloat(rate);

                                                            Resolution += subQty + " " + UOM + " " + $(checkedBox[chkcnt]).attr("text") + ",";
                                                            var prdid = $("#tdPrdName").attr("prdid");
                                                            ReplacementString += SubRowNo + "^" + OrderReturnResolutionId + "@" + OrderReturnResolutionWhenId + "$" + prdid + "#" + subQty + "|";
                                                        }

                                                    } else if (OrderReturnResolutionId == 2) {
                                                        var subQty = tblSub[0].rows[k].cells[1].children[0].value;
                                                        totqt += parseInt(subQty);
                                                        var PhyQty = tblSub[0].rows[k].cells[4].innerHTML;
                                                        PhyQty = PhyQty.trim() == "" ? 0 : PhyQty.trim();
                                                        if (parseInt(subQty) > parseInt(PhyQty)) {
                                                            flgValid = 1;
                                                            $(tblSub[0].rows[k]).addClass("trHeilight");
                                                        }
                                                        if (parseInt(subQty) > 0) {
                                                            var rate = $(tblSub[0].rows[k]).is("[rate]") ? $(tblSub[0].rows[k]).attr("rate") : 0;
                                                            totResVal += subQty * parseFloat(rate);

                                                            Resolution += subQty + " " + UOM + " " + $(checkedBox[chkcnt]).attr("text") + ",";
                                                            var prdid = $(tblSub[0].rows[k]).attr("prdid");
                                                            ReplacementString += SubRowNo + "^" + OrderReturnResolutionId + "@" + OrderReturnResolutionWhenId + "$" + prdid + "#" + subQty + "|";
                                                        }
                                                    } else {
                                                        var subQty = tblSub[0].rows[k].cells[0].children[0].value;
                                                        totqt += parseInt(subQty);
                                                        //if (parseInt(subQty) > 0) {
                                                        var Value = parseFloat($(tblSub[0].rows[k].cells[1]).attr("amt"));
                                                        Value = parseFloat(Value) < 0 ? 0 : parseFloat(Value);
                                                        if (parseFloat(Value) > 0) {
                                                            totResVal += parseFloat(Value);
                                                            totRs += parseFloat(Value);
                                                            Resolution += parseFloat(Value).toFixed(2) + " Rs. " + $(checkedBox[chkcnt]).attr("text") + ",";

                                                            ReplacementString += SubRowNo + "^" + OrderReturnResolutionId + "@" + OrderReturnResolutionWhenId + "$" + parseFloat(Value).toFixed(2) + "#0|";
                                                        }
                                                        // }
                                                    }
                                                }
                                                if (OrderReturnResolutionId == 3) {
                                                    ResolutionWhen += parseFloat(totRs).toFixed(2) + " Rs. " + $(tblMain[tb].rows[1].cells[1]).find("input[type=radio]:checked").attr("text") + ",";
                                                } else {
                                                    ResolutionWhen += totqt + " " + UOM + " " + $(tblMain[tb].rows[1].cells[1]).find("input[type=radio]:checked").attr("text") + ",";
                                                }

                                            }
                                        }
                                    } else {
                                        if (OrderReturnResolutionId == 4) {
                                            totResVal += parseFloat($(checkedBox[chkcnt]).attr("amt"));
                                            Resolution += $(checkedBox[chkcnt]).attr("text") + " for Rs. " + parseFloat($(checkedBox[chkcnt]).attr("amt")).toFixed(2);
                                        } else {
                                            var rate = $("#tdPrdName").attr("rate");
                                            totResVal += Qty * parseFloat(rate);
                                            Resolution += $(checkedBox[chkcnt]).attr("text") + " for Rs. " + parseFloat(Qty * parseFloat(rate)).toFixed(2);
                                        }

                                        var prdid = 0;
                                        ReplacementString += "0^" + OrderReturnResolutionId + "@0$0#0|";
                                    }

                                }
                                ReturnAction += Qty + " " + UOM + " " + $(document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows[i].cells[1]).find("input[type=radio]:checked").attr("text") + ",";
                            } else {
                                alert("Please select Return Resolution!");
                                $(document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows[i].cells[2]).find("input[type=checkbox]").eq(0).focus();
                                return false;
                            }
                        } else {
                            ReturnAction += Qty + " " + UOM + " " + $(document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows[i].cells[1]).find("input[type=radio]:checked").attr("text") + ",";
                            if (OrderReturnActionId == 4) {
                                RowNo = 1;
                                IsApproved = 0;
                                Show_popup(PrdId, Qty, RowNo, OrderReturnStepsId, OrderReturnDetailID, OrderReturnActionId, OrderReturnSubActionId, OrderReturnResolutionId, OrderReturnResolutionWhenId, ReplacementString, ReturnAction, Resolution, ResolutionWhen, Reasons);
                                return false;
                            } else {


                                IsApproved = 1;

                            }

                            OrderReturnSubActionId = 0;
                            OrderReturnResolutionId = 0;
                            OrderReturnResolutionWhenId = 0;
                            ReplacementString = "";

                            Resolution = "";
                            if (OrderReturnActionId == 3) {
                                Reasons = $(document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows[i].cells[2]).find("textarea").val();
                                Resolution = Reasons;
                            }
                            ResolutionWhen = "";
                        }
                        PrdId = $("#tdPrdName").attr("prdid");
                        if (OrderReturnActionId != 3 && OrderReturnActionId != 4) {
                            var totVal = parseFloat(parseInt(Qty) * parseFloat($("#tdPrdName").attr("rate"))).toFixed(2);
                            totResVal = parseFloat(totResVal).toFixed(2);
                            if (parseFloat(totResVal) != parseFloat(totVal)) {
                                alert("Return Resolution Value (" + parseFloat(totResVal).toFixed(2) + ") can not be less or greater than Total Value (" + parseFloat(totVal).toFixed(2) + ")");
                                document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows[i].cells[0].children[0].focus();
                                return false;
                            }
                        }
                        var arr = [{
                            OrderReturnStepsId: OrderReturnStepsId, OrderReturnDetailID: OrderReturnDetailID, RowNo: RowNo,
                            OrderReturnActionId: OrderReturnActionId,
                            Qty: Qty, ReplacementString: ReplacementString, PrdId: PrdId, ReturnAction: ReturnAction, Resolution: Resolution, ResolutionWhen: ResolutionWhen, IsApproved: IsApproved, OrderReturnSubActionId: OrderReturnSubActionId, Reason: Reasons
                        }];
                        arrOrderReturnSteps.push(arr[0]);

                    }
                    RowNo++;
                }
            }
            var arrOrderReturnSponsorMapping = new Array();
            var trInput = $("#divSponsor tr"); var totSponserval = 0;
            for (var b = 1; b < trInput.length; b++) {
                var SponsorId = $(trInput[b]).attr("sponsorid");
                var Percentage = $(trInput[b]).find("input:text").eq(1).val();
                Percentage = Percentage == "" ? 0 : Percentage
                var TotalAmount = $(trInput[b]).find("input:text").eq(0).val();
                TotalAmount = TotalAmount == "" ? 0 : TotalAmount
                totSponserval = totSponserval + parseFloat(TotalAmount);
                var arr = { OrderReturnDetailId: OrderReturnDetailID, SponsorId: SponsorId, Percentage: Percentage, TotalAmount: TotalAmount }
                arrOrderReturnSponsorMapping.push(arr);
            }
            if (parseInt(totSponserval) != parseInt($("#tdNetVal").html().trim())) {
                alert("Borne by value (" + totSponserval + ") can not be less than or greater than Total Value (" + $("#tdNetVal").html().trim() + ")");
                $("#divSponsor").find("input:text").eq(0).focus();
                return false;
            }

            if (flgValid == 1) {
                alert("You have insufficient physical stock,so please check highlighted rows");
                return false;
            }
            if (flgValid == 0) {
                if (arrOrderReturnSteps.length > 0) {
                    $("#dvFadeForProcessing").show();
                    fnPopuplateData(arrOrderReturnSteps, arrOrderReturnSponsorMapping, storeid, flg);
                }
            }
        } catch (err) {
            alert(err)
            $("#dvFadeForProcessing").hide();
        }
    }
}

function fnPopuplateData(arrOrderReturnSteps, arrOrderReturnSponsorMapping, storeid, flg) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../dmswebservice.asmx/fnPopulateOrderReturnSteps",
        //data: '{mailto:' + JSON.stringify($("#txtTo").val()) + ',mailcc:' + JSON.stringify($("#txtCc").val()) + ',mailsub:' + JSON.stringify($("#txtSubject").val()) + ',mailbody:' + JSON.stringify($("#txtBody").val()) + ',attachfile:' + JSON.stringify(($("#filehref").attr("href")).split("/")[2]) + '}',
        data: '{OrderReturnSteps:' + JSON.stringify(arrOrderReturnSteps) + ',OrderReturnSponsorMapping:' + JSON.stringify(arrOrderReturnSponsorMapping) + ',StoreId:' + storeid + ',flg:' + flg + '}',
        dataType: "json",
        success: function (result) {
            //debugger;
            if (flg == 1) {
                fnSuccessOrderReturnSteps(result.d);
            } else {
                fnSuccessOrderReturnStepsPOPUp(result.d, flg);
            }
        },
        error: function (result) {
            fnFailed(result);
            return false;
        }
    });
}
function fnSuccessOrderReturnStepsPOPUp(result, flg) {
    $("#dvFadeForProcessing").hide();
    if (result.split("^")[1] == 1) {
        alert(result.split("^")[0]);
        //if ($("#hdnflgDisplay").val() == "0") {
        var OrderReturnId = document.getElementById("hdnOrderReturnId").value + "^1";
        //var OrderReturnId = "";
        //for (var i = 0; i < checkedBoxes.length; i++) { OrderReturnId = checkedBoxes[i].value }
        $("#dvreturnStepMain").dialog('close');
        $("#dvreturnStepMain").dialog('destroy');
        if (OrderReturnId != "") {
            
            if (document.getElementById("hdnflgReqFrom").value == "0") {
                var OrderReturnIds = document.getElementById("hdnOrderReturnIds").value;
                fnGetOrderReturnActionDetail(OrderReturnIds);
            }
            else {
                fnGetList();
            }
            if (flg == 3) {
                //fnDownload(2);
               fnGeneratePickList(OrderReturnId);
            }
        } else {
            $("#divOrderReturn")[0].innerHTML = "";
        }
    }
    else {
        alert(result.split("^")[0]);
        return false;
    }
}
function fnSuccessOrderReturnSteps(result) {
    $("#dvFadeForProcessing").hide();
    if (result.split("^")[1] == 1) {
        alert(result.split("^")[0]);
        //var checkedBoxes = $("input[name=multiselect_ddlVisitDate]:checked");
        var OrderReturnId = $("#hdnOrderReturnIds").val();

        //for (var i = 0; i < checkedBoxes.length; i++) { OrderReturnId += checkedBoxes[i].value + "|"; }
        if (OrderReturnId != "") {
            //if ($("#tblBasicDetailsInfo input[type=checkbox][flg=1]").length == $("#tblBasicDetailsInfo input[type=checkbox][flg=1]:checked").length) {
            //    window.parent.fnClosedvOrderReturnPop(2);
            //} else {
            fnGetOrderReturnActionDetail(OrderReturnId);
            //}
        } else {
            $("#divOrderReturn")[0].innerHTML = "";
        }
    }
    else {
        alert(result.split("^")[0]);
        return false;
    }

}
function fnFailed(result) {
    $("#dvFadeForProcessing").hide();
    alert(result._message);
}

function fnSuccessOrderReturnStepsPOPUpSendMail(result) {
    // debugger;
    var filename = "";
    if (($("#filehref").attr("href")) != null) {

        filename = ($("#filehref").attr("href")).split("/")[2];
    }
    else {
        filename = "";

    }
    //var attacfile = filename.split("/")[2];


    $("#dvFadeForProcessing").hide();
    if (result.split("^")[1] == 1) {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "frmOrderReturnSteps.aspx/fnSendMailToManufacturer",
            //data: '{mailto:' + JSON.stringify($("#txtTo").val()) + ',mailcc:' + JSON.stringify($("#txtCc").val()) + ',mailsub:' + JSON.stringify($("#txtSubject").val()) + ',mailbody:' + JSON.stringify($("#txtBody").val()) + ',attachfile:' + JSON.stringify(($("#filehref").attr("href")).split("/")[2]) + '}',
            data: '{mailto:' + JSON.stringify($("#txtTo").val()) + ',mailcc:' + JSON.stringify($("#txtCc").val()) + ',mailsub:' + JSON.stringify($("#txtSubject").val()) + ',mailbody:' + JSON.stringify($("#txtBody").val()) + ',attachfile:"' + filename + '"}',
            dataType: "json",
            success: function (data) {
                //debugger;
                alert(result.split("^")[0]);
                //if ($("#hdnflgDisplay").val() == "0") {
                var OrderReturnId = document.getElementById("hdnOrderReturnId").value + "^1";
                if (OrderReturnId != "") {
                    window.parent.document.getElementById("dvFadeForProcessing").style.display = "block";
                    if (document.getElementById("hdnflgReqFrom").value == "0") {
                        fnCloseDialogparent();
                        var OrderReturnIds = document.getElementById("hdnOrderReturnIds").value;
                        window.parent.fnGetOrderReturnActionDetail(OrderReturnIds);
                    }
                    else {
                        window.parent.fnGetList();
                    }

                } else {
                    $("#divOrderReturn")[0].innerHTML = "";
                }
            },
            error: function (result) {
                $("#dvFadeForProcessing").hide();
                alert("Error-" + result.responseJSON.Message);
                return false;
            }
        });
    }
    else {
        alert(result.split("^")[0]);
        return false;
    }
}

function fnclosepopup() {
    var popupblock = (".popupbg, .popupbox");
    $(popupblock).hide();
    $('.popupbg').on("click", function () {
        $(popupblock).hide();
    });
}
 function validateEmail(email) {
           // debugger;
           var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
           return re.test(email);
       }

       function validate(id) {
           // alert('ok');
           // debugger;
           // $("#txtTo").text("");
           var email = $("#" + id).val();
           if (validateEmail(email)) {
               return true;
           }
           return false;
       }
function Show_popup(PrdId, Qty, RowNo, OrderReturnStepsId, OrderReturnDetailID, OrderReturnActionId, OrderReturnSubActionId, OrderReturnResolutionId, OrderReturnResolutionWhenId, ReplacementString, ReturnAction, Resolution, ResolutionWhen, Reasons) {
    //   debugger;
    var popupblock = (".popupbg, .popupbox");
    $(popupblock).show();
    $('#btnCancel').on("click", function () {
        $(popupblock).hide();
        //$(popupblock).css('background' , 'red');
    });
    // funtion to send mail
    $('#btnSend').on("click", function () {
        // debugger;
        if ($('#txtTo').val() == "") {
            alert("Email address can't be blank !!");
            $('#txtTo').focus();
            return false;
        }
        if (validate("txtTo") == false) {
            alert("Email address is invalid !!");
            $('#txtTo').focus();
            return false;
        }

        if ($('#txtCc').val() != "") {

            if (validate("txtCc") == false) {
                alert("Email address is invalid!!");
                $('#txtCc').focus();
                return false;
            }
        }
        var arrOrderReturnSteps = new Array();
        var storeid = $("#hdnStoreId").val();
        var arr = [{
            OrderReturnStepsId: OrderReturnStepsId, OrderReturnDetailID: OrderReturnDetailID, RowNo: RowNo,
            OrderReturnActionId: OrderReturnActionId,
            Qty: Qty, ReplacementString: ReplacementString, PrdId: PrdId, ReturnAction: ReturnAction, Resolution: Resolution, ResolutionWhen: ResolutionWhen, IsApproved: 0, OrderReturnSubActionId: OrderReturnSubActionId, Reason: Reasons
        }];
        arrOrderReturnSteps.push(arr[0]);

        var arrOrderReturnSponsorMapping = new Array();
        var trInput = $("#divSponsor tr"); var totSponserval = 0;
        for (var b = 1; b < trInput.length; b++) {
            var SponsorId = $(trInput[b]).attr("sponsorid");
            var Percentage = $(trInput[b]).find("input:text").eq(1).val();
            Percentage = Percentage == "" ? 0 : Percentage
            var TotalAmount = $(trInput[b]).find("input:text").eq(0).val();
            TotalAmount = TotalAmount == "" ? 0 : TotalAmount
            totSponserval = totSponserval + parseFloat(TotalAmount);
            var arr = { OrderReturnDetailId: OrderReturnDetailID, SponsorId: SponsorId, Percentage: Percentage, TotalAmount: TotalAmount }
            arrOrderReturnSponsorMapping.push(arr);
        }
        if (parseInt(totSponserval) != parseInt($("#tdNetVal").html().trim())) {
            alert("Borne by value (" + totSponserval + ") can not be less than or greater than Total Value (" + $("#tdNetVal").html().trim() + ")");
            $("#divSponsor").find("input:text").eq(0).focus();
            return false;
        }

        if (arrOrderReturnSteps.length > 0) {
            $("#dvFadeForProcessing").show();
            PageMethods.fnPopulateOrderReturnSteps(arrOrderReturnSteps, arrOrderReturnSponsorMapping, storeid, 2, fnSuccessOrderReturnStepsPOPUpSendMail, fnFailed);
        }
        $(popupblock).hide();
        //$(popupblock).css('background' , 'red');
    });
    $('.popupbg').on("click", function () {
        $(popupblock).hide();
    });
}
function fnSetSponsorActionWise() {
    var totOQuantity = $("#tdtotQty").attr("totQty");
    var rate = $("#tdPrdName").attr("rate");
    $("#divSponsor").find("input:text").val("0");
    var amtMan = 0; var amtTJUK = 0; var amtSelf = 0; var amtStore = 0;
    for (var trcnt = 0; trcnt < document.getElementById("tblMainPOP").rows.length; trcnt++) {
        var totResVal = 0.00;
        OrderReturnDetailID = $("#tblReturnStepsBySingleproduct" + trcnt).attr("OrderReturnDetailID");
        for (var i = 1; i < document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows.length; i++) {
            var OrderReturnActionId = $(document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows[i].cells[1]).find("input[flg=1]:checked").val();
            var qt = document.getElementById("tblReturnStepsBySingleproduct" + trcnt).rows[i].cells[0].children[0].value;
            qt = qt == "" ? 0 : qt;
            if (OrderReturnActionId == 1 || OrderReturnActionId == 2) {
                amtTJUK = amtTJUK + parseInt(qt);
            }
            else if (OrderReturnActionId == 3) {
                amtStore = amtStore + parseInt(qt);
            } else if (OrderReturnActionId == 4) {
                amtMan = amtMan + parseInt(qt);
            }
        }
    }

    if (amtMan != "") {
        var val1 = parseInt(amtMan) * parseFloat(rate);
        val1 = Math.round(parseFloat(val1));
        var amt = $("#tdtotVal").attr("totval");
        amt = Math.round(parseFloat(amt));
        var per = (val1 / amt) * 100;
        per = Math.round(parseFloat(per));
        $("#divSponsor tr[sponsorid=1]").find("input:text").eq(0).val(val1);
        $("#divSponsor tr[sponsorid=1]").find("input:text").eq(1).val(per);
    }
    if (amtSelf != "") {
        var val1 = parseInt(amtSelf) * parseFloat(rate);
        val1 = Math.round(parseFloat(val1));
        var amt = $("#tdtotVal").attr("totval");
        amt = Math.round(parseFloat(amt));
        var per = (val1 / amt) * 100;
        per = Math.round(parseFloat(per));
        $("#divSponsor tr[sponsorid=3]").find("input:text").eq(0).val(val1);
        $("#divSponsor tr[sponsorid=3]").find("input:text").eq(1).val(per);
    }
    if (amtTJUK != "") {
        var val1 = parseInt(amtTJUK) * parseFloat(rate);
        val1 = Math.round(parseFloat(val1));
        var amt = $("#tdtotVal").attr("totval");
        amt = Math.round(parseFloat(amt));
        var per = (val1 / amt) * 100;
        per = Math.round(parseFloat(per));
        $("#divSponsor tr[sponsorid=2]").find("input:text").eq(0).val(val1);
        $("#divSponsor tr[sponsorid=2]").find("input:text").eq(1).val(per);
    }
    if (amtStore != "") {
        var val1 = parseInt(amtStore) * parseFloat(rate);
        val1 = Math.round(parseFloat(val1));
        var amt = $("#tdtotVal").attr("totval");
        amt = Math.round(parseFloat(amt));
        var per = (val1 / amt) * 100;
        per = Math.round(parseFloat(per));
        $("#divSponsor tr[sponsorid=4]").find("input:text").eq(0).val(val1);
        $("#divSponsor tr[sponsorid=4]").find("input:text").eq(1).val(per);
    }
}

function fnCheckQtyValidate(sender) {
    var tblObj = $(sender).closest("table");
    var OrderReturnDetailID = $(sender).closest("table").attr("OrderReturnDetailID");
    var totqty = 0;
    for (var k = 1; k < $(tblObj)[0].rows.length; k++) {
        var qt = $(tblObj)[0].rows[k].cells[0].children[0].value;
        qt = (qt == "" ? 0 : qt);
        totqty += parseInt(qt);
    }
    var ActotQty = parseInt($("#tdtotQty").attr("totQty"));

    var oldQty = $(sender).attr("oldqty");
    if (parseInt(oldQty) != parseInt($(sender).val())) {
        if ($(sender).closest("td").next().find("input[type=radio][flg=1]:checked").length > 0) {
            var ss = confirm("Are you sure want to change the Qty?");
            if (ss) {
                $(sender).closest("td").next().next()[0].innerHTML = "";
                $(sender).closest("td").next().find("input:radio").attr("checked", false);
                $(sender).attr("oldqty", $(sender).val());
                $(sender).closest("td").next().find("input[type=radio][flg=1][flgchecked=1]").attr("flgchecked", "0");
                fnSetSponsorActionWise();
            } else {
                $(sender).val(oldQty);
            }
        }
    }
}
var groupcnt = 1;
function fnAddRowForSinglePrd(sender, flg, stockstatusid) {
    var style = "border-left:1px solid #bbb;border-bottom:1px solid #bbb";
    if (flg == 1) {
        if ($($(sender).closest("tr")[0].cells[1]).find("input[type=radio][flg=1]:checked").length == 0) {
            alert("Kindly Check Action Option First!!!");
            $($(sender).closest("tr")[0].cells[1]).find("input[type=radio][flg=1]").eq(0).focus();
            return false;
        }
        if ($($(sender).closest("tr")[0].cells[1]).find("input[type=radio][flg=1][value=3]:checked").length == 1) {
            if ($($(sender).closest("tr")[0].cells[2]).find("textarea").val().trim() == "") {
                alert("Kindly Give The Reason For Reject Return First!!!")
                $($(sender).closest("tr")[0].cells[2]).find("textarea").focus();
                return false;
            }
        } else {
            if ($($(sender).closest("tr")[0].cells[2]).find("input[type=checkbox]:checked").length == 0) {
                alert("Kindly Check Resolutions Option First!!!");
                $($(sender).closest("tr")[0].cells[2]).find("input[type=checkbox]").eq(0).focus();
                return false;
            }
            if ($($(sender).closest("tr")[0].cells[2]).find("input[type=checkbox][value=1]:checked").length == 1) {
                var $div = $($(sender).closest("tr")[0].cells[2]).find("input[type=checkbox][value=1]:checked").closest("div").next();
                if ($($($div).find("table[flg=ReturnResolution]")[0].rows[1].cells[1]).find("input[type=radio]:checked").length == 0) {
                    alert("Kindly Check Resolutions When Option First!!!");
                    $($($div).find("table[flg=ReturnResolution]")[0].rows[1].cells[1]).find("input[type=radio]").eq(0).focus();
                    return false;
                }
            }

            if ($($(sender).closest("tr")[0].cells[2]).find("input[type=checkbox][value=2]:checked").length == 1) {
                var $div = $($(sender).closest("tr")[0].cells[2]).find("input[type=checkbox][value=2]:checked").closest("div").next();
                if ($($($div).find("table[flg=ReturnResolution]")[0].rows[1].cells[1]).find("input[type=radio]:checked").length == 0) {
                    alert("Kindly Check Resolutions When Option First!!!");
                    $($($div).find("table[flg=ReturnResolution]")[0].rows[1].cells[1]).find("input[type=radio]").eq(0).focus();
                    return false;
                }
            }
            if ($($(sender).closest("tr")[0].cells[2]).find("input[type=checkbox][value=3]:checked").length == 1) {
                var $div = $($(sender).closest("tr")[0].cells[2]).find("input[type=checkbox][value=3]:checked").closest("div").next();
                if ($($($div).find("table[flg=ReturnResolution]")[0].rows[1].cells[1]).find("input[type=radio]:checked").length == 0) {
                    alert("Kindly Check Resolutions When Option First!!!");
                    $($($div).find("table[flg=ReturnResolution]")[0].rows[1].cells[1]).find("input[type=radio]").eq(0).focus();
                    return false;
                }
            }
        }
        var style = "border-left:1px solid #bbb;border-bottom:1px solid #bbb";
        var tblObj = $(sender).closest("table");
        var OrderReturnDetailID = $(sender).closest("table").attr("OrderReturnDetailID");
        var trIndx = $(sender).closest("tr").index();
        var groupname = $($(sender).closest("tr")[0].cells[1]).find("input[type=radio]").eq(0)[0].name;
        groupname = groupname.substr(0, groupname.length - 5);// + "" + trIndx + "lvl1"; //tr"+m+"1lvl1
        var totqty = 0;

        for (var k = 1; k < $(tblObj)[0].rows.length; k++) {
            totqty += parseInt($(tblObj)[0].rows[k].cells[0].children[0].value);
            var acID = $($(tblObj)[0].rows[k].cells[1]).find("input[type=radio]:checked").val();

            //arrAction.push(parseInt(acID));
            // $($(tblObj)[0].rows[k].cells[1]).find("input[type=radio]").attr("name", groupname + "" + k + "lvl1");
        }
        groupcnt++;
        groupname = groupname + "" + groupcnt + "lvl1"
        var qty = parseInt($("#tdtotQty").attr("totQty")) - parseInt(totqty);

        qty = qty < 0 ? 0 : qty;
        if (qty > 0) {
            $(sender).closest("table").find("input[type=radio][flg=1][flgchecked=1]").prop("checked", true);
            $(sender).closest("td").prev().prev().find("input[type=radio][flg=1][value=4]").prop("disabled", true);
            $(sender).closest("td").prev().find("input[type=checkbox][value=5]").prop("disabled", true);
            var strDiv2 = "<td style='" + style + "'><input type='text' style='width:40px' onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' onfocus=\"Focus(this,'0')\" onblur=\"fnCheckQtyValidate(this)\" value='" + qty + "' /></td>";
            strDiv2 += "<td style='" + style + "'>";
            if (arrReturnActionMstr.length > 0) {
                var strAction = "";
                for (k in arrReturnActionMstr[0].Table2) {
                    if (stockstatusid == 1) {
                        if (arrReturnActionMstr[0].Table2[k].OrderReturnActionId > 3) {
                            continue;
                        }
                    } else {
                        if (arrReturnActionMstr[0].Table2[k].OrderReturnActionId > 4) {
                            continue;
                        }
                    }
                    if ($.inArray(parseInt(arrReturnActionMstr[0].Table2[k].OrderReturnActionId), arrAction) == -1) {
                        strDiv2 += "<div><input type='radio' name='" + groupname + "' value='" + arrReturnActionMstr[0].Table2[k].OrderReturnActionId + "' onchange='fnShowAndHidetbl(this,3)'  text='" + arrReturnActionMstr[0].Table2[k].OrderReturnAction + "' flg='1' " + (arrReturnActionMstr[0].Table2[k].OrderReturnActionId == 4 ? "disabled='disabled'" : "") + " />" + arrReturnActionMstr[0].Table2[k].OrderReturnAction + "</div>";
                    }
                    else {
                        strDiv2 += "<div><input type='radio' name='" + groupname + "' value='" + arrReturnActionMstr[0].Table2[k].OrderReturnActionId + "' text='" + arrReturnActionMstr[0].Table2[k].OrderReturnAction + "' disabled='disabled' onchange='fnShowAndHidetbl(this,3)' flg='1' " + (arrReturnActionMstr[0].Table2[k].OrderReturnActionId == 4 ? "disabled='disabled'" : "") + " />" + arrReturnActionMstr[0].Table2[k].OrderReturnAction + "</div>";
                    }
                }
            }
            strDiv2 += "</td>";
            strDiv2 += "<td style='" + style + "'>&nbsp;";
            strDiv2 += "</td>";
            strDiv2 += "<td style='" + style + ";text-align:center'>";
            strDiv2 += "<a href='###' onclick='fnAddRowForSinglePrd(this,1," + stockstatusid + ")' style='color:transparent'><img src='../images/icoAdd.gif'/></a><a href='###' onclick='fnRemoveRowForSinglePrd(this,1)' style='color:transparent'><img src='../images/icoMinus.gif'/></a>";
            strDiv2 += "</td>";
            $(tblObj).append("<tr flg='flgaction'>" + strDiv2 + "</tr>");

            var leng = $(tblObj).find("tr[flg='flgaction']").length;
            $("#tbCostborneby").attr("rowspan", leng);

        }
    }
    else {
        var div1 = "<tr>";
        div1 += "<td style='" + style + "'><input style='width: 96%; text-align: left' type='text' onkeyup='fnGetFPrdList(this)' /></td>";
        div1 += "<td style='" + style + ";text-align:center'><input type='text' style='width:40px' onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' onfocus=\"Focus(this,'0')\" onblur=\"Blur(this,'0')\" value='0' onkeyup='fnCalculteAmount(this,1)' /></td>";
        div1 += "<td rate='' style='" + style + ";text-align:right'>0.00</td>";
        div1 += "<td style='" + style + ";text-align:right'>0.00</td>";
        div1 += "<td style='" + style + ";text-align:center'>0</td>";
        div1 += "<td style='" + style + ";text-align:right'>Pending</td>";
        div1 += "<td style='" + style + "'><a href='###' onclick='fnAddRowForSinglePrd(this,2," + stockstatusid + ")' style='color:transparent' ><img src='../images/icoAdd.gif'/></a><a href='###' onclick='fnRemoveRowForSinglePrd(this,2)' style='color:transparent'><img src='../images/icoMinus.gif'/></a></td>";
        div1 += "</tr>";
        $(sender).closest("table").append(div1);
        var indx = $(sender).closest("table")[0].rows.length - 1;
        $(sender).closest("table")[0].rows[indx].cells[0].children[0].focus();
    }
}
function fnRemoveRowForSinglePrd(sender, flg) {
    if (flg == 1) {
        //arrAction
        if ($(sender).closest("table")[0].rows.length > 2) {
            var id = $(sender).closest("table")[0].id;
            $(sender).closest("tr").remove();

            if ($("#" + id)[0].rows.length == 2) {
                $("#" + id).find("input[type=radio][flg=1][value=4]").prop("disabled", false);
                $("#" + id).find("input[type=checkbox][value=5]").prop("disabled", false);
            }
            var leng = $("#" + id).find("tr[flg='flgaction']").length;
            $("#tbCostborneby").attr("rowspan", leng);
        }
    } else {
        if ($(sender).closest("table")[0].rows.length == 2) {
            $(sender).closest("tr").attr("batchstr");
            $(sender).closest("tr").attr("prdid");
            $(sender).closest("tr").attr("skucode");
            $(sender).closest("tr").attr("uomid");
            $(sender).closest("tr").attr("flgdata");
            $(sender).closest("tr").attr("rate");
            $(sender).closest("tr")[0].cells[0].innerHTML = "<input style='width: 96%; text-align: left' type='text' onkeyup='fnGetFPrdList(this)' />";
            $(sender).closest("tr")[0].cells[1].children[0].value = "";
            $(sender).closest("tr")[0].cells[2].innerHTML = "0.00";
            $(sender).closest("tr")[0].cells[3].innerHTML = "0.00";
            $(sender).closest("tr")[0].cells[4].innerHTML = "0";
        } else {
            $(sender).closest("tr").remove();
        }
    }
    fnCalculateResolutionval();
}

function fnSetWeightRate(sender, flg) {
    if (flg == 1) {
        var Qty = $(sender).val();
        Qty = Qty == "" ? 0 : Qty;
        var TOBEAQty = $(sender).closest("td").prev().html().trim();
        if (parseInt(TOBEAQty) == parseInt(Qty)) {
            $(sender).closest("td").css("background-color", "");
        } else {
            $(sender).closest("td").css("background-color", "#FFCECE");
        }
    }
    var trs = $("#tblMainSkuWise tr[flg=1]");
    //SKUNodeID
    for (var i = 0; i < trs.length; i++) {
        var prdid = $(trs[i]).attr("prdid");
        var totRetqty = $("#txtRet" + prdid).val();

        var inputs = $("#tblInvDetailsInfo" + prdid).find("input[type=text][flg=2]");
        var totInvVal = 0; var totInvQty = 0;
        for (var j = 0; j < inputs.length; j++) {
            var InvDetailID = $(inputs[j]).closest("tr").attr("InvDetailID");
            var InvId = $(inputs[j]).closest("tr").attr("InvID");
            var qt = inputs[j].value;
            qt = qt == "" ? 0 : qt;
            inputs[j].value = qt;
            totInvQty += parseInt(qt);
            var rate = $(inputs[j]).closest("td").next().next().attr("EffectiveRate");
            totInvVal += parseInt(qt) * parseFloat(rate);
        }
        var totWeightRate = totInvVal / totInvQty;
        totWeightRate = isNaN(totWeightRate) ? 0 : totWeightRate

        var UAQTy = $("#txtUA" + prdid).val();
        if (parseInt(UAQTy) == 0) {
            $("#tdWeightRate" + prdid).attr("WeightAvgRate", totWeightRate);
            $("#tdWeightRate" + prdid)[0].innerHTML = parseFloat(totWeightRate).toFixed(2);

            $("#tdWeightRate" + prdid).attr("WeightAvgRate", totWeightRate);
            var netretvalue = parseFloat(totWeightRate) * parseInt(totRetqty);
            $("#tdNetValueRet" + prdid)[0].innerHTML = parseFloat(netretvalue).toFixed(2);
            $("#tdNetValueRet" + prdid).attr("NetValueRet", netretvalue);
        } else {
            $("#tdWeightRate" + prdid).attr("WeightAvgRate", 0);
            $("#tdWeightRate" + prdid)[0].innerHTML = parseFloat(0).toFixed(2);

            $("#tdWeightRate" + prdid).attr("WeightAvgRate", 0);
            var netretvalue = parseFloat(0) * parseInt(totRetqty);
            $("#tdNetValueRet" + prdid)[0].innerHTML = parseFloat(netretvalue).toFixed(2);
            $("#tdNetValueRet" + prdid).attr("NetValueRet", netretvalue);
        }
    }
}
function fnApplyAgainstLastInvoices(sender, prdid) {
    var qty = $("#txtRet" + prdid).val();
    var inputs = $("#tblInvDetailsInfo" + prdid).find("input[type=text][flg=2]");
    $("#tblInvDetailsInfo" + prdid).find("input[type=text][flg=2]").val("0");
    for (var i = 0; i < inputs.length; i++) {
        var iqty = $(inputs[i]).closest("td").prev().html();
        if (parseInt(qty) > 0) {
            if (parseInt(iqty) >= parseInt(qty)) {
                inputs[i].value = qty;
                qty = 0;
            }
            else if (parseInt(iqty) < parseInt(qty)) {
                inputs[i].value = iqty;
                qty = parseInt(qty) - parseInt(iqty);
            }
        }
    }
    $("#txtUA" + prdid).val(qty);

    fnSetWeightRate("", 2);
}