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

public partial class ManageOrder_frmBranchAttendance : System.Web.UI.Page
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
                hdnMenuId.Value = Request.QueryString["id"] == null ? "18" : Request.QueryString["id"].ToString();
                string flg = Request.QueryString["flg"] == null ? "1" : Request.QueryString["flg"].ToString();
                hdnflg.Value = flg;
                if (flg == "2")
                {
                    lblHeader.InnerHtml = ">> Daily SUBD Attendance Report";
                    lblType.InnerHtml = "SUBD List :";
                }
                else
                {
                    lblHeader.InnerHtml = ">> Daily Branch Attendance Report";
                    lblType.InnerHtml = "Branch List :";
                }
                fnBindSiteList();
                fnBindDBRList(flg);
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
            itm.Text = "ALL";
            itm.Value = "0-0";
            ddlSite.Items.Add(itm);
        }
        foreach (DataRow dr in dt.Rows)
        {
            itm = new ListItem();
            itm.Text = dr["SiteName"].ToString();
            itm.Value = dr["sitenodeid"].ToString() + "-" + dr["SiteNodeType"].ToString();
            ddlSite.Items.Add(itm);
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
            ddlBranch.Items.Add(itm);
        }
        foreach (DataRow dr in dt.Rows)
        {
            itm = new ListItem();
            itm.Text = dr["BranchName"].ToString();
            itm.Attributes.Add("sitenodeid", dr["sitenodeid"].ToString() + "-" + dr["SiteNodeType"].ToString());
            itm.Value = dr["BrnNodeId"].ToString() + "-" + dr["BrnNodeType"].ToString() + "-" + dr["IsMappedLeapSwing"].ToString();
            ddlBranch.Items.Add(itm);
        }
    }

    private static string multilvlPopuptbl(DataTable dt, int col_ind, int row_ind)
    {
        int cntr = 1;
        string str = dt.Columns[col_ind].ColumnName.ToString().Split('|')[0].Split('^')[row_ind];
        string flgcolor = "style='background-color:#26a6e7;color:#ffffff;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px'";
        if (row_ind == 1)
        {
            string str1 = dt.Columns[col_ind].ColumnName.ToString().Split('^')[0];
            string str2 = dt.Columns[col_ind].ColumnName.ToString().Split('^')[1];
            if (str1 == "Store Details")
            {

                if (str2 == "Store Name")
                {
                    flgcolor = "style='background-color:#ffffb7;color:black;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px;'";
                }
                else
                {
                    flgcolor = "style='background-color:#ffffb7;color:black;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px'";
                }
            }
            else if (str1 == "Tele Call")
            {

                if (str2 == "Reason")
                {
                    flgcolor = "style='color:#ffffff;background-color:#26a6e7;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px;width:6%'";
                }
            }
            else if (str1 == "TeleReason")
            {
                flgcolor = "style='background-color:#26a6e7;color:#ffffff;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px'";
            }
            else if (str1 == "Calling Status")
            {
                if (str2 == "Reason")
                {
                    flgcolor = "style='background-color:#00ca65;color:#ffffff;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px;width:15%'";
                }
                else
                {
                    flgcolor = "style='background-color:#00ca65;color:#ffffff;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px'";
                }

            }
        }

        if (str == "Store Details")
        {
            flgcolor = "style='background-color:#ffff88;color:black;text-align:center;border-bottom:1px solid #bbbbbb !important'";
        }
        else if (str == "TeleReason")
        {
            flgcolor = "style='background-color:#26a6e7;color:#ffffff;text-align:center'";
        }
        else if (str == "Calling Status")
        {
            flgcolor = "style='background-color:#00a452;color:#ffffff;text-align:center;border-bottom:1px solid #bbbbbb !important'";
        }


        //#728cd4
        for (int i = col_ind + 1; i < dt.Columns.Count; i++)
        {
            if (str == dt.Columns[i].ColumnName.ToString().Split('|')[0].Split('^')[row_ind])
            {
                cntr++;
            }
            else
            {
                break;
            }
        }


        return " <th " + flgcolor + " class='clspopuptblhead_" + row_ind + "_" + col_ind + " cls" + dt.Columns[col_ind].ColumnName.ToString().Split('^')[0].Split(' ')[0] + "' colspan='" + cntr + "'> " + str + " </th>|" + cntr;
    }


    //Get Scheme And Product Detail Bases on Store
    [System.Web.Services.WebMethod()]
    public static string fnBranchOrderStatusList(int LoginId, int BranchNodeId, int BranchNodeType, int SiteNodeid, int SiteNodeType, string RouteDate,string flgType)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        int nodeid = 0;
        int nodetype = 0;
        if (BranchNodeId == 0 && BranchNodeType == 0)
        {
            nodeid = SiteNodeid;
            nodetype = SiteNodeType;
        }
        else
        {
            nodeid = BranchNodeId;
            nodetype = BranchNodeType;
        }
       

        try
        {
            string storedProcName = flgType=="1"? "spRptSubmitBranchAttendanceList": "spRptSubmitSUBDAttendanceList";

            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@AttDate", RouteDate),
                   new SqlParameter("@NodeId", nodeid),
                   new SqlParameter("@NodeType", nodetype),
new SqlParameter("@LoginId", LoginId)
                   //new SqlParameter("@SiteNodeid", SiteNodeid),
                   //new SqlParameter("@SiteNodeType", SiteNodeType)

                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            StringBuilder str = new StringBuilder();
            if (Ds.Tables[0].Rows.Count > 0)
            {
                string[] SkipColumn = new string[6];
                SkipColumn[0] = "StoreId";
                SkipColumn[1] = "StoreChannelID";
                SkipColumn[2] = "TeleCallingId";
                SkipColumn[3] = "BranchNodeId";
                SkipColumn[4] = "BranchNodeType";
                SkipColumn[5] = "flgColorStatus";

                //StartDate = DateTime.Parse(Ds.Tables[0].Rows[0]["StartDate"].ToString()).ToString("dd MMM");
                str.Append("<table id='tbldbrlist' style='width:70%;border-top:1px solid #bbbbbb;font-size:8pt' ><thead><tr>");

                string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px'";
                int cntt = 0;

                string[] Collength = Ds.Tables[0].Columns[0].ColumnName.ToString().Split('^');
                StringBuilder strFooter = new StringBuilder();
                for (int k = 0; k < Collength.Length; k++)
                {
                    str.Append("<tr>");
                    if (cntt == 0)
                    {
                        str.Append("<th style=';padding:2px;background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:4%;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb' rowspan='2' >SrNo</th>");
                    }
                    cntt++;
                    for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                    {
                        if (!SkipColumn.Contains(Ds.Tables[0].Columns[j].ColumnName.ToString().Trim()))
                        {
                            string[] ColSpliter = Ds.Tables[0].Columns[j].ColumnName.ToString().Split('^');
                            if (ColSpliter[k] != "")
                            {
                                if (string.Join("", ColSpliter) == ColSpliter[k])
                                {
                                    if (Ds.Tables[0].Columns[j].ColumnName.ToString().Split('^')[0] == "Last Call Date")
                                    {
                                        ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px;width:8%'";
                                    }
                                    str.Append("<th " + ss + " rowspan='" + ColSpliter.Length + "' >" + Ds.Tables[0].Columns[j].ColumnName.ToString().Split('^')[0] + "</th>");


                                }
                                else
                                {
                                    string strrowspan = multilvlPopuptbl(Ds.Tables[0], j, k);
                                    str.Append(strrowspan.Split('|')[0]);
                                    j = j + Convert.ToInt32(strrowspan.Split('|')[1]) - 1;
                                }
                            }
                        }
                    }

                    //str.Append("<th rowspan='" + (Collength.Length + 1) + "' >Action</th>");

                    str.Append("</tr>");
                }

                str.Append("</thead><tbody>");

                ss = "style='border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px'";
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {
                    string strBackcolor = "";
                    //int flgOrderStatus = 0;
                    //flgOrderStatus = int.Parse(Ds.Tables[0].Rows[i]["flgColorStatus"].ToString());
                    //if (flgOrderStatus == 2)
                    //{
                    //    strBackcolor = ";background-color:#cbfecd;";
                    //}
                    //else if (flgOrderStatus == 1)
                    //{
                    //    strBackcolor = ";background-color:#ffd2d2;";
                    //}
                    //else if (flgOrderStatus > 2)
                    //{
                    //    strBackcolor = ";background-color:#d6d6d6;";
                    //}
                    str.Append("<tr>");
                    str.Append("<td style='text-align:center;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px" + strBackcolor + "'>" + (i + 1) + "</td>");

                    for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                    {
                        ss = "style='border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;border-right:1px solid #bbbbbb;padding:2px" + strBackcolor + "'";
                        string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                        if (SkipColumn.Contains(sColumnName))
                        {
                            continue;
                        }
                        var sdata = Ds.Tables[0].Rows[i][j];
                        if (sdata.GetType() == typeof(int))
                        {
                            ss = "style='text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px" + strBackcolor + "'";
                        }
                        else if (sdata.GetType() == typeof(decimal))
                        {
                            ss = "style='text-align:right;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px" + strBackcolor + "'";
                        }
                        if (sColumnName == "Calling Status^Call Attempt")
                        {
                            ss = "style='text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px" + strBackcolor + "'";
                        }
                        else if (sColumnName == "Language^")
                        {
                            ss = "style='padding:2px;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;" + strBackcolor + "'";
                        }


                        

                            sdata = Ds.Tables[0].Rows[i][j].ToString();
                       


                        string flgSearchable = "Searchable='0'";
                        if (sColumnName == "Store Details^Store Code" || sColumnName == "Store Details^Store Name")
                        {
                            flgSearchable = "Searchable='1'";
                        }
                        //ss += "'";
                        str.Append("<td " + ss + "   " + flgSearchable + ">" + sdata + "</td>");
                    }

                    str.Append("</tr>");
                }
                str.Append("</tbody></table>");
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
}