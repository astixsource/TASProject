<%@ Page Language="C#" AutoEventWireup="true" CodeFile="frmAutoDial.aspx.cs" Inherits="ManageOrder_frmAutoDial" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
   <title></title>
        <meta charset="utf-8" />
    <script src="../scripts/jquery-3.6.0.js"></script>
           <style>
               .required {  /* Marker for required fields */
   color: red;
}
 
.errorMsg {  /* for error messages */
   color: red;
}
 
.errorBox {  /* for the error input text fields */
   border: 2px solid red;
}
 
table {
   border: 0;
}
 
td {
   margin: 0;
   padding: 3px 10px;
}
           </style>
    <script>

        function foo() {
            Page_ClientValidate();
            if (Page_IsValid) {
                alert("alert page is value");
            }
        }
    </script>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#btnSubmit").closest("form").submit(function () {
                if (Page_IsValid) {
                    alert("alert page is value");
                }
            });
        });
    </script>
</head>
<body>
    <form id="form1" runat="server" >
  <table>
    <tr>
      <td><label for="txtName">Name<span class="required">*</span></label></td>
      <td><input type="text" id="txtName" name="name" required autofocus></td>
    </tr>
    <tr>
      <td><label for="txtAddress">Address</label></td>
      <td><input type="text" id="txtAddress" name="address"></td>
    </tr>
    <tr>
      <td><label for="txtZipcode">Zip Code<span class="required">*</span></label></td>
      <td><input type="text" id="txtZipcode" name="zipcode"
            placeholder="enter a 5-digit code"
            required pattern="^\d{5}$"
            oninvalid="this.setCustomValidity('Enter a 5-digit zipcode')"
            oninput="setCustomValidity('')"></td>
    </tr>
    <tr>
      <td>Country<span class="required">*</span></td>
      <td><select id="selCountry" name="country" required>
            <option value="" selected>Please select...</option>
            <option value="AA">AA</option>
            <option value="BB">BB</option>
            <option value="CC">CC</option>
          </select></td>
    </tr>
    <tr>
      <td>Gender<span class="required">*</span></td>
      <td><label><input type="radio" name="gender" value="m" required>Male</label>
          <label><input type="radio" name="gender" value="f">Female</label></td>
    </tr>
    <tr>
      <td>Preferences<span class="required">*</span></td>
      <td><label><input type="checkbox" name="color" value="r">Red</label>
          <label><input type="checkbox" name="color" value="g" checked>Green</label>
          <label><input type="checkbox" name="color" value="b">Blue</label></td>
    </tr>
    <tr>
      <td><label for="txtPhone">Phone<span class="required">*</span></label></td>
      <td><input type="tel" id="txtPhone" name="phone" required></td>
    </tr>
    <tr>
      <td><label for="txtEmail">Email<span class="required">*</span></label></td>
      <td><input type="email" id="txtEmail" name="email" required></td>
    </tr>
    <tr>
      <td><label for="txtPassword">Password<span class="required">*</span></label></td>
      <td><input type="password" id="txtPassword" name="password"
          required pattern="^\w{6,8}$"
          placeholder="6-8 characters"></td>
    </tr>
    <tr>
      <td><label for="txtPWVerified">Verify Password<span class="required">*</span></label></td>
      <td><input type="password" id="txtPWVerified" name="pwVerified" required></td>
    </tr>
    <tr>
      <td><label for="dateBirthday">Birthday<span class="required">*</span></label></td>
      <td><input type="date" id="dateBirthday" name="birthday" required></td>
    </tr>
    <tr>
      <td><label for="timeAppt">Appointment<span class="required">*</span></label></td>
      <td><input type="time" id="timeAppt" name="appointment" required></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td><input type="submit"  value="SEND" id="btnSubmit" onclick="return foo()"  >&nbsp;
          <input type="reset" value="CLEAR" id="btnReset"></td>
    </tr>
    </table>       
       
    </form>
    
</body>
</html>
