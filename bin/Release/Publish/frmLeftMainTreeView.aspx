<%@ Page Language="VB" AutoEventWireup="false" CodeFile="frmLeftMainTreeView.aspx.vb"
    Inherits="frmLeftMainTreeView" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link href="StylesTreeView/Css/main.css" rel="stylesheet" type="text/css" />
    <script src="scripts/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="StylesTreeView/js/custom-script.js" type="text/javascript"></script>
    <style type="text/css">
        li.activemenu {
            background-color: #5b6367 !important;
        }

            li.activemenu > a span {
                color: #ffffff !important;
            }

        ul.accordion-title {
            margin: 0;
            padding: 0;
            list-style: none;
            height: auto;
            /* overflow-y: auto; */
            position: relative;
            top: 52px;
            max-height: none !important;
        }
    </style>
    <script language="javascript" type="text/javascript">
        var widthBool = 0
        function fnsetFrameWidth() {
            if (widthBool == 0) {
                widthBool = 1
                document.getElementById("tdShowHide").innerHTML = "&gt;&gt;"
                parent.frames["fset"].cols = "10%,90%"
            }
            else {
                widthBool = 0
                document.getElementById("tdShowHide").innerHTML = "&lt;&lt;"
                parent.frames["fset"].cols = "20%,80%"
            }
        }
        function detectMob() {
            return ((window.innerWidth <= 800) && (window.innerHeight <= 600));
        }
        function fnAction(NodeId) {
            var IsMobileDevice = document.getElementById("hdnIsMobile").value;
            switch (NodeId) {
                case "1":
                    parent.parent.window.location.href = "salesHierarchy/manageHierarchy.aspx?Id=" + NodeId;
                    break;
                case "2":
                    parent.parent.window.location.href = IsMobileDevice == 0 ? "ManageOrder/frmRouteList_Telecaller.aspx?id=" + NodeId : "ManageOrder/frmRouteList_PDA.aspx?id=" + NodeId;
                    break;
                case "3":
                    parent.parent.window.location.href = IsMobileDevice == 0 ? "ManageOrder/frmRouteList_Telecaller.aspx?id=" + NodeId : "ManageOrder/frmRouteList_PDA.aspx?id=" + NodeId;
                    break;
                case "5":
                    parent.parent.window.location.href = "ManageOrder/frmMarkAbsent.aspx?id=" + NodeId;
                    break;
                case "6":
                    parent.parent.window.location.href = "ManageOrder/frmBranchOrderStatus.aspx?id=" + NodeId;
                    break;
                case "34":
                    parent.parent.window.location.href = "ManageOrder/frmBranchOrderStatus.aspx?id=" + NodeId + "&flg=2";
                    break;
                case "9":
                    parent.parent.window.location.href = "ManageOrder/frmAbsentDSEList.aspx?id=" + NodeId;
                    break;
                case "10":
                    parent.parent.window.location.href = "ManageOrder/frmDailyOrderStatusReport.aspx?id=" + NodeId;
                    break;
                case "11":
                    parent.parent.window.location.href = "ManageOrder/frmDailyDashBoard.aspx?id=" + NodeId;
                    break;
                case "12":
                    parent.parent.window.location.href = "ManageOrder/frmTelecallerWiseConsolidatedReprot.aspx?id=" + NodeId;
                    break;
                case "36":
                    parent.parent.window.location.href = "ManageOrder/frmTelecallerWiseConsolidatedReprot.aspx?id=" + NodeId + "&flg=2";
                    break;
                case "13":
                    parent.parent.window.location.href = "ManageOrder/frmMarkTeleCallerAbsent.aspx?id=" + NodeId;
                    break;
                case "15":
                    parent.parent.window.location.href = "SmartFileUpload/Default.aspx?id=1&flg=1";
                    break;
                case "16":
                    parent.parent.window.location.href = "SmartFileUpload/Default.aspx?id=2&flg=1";
                    break;
                case "17":
                    parent.parent.window.location.href = "SmartFileUpload/Default.aspx?id=3&flg=1";
                    break;
                case "18":
                    parent.parent.window.location.href = "ManageOrder/frmBranchAttendance.aspx?id=" + NodeId;
                    break;
                case "39":
                    parent.parent.window.location.href = "ManageOrder/frmBranchAttendance.aspx?id=" + NodeId + "&flg=2";
                    break;
                case "20":
                    parent.parent.window.location.href = "ManageOrder/frmUserMgmt.aspx";
                    break;

                case "21":
                    parent.parent.window.location.href = "ManageOrder/frmDailyPerformanceReport.aspx";
                    break;
                case "22":
                    parent.parent.window.location.href = "ManageOrder/frmTCNotcallingRpt.aspx";
                    break;
                case "23":
                    parent.parent.window.location.href = "ManageOrder/frmDownloadhistoryOrder.aspx?id=" + NodeId;
                    break;
                case "37":
                    parent.parent.window.location.href = "ManageOrder/frmDownloadhistoryOrder.aspx?id=" + NodeId + "&flg=2";
                    break;
                case "24":
                    parent.parent.window.location.href = "SmartFileUpload/frmTAS_Upload.aspx";
                    break;
                case "25":
                    parent.parent.window.location.href = "ManageOrder/frmBranchSwingLeapMapping.aspx";
                    break;
                case "26":
                    parent.parent.window.location.href = "ManageOrder/MapTeleCallerOtherReason.aspx";
                    break;
                case "27":
                    parent.parent.window.location.href = "SmartFileUpload/Default.aspx?id=4&flg=1";
                    break;
                case "38":
                    parent.parent.window.location.href = "SmartFileUpload/Default.aspx?id=4&flg=2";
                    break;

                case "28":
                    parent.parent.window.location.href = "ManageOrder/frmBranchMarketMapping.aspx";
                    break;
                case "29":
                    parent.parent.window.location.href = "SmartFileUpload/Default.aspx?id=5&flgtype=1&flg=1";
                    break;
                case "30":
                    parent.parent.window.location.href = "SmartFileUpload/frmDRCPUpload.aspx";
                    break;
                case "31":
                    parent.parent.window.location.href = "SmartFileUpload/Default.aspx?id=5&flgtype=2&flg=1";
                    break;
                case "32":
                    parent.parent.window.location.href = "SmartFileUpload/frmSUBDDRCPUpload.aspx?id=6&flg=2";
                    break;
                case "33":
                    parent.parent.window.location.href = "ManageOrder/frmMarkAbsent.aspx?id=" + NodeId + "&flg=2";
                    break;

                case "40":
                    parent.parent.window.location.href = "ManageOrder/frmRptLeapFileUploadingStatus.aspx?id=" + NodeId + "&flg=2";
                    break;
                case "41":
                    parent.parent.window.location.href = "SmartFileUpload/frmInit_Upload.aspx";
                    break;
                case "42":
                    parent.parent.window.location.href = "ManageOrder/frmManageTASMasters.aspx?id=" + NodeId;
                    break;
                case "43":
                    parent.parent.window.location.href = "ManageOrder/frmMarkDSEAsWorkfromHome.aspx?id=" + NodeId;
                    break;
                case "44":
                    parent.parent.window.location.href = "SmartFileUpload/Default.aspx?id=17&flgtype=1";
                    break;
                case "45":
                    parent.parent.window.location.href = "ManageOrder/frmDownloadTASCallingReport.aspx";
                    break;
                case "46":
                    parent.parent.window.location.href = "SmartFileUpload/Default.aspx?id=19&flg=1";
                    break;
                case "47":
                    parent.parent.window.location.href = "ManageOrder/frmMarkOrderInactive.aspx?id=" + NodeId + "&flg=1";
                    break;
                case "48":
                    parent.parent.window.location.href = "ManageOrder/frmDailyPerformanceReport_GP.aspx";
                    break;
                case "49":
                    parent.parent.window.location.href = "ManageOrder/frmDownloadSuggestedOrder.aspx";
                    break;
                case "50":
                    parent.parent.window.location.href = "ManageOrder/frmDownloadTASCCR.aspx?id=50";
                    break;
                case "51":
                    parent.parent.window.location.href = "ManageOrder/frmDownloadTASFiveStarData.aspx?id=51";
                    break;
                case "52":
                    parent.parent.window.location.href = "ManageOrder/frmBranchInventryMapping.aspx?id=52";
                    break;

                case "53":
                    parent.parent.window.location.href = "ManageOrder/frmAutoTransferOrders.aspx?id=53";
                    break;
                case "54":
                    parent.parent.window.location.href = "SmartFileUpload/Default_DSEAbsentEmailData.aspx?id=20&flgtype=1";
                    break;

                //case "55":
                //    parent.parent.window.location.href = "SmartFileUpload/Default_DSEAbsentEmailData.aspx?id=20&flgtype=1";
                //    break;

                case "56":
                    parent.parent.window.location.href = "ManageOrder/frmDSECallLogReport.aspx";
                    break;

                case "57":
                    parent.parent.window.location.href = "ManageOrder/frmRptTaskExtractData.aspx";
                    break;
                case "58":
                    parent.parent.window.location.href = "ManageOrder/frmBranchDzeroMapping.aspx";
                    break;

                case "59":
                    parent.parent.window.location.href = "ManageOrder/frmTeleCallerCallTypeMapping.aspx";
                    break;
                case "60":
                    parent.parent.window.location.href = "ManageOrder/frmGetTASListForDSEMappingForPlannedCalls.aspx";
                    break;
                case "61":
                    parent.parent.window.location.href = "ManageOrder/frmTASDayPlanning.aspx";
                    break;
                //case "62":
                //    parent.parent.window.location.href = "SmartFileUpload/frmInit_UploadInitiative.aspx";
                //    break;

                case "62":
                    parent.parent.window.location.href = "ManageOrder/frmMarkAbsentBasedONCCR.aspx?id=" + NodeId + "&flg=1";
                    break;
                case "63":
                    parent.parent.window.location.href = "ManageOrder/frmTASMockupDashboard.aspx?id=" + NodeId;
                    break;
            }
            return false;

        }
    </script>
    <script language="javascript" type="text/javascript">

        function fnCallFunction(NodeId) {

            window.location.href = "OrganisationHierarchy/frmOrgTree.aspx?Id=" + NodeId;
            // parent.frames["fraLeft"].location.href="OrganisationHierarchy/frmOrgTree.aspx?Id=" + NodeId;
            // parent.frames["fraRight"].location.href="frmBlank.aspx?Id=" + NodeId;	
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager runat="server" EnablePageMethods="true"></asp:ScriptManager>
        <div class="leftpanel-menu">
            <div class="leftMenu-headding"  style="cursor: pointer;">
                Menu
            </div>
            <div id="DvMenu" runat="server" style="padding-bottom:50px">
            </div>
            <input id="hdnRspId" type="hidden" value="0" runat="server" name="hdnRspId" />
            <input id="hdnPType" type="hidden" value="0" runat="server" name="hdnPType" />
            <input id="hdnMnId" type="hidden" value="0" runat="server" name="hdnMnId" />
            <input id="hdnIsMobile" type="hidden" value="0" runat="server" name="hdnIsMobile" />
        </div>
    </form>
</body>
</html>
