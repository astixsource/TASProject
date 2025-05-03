<%@ Page Language="C#" AutoEventWireup="true" CodeFile="frmForgotPassword.aspx.cs" Inherits="frmForgotPassword" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Forgot Password</title>
    <script src="Scripts/jquery-3.6.0.js" type="text/javascript"></script>
    <%--<script src="scripts/jquery-1.12.4.js"></script>--%>
     <link href="CSS/style.css" rel="stylesheet" type="text/css" />
    <link href="CSS/csPop.css" rel="stylesheet" />
    <script src="scripts/jsForgotPassword.js"></script>
    <script src="scripts/jquery.min.js" type="text/javascript"></script>
    <style>
        .dvMessage {
            color: red;
            text-align: center;
        }
    </style>
    <script type="text/javascript">
        $(document).ready(function () {
            var errorMessage = $("#hdnErrorMessage").val()
            if (errorMessage != "") {
                alert(errorMessage);
                window.location.href = 'frmLogin.aspx'
            }
            //var showLaterButton = $("#hdnShowLaterButton").val();

            //if (showLaterButton == "1") {
            //    $("#ctl00_CancelBtn").css("display", "");
            //}
            //else {
            //    $("#ctl00_CancelBtn").css("display", "none");
            //}


        });
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        });

        //function fnlater() {
        //    var IsDistributor = document.getElementById("hdnIsDistributor").value;
        //    if (IsDistributor == 1) {
        //        window.location.href = 'manageorder/frmdefault.aspx';
        //    } else {
        //        window.location.href = 'default.aspx';
        //    }

        //}

        //function fnLogout() {
        //    window.location.href = "frmLogout.asp        //}


    </script>
</head>
<body>
    <form id="form1" runat="server">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #FFF;">
            <tr>
                <td width="60%" valign="top" colspan="2" align="center">
                    <!-- R_content Start -->
                    <div class="toPopup-new">
                        <div class="popup_content">
                            <!--your content start-->
                            <h3><b>Reset Password</b></h3>
                            <div class="dvMessage">
                                <asp:Label ID="lblMessage" runat="server" Visible="false"></asp:Label></div>
                            <ul class="normal-list">
                                <li>Passwords must consist of at least ten (10) characters </li>
                                <li>An uppercase alphabetical character (e.g., A-Z) </li>
                                <li>A lowercase alphabetical character (e.g., a-z) </li>
                                <li>A special character (e.g., !, $, @, %) </li>
                                <li>Two (2) numerical digits (e.g., 0-9) </li>
                            </ul>

                            <div class="textbox-wrap" style="border-style: none">
                                <div class="input-name">
                                    Username :
                                </div>
                                <input name="txtUserName" style="height: 25px; display: inline;" type="text" value="User43434" id="txtUserName"  class="form-textbox" disabled="disabled" />
                                <span id="RequiredFieldValidator1" style="color: Red; display: none;">*</span>
                            </div>

                            <%--<div class="textbox-wrap" style="border-style: none">
                                <div class="input-name">
                                    Old Password :
                                </div>
                                <input name="txtOldPassword" type="password" id="txtOldPassword" class="form-textbox" style="display: inline;" />
                                <span id="RequiredFieldValidator4" style="color: Red; display: none;">*</span>
                            </div>--%>

                            <div class="textbox-wrap" style="border-style: none">
                                <div class="input-name">
                                    New Password :
                                </div>
                                <input name="txtNewPassword" type="password" id="txtNewPassword" class="form-textbox" style="display: inline;" />
                                <span id="RequiredFieldValidator2" style="color: Red; display: none;">*</span><span id="spanNewPassword"></span>
                            </div>

                            <div class="textbox-wrap" style="border-style: none">
                                <div class="input-name">
                                    Confirm New Password :
                                </div>
                                <input name="txtConfirmPassword" type="password" id="txtConfirmPassword" class="form-textbox" style="display: inline;" />
                                <span id="RequiredFieldValidator3" style="color: Red; display: none;">*</span><span id="spanConfirmPassword"></span>
                            </div>
                        </div>
                        <div class="login-footer" style="padding-bottom: 10pt; margin-top: -10pt;">
                            <input type="button" name="SubmitBtn" value="Submit" id="ctl00_SubmitBtn" class="button" />
                            <%--<input type="button" name="CancelBtn" value="Change later" id="ctl00_CancelBtn" onclick="fnlater()" class="button" />--%>
                            <div id="ctl00_ValidationSummary1" style="color: Red; display: none;">
                            </div>
                        </div>
                        <!--your content end-->
                    </div>
                    <div class="loader"></div>
                    <div id="backgroundPopup"></div>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="hidden" id="hdnRes" runat="server" name="hdnRes">
                </td>
            </tr>
        </table>
        <!---------// footer section start here //------------>
        <%--<div id="footer">
        </div>--%>
        <%-- <input type="hidden" id="hdnIsDistributor" value="0" runat="server" />
        <input type="hidden" id="hdnShowLaterButton" value="0" runat="server" />--%>
        <input type="hidden" id="hdnUserId" value="0" runat="server" />
        <input type="hidden" id="hdnErrorMessage" value="" runat="server" />
        <input type="hidden" id="hdnOldValue" value="" runat="server" />
    </form>
</body>
</html>
