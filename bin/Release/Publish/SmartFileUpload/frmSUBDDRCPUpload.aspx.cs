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

public partial class frmSUBDDRCPUpload : System.Web.UI.Page
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
            hdnRoleId.Value = Convert.ToString(Session["RoleId"]);
            hdnLoginId.Value = Convert.ToString(Session["LoginID"]);
           
            tdHeader.InnerHtml = ">> Upload SUBD Files";
            hdnNodeTypes.Value = Convert.ToString(Session["SalesNodeId"]) + "|" + Convert.ToString(Session["SalesNodeType"]);
            trSite.Style.Add("display", "none");
            if (hdnRoleId.Value != "8")
            {
                trSite.Style.Add("display", "table-row");
                fnBindSiteList();
            }
            LoadUploadedFiles(ref gvNewFiles);
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
            itm.Text = "--------";
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
    protected void gvNewFiles_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {
            e.Row.Attributes.Add("onmouseover", "eventMouseOver(this)");
            e.Row.Attributes.Add("onmouseout", "eventMouseOut(this)");
        }
    }
    protected void gvNewFiles_RowCommand(object sender, GridViewCommandEventArgs e)
    {
        switch (e.CommandName)
        {
            case "deleteFile":
                //DeleteFile(e.CommandArgument.ToString());
                //LoadUploadedFiles(ref gvNewFiles);
                break;
            case "downloadFile":
                string strFolder = "Uploads";
                string filePath = Path.Combine(strFolder, e.CommandArgument.ToString());
                DownloadFile(filePath);
                break;
        }
    }
    protected void hdRefereshGrid_ValueChanged(object sender, EventArgs e)
    {
        LoadUploadedFiles(ref gvNewFiles);
    }
    #endregion

    #region Support Methods
    public void LoadUploadedFiles(ref GridView gv)
    {
        DataTable dtFiles = GetFilesInDirectory(HttpContext.Current.Server.MapPath(UPLOADFOLDER));
        gv.DataSource = dtFiles;
        gv.DataBind();
        if (dtFiles != null && dtFiles.Rows.Count > 0)
        {
            double totalSize = Convert.ToDouble(dtFiles.Compute("SUM(Size)", ""));
            if (totalSize > 0) lblTotalSize.Text = CalculateFileSize(totalSize);
        }
    }

    public DataTable GetFilesInDirectory(string sourcePath)
    {
        System.Data.DataTable dtFiles = new System.Data.DataTable();
        if ((Directory.Exists(sourcePath)))
        {
            dtFiles.Columns.Add(new System.Data.DataColumn("Name"));
            dtFiles.Columns.Add(new System.Data.DataColumn("UploadDate"));
            dtFiles.Columns.Add(new System.Data.DataColumn("Size"));
            dtFiles.Columns["Size"].DataType = typeof(double);
            dtFiles.Columns.Add(new System.Data.DataColumn("ConvertedSize"));
            DirectoryInfo dir = new DirectoryInfo(sourcePath);
            string Username = Convert.ToString(Session["username"]).ToLower();
            string section = "*_SUBD_*_" + Username + ".xlsx";
            foreach (FileInfo files in dir.GetFiles(section, SearchOption.TopDirectoryOnly))
            {
                System.Data.DataRow drFile = dtFiles.NewRow();
                drFile["Name"] = files.Name;
                drFile["UploadDate"] = files.LastWriteTime.ToString("dd/MM/yy HH:mm:ss");
                drFile["Size"] = files.Length;
                drFile["ConvertedSize"] = CalculateFileSize(files.Length);
                dtFiles.Rows.Add(drFile);
            }
        }
        return dtFiles;
    }
    public void DownloadFile(string filePath)
    {
        if (File.Exists(Server.MapPath(filePath)))
        {
            string strFileName = Path.GetFileName(filePath).Replace(" ", "%20");
            Response.ContentType = "application/octet-stream";
            Response.AddHeader("Content-Disposition", "attachment; filename=" + strFileName);
            Response.Clear();
            Response.WriteFile(Server.MapPath(filePath));
            Response.End();
        }
    }
    public string DeleteFile(string FileName)
    {
        string strMessage = "";
        try
        {
            string strPath = Path.Combine(UPLOADFOLDER, FileName);
            if (File.Exists(Server.MapPath(strPath)) == true)
            {
                File.Delete(Server.MapPath(strPath));
                strMessage = "File Deleted";
            }
            else
                strMessage = "File Not Found";
        }
        catch (Exception ex)
        {
            strMessage = ex.Message;
        }
        return strMessage;
    }
    public string CalculateFileSize(double FileInBytes)
    {
        string strSize = "00";
        if (FileInBytes < 1024)
            strSize = FileInBytes + " B";//Byte
        else if (FileInBytes > 1024 & FileInBytes < 1048576)
            strSize = Math.Round((FileInBytes / 1024), 2) + " KB";//Kilobyte
        else if (FileInBytes > 1048576 & FileInBytes < 107341824)
            strSize = Math.Round((FileInBytes / 1024) / 1024, 2) + " MB";//Megabyte
        else if (FileInBytes > 107341824 & FileInBytes < 1099511627776)
            strSize = Math.Round(((FileInBytes / 1024) / 1024) / 1024, 2) + " GB";//Gigabyte
        else
            strSize = Math.Round((((FileInBytes / 1024) / 1024) / 1024) / 1024, 2) + " TB";//Terabyte
        return strSize;
    }


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
        Scmd.CommandText = "[spGetSUBDDRCPExceptionDetail]";

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
                    string strSheetName = resulsetcnt == 0 ? "JourneyPlan Exception" : "DRCP Exception";// drowchasiss["SheetName"].ToString(); //"PrimaryUploadStatus";//
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
}
