using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Data;
using ClosedXML.Excel;
using System.Net.Mail;
using System.Data.SqlClient;
using System.Configuration;
using System.Runtime.Serialization.Formatters.Binary;
using System.Net;
using System.Text;
using System.Net.Mime;

public partial class UploadEngine_DSEAbsentEmailData : System.Web.UI.Page
{
    #region Web Methods

    private static void BulkCopy_SqlRowsCopied(object sender, SqlRowsCopiedEventArgs e)
    {
        UploadDetail Upload = (UploadDetail)HttpContext.Current.Session["UploadDetail"];
        Upload.UploadedLength = Convert.ToInt32(e.RowsCopied);
    }
    public static string UploadData(DataTable dtRecords, string ws_name, string FileSetType, string FileName, UploadDetail Upload)
    {
        try
        {
            string[] ArrPrimaryData = null;


            //----filesettype 6
            //table tmpRawDataSUBDDRCP
            //SubD DRCP


            ArrPrimaryData = new string[10];
            ArrPrimaryData[0] = "Distributor code";
            ArrPrimaryData[1] = "branch code";
            ArrPrimaryData[2] = "seller code";
            ArrPrimaryData[3] = "date";
            ArrPrimaryData[4] = "# target stores in coverage";
            ArrPrimaryData[5] = "# of productive calls";
            ArrPrimaryData[6] = "sales value target for the day";
            ArrPrimaryData[7] = "sales value achievement";
            ArrPrimaryData[8] = "# stores covered till now";
            ArrPrimaryData[9] = "FileSetID";

            clsSendLogMail.FnWriteLogFile_Log("", "start datatable error checking for valid data");
            clsSendLogMail.FnWriteLogFile_Log("", "start bulkcopy process");
            Upload.ContentLength = dtRecords.Rows.Count;
            Upload.UploadedLength = 0;
            Upload.Updatetype = 2;
            if (dtRecords != null && dtRecords.Rows.Count > 0)
            {
                string strcon = System.Configuration.ConfigurationManager.AppSettings["strConn"];

                if (dtRecords.Columns.Count - 1 != ArrPrimaryData.Length - 1)
                {
                    return "1|Column count mis-match. It must be " + (ArrPrimaryData.Length - 1) + " Columns.";
                }

                for (int j = 0; j < dtRecords.Columns.Count; j++)
                {
                    if (!ArrPrimaryData.Contains(dtRecords.Columns[j].ColumnName.ToString().Trim()))
                    {
                        return "1|" + dtRecords.Columns[j].ColumnName.ToString().Trim() + " column is not a valid defined column. Please check ..";
                    }
                }

                using (SqlBulkCopy bulkCopy = new SqlBulkCopy(strcon))
                {
                    bulkCopy.BatchSize = 1000;
                    bulkCopy.NotifyAfter = 1000;

                    bulkCopy.DestinationTableName = "tmpDailyRouteData";
                    bulkCopy.ColumnMappings.Add(0, 0);
                    bulkCopy.ColumnMappings.Add(1, 1);
                    bulkCopy.ColumnMappings.Add(2, 2);
                    bulkCopy.ColumnMappings.Add(3, 3);
                    bulkCopy.ColumnMappings.Add(4, 4);
                    bulkCopy.ColumnMappings.Add(5, 5);
                    bulkCopy.ColumnMappings.Add(6, 6);
                    bulkCopy.ColumnMappings.Add(7, 7);
                    bulkCopy.ColumnMappings.Add(8, 8);
                    bulkCopy.ColumnMappings.Add(9, 9);

                    System.Data.SqlClient.SqlBulkCopyColumnMappingCollection sbcmc = bulkCopy.ColumnMappings;
                    bulkCopy.SqlRowsCopied += BulkCopy_SqlRowsCopied;
                    bulkCopy.WriteToServer(dtRecords);

                    clsSendLogMail.FnWriteLogFile_Log("", "end bulkcopy process");
                }
            }
            return "0|";
        }
        catch (Exception ex)
        {
            //clsSendLogMail.SendErrorMail("Error while Updating Data in DB (UploadData-bulkCopy). \n Error : " + ex.Message, FileName);
            return "1|" + ex.Message;
        }
    }


    string fileName = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["LoginID"] == null)
        {
            Response.Redirect("~/SessionExpiredpage.aspx");
            return;
        }
        if (this.IsPostBack)
        {
            HttpContext.Current.Session["dtMailStatus"] = null;
            UploadDetail Upload = (UploadDetail)this.Session["UploadDetail"];
            //Let the webservie know that we are not yet ready
            Upload.IsReady = false;
            int flgCallFrom = Convert.ToInt32(Request.Form["flgCallFrom"]);
            if (flgCallFrom == 1)
            {
                if (this.fileUpload.PostedFile != null && this.fileUpload.PostedFile.ContentLength > 0)
                {
                    Upload.IsReady = true;
                    //build the local path where upload all the files
                    string path = this.Server.MapPath(@"Uploads");
                    fileName = Path.GetFileName(this.fileUpload.PostedFile.FileName);
                    string fileNameWithoutExt = Path.GetFileNameWithoutExtension(this.fileUpload.PostedFile.FileName);

                    Upload.ContentLength = this.fileUpload.PostedFile.ContentLength;
                    Upload.FileName = fileName;
                    Upload.UploadedLength = 0;
                    Upload.Updatetype = 0;
                    //--------start astix code 



                    string FileSetType = Session["FileSetType"].ToString();

                    SqlConnection Scon = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
                    SqlCommand Scmd = new SqlCommand();
                    Scmd.Connection = Scon;
                    Scmd.CommandText = "[spGetFileSetId]";
                    Scmd.CommandType = CommandType.StoredProcedure;
                    Scmd.Parameters.AddWithValue("@FileName", fileNameWithoutExt + "_" + Convert.ToString(Session["username"]).ToLower());
                    Scmd.Parameters.AddWithValue("@FileSetType", FileSetType);
                    Scmd.Parameters.AddWithValue("@LoginId", Session["LoginID"].ToString());
                    Scmd.Parameters.Add("@FileSetId", SqlDbType.VarChar, 30);
                    Scmd.Parameters["@FileSetId"].Direction = ParameterDirection.Output;
                    Scon.Open();
                    Scmd.ExecuteNonQuery();
                    Scon.Close();
                    clsSendLogMail.FnWriteLogFile_Log("", "sp spGetFileSetId completed");
                    string FileSetID = Scmd.Parameters["@FileSetId"].Value.ToString();

                    string newfilename = Path.GetFileNameWithoutExtension(this.fileUpload.FileName) + "_" + FileSetID + "_" + Convert.ToString(Session["username"]).ToLower() + Path.GetExtension(this.fileUpload.FileName);

                    //-------- end astix code

                    //Build the strucutre and stuff it into session

                    Upload.NewFileName = Path.Combine(path, newfilename);
                    Upload.FileSetId = FileSetID;
                    Upload.FileSetType = FileSetType;
                    //Let the polling process know that we are done initializing ...


                    //set the buffer size to something larger.
                    //the smaller the buffer the longer it will take to download, 
                    //but the more precise your progress bar will be.
                    int bufferSize = 1;
                    byte[] buffer = new byte[bufferSize];




                    //Writing the byte to disk
                    using (FileStream fs = new FileStream(Path.Combine(path, newfilename), FileMode.Create)) //Path.Combine(path, fileName) raju
                    {
                        //Aslong was we haven't written everything ...
                        while (Upload.UploadedLength < Upload.ContentLength)
                        {
                            //Fill the buffer from the input stream
                            int bytes = this.fileUpload.PostedFile.InputStream.Read(buffer, 0, bufferSize);
                            //Writing the bytes to the file stream
                            fs.Write(buffer, 0, bytes);
                            //Update the number the webservice is polling on to the session
                            Upload.UploadedLength += bytes;
                        }
                    }
                    //Call parent page know we have processed the uplaod
                    try
                    {
                        Upload.IsReady = false;
                        Upload.Updatetype = 1;
                        string Uploadfullfilepath = HttpContext.Current.Server.MapPath(@"Uploads/" + newfilename);
                        string ErrorMsg = "";

                        clsSendLogMail.FnWriteLogFile_Log("", "file opening started.. ");
                        //FileStream oStream = File.Open(Uploadfullfilepath, FileMode.Open,FileAccess.Read);
                        //if (dsUnUpdated == null)
                        //{
                        //    IExcelDataReader iExcelDataReader = ExcelReaderFactory.CreateBinaryReader(oStream);
                        //    while (iExcelDataReader.Read())
                        //    {

                        //    }
                        //    iExcelDataReader.IsFirstRowAsColumnNames = true;

                        //    dsUnUpdated = iExcelDataReader.AsDataSet();

                        //    iExcelDataReader.Close();
                        //}
                        using (XLWorkbook workBook = new XLWorkbook(Uploadfullfilepath))
                        {
                            if (workBook.Worksheets.Count > 0)
                            {
                                Upload.IsReady = true;
                                int flg = 0;
                                IXLWorksheet workSheet = workBook.Worksheet(1);

                                SaveFile clsSave = new SaveFile();
                                //Create a new DataTable.
                                DataTable dt = new DataTable();
                                clsSendLogMail.FnWriteLogFile_Log("", " reading excel file for datatable");

                                dt = clsSave.createUpload_tbl(dt, workSheet, FileSetID, FileSetType, newfilename, Upload);

                                clsSendLogMail.FnWriteLogFile_Log("", " datatable loading complete");

                                long dtcount = 0;
                                if (dt.Rows.Count > 0 && flg == 0)
                                {
                                    dtcount = dt.Rows.Count;
                                    Upload.ContentLength = 0;
                                    Upload.UploadedLength = 0;
                                    Upload.Updatetype = 2;
                                    string strUpload = UploadData(dt, workSheet.Name, FileSetType, newfilename, Upload);
                                    if (strUpload.Split('|')[0] == "1")
                                    {
                                        flg = 1;
                                        ErrorMsg = strUpload.Split('|')[1];
                                    }

                                    dt.Dispose();
                                }
                                else
                                {
                                    flg = 1;
                                    ErrorMsg = "No data found in " + Path.GetFileName(Uploadfullfilepath) + " File.";
                                    dt.Dispose();
                                }


                                if (flg == 0)
                                {
                                    Upload.ContentLength = dtcount;
                                    Upload.UploadedLength = dtcount;
                                    Upload.Updatetype = 3;
                                    //  clsSendLogMail.FnWriteLogFile_Log("", " complete " + spName);
                                    string sresponses = "0^File uploaded successfully";

                                    //string js2 = "window.parent.onComplete(2,'File uploaded and Mails are being sent, pls wait..','{0}','{1} of {2} rows','{3}','{4}','{5}','{6}');";
                                    //ScriptManager.RegisterStartupScript(this, typeof(UploadEngine_DSEAbsentEmailData), "progress", string.Format(js2, fileName, Upload.UploadedLength, Upload.ContentLength, newfilename, FileSetID, FileSetType, 5), true);
                                    DataSet ds1 = new DataSet();
                                    SqlConnection Scon1 = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
                                    List<SqlParameter> sp = null;
                                    string spName = "spPopulateDailyDSERouteData";
                                    sp = new List<SqlParameter>()
                            {
                            new SqlParameter("@FileSetId", FileSetID)
                            };
                                    string storedProcName = spName;
                                    ds1 = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, Scon1, sp);
                                    ScriptManager.RegisterStartupScript(this, typeof(UploadEngine_DSEAbsentEmailData), "progress", string.Format("window.parent.onComplete(1,'File uploaded Successfully','{0}','{1} of {2} rows','{3}','{4}','{5}','{6}');", fileName, Upload.UploadedLength, Upload.ContentLength, fileName, FileSetID, FileSetID, 5), true);
                                }
                                else
                                {
                                    string js1 = "window.parent.onComplete(4,'" + ErrorMsg.Replace("'", "") + "','{0}','{1} of {2} rows','{3}','{4}','{5}','{6}');";
                                    ScriptManager.RegisterStartupScript(this, typeof(UploadEngine_DSEAbsentEmailData), "progress", string.Format(js1, fileName, Upload.UploadedLength, Upload.ContentLength, newfilename, FileSetID, FileSetID, 5), true);
                                }
                            }
                            else
                            {
                                string js5 = "window.parent.onComplete(4,'No Worksheet found !','{0}','{1} of {2} rows','{3}','{4}','{5}','{6}');";
                                ScriptManager.RegisterStartupScript(this, typeof(UploadEngine_DSEAbsentEmailData), "progress", string.Format(js5, fileName, Upload.UploadedLength, Upload.ContentLength, newfilename, FileSetID, FileSetID, 0), true);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        var error = ex.Message.Replace("'", "");
                        error = error.Replace(System.Environment.NewLine, "");
                        string js = "window.parent.onComplete(4, '" + error + "','','0 of 0 Bytes','','','',0);";
                        ScriptManager.RegisterStartupScript(this, typeof(UploadEngine_DSEAbsentEmailData), "progress", js, true);
                    }

                }
                else
                {
                    //Call parent page know we have processed the uplaod
                    const string js = "window.parent.onComplete(4, 'There was a problem with the file.','','0 of 0 Bytes','','','');";
                    ScriptManager.RegisterStartupScript(this, typeof(UploadEngine_DSEAbsentEmailData), "progress", js, true);
                }
            }
            else
            {
                try
                {

                    string strOnTime = Request.Form["strOnTime"].ToString();

                    Upload.IsReady = true;
                    Upload.Updatetype = 4;

                    System.Data.DataTable dtFiles = new System.Data.DataTable();
                    dtFiles.Columns.Add(new System.Data.DataColumn("SiteCode"));
                    dtFiles.Columns.Add(new System.Data.DataColumn("SiteName"));
                    dtFiles.Columns.Add(new System.Data.DataColumn("EmailIds"));
                    dtFiles.Columns.Add(new System.Data.DataColumn("MailStatus"));
                    Session["dtMailStatus"] = dtFiles;
                    string FileSetID = Request.Form["FileSetID"].ToString();
                    SqlConnection con = new SqlConnection(ConfigurationSettings.AppSettings["strConn"]);
                    string storedProcName = "spGetDSEAbsentEmailDataList";
                    List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@FileSetId", FileSetID)
                };
                    DataSet Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
                    int cnt = 1;
                    foreach (DataRow drow in Ds.Tables[0].Rows)//For SheetName
                    {
                        string strSheetName = drow["SiteCode"].ToString();
                        string SiteName = drow["SiteName"].ToString();
                        string EmailIds = drow["EmailId"].ToString();
                        string CCEmailIds = drow["CC"].ToString();
                        string Subject = drow["Subject"].ToString();
                        //cnt++;
                        fnRptSentData(Ds.Tables[cnt], Ds.Tables[cnt + 1], strSheetName, SiteName, EmailIds, CCEmailIds, Subject, strOnTime);
                        //if (cnt == 1)
                        //{
                        //    break;
                        //}
                        cnt = cnt + 2;
                    }
                    ScriptManager.RegisterStartupScript(this, typeof(UploadEngine_DSEAbsentEmailData), "progress", string.Format("window.parent.onComplete(1,'File uploaded Successfully','{0}','{1} of {2} rows','{3}','{4}','{5}','{6}');", "", 0, 0, "", FileSetID, FileSetID, 6), true);

                }
                catch (Exception ex)
                {
                    var error = ex.Message.Replace("'", "");
                    error = error.Replace(System.Environment.NewLine, "");
                    string js = "window.parent.onComplete(4, '" + error + "','','0 of 0 Bytes','','','',0);";
                    ScriptManager.RegisterStartupScript(this, typeof(UploadEngine_DSEAbsentEmailData), "progress", js, true);
                }
            }
            //Let webservie know that we are not yet ready
            Upload.IsReady = false;
        }
    }
    public void fnRptSentData(DataTable dt, DataTable dt_Detail, string strSheetName, string SiteName, string EmailIds, string CCEmailIds, string Subject, string strOnTime)
    {
        string[] SkipColumn = new string[0];
        int cntvalid = 0;
        using (XLWorkbook wb = new XLWorkbook())
        {
            cntvalid = 1;
            ////Start Chassiss
            int k = 1; int j = 0; int colFreeze = 2; int colLeft = 3;
            string strold = ""; int cntc = 0; int colst = 2; bool flgb = true;
            int resulsetcnt = 1;

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

            //IXLCell cell3 = ws.Cell(1, 1);
            //IXLCell cell4 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);
            //IXLCell cell5 = ws.Cell(dt.Rows.Count + noofsplit, dt.Columns.Count);
            //ws.Range(ws.Cell(k, 2), cell5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
            //ws.Range(cell3, cell4).Style.Border.SetInsideBorder(XLBorderStyleValues.Thin);
            //ws.Range(cell3, cell4).Style.Border.SetOutsideBorder(XLBorderStyleValues.Medium);

            // ws.Range(ws.Cell(dt.Rows.Count + 1, 1), cell4).Style.Fill.BackgroundColor = XLColor.FromHtml("#d6d6d6");
            //ws.Range(ws.Cell(dt.Rows.Count + 1, 1), cell4).Style.Font.FontColor = XLColor.FromHtml("#000000");
            ws.SheetView.FreezeRows(noofsplit);
            ws.SheetView.FreezeColumns(noofcolfreeze);


            //ws.Rows().AdjustToContents();
            ws.Range(1, 1, 1, dt.Columns.Count).Style.Alignment.WrapText = true;
            // string sFileName = Context.Server.MapPath("~/DSEAbsenteeismData") + "/DSEAbsenteeismData_" + strSheetName + "_" + DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xlsx";
            string sFileName = Context.Server.MapPath("~/DSE KPI Data") + "/DSE KPI Data_" + strSheetName + "_" + DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xlsx";
            // ScriptManager.RegisterStartupScript(this, typeof(UploadEngine_DSEAbsentEmailData), "progress", string.Format("window.parent.fnShowCompletition()"), true);
            byte[] sfiledata = null;
            using (MemoryStream ms = new MemoryStream())
            {
                wb.SaveAs(ms);
                sfiledata = ms.ToArray();
                ms.Position = 0;
                ms.Dispose();
            };


            // Create attachment
            //ContentType contentType = new ContentType();
            //contentType.MediaType = MediaTypeNames.Application.Octet;
            //contentType.Name = "application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            StringBuilder mailString = new StringBuilder();

            MailMessage objmail = new MailMessage();
            objmail = new System.Net.Mail.MailMessage();
            // objmail.Subject = "DSE Absenteeism Data of Site  " + SiteName + " (" + strSheetName + ") as on " + DateTime.Now.ToString("dd MMM yyyy") + "(" + strOnTime + ")";
            objmail.Subject = "Real-Time Sales Tracking Data of Site  " + SiteName + " (" + strSheetName + ") as on " + DateTime.Now.ToString("dd MMM yyyy") + "(" + strOnTime + ")";
            mailString.Append("<font  style='COLOR: #000080; FONT-FAMILY: Calibri'  size=2>");
            mailString.Append("<p>Hi Distributor IT Manager, </p>");
            // mailString.Append("<p>Please find below summary for DSE Absenteeism status for your Site "+ SiteName + " (" + strSheetName + ") as on " + DateTime.Now.ToString("dd MMM yyyy") +" ("+strOnTime+"). Details can be found in the attachment.</p>");
            mailString.Append("<p>Please find below summary for Real-Time Sales Tracking status for your Site " + SiteName + " (" + strSheetName + ") as on " + DateTime.Now.ToString("dd MMM yyyy") + " (" + strOnTime + "). Details can be found in the attachment.</p>");

            // mailString.Append("<br/><a href='"+ FilePath + "'>"+ FilePath + "</a>");
            StringBuilder mailBody = new StringBuilder();
            mailBody.Append("<table border='1' rules='all'>");
            mailBody.Append("<thead><tr>");
            foreach (DataColumn dcolumn in dt_Detail.Columns)
            {
                //strOnTime
                if (dcolumn.ColumnName.ToString().ToLower() == ("Total Stores Covered till").ToString().ToLower())
                {
                    mailBody.Append("<th align='center' style='font-weight:bold;background-color:#d9e1f2;padding:3px;text-align:center'>" + dcolumn.ColumnName + " " + strOnTime + "</th>");
                }
                else
                {
                    mailBody.Append("<th align='center' style='font-weight:bold;background-color:#d9e1f2;padding:3px;text-align:center'>" + dcolumn.ColumnName + "</th>");
                }
            }
            mailBody.Append("</tr></thead><tbody>");
            foreach (DataRow drow in dt_Detail.Rows)
            {
                mailBody.Append("<tr>");
                foreach (DataColumn dcolumn in dt_Detail.Columns)
                {
                    mailBody.Append("<td align='center' style='padding:3px;text-align:center'>" + drow[dcolumn.ColumnName].ToString() + "</td>");
                }
                mailBody.Append("</tr>");
            }
            mailBody.Append("</tbody></table>");
            mailString.Append(mailBody.ToString());

            mailString.Append("<br>Helpdesk");
            mailString.Append("<br>TAS");
            mailString.Append("</font>");

            //Attachment objAttachement = new Attachment(new MemoryStream(sfiledata), "DSEAbsenteeismData_" + strSheetName + "_" + DateTime.Now.ToString("yyyyMMddHHss") + ".xlsx");
            //objAttachement.Name = "DSEAbsenteeismData_" + strSheetName + "_" + DateTime.Now.ToString("yyyyMMddHHss") + ".xlsx";



          
            Attachment objAttachement = new Attachment(new MemoryStream(sfiledata), "DSE KPI Data " + SiteName + "-" + DateTime.Now.ToString("dd MMM yyyy") + "("+ strOnTime +")" + ".xlsx");
            objAttachement.Name = "DSE KPI Data " + SiteName + "-" + DateTime.Now.ToString("dd MMM yyyy") + "(" + strOnTime + ")"  + ".xlsx";

            //Attachment objAttachement = new Attachment(new MemoryStream(sfiledata), "DSE KPI Data_" + strSheetName + "_" + DateTime.Now.ToString("yyyyMMddHHss") + ".xlsx");
            //objAttachement.Name = "DSE KPI Data_" + strSheetName + "_" + DateTime.Now.ToString("yyyyMMddHHss") + ".xlsx";


            objmail.Attachments.Add(objAttachement);

            //objmail.To.Add(ConfigurationSettings.AppSettings["errTo"]);
           
             objmail.To.Add(EmailIds);
           
            if (CCEmailIds != "")
            {
                objmail.CC.Add(CCEmailIds);
            }
            objmail.IsBodyHtml = true;
            objmail.Body = Convert.ToString(mailString);
            objmail.From = new System.Net.Mail.MailAddress(ConfigurationManager.AppSettings["Title"] + "<astix@astixsolutions.com>");

            SmtpClient SmtpMail;
            SmtpMail = new SmtpClient();

            SmtpMail.Host = ConfigurationSettings.AppSettings["MailServerString"];
            SmtpMail.Port = Convert.ToInt32(ConfigurationSettings.AppSettings["smtpPort"]);

            NetworkCredential loginInfo;
            loginInfo = new NetworkCredential();
            loginInfo.UserName = ConfigurationSettings.AppSettings["DMSUser"];
            loginInfo.Password = ConfigurationSettings.AppSettings["DMSGPassword"];
            SmtpMail.Credentials = loginInfo;
            SmtpMail.EnableSsl = true;
            SmtpMail.Timeout = Int32.MaxValue;
            DataTable dtFiles = (DataTable)HttpContext.Current.Session["dtMailStatus"];
            try
            {
                SmtpMail.Send(objmail);
                mailString = null;
                sfiledata = null;
                System.Data.DataRow drFile = dtFiles.NewRow();
                drFile["SiteCode"] = strSheetName;
                drFile["SiteName"] = SiteName;
                drFile["EmailIds"] = EmailIds.Replace(",", "<br/>");
                drFile["MailStatus"] = "Sent at " + DateTime.Now.ToString("dd/MM/yy HH:mm:ss");
                dtFiles.Rows.Add(drFile);
                HttpContext.Current.Session["dtMailStatus"] = dtFiles;

                // File.Delete(sFileName);
            }
            catch (Exception ex)
            {
                System.Data.DataRow drFile = dtFiles.NewRow();
                drFile["SiteCode"] = strSheetName;
                drFile["SiteName"] = SiteName;
                drFile["EmailIds"] = EmailIds.Replace(",", "<br/>");
                drFile["MailStatus"] = "Error at " + DateTime.Now.ToString("dd/MM/yy HH:mm:ss") + "<br/>" + ex.Message;
                dtFiles.Rows.Add(drFile);
                HttpContext.Current.Session["dtMailStatus"] = dtFiles;
            }
            //  ScriptManager.RegisterStartupScript(this, typeof(UploadEngine_DSEAbsentEmailData), "progress", string.Format("window.parent.fnShowCompletition("+ resulsetcnt + ",3)"), true);
        }

    }

    #endregion












}
