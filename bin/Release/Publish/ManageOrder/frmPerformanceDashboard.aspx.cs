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

public partial class frmPerformanceDashboard : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        
    }


    [System.Web.Services.WebMethod()]
    public static string fnMTDYesterDayReport()
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        string stresponseMeasure = "";
        try
        {
            string storedProcName = "spRptGetDashboardData";
            List<SqlParameter> sp = new List<SqlParameter>();
                    
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            string[] SkipColumn = new string[1];
            SkipColumn[0] = "measureid";
            StringBuilder str = new StringBuilder();
            if (Ds.Tables[0].Rows.Count > 0)
            {

                str.Append("<table id='tbldbrlist1' class='table mb-0 font-lg'>");
                //str.Append("<thead><tr>");
                string ss = "class='bg-info text-white'";//style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                //for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                //{
                //    string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                //    if (SkipColumn.Contains(sColumnName.ToLower()))
                //    {
                //        continue;
                //    }
                //    string sColumn = sColumnName;
                    
                //    str.Append("<th " + ss + ">" + sColumn + "</th>");
                //}
                //str.Append("</tr></thead>");
                str.Append("<tbody>");

                foreach (DataRow dr in Ds.Tables[0].Rows)
                {
                    str.Append("<tr measureid='" + dr["measureid"] + "'>");
                    for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                    {
                        string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                        if (SkipColumn.Contains(sColumnName.ToLower()))
                        {
                            continue;
                        }
                        var sdata = dr[j].ToString();
                       
                        str.Append("<td>" + sdata + "</td>");
                    }
                   
                    str.Append("</tr>");
                }
                str.Append("</tbody></table>");

                str.Append("|");

                str.Append("<table id='tbldbrlist2' class='table table-sm mb-0 font-md'><thead><tr>");
                for (int j = 0; j < Ds.Tables[1].Columns.Count; j++)
                {
                    string sColumnName = Ds.Tables[1].Columns[j].ColumnName;
                    if (SkipColumn.Contains(sColumnName.ToLower()))
                    {
                        continue;
                    }
                    string sColumn = sColumnName;
                    string sstyle = "";
                    if(sColumn!= "Measure")
                    {
                        sstyle = "style='width:15%;text-align:right;padding-right:30px'";
                    }
                    str.Append("<th "+ ss + " "+ sstyle + ">" + sColumn + "</th>");
                }
                str.Append("</tr></thead><tbody>");

                foreach (DataRow dr in Ds.Tables[1].Rows)
                {
                    str.Append("<tr measureid='" + dr["measureid"] + "'>");
                    for (int j = 0; j < Ds.Tables[1].Columns.Count; j++)
                    {
                        string sColumnName = Ds.Tables[1].Columns[j].ColumnName;
                        if (SkipColumn.Contains(sColumnName.ToLower()))
                        {
                            continue;
                        }
                        var sdata = dr[j].ToString();
                        string sstyle = "";
                        if (sColumnName != "Measure")
                        {
                                sstyle = "style='text-align:right;padding-right:30px'";
                            
                        }
                        str.Append("<td "+ sstyle + ">" + sdata + "</td>");
                    }

                    str.Append("</tr>");
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

    [System.Web.Services.WebMethod()]
    public static object fnTodayData()
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        object strResult = "";
        try
        {
            string storedProcName = "spRptGetDashboardData_Today";
            List<SqlParameter> sp = new List<SqlParameter>();
                   
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            strResult = JsonConvert.SerializeObject(Ds, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
        }
        catch (Exception ex)
        {
            strResult = "";
        }
        finally
        {
            Ds.Dispose();
            con.Dispose();
        }
        return strResult;
    }
}
