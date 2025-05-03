<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" CodeFile="frmRptTaskExtractData.aspx.cs" Inherits="RptTaskExtractData" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="../scripts/jquery-3.6.0.js"></script>
    <link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />
    <link href="../styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../scripts/jquery-ui.js"></script>
    <link href="../css/jquery.dataTables.min.css" rel="stylesheet" />
    <script src="../scripts/js/jquery.dataTables.min.js"></script>
    <script src="../scripts/dataTables.fixedColumns.min.js"></script>
    <script src="../scripts/dataTables.rowsGroup.js"></script>
    <style>
        .ui-datepicker select.ui-datepicker-month, .ui-datepicker select.ui-datepicker-year {
            width: 49%;
            color: black !important;
        }

        img {
            vertical-align: middle;
        }

        .mainpanel {
            padding: 0px !important;
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

        .ui-multiselect span.ui-icon {
            float: right;
            background-color: #F1F1F1;
            border: none !important;
            margin-top: -0.3px !important;
            margin-right: 1.3px !important;
        }
        /*button {
            height:22px !important;
        }*/
        label {
            font-weight: normal !important;
            font-size: 8pt !important;
        }

        input[type=text] {
            height: 21px;
            font-size: 8.5pt;
        }

        .ui-multiselect-filter input {
            color: #000000;
        }

        /*div.dataTables_scrollBody {
            overflow-x: hidden !important;
        }

        .dataTables_scroll {
        }*/

        .dataTables_wrapper.no-footer .dataTables_scrollBody {
            border-bottom: none !important;
        }

        table.dataTable > tbody tr > td {
            vertical-align: middle;
            border-left: 1px solid #ccc !important;
            border-bottom: 1px solid #ccc !important;
        }

        table.dataTable > thead > tr > th, table.dataTable > thead > tr > td {
            vertical-align: middle;
            border-left: 1px solid #ccc;
            border-top: 1px solid #ccc;
            border-bottom: none !important;
        }

        table.dataTable > tfoot > tr > th, table.dataTable > tfoot > tr > td {
            padding: 2px 4px 2px 4px !important;
        }

        table.dataTable > tbody > tr {
            background-color: none !important;
        }
    </style>



    <script>
        var StoreList = [];
        $(document).ready(function () {
            $('#fraLeft').load(function () {
                $("#fraLeft").contents().find("#DvMenu").find("li").removeClass("activemenu");
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='57']").addClass("activemenu");
                $("#fraLeft")[0].height = $(window).height() - ($("#dvBanner").height() + $(".footer").height());
            });
            detectmob();

            $("#divbtns").hide();

            $(document).data("BranchData", $("#cphRight_ddlBranch").clone());
            $("#cphRight_ddlBranch option").remove();
            $("#cphRight_ddlBranch").html("<option value='0-0'>ALL<option>");
            $("#cphRight_ddlBranch option").eq(1).remove();
            var val = $("#cphRight_ddlSite").val();
            var options = $(document).data("BranchData").clone();
            $("#cphRight_ddlBranch option").remove();
            $("#cphRight_ddlBranch").html("<option value='0-0'>ALL<option>");
            $(options).find("option[sitenodeid='" + val + "']").appendTo($("#cphRight_ddlBranch"));
            $("#cphRight_ddlBranch option").eq(1).remove();
            if ($("#cphRight_ddlBranch option").length == 2) {
                $("#cphRight_ddlBranch option[value='0-0']").remove();
            }
            var d = new Date();
            d.setDate(d.getDate('<%=DateTime.Now%>'));
            $("#txtDate").val(d.localeFormat('dd-MMM-yyyy'))
            $("#txtDate").datepicker({
                dateFormat: 'dd-M-yy',
                changeMonth: true,
                changeYear: true,
                showOn: "button",
                buttonImage: "../images/calender.jpg",
                buttonImageOnly: true,
                buttonText: "Select date",
                onClose: function (selectedDate) {
                    $("#txtToDate").datepicker("option", "minDate", selectedDate);
                }
            });
           
            // $("#divMainData").css("width", (screen.width-75)+"px");
            //fnShowReport(0);
        });

        function fnChangeSite(sender) {
            var val = $(sender).val();
            var options = $(document).data("BranchData").clone();
            $("#cphRight_ddlBranch option").remove();
            $("#cphRight_ddlBranch").html("<option value='0-0'>ALL<option>");
            $(options).find("option[sitenodeid='" + val + "']").appendTo($("#cphRight_ddlBranch"));
            $("#cphRight_ddlBranch option").eq(1).remove();
           // fnShowReport(0);
        }

        function fnChangeBranch(sender) {
            flgLoad = 1;
           // fnShowReport(0);
        }
        function fnDownloadReport() {
            var sDate = $("#txtDate").val();
            var eDate = $("#txtToDate").val();
            window.open("../frmDownloadExcel.aspx?flg=5&sDate=" + sDate + "&eDate=" + eDate);
        }

        function fnShowReport(flgExcel) {
            var sDate = $("#txtDate").val();
            var LoginId = $("#cphRight_hdnLoginId").val();

            var Sitestr = $("#cphRight_ddlSite").val();
            var NodeId = Sitestr.split("-")[0];
            var NodeType = Sitestr.split("-")[1];

            var BranchVal = $("#cphRight_ddlBranch").val();
            var BranchNodeId = BranchVal.split("-")[0];
            var BranchNodeType = BranchVal.split("-")[1];
           
            window.open("../frmDownloadExcel.aspx?flg=21&SiteNodeId=" + NodeId + "&SiteNodeType=" + NodeType + "&BranchNodeId=" + BranchNodeId + "&BranchNodeType=" + BranchNodeType + "&RptDate=" + sDate);
        }



        function fntblFixedHeader() {
            var table = $("#tbldbrlist").DataTable({
                scrollY: "54vh",
                scrollX: true,
                scrollCollapse: true,
                paging: false,
                "ordering": false,
                "info": false,
                "bFilter": false,
                "rowHeight": 'auto',
            });
        }

        function detectmob() {
            var IsMobileDevice = "<%=Request.Browser.IsMobileDevice%>";
            if (IsMobileDevice != "False") {
                $("#divFilter").hide();

                $("#divHeadercont").css({
                    "position": "relative",
                    "width": "100%"
                });
                $("#divfixedHeader").css({
                    "position": "relative"
                });
                $("#divMainData").css({
                    "padding-top": "0px"
                });
                $("#divbtn").css("width", "100%");
                $("#cphRight_ddlSite").css("width", "auto");
                $("#cphRight_ddlBranch").css("width", "auto");
                $(".container").css({
                    "padding-left": "2px",
                    "padding-right": "2px"
                });
                return true;
            } else {
                $("#divFilterbtn").hide();
                return false;
            }
        }
        function fnShowhidediv() {
            $("#divFilter").toggle();
        }
        function fnSetDateInHiddenField() {
            $("#cphRight_hdnNodeId").val("0");
            $("#cphRight_hdnNodeType").val("0");
            $("#cphRight_hdnFromDate").val($("#txtDate").val());
            $("#cphRight_hdnToDate").val($("#txtToDate").val());
        }
        function fnSetDateInHiddenFieldSite() {
            var Sitestr = $("#cphRight_ddlSite").val();
            var NodeId = Sitestr.split("-")[0];
            var NodeType = Sitestr.split("-")[1];
            var BranchVal = $("#cphRight_ddlBranch").val();
            var BranchNodeId = BranchVal.split("-")[0];
            var BranchNodeType = BranchVal.split("-")[1];
            if (BranchNodeId > 0) {
                NodeId = BranchNodeId;
                NodeType = BranchNodeType;
            }
            $("#cphRight_hdnNodeId").val(NodeId);
            $("#cphRight_hdnNodeType").val(NodeType);

            $("#cphRight_hdnFromDate").val($("#txtDate").val());
            $("#cphRight_hdnToDate").val($("#txtToDate").val());

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
    <div style="margin-left: 0px; padding-bottom: 10px; position: fixed; z-index: 1; width: 96%; background-color: #ffffff" id="divHeadercont">
        <h4 id="h4header" style="font-size: 12px">>>TAS Task Extract Download</h4>
        <div style="margin-top: 2px;">
            <div class="row" id="divFilter">
                <div class="col-md-2">
                    <table style="display: inline-block">
                        <tr>
                            <td style="width: 70px">
                                <b>Task Date</b>
                            </td>
                            <td style="width: 5px">:
                            </td>
                            <td>
                                <input type="text" id="txtDate" style="width: 80px" readonly />
                            </td>
                        </tr>
                    </table>
                </div>
              
                <div class="col-md-3">
                    <table style="display: inline-block">
                        <tr>
                            <td style="width: 70px">
                                <b>Site List</b>
                            </td>
                            <td style="width: 5px">:
                            </td>
                            <td>
                                <asp:DropDownList runat="server" ID="ddlSite" AutoPostBack="false" onchange="fnChangeSite(this)" Style="border: 1px solid #bbbbbb; width: 180px">
                                </asp:DropDownList>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-3">
                    <table style="display: inline-block">
                        <tr>
                            <td style="width: 70px">
                                <b id="lblType" runat="server">Branch List</b>
                            </td>
                            <td style="width: 5px">:
                            </td>
                            <td>
                                <asp:DropDownList runat="server" ID="ddlBranch" AutoPostBack="false" onchange="fnChangeBranch(this)" Style="border: 1px solid #bbbbbb; width: 170px">
                                </asp:DropDownList>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-3">
                    <div class="text-center" id="divbtn" style="padding-top: 2px; float: left;">
                        <input type="button" class="btn btn-primary" style="padding: 3px 4px; font-size: 12px" value="Download Extract" onclick="fnShowReport(0)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div style="padding-top: 80px;" class="table-responsive " id="divMainData">
    </div>

    <asp:HiddenField runat="server" ID="hdnLoginId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnMenuId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnBranchCode" Value="0" />
    <asp:HiddenField runat="server" ID="hdnFromDate" Value="0" />
    <asp:HiddenField runat="server" ID="hdnToDate" Value="0" />

    <asp:HiddenField runat="server" ID="hdnNodeId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnNodeType" Value="0" />

</asp:Content>

