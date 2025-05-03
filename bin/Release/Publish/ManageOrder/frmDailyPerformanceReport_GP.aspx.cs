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

public partial class frmDailyPerformanceReport : System.Web.UI.Page
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
                hdnMenuId.Value = Request.QueryString["id"] == null ? "48" : Request.QueryString["id"].ToString();
                hdnRoleId.Value = Session["RoleId"].ToString();
                fnBindSiteList();
                fnBindReasonList();
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
            itm.Selected = dt.Rows.Count == 1;
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

    [System.Web.Services.WebMethod()]
    public static string fnDailyOrderStatusReport(int LoginId, string sDate, string eDate, string SiteNodeIds, string TeleReasonIds,int flgExcel,int ViewType,int SellerType)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        string stresponseMeasure = "";
        try
        {
            string storedProcName = "spRptPerfomanceOverView_GP";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@FromDate", sDate),
                   new SqlParameter("@ToDate", eDate),
                   new SqlParameter("@SiteNodeIds", SiteNodeIds),
                   new SqlParameter("@TeleReasonIds", TeleReasonIds),
                   new SqlParameter("@LoginId", LoginId),
                   new SqlParameter("@flgActiveProductivityNorms", 1),
                   new SqlParameter("@flgReportLevel", ViewType),
                   new SqlParameter("@flgDSETC", SellerType)
                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            HttpContext.Current.Session["DsRptPerfomanceOverView_GP"] = Ds;
            StringBuilder str = new StringBuilder();
            if (Ds.Tables[0].Rows.Count > 0)
            {
                string statusTimeText = "";
                if (Convert.ToDateTime(sDate).Date < DateTime.Now.Date)
                {
                    statusTimeText = "Status as on " + Convert.ToDateTime(sDate).ToString("dd-MMM-yyyy");
                }
                else
                {
                    statusTimeText = "Status as at " + string.Format("{0:hh:mm tt}", DateTime.Now);
                }
                stresponseMeasure = clsCreateHTML.createtbl_Measures(Ds.Tables[0], new string[] { "ID" }, statusTimeText);
                string[] SkipColumn = new string[5];
                SkipColumn[0] = "Lvl";
                SkipColumn[1] = "NodeId";
                SkipColumn[2] = "NodeType";
                SkipColumn[3] = "PNodeId";
                SkipColumn[4] = "PNodeType";

                //StartDate = DateTime.Parse(Ds.Tables[0].Rows[0]["StartDate"].ToString()).ToString("dd MMM");
                str.Append("<table id='tbldbrlist' class='table' style='width:100%' cellspacing='2' ><thead><tr>");

                string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:4%' >SrNo</th>");
                for (int j = 0; j < Ds.Tables[1].Columns.Count; j++)
                {
                    string sColumnName = Ds.Tables[1].Columns[j].ColumnName;
                    if (SkipColumn.Contains(sColumnName))
                    {
                        continue;
                    }
                    string sColumn = sColumnName;
                    
                    if (sColumn == "Total\\TAS Site\\Branch")
                    {
						sColumn = "Total\\TAS Site\\Branch-SUBD";
                        ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;padding:3px 2px 3px 2px;width:25%;border-left:1px solid #fff'";
                    }
                    else
                    {
                        sColumn = sColumnName.Split('^')[0];
                        string sColorFlag = sColumnName.Split('^')[1];
                        string bgcolColor = "background-color:#008040;";
                        if (sColorFlag == "2")
                        {
                            bgcolColor = "background-color:#b8af82;";
                        }else if (sColorFlag == "3")
                        {
                            bgcolColor = "background-color:#8787c2;";
                        }
                        ss = "style='"+ bgcolColor + ";color:#ffffff;vertical-align:middle;text-align:center;padding:3px 2px 3px 2px;border-left:1px solid #fff'";
                        if (sColumn == "# Of TAS")
                        {
                            ss = "style='"+ bgcolColor + ";color:#ffffff;vertical-align:middle;text-align:center;padding:3px 2px 3px 2px;width:4%;border-left:1px solid #fff;'";
                        }
                    }
                    sColumn = sColumn == "# Of TAS" ? "#TAS" : sColumn;
                    str.Append("<th " + ss + ">" + sColumn + "</th>");
                }
                str.Append("<th style='width:40px;background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;padding:3px 2px 3px 2px;border-left:1px solid #fff'></th>");
                str.Append("</tr></thead><tbody>");

                foreach (DataRow dr in Ds.Tables[1].Rows)
                {
                    int Lvl = Convert.ToInt32(dr["Lvl"]);
                    string ss1 = "padding:2px;";
                    string TrowStyle = "";
                    string bgvolor = "";
                    if (Lvl == 2)
                    {
                        ss1 = "padding:2px 2px 2px 10px";
                        bgvolor = ";background-color:#dbdbdb;border:1px solid #ffffff;font-size:9pt;";
                        TrowStyle = "";
                    }
                    if (Lvl == 1)
                    {
                        ss1 = "padding:2px 2px 2px 2px;";
                        bgvolor = ";background-color:#c9c9c9;border:1px solid #ffffff;color:#000;font-size:10.5pt;";
                    }

                    int NodeId = Convert.ToInt32(dr["NodeId"]);
                    int NodeType = Convert.ToInt32(dr["NodeType"]);
                    str.Append("<tr style='"+ TrowStyle + "' lvl='"+ (Lvl==1?0:1) + "' nodeid='" + dr["NodeId"] + "' nodetype='" + dr["NodeType"] + "' pnodeid='" + dr["PNodeId"] + "' pnodetype='" + dr["PNodeType"] + "'>");
                    int cntimg = 0;
                    for (int j = 0; j < Ds.Tables[1].Columns.Count; j++)
                    {
                        string sColumnName = Ds.Tables[1].Columns[j].ColumnName;
                        if (SkipColumn.Contains(sColumnName))
                        {
                            continue;
                        }
                        var sdata = dr[j].ToString();
                        if (cntimg == 0)
                        {
                            sdata= Lvl == 1? "&nbsp;"+dr[j].ToString() : "<img src='../NewImages/icoAdd.gif' onclick='fnColapse(this)'>" + dr[j].ToString();
                        }
                        string sColumn = sColumnName;
                        if (sColumnName == "Total\\TAS Site\\Branch")
                        {
                            ss = "vertical-align:middle;text-align:left;"+ bgvolor;
                        }
                        else
                        {
                            ss = "vertical-align:middle;text-align:right;"+ bgvolor;
                        }
                       
                        str.Append("<td style='"+ ss + ss1 + ";height:18px;'>" + sdata + "</td>");
                        ss1 = "padding:2px 2px 2px 2px";
                        cntimg = 1;
                    }
                    if (Lvl != 1)
                    {
                        str.Append("<td style='" + ss + ss1 + ";height:18px;width:40px'><a href='###' onclick='fnDownloadSiteDetails(this)' title='Click to download report'><span class='glyphicon glyphicon-download'></span></td>");
                    }
                    else
                    {
                        str.Append("<td style='" + ss + ss1 + ";height:18px;width:40px'>&nbsp;</td>");
                    }
                   
                    str.Append("</tr>");
                    DataRow[] drow = Ds.Tables[2].Select("PNodeId=" + NodeId + " and PNodeType=" + NodeType);
                    if (drow.Count() > 0)
                    {
                        str.Append(clsCreateHTML.createSubTbl(drow.CopyToDataTable(), SkipColumn, "",flgExcel));
                    }
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

        return stresponse + "|~|" + stresponseMeasure;
    }
   

}
