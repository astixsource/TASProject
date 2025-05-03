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

public partial class ManageOrder_frmManageTASMasters : System.Web.UI.Page
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
                hdnSiteNodeId.Value = Session["SalesNodeId"].ToString();
                hdnSiteNodeType.Value = Session["SalesNodeType"].ToString();
                hdnMenuId.Value = "42";
                string flg = Request.QueryString["flg"] == null ? "1" : Request.QueryString["flg"].ToString();
                divMain.InnerHtml = fnGetSiteConfigurationDetail(hdnSiteNodeId.Value, hdnSiteNodeType.Value);
            }
        }
    }

    public string fnGetSiteConfigurationDetail(string SiteNodeID, string SiteNodeType)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        try
        {
            string storedProcName = "spGetSiteConfigurationDetail";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@Nodeid", SiteNodeID),
                   new SqlParameter("@NodeType", SiteNodeType),
                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            StringBuilder str = new StringBuilder();
            if (Ds.Tables[0].Rows.Count > 0)
            {
                string[] SkipColumn = new string[0];
                //SkipColumn[0] = "flgSBD";


                str.Append("<table id='tbldbrlist' class='table' style='border:1px solid #ddd'><thead style='font-size:10.5pt;background:#008080;color:#fff'><tr>");

                string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                {
                    if (SkipColumn.Contains(Ds.Tables[0].Columns[j].ColumnName))
                    {
                        continue;
                    }
                    ss = "style='text-align:center;'";
                    string sColName = Ds.Tables[0].Columns[j].ColumnName;
                    sColName = sColName == "flgSBD" ? "ON/OFF" : sColName;
                    if (sColName == "Type")
                    {
                        ss = "style='text-align:left'";
                    }
                    str.Append("<th " + ss + ">" + sColName + "</th>");
                }
                str.Append("</tr></thead><tbody>");

                ss = "";
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {
                    str.Append("<tr>");
                    for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                    {
                        string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                        if (SkipColumn.Contains(sColumnName))
                        {
                            continue;
                        }
                        var sData = Ds.Tables[0].Rows[i][j];
                        ss = "text-align:center";
                        if (sData.GetType() == typeof(int))
                        {
                            ss = "style='text-align:center'";
                        }
                        if (sColumnName == "flgSBD")
                        {
                            str.Append("<td style='text-align:center;padding:3px;vertical-align:middle'><label class=\"switch\"><input id='chkSBD' type='checkbox'  id=\"chkOnOff\" " + (sData.ToString() == "1" ? "checked='checked'" : "") + " /><span class=\"slider round\"></span></label></td>");
                        }
                        else if (sColumnName == "Type")
                        {
                            str.Append("<td style='padding:3px 0px 3px 10px;font-weight:bold;font-size:10pt;vertical-align:middle'>" + sData + "</td>");
                        }
                        else
                        {
                            str.Append("<td style='"+ ss + ";font-size:10pt;padding:3px;vertical-align:middle'>" + sData + "</td>");
                        }

                    }
                    str.Append("</tr>");
                }
                str.Append("</tbody></table><div class='text-center'><input type ='button' class='btn btn-primary' onclick='fnINITSBDSitePopulateGaps()' value='Submit' /></div>");
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
            con.Dispose();
        }

        return stresponse;
    }


    //Get Scheme And Product Detail Bases on Store
    [System.Web.Services.WebMethod()]
    public static string fnINITSBDSitePopulateGaps(int SiteNodeID, int flgStartStop)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        string stresponse = "";
        SqlTransaction transaction;
        con.Open();
        transaction = con.BeginTransaction();
        try
        {
            string storedProcName = "spINITSBDSitePopulateGaps";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@SiteNodeID", SiteNodeID),
                   new SqlParameter("@flgStartStop", flgStartStop),
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