<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/ManageOrder/MasterTelecaller.master" CodeFile="frmOrderPunching_Customer.aspx.cs" Inherits="frmOrderPunching_Customer" EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="../scripts/jquery-3.6.0.js"></script>
    <link href="../StylesTreeView/Css/main.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>

    <style type="text/css">
        a.icon-bnt div {
            float: none !important;
            line-height: normal !important;
            padding: 0 3pt 0 0 !important;
        }

        a.icon-bnt span {
            height: 27px !important;
            width: 25px !important;
            float: left;
            padding: 0 1pt 0 0;
        }

        fieldset {
            border: 1px solid #ddd !important;
            margin: 0;
            xmin-width: 0;
            padding: 10px;
            position: relative;
            border-radius: 4px;
            background-color: #f5f5f5;
            padding-left: 10px !important;
        }

        legend {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 0px;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 5px 5px 5px 10px;
            background-color: #ffffff;
        }

        .table-condensed > tbody > tr > td, .table-condensed > tbody > tr > th, .table-condensed > tfoot > tr > td, .table-condensed > tfoot > tr > th, .table-condensed > thead > tr > td, .table-condensed > thead > tr > th {
            padding: 2px !important;
        }

        div.clsloader {
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            height: 100%;
            z-index: 200;
            background-color: white;
            opacity: 0.8;
        }

        .form-group {
            margin-bottom: 2px !important;
        }

            .form-group > label:nth-child(2) {
                font-weight: normal !important;
            }

        .ui-datepicker select.ui-datepicker-month, .ui-datepicker select.ui-datepicker-year {
            width: 49%;
            color: black !important;
        }

        html {
            border-right: 1px solid #bbbbbb;
        }

        body {
            overflow: hidden !important;
            overflow-y: scroll !important;
        }

        input[type=text]::-ms-clear {
            display: none;
        }

        .ui-autocomplete-loading {
            background: url('../images/preloader_18.gif') no-repeat right center;
        }

        .activeCell {
            background: #a8e1a8;
        }

        tr.trHightlightSBD td {
            background: #92f367 !important;
        }

        a.icon-bnt {
            padding: 2pt 0;
            font-size: 10pt;
            text-align: center;
            cursor: pointer;
            margin: 0 1pt 0 0;
            display: inline-block;
            *display: inline;
            text-decoration: none;
            width: auto;
            color: #fff;
            background: #26A6E7 none;
            border: 0 none;
            border-radius: 1px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

            a.icon-bnt:hover {
                background: #486066 none;
                border: 0 none;
                border-radius: 1px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
            }

            a.icon-bnt span {
                height: 27px;
                width: 32px;
                float: left;
                padding: 0 1pt 0 0;
            }

                a.icon-bnt span.Delete {
                    background: url(../btnImg/Delete_icon.png) center no-repeat;
                }

                a.icon-bnt span.Save {
                    background: url(../btnImg/Save_Icon.png) center no-repeat;
                }

                a.icon-bnt span.NewOrder {
                    background: url(../btnImg/NewOrder_Icon.png) center no-repeat;
                }

                a.icon-bnt span.PostOrder {
                    background: url(../btnImg/PostOrder_Icon.png) center no-repeat;
                }

                a.icon-bnt span.PickList {
                    background: url(../btnImg/Picklist_Icon.png) center no-repeat;
                }

                a.icon-bnt span.Print {
                    background: url(../btnImg/Print_Icon.png) center no-repeat;
                }

                a.icon-bnt span.Route {
                    background: url(../btnImg/Route_Icon.png) center no-repeat;
                }

                a.icon-bnt span.Search {
                    background: url(../btnImg/Search_Icon.png) center no-repeat;
                }

                a.icon-bnt span.Search_Small {
                    background: url(../btnImg/Search_Icon_small.png) center no-repeat;
                }

                a.icon-bnt span.Close {
                    background: url(../btnImg/close_icons.png) center no-repeat;
                }

                a.icon-bnt span.Preview {
                    background: url(../btnImg/PrintPreview_icons.png) center no-repeat;
                }

            a.icon-bnt div {
                float: left;
                line-height: 25px;
                padding: 0 3pt 0 0;
            }
    </style>
    <style type="text/css">
        body {
            width: 100%;
            margin: 0px;
            padding: 0px;
            background: url(Images/bg-body.gif);
            font: normal 11px 'arialnarrow';
            color: #3F3F3F !important;
            max-height: 100%;
        }


        input[type=text] {
            font: normal 8pt 'HelveticaLTStdRoman',Arial, Helvetica, sans-serif;
            border: 1px solid #A0A0A0;
            vertical-align: middle;
            padding: 2px;
        }

        textarea {
            font: normal 11px 'HelveticaLTStdRoman',Arial, Helvetica, sans-serif;
            border: 1px solid #A0A0A0;
        }


        .mcacAnchor span {
            font: normal 11px 'HelveticaLTStdRoman',Arial, Helvetica, sans-serif;
            color: Black;
        }

        select {
            font: normal 8.5pt 'HelveticaLTStdRoman',Arial, Helvetica, sans-serif;
            height: 17px;
        }

        #tblPrdItemsMain select {
            font: normal 8.5pt 'HelveticaLTStdRoman',Arial, Helvetica, sans-serif;
            height: 16px;
            border-style: none;
        }

        a {
            text-decoration: none;
        }

        .button {
            padding: 5px 15px;
            font-size: 11px;
            font-style: italic;
            font-weight: bold;
            color: #fff;
            background: #6C0000;
            border-bottom: 5px solid #FE4225 !important;
            border: none;
            cursor: pointer;
            margin: 10px 6px 0 0;
            display: inline-block;
            *display: inline;
            text-decoration: none;
        }

            .button:hover {
                background: #009726;
                border-bottom: 5px solid #034623 !important;
            }

        .dvMain {
            width: 100%;
            margin-bottom: 5px;
        }

        .dvHead {
            background-color: #A6C0F7;
            vertical-align: middle;
        }

        tr.normal td {
            color: black;
            background-color: white;
        }

        tr.highlighted td {
            color: black;
            background-color: lightgreen;
        }

        .highlightedProduct {
            background-color: #ffff48 !important;
        }

        .highlightedDate {
            background-color: #ff8000;
        }

        .highlightedWeekOffDate {
            background-color: #faadcc;
        }

        .highlightedDelTrueDate {
            background-color: #faff24;
        }

        tr.highlightedRowInChecked td {
        }

        tr.clsGreenBg td {
            background-color: #92f367;
        }

        .WaterMarkedTextBox {
            color: gray;
        }

        .NormalTextBox {
        }

        label {
            margin-bottom: 1px !important;
        }
    </style>
    <script>
        $.widget('custom.mcautocompleteProductlist', $.ui.autocomplete, {
            _create: function () {
                this._super();
                this.widget().menu("option", "items", "> :not(.ui-widget-header)");
            },
            _renderMenu: function (ul, items) {
                var self = this;
                var $thead = "<thead style='display:none;'><tr><td style=\"width:60px;text-align:center\"></td><td style=\"width:320px\" ></td><td style=\"width:150px\"></td><td style=\"width:130px\"></td><td style=\"width:80px\"></td><td style=\"width:80px\"></td></tr></thead>";
                var $table = $('<table id="tblPrdContainer" cellpadding="3" cellspacing="0" style="font-size:7.5pt" >');
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


                    var $tr = $("<tr RLP='" + RLP + "' MRP='" + MRP + "' SBF='" + SBF + "'  categoryid='" + Categoryid + "' SKUNodeID='" + SKUNodeID + "' UPC='" + UPC + "' SKUNodeType='" + SKUNodeType + "' Category='" + Category + "'>");

                    $.each(self.options.columns, function (index, columnMapping) {
                        var cellContent = item[columnMapping.valueField];
                        if (columnMapping.valueField == "id") {
                            $('<td style="border-bottom:1px solid #bbbbbb;width:' + columnMapping.width + '" class="mcacAnchor" align="center" >').html('<input type="checkbox" id="chkprd' + (parseInt(cnt) - 1) + '"  />' + cnt).appendTo($tr);
                        } else if (columnMapping.valueField == "MRP") {
                            $('<td style="border-bottom:1px solid #bbbbbb;width:' + columnMapping.width + '" class="mcacAnchor" onclick="fnFillOrder(this,2,event)" align="right" >').text(parseFloat(cellContent).toFixed(2)).appendTo($tr);
                        }
                        else if (columnMapping.valueField == "RLP") {
                            $('<td style="border-bottom:1px solid #bbbbbb;width:' + columnMapping.width + ';padding-right:8px" class="mcacAnchor" onclick="fnFillOrder(this,2,event)" align="right" >').text(parseFloat(cellContent).toFixed(2)).appendTo($tr);
                        }
                        else {
                            $('<td style="border-bottom:1px solid #bbbbbb;width:' + columnMapping.width + '" class="mcacAnchor" onclick="fnFillOrder(this,2,event)" >').text(cellContent).appendTo($tr);
                        }
                    });
                } else {
                    var $tr = $('<tr>');
                    $('<td colspan="3">').html(item.label).appendTo($tr);
                }

                return $tr.appendTo(table);
            }
        });
    </script>
    <script language="javascript" type="text/javascript">
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
        // var UOMIndx = 5;
        var RateIndx = 5;
        var DiscountIndx = 6;
        var ValueBeforeTaxIndx = 7;
        //var ValueAfterTaxIndx = 9;

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
        $(document).ready(function () {
            $("#dvFadeForProcessing").css("display", "block");
            $("#txtOrderDate").focus();

            fnSetDateTimePicker();




            var OrderId = $("#cphRight_hdnOrderID").val();
            // fnSetGSTCellHideNShow();


            $("#dvFadeForProcessing").css("display", "block");
            // fnDisplayButtons(0, 0);
            var d = new Date('<%=DateTime.Now%>');
            $("#txtOrderDate").val(d.localeFormat("dd-MMM-yyyy"));
            var OrderDate = $("#txtOrderDate").val();
            var SalesNodeId = $("#cphRight_hdnSalesNodeId").val();
            var SalesNodeType = $("#cphRight_hdnSalesNodeType").val();
            var SalesPersonID = 0;

            fnGetStoreDetail();

            $("body").css("overflow-y", "scroll !important");

        });

        function fnGetStoreDetail() {
            var strs = $("#cphRight_hdnNewStoreDetail").val();// = "5^ABC^2^1";//StoreId^StoreName^flgApproved^flgGST

            var StoreID = strs.split("^")[0];
            var TelecallingId = strs.split("^")[3];
            $("#cphRight_hdnSalesNodeType").val(strs.split("^")[2]);
            $("#cphRight_hdnSalesNodeId").val(strs.split("^")[1]);
            $("#cphRight_hdnTelecallingId").val(TelecallingId);


            $("#txtStoreName").attr("storeid", StoreID);
            $("#hdnStoreID").val(StoreID);
            // $("#txtStoreName").closest("td").next().find("img").css("display", "block");
            $("#hdnNodeType").val(0);
            //$("#tdContactNo").html(strs.split("^")[4]);
            //$("#tdReason").html(strs.split("^")[5]);
            //$("#cphRight_ddlDSR").html("<option value='-1'>NA</option>");

            $("#hdnGSTType").val(0);
            $("#dvFadeForProcessing").css("display", "block");
            flgreqcount = 1;
            fnSchemeDetailByStore();
            fnGetLastOrders(StoreID, TelecallingId);

            //fnGetOrderByStore(StoreID);
        }

        function fnFailed(result) {
            flgCheckPmtTems = 0;
            $("#dvFadeForProcessing").css("display", "none");
            alert(result._message);
        }


        function fnSetDeliveryDate(date) {
            date.setDate(date.getDate() + 1);
            var isdlvydata = false;
            var weekoff = '<%=Session["DlvryWeeklyOffDay"]%>';
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

        function fnSchemeDetailByStore() {
            //$("#dvFadeForProcessing").css("display", "block");
            var storeidd = $("#hdnStoreID").val();
            $.ajax({
                url: "frmOrderPunching_Customer.aspx/fnSchemeDetailByStore",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: '{storeid:' + storeidd + ',dt:' + JSON.stringify($("#txtOrderDate").val()) + '}',
                success: function (response) {
                    //debugger;
                    flgreqcount++;
                    if (response.d.split("|")[0] != "2") {
                        var str = response.d;
                        SchemeDetailByStore = $.parseJSON('[' + str + ']');
                    } else {
                       // alert("Error in Store Initiative Loading : " + response.d.split("|")[1]);
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

        function fnGetLastOrders(storeid, TeleCallingId) {
            $.ajax({
                url: "frmOrderPunching_Customer.aspx/fnGetLastOrders",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: '{storeid:' + storeid + ',TeleCallingId:' + TeleCallingId + ',RoleId:' + $("#cphRight_hdnRoleId").val() + '}',
                async: false,
                success: function (response) {
                    flgreqcount++;
                    if (flgreqcount == 3) {
                        $("#dvFadeForProcessing").css("display", "none");
                    }
                    if (response.d == "2") {
                        $("#divSKUFiveOrderlstbasedOnstore").html("");
                        alert("Some Technical Error,Please contact to Technical Team!!");
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

                    alert("Some Technical Error,Please contact to Technical Team!!");
                }
            });
        }
        var arrProductList = []; var arrCatInvList = [];
        function fnShowLastFiveOrders(arrData) {
            var strHML = "";
            var arr = ["PrdNodeId", "PrdNodeType", "PcsInBox", "Category", "CategoryId", "CategoryNetValue", "SBFNetValue", "OrderType", "SBDGroup", "CatNodeID", "SBDGroupId", "flgBaseProduct", "SBDPrdCnt", "UOM", "InvLevelDisc", "Disc Value", "Line Value"];
            var d = new Date('<%=DateTime.Now%>');
            // $("#tdCallStartTIme")[0].innerHTML = "<b>Call Start At : </b>" + (d.localeFormat("hh:mm tt"));

            if (arrData.length > 0) {
                if (arrData[0].Table.length == 0) {
                    $("#anchorbtn2").hide();
                }
                if (arrData[0].Table1.length > 0) {
                    //$("#tdBranchName").html(arrData[0].Table1[0]["Branch"]);
                    //var DSEName = arrData[0].Table1[0]["PersonName"];
                    //$("#tdDSEName").html(DSEName.split("(")[0]);
                    var strname = arrData[0].Table1[0]["StoreName"];
                    strname = strname.length > 50 ? strname.substr(0, 49) + ".." : strname;
                    if (strname.length > 20) {
                        $("#txtStoreName").attr("title", arrData[0].Table1[0]["StoreName"]);
                    }
                    $("#txtStoreName").html(strname);

                    var Channel = arrData[0].Table1[0]["Channel"];
                    //Channel = Channel.length > 15 ? Channel.substr(0, 14) + ".." : Channel;
                    //if (strname.length > 14) {
                    //    $("#tdStoreChannel").attr("title", arrData[0].Table6[0]["Channel"]);
                    //}
                    $("#tdStoreChannel").html(Channel);

                    //var SectorCode = arrData[0].Table6[0]["SectorCode"];
                    //SectorCode = SectorCode.length > 15 ? SectorCode.substr(0, 14) + ".." : SectorCode;
                    //if (strname.length > 15) {
                    //    $("#tdSector").attr("title", arrData[0].Table6[0]["SectorCode"]);
                    //}
                    //$("#tdSector").html(SectorCode);


                    // $("#tdCallType").html(arrData[0].Table6[0]["Call Type"]);

                    //$("#tdReason").html(arrData[0].Table6[0]["Reason"]);
                    //$("#tdScheduledDT").html(arrData[0].Table6[0]["ScheduleDate"]);
                    //var ContactNo = arrData[0].Table6[0]["ContactNo"] + "(" + arrData[0].Table6[0]["ContactPerson"] + ")";
                    //$("#tdContactNo").html(ContactNo);
                }


                //if (arrData[0].Table4.length > 0) {
                //    var str = "<table class='table table-condensed' cellpadding='2' cellspacing='0'>";
                //    for (var i in arrData[0].Table4) {
                //        str += "<tr>";

                //        str += "<td style='padding:2px'><b>" + arrData[0].Table4[i]["PreviousText"] + "</b></td><td  style='padding:2px'>:</td><td  style='padding:2px'>" + arrData[0].Table4[i]["PreviousValue"] + "</td>";

                //        str += "</tr>";
                //    }
                //    str += "</table>";
                //    $("#divPrevContactedData")[0].innerHTML = str;
                //}



                if (arrData[0].Table.length > 0) {
                    var flgwidhtValid = false; var cntdates = 0; var cntKeys = 0;
                    var cntrowspan = 2; var cntcol = 0; var pastHistory = 0;
                    var style = "border-left: 1px solid #6f6f6f; border-bottom: 1px solid #6f6f6f;";
                    /*
                    strHML += ("<thead>");//<table cellpadding='2' cellspacing='0' style='font-family:arial narrow;font-size:9px;border-right: 1px solid #A0A0A0; border-top: 1px solid #A0A0A0;text-align:center;width:100%'>

                    strHML += ("<tr bgcolor='#26a6e7'>");
                    $.each(arrData[0].Table[0], function (key, value) {
                        if ($.inArray(key, arr) == -1) {
                            var scol = key;
                            var salign = "text-align:center;"
                            if (key == "Category" || key == "Product Name") {
                                salign = "text-align:center;"
                            }
                            var swidth = "";
                            if (key == "Order Qty") {
                                swidth = ";width:5%";
                            }
                            else if (key == "UOM") {
                                swidth = ";width:5%";
                            }
                            else if (key == "Suggested Qty") {
                                swidth = ";width:5%";
                                scol = "Sugtd Qty";
                            }
                            else if (key == "Disc Value") {
                                swidth = ";width:18%";
                                scol += "<br/>(&#8377;)";
                            }
                            else if (key == "Rate" || key == "MRP") {
                                swidth = ";width:15%";
                                scol += "<br/>(&#8377;)";
                            }
                            else if (key == "Line Value") {
                                flgwidhtValid = true;
                                swidth = ";width:20%";
                                scol += "<br/>(&#8377;)";
                            }

                            if (flgwidhtValid == true && key != "Line Value") {
                                pastHistory = 1;
                                if (cntcol == 0) {
                                    cntcol = 1;
                                    cntrowspan = 0;
                                    //strHML += "<th colspan='5' style='" + style + ";color:#ffffff;text-align:center;position:relative;background-color:#005329;'>Past Order History</th>";
                                    //strHML += ("</tr><tr>");
                                }
                                // swidth = ";width:5%;background-color:#00ca65";
                                // scol = key.indexOf("NA") > -1 ? "NA" : key;
                            }


                            if (cntKeys <= 5) {

                                strHML += "<th rowspan='" + cntrowspan + "' style='" + style + ";color:#ffffff;" + salign + swidth + ";position:relative'>" + scol + "</th>";
                            }
                            cntKeys++;
                        }
                    });
                    strHML += ("</tr></thead>");
                    */
                    strHML += ("<tbody>");
                    var cntTotSKUs = 0;
                    var cntTotNetVal = 0;
                    var cnt = 1;
                    var oldVal = "";
                    var oldSBDGroup = "";
                    var Table = arrData[0].Table;
                    var TotSBD = 0;
                    var TotSBDOrdered = 0;
                    var cntTotDiscVal = 0;
                    var arrSBDGrp = [];
                    for (var i in Table) {
                        cnt++;
                        cntTotNetVal += parseFloat(Table[i]["Line Value"]);
                        cntTotDiscVal += parseFloat(Table[i]["Disc Value"]);


                        var photoname = Table[i]["photoname"];
                        var PrdNodeId = Table[i]["PrdNodeId"];
                        var standardratebeforetax = Table[i]["Rate"];
                        var MRP = parseFloat(Table[i]["MRP"]);
                        var UPC = parseInt(Table[i]["UPC"]);
                        var Qty = Table[i]["Order Qty"];
                        if (Qty > 0) {
                            cntTotSKUs++;
                        }
                        var SuggestedQty = Table[i]["Suggested Qty"];
                        var SBFName = Table[i]["Product Name"];
                        var LineValue = Table[i]["Line Value"];
                        var DiscValue = Table[i]["Disc Value"] == undefined ? 0 : Table[i]["Disc Value"];
                        var MRPValue = parseFloat(parseInt(Qty) * MRP);
                        var OrderValue = parseFloat(parseInt(Qty) * standardratebeforetax);
                        var BrandMargin = MRPValue - OrderValue;
                        var BrandMarginPer = parseFloat(BrandMargin) * 100 / MRPValue;
                        if (oldVal != Table[i]["CatNodeID"]) {
                            strHML += ("<tr flgdata='2' flgsbd='0' categoryid='" + Table[i]["CatNodeID"] + "' category='" + Table[i]["Category"] + "'>");
                            strHML += ("<td  colspan='2' style='" + style + ";background-color:#814141;font-weight:bold;color:#ffffff;padding:3px 5px;'>");
                            strHML += Table[i]["Category"];
                            strHML += ("</td>");
                            strHML += ("</tr>");
                        }
                        oldVal = Table[i]["CatNodeID"];
                        strHML += ("<tr>");
                        strHML += "<td style='padding-top:1px;padding-bottom:1px;border-bottom:2px solid #bbb;width:80px'><img src='../SBFIcon/" + photoname + "' style='width:100%;height:70px' /></td>";
                        strHML += "<td style='vertical-align:top;padding-bottom:1px;border-bottom:1px solid #bbb'>";
                        strHML += "<table id='tblList_" + PrdNodeId + "' style='margin:1px 1px 0px 1px;font-size:8pt' class='table table-bordered table-condensed'>";
                        strHML += "<tr>";
                        strHML += "<td colspan='3' style='text-align:left;padding:1px !important' class='bg-primary text-white'><b>" + SBFName + "</b></td>";
                        strHML += "</tr>";
                        strHML += "<tr class='bg-info text-white'>";
                        strHML += "<td  colspan='3' style='text-align:center;padding:1px !important;vertical-align:top'>";
                        strHML += "<table style='width:100%'>"
                        strHML += "<tr>";
                        strHML += "<td  style='line-height:normal !important;text-align:center;padding:1px !important'><b>MRP:</b></td>";
                        strHML += "<td style='line-height:normal !important;text-align:center;padding:1px !important'>&#8377; " + parseFloat(MRP).toFixed(2) + "</td>";
                        strHML += "<td style='line-height:normal !important;text-align:center;padding:1px !important'><b>RATE:</b></td>";
                        strHML += "<td style='line-height:normal !important;text-align:center;padding:1px !important'>&#8377; " + parseFloat(standardratebeforetax).toFixed(2) + "</td>";
                        strHML += "<td style='line-height:normal !important;text-align:center;padding:1px !important'><b>MGN%:</b></td>";
                        strHML += "<td style='line-height:normal !important;text-align:center;padding:1px !important' id='marginper_" + PrdNodeId + "'>" + Math.round(BrandMarginPer) + "%</td>";
                        strHML += "</tr>";
                        strHML += "</table>";
                        strHML += "</td>";
                        strHML += "</tr>";
                        strHML += "<tr>";
                        
                        
                        
                        strHML += "</tr>";

                        strHML += "<tr class='clsGreenBg text-white'>";
                        strHML += "<td style='line-height:normal !important;text-align:center;font-size:8.3pt;width:80px;padding:1px !important'><b>Order Qty</b></td>";
                        strHML += "<td style='line-height:normal !important;text-align:center;font-size:8.3pt;padding:1px !important'><b>Disc Value</b></td>";
                        strHML += "<td style='line-height:normal !important;text-align:center;font-size:8.3pt;padding:1px !important'><b>Line Value</b></td>";
                        strHML += "</tr>";
                        strHML += "<tr  flgdata='1'  oqty='" + Qty + "'  categoryid='" + Table[i]["CatNodeID"] + "' category='" + Table[i]["Category"] + "' skunodeid=" + Table[i]["PrdNodeId"] + " standardratebeforetax='" + standardratebeforetax + "'   mrp='" + MRP + "'>";
                        strHML += "<td style='line-height:normal !important;text-align:center;padding:1px !important'><input type='number' value='" + Qty + "' style='text-align:center;font-size:9pt;width:100%;height:18px' onchange='fnCalculateData(this)' ></td>";
                        strHML += "<td style='line-height:normal !important;text-align:center;font-size:8.2pt;vertical-align:middle;padding:1px !important' iden='disc'>&#8377; " + parseFloat(DiscValue).toFixed(2) + "</td>";
                        strHML += "<td style='line-height:normal !important;text-align:center;font-size:8.2pt;vertical-align:middle;padding:1px !important' iden='netval'>&#8377; " + parseFloat(LineValue).toFixed(2) + "</td>";
                        strHML += "</tr>";

                        strHML += "</table>";
                        strHML += "</td>";
                        strHML += "</tr>";
                        /*
                        var cntKeys = 0;
                        $.each(Table[i], function (key, value) {
                            if ($.inArray(key, arr) == -1) {
                                if (cntKeys <= 5) {

                                    var Searchable = 0;
                                    var salign = ";text-align:center;"
                                    if (key == "Product Name") {
                                        Searchable = 1;
                                        salign = ";text-align:left;padding-left:3px;background-color:" + tdbgcolor;
                                    }
                                    else if (key == "UOM") {
                                        Searchable = 1;
                                        salign = ";text-align:left;padding-left:3px;"
                                    }
                                    else if (key == "MRP" || key == "Rate" || key == "Line Value" || key == "Disc Value") {
                                        salign = ";text-align:right;padding-right:2px;"
                                    }
                                    if (key == "Product Name") {
                                        strHML += ("<td flgconsider='1'  style='" + style + salign + ";vertical-align:top' Searchable='1'><div>" + (value == null ? "" : value) + "</div><div><img src='../SBFIcon/SBF_" + Table[i]["PrdNodeId"] + ".jpg' style='width:145px;height:145px' /></div></td>");
                                    }
                                    else if (key == "Order Qty") {

                                        strHML += ("<td flgconsider='1'  style='" + style + salign + "'><input type='number' flgSBDChild='" + flgSBDChild + "' style='width: 92%;height:99.5%;text-align:right;padding-right:4px; border: 1px solid #bbbbbb;background-color:#ffffff;z-index: 150' sgtval='" + arrData[0].Table[i]["Suggested Qty"] + "' value='" + value + "' onfocus=\"Focus(this,'0')\"  onkeydown='return noCTRL(event)' onblur=\"Blur(this,'0')\" onchange=\"fnCalculateData(this)\" autocomplete=\"off\" /></td>");
                                    } else if (key == "UOM") {
                                        strHML += ("<td flgconsider='1'  style='" + style + salign + "' >" + (value == null ? "" : value) + "</td>");
                                    }
                                    else if (key == "MRP" || key == "Rate") {

                                        strHML += ("<td flgconsider='1' style='" + style + salign + "'>" + parseFloat(value).toFixed(2) + "</td>");
                                    }
                                    else if (key == "Disc Value") {

                                        strHML += ("<td flgconsider='1' style='" + style + salign + "'  InvLevelDisc='" + arrData[0].Table[i]["InvLevelDisc"] + "'  DiscountAmount='" + value + "' iden='disc'>" + parseFloat(value).toFixed(2) + "</td>");
                                    }
                                    else if (key == "UPC") {
                                        strHML += ("<td flgconsider='1' style='" + style + salign + ";'>" + value + "</td>");
                                    }
                                    else if (key == "Suggested Qty") {
                                        strHML += ("<td flgconsider='1' style='" + style + salign + ";padding-right:2px' flgsgt='1' sgtvalue='" + value + "' ><table style='width:100%' cellspacing='0' cellpadding='0'><tr prdid=" + arrData[0].Table[i]["PrdNodeId"] + "><td style='text-align:right'>" + value + "</td><td style='text-align:right;width:10px' sgtval='" + value + "'><span class='glyphicon glyphicon-arrow-right' style='margin-left:2px;cursor:pointer' onclick='fnMoveQty(this,0)' title='click to move into Order Qty' ></span></td></tr></table></td>");
                                    }
                                    else if (key == "Line Value") {
                                        flgwidhtValid = true;
                                        strHML += ("<td flgconsider='1' style='" + style + salign + "' valaftertax='" + value + "'  iden='netval'>" + parseFloat(value).toFixed(2) + "</td>");
                                    }

                                    else {
                                        if (flgwidhtValid == true && key != "Line Value") {
                                            // strHML += ("<td flgconsider='1' style='" + style + salign + ";font-size:10px;font-family:Arial Narrow;padding-right:8px;text-align:right' >" + (value == null ? "" : value) + "</td>");
                                        } else {
                                            strHML += ("<td flgconsider='1' style='" + style + salign + "' Searchable=" + Searchable + ">" + (value == null ? "" : value) + "</td>");
                                        }

                                    }
                                }
                                cntKeys++;
                            }
                        });
                        */
                        strHML += ("</tr>");

                    }
                    strHML += ("</tbody>");

                    //if (parseFloat(cntTotNetVal) > 0) {
                    //    $("#anchorbtn2").css("background-color", "#00b72e;");
                    //    $("#anchorbtn2").find("div").html("Review Order")
                    //    $("#anchorbtn2").find("div").css("width", "80px");
                    //    $("#anchorbtn2").find("span").removeClass("Save").addClass("PostOrder");
                    //} else {
                    //    $("#anchorbtn2").find("span").removeClass("PostOrder").addClass("Save");
                    //    $("#anchorbtn2").css("background-color", "#ff9d3c;");
                    //    $("#anchorbtn2").find("div").html("Close Call")
                    //    $("#anchorbtn2").find("div").css("width", "57px");
                    //}
                    //var stylefooter = "";
                    //var strFooter = "<tr>";
                    //strFooter += "<td class='clssku'></td>";
                    //strFooter += "<td class='clssku'></td>";
                    //strFooter += "<td class='clssku'></td>";
                    //strFooter += "<td class='clssku'></td>";
                    //strFooter += "<td id='tdTotSKUs' style='text-align:right;font-size:7.5pt;padding-right:8px'>0</td>";
                    //strFooter += "<td class='clsnet'>Total:</td>";
                    //strFooter += "<td id='tdTotDisValue' style='text-align:right;padding-right:2px;'></td>";
                    //strFooter += "<td id='tdTotNetLineValue' style='text-align:right;padding-right:2px;'>0.00</td>";

                    // strFooter += "</tr>";
                    $("#tblPrdItemsMain")[0].innerHTML = strHML;

                    //$("#divSBDOrderedData")[0].innerHTML = TotSBDOrdered + " OF " + TotSBD;
                    // fnHighlightSBD(1);

                    fnSetFocustOnText();
                    // $("#divSBDOrderedData")[0].innerHTML = arrSBDGrp.length + " OF " + TotSBD;
                    $("#tblPrdItemsMain").css({ "border-right": "1px solid #bbbbbb" });

                    //var thead = $("#tblPrdItemsMain").find("thead").eq(0).html();
                    //$("#divfixedHeader").html("<table id='tbl_Status_fixedhead' style='font-size:8pt' cellpadding='0' cellspacing='0'><thead>" + thead + "</thead><tbody></tbody></table>");
                    //$("#divFixedFooter").html("<table id='tbl_Status_fixedfooter' cellspacing='0'>" + strFooter + "</table>");
                    $("#tdTotSKUs")[0].innerHTML = cntTotSKUs
                    //$("#tdTotDisValue").data("TotDisValue", cntTotDiscVal);
                    //$("#tdTotDisValue")[0].innerHTML = parseFloat(cntTotDiscVal).toFixed(2);


                    $("#tdTotNetLineValue").data("netvalue", cntTotNetVal);
                    $("#tdTotNetLineValue")[0].innerHTML = "&#8377; " + parseFloat(cntTotNetVal).toFixed(2);

                } else {
                    $("#tblPrdItemsMain")[0].innerHTML = "<tr><td style='font-size:30px;padding:130px'>No Product List found against this store</td></tr>";
                }

                //Create Scheme Benefit Array
                /*
                var strSchemeBenefitDetail = arrData[0].Table8.length > 0 ? arrData[0].Table8[0].strSchemeBenefit : "";
                if (arrData[0].Table8.length > 0) {
                    var TotalProductLevelDiscount = arrData[0].Table8[0].TotLineLevelDisc;
                    var TotOrderVal = arrData[0].Table8[0].TotOrderVal;
                    var TotInvMRP = arrData[0].Table8[0].TotMRPValue;
                    $("#tdInvMRP").data("InvMRP", TotInvMRP);
                    $("#tdInvMRP")[0].innerHTML = parseFloat(TotInvMRP).toFixed(2);

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
                }
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
                            var ProductName = "";// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").text();
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
                */
                //GenTimePullDown($("#ddlschedulecall")[0]);
            }
        }

        function fnShowCatDetail(sender) {
            var CatgoryId = $(sender).closest("tr").attr("categoryid");
            var Table = arrCatInvList;// jQuery.grep(arrCatInvList, function (element, index) {
            //    return (element.CatgoryId == CatgoryId);
            //});
            var arr = ["PrdNodeId", "PrdNodeType", "CategoryId", "flgTeleOrderInv", "UOM"];
            var strHML = "";
            var style = "border-left: 1px solid #A0A0A0; border-bottom: 1px solid #A0A0A0;";
            strHML += ("<table class='table table-bordered table-condensed' cellpadding='2' cellspacing='0'>");
            strHML += ("<thead><tr class='success'>");
            strHML += ("<th>#</th>");
            $.each(Table[0], function (key, value) {
                if ($.inArray(key, arr) == -1) {
                    strHML += ("<th>" + key + "</th>");
                }
            });
            strHML += ("<tr></thead><tbody>");
            for (var i in Table) {
                strHML += ("<tr>");
                strHML += ("<td>" + (parseInt(i) + 1) + "</th>");
                $.each(Table[i], function (key, value) {
                    if ($.inArray(key, arr) == -1) {
                        strHML += ("<td>" + value + "</td>");
                    }
                });
                strHML += ("</tr>");
            }
            strHML += "</tbody></table>";
            $("#divOrderlstbasedOnstore")[0].innerHTML = "<div class='table-responsive'>" + strHML + "</div>";

            $("#divOrderlstbasedOnstore").dialog({
                modal: true,
                title: "Invoices History : " + $(sender).html(),
                width: "auto",
                height: "auto",
                buttons: {
                    "OK": function () {
                        $("#divOrderlstbasedOnstore").dialog('close');
                    }
                }
            });
        }
        function fnHighlightSBD(flg) {
            if (flg == 1) {
                var $tr = $("#tblPrdItemsMain tbody tr[flgbaseproduct=1][flgsbd=1]");
                $("#tblPrdItemsMain tbody tr[flgbaseproduct=1][flgsbd=1]").removeClass("trHightlightSBD");
                var arrSBDGrp = [];
                for (var i = 0; i < $tr.length; i++) {
                    var sbdgrpid = $tr.eq(i).attr("sbdgroupid");
                    if ($tr.eq(i).find("input").eq(0).val() > 0) {
                        $tr.eq(i).addClass("trHightlightSBD");
                        if ($.inArray(sbdgrpid, arrSBDGrp) == -1) {
                            arrSBDGrp.push(sbdgrpid);
                        }
                        continue;
                    } else {
                        var $trChild = $("#tblPrdItemsMain tbody tr[flgbaseproduct=0][flgsbd=1][sbdgroupid='" + sbdgrpid + "']");
                        for (var j = 0; j < $trChild.length; j++) {
                            if ($trChild.eq(j).find("input").eq(0).val() > 0) {
                                $tr.eq(i).addClass("trHightlightSBD");
                                if ($.inArray(sbdgrpid, arrSBDGrp) == -1) {
                                    arrSBDGrp.push(sbdgrpid);
                                }
                                break;
                            }
                        }
                    }
                }

                $("#divSBDOrderedData")[0].innerHTML = arrSBDGrp.length + " OF " + $tr.length;
            }
        }

        function fnColapse(ctrl) {
            var sbdgroupid = $(ctrl).closest("tr").attr("sbdgroupid");
            var categoryid = $(ctrl).closest("tr").attr("categoryid");

            if ($(ctrl)[0].src.indexOf("icoAdd") > -1) {
                $(ctrl)[0].src = "../Images/icoMinus.gif";
                $("#tblPrdItemsMain tbody").find("tr[flgbaseproduct=0][flgdata=1][flgsbd=1][sbdgroupid='" + sbdgroupid + "'][categoryid='" + categoryid + "']").css("display", "table-row");
            } else {
                $(ctrl)[0].src = "../Images/icoAdd.gif";
                $("#tblPrdItemsMain tbody").find("tr[flgbaseproduct=0][flgdata=1][flgsbd=1][sbdgroupid='" + sbdgroupid + "'][categoryid='" + categoryid + "']").css("display", "none");
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

            //strHML += ("<td style='" + style + ";text-align:left;padding-left:6px;'>&#8377; " + parseFloat(value).toFixed(2) + "</td>");

            if ($("#tblPrdContainer input[type=checkbox]:checked").length > 0) {
                var $checked = $("#tblPrdContainer input[type=checkbox]:checked");
                for (var c = 0; c < $checked.length; c++) {
                    cntrl = $($checked[c]).closest("tr");
                    var Category = $(cntrl).attr("category");
                    var CategoryId = $(cntrl).attr("categoryid");

                    var strHML1 = fnAddNewProductsHTML(cntrl);

                    if ($("#tblPrdItemsMain tbody").find("tr[flgdata=2][categoryid='" + CategoryId + "'][flgsbd=0]").length == 0) {
                        var strHML = ("<tr flgdata='2' category='" + Category + "' categoryid='" + CategoryId + "' flgsbd='0' sbdgroupid='0'>");
                        strHML += ("<td  colspan='6' style='background-color:#814141;font-weight:bold;color:#ffffff;padding:3px 5px;'>");
                        strHML += Category;
                        strHML += ("</td>");
                        strHML += ("</tr>");
                        var len = $("#tblPrdItemsMain tbody").find("[flgdata=1]").length - 1;
                        $("#tblPrdItemsMain tbody").find("[flgdata=1]").eq(len).after(strHML);
                        $("#tblPrdItemsMain tbody").find("tr[flgdata=2][categoryid='" + CategoryId + "']").after(strHML1);
                    } else {
                        var trs = $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + CategoryId + "']");
                        var len1 = trs.length - 1;
                        len1 = len1 < 0 ? 0 : len1;
                        $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + CategoryId + "']").eq(len1).after(strHML1);
                        var trs = $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + CategoryId + "']");
                        //$("#tblPrdItemsMain tbody").find("tr[flgdata=1][category='" + Category + "']").eq(trs.length - 1).find("input[type=text]").eq(0).focus();
                    }

                }
            } else {
                if ($("#tblPrdContainer input[type=checkbox]").length > 0 && cntrl.length > 0) {
                    var Category = $(cntrl).attr("category");
                    var CategoryId = $(cntrl).attr("categoryid");

                    var strHML1 = fnAddNewProductsHTML(cntrl);
                    if ($("#tblPrdItemsMain tbody").find("tr[flgdata=2][categoryid='" + CategoryId + "']").length == 0) {
                        var strHML = ("<tr flgdata='2' category='" + Category + "' categoryid='" + CategoryId + "'>");
                        strHML += ("<td  colspan='6' style='background-color:#c1c1c1;font-weight:bold;color:black;padding-left:3px;'>");
                        strHML += Category;
                        strHML += ("</td>");
                        strHML += ("</tr>");
                        var len = $("#tblPrdItemsMain tbody").find("[flgdata=1]").length - 1;
                        $("#tblPrdItemsMain tbody").find("[flgdata=1]").eq(len).after(strHML);
                        $("#tblPrdItemsMain tbody").find("tr[flgdata=2][categoryid='" + CategoryId + "']").after(strHML1);
                    } else {
                        var trs = $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + CategoryId + "']");
                        var len1 = trs.length - 1;
                        len1 = len1 < 0 ? 0 : len1;
                        $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + CategoryId + "']").eq(len1).after(strHML1);
                        var trs = $("#tblPrdItemsMain tbody").find("tr[flgdata=1][categoryid='" + CategoryId + "']");
                        //$("#tblPrdItemsMain tbody").find("tr[flgdata=1][category='" + Category + "']").eq(trs.length - 1).find("input[type=text]").eq(0).focus();
                    }
                }

            }
            fnSetFocustOnText();
            fnHideDv();
            $("#dvPrdContainer")[0].innerHTML = "";
            e.preventDefault();
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
            var strHML = ("<tr flgdata='1' oqty='0' flgbaseproduct='0' category='" + Category + "' categoryid='" + CategoryId + "' flgsbd='0' sbdgroupid='0' skunodeid=" + SKUNodeID + " standardratebeforetax='" + rlp + "' bgcolor='#ffffc4'>");
            strHML += ("<td flgconsider='1'  style='" + style + ";text-align:left;padding-left:2px;' Searchable='1'>" + SBF + "</td>");
            strHML += ("<td flgconsider='1'  style='" + style + ";text-align:right;padding-right:2px;'>" + parseFloat(mrp).toFixed(2) + "</td>");
            strHML += ("<td flgconsider='1'  style='" + style + ";text-align:center;'>" + UPC + "</td>");
            strHML += ("<td flgconsider='1'  style='" + style + ";padding-right:2px' flgsgt='1' sgtvalue='0' ><table style='width:100%' cellspacing='0' cellpadding='0'><tr prdid=" + SKUNodeID + "><td style='text-align:center'>0</td><td style='text-align:right;' sgtval='0'></td></tr></table></td>");//<span class='glyphicon glyphicon-arrow-right' style='margin-left:2px;cursor:pointer' onclick='fnMoveQty(this)' title='click to move into Order Qty' ></span>
            strHML += ("<td flgconsider='1'  style='" + style + ";text-align:center;'><input type='number' style='width: 92%;height:99.5%;text-align:right;padding-right:4px; border: 1px solid #bbbbbb;background-color:#ffffff;z-index: 150' value='0' onfocus=\"Focus(this,'0')\" sgtval='0' onkeydown='return noCTRL(event)' onblur=\"Blur(this,'0')\" onchange=\"fnCalculateData(this)\" /></td>");
            //strHML += ("<td flgconsider='1'  style='" + style + ";text-align:left;padding-left:6px;'>PCS</td>");
            strHML += ("<td flgconsider='1'  style='" + style + ";text-align:right;padding-right:2px;'>" + parseFloat(rlp).toFixed(2) + "</td>");
            strHML += ("<td flgconsider='1'  style='" + style + ";text-align:right;padding-right:2px;' DiscountAmount='0.00' iden='disc'>0.00</td>");
            strHML += ("<td flgconsider='1'  style='" + style + ";text-align:right;padding-right:2px;' valbeforetax='0.00' iden='netval'>0.00</td>");
            //strHML += ("<td flgconsider='1'  style='" + style + ";text-align:right;padding-right:6px;'></td>");
            //strHML += ("<td flgconsider='1'  style='" + style + ";text-align:right;padding-right:6px;'></td>");
            //strHML += ("<td flgconsider='1'  style='" + style + ";text-align:right;padding-right:6px;'></td>");
            //strHML += ("<td flgconsider='1'  style='" + style + ";text-align:right;padding-right:6px;'></td>");
            //strHML += ("<td flgconsider='1'  style='" + style + ";text-align:right;padding-right:6px;'></td>");
            strHML += "</tr>";
            return strHML;
        }


        var cache = {};
        function fnGetPrdList(sender) {

            var contextMenuPopup = document.getElementById("dvContextFinishedPrd");
            //debugger;
            $('tr.highlighted').removeClass("highlighted");
            //$("#divPrdInfo").html("");
            var text = "";

            $("#txtFindPrdCode").val($(sender).val());
            $("#txtFindPrdCode").focus();

            $("#dvContextFinishedPrd").dialog({
                height: "500",
                width: "100%",
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
                    $("#txtFindPrdCode").focus();
                }

            });
            $("div[aria-describedby=dvContextFinishedPrd]").find(".ui-dialog-titlebar").hide();
            $("#dvContextFinishedPrd").css("height", "400px");
            $("div[aria-describedby=dvContextFinishedPrd]").css("overflow", "hidden");
            $("body").css("overflow", "hidden");

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
                columns: [
                    {
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
                    var dd = $.grep(arrProductList, function (item) {
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
        }


        function GenTimePullDown(selector) {
            $(selector).html("");
            var dt1 = new Date('<%=DateTime.Now%>');
            var dt = new Date('<%=DateTime.Now%>');
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
                width: "auto",
                height: "auto",
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
                            }

                            $(this).dialog("close");
                            var strs = $("#cphRight_hdnNewStoreDetail").val();// = "5^ABC^2^1";//StoreId^StoreName^flgApproved^flgGST

                            var StoreID = strs.split("^")[0];
                            var TeleCallID = strs.split("^")[3];
                            var flgProductive = 0;
                            $("#dvFadeForProcessing").css("display", "block");
                            PageMethods.fnspPopulateOrderDetail(OrderMaster, OrderDetail, flgProductive, TeleCallID, ReasonId, ScheduleCall, $("#cphRight_hdnSalesNodeId").val(), $("#cphRight_hdnSalesNodeType").val(), $("#cphRight_hdnLoginId").val(), function (result) {
                                $("#dvFadeForProcessing").css("display", "none");
                                if (result.split("^")[1] == 4) {

                                    alert(result.split("^")[0]);
                                    window.location.href = "../frmLogin.aspx";
                                }
                                else if (result.split("^")[1] == 2) {
                                    alert(result.split("^")[0]);
                                } else {

                                    //alert(result.split("^")[0]);
                                    window.location.href = "frmRouteList_PDA.aspx";

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
            var ddd = new Date();
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
                            var curDate = new Date('<%=DateTime.Now%>');
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

            var OrderQuantity = $(Sender).closest("tr").find("input[type=number]").eq(0).val();
            var schSlabID = 0;
            var schID = 0;
            var Per = 0;
            var UOM = 0;
            var flgQuoteApplied = 0;

            var trPrdItemsMain = $("#tblPrdItemsMain tr[flgdata=1]").filter("[SKUNodeID=" + ProductID + "]");
            if (trPrdItemsMain.length > 0) {
                for (var i = 0; i < trPrdItemsMain.length; i++) {
                    StandardRate = 0;
                    StandardRateBeforeTax = $(trPrdItemsMain).eq(i).attr("standardratebeforetax");
                    ActualTax = 0;
                    trPrdItemsMain.eq(i).find("input[type=number]").eq(0).val(OrderQuantity);

                    DiscountAmount = 0;

                    //trPrdItemsMain.eq(i).find("td[iden='netval']").attr("discountamount", DiscountAmount);
                    //trPrdItemsMain[i].cells[DiscountIndx].innerHTML = parseFloat(DiscountAmount).toFixed(2);
                    //$(trPrdItemsMain[i].cells[DiscountIndx]).attr("discountamount", DiscountAmount);

                    ValBeforeTax = ((parseFloat(StandardRateBeforeTax) * parseInt(OrderQuantity)) - parseFloat(DiscountAmount));

                    trPrdItemsMain.eq(i).find("td[iden='netval']")[0].innerHTML = parseFloat(ValBeforeTax).toFixed(2);
                    trPrdItemsMain.eq(i).find("td[iden='netval']").attr("valbeforetax", ValBeforeTax);
                    trPrdItemsMain.eq(i).find("td[iden='netval']").attr("valaftertax", ValBeforeTax);
                }
            }
            //  fnHighlightSBD(1);
            //Now the its Time to Show the OverAll Summary Code Starts Here

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
                    } else if (benSubBucketType == 8) {
                        distval = parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
                        invdiscountamount += parseFloat(distval);
                        //ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(distval);
                    }
                    else if (benSubBucketType == 9) {
                        distval = parseFloat(benifitSubBucketValue);
                        invdiscountamount += parseFloat(distval);
                        //ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(distval);
                    }
                    else {
                        if (flgAddOnBenefit > 0) {
                            distval = parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
                        } else {
                            distval = parseFloat(OriValBeforeTax) * parseFloat(benifitSubBucketValue) / 100;
                        }

                        ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(distval);
                        DiscountAmount += parseFloat(distval);
                    }
                }

                // DiscountAmount = parseFloat(DiscountAmount);
                trPrdItemsMain.eq(i).find("td[iden='disc']")[0].innerHTML = parseFloat(DiscountAmount).toFixed(2);
                $(trPrdItemsMain[i].cells[DiscountIndx]).attr("discountamount", DiscountAmount);
                $(trPrdItemsMain[i].cells[DiscountIndx]).attr("invdiscountamount", invdiscountamount);

                // var ValBeforeTax = parseFloat(ValBeforeTax) - parseFloat(DiscountAmount);
                trPrdItemsMain[i].cells[ValueBeforeTaxIndx].innerHTML = parseFloat(ValBeforeTax).toFixed(2);
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

        function fnShowBenefitSchemeWise(skunodeid, flg) {
            try {
                $("#divSchemeAppliedSectionAchievement").html("");
                $("#divSchemeAppliedSectionAchievement").css("height", "40px");
                $("#dvtabcontainer").css("margin-top", "80px");
                var schInfo = "<table cellpadding=\"2\" cellspacing=\"0\" class=\"table\" style=\"border-right: 1px solid #A0A0A0; border-top: 1px solid #A0A0A0;font-size:8pt;\" >";
                var style = "padding:1px 2px;border-left: 1px solid #A0A0A0; border-bottom: 1px solid #A0A0A0;";
                schInfo += "<thead><tr class='bg-info'><th style='" + style + "'>Slab</th><th style='" + style + "'>Slab Required</th><th style='" + style + "'>GAP</th><th style='" + style + "'>Benefit</th></tr></thead><tbody>";
                var schDescr = "";
                var sheight = 0;
                var schemeName = fnShowSchemesName(skunodeid);
                var IsSchemeAvailble = 0;
                for (var s = 0; s < schemeName.split("|").length; s++) {
                    if (schemeName.split("|")[s] != "") {
                        schId = schemeName.split("|")[s].split("^")[0];
                        var schmeName = schemeName.split("|")[s].split("^")[1];
                        var flgSchemeExistAgainStore = jQuery.grep(arrSchemeSlabachievement, function (element, index) {
                            return (element.SchemeId == schId);
                        });

                        if (flgSchemeExistAgainStore.length == 0) {
                            var schemeData = SchemeDetailByStore[0].Table8;
                            var SchIdsCompleteSchemeIdListOnProductID = jQuery.grep(schemeData, function (element, index) {
                                return (element.ProductID == skunodeid);
                            });

                            if (SchIdsCompleteSchemeIdListOnProductID.length > 0) {
                                var strSchIdsCompleteSchemeIdListOnProductID = SchIdsCompleteSchemeIdListOnProductID.length > 0 ? SchIdsCompleteSchemeIdListOnProductID[0].PrdString : "";
                                fnCheckNewSchemeIDsAppliedAfterValueChange(strSchIdsCompleteSchemeIdListOnProductID, skunodeid, "", 0);
                                flgSchemeExistAgainStore = jQuery.grep(arrSchemeSlabachievement, function (element, index) {
                                    return (element.SchemeId == schId);
                                });
                            }
                        }
                        if (flgSchemeExistAgainStore.length > 0) {
                            var strname = schmeName.length > 50 ? schmeName.substr(0, 49) + ".." : schmeName;
                            IsSchemeAvailble = 1;
                            var cnt = 1;
                            schInfo += "<tr>";
                            schInfo += "<td style='" + style + ";text-align:left' colspan='4'><a href='###' onclick=\"fnShowSchemeBenefit('" + schId + "','','0','0')\" style='border-style:none;color:blue;text-decoration:underline' title='" + schmeName + "'>" + strname + "</a></td>";
                            schInfo += "</tr>";
                            sheight += 18;
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
                                sheight += 18;
                                if (SlabTypePer > 60 && SlabTypePer < 100) {
                                    clsbg = "class='clsOrangeBg'";
                                } else if (SlabTypePer >= 100) {
                                    clsbg = "class='clsGreenBg'";
                                    SlabTypeRequiredDesc = "achieved";
                                    var arrBenefit = $.grep(arrStoreProductAppliedSchemesBenifitsRecords, function (element, index) {
                                        return parseInt(element.schemeSlabId) == parseInt(SlabId);
                                    });
                                    if (arrBenefit.length > 0) {
                                        var BenType = arrBenefit[0].benSubBucketType;
                                        var benifitSubBucketValue = arrBenefit[0].benifitAssignedVal;
                                        if (parseInt(BenType) == 2 || parseInt(BenType) == 6 || parseInt(BenType) == 8) {
                                            strBenefit = benifitSubBucketValue + "%";
                                        }
                                        else {
                                            strBenefit = "&#8377; " + parseFloat(benifitSubBucketValue).toFixed(2);
                                        }
                                    }
                                }
                                schInfo += "<tr " + clsbg + " flg='1' style='cursor:pointer' onclick=\"fnShowSlabAchievementDetail(this,'" + schId + "','" + SlabId + "')\">";
                                schInfo += "<td style='" + style + "'>Slab" + cnt + "</td>";
                                schInfo += "<td style='" + style + "'>" + SlabDesc + "</td>";
                                schInfo += "<td style='" + style + "'>" + SlabTypeRequiredDesc + "</td>";
                                schInfo += "<td style='" + style + "'>" + strBenefit + "</td>";
                                schInfo += "</tr>";
                                cnt++;
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
                sheight = sheight == 0 ? 40 : sheight;
                $("#divSchemeAppliedSectionAchievement").css("height", sheight + "px");
                $("#dvtabcontainer").css("margin-top", (parseInt(sheight)+60) +"px");

            } catch (err) {

            }
        }
        function fnShowSlabAchievementDetail(sender, schmeId, SlbId) {
            $("#dvSchemeDescr")[0].innerHTML = "<br/><img src='../NewImages/ajax-loader.gif' /><div id='divTempcontainer' style='display:none'></div>";
            $("#dvSchemeDescr").dialog({
                title: "Initiative Achievement Details",
                modal: true,
                width: "100%",
                height: "auto",
                open: function () {
                    setTimeout(function () {
                        var strHTML = "<table style='margin:5px 5px 0px 5px;font-size:8.8pt' class='table table-bordered table-condensed' cellpadding='2' cellspacing='0'>";
                        var style = "";
                        var flgSchemeSlabDescrAgainStore = jQuery.grep(SchemeDetailByStore[0].Table1, function (element, index) {
                            return (parseInt(element.SchemeID) == parseInt(schmeId));
                        });
                        strHTML += ("<tbody>");
                        var SchemeCode = flgSchemeSlabDescrAgainStore[0].schemecode;
                        var SchemeName = flgSchemeSlabDescrAgainStore[0].SchemeName;
                        var Description = flgSchemeSlabDescrAgainStore[0].SchemeDescr;
                        strHTML += "<tr><td style='font-weight:bold;text-align:left;padding:2px;width:20%'>Initiative Code</td><td style='font-weight:bold'>:</td><td style='text-align:left'>" + SchemeCode + "</td></tr>";
                        strHTML += "<tr><td style='font-weight:bold;text-align:left;padding:2px;'>Initiative Name</td><td style='font-weight:bold'>:</td><td style='text-align:left'>" + SchemeName + "</td></tr>";
                        strHTML += "<tr><td style='font-weight:bold;text-align:left;padding:2px;'>Description</td><td style='font-weight:bold'>:</td><td style='text-align:left'>" + Description + "</td></tr>";
                        var style1 = "text-align:center;padding:1px 2px;border-left: 1px solid #A0A0A0; border-bottom: 1px solid #A0A0A0;";
                        strHTML += "<tr><td style='padding:0px' colspan='3'><table style='width:100%;text-align:center;font-size:8.6pt;' id='tblAchievementChild'><thead><tr class='bg-info'><th style='" + style1 + "'>Slab</th><th style='" + style1 + "'>Slab Required</th><th style='" + style1 + "'>GAP</th><th style='" + style1 + "'>Benefit</th></tr></thead><tbody>" + $(sender)[0].outerHTML + "</tbody></table></td></tr>";
                        strHTML += "</tbody></table>";

                        strHTML += "<table id='tblSchemeCalculationSKUs1' style='font-size:8pt;margin:0px 5px 0px 5px' class='table table-bordered table-condensed' cellpadding='2' cellspacing='0'>";
                        strHTML += ("<thead><tr class='success'>");
                        //strHTML += ("<th style='padding:2px'>Group</th>");
                        //strHTML += ("<th style='padding:2px'>Slab Type</th>");
                        //strHTML += ("<th style='padding:2px'>Slab Value</th>");
                        strHTML += ("<th style='padding:2px;width:45%'>Product Name</th>");
                        strHTML += ("<th style='text-align:center;padding:2px;width:15%'>Qty</th>");
                        strHTML += ("<th style='text-align:right;padding:2px;width:15%'>Rate</th>");
                        strHTML += ("<th style='text-align:right;padding:2px;width:25%'>Sales Value</th>");
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
                                    var style1 = "background-color:#c68e8e;color:#fff";
                                    if ($("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductID + "]").length > 0) {
                                        CatId = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductID + "]").eq(0).attr("categoryid");
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
                                        var strHTMLSKU = "<tr style='" + style + "' flgdata='1' skunodeid='" + ProductID + "' sbf='" + SKUName + "' UPC='" + UPC + "' categoryid='" + CatId + "' Category='" + Category + "'  MRP='" + MRP + "'  standardratebeforetax='" + standardratebeforetax + "'  rlp='" + standardratebeforetax + "'>";
                                        if (IsLink == 1) {
                                            strHTMLSKU += "<td style='text-align:left;padding:2px 3px;width:45%'><a href='###' style='color:blue;text-decoration:underline' onclick='fnInsertSKUInMainScreen(this)' >" + SKUName.trim() + "</a></td>";
                                        } else {
                                            strHTMLSKU += "<td style='text-align:left;padding:2px 3px;width:45%;background-color:#d3d3d3;' title='This SKU is not the part of scheme'>" + SKUName.trim() + "</td>";
                                        }
                                        strHTMLSKU += "<td style='text-align:center;padding:2px;width:15%'>" + Qty + "</td>";
                                        strHTMLSKU += "<td style='text-align:right;padding:2px 3px;width:15%'>" + parseFloat(standardratebeforetax).toFixed(2) + "</td>";
                                        strHTMLSKU += "<td style='text-align:right;padding:2px 3px;width:25%'>" + parseFloat(salevalue).toFixed(2) + "</td>";
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
                                    strHTMLSKUTotal += "<td style='text-align:right;padding:2px;width:25%'>" + parseFloat(totSaleValue).toFixed(2) + "</td>";
                                    strHTMLSKUTotal += "</tr></table>";
                                    $("#tbl" + schSlbSubBuckID).before(strHTMLSKUTotal);
                                } else {
                                    $("#tbl" + schSlbSubBuckID).append("<tr><td colspan='4'> No Producct Found</td></tr>");
                                }
                            } else {
                                $("#tbl" + schSlbSubBuckID).append("<tr><td colspan='4'> No Producct Found</td></tr>");
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
                width: "100%",
                height: "auto",
                close: function (e) {
                    $("#dvSchemeDescr").html("");
                    $("#dvSchemeDescr").dialog('destroy');
                },
                open: function () {
                    //var strHTML = "<table id='tblSchemeCalculationSKUs1' style='font-size:8pt;margin:0px 5px 0px 5px' class='table table-bordered table-condensed' cellpadding='2' cellspacing='0'>";
                    //strHTML += ("<thead><tr class='success'>");
                    //strHTML += ("<th style='padding:2px;'>Product Name</th>");
                    //strHTML += ("<th style='text-align:center;padding:2px;width:15%'>Qty</th>");
                    //strHTML += ("<th style='text-align:right;padding:2px;width:15%'>Rate</th>");
                    //strHTML += ("<th style='text-align:right;padding:2px;width:20%'>Disc Val</th>");
                    //strHTML += ("<th style='text-align:right;padding:2px;width:25%'>Sales Value</th>");
                    //strHTML += ("<tr></thead>");
                    //strHTML += "<tbody>";
                    //var trPrdItemsMain = $("#tblPrdItemsMain tr[flgdata=1][oqty!=0]");
                    //for (var i = 0; i < trPrdItemsMain.length; i++) {
                    //    var CatId = trPrdItemsMain.eq(i).attr("categoryid");
                    //    var Category = trPrdItemsMain.eq(i).attr("category");
                    //    var SKUName = trPrdItemsMain.eq(i).find("td").eq(0).text();
                    //    var standardratebeforetax = trPrdItemsMain[i].cells[RateIndx].innerHTML;
                    //    var salevalue = trPrdItemsMain[i].cells[ValueBeforeTaxIndx].innerHTML;
                    //    var DiscText = trPrdItemsMain[i].cells[DiscountIndx].innerHTML;
                    //    var DiscVal = parseFloat(trPrdItemsMain.eq(i).find("td[iden='disc']").is("[discountamount]") ? trPrdItemsMain.eq(i).find("td[iden='disc']").attr("discountamount") : 0);
                    //    if (parseFloat(DiscVal) > 0) {
                    //        Qty = trPrdItemsMain[i].cells[OrderQntyIndx].children[0].value;
                    //        Qty = Qty == "" ? 0 : Qty;
                    //        var style = trPrdItemsMain.eq(i).is("[style]") ? trPrdItemsMain.eq(i).attr("style") : "";
                    //        strHTML += "<tr style='" + style + "'>";
                    //        strHTML += "<td style='text-align:left;padding:2px 3px;'>" + SKUName.trim() + "</td>";
                    //        strHTML += "<td style='text-align:center;padding:2px;'>" + Qty + "</td>";
                    //        strHTML += "<td style='text-align:right;padding:2px 3px;'>" + standardratebeforetax + "</td>";
                    //        strHTML += "<td style='text-align:right;padding:2px 3px;'>" + DiscText + "</td>";
                    //        strHTML += "<td style='text-align:right;padding:2px 3px;'>" + salevalue + "</td>";
                    //        strHTML += "</tr>";
                    //    }
                    //}
                    //strHTML += "</tbody>";
                    //strHTML += "<tfoot>";
                    //strHTML += "<tr>";
                    //strHTML += "<td style='text-align:left;padding:2px 3px;'></td>";
                    //strHTML += "<td style='text-align:right;padding:2px 3px;' colspan='2'>Total Line Discount:</td>";
                    //strHTML += "<td style='text-align:right;padding:2px 3px;'>" + TotDiscountValue + "</td>";
                    //strHTML += "<td style='text-align:right;padding:2px 3px;'></td>";
                    //strHTML += "</tr>";
                    //strHTML += "</tfoot>";
                    //strHTML += "</table>";
                    $("#dvSchemeDescr")[0].innerHTML = "No Initiative Applied";
                }
            });
        }

        function fnShowStoreInitiative() {
            $("#dvSchemeDescr")[0].innerHTML = "<br/><img src='../NewImages/ajax-loader.gif' />";
            $("#dvSchemeDescr").dialog({
                title: "Store Initiative List",
                modal: true,
                width: "100%",
                height: "auto",
                close: function (e) {
                    $("#dvSchemeDescr").html("");
                    $("#dvSchemeDescr").dialog('destroy');
                },
                open: function () {
                    var strHTML = "<table id='tblSchemeCalculationSKUs1' style='font-size:8pt;margin:0px 5px 0px 5px' class='table table-bordered table-condensed' cellpadding='2' cellspacing='0'>";
                    strHTML += ("<thead><tr class='success'>");
                    strHTML += ("<th style='width:13%'>Initiative Code</th>");
                    strHTML += ("<th style='text-align:left;'>Initiative Name</th>");
                    strHTML += ("<th style='text-align:left;'>Initiative Descr</th>");
                    strHTML += ("<tr></thead>");
                    strHTML += "<tbody>";
                    var StoreId = $("#hdnStoreID").val();
                    if (SchemeDetailByStore.length > 0) {
                        var arrStoreInitiativeLists = jQuery.grep(SchemeDetailByStore[0].Table, function (element, index) {
                            return (parseInt(element.StoreID) == parseInt(StoreId));
                        });
                        for (var i in arrStoreInitiativeLists) {
                            var SchemeID = arrStoreInitiativeLists[i]["SchemeID"];
                            var flgSchemeSlabDescrAgainStore = jQuery.grep(SchemeDetailByStore[0].Table1, function (element, index) {
                                return (parseInt(element.SchemeID) == parseInt(SchemeID));
                            });
                            strHTML += ("<tbody>");
                            var SchemeCode = flgSchemeSlabDescrAgainStore[0].schemecode;
                            var SchemeName = flgSchemeSlabDescrAgainStore[0].SchemeName;
                            var Description = flgSchemeSlabDescrAgainStore[0].SchemeDescr;
                            strHTML += "<tr>";
                            strHTML += "<td style='text-align:left;'>" + SchemeCode + "</td>";
                            strHTML += "<td style='text-align:left;'>" + SchemeName + "</td>";
                            strHTML += "<td style='text-align:left;'>" + Description + "</td>";
                            strHTML += "</tr>";
                        }
                        strHTML += "</tbody></table>";
                        $("#dvSchemeDescr")[0].innerHTML = strHTML;
                    }
                    else {
                        $("#dvSchemeDescr")[0].innerHTML = "No Initiative Applicable";
                    }
                  
                }
            });
        }

        function fnInsertSKUInMainScreen(Sender) {
            $("#dvFadeForProcessing").show();
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
                    if ($("#tblPrdItemsMain tbody").find("tr[flgdata=2][categoryid='" + CategoryId + "'][flgsbd=0]").length == 0) {
                        var strHML = ("<tr flgdata='2' category='" + Category + "' categoryid='" + CategoryId + "' flgsbd='0' sbdgroupid='0'>");
                        strHML += ("<td  colspan='5' style='background-color:#814141;font-weight:bold;color:#ffffff;padding:3px 5px;'>");
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
                    return (element.ProductID == skunodeid);
                });

                var arrSchIdsListOnProductID1 = jQuery.grep(SchemeDetailByStore[0].Table11, function (element, index) {
                    return (element.ProductID == skunodeid);
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

                arrSchIdsListOnProductID = (arrSchIdsListOnProductID.length > 0 ? arrSchIdsListOnProductID[0].PrdString : "") + "#" + (arrSchIdsListOnProductID1.length > 0 ? arrSchIdsListOnProductID1[0].PrdString : "") + "#" + (SchemeDetailByStore[0].Table12.length > 0 ? arrSchIdsListOnProductID3 : "");
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
                            var schemeName = flgSchemeExistAgainStore[0].SchemeName;
                            strHTML += schId + "^" + schemeName + "|";
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
                width: "100%",
                height: "auto",
                open: function () {
                    PageMethods.fnGetSchemeMasterPopupDetail(schmeId, function (result) {
                        if (result.split("|")[0] == "2") {
                            $("#dvSchemeDescr")[0].innerHTML = "Error-" + result.split("|")[1];
                        } else {
                            var strHTML = "<table style='margin:5px 5px 0px 5px;font-size:8.5pt' class='table table-bordered table-condensed' cellpadding='2' cellspacing='0'>";
                            var style = "";
                            var flgSchemeSlabDescrAgainStore = jQuery.grep(SchemeDetailByStore[0].Table1, function (element, index) {
                                return (parseInt(element.SchemeID) == parseInt(schmeId));
                            });
                            strHTML += ("<tbody>");
                            var SchemeCode = flgSchemeSlabDescrAgainStore[0].schemecode;
                            var SchemeName = flgSchemeSlabDescrAgainStore[0].SchemeName;
                            var Description = flgSchemeSlabDescrAgainStore[0].SchemeDescr;
                            strHTML += "<tr><td style='font-weight:bold;text-align:left;padding:2px;width:15%'>Initiative Code</td><td style='font-weight:bold'>:</td><td style='text-align:left'>" + SchemeCode + "</td></tr>";
                            strHTML += "<tr><td style='font-weight:bold;text-align:left;padding:2px;width:15%'>Initiative Name</td><td style='font-weight:bold'>:</td><td style='text-align:left'>" + SchemeName + "</td></tr>";
                            strHTML += "<tr><td style='font-weight:bold;text-align:left;padding:2px;width:15%'>Description</td><td style='font-weight:bold'>:</td><td style='text-align:left'>" + Description + "</td></tr>";
                            strHTML += "</tbody></table>";
                            strHTML += "<table id='tblSchemeCalculationSKUs1' style='font-size:8pt;margin:0px 5px 0px 5px' class='table table-bordered table-condensed' cellpadding='2' cellspacing='0'>";
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
            var arrSBDGrp = [];
            var TotInvMRP = 0;
            var OverallInvSchemeDiscount = 0;
            for (var i = 0; i < trPrdItemsMain.length; i++) {
                var Qty = parseInt(trPrdItemsMain.eq(i).find("input[type=number]").val());
                var skunodeid = parseInt(trPrdItemsMain.eq(i).attr("skunodeid"));
                //if (flg == 1) {
                //    Qty = parseInt(trPrdItemsMain.eq(i).find("input[type=number]").attr("sgtval"));
                //    trPrdItemsMain.eq(i).find("input[type=number]").val(Qty);
                //} else if (flg == 2) {
                //    Qty = 0;
                //    trPrdItemsMain.eq(i).find("input[type=number]").val(Qty);
                //}
                // fnApplyPercentageDiscountOnProduct(skunodeid);
                var standardratebeforetax = parseFloat(trPrdItemsMain.eq(i).attr("standardratebeforetax"));
                var mrp = parseFloat(trPrdItemsMain.eq(i).attr("mrp"));
                if ($.inArray(skunodeid, arrSKUCheck) == -1) {
                    if (Qty > 0) {
                        cntTotSKUs++;
                        //if (trPrdItemsMain.eq(i).attr("flgsbd") == "1") {
                        //    var sbdgrpid = trPrdItemsMain.eq(i).attr("sbdgroupid");
                        //    if ($.inArray(sbdgrpid, arrSBDGrp) == -1) {
                        //        $("#tblPrdItemsMain tbody tr[flgbaseproduct=1][flgsbd=1][sbdgroupid=" + sbdgrpid + "]").removeClass("trHightlightSBD").addClass("trHightlightSBD");
                        //        arrSBDGrp.push(sbdgrpid);
                        //    }
                        //}

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
                    TotalOrderValBeforeTax += parseFloat(ValBeforeTax);

                    var MRPValue = parseFloat(parseInt(Qty) * mrp);
                    var LineBrandMarginValue = parseFloat(MRPValue) - parseFloat(ValBeforeTax);
                    var LineBrandMarginPer = parseFloat(LineBrandMarginValue) * 100 / parseFloat(MRPValue);
                    TotInvMRP += parseFloat(MRPValue);

                    ValBeforeTax = (parseFloat(ValBeforeTax) - parseFloat(DiscountAmount));
                    ValBeforeTax += parseFloat(TotTaxAmount);
                    TotOderValueAfterTax += ValBeforeTax;

                    $("#marginper_" + skunodeid)[0].innerHTML = parseFloat(LineBrandMarginPer).toFixed(2);
                    trPrdItemsMain.eq(i).find("td[iden='netval']")[0].innerHTML = parseFloat(ValBeforeTax).toFixed(2);
                    trPrdItemsMain.eq(i).find("td[iden='netval']").attr("valbeforetax", ValBeforeTax);
                    trPrdItemsMain.eq(i).find("td[iden='netval']").attr("valaftertax", ValBeforeTax);
                }
            }

            //  $("#divSBDOrderedData")[0].innerHTML = arrSBDGrp.length + " OF " + $("#tblPrdItemsMain tbody tr[flgbaseproduct=1][flgsbd=1]").length;

            $("#tdTotSKUs")[0].innerHTML = cntTotSKUs;
            $("#tdTotNetLineValue")[0].innerHTML = parseFloat(TotOderValueAfterTax).toFixed(2);
            $("#tdTotNetLineValue").data("netvalue", TotOderValueAfterTax);
            $("#tdTotNetLineValue").data("OderValueBrforeTax", TotalOrderValBeforeTax);

            // $("#tdTotDisValue")[0].innerHTML = "&#8377; " + parseFloat(TotalProductLevelDiscount).toFixed(2);
            //$("#tdTotDisValue").data("TotDisValue", TotalProductLevelDiscount);



            //$("#tdInvMRP").data("InvMRP", TotInvMRP);
            //$("#tdInvMRP")[0].innerHTML = parseFloat(TotInvMRP).toFixed(2);
            //var BranMargin = parseFloat(TotInvMRP) - parseFloat(TotalOrderValBeforeTax);
            //$("#tdBranMargin")[0].innerHTML = "&#8377; " + parseFloat(BranMargin).toFixed(2);
            //$("#tdBranMargin").next()[0].innerHTML = parseFloat(parseFloat(BranMargin) * 100 / parseFloat(TotInvMRP)).toFixed(0) + "%";
            //$("#tdInvValue")[0].innerHTML = "&#8377; " + parseFloat(TotalOrderValBeforeTax).toFixed(2);
            //$("#tdInvValue").data("InvValue", TotalOrderValBeforeTax);

            //$("#tdLineSchemeDiscount")[0].innerHTML = "&#8377; " + parseFloat(TotalProductLevelDiscount).toFixed(2);
            //$("#tdLineSchemeDiscount").next()[0].innerHTML = parseFloat(parseFloat(TotalProductLevelDiscount) * 100 / parseFloat(TotInvMRP)).toFixed(0) + "%";
            //$("#tdLineSchemeDiscount").data("LineSchemeDiscount", TotalProductLevelDiscount);

            //$("#tdOverallInvSchemeDiscount")[0].innerHTML = "&#8377; " + parseFloat(OverallInvSchemeDiscount).toFixed(2);
            //$("#tdOverallInvSchemeDiscount").next()[0].innerHTML = parseFloat(parseFloat(OverallInvSchemeDiscount) * 100 / parseFloat(TotInvMRP)).toFixed(0) + "%";
            //$("#tdOverallInvSchemeDiscount").data("OverallInvSchemeDiscount", OverallInvSchemeDiscount);

            //var InvSchemeDiscount = parseFloat(TotalProductLevelDiscount + OverallInvSchemeDiscount);
            //$("#tdInvSchemeDiscount").data("InvSchemeDiscount", InvSchemeDiscount);
            //$("#tdInvSchemeDiscount")[0].innerHTML = "&#8377; " + parseFloat(InvSchemeDiscount).toFixed(2);
            //$("#tdInvSchemeDiscount").next()[0].innerHTML = parseFloat(parseFloat(InvSchemeDiscount) * 100 / parseFloat(TotInvMRP)).toFixed(0) + "%";


            //var TotalBranMargin = parseFloat(BranMargin) + parseFloat(TotalProductLevelDiscount) + parseFloat(OverallInvSchemeDiscount);
            //$("#tdTotalBranMargin")[0].innerHTML = "&#8377; " + parseFloat(TotalBranMargin).toFixed(2);
            //$("#tdTotalBranMargin").next()[0].innerHTML = parseFloat(parseFloat(TotalBranMargin) * 100 / parseFloat(TotInvMRP)).toFixed(0) + "%";
            //var NettInvValue = parseFloat(TotInvMRP) - parseFloat(TotalBranMargin);
            //$("#tdNettInvValue")[0].innerHTML = "&#8377; " + parseFloat(NettInvValue).toFixed(2);
            //$("#tdNettInvValue").data("NettInvValue", NettInvValue);



            //if (parseFloat(TotOderValueAfterTax) > 0) {
            //    $("#anchorbtn2").css("background-color", "#00b72e;");
            //    $("#anchorbtn2").find("div").html("Review Order")
            //    $("#anchorbtn2").find("div").css("width", "80px");
            //    $("#anchorbtn2").find("span").removeClass("Save").addClass("PostOrder");
            //} else {
            //    $("#anchorbtn2").find("span").removeClass("PostOrder").addClass("Save");
            //    $("#anchorbtn2").css("background-color", "#ff9d3c;");
            //    $("#anchorbtn2").find("div").html("Close Call")
            //    $("#anchorbtn2").find("div").css("width", "58px");
            //}
        }

        function fnMoveQty(sender, flg) {
            if (flg == 0) {
                var ctrl = "";
                var skuID = $(sender).closest("tr").attr("prdid");
                if ($(sender).hasClass("glyphicon-arrow-right")) {
                    ctrl = $(sender).closest("table").closest("tr").find("input[type=number]")[0];
                    $(sender).closest("table").closest("tr").find("input[type=number]")[0].value = $(sender).closest("td").attr("sgtval");
                    $(sender).removeClass("glyphicon-arrow-right").addClass("glyphicon-arrow-left");
                } else {
                    ctrl = $(sender).closest("table").closest("tr").find("input[type=number]")[0];
                    $(sender).closest("table").closest("tr").find("input[type=number]")[0].value = 0;
                    $(sender).removeClass("glyphicon-arrow-left").addClass("glyphicon-arrow-right");
                }

                fnCalculateData(ctrl);
                //var listfreeProductQty = new Array();
                //orderBookingTotalCalc(ctrl,skuID, 0, listfreeProductQty, "");
                //fnFinalTotol(flg);
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
                var SchIdsCompleteSchemeIdListOnProductID = "";
                if (SchemeDetailByStore.length > 0) {
                     SchIdsCompleteSchemeIdListOnProductID = jQuery.grep(SchemeDetailByStore[0].Table8, function (element, index) {
                        return (element.ProductID == skuID);
                    });
                }
                $(cntrl).closest("tr").find("td[iden='disc']").html("0.00");
                $(cntrl).closest("tr").find("td[iden='netval']").html("0.00");
                $(cntrl).closest("tr").find("td[iden='disc']").attr("discountamount", "0.00");
                $(cntrl).closest("tr").find("td[iden='disc']").attr("invdiscountamount", "0.00");
                $(cntrl).closest("tr").find("td[iden='netval']").attr("valbeforetax", "0.00");
                $(cntrl).closest("tr").find("td[iden='netval']").attr("valaftertax", "0.00");
                if (SchIdsCompleteSchemeIdListOnProductID.length > 0) {
                    var strSchIdsCompleteSchemeIdListOnProductID = SchIdsCompleteSchemeIdListOnProductID.length > 0 ? SchIdsCompleteSchemeIdListOnProductID[0].PrdString : "";
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
                        return ((element.storeID == storeID && element.ProductID == prdID && element.schemeSlabId == schId) == false);
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

            fnCheckNewSchemeIDsAppliedAfterValueChange(SchIdsCompleteSchemeIdListOnPrdID, prdID, tblCurrentTR, 0);
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

        var arrSchemeSlabachievement = [];
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
                                            TotalVolumeQtyValueInSlab = val;
                                            var prodRate = parseFloat($(trPrdctOdrQty).attr("standardratebeforetax"));
                                            var flgQuoteApplied = 0;// $(trPrdctOdrQty).is("[flgQuoteApplied]") ? 1 : 0;
                                            var oderRateOfCurrentMapedProduct = 0;
                                            var flgPriceChange = 0;// $(trPrdctOdrQty).data("flgbatchpricechange") == undefined ? 0 : $(trPrdctOdrQty).data("flgbatchpricechange");

                                            var oderRateOfCurrentMapedProduct = prodRate * oderQtyOnProd;

                                            TotalValueInSlab = parseFloat(TotalValueInSlab) + parseFloat(oderRateOfCurrentMapedProduct);
                                        }
                                        totalOderQtyProductsAgainstRowId = totalOderQtyProductsAgainstRowId + oderQtyOnProd;
                                        if (totalOderQtyProductsAgainstRowId >= parseInt(schSlabSubBucketValue)) {
                                            schSlbBuckCnt++;
                                            var freeQtyofProducts = 0;
                                            var valofFQty = (parseFloat(("" + totalOderQtyProductsAgainstRowId).trim()) / parseFloat(("" + schSlabSubBucketValue).trim()));
                                            var valForFreeQTYToMultiply = Math.abs(valofFQty);
                                            chkBuckConditons = true;
                                            if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                                arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSubBucketValTypeGreaterThanOne + "^" + prdID + "^" + valForFreeQTYToMultiply + "^" + schSlbSubRowID + "^" + SchTypeId + "^" + totalOderQtyProductsAgainstRowId + "^0"]);
                                            }
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
                                            TotalVolumeQtyValueInSlab = parseFloat(totalOderProductsRatesAgainstRowId);
                                        }

                                        if (parseFloat(totalOderProductsRatesAgainstRowId) >= parseFloat(schSlabSubBucketValue)) {
                                            schSlbBuckCnt++;
                                            chkBuckConditons = true;
                                            if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                                arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSubBucketValTypeGreaterThanOne + "^" + prdID + "^" + 0 + "^" + schSlbSubRowID + "^" + SchTypeId + "^" + totalOderProductsRatesAgainstRowId + "^0"]);
                                            }
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
                                            TotalValueInSlab = parseFloat(TotalValueInSlab) + parseFloat((prodRate * oderQtyOnProd));
                                        }

                                        schSlabSubBucketValue = schSlabSubBucketValue * 1000;
                                        if (totalOderVolumeProductsAgainstRowId >= schSlabSubBucketValue) {
                                            schSlbBuckCnt++;
                                            chkBuckConditons = true;
                                            var valofVolumeQty = (parseFloat(("" + totalOderVolumeProductsAgainstRowId).trim()) / parseFloat(("" + schSlabSubBucketValue).trim()));
                                            var valForVolumetQTYToMultiply = Math.abs(valofVolumeQty);
                                            if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                                arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSubBucketValTypeGreaterThanOne + "^" + prdID + "^" + valForVolumetQTYToMultiply + "^" + schSlbSubRowID + "^" + SchTypeId + "^" + totalOderVolumeProductsAgainstRowId + "^0"]);
                                            }
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
                                        var totalOderQtyProductsAgainstRowId = 0;
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

                                            SlabTypeDesc += SlabTypeDesc != "" ? " and Buy " + schSlabSubBucketValue + " Pc" : "Buy " + schSlabSubBucketValue + " Pc";
                                            var Requiredbalance = parseInt(schSlabSubBucketValue) - parseInt(totalOderQtyProductsAgainstRowId);
                                            Requiredbalance = Requiredbalance < 0 ? 0 : Requiredbalance;
                                            SlabTypePer += parseInt(schSlabSubBucketValue) <= parseInt(totalOderQtyProductsAgainstRowId) ? 100 : parseInt(parseInt(totalOderQtyProductsAgainstRowId) * 100 / parseInt(schSlabSubBucketValue));
                                            SlabTypeRequiredDesc += SlabTypeRequiredDesc != "" ? " and Buy " + Requiredbalance + " Pc" : "Buy " + Requiredbalance + " Pc";
                                            if (totalOderQtyProductsAgainstRowId >= parseInt(schSlabSubBucketValue)) {
                                                schSlbBuckCnt++;
                                                var freeQtyofProducts = 0;
                                                chkBuckConditons = true;
                                                var valofFQty = (parseFloat(("" + oderQtyOnProd).trim()) / parseFloat(("" + schSlabSubBucketValue).trim()));
                                                var valForFreeQTYToMultiply = Math.abs(valofFQty);
                                                if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                                    TotalVolumeQtyValueInSlab += parseFloat(totalOderQtyProductsAgainstRowId);
                                                    arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSubBucketValTypeGreaterThanOne + "^" + prdID + "^" + valForFreeQTYToMultiply + "^" + schSlbSubRowID + "^" + SchTypeId + "^" + oderQtyOnProd + "^0"]);
                                                }
                                            }
                                            //else {
                                            //    chkBuckConditons = false;
                                            //    break;
                                            //}
                                        }
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
                                                        TotalValueInSlab = parseFloat(TotalValueInSlab) + parseFloat((prodRate * oderQtyOnProd));
                                                        totalOderProductsRatesAgainstRowId = totalOderProductsRatesAgainstRowId + oderRateOfCurrentMapedProduct;
                                                    }
                                                }
                                                if (cntTotPrd == arrProductIDMappedInSchSlbSubBukRowId.length) {
                                                    break;
                                                }
                                            }

                                            SlabTypeDesc += SlabTypeDesc != "" ? " and Buy " + schSlabSubBucketValue + " Rs" : "Buy " + schSlabSubBucketValue + " Rs";
                                            var Requiredbalance = parseFloat(schSlabSubBucketValue) - parseFloat(totalOderProductsRatesAgainstRowId);
                                            Requiredbalance = Requiredbalance < 0 ? 0 : Requiredbalance;
                                            SlabTypePer += parseFloat(schSlabSubBucketValue) <= parseFloat(totalOderProductsRatesAgainstRowId) ? 100 : parseInt(parseFloat(totalOderProductsRatesAgainstRowId) * 100 / parseFloat(schSlabSubBucketValue));
                                            SlabTypeRequiredDesc += SlabTypeRequiredDesc != "" ? " and Buy " + parseFloat(Requiredbalance).toFixed(0) + " Rs" : "Buy " + parseFloat(Requiredbalance).toFixed(0) + " Rs";
                                            if (parseFloat(totalOderProductsRatesAgainstRowId) >= parseFloat(schSlabSubBucketValue)) {
                                                schSlbBuckCnt++;
                                                chkBuckConditons = true;
                                                if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                                    TotalVolumeQtyValueInSlab += parseFloat(totalOderProductsRatesAgainstRowId);
                                                    arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSubBucketValTypeGreaterThanOne + "^" + prdID + "^" + 0 + "^" + schSlbSubRowID + "^" + SchTypeId + "^" + oderRateOfCurrentMapedProduct + "^0"]);
                                                }
                                            }
                                            //else {
                                            //    chkBuckConditons = false;
                                            //    break;
                                            //}

                                        }
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
                                                if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                                    TotalVolumeQtyValueInSlab += parseInt(cntprd);
                                                    arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSlabSubBucketType + "^" + prdID + "^" + 0 + "^" + schSlbSubRowID + "^" + SchTypeId + "^0^1"]);
                                                }
                                            }
                                            //else {
                                            //    chkBuckConditons = false;
                                            //    break;
                                            //}
                                        }
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
                                                        TotalValueInSlab = parseFloat(TotalValueInSlab) + parseFloat((prodRate * oderQtyOnProd));
                                                        totalOderProductsRatesAgainstRowId = totalOderProductsRatesAgainstRowId + oderRateOfCurrentMapedProduct;
                                                    }
                                                }
                                                if (cntTotPrd == arrProductIDMappedInSchSlbSubBukRowId.length) {
                                                    break;
                                                }
                                            }

                                            SlabTypeDesc += SlabTypeDesc != "" ? " and Buy " + schSlabSubBucketValue + " Rs" : "Buy " + schSlabSubBucketValue + " Rs";
                                            var Requiredbalance = parseFloat(schSlabSubBucketValue) - parseFloat(totalOderProductsRatesAgainstRowId);
                                            Requiredbalance = Requiredbalance < 0 ? 0 : Requiredbalance;
                                            SlabTypePer += parseFloat(schSlabSubBucketValue) <= parseFloat(totalOderProductsRatesAgainstRowId) ? 100 : parseInt(parseFloat(totalOderProductsRatesAgainstRowId) * 100 / parseFloat(schSlabSubBucketValue));
                                            SlabTypeRequiredDesc += SlabTypeRequiredDesc != "" ? " and Buy " + parseFloat(Requiredbalance).toFixed(0) + " Rs" : "Buy " + parseFloat(Requiredbalance).toFixed(0) + " Rs";
                                            if (parseFloat(totalOderProductsRatesAgainstRowId) >= parseFloat(schSlabSubBucketValue)) {
                                                schSlbBuckCnt++;
                                                chkBuckConditons = true;
                                                if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                                    TotalVolumeQtyValueInSlab += parseFloat(totalOderProductsRatesAgainstRowId);
                                                    arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSubBucketValTypeGreaterThanOne + "^" + prdID + "^" + 0 + "^" + schSlbSubRowID + "^" + SchTypeId + "^" + oderRateOfCurrentMapedProduct + "^0"]);
                                                }
                                            }
                                            //else {
                                            //    chkBuckConditons = false;
                                            //    break;
                                            //}

                                        }
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
                                                if (arrMaintainDetailsOfBucketConditionsAgainstBuckId.length == 0) {
                                                    TotalVolumeQtyValueInSlab += parseFloat(totalOderVolumeProductsAgainstRowId);
                                                    var valofVolumeQty = (parseFloat(("" + oderVolumeOfCurrentMapedProduct).trim()) / parseFloat(("" + schSlabSubBucketValue).trim()));
                                                    var valForVolumetQTYToMultiply = Math.abs(valofVolumeQty);
                                                    arrMaintainDetailsOfBucketConditionsAgainstBuckId.push([schId + "^" + schSlabId + "^" + schSlbBuckId + "^" + schSlabSubBucketValue + "^" + schSubBucketValType + "^" + schSubBucketValTypeGreaterThanOne + "^" + prdID + "^" + valForVolumetQTYToMultiply + "^" + schSlbSubRowID + "^" + SchTypeId + "^" + oderVolumeOfCurrentMapedProduct + "^0"]);
                                                }
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
                            arrSchemeSlabachievement.push({ SlabId: schSlabId, SchemeId: schId, SlabTypeDesc: SlabTypeDesc, SlabTypeRequiredDesc: SlabTypeRequiredDesc, SlabTypePer: SlabTypePer });
                            //mk

                            if (schSlbBuckCnt == (arrSubBucketDetails.length)) {
                                if (chkBuckConditons == true)//This checks if All Sub Bucket Conditions of Bucket is true
                                {
                                    for (var cntNoOfTrueConditions = 0; cntNoOfTrueConditions < 1; cntNoOfTrueConditions++) {
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

            if (arredtboc_OderQuantityFinalSchemesToApply.length > 0) {
                fnAssignSchemeIDsAppliedOverProductAfterValueChange(prdID, tblCurrentTR, 0);
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
                                        var trPrdctOdrQty = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + arrProductIDMappedInSchSlbSubBukRowId[cntProdcutsRowIdCnt].ProductID + "]");
                                        cntTotPrd++;
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
                                            var productid = arrProductIDMappedInSchSlbSubBukRowId[cntProdcutsRowIdCnt].ProductID;
                                            var arr = new Array();
                                            arr = [{ productNameValue: 0, ProductID: productid }];
                                            arrProductIDMappedInSchSlbSubBukBenifitsForCalculation.push(arr[0]);
                                            var arr = new Array();
                                            arr = [{ ProductID: productid, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arrProductIDMappedInSchSlbSubBukBenifits }];
                                            noAlrtHshMaptoSaveData.push(arr[0]);
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
                                        } else {
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
                                        + "~" + productNameValue;
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
                                            var productNameValue = trPrdctOdrQty[0].cells[OrderQntyIndx].children[0].value;
                                            var noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                                BenSubBucketType + "~" + 0 + "~" + BenSubBucketValue + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                                0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit;
                                            if (SchTypeId == 3) {
                                                var productid = arrProductIDMappedInSchSlbSubBukRowId[cntProdcutsRowIdCnt].ProductID;
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
                                            } else {
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
                                            var productNameValue = trPrdctOdrQty[cntProdcutsRowIdCnt].cells[OrderQntyIndx].children[0].value;
                                            var productid = PID;

                                            var StandardRateBeforeTax = $(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("standardratebeforetax") == undefined ? 0 : $(trPrdctOdrQty[0]).attr("standardratebeforetax");
                                            var StandardRate = $(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("standardratebeforetax") == undefined ? 0 : $(trPrdctOdrQty[0]).attr("standardratebeforetax");
                                            var Grammage = $(trPrdctOdrQty[cntProdcutsRowIdCnt]).attr("grammage");
                                            var flgPriceChange = 0;// $(trPrdctOdrQty[0]).data("flgbatchpricechange") ? 0 : $(trPrdctOdrQty[0]).data("flgbatchpricechange");
                                            var flgQuoteApplied = 0;// $(trPrdctOdrQty[0]).is("[flgQuoteApplied]") ? 1 : 0;
                                            var ValBeforeTax = 0.00;

                                            var DiscountedVal = 0;
                                            if (schSlabSubBucketType == 5) {
                                                var TotalIndivisualWeight = parseFloat(Grammage) * 1000 * parseInt(productNameValue);
                                                DiscountedVal = (parseFloat(TotalIndivisualWeight) * parseFloat(BenSubBucketValue)) / parseFloat(TotalWeightage);
                                            }
                                            else if (schSlabSubBucketType == 1) {
                                                var TotalIndivisualWeight = parseInt(productNameValue);
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
                                var cntTotPrd = 0;
                                var flgAddOnBenefit = IsDiscountOnTotalAmount;
                                var trPrdctOdrQty = $("#tblPrdItemsMain tr").filter("[flgdata=1][oqty!=0]");
                                for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < trPrdctOdrQty.length; cntProdcutsRowIdCnt++) {
                                    var ProductID = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("skunodeid");
                                    var curntProdRate = parseFloat(trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("standardratebeforetax"));
                                    var flgPriceChange = 0;// trPrdctOdrQty.eq(cntProdcutsRowIdCnt).data("flgbatchpricechange") == undefined ? 0 : trPrdctOdrQty.eq(cntProdcutsRowIdCnt).data("flgbatchpricechange");
                                    var flgQuoteApplied = 0;// trPrdctOdrQty.eq(cntProdcutsRowIdCnt).is("[flgQuoteApplied]") ? 1 : 0;
                                    var Grammage = trPrdctOdrQty.eq(cntProdcutsRowIdCnt).attr("grammage");
                                    Grammage = Grammage == undefined ? 0 : Grammage;
                                    if (trPrdctOdrQty.length > 0) {
                                        cntTotPrd++;
                                        var productNameValue = trPrdctOdrQty[cntProdcutsRowIdCnt].cells[OrderQntyIndx].children[0].value;
                                        var TotalIndivisualWeight = 0;
                                        TotalIndivisualWeight = curntProdRate * parseInt(productNameValue);
                                        if (BenSubBucketType == 9) {
                                            if (schSlabSubBucketType == 5) {
                                                var TotalIndivisualWeight = parseFloat(Grammage) * 1000 * parseInt(productNameValue);
                                                var DiscountedVal = (parseFloat(TotalIndivisualWeight) * parseFloat(BenSubBucketValue)) / parseFloat(TotalWeightage);
                                            }
                                            else if (schSlabSubBucketType == 1) {
                                                var TotalIndivisualWeight = parseInt(productNameValue);
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
                                    if (cntTotPrd == arrProductIDMappedInSchSlbSubBukRowId.length) {
                                        break;
                                    }
                                }
                                listArrayHashmapProduct.push(arrProductIDMappedInSchSlbSubBukBenifits);
                                listArrayFreePrdctQty.push(strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail);
                            }

                            if (BenSubBucketType == 10) //10. Free pr Unit Volume
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
                                var arrProductIDMappedInSchSlbSubBukBenifits = new Array();

                                var countProdPurchased = 0;
                                var TotalVolumeWeightage = 0.00;


                                var flgAddOnBenefit = IsDiscountOnTotalAmount;

                                var BenSubBucketAssingnedValue = BenSubBucketValue;
                                if (Prorata == 1) {
                                    BenSubBucketValue = (TotalWeightage * parseFloat(BenSubBucketValue)) / parseFloat(Per);
                                } else {
                                    var TotalWeightageNew = TotalWeightage - (TotalWeightage % Per);
                                    BenSubBucketValue = (TotalWeightageNew * parseFloat(BenSubBucketValue)) / parseFloat(Per);
                                }



                                var strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail = fectStatusIfBeniftRowIdExistsInSchemeSlabBenefitsValueDetail(BenifitRowID, toMultiply, BenSubBucketValue, BenSubBucketType);

                                alrtStopResult = false;

                                if (arrProductIDMappedInSchSlbSubBukRowId.length > 0) {

                                    var trs = $("#tblPrdItemsMain tr[flgdata=1]");
                                    for (var cntProdcutsRowIdCnt = 0; cntProdcutsRowIdCnt < trs.length; cntProdcutsRowIdCnt++) {
                                        var PID = trs.eq(cntProdcutsRowIdCnt).attr("skunodeid");
                                        var trPrdctOdrQty = trs.eq(cntProdcutsRowIdCnt);
                                        var PrdExist = jQuery.grep(arrProductIDMappedInSchSlbSubBukRowId, function (element, index) {
                                            return (element.ProductID == PID);
                                        });
                                        if (PrdExist.length > 0) {
                                            if (trPrdctOdrQty.length > 0 && trPrdctOdrQty[0].cells[RateIndx].children[0].innerHTML != "Select Rate") {
                                                var productid = PID;
                                                var productNameValue = $(trPrdctOdrQty)[0].cells[OrderQntyIndx].children[0].value;
                                                var prodVolume = parseFloat($(trPrdctOdrQty).attr("grammage"));
                                                prodVolume = (parseFloat(prodVolume) * 1000);


                                                var TotalIndivisualWeight = parseFloat(prodVolume) * parseInt(productNameValue);
                                                var DiscountedVal = (parseFloat(TotalIndivisualWeight) * parseFloat(BenSubBucketValue)) / parseFloat(TotalWeightage);

                                                if (SchTypeId == 3) {
                                                    var trOrderQty = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + prdID + "]");
                                                    if (trOrderQty.length > 0) {
                                                        productNameValue = trOrderQty[0].cells[OrderQntyIndx].children[0].value;
                                                    }
                                                    var arr1 = new Array();
                                                    arr1 = [{ productNameValue: productNameValue, ProductID: prdID }];
                                                    arrProductIDMappedInSchSlbSubBukBenifits.push(arr1[0]);

                                                    var noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                                        BenSubBucketType + "~" + 0 + "~" + DiscountedVal + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                                        0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit;

                                                    stringSchemeIdWthAllVal.push(noAlrtsubValues);

                                                    var arr = new Array();
                                                    arr = [{ ProductID: prdID, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arr1 }];
                                                    noAlrtHshMaptoSaveData.push(arr[0]);
                                                    break;

                                                } else {
                                                    var arr1 = new Array();
                                                    arr1 = [{ productNameValue: productNameValue, ProductID: productid }];
                                                    arrProductIDMappedInSchSlbSubBukBenifits.push(arr1[0]);

                                                    var noAlrtsubValues = strBeniftRowIdExistsInSchemeSlabBenefitsValueDetail[0] + "~" + schId + "~" + schSlabId + "~" + schSlbBuckId + "~" + schSlabSubBucketValue + "~" + 0 + "~" + schSlabSubBucketType + "~" + BenifitRowID + "~" +
                                                        BenSubBucketType + "~" + 0 + "~" + DiscountedVal + "~" + BenSubBucketAssingnedValue + "~" + 0 + "~" +
                                                        0 + "~" + 0 + "~" + 0 + "~" + Per + "~" + UOM + "~" + schSlbSubRowID + "~" + SchTypeId + "~" + TotalWeightage + "~" + Prorata + "~" + productNameValue + "~" + flgAddOnScheme + "~" + flgAddOnBenefit;

                                                    stringSchemeIdWthAllVal.push(noAlrtsubValues);

                                                    var arr = new Array();
                                                    arr = [{ ProductID: productid, stringSchemeIdWthAllVal: noAlrtsubValues, freeProduct: arr1 }];
                                                    noAlrtHshMaptoSaveData.push(arr[0]);
                                                }
                                            }
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
                        var ProductName = "";// $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").text();
                        var SKUCode = "";
                        var StandardRate = $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + freeProductId + "]").attr("StandardRateBeforeTax") == undefined ? "0.00" : $("#tblPrdItemsMain tr[flgdata=1][skunodeid=" + ProductId + "]").attr("standardratebeforetax");
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

    </script>
   
    <script type="text/javascript" language="javascript">
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

    </script>
    <script type="text/javascript" language="javascript">


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
            arrayRowData = [{
                OrderId: OrderId, OrderDate: OrderDate, OrderByCustomerNodeId: OrderByCustomerNodeId, OrderByCustomerNodeType: OrderByCustomerNodeType, CustomerPONo: CustomerPONo,
                CustomerPODate: CustomerPODate, Remarks: Remarks, NetOrderValue: NetOrderValue, OrderStatusId: OrderStatusId, flgOrderClosed: flgOrderClosed, SalesPersonId: SalesPersonId
            , SalesPersonNodeType: SalesPersonNodeType, OrderSourceID: OrderSourceID, flgOffline: flgOffline, OrdPrcsId: OrdPrcsId, ReasonId: ReasonId, ReasonText: ReasonText, DeliveryDate: DeliveryDate,
                TotOrderVal: TotOrderVal, TotMRPValue: TotMRPValue, TotLineLevelDisc: TotLineLevelDisc, TotDiscVal: TotDiscVal
            }];

            OrderMaster.push(arrayRowData[0]);

            try {

                PageMethods.fnspPopulateOrderDetail(OrderMaster, OrderDetail, arrStoreProductAppliedSchemesBenifitsRecords, flgProductive, TeleCallID, 0, "", $("#cphRight_hdnSalesNodeId").val(), $("#cphRight_hdnSalesNodeType").val(), $("#cphRight_hdnLoginId").val(), fnSuccessPopulateOrderDetail, fnFailed);
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
            var sessionVal = "<%=Convert.ToString(Session["LoginID"])%>";
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

            var strHTML = "<tbody>"; var OldCategory = ""; var totQqty = 0;
            for (var i = 0; i < trPrdItemsMain.length; i++) {
                var Item_ROWNO = i + 1;
                var PrdID = $(trPrdItemsMain[i]).attr("SKUNodeID");
                var PrdCode = "";
                var Category = $(trPrdItemsMain[i]).attr("category");
                var SKUName = $(trPrdItemsMain[i]).find("td").eq(0).text();
                var MRP = $(trPrdItemsMain[i]).find("td").eq(1).html();
                var OrderQty = parseInt(trPrdItemsMain.eq(i).find("input").val());
                var SalesUnitId = 8
                var PriceTermId = 0;
                var ProductPrice = $(trPrdItemsMain[i]).attr("standardratebeforetax");
                var flgsbd = $(trPrdItemsMain[i]).attr("flgsbd");
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


                if (parseInt(OrderQty) > 0) {
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
                        NetValue: NetLineOrderVal, InvLevelDisc: invdiscountamount
                    }];
                    totQqty += parseInt(OrderQty);
                    OrderDetail.push(arrayRowData[0]);
                    if (OldCategory != Category) {
                        strHTML += "<tr>";
                        strHTML += "<td colspan='6' style='background-color:#c68e8e;height:20px;padding-left:5px;font-weight:bold'>" + Category + "</td>";
                        strHTML += "</tr>";
                    }
                    strHTML += "<tr>";
                    strHTML += "<td style='text-align:left;padding-left:5px;background-color:" + (flgsbd == 1 ? (flgbaseproduct == 1 ? "#e8d2d2" : "#f9f2f2") + "" : "") + "'>" + SKUName.trim() + "</td>";
                    strHTML += "<td style='text-align:right;padding-right:2px'>" + MRP + "</td>";
                    strHTML += "<td style='text-align:right;padding-right:2px'>" + OrderQty + "</td>";
                    //strHTML += "<td style='text-align:center;'>Pcs</td>";
                    strHTML += "<td style='text-align:right;padding-right:2px'>" + parseFloat(StandardRateBeforeTax).toFixed(2) + "</td>";
                    strHTML += "<td style='text-align:right;padding-right:2px'>" + parseFloat(TotLineDiscVal).toFixed(2) + "</td>";
                    strHTML += "<td style='text-align:right;padding-right:2px'>" + parseFloat(LineOrderValWDisc).toFixed(2) + "</td>";
                    strHTML += "</tr>";
                    OldCategory = Category;
                }
            }

            var TotNetLineValue = $("#tdTotNetLineValue").html();
            strHTML += "</tbody><tfoot><tr bgcolor='#5b5b5b' style='color:#ffffff;'>";
            strHTML += "<td colspan=\"2\" style='text-align:left;padding-left:1px;height:25px'># OF Ordered SKU's:" + OrderDetail.length + "</td>";
            strHTML += "<td style='text-align:right;padding-right:2px'>" + totQqty + "</td>";
            //strHTML += "<td align='center'>Pcs</td>";
            strHTML += "<td>Total</td>";
            strHTML += "<td style='text-align:right;padding-right:2px'>" + parseFloat(TotalProductLevelDiscount).toFixed(2) + "</td>";
            strHTML += "<td style='text-align:right;padding-right:2px'>" + TotNetLineValue + "</td>";
            strHTML += "</tr></tfoot></table>";

            var strHTML1 = "<thead><tr bgcolor='#066b60' style='color:#ffffff;font-weight:bold'>";
            strHTML1 += "<td align='center' style='height:25px'>Product Description</td>";
            strHTML1 += "<td align='center'>MRP</td>";
            strHTML1 += "<td align='center'>O.Qty</td>";
            //strHTML1 += "<td align='center'>UOM</td>";
            strHTML1 += "<td align='center'>Rate<br/>(&#8377;)</td>";
            strHTML1 += "<td align='center'>DiscVal<br/>(&#8377;)</td>";
            strHTML1 += "<td align='center'>Net Line Val<br/>(&#8377;)</td>";
            strHTML1 += "</tr></thead>";

            var alertmsg = "";
            alertmsg = "<div style='text-align:left;margin-bottom:5px'><b>Kindly review below order before submitting : </b></div><div><table border='1' rules='all' style='text-align:left;width:100%;font-size:8pt' cellpadding='2' cellspacing='0'>" + strHTML1 + strHTML + "</div><div style='margin-top:4px'><fieldset><legend>Initiative Applicable Summary</legend>" + $("#tblInvSummary")[0].outerHTML + "</fieldset></div>";
            $("#dvIsreturn")[0].innerHTML = alertmsg;
            $("#dvIsreturn").dialog({
                title: "Review Order",
                modal: true,
                width: "auto",
                height: 450,
                open: function () {
                    $("#dvFadeForProcessing").hide();
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
                if (btnType == 2 || btnType == 3) {
                    $("#dvFadeForProcessing").css("display", "none");
                    //fnupdateLastcall(d.localeFormat("dd-MMM-yyyy hh:mm tt"), $("#txtOrderDate").val());
                    //window.parent.fnUpdateLastCallOrderDate($("#hdnStoreID").val(), d.localeFormat("dd-MMM-yyyy hh:mm tt"), OrderDate, "Un-Productive Call","","");
                    //window.parent.flgValidUpdate = 1;
                    window.location.href = "frmRouteList_PDA.aspx";
                }

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


        function fnSuccessPopulateOrderDetailOld(result) {
            $("#dvFadeForProcessing").css("display", "none");
            flgCheckPmtTems = 0;
            flgCloseDialog = 0;
            if (result.split("^")[1] == 1) {
                $("#cphRight_ddlReasonforchange option[value=0]").prop("selected", true);
                $("#tAreaOtherReason").val("");

                var OrderId = result.split("^")[2].split("_")[0];
                $("#cphRight_hdnOrderID").val(result.split("^")[2].split("_")[0]);
                $("#cphRight_lblOrderNumber").html(result.split("^")[2].split("_")[1]);
                var OrdPrcsId = $("#cphRight_hdnOrdPrcsId").val();
                var OrderStatusID = $("#cphRight_hdnOrderStatusID").val();
                fnDisplayButtons(OrderStatusID, OrdPrcsId);
                //fnGetOrderByStore($("#hdnStoreID").val());
                var strMsg = result.split("^")[0];
                if (btnType == 8) {
                    var buttons = "<a href='###' class='icon-bnt'  onclick='fnTakeActionAfterSaveOrder()'></span><div style='width:50px'>OK</div></a><a href='###' class='icon-bnt' onclick='fnDescrDailogExit1()'><span class='Close'></span><div style='width:60px'>Close</div></a>";
                } else {
                    var buttons = "<div><a href='###' class='icon-bnt' onclick=\"fnGoForPrint(2)\"><span class='Print'></span><div>Print</div></a><a href='###' class='icon-bnt' onclick=\"fnGoForPrint(3)\"><span class='Preview'></span><div>Preview</div></a><a href='###' class='icon-bnt' onclick=\"fnGoForPrint(4)\" ><span class='Save'></span><div>Save Locally</div></a></div><div style='margin-top:8px'><a href='###' class='icon-bnt' onclick='fnTakeActionAfterSaveOrder()'><span class='Close'></span><div>Close</div></a></div>";
                }
                fnCustomMessageSave(strMsg, buttons);
            }
            else if (result.split("^")[1] == 4) {
                alert(result.split("^")[0]);
                window.location.href = "../frmLogin.aspx";
            }
            else {
                alert(result.split("^")[0]);
            }
        }

    </script>
    <script type="text/javascript" language="javascript">
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


    </script>
    <script type="text/javascript">
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
                        var flgSBDChild = $(evt.target).closest('tr').find('input[type=number]').attr("flgSBDChild");
                        var x = $(evt.target).closest('tr').find("input[type=number]").closest("td").index();
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

                        var active = $($("#tblPrdItemsMain tbody")[0].rows[y]).find('input[type=number]');



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
                                if ($($("#tblPrdItemsMain tbody")[0].rows[y]).attr("flgsbd") == 1) {
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
                            if ($($("#tblPrdItemsMain tbody")[0].rows[y]).attr("flgsbd") == 1 && charCode == 38) {
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
                            if (active[0].children.length > 0) {
                                // alert("hi");
                                active[0].children[0].focus();
                                // active[0].children[0].value = y;
                                evt.preventDefault();
                            } else {
                                active.focus();
                                // alert("hi");
                                evt.preventDefault();
                            }
                        }

                    }
                }

            }

        }

        function fnSetFocustOnText() {
            $("#tblPrdItemsMain").find('input').focus(function () {
                $("#tblPrdItemsMain tr[flgdata=1]").removeClass("highlightedProduct");
                $(this).closest("tr").addClass("highlightedProduct");
                var skunodeid = $(this).closest("tr").attr("skunodeid");
                fnShowBenefitSchemeWise(skunodeid, 3);
            }).change(function () {
                $("#tblPrdItemsMain tr[flgdata=1]").removeClass("highlightedProduct");
                $(this).closest("tr").addClass("highlightedProduct");
                var skunodeid = $(this).closest("tr").attr("skunodeid");
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

   
    
    <script type="text/javascript" language="javascript">

        $(document).ready(function () {
            $('#txtSearchproduct').keyup(function () {
                var val = $(this).val().toUpperCase();
                $("#tblPrdItemsMain").find("tbody").eq(0).find("tr[flgdata=1][flgsearch=1]").css("display", "none");

                var tbl = $("#tblPrdItemsMain").find("tr[flgdata=1][flgsearch=1]");
                var tr;
                for (var i = 0; i < tbl.length; i++) {
                    tr = $(tbl[i]);
                    for (var j = 0; j < $(tr).find("td").length; j++) {
                        if ($(tr).find("td").eq(j).attr("Searchable") == "1") {
                            var tdText = $(tr).find("td").eq(j).html().toUpperCase();
                            if (tdText.indexOf(val) > -1) {
                                var category = $(tr).attr("category");
                                $(tr).css("display", "table-row");
                            }
                        }
                    }
                }
            });
        })

    </script>
    <script>
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

        function fnGobackpage() {
            window.location.href = "frmRouteList_PDA.aspx"
        }

        function fnShowLegends() {
            $("#divLegends").dialog({
                modal: true,
                title: "Legends:",
                width: "auto",
                height: "auto",
                close: function (event, ui) {
                    $("#divLegends").dialog('destroy');
                }

            });
        }
        function fnShowPreviousContacted() {
            $("#divPrevContactedDataModal").dialog({
                modal: true,
                title: "<b>Previously&nbsp;&nbsp;Contacted</b>:",
                width: "auto",
                height: "auto",
                buttons: {
                    "OK": function () {
                        $("#divPrevContactedDataModal").dialog('close');
                    }
                }
            });
        }

        function fnShowInitiativeSummary() {
            $("#divInitiativeSummary").dialog({
                modal: true,
                title: "Initiative Summary",
                width: "98%",
                height: "auto",
                close: function () {
                    $("#divInitiativeSummary").dialog('destroy');
                },
                buttons: {
                    "OK": function () {
                        $("#divInitiativeSummary").dialog('close');
                    }
                }
            });
        }
    </script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="cphRight" runat="Server">

     <div id="dvFadeForProcessing" align="center" class="clsloader">
            <img src="../NewImages/ajax-loader.gif" style="margin-top: 300px;" />
        </div>
    
  
    <div style="width:100%">
        <div style="margin-top: 0px; display: block; width: 100%; font-size: 8.5pt; float: left;border-right:1px solid #bbbbbb" id="dvMainMaster">
            <div style="width:100%;position:fixed;background-color:#ffffff;z-index:1;" id="divHeader1">
                <table style="display:none;width: 100%; border-bottom: 1px solid #006a9d; background-color: #26a6e7; color: white">
                    <tr style="font-size: 9pt;">
                        <td style="font-size: 8pt; font-weight: bold;width:8%">Order Date :
                        </td>
                        <td>
                            <input type="text" id="txtOrderDate" style="width: 80px; margin-right: 2px;background-color:transparent;font-size:8pt;border:none;font-weight:bold;color:#ffffff" tabindex="1" disabled="disabled" />
                        </td>

                        <td align="right" style="font-size: 8pt; font-weight: bold;width:8%">Dlvry Date :
                        </td>
                        <td>
                            <input type="text" id="txtRequiredDlvryDate"  class="dtp" style="width: 75px; margin-right: 2px;background-color:transparent;font-size:8pt;border:none;font-weight:bold;color:#ffffff" tabindex="1" disabled="disabled" />
                        </td>

                        <td align="left" style="display:none;font-size: 8pt; font-weight: bold" id="tdOrderStatus"><b>Order Status</b> : Open</td>
                        <td align="left" style="font-size: 8pt; font-weight: bold" id="tdCallStartTIme"><b>Call Start TIme</b> : 00:00</td>
                    </tr>
                </table>
                 <div class="form-inline" id="tblhead" style="margin-top: 2px;margin-left: 2px;">
                     <div class="form-group" style="display:none">
            <label for="">Branch/SubD Name:</label>
            <label for="" id="tdBranchName"></label>
        </div>
                      <div class="form-group" style="padding:2px 0px;font-size:12pt;font-weight:bold;text-align:center;background-color:#343a3f;color:#ffffff">
                    Welcome To Online Order Booking System
                </div> 
        <div class="form-group">
            <label for="">Store:</label>
            <label for="" id="txtStoreName"></label>
           <a style="float:right;text-decoration:underline;color:blue" href="###" onclick="fnShowStoreInitiative()">
                             Initiative Applicable
                         </a>
        </div>
        <div class="form-group">
            <label for="">Channel:</label>
            <label for="" id="tdStoreChannel"></label>
              <a style="float:right;text-decoration:underline;color:blue" href="###" onclick="fnProductLineInitiative(this)">
                             Initiative Applied
              </a>
        </div>
                     
    </div>
                <div class="form-inline" id="tblhead1" style="margin-top: 2px;">
     
               <div class="form-group">
                  <div id="divSchemeAppliedSectionAchievement" style="border:1px solid #486066;overflow-y: auto; overflow-x: hidden;  padding: 1px;">
                    
                </div>
                   
        </div> 
                   
                    
            </div>
                </div>

            <div style="margin-left: 0px; display: block; width: 100%;margin-bottom:60px;margin-top:62px;" id="dvtabcontainer">
                <div id="divtblMain">
                    <table cellspacing="0" style="font-size: 8pt;width:100%" id="tblPrdItemsMain">
                               
                            </table>
                </div>
            </div>
             <div id="divFixedFooter" style="width:100%;padding-bottom:5px;padding-top:5px;margin-left: 0px; bottom: 33px; position:fixed;z-index:1;background-color:#408080;color:#ffffff">           
            <table style="width:100%;font-size:10pt;font-weight:bold">
                <tr><td style="width:140px;text-align:right">#Of SKU Ordered : </td>
                <td style="width:80px;text-align:center" id="tdTotSKUs">0</td>
                <td style="text-align:center" id="tdTotNetLineValue">&#8377; 0.00</td>
                   </tr></table>
                 </div>
                 </div>

        <div id="divPrevContactedDataModal" style="display: none;">
                 <div id="divPrevContactedData" style="padding:3px;font-size:8pt">
               
                     </div>
            </div>
        <div style="display:none;">
                
                <div id="divOrderlstbasedOnstore"></div>
            </div>
        <div style="display:none;margin-top: 10px; width: 100%; margin-left: 2px;" flg="1"" id="divRightContainer">
             
            
            
             <div style="margin-top: 7px;width: 100%;border: 1px solid #A0A0A0; font-size: 7.5pt">
                <div style="margin-top: -6px; margin-left: 20%; width: 60%; background-color: #ffffff;font-weight:bold;font-size:8pt">
                    <center><b>Intitiative&nbsp;Applicable Summary</b></center>
                </div>
                <div  style="display:none;" id="divInitiativeSummary">
                    <table style="width:100%;margin:0px" id="tblInvSummary" class='table table-bordered table-condensed'>
                        <thead><tr class="bg-primary text-white"><td>Summary</td><td style="text-align:right">Value</td><td style="text-align:center">%</td> </tr></thead>
                        <tbody>
                            <tr>
                            <td class="text-left">Inv. MRP Value.(&#8377;)</td><td style="text-align:right;width:30%" id="tdInvMRP">0.00</td><td  style="text-align:center;width:15%"></td>
                            </tr>
                             <tr>
                            <td class="text-left">Inv. Value w/o Initiative</td><td style="text-align:right" id="tdInvValue">0.00</td><td  style="text-align:center"></td>
                            </tr>
                            <tr>
                                <td class="text-left">Nett. Inv. Value </td><td style="text-align:right" id="tdNettInvValue">0.00</td><td style="text-align:center"></td>
                            </tr>
                            <tr class="text-primary">
                            <td class="text-left"><a href="###" style="color:blue;text-decoration:underline" onclick="fnProductLineInitiative(this)" >Product/Line Initiative</a></td><td style="text-align:right" id="tdLineSchemeDiscount">0.00</td><td  style="text-align:center">0</td>
                            </tr>
                            <tr class="text-primary">
                            <td class="text-left">Overall Invoice Value Initiative</td><td style="text-align:right" id="tdOverallInvSchemeDiscount">0.00</td><td  style="text-align:center">0</td>
                            </tr>
                             <tr class="text-primary">
                            <td class="text-left">Total Initiative Discount</td><td style="text-align:right" id="tdInvSchemeDiscount">0.00</td><td  style="text-align:center">0</td>
                            </tr>
                             <tr class="text-primary">
                            <td class="text-left">Reg. Brand Margin</td><td style="text-align:right" id="tdBranMargin">0.00</td><td  style="text-align:center">0</td>
                            </tr>
                            <tr class="text-primary" >
                            <td class="text-left" >Total Brand Margin</td><td style="text-align:right" id="tdTotalBranMargin">0.00</td><td style="text-align:center">0</td>
                            </tr>
                           
                        </tbody>
                    </table>
                </div>
            </div>
           
           
        </div>

    </div>
    <div class="blockButtons" style="z-index:10;width: 100%; bottom: 0; position: fixed; padding-top: 1px; background-color: #cfcfcf;">
        <table style="width:100%">
            <tr>
                <td>
                    <a href="###" class="icon-bnt" onclick="fnSaveFinalData(2)" id="anchorbtn2" ><span class="PostOrder"></span>
                        <div style="font-size: 7.8pt;width:68px">Review<br />Order</div>
                    </a>
                   </td>
                <td>
                    <img src="../images/InitiativeSummary.png"  title="Click To Show Initiative Summary" onclick="fnShowInitiativeSummary()" />
                </td>
                <td id="tdCustStatus">
                    <textarea placeholder="Remarks" cols="24" rows="2" id="txtRemarks" style="width:98%"></textarea>
                </td>
            </tr>
        </table>
    </div>

    <div id="divLegends" style="display:none">
         <table style="width:100%" class="table table-bordered table-condensed">
                        <tr>
                        <td style="padding:0 5px;font-weight:bold;font-size:10.5pt" colspan="2"><b>Legends :</b></td>
                            </tr>
             <tr>
                        <td style="width:30px;background-color:#814141;padding-left:8px;height:20px">
                        </td>
                        <td style="padding: 0px 20px 0px 4px;font-weight:bold">Product Category</td>
                 </tr>
             <tr>
                        <td style="width:30px;padding:0">
                            
                            <div style="height:21px;width:15px;background-color:#e0c5c5;display:table-cell"></div><div style="height:21px;width:15px;background-color:#e8d2d2;display:table-cell"></div>
                        </td>
                        <td style="padding: 0px 20px 0px 4px;font-weight:bold">SBD Product Group</td>
             </tr>
             <tr>
                        <td style="width:30px;background-color:#f9f2f2">
                        </td>
                        <td style="padding: 0px 20px 0px 4px;font-weight:bold">SBD Product</td>
                        </tr>
             <tr>
                        <td style="width:30px;background-color:#ffffc4">
                        </td>
                        <td style="padding: 0px 3px 0px 4px;font-weight:bold">Newly Added Product</td>
                            </tr>
                    </table>
    </div>
    <div id="dvOrderViewDetail" style="display: none; font-size: 8.5pt" title="Order Detail">
    </div>
   
   
     <div id="dvContextFinishedPrd" style="background-color: #F0F0F0; cursor: pointer; display: none; width: 100%;overflow: hidden;">
        <div style="padding-bottom: 5px">
            <table style="width: 100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="width: 150px; padding-top: 5px; padding-right: 2px">
                        <input type="text" paceholder="Search product" style="width: 100%; height: 22px" id="txtFindPrdCode" />
                    </td>
                    <td>
                        <b>Eg. : </b>fem,ultr,soft,55
                    </td>
                    <td align="right" valign="top">
                        <img src="../Images/button_cancel.png" title="click to close popup" onclick="fnHideDv()" />
                    </td>
                </tr>
            </table>
        </div>
        <div style="height: 380px;">
            <div class="ui-widget-header" style="height: 18px">
                <table cellpadding="3" cellspacing="0">
                    <tr>
     <td style="font-weight: bold; color: white; width: 60px;text-align:center">SNo
                        </td>
                        <td style="font-weight: bold; color: white; width: 320px;">Product Name
                        </td>
                        <td style="font-weight: bold; color: white; width: 150px;">Brand
                        </td>
                        <td style="font-weight: bold; color: white; text-align: center; width: 80px;">MRP
                        </td>
                         <td style="font-weight: bold; color: white; text-align: center; width: 80px;">RLP
                        </td>
                    </tr>
                </table>
            </div>
            <div style="margin-top:2px;height: 335px; overflow-y: auto; background-color: white" id="dvPrdContainer">
            </div>

        </div>
    </div>
    <div style="display: none; text-align: center;" id="dvIsreturn">
    </div>
    <div style="display: none; text-align: center;" id="dvReason" title="Reason">
    </div>

    <div style="display: none; text-align: center;" id="dvSchemeDescr" title="Schemes Description">
    </div>
    <input type="hidden" id="hdnCase" value="0" />
    <input type="hidden" id="hdnrowIndex" value="0" />

    <input type="hidden" id="hdnLoginId" value="0" runat="server" />
    <input type="hidden" id="hdnNodeID" value="0" />
    <input type="hidden" id="hdnNodeType" value="0" />
    <input type="hidden" id="hdnOrderID" value="0" runat="server" />
    <input type="hidden" id="hdnStoreID" value="0" />
    <input type="hidden" id="hdnRoleId" value="0" runat="server" />
    <input type="hidden" id="hdnPrdId" value="" runat="server" />
    <input type="hidden" id="hdnOrderDate" value="" runat="server" />
    <input type="hidden" id="hdnSalesNodeType" value="0" runat="server" />
    <input type="hidden" id="hdnSalesNodeId" value="0" runat="server" />
    <input type="hidden" id="hdnTelecallingId" value="0" runat="server" />
    <input type="hidden" id="hdnOrderStatusID" value="1" runat="server" />
    <input type="hidden" id="hdnOrdPrcsId" value="6" runat="server" />
    <input type="hidden" id="hdnflgOffline" value="1" runat="server" />
    <input type="hidden" id="hdnMenuflg" value="0" runat="server" />
    <input type="hidden" id="hdnflgOperationalLevel" value="0" runat="server" />
    <input type="hidden" id="hdnGSTType" value="2" /><%--1 For IGST 2 for CGST AND SGST--%>
    <input type="hidden" id="hdnNewStoreDetail" value="0" runat="server" />
</asp:Content>
