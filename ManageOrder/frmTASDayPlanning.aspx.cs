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

public partial class frmTASDayPlanning : System.Web.UI.Page
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
                hdnNodeId.Value = Session["NodeId"].ToString();
                hdnUserId.Value = Session["UserID"].ToString();
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
    public static string fnTelecallerList(int LoginId,int TSVNodeId, int TSVNodeType,int PlanDateId)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        try
        {
            string storedProcName = "spTASDayPlanning";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@TeleCallerID", TSVNodeId),
                   new SqlParameter("@Date",(PlanDateId==1? DateTime.Now.ToString("dd-MMM-yyyy"):DateTime.Now.AddDays(1).ToString("dd-MMM-yyyy"))),
                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            StringBuilder str = new StringBuilder();
            if (Ds.Tables[1].Rows.Count > 0)
            {
                string[] SkipColumn = new string[4];
                SkipColumn[0] = "TeleCallerId";
                SkipColumn[1] = "NodeType";
                SkipColumn[2] = "flgAbsent";
                SkipColumn[3] = "ActualFBPlan";
                

                int isSubmitted = 0;//  int.Parse(Ds.Tables[1].Rows[0]["isSubmitted"].ToString());
                //StartDate = DateTime.Parse(Ds.Tables[0].Rows[0]["StartDate"].ToString()).ToString("dd MMM");
                str.Append("<table id='tbldbrlist' style='width:100%' isSubmitted="+ isSubmitted + " TSVNodeId='" + TSVNodeId + "' TSVNodeType='" + TSVNodeType + "'><thead><tr>");
               
                string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                
                for (int j = 0; j < Ds.Tables[1].Columns.Count; j++)
                {
                    if (SkipColumn.Contains(Ds.Tables[1].Columns[j].ColumnName))
                    {
                        continue;
                    }
                    ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                    string sColumnName = Ds.Tables[1].Columns[j].ColumnName;
                    if (sColumnName == "StoreName")
                    {
                        ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:15%'";
                    }
                    else if (sColumnName == "Value Plan" || sColumnName == "GP Plan" || sColumnName == "FB Plan")
                    {
                        ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:6%'";
                    }

                        str.Append("<th " + ss + ">" + sColumnName + "</th>");
                }
                str.Append("</tr></thead><tbody>");
                ss = "";
                for (int i = 0; i < Ds.Tables[1].Rows.Count; i++)
                {
                    str.Append("<tr  storeid='" + Convert.ToString(Ds.Tables[1].Rows[i]["storeid"]) + "'  ActualFBPlan='" + Convert.ToString(Ds.Tables[1].Rows[i]["FB Ach"]) + "' ActualGPPlan='" + Convert.ToString(Ds.Tables[1].Rows[i]["Visit GP Target"]) + "' ActualValuePlan='" + Convert.ToString(Ds.Tables[1].Rows[i]["Visit Target"]) + "'>"); 
                    for (int j = 0; j < Ds.Tables[1].Columns.Count; j++)
                    {
                        string sColumnName = Ds.Tables[1].Columns[j].ColumnName;
                        if (SkipColumn.Contains(sColumnName))
                        {
                            continue;
                        }
                        var sData = Ds.Tables[1].Rows[i][j];
                        ss = "style='text-align:right'";
                        if (sData.GetType() == typeof(string))
                        {
                            ss = "style='text-align:left'";
                        }
                        else if (sData.GetType() == typeof(decimal))
                        {
                            ss = "style='text-align:right'";
                        }
                        //Value Plan
                        string flgSearchable = "Searchable='0'";
                        if (j<2)
                        {
                            flgSearchable = "Searchable='1'";
                        }
                        //ss += "'";
                        if(sColumnName== "Value Plan")
                        {
                            str.Append("<td " + ss + "   " + flgSearchable + "><input type='text' style='width: 95.5%;height:100%;text-align:right;padding-right:4px; border: 1px solid #bbbbbb;background-color:#ffffff;z-index: 150' value='"+ sData.ToString() + "' onfocus=\"Focus(this,'0.00')\" sgtval='1' onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' onblur=\"Blur(this,'0.00')\" onchange='fnChangeVal(1)' /></td>");
                        }else if (sColumnName == "GP Plan")
                        {
                            str.Append("<td " + ss + "   " + flgSearchable + "><input type='text' style='width: 95.5%;height:100%;text-align:right;padding-right:4px; border: 1px solid #bbbbbb;background-color:#ffffff;z-index: 150' value='" + sData.ToString() + "' onfocus=\"Focus(this,'0')\" sgtval='2' onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' onblur=\"Blur(this,'0')\"  onchange='fnChangeVal(2)' /></td>");
                        }
                        else if (sColumnName == "FB Plan")
                        {
                            str.Append("<td " + ss + "   " + flgSearchable + "><input type='text' style='width: 95.5%;height:100%;text-align:right;padding-right:4px; border: 1px solid #bbbbbb;background-color:#ffffff;z-index: 150' value='" + sData.ToString() + "' onfocus=\"Focus(this,'0')\" sgtval='3' onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' onblur=\"Blur(this,'0')\" onchange='fnChangeVal(3)' /></td>");
                        }
                        else
                        {
                            str.Append("<td " + ss + "   " + flgSearchable + ">" + sData + "</td>");
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
            stresponse = "1|" + str.ToString() + "|" + JsonConvert.SerializeObject(Ds.Tables[0], Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
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

    public static string createtbl_Measures(DataTable dt, string[] SkipColumn, string str)
    {
        StringBuilder sb = new StringBuilder();
        sb.Append("<table id='tblMeasure' cellpadding='0' cellspacing='0' class='clstbl' style='border-spacing:2px;border-collapse:separate;background-color:#FFD3A8;margin-bottom:5px;width:99%;color:black;'>");

        sb.Append("<tr>");
        //sb.Append("<th style='width:180px;font-size:10pt;valign:middle;' rowspan='2'>" + str + " : </th>");
        for (int j = 0; j < dt.Rows.Count; j++)
        {
            if (!SkipColumn.Contains(dt.Rows[j][0].ToString().Trim()))
            {
                sb.Append("<th style='text-align:center;border:1px solid #666666; width:135px; height:20px; font-size:8pt; font-family:verdana; background-color:#" + dt.Rows[j][2].ToString() + "'>" + dt.Rows[j][0].ToString() + "</th>");
                sb.Append("<th style='width:10px;'> </th>");
            }
        }
        sb.Append("</tr>");
        sb.Append("<tr>");
        for (int i = 0; i < dt.Rows.Count; i++)
        {
            if (!SkipColumn.Contains(dt.Rows[i][0].ToString()))
            {
                sb.Append("<td style='border:1px solid #666; height:18px; text-align:center; font-size:9pt; font-family:verdana; background-color:#" + dt.Rows[i][2].ToString() + "'>" + dt.Rows[i][1].ToString() + "</td>");
                sb.Append("<td> </td>");
            }
        }
        sb.Append("</tr>");
        sb.Append("</table>");
        return sb.ToString();
    }


    //Get Scheme And Product Detail Bases on Store
    [System.Web.Services.WebMethod()]
    public static string fnSubmitTeleCallerAttendance(int LoginId,object objAttendance,int NodeId, int TeleUserId,int PlanDateId)
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

            string storedProcName = "spTASSaveTeleCallPlanning";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@Date",(PlanDateId==1? DateTime.Now.ToString("dd-MMM-yyyy"):DateTime.Now.AddDays(1).ToString("dd-MMM-yyyy"))),
                   new SqlParameter("@Plan", tblOtherChargesDetail),
                   new SqlParameter("@TeleUserId", TeleUserId),
                   new SqlParameter("@NodeID", NodeId),
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