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

public partial class frmInit_SBDUpload : System.Web.UI.Page
{
    public static string strConn = "Server=tcp:pgdatafoundation.database.windows.net,1433;Initial Catalog=DataFoundation;Persist Security Info=False;User ID=astixadmin;Password=DFDWAdmin@13579;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
    #region Private Member Variables
    private static string UPLOADFOLDER = "Uploads";
    #endregion

    #region Web Methods
    protected void Page_Load(object sender, EventArgs args)
    {
        Session["LoginID"] = "0";
        Session["RoleId"] = "1";
        Session["SalesNodeId"] = "0";
        Session["SalesNodeType"] = "0";
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
        SqlConnection Scon = new SqlConnection(strConn);
        try
        {
            SqlCommand Scmd = new SqlCommand();
            Scmd.Connection = Scon;
            Scmd.CommandText = "spINITFileListForUpload_DF";
            //Scmd.Parameters.AddWithValue("@LoginId", Session["LoginId"].ToString());
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
                str.Append("<th style='text-align:center;width:80%' colspan='2'>Upload Status</th>");
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
                            str.Append("<tr groupid='"+ dtDetail.Rows[i]["GrpSqnc"].ToString() + "'>");//brnnodeid='" + Ds.Tables[0].Rows[i]["brnnodeid"].ToString() + "' brnnodetype='" + Ds.Tables[0].Rows[i]["brnnodetype"].ToString() + "'
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
                                else {
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

                            str.Append("<td style='text-align:center' iden='tdfile'><input type='file' flgUpload='0' class='clsfile' id='sfile_" + dtDetail.Rows[i]["FileTypeID"].ToString() + "'  name='sfile_" + dtDetail.Rows[i]["GroupName"].ToString() + "' accept='application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' multiple='true' onchange='handleFileSelect(this)' /><input type='hidden' value='" + dtDetail.Rows[i]["FileTypeID"].ToString() + "'/><div id='divSelectedFiles' style='text-align:left'></div></td>");
                            str.Append("<td style='text-align:left;width:45%' iden='clsstatus'></td>");
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
    public static string fnFinalSaving(string RptMonthYear)
    {
        string stresponse = "";      
       //string strConn = ConfigurationManager.ConnectionStrings["strConn"].ConnectionString;
        try
        {
            using (SqlConnection Scon = new SqlConnection(strConn))
            {

                    using (SqlCommand Scmd = new SqlCommand())
                    {
                        Scmd.Connection = Scon;
                        //if (strGroup == "1")
                        //{
                            Scmd.CommandText = "[spINITSBDPopulateMasterData]";
                        //}
                        //else if (strGroup == "3")
                        //{
                        //    Scmd.CommandText = "[spDataLoadInitiative]";
                        //}
                        Scmd.Parameters.AddWithValue("@RptMonthYear", RptMonthYear);
                        Scmd.CommandType = CommandType.StoredProcedure;
                        Scmd.CommandTimeout = 0;

                        using (SqlDataAdapter Sdap = new SqlDataAdapter(Scmd))
                        {
                            DataSet Ds = new DataSet();
                            Sdap.Fill(Ds);
                            stresponse = "0^Data Processed Successfully";
                        }
                    }
            }
        }
        catch (Exception ex)
        {
            stresponse = "-1^"+ex.Message;
        }
        return stresponse;
    }

    [System.Web.Services.WebMethod]
    public static string fnTruncateSBDTempTables()
    {
        string stresponse = "";
        //string strConn = ConfigurationManager.ConnectionStrings["strConn"].ConnectionString;
        try
        {
            using (SqlConnection Scon = new SqlConnection(strConn))
            {
                Scon.Open();
                using (SqlCommand Scmd = new SqlCommand())
                {
                    Scmd.Connection = Scon;
                    Scmd.CommandText = "[spTruncateSBDTempTables]";
                    Scmd.CommandType = CommandType.StoredProcedure;
                    Scmd.CommandTimeout = 0;
                    Scmd.ExecuteNonQuery();
                }
            }
        }
        catch (Exception ex)
        {
            stresponse = "-1^"+ex.Message;
        }
        return stresponse;
    }

}