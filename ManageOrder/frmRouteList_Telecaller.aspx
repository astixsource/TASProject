<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" CodeFile="frmRouteList_Telecaller.aspx.cs" Inherits="ManageOrder_frmRouteList_Telecaller" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="../scripts/jquery-3.6.0.js"></script>
    <link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />
    <%--<script src="../scripts/jquery-ui.js"></script>--%>
    <script src="../scripts/jquery-ui.js"></script>
    <link href="../styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../StylesTreeViewOrder/js/custom-script.js" type="text/javascript"></script>
    <script src="../scripts/validation.js"></script>
    <script src="../StylesTreeView/js/jquery.dataTables.js" type="text/javascript"></script>
    <link href="../StylesTreeView/Css/jquery.dataTables.css" rel="stylesheet" />
    <style>
        #header .L_header img {
    width: auto;
    height: 100px !important;
    float: left;
    position: absolute;
}
        #header .R_header img {
    width: auto;
    height: 56px !important;
    float: right;
}
        .conatnt {
    top: 96px !important;
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

        .main-sidebox {
            position: fixed;
            right: 0;
            top: 97px;
            z-index: 99;
        }

        .click-side {
            float: left;
            padding: 12px;
            background: #008C31;
            color: #FFF;
            cursor: pointer;
            width: 6px;
            text-align: center;
            word-break: break-all;
            word-wrap: break-word;
            text-wrap: normal;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
            -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
            -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
        }

        .slidable {
            float: right;
            height: 250px;
            background: #FFF;
            width: 270px;
            border: 1px solid #0046AD;
            box-sizing: border-box;
            padding: 10px 0 0 5px;
            overflow-y: auto;
            word-wrap: normal;
            word-break: normal;
        }

        .clsbody {
            overflow: hidden !important;
        }

        .clsbodyScroll {
            overflow: hidden !important;
            overflow-y: auto !important;
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

        .clstitleheader {
            font-size: 15px;
            background-color: #23aed8;
            color: White !important;
            font-weight: bold !important;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
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

        .ui-corner-all, .ui-corner-bottom, .ui-corner-right, .ui-corner-br {
            border-bottom-right-radius: 0px !important;
        }

        .ui-corner-all, .ui-corner-bottom, .ui-corner-left, .ui-corner-br {
            border-bottom-left-radius: 0px !important;
        }
        .clsheaderDividertd {
            width: .5%;
        }
        .clstd {
            width: 15%;
            border: 2px solid;
           height:80px;
           padding:2px !important;
        }
        .clstdMTD {
            width: 15%;
            border: 2px solid;
           height:80px;
           padding:6px !important;
           font-size:9.5pt !important;
        }
            .box1{
                background-color:#e5faff;
               
            }
            .box2 {
                background-color:#f2f2f2;
            }
            .box3 {
                background-color:#f7fde7;
            }
            .box4 {
                background-color:#f6f3e6;
            }
            .box5 {
                background-color:#ebf2f9;
            }
            .box6 {
                 width: 20%;
                background-color:#ebf2f9;
            }
            .clsheadertd{
                padding:4px 4px !important;
                color:#0070c0;
                font-weight:bold;
                font-size:10.5pt;
                text-align:center;
            }
        .clsPerTD {
            padding-right:3px;
            font-size:28pt;
            font-family:Arial;
            font-weight:500;
            width:35%;
            text-align:center;
        }
        .subbox1,.subbox2,.subbox3,.subbox4,.subbox5,.subbox6 {
            font-size:8.5pt;
            font-family:Calibri;
            font-style:normal;
        }
        .clstdStaticcolor {
            color:#1f4e78;
        }
        .C_header{
            display: inline;
    margin: 7px 26.5%;
    position: absolute;
    font-size: 24pt;
    color:#28669d;
        }
        .ui-dialog .ui-dialog-title {
    width: 98% !important;
    margin: 0 !important;
}
        .ui-dialog .ui-dialog-titlebar {
     padding:0px !important;
    position: relative;
    line-height: 2.5;
}
    </style>

    <script>
        var StoreList = []; var IsFiveStarApplicable = 0;
        $(document).ready(function () {
            IsFiveStarApplicable = $("#cphRight_hdnIsFiveStarApplicable").val();
            var MId = $("#cphRight_hdnMenuId").val();
            if (IsFiveStarApplicable == "1") {
                $("#divFiveStarContainer").show();
                $("div.C_header")[0].innerHTML = MId == 2 ? "Tech Assisted Seller Order Entry Process" : "Tech Assisted Seller Order Edit Process";
                $("#h4header")[0].innerHTML = "My Performance For The Day";
            } else {
                $("#divgridcontainer").css({ "padding-top": "34px" })
                $("#divFiveStarContainer").hide();
                $("#h4header")[0].innerHTML = MId == 2 ? ">> Tech Assisted Seller Order Entry Process" : ">> Tech Assisted Seller Order Edit Process";
            }

            $("body").addClass("clsbodyScroll");
            $('#fraLeft').load(function () {
                $("#fraLeft").contents().find("#DvMenu").find("li").removeClass("activemenu");
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='" + MId + "']").addClass("activemenu");
                $("#fraLeft")[0].height = $(window).height() - ($("#dvBanner").height() + $(".footer").height());
            });

            // Side Slider 
            //if (MId == 3) {
            $('.slidable').hide();
            $(".click-side").click(function () {
                $('.slidable').animate({ width: 'toggle' }, 500);
            });
            //} else {
            //    $('.main-sidebox').hide();

            //}
            if ($("#cphRight_hdnNodeType").val() == 200) {
                $("#tdOnRoute").css("display", "table-cell");
            }
            fnStoreList();

            $('#txtFindDbr').keyup(function () {
                var val = $(this).val().toUpperCase();
                $("#tbldbrlist").find("tbody").eq(0).find("tr").css("display", "none");

                var tbl = $("#tbldbrlist>tbody>tr");
                var tr;
                for (var i = 0; i < tbl.length; i++) {
                    tr = $(tbl[i]);
                    for (var j = 0; j < $(tr).find("td").length; j++) {
                        if ($(tr).find("td").eq(j).attr("Searchable") == "1") {
                            var tdText = $(tr).find("td").eq(j).children().length > 0 ? $(tr).find("td").eq(j).children().html().toUpperCase() : $(tr).find("td").eq(j).html().toUpperCase();
                            if (tdText.indexOf(val) > -1) {
                                $(tr).css("display", "table-row");
                            }
                        }
                    }
                }
                fntblFixedHeader();
            });

        });
        function AddParameter(form, name, value) {
            var $input = $("<input />").attr("type", "hidden")
                .attr("name", name)
                .attr("value", value);
            form.append($input);
        }

        function fnEditOrder(sender) {
            var StoreId = $(sender).closest("tr").attr("storeid");
            var TeleCallingId = $(sender).closest("tr").attr("TeleCallingId");
            var StoreName = $(sender).closest("tr").find("a").eq(0).html();
            var gstno = "";
            gstno = gstno == "" ? 2 : gstno;
            var LastCallDate = "";
            var LastOrderDate = "";
            var Person = $(sender).closest("tr").find("td").eq(2).html();
            var flgDefault = $("#cphRight_ddlRoute option:selected").attr("flgDefault");
            var flgOnRoute = flgDefault;// $("#cphRight_ddlRoute option:selected").attr("flgOnRoute");
            var SalesNodeId = $(sender).closest("tr").attr("BranchNodeId");
            var SalesNodeType = $(sender).closest("tr").attr("BranchNodeType");
            var DBRName = $(sender).closest("tr").attr("DBRName");
            var Branch = $(sender).closest("tr").find("td").eq(1).html();
            var DSEName = $(sender).closest("tr").find("td").eq(2).html();
            var ContactNo = $(sender).closest("tr").find("td").eq(6).find("a").length == 0 ? $(sender).closest("tr").find("td").eq(6).html() : $(sender).closest("tr").find("td").eq(6).find("a").html();
            var Reason = "";// $(sender).closest("tr").find("td").eq(7).html();
            var Channel = $(sender).closest("tr").find("td").eq(4).html();
            var flgRecording = $(sender).closest("tr").attr("flgRecording");
            var strStoreName = StoreId + "^" + SalesNodeId + "^" + SalesNodeType + "^" + TeleCallingId + "^" + ContactNo + "^^" + flgRecording;
            fnShowOrderBookingForm(strStoreName, StoreName, Branch, DSEName, DBRName);
        }
        function fnClosedvOrderPop(flg) {
            try {
                fnStoreList();
                $("#InvReportDialog").dialog('close');
            } catch (err) { }
        }
        function fnRemoveClass() {
            $("#IframeInvRpt").removeClass("iframe-placeholder");
        }
        var flgValidUpdate = 0;
        function fnShowOrderBookingForm(strStoreName, StoreName, Branch, DSEName, DBRName) {
            // alert(screen.availHeight + "ddd" + screen.height);

            $("#IframeInvRpt").attr("src", "about:blank");
            $("#InvReportDialog").dialog({
                modal: true,
                resizable: false,
                title: "TAS:Order booking Form",
                width: window.innerWidth,
                height: window.innerHeight - 5,
                close: function (event, ui) {
                    $("#InvReportDialog")[0].innerHTML = "";
                    $("#InvReportDialog").dialog('destroy');
                    $("body").removeClass("clsbody");
                    $("body").addClass("clsbodyScroll");

                },
                open: function (event, ui) {
                    var $span = $("div[aria-describedby='InvReportDialog']").find("div.ui-dialog-titlebar").find("span.ui-dialog-title");
                    if (IsFiveStarApplicable == "1") {
                        $($span).html('<div><table style="width:100%;font-size:8pt"><tr><td>Store : ' + StoreName + '</td><td id="tdTotalStar" style="width:40%">Stars Earned This Call : </td><td>DSE : ' + DSEName + '</td></tr></table></div>');
                    } else {
                        $($span).html('<div><table style="width:100%;font-size:8pt"><tr><td>Store : ' + StoreName + '</td><td>DSE : ' + DSEName + '</td><td>Branch\\Sub D : ' + Branch + '</td><td>Distributor Name : ' + DBRName + '</td></tr></table></div>');
                    }

                    $("body").removeClass("clsbodyScroll");
                    $("body").addClass("clsbody");
                    var URL = "frmOrderPunching_Telecaller.aspx?strNewStoreDetailTelecaller=" + strStoreName;
                    // alert(URL)
                    //window.location.href = URL;

                    $("#InvReportDialog")[0].innerHTML = "<iframe id='IframeInvRpt' class='iframe-placeholder' src='" + URL + "' style='height: 99%; width: 100%;border:1px solid #808080' scrolling='yes'></iframe>";
                }
            });
        }

        function sendparams() {
            document.body.style.overflow = "hidden";
        }
        function fnUpdateLastCallOrderDate(StoreId, LastCallDate, LastOrderDate, Status, Schedule, Reason) {
            var MId = $("#cphRight_hdnMenuId").val();
            if (MId == 3) {
                $("#tbldbrlist").find("tbody").find("tr[storeid=" + StoreId + "]").find("td").eq(8).html(Status);
                $("#tbldbrlist").find("tbody").find("tr[storeid=" + StoreId + "]").find("td").eq(9).html(Schedule);
                $("#tbldbrlist").find("tbody").find("tr[storeid=" + StoreId + "]").find("td").eq(10).html(Reason);
                $("#tbldbrlist").find("tbody").find("tr[storeid=" + StoreId + "]").find("td").eq(11).html(LastCallDate);
            } else {
                $("#tbldbrlist").find("tbody").find("tr[storeid=" + StoreId + "]").remove();
            }

        }
        function fnRefreshStatus() {

            fnStoreList();
        }
        function fntblFixedHeader() {
            if ($("#tbldbrlist").length > 0) {
                var thead = $("#tbldbrlist").find("thead").eq(0).html();
                $("#divfixedHeader").html("<table id='tbl_Status_fixedhead' cellspacing='0' style='font-size:8pt'><thead>" + thead + "</thead><tbody></tbody></table>");
                for (i = 0; i < $("#tbldbrlist thead").find("th").length; i++) {
                    $("#tbl_Status_fixedhead").find("th").eq(i).css("width", $("#tbldbrlist thead").find("th")[i].offsetWidth);
                    // $("#tbldbrlist thead").find("th").eq(i).css("width", $("#tbldbrlist thead").find("th")[i].offsetWidth);
                }
            }
            $("#divfixedHeader").css("width", $("#divdrmmain")[0].clientWidth);
            $("#divdrmmain").css("width", $("#divdrmmain")[0].clientWidth);
            $("#divHeadercont").css("width", $("#divdrmmain")[0].clientWidth);

        }
        function fnStoreList() {
            var LoginId = $("#cphRight_hdnLoginId").val();
            var MId = $("#cphRight_hdnMenuId").val();
            var NodeType = $("#cphRight_hdnNodeType").val();
            $("#dvFadeForProcessing").show();
            PageMethods.fnStoreList(LoginId, MId, NodeType, function (result) {
                $("#dvFadeForProcessing").hide();
                if (result == "") {
                    $("#divdrmmain")[0].innerHTML = "No Store Found!!!";
                } else if (result.split("|")[0] == "2") {
                    alert("Error-" + result.split("|")[1]);
                }
                else {
                    $("#divdrmmain")[0].innerHTML = result.split("|")[0];
                    var MId = $("#cphRight_hdnMenuId").val();
                    // if (MId == 3) {
                    $("#divslidable")[0].innerHTML = result.split("|")[1];
                    //}
                    var TokenNo = $("#cphRight_hdnTokenNo").val();
                    if (TokenNo == "") {
                        $("#tbldbrlist").find("a[flg=1]").removeAttr("onclick");
                        $("#tbldbrlist").find("a[flg=1]").css({
                            color: "black",
                            "text-decoration": "none",
                            "cursor": "default"
                        })
                    }
                    $("label.toggle").hide();
                    if (IsFiveStarApplicable == 1) {
                        var sData = $.parseJSON('[' + result.split("|")[2] + ']');
                        $("#tdMTDTot")[0].innerHTML = sData[0][0]["TotStarEarnedToday"];
                        $("#tdMTDTot").css("color", sData[0][0]["SETColor"]);
                        $("#tdMTDlbl,#tdMTDval,#tdMTDRanklbl,#tdMTDRankval").css("color", sData[0][0]["MTDRankColor"]);
                        $("#tdMTDval")[0].innerHTML = sData[0][0]["MTDTotStarEarned"];
                        $("#tdMTDRankval")[0].innerHTML = sData[0][0]["MTDRank"] + " of " + sData[0][0]["MTDTotTC"];
                        $("#tdRankTodayval")[0].innerHTML = sData[0][0]["RankToday"] + " of " + sData[0][0]["TotTC"];
                        $("#tdAvgPercalllval")[0].innerHTML = sData[0][0]["AvgStarPerCall"];
                        $("td.box1").css("border-color", sData[0][0]["SETColor"]);
                        $("#tdRankTodaylbl").css("color", sData[0][0]["RankTodayColor"]);
                        $("#tdRankTodayval").css("color", sData[0][0]["RankTodayColor"]);

                        $("#tdCallConPer")[0].innerHTML = sData[0][0]["CallConvPerc"] + "%";
                        $("#tdCallsMadeval")[0].innerHTML = sData[0][0]["CallMade"];
                        $("#tdStarsEarnedval")[0].innerHTML = sData[0][0]["CallConvStarEarned"];
                        $("td.box2").css("border-color", sData[0][0]["CallConvColor"]);
                        $("#tdCallConPer,#tdStarsEarnedlbl,#tdStarsEarnedval").css("color", sData[0][0]["CallConvColor"]);

                        $("#tdProductivityPer")[0].innerHTML = sData[0][0]["ProductivityPerc"] + "%";
                        $("#tdProductivityCallsMadeval")[0].innerHTML = sData[0][0]["CallMade"];
                        $("#tdProductivityStarsEarnedval")[0].innerHTML = sData[0][0]["ProdStarEarned"];
                        $("td.box3").css("border-color", sData[0][0]["ProductivityColor"]);
                        $("#tdProductivityPer,#tdProductivityStarsEarnedlbl,#tdProductivityStarsEarnedval").css("color", sData[0][0]["ProductivityColor"]);

                        $("#tdGPPer")[0].innerHTML = sData[0][0]["GPPerc"] + "%";
                        $("#tdGPPer").css("color", sData[0][0]["GPColor"]);
                        $("#tdGPTargetval")[0].innerHTML = sData[0][0]["TotGPTgt"];
                        $("#tdGPAchievedval")[0].innerHTML = sData[0][0]["TotGPAch"];
                        $("#tdGPStarsEarnedval")[0].innerHTML = sData[0][0]["GPStarEarned"];
                        $("td.box4").css("border-color", sData[0][0]["GPColor"]);
                        $("#tdGPAchievedlbl,#tdGPAchievedval,#tdGPStarsEarnedlbl,#tdGPStarsEarnedval").css("color", sData[0][0]["GPColor"]);

                        $("#tdFBPer")[0].innerHTML = sData[0][0]["FBPerc"] + "%";
                        $("#tdFBPer").css("color", sData[0][0]["FBColor"]);
                        $("#tdFBTargetval")[0].innerHTML = sData[0][0]["TotFBTgt"];
                        $("#tdFBAchievedval")[0].innerHTML = sData[0][0]["TotFBAch"];
                        $("#tdFBStarsEarnedval")[0].innerHTML = sData[0][0]["FBStarEarned"];
                        $("td.box5").css("border-color", sData[0][0]["FBColor"]);
                        $("#tdFBAchievedlbl,#tdFBAchievedval,#tdFBStarsEarnedlbl,#tdFBStarsEarnedval").css("color", sData[0][0]["FBColor"]);

                        $("#tdSTPer")[0].innerHTML = sData[0][0]["STPerc"] + "%";
                        $("#tdSTPer").css("color", sData[0][0]["STColor"]);
                        $("#tdSTTargetval")[0].innerHTML = "&#8377;" + sData[0][0]["TotSTTgt"];
                        $("#tdSTAchievedval")[0].innerHTML = "&#8377;" + sData[0][0]["TotSTAch"];
                        $("#tdSTStarsEarnedval")[0].innerHTML = sData[0][0]["STStarEarned"];
                        $("#tdSTBalanceval")[0].innerHTML = "&#8377;" + sData[0][0]["TotSTBalance"];
                        $("#tdTotSTCompletedTgtval")[0].innerHTML = "&#8377;" + sData[0][0]["TotSTCompletedTgt"];
                        $("td.box6").css("border-color", sData[0][0]["STColor"]);
                        $("#tdSTAchievedlbl,#tdSTAchievedval,#tdSTStarsEarnedlbl,#tdSTStarsEarnedval").css("color", sData[0][0]["STColor"]);
                        $("#tdTotalFiveStar")[0].innerHTML = "Total 5 Star Calls Today - " + sData[0][0]["NoOfCallsFiveStar"] + " / " + sData[0][0]["CallMade"]


                        var sData = $.parseJSON('[' + result.split("|")[3] + ']');
                        // $("#tdMTDlbl,#tdMTDval,#tdMTDRanklbl,#tdMTDRankval").css("color", sData[0][0]["MTDRankColor"]);
                        if (sData[0].length > 0) {
                            $("label.toggle").show();
                            $("#tdMTDTargetval")[0].innerHTML = sData[0][0]["ValueTgt"];
                            $("#tdMTDAchTASval")[0].innerHTML = sData[0][0]["AchValue"] + " ( " + sData[0][0]["AchPerc"] + "% )";
                            $("#tdMTDCombinedTargetval")[0].innerHTML = sData[0][0]["CombinedValueTgt"];
                            $("#tdCombinedAchval")[0].innerHTML = sData[0][0]["CombinedAchValue"] + " ( " + sData[0][0]["CombinedAchPerc"] + "% )";;
                            $("#tdMTDCallsMadeval")[0].innerHTML = sData[0][0]["CallsMade"];
                            $("#tdMTDCallsPickedval")[0].innerHTML = sData[0][0]["CallsPicked"];
                            $("#tdMTDCallsOrderedval")[0].innerHTML = sData[0][0]["CallsOrdered"];

                            $("#tdMTDProductivityCallsMadeval")[0].innerHTML = sData[0][0]["CallsMade"];
                            $("#tdMTDProductivityCallsBilledval")[0].innerHTML = sData[0][0]["CallsBilled"];
                            $("#tdMTDProductivityCallsProductiveval")[0].innerHTML = sData[0][0]["CallsProductive"];
                            $("#tdMTDUniverseval")[0].innerHTML = sData[0][0]["UniverseGPTgt"];
                            $("#tdMTDTASTargetval")[0].innerHTML = sData[0][0]["TASGPTgt"];
                            $("#tdMTDGPAchTASval")[0].innerHTML = sData[0][0]["AchGP"];
                            $("#tdMTDAchCombinedval")[0].innerHTML = sData[0][0]["CombGPAch"];
                            $("#tdFocusBrandTargetval")[0].innerHTML = sData[0][0]["FBTtg"];
                            $("#tdFocusBranchAchievementval")[0].innerHTML = sData[0][0]["FBAch"];
                        }
                    }
                    fntblFixedHeader();
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

        function fnSentNotification(ctrl) {
            $("#loader").css("display", "block");
            $("#fade").css("display", "inline");
            var MobileNo = $(ctrl).html().trim();
            var TokenNo = $("#cphRight_hdnTokenNo").val();
            if (TokenNo == "") {
                alert("Token Number is blank,kindly contact to sysadmin");
                return false;
            }
            PageMethods.fnSentNotification(MobileNo, TokenNo, function (result) {
                $("#loader").css("display", "none");
                $("#fade").css("display", "none");
                if (result.split("^")[0] == "1") {
                    alert("Notification for dialing sent successfully");
                } else {
                    alert("Error:" + result.split("^")[1]);
                }
            }, function (result) {
                $("#loader").css("display", "none");
                $("#fade").css("display", "none");
                alert("Error-" + result._message)
            });
        }
        function fnChangeOnRoute(sender) {
            $("#dvFadeForProcessing").show();
            var flgOnRoute = $(sender).val();
            $("#tbldbrlist tbody tr").hide();
            $("#tbldbrlist tbody tr[flgonroute=" + flgOnRoute + "]").css("display", "table-row");
            $("#dvFadeForProcessing").hide();
            fntblFixedHeader();
        }
        function fnChangeToggle(sender) {
            if ($(sender).is(":checked")) {
                $("#divFiveStarContainer").show();
                $("#divFiveStarMTDContainer").hide();
            } else {
                $("#divFiveStarContainer").hide();
                $("#divFiveStarMTDContainer").show();
            }
        }
    </script>
    <style type="text/css">
    .toggle {
      --width: 100px;
      --height: 27px;

      position: relative;
      display: inline-block;
      width: 120px;
      height: 27px;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
      border-radius: 27px;
      cursor: pointer;
      margin:3px;
    }

    .toggle input {
      display: none;
    }

    .toggle .slider {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 27px;
      background-color: #ccc;
      transition: all 0.4s ease-in-out;
    }

    .toggle .slider::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 27px;
      height: 27px;
      border-radius: 13px;
      background-color: #fff;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
      transition: all 0.4s ease-in-out;
    }

    .toggle input:checked+.slider {
      background-color: #dcf04a;
    }

    .toggle input:checked+.slider::before {
      transform: translateX(92px);
    }

    .toggle .labels {
      position: absolute;
      top: 8px;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: 12px;
      font-family: sans-serif;
      transition: all 0.4s ease-in-out;
    }

    .toggle .labels::after {
      content: attr(data-off);
      position: absolute;
      right: 5px;
      color: #4d4d4d;
      opacity: 1;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
      transition: all 0.4s ease-in-out;
    }

    .toggle .labels::before {
      content: attr(data-on);
      position: absolute;
      left: 5px;
      color: #ffffff;
      opacity: 0;
      text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.4);
      transition: all 0.4s ease-in-out;
    }

    .toggle input:checked~.labels::after {
      opacity: 0;
    }

    .toggle input:checked~.labels::before {
      opacity: 1;
    }
  </style>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphLeft" runat="Server">

    <iframe id="fraLeft" name="fraLeft" height="100%" width="100%" scrolling="yes" frameborder="0"
        src='../frmLeftMainTreeView.aspx'></iframe>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphRight" runat="Server">
    <div id="dvFadeForProcessing" align="center" class="clsloader">
        <img src="../NewImages/ajax-loader.gif" style="margin-top: 300px;" />
    </div>
    <div style="padding-bottom:5px;margin-left: 0px; position: fixed; z-index: 1; width: 100%; background-color: #ffffff" id="divHeadercont">
        <div style="width: 100%;" class="clstitleheader">
            <table id="tblhead" style="width: 100%">
                <tr>
                    <td style="text-align: left;" id="h4header">
                      >> Telecalling Order Entry Process
                    </td>
                    <td>
                        <label class="toggle" style="display:none">
    <input type="checkbox" onchange="fnChangeToggle(this)" checked>
    <span class="slider"></span>
    <span class="labels" data-on="For The Day" data-off="Month To Date"></span>
  </label>
                    </td>
                    <td style="text-align: center; display: none" id="tdOnRoute">
                        <!-- Default inline 1-->
                        <div class="form-check form-check-inline" style="display: inline-block">
                            <input type="radio" class="form-check-input" value="1" id="defaultInline1" checked name="inlineDefaultRadiosExample" onclick="fnChangeOnRoute(this)">
                            <label class="form-check-label" for="defaultInline1">On Route</label>
                        </div>

                        <!-- Default inline 2-->
                        <div class="form-check form-check-inline" style="display: inline-block">
                            <input type="radio" class="form-check-input" value="2" id="defaultInline2" name="inlineDefaultRadiosExample" onclick="fnChangeOnRoute(this)">
                            <label class="form-check-label" for="defaultInline2">Off Route</label>
                        </div>
                    </td>
                    <td id="tdTotalFiveStar" style="text-align:right;padding-right:20px">

                    </td>
                    <td style="width:20%">
                        <div class="input-group" >
                            <input type="text" class="form-control" placeholder="Search Store" style="width: 100%; max-width: 100%;" id="txtFindDbr" />
                            <span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>
                        </div>
                    </td>
                    <td style="padding-left: 20px;width:15%;text-align:right;">
                        <button type="button" class="btn btn-primary" onclick="fnRefreshStatus()" id="btnRefershStatus">
                            <i class="glyphicon glyphicon-refresh"></i>
                            Refresh Status
                        </button>
                    </td>
                </tr>
            </table>
        </div>
        <div class="col-12" style="display:none" id="divFiveStarContainer">
            <table  style="width:100%;margin-bottom:2px">
                <tr>
                    <td class="clsheadertd">Stars Earned Today</td>
                    <td class="clsheaderDividertd"></td>
                    <td class="clsheadertd">Call Conversion</td>
                    <td class="clsheaderDividertd"></td>
                    <td class="clsheadertd">Productivity</td>
                    <td class="clsheaderDividertd"></td>
                    <td class="clsheadertd">Golden Points</td>
                    <td class="clsheaderDividertd"></td>
                    <td class="clsheadertd">Focus Brand</td>
                    <td class="clsheaderDividertd"></td>
                    <td class="clsheadertd">Store Target Hit</td>

                </tr>
                <tr>
                    <td class="clstd box1">
                        <table style="width:100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td id="tdMTDTot" rowspan="4" class="clsPerTD"></td>
                                <td id="tdMTDlbl" class="subbox1" style="width:36%">MTD Stars</td>
                                <td id="tdMTDval" class="subbox1" style="text-align:center"></td>
                            </tr>
                            <tr>
                                <td id="tdMTDRanklbl" class="subbox1">MTD Rank</td>
                                <td id="tdMTDRankval" class="subbox1" style="text-align:center;"></td>
                            </tr>
                            <tr>
                                <td id="tdRankTodaylbl" class="subbox1">Rank Today</td>
                                <td id="tdRankTodayval" class="subbox1" style="text-align:center;"></td>
                            </tr>
                            <tr>
                                <td id="tdAvgPercalllbl" class="subbox1">Avg * per call</td>
                                <td id="tdAvgPercalllval" class="subbox1" style="text-align:center;"></td>
                            </tr>
                        </table>
                    </td>
                   <td class="clsheaderDividertd"></td>
                    <td class="clstd box2">

                        <table style="width:100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td id="tdCallConPer" rowspan="4" class="clsPerTD"></td>
                                <td id="tdCallsMadelbl" class="subbox2 clstdStaticcolor" style="text-align:center;">Calls Made</td>
                            </tr>
                            <tr>
                                <td id="tdCallsMadeval" class="subbox2 clstdStaticcolor" style="text-align:center"></td>
                            </tr>
                            <tr>
                               <td id="tdStarsEarnedlbl" class="subbox2" style="text-align:center">Stars Earned</td>
                            </tr>
                            <tr>
                                <td id="tdStarsEarnedval" class="subbox2" style="text-align:center"></td>
                            </tr>
                        </table>
                    </td>
                    <td class="clsheaderDividertd"></td>
                    <td class="clstd box3">
                         <table style="width:100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td id="tdProductivityPer" rowspan="4" class="clsPerTD"></td>
                                <td id="tdProductivityCallsMadelbl" class="subbox3 clstdStaticcolor" style="text-align:center;">Calls Made</td>
                            </tr>
                            <tr>
                                <td id="tdProductivityCallsMadeval" class="subbox3 clstdStaticcolor" style="text-align:center"></td>
                            </tr>
                            <tr>
                               <td id="tdProductivityStarsEarnedlbl" class="subbox3" style="text-align:center">Stars Earned</td>
                            </tr>
                            <tr>
                                <td id="tdProductivityStarsEarnedval" class="subbox3" style="text-align:center"></td>
                            </tr>
                        </table>

                    </td>
                    <td class="clsheaderDividertd"></td>
                    <td class="clstd box4">
                        <table style="width:100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td id="tdGPPer" rowspan="3" class="clsPerTD"></td>
                                <td id="tdGPTargetlbl" class="subbox4 clstdStaticcolor" style="text-align:left;width:36%">Target</td>
                                <td id="tdGPTargetval" class="subbox4 clstdStaticcolor" style="text-align:center"></td>
                            </tr>
                            <tr>
                                <td id="tdGPAchievedlbl" class="subbox4 clstdStaticcolor" style="text-align:left">Achieved</td>
                                <td id="tdGPAchievedval" class="subbox4 clstdStaticcolor" style="text-align:center"></td>
                            </tr>
                            <tr>
                               <td id="tdGPStarsEarnedlbl" class="subbox4 clstdStaticcolor" style="text-align:left">Stars Earned</td>
                                <td id="tdGPStarsEarnedval" class="subbox4 clstdStaticcolor" style="text-align:center"></td>
                            </tr>
                            
                        </table>
                    </td>
                    <td class="clsheaderDividertd"></td>
                    <td class="clstd box5">
                        <table style="width:100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td id="tdFBPer" rowspan="3" class="clsPerTD"></td>
                                <td id="tdFBTargetlbl" class="subbox5 clstdStaticcolor" style="text-align:left;width:36%">Target</td>
                                <td id="tdFBTargetval" class="subbox5 clstdStaticcolor" style="text-align:center"></td>
                            </tr>
                            <tr>
                                <td id="tdFBAchievedlbl" class="subbox5 clstdStaticcolor" style="text-align:left">Achieved</td>
                                <td id="tdFBAchievedval" class="subbox5 clstdStaticcolor" style="text-align:center"></td>
                            </tr>
                            <tr>
                               <td id="tdFBStarsEarnedlbl" class="subbox5 clstdStaticcolor" style="text-align:left">Stars Earned</td>
                                <td id="tdFBStarsEarnedval" class="subbox5 clstdStaticcolor" style="text-align:center"></td>
                            </tr>
                            
                        </table>

                    </td>
                    <td class="clsheaderDividertd"></td>
                    <td class="clstd box6">
                        <table style="width:100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td id="tdSTPer" rowspan="5" class="clsPerTD"></td>
                                <td id="tdSTTargetlbl" class="subbox6 clstdStaticcolor" style="text-align:left;width:36%" title="Target-Total For Day">Tgt-Total For Day</td>
                                <td id="tdSTTargetval" class="subbox6 clstdStaticcolor" style="text-align:right"></td>
                            </tr>
                            <tr>
                               <td id="tdTotSTCompletedTgtlbl" class="subbox6 clstdStaticcolor" style="text-align:left" title="Target-Calls Made">Tgt-Calls Made</td>
                                <td id="tdTotSTCompletedTgtval" class="subbox6 clstdStaticcolor" style="text-align:right"></td>
                            </tr>
                            <tr>
                                <td id="tdSTAchievedlbl" class="subbox6 clstdStaticcolor" style="text-align:left">Achievement</td>
                                <td id="tdSTAchievedval" class="subbox6 clstdStaticcolor" style="text-align:right"></td>
                            </tr>
                           
                            <tr>
                               <td id="tdSTBalancelbl" class="subbox6 clstdStaticcolor" style="text-align:left" title="Balance Target For the Day">Bal. Tgt For Day</td>
                                <td id="tdSTBalanceval" class="subbox6 clstdStaticcolor" style="text-align:right"></td>
                            </tr>
                             <tr>
                               <td id="tdSTStarsEarnedlbl" class="subbox6 clstdStaticcolor" style="text-align:left">Stars Earned</td>
                                <td id="tdSTStarsEarnedval" class="subbox6 clstdStaticcolor" style="text-align:center"></td>
                            </tr>
                            
                        </table>
                    </td>
                </tr>
            </table>
        </div>

         <div class="col-12" style="display:none" id="divFiveStarMTDContainer">
            <table  style="width:100%;margin-bottom:2px">
                <tr>
                    <td class="clsheadertd">Value</td>
                    <td class="clsheaderDividertd"></td>
                    <td class="clsheadertd">Call Conversion</td>
                    <td class="clsheaderDividertd"></td>
                    <td class="clsheadertd">Productivity</td>
                    <td class="clsheaderDividertd"></td>
                    <td class="clsheadertd">Golden Points</td>
                    <td class="clsheaderDividertd"></td>
                    <td class="clsheadertd">Focus Brand</td>
                </tr>
                <tr>
                    <td class="clstdMTD box1">
                        <table style="width:100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td id="tdMTDTargetlbl" class="subbox1" style="width:36%">Target</td>
                                <td id="tdMTDTargetval" class="subbox1" style="text-align:center"></td>
                            </tr>
                            <tr>
                                <td id="tdMTDAchTASlbl" class="subbox1">Ach TAS</td>
                                <td id="tdMTDAchTASval" class="subbox1" style="text-align:center;"></td>
                            </tr>
                            <tr>
                                <td id="tdMTDCombinedTargetlbl" class="subbox1">Combined Target</td>
                                <td id="tdMTDCombinedTargetval" class="subbox1" style="text-align:center;"></td>
                            </tr>
                            <tr>
                                <td id="tdCombinedAchlbl" class="subbox1">Combined Ach</td>
                                <td id="tdCombinedAchval" class="subbox1" style="text-align:center;"></td>
                            </tr>
                        </table>
                    </td>
                   <td class="clsheaderDividertd"></td>
                    <td class="clstdMTD box2">

                        <table style="width:100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td id="tdMTDCallsMadelbl" class="subbox2" style="width:36%">Calls Made</td>
                                <td id="tdMTDCallsMadeval" class="subbox2" style="text-align:center"></td>
                            </tr>
                            <tr>
                                <td id="tdMTDCallsPickedlbl" class="subbox2">Calls Picked</td>
                                <td id="tdMTDCallsPickedval" class="subbox2" style="text-align:center;"></td>
                            </tr>
                            <tr>
                                <td id="tdMTDCallsOrderedlbl" class="subbox2">Calls Ordered</td>
                                <td id="tdMTDCallsOrderedval" class="subbox2" style="text-align:center;"></td>
                            </tr>
                        </table>
                    </td>
                    <td class="clsheaderDividertd"></td>
                    <td class="clstdMTD box3">
                         <table style="width:100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td id="tdMTDProductivityCallsMadelbl" class="subbox3" style="width:36%">Calls Made</td>
                                <td id="tdMTDProductivityCallsMadeval" class="subbox3" style="text-align:center"></td>
                            </tr>
                            <tr>
                                <td id="tdMTDProductivityCallsBilledlbl" class="subbox3">Calls Billed</td>
                                <td id="tdMTDProductivityCallsBilledval" class="subbox3" style="text-align:center;"></td>
                            </tr>
                            <tr>
                                <td id="tdMTDProductivityCallsProductivelbl" class="subbox3">Calls Productive</td>
                                <td id="tdMTDProductivityCallsProductiveval" class="subbox2" style="text-align:center;"></td>
                            </tr>
                        </table>

                    </td>
                    <td class="clsheaderDividertd"></td>
                    <td class="clstdMTD box4">
                        <table style="width:100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td id="tdMTDUniverselbl" class="subbox4" style="width:36%">Universe</td>
                                <td id="tdMTDUniverseval" class="subbox4" style="text-align:center"></td>
                            </tr>
                            <tr>
                                <td id="tdMTDTASTargetlbl" class="subbox4">TAS Target</td>
                                <td id="tdMTDTASTargetval" class="subbox4" style="text-align:center;"></td>
                            </tr>
                            <tr>
                                <td id="tdMTDGPAchTASlbl" class="subbox4">Ach TAS</td>
                                <td id="tdMTDGPAchTASval" class="subbox4" style="text-align:center;"></td>
                            </tr>
                            <tr>
                                <td id="tdMTDAchCombinedlbl" class="subbox4">Ach Combined</td>
                                <td id="tdMTDAchCombinedval" class="subbox4" style="text-align:center;"></td>
                            </tr>
                        </table>
                    </td>
                    <td class="clsheaderDividertd"></td>
                    <td class="clstdMTD box5">
                        <table style="width:100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td id="tdFocusBrandTargetlbl" class="subbox4" style="width:59%">Focus Brand Target</td>
                                <td id="tdFocusBrandTargetval" class="subbox4" style="text-align:center"></td>
                            </tr>
                            <tr>
                                <td id="tdFocusBranchAchievementlbl" class="subbox4">Focus Branch Achievement</td>
                                <td id="tdFocusBranchAchievementval" class="subbox4" style="text-align:center;"></td>
                            </tr>
                            </table>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div style="padding-top: 148px;border-top:2px solid #ffffff" id="divgridcontainer">
        <div id="divfixedHeader" style="margin-left: 0px; position: fixed; z-index: 1"></div>
        <div id="divdrmmain" style="margin-left: 0px;">
        </div>
    </div>
    <div id="InvReportDialog" style="display: none; padding: 0px; text-align: center;" title="Order Booking Form">
    </div>

    <div class="main-sidebox">
        <div class="click-side">STATUS</div>
        <div class="slidable" id="divslidable">
        </div>
    </div>

    <!-- Side Slider -->
    <asp:HiddenField runat="server" ID="hdnIsFiveStarApplicable" Value="0" />
    <asp:HiddenField runat="server" ID="hdnLoginId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnMenuId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnTokenNo" Value="0" />
    <asp:HiddenField runat="server" ID="hdnNodeType" Value="0" />


</asp:Content>

