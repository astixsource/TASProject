<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" CodeFile="frmDailyPerformanceReport.aspx.cs" Inherits="frmDailyPerformanceReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="../scripts/jquery-3.6.0.js"></script>
    <link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />
    <link href="../styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/Multiselect/jquery.multiselect.css" rel="stylesheet" />
    <link href="../Styles/Multiselect/jquery.multiselect.filter.css" rel="stylesheet" />
    <script src="../Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../scripts/jquery-ui.js"></script>
    <script src="../scripts/Multiselect/jquery.multiselect.js"></script>
    <script src="../scripts/Multiselect/jquery.multiselect.filter.js"></script>

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
        .ui-multiselect-checkboxes{
            height:208px !important;
        }
        body {
            overflow-y:scroll !important;
        }
       button.ui-multiselect {
            width:180px !important;
        }
       .row {
     margin-right:0px !important;
     margin-left: 0px !important;
}
    </style>



    <script>
        var StoreList = [];
        $(document).ready(function () {
            $('#fraLeft').load(function () {
                $("#fraLeft").contents().find("#DvMenu").find("li").removeClass("activemenu");
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='21']").addClass("activemenu");
                $("#fraLeft")[0].height = $(window).height() - ($("#dvBanner").height() + $(".footer").height());
            });
            
            //$("#divbtn").hide();

            $("#cphRight_ddlSite").multiselect().multiselectfilter();
            $("#cphRight_ddlReason").multiselect();
            detectmob();
            var RoleId = $("#cphRight_hdnRoleId").val();
            if (RoleId == 11) {
                $("#cphRight_ddlSellerType option").eq(1).prop("selected", true);
            }
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
            //        fnStoreList();
            //        fnRefreshDownloadedList();
            //    }
            //}
            $("#txtDate").val(new Date().localeFormat('dd-MMM-yyyy'))
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
            $("#txtToDate").val(new Date().localeFormat('dd-MMM-yyyy'))
            $("#txtToDate").datepicker({
                dateFormat: 'dd-M-yy',
                minDate: $("#txtDate").val(),
                changeMonth: true,
                changeYear: true,
                showOn: "button",
                buttonImage: "../images/calender.jpg",
                buttonImageOnly: true,
                buttonText: "Select date",
            });

            fnShowReport(0);
        });





        function fnDownloadReport() {
            var sDate = $("#txtDate").val();
            var eDate = $("#txtToDate").val();
            window.open("../frmDownloadExcel.aspx?flg=5&sDate=" + sDate + "&eDate=" + eDate);
        }

        function fnShowReport(flgExcel) {
            var sDate = $("#txtDate").val();
            var eDate = $("#txtToDate").val();
            var LoginId = $("#cphRight_hdnLoginId").val();
            var ViewType = $("#ddlViewType").val();
            var SiteNodeIds =""
            var ReasonIds = "";
            var $checkedSite = $("input[name='multiselect_cphRight_ddlSite']:checked");
            for (var i = 0; i < $checkedSite.length; i++) {
                if (SiteNodeIds == "") {
                    SiteNodeIds = $checkedSite.eq(i).val().split('-')[0];
                } else {
                    SiteNodeIds += "|" + $checkedSite.eq(i).val().split('-')[0];
                }
            }

            var $checkedReason = $("input[name='multiselect_cphRight_ddlReason']:checked");
            for (var i = 0; i < $checkedReason.length; i++) {
                if (ReasonIds == "") {
                    ReasonIds = $checkedReason.eq(i).val();
                } else {
                    ReasonIds += "|" + $checkedReason.eq(i).val();
                }
            }
            var SellerType = $("#cphRight_ddlSellerType").val();
            $("#dvFadeForProcessing").show();
            PageMethods.fnDailyOrderStatusReport(LoginId, sDate, eDate, SiteNodeIds, ReasonIds,flgExcel,ViewType,SellerType, function (result) {
                $("#dvFadeForProcessing").hide();
                if (result.split("^")[0] == "2") {
                    $("#divMeasure")[0].innerHTML = "";
                    $("#divMainData")[0].innerHTML = "Error : " + result.split("^")[1];
                    
                } else {
                    var str=result.split("^")[1];
                    $("#divMainData")[0].innerHTML = str.split("|~|")[0];
                    $("#divMeasure")[0].innerHTML = str.split("|~|")[1];
                    if (detectmob() != true) {
                        
                        //fntblFixedHeader();
                    }
                }
               
            }, function (result) {
                alert("Error-" + result._message);
                $("#dvFadeForProcessing").hide();
            });
        }

        function fnDownloadSiteDetails(ctrl) {
            var nid = $(ctrl).closest("tr").attr("nodeid");
            var ntype = $(ctrl).closest("tr").attr("nodetype");
            var pnid = $(ctrl).closest("tr").attr("pnodeid");
            var pntype = $(ctrl).closest("tr").attr("pnodetype");
            if (nid != 0 && pnid == 0) {
                pnid = nid;
                pntype = ntype;
                nid = 0;
                ntype = 0;
            }
            var sitebranchname = $(ctrl).closest("tr").find("td").eq(0).text();
            var LoginId = $("#cphRight_hdnLoginId").val();
            var sDate = $("#txtDate").val();
            var eDate = $("#txtToDate").val();
            var $checkedReason = $("input[name='multiselect_cphRight_ddlReason']:checked");
            var ReasonIds = "";
            var SellerType = $("#cphRight_ddlSellerType").val();
            for (var i = 0; i < $checkedReason.length; i++) {
                if (ReasonIds == "") {
                    ReasonIds = $checkedReason.eq(i).val();
                } else {
                    ReasonIds += "|" + $checkedReason.eq(i).val();
                }
            }
            window.open("../frmDownloadExcel.aspx?flg=8&sDate=" + sDate + "&eDate=" + eDate + "&BranchNodeId=" + nid + "&BranchNodeType=" + ntype + "&TasSiteNodeId=" + pnid + "&TasSiteNodeType=" + pntype + "&TeleReasonIds=" + ReasonIds + "&sitebranchname=" + sitebranchname + "&LoginId=" + LoginId + "&SellerType=" + SellerType);
        }

        function fnColapse(ctrl) {
            var nid = $(ctrl).closest("tr").attr("nodeid");
            var ntype = $(ctrl).closest("tr").attr("nodetype");
            var pnid = $(ctrl).closest("tr").attr("pnodeid");
            var pntype = $(ctrl).closest("tr").attr("pnodetype");
            var lvl = $(ctrl).closest("tr").attr("lvl");
            if ($(ctrl)[0].src.indexOf("icoAdd") > -1) {
                $(ctrl)[0].src = "../Images/icoMinus.gif";
                $("#tbldbrlist tbody").find("tr[pnodeid='" + nid + "'][pnodetype='" + ntype + "']").css("display", "table-row");
            } else {
                $(ctrl)[0].src = "../Images/icoAdd.gif";
                if (lvl == 0) {
                    $("#tbldbrlist tbody").find("tr[lvl='1']").find("img").attr("src", "../Images/icoAdd.gif")
                    $("#tbldbrlist tbody").find("tr[lvl='1']").css("display", "none");
                } else {
                    $("#tbldbrlist tbody").find("tr[pnodeid='" + nid + "'][pnodetype='" + ntype + "']").css("display", "none");
                }
            }
        }
        function fntblFixedHeader() {
            var thead = $("#tbldbrlist").find("thead").eq(0).html();
            $("#divfixedHeader").html("<table id='tbl_Status_fixedhead' cellspacing='0'   cellspacing='2' style='width:100%'><thead>" + thead + "</thead><tbody></tbody></table>");
            for (i = 0; i < $("#tbldbrlist thead").find("th").length; i++) {
                $("#tbl_Status_fixedhead").find("th").eq(i).css("width", $("#tbldbrlist thead").find("th")[i].offsetWidth);
                //$("#tbldbrlist thead").find("th").eq(i).css("width", $("#tbldbrlist thead").find("th")[i].offsetWidth);
            }

            $("#divfixedHeader").css({
                "width": $("#divMainData").width(),
                "height": $("#tbl_Status_fixedhead").find("th").eq(0).height()
            });
            //$("#divMainData").css("width", $("#divMainData")[0].clientWidth);
        }

        function detectmob() {
            var IsMobileDevice ="<%=Request.Browser.IsMobileDevice%>";
            if (IsMobileDevice != "False") {
                $("#divFilter").hide();
                $("#divHeadercont").css({
                    "position": "relative",
                    "width":"100%"
                });
                $("#divfixedHeader").css({
                    "position": "relative"
                });
                $("#divtblContain").css({
                    "padding-top": "0px",
                    "overflow-x":"auto !important",
                });
                //$("#divbtn").css("width", "100%");
                $("#dvfromdt,#dvtodt,#dvsite,#dvview,#dvreason").removeAttr("style");

                $(".container").css({
                    "padding-left": "2px",
                    "padding-right": "2px"
                });
                return true;
            } else {
                $("#divFilterbtn").hide();
                $("#divFilter button.ui-multiselect").eq(0).css({
                    width: "210px"
                });
                $("#divFilter button.ui-multiselect").eq(1).css({
                    width: "198px"
                });
               
                return false;
            }
        }

       
        function fnShowhidediv() {
            $("#divFilter").toggle();
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
    <div style="margin-left: 0px; padding-bottom: 0px; position: fixed; z-index: 1; width: 96%; background-color: #ffffff" id="divHeadercont">
        <h4 id="h4header" style="font-size:12px">>>Daily Site Wise Performance Summary</h4>
        <div style="margin-top: 2px;">
            <div style="display:block" id="divFilterbtn"><a href="#" onclick="fnShowhidediv()" class="btn btn-info btn-lg" style="padding:4px 5px;font-size:14px">
          <span class="glyphicon glyphicon-filter"></span> Filter 
        </a></div>
            <div class="row" id="divFilter" >
                <div class="col-md-2" style="padding:0px;width:14%" id="dvfromdt">
                    <table style="display:inline-block">
                        <tr>
                            <td style="width:70px">
                                <b>From Date</b>
                            </td>
                            <td style="width:5px">
                                :
                            </td>
                            <td>
                                <input type="text" id="txtDate" style="width: 80px" readonly />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-2" style="padding:0px;width:14%" id="dvtodt">
                    <table style="display:inline-block">
                        <tr>
                            <td style="width:70px">
                                <b>To Date</b>
                            </td>
                            <td style="width:5px">
                                :
                            </td>
                            <td>
                                <input type="text" id="txtToDate" style="width: 80px" readonly />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-3" style="padding:0;width:20%" id="dvsite">
                    <table style="display:inline-block">
                        <tr>
                            <td style="width:70px">
                                <b>Site List</b>
                            </td>
                            <td style="width:5px">
                                :
                            </td>
                            <td>
                                <asp:DropDownList runat="server" ID="ddlSite"  Style="border: 1px solid #bbbbbb; width: 180px" multiple="true">
                        </asp:DropDownList>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-2" style="padding:0;width:14%" id="dvview">
                    <table style="display: inline-block">
                        <tr>
                            <td style="width: 70px">
                                <b id="lblType" runat="server">View Type</b> 
                            </td>
                            <td style="width: 5px">:
                            </td>
                            <td>
                                <select id="ddlViewType"  onchange="fnShowReport(0)" style="border: 1px solid #bbbbbb;">
                                    <option value="0">
                                        All
                                    </option>
                                   <option value="140">
                                        Branch Wise
                                    </option>
                                    <option value="145">
                                        SUBD Wise
                                    </option>
                                </select>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-3" style="padding:0;width:20%" id="dvreason">
                     <table style="display:inline-block">
                        <tr>
                            <td style="width:70px">
                                <b>Call Type</b>
                            </td>
                            <td style="width:5px">
                                :
                            </td>
                            <td>
                                <asp:DropDownList runat="server" ID="ddlReason" Style="border: 1px solid #bbbbbb; width: 140px" multiple="true">
                        </asp:DropDownList>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-2">
                    <table style="display:inline-block">
                        <tr>
                            <td style="width:70px">
                                <b>Seller Type</b>
                            </td>
                            <td style="width:5px">
                                :
                            </td>
                            <td>
                                <asp:DropDownList runat="server" ID="ddlSellerType" onchange="fnShowReport(0)"  Style="border: 1px solid #bbbbbb;">
                                    <asp:ListItem Value="1" Selected="True" Text="TAS">
                                        TAS
                                    </asp:ListItem>
                                    <asp:ListItem Value="2" Text="DSE">
                                        DSE
                                    </asp:ListItem>
                        </asp:DropDownList>
                            </td>
                        </tr>
                    </table>
                </div>
              
                
            </div>
            <div class="row" id="divbtn" style="padding:8px;text-align:center">
                    <input type="button" value="Show Report" class="btn btn-primary" onclick="fnShowReport(0)" id="btnShow" style="padding:3px 4px;font-size:12px" />
                        <input type="button" value="Download Report" class="btn btn-primary" onclick="fnDownloadReport()" style="padding:3px 4px;font-size:12px" id="btnRefershStatus" />
                </div>
        </div>
       
        <div style="margin-top: 2px;" class="table-responsive" id="divMeasure">
        </div>
    </div>
    <div style="padding-top: 158px;" id="divtblContain"  class="table-responsive">
        <div id="divfixedHeader" style="margin-left: 0px; position: fixed; z-index: 1;display:none"></div>
        <div id="divMainData" style="margin-top: 0px; ">
        </div>
    </div>

    <asp:HiddenField runat="server" ID="hdnLoginId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnMenuId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnBranchCode" Value="0" />
    <asp:HiddenField runat="server" ID="hdnflg" Value="1" />
    <asp:HiddenField runat="server" ID="hdnRoleId" Value="0" />

</asp:Content>

