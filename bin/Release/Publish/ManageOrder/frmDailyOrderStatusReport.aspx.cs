using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class frmDailyOrderStatusReport : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //Session["LoginId"] = "1";
        if (Session["LoginID"] == null)
        {
            Response.Redirect("~/SessionExpiredpage.aspx");
        }
        else {
            if (!IsPostBack)
            {
                hdnBranchCode.Value = Session["username"].ToString();
                hdnLoginId.Value = Session["LoginID"].ToString();
                hdnRoleId.Value = Session["RoleId"].ToString();
                hdnMenuId.Value = Request.QueryString["id"] == null ? "2" : Request.QueryString["id"].ToString();
                fnBindSiteList();
                fnBindReasonList();
                //fnBindDBRList();
            }
        }
    }

    private void fnBindSiteList()
    {

        SqlConnection Scon = new SqlConnection(ConfigurationManager.ConnectionStrings["strConn"].ConnectionString);
        SqlCommand Scmd = new SqlCommand();
        Scmd.Connection = Scon;
        Scmd.CommandText = "spGetSiteList";
        Scmd.Parameters.AddWithValue("@LoginId", Session["LoginId"].ToString());
        Scmd.CommandType = CommandType.StoredProcedure;
        Scmd.CommandTimeout = 0;
        SqlDataAdapter Sdap = new SqlDataAdapter(Scmd);
        DataTable dt = new DataTable();
        Sdap.Fill(dt);

        ListItem itm = new ListItem();
        //if (dt.Rows.Count > 1)
        //{
        //    itm.Text = "--------";
        //    itm.Value = "0-0";
        //    ddlSite.Items.Add(itm);
        //}
        foreach (DataRow dr in dt.Rows)
        {
            itm = new ListItem();
            itm.Text = dr["SiteName"].ToString();
            itm.Value = dr["sitenodeid"].ToString() + "-" + dr["SiteNodeType"].ToString();
            ddlSite.Items.Add(itm);
        }
    }

    private void fnBindReasonList()
    {
        SqlConnection Scon = new SqlConnection(ConfigurationManager.ConnectionStrings["strConn"].ConnectionString);
        SqlCommand Scmd = new SqlCommand();
        Scmd.Connection = Scon;
        Scmd.CommandText = "spGetTeleReasonForFilter";
        // Scmd.Parameters.AddWithValue("@LoginId", Session["LoginId"].ToString());
        Scmd.CommandType = CommandType.StoredProcedure;
        Scmd.CommandTimeout = 0;
        SqlDataAdapter Sdap = new SqlDataAdapter(Scmd);
        DataTable dt = new DataTable();
        Sdap.Fill(dt);

        ListItem itm = new ListItem();
        //if (dt.Rows.Count > 1)
        //{
        //    itm.Text = "--------";
        //    itm.Value = "0";
        //    ddlReason.Items.Add(itm);
        //}
        foreach (DataRow dr in dt.Rows)
        {
            itm = new ListItem();
            itm.Text = dr["TeleReason"].ToString();
            itm.Value = dr["TeleReasonId"].ToString();
            itm.Selected = dt.Rows.Count == 1;
            ddlReason.Items.Add(itm);
        }
    }
    private void fnBindDBRList()
    {

        SqlConnection Scon = new SqlConnection(ConfigurationManager.ConnectionStrings["strConn"].ConnectionString);
        SqlCommand Scmd = new SqlCommand();
        Scmd.Connection = Scon;
        Scmd.CommandText = "spGetBranchList";
        Scmd.Parameters.AddWithValue("@LoginId", Session["LoginId"].ToString());
        Scmd.CommandType = CommandType.StoredProcedure;
        Scmd.CommandTimeout = 0;
        SqlDataAdapter Sdap = new SqlDataAdapter(Scmd);
        DataTable dt = new DataTable();
        Sdap.Fill(dt);

        ListItem itm = new ListItem();
        if (dt.Rows.Count > 1)
        {
            itm.Text = "--------";
            itm.Value = "0-0";
           // ddlBranch.Items.Add(itm);
        }
        foreach (DataRow dr in dt.Rows)
        {
            itm = new ListItem();
            itm.Text = dr["BranchName"].ToString();
            itm.Attributes.Add("sitenodeid", dr["sitenodeid"].ToString() + "-" + dr["SiteNodeType"].ToString());
            itm.Value = dr["BrnNodeId"].ToString() + "-" + dr["BrnNodeType"].ToString();
            //ddlBranch.Items.Add(itm);
        }
    }

    [System.Web.Services.WebMethod()]
    public static string fnDailyOrderStatusReport(int LoginId, string sDate, string eDate,string sitenodeid, string sitenodetype, string SellerType,string TeleReasonIds)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        try
        {
            string storedProcName = SellerType=="1"? "spRptDailyOrderStatusTelecallerWise": "spRptDailyOrderStatusTelecallerWise_DSE";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@FromDate", sDate),
                   new SqlParameter("@ToDate", eDate),
                   new SqlParameter("@SiteNodeId", sitenodeid),
                   new SqlParameter("@SiteNodeType", sitenodetype),
                   new SqlParameter("@TeleReasonIds", TeleReasonIds),
                   new SqlParameter("@LoginId", LoginId)
                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            StringBuilder str = new StringBuilder();
            if (Ds.Tables[0].Rows.Count > 0)
            {
                string[] SkipColumn = new string[3];
                SkipColumn[0] = "DSENodeId";
                SkipColumn[1] = "DSENodeType";
                SkipColumn[2] = "flgAbsent";
               
                    //StartDate = DateTime.Parse(Ds.Tables[0].Rows[0]["StartDate"].ToString()).ToString("dd MMM");
                    str.Append("<table id='tbldbrlist' class='table' style='width:100%' ><thead><tr>");

                    string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                    //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:4%' >SrNo</th>");
                    for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                    {
                        if (SkipColumn.Contains(Ds.Tables[0].Columns[j].ColumnName))
                        {
                            continue;
                        }
                        string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                        if (sColumnName == "DisplayText" || sColumnName == "Total" || sColumnName == "Downloaded")
                        {
                            ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;padding:3px 2px 3px 2px'";
                        }
                        else
                        {
                            ss = "style='background-color:#008040;color:#ffffff;vertical-align:middle;text-align:center;padding:3px 2px 3px 2px'";
                        }
						if (sColumnName == "Tele Caller")
                        {
							sColumnName="TAS";
                        ss = "style='background-color:#008040;color:#ffffff;vertical-align:middle;text-align:center;padding:3px 2px 3px 2px;width:5%'";
                    }else if (sColumnName == "TAS Site" || sColumnName == "Branch/SubD Name")
                    {
                        ss = "style='background-color:#008040;color:#ffffff;vertical-align:middle;text-align:center;padding:3px 2px 3px 2px;width:10%'";
                    }

                    str.Append("<th " + ss + ">" + sColumnName + "</th>");
                    }
                    str.Append("</tr></thead><tbody>");

                    ss = "";
                    for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                    {
                        str.Append("<tr>");
                        //str.Append("<td style='text-align:center'>"+(i+1)+"</td>");
                        for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                        {
                            string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                            if (SkipColumn.Contains(sColumnName))
                            {
                                continue;
                            }
                            var sdata = Ds.Tables[0].Rows[i][j];
                            string sData = "";


                            sData = Ds.Tables[0].Rows[i][j].ToString();
                            ss = "";

                        if (sColumnName == "Value OrderSupplied" || sColumnName == "Productivity")
                        {
                            ss = "text-align:right;padding:2px 8px 2px 2px";
                        }
                        else if (sColumnName == "Tele Caller")
                        {
							
                            ss = "text-align:left;padding:2px;";
                        }
                        else if (sColumnName == "TAS Site" || sColumnName == "Branch/SubD Name")
                        {
                            ss = "text-align:left;padding:2px";
                        }
                        else
                        {
                            ss = "text-align:right;padding:2px 12px 2px 2px;";
                        }
                        //ss += "'";
                        if (Ds.Tables[0].Rows[i]["Tele Caller"].ToString() == "Total")
                        {
                            ss += ";background-color:#e4e4e4;font-weight:bold;font-size:8.5pt;";
 if (sColumnName == "TAS Site" || sColumnName == "Branch/SubD Name")
                            {
                                sData="";
                            }
                        }
                        if (Ds.Tables[0].Rows[i]["Tele Caller"].ToString() == "Grand Total")
                        {
                            ss += ";background-color:#b4b4b4;font-weight:bold;font-size:9pt;padding-top:8px;padding-bottom:8px;";
                            if (sColumnName == "TAS Site" || sColumnName == "Branch/SubD Name")
                            {
                                sData = "";
                            }
                        }
                        str.Append("<td style='" + ss + "'>" + sData + "</td>");
                        }
                        str.Append("</tr>");
                    }
                    str.Append("</tbody></table>");
                }
                else
                {
                    str.Append("<br/>No Record Found");
                }
           
            stresponse = str.ToString();
        }
        catch (Exception ex)
        {
            stresponse = ex.Message;
        }
        finally
        {
            con.Dispose();
        }

        return stresponse;
    }


}