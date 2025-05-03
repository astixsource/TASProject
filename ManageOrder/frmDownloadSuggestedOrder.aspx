<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" CodeFile="frmDownloadSuggestedOrder.aspx.cs" Inherits="frmDownloadSuggestedOrder" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
     <script src="../scripts/jquery-3.6.0.js"></script>
    <link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />
    <link href="../styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jquery-ui.js"></script>
    <script src="../Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>
    <%--<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet">--%> 
    <style>
        .ui-datepicker .ui-datepicker-title {
    margin: 0 2.3em;
    line-height: 1.8em;
    text-align: center;
    color: black;
}
        .mainpanel {
            padding:0px !important;
        }
       
        .leftMenu-headding {
            width:235px !important;
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
            
            var d = new Date();
            $("#txtDate").val(d.localeFormat('dd-MMM-yyyy'))
            $("#txtDate").datepicker({
                maxDate: d,
                dateFormat: 'dd-M-yy',
                changeMonth: true,
                changeYear: true,
                showOn: "button",
                buttonImage: "../images/calender.jpg",
                buttonImageOnly: true,
                buttonText: "Select date",
            });

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
                    $("#divmainparent").show();
                    $("#btnRefershStatus").closest("td").css("display", "table-cell");
                   // fnRefreshDownloadedList();
                }
            }
            
            

        });


        function fnChangeSite(sender) {
            var val = $(sender).val();
            var options = $(document).data("BranchData").clone();
            $("#cphRight_ddlBranch option").remove();
            $("#cphRight_ddlBranch").html("<option value='0-0'>------<option>");
            $(options).find("option[sitenodeid='" + val + "']").appendTo($("#cphRight_ddlBranch"));
            $("#cphRight_ddlBranch option").eq(1).remove();
        }

       

        function fnClosedvOrderPop() {
            try {
                $("#InvReportDialog").dialog('close');
                //$("#IframeInvRpt")[0].src = "about:blank";
                //$("#InvReportDialog").dialog('destroy');
            } catch (err) { }
        }
       
        function fnRefreshDownloadedList()
        {
            var BranchVal = $("#cphRight_ddlBranch").val();
            var BranchNodeId = BranchVal.split("-")[0];
            var BranchNodeType = BranchVal.split("-")[1];
            var LoginId = $("#cphRight_hdnLoginId").val();
            PageMethods.GetDownloadOrderList(LoginId,BranchNodeId,BranchNodeType, function (result) {
                $("#divDownloadedList")[0].innerHTML =result!=""? "<fieldset style='border:1px solid #5b6367;width:99%;display:inline-block'><legend style='text-align:center;width:auto;margin-bottom:2px'>Orders Downloaded History</legend>" + result + "</fieldset>":"";
            }, function () { alert("Error") });
        }
        function fnChangeBranch(sender) {
            if ($(sender).val() != "0") {
                $("#divmainparent").show();
                $("#btnRefershStatus").closest("td").css("display", "table-cell");
                fnRefreshDownloadedList();
            } else {
                $("#divmainparent").hide();
                $("#btnRefershStatus").closest("td").css("display", "none");
            }
        }
      
        function fnDownload(BranchCode, CycleId, DownloadDate, flg, IsMappingType) {
            var BranchVal = $("#cphRight_ddlBranch").val();
            var BranchNodeId = BranchVal.split("-")[0];
            var BranchNodeType = BranchVal.split("-")[1];
            var LoginId = $("#cphRight_hdnLoginId").val();
            window.open("../frmDownloadExcel.aspx?flg=1&flgStatus=2&BranchCode=" + BranchCode + "&CycleId=" + CycleId + "&DownloadDate=" + DownloadDate + "&BranchNodeId=" + BranchNodeId + "&BranchNodeType=" + BranchNodeType + "&IsMappingType=" + IsMappingType + "&LoginId=" + LoginId);
        }

        function fnDownloadOrder() {
                //var BranchVal = $("#cphRight_ddlBranch").val();
                //var BranchCode = $("#cphRight_ddlBranch option:selected").text();
                //var BranchNodeId = BranchVal.split("-")[0];
                //var BranchNodeType = BranchVal.split("-")[1];
                var flgType = $("#cphRight_hdnflg").val();
                var txtDate = $("#txtDate").val();
                var LoginId = $("#cphRight_hdnLoginId").val();
                window.open("../frmDownloadExcel.aspx?flg=15&flgStatus=2&sDate=" + txtDate + "&IsMappingType=1&flgType=" + flgType + "&LoginId=" + LoginId);
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
    <h4 id="h4header">>>Download Suggested Order</h4>
    <div style="margin-top:10px;width:100%">
        <table id="tblhead" >

            <tr>
            <td>
                        <b>Order Date : </b>
                    </td>
                    <td style="width: 100px">
                        <input type="text" id="txtDate" style="width: 80px" readonly /></td>
 <%--<td style="width:60px"><b>Site List :</b></td>

                <td style="width:205px">
                    <asp:DropDownList runat="server" ID="ddlSite" onchange="fnChangeSite(this)" CssClass="form-control"  style="border:1px solid #bbbbbb;width:200px" >
                    </asp:DropDownList></td>
                <td> <b id="lblType" runat="server">Branch List:</b> </td>
                <td style="padding-left:10px;padding-right:10px">
                    <asp:DropDownList runat="server" ID="ddlBranch" onchange="fnChangeBranch(this)" CssClass="form-control"  style="border:1px solid #bbbbbb;width:100%" >
                    </asp:DropDownList></td>--%>
                <td style="padding-left:20px;">
                    <input type="button" value="Download" class="btn btn-primary" onclick="fnDownloadOrder()" id="btnRefershStatus" />
                </td>
            </tr>
        </table>
    </div>
    <div style="width:750px;margin:30px" id="divmainparent">
     <div id="divDownloadedList" >

    </div>
   </div>
    <div id="dvDialog" style="display:none"></div>
    <div id="dvDialog1" style="display:none"></div>
    <asp:HiddenField runat="server" ID="hdnLoginId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnMenuId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnBranchCode" Value="0" />
    <asp:HiddenField runat="server" ID="hdnflg" Value="1" />
    
</asp:Content>

