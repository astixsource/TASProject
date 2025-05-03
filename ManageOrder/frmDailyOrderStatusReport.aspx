<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" CodeFile="frmDailyOrderStatusReport.aspx.cs" Inherits="frmDailyOrderStatusReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
   <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="../scripts/jquery-3.6.0.js"></script>
    <link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />
    <link href="../styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/Multiselect/jquery.multiselect.css" rel="stylesheet" />
    <link href="../Styles/Multiselect/jquery.multiselect.filter.css" rel="stylesheet" />
    <script src="../Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-ui.js"></script>
    <script src="../scripts/Multiselect/jquery.multiselect.js"></script>
    <script src="../scripts/Multiselect/jquery.multiselect.filter.js"></script>
    <style>
        button.ui-multiselect {
            width:180px !important;
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
        .ui-datepicker select.ui-datepicker-month, .ui-datepicker select.ui-datepicker-year {
    width: 49%;
    color: black !important;
}
        img {
            vertical-align:middle;
        }
        .mainpanel {
            padding:0px !important;
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

    </style>
   

   
    <script>
        var StoreList = [];
        $(document).ready(function () {
            $('#fraLeft').load(function () {
                $("#fraLeft").contents().find("#DvMenu").find("li").removeClass("activemenu");
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='10']").addClass("activemenu");
                $("#fraLeft")[0].height = $(window).height() - ($("#dvBanner").height() + $(".footer").height());
            });
            $("#divbtns").hide();
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
                minDate:$("#txtDate").val(),
                changeMonth: true,
                changeYear: true,
                showOn: "button",
                buttonImage: "../images/calender.jpg",
                buttonImageOnly: true,
                buttonText: "Select date",
            });
             
            fnShowReport();
        });


      
        

        function fnDownloadReport() {
            var sDate = $("#txtDate").val();
            var eDate = $("#txtToDate").val();
            var LoginId = $("#cphRight_hdnLoginId").val();

            var Sitestr = $("#cphRight_ddlSite").val();
            var SiteNodeId = Sitestr.split("-")[0];
            var SiteNodeType = Sitestr.split("-")[1];
            var SellerType = $("#cphRight_ddlSellerType").val();
            var ReasonIds = "";
            var $checkedReason = $("input[name='multiselect_cphRight_ddlReason']:checked");
            for (var i = 0; i < $checkedReason.length; i++) {
                if (ReasonIds == "") {
                    ReasonIds = $checkedReason.eq(i).val();
                } else {
                    ReasonIds += "|" + $checkedReason.eq(i).val();
                }
            }
            window.open("../frmDownloadExcel.aspx?flg=3&LoginId=" + LoginId + "&sDate=" + sDate + "&eDate=" + eDate + "&SiteNodeId=" + SiteNodeId + "&SiteNodeType=" + SiteNodeType + "&SellerType=" + SellerType + "&TeleReasonIds=" + ReasonIds);
        }

        function fnShowReport() {
            var sDate = $("#txtDate").val();
            var eDate = $("#txtToDate").val();
            var LoginId = $("#cphRight_hdnLoginId").val();

            var Sitestr = $("#cphRight_ddlSite").val();
            var SiteNodeId = Sitestr.split("-")[0];
            var SiteNodeType = Sitestr.split("-")[1];
            var SellerType = $("#cphRight_ddlSellerType").val();
            var ReasonIds = "";
            var $checkedReason = $("input[name='multiselect_cphRight_ddlReason']:checked");
            for (var i = 0; i < $checkedReason.length; i++) {
                if (ReasonIds == "") {
                    ReasonIds = $checkedReason.eq(i).val();
                } else {
                    ReasonIds += "|" + $checkedReason.eq(i).val();
                }
            }

            $("#dvFadeForProcessing").show();
            PageMethods.fnDailyOrderStatusReport(LoginId, sDate, eDate,SiteNodeId,SiteNodeType,SellerType,ReasonIds, function (result) {
                $("#dvFadeForProcessing").hide();
                $("#divfixedHeader").html("");
                $("#divMainData")[0].innerHTML = result;
                if (detectmob() != true) {
                    if ($("#tbldbrlist").length > 0) {
                        fntblFixedHeader();
                    }
                }
            }, function (result) {
                alert("Error-" + result._message);
                $("#dvFadeForProcessing").hide();
            });
        }


        function fntblFixedHeader() {
            var thead = $("#tbldbrlist").find("thead").eq(0).html();
            $("#divfixedHeader").html("<table id='tbl_Status_fixedhead' cellspacing='0' style='font-size:8pt'><thead>" + thead + "</thead><tbody></tbody></table>");
            for (i = 0; i < $("#tbldbrlist thead").find("th").length; i++) {
                $("#tbl_Status_fixedhead").find("th").eq(i).css("width", $("#tbldbrlist thead").find("th")[i].offsetWidth);
                // $("#tbldbrlist thead").find("th").eq(i).css("width", $("#tbldbrlist thead").find("th")[i].offsetWidth);
            }

            $("#divfixedHeader").css("width", $("#divMainData")[0].clientWidth);
            $("#divMainData").css("width", $("#divMainData")[0].clientWidth);
            $("#divHeadercont").css("width", $("#divMainData")[0].clientWidth);

        }
         function detectmob() {
            var IsMobileDevice = "<%=Request.Browser.IsMobileDevice%>";
            if ((window.innerWidth <= 400 && window.innerHeight <= 640) || (window.innerWidth <= 640 && window.innerHeight <= 400) || IsMobileDevice != "False") {
                $("#divFilter").hide();
                $("#divHeadercont").css({
                    "position": "relative"
                });
                $("#divfixedHeader").css({
                    "position": "relative"
                });
                $("#divtblContain").css({
                    "padding-top": "0px"
                });
                $("div.clsdv").css("width", "100%");
                $("#divbtn").css("width", "100%");
                return true;
            } else {
                $("#divFilterbtn").hide();
               
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
<asp:Content ID="Content2" ContentPlaceHolderID="cphRight" runat="Server" >
    <div id="dvFadeForProcessing" align="center" class="clsloader">
            <img src="../NewImages/ajax-loader.gif" style="margin-top: 300px;" />
        </div>
    <div style="margin-left: 0px;padding-bottom:5px; position:fixed;z-index:1;width:100%;background-color:#ffffff" id="divHeadercont">
    <h4 id="h4header">>>Daily Telecaller Performance Status</h4>
    <div style="margin-top: 2px;">
            <div style="display:block" id="divFilterbtn"><a href="#" onclick="fnShowhidediv()" class="btn btn-info btn-lg" style="padding:4px 5px;font-size:14px">
          <span class="glyphicon glyphicon-filter"></span> Filter 
        </a></div>
            <div class="row" id="divFilter" style="padding:0px">
                <div class="col-md-2 clsdv"  style="padding:0px;width:13%" id="dvfromdt">
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
                <div class="col-md-2 clsdv" style="padding:0px;width:13%" id="dvtodt">
                    <table style="display:inline-block">
                        <tr>
                            <td style="width:60px">
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
                <div class="col-md-3 clsdv" style="padding:0;width:20%" id="dvsite">
                    <table style="display:inline-block">
                        <tr>
                            <td style="width:65px">
                                <b>Site List</b>
                            </td>
                            <td style="width:5px">
                                :
                            </td>
                            <td style="width:200px">
                                <asp:DropDownList runat="server" ID="ddlSite" onchange="fnShowReport()" Style="border: 1px solid #bbbbbb; width: 180px">
                        </asp:DropDownList>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-2 clsdv" style="width:15%">
                    <table style="display:inline-block">
                        <tr>
                            <td style="width:80px">
                                <b>Seller Type</b>
                            </td>
                            <td style="width:5px">
                                :
                            </td>
                            <td>
                                <asp:DropDownList runat="server" ID="ddlSellerType" onchange="fnShowReport()"  Style="border: 1px solid #bbbbbb; width: 80px">
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
                <div class="col-md-3 clsdv" style="padding:0;width:20%" id="dvreason">
                     <table style="display:inline-block">
                        <tr>
                            <td style="width:70px">
                                <b>TCReason</b>
                            </td>
                            <td style="width:5px">
                                :
                            </td>
                            <td style="width:150px">
                                <asp:DropDownList runat="server" ID="ddlReason" Style="border: 1px solid #bbbbbb; width: 140px" multiple="true">
                        </asp:DropDownList>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="text-center" id="divbtn" style="padding-top:2px;float:left;">
                    <input type="button" value="Show Report" class="btn btn-primary" onclick="fnShowReport()" id="btnShow" style="padding:3px 4px;font-size:12px" />
                        <input type="button" value="Download Report" class="btn btn-primary" onclick="fnDownloadReport()" style="padding:3px 4px;font-size:12px" id="btnRefershStatus" />
                </div>
            </div>
        </div>
        </div>
    <div style="padding-top:80px" id="divtblContain" class="table-responsive">
    <div id="divfixedHeader" style="margin-left: 0px; position:fixed;z-index:1"></div>
    <div id="divMainData" style="margin-top:-1px;width:100%" >
    </div>
        </div>
   
    <asp:HiddenField runat="server" ID="hdnLoginId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnMenuId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnBranchCode" Value="0" />
    <asp:HiddenField runat="server" ID="hdnRoleId" Value="0" />
    
</asp:Content>

