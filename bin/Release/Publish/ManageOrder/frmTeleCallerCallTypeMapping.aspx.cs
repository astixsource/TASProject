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

public partial class frmTeleCallerCallTypeMapping : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
       // Session["LoginId"] = "1477172";
        if (Session["LoginID"] == null)
        {
            Response.Redirect("~/SessionExpiredpage.aspx");
        }
        else {
            if (!IsPostBack)
            {
                hdnLoginId.Value = Session["LoginID"].ToString();
                hdnNodeId.Value = Session["SalesNodeId"].ToString();
                hdnNodeType.Value = Session["SalesNodeType"].ToString();
                hdnMenuId.Value = Request.QueryString["id"] == null ? "2" : Request.QueryString["id"].ToString();
                //fnBindSiteList();
                //fnBindDBRList();
            }
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

        //ListItem itm = new ListItem();
        //if (dt.Rows.Count > 1)
        //{
        //    itm.Text = "--------";
        //    itm.Value = "0-0";
        //    ddlSite.Items.Add(itm);
        //}
        //foreach (DataRow dr in dt.Rows)
        //{
        //    itm = new ListItem();
        //    itm.Text = dr["SiteName"].ToString();
        //    itm.Value = dr["sitenodeid"].ToString() + "-" + dr["SiteNodeType"].ToString();
        //    ddlSite.Items.Add(itm);
        //}
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

        //ListItem itm = new ListItem();
        //if (dt.Rows.Count > 1)
        //{
        //    itm.Text = "--------";
        //    itm.Value = "0-0";
        //    ddlBranch.Items.Add(itm);
        //}
        //foreach (DataRow dr in dt.Rows)
        //{
        //    itm = new ListItem();
        //    itm.Text = dr["BranchName"].ToString();
        //    itm.Attributes.Add("sitenodeid", dr["sitenodeid"].ToString() + "-" + dr["SiteNodeType"].ToString());
        //    itm.Value = dr["BrnNodeId"].ToString() + "-" + dr["BrnNodeType"].ToString();
        //    ddlBranch.Items.Add(itm);
        //}
    }

   


    //Get Scheme And Product Detail Bases on Store
    [System.Web.Services.WebMethod()]
    public static string fnTelecallerList(int LoginId)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        try
        {
            string storedProcName = "spGetTeleCallerList";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@LoginId", LoginId)
                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            StringBuilder str = new StringBuilder();
            if (Ds.Tables[0].Rows.Count > 0)
            {
                string[] SkipColumn = new string[2];
                SkipColumn[0] = "TeleCallerId";
                SkipColumn[1] = "NodeType";
                //StartDate = DateTime.Parse(Ds.Tables[0].Rows[0]["StartDate"].ToString()).ToString("dd MMM");
                str.Append("<table id='tbldbrlist' style='width:100%' ><thead><tr>");
               
                string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                
                str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:4%' >SrNo</th>");
                for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                {
                    if (SkipColumn.Contains(Ds.Tables[0].Columns[j].ColumnName))
                    {
                        continue;
                    }
                    ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                    string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                    if (sColumnName == "RouteNumber")
                    {
                        ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:35%'";
                    }
                    str.Append("<th " + ss + ">" + sColumnName + "</th>");
                }
                str.Append("</tr></thead><tbody>");
               
                ss = "";
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {
                    int MarkAtt =int.Parse("0");
                    str.Append("<tr " + (MarkAtt == 1 ? "class='clsHighlightrows'" : "") + "  TeleCallerId='" + Ds.Tables[0].Rows[i]["TeleCallerId"].ToString() + "'  TeleNodeType='" + Ds.Tables[0].Rows[i]["NodeType"].ToString() + "' >"); 
                    str.Append("<td style='text-align:center'>"+(i+1)+"</td>");
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
                        if (j>3)
                        {
                            ss = "style='text-align:center;width:15%'";
                            sData = "<input type='checkbox' " + (Ds.Tables[0].Rows[i][j].ToString()== "True" ? "checked='checked'" : "") + "  " + (MarkAtt == 1 ? "disabled='disabled'" : "") + " />";
                        }
                        //ss += "'";
                        str.Append("<td " + ss + " Searchable='1'>" + sData + "</td>");
                    }
                    str.Append("</tr>");
                }
                str.Append("</tbody></table>");
            }
            else
            {
                str.Append("");
            }
            stresponse = str.ToString();
        }
        catch (Exception ex)
        {
            stresponse = "2|"+ex.Message;
        }
        finally
        {
            con.Dispose();
        }
       
        return stresponse;
    }



    //Get Scheme And Product Detail Bases on Store
    [System.Web.Services.WebMethod()]
    public static string fnSubmitTeleCallerAttendance(int LoginId,object objAttendance)
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
            tblOtherChargesDetail.TableName = "tblstrobjAttendance";

            string storedProcName = "spUpdateTeleCallerCallTypeMapping";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@TeleCallerCallTypeMap", tblOtherChargesDetail),
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