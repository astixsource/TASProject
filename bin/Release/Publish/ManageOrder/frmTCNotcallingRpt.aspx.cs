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

public partial class frmTCNotcallingRpt : System.Web.UI.Page
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

    private static string multilvlPopuptbl(DataTable dt, int col_ind, int row_ind)
    {
        int cntr = 1;
        string str = dt.Columns[col_ind].ColumnName.ToString().Split('^')[row_ind];
        str = str.Split('|')[0];
        string flgcolor = "style='background-color:#26a6e7;color:#ffffff;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px'";
        if (row_ind == 1)
        {
            string str1 = dt.Columns[col_ind].ColumnName.ToString().Split('^')[0];
            string str2 = dt.Columns[col_ind].ColumnName.ToString().Split('^')[1];
            if (str1.Split('|')[0] == "Not Connected")
            {
                    flgcolor = "style='background-color:#ffffc1;color:black;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px'";
            }
            else if (str1.Split('|')[0] == "Connected but No Order")
            {
               
                    flgcolor = "style='color:#ffffff;background-color:#00bfbf;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px;width:6%'";
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

        if (str == "Not Connected")
        {
            flgcolor = "style='background-color:#ffff88;color:black;text-align:center;border-bottom:1px solid #bbbbbb !important'";
        }
        else if (str == "TeleReason")
        {
            flgcolor = "style='background-color:#26a6e7;color:#ffffff;text-align:center'";
        }
        else if (str == "Connected but No Order")
        {
            flgcolor = "style='background-color:#009595;color:#ffffff;text-align:center;border-bottom:1px solid #bbbbbb !important'";
        }


        //#728cd4
        for (int i = col_ind + 1; i < dt.Columns.Count; i++)
        {
            string sname = dt.Columns[i].ColumnName.ToString().Split('^')[row_ind];
            if (str == sname.Split('|')[0])
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
		




        return " <th " + flgcolor + " class='clspopuptblhead_" + row_ind + "_" + col_ind + " cls" + dt.Columns[col_ind].ColumnName.ToString().Split('^')[0].Split(' ')[0] + "' " + sscolspan + "> " + str + " </th>|" + cntr;
    }


    [System.Web.Services.WebMethod()]
    public static string fnDailyOrderStatusReport(int LoginId, string sDate, string eDate, string SiteNodeIds, string TeleReasonIds,int flgExcel)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        string stresponseMeasure = "";
        try
        {
            string storedProcName = "spRptUnproductiveCallAnalysis";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@FromDate", sDate),
                   new SqlParameter("@ToDate", eDate),
                   new SqlParameter("@SiteNodeIds", SiteNodeIds),
                   new SqlParameter("@TeleReasonIds", TeleReasonIds),
                   new SqlParameter("@LoginId", LoginId),
                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            HttpContext.Current.Session["RptUnproductiveCallAnalysis"] = Ds;
            StringBuilder str = new StringBuilder();
            if (Ds.Tables[0].Rows.Count > 0)
            {
                string statusTimeText = "";
                //stresponseMeasure = clsCreateHTML.createtbl_Measures(Ds.Tables[0], new string[] { "ID" }, statusTimeText);
                string[] SkipColumn = new string[5];
                SkipColumn[0] = "Lvl";
                SkipColumn[1] = "NodeId";
                SkipColumn[2] = "NodeType";
                SkipColumn[3] = "PNodeId";
                SkipColumn[4] = "PNodeType";
                str.Append(getpiegarphvalue(Ds.Tables[0])+"|*|"+ Ds.Tables[3].Rows[0][0]+" : "+ Ds.Tables[3].Rows[0][1]);
                str.Append("|~|");
                str.Append(getpiegarphvalue(Ds.Tables[1]) + "|*|" + Ds.Tables[3].Rows[1][0] + " : " + Ds.Tables[3].Rows[1][1]);

                str.Append("|~|");
                str.Append(getpiegarphvalue(Ds.Tables[2]) + "|*|" + Ds.Tables[3].Rows[2][0] + " : " + Ds.Tables[3].Rows[2][1]);
                str.Append("|~|");
                str.Append("<table id='tbldbrlist' class='table' style='width:100%' cellspacing='2' ><thead>");
                string ss = "background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;";
                //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:4%' >SrNo</th>");
                //for (int j = 0; j < Ds.Tables[4].Columns.Count; j++)
                //{
                //    string sColumnName = Ds.Tables[4].Columns[j].ColumnName;
                //    if (SkipColumn.Contains(sColumnName))
                //    {
                //        continue;
                //    }
                //    string sColumn = sColumnName;
                //    if (sColumnName == "Total\\TAS Site\\Branch")
                //    {
                //        ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;padding:3px 2px 3px 2px;width:25%'";
                //    }
                //    else
                //    {
                //        sColumn = sColumnName.Split('^')[0];
                //        string sColorFlag = sColumnName.Split('^')[1];
                //        string bgcolColor = "background-color:#008040;";
                //        if (sColorFlag == "2")
                //        {
                //            bgcolColor = "background-color:#b8af82;";
                //        }else if (sColorFlag == "3")
                //        {
                //            bgcolColor = "background-color:#8787c2;";
                //        }
                //        ss = "style='"+ bgcolColor + ";color:#ffffff;vertical-align:middle;text-align:center;padding:3px 2px 3px 2px;'";
                //    }

                //    str.Append("<th " + ss + ">" + sColumn + "</th>");
                //}

                string[] Collength = Ds.Tables[4].Columns[5].ColumnName.ToString().Split('^');
                StringBuilder strFooter = new StringBuilder();
                for (int k = 0; k < Collength.Length; k++)
                {
                    str.Append("<tr>");
                    for (int j = 0; j < Ds.Tables[4].Columns.Count; j++)
                    {
                        if (!SkipColumn.Contains(Ds.Tables[4].Columns[j].ColumnName.ToString().Trim()))
                        {
                            string[] ColSpliter = Ds.Tables[4].Columns[j].ColumnName.ToString().Split('^');
                            if (ColSpliter[k] != "")
                            {
                                if (string.Join("", ColSpliter) == ColSpliter[k])
                                {
                                    string sWidth = "";
									string sColumnNames=Ds.Tables[4].Columns[j].ColumnName.ToString().Split('^')[0].Split('|')[0];
                                    if (sColumnNames == "Total\\TAS Site\\Branch")
                                    {
										sColumnNames = "Total\\TAS Site\\Branch-SUBD";
                                        sWidth = "width:20%";
                                    }
                                        str.Append("<th style='" + ss + ";"+sWidth+"' rowspan='" + Collength.Length + "' >" + sColumnNames + "</th>");
                                }
                                else
                                {
                                    string strrowspan = multilvlPopuptbl(Ds.Tables[4], j, k);
                                    str.Append(strrowspan.Split('|')[0]);
                                    j = j + Convert.ToInt32(strrowspan.Split('|')[1]) - 1;
                                }
                            }
                        }
                    }
                    if (k == 0)
                    {
                        str.Append("<th style='background-color:#26a6e7;color:#ffffff;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px' rowspan='2'></th>");
                    }
                    str.Append("</tr>");
                }
                
                str.Append("</tr></thead><tbody>");

                foreach (DataRow dr in Ds.Tables[4].Rows)
                {
                    int Lvl = Convert.ToInt32(dr["Lvl"]);
                    string ss1 = "padding:2px;";
                    string TrowStyle = "";
                    string bgvolor = "";
                    if (Lvl == 2)
                    {
                        ss1 = "padding:2px 2px 2px 10px";
                        bgvolor = ";background-color:#dbdbdb;border:1px solid #ffffff;font-size:9pt;";
                        TrowStyle = flgExcel==0? "display:none":"";
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
                    for (int j = 0; j < Ds.Tables[4].Columns.Count; j++)
                    {
                        string sColumnName = Ds.Tables[4].Columns[j].ColumnName;
                        if (SkipColumn.Contains(sColumnName))
                        {
                            continue;
                        }
                        var sdata = dr[j].ToString();
                        if (cntimg == 0)
                        {
                            sdata= "<img src='../NewImages/icoAdd.gif' onclick='fnColapse(this)'>" + dr[j].ToString();
                        }
                        string sColumn = sColumnName;
                        if (sColumnName.Split('|')[0] == "Total\\TAS Site\\Branch")
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
                        str.Append("<td style='" + ss + ss1 + ";height:18px;'><a href='###' onclick='fnDownloadSiteDetails(this)' title='Click to download report'><span class='glyphicon glyphicon-download'></span></td>");
                    }
                    else
                    {
                        str.Append("<td style='" + ss + ss1 + ";height:18px;'></td>");
                    }
                    str.Append("</tr>");
                    DataRow[] drow = Ds.Tables[5].Select("PNodeId=" + NodeId + " and PNodeType=" + NodeType);
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

        return stresponse;
    }


    private static string getpiegarphvalue(DataTable dtGraphData)
    {
        string[] ArColor = new string[5];
        ArColor[0] = "";
        ArColor[1] = "#0F52BA";     //Dark Blue
        ArColor[2] = "#61A934";     //Dark Green
        ArColor[3] = "#009FFF";     //light Blue
        ArColor[4] = "#6BDD83";     //light green

        StringBuilder strSeries = new StringBuilder();
        //strSeries.Append("{\"name\":\"" + dtGraphData.Columns[2].ColumnName.Trim() + "\",\"type\":\"pie\",\"data\": [");
        strSeries.Append("{\"name\":\"Total\",\"type\":\"pie\",\"data\": [");
        for (int j = 0; j < dtGraphData.Rows.Count; j++)
        {
            string sname= dtGraphData.Rows[j][0].ToString().Replace("\\", ",");
            if (j != 0)
                strSeries.Append(",{\"name\":\"" + sname + "\",\"y\":" + dtGraphData.Rows[j][1].ToString().Trim() + "}");
            else
                strSeries.Append("{\"name\":\"" + sname + "\",\"y\":" + dtGraphData.Rows[j][1].ToString().Trim() + "}");
        }
        strSeries.Append("]}");
        return "[" + strSeries.ToString() + "]";
    }


}