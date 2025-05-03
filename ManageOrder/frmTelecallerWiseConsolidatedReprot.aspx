<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" EnableEventValidation="false" AutoEventWireup="true" CodeFile="frmTelecallerWiseConsolidatedReprot.aspx.cs" Inherits="frmTelecallerWiseConsolidatedReprot" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="../scripts/jquery-3.6.0.js"></script>
    <link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />
    <script src="../scripts/jquery-ui.js"></script>
    <link href="../styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../StylesTreeViewOrder/js/custom-script.js" type="text/javascript"></script>
    <script src="../scripts/validation.js"></script>
    <script src="../StylesTreeView/js/jquery.dataTables.js" type="text/javascript"></script>
    <link href="../StylesTreeView/Css/jquery.dataTables.css" rel="stylesheet" />
    <%--<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet">--%>
    <style>
.ui-datepicker .ui-datepicker-title {
    margin: 0 2.3em;
    line-height: 1.8em;
    text-align: center;
color:black;
}
        .mainpanel {
            padding: 0px !important;
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
        var StoreList = []; var flgLoad = 0;
        $(document).ready(function () {
            $('#fraLeft').load(function () {
                $("#fraLeft").contents().find("#DvMenu").find("li").removeClass("activemenu");
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='" + $("#cphRight_hdnMenuId").val() + "']").addClass("activemenu");
                $("#fraLeft")[0].height = $(window).height() - ($("#dvBanner").height() + $(".footer").height());
            });
            $("#divbtns").hide();
            detectmob();
            $("#txtDate").val(new Date().localeFormat('dd-MMM-yyyy'))
            $("#txtDate").datepicker({
                dateFormat: 'dd-M-yy',
                changeMonth: true,
                changeYear: true,
                showOn: "button",
                buttonImage: "../images/calender.jpg",
                buttonImageOnly: true,
                buttonText: "Select date",
            })

            $(document).data("BranchData", $("#cphRight_ddlBranch").clone());
            $("#cphRight_ddlBranch option").remove();
            $("#cphRight_ddlBranch").html("<option value='0-0'>ALL<option>");
            $("#cphRight_ddlBranch option").eq(1).remove();

            //if ($("#cphRight_ddlSite option").length == 1) {
                var val = $("#cphRight_ddlSite").val();
                var options = $(document).data("BranchData").clone();
                $("#cphRight_ddlBranch option").remove();
                $("#cphRight_ddlBranch").html("<option value='0-0'>ALL<option>");
                $(options).find("option[sitenodeid='" + val + "']").appendTo($("#cphRight_ddlBranch"));
                $("#cphRight_ddlBranch option").eq(1).remove();
                if ($("#cphRight_ddlBranch option").length == 2) {
                    $("#cphRight_ddlBranch option[value='0-0']").remove();
                }

           // }
            fnStoreList();
        });


        function fnChangeSite(sender) {
            var val = $(sender).val();
            var options = $(document).data("BranchData").clone();
            $("#cphRight_ddlBranch option").remove();
            $("#cphRight_ddlBranch").html("<option value='0-0'>ALL<option>");
            $(options).find("option[sitenodeid='" + val + "']").appendTo($("#cphRight_ddlBranch"));
            $("#cphRight_ddlBranch option").eq(1).remove();
            fnStoreList();
        }

        function fnChangeBranch(sender) {
            flgLoad = 1;
                fnStoreList();
        }
        function fnStoreList() {
            var Sitestr = $("#cphRight_ddlSite").val();
            var SiteId = Sitestr.split("-")[0];
            var SiteTypeId = Sitestr.split("-")[1];
            var BranchVal = $("#cphRight_ddlBranch").val();
            var BranchNodeId = BranchVal.split("-")[0];
            var BranchNodeType = BranchVal.split("-")[1];
            var LoginId = $("#cphRight_hdnLoginId").val();
            var MId = $("#cphRight_hdnMenuId").val();
            var flg = $("#cphRight_hdnflg").val();
            var RouteDate = $("#txtDate").val();
            $("#dvFadeForProcessing").show();
            PageMethods.fnBranchOrderStatusList(LoginId, BranchNodeId, BranchNodeType, SiteId, SiteTypeId, RouteDate,flg, function (result) {
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
                    if (IsMobile != true) {
                            fntblFixedHeader();
                    }
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
            //$("#tbldbrlist thead")
            $("#divfixedHeader").css("width", $("#divdrmmain")[0].clientWidth);
            //$("#divdrmmain").css("width", $("#divfixedHeader")[0].clientWidth);
            $("#divHeadercont").css("width", $("#divdrmmain")[0].clientWidth);

        }

        function fnDownloadReport() {
            var Sitestr = $("#cphRight_ddlSite").val();
            var BranchVal = $("#cphRight_ddlBranch").val();
            var BranchCode = $("#cphRight_ddlBranch option:selected").text();
            var BranchNodeId = BranchVal.split("-")[0];
            var BranchNodeType = BranchVal.split("-")[1];
            var DownloadDate = $("#txtDate").val();
            var SiteId = Sitestr.split("-")[0];
            var SiteTypeId = Sitestr.split("-")[1];
            var LoginId = $("#cphRight_hdnLoginId").val();
            var flgType = $("#cphRight_hdnflg").val();
            window.open("../frmDownloadExcel.aspx?flg=2&BranchCode=" + BranchCode + "&DownloadDate=" + DownloadDate + "&BranchNodeId=" + BranchNodeId + "&BranchNodeType=" + BranchNodeType + "&SiteNodeId=" + SiteId + "&SiteNodeType=" + SiteTypeId + "&LoginId=" + LoginId + "&flgType=" + flgType);
        }


    </script>
    <script>
        var IsMobile = false;
        $(document).ready(function () {
            $('#txtFindDbr').keyup(function () {
                var val = $(this).val().toUpperCase();
                $("#tbldbrlist").find("tbody").eq(0).find("tr").css("display", "none");

                var tbl = $("#tbldbrlist>tbody>tr");
                var tr;
                for (var i = 0; i < tbl.length; i++) {
                    tr = $(tbl[i]);
                    for (var j = 0; j < $(tr).find("td").length; j++) {
                        //if ($(tr).find("td").eq(j).attr("Searchable") == "1") {
                        var tdText = $(tr).find("td").eq(j).html().toUpperCase();
                        if (tdText.indexOf(val) > -1) {
                            $(tr).css("display", "table-row");
                        }
                        //}
                    }
                }
                if (IsMobile != true) {
                    fntblFixedHeader();
                }
            });
        });
        function detectmob() {
            var IsMobileDevice = "<%=Request.Browser.IsMobileDevice%>";
             if (IsMobileDevice != "False") {
                 //$("#divFilter").hide();
                 $("div[flg='divfilter']").hide();
                 $("#divHeadercont").css({
                     "position": "relative"
                 });
                 $("#divfixedHeader").css({
                     "position": "relative"
                 });
                 $("#divtblContain").css({
                     "padding-top": "0px"
                 });
                 $("#divbtn").css("width", "100%");
                 $("#divsearch").css("width", "100%");
                 IsMobile = true;
                 return true;
             } else {
                 $("#divFilterbtn").hide();
                 IsMobile = false;
                 return false;
             }
         }
         function fnShowhidediv() {
             $("div[flg='divfilter']").toggle();
         }

    </script>
    <style>
        .form-control {
            padding-right: 30px;
        }

            .form-control + .glyphicon {
                position: absolute;
                right: 0;
                padding: 8px 27px;
            }
    </style>
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
    <div style="margin-left: 0px; position: fixed; z-index: 1; width: 100%; background-color: #ffffff" id="divHeadercont">
        <h4 id="h4header"><b id="lblHeader" runat="server">>>Daily Branch Consolidated Report</b></h4>
        <div style="margin-top: 2px;">
            <div style="display: block" id="divFilterbtn">
                <a href="#" onclick="fnShowhidediv()" class="btn btn-info btn-lg" style="padding: 4px 5px; font-size: 14px">
                    <span class="glyphicon glyphicon-filter"></span>Filter 
                </a>
            </div>
            <div class="row" id="divFilter" style="padding:9px">
                <div class="col-md-2" flg="divfilter">
                    <table style="display: inline-block">
                        <tr>
                            <td style="width: 67px">
                                <b>Date</b>
                            </td>
                            <td style="width: 10px">:
                            </td>
                            <td>
                                <input type="text" id="txtDate" style="width: 80px" readonly />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-3" flg="divfilter">
                    <table style="display: inline-block">
                        <tr>
                            <td style="width: 80px">
                                <b>Site List</b>
                            </td>
                            <td style="width: 10px">:
                            </td>
                            <td>
                                <asp:DropDownList runat="server" ID="ddlSite" onchange="fnChangeSite(this)" Style="border: 1px solid #bbbbbb; width: 190px">
                                </asp:DropDownList>
                            </td>
                        </tr>
                    </table>
                </div>

                <div class="col-md-3" flg="divfilter">
                    <table style="display: inline-block">
                        <tr>
                            <td style="width: 80px">
                                <b id="lblType" runat="server">Branch List</b> 
                            </td>
                            <td style="width: 10px">:
                            </td>
                            <td>
                                <asp:DropDownList runat="server" ID="ddlBranch" AutoPostBack="false" onchange="fnChangeBranch(this)" Style="border: 1px solid #bbbbbb; width: 200px">
                                </asp:DropDownList>
                            </td>
                        </tr>
                    </table>
                </div>
                <div flg="divfilter" class="text-center" id="divbtn" style="padding-top: 2px; float: left;">
                    <%--<input type="button" value="Show Report" class="btn btn-primary" onclick="fnStoreList()" id="btnShow" style="padding: 3px 4px; font-size: 12px" />--%>
                    <input type="button" value="Download Report" class="btn btn-primary" onclick="fnDownloadReport()" style="padding: 3px 4px; font-size: 12px" id="btnRefershStatus" />
                </div>
                <div class="input-group" style="margin-left: 6px;display: inline-block; margin-left: 5px" id="divsearch">
                    <input type="text" class="form-control" placeholder="Search" name="search" id="txtFindDbr">
                </div>
            </div>
        </div>
    </div>
    <div style="padding-top: 88px;width:100%" id="divtblContain">
        <div id="divfixedHeader" style="margin-left: 0px; position: fixed; z-index: 1"></div>
        <div id="divdrmmain" style="width:100%">
        </div>
    </div>

    <div id="dvDialog" style="display: none"></div>
    <div id="dvDialog1" style="display: none"></div>
    <asp:HiddenField runat="server" ID="hdnLoginId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnMenuId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnBranchCode" Value="0" />
    <asp:HiddenField runat="server" ID="hdnflg" Value="1" />

</asp:Content>

