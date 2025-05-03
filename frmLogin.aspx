<%@ Page Language="VB" AutoEventWireup="false" CodeFile="frmLogin.aspx.vb" Inherits="Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <title><%= ConfigurationManager.AppSettings("Title").ToString().Trim()%></title>
    <link href="CSS/theme.css" rel="stylesheet" type="text/css" />

    <%--<link href="Styles/Multiselect/jquery-ui.css" rel="stylesheet" />
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <script src="scripts/jquery.min.js"></script>
    <script src="scripts/jquery-ui.js"></script>--%>

    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <%-- <link href="StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />--%>
    <link href="styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>
    <style>
        .clsDivHeader {
            text-align: center;
            display: inline-block;
            margin-top: 10px;
            font-size: 14px;
            color: #3f3f3f;
            font-weight: bold;
        }

        .clsDivForgot2 {
            padding: 2% 8% 2% 12%;
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
        .clsdivmaintenance{
            width:700px;
            margin:10px 23%;
        }
        .clsdivmaintenance > img{
            width:100%;
        }
       .clsdivmaintenance > div {
   width: 15%;
    position: absolute;
    margin: 210px 0px 0px 70px;
    /* height: 300px; */
    /* background: #fff; */
    font-size: 11pt;
    font-family:Arial, Helvetica, sans-serif;
}
       #systemNotAvailableDialog img {
    display: block;
    margin: 0 auto;
    margin-bottom: 10px;
}
#systemNotAvailableDialog p {
    text-align: center;
    font-size: 14px;
}
    </style>
    <script language="javascript">
        function fnReset() {
            document.getElementById("txtUserName").value = "";
            document.getElementById("txtPassword").value = "";
            document.getElementById("txtUserName").focus();
            return false;
        }
        function fnValidate() {
            if (document.getElementById("txtUserName").value == "") {
                alert("User name can't be left blank");
                document.getElementById("txtUserName").focus();
                return false;
            }
            else if (document.getElementById("txtPassword").value == "") {
                alert("Password can't be left blank");
                document.getElementById("txtPassword").focus();
                return false;
            }
            else
                return true;
        }
        function fnSetFocus() {
            document.getElementById("hdnRes").value = screen.availWidth + "*" + screen.availHeight;
        }

    </script>
    <script type="text/javascript">
        function detectmob() {

            if ((window.innerWidth <= 400 && window.innerHeight <= 640) || (window.innerWidth <= 640 && window.innerHeight <= 400) || IsMobileDevice != "False") {
                return true;
            } else {
                return false;
            }
        }
        function ShowRunningAssesments() {
            fnReset();
            $("#dvAlertDialog").dialog({
                title: 'Warning Alert:',
                modal: true,
                width: "auto",
                close: function () {
                    $(this).dialog("destroy");
                },
                buttons: [{
                    text: "OK",
                    click: function () {
                        $("#dvAlertDialog").dialog("close");
                    }
                }]
            });
        }
        function ShowMsgForSystemNotAvailable() {
            fnReset();
            $("#systemNotAvailableDialog").dialog({
                title: 'Alert:',
                modal: true,
                width: "37%",
                close: function () {
                    $(this).dialog("destroy");
                },
                open: function () {
                    $("div[aria-describedby='systemNotAvailableDialog']").find("div.ui-dialog-titlebar").hide();
                },
                buttons: [{
                    text: "OK",
                    click: function () {
                        $("#systemNotAvailableDialog").dialog("close");
                    }
                }]
            });
        }

        function ShowAgreementWarningMsg(flgAgreementsigned, RoleId) {
            //$("#dvAlertDialog")[0].innerHTML = "Your payments are long overdue. Kindly settle all overdue payment immediately or services will be terminated. Details have already been shared and in case of any clarifications or duplicate invoices, please contact <a href='mailto:accounts@astix.in'>accounts@astix.in</a>";// flgAgreementsigned == 1 ? "Your payments are long overdue. Kindly settle all overdue payment immediately or services will be terminated. Details have already been shared and in case of any clarifications or duplicate invoices, please contact <a href='mailto:accounts@astix.in'>accounts@astix.in</a>" : "Kindly send a Signed and Stamped copy of your TAS services agreement at the earliest to Astix Intelligent Management Solutions, Gurgaon office. Please contact Astix on 01244367390 for further information.";
            $("#dvAlertDialog").dialog({
                title: 'Warning Alert:',
                modal: true,
                width: "70%",
                close: function () {
                    $(this).dialog("destroy");
                },
                buttons: [{
                    text: flgAgreementsigned == 1 ? "Click To Continue" : "Click To Exit",
                    click: function () {
                        $("#dvAlertDialog").dialog("close");
                        if (flgAgreementsigned == 1) {
                            if (RoleId == 3) {
                                window.location.href = "ManageOrder/frmRouteList_Telecaller.aspx";
                            }
                            else if (RoleId == 5) {
                                window.location.href = "ManageOrder/frmMarkTeleCallerAbsent.aspx";
                            } else {
                                window.location.href = "ManageOrder/frmMarkAbsent.aspx";

                            }
                        }
                    }
                }]
            });
        }

        $(document).ready(function () {
            $(".forgotpwd").click(function () {
                fnOpenForgotPasswordDialog();
            })

            $("#btnSendResetLink").click(function () {
                fnSendResetLink();
            })
        });
        function fnOpenForgotPasswordDialog() {
            $("#dvForgotPassword").dialog({
                modal: true,
                title: "Forgot Password",
                width: '450',
                height: 'auto',
                //buttons: {
                //    Close: function () {
                //        $(this).dialog('close');
                //    }
                //},
                open: function () {
                    //Do nothing
                }
            });
        }
        function fnSendResetLink() {
            $("#dvFadeForProcessing").css("display", "block");
            var userName = $("#txtUsernameForForgotPassword").val().trim();

            if (userName == "") {
                $("#dvFadeForProcessing").css("display", "none");
                $("#txtUsernameForForgotPassword").val("");
                $("#txtUsernameForForgotPassword").focus();
                alert("Please enter username first!");
                return false;
            }
            var csrfToken = document.getElementById("hiddenCsrfToken").value;
            $.ajax({
                url: "dmswebservice.asmx/fnGetUserdetailForResetLink",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    "X-CSRF-Token": csrfToken
                },
                data: '{UserName:' + JSON.stringify(userName) + '}',
                success: function (response) {
                    $("#dvFadeForProcessing").css("display", "none");
                    var strRep = response.d;

                    if (strRep.split("^")[0] == "1") {
                        alert(strRep.split("^")[1]);
                        //window.location.href = 'frmLogin.aspx';
                        $("#dvForgotPassword").dialog("close");
                    }
                    else {
                        alert(strRep.split("^")[1]);
                    }
                },
                error: function (msg) {
                    $("#dvFadeForProcessing").css("display", "none");
                    alert(msg.responseText);
                }
            });
        }

        function fnSendLogin() {
            if (document.getElementById("txtUserName").value == "") {
                alert("User name can't be left blank");
                document.getElementById("txtUserName").focus();
                return false;
            }
            else if (document.getElementById("txtPassword").value == "") {
                alert("Password can't be left blank");
                document.getElementById("txtPassword").focus();
                return false;
            }
            var UserName = document.getElementById("txtUserName").value;
            var Password = document.getElementById("txtPassword").value;
            var csrfToken = document.getElementById("hiddenCsrfToken").value;
            $("#dvFadeForProcessing").show();
            $.ajax({
                url: "frmLogin.aspx/fnLoginFromDB",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    "X-CSRF-Token": csrfToken
                },
                data: '{UserName:' + JSON.stringify(UserName) + ',Password:' + JSON.stringify(Password) + '}',
                success: function (response) {
                    $("#dvFadeForProcessing").css("display", "none");
                    var strRep = response.d;

                    $("#dvFadeForProcessing").hide();
                    if (strRep.split("|")[0] == 2) {
                        $("#dvMessage").html(strRep.split("|")[1]);
                    }
                    else if (strRep.split("|")[0] == 3) {
                        $("#dvAlertDialog").html(strRep.split("|")[1]);
                        ShowRunningAssesments();
                    }
                    else if (strRep.split("|")[0] == 4) {
                        $("#dvAlertDialog").html(strRep.split("|")[1]);
                        ShowAgreementWarningMsg(strRep.split("|")[2], strRep.split("|")[3]);
                    }
                    else if (strRep.split("|")[0] == 5) {
                        $("#pmsg").html(strRep.split("|")[1]);
                        ShowMsgForSystemNotAvailable();
                    }
                    else {
                        $("#dvFadeForProcessing").show();
                        window.location.href = strRep.split("|")[1];
                    }
                },
                error: function (msg) {
                    $("#dvFadeForProcessing").css("display", "none");
                    alert(msg.responseText);
                }
            });
            //PageMethods.fnLoginFromDB(UserName, Password, function (result) {
            //    $("#dvFadeForProcessing").hide();
            //    if (result.split("|")[0] == 2) {
            //        $("#dvMessage").html("Error:" + result.split("|")[1]);
            //    }
            //    else if (result.split("|")[0] == 3) {
            //        $("#dvAlertDialog").html(result.split("|")[1]);
            //        ShowRunningAssesments();
            //    }
            //    else if (result.split("|")[0] == 4) {
            //        $("#dvAlertDialog").html(result.split("|")[1]);
            //        ShowAgreementWarningMsg(result.split("|")[2], result.split("|")[3]);
            //    }
            //    else {
            //        $("#dvFadeForProcessing").show();
            //        window.location.href = result.split("|")[1];
            //    }

            //}, function (result) {
            //    $("#dvFadeForProcessing").hide();
            //    $("#dvMessage").html("Error:" + result._message);
            //});
        }
    </script>
    <style>
        /*.full-background {
            background-color:#1980c8;
        }*/
    </style>
</head>
<body onload="fnSetFocus();">
    <div class="full-background">
    </div>
    <form id="form1" runat="server">
        <%--<asp:ScriptManager ID="ScriptManager1"  runat="server" EnablePageMethods="true">
    </asp:ScriptManager>--%>
        <!------------------------// HEADER START HERE //------------------------>
        <div class="header">
            <div class="fl">
                <img src="Img/astix_logo.png" alt="" class="logo f-logo" />
                
            </div>

            <img alt="" class="logo fr" />
            <div class="clear"></div>
        </div>
        <!------------------------// HEADER END HERE //------------------------>


        <div class="container">
            <div runat="server" id="dvMaintenancediv" class="clsdivmaintenance">
                <div id="dvmaintenancetext" runat="server" class="clsdivmaintenanceText"></div>
                <img src="Images/Maintenance1.jpg" />
            </div>
            <div runat="server" id="dvlogindiv" >
                <div class="loginfrm">
                    <div class="login-box">
                        <div class="login-box-msg">User Login</div>
                        <div class="login-box-body">
                            <span>User Name </span>
                            <div class="form-group has-feedback">
                                <input type="text" placeholder="Username" id="txtUserName"  autocomplete="off" name="Username" class="form-control" />
                                <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                            </div>

                            <span>Password </span>
                            <div class="form-group has-feedback">
                                <input type="password" placeholder="Password" id="txtPassword" autocomplete="off" name="Password" class="form-control" />
                                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                            </div>
                        </div>
                        <!-- /.login-box-body -->
                        <div class="logfooter" style="padding-top: 0px">
                            <%--<input name="Submit" type="button" value="Submit" class="button" />
                            <input name="Reset" type="button" value="Reset" class="button" />--%>

                            <input name="Reset" type="button" value="Submit" class="button" onclick="fnSendLogin();" />
                            <%--<asp:Button ID="btnSubmit" Text="Submit" CssClass="button" runat="server" OnClientClick="return fnValidate();"/>--%>
                            <input name="Reset" type="button" value="Reset" class="button" onclick="fnReset();" />
                            <%--<asp:Button ID="btnReset" Text="Reset" CssClass="button" runat="server" />--%>
                            <div class="bottom-text text-right" style="margin-top: 8px; display: none">
                                <span class="forgotpwd">Forgot <a href="###">Password</a>?</span>
                            </div>
                            <div id="dvMessage" align="center" runat="server" style="color: #FF0000; padding: 10px 0 0;">
                            </div>
                        </div>
                        <!-- /.login-box -->
                    </div>
                </div>
            </div>
        </div>

        <!---------// footer section start here //------------>
        <div id="footer">
        </div>
        <div id="dvForgotPassword" style="display: none">
            <div class="text-center">
                <div align="center" class="clsDivHeader">Enter Your Username</div>
            </div>
            <div class="clsDivForgot2">
                <div class="custom-form-group clsDivForgot3" data-validate="Enter username">
                    <input type="text" placeholder="Username" id="txtUsernameForForgotPassword" maxlength="100"   autocomplete="off" name="Username" class="form-control" />
                    <span class="custom-focus-input" data-placeholder="&#xe008;"></span>
                </div>
                <div class="text-center">
                    <input type="button" id="btnSendResetLink" value="Send Reset Link" class="button" />
                </div>

            </div>
        </div>
        <div id="dvFadeForProcessing" style="display: none" align="center" class="clsloader">
            <img src="NewImages/ajax-loader.gif" style="margin-top: 300px;" />
        </div>
        <input type="hidden" id="hiddenCsrfToken" runat="server" name="csrf" value="" />
        <input type="hidden" id="hdnRoleId" runat="server" name="hdnRoleId">
        <input type="hidden" id="hdnRes" runat="server" name="hdnRes">
        <div id="dvAlertDialog" style="display: none" runat="server"></div>
        <div id="mydivant" runat="server" style="display: none"></div>
        <div id="systemNotAvailableDialog" title="System Not Available" style="display:none;">
    <img src="Images/SystemNotAvailable.png" alt="System Not Available" style="width:200px;height:auto;">
    <p id="pmsg">The system is currently unavailable. Please try again later.</p>
</div>
    </form>
</body>
</html>
