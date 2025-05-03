using DocumentFormat.OpenXml.EMMA;
using DocumentFormat.OpenXml.Presentation;
using DocumentFormat.OpenXml.Vml.Spreadsheet;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;

/// <summary>
/// Summary description for clsCreateHTML
/// </summary>
public class clsCreateHTML
{

    public static string createDashboardSubTbl(DataTable dt, DataTable Dt1, string[] SkipColumn, string strpadding, int flgExcel)
    {
        StringBuilder str = new StringBuilder();
        for (int i = 0; i < dt.Rows.Count; i++)
        {
            int NodeId = Convert.ToInt32(dt.Rows[i]["NodeId"]);
            int NodeType = Convert.ToInt32(dt.Rows[i]["NodeType"]);
            int Lvl = Convert.ToInt32(dt.Rows[i]["Lvl"]);
            string ss1 = "padding:2px;";
            string ss = "";
            string TrowStyle = ";display:none";
            string bgvolor = "";
            if (Lvl == 1)
            {
                ss1 = "padding:2px 2px 2px 10px";
                bgvolor = ";background-color:#dbdbdb;border:1px solid #ffffff;font-size:9pt;";
            }
            if (Lvl == 2)
            {
                ss1 = "padding:2px 2px 2px 10px";
                bgvolor = ";background-color:#e9e9e9;border:1px solid #ffffff;font-size:9pt;";
            }
            if (Lvl == 0)
            {
                ss1 = "padding:2px 2px 2px 2px";
                bgvolor = ";background-color:#c9c9c9;border:1px solid #ffffff;color:#000;font-size:10.5pt;";
            }
            if (Lvl == 3)
            {
                ss1 = "padding:2px 2px 2px 40px;font-size:8pt;";
                // bgvolor = ";background-color:#c9c9c9;border:1px solid #ffffff;color:#000;font-size:10.5pt;";
            }
            str.Append("<tr  style='" + TrowStyle + "' actlvl='" + Lvl + "' sdata='" + dt.Rows[i]["Division/Site/Branch/DSE^"].ToString() + "' lvl='1' nodeid='" + dt.Rows[i]["NodeId"] + "' nodetype='" + dt.Rows[i]["NodeType"] + "' pnodeid='" + dt.Rows[i]["PNodeId"] + "' pnodetype='" + dt.Rows[i]["PNodeType"] + "'>");
            string swrap = "";
            for (int j = 0; j < dt.Columns.Count; j++)
            {
                string sColumnName = dt.Columns[j].ColumnName;
                if (SkipColumn.Contains(sColumnName))
                {
                    continue;
                }
                var sdata = dt.Rows[i][j];
                sdata = Lvl == 3 ? "&nbsp;" + sdata : sColumnName == "Division/Site/Branch/DSE^" ? "<img src='../NewImages/icoAdd.gif' onclick='fnColapse(this)'> " + sdata : sdata;
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
                else if (sColumnName == "Routes Transferred To TAS^Total" && Convert.ToString(dt.Rows[i][j]) != "0")
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
            }
            // str.Append("<td style='text-align:right;padding:2px 2px 2px 2px;font-size:8pt;'><a href='###' onclick='fnDownloadSiteDetails(this)' title='Click to download report'><span class='glyphicon glyphicon-download'></span></td>");
            str.Append("</tr>");
            DataRow[] drow1 = Dt1.Select("PNodeId=" + NodeId + " and PNodeType=" + NodeType);
            if (drow1.Count() > 0)
            {
                str.Append(createDashboardSubTbl(drow1.CopyToDataTable(), Dt1, SkipColumn, "", 0));
            }
        }
        return str.ToString();
    }
    public static string createSubTbl(DataTable dt, string[] SkipColumn, string strpadding, int flgExcel)
    {
        StringBuilder str = new StringBuilder();
        for (int i = 0; i < dt.Rows.Count; i++)
        {
            str.Append("<tr style='" + (flgExcel == 0 ? "display:none" : "") + "' lvl='1' nodeid='" + dt.Rows[i]["NodeId"] + "' nodetype='" + dt.Rows[i]["NodeType"] + "' pnodeid='" + dt.Rows[i]["PNodeId"] + "' pnodetype='" + dt.Rows[i]["PNodeType"] + "'>");
            int flgpadd = 0;
            for (int j = 0; j < dt.Columns.Count; j++)
            {
                string sColumnName = dt.Columns[j].ColumnName;
                if (SkipColumn.Contains(sColumnName))
                {
                    continue;
                }
                var sdata = dt.Rows[i][j];
                string sData = "";
                sData = dt.Rows[i][j].ToString();
                if (flgpadd == 0)
                {
                    str.Append("<td style='text-align:left;padding:2px 2px 2px 30px;font-size:8pt;'>" + sData + "</td>");
                }
                else
                {
                    str.Append("<td style='text-align:right;padding:2px 2px 2px 2px;font-size:8pt;'>" + sData + "</td>");
                }
                flgpadd = 1;
            }
            str.Append("<td style='text-align:right;padding:2px 2px 2px 2px;font-size:8pt;'><a href='###' onclick='fnDownloadSiteDetails(this)' title='Click to download report'><span class='glyphicon glyphicon-download'></span></td>");
            str.Append("</tr>");
        }
        return str.ToString();
    }
    public static string createtbl_Measures(DataTable dt, string[] SkipColumn, string str)
    {
        StringBuilder sb = new StringBuilder();
        sb.Append("<table id='tblMeasure' cellpadding='0' cellspacing='0' class='clstbl' style='border-spacing:2px;border-collapse:separate;background-color:#FFD3A8;margin-bottom:5px;width:99%;color:black;'>");

        sb.Append("<tr>");
        //sb.Append("<th style='width:180px;font-size:10pt;valign:middle;' rowspan='2'>" + str + " : </th>");
        for (int j = 0; j < dt.Rows.Count; j++)
        {
            if (!SkipColumn.Contains(dt.Rows[j][0].ToString().Trim()))
            {
                sb.Append("<th style='text-align:center;border:1px solid #666666; width:135px; height:20px; font-size:8pt; font-family:verdana; background-color:#" + dt.Rows[j][2].ToString() + "'>" + dt.Rows[j][0].ToString() + "</th>");
                sb.Append("<th style='width:10px;'> </th>");
            }
        }
        sb.Append("</tr>");
        sb.Append("<tr>");
        for (int i = 0; i < dt.Rows.Count; i++)
        {
            if (!SkipColumn.Contains(dt.Rows[i][0].ToString()))
            {
                sb.Append("<td style='border:1px solid #666; height:18px; text-align:center; font-size:9pt; font-family:verdana; background-color:#" + dt.Rows[i][2].ToString() + "'>" + dt.Rows[i][1].ToString() + "</td>");
                sb.Append("<td> </td>");
            }
        }
        sb.Append("</tr>");
        sb.Append("</table>");
        return sb.ToString();
    }
}