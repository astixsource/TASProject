using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class SessionExpiredpage : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        FormsAuthentication.SignOut();
        Session.Abandon();
        Session.RemoveAll();
        Page.ClientScript.RegisterStartupScript(this.GetType(), "popup", "<script language='javascript'>FnLogOut();</script>");
    }
}