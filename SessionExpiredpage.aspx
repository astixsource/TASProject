<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SessionExpiredpage.aspx.cs" Inherits="SessionExpiredpage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script language="javascript" type="text/javascript">

        function FnLogOut() {
            alert("Session Expired! Please Login Again.");
            parent.parent.window.location.href = "frmLogin.aspx";
        }
  
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    </div>
    </form>
</body>
</html>
