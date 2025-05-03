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

public partial class frmAutoTransferOrders : System.Web.UI.Page
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
            string storedProcName = "spGetBranchListAutoLeapOrderTransfer";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@LoginId", LoginId)//,
                   //new SqlParameter("@BranchNodeId", BranchNodeId),
                   //new SqlParameter("@BranchNodeType", BranchNodeType),
                   //new SqlParameter("@AttDate", DateTime.Now.ToString("dd-MMM-yyyy"))

                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            StringBuilder str = new StringBuilder();

            StringBuilder strOption = new StringBuilder();

            if (Ds.Tables[0].Rows.Count > 0)
            {
                string[] SkipColumn = new string[4];
                SkipColumn[0] = "sitenodeid";
                SkipColumn[1] = "SiteNodeType";
                SkipColumn[2] = "BrnNodeId";
                SkipColumn[3] = "BrnNodeType";
               

                StringBuilder strStartTime = new StringBuilder();
                strStartTime.Append("<option value='0'>-----</option>");
                for (int s = 2; s <=7; s++)
                {
                    string sval1 = (s + 12).ToString();
                    strStartTime.Append("<option value='" + sval1 + "'>" + s.ToString() + " PM</option>");
                }
                StringBuilder strEndTime = new StringBuilder();
                strEndTime.Append("<option value='0'>-----</option>");
                for (int s = 5; s <=8; s++)
                {
                    string sval1 = (s + 12).ToString();
                    strEndTime.Append("<option value='" + sval1 + "'>" + s.ToString() + " PM</option>");
                }

                StringBuilder strInterval = new StringBuilder();
                strInterval.Append("<option value='0'>-----</option>");
                int intvalcnt =60;
                for (int s = 1; s <4; s++)
                {
                    strInterval.Append("<option value='" + intvalcnt.ToString() + "'>" + s.ToString() + " hr</option>");
                    intvalcnt += 60;
                }

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
                        ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:12%'";
                    }
                    else if (sColumnName == "BranchName")
                    {
                        ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:27%'";
                    }
                    else if (sColumnName == "flgAutoTrnsfrOrd")
                    {
                        sColumnName = "AutoTransfer Order";
                        ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:10%'";
                    }
                    str.Append("<th " + ss + ">" + sColumnName + "</th>");
                }
                //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:9%'>Use System Inventory</th>");
                //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;'>Inventory From</th>");
                //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:9%'>Use System Price</th>");
                str.Append("</tr></thead><tbody>");

                ss = "";
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {

                    int flgAutoTrnsfrOrd = Convert.ToInt32(Ds.Tables[0].Rows[i]["flgAutoTrnsfrOrd"]);
                    str.Append("<tr sitenodeid='" + Ds.Tables[0].Rows[i]["sitenodeid"].ToString() + "' sitenodetype='" + Ds.Tables[0].Rows[i]["sitenodetype"].ToString() + "' brnnodeid='" + Ds.Tables[0].Rows[i]["brnnodeid"].ToString() + "' brnnodetype='" + Ds.Tables[0].Rows[i]["brnnodetype"].ToString() + "'  >");//MappingTypeId='" + Ds.Tables[0].Rows[i]["MappingTypeId"].ToString() + "'
                    str.Append("<td style='text-align:center'>" + (i + 1) + "</td>");
                    for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                    {
                        string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                        if (SkipColumn.Contains(sColumnName))
                        {
                            continue;
                        }
                        var sData = Ds.Tables[0].Rows[i][j];
                        ss = "style='text-align:left'";
                        if (sData.GetType() == typeof(int))
                        {
                            ss = "style='text-align:center'";
                        }

                       

                        string flgSearchable = "Searchable='1'";
                        if (sColumnName == "flgAutoTrnsfrOrd")
                        {
                            str.Append("<td style='text-align:center'><input type='checkbox' "+(flgAutoTrnsfrOrd==1?"checked='checked'":"") +" onchange='fnChangeAutoTransfer(this)'></td>");
                        }
                       else if (sColumnName == "StartTime")
                        {
                            str.Append("<td style='text-align:center'><select " + (flgAutoTrnsfrOrd == 0 ? "disabled='disabled'" : "") + " onchange='fnChangeStartTime(this)' StartTime='"+ Ds.Tables[0].Rows[i]["StartTime"].ToString() + "' >" + strStartTime + "</select></td>");
                        }
                        else if (sColumnName == "EndTime")
                        {
                            str.Append("<td style='text-align:center'><select " + (flgAutoTrnsfrOrd == 0 ? "disabled='disabled'" : "") + " EndTime='" + Ds.Tables[0].Rows[i]["EndTime"].ToString() + "' >" + strEndTime + "</select></td>");
                        }
                        else if (sColumnName == "InterVal")
                        {
                            str.Append("<td style='text-align:center'><select " + (flgAutoTrnsfrOrd == 0 ? "disabled='disabled'" : "") + " Interval='" + Ds.Tables[0].Rows[i]["Interval"].ToString() + "' >" + strInterval + "</select></td>");
                        }
                        else {
                            str.Append("<td " + ss + "  " + flgSearchable + ">" + sData + "</td>");
                        }
                    }
                    str.Append("</tr>");
                }
                str.Append("</tbody></table>");
            }
            else
            {
                str.Append("");
            }
            stresponse = str.ToString() + "|"+ strOption.ToString();
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
    public static string fnManageBranchInvMapping(int LoginId, object objAttendance)
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
            DataTable tblBrnInventoryMapping = JsonConvert.DeserializeObject<DataTable>(strobjAttendance);
            tblBrnInventoryMapping.TableName = "BrnLeapOrderTrnsfrMapping";

            string storedProcName = "[spManageBranchLeapOrderTransferMapping]";//spBranchSwingLeapMapping
            List<SqlParameter> sp = new List<SqlParameter>()
                    {                  
                   new SqlParameter("@BrnLeapOrderTrnsfrMapping", tblBrnInventoryMapping),                  
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
}