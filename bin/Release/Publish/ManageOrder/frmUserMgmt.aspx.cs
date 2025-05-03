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

public partial class ManageOrder_frmAbsentDSEList : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //Session["LoginId"] = "1";
        if (Session["LoginID"] == null)
        {
            Response.Redirect("~/SessionExpiredpage.aspx");
        }
        else
        {
            if (!IsPostBack)
            {
                hdnLoginId.Value = Session["LoginID"].ToString();
                fnBindSiteList(hdnLoginId.Value);
            }
        }
    }

    private void fnBindSiteList(string LoginId)
    {

        SqlConnection Scon = new SqlConnection(ConfigurationManager.ConnectionStrings["strConn"].ConnectionString);
        SqlCommand Scmd = new SqlCommand();
        Scmd.Connection = Scon;
        Scmd.CommandText = "spGetTASSiteList";
        Scmd.Parameters.AddWithValue("@LoginId", LoginId);
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
            itm.Text = dr["Descr"].ToString();
            itm.Value = dr["NodeID"].ToString() + "-" + dr["NodeType"].ToString();
            ddlSite.Items.Add(itm);
        }
    }
    [System.Web.Services.WebMethod()]
    public static string GetEmpList(string SiteNodeId, string SiteNodeType, string flgActive, string flgCall)
    {
        DataTable dt = fnGetUserListfrmDB(SiteNodeId, SiteNodeType, flgActive);
        if (flgCall == "1")
        {
            return GetUserList(dt, flgActive);
        }
        else
        {
            return GetUserListforfilter(dt);
        }
    }
    [System.Web.Services.WebMethod()]
    public static string GetIndividualUserDetail(string EmpId)
    {
        SqlConnection Scon = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        SqlCommand Scmd = new SqlCommand();
        Scmd.Connection = Scon;
        Scmd.CommandText = "[SpGetEmpDet]";
        Scmd.Parameters.AddWithValue("@EmpID", EmpId);
        Scmd.CommandType = CommandType.StoredProcedure;
        Scmd.CommandTimeout = 0;
        SqlDataAdapter Sdap = new SqlDataAdapter(Scmd);
        DataSet Ds = new DataSet();
        Sdap.Fill(Ds);

        if (Ds.Tables[0].Rows.Count > 0)
        {
            return JsonConvert.SerializeObject(Ds.Tables[0], Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
        }
        else
        {
            return "2";
        }
    }
    private static DataTable fnGetUserListfrmDB(string SiteNodeId, string SiteNodeType, string flgActive)
    {

        SqlConnection Scon = new SqlConnection(ConfigurationManager.ConnectionStrings["strConn"].ConnectionString);
        SqlCommand Scmd = new SqlCommand();
        Scmd.Connection = Scon;
        Scmd.CommandText = "spGetEmpList";
        Scmd.Parameters.AddWithValue("@TASSiteNodeId", SiteNodeId);
        Scmd.Parameters.AddWithValue("@TASSiteNodeType", SiteNodeType);
        Scmd.Parameters.AddWithValue("@flgActive", flgActive);
        Scmd.CommandType = CommandType.StoredProcedure;
        Scmd.CommandTimeout = 0;
        SqlDataAdapter Sdap = new SqlDataAdapter(Scmd);
        DataTable dt = new DataTable();
        Sdap.Fill(dt);

        return dt;
    }
    private static string GetUserList(DataTable dt, string flgActive)
    {
        string[] SkipColumn = new string[4];
        SkipColumn[0] = "EmpId";
        SkipColumn[1] = "Address";
        SkipColumn[2] = "EmgencyContactNo";
        SkipColumn[3] = "DOB";

        StringBuilder sb = new StringBuilder();
        sb.Append("<table class='clsEmptbl' id='tblEmpList'>");
        sb.Append("<thead>");
        sb.Append("<tr>");
        //for (int j = 0; j < dt.Columns.Count; j++)
        //{
        //    if (!SkipColumn.Contains(dt.Columns[j].ColumnName.ToString().Trim()))
        //    {
        //        sb.Append("<th>" + dt.Columns[j].ColumnName.ToString() + "</th>");
        //    }
        //}
        sb.Append("<th>Tele-Caller</th>");
        sb.Append("<th>Contact No</th>");
        sb.Append("<th>Email-Id</th>");
        sb.Append("<th>Mapped Route</th>");
        sb.Append("<th>Is PDA Mapped ?</th>");
        sb.Append("<th>Model</th>");
        sb.Append("<th>Primary IMEI</th>");
        sb.Append("<th>Secondary IMEI</th>");
        sb.Append("<th colspan='2'>Action</th>");
        sb.Append("</tr>");
        sb.Append("</thead>");
        sb.Append("<tbody>");
        if (dt.Rows.Count > 0)
        {
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                sb.Append("<tr EmpId='" + dt.Rows[i]["EmpId"].ToString() + "'>");
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    if (!SkipColumn.Contains(dt.Columns[j].ColumnName.ToString().Trim()))
                    {
                        if (dt.Columns[j].ColumnName.ToString() == "PDAMapped" && dt.Rows[i][j].ToString() == "No")
                        {
                            sb.Append("<td>No</td>");
                            sb.Append("<td>" + dt.Rows[i][j + 1].ToString() + "</td>");
                            sb.Append("<td colspan='2' style='width:200px;'><a href='#' onclick='fnAssignPDA(this);'>Assign PDA</a></td>");
                            j = j + 3;
                        }
                        else
                        {
                            sb.Append("<td>" + dt.Rows[i][j].ToString() + "</td>");
                        }
                    }
                }
                if (flgActive == "1")
                {
                    sb.Append("<td><a href='#' onclick='fnChangeStatus(this, 0);'>In-Active</a></td>");
                }
                else
                {
                    sb.Append("<td><a href='#' onclick='fnChangeStatus(this, 1);'>Active</a></td>");
                }
                sb.Append("<td><a href='#' onclick='fnEditUser(this);'>Edit</a></td>");
                sb.Append("</tr>");
            }
        }
        else
        {
            sb.Append("<tr><td colspan='" + ((dt.Columns.Count + 2) - SkipColumn.Length) + "'><div class='clsValideMsg'>No User Found !</div></td></tr>");
        }
        sb.Append("</tbody>");
        sb.Append("</table>");
        return sb.ToString();
    }
    private static string GetUserListforfilter(DataTable dt)
    {
        return JsonConvert.SerializeObject(dt, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
    }
    [System.Web.Services.WebMethod()]
    public static string GetListforValidation(string SiteNodeId, string SiteNodeType)
    {
        SqlConnection Scon = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        SqlCommand Scmd = new SqlCommand();
        Scmd.Connection = Scon;
        Scmd.CommandText = "[SpGetMappedPDAList]";       //Route
        Scmd.Parameters.AddWithValue("@TASSiteNodeId", SiteNodeId);
        Scmd.Parameters.AddWithValue("@TASSiteNodeType", SiteNodeType);
        Scmd.CommandType = CommandType.StoredProcedure;
        Scmd.CommandTimeout = 0;
        SqlDataAdapter Sdap = new SqlDataAdapter(Scmd);
        DataSet Ds = new DataSet();
        Sdap.Fill(Ds);

        return JsonConvert.SerializeObject(Ds, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
    }

    [System.Web.Services.WebMethod()]
    public static string GetRouteAssignList(string LoginID)
    {
        SqlConnection Scon = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        SqlCommand Scmd = new SqlCommand();
        Scmd.Connection = Scon;
        Scmd.CommandText = "[spGetTCUserListForMapping]";
        Scmd.Parameters.AddWithValue("@LoginID", LoginID);
        Scmd.CommandType = CommandType.StoredProcedure;
        Scmd.CommandTimeout = 0;
        SqlDataAdapter Sdap = new SqlDataAdapter(Scmd);
        DataSet Ds = new DataSet();
        Sdap.Fill(Ds);

        if (Ds.Tables[0].Rows.Count > 0)
        {
            return RouteAssignList(Ds.Tables[0]);
        }
        else
        {
            return "1^<div class='clsValideMsg'>No Active User Found !</div>";
        }
    }

    private static string RouteAssignList(DataTable dt)
    {
        string[] SkipColumn = new string[3];
        SkipColumn[0] = "TeleCallerId";
        SkipColumn[1] = "NodeType";
        SkipColumn[2] = "EmpId";

        StringBuilder sb = new StringBuilder();
        sb.Append("<table id='tblRouteAssign' class='clsRoutetbl'>");
        sb.Append("<thead>");
        sb.Append("<tr>");
        //for (int j = 0; j < dt.Columns.Count; j++)
        //{
        //    if (!SkipColumn.Contains(dt.Columns[j].ColumnName.ToString().Trim()))
        //    {
        //        sb.Append("<th>" + dt.Columns[j].ColumnName.ToString() + "</th>");
        //    }
        //}
        sb.Append("<th>Route</th>");
        sb.Append("<th>Tele-Caller</th>");
        sb.Append("<th>Is PDA Mapped ?</th>");
        sb.Append("<th>Model</th>");
        sb.Append("<th>Primary IMEI</th>");
        sb.Append("<th>Secondary IMEI</th>");
        sb.Append("</tr>");
        sb.Append("</thead>");
        sb.Append("<tbody>");
        for (int i = 0; i < dt.Rows.Count; i++)
        {
            sb.Append("<tr iden='trMain' flg='Route' nid='" + dt.Rows[i]["TeleCallerId"].ToString() + "' ntype='" + dt.Rows[i]["NodeType"].ToString() + "' empId='" + dt.Rows[i]["EmpId"].ToString() + "' prev_empId='" + dt.Rows[i]["EmpId"].ToString() + "'prev_emp='" + dt.Rows[i]["EmpName"].ToString() + "'>");

            for (int j = 0; j < dt.Columns.Count; j++)
            {
                if (!SkipColumn.Contains(dt.Columns[j].ColumnName.ToString().Trim()))
                {
                    if (dt.Columns[j].ColumnName.ToString().Trim() == "EmpName")
                    {
                        if (dt.Rows[i]["EmpId"].ToString() == "0")
                        {
                            sb.Append("<td iden='emp'><div class='input-group'><input type='text' value='Un-Assigned' onclick='fnShowUserFilterPopup(this,0);' onkeyup='fnShowUserFilterPopup(this,0)'/><div class='clsFilterPopup'></div></div></td>");
                        }
                        else
                        {
                            sb.Append("<td iden='emp'><div class='input-group'><input type='text' value='" + dt.Rows[i]["EmpName"].ToString() + "' onclick='fnShowUserFilterPopup(this,0);' onkeyup='fnShowUserFilterPopup(this,0)'/><div class='clsFilterPopup'></div></div></td>");
                        }
                    }
                    else
                    {
                        sb.Append("<td>" + dt.Rows[i][j].ToString() + "</td>");
                    }
                }
            }
            sb.Append("</tr>");
        }
        sb.Append("</table>");
        return sb.ToString();
    }

    [System.Web.Services.WebMethod()]
    public static string GetPDAAssignList(string SiteNodeId, string SiteNodeType, string LoginID)
    {
        SqlConnection Scon = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        SqlCommand Scmd = new SqlCommand();
        Scmd.Connection = Scon;
        Scmd.CommandText = "SpGetPDAList";
        Scmd.Parameters.AddWithValue("@TASSiteNodeId", SiteNodeId);
        Scmd.Parameters.AddWithValue("@TASSiteNodeType", SiteNodeType);
        Scmd.CommandType = CommandType.StoredProcedure;
        Scmd.CommandTimeout = 0;
        SqlDataAdapter Sdap = new SqlDataAdapter(Scmd);
        DataSet Ds = new DataSet();
        Sdap.Fill(Ds);

        if (Ds.Tables[0].Rows.Count > 0)
        {
            return "1^" + PDAAssignList(Ds.Tables[0]);
        }
        else
        {
            return "2^<div class='clsValideMsg'>No PDA Found !</div>";
        }
    }

    private static string PDAAssignList(DataTable dt)
    {
        string[] SkipColumn = new string[4];
        SkipColumn[0] = "PDAID";
        SkipColumn[1] = "EmpId";
        SkipColumn[2] = "ContactNo";
        SkipColumn[3] = "EmailId";

        StringBuilder sb = new StringBuilder();
        sb.Append("<table id='tblPDAAssign' class='clsPDAtbl'>");
        sb.Append("<thead>");
        sb.Append("<tr>");
        //for (int j = 0; j < dt.Columns.Count; j++)
        //{
        //    if (!SkipColumn.Contains(dt.Columns[j].ColumnName.ToString().Trim()))
        //    {
        //        sb.Append("<th>" + dt.Columns[j].ColumnName.ToString() + "</th>");
        //    }
        //}
        sb.Append("<th>Model</th>");
        sb.Append("<th>Primary IMEI</th>");
        sb.Append("<th>Secondary IMEI</th>");
        sb.Append("<th>Tele-Caller</th>");
        sb.Append("</tr>");
        sb.Append("</thead>");
        sb.Append("<tbody>");
        for (int i = 0; i < dt.Rows.Count; i++)
        {
            sb.Append("<tr iden='trMain' flg='PDA' PDAId='" + dt.Rows[i]["PDAID"].ToString() + "' prev_empId='" + dt.Rows[i]["EmpId"].ToString() + "' prev_emp='" + dt.Rows[i]["EmpName"].ToString() + "' empId='" + dt.Rows[i]["EmpId"].ToString() + "'>");

            for (int j = 0; j < dt.Columns.Count; j++)
            {
                if (!SkipColumn.Contains(dt.Columns[j].ColumnName.ToString().Trim()))
                {
                    if (dt.Columns[j].ColumnName.ToString().Trim() == "PDAModelName")
                    {
                        sb.Append("<td iden='modal'>" + dt.Rows[i][j].ToString() + "</td>");
                    }
                    else if (dt.Columns[j].ColumnName.ToString().Trim() == "PDA_IMEI")
                    {
                        sb.Append("<td iden='pimei'>" + dt.Rows[i][j].ToString() + "</td>");
                    }
                    else if (dt.Columns[j].ColumnName.ToString().Trim() == "PDA_IMEI_Sec")
                    {
                        sb.Append("<td iden='simei'>" + dt.Rows[i][j].ToString() + "</td>");
                    }
                    else if (dt.Columns[j].ColumnName.ToString().Trim() == "EmpName")
                    {
                        if (dt.Rows[i]["EmpId"].ToString() == "0")
                        {
                            sb.Append("<td iden='emp'><div class='input-group'><input type='text' value='Un-Assigned' onclick='fnShowUserFilterPopup(this,0);' onkeyup='fnShowUserFilterPopup(this,0)'/><div class='clsFilterPopup'></div></div></td>");
                        }
                        else
                        {
                            sb.Append("<td iden='emp'><div class='input-group'><input type='text' value='" + dt.Rows[i]["EmpName"].ToString() + "' onclick='fnShowUserFilterPopup(this,0);' onkeyup='fnShowUserFilterPopup(this,0)'/><div class='clsFilterPopup'></div></div></td>");
                        }
                    }

                }
            }
            sb.Append("</tr>");
        }
        sb.Append("</tbody>");
        sb.Append("</table>");
        return sb.ToString();
    }
    [System.Web.Services.WebMethod()]
    public static string fnChangeUserStatus(string LoginID, string EmpId, string flgActive)
    {
        try
        {
            SqlConnection Scon = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
            SqlCommand Scmd = new SqlCommand();
            Scmd.Connection = Scon;
            Scmd.CommandText = "[spSetEmployeeStatus]";
            Scmd.Parameters.AddWithValue("@EmpId", EmpId);
            Scmd.Parameters.AddWithValue("@flgActive", flgActive);
            Scmd.Parameters.AddWithValue("@LoginID", LoginID);
            Scmd.CommandType = CommandType.StoredProcedure;
            Scmd.CommandTimeout = 0;
            SqlDataAdapter Sdap = new SqlDataAdapter(Scmd);
            DataSet Ds = new DataSet();
            Sdap.Fill(Ds);

            return "1";
        }
        catch (Exception ex)
        {
            return "2";
        }
    }
    [System.Web.Services.WebMethod()]
    public static string fnSaveUserDetails(string EmpId, string EmpName, string ContactNo, string EmailId, string EmergencyContactNo, string DOB, string flgActive, string TASSiteNodeId, string TASSiteNodeType, string LoginId, string Modal, string Pri_IMEI, string Sec_IMEI, string flgHasPDA, string flgPDAMoved, string Address)
    {
        try
        {
            SqlConnection Scon = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
            SqlCommand Scmd = new SqlCommand();
            Scmd.Connection = Scon;
            Scmd.CommandText = "[spPopulateEmpMstr]";
            Scmd.Parameters.AddWithValue("@EmpId", EmpId);
            Scmd.Parameters.AddWithValue("@EmpName", HttpUtility.HtmlEncode(EmpName));
            Scmd.Parameters.AddWithValue("@ContactNo", HttpUtility.HtmlEncode(ContactNo));
            Scmd.Parameters.AddWithValue("@EmailId", HttpUtility.HtmlEncode(EmailId));
            Scmd.Parameters.AddWithValue("@Address", HttpUtility.HtmlEncode(Address));
            Scmd.Parameters.AddWithValue("@EmergencyContactNo", HttpUtility.HtmlEncode(EmergencyContactNo));
            if (DOB == "")
                Scmd.Parameters.AddWithValue("@DOB", null);
            else
                Scmd.Parameters.AddWithValue("@DOB", DOB);
            Scmd.Parameters.AddWithValue("@flgActive", flgActive);
            Scmd.Parameters.AddWithValue("@TASSiteNodeId", TASSiteNodeId);
            Scmd.Parameters.AddWithValue("@TASSiteNodeType", TASSiteNodeType);
            Scmd.Parameters.AddWithValue("@LoginId", LoginId);
            Scmd.CommandType = CommandType.StoredProcedure;
            Scmd.CommandTimeout = 0;
            SqlDataAdapter Sdap = new SqlDataAdapter(Scmd);
            DataSet Ds = new DataSet();
            Sdap.Fill(Ds);

            if (flgHasPDA == "1")
            {
                fnSavePDADetails(Ds.Tables[0].Rows[0]["EmpId"].ToString(), TASSiteNodeId, TASSiteNodeType, LoginId, Modal, Pri_IMEI, Sec_IMEI);
            }

            return "1";
        }
        catch (Exception ex)
        {
            return "2";
        }
    }

    [System.Web.Services.WebMethod()]
    public static string fnSaveRouteMapping(object objRouteMap, string LoginID)
    {
        try
        {
            string strRouteMap = JsonConvert.SerializeObject(objRouteMap, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
            DataTable DtRouteMap = JsonConvert.DeserializeObject<DataTable>(strRouteMap);

            SqlConnection Scon = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
            SqlCommand Scmd = new SqlCommand();
            Scmd.Connection = Scon;
            Scmd.CommandText = "[spMapEmployeeWithTeleCallerRoute]";
            Scmd.Parameters.AddWithValue("@EmpToTCRouteMap", DtRouteMap);
            Scmd.Parameters.AddWithValue("@LoginId", LoginID);
            Scmd.CommandType = CommandType.StoredProcedure;
            Scmd.CommandTimeout = 0;
            SqlDataAdapter Sdap = new SqlDataAdapter(Scmd);
            DataSet Ds = new DataSet();
            Sdap.Fill(Ds);

            return "1";
        }
        catch (Exception ex)
        {
            return "2";
        }
    }
    [System.Web.Services.WebMethod()]
    public static string fnSavePDAMapping(object objPDAMap, string TASSiteNodeId, string TASSiteNodeType, string LoginId)
    {
        try
        {
            string strPDAMap = JsonConvert.SerializeObject(objPDAMap, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
            DataTable DtPDAMap = JsonConvert.DeserializeObject<DataTable>(strPDAMap);

            for (int i = 0; i < DtPDAMap.Rows.Count; i++)
            {
                fnSavePDADetails(DtPDAMap.Rows[i]["EmpId"].ToString(), TASSiteNodeId, TASSiteNodeType, LoginId, DtPDAMap.Rows[i]["Modal"].ToString(), DtPDAMap.Rows[i]["PIMEI"].ToString(), DtPDAMap.Rows[i]["SIMEI"].ToString());
            }

            return "1";
        }
        catch (Exception ex)
        {
            return "2";
        }
    }
    [System.Web.Services.WebMethod()]
    public static string fnSavePDADetails(string EmpId, string TASSiteNodeId, string TASSiteNodeType, string LoginId, string Modal, string Pri_IMEI, string Sec_IMEI)
    {
        try
        {
            SqlConnection Scon = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
            SqlCommand Scmd2 = new SqlCommand();
            Scmd2.Connection = Scon;
            Scmd2.CommandText = "[SpSavePDAMapping]";
            Scmd2.Parameters.AddWithValue("@EmpID", EmpId);
            Scmd2.Parameters.AddWithValue("@PDAIMEINo1", HttpUtility.HtmlEncode(Pri_IMEI));
            Scmd2.Parameters.AddWithValue("@PDAIMEINo2", HttpUtility.HtmlEncode(Sec_IMEI));
            Scmd2.Parameters.AddWithValue("@PDAModelName", HttpUtility.HtmlEncode(Modal));
            Scmd2.Parameters.AddWithValue("@TASSiteNodeId", TASSiteNodeId);
            Scmd2.Parameters.AddWithValue("@TASSiteNodeType", TASSiteNodeType);
            Scmd2.Parameters.AddWithValue("@LoginID", LoginId);
            Scmd2.CommandType = CommandType.StoredProcedure;
            Scmd2.CommandTimeout = 0;
            SqlDataAdapter Sdap2 = new SqlDataAdapter(Scmd2);
            DataSet Ds2 = new DataSet();
            Sdap2.Fill(Ds2);

            return "1";
        }
        catch (Exception ex)
        {
            return "2";
        }
    }
}