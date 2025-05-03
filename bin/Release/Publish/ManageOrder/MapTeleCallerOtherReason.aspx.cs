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

public partial class ManageOrder_MapTeleCallerOtherReason : System.Web.UI.Page
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
                hdnMenuId.Value = Request.QueryString["id"] == null ? "2" : Request.QueryString["id"].ToString();
                // fnBindSiteList();
                //fnBindBranchList();
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
        DataSet Ds1 = null;
        string stresponse = "";
        try
        {
            string storedProcName = "spGetOtherReasonMappedTeleCallList";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   //new SqlParameter("@SiteNodeId", SiteNodeId),
                   //new SqlParameter("@SiteNodeType", SiteNodeType),
                   //new SqlParameter("@BranchNodeId", BranchNodeId),
                   //new SqlParameter("@BranchNodeType", BranchNodeType),
                   new SqlParameter("@LoginId", LoginId)//,
                   //new SqlParameter("@AttndDate", DateTime.Now.ToString("dd-MMM-yyyy"))
                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);


            string storedProcName1 = "spGetTCUserList";
            sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@LoginId", LoginId),
                };
            Ds1 = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName1, con, sp);

            DataRow dr = Ds1.Tables[0].NewRow();
            dr["UserId"] = "0";
            dr["UserName"] = "---Select---";
            Ds1.Tables[0].Rows.InsertAt(dr, 0);

            StringBuilder str = new StringBuilder();



            if (Ds.Tables[0].Rows.Count > 0)
            {
                string[] SkipColumn = new string[6];
                SkipColumn[0] = "DSENodeId";
                SkipColumn[1] = "DSENodeType";
                SkipColumn[2] = "BranchNodeId";
                SkipColumn[3] = "BranchNodeType";
                SkipColumn[4] = "TeleReasonId";                
                SkipColumn[5] = "TeleUserId";

                int isSubmitted = 0;// int.Parse(Ds.Tables[1].Rows[0]["isSubmitted"].ToString());
                //StartDate = DateTime.Parse(Ds.Tables[0].Rows[0]["StartDate"].ToString()).ToString("dd MMM");
                str.Append("<table id='tbldbrlist' style='width:100%' isSubmitted=" + isSubmitted + " BranchNodeId='0' BranchNodeType='0'><thead><tr>");

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
                    if (sColumnName == "Route Name")
                    {
                        ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:35%'";
                    }
                    str.Append("<th " + ss + ">" + sColumnName + "</th>");
                }
                str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:8%'>Tele User</th>");
                //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:8%'>Action</th>");
                str.Append("</tr></thead><tbody>");

                ss = "";
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {

                    string dropdownlist_at = "";

                    //dropdownlist_at += "<option value='0'>--Select---</option>";
                    for (var j = 0; j < Ds1.Tables[0].Rows.Count; j++)
                    {
                        if (Ds.Tables[0].Rows[i]["TeleUserId"].ToString() == Ds1.Tables[0].Rows[j]["UserId"].ToString())
                        {
                            dropdownlist_at += "<option value='" + Ds1.Tables[0].Rows[j]["UserId"].ToString() + "' selected>" + Ds1.Tables[0].Rows[j]["UserName"].ToString() + "</option>";
                        }
                        else
                        {
                            dropdownlist_at += "<option value='" + Ds1.Tables[0].Rows[j]["UserId"].ToString() + "'>" + Ds1.Tables[0].Rows[j]["UserName"].ToString() + "</option>";
                        }


                    }


                    //int MarkAtt = 0;//int.Parse(Ds.Tables[0].Rows[i]["flgAbsent"].ToString());
                    str.Append("<tr DSENodeId='" + Ds.Tables[0].Rows[i]["DSENodeId"].ToString() + "' DSENodeType='" + Ds.Tables[0].Rows[i]["DSENodeType"].ToString() + "' BranchNodeId='" + Ds.Tables[0].Rows[i]["BranchNodeId"].ToString() + "' BranchNodeType='" + Ds.Tables[0].Rows[i]["BranchNodeType"].ToString() + "' TeleReasonId='" + Ds.Tables[0].Rows[i]["TeleReasonId"].ToString() + "' gstno='2'>");
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

                        string flgSearchable = "Searchable='0'";
                        if (Ds.Tables[0].Columns[j].ColumnName == "DSECode" || Ds.Tables[0].Columns[j].ColumnName == "DSE")
                        {
                            flgSearchable = "Searchable='1'";
                        }
                        //ss += "'";
                        str.Append("<td " + ss + "   " + flgSearchable + ">" + sData + "</td>");
                    }

                    str.Append("<td style='text-align:center'><select> " + dropdownlist_at + "<select/></td>");
                    //str.Append("<td style='text-align:center'><a href='###' onclick='fnChangeSectorRoute(this)' style='display:none' title='Click To Change Route/Sector'><img src='../images/edit.jpg'/></a></td>");
                    str.Append("</tr>");
                }
                str.Append("</tbody></table>");
            }
            else
            {
                str.Append("");
            }
            stresponse = str.ToString();//+ "|" + JsonConvert.SerializeObject(Ds.Tables[1], Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore }) + "|" + JsonConvert.SerializeObject(Ds.Tables[2], Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore })
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
    public static string fnSubmitDSEAttendance(int LoginId, object MapTCUser)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        string stresponse = "";
        SqlTransaction transaction;
        con.Open();
        transaction = con.BeginTransaction();
        try
        {
            string strobjAttendance = JsonConvert.SerializeObject(MapTCUser, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
            DataTable tblMapTCUser = JsonConvert.DeserializeObject<DataTable>(strobjAttendance);
            tblMapTCUser.TableName = "MapTCUserForOtherReason";

            string storedProcName = "spMapTeleCallerWithDSERouteForOtherReason";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@MapTCUserForOtherReason", tblMapTCUser),
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