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

public partial class frmDailyDashBoard : System.Web.UI.Page
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
                hdnMenuId.Value = Request.QueryString["id"] == null ? "2" : Request.QueryString["id"].ToString();
                fnBindSiteList();
                fnBindDBRList();
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
           ddlBranch.Items.Add(itm);
        }
        foreach (DataRow dr in dt.Rows)
        {
            itm = new ListItem();
            itm.Text = dr["BranchName"].ToString();
            itm.Attributes.Add("sitenodeid", dr["sitenodeid"].ToString() + "-" + dr["SiteNodeType"].ToString());
            itm.Value = dr["BrnNodeId"].ToString() + "-" + dr["BrnNodeType"].ToString();
            ddlBranch.Items.Add(itm);
        }
    }

    [System.Web.Services.WebMethod()]
    public static string fnDailyOrderStatusReport(int LoginId, string DownloadDate,int NodeId,int NodeType)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        try
        {
            string storedProcName = "spRptDSEUploadingStatus";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@RptDate", DownloadDate),
                   new SqlParameter("@LoginId", LoginId),
                   new SqlParameter("@NodeId", NodeId),
                   new SqlParameter("@NodeType", NodeType)
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
                            ss = "style='background-color:#008040;color:#ffffff;vertical-align:middle;text-align:left;padding:3px 2px 3px 2px'";
                        str.Append("<th " + ss + ">" + sColumnName + "</th>");
                    }
                str.Append("<th " + ss + ">Report</th>");
                str.Append("</tr></thead><tbody>");

                    ss = "";
                string OldSiteCode = "";
                string OldBranchCode = "";
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                    {
                    string strborder = "";
                    if (OldSiteCode!="" && OldSiteCode != Ds.Tables[0].Rows[i]["SiteCode"].ToString() && OldBranchCode != Ds.Tables[0].Rows[i]["BranchCode"].ToString())
                    {
                        strborder = ";border-top:2px solid";
                    }
                        str.Append("<tr dsenodeid='" + Ds.Tables[0].Rows[i]["DSENodeId"].ToString() + "' dsenodetype='" + Ds.Tables[0].Rows[i]["DSENodeType"].ToString() + "'>");
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
                                ss = "text-align:left;padding:2px";
                            
                        //ss += "'";
                        
                            str.Append("<td style='" + ss + strborder + "'>" + sData + "</td>");
                        }
                    str.Append("<td style='" + ss + strborder + "'><a href='#' onclick='fnClick(this)' style='color:blue' >Report</a></td>");

                    str.Append("</tr>");
                    OldSiteCode = Ds.Tables[0].Rows[i]["SiteCode"].ToString();
                    OldBranchCode = Ds.Tables[0].Rows[i]["BranchCode"].ToString();
                    }
                    str.Append("</tbody></table>");
                }
                else
                {
                    str.Append("No Record Found");
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


    [System.Web.Services.WebMethod()]
    public static string fndetail(string dsenodeid, string dsenodetype, string date)
    {

        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        try
        {
            string storedProcName = "spRptBranchDSEO2Syncing";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@DSENodeId", dsenodeid),
                   new SqlParameter("@DSENodeType", dsenodetype),
                   new SqlParameter("@DataDate", date)
                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            StringBuilder str = new StringBuilder();
            if (Ds.Tables[0].Rows.Count > 0)
            {
                string[] SkipColumn = new string[0];
                //SkipColumn[0] = "DSENodeId";
                //SkipColumn[1] = "DSENodeType";
                //SkipColumn[2] = "flgAbsent";

                //StartDate = DateTime.Parse(Ds.Tables[0].Rows[0]["StartDate"].ToString()).ToString("dd MMM");
                str.Append("<table id='tbldbrlistdet' class='table' style='width:100%' ><thead><tr>");

                string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:4%' >SrNo</th>");
                for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                {
                    if (SkipColumn.Contains(Ds.Tables[0].Columns[j].ColumnName))
                    {
                        continue;
                    }
                    string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                    ss = "style='background-color:#0080C0;color:#ffffff;vertical-align:middle;text-align:left;padding:3px 2px 3px 2px'";
                    str.Append("<th " + ss + ">" + sColumnName + "</th>");
                }
              
                str.Append("</tr></thead><tbody>");

                ss = "";
              
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {
                    string strborder = "";
                   
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
                        ss = "text-align:left;padding:2px";

                        //ss += "'";

                        if (sData.IndexOf("^") != -1)
                        {
                            ss = "text-align:left;padding:2px;color:#ffffff;background-color:#00b300;";
                            str.Append("<td style='" + ss + strborder + "'>" + sData.Split('^')[0] + "</td>");
                        }
                        else
                        {
                            str.Append("<td style='" + ss + strborder + "'>" + sData + "</td>");
                        }

                        
                    }
                   

                    str.Append("</tr>");
                   
                }
                str.Append("</tbody></table>");
            }
            else
            {
                str.Append("No Record Found");
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