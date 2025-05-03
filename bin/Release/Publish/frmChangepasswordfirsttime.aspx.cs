using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class frmChangepasswordfirsttime : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //Session("username")
        if (Session["username"] == null)
        {
            Response.Redirect("FrmLogout.aspx");
            return;
        }
        if (!IsPostBack)
        {
            if (Session["username"] != null)
            {
                hdnIsDistributor.Value = Session["SalesNodeType"] == null || Convert.ToString(Session["SalesNodeType"])!="150" ? "0" : "1";
                txtUserName.Value = Convert.ToString(Session["username"]);
                //Response.Redirect("../FrmLogout.aspx");
            }
        }
    }

}