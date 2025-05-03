using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Data;
using ClosedXML.Excel;
using System.Data.SqlClient;
using System.Configuration;
using System.Text;
using Newtonsoft.Json;
using System.Net.Mail;

public partial class frmInit_UploadInitiative : System.Web.UI.Page
{

    #region Private Member Variables
    private static string UPLOADFOLDER = "Uploads";
    #endregion

    #region Web Methods
    protected void Page_Load(object sender, EventArgs args)
    {
        if (Session["LoginID"] == null)
        {
            Response.Redirect("~/SessionExpiredpage.aspx");
            return;
        }
        if (!this.IsPostBack)
        {
            // with file format(Filename_yyyyMMdd) i.e for 01-Jan-2020 file name should be<strong> "BranchMapping_20200101"</strong>
            hdnRoleId.Value = Convert.ToString(Session["RoleId"]);
            hdnLoginId.Value = Convert.ToString(Session["LoginID"]);
            string FileSetType = "1";
            hdnfilesettype.Value = FileSetType;
            tdHeader.InnerHtml = ">> Upload Initiative Data";
            hdnNodeTypes.Value = Convert.ToString(Session["SalesNodeId"]) + "|" + Convert.ToString(Session["SalesNodeType"]);
            fnFileList();
        }
    }

    private void fnFileList()
    {
        string stresponse = "";
        SqlConnection Scon = new SqlConnection(ConfigurationManager.ConnectionStrings["strConn"].ConnectionString);
        try
        {
            SqlCommand Scmd = new SqlCommand();
            Scmd.Connection = Scon;
            Scmd.CommandText = "spINITFileListForUpload";
            Scmd.Parameters.AddWithValue("@GrpSqnc", 3);
            Scmd.CommandType = CommandType.StoredProcedure;
            Scmd.CommandTimeout = 0;
            SqlDataAdapter Sdap = new SqlDataAdapter(Scmd);
            DataSet ds = new DataSet();
            Sdap.Fill(ds);

            string[] strgroup = { "GrpSqnc", "GroupName" };
            DataView view = new DataView(ds.Tables[0]);
            DataTable distinctValues = view.ToTable(true, strgroup);


            StringBuilder str = new StringBuilder();
            DateTime date = DateTime.Now;
            var firstDayOfMonth1 = new DateTime(date.Year, date.Month, 1);
            var firstDayOfMonth2 = new DateTime(date.Year, date.AddMonths(1).Month, 1);
            string dropdownlist_month = "";

            dropdownlist_month += "<option value='" + firstDayOfMonth1.ToString("yyyyMM") + "' selected>" + string.Format("{0:MMM-yy}", firstDayOfMonth1) + "</option>";
            dropdownlist_month += "<option value='" + firstDayOfMonth2.ToString("yyyyMM") + "'>" + string.Format("{0:MMM-yy}", firstDayOfMonth2) + "</option>";
            if (ds.Tables[0].Rows.Count > 0)
            {
                string[] SkipColumn = new string[5];
                SkipColumn[0] = "GrpSqnc";
                SkipColumn[1] = "FileSqnc";
                SkipColumn[2] = "flgActive";
                SkipColumn[3] = "GroupName";
                SkipColumn[4] = "FileTypeID";


                str.Append("<table id='tbldbrlist' style='width:100%' class='table table-bordered table-sm'><thead><tr>");

                string ss = "style='text-align:center'";
                str.Append("<th style='text-align:center;width:5%' >SrNo</th>");
                for (int j = 0; j < ds.Tables[0].Columns.Count; j++)
                {
                    if (SkipColumn.Contains(ds.Tables[0].Columns[j].ColumnName))
                    {
                        continue;
                    }
                    ss = "style='text-align:center'";
                    string sColumnName = ds.Tables[0].Columns[j].ColumnName;
                    if (sColumnName == "Branch Name")
                    {
                        ss = "style='text-align:left;'";
                    }
                    str.Append("<th " + ss + ">" + sColumnName.Split('^')[0] + "</th>");
                }
                //str.Append("<th style='text-align:center;width:5%'>Route Mapping</th>");
                //str.Append("<th style='text-align:center;width:6%'>Route Calendar</th>");
                //str.Append("<th style='text-align:center;width:8%'>Start Month</th>");
                str.Append("<th style='text-align:center;width:60%' colspan='2'>Upload Status</th>");
                str.Append("</tr></thead><tbody>");
                int sno = 0;
                for (int a = 0; a < distinctValues.Rows.Count; a++)
                {
                    str.Append("<tr style='background-color:#2bceff; color:#000000;'>");
                    str.Append("<td style='border: 1px solid gray; font-size: 11px; font-family: Arial; text-align: left; padding-left:5px;font-weight:bold;' colspan='5' >" + distinctValues.Rows[a]["GroupName"].ToString() + "</td></tr>");

                    DataRow[] DetailRows = ds.Tables[0].Select("GrpSqnc=" + Convert.ToInt32(distinctValues.Rows[a]["GrpSqnc"]) + "");

                    if (DetailRows.Length > 0)
                    {
                        DataTable dtDetail = DetailRows.CopyToDataTable();
                        sno = 0;
                        for (int i = 0; i < dtDetail.Rows.Count; i++)
                        {
                            sno++;

                            //string brnnodeid = Ds.Tables[0].Rows[i]["brnnodeid"].ToString();
                            //string LastUpdated = Convert.ToString(Ds.Tables[0].Rows[i]["Last Updated"]);
                            str.Append("<tr groupid='" + dtDetail.Rows[i]["GrpSqnc"].ToString() + "'>");//brnnodeid='" + Ds.Tables[0].Rows[i]["brnnodeid"].ToString() + "' brnnodetype='" + Ds.Tables[0].Rows[i]["brnnodetype"].ToString() + "'
                            str.Append("<td style='text-align:center'>" + (sno) + "</td>");
                            for (int j = 0; j < dtDetail.Columns.Count; j++)
                            {

                                string sColumnName = dtDetail.Columns[j].ColumnName;
                                if (SkipColumn.Contains(sColumnName))
                                {
                                    continue;
                                }


                                var sData = dtDetail.Rows[i][j];
                                ss = "style='text-align:left'";
                                if (sData.GetType() == typeof(int))
                                {
                                    ss = "style='text-align:center'";
                                }
                                string flgSearchable = sColumnName == "Branch Name" ? "Searchable='1'" : "Searchable='0'";
                                if (sColumnName == "Month")
                                {
                                    str.Append("<td style='text-align:center' iden='clslastupd'><select onchange='fnChangeMonth(this)'>" + dropdownlist_month + "</select></td>");
                                }
                                else
                                {
                                    str.Append("<td " + ss + "   " + flgSearchable + ">" + sData + "</td>");
                                }
                            }
                            //str.Append("<td style='text-align:center' iden='clslastrn'><a href='###' onclick='fnUpdateRouteNo(this)' style='font-size:9pt;color:blue;text-decoration:underline' >Update</a></td>");
                            //str.Append("<td style='text-align:center' iden='clslastrc'>" + (LastUpdated != "" ? "<a href='###' style='font-size:9pt;color:blue;text-decoration:underline' onclick='fnDownloadRouteCalendar(this,1)'>Download<a>" : "") + "</td>");
                            /*
                          string filesettype = "";
                           switch (dtDetail.Rows[i]["FileTypeID"].ToString().ToLower())
                           {
                               case "branch mapping":
                                   filesettype = "10";
                                       break;
                               case "sbd master":
                                   filesettype = "11";
                                   break;
                               case "cluster target":
                                   filesettype = "12";
                                   break;
                               case "cluster logic":
                                   filesettype = "13";
                                   break;
                               case "cluster schemes":
                                   filesettype = "14";
                                   break;
                           }*/

                            str.Append("<td style='text-align:center' iden='tdfile'><input type='file' flgUpload='0' class='clsfile' id='sfile_" + dtDetail.Rows[i]["FileTypeID"].ToString() + "' name='sfile_" + dtDetail.Rows[i]["GroupName"].ToString() + "' accept='application/zip' /><input type='hidden' value='" + dtDetail.Rows[i]["FileTypeID"].ToString() + "'/></td>");
                            if (i == 0)
                            {
                                str.Append("<td rowspan='" + DetailRows.Length + "' style='text-align:left;width:30%' iden='clsstatus'></td>");
                            }
                            str.Append("</tr>");
                        }

                    }

                }

                str.Append("</tbody></table>");
            }
            else
            {
                str.Append("");
            }
            stresponse = "1|" + str.ToString();
        }
        catch (Exception ex)
        {
            stresponse = "2|" + ex.Message;
        }
        finally
        {
            Scon.Dispose();
        }
        divDRCPPlanBrnWise.InnerHtml = stresponse.Split('|')[1];
    }

    [System.Web.Services.WebMethod]
    [System.Web.Script.Services.ScriptMethod]
    public static string fnBindRoute(string BranchNodeId, string BranchNodeType)
    {
        string stresponse = "";
        SqlConnection Scon = new SqlConnection(ConfigurationManager.ConnectionStrings["strConn"].ConnectionString);
        try
        {
            SqlCommand Scmd = new SqlCommand();
            Scmd.Connection = Scon;
            Scmd.CommandText = "spGetBranchFrequencyMapping";
            Scmd.Parameters.AddWithValue("@BranchNodeId", BranchNodeId);
            Scmd.Parameters.AddWithValue("@BranchNodeType", BranchNodeType);
            Scmd.CommandType = CommandType.StoredProcedure;
            Scmd.CommandTimeout = 0;
            SqlDataAdapter Sdap = new SqlDataAdapter(Scmd);
            DataSet Ds = new DataSet();
            Sdap.Fill(Ds);
            StringBuilder str = new StringBuilder();
            DateTime date = DateTime.Now;
            var firstDayOfMonth1 = new DateTime(date.Year, date.Month, 1);
            var firstDayOfMonth2 = new DateTime(date.Year, date.AddMonths(1).Month, 1);
            string dropdownlist_month = "";

            dropdownlist_month += "<option value='" + string.Format("{0:MMM-yy}", firstDayOfMonth1) + "' selected>" + string.Format("{0:MMM-yy}", firstDayOfMonth1) + "</option>";
            dropdownlist_month += "<option value='" + string.Format("{0:MMM-yy}", firstDayOfMonth2) + "'>" + string.Format("{0:MMM-yy}", firstDayOfMonth2) + "</option>";
            if (Ds.Tables[0].Rows.Count > 0)
            {
                string[] SkipColumn = new string[3];
                SkipColumn[0] = "FrqTypeId";
                SkipColumn[1] = "FrqType";
                SkipColumn[2] = "NoOfWeeks";

                string ss = "";
                string OldFrqTypeId = ""; int cnt = 0;
                str.Append("<table id='tblRouteno' style='width:100%;' class='table table-bordered table-sm'>");
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {
                    string FrqTypeDetail = Ds.Tables[0].Rows[i]["FrqTypeDetail"].ToString();
                    string FrqTypeId = Ds.Tables[0].Rows[i]["FrqTypeId"].ToString();
                    string WeekNo = Ds.Tables[0].Rows[i]["WeekNo"].ToString();
                    int MinRouteNo = Convert.ToInt32(Ds.Tables[0].Rows[i]["MinRouteNo"]);
                    int MaxRouteNo = Convert.ToInt32(Ds.Tables[0].Rows[i]["MaxRouteNo"]);

                    ss = "";
                    if (FrqTypeId != OldFrqTypeId)
                    {
                        cnt = 0;
                    }
                    if (cnt == 0)
                    {
                        cnt = 1;
                        str.Append("<tr style='height:25px;' FrqTypeId='" + FrqTypeId + "'>");
                        str.Append("<td style='border-right-color:#5c7643;background-color:#5c7643;color:#ffffff;padding:3px 0px 3px 5px;font-size:10pt;font-weight:bold' colspan ='2'>" + FrqTypeDetail + "</td>");
                        str.Append("<td style='border-left-color:#5c7643;background-color:#5c7643;color:#ffffff;padding:3px 0px 3px 5px;font-size:10pt;font-weight:bold'><a href='###' style='color:#fff;text-decoration:underline' onclick='fnResetRtMapping(this)'>Reset</a></td>");
                        str.Append("</tr>");
                        str.Append("<tr style='height:25px;'>");
                        str.Append("<td style='" + ss + ";text-align:center;background-color:#26a6e7;color:#ffffff'>Week No</td>");
                        str.Append("<td style='" + ss + ";text-align:center;background-color:#26a6e7;color:#ffffff'>Start Route No</td>");
                        str.Append("<td style='" + ss + ";text-align:center;background-color:#26a6e7;color:#ffffff'>End Route No</td>");
                        str.Append("</tr>");
                    }
                    int NoOfWeeks = Convert.ToInt32(Ds.Tables[0].Rows[i]["NoOfWeeks"]);
                    str.Append("<tr flg='1' FrqTypeId='" + FrqTypeId + "' WeekNo='" + WeekNo + "' FrqType='" + Ds.Tables[0].Rows[i]["FrqType"].ToString() + "' NoOfWeeks='" + NoOfWeeks + "'  >");
                    string strWeek = "";
                    if (FrqTypeId == "1" && WeekNo == "1")
                    {
                        strWeek = "1,3 & 5";
                    }
                    else if (FrqTypeId == "1" && WeekNo == "2")
                    {
                        strWeek = "2 & 4";
                    }
                    else if (FrqTypeId == "2" && WeekNo == "1")
                    {
                        strWeek = "1,2,3,4 & 5";
                    }
                    else
                    {
                        strWeek = WeekNo;
                    }
                    str.Append("<td style='" + ss + ";text-align:center;' >" + strWeek + "</td>");
                    str.Append("<td style='" + ss + ";text-align:center;' ><select style='width:100%'  oldval='" + MinRouteNo + "' >" + fnFillRouteNoDll(NoOfWeeks, MinRouteNo) + "</select></td>");
                    str.Append("<td style='" + ss + ";text-align:center;' ><select  style='width:100%' oldval='" + MaxRouteNo + "' >" + fnFillRouteNoDll(NoOfWeeks, MaxRouteNo) + "</select></td>");
                    str.Append("</tr>");

                    OldFrqTypeId = FrqTypeId;
                }
                str.Append("</table>");
            }
            else
            {
                str.Append("");
            }
            stresponse = str.ToString();
        }
        catch (Exception ex)
        {
            stresponse = ex.Message;
        }
        finally
        {
            Scon.Dispose();
        }
        return stresponse;
    }

    private static string fnFillRouteNoDll(int WeekNo, int Route)
    {
        int MaxNo = WeekNo * 7;
        StringBuilder str = new StringBuilder();
        str.Append("<option value='0' selected>--Select--</option>");
        for (int i = 1; i <= MaxNo; i++)
        {
            if (Route == i)
            {
                str.Append("<option value='" + i + "' selected>" + i + "</option>");
            }
            else
            {
                str.Append("<option value='" + i + "'>" + i + "</option>");
            }
        }
        return str.ToString();
    }

    [System.Web.Services.WebMethod]
    [System.Web.Script.Services.ScriptMethod]
    public static object GetUploadStatus()
    {

        //Get the length of the file on disk and divide that by the length of the stream
        UploadDetail info = (UploadDetail)HttpContext.Current.Session["UploadDetail"];
        if (info != null && info.IsReady)
        {
            long soFar = info.UploadedLength;
            long total = info.ContentLength;
            int percentComplete = (int)Math.Ceiling((double)soFar / (double)total * 100);
            string message = "";
            string NewfileName = info.NewFileName;
            string FileSetId = info.FileSetId;
            string FileSetType = info.FileSetType;
            string Updatetype1 = Convert.ToString(info.Updatetype);
            string fileName = string.Format("{0}", info.FileName);
            string downloadBytes = "";
            if (info.Updatetype == 1)
            {
                downloadBytes = string.Format("{0} of {1} Rows", soFar, total);
                message = "File uploaded,Data is being processed to load,please wait...";
            }
            else if (info.Updatetype == 2)
            {
                downloadBytes = string.Format("{0} of {1} Rows", soFar, total);
                message = "File uploaded,Data is being loaded,please wait....";
            }
            else if (info.Updatetype == 3)
            {
                downloadBytes = string.Format("{0} of {1} Rows", soFar, total);
                message = "File uploaded,db operations is being executed,please wait...";
            }
            else
            {
                downloadBytes = string.Format("{0} of {1} Bytes", soFar, total);
                message = "File uploading,please wait....";
            }

            return new
            {
                percentComplete = percentComplete,
                message = message,
                fileName = fileName,
                downloadBytes = downloadBytes,
                NewfileName = NewfileName,
                FileSetId = FileSetId,
                FileSetType = FileSetType,
                Updatetype = Updatetype1
            };
        }
        //Not ready yet
        return null;
    }

    [System.Web.Services.WebMethod]
    [System.Web.Script.Services.ScriptMethod]
    public static string fnGetLastUploadStatusSwingDRCP(string BranchNodeId, string BranchNodeType, string RptMonthYear)
    {
        string stresponse = "";
        SqlConnection Scon = new SqlConnection(ConfigurationManager.ConnectionStrings["strConn"].ConnectionString);
        try
        {
            SqlCommand Scmd = new SqlCommand();
            Scmd.Connection = Scon;
            Scmd.CommandText = "spGetLastUploadStatusSwingDRCP";
            Scmd.Parameters.AddWithValue("@BranchNodeId", BranchNodeId);
            Scmd.Parameters.AddWithValue("@BranchNodeType", BranchNodeType);
            Scmd.Parameters.AddWithValue("@RptMonthYear", RptMonthYear);
            Scmd.CommandType = CommandType.StoredProcedure;
            Scmd.CommandTimeout = 0;
            SqlDataAdapter Sdap = new SqlDataAdapter(Scmd);
            DataSet Ds = new DataSet();
            Sdap.Fill(Ds);
            stresponse = Convert.ToString(Ds.Tables[0].Rows[0][0]);
        }
        catch (Exception ex)
        {
        }
        finally
        {
            Scon.Dispose();
        }
        return stresponse;
    }


    #endregion

    #region Web Callbacks




    #endregion

    protected void btnRouteCalenderDownload_Click(object sender, EventArgs e)
    {
        fnDownloadExcelCalendar();
    }
    public void fnDownloadExcelCalendar()
    {
        try
        {
            DataSet Ds = new DataSet();
            string strConn = ConfigurationManager.AppSettings["strConn"].ToString();
            using (SqlConnection Scon = new SqlConnection(strConn))
            {
                using (SqlCommand Scmd = new SqlCommand())
                {
                    Scmd.Connection = Scon;

                    Scmd.CommandText = "[spDownloadMonthlyDSERouteCalendar]";
                    Scmd.Parameters.AddWithValue("@BranchNodeId", hdnNodeId.Value);
                    Scmd.Parameters.AddWithValue("@BranchNodeType", hdnNodeTypes.Value);
                    Scmd.Parameters.AddWithValue("@RptMonthYear", hdnDate.Value);
                    Scmd.CommandType = CommandType.StoredProcedure;
                    Scmd.CommandTimeout = 0;

                    using (SqlDataAdapter Sdap = new SqlDataAdapter(Scmd))
                    {
                        Sdap.Fill(Ds);
                    }
                }
            }


            string[] SkipColumn = new string[0];
            //SkipColumn[0] = "storeid";
            string filename = "MonthlyDSERouteCalendar";
            filename = filename + DateTime.Now.ToString("dd_MMM_yyyy_hhmmsstt");

            Ds.Tables[0].TableName = "Sheet1";
            using (XLWorkbook wb = new XLWorkbook())
            {
                ////Start Chassiss
                int k = 1; int j = 0; int colFreeze = 2; int colLeft = 3;
                string strold = ""; int cntc = 0; int colst = 2; bool flgb = true;

                var ws = wb.Worksheets.Add(Ds.Tables[0].TableName.ToString());

                DataTable dt = Ds.Tables[0];

                k = 1; j = 0; colFreeze = 2; colLeft = 3;
                strold = ""; cntc = 0; colst = 2; flgb = true; bool flgm = false;
                //int rowstart = 0; // for data part insertion
                int noofsplit = dt.Columns[1].ColumnName.Split('^').Length;

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
                            ws.Cell(k + i, j + 1).Style.Fill.BackgroundColor = XLColor.FromHtml("#728cd4");
                            ws.Cell(k + i, j + 1).Style.Font.FontColor = XLColor.FromHtml("#ffffff");
                            ws.Cell(k + i, j + 1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                            ws.Cell(k + i, j + 1).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        }


                        j++;
                    }
                }

                for (var i = 0; i < noofsplit - 1; i++)
                {
                    j = 0; colst = 1; k = 1; strold = "";
                    for (int c = 1; c < dt.Columns.Count; c++)
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
                for (int c = 1; c < dt.Columns.Count; c++)
                {
                    strold = dt.Columns[c].ColumnName.ToString().Split('^')[0];
                    colst = 1; k = 1; flgb = false; rowst = 1;


                    for (var i = 0; i < noofsplit; i++)
                    {
                        //strold = "";                                                   
                        if (dt.Columns[c].ColumnName.ToString().Split('^')[i] != "" && flgb == true)
                        {
                            ws.Range(ws.Cell(rowst, c), ws.Cell(i, c)).Merge();
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
                            ws.Range(ws.Cell(rowst, c), ws.Cell(i + 1, c)).Merge();
                        }
                    }
                }
                /**/


                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    for (j = 0; j < dt.Columns.Count; j++)
                    {

                        //if (j > 0)
                        //{
                        ws.Cell(i + noofsplit + 1, j + 1).Value = dt.Rows[i][j].ToString();
                        ws.Cell(i + noofsplit + 1, j + 1).Style.Font.FontName = "Calibri";
                        ws.Cell(i + noofsplit + 1, j + 1).Style.Font.FontSize = 9;
                        //}



                    }
                }
                ws.Columns().AdjustToContents();
                ws.Rows().AdjustToContents();
                //ws.Columns().AdjustToContents();//noofsplit + 1,  dt.Columns.Count

                IXLCell cell3 = ws.Cell(1, 1);
                IXLCell cell4 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);

                ws.Range(ws.Cell(k, 4), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                ws.Range(cell3, cell4).Style.Border.SetInsideBorder(XLBorderStyleValues.Thin);
                ws.Range(cell3, cell4).Style.Border.SetOutsideBorder(XLBorderStyleValues.Medium);
                ws.SheetView.FreezeRows(noofsplit);
                //ws.SheetView.FreezeColumns(noofcolfreeze);





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
            // string ProjectTitle = ConfigurationManager.AppSettings["Title"];
            //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), "FrmDownload Page", "Download Page", "Error in FrmDownload Page in " + ProjectTitle);
        }
    }
    protected void btnDownload_Click(object sender, EventArgs e)
    {
        downloadtransaction();
    }

    //Get Scheme And Product Detail Bases on Store
    [System.Web.Services.WebMethod()]
    public static string fnSaveBranchFrequenceMapping(int LoginId, int BranchNodeId, int BranchNodeType, object objBranchFrequencyMapping)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        string stresponse = "";
        SqlTransaction transaction;
        con.Open();
        transaction = con.BeginTransaction();
        try
        {
            string strBranchFrequencyMapping = JsonConvert.SerializeObject(objBranchFrequencyMapping, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
            DataTable tblBranchFrequencyMapping = JsonConvert.DeserializeObject<DataTable>(strBranchFrequencyMapping);
            tblBranchFrequencyMapping.TableName = "tblBranchFrequencyMapping";

            string storedProcName = "spSaveBranchFrequenceMapping";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@BranchFrequencyMapping", tblBranchFrequencyMapping),
                   new SqlParameter("@BranchNodeId", BranchNodeId),
                   new SqlParameter("@BranchNodeType", BranchNodeType),
                   new SqlParameter("@LoginId", LoginId)

                };
            clsDbCommand.ExecuteQueryProcedure(storedProcName, con, transaction, sp);
            transaction.Commit();
        }
        catch (Exception ex)
        {
            transaction.Rollback();
            stresponse = "2|" + ex.Message;
        }
        finally
        {
            con.Dispose();
        }

        return stresponse;
    }
    public void downloadtransaction()
    {
        string[] SkipColumn = new string[0];
        string filename = "";

        filename = "ExceptionReport_" + DateTime.Now.ToString("dd_MMM_yyyy_hhmmsstt");

        SqlConnection Scon = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        SqlCommand Scmd = null;
        SqlDataAdapter Sdap = null;


        Scmd = new SqlCommand();
        Scmd.Connection = Scon;
        Scmd.CommandText = "[spGetSwingDRCPExceptionDetail]";

        Scmd.CommandType = CommandType.StoredProcedure;
        Scmd.Parameters.AddWithValue("@FileSetId", hdnfilesetid.Value);

        Scmd.CommandTimeout = 0;

        Sdap = new SqlDataAdapter(Scmd);
        try
        {
            DataSet Ds = new DataSet();
            Sdap.Fill(Ds);

            using (XLWorkbook wb = new XLWorkbook())
            {
                ////Start Chassiss
                int k = 1; int j = 0; int colFreeze = 2; int colLeft = 3;
                string strold = ""; int cntc = 0; int colst = 2; bool flgb = true;

                int resulsetcnt = 0;
                foreach (DataTable dt in Ds.Tables)//For SheetName
                {
                    string strSheetName = resulsetcnt == 0 ? "DRCP Exception" : "DSE Master Exception";// drowchasiss["SheetName"].ToString(); //"PrimaryUploadStatus";//
                    resulsetcnt++;
                    var ws = wb.Worksheets.Add(strSheetName.Replace("/", "_"));
                    k = 1; j = 0; colFreeze = 2; colLeft = 3;
                    strold = ""; cntc = 0; colst = 2; flgb = true; bool flgm = false;
                    //int rowstart = 0; // for data part insertion
                    int noofsplit = Convert.ToInt16(dt.Columns[0].ColumnName.ToString().Split('^').Length); //Convert.ToInt16(drowchasiss["NoOfSplit"]);
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
                                ws.Cell(k + i, j + 1).Style.Fill.BackgroundColor = XLColor.FromHtml("#728cd4");
                                ws.Cell(k + i, j + 1).Style.Font.FontColor = XLColor.FromHtml("#ffffff");
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

                    ws.Rows().AdjustToContents();

                    var rangeWithData = ws.Cell(noofsplit + 1, 1).InsertData(dt.AsEnumerable());

                    IXLCell cell3 = ws.Cell(1, 1);
                    IXLCell cell4 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);

                    ws.Range(ws.Cell(k, 4), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    ws.Range(cell3, cell4).Style.Border.SetInsideBorder(XLBorderStyleValues.Thin);
                    ws.Range(cell3, cell4).Style.Border.SetOutsideBorder(XLBorderStyleValues.Medium);
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
            if (ex.Message.ToString().IndexOf("Thread was being aborted") == -1)
            {
                //SendErrorMail("Error while Download file PrimaryUploadStatus. \n Error : " + ex.Message);
            }
            // string ProjectTitle = ConfigurationManager.AppSettings["Title"];
            //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), "FrmDownload Page", "Download Page", "Error in FrmDownload Page in " + ProjectTitle);
        }
        finally
        {
            Sdap.Dispose();
            Scmd.Dispose();
            Scon.Dispose();
        }
    }



    [System.Web.Services.WebMethod]
    public static string fnFinalSaving(string allgroupids)
    {
        string str = allgroupids.TrimEnd(',');
        List<string> uniques = str.Split(',').Reverse().Distinct().ToList();
        string newStr = string.Join(",", uniques);
        //Console.WriteLine(newStr);
        string[] arrItem = newStr.Split(',');

        string stresponse = "";
        string spname = "";
        string strConn = ConfigurationManager.ConnectionStrings["strConn"].ConnectionString;
        try
        {
            using (SqlConnection Scon = new SqlConnection(strConn))
            {
                foreach (string strGroup in arrItem)
                {


                    using (SqlCommand Scmd = new SqlCommand())
                    {
                        Scmd.Connection = Scon;
                        if (strGroup == "1")
                        {
                            Scmd.CommandText = "[spINITSBDPopulateMasterData]";
                        }
                        else if (strGroup == "3")
                        {
                            Scmd.CommandText = "[spDataLoadInitiative_OnlyChecks]";
                        }
                        //Scmd.Parameters.AddWithValue("@OrderReturnDetailId", OrderReturnDetailId);
                        spname = Scmd.CommandText;
                        Scmd.CommandType = CommandType.StoredProcedure;
                        Scmd.CommandTimeout = 0;

                        using (SqlDataAdapter Sdap = new SqlDataAdapter(Scmd))
                        {
                            DataSet Ds = new DataSet();
                            Sdap.Fill(Ds);
                            string str1 = fnDisplayErrorList(Ds);
                            if (str1 == "")
                            {
                                stresponse = "0^Validatd Successfully";
                            }
                            else
                            {
                                stresponse = "2^" + str1;
                            }
                            
                        }
                    }

                }
            }
        }
        catch (Exception ex)
        {
            stresponse = "-1^Error in Store Procedure " + spname + "  Detail :- " + ex.Message.ToString();
            string ReferalUrl = System.IO.Path.GetFileName(HttpContext.Current.Request.UrlReferrer.AbsolutePath);
            SendErrorMailMain(ex, ReferalUrl);

        }
        return stresponse;
    }

    public static string fnDisplayErrorList(DataSet Ds)
    {
        string stresponse = "";
            StringBuilder str = new StringBuilder();
            for (int t = 0; t < Ds.Tables.Count; t++)
            {
                if (Ds.Tables[t+1].Rows.Count > 0)
                {
                    str.Append("<div style='width:100%;margin-bottom:5px;background-color:#b0b0b0;font-size:11pt;'>"+ Ds.Tables[t].Rows[0][0].ToString() + "</div>");
                    str.Append("<table id='tbldbrlist_'"+t.ToString()+"' style='width:100%' ><thead><tr>");
                    string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                    for (int j = 0; j < Ds.Tables[t+1].Columns.Count; j++)
                    {
                        ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                        str.Append("<th " + ss + ">" + Ds.Tables[t+1].Columns[j].ColumnName + "</th>");
                    }
                    str.Append("</tr></thead><tbody>");

                    ss = "";
                    for (int i = 0; i < Ds.Tables[t+1].Rows.Count; i++)
                    {
                        str.Append("<tr>");
                        for (int j = 0; j < Ds.Tables[t+1].Columns.Count; j++)
                        {
                            string sColumnName = Ds.Tables[t+1].Columns[j].ColumnName;
                            
                            var sData = Ds.Tables[t+1].Rows[i][j];
                            ss = "style='text-align:left'";
                            if (sData.GetType() == typeof(int))
                            {
                                ss = "style='text-align:center'";
                            }

                            str.Append("<td " + ss + " >" + sData + "</td>");
                        }
                        str.Append("</tr>");
                    }
                    str.Append("</tbody></table>");
                }
                t += 1;
            }
            stresponse = str.ToString();
        
        return stresponse;
    }

    public static void SendErrorMailMain(Exception ex, string sourcepage)
    {
        try
        {

            System.Text.StringBuilder mailString = new System.Text.StringBuilder();
            mailString.Append("<font  style='COLOR: #000080; FONT-FAMILY: Arial'  size=2>");
            mailString.Append("<p>Dear, </p>");
            mailString.Append("<p>Kindly check and correct below error </p></br>");
            mailString.Append("<p>Error Name : " + ex.Message.ToString() + "</p></br>");
            mailString.Append("<p>Error Description : " + ex.StackTrace.ToString() + "</p>");
            mailString.Append("<br><br><p>All the Best!</p>");
            mailString.Append("<br>Helpdesk");
            //mailString.Append("<p></p>");
            mailString.Append("</font>");


            //MailMessage mail = new MailMessage();
            //SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
            //mail.From = new MailAddress("astix@astixsolutions.com");
            //mail.To.Add(System.Configuration.ConfigurationManager.AppSettings["errTo"].ToString());
            //mail.Subject = "Error in File Uploading in page (" + sourcepage + " ) : " + DateTime.Now.ToString("dd-MMM-yyyy");



            //mail.Body = mailString.ToString();
            //mail.IsBodyHtml = true;

            ////mail.Attachments.Add(new Attachment(fileName));
            //SmtpServer.Port = 25;
            //SmtpServer.Credentials = new System.Net.NetworkCredential(System.Configuration.ConfigurationManager.AppSettings["DMSUser"].ToString(), System.Configuration.ConfigurationManager.AppSettings["DMSGPassword"].ToString());
            //SmtpServer.EnableSsl = true;
            //SmtpServer.Send(mail);
        }
        catch (Exception ex1) { }
    }



}