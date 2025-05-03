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

public partial class RptTaskExtractData : System.Web.UI.Page
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
                hdnMenuId.Value = Request.QueryString["id"] == null ? "57" : Request.QueryString["id"].ToString();
                string flg = "1";// Request.QueryString["flg"] == null ? "1" : Request.QueryString["flg"].ToString();
                fnBindSiteList();
                fnBindDBRList(flg);
            }
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
            itm.Value = dr["BrnNodeId"].ToString() + "-" + dr["BrnNodeType"].ToString();
            ddlBranch.Items.Add(itm);
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
            itm.Selected = dt.Rows.Count == 1;
            ddlSite.Items.Add(itm);
        }
    }

    private static string multilvlPopuptbl(DataTable dt, int col_ind, int row_ind,int totRowSpanLength)
    {
        int cntr = 1;
        string[] arrstr = dt.Columns[col_ind].ColumnName.ToString().Split('^');
        string str = dt.Columns[col_ind].ColumnName.ToString().Split('^')[row_ind];
        
        string flgcolor = "background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;padding:2px;";
        if (totRowSpanLength-1 <= (row_ind + 1))
        {
            flgcolor += "min-width:70px;width:70px";
        }
        //if (str == "Retailer")
        //{
        //    flgcolor += ";width:100px";
        //}
        //else if (str == "AR")
        //{
        //    flgcolor += ";width:100px";
        //}


        //#728cd4
        int isMultiple = 1;
        for (int i = col_ind + 1; i < dt.Columns.Count; i++)
        {
            string sname = dt.Columns[i].ColumnName.ToString().Split('^')[row_ind];
            if (str == sname)
            {
                cntr++;
            }
            else
            {
                isMultiple = 0;
                break;
            }
        }
        
        string sscolspan = "colspan='" + cntr + "'";
        int cntrowspan = 0;
        if (totRowSpanLength-1== (row_ind + 1))
        {
            if (arrstr[row_ind + 1].Trim() == "")
            {
                cntrowspan = row_ind + 1;
            }
        }

        cntrowspan = cntrowspan == 0 ? 1 : cntrowspan;
        return " <th style='" + flgcolor + "'   " + sscolspan + " rowspan='"+ cntrowspan + "' > " + str + " </th>|" + cntr;
    }

    [System.Web.Services.WebMethod()]
    public static string fnDailyOrderStatusReport(int LoginId, string sDate, string eDate, string NodeId, string NodeType, int flgExcel)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        try
        {
            string storedProcName = "spRptLeapFileUploadingStatus";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@FromDate", sDate),
                   new SqlParameter("@ToDate", eDate),
                   new SqlParameter("@NodeId", NodeId),
                   new SqlParameter("@NodeType", NodeType),
                   new SqlParameter("@LoginId", LoginId)
                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
           
            StringBuilder str = new StringBuilder();
            if (Ds.Tables[0].Rows.Count > 0)
            {
                string statusTimeText = "";
                string[] SkipColumn = new string[8];
                SkipColumn[0] = "sitenodeid";
                SkipColumn[1] = "sitenodetype";
                SkipColumn[2] = "brnnodetype";
                SkipColumn[3] = "brnnodeid";
                SkipColumn[4] = "remarks^^";
                SkipColumn[5] = "ismappedleapswing^^";
                SkipColumn[6] = "branch code^^";
                SkipColumn[7] = "site code^^";

                //StartDate = DateTime.Parse(Ds.Tables[0].Rows[0]["StartDate"].ToString()).ToString("dd MMM");
                str.Append("<table id='tbldbrlist' style='width:100%' cellspacing='2' ><thead><tr>");

                string ss = "background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center";
                //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:4%' >SrNo</th>");

                string[] Collength = Ds.Tables[0].Columns[4].ColumnName.ToString().Split('^');
                StringBuilder strFooter = new StringBuilder();
                for (int k = 0; k < Collength.Length; k++)
                {
                    str.Append("<tr>");
                    for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                    {
                        string sColumnName = Ds.Tables[0].Columns[j].ColumnName.ToString().ToLower();
                        if (!SkipColumn.Contains(sColumnName))
                        {
                            string[] ColSpliter = sColumnName.Split('^');
                            if (ColSpliter[k] != "")
                            {
                                if (string.Join("", ColSpliter) == ColSpliter[k])
                                {
                                    string sWidth = "";
                                    //if (sColumnName.Split('^')[0] == "site name")
                                    //{
                                    //    sWidth = "width:100px";
                                    //}
                                    //else if (sColumnName.Split('^')[0] == "branch name")
                                    //{
                                    //    sWidth = "width:100px";
                                    //}
                                    str.Append("<th style='" + ss + ";" + sWidth + "' rowspan='" + Collength.Length + "' >" + Ds.Tables[0].Columns[j].ColumnName.ToString().Split('^')[0]+ "</th>");
                                }
                                else
                                {
                                    string strrowspan = multilvlPopuptbl(Ds.Tables[0], j, k, Collength.Length);
                                    str.Append(strrowspan.Split('|')[0]);
                                    j = j + Convert.ToInt32(strrowspan.Split('|')[1]) - 1;
                                }
                            }
                        }
                    }
                    
                    str.Append("</tr>");
                }
                str.Append("</thead><tbody>");

                foreach (DataRow dr in Ds.Tables[0].Rows)
                {
                    str.Append("<tr>");
                    for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                    {
                        string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                        if (SkipColumn.Contains(sColumnName.ToLower()))
                        {
                            continue;
                        }
                        var sdata = dr[j].ToString();
                        string scolor = "";
                        if (sColumnName.Contains("PSR"))
                        {
                            if (sdata.ToString() == "Not Uploaded")
                            {
                                scolor = ";background-color:#ff2f2f;color:#ffffff;";
                            }
                            else
                            {
                                scolor = ";background-color:#005500;color:#ffffff;";
                            }
                        }
                        else if (sColumnName== "Site Name^^")
                        {
                            sdata = dr[j].ToString()+" ["+ dr["Site Code^^"].ToString() + "]";
                        }
                            str.Append("<td style='padding:1px 2px"+ scolor + "'>" + sdata + "</td>");
                    }
                    str.Append("</tr>");
                }
                str.Append("</tbody></table>");
            }
            else
            {
                str.Append("No Record Found");
            }
            stresponse = "1^" + str.ToString();
        }
        catch (Exception ex)
        {
            stresponse = "2^" + ex.Message;
        }
        finally
        {
            con.Dispose();
        }

        return stresponse;
    }



   

    protected void btnDownloadAll_Click(object sender, EventArgs e)
    {
        fnDownloadExcelHTML();
    }

    private void fnDownloadExcelHTML()
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        try
        {
            string storedProcName = "spRptLeapFileUploadingStatus";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@FromDate", hdnFromDate.Value),
                   new SqlParameter("@ToDate", hdnToDate.Value),
                   new SqlParameter("@NodeId", hdnNodeId.Value),
                   new SqlParameter("@NodeType", hdnNodeType.Value),
                   new SqlParameter("@LoginId",Convert.ToInt32(hdnLoginId.Value))
                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);

            StringBuilder str = new StringBuilder();
            if (Ds.Tables[0].Rows.Count > 0)
            {
                string[] SkipColumn = new string[8];
                SkipColumn[0] = "sitenodeid";
                SkipColumn[1] = "sitenodetype";
                SkipColumn[2] = "brnnodetype";
                SkipColumn[3] = "brnnodeid";
                SkipColumn[4] = "remarks^^";
                SkipColumn[5] = "ismappedleapswing^^";
                SkipColumn[6] = "branch code^^";
                SkipColumn[7] = "site code^^";

                //StartDate = DateTime.Parse(Ds.Tables[0].Rows[0]["StartDate"].ToString()).ToString("dd MMM");
                str.Append("<table id='tbldbrlist' rules='all' border='1'  style='width:100%' cellspacing='2' ><thead><tr>");

                string ss = "background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center";
                //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:4%' >SrNo</th>");

                string[] Collength = Ds.Tables[0].Columns[4].ColumnName.ToString().Split('^');
                StringBuilder strFooter = new StringBuilder();
                for (int k = 0; k < Collength.Length; k++)
                {
                    str.Append("<tr>");
                    for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                    {
                        string sColumnName = Ds.Tables[0].Columns[j].ColumnName.ToString().ToLower();
                        if (!SkipColumn.Contains(sColumnName))
                        {
                            string[] ColSpliter = sColumnName.Split('^');
                            if (ColSpliter[k] != "")
                            {
                                if (string.Join("", ColSpliter) == ColSpliter[k])
                                {
                                    string sWidth = "";
                                    //if (sColumnName.Split('^')[0] == "site name")
                                    //{
                                    //    sWidth = "width:100px";
                                    //}
                                    //else if (sColumnName.Split('^')[0] == "branch name")
                                    //{
                                    //    sWidth = "width:100px";
                                    //}
                                    str.Append("<th style='" + ss + ";" + sWidth + "' rowspan='" + Collength.Length + "' >" + Ds.Tables[0].Columns[j].ColumnName.ToString().Split('^')[0] + "</th>");
                                }
                                else
                                {
                                    string strrowspan = multilvlPopuptbl(Ds.Tables[0], j, k, Collength.Length);
                                    str.Append(strrowspan.Split('|')[0]);
                                    j = j + Convert.ToInt32(strrowspan.Split('|')[1]) - 1;
                                }
                            }
                        }
                    }

                    str.Append("</tr>");
                }
                str.Append("</thead><tbody>");

                foreach (DataRow dr in Ds.Tables[0].Rows)
                {
                    str.Append("<tr>");
                    for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                    {
                        string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                        if (SkipColumn.Contains(sColumnName.ToLower()))
                        {
                            continue;
                        }
                        var sdata = dr[j].ToString();
                        string scolor = "";
                        if (sColumnName.Contains("PSR"))
                        {
                            if (sdata.ToString() == "Not Uploaded")
                            {
                                scolor = ";background-color:#ff2f2f;color:#ffffff;";
                            }
                            else
                            {
                                scolor = ";background-color:#005500;color:#ffffff;";
                            }
                        }
                        else if (sColumnName == "Site Name^^")
                        {
                            sdata = dr[j].ToString() + " [" + dr["Site Code^^"].ToString() + "]";
                        }
                        str.Append("<td style='padding:1px 2px" + scolor + "'>" + sdata + "</td>");
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
        HttpContext.Current.Response.Clear();
        HttpContext.Current.Response.Buffer = true;
        HttpContext.Current.Response.AddHeader("content-disposition", "attachment;filename=RptLeapFileUploadingStatus.xls");
        HttpContext.Current.Response.Charset = "";
        HttpContext.Current.Response.ContentType = "application/vnd.ms-excel";
        HttpContext.Current.Response.Output.Write(Convert.ToString(stresponse));
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
    protected void btnRefershStatus_Click(object sender, EventArgs e)
    {
        fnDownloadExcelHTML();
    }
}