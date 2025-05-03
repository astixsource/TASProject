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

public partial class frmMarkDSEAsWorkfromHome : System.Web.UI.Page
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
                hdnMenuId.Value = Request.QueryString["id"] == null ? "43" : Request.QueryString["id"].ToString();
                string flg = Request.QueryString["flg"] == null ? "1" : Request.QueryString["flg"].ToString();

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
        Scmd.CommandText = flg == "1" ? "spGetBranchList" : "spGetSUBDList";
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
    public static string fnDSEList(int LoginId, int BranchNodeId, int BranchNodeType)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        try
        {
            string storedProcName = "[spGetDSEListForCall]";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@LoginId", LoginId),
                   new SqlParameter("@BranchNodeId", BranchNodeId),
                   new SqlParameter("@BranchNodeType", BranchNodeType),
                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            StringBuilder str = new StringBuilder();
            if (Ds.Tables[0].Rows.Count > 0)
            {
                string[] SkipColumn = new string[4];
                SkipColumn[0] = "NodeID";
                SkipColumn[1] = "DSENodeType";
                SkipColumn[2] = "DSECallScheduleID";
                SkipColumn[3] = "IsMarkPresent";

                str.Append("<table id='tbldbrlist' style='width:100%'  BranchNodeId='" + BranchNodeId + "' BranchNodeType='" + BranchNodeType + "'><thead><tr>");

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
                    else if (sColumnName == "SectorCode")
                    {
                        ss = "style='width:20%;text-align:center'";
                    }
                    else if (sColumnName == "StartDate" || sColumnName == "EndDate")
                    {
                        ss = "style='width:6%;text-align:center'";
                    }

                    str.Append("<th " + ss + ">" + sColumnName + "</th>");
                }
                str.Append("<th style='width:18%;text-align:center'>IsMark Work From Home</th>");
                str.Append("<th style='width:15%;text-align:center'>Action</th>");
                str.Append("</tr></thead><tbody>");

                ss = "";
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {
                    string DSECallScheduleID = Ds.Tables[0].Rows[i]["DSECallScheduleID"].ToString();
                    string IsMarkPresent = Ds.Tables[0].Rows[i]["IsMarkPresent"].ToString();
                    str.Append("<tr " + (IsMarkPresent == "1" ? "class='clsHighlightrows'" : "") + "   DSECallScheduleID='" + Ds.Tables[0].Rows[i]["DSECallScheduleID"].ToString() + "' DSENodeId='" + Ds.Tables[0].Rows[i]["NodeId"].ToString() + "' DSENodeType='200'>");

                    str.Append("<td style='text-align:center'>" + (i + 1) + "</td>");
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

                        string flgSearchable = "Searchable='0'";
                        //if (Ds.Tables[0].Columns[j].ColumnName == "DSECode" || Ds.Tables[0].Columns[j].ColumnName == "DSEName")
                        //{
                        flgSearchable = "Searchable='1'";
                        //}
                        //ss += "'";
                            str.Append("<td " + ss + "   " + flgSearchable + ">" + sData + "</td>");
                    }
                    str.Append("<td style='text-align:center;'><input type='checkbox' MarkAtt='" + (IsMarkPresent == "1" ? "1" : "0") + "'  " + (IsMarkPresent=="1"?"Checked":"") + " " + (IsMarkPresent == "1" ? "disabled" : "") + "  /></td>");
                    str.Append("<td style='text-align:center;'><a href='###' style='color:blue;text-decoration:underline' onclick='fnMarkDSEWorkFromHome(this,2)'>" + (Convert.ToInt32(IsMarkPresent) ==1? "Normal Field Work" : "")+ "</a></td>");
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
    public static string fnSubmitDSEAttendance(int LoginId, object objAttendance, int BranchNodeId, int BranchNodeType)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        string stresponse = "";
        con.Open();
        try
        {
            string strobjAttendance = JsonConvert.SerializeObject(objAttendance, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
            DataTable tblOtherChargesDetail = JsonConvert.DeserializeObject<DataTable>(strobjAttendance);
            tblOtherChargesDetail.TableName = "tblstrobjAttendance";

            string storedProcName = "spManageDSETeleCalling";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@DSE_List", tblOtherChargesDetail),
                   //new SqlParameter("@BranchNodeId", BranchNodeId),
                   //new SqlParameter("@BranchNodeType", BranchNodeType),
                   //new SqlParameter("@flgSubmitType", flgSubmitType),
                   new SqlParameter("@LoginID", LoginId)

                };
            clsDbCommand.ExecuteQueryProcedure(storedProcName, con, sp);
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
}