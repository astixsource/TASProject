using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

public partial class frmMissedcallConfirmation : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.QueryString.Count > 0)
        {
            if (Request.QueryString["mobno"].ToString() != "" && Request.QueryString["recipient"].ToString() != "")
            {
                SqlConnection con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
                string strResponse = "";
                try
                {
                    con.Open();
                    string storedProcName = "spSaveCallReceivedDetails";
                    List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@MobileNo", Request.QueryString["mobno"].ToString()),
                   new SqlParameter("@recipient", Request.QueryString["recipient"].ToString())
                };
                    string ss = clsDbCommand.ExecuteQueryProcedure(storedProcName, con, sp);
                    strResponse = "200";
                }
                catch (Exception ex)
                {
                    strResponse = "500";
                }
                finally
                {
                    con.Dispose();
                }
                Response.Write(strResponse);
            }
            else
            {
                Response.Write("400");
            }
        }
        else
        {
            Response.Write("400");
        }
    }
}