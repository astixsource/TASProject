<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" CodeFile="frmRouteList_PDA.aspx.cs" Inherits="ManageOrder_frmRouteList_PDA" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
   <link rel="stylesheet" href="../css/bootstrap.min.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
     <script src="../scripts/jquery-3.6.0.js"></script>
    <link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />
    <script src="../scripts/jquery-ui.js"></script>
    <link href="../styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>
    <style>
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
        .container {
    padding-right: 2px !important;
    padding-left: 2px !important;
    margin-right: auto;
    margin-left: auto;
    width:100% !important;
}
         .main-sidebox {
            position: fixed;
            right: 0;
            top: 182px;
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
            overflow:hidden !important;
        }
       .clsbodyScroll {
            overflow:hidden !important;
            overflow-y:auto !important;
        }
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

        h4 {
             font-size: 13px;
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
   
    <script>
        var StoreList = [];
        $(document).ready(function () {
            var MId = $("#cphRight_hdnMenuId").val();
            $("#h4header")[0].innerHTML = MId == 2 ? ">> Tech Assisted Seller Order Entry Process" : ">> Tech Assisted Seller Order Edit Process";
            $("body").addClass("clsbodyScroll");
            $('#fraLeft').load(function () {
                $("#fraLeft").contents().find("#DvMenu").find("li").removeClass("activemenu");
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='"+MId+"']").addClass("activemenu");
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
                var NodeType = $("#cphRight_hdnNodeType").val();
                if (NodeType != 200) {
                    $("#tronroute").hide();
                } else {
                    $("input[name='inlineDefaultRadiosExample']").eq(0).prop("checked", true);
                    $("#tronroute").css("display", "table-row");
                }
                
                fnStoreList();
                
            $('#txtFindDbr').keyup(function () {
                var val = $(this).val().toUpperCase();
                $("#tbldbrlist").find("tbody").eq(0).find("tr").css("display", "none");
                var flgOnRoute = $("input[name='inlineDefaultRadiosExample']:checked").val();
                var tbl = $("#tbldbrlist>tbody").find("tr[flgonroute='" + flgOnRoute + "']");
                var tr;
                for (var i = 0; i < tbl.length; i++) {
                    tr = $(tbl[i]);
                    for (var j = 0; j < $(tr).find("td").length; j++) {
                        if ($(tr).find("td").eq(j).attr("Searchable") == "1") {
                            var tdText =$(tr).find("td").eq(j).children().length>0? $(tr).find("td").eq(j).children().html().toUpperCase():$(tr).find("td").eq(j).html().toUpperCase();
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
            var Person = "";// $(sender).closest("tr").find("td").eq(2).html();
            var flgDefault = "";// $("#cphRight_ddlRoute option:selected").attr("flgDefault");
            var flgOnRoute = flgDefault;// $("#cphRight_ddlRoute option:selected").attr("flgOnRoute");
            var SalesNodeId = $(sender).closest("tr").attr("BranchNodeId");
            var SalesNodeType = $(sender).closest("tr").attr("BranchNodeType");
            var Branch = "";// $(sender).closest("tr").find("td").eq(1).html();
            var ContactNo = $(sender).closest("tr").find("td").eq(2).find("a").length == 0 ? $(sender).closest("tr").find("td").eq(2).html() : $(sender).closest("tr").find("td").eq(2).find("a").html();
            var Reason = "";// $(sender).closest("tr").find("td").eq(7).html();
            var Channel = "";// $(sender).closest("tr").find("td").eq(4).html();
            var flgRecording = $(sender).closest("tr").attr("flgRecording");
            var strStoreName = StoreId + "^" + SalesNodeId + "^" + SalesNodeType + "^" + TeleCallingId + "^" + ContactNo + "^" + Reason + "^" + flgRecording;
            fnShowOrderBookingForm(strStoreName, StoreName);
        }
        function fnClosedvOrderPop(flg) {
            try {
                $("#InvReportDialog").dialog('close');
                //$("#IframeInvRpt")[0].src = "about:blank";
                //$("#InvReportDialog").dialog('destroy');
                fnStoreList();
            } catch (err) { }
        }
        function fnRemoveClass() {
            $("#IframeInvRpt").removeClass("iframe-placeholder");
        }
        var flgValidUpdate = 0;
        function fnShowOrderBookingForm(strStoreName, StoreName) {
            // alert(screen.availHeight + "ddd" + screen.height);
            window.location.href="frmOrderPunching_PDA.aspx?flgOffline=7&strNewStoreDetailTelecaller=" + strStoreName
            /*
            $("#IframeInvRpt").addClass("iframe-placeholder");
            $("#IframeInvRpt")[0].src = "about:blank";
            $("#InvReportDialog").dialog({
                modal: true,
                resizable: false,
                title: "Tech Assisted Seller Order booking Form : " + StoreName,
                width: $(document).width(),
                height: screen.availHeight-90,
                close: function (event, ui) {
                    $("body").removeClass("clsbody");
                    $("body").addClass("clsbodyScroll");
                    $("#IframeInvRpt").removeClass("iframe-placeholder");
                    // Clear the URL so Chrome/Firefox don't refresh the iframe when it's hidden.
                    $("#IframeInvRpt").prop("src", "about:blank");
                },
                open: function (event, ui) {
                    $("body").removeClass("clsbodyScroll");
                    $("body").addClass("clsbody");
                    $("#IframeInvRpt").prop("src", "frmOrderPunching_DSE.aspx?flgOffline=7&strNewStoreDetailTelecaller=" + strStoreName);
                    
                }
            });
            */
        }

        function sendparams() {
            document.body.style.overflow = "hidden";
        }
        function fnUpdateLastCallOrderDate(StoreId, LastCallDate, LastOrderDate, Status,Schedule,Reason) {
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
            $("input[name='inlineDefaultRadiosExample']").eq(0).prop("checked", true);
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
        function fnChangeOnRoute(sender) {
            $("#dvFadeForProcessing").show();
            var flgOnRoute = $(sender).val();
            $("#tbldbrlist tbody tr").hide();
            $("#tbldbrlist tbody tr[flgonroute=" + flgOnRoute + "]").css("display", "table-row");
            $("#dvFadeForProcessing").hide();
        }
        function fnStoreList() {
            var LoginId = $("#cphRight_hdnLoginId").val();
            var MId = $("#cphRight_hdnMenuId").val();
            var NodeType = $("#cphRight_hdnNodeType").val();
            
            $("#dvFadeForProcessing").show();
            PageMethods.fnStoreList(LoginId,MId,NodeType, function (result) {
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
                            "cursor":"default"
                        })
                    }
                    //fntblFixedHeader();
                    //$("#tbldbrlist").DataTable({
                    //    scrollY: "55vh",
                    //    scrollX: false,
                    //    scrollCollapse: true,
                    //    paging: false,
                    //    "ordering": false,
                    //    "info": false,
                    //    "bFilter": false,
                    //    "bSorting": false,
                    //    "searching": false,
                    //})
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
            PageMethods.fnSentNotification(MobileNo,TokenNo, function (result) {
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
    </script>
    
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphLeft" runat="Server">
    
        <iframe id="fraLeft" name="fraLeft" height="100%" width="100%" scrolling="yes" frameborder="0"
            src='../frmLeftMainTreeView.aspx'></iframe>
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphRight" runat="Server">
    <div id="dvFadeForProcessing" align="center" class="clsloader">
            <img src="../NewImages/ajax-loader.gif" style="margin-top: 300px;" />
        </div>
    <div style="margin-left: 0px; position:fixed;z-index:1;width:100%;background-color:#ffffff" id="divHeadercont">
    <h4 id="h4header">>> Telecalling Order Entry Process</h4>
    <div style="margin-top:10px;width:100%">
        <table id="tblhead" style="width:100%">
            <tr>
                
                    <td>
                    <div class="inner-addon right-addon" style="width:100%">
      <i class="glyphicon glyphicon-search"></i>
      <input type="text" class="form-control" placeholder="Search Store" style="width:100%;max-width:100%;margin-bottom:3px;border: 1px solid #bbbbbb;"  id="txtFindDbr" />
    </div>
                </td>
                <td style="padding-left:20px">
                    <input type="button" value="Refresh Status" class="btn btn-primary" onclick="fnRefreshStatus()" id="btnRefershStatus" />
                </td>
            </tr>
            <tr id="tronroute" style="display:none">
                <td style="text-align:center;" colspan="2">
                    <!-- Default inline 1-->
<div class="form-check form-check-inline" style="display:inline-block">
  <input type="radio" class="form-check-input" value="1" id="defaultInline1" checked name="inlineDefaultRadiosExample" onclick="fnChangeOnRoute(this)">
  <label class="form-check-label" for="defaultInline1">On Route</label>
</div>

<!-- Default inline 2-->
<div class="form-check form-check-inline" style="display:inline-block">
  <input type="radio" class="form-check-input" value="2" id="defaultInline2" name="inlineDefaultRadiosExample" onclick="fnChangeOnRoute(this)" >
  <label class="form-check-label" for="defaultInline2"  >Off Route</label>
</div>
                </td>
            </tr>
        </table>
    </div>
        </div>
    <div style="padding-top:90px">
    <div id="divfixedHeader" style="margin-left: 0px; position:fixed;z-index:1;display:none"></div>
    <div id="divdrmmain"   style="margin-left: 0px;">
    </div>
   </div>
     <div id="InvReportDialog" style="display: none; padding: 0px; text-align: center;" title="Order Booking Form">
        <iframe id='IframeInvRpt' style="height: 99%; width: 100%;border:1px solid #808080" scrolling="yes"></iframe>
    </div>

    <div class="main-sidebox">
            <div class="click-side">STATUS</div>
            <div class="slidable" id="divslidable">
                
            </div>
        </div>
        
        <!-- Side Slider -->
    <asp:HiddenField runat="server" ID="hdnLoginId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnMenuId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnTokenNo" Value="0" />
    <asp:HiddenField runat="server" ID="hdnNodeType" Value="0" />
    
    
</asp:Content>

