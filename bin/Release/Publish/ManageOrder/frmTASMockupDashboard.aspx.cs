using DocumentFormat.OpenXml.Presentation;
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

public partial class frmTASMockupDashboard : System.Web.UI.Page
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
                hdnRoleId.Value = Session["RoleId"].ToString() + "|" + Session["UserID"].ToString();
                //fnBindSiteList();
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
           // ddlSite.Items.Add(itm);
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
           // ddlReason.Items.Add(itm);
        }
    }

    private static string multilvlPopuptbl(DataTable dt, int col_ind, int row_ind,string strToolTipText)
    {
        int cntr = 1;
        string str = dt.Columns[col_ind].ColumnName.ToString().Split('|')[0].Split('^')[row_ind];
        string flgcolor = row_ind==0? "style='width:10%;background-color:#eea459;color:#000000;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px'" : "style='width:10%;background-color:#f9cda2;color:#000000;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px'";
        if (row_ind == 1)
        {
            string str1 = dt.Columns[col_ind].ColumnName.ToString().Split('^')[0];
            string str2 = dt.Columns[col_ind].ColumnName.ToString().Split('^')[1];
            if (str1 == "Store Details")
            {
                if (str2 == "Store Name")
                {
                    flgcolor = "style='background-color:#ffffb7;color:black;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px;width:18%'";
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
                if (str2 == "Status")
                {
                    flgcolor = "style='background-color:#00ca65;color:#ffffff;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px;width:6%'";
                }
                else
                {
                    flgcolor = "style='background-color:#00ca65;color:#ffffff;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px'";
                }

            }
        }

        //if (str == "Store Details")
        //{
        //    flgcolor = "style='background-color:#ffff88;color:black;text-align:center;border-bottom:1px solid #bbbbbb !important'";
        //}
        //else if (str == "TeleReason")
        //{
        //    flgcolor = "style='background-color:#26a6e7;color:#ffffff;text-align:center'";
        //}
        //else if (str == "Calling Status")
        //{
        //    flgcolor = "style='background-color:#00a452;color:#ffffff;text-align:center;border-bottom:1px solid #bbbbbb !important'";
        //}


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
        string sscolspan = "colspan='" + cntr + "'";
        if (str == "Store Details")
        {
            sscolspan = "colspan='" + (cntr - 1) + "'";
        }




        return " <th " + flgcolor + " class='clspopuptblhead_" + row_ind + "_" + col_ind + " cls" + dt.Columns[col_ind].ColumnName.ToString().Split('^')[0].Split(' ')[0] + "' " + sscolspan + "> " + str + (strToolTipText != "" ? "<i style='margin-left:10px' class='glyphicon glyphicon-info-sign' title='" + strToolTipText + "'></i>" : "") + " </th>|" + cntr;
    }

    private static string fnGettooltipText(DataTable dt, string columnname)
    {
        string strData = "";

        strData = dt.Columns.Contains(columnname) == true ? dt.Rows[0][columnname].ToString() : "";

        return strData;
    }

        [System.Web.Services.WebMethod()]
    public static string fnDailyOrderStatusReport(int LoginId, string sDate, string eDate, string RoleID, string UserID)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        string stresponseMeasure = "";
        try
        {
            string storedProcName = "spRptTASAbsenteeismDashboard";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                    new SqlParameter("@FromDate", sDate),
                   new SqlParameter("@ToDate", eDate),
                   new SqlParameter("@UserID", UserID),
                   new SqlParameter("@RoleID", RoleID),
                   new SqlParameter("@LoginId", LoginId)
                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            HttpContext.Current.Session["DsRptSellerOrderEntryProcess"] = Ds;
            string strLastRefreshTime = "";
            StringBuilder str = new StringBuilder();
            if (Ds.Tables[0].Rows.Count > 0)
            {
                
                if (Ds.Tables[3].Rows.Count > 0)
                {
                    strLastRefreshTime =Convert.ToInt32(Ds.Tables[3].Rows[0][0])>0? ("<b>Last Refreshed Time : </b>" + Ds.Tables[3].Rows[0]["LastrefreshedOn"].ToString()):"";
                }
                
                stresponseMeasure = "";// clsCreateHTML.createtbl_Measures(Ds.Tables[0], new string[] { "ID" }, statusTimeText);
                string[] SkipColumn = new string[5];
                SkipColumn[0] = "lvl";
                SkipColumn[1] = "NodeID";
                SkipColumn[2] = "NodeType";
                SkipColumn[3] = "PNodeID";
                SkipColumn[4] = "PnodeType";

                //StartDate = DateTime.Parse(Ds.Tables[0].Rows[0]["StartDate"].ToString()).ToString("dd MMM");
                str.Append("<table id='tbldbrlist' class='table' style='width:100%;border:1px solid #ddd' cellspacing='2' ><thead><tr>");

                //          string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                //          //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:4%' >SrNo</th>");
                //          for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                //          {
                //              string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                //              if (SkipColumn.Contains(sColumnName))
                //              {
                //                  continue;
                //              }
                //              string sColumn = sColumnName;

                //              if (sColumn == "Division/Site/Branch/DSE")
                //              {
                //sColumn = "Division/Site/Branch/DSE";
                //                  ss = "style='background-color:#008040;color:#ffffff;vertical-align:middle;text-align:left;padding:3px 2px 3px 2px;border-left:1px solid #fff'";
                //              }
                //              else
                //              {
                //                  sColumn = sColumnName.Split('^')[0];
                //                  string sColorFlag = "";// sColumnName.Split('^')[1];
                //                  string bgcolColor = "background-color:#f8ca9b;";
                //                  if (sColorFlag == "2")
                //                  {
                //                      bgcolColor = "background-color:#b8af82;";
                //                  }
                //                  else if (sColorFlag == "3")
                //                  {
                //                      bgcolColor = "background-color:#8787c2;";
                //                  }
                //                  ss = "style='"+ bgcolColor + ";color:#000000;vertical-align:middle;text-align:center;padding:3px 2px 3px 2px;border-left:1px solid #fff;width:13%'";
                //                  if (sColumn == "# Of TAS")
                //                  {
                //                      ss = "style='"+ bgcolColor + ";color:#ffffff;vertical-align:middle;text-align:center;padding:3px 2px 3px 2px;width:4%;border-left:1px solid #fff;'";
                //                  }
                //              }
                //              sColumn = sColumn == "SiteName" ? "Name" : sColumn;
                //              str.Append("<th " + ss + ">" + sColumn + "</th>");
                //          }

                string[] Collength = Ds.Tables[0].Columns[3].ColumnName.ToString().Split('^');
                StringBuilder strFooter = new StringBuilder();
                string ss = "background-color:#008040;color:#ffffff;vertical-align:middle;padding:3px 2px 3px 2px;border-left:1px solid #fff;";
                for (int k = 0; k < Collength.Length; k++)
                {
                    str.Append("<tr>");
                    for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                    {
                        if (!SkipColumn.Contains(Ds.Tables[0].Columns[j].ColumnName.ToString().Trim()))
                        {
                            string[] ColSpliter = Ds.Tables[0].Columns[j].ColumnName.ToString().Split('^');
                            if (ColSpliter[k] != "")
                            {
                                string strToolTipText = fnGettooltipText(Ds.Tables[2], Ds.Tables[0].Columns[j].ColumnName.ToString());
                                if (string.Join("", ColSpliter) == ColSpliter[k])
                                {
                                    if (Ds.Tables[0].Columns[j].ColumnName.ToString().Split('^')[0] == "Division/Site/Branch/DSE")
                                    {
                                        str.Append("<th  style='width:35%;background-color:#008040;color:#ffffff;vertical-align:middle;padding:3px 2px 3px 2px;border-left:1px solid #fff;;text-align:center;'  rowspan='" + ColSpliter.Length + "' >" + Ds.Tables[0].Columns[j].ColumnName.ToString().Split('^')[0] + (strToolTipText != "" ? "<i style='margin-left:10px' class='glyphicon glyphicon-info-sign' title='" + strToolTipText + "'></i>" : "") + "</th>");
                                    }
                                    else if (Ds.Tables[0].Columns[j].ColumnName.ToString().Split('^')[0] == "No of Routes (<10% CCR)")
                                    {
                                        str.Append("<th  style='width:10%;background-color:#eea459;color:#000000;vertical-align:middle;padding:3px 2px 3px 2px;border-left:1px solid #fff;;text-align:center;'  rowspan='" + ColSpliter.Length + "' >" + Ds.Tables[0].Columns[j].ColumnName.ToString().Split('^')[0] + (strToolTipText != "" ? "<i style='margin-left:10px' class='glyphicon glyphicon-info-sign' title='" + strToolTipText + "'></i>" : "") + "</th>");
                                    }
                                    else
                                    {
                                        str.Append("<th style='" + ss + ";text-align:center;'  rowspan='" + ColSpliter.Length + "' >" + Ds.Tables[0].Columns[j].ColumnName.ToString().Split('^')[0] + "</th>");
                                    }

                                }
                                else
                                {
                                    string strrowspan = multilvlPopuptbl(Ds.Tables[0], j, k, strToolTipText);
                                    str.Append(strrowspan.Split('|')[0]);
                                    j = j + Convert.ToInt32(strrowspan.Split('|')[1]) - 1;
                                }
                            }
                        }
                    }
                    str.Append("</tr>");
                }
                // str.Append("<th style='width:40px;background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;padding:3px 2px 3px 2px;border-left:1px solid #fff'></th>");
                str.Append("</thead><tbody>");

                foreach (DataRow dr in Ds.Tables[0].Rows)
                {
                    int Lvl = Convert.ToInt32(dr["Lvl"]);
                    string ss1 = "padding:2px;";
                    string TrowStyle = "";
                    string bgvolor = "";
                    if (Lvl == 1)
                    {
                        ss1 = "padding:2px 2px 2px 10px";
                        bgvolor = ";background-color:#dbdbdb;border:1px solid #ffffff;font-size:9pt;";
                        TrowStyle = ";display:none";
                    }
                    if (Lvl == 0)
                    {
                        ss1 = "padding:2px 2px 2px 2px";
                        bgvolor = ";background-color:#c9c9c9;border:1px solid #ffffff;color:#000;font-size:10.5pt;";
                        TrowStyle = "";
                    }
                    if (Lvl == 2)
                    {
                        ss1 = "padding:2px 2px 2px 30px;font-size:8pt;";
                        // bgvolor = ";background-color:#c9c9c9;border:1px solid #ffffff;color:#000;font-size:10.5pt;";
                        TrowStyle = ";display:none";
                    }

                    int NodeId = Convert.ToInt32(dr["NodeId"]);
                    int NodeType = Convert.ToInt32(dr["NodeType"]);
                    str.Append("<tr style='" + TrowStyle + "'  actlvl='" + Lvl + "' lvl='" + (Lvl == 0 ? 0 : 1) + "' sdata='" + dr["Division/Site/Branch/DSE^"].ToString() + "' nodeid='" + dr["NodeId"] + "' nodetype='" + dr["NodeType"] + "' pnodeid='" + dr["PNodeId"] + "' pnodetype='" + dr["PNodeType"] + "'>");
                    int cntimg = 0;
                    string swrap = "";
                    for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                    {
                        string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                        if (SkipColumn.Contains(sColumnName))
                        {
                            continue;
                        }
                        var sdata = dr[j].ToString();
                        if (cntimg == 0)
                        {
                            sdata = Lvl == 3 ? "&nbsp;" + dr[j].ToString() : "<img src='../NewImages/icoAdd.gif' onclick='fnColapse(this)'>" + dr[j].ToString();
                        }
                        string sColumn = sColumnName;
                        swrap = "";
                        if (sColumnName == "Division/Site/Branch/DSE^")
                        {
                            swrap = "wrap";
                            if (Lvl == 0)
                            {
                                ss = "padding:2px 2px 2px 10px;font-size:10pt;vertical-align:middle;text-align:left;" + bgvolor;
                            }
                            else if (Lvl == 1)
                            {
                                ss = "padding:2px 2px 2px 20px;font-size:9.5pt;vertical-align:middle;text-align:left;" + bgvolor;
                            }
                            else if (Lvl == 2)
                            {
                                ss = "padding:2px 2px 2px 30px;font-size:9pt;vertical-align:middle;text-align:left;" + bgvolor;
                            }
                            else if (Lvl == 3)
                            {
                                ss = "padding:2px 2px 2px 40px;font-size:8pt;vertical-align:middle;text-align:left;" + bgvolor;
                            }
                            else
                            {
                                ss = "padding:2px 2px 2px 40px;font-size:8pt;vertical-align:middle;text-align:left;" + bgvolor;
                            }
                        }
                        else if (sColumnName == "Routes Transferred To TAS^Total" && Convert.ToString(dr[j]) != "0")
                        {
                            ss = "padding:2px 40px 2px 2px;font-size:8pt;vertical-align:middle;text-align:right;" + bgvolor;
                            sdata = "<a href='###' style='color:blue' onclick='fnShowDetails(this)'>" + sdata + "</a>";
                        }
                        else if (sColumnName == "TAS issue routes^% of Routes")
                        {
                            ss = "padding:2px 40px 2px 2px;font-size:8pt;vertical-align:middle;text-align:right;" + bgvolor;
                            sdata = sdata + "%";
                        }
                        else
                        {
                            ss = "padding:2px 40px 2px 2px;font-size:8pt;vertical-align:middle;text-align:right;" + bgvolor;
                        }

                        str.Append("<td style='" + ss + "'  " + swrap + ">" + sdata + "</td>");

                        cntimg = 1;
                    }
                    //if (Lvl != 2)
                    //{
                    //    str.Append("<td style='" + ss + ss1 + ";height:18px;width:40px'><a href='###' onclick='fnDownloadSiteDetails(this)' title='Click to download report'><span class='glyphicon glyphicon-download'></span></td>");
                    //}
                    //else
                    //{
                    //    str.Append("<td style='" + ss + ss1 + ";height:18px;width:40px'>&nbsp;</td>");
                    //}

                    str.Append("</tr>");
                    DataRow[] drow = Ds.Tables[1].Select("PNodeId=" + NodeId + " and PNodeType=" + NodeType);
                    if (drow.Count() > 0)
                    {
                        str.Append(clsCreateHTML.createDashboardSubTbl(drow.CopyToDataTable(), Ds.Tables[1], SkipColumn, "", 0));
                    }
                }
                str.Append("</tbody></table>");
            }
            else
            {
                str.Append("No Record Found");
            }

            stresponse = "1^" + str.ToString() +"^"+ strLastRefreshTime.ToString();


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
    public static string fnDailyOrderStatusReport_Details(string sDate, string eDate, string NodeID, string NodeType)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        string stresponseMeasure = "";
        try
        {
            string storedProcName = "spRptTASAbsenteeismDashboard_DseDetails";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                    new SqlParameter("@FromDate", sDate),
                   new SqlParameter("@ToDate", eDate),
                   new SqlParameter("@NodeID", NodeID),
                   new SqlParameter("@NodeType", NodeType)
                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            //HttpContext.Current.Session["DsRptSellerOrderEntryProcess"] = Ds;
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
                stresponseMeasure = "";// clsCreateHTML.createtbl_Measures(Ds.Tables[0], new string[] { "ID" }, statusTimeText);
                string[] SkipColumn = new string[5];
                SkipColumn[0] = "lvl";
                SkipColumn[1] = "NodeID";
                SkipColumn[2] = "NodeType";
                SkipColumn[3] = "PNodeID";
                SkipColumn[4] = "PnodeType";

                //StartDate = DateTime.Parse(Ds.Tables[0].Rows[0]["StartDate"].ToString()).ToString("dd MMM");
                str.Append("<table id='tbldbrlist1' class='table' style='margin-bottom:0px;width:100%;border:1px solid #ddd' border='1' rules='all' cellspacing='2' ><thead><tr>");

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

                    if (sColumn == "DSE")
                    {
                        ss = "style='background-color:#008040;color:#ffffff;vertical-align:middle;text-align:center;padding:3px 2px 3px 2px;border-left:1px solid #fff'";
                    }
                    else
                    {
                        sColumn = sColumnName.Split('^')[0];
                        string sColorFlag = "";// sColumnName.Split('^')[1];
                        string bgcolColor = "background-color:#008040;";
                        if (sColorFlag == "2")
                        {
                            bgcolColor = "background-color:#b8af82;";
                        }
                        else if (sColorFlag == "3")
                        {
                            bgcolColor = "background-color:#8787c2;";
                        }
                        if(sColumn== "Retailing(K)" || sColumn == "PDR" || sColumn == "Throughput per TAS")
                        {
                            ss = "style='" + bgcolColor + ";color:#ffffff;vertical-align:middle;text-align:center;padding:3px 2px 3px 2px;border-left:1px solid #fff;width:10%;'";
                        }
                        else
                        {
                            ss = "style='" + bgcolColor + ";color:#ffffff;vertical-align:middle;text-align:center;padding:3px 2px 3px 2px;border-left:1px solid #fff;width:9%;'";
                        }
                        
                        
                    }
                    sColumn = sColumn == "SiteName" ? "Name" : sColumn;
                    str.Append("<th " + ss + ">" + sColumn + "</th>");
                }
                // str.Append("<th style='width:40px;background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;padding:3px 2px 3px 2px;border-left:1px solid #fff'></th>");
                str.Append("</tr></thead><tbody>");

                for (int i = 0; i < Ds.Tables[0].Rows.Count-1; i++)
                {
                    string ss1 = "padding:2px;";
                    string TrowStyle = "";
                    string bgvolor = "";
                   

                    str.Append("<tr flg='1'>");
                    int cntimg = 0;
                    for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                    {
                        string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                        if (SkipColumn.Contains(sColumnName))
                        {
                            continue;
                        }
                        var sdata = Ds.Tables[0].Rows[i][j].ToString();
                       
                        string sColumn = sColumnName;
                        if (sColumnName == "DSE")
                        {
                            ss = "padding:2px 2px 2px 5px;vertical-align:middle;text-align:left;" + bgvolor;
                        }
                        else if (sColumnName == "Calls Made" || sColumnName == "Calls Picked" || sColumnName == "Calls Billed" || sColumnName == "Calls Productive")
                        {
                            ss = "padding:2px 10px 2px 2px;vertical-align:middle;text-align:left;" + bgvolor;
                            sdata = "<table style='width:100%;margin:0px'><tr><td style='text-align:right;width:50%'>" + sdata.Split('|')[0] + "</td><td style='text-align:right;width:50%'>" + sdata.Split('|')[1] + "</td></tr></table>";
                        }
                        else
                        {
                            ss = "padding:2px 10px 2px 2px;vertical-align:middle;text-align:right;" + bgvolor;
                        }

                        str.Append("<td style=';" + ss + ";'>" + sdata + "</td>");
                        cntimg = 1;
                    }
                }
                str.Append("</tbody>");
                str.Append("<tfoot><tr>");
                for (int i= Ds.Tables[0].Rows.Count-1;i< Ds.Tables[0].Rows.Count;i++)
                {
                    for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                    {
                        string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                        if (SkipColumn.Contains(sColumnName))
                        {
                            continue;
                        }
                        var sdata = Ds.Tables[0].Rows[i][j].ToString();

                        string sColumn = sColumnName;
                        if (sColumnName == "DSE")
                        {
                            ss = "padding:2px 2px 2px 5px;vertical-align:middle;text-align:left;font-size:9.5pt;font-weight:bold";
                        }
                        else if (sColumnName == "Calls Made" || sColumnName == "Calls Picked" || sColumnName == "Calls Billed" || sColumnName == "Calls Productive")
                        {
                            ss = "padding:2px 10px 2px 2px;vertical-align:middle;text-align:right;font-size:9.5pt;font-weight:bold";
                            sdata = "<table style='width:100%;margin:0px'><tr><td style='text-align:right;width:50%'>" + sdata.Split('|')[0] + "</td><td style='text-align:right;width:50%'>" + sdata.Split('|')[1] + "</td></tr></table>";
                        }
                        else
                        {
                            ss = "padding:2px 10px 2px 2px;vertical-align:middle;text-align:right;font-size:9.5pt;font-weight:bold";
                        }
                        str.Append("<th style=';" + ss + ";'>" + sdata + "</th>");
                    }
                }
                str.Append("</tr></tfoot>");
                str.Append("</table>");
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

}
