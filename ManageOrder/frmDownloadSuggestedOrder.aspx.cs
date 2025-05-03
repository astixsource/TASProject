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

public partial class frmDownloadSuggestedOrder : System.Web.UI.Page
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
                hdnMenuId.Value = "49";
                string flg = Request.QueryString["flg"] == null ? "1" : Request.QueryString["flg"].ToString();
                hdnflg.Value = flg;
                //if (flg == "2")
                //{
                //    lblType.InnerHtml = "SUBD List :";
                //}
                //else
                //{
                //    lblType.InnerHtml = "Branch List :";
                //}
                //fnBindSiteList();
                //fnBindDBRList(flg);
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
        if (dt.Rows.Count > 1)
        {
            itm.Text = "--------";
            itm.Value = "0-0";
           // ddlSite.Items.Add(itm);
        }
        foreach (DataRow dr in dt.Rows)
        {
            itm = new ListItem();
            itm.Text = dr["SiteName"].ToString();
            itm.Value = dr["sitenodeid"].ToString() + "-" + dr["SiteNodeType"].ToString();
           // ddlSite.Items.Add(itm);
        }
    }

    private void fnBindDBRList(string flg)
    {

        SqlConnection Scon = new SqlConnection(ConfigurationManager.ConnectionStrings["strConn"].ConnectionString);
        SqlCommand Scmd = new SqlCommand();
        Scmd.Connection = Scon;
        Scmd.CommandText = flg == "1" ? "spGetBranchList" : "spGetSUBDList";
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
            itm.Value = dr["BrnNodeId"].ToString() + "-" + dr["BrnNodeType"].ToString() + "-" + dr["IsMappedLeapSwing"].ToString();
            //ddlBranch.Items.Add(itm);
        }
    }



    //Get Scheme And Product Detail Bases on Store
    [System.Web.Services.WebMethod()]
    public static string fnBranchOrderStatusList(int LoginId, int BranchNodeId, int BranchNodeType)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        try
        {
            string storedProcName = "spGetBranchOrderStatus";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@LoginId", LoginId),
                   new SqlParameter("@BranchNodeId", BranchNodeId),
                   new SqlParameter("@BranchNodeType", BranchNodeType)

                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            StringBuilder str = new StringBuilder();
            if (Ds.Tables[0].Rows.Count > 0)
            {
                string[] SkipColumn = new string[3];
                SkipColumn[0] = "DSENodeId";
                SkipColumn[1] = "DSENodeType";
                SkipColumn[2] = "flgAbsent";
                int tottc = int.Parse(Ds.Tables[0].Rows[0]["Total"].ToString());
                if (tottc > 0)
                {
                    //StartDate = DateTime.Parse(Ds.Tables[0].Rows[0]["StartDate"].ToString()).ToString("dd MMM");
                    str.Append("<table id='tbldbrlist' style='width:100%' tottc='" + tottc + "'><thead><tr>");

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
                            ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                        }
                        else
                        {
                            ss = "style='background-color:#008040;color:#ffffff;vertical-align:middle;text-align:center;font-size:7.5pt'";
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

                            if (sColumnName == "Total" || sColumnName == "Downloaded")
                            {
                                ss = "style='text-align:center'";
                            }
                            else if (sColumnName == "DisplayText")
                            {
                                ss = "style='text-align:left'";
                            }
                            else
                            {
                                ss = "style='text-align:center;font-size:7.5pt'";
                            }
                            //ss += "'";
                            str.Append("<td " + ss + ">" + sData + "</td>");
                        }
                        str.Append("</tr>");
                    }
                    str.Append("</tbody></table>");
                }
                else
                {
                    str.Append("");
                }
            }
            else
            {
                str.Append("");
            }
            stresponse = str.ToString();
        }
        catch (Exception ex)
        {
            stresponse = "2|" + ex.Message;
        }
        finally
        {
            con.Dispose();
        }

        return stresponse;
    }

    [System.Web.Services.WebMethod()]
    public static string GetDownloadOrderList(string LoginId, int BranchNodeId, int BranchNodeType)
    {
        SqlConnection Scon = new SqlConnection(ConfigurationManager.ConnectionStrings["strConn"].ConnectionString);
        SqlCommand Scmd = new SqlCommand();
        Scmd.Connection = Scon;
        Scmd.CommandText = "spDownloadHistoryOrderData";
        Scmd.CommandType = CommandType.StoredProcedure;
        Scmd.CommandTimeout = 0;
        Scmd.Parameters.AddWithValue("@LoginID", LoginId);
        Scmd.Parameters.AddWithValue("@BranchNodeId", BranchNodeId);
        Scmd.Parameters.AddWithValue("@BranchNodeType", BranchNodeType);
        SqlDataAdapter Sdap = new SqlDataAdapter(Scmd);
        DataSet Ds = new DataSet();
        Sdap.Fill(Ds);

        string[] SkipColumn = new string[2];
        SkipColumn[0] = "CycleId";
        SkipColumn[1] = "EndTime";


        string[] rowspanColumn = new string[0];

        StringBuilder str = new StringBuilder();
        if (Ds.Tables[0].Rows.Count > 0)
        {
            str.Append("<table cellpadding='4' cellspacing= '0' style='width:100%;font-size:11px; border-right:1px solid gray;' id='tblBasicDetailsInfo1' >");
            str.Append("<thead><tr>");

            str.Append("<th style='border-top:1px solid gray;border-bottom:1px solid gray;background-color: #23AED8;color: white;font-weight: bold;padding:2px;text-align:center'>Sr.No</th>");
            str.Append("<th style='border-top:1px solid gray;border-bottom:1px solid gray;background-color: #23AED8;color: white;font-weight: bold;padding:2px;text-align:left'>Branch / SUBD Code</th>");
            str.Append("<th style='border-top:1px solid gray;border-bottom:1px solid gray;background-color: #23AED8;color: white;font-weight: bold;padding:2px;text-align:left'>Order Date</th>");
            str.Append("<th style='border-top:1px solid gray;border-bottom:1px solid gray;background-color: #23AED8;color: white;font-weight: bold;padding:2px;text-align:left'>Downloaded Date</th>");
            str.Append("<th style='border-top:1px solid gray;border-bottom:1px solid gray;background-color: #23AED8;color: white;font-weight: bold;padding:2px;text-align:left'>Downloaded Type</th>");
            str.Append("<th style='border-top:1px solid gray;border-bottom:1px solid gray;background-color: #23AED8;color: white;font-weight: bold;padding:2px;text-align:left'>Branch/SUBD Type</th>");
            str.Append("</tr></thead><tbody>");
            int i = 0;
            foreach (DataRow Row in Ds.Tables[0].Rows)
            {
                str.Append("<tr>");
                str.Append("<td style='text-align:left;border-left:1px solid gray;border-bottom:1px solid gray;text-align:center' >" + (i + 1) + "</td>");
                str.Append("<td style='text-align:left;border-left:1px solid gray;border-bottom:1px solid gray;padding-left:3px' >" + Row["BranchCode"].ToString() + "</td>");
                str.Append("<td style='text-align:left;border-left:1px solid gray;border-bottom:1px solid gray;padding-left:3px' >" + Convert.ToDateTime(Row["OrderDate"]).ToString("dd MMM yyyy") + "</td>");
                str.Append("<td style='text-align:left;border-left:1px solid gray;border-bottom:1px solid gray;padding-left:3px' >" + Convert.ToDateTime(Row["StartTime"]).ToString("dd MMM yyyy hh:mm tt") + "</td>");
                str.Append("<td style='text-align:left;border-left:1px solid gray;border-bottom:1px solid gray;padding-left:3px' ><a href='###' title='Click To Download' onclick=\"fnDownload('" + Row["BranchCode"].ToString() + "','" + Row["CycleId"].ToString() + "','" + Row["StartTime"].ToString() + "','" + Row["flgStatus"].ToString() + "','" + Row["IsMappingType"].ToString() + "')\" style='color:blue;text-decoration:underline;font-size:11px;'>" + (Row["flgStatus"].ToString() == "1" ? "Incremental" : "Final Download") + "</a></td>");
                string strType = "";
                if (Row["IsMappingType"].ToString() == "1")
                {
                    strType = "Swing";
                }
                else if (Row["IsMappingType"].ToString() == "2")
                {
                    strType = "Leap";
                }
                else
                {
                    strType = "SUBD";
                }
                str.Append("<td style='text-align:left;border-left:1px solid gray;border-bottom:1px solid gray;padding-left:3px' >" + strType + "</td>");
                i++;
                str.Append("</tr>");
            }
            str.Append("</tbody></table>");
        }

        return str.ToString();
    }

}