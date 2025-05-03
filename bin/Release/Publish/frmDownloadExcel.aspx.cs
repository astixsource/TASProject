using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Spreadsheet;
using System.Xml;
using System.Text.RegularExpressions;
public partial class MasterForms_frmDownloadExcel : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string[] notrowspanColumn = new string[0];
        string sFlg = Request.QueryString["flg"].ToString();//"1";//
        string flgType = Request.QueryString["flgType"] != null ? Request.QueryString["flgType"].ToString() : "1";
        string BranchCode = Request.QueryString["BranchCode"] != null ? Request.QueryString["BranchCode"].ToString() : "";
        string DownloadDate = Request.QueryString["DownloadDate"] != null ? Request.QueryString["DownloadDate"].ToString() : "";
        string BranchNodeId = Request.QueryString["BranchNodeId"] != null ? Request.QueryString["BranchNodeId"].ToString() : "0";
        string BranchNodeType = Request.QueryString["BranchNodeType"] != null ? Request.QueryString["BranchNodeType"].ToString() : "";
        if (sFlg == "1")
        {
            string LoginId = Request.QueryString["LoginId"].ToString();// "01-Jul-2018";//
            string flgStatus = Request.QueryString["flgStatus"].ToString();// "01-Jul-2018";//
            string CycleId = Request.QueryString["CycleId"] != null ? Request.QueryString["CycleId"].ToString() : "0";
            string IsMappingType = Request.QueryString["IsMappingType"] != null ? Request.QueryString["IsMappingType"].ToString() : "1";
            fnDownloadOrders(flgStatus, BranchCode, int.Parse(CycleId), DownloadDate, BranchNodeId, BranchNodeType, IsMappingType, flgType, LoginId);
        }
        else if (sFlg == "3")
        {
            string LoginId = Request.QueryString["LoginId"].ToString();// "01-Jul-2018";//
            string sDate = Request.QueryString["sDate"] != null ? Request.QueryString["sDate"].ToString() : DateTime.Now.ToString("dd-MMM-yyyy");
            string eDate = Request.QueryString["eDate"] != null ? Request.QueryString["eDate"].ToString() : DateTime.Now.ToString("dd-MMM-yyyy");
            string sitenodeid = Request.QueryString["SiteNodeId"] != null ? Request.QueryString["SiteNodeId"].ToString() : "0";
            string sitenodetype = Request.QueryString["SiteNodeType"] != null ? Request.QueryString["SiteNodeType"].ToString() : "0";
            string SellerType = Request.QueryString["SellerType"] != null ? Request.QueryString["SellerType"].ToString() : "1";
            string TeleReasonIds = Request.QueryString["TeleReasonIds"] != null ? Request.QueryString["TeleReasonIds"].ToString() : "";
            fnDownloadDailyReportTelecallerWise(LoginId, sDate, eDate, sitenodeid, sitenodetype, SellerType, TeleReasonIds);
        }
        else if (sFlg == "4")
        {
            string SiteNodeId = Request.QueryString["SiteNodeId"] != null ? Request.QueryString["SiteNodeId"].ToString() : "0";
            string SiteNodeType = Request.QueryString["BranchNodeType"] != null ? Request.QueryString["SiteNodeType"].ToString() : "";
            fnDownloadBranchAttendance(BranchCode, DownloadDate, BranchNodeId, BranchNodeType, SiteNodeId, SiteNodeType, flgType);
        }
        else if (sFlg == "5")
        {
            string sDate = Request.QueryString["sDate"].ToString();// "01-Jul-2018";//
            string trnDate = Request.QueryString["eDate"] != null ? Request.QueryString["eDate"].ToString() : DateTime.Now.ToString("dd-MMM-yyyy");
            fnDownloadSiteTelecallerPerformance(sDate, trnDate);
        }
        else if (sFlg == "6")
        {
            string SiteName = Request.QueryString["SiteName"] != null ? Request.QueryString["SiteName"].ToString() : "";
            string SiteNodeId = Request.QueryString["SiteNodeId"] != null ? Request.QueryString["SiteNodeId"].ToString() : "0";
            string SiteNodeType = Request.QueryString["SiteNodeType"] != null ? Request.QueryString["SiteNodeType"].ToString() : "";
            fnRptSiteWiseSBFData(SiteName, SiteNodeId, SiteNodeType);
        }
        else if (sFlg == "7")
        {
            string LoginId = Request.QueryString["LoginId"].ToString();// "01-Jul-2018";//
            string sDate = Request.QueryString["sDate"].ToString();
            string flgStatus = Request.QueryString["flgStatus"].ToString();// "01-Jul-2018";//
            string IsMappingType = Request.QueryString["IsMappingType"] != null ? Request.QueryString["IsMappingType"].ToString() : "1";
            fnDownloadOrdersHistoryOrder(flgStatus, BranchCode, sDate, BranchNodeId, BranchNodeType, IsMappingType, flgType, LoginId);
        }
        else if (sFlg == "8" || sFlg == "14")
        {
            string LoginId = Request.QueryString["LoginId"].ToString();// "01-Jul-2018";//
            string sDate = Request.QueryString["sDate"] != null ? Request.QueryString["sDate"].ToString() : DateTime.Now.ToString("dd-MMM-yyyy");
            string eDate = Request.QueryString["eDate"] != null ? Request.QueryString["eDate"].ToString() : DateTime.Now.ToString("dd-MMM-yyyy");
            string TasSiteNodeId = Request.QueryString["TasSiteNodeId"] != null ? Request.QueryString["TasSiteNodeId"].ToString() : "0";
            string TasSiteNodeType = Request.QueryString["TasSiteNodeType"] != null ? Request.QueryString["TasSiteNodeType"].ToString() : "0";
            string TeleReasonIds = Request.QueryString["TeleReasonIds"] != null ? Request.QueryString["TeleReasonIds"].ToString() : "";
            string sitebranchname = Request.QueryString["sitebranchname"] != null ? Request.QueryString["sitebranchname"].ToString() : "";
            string SellerType = Request.QueryString["SellerType"] != null ? Request.QueryString["SellerType"].ToString() : "1";
            string rptType = sFlg;
            fnRptDownloadPerfomanceOverViewatStoreLevel(LoginId, sDate, eDate, TasSiteNodeId, TasSiteNodeType, BranchNodeId, BranchNodeType, TeleReasonIds, sitebranchname, SellerType, rptType);
        }
        else if (sFlg == "9")
        {
            DownloadDate = DateTime.Now.ToString("yyyyMMdd");
            fnDownloadStoreContactDetail(BranchCode, DownloadDate, BranchNodeId, BranchNodeType, flgType);
        }
        else if (sFlg == "10")
        {
            fnDownloadDSECredential(BranchCode, BranchNodeId, BranchNodeType);
        }
        else if (sFlg == "11")
        {
            fnRptDownloadTASCallingReprt();
        }
        else if (sFlg == "12")
        {
            string SiteName = Request.QueryString["SiteName"] != null ? Request.QueryString["SiteName"].ToString() : "";
            string SiteNodeId = Request.QueryString["SiteNodeId"] != null ? Request.QueryString["SiteNodeId"].ToString() : "0";
            string SiteNodeType = Request.QueryString["SiteNodeType"] != null ? Request.QueryString["SiteNodeType"].ToString() : "";
            fnRptSiteWiseCurrentSBFData(SiteName, SiteNodeId, SiteNodeType);
        }
        else if (sFlg == "13")
        {
            string sDate = Request.QueryString["sDate"].ToString();// "01-Jul-2018";//
            string trnDate = Request.QueryString["eDate"] != null ? Request.QueryString["eDate"].ToString() : DateTime.Now.ToString("dd-MMM-yyyy");
            fnDownloadSiteTelecallerPerformance_GP(sDate, trnDate);
        }
        else if (sFlg == "15")
        {
            string LoginId = Request.QueryString["LoginId"].ToString();// "01-Jul-2018";//
            string sDate = Request.QueryString["sDate"].ToString();
            string flgStatus = Request.QueryString["flgStatus"].ToString();// "01-Jul-2018";//
            string IsMappingType = Request.QueryString["IsMappingType"] != null ? Request.QueryString["IsMappingType"].ToString() : "1";
            fnDownloadOrdersSuggestedOrder(flgStatus, sDate, IsMappingType, flgType, LoginId);
        }
        else if (sFlg == "16")
        {
            string LoginId = Request.QueryString["LoginId"].ToString();// "01-Jul-2018";//
            string sDate = Request.QueryString["sDate"].ToString();
            fnRptDownloadTASCCRData(sDate, LoginId);
        }
        else if (sFlg == "17")
        {
            string LoginId = Request.QueryString["LoginId"].ToString();// "01-Jul-2018";//
            string FromDate = Request.QueryString["FromDate"].ToString();
            string ToDate = Request.QueryString["ToDate"].ToString();
            fnRptDownloadTASFiveStarData(FromDate, ToDate, LoginId);
        }
        else if (sFlg == "18")
        {
            string dsename = Request.QueryString["dsename"].ToString();
            fnRptDSECallLogDetailDashboard(dsename);
        }
        else if (sFlg == "19")
        {
            fnRptDSECallLogDashboard();
        }
        else if (sFlg == "20")
        {
            string LoginId = Request.QueryString["LoginId"].ToString();// "01-Jul-2018";//
            string SiteNodeIds = Request.QueryString["SiteNodeIds"].ToString();
            string ToDate = Request.QueryString["sDate"].ToString();
            fnRptDownloadDSECCRData(ToDate, LoginId, SiteNodeIds);
        }
        else if (sFlg == "21")
        {
            string SiteNodeId = Request.QueryString["SiteNodeId"].ToString();
            string SiteNodeType = Request.QueryString["SiteNodeType"].ToString();
            string ToDate = Request.QueryString["RptDate"].ToString();
            fnDownloadRptTaskExtractData(ToDate, SiteNodeId, SiteNodeType, BranchNodeId, BranchNodeType);
        }
        else if (sFlg == "22")
        {
            string LoginId = Request.QueryString["loginid"].ToString();// "01-Jul-2018";//
            string RoleId = Request.QueryString["RoleId"].ToString();// "01-Jul-2018";//
            string UserID = Request.QueryString["UserID"].ToString();// "01-Jul-2018";//
            string FromDate = Request.QueryString["sDate"].ToString();
            string ToDate = Request.QueryString["eDate"].ToString();
            fnRptDownloadTASTransferredData(FromDate, ToDate, LoginId, RoleId, UserID);
        }
        else
        {
            string LoginId = Request.QueryString["LoginId"].ToString();
            string SiteNodeId = Request.QueryString["SiteNodeId"] != null ? Request.QueryString["SiteNodeId"].ToString() : "0";
            string SiteNodeType = Request.QueryString["SiteNodeType"] != null ? Request.QueryString["SiteNodeType"].ToString() : "";
            fnDownloadBranchDailyReport(BranchCode, DownloadDate, BranchNodeId, BranchNodeType, SiteNodeId, SiteNodeType, LoginId, flgType);
        }

    }

    public void fnRptDownloadTASTransferredData(string FromDate, string ToDate, string LoginId, string RoleId, string UserID)
    {
        string[] SkipColumn = new string[0];
        int cntvalid = 0;
        string filename = "RptTASAbsenteeismDashboard_" + DateTime.Now.ToString("yyyyMMdd");
        try
        {
            SqlConnection con = new SqlConnection(ConfigurationSettings.AppSettings["strConn"]);
            string storedProcName = "spRptTASAbsenteeismDashboard";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@FRomDate", FromDate),
                   new SqlParameter("@ToDate", ToDate),
                   new SqlParameter("@LoginID", LoginId),
                   new SqlParameter("@RoleID", RoleId),
                   new SqlParameter("@UserID", UserID),
                    new SqlParameter("@flgDownload", 1)
                };
            DataSet Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);

            using (XLWorkbook wb = new XLWorkbook())
            {
                cntvalid = 1;
                ////Start Chassiss
                int k = 1; int j = 0; int colFreeze = 2; int colLeft = 3;
                string strold = ""; int cntc = 0; int colst = 2; bool flgb = true;
                int resulsetcnt = 1;
                //foreach (DataRow drow in Ds.Tables[0].Rows)//For SheetName
                //{
                string strSheetName = "TAS Dashboard Data";
                resulsetcnt++;
                var ws = wb.Worksheets.Add(strSheetName);
                DataTable dt = Ds.Tables[0];
                k = 1; j = 0; colFreeze = 2; colLeft = 3;
                strold = ""; cntc = 0; colst = 2; flgb = true; bool flgm = false;
                //int rowstart = 0; // for data part insertion
                int noofsplit = 1; //Convert.ToInt16(drowchasiss["NoOfSplit"]);
                int noofcolfreeze = 0;// Convert.ToInt16(drowchasiss["Noofcolfreeze"]);
                for (int c = 0; c < dt.Columns.Count; c++)
                {
                    if (!SkipColumn.Contains(dt.Columns[c].ColumnName.ToString().Trim()))
                    {
                        string[] ColSpliter = dt.Columns[c].ColumnName.ToString().Split('^');
                        flgm = true;
                        for (var i = 0; i < ColSpliter.Length; i++)
                        {
                            string sVal = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                            ws.Cell(k + i, j + 1).Value = sVal.Split('^')[0];
                        }
                        for (var i = 0; i < noofsplit; i++)
                        {
                            string bgcolor = i == 0 ? "#5151ff" : i == 1 ? "#9b9bff" : "#a4a4ff";
                            string forrecolor = i < 2 ? "#ffffff" : "#000000";

                            ws.Cell(k + i, j + 1).Style.Fill.BackgroundColor = XLColor.FromHtml(bgcolor);
                            ws.Cell(k + i, j + 1).Style.Font.FontColor = XLColor.FromHtml(forrecolor);
                            ws.Cell(k + i, j + 1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                            ws.Cell(k + i, j + 1).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        }
                        j++;
                    }
                }

                for (var i = 0; i < noofsplit - 1; i++)
                {
                    j = 0; colst = 1; k = 1; strold = "";
                    for (int c = 0; c < dt.Columns.Count; c++)
                    {
                        //if (strold != "")
                        //{
                        if (strold != dt.Columns[c].ColumnName.ToString().Split('^')[i])
                        {
                            flgb = true;
                            if (strold != "")
                            {
                                ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j)).Merge();
                            }
                            cntc = 0;
                        }
                        //}
                        if (flgb == true)
                        {
                            colst = j + 1;
                        }
                        flgb = false;
                        strold = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                        cntc++;
                        if (c == dt.Columns.Count - 1)
                        {
                            ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j + 1)).Merge();
                            cntc = 0;
                        }

                        j++;
                    }
                }


                int rowst = 0;
                for (int c = 0; c < dt.Columns.Count; c++)
                {
                    strold = dt.Columns[c].ColumnName.ToString().Split('^')[0];
                    colst = 1; k = 1; flgb = false; rowst = 1;


                    for (var i = 0; i < noofsplit - 1; i++)
                    {
                        //strold = "";                                                   
                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == true)
                        {
                            ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i, c + 1)).Merge();
                            flgb = false;
                            rowst++;
                        }

                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] == "")
                        {
                            flgb = true;
                        }

                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == false && i > 0)
                        {
                            rowst++;
                        }

                        if (i == noofsplit - 1 && flgb == true)
                        {
                            ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i + 1, c + 1)).Merge();
                        }
                    }
                }
                /**/
                ws.Columns().AdjustToContents();
                var rangeWithData = ws.Cell(noofsplit + 1, 1).InsertData(dt.AsEnumerable());
                ws.Columns().AdjustToContents();
                //ws.Columns().AdjustToContents();//noofsplit + 1,  dt.Columns.Count

                IXLCell cell3 = ws.Cell(1, 1);
                IXLCell cell4 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);
                IXLCell cell5 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);
                ws.Range(ws.Cell(noofsplit + 1, 5), cell5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);
                ws.Range(cell3, cell4).Style.Border.SetInsideBorder(XLBorderStyleValues.Thin);
                ws.Range(cell3, cell4).Style.Border.SetOutsideBorder(XLBorderStyleValues.Medium);

                // ws.Range(ws.Cell(dt.Rows.Count + 1, 1), cell4).Style.Fill.BackgroundColor = XLColor.FromHtml("#d6d6d6");
                //ws.Range(ws.Cell(dt.Rows.Count + 1, 1), cell4).Style.Font.FontColor = XLColor.FromHtml("#000000");
                ws.SheetView.FreezeRows(noofsplit);
                ws.SheetView.FreezeColumns(noofcolfreeze);

                ws.Columns().AdjustToContents();
                ws.Rows().AdjustToContents();
                // ws.Range(1, 1, 1, dt.Columns.Count).Style.Alignment.WrapText = true;
                //}
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.Buffer = true;
                HttpContext.Current.Response.Charset = "";
                HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                //Response.ContentType = "application/vnd.ms-excel";
                HttpContext.Current.Response.AddHeader("content-disposition", "attachment;filename=" + filename + ".xlsx");
                using (MemoryStream MyMemoryStream = new MemoryStream())
                {
                    wb.SaveAs(MyMemoryStream);
                    MyMemoryStream.WriteTo(HttpContext.Current.Response.OutputStream);
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.Response.End();
                }

            }
        }
        catch (Exception ex)
        {
            string sss = ex.Message;
        }
        finally
        {
        }
    }

    public void fnDownloadRptTaskExtractData(string ToDate, string SiteNodeId, string SiteNodeType, string BranchNodeId, string BranchNodeType)
    {
        string[] SkipColumn = new string[1];
        SkipColumn[0] = "flgColorStatus";
        string filename = "";
        int cntvalid = 0;
        filename = "Task_File_" + DateTime.Now.ToString("yyyyMMdd");
        try
        {
            SqlConnection con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);

            string storedProcName = "spRptTaskExtractData";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@SiteNodeId", SiteNodeId),
                   new SqlParameter("@SiteNodeType", SiteNodeType),
                    new SqlParameter("@BranchNodeId", BranchNodeId),
                   new SqlParameter("@BranchNodeType", BranchNodeType),
                    new SqlParameter("@RptDate", ToDate)
                };
            DataSet Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            using (XLWorkbook wb = new XLWorkbook())
            {
                cntvalid = 1;
                ////Start Chassiss
                int k = 1; int j = 0; int colFreeze = 2; int colLeft = 3;
                string strold = ""; int cntc = 0; int colst = 2; bool flgb = true;
                int resulsetcnt = 0;
                //foreach (DataRow drowchasiss in Ds.Tables[0].Rows)//For SheetName
                //{
                string strSheetName = "TaskExtractData";//drowchasiss["SheetName"].ToString();
                DataTable dt = Ds.Tables[0];
                resulsetcnt++;
                var ws = wb.Worksheets.Add(strSheetName);
                k = 1; j = 0; colFreeze = 2; colLeft = 3;
                strold = ""; cntc = 0; colst = 2; flgb = true; bool flgm = false;
                //int rowstart = 0; // for data part insertion
                int noofsplit = 1; //Convert.ToInt16(drowchasiss["NoOfSplit"]);
                int noofcolfreeze = 0;// Convert.ToInt16(drowchasiss["Noofcolfreeze"]);
                string bgcolor = "#5151ff";
                string forrecolor = "#ffffff";
                for (int c = 0; c < dt.Columns.Count; c++)
                {
                    string[] ColSpliter = dt.Columns[c].ColumnName.ToString().Split('^');
                    for (var i = 0; i < ColSpliter.Length; i++)
                    {
                        string sVal = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                        ws.Cell(k + i, j + 1).Value = sVal.Split('^')[0];

                        ws.Cell(k + i, j + 1).Style.Fill.BackgroundColor = XLColor.FromHtml(bgcolor);
                        ws.Cell(k + i, j + 1).Style.Font.FontColor = XLColor.FromHtml(forrecolor);
                        ws.Cell(k + i, j + 1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                        ws.Cell(k + i, j + 1).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                    }
                    j++;
                }


                ws.Cell(noofsplit + 1, 1).InsertData(dt.AsEnumerable());
                //Export the Excel file.
                ws.Columns().AdjustToContents();
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.Buffer = true;
                HttpContext.Current.Response.Charset = "";
                HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                //Response.ContentType = "application/vnd.ms-excel";
                HttpContext.Current.Response.AddHeader("content-disposition", "attachment;filename=" + filename + ".xlsx");
                using (MemoryStream MyMemoryStream = new MemoryStream())
                {
                    wb.SaveAs(MyMemoryStream);
                    MyMemoryStream.WriteTo(HttpContext.Current.Response.OutputStream);
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.Response.End();
                }
            }
        }
        catch (Exception ex)
        {
            if (cntvalid == 0)
            {
                Response.Write("Error:" + ex.Message);
            }
            // string ProjectTitle = ConfigurationManager.AppSettings["Title"];
            //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), "FrmDownload Page", "Download Page", "Error in FrmDownload Page in " + ProjectTitle);
        }
        finally
        {
        }
    }

    public void fnRptDSECallLogDashboard()
    {
        string[] SkipColumn = new string[0];
        int cntvalid = 0;
        string filename = "TASCallLog_" + DateTime.Now.ToString("yyyyMMdd");
        try
        {

            DataSet Ds = (DataSet)Session["DsRptDSECallLogsDashboard"];

            using (XLWorkbook wb = new XLWorkbook())
            {
                cntvalid = 1;
                ////Start Chassiss
                int k = 1; int j = 0; int colFreeze = 2; int colLeft = 3;
                string strold = ""; int cntc = 0; int colst = 2; bool flgb = true;
                int resulsetcnt = 1;
                //foreach (DataRow drow in Ds.Tables[0].Rows)//For SheetName
                //{
                string strSheetName = "TASCallLog";
                resulsetcnt++;
                var ws = wb.Worksheets.Add(strSheetName);
                DataTable dt = Ds.Tables[0];
                k = 1; j = 0; colFreeze = 2; colLeft = 3;
                strold = ""; cntc = 0; colst = 2; flgb = true; bool flgm = false;
                //int rowstart = 0; // for data part insertion
                int noofsplit = 1; //Convert.ToInt16(drowchasiss["NoOfSplit"]);
                int noofcolfreeze = 0;// Convert.ToInt16(drowchasiss["Noofcolfreeze"]);
                for (int c = 0; c < dt.Columns.Count; c++)
                {
                    if (!SkipColumn.Contains(dt.Columns[c].ColumnName.ToString().Trim()))
                    {
                        string[] ColSpliter = dt.Columns[c].ColumnName.ToString().Split('^');
                        flgm = true;
                        for (var i = 0; i < ColSpliter.Length; i++)
                        {
                            string sVal = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                            ws.Cell(k + i, j + 1).Value = sVal.Split('^')[0];
                        }
                        for (var i = 0; i < noofsplit; i++)
                        {
                            string bgcolor = i == 0 ? "#5151ff" : i == 1 ? "#9b9bff" : "#a4a4ff";
                            string forrecolor = i < 2 ? "#ffffff" : "#000000";

                            ws.Cell(k + i, j + 1).Style.Fill.BackgroundColor = XLColor.FromHtml(bgcolor);
                            ws.Cell(k + i, j + 1).Style.Font.FontColor = XLColor.FromHtml(forrecolor);
                            ws.Cell(k + i, j + 1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                            ws.Cell(k + i, j + 1).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        }
                        j++;
                    }
                }

                for (var i = 0; i < noofsplit - 1; i++)
                {
                    j = 0; colst = 1; k = 1; strold = "";
                    for (int c = 0; c < dt.Columns.Count; c++)
                    {
                        //if (strold != "")
                        //{
                        if (strold != dt.Columns[c].ColumnName.ToString().Split('^')[i])
                        {
                            flgb = true;
                            if (strold != "")
                            {
                                ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j)).Merge();
                            }
                            cntc = 0;
                        }
                        //}
                        if (flgb == true)
                        {
                            colst = j + 1;
                        }
                        flgb = false;
                        strold = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                        cntc++;
                        if (c == dt.Columns.Count - 1)
                        {
                            ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j + 1)).Merge();
                            cntc = 0;
                        }

                        j++;
                    }
                }


                int rowst = 0;
                for (int c = 0; c < dt.Columns.Count; c++)
                {
                    strold = dt.Columns[c].ColumnName.ToString().Split('^')[0];
                    colst = 1; k = 1; flgb = false; rowst = 1;


                    for (var i = 0; i < noofsplit; i++)
                    {
                        //strold = "";                                                   
                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == true)
                        {
                            ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i, c + 1)).Merge();
                            flgb = false;
                            rowst++;
                        }

                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] == "")
                        {
                            flgb = true;
                        }

                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == false && i > 0)
                        {
                            rowst++;
                        }

                        if (i == noofsplit - 1 && flgb == true)
                        {
                            ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i + 1, c + 1)).Merge();
                        }
                    }
                }
                /**/
                ws.Columns().AdjustToContents();
                var rangeWithData = ws.Cell(noofsplit + 1, 1).InsertData(dt.AsEnumerable());
                //ws.Columns().AdjustToContents();
                //ws.Columns().AdjustToContents();//noofsplit + 1,  dt.Columns.Count

                //IXLCell cell3 = ws.Cell(1, 1);
                //IXLCell cell4 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);
                //IXLCell cell5 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);
                //ws.Range(ws.Cell(noofsplit + 1, 2), cell5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                //ws.Range(cell3, cell4).Style.Border.SetInsideBorder(XLBorderStyleValues.Thin);
                //ws.Range(cell3, cell4).Style.Border.SetOutsideBorder(XLBorderStyleValues.Medium);

                // ws.Range(ws.Cell(dt.Rows.Count + 1, 1), cell4).Style.Fill.BackgroundColor = XLColor.FromHtml("#d6d6d6");
                //ws.Range(ws.Cell(dt.Rows.Count + 1, 1), cell4).Style.Font.FontColor = XLColor.FromHtml("#000000");
                ws.SheetView.FreezeRows(noofsplit);
                ws.SheetView.FreezeColumns(noofcolfreeze);
                ws.Column(1).Delete();
                ws.Column(1).Delete();
                //  ws.Columns().AdjustToContents();
                //ws.Rows().AdjustToContents();
                // ws.Range(1, 1, 1, dt.Columns.Count).Style.Alignment.WrapText = true;
                // }
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.Buffer = true;
                HttpContext.Current.Response.Charset = "";
                HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                //Response.ContentType = "application/vnd.ms-excel";
                HttpContext.Current.Response.AddHeader("content-disposition", "attachment;filename=" + filename + ".xlsx");
                using (MemoryStream MyMemoryStream = new MemoryStream())
                {
                    wb.SaveAs(MyMemoryStream);
                    MyMemoryStream.WriteTo(HttpContext.Current.Response.OutputStream);
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.Response.End();
                }

            }
        }
        catch (Exception ex)
        {
            string sss = ex.Message;
        }
        finally
        {
        }
    }

    public void fnRptDownloadDSECCRData(string ToDate, string LoginId, string SiteNodeIds)
    {
        string[] SkipColumn = new string[0];
        int cntvalid = 0;
        string filename = "RptDownloadAllDSECallLogDetailDashboard_" + DateTime.Now.ToString("yyyyMMdd");
        try
        {
            SqlConnection con = new SqlConnection(ConfigurationSettings.AppSettings["strConn"]);
            string storedProcName = "spRptDownloadAllDSECallLogDetailDashboard";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@Date", ToDate),
                   new SqlParameter("@LoginId", LoginId),
                   new SqlParameter("@SiteNodeIds", SiteNodeIds)
                };
            DataSet Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            using (XLWorkbook wb = new XLWorkbook())
            {
                cntvalid = 1;
                ////Start Chassiss
                int k = 1; int j = 0; int colFreeze = 2; int colLeft = 3;
                string strold = ""; int cntc = 0; int colst = 2; bool flgb = true;
                int resulsetcnt = 1;
                //foreach (DataRow drow in Ds.Tables[0].Rows)//For SheetName
                //{
                string strSheetName = "TASCallLog";
                resulsetcnt++;
                var ws = wb.Worksheets.Add(strSheetName);
                DataTable dt = Ds.Tables[0];
                k = 1; j = 0; colFreeze = 2; colLeft = 3;
                strold = ""; cntc = 0; colst = 2; flgb = true; bool flgm = false;
                //int rowstart = 0; // for data part insertion
                int noofsplit = 1; //Convert.ToInt16(drowchasiss["NoOfSplit"]);
                int noofcolfreeze = 0;// Convert.ToInt16(drowchasiss["Noofcolfreeze"]);
                for (int c = 0; c < dt.Columns.Count; c++)
                {
                    if (!SkipColumn.Contains(dt.Columns[c].ColumnName.ToString().Trim()))
                    {
                        string[] ColSpliter = dt.Columns[c].ColumnName.ToString().Split('^');
                        flgm = true;
                        for (var i = 0; i < ColSpliter.Length; i++)
                        {
                            string sVal = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                            ws.Cell(k + i, j + 1).Value = sVal.Split('^')[0];
                        }
                        for (var i = 0; i < noofsplit; i++)
                        {
                            string bgcolor = i == 0 ? "#5151ff" : i == 1 ? "#9b9bff" : "#a4a4ff";
                            string forrecolor = i < 2 ? "#ffffff" : "#000000";

                            ws.Cell(k + i, j + 1).Style.Fill.BackgroundColor = XLColor.FromHtml(bgcolor);
                            ws.Cell(k + i, j + 1).Style.Font.FontColor = XLColor.FromHtml(forrecolor);
                            ws.Cell(k + i, j + 1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                            ws.Cell(k + i, j + 1).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        }
                        j++;
                    }
                }

                for (var i = 0; i < noofsplit - 1; i++)
                {
                    j = 0; colst = 1; k = 1; strold = "";
                    for (int c = 0; c < dt.Columns.Count; c++)
                    {
                        //if (strold != "")
                        //{
                        if (strold != dt.Columns[c].ColumnName.ToString().Split('^')[i])
                        {
                            flgb = true;
                            if (strold != "")
                            {
                                ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j)).Merge();
                            }
                            cntc = 0;
                        }
                        //}
                        if (flgb == true)
                        {
                            colst = j + 1;
                        }
                        flgb = false;
                        strold = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                        cntc++;
                        if (c == dt.Columns.Count - 1)
                        {
                            ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j + 1)).Merge();
                            cntc = 0;
                        }

                        j++;
                    }
                }


                int rowst = 0;
                for (int c = 0; c < dt.Columns.Count; c++)
                {
                    strold = dt.Columns[c].ColumnName.ToString().Split('^')[0];
                    colst = 1; k = 1; flgb = false; rowst = 1;


                    for (var i = 0; i < noofsplit; i++)
                    {
                        //strold = "";                                                   
                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == true)
                        {
                            ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i, c + 1)).Merge();
                            flgb = false;
                            rowst++;
                        }

                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] == "")
                        {
                            flgb = true;
                        }

                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == false && i > 0)
                        {
                            rowst++;
                        }

                        if (i == noofsplit - 1 && flgb == true)
                        {
                            ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i + 1, c + 1)).Merge();
                        }
                    }
                }
                /**/
                ws.Columns().AdjustToContents();
                var rangeWithData = ws.Cell(noofsplit + 1, 1).InsertData(dt.AsEnumerable());
                //ws.Columns().AdjustToContents();
                //ws.Columns().AdjustToContents();//noofsplit + 1,  dt.Columns.Count

                //IXLCell cell3 = ws.Cell(1, 1);
                //IXLCell cell4 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);
                //IXLCell cell5 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);
                //ws.Range(ws.Cell(noofsplit + 1, 2), cell5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                //ws.Range(cell3, cell4).Style.Border.SetInsideBorder(XLBorderStyleValues.Thin);
                //ws.Range(cell3, cell4).Style.Border.SetOutsideBorder(XLBorderStyleValues.Medium);

                // ws.Range(ws.Cell(dt.Rows.Count + 1, 1), cell4).Style.Fill.BackgroundColor = XLColor.FromHtml("#d6d6d6");
                //ws.Range(ws.Cell(dt.Rows.Count + 1, 1), cell4).Style.Font.FontColor = XLColor.FromHtml("#000000");
                ws.SheetView.FreezeRows(noofsplit);
                ws.SheetView.FreezeColumns(noofcolfreeze);

                //  ws.Columns().AdjustToContents();
                //ws.Rows().AdjustToContents();
                // ws.Range(1, 1, 1, dt.Columns.Count).Style.Alignment.WrapText = true;
                // }
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.Buffer = true;
                HttpContext.Current.Response.Charset = "";
                HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                //Response.ContentType = "application/vnd.ms-excel";
                HttpContext.Current.Response.AddHeader("content-disposition", "attachment;filename=" + filename + ".xlsx");
                using (MemoryStream MyMemoryStream = new MemoryStream())
                {
                    wb.SaveAs(MyMemoryStream);
                    MyMemoryStream.WriteTo(HttpContext.Current.Response.OutputStream);
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.Response.End();
                }

            }
        }
        catch (Exception ex)
        {
            string sss = ex.Message;
        }
        finally
        {
        }
    }
    public void fnRptDSECallLogDetailDashboard(string DSEName)
    {
        string[] SkipColumn = new string[0];
        int cntvalid = 0;
        string filename = "CallLogDetail_" + DSEName + "_" + DateTime.Now.ToString("yyyyMMdd");
        try
        {
            DataSet Ds = (DataSet)Session["dsRptDSECallLogDetailDashboard"];
            using (XLWorkbook wb = new XLWorkbook())
            {
                cntvalid = 1;
                ////Start Chassiss
                int k = 1; int j = 0; int colFreeze = 2; int colLeft = 3;
                string strold = ""; int cntc = 0; int colst = 2; bool flgb = true;
                int resulsetcnt = 1;
                //foreach (DataRow drow in Ds.Tables[0].Rows)//For SheetName
                //{
                string strSheetName = "TASCallLog";
                resulsetcnt++;
                var ws = wb.Worksheets.Add(strSheetName);
                DataTable dt = Ds.Tables[0];
                k = 1; j = 0; colFreeze = 2; colLeft = 3;
                strold = ""; cntc = 0; colst = 2; flgb = true; bool flgm = false;
                //int rowstart = 0; // for data part insertion
                int noofsplit = 1; //Convert.ToInt16(drowchasiss["NoOfSplit"]);
                int noofcolfreeze = 0;// Convert.ToInt16(drowchasiss["Noofcolfreeze"]);
                for (int c = 0; c < dt.Columns.Count; c++)
                {
                    if (!SkipColumn.Contains(dt.Columns[c].ColumnName.ToString().Trim()))
                    {
                        string[] ColSpliter = dt.Columns[c].ColumnName.ToString().Split('^');
                        flgm = true;
                        for (var i = 0; i < ColSpliter.Length; i++)
                        {
                            string sVal = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                            ws.Cell(k + i, j + 1).Value = sVal.Split('^')[0];
                        }
                        for (var i = 0; i < noofsplit; i++)
                        {
                            string bgcolor = i == 0 ? "#5151ff" : i == 1 ? "#9b9bff" : "#a4a4ff";
                            string forrecolor = i < 2 ? "#ffffff" : "#000000";

                            ws.Cell(k + i, j + 1).Style.Fill.BackgroundColor = XLColor.FromHtml(bgcolor);
                            ws.Cell(k + i, j + 1).Style.Font.FontColor = XLColor.FromHtml(forrecolor);
                            ws.Cell(k + i, j + 1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                            ws.Cell(k + i, j + 1).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        }
                        j++;
                    }
                }

                for (var i = 0; i < noofsplit - 1; i++)
                {
                    j = 0; colst = 1; k = 1; strold = "";
                    for (int c = 0; c < dt.Columns.Count; c++)
                    {
                        //if (strold != "")
                        //{
                        if (strold != dt.Columns[c].ColumnName.ToString().Split('^')[i])
                        {
                            flgb = true;
                            if (strold != "")
                            {
                                ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j)).Merge();
                            }
                            cntc = 0;
                        }
                        //}
                        if (flgb == true)
                        {
                            colst = j + 1;
                        }
                        flgb = false;
                        strold = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                        cntc++;
                        if (c == dt.Columns.Count - 1)
                        {
                            ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j + 1)).Merge();
                            cntc = 0;
                        }

                        j++;
                    }
                }


                int rowst = 0;
                for (int c = 0; c < dt.Columns.Count; c++)
                {
                    strold = dt.Columns[c].ColumnName.ToString().Split('^')[0];
                    colst = 1; k = 1; flgb = false; rowst = 1;


                    for (var i = 0; i < noofsplit; i++)
                    {
                        //strold = "";                                                   
                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == true)
                        {
                            ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i, c + 1)).Merge();
                            flgb = false;
                            rowst++;
                        }

                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] == "")
                        {
                            flgb = true;
                        }

                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == false && i > 0)
                        {
                            rowst++;
                        }

                        if (i == noofsplit - 1 && flgb == true)
                        {
                            ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i + 1, c + 1)).Merge();
                        }
                    }
                }
                /**/
                ws.Columns().AdjustToContents();
                var rangeWithData = ws.Cell(noofsplit + 1, 1).InsertData(dt.AsEnumerable());
                //ws.Columns().AdjustToContents();
                //ws.Columns().AdjustToContents();//noofsplit + 1,  dt.Columns.Count

                //IXLCell cell3 = ws.Cell(1, 1);
                //IXLCell cell4 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);
                //IXLCell cell5 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);
                //ws.Range(ws.Cell(noofsplit + 1, 2), cell5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                //ws.Range(cell3, cell4).Style.Border.SetInsideBorder(XLBorderStyleValues.Thin);
                //ws.Range(cell3, cell4).Style.Border.SetOutsideBorder(XLBorderStyleValues.Medium);

                // ws.Range(ws.Cell(dt.Rows.Count + 1, 1), cell4).Style.Fill.BackgroundColor = XLColor.FromHtml("#d6d6d6");
                //ws.Range(ws.Cell(dt.Rows.Count + 1, 1), cell4).Style.Font.FontColor = XLColor.FromHtml("#000000");
                ws.SheetView.FreezeRows(noofsplit);
                ws.SheetView.FreezeColumns(noofcolfreeze);

                //  ws.Columns().AdjustToContents();
                //ws.Rows().AdjustToContents();
                // ws.Range(1, 1, 1, dt.Columns.Count).Style.Alignment.WrapText = true;
                // }
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.Buffer = true;
                HttpContext.Current.Response.Charset = "";
                HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                //Response.ContentType = "application/vnd.ms-excel";
                HttpContext.Current.Response.AddHeader("content-disposition", "attachment;filename=" + filename + ".xlsx");
                using (MemoryStream MyMemoryStream = new MemoryStream())
                {
                    wb.SaveAs(MyMemoryStream);
                    MyMemoryStream.WriteTo(HttpContext.Current.Response.OutputStream);
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.Response.End();
                }

            }
        }
        catch (Exception ex)
        {
            string sss = ex.Message;
        }
        finally
        {
        }
    }
    public void fnRptDownloadTASFiveStarData(string FromDate, string ToDate, string LoginId)
    {
        string[] SkipColumn = new string[0];
        int cntvalid = 0;
        string filename = "TASFiveStarData_" + DateTime.Now.ToString("yyyyMMdd");
        try
        {
            SqlConnection con = new SqlConnection(ConfigurationSettings.AppSettings["strConn"]);
            string storedProcName = "spDownloadTASFiveStarData";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@FromDate", FromDate),
                   new SqlParameter("@Todate", ToDate),
                   new SqlParameter("@LoginId", LoginId)
                };
            DataSet Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);

            using (XLWorkbook wb = new XLWorkbook())
            {
                cntvalid = 1;
                ////Start Chassiss
                int k = 1; int j = 0; int colFreeze = 2; int colLeft = 3;
                string strold = ""; int cntc = 0; int colst = 2; bool flgb = true;
                int resulsetcnt = 1;
                foreach (DataRow drow in Ds.Tables[0].Rows)//For SheetName
                {
                    string strSheetName = drow[1].ToString();
                    resulsetcnt++;
                    var ws = wb.Worksheets.Add(strSheetName);
                    DataTable dt = Ds.Tables[Convert.ToInt32(drow[0])];
                    k = 1; j = 0; colFreeze = 2; colLeft = 3;
                    strold = ""; cntc = 0; colst = 2; flgb = true; bool flgm = false;
                    //int rowstart = 0; // for data part insertion
                    int noofsplit = 3; //Convert.ToInt16(drowchasiss["NoOfSplit"]);
                    int noofcolfreeze = 0;// Convert.ToInt16(drowchasiss["Noofcolfreeze"]);
                    for (int c = 0; c < dt.Columns.Count; c++)
                    {
                        if (!SkipColumn.Contains(dt.Columns[c].ColumnName.ToString().Trim()))
                        {
                            string[] ColSpliter = dt.Columns[c].ColumnName.ToString().Split('^');
                            flgm = true;
                            for (var i = 0; i < ColSpliter.Length; i++)
                            {
                                string sVal = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                                ws.Cell(k + i, j + 1).Value = sVal.Split('^')[0];
                            }
                            for (var i = 0; i < noofsplit; i++)
                            {
                                string bgcolor = i == 0 ? "#5151ff" : i == 1 ? "#9b9bff" : "#a4a4ff";
                                string forrecolor = i < 2 ? "#ffffff" : "#000000";

                                ws.Cell(k + i, j + 1).Style.Fill.BackgroundColor = XLColor.FromHtml(bgcolor);
                                ws.Cell(k + i, j + 1).Style.Font.FontColor = XLColor.FromHtml(forrecolor);
                                ws.Cell(k + i, j + 1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                                ws.Cell(k + i, j + 1).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                            }
                            j++;
                        }
                    }

                    for (var i = 0; i < noofsplit - 1; i++)
                    {
                        j = 0; colst = 1; k = 1; strold = "";
                        for (int c = 0; c < dt.Columns.Count; c++)
                        {
                            //if (strold != "")
                            //{
                            if (strold != dt.Columns[c].ColumnName.ToString().Split('^')[i])
                            {
                                flgb = true;
                                if (strold != "")
                                {
                                    ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j)).Merge();
                                }
                                cntc = 0;
                            }
                            //}
                            if (flgb == true)
                            {
                                colst = j + 1;
                            }
                            flgb = false;
                            strold = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                            cntc++;
                            if (c == dt.Columns.Count - 1)
                            {
                                ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j + 1)).Merge();
                                cntc = 0;
                            }

                            j++;
                        }
                    }


                    int rowst = 0;
                    for (int c = 0; c < dt.Columns.Count; c++)
                    {
                        strold = dt.Columns[c].ColumnName.ToString().Split('^')[0];
                        colst = 1; k = 1; flgb = false; rowst = 1;


                        for (var i = 0; i < noofsplit; i++)
                        {
                            //strold = "";                                                   
                            if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == true)
                            {
                                ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i, c + 1)).Merge();
                                flgb = false;
                                rowst++;
                            }

                            if (dt.Columns[c].ColumnName.ToString().Split('^')[i] == "")
                            {
                                flgb = true;
                            }

                            if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == false && i > 0)
                            {
                                rowst++;
                            }

                            if (i == noofsplit - 1 && flgb == true)
                            {
                                ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i + 1, c + 1)).Merge();
                            }
                        }
                    }
                    /**/
                    ws.Columns().AdjustToContents();
                    var rangeWithData = ws.Cell(noofsplit + 1, 1).InsertData(dt.AsEnumerable());
                    ws.Columns().AdjustToContents();
                    //ws.Columns().AdjustToContents();//noofsplit + 1,  dt.Columns.Count

                    IXLCell cell3 = ws.Cell(1, 1);
                    IXLCell cell4 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);
                    IXLCell cell5 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);
                    ws.Range(ws.Cell(noofsplit + 1, 2), cell5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    ws.Range(cell3, cell4).Style.Border.SetInsideBorder(XLBorderStyleValues.Thin);
                    ws.Range(cell3, cell4).Style.Border.SetOutsideBorder(XLBorderStyleValues.Medium);

                    // ws.Range(ws.Cell(dt.Rows.Count + 1, 1), cell4).Style.Fill.BackgroundColor = XLColor.FromHtml("#d6d6d6");
                    //ws.Range(ws.Cell(dt.Rows.Count + 1, 1), cell4).Style.Font.FontColor = XLColor.FromHtml("#000000");
                    ws.SheetView.FreezeRows(noofsplit);
                    ws.SheetView.FreezeColumns(noofcolfreeze);

                    ws.Columns().AdjustToContents();
                    ws.Rows().AdjustToContents();
                    // ws.Range(1, 1, 1, dt.Columns.Count).Style.Alignment.WrapText = true;
                }
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.Buffer = true;
                HttpContext.Current.Response.Charset = "";
                HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                //Response.ContentType = "application/vnd.ms-excel";
                HttpContext.Current.Response.AddHeader("content-disposition", "attachment;filename=" + filename + ".xlsx");
                using (MemoryStream MyMemoryStream = new MemoryStream())
                {
                    wb.SaveAs(MyMemoryStream);
                    MyMemoryStream.WriteTo(HttpContext.Current.Response.OutputStream);
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.Response.End();
                }

            }
        }
        catch (Exception ex)
        {
            string sss = ex.Message;
        }
        finally
        {
        }
    }
    public void fnRptDownloadTASCCRData(string CallDate, string LoginId)
    {
        string[] SkipColumn = new string[0];
        int cntvalid = 0;
        string filename = "TASCCRData_" + DateTime.Now.ToString("yyyyMMdd");
        try
        {
            SqlConnection con = new SqlConnection(ConfigurationSettings.AppSettings["strConn"]);
            string storedProcName = "spDownloadTASCCRData";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@CallDate", CallDate),
                   new SqlParameter("@LoginId", LoginId)
                };
            DataSet Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);

            using (XLWorkbook wb = new XLWorkbook())
            {
                cntvalid = 1;
                ////Start Chassiss
                int k = 1; int j = 0; int colFreeze = 2; int colLeft = 3;
                string strold = ""; int cntc = 0; int colst = 2; bool flgb = true;
                int resulsetcnt = 1;
                foreach (DataRow drow in Ds.Tables[0].Rows)//For SheetName
                {
                    string strSheetName = drow[1].ToString();
                    resulsetcnt++;
                    var ws = wb.Worksheets.Add(strSheetName);
                    DataTable dt = Ds.Tables[Convert.ToInt32(drow[0])];
                    k = 1; j = 0; colFreeze = 2; colLeft = 3;
                    strold = ""; cntc = 0; colst = 2; flgb = true; bool flgm = false;
                    //int rowstart = 0; // for data part insertion
                    int noofsplit = 1; //Convert.ToInt16(drowchasiss["NoOfSplit"]);
                    int noofcolfreeze = 0;// Convert.ToInt16(drowchasiss["Noofcolfreeze"]);
                    for (int c = 0; c < dt.Columns.Count; c++)
                    {
                        if (!SkipColumn.Contains(dt.Columns[c].ColumnName.ToString().Trim()))
                        {
                            string[] ColSpliter = dt.Columns[c].ColumnName.ToString().Split('^');
                            flgm = true;
                            for (var i = 0; i < ColSpliter.Length; i++)
                            {
                                string sVal = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                                ws.Cell(k + i, j + 1).Value = sVal.Split('^')[0];
                            }
                            for (var i = 0; i < noofsplit; i++)
                            {
                                string bgcolor = "#5151ff"; string forrecolor = "#ffffff";
                                ws.Cell(k + i, j + 1).Style.Fill.BackgroundColor = XLColor.FromHtml(bgcolor);
                                ws.Cell(k + i, j + 1).Style.Font.FontColor = XLColor.FromHtml(forrecolor);
                                ws.Cell(k + i, j + 1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                                ws.Cell(k + i, j + 1).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                            }
                            j++;
                        }
                    }

                    for (var i = 0; i < noofsplit - 1; i++)
                    {
                        j = 0; colst = 1; k = 1; strold = "";
                        for (int c = 0; c < dt.Columns.Count; c++)
                        {
                            //if (strold != "")
                            //{
                            if (strold != dt.Columns[c].ColumnName.ToString().Split('^')[i])
                            {
                                flgb = true;
                                if (strold != "")
                                {
                                    ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j)).Merge();
                                }
                                cntc = 0;
                            }
                            //}
                            if (flgb == true)
                            {
                                colst = j + 1;
                            }
                            flgb = false;
                            strold = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                            cntc++;
                            if (c == dt.Columns.Count - 1)
                            {
                                ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j + 1)).Merge();
                                cntc = 0;
                            }

                            j++;
                        }
                    }


                    int rowst = 0;
                    for (int c = 0; c < dt.Columns.Count; c++)
                    {
                        strold = dt.Columns[c].ColumnName.ToString().Split('^')[0];
                        colst = 1; k = 1; flgb = false; rowst = 1;


                        for (var i = 0; i < noofsplit; i++)
                        {
                            //strold = "";                                                   
                            if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == true)
                            {
                                ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i, c + 1)).Merge();
                                flgb = false;
                                rowst++;
                            }

                            if (dt.Columns[c].ColumnName.ToString().Split('^')[i] == "")
                            {
                                flgb = true;
                            }

                            if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == false && i > 0)
                            {
                                rowst++;
                            }

                            if (i == noofsplit - 1 && flgb == true)
                            {
                                ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i + 1, c + 1)).Merge();
                            }
                        }
                    }
                    /**/

                    var rangeWithData = ws.Cell(noofsplit + 1, 1).InsertData(dt.AsEnumerable());
                    ws.Columns().AdjustToContents();
                    //ws.Columns().AdjustToContents();//noofsplit + 1,  dt.Columns.Count

                    IXLCell cell3 = ws.Cell(1, 1);
                    IXLCell cell4 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);
                    IXLCell cell5 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);
                    ws.Range(ws.Cell(k, 2), cell5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    ws.Range(cell3, cell4).Style.Border.SetInsideBorder(XLBorderStyleValues.Thin);
                    ws.Range(cell3, cell4).Style.Border.SetOutsideBorder(XLBorderStyleValues.Medium);

                    // ws.Range(ws.Cell(dt.Rows.Count + 1, 1), cell4).Style.Fill.BackgroundColor = XLColor.FromHtml("#d6d6d6");
                    //ws.Range(ws.Cell(dt.Rows.Count + 1, 1), cell4).Style.Font.FontColor = XLColor.FromHtml("#000000");
                    ws.SheetView.FreezeRows(noofsplit);
                    ws.SheetView.FreezeColumns(noofcolfreeze);


                    //ws.Rows().AdjustToContents();
                    ws.Range(1, 1, 1, dt.Columns.Count).Style.Alignment.WrapText = true;
                }
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.Buffer = true;
                HttpContext.Current.Response.Charset = "";
                HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                //Response.ContentType = "application/vnd.ms-excel";
                HttpContext.Current.Response.AddHeader("content-disposition", "attachment;filename=" + filename + ".xlsx");
                using (MemoryStream MyMemoryStream = new MemoryStream())
                {
                    wb.SaveAs(MyMemoryStream);
                    MyMemoryStream.WriteTo(HttpContext.Current.Response.OutputStream);
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.Response.End();
                }

            }
        }
        catch (Exception ex)
        {
            string sss = ex.Message;
        }
        finally
        {
        }
    }
    public void fnRptDownloadTASCallingReprt()
    {
        string[] SkipColumn = new string[0];
        int cntvalid = 0;
        string filename = "RptTASCallingData_" + DateTime.Now.ToString("yyyyMMdd");
        try
        {
            SqlConnection con = new SqlConnection(ConfigurationSettings.AppSettings["strConn"]);
            string storedProcName = "spRptGetCallingDateFromTASAndLeap";
            List<SqlParameter> sp = null;
            DataSet Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);

            using (XLWorkbook wb = new XLWorkbook())
            {
                cntvalid = 1;
                ////Start Chassiss
                int k = 1; int j = 0; int colFreeze = 2; int colLeft = 3;
                string strold = ""; int cntc = 0; int colst = 2; bool flgb = true;
                int resulsetcnt = 1;
                foreach (DataTable dt in Ds.Tables)//For SheetName
                {
                    string strSheetName = resulsetcnt == 1 ? "Data from_mTAS" : (resulsetcnt == 2 ? "Leap Data" : "Site_Summary");
                    resulsetcnt++;
                    var ws = wb.Worksheets.Add(strSheetName);
                    k = 1; j = 0; colFreeze = 2; colLeft = 3;
                    strold = ""; cntc = 0; colst = 2; flgb = true; bool flgm = false;
                    //int rowstart = 0; // for data part insertion
                    int noofsplit = 1; //Convert.ToInt16(drowchasiss["NoOfSplit"]);
                    int noofcolfreeze = 0;// Convert.ToInt16(drowchasiss["Noofcolfreeze"]);
                    for (int c = 0; c < dt.Columns.Count; c++)
                    {
                        if (!SkipColumn.Contains(dt.Columns[c].ColumnName.ToString().Trim()))
                        {
                            string[] ColSpliter = dt.Columns[c].ColumnName.ToString().Split('^');
                            flgm = true;
                            for (var i = 0; i < ColSpliter.Length; i++)
                            {
                                string sVal = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                                ws.Cell(k + i, j + 1).Value = sVal.Split('^')[0];
                            }
                            for (var i = 0; i < noofsplit; i++)
                            {
                                string bgcolor = "#5151ff"; string forrecolor = "#ffffff";
                                ws.Cell(k + i, j + 1).Style.Fill.BackgroundColor = XLColor.FromHtml(bgcolor);
                                ws.Cell(k + i, j + 1).Style.Font.FontColor = XLColor.FromHtml(forrecolor);
                                ws.Cell(k + i, j + 1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                                ws.Cell(k + i, j + 1).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                            }
                            j++;
                        }
                    }

                    for (var i = 0; i < noofsplit - 1; i++)
                    {
                        j = 0; colst = 1; k = 1; strold = "";
                        for (int c = 0; c < dt.Columns.Count; c++)
                        {
                            //if (strold != "")
                            //{
                            if (strold != dt.Columns[c].ColumnName.ToString().Split('^')[i])
                            {
                                flgb = true;
                                if (strold != "")
                                {
                                    ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j)).Merge();
                                }
                                cntc = 0;
                            }
                            //}
                            if (flgb == true)
                            {
                                colst = j + 1;
                            }
                            flgb = false;
                            strold = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                            cntc++;
                            if (c == dt.Columns.Count - 1)
                            {
                                ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j + 1)).Merge();
                                cntc = 0;
                            }

                            j++;
                        }
                    }


                    int rowst = 0;
                    for (int c = 0; c < dt.Columns.Count; c++)
                    {
                        strold = dt.Columns[c].ColumnName.ToString().Split('^')[0];
                        colst = 1; k = 1; flgb = false; rowst = 1;


                        for (var i = 0; i < noofsplit; i++)
                        {
                            //strold = "";                                                   
                            if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == true)
                            {
                                ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i, c + 1)).Merge();
                                flgb = false;
                                rowst++;
                            }

                            if (dt.Columns[c].ColumnName.ToString().Split('^')[i] == "")
                            {
                                flgb = true;
                            }

                            if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == false && i > 0)
                            {
                                rowst++;
                            }

                            if (i == noofsplit - 1 && flgb == true)
                            {
                                ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i + 1, c + 1)).Merge();
                            }
                        }
                    }
                    /**/

                    var rangeWithData = ws.Cell(noofsplit + 1, 1).InsertData(dt.AsEnumerable());
                    ws.Columns().AdjustToContents();
                    //ws.Columns().AdjustToContents();//noofsplit + 1,  dt.Columns.Count

                    IXLCell cell3 = ws.Cell(1, 1);
                    IXLCell cell4 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);
                    IXLCell cell5 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);
                    ws.Range(ws.Cell(k, 2), cell5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    ws.Range(cell3, cell4).Style.Border.SetInsideBorder(XLBorderStyleValues.Thin);
                    ws.Range(cell3, cell4).Style.Border.SetOutsideBorder(XLBorderStyleValues.Medium);

                    // ws.Range(ws.Cell(dt.Rows.Count + 1, 1), cell4).Style.Fill.BackgroundColor = XLColor.FromHtml("#d6d6d6");
                    //ws.Range(ws.Cell(dt.Rows.Count + 1, 1), cell4).Style.Font.FontColor = XLColor.FromHtml("#000000");
                    ws.SheetView.FreezeRows(noofsplit);
                    ws.SheetView.FreezeColumns(noofcolfreeze);


                    //ws.Rows().AdjustToContents();
                    ws.Range(1, 1, 1, dt.Columns.Count).Style.Alignment.WrapText = true;
                }
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.Buffer = true;
                HttpContext.Current.Response.Charset = "";
                HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                //Response.ContentType = "application/vnd.ms-excel";
                HttpContext.Current.Response.AddHeader("content-disposition", "attachment;filename=" + filename + ".xlsx");
                using (MemoryStream MyMemoryStream = new MemoryStream())
                {
                    wb.SaveAs(MyMemoryStream);
                    MyMemoryStream.WriteTo(HttpContext.Current.Response.OutputStream);
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.Response.End();
                }

            }
        }
        catch (Exception ex)
        {
            string sss = ex.Message;
        }
        finally
        {
        }
    }

    public void fnDownloadDSECredential(string BranchCode, string BranchNodeId, string BranchNodeType)
    {
        string[] SkipColumn = new string[1];
        SkipColumn[0] = "flgColorStatus";
        string filename = "";
        int cntvalid = 0;
        filename = "DSECrendentialList_" + BranchCode;
        try
        {
            SqlConnection con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);

            string storedProcName = "spDownloadDSETeleCallingCredentials";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@BranchSubdNodeId", BranchNodeId),
                   new SqlParameter("@BranchSubdNodeType", BranchNodeType)
                };
            DataSet Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            using (XLWorkbook wb = new XLWorkbook())
            {
                cntvalid = 1;
                ////Start Chassiss
                int k = 1; int j = 0; int colFreeze = 2; int colLeft = 3;
                string strold = ""; int cntc = 0; int colst = 2; bool flgb = true;
                int resulsetcnt = 0;
                //foreach (DataRow drowchasiss in Ds.Tables[0].Rows)//For SheetName
                //{
                string strSheetName = "Sheet1";//drowchasiss["SheetName"].ToString();
                DataTable dt = Ds.Tables[0];
                resulsetcnt++;
                var ws = wb.Worksheets.Add(strSheetName);
                k = 1; j = 0; colFreeze = 2; colLeft = 3;
                strold = ""; cntc = 0; colst = 2; flgb = true; bool flgm = false;
                //int rowstart = 0; // for data part insertion
                int noofsplit = 1; //Convert.ToInt16(drowchasiss["NoOfSplit"]);
                int noofcolfreeze = 0;// Convert.ToInt16(drowchasiss["Noofcolfreeze"]);
                for (int c = 0; c < dt.Columns.Count; c++)
                {
                    string[] ColSpliter = dt.Columns[c].ColumnName.ToString().Split('^');
                    for (var i = 0; i < ColSpliter.Length; i++)
                    {
                        string sVal = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                        ws.Cell(k + i, j + 1).Value = sVal.Split('^')[0];
                    }
                    j++;
                }


                ws.Cell(noofsplit + 1, 1).InsertData(dt.AsEnumerable());
                //Export the Excel file.
                ws.Columns().AdjustToContents();
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.Buffer = true;
                HttpContext.Current.Response.Charset = "";
                HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                //Response.ContentType = "application/vnd.ms-excel";
                HttpContext.Current.Response.AddHeader("content-disposition", "attachment;filename=" + filename + ".xlsx");
                using (MemoryStream MyMemoryStream = new MemoryStream())
                {
                    wb.SaveAs(MyMemoryStream);
                    MyMemoryStream.WriteTo(HttpContext.Current.Response.OutputStream);
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.Response.End();
                }
            }
        }
        catch (Exception ex)
        {
            if (cntvalid == 0)
            {
                Response.Write("Error:" + ex.Message);
            }
            // string ProjectTitle = ConfigurationManager.AppSettings["Title"];
            //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), "FrmDownload Page", "Download Page", "Error in FrmDownload Page in " + ProjectTitle);
        }
        finally
        {
        }
    }

    public void fnDownloadStoreContactDetail(string BranchCode, string DownloadDate, string BranchNodeId, string BranchNodeType, string flgType)
    {
        string[] SkipColumn = new string[1];
        SkipColumn[0] = "flgColorStatus";
        string filename = "";
        int cntvalid = 0;
        filename = flgType == "1" ? "RetailerContactInfo_" + DownloadDate + "_" + BranchCode : "SUBD_RetailerContactInfo_" + DownloadDate + "_" + BranchCode;
        try
        {
            SqlConnection con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);

            string storedProcName = "spDownloadStoreContactDetail";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@BranchNodeId", BranchNodeId),
                   new SqlParameter("@BranchNodeType", BranchNodeType)
                };
            DataSet Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            using (XLWorkbook wb = new XLWorkbook())
            {
                cntvalid = 1;
                ////Start Chassiss
                int k = 1; int j = 0; int colFreeze = 2; int colLeft = 3;
                string strold = ""; int cntc = 0; int colst = 2; bool flgb = true;
                int resulsetcnt = 0;
                //foreach (DataRow drowchasiss in Ds.Tables[0].Rows)//For SheetName
                //{
                string strSheetName = "Sheet1";//drowchasiss["SheetName"].ToString();
                DataTable dt = Ds.Tables[0];
                resulsetcnt++;
                var ws = wb.Worksheets.Add(strSheetName);
                k = 1; j = 0; colFreeze = 2; colLeft = 3;
                strold = ""; cntc = 0; colst = 2; flgb = true; bool flgm = false;
                //int rowstart = 0; // for data part insertion
                int noofsplit = 1; //Convert.ToInt16(drowchasiss["NoOfSplit"]);
                int noofcolfreeze = 0;// Convert.ToInt16(drowchasiss["Noofcolfreeze"]);
                for (int c = 0; c < dt.Columns.Count; c++)
                {
                    string[] ColSpliter = dt.Columns[c].ColumnName.ToString().Split('^');
                    for (var i = 0; i < ColSpliter.Length; i++)
                    {
                        string sVal = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                        ws.Cell(k + i, j + 1).Value = sVal.Split('^')[0];
                    }
                    j++;
                }


                ws.Cell(noofsplit + 1, 1).InsertData(dt.AsEnumerable());
                //Export the Excel file.
                ws.Columns().AdjustToContents();
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.Buffer = true;
                HttpContext.Current.Response.Charset = "";
                HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                //Response.ContentType = "application/vnd.ms-excel";
                HttpContext.Current.Response.AddHeader("content-disposition", "attachment;filename=" + filename + ".xlsx");
                using (MemoryStream MyMemoryStream = new MemoryStream())
                {
                    wb.SaveAs(MyMemoryStream);
                    MyMemoryStream.WriteTo(HttpContext.Current.Response.OutputStream);
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.Response.End();
                }
            }
        }
        catch (Exception ex)
        {
            if (cntvalid == 0)
            {
                Response.Write("Error:" + ex.Message);
            }
            // string ProjectTitle = ConfigurationManager.AppSettings["Title"];
            //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), "FrmDownload Page", "Download Page", "Error in FrmDownload Page in " + ProjectTitle);
        }
        finally
        {
        }
    }
    public void fnRptDownloadPerfomanceOverViewatStoreLevel(string LoginId, string sDate, string eDate, string TasSiteNodeId, string TasSiteNodeType, string BranchNodeId, string BranchNodeType, string TeleReasonIds, string sitebranchname, string SellerType, string rptType)
    {
        string[] SkipColumn = new string[0];
        string filename = "";
        int cntvalid = 0;
        filename = "RptDownloadPerfomanceOverViewatStoreLevel_" + (rptType == "14" ? "GP_" : "") + sitebranchname + "_" + Convert.ToDateTime(sDate).ToString("yyyyMMdd");
        try
        {
            SqlConnection con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);

            string storedProcName = rptType == "8" ? "spRptDownloadPerfomanceOverViewatStoreLevel" : "spRptDownloadPerfomanceOverViewatStoreLevel_GP";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@FromDate", sDate),
                   new SqlParameter("@ToDate", eDate),
                   new SqlParameter("@TasSiteNodeId", TasSiteNodeId),
                   new SqlParameter("@TasSiteNodeType", TasSiteNodeType),
                   new SqlParameter("@BranchNodeId", BranchNodeId),
                   new SqlParameter("@BranchNodeType", BranchNodeType),
                   new SqlParameter("@TeleReasonIds", TeleReasonIds),
                   new SqlParameter("@LoginId", LoginId),
                new SqlParameter("@flgDSETC", SellerType)

                };
            DataSet Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);

            using (XLWorkbook wb = new XLWorkbook())
            {
                cntvalid = 1;
                ////Start Chassiss
                int k = 1; int j = 0; int colFreeze = 2; int colLeft = 3;
                string strold = ""; int cntc = 0; int colst = 2; bool flgb = true;
                int resulsetcnt = 1;
                foreach (DataTable dt in Ds.Tables)//For SheetName
                {
                    string strSheetName = resulsetcnt == 1 ? "Summary" : "Detail";//drowchasiss["SheetName"].ToString();
                    resulsetcnt++;
                    var ws = wb.Worksheets.Add(strSheetName);
                    k = 1; j = 0; colFreeze = 2; colLeft = 3;
                    strold = ""; cntc = 0; colst = 2; flgb = true; bool flgm = false;
                    //int rowstart = 0; // for data part insertion
                    int noofsplit = 1; //Convert.ToInt16(drowchasiss["NoOfSplit"]);
                    int noofcolfreeze = 5;// Convert.ToInt16(drowchasiss["Noofcolfreeze"]);
                    for (int c = 0; c < dt.Columns.Count; c++)
                    {
                        if (!SkipColumn.Contains(dt.Columns[c].ColumnName.ToString().Trim()))
                        {
                            string[] ColSpliter = dt.Columns[c].ColumnName.ToString().Split('^');


                            flgm = true;

                            for (var i = 0; i < ColSpliter.Length; i++)
                            {
                                string sVal = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                                ws.Cell(k + i, j + 1).Value = sVal.Split('^')[0];
                            }
                            for (var i = 0; i < noofsplit; i++)
                            {
                                string bgcolor = "#728cd4"; string forrecolor = "#ffffff";
                                if (i == 1)
                                {
                                    bgcolor = "#a4b6e3";
                                    forrecolor = "#000000";
                                }
                                ws.Cell(k + i, j + 1).Style.Fill.BackgroundColor = XLColor.FromHtml(bgcolor);
                                ws.Cell(k + i, j + 1).Style.Font.FontColor = XLColor.FromHtml(forrecolor);
                                ws.Cell(k + i, j + 1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                                ws.Cell(k + i, j + 1).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                            }


                            j++;
                        }
                    }

                    for (var i = 0; i < noofsplit - 1; i++)
                    {
                        j = 0; colst = 1; k = 1; strold = "";
                        for (int c = 0; c < dt.Columns.Count; c++)
                        {
                            //if (strold != "")
                            //{
                            if (strold != dt.Columns[c].ColumnName.ToString().Split('^')[i])
                            {
                                flgb = true;
                                if (strold != "")
                                {
                                    ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j)).Merge();
                                }
                                cntc = 0;
                            }
                            //}
                            if (flgb == true)
                            {
                                colst = j + 1;
                            }
                            flgb = false;
                            strold = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                            cntc++;
                            if (c == dt.Columns.Count - 1)
                            {
                                ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j + 1)).Merge();
                                cntc = 0;
                            }

                            j++;
                        }
                    }


                    int rowst = 0;
                    for (int c = 0; c < dt.Columns.Count; c++)
                    {
                        strold = dt.Columns[c].ColumnName.ToString().Split('^')[0];
                        colst = 1; k = 1; flgb = false; rowst = 1;


                        for (var i = 0; i < noofsplit; i++)
                        {
                            //strold = "";                                                   
                            if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == true)
                            {
                                ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i, c + 1)).Merge();
                                flgb = false;
                                rowst++;
                            }

                            if (dt.Columns[c].ColumnName.ToString().Split('^')[i] == "")
                            {
                                flgb = true;
                            }

                            if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == false && i > 0)
                            {
                                rowst++;
                            }

                            if (i == noofsplit - 1 && flgb == true)
                            {
                                ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i + 1, c + 1)).Merge();
                            }
                        }
                    }
                    /**/

                    ws.Rows().AdjustToContents();
                    var rangeWithData = ws.Cell(noofsplit + 1, 1).InsertData(dt.AsEnumerable());

                    //ws.Columns().AdjustToContents();//noofsplit + 1,  dt.Columns.Count

                    IXLCell cell3 = ws.Cell(1, 1);
                    IXLCell cell4 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);
                    IXLCell cell5 = ws.Cell(dt.Rows.Count + noofsplit, (resulsetcnt < 3 ? 10 : 11));
                    ws.Range(ws.Cell(k, 2), cell5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    ws.Range(cell3, cell4).Style.Border.SetInsideBorder(XLBorderStyleValues.Thin);
                    ws.Range(cell3, cell4).Style.Border.SetOutsideBorder(XLBorderStyleValues.Medium);

                    ws.Range(ws.Cell(dt.Rows.Count + 1, 1), cell4).Style.Fill.BackgroundColor = XLColor.FromHtml("#d6d6d6");
                    ws.Range(ws.Cell(dt.Rows.Count + 1, 1), cell4).Style.Font.FontColor = XLColor.FromHtml("#000000");
                    ws.SheetView.FreezeRows(noofsplit);
                    ws.SheetView.FreezeColumns(noofcolfreeze);

                    ws.Columns().AdjustToContents();
                    ws.Rows().AdjustToContents();
                    ws.Range(1, 1, 1, dt.Columns.Count).Style.Alignment.WrapText = true;
                }

                //Export the Excel file.
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.Buffer = true;
                HttpContext.Current.Response.Charset = "";
                HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                //Response.ContentType = "application/vnd.ms-excel";
                HttpContext.Current.Response.AddHeader("content-disposition", "attachment;filename=" + filename + ".xlsx");
                using (MemoryStream MyMemoryStream = new MemoryStream())
                {
                    wb.SaveAs(MyMemoryStream);
                    MyMemoryStream.WriteTo(HttpContext.Current.Response.OutputStream);
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.Response.End();
                }
            }
        }
        catch (Exception ex)
        {
            if (cntvalid == 0)
            {
                Response.Write("Error:" + ex.Message);
            }
            // string ProjectTitle = ConfigurationManager.AppSettings["Title"];
            //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), "FrmDownload Page", "Download Page", "Error in FrmDownload Page in " + ProjectTitle);
        }
        finally
        {
        }
    }

    public void fnDownloadOrdersSuggestedOrder(string flgStatus, string OrderDate, string IsMappingType, string flgType, string LoginId)
    {
        string[] SkipColumn = new string[0];
        int cntvalid = 0;
        string filename = "SuggestedOrder_" + Convert.ToDateTime(OrderDate).ToString("yyyyMMddhhmmss");
        SqlConnection con = null;
        try
        {
            con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
            con.Open();

            string storedProcName = "spDownloadSuggesstedOrderFile";
            List<SqlParameter> sp = null;
            sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@OrderDate", OrderDate)
                };

            DataSet ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            if (IsMappingType == "1")
            {
                cntvalid = 1;
                MemoryStream ms = new MemoryStream();
                TextWriter tw = new StreamWriter(ms);
                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    tw.WriteLine(Convert.ToString(drow["Text"]));
                }

                tw.Flush();
                byte[] bytes = ms.ToArray();
                ms.Close();

                Response.Clear();
                Response.ContentType = "application/force-download";
                Response.AddHeader("content-disposition", "attachment;    filename=" + filename + ".txt");
                Response.BinaryWrite(bytes);
                Response.End();
            }
            else
            {
                using (XLWorkbook wb = new XLWorkbook())
                {
                    cntvalid = 1;
                    ////Start Chassiss
                    int k = 1; int j = 0; int colFreeze = 2; int colLeft = 3;
                    string strold = ""; int cntc = 0; int colst = 2; bool flgb = true;
                    int resulsetcnt = 0;
                    //foreach (DataRow drowchasiss in Ds.Tables[0].Rows)//For SheetName
                    //{
                    string strSheetName = "DailyOrders";//drowchasiss["SheetName"].ToString();
                    DataTable dt = ds.Tables[0];
                    resulsetcnt++;
                    var ws = wb.Worksheets.Add(strSheetName);
                    k = 1; j = 0; colFreeze = 2; colLeft = 3;
                    strold = ""; cntc = 0; colst = 2; flgb = true; bool flgm = false;
                    //int rowstart = 0; // for data part insertion
                    int noofsplit = 1; //Convert.ToInt16(drowchasiss["NoOfSplit"]);
                    int noofcolfreeze = 0;// Convert.ToInt16(drowchasiss["Noofcolfreeze"]);
                    for (int c = 0; c < dt.Columns.Count; c++)
                    {
                        string[] ColSpliter = dt.Columns[c].ColumnName.ToString().Split('^');
                        for (var i = 0; i < ColSpliter.Length; i++)
                        {
                            string sVal = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                            ws.Cell(k + i, j + 1).Value = sVal.Split('^')[0];
                        }
                        j++;
                    }

                    ws.Rows().AdjustToContents();
                    var rangeWithData = ws.Cell(noofsplit + 1, 1).InsertData(dt.AsEnumerable());
                    //Export the Excel file.
                    HttpContext.Current.Response.Clear();
                    HttpContext.Current.Response.Buffer = true;
                    HttpContext.Current.Response.Charset = "";
                    HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                    //Response.ContentType = "application/vnd.ms-excel";
                    HttpContext.Current.Response.AddHeader("content-disposition", "attachment;filename=" + filename + ".xls");
                    using (MemoryStream MyMemoryStream = new MemoryStream())
                    {
                        wb.SaveAs(MyMemoryStream);
                        MyMemoryStream.WriteTo(HttpContext.Current.Response.OutputStream);
                        HttpContext.Current.Response.Flush();
                        HttpContext.Current.Response.End();
                    }
                }
            }
        }
        catch (Exception ex)
        {
            if (cntvalid == 0)
            {
                Response.Write("Error:" + ex.Message);
            }
            // string ProjectTitle = ConfigurationManager.AppSettings["Title"];
            //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), "FrmDownload Page", "Download Page", "Error in FrmDownload Page in " + ProjectTitle);
        }
        finally
        {
            con.Dispose();
        }
    }
    public void fnDownloadOrdersHistoryOrder(string flgStatus, string BranchCode, string OrderDate, string BranchNodeId, string BranchNodeType, string IsMappingType, string flgType, string LoginId)
    {
        string[] SkipColumn = new string[0];
        int cntvalid = 0;
        string filename = "Order_" + BranchCode + "_" + Convert.ToDateTime(OrderDate).ToString("yyyyMMddhhmmss");
        SqlConnection con = null;
        SqlTransaction transaction = null;
        try
        {
            con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
            con.Open();
            transaction = con.BeginTransaction();

            string storedProcName = flgType == "1" ? "spDownloadOrderDataForSpecificDate" : "spDownloadSUBDOrderDataForSpecificDate";
            List<SqlParameter> sp = null;
            sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@flgStatus", flgStatus),
                   new SqlParameter("@LoginId", LoginId),
                   new SqlParameter("@BranchNodeId", BranchNodeId),
                   new SqlParameter("@BranchNodeType", BranchNodeType),
                   new SqlParameter("@OrderDate", OrderDate),
                   new SqlParameter("@IsMappingType", IsMappingType)
                };

            DataSet ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, transaction, sp);
            transaction.Commit();
            if (IsMappingType == "1")
            {
                cntvalid = 1;
                MemoryStream ms = new MemoryStream();
                TextWriter tw = new StreamWriter(ms);
                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    tw.WriteLine(Convert.ToString(drow["PrintText"]));
                }

                tw.Flush();
                byte[] bytes = ms.ToArray();
                ms.Close();

                Response.Clear();
                Response.ContentType = "application/force-download";
                Response.AddHeader("content-disposition", "attachment;    filename=" + filename + ".txt");
                Response.BinaryWrite(bytes);
                Response.End();
            }
            else
            {
                using (XLWorkbook wb = new XLWorkbook())
                {
                    cntvalid = 1;
                    ////Start Chassiss
                    int k = 1; int j = 0; int colFreeze = 2; int colLeft = 3;
                    string strold = ""; int cntc = 0; int colst = 2; bool flgb = true;
                    int resulsetcnt = 0;
                    //foreach (DataRow drowchasiss in Ds.Tables[0].Rows)//For SheetName
                    //{
                    string strSheetName = "DailyOrders";//drowchasiss["SheetName"].ToString();
                    DataTable dt = ds.Tables[0];
                    resulsetcnt++;
                    var ws = wb.Worksheets.Add(strSheetName);
                    k = 1; j = 0; colFreeze = 2; colLeft = 3;
                    strold = ""; cntc = 0; colst = 2; flgb = true; bool flgm = false;
                    //int rowstart = 0; // for data part insertion
                    int noofsplit = 1; //Convert.ToInt16(drowchasiss["NoOfSplit"]);
                    int noofcolfreeze = 0;// Convert.ToInt16(drowchasiss["Noofcolfreeze"]);
                    for (int c = 0; c < dt.Columns.Count; c++)
                    {
                        string[] ColSpliter = dt.Columns[c].ColumnName.ToString().Split('^');
                        for (var i = 0; i < ColSpliter.Length; i++)
                        {
                            string sVal = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                            ws.Cell(k + i, j + 1).Value = sVal.Split('^')[0];
                        }
                        j++;
                    }

                    ws.Rows().AdjustToContents();
                    var rangeWithData = ws.Cell(noofsplit + 1, 1).InsertData(dt.AsEnumerable());
                    //Export the Excel file.
                    HttpContext.Current.Response.Clear();
                    HttpContext.Current.Response.Buffer = true;
                    HttpContext.Current.Response.Charset = "";
                    HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                    //Response.ContentType = "application/vnd.ms-excel";
                    HttpContext.Current.Response.AddHeader("content-disposition", "attachment;filename=" + filename + ".xls");
                    using (MemoryStream MyMemoryStream = new MemoryStream())
                    {
                        wb.SaveAs(MyMemoryStream);
                        MyMemoryStream.WriteTo(HttpContext.Current.Response.OutputStream);
                        HttpContext.Current.Response.Flush();
                        HttpContext.Current.Response.End();
                    }
                }
            }
        }
        catch (Exception ex)
        {
            transaction.Rollback();
            if (cntvalid == 0)
            {
                Response.Write("Error:" + ex.Message);
            }
            // string ProjectTitle = ConfigurationManager.AppSettings["Title"];
            //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), "FrmDownload Page", "Download Page", "Error in FrmDownload Page in " + ProjectTitle);
        }
        finally
        {
            con.Dispose();
        }
    }
    public void fnDownloadOrders(string flgStatus, string BranchCode, int CycleId, string DownloadDate, string BranchNodeId, string BranchNodeType, string IsMappingType, string flgType, string LoginId)
    {
        string[] SkipColumn = new string[0];
        int cntvalid = 0;
        string filename = "Order_" + BranchCode + "_" + (CycleId == 0 ? DateTime.Now.ToString("yyyyMMddhhmmss") : Convert.ToDateTime(DownloadDate).ToString("yyyyMMddhhmmss"));
        SqlConnection con = null;
        DataSet ds = new DataSet();
        SqlTransaction transaction = null;
        try
        {
            con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
            con.Open();
            transaction = con.BeginTransaction();
            string storedProcName = CycleId == 0 ? (IsMappingType == "3" ? "spDownloadSUBDOrderData" : "spDownloadOrderData") : "spDownloadOrderInTextFormat";
            List<SqlParameter> sp = null;
            if (CycleId == 0)
            {
                sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@flgStatus", flgStatus),
                   new SqlParameter("@LoginId", LoginId),
                   new SqlParameter("@BranchNodeId", BranchNodeId),
                   new SqlParameter("@BranchNodeType", BranchNodeType),
                   new SqlParameter("@IsMappingType", IsMappingType)
                };
            }
            else
            {
                sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@CycleId", CycleId)
                };
            }
            ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, transaction, sp);
            transaction.Commit();
            if (IsMappingType == "1")
            {
                cntvalid = 1;
                MemoryStream ms = new MemoryStream();
                TextWriter tw = new StreamWriter(ms);
                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    tw.WriteLine(Convert.ToString(drow["PrintText"]));
                }

                tw.Flush();
                byte[] bytes = ms.ToArray();
                ms.Close();

                Response.Clear();
                Response.ContentType = "application/force-download";
                Response.AddHeader("content-disposition", "attachment;    filename=" + filename + ".txt");
                Response.BinaryWrite(bytes);
                Response.End();
            }
            else
            {
                using (XLWorkbook wb = new XLWorkbook())
                {
                    cntvalid = 1;
                    ////Start Chassiss
                    int k = 1; int j = 0; int colFreeze = 2; int colLeft = 3;
                    string strold = ""; int cntc = 0; int colst = 2; bool flgb = true;
                    int resulsetcnt = 0;
                    //foreach (DataRow drowchasiss in Ds.Tables[0].Rows)//For SheetName
                    //{
                    string strSheetName = "DailyOrders";//drowchasiss["SheetName"].ToString();
                    DataTable dt = ds.Tables[0];
                    resulsetcnt++;
                    var ws = wb.Worksheets.Add(strSheetName);
                    k = 1; j = 0; colFreeze = 2; colLeft = 3;
                    strold = ""; cntc = 0; colst = 2; flgb = true; bool flgm = false;
                    //int rowstart = 0; // for data part insertion
                    int noofsplit = 1; //Convert.ToInt16(drowchasiss["NoOfSplit"]);
                    int noofcolfreeze = 0;// Convert.ToInt16(drowchasiss["Noofcolfreeze"]);
                    for (int c = 0; c < dt.Columns.Count; c++)
                    {
                        string[] ColSpliter = dt.Columns[c].ColumnName.ToString().Split('^');
                        for (var i = 0; i < ColSpliter.Length; i++)
                        {
                            string sVal = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                            ws.Cell(k + i, j + 1).Value = sVal.Split('^')[0];
                        }
                        j++;
                    }

                    ws.Rows().AdjustToContents();
                    var rangeWithData = ws.Cell(noofsplit + 1, 1).InsertData(dt.AsEnumerable());
                    //Export the Excel file.
                    HttpContext.Current.Response.Clear();
                    HttpContext.Current.Response.Buffer = true;
                    HttpContext.Current.Response.Charset = "";
                    HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                    //Response.ContentType = "application/vnd.ms-excel";
                    HttpContext.Current.Response.AddHeader("content-disposition", "attachment;filename=" + filename + ".xls");
                    using (MemoryStream MyMemoryStream = new MemoryStream())
                    {
                        wb.SaveAs(MyMemoryStream);
                        MyMemoryStream.WriteTo(HttpContext.Current.Response.OutputStream);
                        HttpContext.Current.Response.Flush();
                        HttpContext.Current.Response.End();
                    }
                }
            }
        }
        catch (Exception ex)
        {
            transaction.Rollback();
            if (cntvalid == 0)
            {
                Response.Write(ex.Message);
            }
            // string ProjectTitle = ConfigurationManager.AppSettings["Title"];
            //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), "FrmDownload Page", "Download Page", "Error in FrmDownload Page in " + ProjectTitle);
        }
        finally
        {
            con.Dispose();
        }
    }

    public void fnDownloadBranchDailyReport(string BranchCode, string DownloadDate, string BranchNodeId, string BranchNodeType, string SiteNodeId, string SiteNodeType, string LoginId, string flgType)
    {
        string[] SkipColumn = new string[1];
        SkipColumn[0] = "flgColorStatus";
        string filename = "";
        filename = "DailyBranch_SubDWiseOrderStatus_" + Convert.ToDateTime(DownloadDate).ToString("yyyyMMdd");

        int cntvalid = 0;
        try
        {
            SqlConnection con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);

            string storedProcName = flgType == "1" ? "spDownloadTeleCallerOrderDetail" : "spDownloadTeleCallerSUBDOrderDetail";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@RouteDate", Convert.ToDateTime(DownloadDate).ToString("dd-MMM-yyyy")),
                   new SqlParameter("@BranchNodeId", BranchNodeId),
                   new SqlParameter("@BranchNodeType", BranchNodeType),
                   new SqlParameter("@SiteNodeid", SiteNodeId),
                   new SqlParameter("@SiteNodeType", SiteNodeType),
                   new SqlParameter("@LoginId", LoginId)
                };
            DataSet Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);

            using (XLWorkbook wb = new XLWorkbook())
            {
                cntvalid = 1;
                ////Start Chassiss
                int k = 1; int j = 0; int colFreeze = 2; int colLeft = 3;
                string strold = ""; int cntc = 0; int colst = 2; bool flgb = true;
                int resulsetcnt = 0;
                //foreach (DataRow drowchasiss in Ds.Tables[0].Rows)//For SheetName
                //{
                string strSheetName = flgType == "1" ? "BranchOrderStatusDetail" : "SUBDOrderStatusDetail";
                DataTable dt = Ds.Tables[resulsetcnt];
                resulsetcnt++;
                var ws = wb.Worksheets.Add(strSheetName);
                k = 1; j = 0; colFreeze = 2; colLeft = 3;
                strold = ""; cntc = 0; colst = 2; flgb = true; bool flgm = false;
                //int rowstart = 0; // for data part insertion
                int noofsplit = 2; //Convert.ToInt16(drowchasiss["NoOfSplit"]);
                int noofcolfreeze = 0;// Convert.ToInt16(drowchasiss["Noofcolfreeze"]);
                for (int c = 0; c < dt.Columns.Count - 1; c++)
                {
                    if (!SkipColumn.Contains(dt.Columns[c].ColumnName.ToString().Trim()))
                    {
                        string[] ColSpliter = dt.Columns[c].ColumnName.ToString().Split('^');


                        flgm = true;

                        for (var i = 0; i < ColSpliter.Length; i++)
                        {
                            string sVal = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                            ws.Cell(k + i, j + 1).Value = sVal.Split('^')[0];
                        }
                        for (var i = 0; i < noofsplit; i++)
                        {
                            string bgcolor = "#728cd4"; string forrecolor = "#ffffff";
                            if (i == 1)
                            {
                                bgcolor = "#a4b6e3";
                                forrecolor = "#000000";
                            }
                            ws.Cell(k + i, j + 1).Style.Fill.BackgroundColor = XLColor.FromHtml(bgcolor);
                            ws.Cell(k + i, j + 1).Style.Font.FontColor = XLColor.FromHtml(forrecolor);
                            ws.Cell(k + i, j + 1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                            ws.Cell(k + i, j + 1).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        }


                        j++;
                    }
                }

                for (var i = 0; i < noofsplit - 1; i++)
                {
                    j = 0; colst = 1; k = 1; strold = "";
                    for (int c = 0; c < dt.Columns.Count - 1; c++)
                    {
                        //if (strold != "")
                        //{
                        if (strold != dt.Columns[c].ColumnName.ToString().Split('^')[i])
                        {
                            flgb = true;
                            if (strold != "")
                            {
                                ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j)).Merge();
                            }
                            cntc = 0;
                        }
                        //}
                        if (flgb == true)
                        {
                            colst = j + 1;
                        }
                        flgb = false;
                        strold = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                        cntc++;
                        if (c == dt.Columns.Count - 1)
                        {
                            ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j + 1)).Merge();
                            cntc = 0;
                        }

                        j++;
                    }
                }


                int rowst = 0;
                for (int c = 0; c < dt.Columns.Count - 1; c++)
                {
                    strold = dt.Columns[c].ColumnName.ToString().Split('^')[0];
                    colst = 1; k = 1; flgb = false; rowst = 1;


                    for (var i = 0; i < noofsplit; i++)
                    {
                        //strold = "";                                                   
                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == true)
                        {
                            ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i, c + 1)).Merge();
                            flgb = false;
                            rowst++;
                        }

                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] == "")
                        {
                            flgb = true;
                        }

                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == false && i > 0)
                        {
                            rowst++;
                        }

                        if (i == noofsplit - 1 && flgb == true)
                        {
                            ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i + 1, c + 1)).Merge();
                        }
                    }
                }
                /**/

                ws.Rows().AdjustToContents();
                var rangeWithData = ws.Cell(noofsplit + 1, 1).InsertData(dt.AsEnumerable());

                //ws.Columns().AdjustToContents();//noofsplit + 1,  dt.Columns.Count

                IXLCell cell3 = ws.Cell(1, 1);
                IXLCell cell4 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count - 1);
                //ws.Range(ws.Cell(k, 12), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                ws.Range(ws.Cell(3, 14), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                ws.Range(ws.Cell(3, 15), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                ws.Range(ws.Cell(3, 16), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

                ws.Range(cell3, cell4).Style.Border.SetInsideBorder(XLBorderStyleValues.Thin);
                ws.Range(cell3, cell4).Style.Border.SetOutsideBorder(XLBorderStyleValues.Medium);
                ws.SheetView.FreezeRows(noofsplit);
                ws.SheetView.FreezeColumns(noofcolfreeze);
                //}
                ws.Columns().AdjustToContents();
                ws.Rows().AdjustToContents();
                ws.Range(1, 1, 1, dt.Columns.Count).Style.Alignment.WrapText = true;
                ws.Column(dt.Columns.Count).Delete();


                //Export the Excel file.
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.Buffer = true;
                HttpContext.Current.Response.Charset = "";
                HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                //Response.ContentType = "application/vnd.ms-excel";
                HttpContext.Current.Response.AddHeader("content-disposition", "attachment;filename=" + filename + ".xlsx");
                using (MemoryStream MyMemoryStream = new MemoryStream())
                {
                    wb.SaveAs(MyMemoryStream);
                    MyMemoryStream.WriteTo(HttpContext.Current.Response.OutputStream);
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.Response.End();
                }
            }
        }
        catch (Exception ex)
        {
            if (cntvalid == 0)
            {
                Response.Write("Error:" + ex.Message);
            }

            // string ProjectTitle = ConfigurationManager.AppSettings["Title"];
            //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), "FrmDownload Page", "Download Page", "Error in FrmDownload Page in " + ProjectTitle);
        }
        finally
        {
        }
    }
    public void fnDownloadDailyReportTelecallerWise(string LoginId, string sDate, string eDate, string sitenodeid, string sitenodetype, string SellerType, string TeleReasonIds)
    {
        string[] SkipColumn = new string[0];
        string filename = "";
        int cntvalid = 0;
        filename = "RptDailyOrderStatus_" + Convert.ToDateTime(sDate).ToString("yyyyMMdd");


        try
        {
            SqlConnection con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);

            string storedProcName = SellerType == "1" ? "spRptDailyOrderStatusTelecallerWise" : "spRptDailyOrderStatusTelecallerWise_DSE";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@FromDate", sDate),
                   new SqlParameter("@ToDate", eDate),
                   new SqlParameter("@SiteNodeId", sitenodeid),
                   new SqlParameter("@SiteNodeType", sitenodetype),
                   new SqlParameter("@TeleReasonIds", TeleReasonIds),
                   new SqlParameter("@LoginId", LoginId),
                };
            DataSet Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);

            using (XLWorkbook wb = new XLWorkbook())
            {
                cntvalid = 1;
                ////Start Chassiss
                int k = 1; int j = 0; int colFreeze = 2; int colLeft = 3;
                string strold = ""; int cntc = 0; int colst = 2; bool flgb = true;
                int resulsetcnt = 0;
                //foreach (DataRow drowchasiss in Ds.Tables[0].Rows)//For SheetName
                //{
                string strSheetName = "BranchOrderStatus";//drowchasiss["SheetName"].ToString();
                DataTable dt = Ds.Tables[resulsetcnt];
                resulsetcnt++;
                var ws = wb.Worksheets.Add(strSheetName);
                k = 1; j = 0; colFreeze = 2; colLeft = 3;
                strold = ""; cntc = 0; colst = 2; flgb = true; bool flgm = false;
                //int rowstart = 0; // for data part insertion
                int noofsplit = 1; //Convert.ToInt16(drowchasiss["NoOfSplit"]);
                int noofcolfreeze = 1;// Convert.ToInt16(drowchasiss["Noofcolfreeze"]);
                for (int c = 0; c < dt.Columns.Count; c++)
                {
                    if (!SkipColumn.Contains(dt.Columns[c].ColumnName.ToString().Trim()))
                    {
                        string[] ColSpliter = dt.Columns[c].ColumnName.ToString().Split('^');


                        flgm = true;

                        for (var i = 0; i < ColSpliter.Length; i++)
                        {
                            string sVal = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                            ws.Cell(k + i, j + 1).Value = sVal.Split('^')[0];
                        }
                        for (var i = 0; i < noofsplit; i++)
                        {
                            string bgcolor = "#728cd4"; string forrecolor = "#ffffff";
                            if (i == 1)
                            {
                                bgcolor = "#a4b6e3";
                                forrecolor = "#000000";
                            }
                            ws.Cell(k + i, j + 1).Style.Fill.BackgroundColor = XLColor.FromHtml(bgcolor);
                            ws.Cell(k + i, j + 1).Style.Font.FontColor = XLColor.FromHtml(forrecolor);
                            ws.Cell(k + i, j + 1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                            ws.Cell(k + i, j + 1).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        }


                        j++;
                    }
                }

                for (var i = 0; i < noofsplit - 1; i++)
                {
                    j = 0; colst = 1; k = 1; strold = "";
                    for (int c = 0; c < dt.Columns.Count; c++)
                    {
                        //if (strold != "")
                        //{
                        if (strold != dt.Columns[c].ColumnName.ToString().Split('^')[i])
                        {
                            flgb = true;
                            if (strold != "")
                            {
                                ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j)).Merge();
                            }
                            cntc = 0;
                        }
                        //}
                        if (flgb == true)
                        {
                            colst = j + 1;
                        }
                        flgb = false;
                        strold = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                        cntc++;
                        if (c == dt.Columns.Count - 1)
                        {
                            ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j + 1)).Merge();
                            cntc = 0;
                        }

                        j++;
                    }
                }


                int rowst = 0;
                for (int c = 0; c < dt.Columns.Count; c++)
                {
                    strold = dt.Columns[c].ColumnName.ToString().Split('^')[0];
                    colst = 1; k = 1; flgb = false; rowst = 1;


                    for (var i = 0; i < noofsplit; i++)
                    {
                        //strold = "";                                                   
                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == true)
                        {
                            ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i, c + 1)).Merge();
                            flgb = false;
                            rowst++;
                        }

                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] == "")
                        {
                            flgb = true;
                        }

                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == false && i > 0)
                        {
                            rowst++;
                        }

                        if (i == noofsplit - 1 && flgb == true)
                        {
                            ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i + 1, c + 1)).Merge();
                        }
                    }
                }
                /**/

                ws.Rows().AdjustToContents();
                var rangeWithData = ws.Cell(noofsplit + 1, 1).InsertData(dt.AsEnumerable());

                //ws.Columns().AdjustToContents();//noofsplit + 1,  dt.Columns.Count

                IXLCell cell3 = ws.Cell(1, 1);
                IXLCell cell4 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);
                ws.Range(ws.Cell(k, 2), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                ws.Range(ws.Cell(k, 8), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);
                ws.Range(ws.Cell(k, 9), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);
                ws.Range(ws.Cell(k, 10), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                ws.Range(ws.Cell(k, 11), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                ws.Range(ws.Cell(k, 12), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                ws.Range(ws.Cell(k, 13), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);
                ws.Range(cell3, cell4).Style.Border.SetInsideBorder(XLBorderStyleValues.Thin);
                ws.Range(cell3, cell4).Style.Border.SetOutsideBorder(XLBorderStyleValues.Medium);

                ws.Range(ws.Cell(dt.Rows.Count + 1, 1), cell4).Style.Fill.BackgroundColor = XLColor.FromHtml("#d6d6d6");
                ws.Range(ws.Cell(dt.Rows.Count + 1, 1), cell4).Style.Font.FontColor = XLColor.FromHtml("#000000");
                ws.SheetView.FreezeRows(noofsplit);
                ws.SheetView.FreezeColumns(noofcolfreeze);
                //}
                ws.Columns().AdjustToContents();
                ws.Rows().AdjustToContents();
                ws.Range(1, 1, 1, dt.Columns.Count).Style.Alignment.WrapText = true;
                ws.Cell(dt.Rows.Count + 1, 1).Value = "";
                //ws.Column(1).Delete();


                //Export the Excel file.
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.Buffer = true;
                HttpContext.Current.Response.Charset = "";
                HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                //Response.ContentType = "application/vnd.ms-excel";
                HttpContext.Current.Response.AddHeader("content-disposition", "attachment;filename=" + filename + ".xlsx");
                using (MemoryStream MyMemoryStream = new MemoryStream())
                {
                    wb.SaveAs(MyMemoryStream);
                    MyMemoryStream.WriteTo(HttpContext.Current.Response.OutputStream);
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.Response.End();
                }
            }
        }
        catch (Exception ex)
        {
            if (cntvalid == 0)
            {
                Response.Write(ex.Message);
            }
            // string ProjectTitle = ConfigurationManager.AppSettings["Title"];
            //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), "FrmDownload Page", "Download Page", "Error in FrmDownload Page in " + ProjectTitle);
        }
        finally
        {
        }
    }

    public void fnDownloadBranchAttendance(string BranchCode, string DownloadDate, string BranchNodeId, string BranchNodeType, string SiteNodeId, string SiteNodeType, string flgType)
    {
        string[] SkipColumn = new string[1];
        SkipColumn[0] = "flgColorStatus";
        string filename = "";
        int cntvalid = 0;
        filename = (flgType == "1" ? "BranchAttendance_" : "SUBDAttendance_") + Convert.ToDateTime(DownloadDate).ToString("yyyyMMdd");


        string nodeid = "0";
        string nodetype = "0";
        if (BranchNodeId == "0" && BranchNodeType == "0")
        {
            nodeid = SiteNodeId;
            nodetype = SiteNodeType;
        }
        else
        {
            nodeid = BranchNodeId;
            nodetype = BranchNodeType;
        }

        try
        {
            SqlConnection con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);

            string storedProcName = flgType == "1" ? "spRptSubmitBranchAttendanceList" : "spRptSubmitSUBDAttendanceList";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@AttDate", Convert.ToDateTime(DownloadDate).ToString("dd-MMM-yyyy")),
                   new SqlParameter("@NodeId", nodeid),
                   new SqlParameter("@NodeType", nodetype)

                };
            DataSet Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);

            using (XLWorkbook wb = new XLWorkbook())
            {
                cntvalid = 1;
                ////Start Chassiss
                int k = 1; int j = 0; int colFreeze = 2; int colLeft = 3;
                string strold = ""; int cntc = 0; int colst = 2; bool flgb = true;
                int resulsetcnt = 0;
                //foreach (DataRow drowchasiss in Ds.Tables[0].Rows)//For SheetName
                //{
                string strSheetName = "BranchAttendance";//drowchasiss["SheetName"].ToString();
                DataTable dt = Ds.Tables[resulsetcnt];
                resulsetcnt++;
                var ws = wb.Worksheets.Add(strSheetName);
                k = 1; j = 0; colFreeze = 2; colLeft = 3;
                strold = ""; cntc = 0; colst = 2; flgb = true; bool flgm = false;
                //int rowstart = 0; // for data part insertion
                int noofsplit = 1; //Convert.ToInt16(drowchasiss["NoOfSplit"]);
                int noofcolfreeze = 0;// Convert.ToInt16(drowchasiss["Noofcolfreeze"]);
                for (int c = 0; c < dt.Columns.Count; c++)
                {
                    if (!SkipColumn.Contains(dt.Columns[c].ColumnName.ToString().Trim()))
                    {
                        string[] ColSpliter = dt.Columns[c].ColumnName.ToString().Split('^');


                        flgm = true;

                        for (var i = 0; i < ColSpliter.Length; i++)
                        {
                            string sVal = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                            ws.Cell(k + i, j + 1).Value = sVal.Split('^')[0];
                        }
                        for (var i = 0; i < noofsplit; i++)
                        {
                            string bgcolor = "#728cd4"; string forrecolor = "#ffffff";
                            //if (i == 1)
                            //{
                            //    bgcolor = "#a4b6e3";
                            //    forrecolor = "#000000";
                            //}
                            ws.Cell(k + i, j + 1).Style.Fill.BackgroundColor = XLColor.FromHtml(bgcolor);
                            ws.Cell(k + i, j + 1).Style.Font.FontColor = XLColor.FromHtml(forrecolor);
                            ws.Cell(k + i, j + 1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                            ws.Cell(k + i, j + 1).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        }


                        j++;
                    }
                }

                for (var i = 0; i < noofsplit - 1; i++)
                {
                    j = 0; colst = 1; k = 1; strold = "";
                    for (int c = 0; c < dt.Columns.Count; c++)
                    {
                        //if (strold != "")
                        //{
                        if (strold != dt.Columns[c].ColumnName.ToString().Split('^')[i])
                        {
                            flgb = true;
                            if (strold != "")
                            {
                                ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j)).Merge();
                            }
                            cntc = 0;
                        }
                        //}
                        if (flgb == true)
                        {
                            colst = j + 1;
                        }
                        flgb = false;
                        strold = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                        cntc++;
                        if (c == dt.Columns.Count - 1)
                        {
                            ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j + 1)).Merge();
                            cntc = 0;
                        }

                        j++;
                    }
                }


                int rowst = 0;
                for (int c = 0; c < dt.Columns.Count; c++)
                {
                    strold = dt.Columns[c].ColumnName.ToString().Split('^')[0];
                    colst = 1; k = 1; flgb = false; rowst = 1;


                    for (var i = 0; i < noofsplit; i++)
                    {
                        //strold = "";                                                   
                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == true)
                        {
                            ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i, c + 1)).Merge();
                            flgb = false;
                            rowst++;
                        }

                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] == "")
                        {
                            flgb = true;
                        }

                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == false && i > 0)
                        {
                            rowst++;
                        }

                        if (i == noofsplit - 1 && flgb == true)
                        {
                            ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i + 1, c + 1)).Merge();
                        }
                    }
                }
                /**/

                ws.Rows().AdjustToContents();
                var rangeWithData = ws.Cell(noofsplit + 1, 1).InsertData(dt.AsEnumerable());

                //ws.Columns().AdjustToContents();//noofsplit + 1,  dt.Columns.Count

                IXLCell cell3 = ws.Cell(1, 1);
                IXLCell cell4 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);
                //ws.Range(ws.Cell(k, 12), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                ws.Range(ws.Cell(3, 14), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                ws.Range(ws.Cell(3, 15), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                ws.Range(ws.Cell(3, 16), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

                ws.Range(cell3, cell4).Style.Border.SetInsideBorder(XLBorderStyleValues.Thin);
                ws.Range(cell3, cell4).Style.Border.SetOutsideBorder(XLBorderStyleValues.Medium);
                ws.SheetView.FreezeRows(noofsplit);
                ws.SheetView.FreezeColumns(noofcolfreeze);
                //}
                ws.Columns().AdjustToContents();
                ws.Rows().AdjustToContents();
                ws.Range(1, 1, 1, dt.Columns.Count).Style.Alignment.WrapText = true;
                //ws.Column(dt.Columns.Count).Delete();


                //Export the Excel file.
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.Buffer = true;
                HttpContext.Current.Response.Charset = "";
                HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                //Response.ContentType = "application/vnd.ms-excel";
                HttpContext.Current.Response.AddHeader("content-disposition", "attachment;filename=" + filename + ".xlsx");
                using (MemoryStream MyMemoryStream = new MemoryStream())
                {
                    wb.SaveAs(MyMemoryStream);
                    MyMemoryStream.WriteTo(HttpContext.Current.Response.OutputStream);
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.Response.End();
                }
            }
        }
        catch (Exception ex)
        {
            if (cntvalid == 0)
            {
                Response.Write("Error:" + ex.Message);
            }
            // string ProjectTitle = ConfigurationManager.AppSettings["Title"];
            //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), "FrmDownload Page", "Download Page", "Error in FrmDownload Page in " + ProjectTitle);
        }
        finally
        {
        }
    }

    //fnRptSiteWiseCurrentSBFData

    public void fnRptSiteWiseCurrentSBFData(string SiteName, string SiteNodeId, string SiteNodeType)
    {
        string[] SkipColumn = new string[1];
        SkipColumn[0] = "flgColorStatus";
        string filename = "";
        int cntvalid = 0;
        filename = "ActiveSBFData_" + DateTime.Now.ToString("yyyyMMdd");

        try
        {
            SqlConnection con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);

            string storedProcName = "spDownloadActiveSBFList";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@SiteNodeId", SiteNodeId),
                   new SqlParameter("@SiteNodeType", SiteNodeType)

                };
            DataSet Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);

            using (XLWorkbook wb = new XLWorkbook())
            {
                cntvalid = 1;
                ////Start Chassiss
                int k = 1; int j = 0; int colFreeze = 2; int colLeft = 3;
                string strold = ""; int cntc = 0; int colst = 2; bool flgb = true;
                int resulsetcnt = 0;
                string strSheetName = "CurrentSBF";//drowchasiss["SheetName"].ToString();
                DataTable dt = Ds.Tables[resulsetcnt];
                resulsetcnt++;
                var ws = wb.Worksheets.Add(strSheetName);
                k = 1; j = 0; colFreeze = 2; colLeft = 3;
                strold = ""; cntc = 0; colst = 2; flgb = true; bool flgm = false;
                //int rowstart = 0; // for data part insertion
                int noofsplit = 1; //Convert.ToInt16(drowchasiss["NoOfSplit"]);
                int noofcolfreeze = 0;// Convert.ToInt16(drowchasiss["Noofcolfreeze"]);
                for (int c = 0; c < dt.Columns.Count; c++)
                {
                    if (!SkipColumn.Contains(dt.Columns[c].ColumnName.ToString().Trim()))
                    {
                        string[] ColSpliter = dt.Columns[c].ColumnName.ToString().Split('^');


                        flgm = true;

                        for (var i = 0; i < ColSpliter.Length; i++)
                        {
                            string sVal = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                            ws.Cell(k + i, j + 1).Value = sVal.Split('^')[0];
                        }
                        for (var i = 0; i < noofsplit; i++)
                        {
                            string bgcolor = "#728cd4"; string forrecolor = "#ffffff";
                            //if (i == 1)
                            //{
                            //    bgcolor = "#a4b6e3";
                            //    forrecolor = "#000000";
                            //}
                            ws.Cell(k + i, j + 1).Style.Fill.BackgroundColor = XLColor.FromHtml(bgcolor);
                            ws.Cell(k + i, j + 1).Style.Font.FontColor = XLColor.FromHtml(forrecolor);
                            ws.Cell(k + i, j + 1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                            ws.Cell(k + i, j + 1).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        }


                        j++;
                    }
                }

                for (var i = 0; i < noofsplit - 1; i++)
                {
                    j = 0; colst = 1; k = 1; strold = "";
                    for (int c = 0; c < dt.Columns.Count; c++)
                    {
                        //if (strold != "")
                        //{
                        if (strold != dt.Columns[c].ColumnName.ToString().Split('^')[i])
                        {
                            flgb = true;
                            if (strold != "")
                            {
                                ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j)).Merge();
                            }
                            cntc = 0;
                        }
                        //}
                        if (flgb == true)
                        {
                            colst = j + 1;
                        }
                        flgb = false;
                        strold = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                        cntc++;
                        if (c == dt.Columns.Count - 1)
                        {
                            ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j + 1)).Merge();
                            cntc = 0;
                        }

                        j++;
                    }
                }


                int rowst = 0;
                for (int c = 0; c < dt.Columns.Count; c++)
                {
                    strold = dt.Columns[c].ColumnName.ToString().Split('^')[0];
                    colst = 1; k = 1; flgb = false; rowst = 1;


                    for (var i = 0; i < noofsplit; i++)
                    {
                        //strold = "";                                                   
                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == true)
                        {
                            ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i, c + 1)).Merge();
                            flgb = false;
                            rowst++;
                        }

                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] == "")
                        {
                            flgb = true;
                        }

                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == false && i > 0)
                        {
                            rowst++;
                        }

                        if (i == noofsplit - 1 && flgb == true)
                        {
                            ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i + 1, c + 1)).Merge();
                        }
                    }
                }
                /**/

                ws.Rows().AdjustToContents();
                var rangeWithData = ws.Cell(noofsplit + 1, 1).InsertData(dt.AsEnumerable());

                //ws.Columns().AdjustToContents();//noofsplit + 1,  dt.Columns.Count

                IXLCell cell3 = ws.Cell(1, 1);
                IXLCell cell4 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);
                //ws.Range(ws.Cell(k, 12), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                ws.Range(ws.Cell(3, 14), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                ws.Range(ws.Cell(3, 15), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                ws.Range(ws.Cell(3, 16), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

                ws.Range(cell3, cell4).Style.Border.SetInsideBorder(XLBorderStyleValues.Thin);
                ws.Range(cell3, cell4).Style.Border.SetOutsideBorder(XLBorderStyleValues.Medium);
                ws.SheetView.FreezeRows(noofsplit);
                ws.SheetView.FreezeColumns(noofcolfreeze);
                ws.Columns().AdjustToContents();
                ws.Rows().AdjustToContents();
                ws.Range(1, 1, 1, dt.Columns.Count).Style.Alignment.WrapText = true;
                //ws.Column(dt.Columns.Count).Delete();


                //Export the Excel file.
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.Buffer = true;
                HttpContext.Current.Response.Charset = "";
                HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                //Response.ContentType = "application/vnd.ms-excel";
                HttpContext.Current.Response.AddHeader("content-disposition", "attachment;filename=" + filename + ".xlsx");
                using (MemoryStream MyMemoryStream = new MemoryStream())
                {
                    wb.SaveAs(MyMemoryStream);
                    MyMemoryStream.WriteTo(HttpContext.Current.Response.OutputStream);
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.Response.End();
                }
            }
        }
        catch (Exception ex)
        {
            if (cntvalid == 0)
            {
                Response.Write("Error:" + ex.Message);
            }
            // string ProjectTitle = ConfigurationManager.AppSettings["Title"];
            //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), "FrmDownload Page", "Download Page", "Error in FrmDownload Page in " + ProjectTitle);
        }
        finally
        {
        }
    }
    public void fnRptSiteWiseSBFData(string SiteName, string SiteNodeId, string SiteNodeType)
    {
        string[] SkipColumn = new string[1];
        SkipColumn[0] = "flgColorStatus";
        string filename = "";
        int cntvalid = 0;
        filename = SiteName + "_CurrentSBFData_" + DateTime.Now.ToString("yyyyMMdd");

        try
        {
            SqlConnection con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);

            string storedProcName = "spRptSiteWiseSBFData";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@SiteNodeId", SiteNodeId),
                   new SqlParameter("@SiteNodeType", SiteNodeType)

                };
            DataSet Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);

            using (XLWorkbook wb = new XLWorkbook())
            {
                cntvalid = 1;
                ////Start Chassiss
                int k = 1; int j = 0; int colFreeze = 2; int colLeft = 3;
                string strold = ""; int cntc = 0; int colst = 2; bool flgb = true;
                int resulsetcnt = 0;
                string strSheetName = "CurrentSBF";//drowchasiss["SheetName"].ToString();
                DataTable dt = Ds.Tables[resulsetcnt];
                resulsetcnt++;
                var ws = wb.Worksheets.Add(strSheetName);
                k = 1; j = 0; colFreeze = 2; colLeft = 3;
                strold = ""; cntc = 0; colst = 2; flgb = true; bool flgm = false;
                //int rowstart = 0; // for data part insertion
                int noofsplit = 1; //Convert.ToInt16(drowchasiss["NoOfSplit"]);
                int noofcolfreeze = 0;// Convert.ToInt16(drowchasiss["Noofcolfreeze"]);
                for (int c = 0; c < dt.Columns.Count; c++)
                {
                    if (!SkipColumn.Contains(dt.Columns[c].ColumnName.ToString().Trim()))
                    {
                        string[] ColSpliter = dt.Columns[c].ColumnName.ToString().Split('^');


                        flgm = true;

                        for (var i = 0; i < ColSpliter.Length; i++)
                        {
                            string sVal = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                            ws.Cell(k + i, j + 1).Value = sVal.Split('^')[0];
                        }
                        for (var i = 0; i < noofsplit; i++)
                        {
                            string bgcolor = "#728cd4"; string forrecolor = "#ffffff";
                            //if (i == 1)
                            //{
                            //    bgcolor = "#a4b6e3";
                            //    forrecolor = "#000000";
                            //}
                            ws.Cell(k + i, j + 1).Style.Fill.BackgroundColor = XLColor.FromHtml(bgcolor);
                            ws.Cell(k + i, j + 1).Style.Font.FontColor = XLColor.FromHtml(forrecolor);
                            ws.Cell(k + i, j + 1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                            ws.Cell(k + i, j + 1).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        }


                        j++;
                    }
                }

                for (var i = 0; i < noofsplit - 1; i++)
                {
                    j = 0; colst = 1; k = 1; strold = "";
                    for (int c = 0; c < dt.Columns.Count; c++)
                    {
                        //if (strold != "")
                        //{
                        if (strold != dt.Columns[c].ColumnName.ToString().Split('^')[i])
                        {
                            flgb = true;
                            if (strold != "")
                            {
                                ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j)).Merge();
                            }
                            cntc = 0;
                        }
                        //}
                        if (flgb == true)
                        {
                            colst = j + 1;
                        }
                        flgb = false;
                        strold = dt.Columns[c].ColumnName.ToString().Split('^')[i];
                        cntc++;
                        if (c == dt.Columns.Count - 1)
                        {
                            ws.Range(ws.Cell(k + i, colst), ws.Cell(k + i, j + 1)).Merge();
                            cntc = 0;
                        }

                        j++;
                    }
                }


                int rowst = 0;
                for (int c = 0; c < dt.Columns.Count; c++)
                {
                    strold = dt.Columns[c].ColumnName.ToString().Split('^')[0];
                    colst = 1; k = 1; flgb = false; rowst = 1;


                    for (var i = 0; i < noofsplit; i++)
                    {
                        //strold = "";                                                   
                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == true)
                        {
                            ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i, c + 1)).Merge();
                            flgb = false;
                            rowst++;
                        }

                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] == "")
                        {
                            flgb = true;
                        }

                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == false && i > 0)
                        {
                            rowst++;
                        }

                        if (i == noofsplit - 1 && flgb == true)
                        {
                            ws.Range(ws.Cell(rowst, c + 1), ws.Cell(i + 1, c + 1)).Merge();
                        }
                    }
                }
                /**/

                ws.Rows().AdjustToContents();
                var rangeWithData = ws.Cell(noofsplit + 1, 1).InsertData(dt.AsEnumerable());

                //ws.Columns().AdjustToContents();//noofsplit + 1,  dt.Columns.Count

                IXLCell cell3 = ws.Cell(1, 1);
                IXLCell cell4 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);
                //ws.Range(ws.Cell(k, 12), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                ws.Range(ws.Cell(3, 14), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                ws.Range(ws.Cell(3, 15), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                ws.Range(ws.Cell(3, 16), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

                ws.Range(cell3, cell4).Style.Border.SetInsideBorder(XLBorderStyleValues.Thin);
                ws.Range(cell3, cell4).Style.Border.SetOutsideBorder(XLBorderStyleValues.Medium);
                ws.SheetView.FreezeRows(noofsplit);
                ws.SheetView.FreezeColumns(noofcolfreeze);
                ws.Columns().AdjustToContents();
                ws.Rows().AdjustToContents();
                ws.Range(1, 1, 1, dt.Columns.Count).Style.Alignment.WrapText = true;
                //ws.Column(dt.Columns.Count).Delete();


                //Export the Excel file.
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.Buffer = true;
                HttpContext.Current.Response.Charset = "";
                HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                //Response.ContentType = "application/vnd.ms-excel";
                HttpContext.Current.Response.AddHeader("content-disposition", "attachment;filename=" + filename + ".xlsx");
                using (MemoryStream MyMemoryStream = new MemoryStream())
                {
                    wb.SaveAs(MyMemoryStream);
                    MyMemoryStream.WriteTo(HttpContext.Current.Response.OutputStream);
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.Response.End();
                }
            }
        }
        catch (Exception ex)
        {
            if (cntvalid == 0)
            {
                Response.Write("Error:" + ex.Message);
            }
            // string ProjectTitle = ConfigurationManager.AppSettings["Title"];
            //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), "FrmDownload Page", "Download Page", "Error in FrmDownload Page in " + ProjectTitle);
        }
        finally
        {
        }
    }

    public void fnDownloadSiteTelecallerPerformance_GP(string FromDate, string Todate)
    {
        string filename = "";
        filename = "SiteTelecallerPerformance_GP_" + FromDate + " To " + Todate;
        string stresponseMeasure = "";
        int cntvalid = 0;
        try
        {
            if (Session["DsRptPerfomanceOverView_GP"] != null)
            {

                DataSet Ds = (DataSet)Session["DsRptPerfomanceOverView_GP"];
                StringBuilder str = new StringBuilder();
                if (Ds.Tables[0].Rows.Count > 0)
                {
                    cntvalid = 1;
                    string statusTimeText = "";
                    if (Convert.ToDateTime(FromDate).Date < DateTime.Now.Date)
                    {
                        statusTimeText = "Status as on " + Convert.ToDateTime(FromDate).ToString("dd-MMM-yyyy");
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
                        if (sColumnName == "Total\\TAS Site\\Branch")
                        {
                            ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;padding:3px 2px 3px 2px;width:25%'";
                        }
                        else
                        {
                            sColumn = sColumnName.Split('^')[0];
                            string sColorFlag = sColumnName.Split('^')[1];
                            string bgcolColor = "background-color:#008040;";
                            if (sColorFlag == "2")
                            {
                                bgcolColor = "background-color:#b8af82;";
                            }
                            else if (sColorFlag == "3")
                            {
                                bgcolColor = "background-color:#8787c2;";
                            }
                            ss = "style='" + bgcolColor + ";color:#ffffff;vertical-align:middle;text-align:center;padding:3px 2px 3px 2px;'";
                        }

                        str.Append("<th " + ss + ">" + sColumn + "</th>");
                    }
                    str.Append("</tr></thead><tbody>");

                    foreach (DataRow dr in Ds.Tables[1].Rows)
                    {
                        int Lvl = Convert.ToInt32(dr["Lvl"]);
                        string ss1 = "padding:2px;";
                        string bgvolor = "";
                        if (Lvl == 2)
                        {
                            ss1 = "padding:2px 2px 2px 10px";
                            bgvolor = ";background-color:#dbdbdb;border:1px solid #ffffff;font-size:9pt;";
                        }
                        if (Lvl == 1)
                        {
                            ss1 = "padding:2px 2px 2px 2px;";
                            bgvolor = ";background-color:#c9c9c9;border:1px solid #ffffff;color:#000;font-size:10.5pt;";
                        }

                        int NodeId = Convert.ToInt32(dr["NodeId"]);
                        int NodeType = Convert.ToInt32(dr["NodeType"]);
                        str.Append("<tr  lvl='" + (Lvl == 1 ? 0 : 1) + "' nodeid='" + dr["NodeId"] + "' nodetype='" + dr["NodeType"] + "' pnodeid='" + dr["PNodeId"] + "' pnodetype='" + dr["PNodeType"] + "'>");
                        int cntimg = 0;
                        for (int j = 0; j < Ds.Tables[1].Columns.Count; j++)
                        {
                            string sColumnName = Ds.Tables[1].Columns[j].ColumnName;
                            if (SkipColumn.Contains(sColumnName))
                            {
                                continue;
                            }
                            var sdata = dr[j].ToString();

                            string sColumn = sColumnName;
                            if (sColumnName == "Total\\TAS Site\\Branch")
                            {
                                ss = "vertical-align:middle;text-align:left;" + bgvolor;
                            }
                            else
                            {
                                ss = "vertical-align:middle;text-align:right;" + bgvolor;
                            }
                            str.Append("<td style='" + ss + ss1 + ";height:18px;'>" + sdata + "</td>");
                            ss1 = "padding:2px 2px 2px 2px";
                            cntimg = 1;
                        }
                        str.Append("</tr>");
                        DataRow[] drow = Ds.Tables[2].Select("PNodeId=" + NodeId + " and PNodeType=" + NodeType);
                        if (drow.Count() > 0)
                        {
                            str.Append(clsCreateHTML.createSubTbl(drow.CopyToDataTable(), SkipColumn, "", 1));
                        }
                    }
                    str.Append("</tbody></table>");
                    HttpContext.Current.Response.Clear();
                    HttpContext.Current.Response.Buffer = true;
                    HttpContext.Current.Response.AddHeader("content-disposition", "attachment;filename=" + filename + ".xls");
                    HttpContext.Current.Response.Charset = "";
                    HttpContext.Current.Response.ContentType = "application/vnd.ms-excel";
                    HttpContext.Current.Response.Output.Write(str.ToString());
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.Response.End();
                }
                else
                {
                    HttpContext.Current.Response.Write("No Record Found");
                }
            }
            else
            {
                HttpContext.Current.Response.Write("No Record Found");
            }


        }
        catch (Exception ex)
        {
            if (cntvalid == 0)
            {
                Response.Write("Error:" + ex.Message);
            }
        }

    }

    public void fnDownloadSiteTelecallerPerformance(string FromDate, string Todate)
    {
        string filename = "";
        filename = "SiteTelecallerPerformance_" + FromDate + " To " + Todate;
        string stresponseMeasure = "";
        int cntvalid = 0;
        try
        {
            if (Session["DsRptPerfomanceOverView"] != null)
            {

                DataSet Ds = (DataSet)Session["DsRptPerfomanceOverView"];
                StringBuilder str = new StringBuilder();
                if (Ds.Tables[0].Rows.Count > 0)
                {
                    cntvalid = 1;
                    string statusTimeText = "";
                    if (Convert.ToDateTime(FromDate).Date < DateTime.Now.Date)
                    {
                        statusTimeText = "Status as on " + Convert.ToDateTime(FromDate).ToString("dd-MMM-yyyy");
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
                        if (sColumnName == "Total\\TAS Site\\Branch")
                        {
                            ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;padding:3px 2px 3px 2px;width:25%'";
                        }
                        else
                        {
                            sColumn = sColumnName.Split('^')[0];
                            string sColorFlag = sColumnName.Split('^')[1];
                            string bgcolColor = "background-color:#008040;";
                            if (sColorFlag == "2")
                            {
                                bgcolColor = "background-color:#b8af82;";
                            }
                            else if (sColorFlag == "3")
                            {
                                bgcolColor = "background-color:#8787c2;";
                            }
                            ss = "style='" + bgcolColor + ";color:#ffffff;vertical-align:middle;text-align:center;padding:3px 2px 3px 2px;'";
                        }

                        str.Append("<th " + ss + ">" + sColumn + "</th>");
                    }
                    str.Append("</tr></thead><tbody>");

                    foreach (DataRow dr in Ds.Tables[1].Rows)
                    {
                        int Lvl = Convert.ToInt32(dr["Lvl"]);
                        string ss1 = "padding:2px;";
                        string bgvolor = "";
                        if (Lvl == 2)
                        {
                            ss1 = "padding:2px 2px 2px 10px";
                            bgvolor = ";background-color:#dbdbdb;border:1px solid #ffffff;font-size:9pt;";
                        }
                        if (Lvl == 1)
                        {
                            ss1 = "padding:2px 2px 2px 2px;";
                            bgvolor = ";background-color:#c9c9c9;border:1px solid #ffffff;color:#000;font-size:10.5pt;";
                        }

                        int NodeId = Convert.ToInt32(dr["NodeId"]);
                        int NodeType = Convert.ToInt32(dr["NodeType"]);
                        str.Append("<tr  lvl='" + (Lvl == 1 ? 0 : 1) + "' nodeid='" + dr["NodeId"] + "' nodetype='" + dr["NodeType"] + "' pnodeid='" + dr["PNodeId"] + "' pnodetype='" + dr["PNodeType"] + "'>");
                        int cntimg = 0;
                        for (int j = 0; j < Ds.Tables[1].Columns.Count; j++)
                        {
                            string sColumnName = Ds.Tables[1].Columns[j].ColumnName;
                            if (SkipColumn.Contains(sColumnName))
                            {
                                continue;
                            }
                            var sdata = dr[j].ToString();

                            string sColumn = sColumnName;
                            if (sColumnName == "Total\\TAS Site\\Branch")
                            {
                                ss = "vertical-align:middle;text-align:left;" + bgvolor;
                            }
                            else
                            {
                                ss = "vertical-align:middle;text-align:right;" + bgvolor;
                            }
                            str.Append("<td style='" + ss + ss1 + ";height:18px;'>" + sdata + "</td>");
                            ss1 = "padding:2px 2px 2px 2px";
                            cntimg = 1;
                        }
                        str.Append("</tr>");
                        DataRow[] drow = Ds.Tables[2].Select("PNodeId=" + NodeId + " and PNodeType=" + NodeType);
                        if (drow.Count() > 0)
                        {
                            str.Append(clsCreateHTML.createSubTbl(drow.CopyToDataTable(), SkipColumn, "", 1));
                        }
                    }
                    str.Append("</tbody></table>");
                    HttpContext.Current.Response.Clear();
                    HttpContext.Current.Response.Buffer = true;
                    HttpContext.Current.Response.AddHeader("content-disposition", "attachment;filename=" + filename + ".xls");
                    HttpContext.Current.Response.Charset = "";
                    HttpContext.Current.Response.ContentType = "application/vnd.ms-excel";
                    HttpContext.Current.Response.Output.Write(str.ToString());
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.Response.End();
                }
                else
                {
                    HttpContext.Current.Response.Write("No Record Found");
                }
            }
            else
            {
                HttpContext.Current.Response.Write("No Record Found");
            }


        }
        catch (Exception ex)
        {
            if (cntvalid == 0)
            {
                Response.Write("Error:" + ex.Message);
            }
        }

    }

    public static string fnCreateHTML(DataSet Ds, int flgexcel)
    {
        StringBuilder str = new StringBuilder();
        if (Ds.Tables[0].Rows.Count > 0)
        {
            str.Append("<table cellpadding='0' cellspacing= '0' style='font-size:11px;width:100%; border-bottom:1px solid gray;' id='tblBasicDetailsInfo' >");
            str.Append("<thead><tr>");

            for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
            {
                str.Append("<th style='border-top:1px solid gray;border-bottom:1px solid gray;background-color: #23AED8;color: white;font-weight: bold;'>" + Ds.Tables[0].Columns[j].ColumnName + "</th>");
            }
            str.Append("</tr></thead><tbody>");
            for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
            {
                str.Append("<tr >");

                for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                {

                    var sData = Ds.Tables[0].Rows[i][j];
                    string sAlign = "left";
                    if (sData.GetType() == typeof(int))
                    {
                        sAlign = "center";
                    }
                    else if (sData.GetType() == typeof(decimal))
                    {
                        sAlign = "right";
                    }
                    str.Append("<td style='text-align:" + sAlign + ";border-top:1px solid gray;border-bottom:1px solid gray;'>" + sData + "</td>");
                }

                str.Append("</tr>");
            }
            str.Append("</tbody></table>");
        }
        return str.ToString();
    }
}