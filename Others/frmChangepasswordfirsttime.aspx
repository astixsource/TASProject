<%@ Page Language="C#" AutoEventWireup="true" CodeFile="frmChangepasswordfirsttime.aspx.cs" Inherits="frmChangepasswordfirsttime"   %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../scripts/jquery-1.11.3.js"></script>
    <link href="../CSS/csPop.css" rel="stylesheet" />
    <script src="../scripts/jsChangePasswordLatest1.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js" type="text/javascript"></script>
<style>
#header .R_header img {
    width: auto;
    height: 90px !important;
    float: right;
    padding: 14px;
}
</style>
    <script type="text/javascript">
       history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        });

        function fnlater()
        {
            var IsDistributor = document.getElementById("hdnIsDistributor").value;
            if (IsDistributor == 1) {
                window.location.href = '../manageorder/frmdefault.aspx';
            } else {
                window.location.href = '../others/default.aspx';
            }
            
        }

        function fnLogout() {
            window.location.href = "../frmLogout.aspx"
        }


    </script>
</head>
<body>
    <form id="form1" runat="server">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #FFF;">
        <tr>
            <td colspan="2">
                <!---------// header section start here //------------>
                <div id="header">
                    <div class="L_header">
                        <img src="../NewImages/astix_logo.png" /></div>
                    <div class="R_header">
                        <img src='<%= ConfigurationManager.AppSettings["Logo"].ToString().Trim()%>' alt="" class="logo fr" /></div>
                    <div class="clear">
                    </div>
                </div>
                <!---------// Logout_bar section start here //------------>
                            <div id="Logout_bar">
                <div class="B_right1">
                    <%--<a onclick="fnHelpLine()" style="cursor: Hand" class="button1">Help</a>&nbsp; --%>
                    <%--<a onclick="fnChangePass()" style="cursor: Hand" class="button1">Change Password</a>&nbsp;--%>
                    <a onclick="fnLogout()" style="cursor: pointer" class="button1">Logout</a>&nbsp;
                </div>
                <div class="clear">
                </div>
            </div>
            </td>
        </tr>
        <tr>
           
            <td width="60%" valign="top" colspan="2" align="center">
                <!-- R_content Start -->
              <div class="toPopup-new">
            <div class="popup_content">
                <!--your content start-->
                <h3><b>Change Password</b></h3>
                <ul class="normal-list">
                    <li class="one">Please enter a password of your choice.</li>
                    <li class="two">Passwords should have Minimum length of 8 character and should be a combination of alphabets and numbers.</li>
                    <li class="three">Passwords should have atleast one special character.</li>
                    <li class="three">Passwords are case sensitive.</li>
                </ul>

                <div class="textbox-wrap" style="border-style:none">
                    <div class="input-name">
                        Login ID :
                    </div>
                    <input name="txtUserName" style="height:25px" type="text" id="txtUserName" runat="server" class="form-textbox" disabled="disabled" />
                    <span id="RequiredFieldValidator1" style="color: Red; display: none;">*</span>
                </div>

                <div class="textbox-wrap" style="border-style:none">
                    <div class="input-name">
                        Old Password :
                    </div>
                    <input name="txtOldPassword" type="password" id="txtOldPassword" class="form-textbox"/>
                    <span id="RequiredFieldValidator4" style="color: Red; display: none;">*</span>
                </div>

                <div class="textbox-wrap" style="border-style:none">
                    <div class="input-name">
                        New Password :
                    </div>
                    <input name="txtNewPassword" type="password" id="txtNewPassword" class="form-textbox"/>
                    <span id="RequiredFieldValidator2" style="color: Red; display: none;">*</span>
                </div>

                <div class="textbox-wrap" style="border-style:none">
                    <div class="input-name">
                        Confirm New Password :
                    </div>
                    <input name="txtConfirmPassword" type="password" id="txtConfirmPassword" class="form-textbox"/>
                    <span id="RequiredFieldValidator3" style="color: Red; display: none;">*</span>
                </div>
            </div>
            <div class="login-footer" style="padding-bottom: 10pt; margin-top: -10pt;">
                <input type="button" name="SubmitBtn" value="Submit"  id="ctl00_SubmitBtn" class="button"/>
                <input type="button" name="CancelBtn" value="Change later" id="ctl00_CancelBtn" onclick="fnlater()" class="button"/>
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
    <div id="footer">
    </div>
        <input type="hidden" id="hdnIsDistributor" value="0" runat="server" >
    </form>
</body>
</html>
