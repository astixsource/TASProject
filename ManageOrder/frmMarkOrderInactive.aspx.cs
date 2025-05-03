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

public partial class frmMarkOrderInactive : System.Web.UI.Page
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
                hdnMenuId.Value = Request.QueryString["id"] == null ? "47" : Request.QueryString["id"].ToString();
                string flg = Request.QueryString["flg"] == null ? "1" : Request.QueryString["flg"].ToString();
                if (flg == "2")
                {
                    lblType.InnerHtml = "SUBD List :";
                }
                else
                {
                    lblType.InnerHtml = "Branch List :";
                }
                fnBindSiteList();
                fnBindDBRList(flg);
                fnBindDSEList();
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

    private void fnBindDSEList()
    {

        SqlConnection Scon = new SqlConnection(ConfigurationManager.ConnectionStrings["strConn"].ConnectionString);
        SqlCommand Scmd = new SqlCommand();
        Scmd.Connection = Scon;
        Scmd.CommandText = "spGetdseList";
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
            ddlDSElist.Items.Add(itm);
        }
        foreach (DataRow dr in dt.Rows)
        {
            itm = new ListItem();
            itm.Text = dr["DSEName"].ToString();
            itm.Value = dr["NodeID"].ToString() + "-" + dr["NodeType"].ToString();
            itm.Attributes.Add("branchnodeid", dr["BranchSubdNodeId"].ToString() + "-" + dr["BranchSubdNodeType"].ToString());
            ddlDSElist.Items.Add(itm);
        }
    }
    private void fnBindDBRList(string flg)
    {

        SqlConnection Scon = new SqlConnection(ConfigurationManager.ConnectionStrings["strConn"].ConnectionString);
        SqlCommand Scmd = new SqlCommand();
        Scmd.Connection = Scon;
        Scmd.CommandText = flg=="1"? "spGetBranchList": "spGetSUBDList";
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
            ddlBranch.Items.Add(itm);
        }
        foreach (DataRow dr in dt.Rows)
        {
            itm = new ListItem();
            itm.Text = dr["BranchName"].ToString();
            itm.Attributes.Add("sitenodeid", dr["sitenodeid"].ToString() + "-" + dr["SiteNodeType"].ToString());
            itm.Value = dr["BrnNodeId"].ToString() + "-" + dr["BrnNodeType"].ToString();
            ddlBranch.Items.Add(itm);
        }
    }

   


    //Get Scheme And Product Detail Bases on Store
    [System.Web.Services.WebMethod()]
    public static string fnDSEList(int LoginId,int BranchNodeId,int BranchNodeType,int DSENodeId,int DSENodeType,string OrderDate)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        try
        {
            string storedProcName = "spGetOrderList";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@LoginId", LoginId),
                   new SqlParameter("@BranchSubdNodeId", BranchNodeId),
                   new SqlParameter("@BranchSubdNodeType", BranchNodeType),
                   new SqlParameter("@DSENodeId", DSENodeId),
                   new SqlParameter("@DSENodeType", DSENodeType),
                   new SqlParameter("@OrderDate",OrderDate)

                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            StringBuilder str = new StringBuilder();
            if (Ds.Tables[0].Rows.Count > 0)
            {
                string[] SkipColumn = new string[2];
              
                SkipColumn[0] = "OrderID";
                SkipColumn[1] = "StatusId";


                str.Append("<table id='tbldbrlist' style='width:100%'><thead><tr>");
               
                string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                
                str.Append("<th style='width:3%' >SrNo</th>");
                for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                {
                    if (SkipColumn.Contains(Ds.Tables[0].Columns[j].ColumnName))
                    {
                        continue;
                    }
                    ss = "style='text-align:center'";
                    string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                     if (sColumnName == "StoreName")
                    {
                        ss = "style='width:15%;text-align:center'";
                    }else if (sColumnName == "Channel")
                    {
                        ss = "style='width:9%;text-align:center'";
                    }
                    else if (sColumnName == "Status")
                    {
                        ss = "style='width:8%;text-align:center'";
                    }
                    else if (sColumnName == "OrderValue")
                    {
                        ss = "style='width:5%;text-align:center'";
                    }

                    str.Append("<th " + ss + ">" + sColumnName.Replace("TCUserId", "IsTelecaller Mapped") + "</th>"); 
                }
                str.Append("<th style='width:5%;text-align:center'><input type='checkbox' onchange='fnSelectAll(this)' id='chkAll' /> ALL</th>");
                str.Append("</tr></thead><tbody>");
               
                ss = "";
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {
                    string statusid = Ds.Tables[0].Rows[i]["statusid"].ToString();
                        str.Append("<tr style='"+ (statusid!="0"?"display:none":"") + "' statusid='" + statusid + "'  OrderID='" + Ds.Tables[0].Rows[i]["OrderID"].ToString() + "' >");
                   
                    str.Append("<td style='text-align:center'>"+(i+1)+"</td>");
                    for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                    {
                        string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                        if (SkipColumn.Contains(sColumnName))
                        {
                            continue;
                        }
                        var sData = Ds.Tables[0].Rows[i][j];
                        ss = "style='text-align:left;padding-left:2px'";
                        if (sData.GetType() == typeof(int))
                        {
                            ss = "style='text-align:center'";
                        }

                        if (sColumnName.ToLower() == "tcuserid")
                        {
                            sData = (Convert.ToString(sData) == "0" ? "No" : "Yes");
                        }
                        if (sColumnName.ToLower() == "ordervalue")
                        {
                            ss = "style='text-align:right;padding-right:3px'";
                        }
                        

                        string flgSearchable = "Searchable='1'";
                       
                        str.Append("<td " + ss + "   " + flgSearchable + ">" + sData + "</td>");
                    }

                    if (statusid != "1")
                    {
                        str.Append("<td style='text-align:center'><input type='checkbox'  /></td>");
                    }
                    else
                    {
                        str.Append("<td style='text-align:center'></td>");
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
    public static string fnSubmitDSEAttendance(int LoginId,object objOrderList, int flgStatus)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        string stresponse = "";
        SqlTransaction transaction;
        con.Open();
        transaction = con.BeginTransaction();
        try
        {
            string strobjAttendance = JsonConvert.SerializeObject(objOrderList, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
            DataTable tblOtherChargesDetail = JsonConvert.DeserializeObject<DataTable>(strobjAttendance);
            tblOtherChargesDetail.TableName = "tblstrobjAttendance";
            

            string storedProcName = "spChangeOrderStatus";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@OrderIds", tblOtherChargesDetail),
                   new SqlParameter("@flgStatus", flgStatus),
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