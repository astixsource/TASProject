using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using ClosedXML.Excel;
using System.Web;
using System.IO;

public partial class ManageOrder_frmBranchMarketMapping : System.Web.UI.Page
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
                hdnLoginId.Value = Session["LoginID"].ToString();
                //hdnMenuId.Value = Request.QueryString["id"] == null ? "2" : Request.QueryString["id"].ToString();
                //fnBindSiteList();
                //fnBindDBRList();
            }
        }
    }






    //Get Scheme And Product Detail Bases on Store
    [System.Web.Services.WebMethod()]
    public static string fnDSEList(int LoginId)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        try
        {
            string storedProcName = "spGetDRCPStartData";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@LoginId", LoginId)//,
                   //new SqlParameter("@BranchNodeId", BranchNodeId),
                   //new SqlParameter("@BranchNodeType", BranchNodeType),
                   //new SqlParameter("@AttDate", DateTime.Now.ToString("dd-MMM-yyyy"))

                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            StringBuilder str = new StringBuilder();



            if (Ds.Tables[0].Rows.Count > 0)
            {
                string[] SkipColumn = new string[7];
              
                SkipColumn[0] = "BrnNodeId";
                SkipColumn[1] = "BrnNodeType";
                SkipColumn[2] = "RptMonthYear";
                SkipColumn[3] = "isBlocked";
                SkipColumn[4] = "Start Date";
                //SkipColumn[5] = "Month Name";
                SkipColumn[5] = "Market No";
                SkipColumn[6] = "DRCP Uploaded On";

                str.Append("<table id='tbldbrlist' style='width:100%' class='dataTable'><thead><tr style='height:25px;'>");

                string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";

                str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:5%' >SrNo</th>");
                for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                {
                    if (SkipColumn.Contains(Ds.Tables[0].Columns[j].ColumnName))
                    {
                        continue;
                    }
                    ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                    string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                    if (sColumnName == "BranchCode")
                    {
                        ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;'";
                    }
                    else if (sColumnName == "BranchName")
                    {
                        ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;'";
                    }
                    else if (sColumnName == "Month Name")
                    {
                        ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;'";
                    }
                    str.Append("<th " + ss + ">" + sColumnName.Split('^')[0] + "</th>");
                }
                //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:10%'>Month-Year</th>");
                //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:10%'>Market No</th>");
                str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:10%'>Start Date</th>");
                str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:16.5%'>DRCP Uploaded On</th>");
                str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:20%'>DRCP Apply / Download Calendar</th>");
                str.Append("</tr></thead><tbody>");

                ss = "";
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {

                    StringBuilder brnradiobutton = new StringBuilder();
                    DataColumnCollection columns = Ds.Tables[0].Columns;
                    int cnt = 0;

                    string dropdownlist_at = "";
                    
                    //DateTime date = DateTime.Now;
                    //var firstDayOfMonth1 = new DateTime(date.Year, date.Month, 1);
                    //var firstDayOfMonth2 = new DateTime(date.Year, date.Month, 1);

                    //string dropdownlist_month = "";

                    //dropdownlist_month += "<option value='" + string.Format("{0:MMM-yy}", firstDayOfMonth1) + "' selected>" + string.Format("{0:MMM-yyyy}", firstDayOfMonth1) + "</option>";
                    //dropdownlist_month += "<option value='" + string.Format("{0:MMM-yy}", firstDayOfMonth2) + "'>" + string.Format("{0:MMM-yyyy}", firstDayOfMonth2) + "</option>";




                    str.Append("<tr brnnodeid='" + Ds.Tables[0].Rows[i]["brnnodeid"].ToString() + "' brnnodetype='" + Ds.Tables[0].Rows[i]["brnnodetype"].ToString() + "' rptmonthyear='" + Ds.Tables[0].Rows[i]["RptMonthYear"].ToString() + "'  >");//MappingTypeId='" + Ds.Tables[0].Rows[i]["MappingTypeId"].ToString() + "'
                    str.Append("<td style='text-align:center'>" + (i + 1) + "</td>");
                    for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                    {
                        string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                        if (SkipColumn.Contains(sColumnName))
                        {
                            continue;
                        }
                        if (sColumnName.Contains("Market"))
                        {
                            int cntlength = Convert.ToInt32(sColumnName.Split('^')[1])+1;
                            for (var k = 0; k < cntlength; k++)
                            {
                                if (Ds.Tables[0].Rows[i][sColumnName].ToString() == k.ToString())
                                {
                                    dropdownlist_at += "<option value='" + k + "' selected>" + (k.ToString() == "0" ? "--Select--" : k.ToString()) + "</option>";
                                }
                                else
                                {
                                    dropdownlist_at += "<option value='" + k + "'>" + (k.ToString() == "0" ? "--Select--" : k.ToString()) + "</option>";
                                }
                            }
                            str.Append("<td style='text-align:center'><select " + (Ds.Tables[0].Rows[i]["IsBlocked"].ToString() == "0" ? "" : "disabled='disabled'") + ">" + dropdownlist_at + "</select></td>");
                            dropdownlist_at = "";
                        }
                        else {

                            var sData = Ds.Tables[0].Rows[i][j];
                            ss = "style='text-align:left'";
                            if (sData.GetType() == typeof(int))
                            {
                                ss = "style='text-align:center'";
                            }



                            string flgSearchable = "Searchable='0'";
                            //if (Ds.Tables[0].Columns[j].ColumnName == "DSECode" || Ds.Tables[0].Columns[j].ColumnName == "DSEName")
                            //{
                            flgSearchable = "Searchable='1'";
                            //}
                            //ss += "'";
                            str.Append("<td " + ss + "   " + flgSearchable + ">" + sData + "</td>");
                        }
                    }
                    //str.Append("<td style='text-align:center'><input id='txtMdate" + i + "' value='" + Ds.Tables[0].Rows[i]["Month Name"].ToString() + "' class='clsdtpM' type='text' style='width:80px;' readonly ></td>");
                    
                    str.Append("<td style='text-align:center'><input id='txtdate" + i + "' value='" + Ds.Tables[0].Rows[i]["Start Date"].ToString() + "' class='clsdtp' type='text' style='width:80px;' " + (Ds.Tables[0].Rows[i]["IsBlocked"].ToString() == "0" ? "" : "disabled='disabled'") + " readonly ></td>");
                    if (Ds.Tables[0].Rows[i]["DRCP Uploaded On"].ToString() != "")
                    {
                        str.Append("<td style='text-align:center'><a href='###' onclick='fndownload(this)' style='color:blue;text-decoration:underline;' >" + Ds.Tables[0].Rows[i]["DRCP Uploaded On"].ToString() + "</a></td>");
                    }
                    else
                    {
                        str.Append("<td style='text-align:center'>Not Uploaded</td>");
                    }
                    if (Ds.Tables[0].Rows[i]["DRCP Uploaded On"].ToString() != "")
                    {
                        if (Ds.Tables[0].Rows[i]["IsBlocked"].ToString() == "0")
                        {
                            str.Append("<td style='text-align:center'><a href='###' onclick='fnSaveFinalData(this)' style='color:blue;text-decoration:underline;' >Apply</a></td>");
                        }
                        else
                        {
                            str.Append("<td style='text-align:center'><a href ='###' onclick ='fnDownloadRouteCalendar(this,1)'  style='color:blue;text-decoration:underline;'>DSE Route</a><a href ='###' onclick ='fnDownloadRouteCalendar(this,2)'  style='color:blue;text-decoration:underline;margin-left:8px'>TC Route</a><a href ='###' onclick ='fnUnlockDRCP(this)'  style='color:blue;text-decoration:underline;margin-left:8px'>Unlock DRCP</a></td>");
                        }
                    }
                    else
                    {
                        str.Append("<td style='text-align:center'>Not Uploaded</td>");
                    }
                    str.Append("</tr>");
                }
                str.Append("</tbody></table>");
            }
            else
            {
                str.Append("");
            }
            stresponse = str.ToString() + "|";
        }
        catch (Exception ex)
        {
            stresponse = "2|" + ex.Message;
        }
        finally
        {
            con.Dispose();
        }

        return stresponse;
    }



    //Get Scheme And Product Detail Bases on Store
    [System.Web.Services.WebMethod()]
    public static string fnSubmitMarketMapping(int LoginId, object objAttendance)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        string stresponse = "";
        SqlTransaction transaction;
        con.Open();
        transaction = con.BeginTransaction();
        try
        {
            string strobjAttendance = JsonConvert.SerializeObject(objAttendance, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
            DataTable tblOtherChargesDetail = JsonConvert.DeserializeObject<DataTable>(strobjAttendance);
            tblOtherChargesDetail.TableName = "BrnDRCPMapping";
            //if (tblOtherChargesDetail.Columns.Count == 0)
            //{
            //    tblOtherChargesDetail.Columns.Add("BranchNodeId", typeof(int));
            //    tblOtherChargesDetail.Columns.Add("BranchNodeType", typeof(int));
            //    tblOtherChargesDetail.Columns.Add("SiteNodeId", typeof(int));
            //    tblOtherChargesDetail.Columns.Add("SiteNodeType", typeof(int));
            //    tblOtherChargesDetail.Columns.Add("MappingTypeId", typeof(int));
            //    tblOtherChargesDetail.Columns.Add("TransferDate", typeof(string));

            //}

            string storedProcName = "spPopulateRouteCalendar";//spBranchSwingLeapMapping
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@BrnDRCPMapping", tblOtherChargesDetail),
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

    //Get Scheme And Product Detail Bases on Store
    [System.Web.Services.WebMethod()]
    public static string fnUnlockMarketMapping(string LoginId, string BranchNodeId,string BranchNodeType,string Rptmonthyear)
    {
        string stresponse = "";
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        SqlTransaction transaction;
        con.Open();
        transaction = con.BeginTransaction();
        try
        {
            string storedProcName = "spOpenBranchDRCPApplicable";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@BranchNodeId", BranchNodeId),
                   new SqlParameter("@BranchNodeType", BranchNodeType),
                   new SqlParameter("@Rptmonthyear", Rptmonthyear),
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


    protected void btnDownload_Click(object sender, EventArgs e)
    {
        fnDownloadExcel();
    }
    public void fnDownloadExcel()
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

                    Scmd.CommandText = "[spDownloadLatestDRCPData]";
                    Scmd.Parameters.AddWithValue("@BranchNodeId", hdnbrnnodeid.Value);
                    Scmd.Parameters.AddWithValue("@BranchNodeType", hdnbrnnodetype.Value);
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
            string filename = "";
            filename = "MarketMapping" + DateTime.Now.ToString("dd_MMM_yyyy_hhmmsstt");
            
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
                            ws.Cell(i + noofsplit + 1, j+1).Value = dt.Rows[i][j].ToString();
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



    protected void btnRouteCalenderDownload_Click(object sender, EventArgs e)
    {
        fnDownloadExcelCalendar();
    }
    public void fnDownloadExcelCalendar() {
        try
        {
            DataSet Ds = new DataSet();
            string strConn = ConfigurationManager.AppSettings["strConn"].ToString();
            using (SqlConnection Scon = new SqlConnection(strConn))
            {
                using (SqlCommand Scmd = new SqlCommand())
                {
                    Scmd.Connection = Scon;

                    Scmd.CommandText = hdnRpttype.Value == "1" ? "[spDownloadMonthlyDSERouteCalendar]" : "spDownloadMonthlyTeleCallingRouteCalendar";
                    Scmd.Parameters.AddWithValue("@BranchNodeId", hdnbrnnodeid.Value);
                    Scmd.Parameters.AddWithValue("@BranchNodeType", hdnbrnnodetype.Value);
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
            string filename = hdnRpttype.Value == "1" ? "MonthlyDSERouteCalendar" : "MonthlyTeleCallingRouteCalendar";
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
}