<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" CodeFile="frmUserMgmt.aspx.cs" Inherits="ManageOrder_frmAbsentDSEList" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="../css/bootstrap.min.css" />
    <link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />
    <link href="../styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>

    <style type="text/css">
        * {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }

        :after, :before {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }

        .input-group {
            width: 100%;
            position: relative;
        }

        div.clstranslayer {
            position: fixed;
            display: none;
            z-index: 900;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: transparent;
        }

        .input-group > input[type="text"] {
            outline: 0;
            border: 1px solid #efefef;
            resize: none;
            font-weight: 400;
            display: block;
            width: 100%;
            line-height: 1.5;
            height: 22px;
            font-size: 12px;
            padding: 0 .75rem;
            color: #323232;
            border-radius: 0px;
            box-shadow: none !important;
            position: relative;
            background: #DFEBF7;
        }

            .input-group > input[type="text"]::-ms-clear {
                display: none;
            }

        .input-group::before {
            content: '';
            position: absolute;
            right: 12px;
            top: 50%;
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid #000;
            z-index: 1;
            margin-top: -3px;
        }
    </style>
    <style type="text/css">
        .ui-widget-header {
            color: #000;
        }

        h4 {
            font-size: 15px;
            padding: 0 0 8px 0;
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

        a {
            color: #2B67A4;
        }

        table {
            width: 100%;
        }

        .btn-info {
            border-radius: 3px;
            padding: 4px 20px;
        }

        .clstoplbl {
            color: #8000FF;
            font-size: 14px;
            font-weight: bold;
        }

        .clstopSeperate {
            width: 40px;
            text-align: left;
            font-size: 14px;
            font-weight: bold;
        }

        .clstopVal > select {
            padding: 2px;
            font-size: 12px;
        }

        .clsValideMsg {
            color: #f00;
            font-weight: bold;
            font-size: 14px;
        }
    </style>
    <style type="text/css">
        .clsTabHeader {
            color: #000;
            cursor: pointer;
            font-size: 13px;
            padding: 4px 12px;
            display: inline-block;
            background-color: #AED7FF;
            border-radius: 3px 3px 0 0;
        }

            .clsTabHeader:hover {
                background-color: #46A3FF !important;
            }

        .clsTabHeader-active {
            color: #fff !important;
            background-color: #004080 !important;
        }

        .clsTabBodyBlock {
            border-top: 1px solid #46A3FF;
        }

        .clsTabBody {
            padding: 10px 20px;
        }

        .clslbl {
            color: #666666;
            font-size: 12px;
            font-weight: bold;
        }

        .clsrtlbl {
            color: #666666;
            font-size: 12px;
            font-weight: bold;
            padding-left: 10px !important;
        }

        .clsSeperate {
            width: 20px;
            text-align: left;
            font-size: 12px;
            font-weight: bold;
        }

        .clsVal > input[type='text'] {
            padding: 2px;
            font-size: 11px;
            width: 100%;
        }

        .clsVal > textarea {
            width: 100%;
        }
    </style>
    <style type="text/css">
        table.clsEmptbl,
        table.clsRoutetbl,
        table.clsPDAtbl {
            border-collapse: collapse;
        }

        table.clsRoutetbl {
            width: 80% !important;
        }

        table.clsPDAtbl {
            width: 60% !important;
        }

            table.clsEmptbl th,
            table.clsRoutetbl th,
            table.clsPDAtbl th {
                padding: 4px 0;
                font-size: 11px;
                font-weight: bold;
                text-align: center;
                color: #ffffff;
                background-color: #0080C0;
                border: 1px solid #dddddd;
            }

            table.clsEmptbl td,
            table.clsRoutetbl td,
            table.clsPDAtbl td {
                padding: 4px 0;
                font-size: 12px;
                text-align: center;
                border: 1px solid #dddddd;
            }

                table.clsEmptbl td:nth-child(1),
                table.clsEmptbl td:nth-child(3),
                table.clsEmptbl td:nth-child(4),
                table.clsEmptbl td:nth-child(6),
                table.clsPDAtbl td:nth-child(1),
                table.clsRoutetbl td:nth-child(1) {
                    text-align: left;
                    padding-left: 5px;
                }

                table.clsEmptbl td:nth-child(1),
                table.clsEmptbl td:nth-child(3),
                table.clsEmptbl td:nth-child(4),
                table.clsEmptbl td:nth-child(6) {
                    width: 200px;
                }

                table.clsPDAtbl td:nth-child(1) {
                    width: 25%;
                }

                table.clsPDAtbl td:nth-child(2),
                table.clsPDAtbl td:nth-child(3) {
                    width: 15%;
                }

                table.clsRoutetbl td:nth-child(1),
                table.clsRoutetbl td:nth-child(2) {
                    width: 22%;
                }

                table.clsRoutetbl td:nth-child(4),
                table.clsRoutetbl td:nth-child(5),
                table.clsRoutetbl td:nth-child(6) {
                    width: 15%;
                }
    </style>
    <%--Add / Edit Popup--%>
    <style type="text/css">
        #dvAddEditUserDialog table td {
            padding: 4px;
        }

            #dvAddEditUserDialog table td:nth-child(1) {
                width: 100px;
            }

        #dvAddEditPDADialog table td {
            padding: 10px 6px;
        }

            #dvAddEditPDADialog table td:nth-child(1) {
                width: 100px;
            }
    </style>
    <%--Filter Popup--%>
    <style type="text/css">
        table.clsEmpfilter td {
            color: #000;
            cursor: pointer;
            text-align: left;
            padding-left: 10px;
            border: none;
        }

            table.clsEmpfilter td:hover {
                background-color: #eee;
            }

        div.clsFilterPopup {
            min-height: 60px;
            max-height: 100px;
            overflow-y: auto;
            min-width: 300px;
            width: 100% !important;
            z-index: 901;
            display: none;
            position: absolute;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 0 0 2px 2px;
        }

        ul.clsPDAfilter {
            padding: 0 2px;
        }

            ul.clsPDAfilter li {
                list-style: none;
                cursor: pointer;
                padding: 2px 5px;
                border-bottom: 1px solid #ddd;
            }

                ul.clsPDAfilter li:hover {
                    background-color: #eee;
                }

                ul.clsPDAfilter li:last-child {
                    border-bottom: none;
                }

        div.clsFilterPopup > table td {
            padding: 2px !important;
        }
    </style>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#fraLeft').load(function () {
                $("#fraLeft").contents().find("#DvMenu").find("li").removeClass("activemenu");
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='9']").addClass("activemenu");
                $("#fraLeft")[0].height = $(window).height() - ($("#dvBanner").height() + $(".footer").height());

                $("#divRouteAssign").height($(window).height() - ($("#dvBanner").height() + $(".footer").height() + $("#Header").height() + $("#HeadFilter").height() + 80));
                $("#divPDAAssign").height($(window).height() - ($("#dvBanner").height() + $(".footer").height() + $("#Header").height() + $("#HeadFilter").height() + 80));
                $("#divUserMgmt").height($(window).height() - ($("#dvBanner").height() + $(".footer").height() + $("#Header").height() + $("#HeadFilter").height() + 80));

                $("#txtEmpDOB").datepicker({
                    dateFormat: 'dd-M-yy',
                    maxDate: 0,
                    changeMonth: true,
                    changeYear: true
                })

                if ($("#cphRight_ddlSite").find("option").length == 1) {
                    fnGetList();
                }
                else {
                    $("#divLoader").hide();
                }
            });
        });

        function fnfilterMstrList() {
            fngetuserlist(2);  // List for Filter Popup
            fngetListforValidate();
        }

        function fngetListforValidate() {
            PageMethods.GetListforValidation($("#cphRight_hdnSiteNodeId").val(), $("#cphRight_hdnSiteNodeType").val(), fngetListforValidate_pass, fnfail);
        }

        function fngetListforValidate_pass(res) {
            $("#cphRight_hdnActiveEmpMstr").val(res);
            fnPDAfilterView(res);
        }

        function fnPDAfilterView(res) {
            var PDAfilter = $.parseJSON('[' + res + ']')[0].Table;

            var str = "";
            str += "<ul class='clsPDAfilter'>";
            for (var i = 0; i < PDAfilter.length; i++) {
                if (PDAfilter[i]["PDA_IMEI"] != null && PDAfilter[i]["PDA_IMEI"] != "") {
                    str += "<li EmpId='" + PDAfilter[i]["EmpId"] + "' onclick='fnSelectPDA(this);'>Pri. IMEI : " + PDAfilter[i]["PDA_IMEI"] + " - " + PDAfilter[i]["EmpName"] + "</li>";
                }
                if (PDAfilter[i]["PDA_IMEI_Sec"] != null && PDAfilter[i]["PDA_IMEI_Sec"] != "") {
                    str += "<li EmpId='" + PDAfilter[i]["EmpId"] + "' onclick='fnSelectPDA(this);'>Sec. IMEI : " + PDAfilter[i]["PDA_IMEI_Sec"] + " - " + PDAfilter[i]["EmpName"] + "</li>";
                }
            }
            str += "</ul>";
            $("#cphRight_hdnActivePDAFilterView").val(str);
        }

        function fnGetList() {
            if ($("#cphRight_ddlSite").val() != "0-0") {
                $("#cphRight_hdnSiteNodeId").val($("#cphRight_ddlSite").val().split("-")[0]);
                $("#cphRight_hdnSiteNodeType").val($("#cphRight_ddlSite").val().split("-")[1]);

                fnfilterMstrList();
                fnTab(3);
            }
            else {
                alert("Please Select the Site !");
            }
        }

        function fnTab(cntr) {
            $("#divLoader").show();
            $("div.clsTabHeader").removeClass("clsTabHeader-active");
            $("div.clsTabHeader[flg='" + cntr + "']").addClass("clsTabHeader-active");

            switch (cntr) {
                case 1:
                    $("#divRouteAssign").css("display", "block");
                    $("#divPDAAssign").css("display", "none");
                    $("#divUserMgmt").css("display", "none");

                    fngetRouteAssignlist();
                    break;
                case 2:
                    $("#divRouteAssign").css("display", "none");
                    $("#divPDAAssign").css("display", "block");
                    $("#divUserMgmt").css("display", "none");

                    fngetPDAAssignlist();
                    break;
                case 3:
                    $("#divRouteAssign").css("display", "none");
                    $("#divPDAAssign").css("display", "none");
                    $("#divUserMgmt").css("display", "block");

                    $("#rdActiveUser").prop("checked", true);
                    fngetuserlist(1);
                    break;
            }
        }

        function fnSwitchUserStatus(ctrl) {
            if ($(ctrl).is(":checked")) {
                fngetuserlist(1);
            }
        }

        function fngetuserlist(flg) {       // 1 - for Display;  2 - for Filter
            var cntr = 0;
            if (flg == 1) {
                if ($("#rdActiveUser").is(":checked")) {
                    cntr = 1;
                }
                $("#divLoader").show();
            }
            else {
                cntr = 1;
            }

            PageMethods.GetEmpList($("#cphRight_hdnSiteNodeId").val(), $("#cphRight_hdnSiteNodeType").val(), cntr, flg, GetEmpList_pass, fnfail, flg);
        }

        function GetEmpList_pass(res, flg) {
            if (flg == 1) {
                $("#divUserMgmtTbl").html(res);
                $("#divLoader").hide();
            }
            else {
                fnUserfilterView(res);
            }
        }

        function fnUserfilterView(res) {
            var userfilter = $.parseJSON('[' + res + ']')[0];

            var str = "";
            str += "<table class='clsEmpfilter'>";
            str += "<tr EmpId='0' isPDA='-' Modal='-' PIMEI='-' SIMEI='-'><td onclick='fnSelectUser(this);'>Un-Assigned</td></tr>";
            for (var i = 0; i < userfilter.length; i++) {
                str += "<tr EmpId='" + userfilter[i]["EmpId"] + "' isPDA='" + userfilter[i]["PDAMapped"] + "' Modal='" + userfilter[i]["PDAModelName"] + "' PIMEI='" + userfilter[i]["Primary IMEI"] + "' SIMEI='" + userfilter[i]["Secondary IMEI"] + "'>";
                str += "<td onclick='fnSelectUser(this);'>" + userfilter[i]["EmpName"] + " [ M : " + userfilter[i]["ContactNo"] + ", Email : " + userfilter[i]["EmailId"] + " ]</td>";
                str += "</tr>";
            }
            str += "</table>";
            $("#cphRight_hdnActiveEmpFilterView").val(str);
        }

        function fnAssignPDA(ctrl) {
            var EmpId = $(ctrl).closest("tr").attr("EmpId");
            var Emp = $(ctrl).closest("tr").eq(0).find("td").eq(0).html();

            $("#cphRight_hdnEmpId").val(EmpId);
            $("#trAddEditPDA").attr('empId', EmpId);
            $("#trAddEditPDA").attr('emp', Emp);
            $("#trAddEditPDA").find("input[type='text']").eq(0).val(Emp);
            $("#trAddEditPDA").find("input[type='text']").eq(0).prop("disabled", true);

            fnAddPDA();
        }

        function fnChangeStatus(ctrl, flgActive) {
            $("#divLoader").show();
            var EmpId = $(ctrl).closest("tr").attr("empid");
            PageMethods.fnChangeUserStatus($("#cphRight_hdnLoginId").val(), EmpId, flgActive, fnChangeUserStatus_pass, fnfail, EmpId);
        }

        function fnChangeUserStatus_pass(res, EmpId) {
            if (res == "1") {
                $("#tblEmpList").find("tr[EmpId='" + EmpId + "']").eq(0).remove();
                $("#divLoader").hide();
                fnfilterMstrList();
            }
            else {
                fnfail();
            }
        }

        function fnResetUserDetailPopup() {
            $("#txtEmpName").val('');
            $("#txtEmpDOB").val('');
            $("#txtEmpContact").val('');
            $("#txtEmpEmergencyContact").val('');
            $("#txtEmpEmail").val('');
            $("#txtEmpAddress").val('');
            $("#txtModal").val('');
            $("#txtPIMEI").val('');
            $("#txtSIMEI").val('');
            $("#HasPDAYes").removeAttr("checked");
            $("#HasPDANo").removeAttr("checked");

            fnHasPDA(2);
        }

        function fnEditUser(ctrl) {
            $("#divLoader").show();
            PageMethods.GetIndividualUserDetail($(ctrl).closest("tr").attr("EmpId"), GetIndividualUserDetail_pass, fnfail, $(ctrl).closest("tr").attr("EmpId"));
        }

        function GetIndividualUserDetail_pass(res, EmpId) {
            if (res != "2") {
                fnResetUserDetailPopup();

                var user = $.parseJSON('[' + res + ']')[0];
                var flgActive = 0;
                if (user[0].flgActive) {
                    flgActive = 1;
                }
                else {
                    flgActive = 0;
                }
                $("#txtEmpName").val(user[0].EmpName);
                $("#txtEmpDOB").val(user[0].DOB);
                $("#txtEmpContact").val(user[0].ContactNo);
                $("#txtEmpEmergencyContact").val(user[0].EmgencyContactNo);
                $("#txtEmpEmail").val(user[0].EmailId);
                $("#txtEmpAddress").val(user[0].Address);
                $("#txtModal").val(user[0].PDAModelName);
                $("#txtPIMEI").val(user[0]["Primary IMEI"]);
                $("#txtSIMEI").val(user[0]["Secondary IMEI"]);
                if (user[0].PDAMapped == "No") {
                    fnHasPDA(2);
                    $("#HasPDANo").prop("checked", true);
                }
                else {
                    fnHasPDA(1);
                    $("#HasPDAYes").prop("checked", true);
                }

                $("#divLoader").hide();

                $("#dvAddEditUserDialog").dialog({
                    modal: true,
                    title: "Update Tele-Caller Details :",
                    width: 740,
                    height: 440,
                    buttons: {
                        "Update": function () {
                            $("#cphRight_hdnEmpId").val(EmpId);
                            $("#cphRight_hdnEmpStatus").val(flgActive);
                            fnSaveUserDetails();
                        },
                        "Close": function () {
                            $("#dvAddEditUserDialog").dialog("close");
                        }
                    }
                });
            }
            else {
                fnfail();
            }
        }

        function fnAddUser() {
            fnResetUserDetailPopup();
            $("#dvAddEditUserDialog").dialog({
                modal: true,
                title: "Add New Tele-Caller :",
                width: 740,
                height: 440,
                buttons: {
                    "Save": function () {
                        $("#cphRight_hdnEmpId").val('0');
                        $("#cphRight_hdnEmpStatus").val('1');
                        fnSaveUserDetails();
                    },
                    "Close": function () {
                        $("#dvAddEditUserDialog").dialog("close");
                    }
                }
            });
        }

        function fnSaveUserDetails() {
            var EmpId = $("#cphRight_hdnEmpId").val();
            var EmpName = $("#txtEmpName").val();
            var ContactNo = $("#txtEmpContact").val().trim();
            var EmailId = $("#txtEmpEmail").val().trim();
            var EmergencyContactNo = $("#txtEmpEmergencyContact").val();
            var DOB = $("#txtEmpDOB").val();
            var flgActive = $("#cphRight_hdnEmpStatus").val();;
            var TASSiteNodeId = $("#cphRight_hdnSiteNodeId").val();
            var TASSiteNodeType = $("#cphRight_hdnSiteNodeType").val();
            var LoginId = $("#cphRight_hdnLoginId").val();
            var Modal = "";
            var Pri_IMEI = "";
            var Sec_IMEI = "";
            var flgHasPDA = 0;
            var flgPDAMoved = 0;
            var Address = $("#txtEmpAddress").val();

            if (EmpName == "") {
                alert("Please enter the Tele-caller Name !");
                return false;
            }
            else if (ContactNo == "") {
                alert("Please enter the Tele-caller Contact No. !");
                return false;
            }
            else if (EmailId == "") {
                alert("Please enter the Tele-caller Email-Id !");
                return false;
            }

            var tblEmp = $.parseJSON('[' + $("#cphRight_hdnActiveEmpMstr").val() + ']')[0].Table2;
            
            var filter_row_Contact = $.grep(tblEmp, function (abc, ind) {
                return abc['ContactNo'] == ContactNo;
            });
            if (filter_row_Contact.length > 0) {
                if (filter_row_Contact[0].EmpId.toString() != EmpId) {
                    alert("Contact No. already registered !");
                    return false;
                }
            }

            //var filter_row_Email = $.grep(tblEmp, function (abc, ind) {
            //    return abc['EmailId'] == EmailId;
            //});
            //if (filter_row_Email.length > 0) {
            //    if (filter_row_Email[0].EmpId.toString() != EmpId) {
            //        alert("Email-Id already registered !");
            //        return false;
            //    }
            //}

            if ($("#HasPDAYes").is(":checked")) {
                flgHasPDA = 1;
                Modal = $("#txtModal").val();
                Pri_IMEI = $("#txtPIMEI").val();
                Sec_IMEI = $("#txtSIMEI").val();

                if (Modal == "") {
                    alert("Please enter the Tele-caller Mobile Model !");
                    return false;
                }
                else if (Pri_IMEI == "" && Sec_IMEI == "") {
                    alert("Please enter the Tele-caller Mobile IMEI !");
                    return false;
                }
                else if (Pri_IMEI != "" && Pri_IMEI.length != 15) {
                    alert("IMEI must be of 15 digits !");
                    return false;
                }
                else if (Sec_IMEI != "" && Sec_IMEI.length != 15) {
                    alert("IMEI must be of 15 digits !");
                    return false;
                }
            }

            $("#divLoader").show();
            $("#dvAddEditUserDialog").dialog("close");
            PageMethods.fnSaveUserDetails(EmpId, EmpName, ContactNo, EmailId, EmergencyContactNo, DOB, flgActive, TASSiteNodeId, TASSiteNodeType, LoginId, Modal, Pri_IMEI, Sec_IMEI, flgHasPDA, flgPDAMoved, Address, fnSaveUserDetails_pass, fnfail);
        }

        function fnSaveUserDetails_pass(res) {
            if (res != "2") {
                alert("Telecaller Details saved successfully !");
                fnfilterMstrList();
                fngetuserlist($("#cphRight_hdnEmpStatus").val());
            }
            else {
                fnfail();
            }
        }

        function fnResetPDADetailPopup() {
            //$("#trAddEditPDA").attr('empId', '0');
            //$("#trAddEditPDA").attr('emp', 'Un-Assigned');
            //$("#trAddEditPDA").find("input[type='text']").eq(0).val('Un-Assigned');

            $("#txtIndividualModal").val('');
            $("#txtIndividualPIMEI").val('');
            $("#txtIndividualSIMEI").val('');
        }

        function fnAddPDA() {
            fnResetPDADetailPopup();

            $("#dvAddEditPDADialog").dialog({
                modal: true,
                title: "Assign PDA :",
                width: 740,
                height: 340,
                buttons: {
                    "Save": function () {
                        fnSavePDADetails();
                    },
                    "Close": function () {
                        $("#dvAddEditPDADialog").dialog("close");
                    }
                }
            });
        }

        function fnSavePDADetails() {
            
            var EmpId = $("#trAddEditPDA").attr('empId');
            var TASSiteNodeId = $("#cphRight_hdnSiteNodeId").val();
            var TASSiteNodeType = $("#cphRight_hdnSiteNodeType").val();
            var LoginId = $("#cphRight_hdnLoginId").val();
            var Modal = "";
            var Pri_IMEI = "";
            var Sec_IMEI = "";

            Modal = $("#txtIndividualModal").val();
            Pri_IMEI = $("#txtIndividualPIMEI").val().trim();
            Sec_IMEI = $("#txtIndividualSIMEI").val().trim();

            if (Modal == "") {
                alert("Please enter the Tele-caller Mobile Model !");
                return false;
            }
            else if (Pri_IMEI == "" && Sec_IMEI == "") {
                alert("Please enter the Tele-caller Mobile IMEI !");
                return false;
            }
            else if (Pri_IMEI != "" && Pri_IMEI.length != 15) {
                alert("IMEI must be of 15 digits !");
                return false;
            }
            else if (Sec_IMEI != "" && Sec_IMEI.length != 15) {
                alert("IMEI must be of 15 digits !");
                return false;
            }

            var flgValidate = 0;
            var tblPDA = $.parseJSON('[' + $("#cphRight_hdnActiveEmpMstr").val() + ']')[0].Table;

            var filter_row_Pri_Pri = $.grep(tblPDA, function (abc, ind) {
                return abc['PDA_IMEI'] == Pri_IMEI;
            });
            if (filter_row_Pri_Pri.length > 0) {
                flgValidate++;
            }

            var filter_row_Pri_Sec = $.grep(tblPDA, function (abc, ind) {
                return abc['PDA_IMEI_Sec'] == Pri_IMEI;
            });
            if (filter_row_Pri_Sec.length > 0) {
                flgValidate++;
            }

            var filter_row_Sec_Pri = $.grep(tblPDA, function (abc, ind) {
                return abc['PDA_IMEI'] == Sec_IMEI;
            });
            if (filter_row_Sec_Pri.length > 0) {
                flgValidate++;
            }

            var filter_row_Sec_Sec = $.grep(tblPDA, function (abc, ind) {
                return abc['PDA_IMEI_Sec'] == Sec_IMEI;
            });
            if (filter_row_Sec_Sec.length > 0) {
                flgValidate++;
            }

            if (flgValidate > 0) {
                $("#dvAleartDialog").html("IMEI is already registered. It will be un-assigned from the previous Tele-caller. Do you want to continue ?");
                $("#dvAleartDialog").dialog({
                    modal: true,
                    title: "Message :",
                    width: 600,
                    height: 200,
                    buttons: {
                        "Continue": function () {
                            $("#divLoader").show();
                            $("#dvAleartDialog").dialog("close");
                            $("#dvAddEditPDADialog").dialog("close");
                            PageMethods.fnSavePDADetails(EmpId, TASSiteNodeId, TASSiteNodeType, LoginId, Modal, Pri_IMEI, Sec_IMEI, fnSavePDADetails_pass, fnfail);
                        },
                        "Cancel": function () {
                            $("#dvAleartDialog").dialog("close");
                        }
                    }
                });
            }
            else {
                $("#divLoader").show();
                $("#dvAddEditPDADialog").dialog("close");
                PageMethods.fnSavePDADetails(EmpId, TASSiteNodeId, TASSiteNodeType, LoginId, Modal, Pri_IMEI, Sec_IMEI, fnSavePDADetails_pass, fnfail);
            }
        }

        function fnSavePDADetails_pass(res) {
            if (res != "2") {
                alert("PDA Assigned successfully !");
                fnfilterMstrList();
                fngetuserlist(1);
                fngetRouteAssignlist();
            }
            else {
                fnfail();
            }
        }

        function fngetRouteAssignlist() {
            $("#divLoader").show();
            PageMethods.GetRouteAssignList($("#cphRight_hdnLoginId").val(), GetRouteAssignList_pass, fnfail);
        }

        function GetRouteAssignList_pass(res) {
            $("#divRouteAssignBody").html(res);
            $("#divLoader").hide();
        }

        function fnSelectUser(ctrl) {

            var tr = $(ctrl).closest("div").closest("tr[iden='trMain']");
            var flg = $(tr).attr("flg");

            var emp = $(ctrl).closest("td").html().split("[")[0].toString().trim();
            var prev_emp = tr.attr("prev_emp");
            var empId = $(ctrl).closest("tr").attr("EmpId");
            var prev_empId = tr.attr("prev_empId");

            if (flg == "Route") {
                var isPDA = $(ctrl).closest("tr").attr("isPDA");
                var Modal = $(ctrl).closest("tr").attr("Modal");
                var PIMEI = $(ctrl).closest("tr").attr("PIMEI");
                var SIMEI = $(ctrl).closest("tr").attr("SIMEI");

                var tblRouteMap = $.parseJSON('[' + $("#cphRight_hdnActiveEmpMstr").val() + ']')[0].Table1;
                var filter_row = $.grep(tblRouteMap, function (abc, ind) {
                    return abc['EmpName'] == emp;
                });

                if (filter_row.length > 0) {
                    $("#dvAleartDialog").html("<span style='font-weight:600; font-size:13px; color: #666666;'><b>" + emp + "<b/> is already map with Route - <b>" + filter_row[0].UserName + "<b/>. Please Un-Assign, before Assigning to a new Route !");
                    $("#dvAleartDialog").dialog({
                        modal: true,
                        title: "Message :",
                        width: 600,
                        height: 200,
                        buttons: {
                            "Cancel": function () {
                                tr.attr("empId", prev_empId);
                                tr.find("input[type='text']").eq(0).val(prev_emp);

                                $("#dvAleartDialog").dialog("close");
                            }
                        }
                    });
                }
                else {
                    tr.attr("empId", empId);
                    tr.find("input[type='text']").eq(0).val(emp);

                    tr.find("td[iden='emp']").eq(0).next().html(isPDA);
                    tr.find("td[iden='emp']").eq(0).next().next().html(Modal);
                    tr.find("td[iden='emp']").eq(0).next().next().next().html(PIMEI);
                    tr.find("td[iden='emp']").eq(0).next().next().next().next().html(SIMEI);
                }
            }
            else if (flg == "PDA") {

                //var tblPDAMap = $.parseJSON('[' + $("#cphRight_hdnActiveEmpMstr").val() + ']')[0].Table;
                //var filter_row = $.grep(tblPDAMap, function (abc, ind) {
                //    return abc['EmpName'] == emp;
                //});

                var obj = "";
                if (empId != "0") {
                    $("#tblPDAAssign").find("tr[iden='trMain']").each(function () {
                        if ($(this).find("input[type='text']").eq(0).val() == emp) {
                            obj = this;
                        }
                    });
                }

                if (obj != "") {
                    $("#dvAleartDialog").html("<span style='font-weight:600; font-size:13px; color: #666666;'><b>" + emp + "<b/> is already map with PDA - Primary IMEI [" + $(obj).find("td[iden='pimei']").eq(0).html() + "] & Secondary IMEI [" + $(obj).find("td[iden='simei']").eq(0).html() + "]. Assigning to a new PDA, will un-assign it from the previous one. Do you want to continue ?");
                    $("#dvAleartDialog").dialog({
                        modal: true,
                        title: "Confirmation :",
                        width: 600,
                        height: 200,
                        buttons: {
                            "Continue": function () {
                                tr.attr("empId", empId);
                                tr.find("input[type='text']").eq(0).val(emp);

                                $(obj).attr("empId", "0");
                                $(obj).find("input[type='text']").eq(0).val("Un-Assigned");

                                $("#dvAleartDialog").dialog("close");
                            },
                            "Cancel": function () {
                                tr.attr("empId", prev_empId);
                                tr.find("input[type='text']").eq(0).val(prev_emp);

                                $("#dvAleartDialog").dialog("close");
                            }
                        }
                    });
                }
                else {
                    tr.attr("empId", empId);
                    tr.find("input[type='text']").eq(0).val(emp);
                }
            }
            else if (flg == "AssignPDA") {
                var obj = "";
                if (empId != "0") {
                    $("#tblPDAAssign").find("tr[iden='trMain']").each(function () {
                        if ($(this).find("input[type='text']").eq(0).val() == emp) {
                            obj = this;
                        }
                    });
                }

                if (obj != "") {
                    $("#dvAleartDialog").html("<span style='font-weight:600; font-size:13px; color: #666666;'><b>" + emp + "<b/> is already map with PDA - Primary IMEI [" + $(obj).find("td[iden='pimei']").eq(0).html() + "] & Secondary IMEI [" + $(obj).find("td[iden='simei']").eq(0).html() + "]. Assigning to a new PDA, will un-assign it from the previous one. Do you want to continue ?");
                    $("#dvAleartDialog").dialog({
                        modal: true,
                        title: "Confirmation :",
                        width: 600,
                        height: 200,
                        buttons: {
                            "Continue": function () {
                                tr.attr("empId", empId);
                                tr.find("input[type='text']").eq(0).val(emp);

                                $(obj).attr("empId", "0");
                                $(obj).find("input[type='text']").eq(0).val("Un-Assigned");

                                $("#dvAleartDialog").dialog("close");
                            },
                            "Cancel": function () {
                                tr.attr("empId", prev_empId);
                                tr.find("input[type='text']").eq(0).val(prev_emp);

                                $("#dvAleartDialog").dialog("close");
                            }
                        }
                    });
                }
                else {
                    tr.attr("empId", empId);
                    tr.find("input[type='text']").eq(0).val(emp);
                }
            }
            fnHidePopup();
        }

        function fnSelectPDA(ctrl) {
            $(ctrl).closest("div.input-group").find("input[type='text']").val($(ctrl).html().split("-")[0].split(":")[1].trim());
            fnHidePopup();
        }

        function fnSaveRouteMapping() {
            var RouteMappingArr = [];
            var flgValidate = 0;

            $("#tblRouteAssign").find("tr[iden='trMain']").each(function () {
                var str = $(this).find("input[type='text']").eq(0).val();
                if (str == "") {
                    flgValidate = 1;
                }
                else {
                    //var filter_row = $.grep(tblActiveUser, function (abc, ind) {
                    //    return abc['EmpName'] == str;
                    //});
                    //if (filter_row.length == 0) {
                    //    flgValidate = 1;
                    //}
                }
                RouteMappingArr.push({ nid: $(this).attr("nid"), ntype: $(this).attr("ntype"), empId: $(this).attr("empId") });
            });

            if (flgValidate == 1) {
                alert("Please Select your selection correctly ! ");
            }
            else {
                $("#divLoader").show();
                PageMethods.fnSaveRouteMapping(RouteMappingArr, $("#cphRight_hdnLoginId").val(), fnSaveRouteMapping_pass, fnfail);
            }
        }

        function fnSaveRouteMapping_pass(res) {
            if (res != "2") {
                alert("Route Assigned successfully !");
                fnfilterMstrList();
                $("#divLoader").hide();
            }
            else {
                fnfail();
            }
        }

        function fngetPDAAssignlist() {
            $("#divLoader").show();
            PageMethods.GetPDAAssignList($("#cphRight_hdnSiteNodeId").val(), $("#cphRight_hdnSiteNodeType").val(), $("#cphRight_hdnLoginId").val(), GetPDAAssignList_pass, fnfail);
        }

        function GetPDAAssignList_pass(res) {
            $("#divPDAAssignBody").html(res.split("^")[1]);
            $("#divLoader").hide();
        }

        function fnAddNewPDA() {
            $("#cphRight_hdnEmpId").val("0");
            $("#trAddEditPDA").attr('empId', "0");
            $("#trAddEditPDA").attr('emp', "Un-Assigned");
            $("#trAddEditPDA").find("input[type='text']").eq(0).val("Un-Assigned");
            $("#trAddEditPDA").find("input[type='text']").eq(0).removeAttr("disabled");

            fnAddPDA();
        }

        function fnSavePDAMapping() {
            var PDAMappingArr = [];
            $("#tblPDAAssign").find("tr[iden='trMain']").each(function () {
                //var flgMoved = 0;
                //if ($(this).attr("empId") != $(this).attr("prev_empId") && $(this).attr("prev_empId") != "0") {
                //    flgMoved = 1;
                //}
                PDAMappingArr.push({ Modal: $(this).find("td[iden='modal']").html(), PIMEI: $(this).find("td[iden='pimei']").html(), SIMEI: $(this).find("td[iden='simei']").html(), EmpId: $(this).attr("empId") });
            });

            $("#divLoader").show();
            PageMethods.fnSavePDAMapping(PDAMappingArr, $("#cphRight_hdnSiteNodeId").val(), $("#cphRight_hdnSiteNodeType").val(), $("#cphRight_hdnLoginId").val(), fnSavePDAMapping_pass, fnfail);
        }

        function fnSavePDAMapping_pass(res) {
            if (res != "2") {
                alert("PDA Mapped successfully !");
                fnfilterMstrList();
                $("#divLoader").hide();
            }
            else {
                fnfail();
            }
        }

        function fnfail() {
            alert("Due to some technical resons, we are unable to process your request !");
            $("#divLoader").hide();
        }

        function fnShowUserFilterPopup(ctrl, flg) {
            fnShowTransLayer(flg);
            $(ctrl).closest("div").find("div.clsFilterPopup").eq(0).show();
            $(ctrl).closest("div").find("div.clsFilterPopup").eq(0).html($("#cphRight_hdnActiveEmpFilterView").val());

            var str = $(ctrl).val().toUpperCase();;
            $(ctrl).closest("div").find("div.clsFilterPopup").eq(0).find("td").each(function () {
                if ($(this).html().toUpperCase().indexOf(str) > -1) {
                    $(this).show();
                }
                else {
                    $(this).hide();
                }
            });
        }
        function fnShowPDAFilterPopup(ctrl, flg) {
            fnShowTransLayer(flg);
            $(ctrl).closest("div").find("div.clsFilterPopup").eq(0).show();
            $(ctrl).closest("div").find("div.clsFilterPopup").eq(0).html($("#cphRight_hdnActivePDAFilterView").val());

            var str = $(ctrl).val().toUpperCase();;
            $(ctrl).closest("div").find("div.clsFilterPopup").eq(0).find("li").each(function () {
                if ($(this).html().toUpperCase().indexOf(str) > -1) {
                    $(this).show();
                }
                else {
                    $(this).hide();
                }
            });
        }

        function fnShowTransLayer(flg) {
            switch (flg.toString()) {
                case "0":
                    $("#dvPopup_bg").show();
                    break;
                case "1":
                    $("#dvPopup_bg_User").show();
                    break;
                case "2":
                    $("#dvPopup_bg_PDA").show();
                    break;
            }
        }

        function fnHidePopup() {
            $("div.clstranslayer").hide();
            $("div.clsFilterPopup").hide();
        }

        function fnHasPDA(cntr) {
            if (cntr == 1) {
                $("#trIMEI").css("display", "table-row");
                $("#trModal").css("display", "table-row");
            }
            else {
                $("#trIMEI").css("display", "none");
                $("#trModal").css("display", "none");
            }
        }
    </script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphLeft" runat="Server">
    <iframe id="fraLeft" name="fraLeft" height="100%" width="100%" scrolling="yes" frameborder="0" src='../frmLeftMainTreeView.aspx'></iframe>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphRight" runat="Server">
    <div id="dvPopup_bg" class="clstranslayer" style="" onmousedown="fnHidePopup()" onclick="fnHidePopup();"></div>
    <div id="divLoader" style="position: fixed; z-index: 9999; top: 0; bottom: 0; left: 0; right: 0; opacity: .80; -moz-opacity: 0.8; filter: alpha(opacity=80); background-color: #ccc;">
        <div id="Div2" runat="server" align="center" style="position: absolute; width: 150px; top: 30%; left: 45%;">
            <img alt="" title="Loading..." src="../Images/blue-loading.gif" />
        </div>
    </div>
    <h4 id="Header">>>User Management & Assignment</h4>
    <div id="HeadFilter" style="padding: 10px 0; width: 100%">
        <table>
            <tr>
                <td class="clstoplbl" style="width: 100px;">Site</td>
                <td class="clstopSeperate">:</td>
                <td class="clstopVal" style="width: 200px">
                    <asp:DropDownList ID="ddlSite" runat="server"></asp:DropDownList></td>
                <td>
                    <a class="btn-info" href="#" onclick="fnGetList();" style="font-size: 14px;">Get List</a></td>
            </tr>
        </table>
    </div>
    <div class="clsTabHeader" flg="3" onclick="fnTab(3);">User Management</div>
    <div class="clsTabHeader" flg="2" onclick="fnTab(2);">PDA Assignment</div>
    <div class="clsTabHeader" flg="1" onclick="fnTab(1);">Route Assignment</div>
    <div class="clsTabBodyBlock">
        <div class="clsTabBody" id="divUserMgmt" style="display: none">
            <div style="padding: 10px 0; width: 100%">
                <table>
                    <tr>
                        <td class="clstoplbl" style="width: 100px;">User Status</td>
                        <td class="clstopSeperate">:</td>
                        <td class="clstopVal" style="width: 20px">
                            <input id="rdActiveUser" type="radio" name="Status" flg="1" onchange="fnSwitchUserStatus(this);" /></td>
                        <td class="clstopVal" style="width: 140px; vertical-align: bottom;">Active</td>
                        <td class="clstopVal" style="width: 20px">
                            <input id="rdInActiveUser" type="radio" name="Status" flg="0" onchange="fnSwitchUserStatus(this);" /></td>
                        <td class="clstopVal" style="width: 140px; vertical-align: bottom;">In-Active</td>
                        <td></td>
                        <td style="text-align: right;">
                            <a class="btn-info" href="#" onclick="fnAddUser();">Add New User</a></td>
                    </tr>
                </table>
            </div>
            <div id="divUserMgmtTbl">
            </div>
        </div>
        <div class="clsTabBody" id="divPDAAssign" style="display: none">
            <div style="padding: 10px 0; width: 100%">
                <table>
                    <tr>
                        <td></td>
                        <td style="text-align: right;">
                            <a class="btn-info" href="#" onclick="fnAddNewPDA();">Add/Edit PDA</a></td>
                        <td style="width: 220px; text-align: right;">
                            <a class="btn-info" href="#" onclick="fnSavePDAMapping();">Save PDA-TeleCaller Mapping</a></td>
                    </tr>
                </table>
            </div>
            <div id="divPDAAssignBody"></div>
        </div>
        <div class="clsTabBody" id="divRouteAssign" style="display: none">
            <div style="padding: 10px 0; width: 100%">
                <table>
                    <tr>
                        <td></td>
                        <td style="text-align: right;">
                            <a class="btn-info" href="#" onclick="fnSaveRouteMapping();">Save Route-TeleCaller Mapping</a></td>
                    </tr>
                </table>
            </div>
            <div id="divRouteAssignBody"></div>
        </div>
    </div>

    <div id="dvAddEditUserDialog" style="display: none">
        <div id="dvPopup_bg_User" class="clstranslayer" style="" onmousedown="fnHidePopup()" onclick="fnHidePopup();"></div>
        <table>
            <tr>
                <td class="clslbl">Name<span style="color: #ff0000;">*</span></td>
                <td class="clsSeperate">:</td>
                <td class="clsVal">
                    <input id="txtEmpName" type="text" placeholder="Name" /></td>
                <td class="clsrtlbl" style="width: 140px;">Date Of Birth</td>
                <td class="clsSeperate">:</td>
                <td class="clsVal" style="width: 120px;">
                    <input id="txtEmpDOB" type="text" placeholder="Date of Birth" /></td>
            </tr>
            <tr>
                <td class="clslbl">Contact No.<span style="color: #ff0000;">*</span></td>
                <td class="clsSeperate">:</td>
                <td class="clsVal">
                    <input id="txtEmpContact" type="text" placeholder="Contact No." maxlength="10" style="width: 140px;" /></td>
                <td class="clsrtlbl">Emergency Contact</td>
                <td class="clsSeperate">:</td>
                <td class="clsVal">
                    <input id="txtEmpEmergencyContact" type="text" placeholder="Emergency Contact No." /></td>
            </tr>
            <tr>
                <td class="clslbl">Email - ID<span style="color: #ff0000;">*</span></td>
                <td class="clsSeperate">:</td>
                <td class="clsVal" colspan="4">
                    <input id="txtEmpEmail" type="text" placeholder="Email" /></td>
            </tr>
            <tr>
                <td class="clslbl">Address</td>
                <td class="clsSeperate">:</td>
                <td class="clsVal" colspan="4">
                    <textarea id="txtEmpAddress" rows="3" cols="10" placeholder="Address"></textarea></td>
            </tr>
            <tr>
                <td class="clslbl">Has PDA ?<span style="color: #ff0000;">*</span></td>
                <td class="clsSeperate">:</td>
                <td class="clsVal" colspan="4">
                    <table>
                        <tr>
                            <td class="clstopVal" style="width: 20px">
                                <input type="radio" id="HasPDAYes" name="IMEI" onchange="fnHasPDA(1);" /></td>
                            <td class="clstopVal" style="width: 140px; vertical-align: bottom;">Yes</td>
                            <td class="clstopVal" style="width: 20px">
                                <input type="radio" id="HasPDANo" name="IMEI" onchange="fnHasPDA(2);" /></td>
                            <td class="clstopVal" style="vertical-align: bottom;">No</td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr id="trModal" style="display: none;">
                <td class="clslbl">Model<span style="color: #ff0000;">*</span></td>
                <td class="clsSeperate">:</td>
                <td class="clsVal" colspan="2">
                    <input type="text" id="txtModal" placeholder="Model" /></td>
                <td colspan="2"></td>
            </tr>
            <tr id="trIMEI" style="display: none;">
                <td class="clslbl">IMEI<span style="color: #ff0000;">*</span></td>
                <td class="clsSeperate">:</td>
                <td class="clsVal" colspan="4">
                    <%--<input type="text" id="txtPIMEI" style="width: 45%;" maxlength="15" placeholder="Primary IMEI" />
                    /
                    <input type="text" id="txtSIMEI" maxlength="15" style="width: 45%;" placeholder="Secondary IMEI" />--%>

                    <div class='input-group' style="width: 45%; display: inline-block;">
                        <input id="txtPIMEI" type='text' value='' maxlength="15" onclick='fnShowPDAFilterPopup(this, 1);' onkeyup='fnShowPDAFilterPopup(this, 1)' /><div class='clsFilterPopup'></div>
                    </div>
                    /
                    <div class='input-group' style="width: 45%; display: inline-block;">
                        <input type='text' id="txtSIMEI" value='' maxlength="15" onclick='fnShowPDAFilterPopup(this, 1);' onkeyup='fnShowPDAFilterPopup(this, 1)' /><div class='clsFilterPopup'></div>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div id="dvAddEditPDADialog" style="display: none">
        <div id="dvPopup_bg_PDA" class="clstranslayer" style="" onmousedown="fnHidePopup()" onclick="fnHidePopup();"></div>
        <table>
            <tr id="trAddEditPDA" iden='trMain' flg='AssignPDA' emp='' empid=''>
                <td class="clslbl">Telecaller</td>
                <td class="clsSeperate">:</td>
                <td class="clsVal" colspan="2">
                    <div class='input-group'>
                        <input type='text' value='Un-Assigned' onclick='fnShowUserFilterPopup(this, 2);' onkeyup='fnShowUserFilterPopup(this, 2)' /><div class='clsFilterPopup'></div>
                    </div>
                </td>
                <td colspan="2"></td>
            </tr>
            <tr>
                <td class="clslbl">Model</td>
                <td class="clsSeperate">:</td>
                <td class="clsVal" colspan="2">
                    <input type="text" id="txtIndividualModal" placeholder="Model" style="width: 70%;" />
                </td>
                <td colspan="2"></td>
            </tr>
            <tr>
                <td class="clslbl">IMEI</td>
                <td class="clsSeperate">:</td>
                <td class="clsVal" colspan="4">
                    <%--<input type="text" id="txtIndividualPIMEI" style="width: 45%;" maxlength="15" placeholder="Primary IMEI" />--%>

                    <div class='input-group' style="width: 45%; display: inline-block;">
                        <input id="txtIndividualPIMEI" type='text' value='' maxlength="15" onclick='fnShowPDAFilterPopup(this, 2);' onkeyup='fnShowPDAFilterPopup(this, 2)' /><div class='clsFilterPopup'></div>
                    </div>
                    /
                    <div class='input-group' style="width: 45%; display: inline-block;">
                        <input type='text' id="txtIndividualSIMEI" value='' maxlength="15" onclick='fnShowPDAFilterPopup(this, 2);' onkeyup='fnShowPDAFilterPopup(this, 2)' /><div class='clsFilterPopup'></div>
                    </div>
                    <%--<input type="text" id="txtIndividualSIMEI" maxlength="15" style="width: 45%;" placeholder="Secondary IMEI" />--%>
                </td>
            </tr>
        </table>
    </div>
    <div id="dvAleartDialog" style="display: none"></div>
    <asp:HiddenField runat="server" ID="hdnEmpId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnEmpStatus" Value="0" />
    <asp:HiddenField runat="server" ID="hdnLoginId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnMenuId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnSiteNodeId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnSiteNodeType" Value="0" />
    <asp:HiddenField runat="server" ID="hdnActiveEmpMstr" Value="0" />
    <asp:HiddenField runat="server" ID="hdnActiveEmpFilterView" Value="0" />
    <asp:HiddenField runat="server" ID="hdnActivePDAFilterView" Value="0" />
</asp:Content>
