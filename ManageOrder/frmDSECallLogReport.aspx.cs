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

public partial class frmDSECallLogReport : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["LoginID"] == null)
        {
           
           Response.Redirect("~/SessionExpiredpage.aspx");
        }
        else {
            if (!IsPostBack)
            {
                //hdnBranchCode.Value = Session["username"].ToString();
                hdnLoginId.Value = Session["LoginID"].ToString();
                hdnMenuId.Value = Request.QueryString["id"] == null ? "2" : Request.QueryString["id"].ToString();
                //hdnRoleId.Value = Session["RoleId"].ToString();
                fnBindSiteList();
                //fnBindReasonList();
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
        int cnt = 0;
        foreach (DataRow dr in dt.Rows)
        {
            itm = new ListItem();
            itm.Text = dr["SiteName"].ToString();
            itm.Value = dr["sitenodeid"].ToString() + "-" + dr["SiteNodeType"].ToString();
            itm.Selected = cnt == 0 ? true : false;// dt.Rows.Count == 1;
            ddlSite.Items.Add(itm);
            cnt++;
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
            //ddlReason.Items.Add(itm);
        }
    }

    [System.Web.Services.WebMethod()]
    public static string fnDailyOrderStatusReport(int LoginId, string sDate,string SiteNodeIds,int flgIncludeAllDSE)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        string stresponseMeasure = "";
        try
        {
            string storedProcName = "spRptDSECallLogsDashboard";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@Date", sDate),
                   new SqlParameter("@LoginId", LoginId),
                   new SqlParameter("@SiteNodeIds", SiteNodeIds),
                   new SqlParameter("@flgIncludeAllDSE", flgIncludeAllDSE)
                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            HttpContext.Current.Session["DsRptDSECallLogsDashboard"] = Ds;
            StringBuilder str = new StringBuilder();
            if (Ds.Tables[0].Rows.Count > 0)
            {
                //string statusTimeText = "";
                //if (Convert.ToDateTime(sDate).Date < DateTime.Now.Date)
                //{
                //    statusTimeText = "Status as on " + Convert.ToDateTime(sDate).ToString("dd-MMM-yyyy");
                //}
                //else
                //{
                //    statusTimeText = "Status as at " + string.Format("{0:hh:mm tt}", DateTime.Now);
                //}
                //stresponseMeasure = clsCreateHTML.createtbl_Measures(Ds.Tables[0], new string[] { "ID" }, statusTimeText);
                string[] SkipColumn = new string[16];
                SkipColumn[0] = "DSENodeId";
                SkipColumn[1] = "DSENodeType";
                SkipColumn[2] = "BranchCode";
                SkipColumn[3] = "VersionNo";
                SkipColumn[4] = "LastSyncTime";
                SkipColumn[5] = "flgAppWork";
                SkipColumn[6] = "flgVersionChk";
                SkipColumn[7] = "ColorCode";
                SkipColumn[8] = "DSECode";
                SkipColumn[9] = "ContactNo";
                SkipColumn[10] = "DSEMTASStatusId";
                SkipColumn[11] = "FromDate";
                SkipColumn[12] = "ToDate";
                SkipColumn[13] = "BranchSubdNodeId";
                SkipColumn[14] = "BranchSubdNodeType";
                SkipColumn[15] = "flgBranchInActive";
                //StartDate = DateTime.Parse(Ds.Tables[0].Rows[0]["StartDate"].ToString()).ToString("dd MMM");
                str.Append("<table id='tbldbrlist' class='table table-bordered' style='width:100%;font-size:8.5pt' cellspacing='0'   cellpadding='0' ><thead><tr>");

                string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;font-size:8.5pt'";
                //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:4%' >SrNo</th>");
                for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                {
                    string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                    if (SkipColumn.Contains(sColumnName))
                    {
                        continue;
                    }
                    string sColumn = sColumnName;
                    
                    if (sColumn == "DSEName")
                    {
                        ss = "style='background-color:#4472c4;color:#ffffff;vertical-align:middle;text-align:center;padding:2px 2px 2px 2px;width:15%;font-size:8.5pt'";
                    }
                    else if(sColumn== "Average call durations")
                    {
                        ss = "style='background-color:#4472c4;color:#ffffff;vertical-align:middle;text-align:center;padding:2px 2px 2px 2px;width:6.5%;font-size:8.5pt'";
                    }
                    else
                    {
                        sColumn = sColumnName.Split('^')[0];
                        string bgcolColor = "background-color:#4472c4;";
                        ss = "style='"+ bgcolColor + ";color:#ffffff;vertical-align:middle;text-align:center;padding:2px 2px 2px 2px;font-size:8.5pt;'";
                    }
                    sColumn = sColumn == "# Of TAS" ? "#TAS" : sColumn;
                    str.Append("<th " + ss + ">" + sColumn + "</th>");
                }
                str.Append("<th style='width:30px;background-color:#4472c4;color:#ffffff;vertical-align:middle;text-align:center;padding:2px 2px 2px 2px;font-size:8.5pt;'></th>");
                str.Append("</tr></thead><tbody>");
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {
                    int Lvl = 2;// Convert.ToInt32(dr["Lvl"]);
                    string ss1 = "padding:2px;";
                    string TrowStyle = "";
                    string bgvolor = "";
                    if (Lvl == 2)
                    {
                        ss1 = "padding:2px 2px 2px 2px";
                        bgvolor = ";background-color:#dbdbdb;font-size:8.5pt;";
                        TrowStyle = "";
                    }
                    if (Lvl == 1)
                    {
                        ss1 = "padding:2px 2px 2px 2px;";
                        bgvolor = ";background-color:#c9c9c9;color:#000;font-size:8.5pt;";
                    }

                  
                    str.Append("<tr style='"+ TrowStyle + "' lvl='"+ (Lvl==1?0:1) + "' DSEMTASStatusId='" + Ds.Tables[0].Rows[i]["DSEMTASStatusId"] + "' FromDate='" + Ds.Tables[0].Rows[i]["FromDate"] + "' ToDate='" + Ds.Tables[0].Rows[i]["ToDate"] + "' nodeid='" + Ds.Tables[0].Rows[i]["DSENodeId"] + "'  dsecontactno='" + Ds.Tables[0].Rows[i]["ContactNo"] + "'  VersionNo='" + Ds.Tables[0].Rows[i]["VersionNo"] + "' LastSyncTime='" + Ds.Tables[0].Rows[i]["LastSyncTime"] + "' flgAppWork='" + Ds.Tables[0].Rows[i]["flgAppWork"] + "' flgVersionChk='" + Ds.Tables[0].Rows[i]["flgVersionChk"] + "' nodetype='" + Ds.Tables[0].Rows[i]["DSENodeType"] + "'>");
                    int cntimg = 0;
                    for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                    {
                        string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                        if (SkipColumn.Contains(sColumnName))
                        {
                            continue;
                        }
                        var sdata = Ds.Tables[0].Rows[i][j];
                        //if (cntimg == 0)
                        //{
                        //    sdata= Lvl == 1? "&nbsp;"+dr[j].ToString() : "<img src='../NewImages/icoAdd.gif' onclick='fnColapse(this)'>" + dr[j].ToString();
                        //}
                        string sColumn = sColumnName;
                        if (sdata.GetType()==typeof(string))
                        {
                            ss = "vertical-align:middle;text-align:left;font-size:8.5pt;";
                        }
                        else
                        {
                            ss = "vertical-align:middle;text-align:center;font-size:8.5pt;";
                        }
                        if (sColumn.ToLower() == "branchname")
                        {
                            if (i > 0)
                            {
                                if ((Ds.Tables[0].Rows[i]["BranchCode"].ToString() == Ds.Tables[0].Rows[i - 1]["BranchCode"].ToString()) == false)
                                {
                                    str.Append("<td class='mergerow' rowspan=" + Ds.Tables[0].Select("BranchCode = '" + Ds.Tables[0].Rows[i]["BranchCode"].ToString() + "'").Length + " style='background-color:"+(Ds.Tables[0].Rows[i]["flgBranchInActive"].ToString()=="1"? "#2ab934" : "#f2f2f2") + "' ><a title='Click to show active/inative popup' href='###' style='color:blue;text-decoration:underline' BranchSubdNodeId='" + Ds.Tables[0].Rows[i]["BranchSubdNodeId"].ToString() + "' BranchSubdNodeType='" + Ds.Tables[0].Rows[i]["BranchSubdNodeType"].ToString() + "' flgBranchInActive='" + Ds.Tables[0].Rows[i]["flgBranchInActive"].ToString()+"'  onclick=\"fnBranchCallActive(this)\">" + sdata + "- " + Ds.Tables[0].Rows[i]["BranchCode"].ToString() + "</a></td>");
                                }
                            }
                            else
                            {
                                str.Append("<td class='mergerow' rowspan=" + Ds.Tables[0].Select("BranchCode = '" + Ds.Tables[0].Rows[i]["BranchCode"].ToString() + "'").Length + " style='background-color:" + (Ds.Tables[0].Rows[i]["flgBranchInActive"].ToString() == "1" ? "#2ab934" : "#f2f2f2") + "' ><a href='###' title='Click to show active/inative popup' style='color:blue;text-decoration:underline' BranchSubdNodeId='" + Ds.Tables[0].Rows[i]["BranchSubdNodeId"].ToString() + "' BranchSubdNodeType='" + Ds.Tables[0].Rows[i]["BranchSubdNodeType"].ToString() + "' flgBranchInActive='" + Ds.Tables[0].Rows[i]["flgBranchInActive"].ToString() + "'  onclick=\"fnBranchCallActive(this)\">" + sdata + "- " + Ds.Tables[0].Rows[i]["BranchCode"].ToString() + "</a></td>");
                            }
                        }
                        else if(sColumn.ToLower() == "dsename" || sColumn.ToLower() == "dsecode")
                        {
                            str.Append("<td style='" + ss + ss1 + ";height:18px;cursor:pointer;background-color:#"+ Ds.Tables[0].Rows[i]["ColorCode"].ToString() + ";color:blue;text-decoration:underline' onclick='fnRptDSECallDetails(this)'  title='Version No : " + Ds.Tables[0].Rows[i]["VersionNo"] + "\nLastSyncTime : " + Ds.Tables[0].Rows[i]["LastSyncTime"] + "\nApp Status : " + Ds.Tables[0].Rows[i]["flgAppWork"] + "\nVersion Status: " + Ds.Tables[0].Rows[i]["flgVersionChk"] + "\nDSE Contact No: " + Ds.Tables[0].Rows[i]["ContactNo"] + "'>" + sdata + "</td>");
                        }
                        else
                        {
                            str.Append("<td style='" + ss + ss1 + ";height:18px;'>" + sdata + "</td>");
                        }
                        ss1 = "padding:2px 2px 2px 2px;font-size:8.5pt;";
                        cntimg = 1;
                    }
                    if (Lvl != 1)
                    {
                        if (Convert.ToInt32(Ds.Tables[0].Rows[i]["Total Calls Made"]) > 0)
                        {
                            str.Append("<td style='" + ss + ss1 + ";height:18px;font-size:8.5pt;text-align:center'><a href='###' dsename='" + Ds.Tables[0].Rows[i]["DSEName"].ToString() + "(" + Ds.Tables[0].Rows[i]["DSECode"].ToString() + ")" + "' onclick='fnRptDSECallLogDetailDashboard(this)' title='Click to Show Details'><span class='glyphicon glyphicon-list'></span></td>");
                        }
                        else
                        {
                            str.Append("<td style='" + ss + ss1 + ";height:18px;font-size:8.5pt;'></td>");
                        }
                    }
                    else
                    {
                        str.Append("<td style='" + ss + ss1 + ";height:18px;width:40px;font-size:8.5pt;'>&nbsp;</td>");
                    }
                   
                    str.Append("</tr>");
                }
                str.Append("</tbody></table>");
            }
            else
            {
                str.Append("No Record Found");
            }
            StringBuilder strLegends = new StringBuilder();

            strLegends.Append("<tr>");
            strLegends.Append("<td style='padding:5px;border-right:1px solid'>Legends:</td>");
            for (int i = 0; i < Ds.Tables[1].Rows.Count; i++)
            {
                strLegends.Append("<td style='padding:5px;background-color:#" + Ds.Tables[1].Rows[i]["ColorCode"].ToString() + "'>" + Ds.Tables[1].Rows[i]["LgndText"].ToString() + "</td>");
            }
            strLegends.Append("</tr>");
            stresponse = "1^" + str.ToString()+"^"+ strLegends.ToString();
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



    [System.Web.Services.WebMethod()]
    public static string fnRptDSECallLogDetailDashboard(int DSENodeId, int DSENodeType,string sDate)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        string stresponseMeasure = "";
        try
        {
            string storedProcName = "spRptDSECallLogDetailDashboard";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@DSENodeId", DSENodeId),
                   new SqlParameter("@DSENodeType", DSENodeType),
                   new SqlParameter("@Date", sDate)
                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            HttpContext.Current.Session["dsRptDSECallLogDetailDashboard"] = Ds;
            StringBuilder str = new StringBuilder();
            if (Ds.Tables[0].Rows.Count > 0)
            {
                //string statusTimeText = "";
                //if (Convert.ToDateTime(sDate).Date < DateTime.Now.Date)
                //{
                //    statusTimeText = "Status as on " + Convert.ToDateTime(sDate).ToString("dd-MMM-yyyy");
                //}
                //else
                //{
                //    statusTimeText = "Status as at " + string.Format("{0:hh:mm tt}", DateTime.Now);
                //}
                //stresponseMeasure = clsCreateHTML.createtbl_Measures(Ds.Tables[0], new string[] { "ID" }, statusTimeText);
                string[] SkipColumn = new string[6];
                SkipColumn[0] = "DSENodeId";
                SkipColumn[1] = "DSENodeType";
                SkipColumn[2] = "BranchCode";
                SkipColumn[3] = "DSEMTASStatusId";
                SkipColumn[4] = "FromDate";
                SkipColumn[5] = "ToDate";


                //StartDate = DateTime.Parse(Ds.Tables[0].Rows[0]["StartDate"].ToString()).ToString("dd MMM");
                str.Append("<table id='tbldbrlistDetail' class='table table-bordered' style='width:100%' cellspacing='2' ><thead><tr>");

                string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:4%' >SrNo</th>");
                for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                {
                    string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                    if (SkipColumn.Contains(sColumnName))
                    {
                        continue;
                    }
                    string sColumn = sColumnName;

                    if (sColumn == "DSEName")
                    {
                        ss = "style='background-color:#4472c4;color:#ffffff;vertical-align:middle;text-align:center;padding:2px 2px 2px 2px;width:15%;border-left:1px solid #fff'";
                    }
                    else
                    {
                        sColumn = sColumnName.Split('^')[0];
                        string bgcolColor = "background-color:#4472c4;";
                        ss = "style='" + bgcolColor + ";color:#ffffff;vertical-align:middle;text-align:center;padding:2px 2px 2px 2px;border-left:1px solid #fff'";
                    }
                    sColumn = sColumn == "# Of TAS" ? "#TAS" : sColumn;
                    str.Append("<th " + ss + ">" + sColumn + "</th>");
                }
               // str.Append("<th style='width:30px;background-color:#4472c4;color:#ffffff;vertical-align:middle;text-align:center;padding:3px 2px 3px 2px;border-left:1px solid #fff'></th>");
                str.Append("</tr></thead><tbody>");
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {
                    int Lvl = 2;// Convert.ToInt32(dr["Lvl"]);
                    string ss1 = "padding:2px;";
                    string TrowStyle = "";
                    string bgvolor = "";
                    if (Lvl == 2)
                    {
                        ss1 = "padding:2px 2px 2px 2px";
                        bgvolor = ";background-color:#dbdbdb;border:1px solid #ffffff;font-size:9pt;";
                        TrowStyle = "";
                    }
                    if (Lvl == 1)
                    {
                        ss1 = "padding:2px 2px 2px 2px;";
                        bgvolor = ";background-color:#c9c9c9;border:1px solid #ffffff;color:#000;font-size:10.5pt;";
                    }


                    str.Append("<tr style='" + TrowStyle + "'>");
                    int cntimg = 0;
                    for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                    {
                        string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                        if (SkipColumn.Contains(sColumnName))
                        {
                            continue;
                        }
                        var sdata = Ds.Tables[0].Rows[i][j];
                        //if (cntimg == 0)
                        //{
                        //    sdata= Lvl == 1? "&nbsp;"+dr[j].ToString() : "<img src='../NewImages/icoAdd.gif' onclick='fnColapse(this)'>" + dr[j].ToString();
                        //}
                        string sColumn = sColumnName;
                        if (sdata.GetType() == typeof(string))
                        {
                            ss = "vertical-align:middle;text-align:left;";
                        }
                        else
                        {
                            ss = "vertical-align:middle;text-align:center;";
                        }
                        if (sColumn.ToLower() == "branchname")
                        {
                            if (i > 0)
                            {
                                if ((Ds.Tables[0].Rows[i]["BranchCode"].ToString() == Ds.Tables[0].Rows[i - 1]["BranchCode"].ToString()) == false)
                                {
                                    str.Append("<td class='mergerow' rowspan=" + Ds.Tables[0].Select("BranchCode = '" + Ds.Tables[0].Rows[i]["BranchCode"].ToString() + "'").Length + " >" + sdata + "-" + Ds.Tables[0].Rows[i]["BranchCode"].ToString() + "</td>");
                                }
                            }
                            else
                            {
                                str.Append("<td  class='mergerow' rowspan=" + Ds.Tables[0].Select("BranchCode = '" + Ds.Tables[0].Rows[i]["BranchCode"].ToString() + "'").Length + " >" + sdata + "-" + Ds.Tables[0].Rows[i]["BranchCode"].ToString() + "</td>");
                            }
                        }
                        else
                        {
                            str.Append("<td style='" + ss + ss1 + ";height:18px;'>" + sdata + "</td>");
                        }
                        ss1 = "padding:2px 2px 2px 2px";
                        cntimg = 1;
                    }
                    //if (Lvl != 1)
                    //{
                    //    str.Append("<td style='" + ss + ss1 + ";height:18px;width:30px'><a href='###' onclick='fnDownloadSiteDetails(this)' title='Click to download report'><span class='glyphicon glyphicon-download'></span></td>");
                    //}
                    //else
                    //{
                    //    str.Append("<td style='" + ss + ss1 + ";height:18px;width:40px'>&nbsp;</td>");
                    //}

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


    [System.Web.Services.WebMethod()]
    public static string fnDisableApp(int DSENodeId, int DSENodeType)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        string stresponseMeasure = "";
        try
        {
            string storedProcName = "spRptDSECallLogDetailDashboard";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@DSENodeId", DSENodeId),
                   new SqlParameter("@DSENodeType", DSENodeType)
                };
            string ss = clsDbCommand.ExecuteQueryProcedure(storedProcName, con, sp);
            
            stresponse = "1^";
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

    [System.Web.Services.WebMethod()]
    public static string fnUpdateCLDSELoggerCallUpdate(int DSENodeId, int DSENodeType,string ContactNo1,string ContactNo2, int flgUpdType,int LoginId,string StartDate,string EndDate)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        string stresponse = "";
        try
        {
            string storedProcName = "spUpdateCLDSELoggerCallUpdate";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@DSENodeId", DSENodeId),
                   new SqlParameter("@DSENodeType", DSENodeType),
                   new SqlParameter("@ContactNo1", ContactNo1),
                   new SqlParameter("@ContactNo2", ContactNo2),
                    new SqlParameter("@StartDate", StartDate),
                     new SqlParameter("@EndDate", EndDate),
                     new SqlParameter("@flgUpdType", flgUpdType),
                   new SqlParameter("@LoginId", LoginId)
                };
            con.Open();
            string ss = clsDbCommand.ExecuteQueryProcedure(storedProcName, con, sp);
            con.Close();
            stresponse = "1^";
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


    [System.Web.Services.WebMethod()]
    public static string fnUpdateBranchCLDSELoggerCallUpdate(int BranchSubdNodeId, int BranchSubdNodeType, int flgUpdType, int LoginId, string StartDate, string EndDate)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        string stresponse = "";
        try
        {
            string storedProcName = "spUpdateBranchCLDSELoggerCallUpdate";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@BranchSubdNodeId", BranchSubdNodeId),
                   new SqlParameter("@BranchSubdNodeType", BranchSubdNodeType),
                    new SqlParameter("@StartDate", StartDate),
                     new SqlParameter("@EndDate", EndDate),
                     new SqlParameter("@flgSwitchOn", flgUpdType),
                   new SqlParameter("@LoginId", LoginId)
                };
            con.Open();
            string ss = clsDbCommand.ExecuteQueryProcedure(storedProcName, con, sp);
            con.Close();
            stresponse = "1^";
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
}
