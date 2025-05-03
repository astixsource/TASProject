<%@ Page Language="C#" AutoEventWireup="true" CodeFile="UploadEngine_DSEAbsentEmailData.aspx.cs" EnableSessionState="ReadOnly" Async="true" Inherits="UploadEngine_DSEAbsentEmailData" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../CSS/ThemeBlue.css" rel="Stylesheet" type="text/css" />
</head>
<body>
    <form id="form" runat="server" enctype="multipart/form-data">
    <asp:ScriptManager ID="scriptManager" runat="server" />
    <script type="text/javascript">
        function pageLoad(sender, args) {
            //Register the form and upload elements
            window.parent.register(
                $get('<%= this.form.ClientID %>'),
                $get('<%= this.fileUpload.ClientID %>')
            );
        }
        function fnChangeFileUpload() {
            window.parent.$("#cphRight_divRptFinelhead").html("");
            window.parent.setProgress(0);
            window.parent.updateMessage(2, 'Please select a file to upload', '', '0 of 0 Bytes');
        }
    </script>
    <asp:FileUpload ID="fileUpload" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel.sheet.macroEnabled.12,application/vnd.ms-excel.sheet.binary.macroEnabled.12" onchange="fnChangeFileUpload()"  runat="server" />
        <%--<asp:RegularExpressionValidator ID="rexp" runat="server" ControlToValidate="fileUpload"
     ErrorMessage="Only .xls, .xlsx, .xlsm, .xlsb"
     ValidationExpression="(.*\.([Xx][Ll][Ss])|.*\.([Xx][Ll][Ss][Bb])|.*\.([Xx][Ll][Ss][Xx])|.*\.([Xx][Ll][Ss][Mm])$)"></asp:RegularExpressionValidator>
        --%>
    </form>
</body>
</html>
