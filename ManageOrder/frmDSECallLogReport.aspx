<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" CodeFile="frmDSECallLogReport.aspx.cs" Inherits="frmDSECallLogReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="../scripts/jquery-3.6.0.js"></script>
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />
    <link href="../styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/Multiselect/jquery.multiselect.css" rel="stylesheet" />
    <link href="../Styles/Multiselect/jquery.multiselect.filter.css" rel="stylesheet" />
    <script src="../Scripts/jquery-ui.js"></script>
    <script src="../Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>

    <script src="../scripts/Multiselect/jquery.multiselectLatest.js"></script>
    <script src="../scripts/Multiselect/jquery.multiselect.filter.js"></script>
    <link href="../css/jquery.dataTables.min.css" rel="stylesheet" />
    <script src="../Scripts/jquery.dataTables.min.js"></script>
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
            background-color: #ffffff;
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
        /* .ui-multiselect-checkboxes{
            height:200px !important;
        }*/
        body {
            overflow-y: scroll !important;
        }

        button.ui-multiselect {
            width: 99.5% !important;
        }

        .row {
            margin-right: 0px !important;
            margin-left: 0px !important;
        }
    </style>
    <style>

        .switch {
  position: relative;
  display: inline-block;
  width: 90px;
  height: 34px;
}

.switch input[type=checkbox] {display:none;}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ca2222;
  -webkit-transition: .4s;
  transition: .4s;
   border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2ab934;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(55px);
}

/*------ ADDED CSS ---------*/
.slider:after
{
 content:'OFF';
 color: white;
 display: block;
 position: absolute;
 transform: translate(-50%,-50%);
 top: 50%;
 left: 50%;
 font-size: 10px;
 font-family: Verdana, sans-serif;
}

input:checked + .slider:after
{  
  content:'ON';
}

/*--------- END --------*/
    </style>


    <script>
        var StoreList = [];
        $(document).ready(function () {
            $('#fraLeft').load(function () {
                $("#fraLeft").contents().find("#DvMenu").find("li").removeClass("activemenu");
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='56']").addClass("activemenu");
                $("#fraLeft")[0].height = $(window).height() - ($("#dvBanner").height() + $(".footer").height());
            });

            //$("#divbtn").hide();

            $("#cphRight_ddlSite").multiselect({
                showcheckall: false,
                multiple: true
            }).multiselectfilter();

            $("input[name='multiselect_cphRight_ddlSite']").change(function () {
                if ($("input[name='multiselect_cphRight_ddlSite']:checked").length > 3) {
                    alert("You can not select more than 3");
                    $(this)[0].checked = false;
                }
            })

            $("#cphRight_ddlSite").closest("td").find("button").find("span[flgspan=1]").css("width", ($("#cphRight_ddlSite").closest("td").find("button").width() - 20) + "px");
            $("#cphRight_ddlSite").closest("td").find("button").find("span[flgspan=1]").css("white-space", "nowrap");
            //$("#cphRight_ddlReason").multiselect();
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
            var LoginId = $("#cphRight_hdnLoginId").val();
            var SiteNodeIds = ""
            //var ReasonIds = "";
            var $checkedSite = $("input[name='multiselect_cphRight_ddlSite']:checked");
            //for (var i = 0; i < $checkedSite.length; i++) {
            //    if (SiteNodeIds == "") {
            //        SiteNodeIds = $checkedSite.eq(i).val().split('-')[0];
            //    } else {
            //        SiteNodeIds += "|" + $checkedSite.eq(i).val().split('-')[0];
            //    }
            //}
            window.open("../frmDownloadExcel.aspx?flg=19&sDate=" + sDate + "&LoginId=" + LoginId + "&SiteNodeIds=" + SiteNodeIds);
        }
        function fnDownloadCCRReport() {
            var sDate = $("#txtDate").val();
            var LoginId = $("#cphRight_hdnLoginId").val();
            var SiteNodeIds = ""
            //var ReasonIds = "";
            var $checkedSite = $("input[name='multiselect_cphRight_ddlSite']:checked");
            for (var i = 0; i < $checkedSite.length; i++) {
                if (SiteNodeIds == "") {
                    SiteNodeIds = $checkedSite.eq(i).val().split('-')[0];
                } else {
                    SiteNodeIds += "|" + $checkedSite.eq(i).val().split('-')[0];
                }
            }
            window.open("../frmDownloadExcel.aspx?flg=20&sDate=" + sDate + "&LoginId=" + LoginId + "&SiteNodeIds=" + SiteNodeIds);
        }

        function fnShowReport(flgExcel) {
            var sDate = $("#txtDate").val();
            // var eDate = $("#txtToDate").val();
            var LoginId = $("#cphRight_hdnLoginId").val();
            //var ViewType = $("#ddlViewType").val();
            var SiteNodeIds = ""
            //var ReasonIds = "";
            var $checkedSite = $("input[name='multiselect_cphRight_ddlSite']:checked");
            for (var i = 0; i < $checkedSite.length; i++) {
                if (SiteNodeIds == "") {
                    SiteNodeIds = $checkedSite.eq(i).val().split('-')[0];
                } else {
                    SiteNodeIds += "|" + $checkedSite.eq(i).val().split('-')[0];
                }
            }
            var chkIncludeAllDSE = $("#chkIncludeAllDSE").is(":checked") ? 1 : 0;
            //var $checkedReason = $("input[name='multiselect_cphRight_ddlReason']:checked");
            //for (var i = 0; i < $checkedReason.length; i++) {
            //    if (ReasonIds == "") {
            //        ReasonIds = $checkedReason.eq(i).val();
            //    } else {
            //        ReasonIds += "|" + $checkedReason.eq(i).val();
            //    }
            //}
            $("#dvFadeForProcessing").show();
            PageMethods.fnDailyOrderStatusReport(LoginId, sDate, SiteNodeIds, chkIncludeAllDSE, function (result) {
                $("#dvFadeForProcessing").hide();
                if (result.split("^")[0] == "2") {
                    $("#divMainData")[0].innerHTML = "Error : " + result.split("^")[1];

                } else {
                    var str = result.split("^")[1];

                    $("#tblLegends")[0].innerHTML = result.split("^")[2].split("|~|")[0];
                    $("#divMainData")[0].innerHTML = str.split("|~|")[0];
                    // $("#divMeasure")[0].innerHTML = str.split("|~|")[1];
                    if (detectmob() != true) {
                        //alert("hi")
                        fntblFixedHeader();

                        //$('#tbldbrlist').DataTable({
                        //    scrollY: '40vh',
                        //    scrollCollapse: true,
                        //    paging: false
                        //});
                    }
                }

            }, function (result) {
                alert("Error-" + result._message);
                $("#dvFadeForProcessing").hide();
            });
        }

        function fnRptDSECallLogDetailDashboard(sender) {
            $("#divDSECallLogDetailDashboard").dialog({
                title: "DSE Call Logger Details-" + $(sender).attr("dsename"),
                modal: true,
                width: "70%",
                height: window.innerHeight - 20,
                close: function (event, ui) {
                    $("#divDSECallLogDetailDashboard").html("");
                    $("#divDSECallLogDetailDashboard").dialog('destroy');
                },
                open: function (event, ui) {
                    $("#dvFadeForProcessing").show();
                    var sDate = $("#txtDate").val();
                    PageMethods.fnRptDSECallLogDetailDashboard($(sender).closest("tr").attr("nodeid"), $(sender).closest("tr").attr("nodetype"), sDate, function (result) {
                        $("#dvFadeForProcessing").hide();
                        if (result.split("^")[0] == "2") {
                            $("#divDSECallLogDetailDashboard")[0].innerHTML = "Error : " + result.split("^")[1];

                        } else {
                            var str = result.split("^")[1];

                            $("#divDSECallLogDetailDashboard")[0].innerHTML = str.split("|~|")[0];
                        }

                    }, function (result) {
                        alert("Error-" + result._message);
                        $("#dvFadeForProcessing").hide();
                    });
                },
                buttons: {
                    "Download In Excel": function () {
                        window.open("../frmDownloadExcel.aspx?flg=18&dsename=" + $(sender).attr("dsename"));
                    }
                }
            });
        }
        var NodeId = 0; var NodeType = 0;
        function fnRptDSECallDetails(sender) {
            NodeId = $(sender).closest("tr").attr("nodeid");
            NodeType = $(sender).closest("tr").attr("nodetype");
            var DSEMTASStatusId = $(sender).closest("tr").attr("DSEMTASStatusId");
            var str = "";
            // str += "<div style='margin-bottom:0px;text-align:center'><input type='button' id='btnUpdateAppStatus'  value='Disabled App' class='btn btn-primary' onclick='fnDisableApp(this)' /></div>";

            str += "<table class='table' style='margin-bottom:0px'>";
            str += "<tr>";
            str += "<td style='width:28%'>Version No</td><td style='width:5%'>:</td><td>" + $(sender).closest("tr").attr("VersionNo") + "</td>";
            str += "</tr>";
            str += "<tr>";
            str += "<td>Last Sync Time</td><td>:</td><td>" + $(sender).closest("tr").attr("LastSyncTime") + "</td>";
            str += "</tr>";
            str += "<tr>";
            str += "<td>App Status</td><td>:</td><td>" + $(sender).closest("tr").attr("flgAppWork") + "</td>";
            str += "</tr>";

            str += "<tr>";
            str += "<td>Call Tracking</td><td>:</td><td style='padding:2px;vertical-align:middle'><label class='switch'><input type='checkbox' id='togBtn' " + (DSEMTASStatusId==0?"":"checked")+" onclick='fnChangeCallTrack(this)'><div class='slider round'></div></label></td>";
            str += "</tr>";
            str += "<tr " + (DSEMTASStatusId == 0 ? "style='display:none'" : "") +">";
            str += "<td colspan='3'><table style='width:100%' id='tblsDate'><tr><td>Call Track From :</td><td><input id='txtTrackFrom' value='" + $(sender).closest("tr").attr("fromdate") + "' style='width:100px' disabled='disabled' readonly='readonly' /></td><td>Call Track To :</td><td><input id='txtTrackTo'  disabled='disabled'  readonly='readonly' style='width:100px' value='" + $(sender).closest("tr").attr("todate") +"' /></td></tr></table></td>";
            str += "</tr>";
            str += "<tr>";
            str += "<td>Version Status</td><td>:</td><td>" + $(sender).closest("tr").attr("flgVersionChk") + "</td>";
            str += "</tr>";
            str += "<tr>";
            str += "<td>DSE Contact No</td><td>:</td><td id='tdContactNo'>" + $(sender).closest("tr").attr("dsecontactno") + "</td>";
            str += "</tr>";
            str += "</table>";
            str += "<div class='form-check form-check-inline text-center' id='divDSELog' style='" + (DSEMTASStatusId==0?"display:none":"")+"'><input type='radio' id='btnUpdateContact' class='form-check-input' value='1' class='btn btn-primary'  onclick='fnEditContactInfo(this)' name='rdoUPD' /><label class='form-check-label' for='btnUpdateContact' style='margin-right:10px;padding-left:5px;font-size:11pt !important;font-weight:bold !important'> Update Contact No</label><input type='radio'  name='rdoUPD'  id='btnInstallNewDevice' flg='2' class='form-check-input' value='2' onclick='fnEditContactInfo(this)' class='btn btn-primary sm mr-2' /><label class='form-check-label' for='btnInstallNewDevice'  style='padding-left:5px;font-size:11pt !important;font-weight:bold !important'> Install on New Device</label></div>";
            str += "<div class='form-check form-check-inline text-center' id='divDSEInstallation' style='" + (DSEMTASStatusId == 0 ? "display:none" : "") +"'><a href='../DSECallLogApp.pdf' style='color:blue;margin-left:10px;font-size:9pt' download >Download Installation Guide</a></div>";

            str += "<div id='divContactContainer' style='margin-top:10px'>";
            str += "</div>";
            $("#divDSECallLogDetailDashboard")[0].innerHTML = str;
            $("#divDSECallLogDetailDashboard").dialog({
                title: "DSE Call Details-" + $(sender).text(),
                modal: true,
                width: "35%",
                height: "auto",
                open: function () {
                    var StartDate = $("#txtTrackFrom").val() == "" ? new Date('<%=DateTime.Now.AddDays(1)%>') : new Date($("#txtTrackFrom").val().replace(/\-/g, ' '));
                        $("#txtTrackFrom").val(StartDate.localeFormat('dd-MMM-yyyy'))
                    $("#txtTrackFrom").datepicker({
                        minDate: new Date('<%=DateTime.Now.AddDays(1)%>'),
                        dateFormat: 'dd-M-yy',
                        changeMonth: true,
                        changeYear: true,
                        onClose: function (selectedDate) {
                            $("#txtTrackTo").datepicker("option", "minDate", selectedDate);
                        }
                    });
                    var lastDay = new Date(StartDate.getFullYear(), StartDate.getMonth() + 1, 0);
                    if ($("#txtTrackTo").val() == "") {
                        $("#txtTrackTo").val(lastDay.localeFormat('dd-MMM-yyyy'))
                    }
                    $("#txtTrackTo").datepicker({
                        dateFormat: 'dd-M-yy',
                        minDate: $("#txtTrackFrom").val(),
                        changeMonth: true,
                        changeYear: true,
                    });
                    $("#txtTrackFrom,#txtTrackTo").prop("disabled", true)
                    $("#txtTrackFrom,#txtTrackTo").css({
                        "border": "none",
                        "background-color": "transparent"
                    })
                    $("div[aria-describedby='divDSECallLogDetailDashboard']").find("div.ui-dialog-buttonset").find("button").eq(0).hide();

                },
                close: function (event, ui) {
                    $("#divDSECallLogDetailDashboard").html("");
                    $("#divDSECallLogDetailDashboard").dialog('destroy');
                },
                buttons: {
                    "Update": function () {
                        var strmsg = "Are you sure to take action?";

                        var $Inputs = $("#tblContactList input:text");
                        var ContactNo1 = "";
                        var ContactNo2 = "";
                        if ($("input[name='rdoUPD']:checked").length > 0) {
                            if ($Inputs.eq(0).val().length == 0) {
                                alert("Enter Contact 1 First!");
                                $Inputs.eq(0).focus();
                                return false;
                            }
                            if ($Inputs.eq(0).val() != "") {
                                if ($Inputs.eq(0).val().length > 10 || $Inputs.eq(0).val().length < 10) {
                                    alert("Enter Valid Contact No");
                                    return false;
                                }
                                ContactNo1 = $Inputs.eq(0).val();
                            }
                            ContactNo2 = "";
                            if ($Inputs.length == 2) {
                                if ($Inputs.eq(1).val() != "") {
                                    if ($Inputs.eq(1).val().length > 10 || $Inputs.eq(1).val().length < 10) {
                                        alert("Enter Valid Contact No");
                                        return false;
                                    }
                                    ContactNo2 = $Inputs.eq(1).val();
                                }
                            }
                        }
                        if ($("input[name='rdoUPD']:checked").length > 0) {
                            flgUpdType = $("input[name='rdoUPD']:checked").val();
                            if (flgUpdType == 2) {
                                strmsg = "<b>Note:</b><br/>A SMS is being sent to DSE Contact number <" + ContactNo1+"> Please ensure that the SIM with this contact number is placed on New Device where application need to install . You can download and follow the guideline to install the application on New Device from the link below.";
                            }
                        }

                        $("#divDialog")[0].innerHTML = strmsg;
                        $("#divDialog").dialog({
                            title: "Confirmation : ",
                            modal: true,
                            width: "500",
                            height: "auto",
                            close: function (event, ui) {
                                $("#divDialog").html("");
                                $("#divDialog").dialog('destroy');
                            },
                            buttons: {
                                "Yes": function () {
                                    $("#dvFadeForProcessing").show();
                                    var sDate = $("#txtDate").val();
                                    var LoginId = $("#cphRight_hdnLoginId").val();
                                    var $Inputs = $("#tblContactList input:text");
                                    var ContactNo1 = "";
                                    var ContactNo2 = "";
                                    if ($("input[name='rdoUPD']:checked").length > 0) {
                                        if ($Inputs.eq(0).val().length == 0) {
                                            alert("Enter Contact 1 First!");
                                            $Inputs.eq(0).focus();
                                            return false;
                                        }
                                        if ($Inputs.eq(0).val() != "") {
                                            if ($Inputs.eq(0).val().length > 10 || $Inputs.eq(0).val().length < 10) {
                                                alert("Enter Valid Contact No");
                                                return false;
                                            }
                                            ContactNo1 = $Inputs.eq(0).val();
                                        }
                                        ContactNo2 = "";
                                        if ($Inputs.length == 2) {
                                            if ($Inputs.eq(1).val() != "") {
                                                if ($Inputs.eq(1).val().length > 10 || $Inputs.eq(1).val().length < 10) {
                                                    alert("Enter Valid Contact No");
                                                    return false;
                                                }
                                                ContactNo2 = $Inputs.eq(1).val();
                                            }
                                        }
                                    } else {

                                        var ContactNumbers = $("#tdContactNo").text();
                                        ContactNo1 = "";
                                        ContactNo2 = "";
                                        var cnt = 0;
                                        for (var i = 0; i < ContactNumbers.split(",").length; i++) {
                                            if (ContactNumbers.split(",")[i] != "") {
                                                cnt++;
                                                if (cnt == 1) {
                                                    ContactNo1 = ContactNumbers.split(",")[i];
                                                }
                                                else {
                                                    ContactNo2 = ContactNumbers.split(",")[i];
                                                }
                                            }
                                        }

                                    }


                                    // if ($("#togBtn").is(":checked")) {
                                    var StartDate = $("#txtTrackFrom").val();
                                    var EndDate = $("#txtTrackTo").val();
                                    //}
                                    var flgUpdType = 0;
                                    if ($("input[name='rdoUPD']:checked").length > 0) {
                                        flgUpdType = $("input[name='rdoUPD']:checked").val();
                                    }
                                    $("#divDialog").dialog('close');
                                    PageMethods.fnUpdateCLDSELoggerCallUpdate(NodeId, NodeType, ContactNo1, ContactNo2, flgUpdType, LoginId, StartDate, EndDate, function (result) {
                                        $("#dvFadeForProcessing").hide();
                                        if (result.split("^")[0] == "2") {
                                            fnShowDialog("Error : " + result.split("^")[1]);
                                        } else {
                                            $("#divDSECallLogDetailDashboard").dialog('close');
                                            fnShowReport(0);
                                        }

                                    }, function (result) {
                                        fnShowDialog("Error-" + result._message);
                                        $("#dvFadeForProcessing").hide();
                                    });
                                },
                                "No": function () {
                                    $(this).dialog('close');
                                }
                            }
                        });

                       

                    },
                    "Close": function () {
                        $(this).dialog('close');
                    }
                }
            });
        }

        function fnChangeCallTrack(sender) {
            $("#divDSELog").hide();
            $("#divDSEInstallation").hide();
            $("#divContactContainer").hide();

            $("#txtTrackFrom,#txtTrackTo").prop("disabled",false)

            $("#txtTrackFrom,#txtTrackTo").css({
                "border":"1px solid #b0b0b0",
                "background-color":"transparent"
            })
            $("div[aria-describedby='divDSECallLogDetailDashboard']").find("div.ui-dialog-buttonset").find("button").eq(0).show();
            StartDate = $("#txtTrackFrom").val();
            EndDate = $("#txtTrackTo").val();
            if ($(sender).is(":checked")) {
                $("#divDSELog").show();
                $("#tblsDate").closest("tr").css("display", "table-row");
                $("#tblsDate td").eq(0).css("display","table-cell");
                $("#tblsDate td").eq(1).css("display", "table-cell");
                $("#tblsDate td").eq(2).html("Call Track To :")
                $("#divDSEInstallation").show();
                var StartDate = $("#txtTrackFrom").val() == "" ? new Date('<%=DateTime.Now.AddDays(1)%>') : new Date($("#txtTrackFrom").val().replace(/\-/g, ' '));
                $("#txtTrackFrom").val(StartDate.localeFormat('dd-MMM-yyyy'))
                var lastDay = new Date(StartDate.getFullYear(), StartDate.getMonth() + 1, 0);
                $("#txtTrackTo").val(lastDay.localeFormat('dd-MMM-yyyy'));
                $("#txtTrackTo").datepicker("option", "minDate", StartDate);
            } else {
                $("#tblsDate td").eq(0).hide();
                $("#tblsDate td").eq(1).hide();
                $("#tblsDate td").eq(2).html("Inactive From :");
                $("#txtTrackTo").datepicker("option", "minDate", new Date('<%=DateTime.Now%>'));
            }
        }

        var BranchSubdNodeId = 0; var BranchSubdNodeId = 0;
        function fnBranchCallActive(sender) {
            BranchSubdNodeId = $(sender).attr("BranchSubdNodeId");
            BranchSubdNodeType = $(sender).attr("BranchSubdNodeType");
            var DSEMTASStatusId = $(sender).attr("flgBranchInActive");
            var str = "";
            // str += "<div style='margin-bottom:0px;text-align:center'><input type='button' id='btnUpdateAppStatus'  value='Disabled App' class='btn btn-primary' onclick='fnDisableApp(this)' /></div>";

            str += "<table class='table' style='margin-bottom:0px'>";
            str += "<tr>";
            str += "<td>Call Tracking</td><td>:</td><td style='padding:2px;vertical-align:middle'><label class='switch'><input type='checkbox' id='togBtn' " + (DSEMTASStatusId == 0 ? "" : "checked") + " onclick='fnChangeCallTrackBranch(this)'><div class='slider round'></div></label></td>";
            str += "</tr>";
            str += "<tr " + (DSEMTASStatusId == 0 ? "style='display:none'" : "") + ">";
            str += "<td colspan='3'><table style='width:100%' id='tblsDate'><tr><td>Call Track From :</td><td><input id='txtTrackFrom' value='" + $(sender).closest("tr").attr("fromdate") + "' style='width:100px' disabled='disabled' readonly='readonly' /></td><td>Call Track To :</td><td><input id='txtTrackTo'  disabled='disabled'  readonly='readonly' style='width:100px' value='" + $(sender).closest("tr").attr("todate") + "' /></td></tr></table></td>";
            str += "</tr>";
            str += "</table>";
            $("#divDSECallLogDetailDashboard")[0].innerHTML = str;
            $("#divDSECallLogDetailDashboard").dialog({
                title: "Branch Active / Inactive Details-" + $(sender).text(),
                modal: true,
                width: "35%",
                height: "auto",
                open: function () {
                    var StartDate = $("#txtTrackFrom").val() == "" ? new Date('<%=DateTime.Now.AddDays(1)%>') : new Date($("#txtTrackFrom").val().replace(/\-/g, ' '));
                    $("#txtTrackFrom").val(StartDate.localeFormat('dd-MMM-yyyy'))
                    $("#txtTrackFrom").datepicker({
                        minDate: new Date('<%=DateTime.Now.AddDays(1)%>'),
                        dateFormat: 'dd-M-yy',
                        changeMonth: true,
                        changeYear: true,
                        onClose: function (selectedDate) {
                            $("#txtTrackTo").datepicker("option", "minDate", selectedDate);
                        }
                    });
                    var lastDay = new Date(StartDate.getFullYear(), StartDate.getMonth() + 1, 0);
                    if ($("#txtTrackTo").val() == "") {
                        $("#txtTrackTo").val(lastDay.localeFormat('dd-MMM-yyyy'))
                    }
                    $("#txtTrackTo").datepicker({
                        dateFormat: 'dd-M-yy',
                        minDate: $("#txtTrackFrom").val(),
                        changeMonth: true,
                        changeYear: true,
                    });
                    $("#txtTrackFrom,#txtTrackTo").prop("disabled", true)
                    $("#txtTrackFrom,#txtTrackTo").css({
                        "border": "none",
                        "background-color": "transparent"
                    })
                    $("div[aria-describedby='divDSECallLogDetailDashboard']").find("div.ui-dialog-buttonset").find("button").eq(0).hide();

                },
                close: function (event, ui) {
                    $("#divDSECallLogDetailDashboard").html("");
                    $("#divDSECallLogDetailDashboard").dialog('destroy');
                },
                buttons: {
                    "Update": function () {
                        var strmsg = "Are you sure to take action?";

                        
                       
                        //if ($("input[name='rdoUPD']:checked").length > 0) {
                        //    flgUpdType = $("input[name='rdoUPD']:checked").val();
                        //    if (flgUpdType == 2) {
                        //        strmsg = "<b>Note:</b><br/>A SMS is being sent to DSE Contact number <" + ContactNo1+"> Please ensure that the SIM with this contact number is placed on New Device where application need to install . You can download and follow the guideline to install the application on New Device from the link below.";
                        //    }
                        //}

                        $("#divDialog")[0].innerHTML = strmsg;
                        $("#divDialog").dialog({
                            title: "Confirmation : ",
                            modal: true,
                            width: "500",
                            height: "auto",
                            close: function (event, ui) {
                                $("#divDialog").html("");
                                $("#divDialog").dialog('destroy');
                            },
                            buttons: {
                                "Yes": function () {
                                    $("#dvFadeForProcessing").show();
                                    var sDate = $("#txtDate").val();
                                    var LoginId = $("#cphRight_hdnLoginId").val();

                                    // if ($("#togBtn").is(":checked")) {
                                    var StartDate = $("#txtTrackFrom").val();
                                    var EndDate = $("#txtTrackTo").val();
                                    //}
                                    var flgUpdType = $("#togBtn").is(":checked") ? 1 : 0;

                                    $("#divDialog").dialog('close');
                                    PageMethods.fnUpdateBranchCLDSELoggerCallUpdate(BranchSubdNodeId, BranchSubdNodeType, flgUpdType, LoginId, StartDate, EndDate, function (result) {
                                        $("#dvFadeForProcessing").hide();
                                        if (result.split("^")[0] == "2") {
                                            fnShowDialog("Error : " + result.split("^")[1]);
                                        } else {
                                            $("#divDSECallLogDetailDashboard").dialog('close');
                                            fnShowReport(0);
                                        }

                                    }, function (result) {
                                        fnShowDialog("Error-" + result._message);
                                        $("#dvFadeForProcessing").hide();
                                    });
                                },
                                "No": function () {
                                    $(this).dialog('close');
                                }
                            }
                        });

                       

                    },
                    "Close": function () {
                        $(this).dialog('close');
                    }
                }
            });
        }

        function fnChangeCallTrackBranch(sender) {

            $("#txtTrackFrom,#txtTrackTo").prop("disabled",false)

            $("#txtTrackFrom,#txtTrackTo").css({
                "border":"1px solid #b0b0b0",
                "background-color":"transparent"
            })
            $("div[aria-describedby='divDSECallLogDetailDashboard']").find("div.ui-dialog-buttonset").find("button").eq(0).show();
            StartDate = $("#txtTrackFrom").val();
            EndDate = $("#txtTrackTo").val();
            if ($(sender).is(":checked")) {
                $("#tblsDate").closest("tr").css("display", "table-row");
                $("#tblsDate td").eq(0).css("display","table-cell");
                $("#tblsDate td").eq(1).css("display", "table-cell");
                $("#tblsDate td").eq(2).html("Call Track To :")
                var StartDate = $("#txtTrackFrom").val() == "" ? new Date('<%=DateTime.Now.AddDays(1)%>') : new Date($("#txtTrackFrom").val().replace(/\-/g, ' '));
                $("#txtTrackFrom").val(StartDate.localeFormat('dd-MMM-yyyy'))
                var lastDay = new Date(StartDate.getFullYear(), StartDate.getMonth() + 1, 0);
                $("#txtTrackTo").val(lastDay.localeFormat('dd-MMM-yyyy'));
                $("#txtTrackTo").datepicker("option", "minDate", StartDate);
            } else {
                $("#tblsDate td").eq(0).hide();
                $("#tblsDate td").eq(1).hide();
                $("#tblsDate td").eq(2).html("Inactive From :");
                $("#txtTrackTo").datepicker("option", "minDate", new Date('<%=DateTime.Now%>'));
            }
        }

        function fnEditContactInfo(sender) {
            $("#divContactContainer").show();
            $("div[aria-describedby='divDSECallLogDetailDashboard']").find("div.ui-dialog-buttonset").find("button").eq(0).show();
            var ContactNumbers = $("#tdContactNo").text();
            var str = "<table style='table' id='tblContactList'>";
            var cnt = 0;
            for (var i = 0; i < ContactNumbers.split(",").length; i++) {
                if (ContactNumbers.split(",")[i] != "") {
                    cnt++;
                    var strstar = "";
                    if (cnt == 1) {
                        strstar = "<span style='color:red'>*</span>";
                    }
                    str += "<tr>";
                    str += "<td style='width:" + $("#tdContactNo").prev().prev().width() + "px;padding:3px'>" + strstar+"Contact " + (i + 1) + "</td><td style='width:" + $("#tdContactNo").prev().width() + "px;padding:3px'>:</td>";
                    str += "<td style='padding:3px'><input type='text' value='" + ContactNumbers.split(",")[i] + "' maxlength='10' onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' /></td>";
                    str += "</tr>";
                }
            }

            if (cnt == 0) {
                str += "<tr>";
                str += "<td style='width:" + $("#tdContactNo").prev().prev().width() + "px'><span style='color:red'>*</span>Contact 1</td><td style='width:" + $("#tdContactNo").prev().width() + "px;padding:3px'>:</td>";
                str += "<td style='padding:3px'><input type='text' value='' maxlength='10' onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' /></td>";
                str += "</tr>";
            }
            if (cnt == 1) {
                str += "<tr>";
                str += "<td style='width:" + $("#tdContactNo").prev().prev().width() + "px;padding:3px'>Contact 2</td><td style='width:" + $("#tdContactNo").prev().width() + "px;padding:3px'>:</td>";
                str += "<td style='padding:3px'><input type='text' value='' maxlength='10' onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' /></td>";
                str += "</tr>";
            }
            str += "</table>";

            $("#divContactContainer")[0].innerHTML = str;
        }

        function fnMakeInactive() {
            $("#divDialog")[0].innerHTML = "Are you sure you want to make inactive?";
            $("#divDialog").dialog({
                title: "Confirmation : ",
                modal: true,
                width: "450",
                height: "auto",
                close: function (event, ui) {
                    $("#divDialog").html("");
                    $("#divDialog").dialog('destroy');
                },
                buttons: {
                    "Yes": function () {
                        $(this).dialog('close');
                        $("#dvFadeForProcessing").show();
                        var sDate = $("#txtDate").val();
                        PageMethods.fnDisableApp(NodeId, NodeType, function (result) {
                            $("#dvFadeForProcessing").hide();
                            if (result.split("^")[0] == "2") {
                                fnShowDialog("Error : " + result.split("^")[1]);
                            } else {
                                fnShowReport(0);
                            }

                        }, function (result) {
                            fnShowDialog("Error-" + result._message);
                            $("#dvFadeForProcessing").hide();
                        });

                    },
                    "No": function () {
                        $(this).dialog('close');
                    }
                }
            });

        }

        function whichButton(event) {
            if (event.button == 2)//RIGHT CLICK
            {
                alert("Not Allow Right Click!");
            }
        }
        function noCTRL(e) {
            //alert(e);
            //e.preventDefault();

            var code = (document.all) ? event.keyCode : e.which;
            var msg = "Sorry, this functionality is disabled.";
            if (parseInt(code) == 17) //CTRL
            {
                alert(msg);
                window.event.returnValue = false;
            }
        }

        function isNumberKeyNotDecimal(evt) {
            //debugger;
            var charCode = (evt.which) ? evt.which : event.keyCode
            if (charCode > 31 && (charCode < 48 || charCode > 57))
                return false;


            return true;
        }

        function fnShowDialog(msg) {
            $("#divDialog")[0].innerHTML = msg;
            $("#divDialog").dialog({
                title: "Alert! : ",
                modal: true,
                width: "500",
                height: "auto",
                close: function (event, ui) {
                    $("#divDialog").html("");
                    $("#divDialog").dialog('destroy');
                },
                buttons: {
                    "OK": function () {
                        $(this).dialog('close');
                    }
                }
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
            if ($("#tbldbrlist").length > 0) {
                var thead = $("#tbldbrlist").find("thead").eq(0).html();
                var wid = $("#tbldbrlist").width();

                $("#divfixedHeader").html("<table id='tbl_Status_fixedhead' cellspacing='0'   cellpadding='0' class='table table-bordered' style='width:" + wid + "px;font-size:8.5pt'  ><thead>" + thead + "</thead><tbody></tbody></table>");
                $("#tbldbrlist").css("width", wid + "px");
                for (i = 0; i < $("#tbldbrlist thead").find("th").length; i++) {
                    var th_wid = $("#tbldbrlist thead").find("th")[i].clientWidth;
                    $("#tbldbrlist thead").find("th").eq(i).css({ "min-width": th_wid, "width": th_wid });
                    $("#tbl_Status_fixedhead thead").find("th").eq(i).css({ "min-width": th_wid, "width": th_wid });
                }

                $("#divfixedHeader").css({
                    "height": $("#tbl_Status_fixedhead").find("th").eq(0).height()
                });

                //$("#ConatntMatter_dvMain").tblheaderfix({
                //    height: $(window).height() - (allsecheight + 170)
                //});
                $("#divMainData").css("width", wid + "px");
                $("#divfixedHeader").css("width", wid + "px");
            }
        }

        $.fn.tblheaderfix = function (options) {
            var strid = $(this)[0].id, clss = $(this).find("table").attr('class');
            var defaults = {
                width: '100%',
                height: 350,
                padding: 1
            };
            var options = $.extend(defaults, options);
            $(this).css({ "width": options.width, "height": options.height, "padding": options.padding });

            $(this).find("table").attr('id', strid + '_tbl');
            var contant = $(this).html(), wid = $("#" + strid + "_tbl").width(), thead = $("#" + strid + "_tbl").find("thead").eq(0).html();
            $(this).html("<div id='" + strid + "_head'></div><div id='" + strid + "_body'></div>");
            $("#" + strid + "_head").html("<table id='" + strid + "_hfix' class='" + clss + " mb-0' style='width:" + wid + "px'><thead>" + thead + "</thead><tbody></tbody></table>");
            $("#" + strid + "_body").html(contant);
            $("#" + strid + "_tbl").css({ "width": wid, "min-width": wid });
            for (i = 0; i < $("#" + strid + "_tbl").find("th").length; i++) {
                var th_wid = $("#" + strid + "_tbl").find("th")[i].clientWidth; //offsetWidth;
                $("#" + strid + "_hfix, #" + strid + "_tbl").find("th").eq(i).css({ "min-width": th_wid, "width": th_wid });
            }
            $("#" + strid + "_tbl").css("margin-top", "-" + ($("#" + strid + "_hfix")[0].offsetHeight) + "px");
            $("#" + strid + "_body").css({
                'height': $(this).height() - $("#" + strid + "_head").outerHeight(),
                'overflow-y': 'auto',
                'overflow-x': 'hidden'
            });
        }

        function detectmob() {
            var IsMobileDevice ="<%=Request.Browser.IsMobileDevice%>";
            if (IsMobileDevice != "False") {
                $("#divFilter").hide();
                $("#divHeadercont").css({
                    "position": "relative",
                    "width": "100%"
                });
                $("#divfixedHeader").css({
                    "position": "relative"
                });
                $("#divtblContain").css({
                    "padding-top": "0px",
                    "overflow-x": "auto !important",
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
                //$("#divFilter button.ui-multiselect").eq(0).css({
                //    width: "210px"
                //});
                //$("#divFilter button.ui-multiselect").eq(1).css({
                //    width: "198px"
                //});

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
        <h4 id="h4header" style="font-size: 12px">>>DSE Call Logger</h4>
        <div style="margin-top: 2px;">
            <div style="display: block" id="divFilterbtn">
                <a href="#" onclick="fnShowhidediv()" class="btn btn-info btn-lg" style="padding: 4px 5px; font-size: 14px">
                    <span class="glyphicon glyphicon-filter"></span>Filter 
                </a>
            </div>
            <div class="row" id="divFilter">
                <div class="col-md-2" style="padding: 5px; width: 14%; text-align: left" id="dvfromdt">
                    <table style="display: inline-block">
                        <tr>
                            <td style="width: 70px; text-align: right">
                                <b>Date</b>
                            </td>
                            <td style="width: 5px">:
                            </td>
                            <td>
                                <input type="text" id="txtDate" style="width: 80px" readonly />
                            </td>
                        </tr>
                    </table>
                </div>
                <%--<div class="col-md-2" style="padding:0px;width:14%" id="dvtodt">
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
                </div> --%>
                <div class="col-md-3" style="padding: 5px; width: 30%" id="dvsite">
                    <table style="width: 100%">
                        <tr>
                            <td style="width: 70px">
                                <b>Site List</b>
                            </td>
                            <td style="width: 5px">:
                            </td>
                            <td>
                                <asp:DropDownList runat="server" ID="ddlSite" Style="border: 1px solid #bbbbbb; width: 250px" multiple="true">
                                </asp:DropDownList>
                            </td>
                        </tr>
                    </table>
                </div>

                <div class="col-md-2" style="padding:5px;width:14%" id="dvview">
                    <table style="display: inline-block">
                        <tr>
                            <td>
                              <label style="font-weight:bold;font-size:10pt"><input type="checkbox" id="chkIncludeAllDSE" />  Include All DSE</label>  
                            </td>
                        </tr>
                    </table>
                </div>

                <%-- <div class="col-md-2" style="padding:0;width:14%" id="dvview">
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
                                <b>TCReason</b>
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
                </div>--%>
                <div class="col-md-4" id="divbtn" style="padding: 5px; text-align: center">
                    <input type="button" value="Show Report" class="btn btn-primary" onclick="fnShowReport(0)" id="btnShow" style="padding: 3px 4px; font-size: 12px" />
                    <input type="button" value="Download Report" class="btn btn-primary" onclick="fnDownloadReport()" style="padding: 3px 4px; font-size: 12px" id="btnRefershStatus" />
                    <input type="button" value="Download DSE CCR Details" class="btn btn-primary" onclick="fnDownloadCCRReport()" style="padding: 3px 4px; font-size: 12px" id="btnRefershStatus1" />
                </div>

            </div>

        </div>

        <div style="margin-top: 2px;" class="table-responsive" id="divMeasure">
        </div>
    </div>
    <div style="padding-top: 70px;" id="divtblContain">
        <div id="divfixedHeader" style="margin-left: 0px; position: fixed; z-index: 1;"></div>
        <div id="divMainData" style="margin-top: 0px; margin-bottom: 60px">
        </div>
    </div>
    <div class="blockButtons" id="divBTNS" style="bottom: 0; position: fixed; padding-top: 1px; background-color: #cfcfcf; overflow-x: auto;">
        <table id="tblLegends">
            <tr>
                <td style="padding: 5px; border-right: 1px solid"><b>Legends: </b></td>
                <td style="padding: 5px; background-color: #CCD1D1">App Not Installed</td>
                <td style="padding: 5px; background-color: #DC7633">Old Version Installed and App Not Working</td>
                <td style="padding: 5px; background-color: #F39C12">App Not Working</td>
                <td style="padding: 5px; background-color: #F9FF33">Old Version Installed</td>
            </tr>
        </table>
    </div>
    <div id="divDSECallLogDetailDashboard" style="display: none"></div>
    <div id="divDialog" style="display: none; padding: 15px;"></div>
    <asp:HiddenField runat="server" ID="hdnLoginId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnMenuId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnBranchCode" Value="0" />
    <asp:HiddenField runat="server" ID="hdnflg" Value="1" />
    <asp:HiddenField runat="server" ID="hdnRoleId" Value="0" />

</asp:Content>

