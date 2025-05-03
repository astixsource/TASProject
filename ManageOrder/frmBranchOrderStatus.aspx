<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" CodeFile="frmBranchOrderStatus.aspx.cs" Inherits="frmBranchOrderStatus" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
     <script src="../scripts/jquery-3.6.0.js"></script>
    <link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jquery-ui.js"></script>
    <link href="../styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../StylesTreeViewOrder/js/custom-script.js" type="text/javascript"></script>
    <script src="../scripts/validation.js"></script>
    <script src="../StylesTreeView/js/jquery.dataTables.js" type="text/javascript"></script>
    <link href="../StylesTreeView/Css/jquery.dataTables.css" rel="stylesheet" />
    <%--<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet">--%> 
    <style>
        .mainpanel {
            padding:0px !important;
        }
        div.dataTables_scrollBody {
            overflow-y:scroll !important;
        }
        .iframe-placeholder
{
   background: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100% 100%"><text fill="%23FF0000" x="50%" y="50%" font-family="\'Lucida Grande\', sans-serif" font-size="24" text-anchor="middle">Page is being loaded , please wait..</text></svg>') 0px 0px no-repeat;
}
         .inner-addon {
  position: relative;
}
        .leftMenu-headding {
            width:235px !important;
        }

/* style glyph */
.inner-addon .glyphicon {
  position: absolute;
  padding: 10px;
  pointer-events: none;
}

/* align glyph */
.left-addon .glyphicon  { left:  0px;}
.right-addon .glyphicon { right: 0px;}

/* add padding  */
.left-addon input  { padding-left:  30px; }
.right-addon input { padding-right: 30px; }
        input[type=text]::-ms-clear {
            display: none;
        }

        .ui-autocomplete-loading {
            background: url('../images/preloader_18.gif') no-repeat right center;
        }

        .mcacAnchor span {
            font: normal 11px 'HelveticaLTStdRoman',Arial, Helvetica, sans-serif;
            color: Black;
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
        a.icon-bnt span {
                height: 25px;
                width: 25px;
                float: left;
                padding: 0 1pt 0 0;
            }
         a.icon-bnt span.PostOrder {
                    background: url(../btnImg/PostOrder_Icon.png) center no-repeat;
                }
        h4 {
             font-size: 15px;
            padding: 0 0 8px 0; /*background-color: #f98a1f;*/
            background-color: #23aed8;
            color: White !important;
            font-weight: bold !important;
            font-family:Verdana, Geneva, Tahoma, sans-serif;
            padding-top: 10px;
            padding-left: 5px;
            margin-top: 0 !important;
            margin-bottom: 0 !important;
            text-shadow: 2px 2px 2px #333333;
            filter: progid:DXImageTransform.Microsoft.DropShadow(offX=2,offY=2,color=333333);
        }

        div.dataTables_scrollBody{
            overflow-x:hidden !important;
        }
     .dataTables_scroll{
     }
     .dataTables_wrapper.no-footer .dataTables_scrollBody {
    border-bottom: none !important;
}
    table.dataTable > tbody td {
    padding: 2px 4px 2px 4px !important;
     vertical-align: middle;
     border-left: 1px solid #ccc !important;
    border-bottom: 1px solid #ccc !important;
}
    table.dataTable > thead th, table.dataTable > thead td {
    padding: 2px 4px 2px 4px !important;
     vertical-align: middle;
    border-left: 1px solid #ccc;
    border-top: none !important;
    border-bottom: none !important;
}
     table.dataTable > tfoot th, table.dataTable > tfoot td {
    padding: 2px 4px 2px 4px !important;
}
     table.dataTable tbody tr {
     background-color:none !important;
}
    </style>
    <style>
    .custom-combobox {
    position: relative;
    display: inline-block;
    height:35px;
    }
    .custom-combobox-toggle {
    position: absolute;
    top: 0;
    bottom: 0;
    margin-left: -1px;
    padding: 0;
    /* support: IE7 */
    *height: 1.7em;
    *top: 0.1em;
    }
    .custom-combobox-input {
    margin: 0;
    padding: 0.3em;
    background:#fff;
    outline:none;
    width:330px;
    height:35px;
    }
</style>

   
    <script>
        var StoreList = [];
        $(document).ready(function () {
            $('#fraLeft').load(function () {
                $("#fraLeft").contents().find("#DvMenu").find("li").removeClass("activemenu");
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='" + $("#cphRight_hdnMenuId").val() + "']").addClass("activemenu");
                $("#fraLeft")[0].height = $(window).height() - ($("#dvBanner").height() + $(".footer").height());
            });
            $("#divbtns").hide();
            
            $(document).data("BranchData", $("#cphRight_ddlBranch").clone());
            $("#cphRight_ddlBranch option").remove();
            $("#cphRight_ddlBranch").html("<option value='0-0'>------<option>");
            $("#cphRight_ddlBranch option").eq(1).remove();

            if ($("#cphRight_ddlSite option").length == 1) {
                var val = $("#cphRight_ddlSite").val();
                var options = $(document).data("BranchData").clone();
                $("#cphRight_ddlBranch option").remove();
                $("#cphRight_ddlBranch").html("<option value='0-0'>------<option>");
                $(options).find("option[sitenodeid='" + val + "']").appendTo($("#cphRight_ddlBranch"));
                $("#cphRight_ddlBranch option").eq(1).remove();
                if ($("#cphRight_ddlBranch option").length == 2) {
                    $("#cphRight_ddlBranch option[value='0-0']").remove();
                    fnStoreList();
                    fnRefreshDownloadedList();
                }
            }

            
            
               // $("#cphRight_ddlDistribor").combobox();

            //$('#txtFindDbr').keyup(function () {
            //    var val = $(this).val().toUpperCase();
            //    $("#tbldbrlist").find("tbody").eq(0).find("tr").css("display", "none");

            //    var tbl = $("#tbldbrlist>tbody>tr");
            //    var tr;
            //    for (var i = 0; i < tbl.length; i++) {
            //        tr = $(tbl[i]);
            //        for (var j = 0; j < $(tr).find("td").length; j++) {
            //            if ($(tr).find("td").eq(j).attr("Searchable") == "1") {
            //                var tdText = $(tr).find("td").eq(j).html().toUpperCase();
            //                if (tdText.indexOf(val) > -1) {
            //                    $(tr).css("display", "table-row");
            //                }
            //            }
            //        }
            //    }
            //});

        });


        function fnChangeSite(sender) {
            var val = $(sender).val();
            var options = $(document).data("BranchData").clone();
            $("#cphRight_ddlBranch option").remove();
            $("#cphRight_ddlBranch").html("<option value='0-0'>------<option>");
            $(options).find("option[sitenodeid='" + val + "']").appendTo($("#cphRight_ddlBranch"));
            $("#cphRight_ddlBranch option").eq(1).remove();
        }

        function fnMarkAtt(sender) {

        }
        function AddParameter(form, name, value) {
            var $input = $("<input />").attr("type", "hidden")
                                .attr("name", name)
                                .attr("value", value);
            form.append($input);
        }

        function fnEditOrder(sender) {
            var StoreId = $(sender).closest("tr").attr("storeid");
            var TeleCallingId = $(sender).closest("tr").attr("TeleCallingId");
            var StoreName = $(sender).closest("tr").find("a").eq(1).html();
            var gstno = "";
            gstno = gstno == "" ? 2 : gstno;
            var LastCallDate = "";
            var LastOrderDate = "";
            var RouteId = $("#cphRight_ddlRoute").val();
            var flgDefault = $("#cphRight_ddlRoute option:selected").attr("flgDefault");
            var flgOnRoute = flgDefault;// $("#cphRight_ddlRoute option:selected").attr("flgOnRoute");
            var SalesNodeId = $(sender).closest("tr").attr("BranchNodeId");
            var SalesNodeType = $(sender).closest("tr").attr("BranchNodeType");
            var Branch = $(sender).closest("tr").find("td").eq(1).html();
            var strStoreName = StoreId + "^" + StoreName.replace("&", "") + "^1^" + gstno + "^" + LastCallDate + "^" + LastOrderDate + "^" + RouteId + "^" + flgDefault + "^" + flgOnRoute + "^" + SalesNodeId + "^" + SalesNodeType + "^" + TeleCallingId + "^" + Branch;
            fnShowOrderBookingForm(strStoreName);
        }
        function fnClosedvOrderPop() {
            try {
                $("#InvReportDialog").dialog('close');
                //$("#IframeInvRpt")[0].src = "about:blank";
                //$("#InvReportDialog").dialog('destroy');
            } catch (err) { }
        }
        function fnRemoveClass() {
            $("#IframeInvRpt").removeClass("iframe-placeholder");
        }
        var flgValidUpdate = 0;
        function fnShowOrderBookingForm(strStoreName) {
            $("#IframeInvRpt").addClass("iframe-placeholder");
            $("#IframeInvRpt")[0].src = "about:blank";
            $("#InvReportDialog").dialog({
                modal: true,
                title: "Telecaller Order booking Form : " + $("#cphRight_ddlDistribor option:selected").text(),
                width: $(document).width(),
                height: $(document).height(),
                close: function (event, ui) {
                    $("#IframeInvRpt").removeClass("iframe-placeholder");
                    // Clear the URL so Chrome/Firefox don't refresh the iframe when it's hidden.
                    $("#IframeInvRpt").prop("src", "about:blank");
                },
                open: function (event, ui) {
                    $("#IframeInvRpt").prop("src", "frmOrderPunching_Telecaller.aspx?flgOffline=7&strNewStoreDetailTelecaller=" + strStoreName);
                }
            });
        }

        function fnUpdateLastCallOrderDate(StoreId, LastCallDate, LastOrderDate, Status) {
            $("#tbldbrlist").find("tbody").find("tr[storeid=" + StoreId + "]").find("td").eq(6).html(Status);
            $("#tbldbrlist").find("tbody").find("tr[storeid=" + StoreId + "]").find("td").eq(9).html(LastCallDate);
           
        }
        function fnRefreshStatus() {
           
            fnStoreList();
        }
        function fnRefreshDownloadedList()
        {
            var BranchVal = $("#cphRight_ddlBranch").val();
            var BranchNodeId = BranchVal.split("-")[0];
            var BranchNodeType = BranchVal.split("-")[1];
            var IsMappedLeapSwing = BranchVal.split("-")[2];
            var LoginId = $("#cphRight_hdnLoginId").val();
            PageMethods.GetDownloadOrderList(LoginId,BranchNodeId,BranchNodeType, function (result) {
                $("#divDownloadedList")[0].innerHTML =result!=""? "<fieldset style='border:1px solid #5b6367;width:99%;display:inline-block'><legend style='text-align:center;width:auto;margin-bottom:2px'>Orders Downloaded History</legend>" + result + "</fieldset>":"";
            }, function () { alert("Error") });
        }
        function fnChangeBranch(sender) {
            if ($(sender).val() != "0") {
                $("#divmainparent").show();
                fnStoreList();
                fnRefreshDownloadedList();
            } else {
                $("#divmainparent").hide();
            }
        }
        function fnStoreList() {
            
            var BranchVal = $("#cphRight_ddlBranch").val();
            var BranchNodeId = BranchVal.split("-")[0];
            var BranchNodeType = BranchVal.split("-")[1];
            var LoginId = $("#cphRight_hdnLoginId").val();
            var MId = $("#cphRight_hdnMenuId").val();
            $("#dvFadeForProcessing").show();
            PageMethods.fnBranchOrderStatusList(LoginId,BranchNodeId,BranchNodeType,function (result) {
                $("#dvFadeForProcessing").hide();
                $("#divbtns").hide();
                if (result.split("|")[0] == "2") {
                    $("#divdrmmain")[0].innerHTML = "Error-" + result.split("|")[1];
                } else if (result == "") {
                    $("#divdrmmain")[0].innerHTML = "No Store Found!!!";
                }
                else {
                    $("#divdrmmain")[0].innerHTML = result;
                    var isSubmitted = $("#tbldbrlist").attr("isSubmitted");
                    $("#divbtns").show();
                   
                }
            },
            function (result) {
                $("#dvFadeForProcessing").hide();
                alert("Error-" + result._message);
            }
            )
        }
        function fnDBRChange(DBNodeID) {
            $("#divdrmmain")[0].innerHTML = "";
            if (DBNodeID == "0") {
                $("#cphRight_ddlRoute").html("<option value='0' routenodetype='0'>-------</option>");
                $("#divdrmmain")[0].innerHTML = "";
                return false;
            }
            //alert($("#cphRight_ddlDistribor option:selected").va())
            var LoginId = $("#cphRight_hdnLoginId").val();
            $("#dvFadeForProcessing").show();
            PageMethods.fnBindRouteList(DBNodeID, LoginId, function (result) {
                $("#dvFadeForProcessing").hide();
                if (result == "2") {
                    alert("Some Technical Error,Please contact to Technical Team Or Try again later!!")
                } else {
                    $("#cphRight_ddlRoute").html(result);
                }
            },
            function (result) {
                $("#dvFadeForProcessing").hide();
                alert(result._message)
            }
            )
        }
        function fnSaveFinalData() {
            var tbl = $("#tbldbrlist").find("input[type=checkbox]:checked");
            if (tbl.length == 0) {
                alert("Kindly Select person to mark absent first!!!")
                return false;
            }
            $("#dvDialog")[0].innerHTML="Are you sure to mark as absent for these selected Persons?"
            $("#dvDialog").dialog({
                modal: true,
                title: "Confirmation:",
                buttons: {
                    "Yes": function () {
                        $(this).dialog('close');
                        var personIds = "";
                        var arrDSENodeID = new Array();
                        for (var i = 0; i < tbl.length; i++) {
                            var DSENodeId = tbl.eq(i).closest("tr").attr("DSENodeId");
                            var DSENodeType = tbl.eq(i).closest("tr").attr("DSENodeType");
                            flgAbsent = 1;
                            arrDSENodeID.push({ DSENodeID: DSENodeId, DSENodeType: DSENodeType, flgAbsent: flgAbsent });
                        }

                        var LoginId = $("#cphRight_hdnLoginId").val();
                        $("#dvFadeForProcessing").show();
                        PageMethods.fnSubmitDSEAttendance(LoginId, arrDSENodeID, function (result) {
                            $("#dvFadeForProcessing").hide();
                            if (result == "2") {
                                alert("Some Technical Error,Please contact to Technical Team Or Try again later!!")
                            } else {
                                //var $checked = $("#tbldbrlist").find("input[type=checkbox]:checked");
                                //for (var i = 0; i < $checked.length; i++) {
                                    $("#tbldbrlist").find("input[type=checkbox]").prop("disabled", true);
                                //}
                                alert("Absent Marked Successfully!!");
                                $("#divBTNS").hide();
                            }
                        },
                        function (result) {
                            $("#dvFadeForProcessing").hide();
                            alert(result._message)
                        }
                        )
                    },
                    "No": function () {
                        $(this).dialog('close');
                    }
                }
            });
               
        }


        function fnDownload(BranchCode, CycleId, DownloadDate, flg, IsMappingType) {
            var BranchVal = $("#cphRight_ddlBranch").val();
            var BranchNodeId = BranchVal.split("-")[0];
            var BranchNodeType = BranchVal.split("-")[1];
            var LoginId = $("#cphRight_hdnLoginId").val();
            window.open("../frmDownloadExcel.aspx?flg=1&flgStatus=" + flg + "&BranchCode=" + BranchCode + "&CycleId=" + CycleId + "&DownloadDate=" + DownloadDate + "&BranchNodeId=" + BranchNodeId + "&BranchNodeType=" + BranchNodeType + "&IsMappingType=" + IsMappingType + "&LoginId=" + LoginId);
        }

        function fnDownloadReport() {
            var BranchVal = $("#cphRight_ddlBranch").val();
            var BranchCode = $("#cphRight_ddlBranch option:selected").text();
            var BranchNodeId = BranchVal.split("-")[0];
            var BranchNodeType = BranchVal.split("-")[1];
            var IsMappingType = BranchVal.split("-")[2];
            var DownloadDate = new Date().localeFormat("yyyy MMM dd");
            window.open("../frmDownloadExcel.aspx?flg=2&BranchCode=" + BranchCode + "&DownloadDate=" + DownloadDate + "&BranchNodeId=" + BranchNodeId + "&BranchNodeType=" + BranchNodeType + "&IsMappingType=" + IsMappingType);
        }

        function fnDownloadFinalOrder(flg) {
            if (flg == 2) {
                var str = "Are you sure this is final download for today? Please note if Yes, telecaller will not be able to book any new orders and Telecalling day will be closed.<br/> Click yes to continue and no to exit.?";
                $("#dvDialog1")[0].innerHTML = str;
                $("#dvDialog1").dialog({
                    width: "auto",
                    height: "auto",
                    title: "Confirmation:",
                    modal: true,
                    buttons: {
                        "Yes": function () {
                            var flg = 2
                            $("#dvDialog1").dialog('close');
                            $("#dvDialog").dialog('close');
                            var BranchVal = $("#cphRight_ddlBranch").val();
                            var BranchCode = $("#cphRight_ddlBranch option:selected").text();
                            var BranchNodeId = BranchVal.split("-")[0];
                            var BranchNodeType = BranchVal.split("-")[1];
                            var IsMappingType = BranchVal.split("-")[2];
                            var LoginId = $("#cphRight_hdnLoginId").val();
                            window.open("../frmDownloadExcel.aspx?flg=1&flgStatus=" + flg + "&BranchCode=" + BranchCode + "&BranchNodeId=" + BranchNodeId + "&BranchNodeType=" + BranchNodeType + "&IsMappingType=" + IsMappingType + "&LoginId=" + LoginId);
                            setTimeout(fnRefreshDownloadedList, 5000);
                            setTimeout(fnStoreList, 5000);
                        },
                        "No": function () {
                            $(this).dialog('close');
                        },
                    }
                })
            } else {
                $("#dvDialog").dialog('close');
                var BranchVal = $("#cphRight_ddlBranch").val();
                var BranchCode = $("#cphRight_ddlBranch option:selected").text();
                var BranchNodeId = BranchVal.split("-")[0];
                var BranchNodeType = BranchVal.split("-")[1];
                var IsMappingType = BranchVal.split("-")[2];
                var flgType = $("#cphRight_hdnflg").val();
                var LoginId = $("#cphRight_hdnLoginId").val();
                window.open("../frmDownloadExcel.aspx?flg=1&flgStatus=" + flg + "&BranchCode=" + BranchCode + "&BranchNodeId=" + BranchNodeId + "&BranchNodeType=" + BranchNodeType + "&IsMappingType=" + IsMappingType + "&flgType=" + flgType + "&LoginId=" + LoginId);
                setTimeout(fnRefreshDownloadedList, 5000);
                setTimeout(fnStoreList, 5000);
            }
        }
        function fnDownloadOrder() {
            var strhtml = "<table><tr><td><fieldset style='border:1px solid #bbbbbb;padding:5px'><legend style='width:auto;margin-left:20px;margin-bottom:0px'>Download Orders</legend>";
            strhtml += "<table style='margin-top:-5px'><tr><td><input class='button' type='button' value='Final download For Today' onclick='fnDownloadFinalOrder(2)' /></td><td><input type='button' class='button' value='Incremental Orders' onclick='fnDownloadFinalOrder(1)' /></td></tr></table>";
            strhtml += "</fieldset></td><td style='vertical-align:bottom;padding-left:5px'><input type='button' value='Cancel' class='button' onclick=\"javascript: $('#dvDialog').dialog('close');\"></td></tr></table>";
            $("#dvDialog")[0].innerHTML = strhtml;
            $("#dvDialog").dialog({
                width: "auto",
                height: "auto",
                title:"Information:",
                modal: true
            })
        }

        function ajax_download(url) {
            var $iframe,
                iframe_doc,
                iframe_html;

            if (($iframe = $('#download_iframe')).length === 0) {
                $iframe = $("<iframe id='download_iframe'" +
                            " style='display: none' src='about:blank'></iframe>"
                           ).appendTo("body");
            }

            iframe_doc = $iframe[0].contentWindow || $iframe[0].contentDocument;
            if (iframe_doc.document) {
                iframe_doc = iframe_doc.document;
            }

            iframe_html = "<html><head></head><body><form method='POST' action='" +
                          url + "'></form>" +
                          "</body></html>";

            iframe_doc.open();
            iframe_doc.write(iframe_html);
            $(iframe_doc).find('form').submit();
        }
    </script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphLeft" runat="Server">
    
        <iframe id="fraLeft" name="fraLeft" height="100%" width="100%" scrolling="yes" frameborder="0"
            src='../frmLeftMainTreeView.aspx'></iframe>
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphRight" runat="Server" >
    <div id="dvFadeForProcessing" style="position: fixed; z-index: 9999999999999; display: none; top: 0; bottom: 0; left: 0; right: 0; opacity: .80; -moz-opacity: 0.8; filter: alpha(opacity=80); background-color: #ccc;">
        <div id="Div2" runat="server" align="center" style="position: absolute; width: 150px; top: 30%; left: 45%;">
            <img alt="" title="Loading..." src="../Images/blue-loading.gif" />
        </div>
    </div>
    <h4 id="h4header"><b id="lblHeader" runat="server">>>Branch Order Status List</b></h4>
    <div style="margin-top:10px;width:100%">
        <table id="tblhead" >

            <tr>
            
 <td style="width:60px"><b>Site List :</b> </td>
                <td style="width:205px">
                    <asp:DropDownList runat="server" ID="ddlSite" onchange="fnChangeSite(this)" CssClass="form-control"  style="border:1px solid #bbbbbb;width:200px" >
                    </asp:DropDownList></td>
                <td><b id="lblType" runat="server">Branch List :</b> </td>
                <td style="padding-left:10px;padding-right:10px">
                    <asp:DropDownList runat="server" ID="ddlBranch" onchange="fnChangeBranch(this)" CssClass="form-control"  style="border:1px solid #bbbbbb;width:100%" >
                    </asp:DropDownList></td>
                <td style="padding-left:20px;display:none">
                    <input type="button" value="Refresh Status" class="btn btn-primary" onclick="fnRefreshStatus()" id="btnRefershStatus" />
                </td>
            </tr>
        </table>
    </div>
    <div style="width:80%" id="divmainparent">
    <div id="divdrmmain"   style="overflow:auto;margin-top:5px;border:1px solid #ccc">

    </div>
        <div id="divbtns">
            <input type="button" value="Download Orders" onclick="fnDownloadOrder()" class="button" />
            <input type="button" value="Download Report" onclick="fnDownloadReport()" style='display:none' class="button" />
        </div>
   </div>
    <div id="divDownloadedList" style="width:42%;float:right">

    </div>
     
    <div id="dvDialog" style="display:none"></div>
    <div id="dvDialog1" style="display:none"></div>
    <asp:HiddenField runat="server" ID="hdnLoginId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnMenuId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnBranchCode" Value="0" />
    <asp:HiddenField runat="server" ID="hdnflg" Value="1" />
    
</asp:Content>

