using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Data.SqlClient;
using System.Text;
using System.IO;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Data;

/// <summary>
/// Summary description for WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService {
    SqlConnection objCon;
    SqlCommand objCom;

    public WebService () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld() {
        return "Hello World";
    }

     [WebMethod(EnableSession = true)]
    public string FnGetDataActivityReportForMTTEMP(string FromDate, string Todate, int rdolist, string measure, int PrdNodeType, string PrdNodeID, int SalesNodeType, string SalesNodeID, int ddlManin2, int ddlMain3, int MeasureType)
    {
        string strConn = "server=103.16.141.16;database=db_KenyaSales_DemoWithSurvey;uid=sa;pwd=pass@123;connection timeout=0";
        objCon = new SqlConnection(strConn);
        objCom = new SqlCommand();

        objCom.Parameters.AddWithValue("@LoginId", HttpContext.Current.Session["LoginId"]);
        objCom.Parameters.AddWithValue("@FromDate", FromDate);
        objCom.Parameters.AddWithValue("@ToDate", Todate);
        objCom.Parameters.AddWithValue("@DateGrp", rdolist);
        objCom.Parameters.AddWithValue("@MeasureId", measure);
        objCom.Parameters.AddWithValue("@ProdNodeType", PrdNodeType);
        objCom.Parameters.AddWithValue("@ProdDet", PrdNodeID);
        objCom.Parameters.AddWithValue("@SalesHNodeType", SalesNodeType);
        objCom.Parameters.AddWithValue("@SalesHDet", SalesNodeID);
        objCom.Parameters.AddWithValue("@SalesDisplayNodeType", ddlManin2);
        objCom.Parameters.AddWithValue("@DataGroupID", 0);
        objCom.Parameters.AddWithValue("@DataGroupNodeType", ddlMain3);
        objCom.Parameters.AddWithValue("@TradeType", 2);
        objCom.Parameters.AddWithValue("@MeasureDisplayType", MeasureType);
        objCom.CommandText = "[spActivityReportMT]";
        objCom.CommandType = CommandType.StoredProcedure;
        objCom.CommandTimeout = 0;
        objCom.Connection = objCon;
        DataSet ds = new DataSet();
        SqlDataAdapter da = new SqlDataAdapter(objCom);
        da.Fill(ds);
        DataTable DTDstr = ds.Tables[0];
        DataTable DTDate = ds.Tables[1];
        DataTable DTProduct = ds.Tables[3];
        DataTable DtMeasure = ds.Tables[2];

        int datecount = DTDate.Columns.Count;
        int Prodcount = DTProduct.Rows.Count;
        int measurecount = DtMeasure.Rows.Count;

        int datemerge = Prodcount * measurecount;
        int prodmerge = measurecount;


        HtmlTable HtTblOuter = new HtmlTable();
        HtmlTableRow HtTblOuterRow = null;
        HtmlTableCell HtTblOuterCell = null;

        HtTblOuterRow = new HtmlTableRow();
        HtTblOuterRow.Attributes.Add("style", "font-family:verdana; font-size:13px; font-weight:bold");
        HtTblOuterCell = new HtmlTableCell();
        HtTblOuterCell.Align = "center";
        HtTblOuterCell.InnerText = "";
        HtTblOuterRow.Cells.Add(HtTblOuterCell);
        HtTblOuter.Rows.Add(HtTblOuterRow);

        HtTblOuterRow = new HtmlTableRow();
        HtTblOuterRow.Attributes.Add("style", "font-family:verdana; font-size:13px; font-weight:bold");
        HtTblOuterCell = new HtmlTableCell();
        HtTblOuterCell.Align = "center";
        HtTblOuterCell.InnerText = "";
        HtTblOuterRow.Cells.Add(HtTblOuterCell);
        HtTblOuter.Rows.Add(HtTblOuterRow);

        HtTblOuterRow = new HtmlTableRow();
        HtTblOuterCell = new HtmlTableCell();
        HtTblOuterCell.Align = "center";
        HtTblOuterCell.InnerHtml = "&nbsp;";
        HtTblOuterRow.Cells.Add(HtTblOuterCell);
        HtTblOuter.Rows.Add(HtTblOuterRow);

        HtTblOuterRow = new HtmlTableRow();
        HtTblOuterCell = new HtmlTableCell();
        HtTblOuterCell.Align = "center";
        HtTblOuterRow.Cells.Add(HtTblOuterCell);
        HtTblOuter.Rows.Add(HtTblOuterRow);

        HtmlTable HtTblInner = new HtmlTable();
        HtTblInner.Width = "800px";
        HtTblInner.CellPadding = 0;
        HtTblInner.CellSpacing = 0;
        HtTblInner.Border = 1;
        HtmlTableRow HtTblInnerRow = null;
        HtmlTableCell HtTblInnerCell = null;

        HtTblInnerRow = new HtmlTableRow();
        HtTblInnerRow.Attributes.Add("style", "font-family:verdana; font-size:11px; font-weight:bold");
        HtTblInnerRow.Attributes.Add("style", " background-color:#446286;color:#FFFFFF");
        HtTblInnerCell = new HtmlTableCell();
        HtTblInnerCell.Align = "center";
        HtTblInnerCell.InnerText = "Name";
        HtTblInnerRow.Cells.Add(HtTblInnerCell);

        foreach (DataRow drdate in DTDate.Rows)
        {
            HtTblInnerCell = new HtmlTableCell();
            HtTblInnerCell.Align = "center";
            HtTblInnerCell.InnerText = Convert.ToDateTime(drdate[0]).ToString("dd-MMM-yyyy");

            HtTblInnerCell.ColSpan = datemerge;
            HtTblInnerRow.Cells.Add(HtTblInnerCell);
        }

        HtTblInnerCell = new HtmlTableCell();
        HtTblInnerCell.Align = "center";
        HtTblInnerCell.InnerText = "Total";
        HtTblInnerCell.ColSpan = datemerge;
        HtTblInnerRow.Cells.Add(HtTblInnerCell);
        HtTblInner.Rows.Add(HtTblInnerRow);

        HtTblInnerRow = new HtmlTableRow();
        HtTblInnerRow.Attributes.Add("style", "font-family:verdana; font-size:11px; font-weight:bold");

        HtTblInnerCell = new HtmlTableCell();
        HtTblInnerCell.Align = "center";
        HtTblInnerCell.InnerText = "";

        HtTblInnerRow.Cells.Add(HtTblInnerCell);
        foreach (DataRow drdate in DTDate.Rows)
        {
            foreach (DataRow drproduct in DTProduct.Rows)
            {
                HtTblInnerCell = new HtmlTableCell();
                HtTblInnerCell.Align = "center";
                HtTblInnerCell.InnerText = drproduct[0].ToString();
                HtTblInnerCell.ColSpan = prodmerge;
                HtTblInnerRow.Cells.Add(HtTblInnerCell);
            }


        }
        foreach (DataRow drproduct in DTProduct.Rows)
        {
            HtTblInnerCell = new HtmlTableCell();
            HtTblInnerCell.Align = "center";
            HtTblInnerCell.InnerText = drproduct[0].ToString();
            HtTblInnerCell.ColSpan = prodmerge;
            HtTblInnerRow.Cells.Add(HtTblInnerCell);
        }
        HtTblInner.Rows.Add(HtTblInnerRow);

        HtTblInnerRow = new HtmlTableRow();
        HtTblInnerRow.Attributes.Add("style", "font-family:verdana; font-size:11px; font-weight:bold");
        HtTblInnerCell = new HtmlTableCell();
        HtTblInnerCell.Align = "center";
        HtTblInnerCell.InnerText = "";
        HtTblInnerRow.Cells.Add(HtTblInnerCell);
        foreach (DataRow drdate in DTDate.Rows)
        {
            foreach (DataRow drproduct in DTProduct.Rows)
            {
                foreach (DataRow drmeasure in DtMeasure.Rows)
                {
                    HtTblInnerCell = new HtmlTableCell();
                    HtTblInnerCell.Align = "center";
                    if (drmeasure[0].ToString().ToUpper() == "OVERALLSTOCK")
                    {
                        HtTblInnerCell.InnerText = "Stock";
                    }
                    else
                    {
                        HtTblInnerCell.InnerText = drmeasure[0].ToString();
                    }
                    HtTblInnerRow.Cells.Add(HtTblInnerCell);
                }
            }

        }

        foreach (DataRow drproduct in DTProduct.Rows)
        {
            foreach (DataRow drmeasure in DtMeasure.Rows)
            {
                HtTblInnerCell = new HtmlTableCell();
                HtTblInnerCell.Align = "center";
                if (drmeasure[0].ToString().ToUpper() == "OVERALLSTOCK")
                {
                    HtTblInnerCell.InnerText = "Stock";
                }
                else
                {
                    HtTblInnerCell.InnerText = drmeasure[0].ToString();
                }
                HtTblInnerRow.Cells.Add(HtTblInnerCell);
            }
        }
        HtTblInner.Rows.Add(HtTblInnerRow);
        int CellCount = 1;
        foreach (DataRow drDstr in DTDstr.Rows)
        {

            HtTblInnerRow = new HtmlTableRow();
            HtTblInnerRow.Attributes.Add("style", "font-family:verdana; font-size:11px");
            HtTblInnerCell = new HtmlTableCell();
            CellCount = 0;
            for (; CellCount <= DTDstr.Columns.Count - 1; CellCount++)
            {
                string aa = drDstr[CellCount].ToString();
                HtTblInnerCell = new HtmlTableCell();
                HtTblInnerCell.Align = "center";
                HtTblInnerCell.InnerText = aa;
                HtTblInnerRow.Cells.Add(HtTblInnerCell);
            }
            foreach (DataRow drproduct in DTProduct.Rows)
            {
                foreach (DataRow drmeasure in DtMeasure.Rows)
                {
                    double sum = 0;
                    int flag = 0;
                    var srr = DTDstr.Columns.Cast<DataColumn>().Where(x => x.ColumnName.Contains(drproduct[0].ToString()) && x.ColumnName.Contains(drmeasure[0].ToString()));
                    foreach (DataColumn dc in srr)
                    {

                        if (!(drDstr[dc.ColumnName] is DBNull))
                        {
                            sum += Convert.ToDouble(drDstr[dc.ColumnName]);
                        }

                    }

                    HtTblInnerCell = new HtmlTableCell();
                    HtTblInnerCell.Align = "center";
                    if (drmeasure[0].ToString().ToUpper() == "OVERALLSTOCK")
                    {
                        HtTblInnerCell.InnerText = "0";
                    }
                    else
                    {
                        HtTblInnerCell.InnerText = sum.ToString();
                    }
                    HtTblInnerRow.Cells.Add(HtTblInnerCell);
                }
            }
            HtTblInner.Rows.Add(HtTblInnerRow);
        }
        HtTblInnerRow = new HtmlTableRow();

        HtTblInnerRow.Attributes.Add("style", "font-family:verdana; font-size:11px; font-weight:bold");
        foreach (DataColumn column in DTDstr.Columns)
        {

            string colname = column.ColumnName;
            if (colname == "GrpName")
            {
                HtTblInnerCell = new HtmlTableCell();
                HtTblInnerCell.Align = "center";
                HtTblInnerCell.InnerText = "Total";
                HtTblInnerRow.Cells.Add(HtTblInnerCell);
            }
            else
            {

                HtTblInnerCell = new HtmlTableCell();
                HtTblInnerCell.Align = "center";
                if (DTDstr.Compute("sum([" + column.ColumnName + "])", "").ToString() == "")
                {
                    HtTblInnerCell.InnerText = "0";
                }
                else
                {
                    if (colname.Split('^')[4].ToUpper() == "OVERALLSTOCK")
                    {
                        HtTblInnerCell.InnerText = "0";
                    }
                    else
                    {
                        HtTblInnerCell.InnerText = DTDstr.Compute("sum([" + column.ColumnName + "])", "").ToString();
                    }
                }
                HtTblInnerRow.Cells.Add(HtTblInnerCell);
            }
        }

        Double ColSum = 0;

        for (int i = 1; i <= datemerge; i++)
        {
            int j = 1;
            ColSum = 0;
            for (j = i; j <= DTDstr.Columns.Count - 1; j += datemerge)
            {
                if (!(DTDstr.Compute("SUM([" + DTDstr.Columns[j].ColumnName + "])", "") is DBNull))
                {
                    string x = Convert.ToString(DTDstr.Compute("SUM([" + DTDstr.Columns[j].ColumnName + "])", ""));
                    ColSum = ColSum + Convert.ToDouble(DTDstr.Compute("SUM([" + DTDstr.Columns[j].ColumnName + "])", ""));

                }

            }
            HtTblInnerCell = new HtmlTableCell();
            HtTblInnerCell.Align = "center";
            string colname = DTDstr.Columns[i].ColumnName.Split('^')[4].ToUpper();
            if (colname == "OVERALLSTOCK")
            {
                HtTblInnerCell.InnerText = "0";
            }
            else
            {
                HtTblInnerCell.InnerText = ColSum.ToString();
            }
            HtTblInnerRow.Cells.Add(HtTblInnerCell);
        }

        HtTblInner.Rows.Add(HtTblInnerRow);
        HtTblOuterCell.Controls.Add(HtTblInner);
        StringWriter stw = new StringWriter();
        HtmlTextWriter htm = new HtmlTextWriter(stw);
        HtTblOuter.RenderControl(htm);
        return stw.ToString();
    }
   

     [WebMethod(EnableSession = true)]
     public string FnGetDataActivityReportForTTTEMP(string FromDate, string Todate, int rdolist, string measure, int PrdNodeType, string PrdNodeID, int SalesNodeType, string SalesNodeID, int ddlManin2, int ddlMain3, int MeasureType)
     {
         string strConn = "server=103.16.141.16;database=db_KenyaSales_DemoWithSurvey;uid=sa;pwd=pass@123;connection timeout=0";
         objCon = new SqlConnection(strConn);
         objCom = new SqlCommand();
         objCom.Parameters.AddWithValue("@LoginId", HttpContext.Current.Session["LoginId"]);
         objCom.Parameters.AddWithValue("@FromDate", FromDate);
         objCom.Parameters.AddWithValue("@ToDate", Todate);
         objCom.Parameters.AddWithValue("@DateGrp", rdolist);
         objCom.Parameters.AddWithValue("@MeasureId", measure);
         objCom.Parameters.AddWithValue("@ProdNodeType", PrdNodeType);
         objCom.Parameters.AddWithValue("@ProdDet", PrdNodeID);
         objCom.Parameters.AddWithValue("@SalesHNodeType", SalesNodeType);
         objCom.Parameters.AddWithValue("@SalesHDet", SalesNodeID);
         objCom.Parameters.AddWithValue("@SalesDisplayNodeType", ddlManin2);
         objCom.Parameters.AddWithValue("@DataGroupID", 0);
         objCom.Parameters.AddWithValue("@DataGroupNodeType", ddlMain3);
         objCom.Parameters.AddWithValue("@TradeType", 1);
         objCom.Parameters.AddWithValue("@MeasureDisplayType", MeasureType);
         objCom.CommandText = "[spActivityReportTT]";
         objCom.CommandType = CommandType.StoredProcedure;
         objCom.CommandTimeout = 0;
         objCom.Connection = objCon;
         DataSet ds = new DataSet();
         SqlDataAdapter da = new SqlDataAdapter(objCom);
         da.Fill(ds);
         DataTable DTDstr = ds.Tables[0];
         DataTable DTDate = ds.Tables[1];
         DataTable DTProduct = ds.Tables[3];
         DataTable DtMeasure = ds.Tables[2];

         int datecount = DTDate.Columns.Count;
         int Prodcount = DTProduct.Rows.Count;
         int measurecount = DtMeasure.Rows.Count;

         int datemerge = Prodcount * measurecount;
         int prodmerge = measurecount;


         HtmlTable HtTblOuter = new HtmlTable();
         HtmlTableRow HtTblOuterRow = null;
         HtmlTableCell HtTblOuterCell = null;

         HtTblOuterRow = new HtmlTableRow();
         HtTblOuterRow.Attributes.Add("style", "font-family:verdana; font-size:13px; font-weight:bold");
         HtTblOuterCell = new HtmlTableCell();
         HtTblOuterCell.Align = "center";
         HtTblOuterCell.InnerText = "";
         HtTblOuterRow.Cells.Add(HtTblOuterCell);
         HtTblOuter.Rows.Add(HtTblOuterRow);

         HtTblOuterRow = new HtmlTableRow();
         HtTblOuterRow.Attributes.Add("style", "font-family:verdana; font-size:13px; font-weight:bold");
         HtTblOuterCell = new HtmlTableCell();
         HtTblOuterCell.Align = "center";
         HtTblOuterCell.InnerText = "";
         HtTblOuterRow.Cells.Add(HtTblOuterCell);
         HtTblOuter.Rows.Add(HtTblOuterRow);

         HtTblOuterRow = new HtmlTableRow();
         HtTblOuterCell = new HtmlTableCell();
         HtTblOuterCell.Align = "center";
         HtTblOuterCell.InnerHtml = "&nbsp;";
         HtTblOuterRow.Cells.Add(HtTblOuterCell);
         HtTblOuter.Rows.Add(HtTblOuterRow);

         HtTblOuterRow = new HtmlTableRow();
         HtTblOuterCell = new HtmlTableCell();
         HtTblOuterCell.Align = "center";
         HtTblOuterRow.Cells.Add(HtTblOuterCell);
         HtTblOuter.Rows.Add(HtTblOuterRow);




         HtmlTable HtTblInner = new HtmlTable();
         HtTblInner.Width = "800px";
         HtTblInner.CellPadding = 0;
         HtTblInner.CellSpacing = 0;
         HtTblInner.Border = 1;
         HtmlTableRow HtTblInnerRow = null;
         HtmlTableCell HtTblInnerCell = null;

         HtTblInnerRow = new HtmlTableRow();
         HtTblInnerRow.Attributes.Add("style", "font-family:verdana; font-size:11px; font-weight:bold");
         HtTblInnerRow.Attributes.Add("style", " background-color:#446286;color:#FFFFFF");

         HtTblInnerCell = new HtmlTableCell();
         HtTblInnerCell.Align = "center";
         HtTblInnerCell.InnerText = "Sr.No";
         HtTblInnerRow.Cells.Add(HtTblInnerCell);

         HtTblInnerCell = new HtmlTableCell();
         HtTblInnerCell.Align = "center";
         HtTblInnerCell.InnerText = "Parent";
         HtTblInnerRow.Cells.Add(HtTblInnerCell);


         HtTblInnerCell = new HtmlTableCell();
         HtTblInnerCell.Align = "center";
         HtTblInnerCell.InnerText = "Name";
         HtTblInnerRow.Cells.Add(HtTblInnerCell);

         foreach (DataRow drdate in DTDate.Rows)
         {
             HtTblInnerCell = new HtmlTableCell();
             HtTblInnerCell.Align = "center";
             HtTblInnerCell.InnerText = Convert.ToDateTime(drdate[0]).ToString("dd-MMM-yyyy");

             HtTblInnerCell.ColSpan = datemerge;
             HtTblInnerRow.Cells.Add(HtTblInnerCell);
         }

         HtTblInnerCell = new HtmlTableCell();
         HtTblInnerCell.Align = "center";
         HtTblInnerCell.InnerText = "Total";
         HtTblInnerCell.ColSpan = datemerge;
         HtTblInnerRow.Cells.Add(HtTblInnerCell);
         HtTblInner.Rows.Add(HtTblInnerRow);

         HtTblInnerRow = new HtmlTableRow();
         HtTblInnerRow.Attributes.Add("style", "font-family:verdana; font-size:11px; font-weight:bold");

         HtTblInnerCell = new HtmlTableCell();
         HtTblInnerCell.Align = "center";
         HtTblInnerCell.InnerText = "";

         HtTblInnerRow.Cells.Add(HtTblInnerCell);
         HtTblInnerCell = new HtmlTableCell();
         HtTblInnerCell.Align = "center";
         HtTblInnerCell.InnerText = "";

         HtTblInnerRow.Cells.Add(HtTblInnerCell);
         HtTblInnerCell = new HtmlTableCell();
         HtTblInnerCell.Align = "center";
         HtTblInnerCell.InnerText = "";

         HtTblInnerRow.Cells.Add(HtTblInnerCell);
         foreach (DataRow drdate in DTDate.Rows)
         {
             foreach (DataRow drproduct in DTProduct.Rows)
             {
                 HtTblInnerCell = new HtmlTableCell();
                 HtTblInnerCell.Align = "center";
                 HtTblInnerCell.InnerText = drproduct[0].ToString();
                 HtTblInnerCell.ColSpan = prodmerge;
                 HtTblInnerRow.Cells.Add(HtTblInnerCell);
             }


         }
         foreach (DataRow drproduct in DTProduct.Rows)
         {
             HtTblInnerCell = new HtmlTableCell();
             HtTblInnerCell.Align = "center";
             HtTblInnerCell.InnerText = drproduct[0].ToString();
             HtTblInnerCell.ColSpan = prodmerge;
             HtTblInnerRow.Cells.Add(HtTblInnerCell);
         }
         HtTblInner.Rows.Add(HtTblInnerRow);

         HtTblInnerRow = new HtmlTableRow();
         HtTblInnerRow.Attributes.Add("style", "font-family:verdana; font-size:11px; font-weight:bold");
         HtTblInnerCell = new HtmlTableCell();
         HtTblInnerCell.Align = "center";
         HtTblInnerCell.InnerText = "";
         HtTblInnerRow.Cells.Add(HtTblInnerCell);
         HtTblInnerCell = new HtmlTableCell();
         HtTblInnerCell.Align = "center";
         HtTblInnerCell.InnerText = "";
         HtTblInnerRow.Cells.Add(HtTblInnerCell);
         HtTblInnerCell = new HtmlTableCell();
         HtTblInnerCell.Align = "center";
         HtTblInnerCell.InnerText = "";
         HtTblInnerRow.Cells.Add(HtTblInnerCell);
         foreach (DataRow drdate in DTDate.Rows)
         {
             foreach (DataRow drproduct in DTProduct.Rows)
             {
                 foreach (DataRow drmeasure in DtMeasure.Rows)
                 {
                     HtTblInnerCell = new HtmlTableCell();
                     HtTblInnerCell.Align = "center";
                     HtTblInnerCell.InnerText = drmeasure[0].ToString();
                     HtTblInnerRow.Cells.Add(HtTblInnerCell);
                 }
             }

         }

         foreach (DataRow drproduct in DTProduct.Rows)
         {
             foreach (DataRow drmeasure in DtMeasure.Rows)
             {
                 HtTblInnerCell = new HtmlTableCell();
                 HtTblInnerCell.Align = "center";
                 HtTblInnerCell.InnerText = drmeasure[0].ToString();
                 HtTblInnerRow.Cells.Add(HtTblInnerCell);
             }

         }
         HtTblInner.Rows.Add(HtTblInnerRow);
         int CellCount = 1;
         int SRNO = 1;
         foreach (DataRow drDstr in DTDstr.Rows)
         {
             HtTblInnerRow = new HtmlTableRow();
             HtTblInnerRow.Attributes.Add("style", "font-family:verdana; font-size:11px");
             HtTblInnerCell = new HtmlTableCell();
             CellCount = 0;
             HtTblInnerCell = new HtmlTableCell();
             HtTblInnerCell.Align = "center";
             HtTblInnerCell.InnerText = SRNO.ToString();
             HtTblInnerRow.Cells.Add(HtTblInnerCell);

             for (; CellCount <= DTDstr.Columns.Count - 1; CellCount++)
             {
                 string aa = drDstr[CellCount].ToString();

                 if (aa == "0.00")
                 {
                     HtTblInnerCell = new HtmlTableCell();
                     HtTblInnerCell.Align = "center";
                     HtTblInnerCell.InnerText = "";
                     HtTblInnerRow.Cells.Add(HtTblInnerCell);
                 }
                 else if (aa == "0")
                 {
                     HtTblInnerCell = new HtmlTableCell();
                     HtTblInnerCell.Align = "center";
                     HtTblInnerCell.InnerText = "";
                     HtTblInnerRow.Cells.Add(HtTblInnerCell);
                 }
                 else
                 {
                     HtTblInnerCell = new HtmlTableCell();
                     HtTblInnerCell.Align = "center";
                     HtTblInnerCell.InnerText = aa;
                     HtTblInnerRow.Cells.Add(HtTblInnerCell);
                 }
                 //HtTblInnerCell = new HtmlTableCell();
                 //HtTblInnerCell.Align = "center";
                 //HtTblInnerCell.InnerText = aa;
                 //HtTblInnerRow.Cells.Add(HtTblInnerCell);

             }
             SRNO++;

             foreach (DataRow drproduct in DTProduct.Rows)
             {
                 foreach (DataRow drmeasure in DtMeasure.Rows)
                 {
                     double sum = 0;
                     int flag = 0;
                     var srr = DTDstr.Columns.Cast<DataColumn>().Where(x => x.ColumnName.Contains(drproduct[0].ToString()) && x.ColumnName.Contains(drmeasure[0].ToString()));
                     foreach (DataColumn dc in srr)
                     {

                         if (!(drDstr[dc.ColumnName] is DBNull))
                         {
                             sum += Convert.ToDouble(drDstr[dc.ColumnName]);
                         }

                     }

                     HtTblInnerCell = new HtmlTableCell();
                     HtTblInnerCell.Align = "center";
                     if (drmeasure[0].ToString().ToUpper() == "STOCK")
                     {
                         HtTblInnerCell.InnerText = "0";
                     }
                     else
                     {
                         HtTblInnerCell.InnerText = sum.ToString();
                     }
                     HtTblInnerRow.Cells.Add(HtTblInnerCell);
                 }
             }
             HtTblInner.Rows.Add(HtTblInnerRow);
         }

         HtTblInnerRow = new HtmlTableRow();

         HtTblInnerRow.Attributes.Add("style", "font-family:verdana; font-size:11px; font-weight:bold");
         foreach (DataColumn column in DTDstr.Columns)
         {

             string colname = column.ColumnName;
             if (colname == "GrpName")
             {
                 HtTblInnerCell = new HtmlTableCell();
                 HtTblInnerCell.Align = "center";
                 HtTblInnerCell.InnerText = "Total";
                 HtTblInnerCell.ColSpan = 3;
                 HtTblInnerRow.Cells.Add(HtTblInnerCell);
             }
             else if (colname == "ParentGrp")
             {

             }

             else
             {

                 HtTblInnerCell = new HtmlTableCell();
                 HtTblInnerCell.Align = "center";
                 if (DTDstr.Compute("sum([" + column.ColumnName + "])", "").ToString() == "")
                 {
                     HtTblInnerCell.InnerText = "0";
                 }
                 else
                 {
                     if (colname.Split('^')[4].ToUpper() == "STOCK")
                     {
                         HtTblInnerCell.InnerText = "0";
                     }
                     else
                     {
                         HtTblInnerCell.InnerText = DTDstr.Compute("sum([" + column.ColumnName + "])", "").ToString();
                     }
                 }
                 HtTblInnerRow.Cells.Add(HtTblInnerCell);
             }
         }




         Double ColSum = 0;

         for (int i = 1; i <= datemerge; i++)
         {
             int j = i + 1;
             ColSum = 0;
             for (; j <= DTDstr.Columns.Count - 1; j += datemerge)
             {
                 if (!(DTDstr.Compute("SUM([" + DTDstr.Columns[j].ColumnName + "])", "") is DBNull))
                 {
                     string x = Convert.ToString(DTDstr.Compute("SUM([" + DTDstr.Columns[j].ColumnName + "])", ""));
                     ColSum = ColSum + Convert.ToDouble(DTDstr.Compute("SUM([" + DTDstr.Columns[j].ColumnName + "])", ""));

                 }

             }
             HtTblInnerCell = new HtmlTableCell();
             HtTblInnerCell.Align = "center";
             string colname = DTDstr.Columns[i + 1].ColumnName.Split('^')[4].ToUpper();
             if (colname == "STOCK")
             {
                 HtTblInnerCell.InnerText = "0";
             }
             else
             {
                 HtTblInnerCell.InnerText = ColSum.ToString();
             }
             HtTblInnerRow.Cells.Add(HtTblInnerCell);
         }

         HtTblInner.Rows.Add(HtTblInnerRow);
         HtTblOuterCell.Controls.Add(HtTblInner);
         StringWriter stw = new StringWriter();
         HtmlTextWriter htm = new HtmlTextWriter(stw);
         HtTblOuter.RenderControl(htm);
         return stw.ToString();
     }



     [WebMethod(EnableSession = true)]
     public string FnGetFFEReport_NEW(string FromDate, string ddlDstrCode)
     {
         string strConn = "server=103.16.141.16;database=db_KenyaSales_DemoWithSurvey;uid=sa;pwd=pass@123;connection timeout=0";
         SqlConnection SqlConn = new SqlConnection(strConn);
         SqlCommand SqlCmd = new SqlCommand("spFFEReport_Abhishek");
         SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
         SqlCmd.Parameters.AddWithValue("@Year", 0);
         SqlCmd.Parameters.AddWithValue("@Month", 0);
         SqlCmd.Parameters.AddWithValue("@Date", FromDate);
         SqlCmd.Parameters.AddWithValue("@DstrID", ddlDstrCode);
         SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
         DataSet DS = new DataSet();

         SqlDa.Fill(DS);

         HtmlTable HtTblMainOuter = new HtmlTable();
         HtTblMainOuter.Width = "800px";
         HtTblMainOuter.CellPadding = 0; HtTblMainOuter.CellSpacing = 0;
         HtmlTableRow HtTblMainOuterRow = null;
         HtmlTableCell HtTblMainOuterCell = null;


         HtTblMainOuterRow = new HtmlTableRow();
         HtTblMainOuterCell = new HtmlTableCell();
         HtTblMainOuterCell.Align = "center";
         HtTblMainOuterCell.Width = "70%";
         HtTblMainOuterRow.Cells.Add(HtTblMainOuterCell);
         HtTblMainOuter.Rows.Add(HtTblMainOuterRow);

         #region OUTER
         HtmlTable HtTblOuter = new HtmlTable();
         HtmlTableRow HtTblOuterRow = null;
         HtmlTableCell HtTblOuterCell = null;

         HtTblOuterRow = new HtmlTableRow();
         HtTblOuterRow.Attributes.Add("style", "font-family:verdana; font-size:13px; font-weight:bold");
         HtTblOuterCell = new HtmlTableCell();
         HtTblOuterCell.Align = "center";
         HtTblOuterCell.InnerText = "FFE Report " + FromDate.ToString();//DDLMonth.SelectedItem.Text + "-" + DDLYear.SelectedValue;
         HtTblOuterRow.Cells.Add(HtTblOuterCell);
         HtTblOuter.Rows.Add(HtTblOuterRow);

         HtTblOuterRow = new HtmlTableRow();
         HtTblOuterRow.Attributes.Add("style", "font-family:verdana; font-size:11px; font-weight:bold");
         HtTblOuterCell = new HtmlTableCell();
         HtTblOuterCell.Align = "center";
         HtTblOuterCell.InnerText = "FFE  : FIELD FORCE EFFECTIVENESS = (MANDAYS WORKED  X TOTAL LINES SOLD X TOTAL PRODUCTIVE CALLS) / 1000"; //"FFE Report " + txtFromDate.Text.ToString();//DDLMonth.SelectedItem.Text + "-" + DDLYear.SelectedValue;
         HtTblOuterRow.Cells.Add(HtTblOuterCell);
         HtTblOuter.Rows.Add(HtTblOuterRow);

         HtTblOuterRow = new HtmlTableRow();
         HtTblOuterCell = new HtmlTableCell();
         HtTblOuterCell.Align = "center";
         HtTblOuterCell.InnerHtml = "&nbsp;";
         HtTblOuterRow.Cells.Add(HtTblOuterCell);
         HtTblOuter.Rows.Add(HtTblOuterRow);

         HtTblOuterRow = new HtmlTableRow();
         HtTblOuterCell = new HtmlTableCell();
         HtTblOuterCell.Align = "center";
         HtTblOuterRow.Cells.Add(HtTblOuterCell);
         HtTblOuter.Rows.Add(HtTblOuterRow);
         #endregion

         #region INNER
         HtmlTable HtTblInner = new HtmlTable();
         HtTblInner.Width = "800px";
         HtTblInner.CellPadding = 0; HtTblInner.CellSpacing = 0; HtTblInner.Border = 1;
         HtmlTableRow HtTblInnerRow = null;
         HtmlTableCell HtTblInnerCell = null;

         #region Row1
         HtTblInnerRow = new HtmlTableRow();
         HtTblInnerRow.Attributes.Add("style", "font-family:verdana; font-size:11px; font-weight:bold");

         HtTblInnerCell = new HtmlTableCell();
         HtTblInnerCell.Align = "center";
         HtTblInnerCell.InnerText = "Sr.No.";
         HtTblInnerRow.Cells.Add(HtTblInnerCell);

         HtTblInnerCell = new HtmlTableCell();
         HtTblInnerCell.Align = "left";
         HtTblInnerCell.InnerText = DS.Tables[0].Columns[2].ColumnName.ToString();
         HtTblInnerRow.Cells.Add(HtTblInnerCell);

         HtTblInnerCell = new HtmlTableCell();
         HtTblInnerCell.Align = "left";
         HtTblInnerCell.InnerText = DS.Tables[0].Columns[3].ColumnName.ToString();
         HtTblInnerRow.Cells.Add(HtTblInnerCell);

         HtTblInnerCell = new HtmlTableCell();
         HtTblInnerCell.Align = "center";
         HtTblInnerCell.InnerText = DS.Tables[0].Columns[4].ColumnName.ToString();
         HtTblInnerRow.Cells.Add(HtTblInnerCell);


         HtTblInnerCell = new HtmlTableCell();
         HtTblInnerCell.Align = "center";
         HtTblInnerCell.InnerText = DS.Tables[0].Columns[5].ColumnName.ToString();
         HtTblInnerRow.Cells.Add(HtTblInnerCell);

         HtTblInnerCell = new HtmlTableCell();
         HtTblInnerCell.Align = "center";
         HtTblInnerCell.InnerText = DS.Tables[0].Columns[6].ColumnName.ToString();
         HtTblInnerRow.Cells.Add(HtTblInnerCell);

         HtTblInnerCell = new HtmlTableCell();
         HtTblInnerCell.Align = "center";
         HtTblInnerCell.InnerText = DS.Tables[0].Columns[7].ColumnName.ToString();
         HtTblInnerRow.Cells.Add(HtTblInnerCell);

         HtTblInnerCell = new HtmlTableCell();
         HtTblInnerCell.Align = "center";
         HtTblInnerCell.InnerText = DS.Tables[0].Columns[8].ColumnName.ToString();
         HtTblInnerRow.Cells.Add(HtTblInnerCell);


         HtTblInner.Rows.Add(HtTblInnerRow);
         #endregion
         DataTable DTDstr = DS.Tables[0];
         int SNORoute = 1;

         foreach (DataRow drDstr in DTDstr.Rows)
         {

             #region Row2
             HtTblInnerRow = new HtmlTableRow();
             HtTblInnerRow.Attributes.Add("style", "font-family:verdana; font-size:11px");

             HtTblInnerCell = new HtmlTableCell();
             HtTblInnerCell.InnerText = SNORoute.ToString();
             HtTblInnerRow.Cells.Add(HtTblInnerCell);

             HtTblInnerCell = new HtmlTableCell();
             HtTblInnerCell.Align = "left";
             HtTblInnerCell.InnerText = drDstr[2].ToString();
             HtTblInnerRow.Cells.Add(HtTblInnerCell);

             HtTblInnerCell = new HtmlTableCell();
             HtTblInnerCell.Align = "left";
             HtTblInnerCell.InnerText = drDstr[3].ToString();
             HtTblInnerRow.Cells.Add(HtTblInnerCell);

             HtTblInnerCell = new HtmlTableCell();
             HtTblInnerCell.Align = "center";
             HtTblInnerCell.InnerText = drDstr[4].ToString();
             HtTblInnerRow.Cells.Add(HtTblInnerCell);

             HtTblInnerCell = new HtmlTableCell();
             HtTblInnerCell.Align = "center";
             HtTblInnerCell.InnerText = drDstr[5].ToString();
             HtTblInnerRow.Cells.Add(HtTblInnerCell);

             HtTblInnerCell = new HtmlTableCell();
             HtTblInnerCell.Align = "center";
             HtTblInnerCell.InnerText = drDstr[6].ToString();
             HtTblInnerRow.Cells.Add(HtTblInnerCell);

             HtTblInnerCell = new HtmlTableCell();
             HtTblInnerCell.Align = "center";
             HtTblInnerCell.InnerText = drDstr[7].ToString();
             HtTblInnerRow.Cells.Add(HtTblInnerCell);

             HtTblInnerCell = new HtmlTableCell();
             HtTblInnerCell.Align = "center";
             HtTblInnerCell.InnerText = drDstr[8].ToString();
             HtTblInnerRow.Cells.Add(HtTblInnerCell);




             HtTblInner.Rows.Add(HtTblInnerRow);
             #endregion
             SNORoute++;
         }
         #endregion
         HtTblOuterCell.Controls.Add(HtTblInner);
         HtTblMainOuterCell.Controls.Add(HtTblOuter);


         StringWriter stw = new StringWriter();
         HtmlTextWriter htm = new HtmlTextWriter(stw);

         HtTblMainOuter.RenderControl(htm);
         return stw.ToString();

     }

   

}
