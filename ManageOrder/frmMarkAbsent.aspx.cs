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

public partial class ManageOrder_frmMarkAbsent : System.Web.UI.Page
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
                hdnMenuId.Value = Request.QueryString["id"] == null ? "5" : Request.QueryString["id"].ToString();
                string flg = Request.QueryString["flg"] == null ? "1" : Request.QueryString["flg"].ToString();
                if (flg=="2")
                {
                    lblType.InnerHtml = "SUBD List :";
                }
                else
                {
                    lblType.InnerHtml = "Branch List :";
                }
                fnBindSiteList();
                fnBindDBRList(flg);
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
    public static string fnDSEList(int LoginId,int BranchNodeId,int BranchNodeType)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        try
        {
            string storedProcName = "spGetPersonAttendance";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@LoginId", LoginId),
                   new SqlParameter("@BranchNodeId", BranchNodeId),
                   new SqlParameter("@BranchNodeType", BranchNodeType),
                   new SqlParameter("@AttDate", DateTime.Now.ToString("dd-MMM-yyyy"))

                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            StringBuilder str = new StringBuilder();
            if (Ds.Tables[0].Rows.Count > 0)
            {
                string[] SkipColumn = new string[7];
                SkipColumn[0] = "DSENodeId";
                SkipColumn[1] = "DSENodeType";
                SkipColumn[2] = "flgAbsent";
                SkipColumn[3] = "RouteNodeId";
                SkipColumn[4] = "RouteNodeType";
                SkipColumn[5] = "SectorId";
                SkipColumn[6] = "flgRouteSectorChange";
                
                int flgSubmitType =Convert.ToInt32(Ds.Tables[3].Rows[0]["flgSubmitType"]);
                int isSubmitted = Convert.ToInt32(Ds.Tables[3].Rows[0]["isSubmitted"]);
                //StartDate = DateTime.Parse(Ds.Tables[0].Rows[0]["StartDate"].ToString()).ToString("dd MMM");
                str.Append("<table id='tbldbrlist' style='width:100%' isSubmitted="+ isSubmitted + " flgSubmitType='"+ flgSubmitType + "' BranchNodeId='" + BranchNodeId + "' BranchNodeType='" + BranchNodeType + "'><thead><tr>");
               
                string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                
                str.Append("<th style='width:4%' >SrNo</th>");
                for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                {
                    if (SkipColumn.Contains(Ds.Tables[0].Columns[j].ColumnName))
                    {
                        continue;
                    }
                    ss = "style='text-align:center'";
                    string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                     if (sColumnName == "DSECode")
                    {
                        ss = "style='width:12%;text-align:center'";
                    }
                    else if (sColumnName == "RouteNumber")
                    {
                        sColumnName = "Route Number";
                        ss = "style='width:25%;text-align:center'";
                    }
                    else if (sColumnName == "SectorCode")
                    {
                        ss = "style='width:15%;text-align:center'";
                    }
                    else if (sColumnName == "TCUserId")
                    {
                        ss = "style='width:5%;text-align:center'";
                    }
                    str.Append("<th " + ss + ">" + sColumnName.Replace("TCUserId", "IsTelecaller Mapped") + "</th>"); 
                }
                str.Append("<th style='width:7%;text-align:center'>Mark Absent</th>");
                str.Append("<th style='width:7%;text-align:center'>Action</th>");
                str.Append("</tr></thead><tbody>");
               
                ss = "";
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {
                    int MarkAtt = int.Parse(Ds.Tables[0].Rows[i]["flgAbsent"].ToString());
                    if (flgSubmitType >1 && MarkAtt==0)
                    {
                        str.Append("<tr flgRouteSectorChange='"+ Ds.Tables[0].Rows[i]["flgRouteSectorChange"].ToString() + "'  MarkAtt='" + (flgSubmitType > 1 ? 1 : MarkAtt) + "' class='clsHighlightrowsNoAbsent'  DSENodeId='" + Ds.Tables[0].Rows[i]["DSENodeId"].ToString() + "' DSENodeType='" + Ds.Tables[0].Rows[i]["DSENodeType"].ToString() + "' OldRouteNodeId='" + Ds.Tables[0].Rows[i]["RouteNodeId"].ToString() + "' RouteNodeId='" + Ds.Tables[0].Rows[i]["RouteNodeId"].ToString() + "'  RouteNodeType='" + Ds.Tables[0].Rows[i]["RouteNodeType"].ToString() + "' OldSectorId='" + Ds.Tables[0].Rows[i]["SectorId"].ToString() + "' SectorId='" + Ds.Tables[0].Rows[i]["SectorId"].ToString() + "' gstno='2'  TCUserId='" + Ds.Tables[0].Rows[i]["TCUserId"].ToString() + "' >");
                    }
                    else
                    {
                        str.Append("<tr flgRouteSectorChange='" + Ds.Tables[0].Rows[i]["flgRouteSectorChange"].ToString() + "'  MarkAtt='" + (flgSubmitType > 1 ? 1 : MarkAtt) + "' " + (MarkAtt == 1 ? "class='clsHighlightrows'" : "") + "  DSENodeId='" + Ds.Tables[0].Rows[i]["DSENodeId"].ToString() + "' DSENodeType='" + Ds.Tables[0].Rows[i]["DSENodeType"].ToString() + "' OldRouteNodeId='" + Ds.Tables[0].Rows[i]["RouteNodeId"].ToString() + "' RouteNodeId='" + Ds.Tables[0].Rows[i]["RouteNodeId"].ToString() + "'  RouteNodeType='" + Ds.Tables[0].Rows[i]["RouteNodeType"].ToString() + "' OldSectorId='" + Ds.Tables[0].Rows[i]["SectorId"].ToString() + "' SectorId='" + Ds.Tables[0].Rows[i]["SectorId"].ToString() + "' gstno='2' TCUserId='" + Ds.Tables[0].Rows[i]["TCUserId"].ToString() + "'>");
                    }
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
                        if (sColumnName.ToLower() == "routenumber")
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
                    
                    str.Append("<td style='text-align:center'><input type='checkbox' "+(MarkAtt==1?"checked='checked'":"") +" onchange='fnMarkAtt(this)'  MarkAtt='"+ (flgSubmitType>1?1: MarkAtt) + "' /></td>");
                    str.Append("<td style='text-align:center'><a href='###' onclick='fnChangeSectorRoute(this)' style='display:none' title='Click To Change Route/Sector'><img src='../images/edit.jpg'/></a><a href='###' onclick='fnMarkPresent(this)' " + (MarkAtt == 0 ? "style='display:none'" : "") + " title='Click To Mark Present'>Present</a></td>");
                    str.Append("</tr>");
                }
                str.Append("</tbody></table>");
            }
            else
            {
                str.Append("");
            }
            stresponse = str.ToString()+"|"+ JsonConvert.SerializeObject(Ds.Tables[1], Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore }) + "|" + JsonConvert.SerializeObject(Ds.Tables[2], Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
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
    public static string fnSubmitDSEAttendance(int LoginId,object objAttendance,int BranchNodeId,int BranchNodeType,int flgSubmitType)
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
            if (tblOtherChargesDetail.Columns.Count == 0)
            {
                tblOtherChargesDetail.Columns.Add("DSENodeID", typeof(int));
                tblOtherChargesDetail.Columns.Add("DSENodeType", typeof(int));
                tblOtherChargesDetail.Columns.Add("RouteNodeId", typeof(int));
                tblOtherChargesDetail.Columns.Add("RouteNodeType", typeof(int));
                tblOtherChargesDetail.Columns.Add("SectorId", typeof(int));
                tblOtherChargesDetail.Columns.Add("flgAbsent", typeof(int));
                tblOtherChargesDetail.Columns.Add("flgChangeRouteSector", typeof(int));
            }

            string storedProcName = "spSubmitDSEAttendance";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@AttendDate", DateTime.Now.ToString("dd-MMM-yyyy")),
                   new SqlParameter("@Attendance", tblOtherChargesDetail),
                   new SqlParameter("@BranchNodeId", BranchNodeId),
                   new SqlParameter("@BranchNodeType", BranchNodeType),
                   new SqlParameter("@flgSubmitType", flgSubmitType),
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