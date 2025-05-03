<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" CodeFile="frmAutoTransferOrders.aspx.cs" Inherits="frmAutoTransferOrders" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">

    <link rel="stylesheet" href="../CSS/bootstrap.min.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="../scripts/jquery-3.6.0.js"></script>
    <link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jquery-ui.js"></script>
    <link href="../styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../scripts/validation.js"></script>
    <script src="../StylesTreeView/js/jquery.dataTables.js" type="text/javascript"></script>
    <link href="../StylesTreeView/Css/jquery.dataTables.css" rel="stylesheet" />
    <%--<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet">--%>
    <style>
        tr.clsHighlightrowsChangeRoute td {
            background-color: #ffff79;
        }

        tr.clsHighlightrows td {
            background-color: #ffd5d5;
        }

        tr.clsHighlightrowsNoAbsent td {
            background-color: #c1ff84;
        }


        .mainpanel {
            padding: 0px !important;
            font-family: Arial Narrow;
        }

        div.dataTables_scrollBody {
            overflow-y: scroll !important;
        }

        .iframe-placeholder {
            background: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100% 100%"><text fill="%23FF0000" x="50%" y="50%" font-family="\'Lucida Grande\', sans-serif" font-size="24" text-anchor="middle">Page is being loaded , please wait..</text></svg>') 0px 0px no-repeat;
        }

        .inner-addon {
            position: relative;
        }

        .leftMenu-headding {
            width: 235px !important;
        }

        /* style glyph */
        .inner-addon .glyphicon {
            position: absolute;
            padding: 10px;
            pointer-events: none;
        }

        /* align glyph */
        .left-addon .glyphicon {
            left: 0px;
        }

        .right-addon .glyphicon {
            right: 0px;
        }

        /* add padding  */
        .left-addon input {
            padding-left: 30px;
        }

        .right-addon input {
            padding-right: 30px;
        }

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
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            padding-top: 10px;
            padding-left: 5px;
            margin-top: 0 !important;
            margin-bottom: 0 !important;
            text-shadow: 2px 2px 2px #333333;
            filter: progid:DXImageTransform.Microsoft.DropShadow(offX=2,offY=2,color=333333);
        }

        div.dataTables_scrollBody {
            overflow-x: hidden !important;
        }

        .dataTables_scroll {
        }

        .dataTables_wrapper.no-footer .dataTables_scrollBody {
            border-bottom: none !important;
        }

        table.dataTable > tbody tr > td {
            padding: 2px 4px 2px 4px !important;
            vertical-align: middle;
            border-left: 1px solid #ccc !important;
            border-bottom: 1px solid #ccc !important;
        }

        table.dataTable > thead > tr > th, table.dataTable > thead > tr > td {
            padding: 2px 4px 2px 4px !important;
            vertical-align: middle;
            border-left: 1px solid #ccc;
            border-top: none !important;
            border-bottom: none !important;
        }

        table.dataTable > tfoot > tr > th, table.dataTable > tfoot > tr > td {
            padding: 2px 4px 2px 4px !important;
        }

        table.dataTable > tbody > tr {
            background-color: none !important;
        }
    </style>
    <style>
        .custom-combobox {
            position: relative;
            display: inline-block;
            height: 35px;
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
            background: #fff;
            outline: none;
            width: 330px;
            height: 35px;
        }
    </style>



    <script>
        var StoreList = [];
        $(document).ready(function () {
            $('#fraLeft').load(function () {
                $("#fraLeft").contents().find("#DvMenu").find("li").removeClass("activemenu");
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='53']").addClass("activemenu");
                $("#fraLeft")[0].height = $(window).height() - ($("#dvBanner").height() + $(".footer").height());
            });

            //$(document).data("BranchData", $("#cphRight_ddlBranch").clone());
            //$("#cphRight_ddlBranch option").remove();
            //$("#cphRight_ddlBranch").html("<option value='0-0'>------<option>");
            //$("#cphRight_ddlBranch option").eq(1).remove();

            //if ($("#cphRight_ddlSite option").length == 1) {

            //    var val = $("#cphRight_ddlSite").val();
            //    var options = $(document).data("BranchData").clone();
            //    $("#cphRight_ddlBranch option").remove();
            //    $("#cphRight_ddlBranch").html("<option value='0-0'>------<option>");
            //    $(options).find("option[sitenodeid='" + val + "']").appendTo($("#cphRight_ddlBranch"));
            //    $("#cphRight_ddlBranch option").eq(1).remove();
            //    if ($("#cphRight_ddlBranch option").length == 2) {
            //        $("#cphRight_ddlBranch option[value='0-0']").remove();
            //        fnDSEList();
            //    }
            //}
            fnDSEList();
            $('#txtFindDbr').keyup(function () {
                var val = $(this).val().toUpperCase();
                $("#tbldbrlist").find("tbody").eq(0).find("tr").css("display", "none");

                var tbl = $("#tbldbrlist>tbody>tr");
                var tr;
                for (var i = 0; i < tbl.length; i++) {
                    tr = $(tbl[i]);
                    for (var j = 0; j < $(tr).find("td").length; j++) {
                        if ($(tr).find("td").eq(j).attr("Searchable") == "1") {
                            var tdText = $(tr).find("td").eq(j).html().toUpperCase();
                            if (tdText.indexOf(val) > -1) {
                                $(tr).css("display", "table-row");
                            }
                        }
                    }
                }
            });
        });


        function AddParameter(form, name, value) {
            var $input = $("<input />").attr("type", "hidden")
                                .attr("name", name)
                                .attr("value", value);
            form.append($input);
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


        function fnUpdateLastCallOrderDate(StoreId, LastCallDate, LastOrderDate, Status) {
            $("#tbldbrlist").find("tbody").find("tr[storeid=" + StoreId + "]").find("td").eq(6).html(Status);
            $("#tbldbrlist").find("tbody").find("tr[storeid=" + StoreId + "]").find("td").eq(9).html(LastCallDate);

        }
        function fnRefreshStatus() {

            fnDSEList();
        }
        function appendLeadingZeroes(n) {
            if (n <= 9) {
                return "0" + n;
            }
            return n
        }




        var arrRouteData = []; var arrSectorData = [];
        function fnDSEList() {
            //var BranchVal = $("#cphRight_ddlBranch").val();
            //var BranchNodeId = BranchVal.split("-")[0];
            //var BranchNodeType = BranchVal.split("-")[1];



            var LoginId = $("#cphRight_hdnLoginId").val();
            var MId = $("#cphRight_hdnMenuId").val();
            $("#dvFadeForProcessing").show();
            PageMethods.fnDSEList(LoginId, function (result) {
                $("#dvFadeForProcessing").hide();
                $("#divBTNS").find("a").hide();
                if (result.split("|")[0] == "2") {
                    alert("Error-" + result.split("|")[1]);
                } else if (result == "") {
                    $("#divdrmmain")[0].innerHTML = "No Record(s) Found!!!";
                }
                else {
                    $("#divBTNS").show();
                    $("#divdrmmain")[0].innerHTML = result.split("|")[0];

                    fntblFixedHeader();
                    $("#anchorbtn2").find("div").html("Save");
                    $("#anchorbtn2").show();
                }

               
                for (var i = 0; i < $("#tbldbrlist input[type='checkbox']:checked").length; i++) {
                    var ddls = $("#tbldbrlist input[type='checkbox']:checked").eq(i).closest("tr").find("select");
                    var StartTime = $(ddls[0]).attr("StartTime");
                    var EndTime = $(ddls[1]).attr("EndTime");
                    var Interval = $(ddls[2]).attr("Interval");
                   
                    $(ddls[0]).find("option[value='" + StartTime.split(":")[0] + "']").prop("selected", true);
                    fnChangeStartTime(ddls[0]);
                    $(ddls[1]).find("option[value='" + EndTime.split(":")[0] + "']").prop("selected", true);
                    $(ddls[2]).find("option[value='" + Interval + "']").prop("selected", true);
                }


            },
            function (result) {
                $("#dvFadeForProcessing").hide();
                alert("Error-" + result._message);
            }
            )


        }
        function fntblFixedHeader() {
            var thead = $("#tbldbrlist").find("thead").eq(0).html();
            $("#divfixedHeader").html("<table id='tbl_Status_fixedhead' cellspacing='0' style='font-size:8pt'><thead>" + thead + "</thead><tbody></tbody></table>");
            for (i = 0; i < $("#tbldbrlist thead").find("th").length; i++) {
                $("#tbl_Status_fixedhead").find("th").eq(i).css("width", $("#tbldbrlist thead").find("th")[i].offsetWidth);
                // $("#tbldbrlist thead").find("th").eq(i).css("width", $("#tbldbrlist thead").find("th")[i].offsetWidth);
            }
            $("#tbl_Status_fixedhead th").eq(0).css("height", $("#tbldbrlist thead th").eq(0).height());
            $("#divfixedHeader").css("width", $("#divdrmmain")[0].clientWidth);
            $("#divHeadercont").css("width", $("#divdrmmain")[0].clientWidth);

        }





        function fnSaveFinalData() {
            if ($("#tbldbrlist").length == 0) {
                alert("Sorry,No data available for this action!!!")
                return false;
            }

            var $checked = $("#tbldbrlist").find("input[type='checkbox']");
            //if (tbl.length == 0) {
            //    alert("Kindly select atleast one Branch Inventory for this action!!!")
            //    return false;
            //}

            $("#dvFadeForProcessing").show();

            var personIds = "";
            var arrDSENodeID = new Array();

            for (var i = 0; i < $checked.length; i++) {
                var brnnodeid = $checked.eq(i).closest("tr").attr("brnnodeid");
                var brnnodetype = $checked.eq(i).closest("tr").attr("brnnodetype");
                var RefNodeId = 0;
                var RefNodeType = 0;
                if ($checked.eq(i).is(":checked")) {
                    var flgUseSystemPrice = $checked.eq(i).closest("tr").find("input[type='checkbox'][flg=2]:checked").length;
                    if ($checked.eq(i).closest("tr").find("select").eq(0).val() == 0) {
                        $("#dvFadeForProcessing").hide();
                        alert("Select Start Time First!");
                        $checked.eq(i).closest("tr").find("select").eq(0).focus();
                        return false;
                    }

                    if ($checked.eq(i).closest("tr").find("select").eq(1).val() == 0) {
                        $("#dvFadeForProcessing").hide();
                        alert("Select End Time First!");
                        $checked.eq(i).closest("tr").find("select").eq(1).focus();
                        return false;
                    }

                    if ($checked.eq(i).closest("tr").find("select").eq(2).val() == 0) {
                        $("#dvFadeForProcessing").hide();
                        alert("Select Interval First!");
                        $checked.eq(i).closest("tr").find("select").eq(2).focus();
                        return false;
                    }

                    arrDSENodeID.push({ BranchNodeId: brnnodeid, BranchNodeType: brnnodetype, flgAutoTrnsfrOrd: 1, TrnsStartTime: $checked.eq(i).closest("tr").find("select").eq(0).val() + ":00 PM", TrnsEndTime: $checked.eq(i).closest("tr").find("select").eq(1).val() + ":00 PM", TrnsInterVal: $checked.eq(i).closest("tr").find("select").eq(2).val() });



                } else {
                    RefNodeId = 0;
                    RefNodeType = 0;
                    arrDSENodeID.push({ BranchNodeId: brnnodeid, BranchNodeType: brnnodetype, flgAutoTrnsfrOrd: 0, TrnsStartTime: "00:00", TrnsEndTime: "00:00", TrnsInterVal: 0 });
                }
              

                
            }
            if (arrDSENodeID.length == 0) {
                $("#dvFadeForProcessing").hide();
                alert("No Data Available for this action!");
                return false;
            }


            var LoginId = $("#cphRight_hdnLoginId").val();
          
            PageMethods.fnManageBranchInvMapping(LoginId, arrDSENodeID, function (result) {
                $("#dvFadeForProcessing").hide();
                if (result.split("|")[0] == "2") {
                    alert("Error:" + result.split("|")[1]);
                } else {
                    alert("Saved Successfully!!");
                }
            },
            function (result) {
                $("#dvFadeForProcessing").hide();
                alert(result._message)
            }
            )
        }

        function fnChangeStartTime(sender) {
            var val = $(sender).val();
            $(sender).closest("tr").find("select").eq(1).find("option").removeAttr("disabled");
            for (var i = 0; i < $(sender).closest("tr").find("select").eq(1).find("option").length; i++) {
                if ($(sender).closest("tr").find("select").eq(1).find("option").eq(i).val() != 0) {
                    if ($(sender).closest("tr").find("select").eq(1).find("option").eq(i).val() < val) {
                        $(sender).closest("tr").find("select").eq(1).find("option").eq(i).attr("disabled", "disabled");
                    }
                }
            }
            $(sender).closest("tr").find("select").eq(1).find("option").eq(0).prop("selected", true);
        }

        function fnChangeAutoTransfer(sender) {
            if ($(sender).is(":checked")) {
                $(sender).closest("tr").find("select").prop("disabled", false);
                $(sender).closest("tr").find("select option").eq(0).prop("selected", true);
            } else {
                $(sender).closest("tr").find("select").prop("disabled", true);
                $(sender).closest("tr").find("select option").eq(0).prop("selected", true);
            }
        }

        function fnChangeHub(sender) {
            if ($(sender).is(":checked")) {
                $(sender).closest("td").find("select").prop("disabled", false);
            } else {
                $(sender).closest("td").find("select").prop("disabled", true);
                $(sender).closest("td").find("select option").eq(0).prop("selected", true);
            }
        }
    </script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphLeft" runat="Server">

    <iframe id="fraLeft" name="fraLeft" height="100%" width="100%" scrolling="yes" frameborder="0"
        src='../frmLeftMainTreeView.aspx'></iframe>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphRight" runat="Server">
    <div id="dvFadeForProcessing" style="position: fixed; z-index: 9999999999999; display: none; top: 0; bottom: 0; left: 0; right: 0; opacity: .80; -moz-opacity: 0.8; filter: alpha(opacity=80); background-color: #ccc;">
        <div id="Div2" runat="server" align="center" style="position: absolute; width: 150px; top: 30%; left: 45%;">
            <img alt="" title="Loading..." src="../Images/blue-loading.gif" />
        </div>
    </div>
    <div style="margin-left: 0px; padding-bottom: 5px; position: fixed; z-index: 1; width: 100%; background-color: #ffffff" id="divHeadercont">
        <h4 id="h4header">>>Enable Auto Transfer Orders Mapping</h4>
        <div style="margin-top: 10px; width: 100%">
            <table id="tblhead" style="width: 100%">
                <tr>
                    <td>
                        <div class="input-group" style="width: 170px">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>
                            <input type="text" class="form-control" placeholder="Search" name="search" id="txtFindDbr">
                        </div>
                    </td>


                </tr>
            </table>
        </div>
    </div>
    <div style="padding-top: 80px; margin-bottom: 40px" id="divtblContain">
        <div id="divfixedHeader" style="position: fixed; z-index: 1"></div>
        <div id="divdrmmain" style="width: 880px">
        </div>
    </div>

    <div class="blockButtons" id="divBTNS" style="display: none; width: 100%; bottom: 0; position: fixed; padding-top: 1px; background-color: #cfcfcf;">
        <table style="width: 100%">
            <tr>
                <td>
                    <a href="###" class="icon-bnt" onclick="fnSaveFinalData()" id="anchorbtn2"><span class="PostOrder"></span>
                        <div style="font-size: 7.8pt; width: 75px; line-height: 28px">Save</div>
                    </a>

                </td>
                <td></td>
            </tr>
        </table>
    </div>
    <div id="dvDialog" style="display: none"></div>
    <div id="dvDialogMarkPresent" style="display: none"></div>
    <asp:HiddenField runat="server" ID="hdnLoginId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnMenuId" Value="0" />

</asp:Content>

