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
using System.Net.Mail;
using System.Net;
using System.Text;

public partial class Default_DSEAbsentEmailData : System.Web.UI.Page
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
            //string[] files = Directory.GetFiles(Server.MapPath("~/DSEAbsenteeismData"));

            //foreach (string file in files)
            //{
            //    FileInfo fi = new FileInfo(file);
            //    if (fi.LastAccessTime.Date < DateTime.Now.Date)
            //        fi.Delete();
            //}

            Session["dtMailStatus"] = null;
           
            Session["FileSetType"] = "20";// Request.QueryString["id"] == null ? "0" : Request.QueryString["id"].ToString();
            string flg = Request.QueryString["flg"] == null ? "1" : Request.QueryString["flg"].ToString();
            hdnflg.Value = flg;
            hdnRoleId.Value= Convert.ToString(Session["RoleId"]);
            string FileSetType = Convert.ToString(Session["FileSetType"]);
            hdnfilesettype.Value = FileSetType;
            hdnNodeTypes.Value = Convert.ToString(Session["SalesNodeId"]) + "|" + Convert.ToString(Session["SalesNodeType"]);
            if (FileSetType == "20")
            {
                hdnMnId.Value = "54";
                hdnFileName.Value = "DSEAbsenteeismData.xlsx";
                tdFilelbl.InnerHtml = ">> File Upload For   :   DSE Absenteeism Data";
            }
          
            tdNamecon1.InnerHtml = "<b style=\"font-size: 10pt;\">Sample File : </b><a title='Click to download sample file' style=\"cursor:pointer;font-size: 10pt;color:blue;text-decoration:underline\" onclick='fnDownloadSampleFile()' id='lnksample' >" + hdnFileName.Value.Split('.')[0] + "_yyyyMMddHHmm.xlsx</a>";
            //Reserve a spot in Session for the UploadDetail object
            this.Session["UploadDetail"] = new UploadDetail { IsReady = false };
            LoadUploadedFiles(ref gvNewFiles);
        }
    }

  
    private void fnBindDBRList()
    {

        SqlConnection Scon = new SqlConnection(ConfigurationManager.ConnectionStrings["strConn"].ConnectionString);
        SqlCommand Scmd = new SqlCommand();
        Scmd.Connection = Scon;
        Scmd.CommandText = "spGetBranchList";
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
           // ddlBranch.Items.Add(itm);
        }
        foreach (DataRow dr in dt.Rows)
        {
            itm = new ListItem();
            itm.Text = dr["BranchName"].ToString();
            itm.Attributes.Add("sitenodeid", dr["sitenodeid"].ToString() + "-" + dr["SiteNodeType"].ToString());
            itm.Value = dr["BrnNodeId"].ToString() + "-" + dr["BrnNodeType"].ToString() + "-" + dr["IsMappedLeapSwing"].ToString();
           // ddlBranch.Items.Add(itm);
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
            if (percentComplete >= 100)
            {
                soFar = total;
            }
            if (info.Updatetype == 1)
            {
                downloadBytes = string.Format("{0} of {1} Rows", soFar, total);
                message = "File uploaded,Data is being processed to load,please wait...";
            }else if (info.Updatetype == 2)
            {
                downloadBytes = string.Format("{0} of {1} Rows", soFar, total);
                message = "File uploaded and Data is being loaded,please wait...";
            }
            else if (info.Updatetype == 3)
            {
                downloadBytes = string.Format("{0} of {1} Rows", soFar, total);
                message = "File uploaded,db operations is being executed,please wait...";
            }
            else if (info.Updatetype == 4)
            {
                downloadBytes = string.Format("{0} of {1} Rows", soFar, total);
                message = "Mails are being sent, pls wait..";

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
                Updatetype= Updatetype1
            };
        }
        //Not ready yet
        return null;
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
        DataTable dtFiles = (DataTable)HttpContext.Current.Session["dtMailStatus"];
        gv.DataSource = dtFiles;
        gv.DataBind();
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
            string sextion = hdnFileName.Value.Split('.')[0] + "*_*_*_" + Username + ".xlsx";
            foreach (FileInfo files in dir.GetFiles(sextion,SearchOption.TopDirectoryOnly))
            {
                System.Data.DataRow drFile = dtFiles.NewRow();
                drFile["SiteCode"] = files.Name;
                drFile["SiteName"] = files.LastWriteTime.ToString("dd/MM/yy HH:mm:ss");
                drFile["EmailIds"] = files.Length;
                drFile["Status"] = CalculateFileSize(files.Length);
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
        if (hdnfilesettype.Value == "1")
        {
            Scmd.CommandText = hdndrcpType.Value=="1"?"[spGetDRCPExceptionDetail]": "[spGetDRCP2ExceptionDetail]";
        }
        else if (hdnfilesettype.Value == "2") //mapping
        {
            Scmd.CommandText = "[spGetSBFPCodeMappingExceptionDetail]";
        }
        else if (hdnfilesettype.Value == "3")
        {
            Scmd.CommandText = "[spGetCentralSBFExceptionDetail]";
        }
        else if (hdnfilesettype.Value == "4")
        {
            Scmd.CommandText = "[spGetStoreContactExceptionDetail]";
        }
        else if (hdnfilesettype.Value == "5")
        {
            Scmd.CommandText = hdnflgDRCPUploadType.Value == "2" ? "spGetLeapCCRExceptionDetail" : "spGetSwingCCRExceptionDetail";
        }
        else if (hdnfilesettype.Value == "6")
        {
            Scmd.CommandText = "[spGetSUBDDRCPExceptionDetail]";
        }
        else if (hdnfilesettype.Value == "17")
        {
            Scmd.CommandText = "[spGetLeapDSECallingDataException]";
        }
        else if (hdnfilesettype.Value == "19") //mapping
        {
            Scmd.CommandText = "[spGetActiveSBFExceptionDetail]";
        }
        Scmd.CommandType = CommandType.StoredProcedure;
        //Scmd.Parameters.AddWithValue("@LoginId", HttpContext.Current.Session["LoginID"]);
        Scmd.Parameters.AddWithValue("@FileSetId", hdnfilesetid.Value);

        Scmd.CommandTimeout = 0;

        //Scmd.Parameters.AddWithValue("@SalesNodeId", Convert.ToInt32(HttpContext.Current.Session["SalesNodeId"]));
        //Scmd.Parameters.AddWithValue("@SalesNodeType", Convert.ToInt32(HttpContext.Current.Session["SalesNodeType"]));//HttpContext.Current.Session["SalesNodeType"])
        //Scmd.Parameters.AddWithValue("@FromDate", FromDate);
        //Scmd.Parameters.AddWithValue("@ToDate", Todate);

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
                //foreach (DataRow drowchasiss in Ds.Tables[0].Rows)//For SheetName
                //{
                string strSheetName = "ExceptionReport";// drowchasiss["SheetName"].ToString(); //"PrimaryUploadStatus";//
                DataTable dt = Ds.Tables[resulsetcnt];
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
                /**/

                ws.Rows().AdjustToContents();

                var rangeWithData = ws.Cell(noofsplit + 1, 1).InsertData(dt.AsEnumerable());

                //for (int i = 0; i < dt.Rows.Count; i++)
                //{
                //    for (j = 0; j < dt.Columns.Count - 2; j++)
                //    {
                //        ws.Cell(noofsplit + i + 1, j + 1).Value = dt.Rows[i][j].ToString().IndexOf('^') != -1 ? dt.Rows[i][j].ToString().Split('^')[0] : dt.Rows[i][j].ToString();
                //        ws.Cell(noofsplit + i + 1, j + 1).Style.Font.FontName = "Calibri";
                //        ws.Cell(noofsplit + i + 1, j + 1).Style.Font.FontSize = 9;

                //        if (dt.Rows[i][j].ToString().IndexOf('^') != -1)
                //        {
                //            ws.Cell(noofsplit + i + 1, j + 1).Style.Fill.BackgroundColor = XLColor.FromHtml("#ffff80");
                //        }
                //    }
                //}


                IXLCell cell3 = ws.Cell(1, 1);
                IXLCell cell4 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);

                ws.Range(ws.Cell(k, 4), cell4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                ws.Range(cell3, cell4).Style.Border.SetInsideBorder(XLBorderStyleValues.Thin);
                ws.Range(cell3, cell4).Style.Border.SetOutsideBorder(XLBorderStyleValues.Medium);
                ws.SheetView.FreezeRows(noofsplit);
                ws.SheetView.FreezeColumns(noofcolfreeze);
                //}
                ws.Columns().AdjustToContents();
                ws.Rows().AdjustToContents();
                ws.Range(1, 1, 1, dt.Columns.Count).Style.Alignment.WrapText = true;


                //}
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


   
    protected void hdnSendmail_ValueChanged(object sender, EventArgs e)
    {
        try
        {
            
        }
        catch(Exception ex)
        {
            var error = ex.Message.Replace("'", "");
            error = error.Replace(System.Environment.NewLine, "");
            string js = "window.parent.onComplete(4, '" + error + "','','0 of 0 Bytes','','','',6);";
            ScriptManager.RegisterStartupScript(this,typeof(Default_DSEAbsentEmailData), "progress", js, true);
        }
    }
}
