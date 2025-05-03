using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
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
                hdnMenuId.Value = Request.QueryString["id"] == null ? "2" : Request.QueryString["id"].ToString();
                // fnBindSiteList();
                //fnBindBranchList();
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
            // ddlSite.Items.Add(itm);
        }
        foreach (DataRow dr in dt.Rows)
        {
            itm = new ListItem();
            itm.Text = dr["SiteName"].ToString();
            itm.Value = dr["sitenodeid"].ToString() + "-" + dr["SiteNodeType"].ToString();
            //ddlSite.Items.Add(itm);
        }
    }
    private void fnBindBranchList()
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

        ListItem itm = new ListItem();
        if (dt.Rows.Count > 1)
        {
            itm.Text = "--------";
            itm.Value = "0-0-0-0";
            //ddlBranch.Items.Add(itm);
        }
        foreach (DataRow dr in dt.Rows)
        {
            itm = new ListItem();
            itm.Text = dr["BranchName"].ToString();
            itm.Attributes.Add("sitenodeid", dr["sitenodeid"].ToString() + "-" + dr["SiteNodeType"].ToString());
            itm.Value = dr["BrnNodeId"].ToString() + "-" + dr["BrnNodeType"].ToString() + "-" + dr["sitenodeid"].ToString() + "-" + dr["SiteNodeType"].ToString();
            //ddlBranch.Items.Add(itm);
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
            string storedProcName = "spGetAbsentDSEList";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   //new SqlParameter("@SiteNodeId", SiteNodeId),
                   //new SqlParameter("@SiteNodeType", SiteNodeType),
                   //new SqlParameter("@BranchNodeId", BranchNodeId),
                   //new SqlParameter("@BranchNodeType", BranchNodeType),
                    new SqlParameter("@flgFromCCR", 0),
                   new SqlParameter("@LoginId", LoginId),
                   new SqlParameter("@AttndDate", DateTime.Now.ToString("dd-MMM-yyyy"))
                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);


            string storedProcName1 = "spGetTCUserList";
            sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@LoginId", LoginId),
                };
            Ds1 = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName1, con, sp);
            /*
                        DataRow dr = Ds1.Tables[0].NewRow();
                        dr["UserId"] = "0";
                        dr["UserName"] = "-Select-";
                        dr["flgAbsentee"] = true;
                        dr["flgF1F2F4"] = false;
                        dr["flgD2"] = false;
                        dr["flgD0"] = false;
                        Ds1.Tables[0].Rows.InsertAt(dr, 0);
            */
            StringBuilder str = new StringBuilder();

            if (Ds.Tables[0].Rows.Count > 0)
            {
                string[] SkipColumn = new string[6];
                SkipColumn[0] = "TCUserId";
                SkipColumn[1] = "AttendDetId";
                SkipColumn[2] = "TCUser";
                SkipColumn[3] = "isBlocked";
                SkipColumn[4] = "Branch/SUBD Code";
                SkipColumn[5] = "DSE Code";

                int isSubmitted = 0;// int.Parse(Ds.Tables[1].Rows[0]["isSubmitted"].ToString());
                //StartDate = DateTime.Parse(Ds.Tables[0].Rows[0]["StartDate"].ToString()).ToString("dd MMM");
                str.Append("<table id='tbldbrlistTwo'class='clsdtTable' style='width:100%' isSubmitted=" + isSubmitted + " BranchNodeId='0' BranchNodeType='0'><thead><tr>");

                string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";

                str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:3%' >#</th>");
                for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                {
                    if (SkipColumn.Contains(Ds.Tables[0].Columns[j].ColumnName))
                    {
                        continue;
                    }
                    ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                    string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                    if (sColumnName == "# Of Stores" || sColumnName == "# Of Contact Number")
                    {
                        sColumnName = sColumnName == "# Of Contact Number" ? "# Of Contact" : sColumnName;
                    }
                    str.Append("<th " + ss + ">" + sColumnName + "</th>");
                }
                str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:5%'>Tele User</th>");
                //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:8%'>Action</th>");
                str.Append("</tr></thead><tbody>");

                ss = "";
                int noofstore = 0;
                int noofcontact = 0;
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {

                    string dropdownlist_at = "";

                    //dropdownlist_at += "<option value='0'>--Select---</option>";
                    DataRow[] drowss = Ds1.Tables[0].Select("flgAbsentee=1");
                    dropdownlist_at += "<option value='0'>--Select---</option>";
                    for (var j = 0; j < drowss.Count(); j++)
                    {
                        if (Ds.Tables[0].Rows[i]["TCUserId"].ToString() == drowss[j]["UserId"].ToString())
                        {
                            dropdownlist_at += "<option value='" + drowss[j]["UserId"].ToString() + "' selected>" + drowss[j]["UserName"].ToString() + "</option>";
                        }
                        else
                        {
                            dropdownlist_at += "<option value='" + drowss[j]["UserId"].ToString() + "'>" + drowss[j]["UserName"].ToString() + "</option>";
                        }
                    }


                    int MarkAtt = int.Parse(Ds.Tables[0].Rows[i]["isBlocked"].ToString());
                    str.Append("<tr " + (MarkAtt == 1 ? "class='clsHighlightrows'" : "") + " AttendDetId='" + Ds.Tables[0].Rows[i]["AttendDetId"].ToString() + "' TCUserId='" + Ds.Tables[0].Rows[i]["TCUserId"].ToString() + "' gstno='2'>");
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
                        if (Ds.Tables[0].Columns[j].ColumnName == "DSECode" || Ds.Tables[0].Columns[j].ColumnName == "DSE Name")
                        {
                            flgSearchable = "Searchable='1'";
                            sData += " (" + Ds.Tables[0].Rows[i]["DSE Code"].ToString() + ")";
                        }
                        //ss += "'";
                        var attrIden = "";
                        if (Ds.Tables[0].Columns[j].ColumnName == "# Of Stores")
                        {
                            attrIden = "iden='1'";
                            noofstore = noofstore + Convert.ToInt16(sData);
                        }
                        if (Ds.Tables[0].Columns[j].ColumnName == "# Of Contact Number")
                        {
                            attrIden = "iden='2'";
                            noofcontact = noofcontact + Convert.ToInt16(sData);
                        }

                        if (Ds.Tables[0].Columns[j].ColumnName == "Branch/SUBD Name")
                        {
                            sData += " - " + Ds.Tables[0].Rows[i]["Branch/SUBD Code"].ToString();
                        }
                        str.Append("<td " + ss + "   " + flgSearchable + "  " + attrIden + ">" + sData + "</td>");
                    }

                    str.Append("<td style='text-align:center;'><select onchange='fnChangeTC(this)' " + (Ds.Tables[0].Rows[i]["isBlocked"].ToString() == "1" ? "disabled='disabled'" : "") + " UserId='" + Ds.Tables[0].Rows[i]["TCUserId"].ToString() + "'> " + dropdownlist_at + "<select/></td>");
                    //str.Append("<td style='text-align:center'><a href='###' onclick='fnChangeSectorRoute(this)' style='display:none' title='Click To Change Route/Sector'><img src='../images/edit.jpg'/></a></td>");
                    str.Append("</tr>");
                }

                //--- start total
                str.Append("</tbody><tfoot><tr>");
                int totcolmn = Convert.ToInt16(Ds.Tables[0].Columns.Count) - Convert.ToInt16(SkipColumn.Count());
                for (int td_i = 0; td_i < totcolmn - 3; td_i++)
                {
                    str.Append("<td></td>");
                }
                str.Append("<td style='text-align:left;font-weight:bold;'>Total</td>");
                str.Append("<td style='text-align:center;font-weight:bold;'>" + Convert.ToString(noofstore) + "</td><td style='text-align:center;font-weight:bold;'>" + Convert.ToString(noofcontact) + "</td><td></td><td></td>");
                str.Append("</tr>");
                //------end total

                str.Append("</tfoot></table>");
                str.Append("<div style='margin:4px; text-align:center'><input type='button' value='Assign Absenteeism Calls To TC' class='btn btn-primary' onclick='fnSaveFinalData(2)' /></div>");
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
    public static string fnDSEListBasedONCCR(int LoginId)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        DataSet Ds1 = null;
        string stresponse = "";
        try
        {
            string storedProcName = "spGetAbsentDSEList";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   //new SqlParameter("@SiteNodeId", SiteNodeId),
                   //new SqlParameter("@SiteNodeType", SiteNodeType),
                   //new SqlParameter("@BranchNodeId", BranchNodeId),
                   new SqlParameter("@flgFromCCR", 1),
                   new SqlParameter("@LoginId", LoginId),
                   new SqlParameter("@AttndDate", DateTime.Now.ToString("dd-MMM-yyyy"))
                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            HttpContext.Current.Session["dsPersonAttendance_AssignCalls"] = Ds;

            string storedProcName1 = "spGetTCUserList";
            sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@LoginId", LoginId),
                };
            Ds1 = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName1, con, sp);
            /*
                        DataRow dr = Ds1.Tables[0].NewRow();
                        dr["UserId"] = "0";
                        dr["UserName"] = "-Select-";
                        dr["flgAbsentee"] = true;
                        dr["flgF1F2F4"] = false;
                        dr["flgD2"] = false;
                        dr["flgD0"] = false;
                        Ds1.Tables[0].Rows.InsertAt(dr, 0);
            */
            StringBuilder str = new StringBuilder();

            if (Ds.Tables[0].Rows.Count > 0)
            {
                string[] SkipColumn = new string[8];
                SkipColumn[0] = "TCUserId";
                SkipColumn[1] = "AttendDetId";
                SkipColumn[2] = "TCUser";
                SkipColumn[3] = "isBlocked";
                SkipColumn[4] = "Branch/SUBD Code";
                SkipColumn[5] = "DSE Code";
                SkipColumn[6] = "DSENodeID";
                SkipColumn[7] = "DSENOdeType";

                int isSubmitted = 0;// int.Parse(Ds.Tables[1].Rows[0]["isSubmitted"].ToString());
                //StartDate = DateTime.Parse(Ds.Tables[0].Rows[0]["StartDate"].ToString()).ToString("dd MMM");
                str.Append("<table id='tbldbrlistFour'class='clsdtTable' style='width:100%' isSubmitted=" + isSubmitted + " BranchNodeId='0' BranchNodeType='0'><thead><tr>");

                string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";

                str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:3%' >#</th>");
                for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                {
                    if (SkipColumn.Contains(Ds.Tables[0].Columns[j].ColumnName))
                    {
                        continue;
                    }
                    ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                    string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                    if (sColumnName == "# Of Stores" || sColumnName == "# Of Contact Number")
                    {
                        sColumnName = sColumnName == "# Of Contact Number" ? "# Of Contact" : sColumnName;
                    }
                    str.Append("<th " + ss + ">" + sColumnName + "</th>");
                }
                str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:5%'>Tele User</th>");
                //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:8%'>Action</th>");
                str.Append("</tr></thead><tbody>");

                ss = "";
                int noofstore = 0;
                int noofcontact = 0;
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {

                    string dropdownlist_at = "";

                    //dropdownlist_at += "<option value='0'>--Select---</option>";
                    DataRow[] drowss = Ds1.Tables[0].Select("flgAbsentee=1");
                    dropdownlist_at += "<option value='0'>--Select---</option>";
                    for (var j = 0; j < drowss.Count(); j++)
                    {
                        if (Ds.Tables[0].Rows[i]["TCUserId"].ToString() == drowss[j]["UserId"].ToString())
                        {
                            dropdownlist_at += "<option value='" + drowss[j]["UserId"].ToString() + "' selected>" + drowss[j]["UserName"].ToString() + "</option>";
                        }
                        else
                        {
                            dropdownlist_at += "<option value='" + drowss[j]["UserId"].ToString() + "'>" + drowss[j]["UserName"].ToString() + "</option>";
                        }
                    }


                    int MarkAtt = int.Parse(Ds.Tables[0].Rows[i]["isBlocked"].ToString());
                    str.Append("<tr " + (MarkAtt == 1 ? "class='clsHighlightrows'" : "") + "  DSENodeId='" + Ds.Tables[0].Rows[i]["DSENodeId"].ToString() + "' DSENodeType='" + Ds.Tables[0].Rows[i]["DSENodeType"].ToString() + "' AttendDetId='" + Ds.Tables[0].Rows[i]["AttendDetId"].ToString() + "' TCUserId='" + Ds.Tables[0].Rows[i]["TCUserId"].ToString() + "' gstno='2'>");
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
                        if (Ds.Tables[0].Columns[j].ColumnName == "DSECode" || Ds.Tables[0].Columns[j].ColumnName == "DSE Name")
                        {
                            flgSearchable = "Searchable='1'";
                            sData += " (" + Ds.Tables[0].Rows[i]["DSE Code"].ToString() + ")";
                        }
                        //ss += "'";
                        var attrIden = "";
                        if (Ds.Tables[0].Columns[j].ColumnName == "# Of Stores")
                        {
                            attrIden = "iden='1'";
                            noofstore = noofstore + Convert.ToInt16(sData);
                        }
                        if (Ds.Tables[0].Columns[j].ColumnName == "# Of Contact Number")
                        {
                            attrIden = "iden='2'";
                            noofcontact = noofcontact + Convert.ToInt16(sData);
                        }

                        if (sColumnName == "# Of Stores" || sColumnName == "# Of Contact Number")
                        {
                            sData = "<a href='###' style='color:blue;' title='click to show channel details' onclick='fnSHowData(this)'>" + sData + "</a>";
                        }

                        if (Ds.Tables[0].Columns[j].ColumnName == "Branch/SUBD Name")
                        {
                            sData += " - " + Ds.Tables[0].Rows[i]["Branch/SUBD Code"].ToString();
                        }
                        str.Append("<td " + ss + "   " + flgSearchable + "  " + attrIden + ">" + sData + "</td>");
                    }

                    str.Append("<td style='text-align:center;'><select onchange='fnChangeTC(this)' " + (Ds.Tables[0].Rows[i]["isBlocked"].ToString() == "1" ? "disabled='disabled'" : "") + " UserId='" + Ds.Tables[0].Rows[i]["TCUserId"].ToString() + "'> " + dropdownlist_at + "<select/></td>");
                    //str.Append("<td style='text-align:center'><a href='###' onclick='fnChangeSectorRoute(this)' style='display:none' title='Click To Change Route/Sector'><img src='../images/edit.jpg'/></a></td>");
                    str.Append("</tr>");
                }

                //--- start total
                str.Append("</tbody><tfoot><tr>");
                int totcolmn = Convert.ToInt16(Ds.Tables[0].Columns.Count) - Convert.ToInt16(SkipColumn.Count());
                for (int td_i = 0; td_i < totcolmn - 3; td_i++)
                {
                    str.Append("<td></td>");
                }
                str.Append("<td style='text-align:left;font-weight:bold;'>Total</td>");
                str.Append("<td style='text-align:center;font-weight:bold;'>" + Convert.ToString(noofstore) + "</td><td style='text-align:center;font-weight:bold;'>" + Convert.ToString(noofcontact) + "</td><td></td><td></td>");
                str.Append("</tr>");
                //------end total

                str.Append("</tfoot></table>");
                str.Append("<div style='margin:4px; text-align:center'><input type='button' value='Assign Absenteeism Calls To TC' class='btn btn-primary' onclick='fnSaveFinalData(4)' /></div>");
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
    public static string fnDSEChannelList(int DSENodeId, int DSENodeType)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        try
        {

            Ds = (DataSet)HttpContext.Current.Session["dsPersonAttendance_AssignCalls"];
            StringBuilder str = new StringBuilder();
            DataTable dt = Ds.Tables[1].Select("DSENodeID=" + DSENodeId).CopyToDataTable();
            if (dt.Rows.Count > 0)
            {
                string[] SkipColumn = new string[9];
                SkipColumn[0] = "DSENodeID";
                SkipColumn[1] = "DSENOdeType";
                SkipColumn[2] = "flgAbsent";
                SkipColumn[3] = "RouteNodeId";
                SkipColumn[4] = "RouteNodeType";
                SkipColumn[5] = "SectorId";
                SkipColumn[6] = "flgRouteSectorChange";
                SkipColumn[7] = "SectorCode";
                SkipColumn[8] = "TCUserId";

                //StartDate = DateTime.Parse(Ds.Tables[0].Rows[0]["StartDate"].ToString()).ToString("dd MMM");
                str.Append("<table rules='all' border='1' id='tbldbrlistDetails' style='width:100%'><thead><tr>");

                string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";

                str.Append("<th style='width:4%;text-align:center' >#</th>");
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    if (SkipColumn.Contains(dt.Columns[j].ColumnName))
                    {
                        continue;
                    }
                    ss = "style='text-align:center'";
                    string sColumnName = dt.Columns[j].ColumnName;
                    if (sColumnName == "DSECode")
                    {
                        ss = "style='text-align:center'";
                    }
                    else if (sColumnName == "RouteNumber")
                    {
                        sColumnName = "Route Number";
                        ss = "style='text-align:center'";
                    }
                    else if (sColumnName == "SectorCode")
                    {
                        ss = "style='width:15%;text-align:center'";
                    }
                    else if (sColumnName == "TCUserId")
                    {
                        ss = "style='width:5%;text-align:center'";
                    }
                    else if (sColumnName == "TargetCalls")
                    {
                        ss = "style='width:6%;text-align:center'";
                        sColumnName = "Target Calls";
                    }
                    else if (sColumnName == "CallsMade")
                    {
                        ss = "style='width:6%;text-align:center'";
                        sColumnName = "Calls Made";
                    }
                    str.Append("<th " + ss + ">" + sColumnName.Replace("TCUserId", "IsTelecaller Mapped") + "</th>");
                }
                // str.Append("<th style='width:7%;text-align:center'>Mark Absent</th>");
                //str.Append("<th style='width:7%;text-align:center'>Action</th>");
                str.Append("</tr></thead><tbody>");

                ss = "";
                for (int i = 0; i < dt.Rows.Count; i++)
                {

                    str.Append("<tr>");
                    str.Append("<td style='text-align:center'>" + (i + 1) + "</td>");
                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        string sColumnName = dt.Columns[j].ColumnName;
                        if (SkipColumn.Contains(sColumnName))
                        {
                            continue;
                        }
                        var sData = dt.Rows[i][j];
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

                    str.Append("</tr>");
                }
                str.Append("</tbody></table>");
            }
            else
            {
                str.Append("");
            }
            stresponse = "1|" + str.ToString();// + "|" + JsonConvert.SerializeObject(Ds.Tables[1], Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore }) + "|" + JsonConvert.SerializeObject(Ds.Tables[2], Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
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

    [System.Web.Services.WebMethod()]
    public static string fnOTwoDSEList(int LoginId)
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

            /*  DataRow dr = Ds1.Tables[0].NewRow();
              dr["UserId"] = "0";
              dr["UserName"] = "-Select-";
              dr["flgAbsentee"] = false;
              dr["flgF1F2F4"] = false;
              dr["flgD2"] = true;
              dr["flgD0"] = false;
              Ds1.Tables[0].Rows.InsertAt(dr, 0);
  */
            StringBuilder str = new StringBuilder();



            if (Ds.Tables[0].Rows.Count > 0)
            {
                string[] SkipColumn = new string[10];
                SkipColumn[0] = "DSENodeId";
                SkipColumn[1] = "DSENodeType";
                SkipColumn[2] = "BranchNodeId";
                SkipColumn[3] = "BranchNodeType";
                SkipColumn[4] = "TeleReasonId";
                SkipColumn[5] = "TeleUserId";
                SkipColumn[6] = "RouteNodeId";
                SkipColumn[7] = "SectorId";
                SkipColumn[8] = "isBlocked";
                SkipColumn[9] = "Branch/SUBD Code";

                int isSubmitted = 0;// int.Parse(Ds.Tables[1].Rows[0]["isSubmitted"].ToString());
                //StartDate = DateTime.Parse(Ds.Tables[0].Rows[0]["StartDate"].ToString()).ToString("dd MMM");
                str.Append("<table id='tbldbrlistThree' class='clsdtTable' style='width:100%' isSubmitted=" + isSubmitted + " BranchNodeId='0' BranchNodeType='0'><thead><tr>");

                string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";

                str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:3%' >#</th>");
                for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                {
                    if (SkipColumn.Contains(Ds.Tables[0].Columns[j].ColumnName))
                    {
                        continue;
                    }
                    ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                    string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                    if (sColumnName == "# Of Stores" || sColumnName == "# Of Contact Number")
                    {
                        sColumnName = sColumnName == "# Of Contact Number" ? "# Of Contact" : sColumnName;
                    }
                    str.Append("<th " + ss + ">" + sColumnName + "</th>");
                }
                str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:5%'>Tele User</th>");
                //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:8%'>Action</th>");
                str.Append("</tr></thead><tbody>");

                ss = "";
                int noofstore = 0;
                int noofcontact = 0;
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {

                    string dropdownlist_at = "";
                    DataRow[] drowss = Ds1.Tables[0].Select("flgD2=1");
                    dropdownlist_at += "<option value='0'>--Select---</option>";
                    for (var j = 0; j < drowss.Count(); j++)
                    {
                        if (Ds.Tables[0].Rows[i]["TeleUserId"].ToString() == drowss[j]["UserId"].ToString())
                        {
                            dropdownlist_at += "<option value='" + drowss[j]["UserId"].ToString() + "' selected>" + drowss[j]["UserName"].ToString() + "</option>";
                        }
                        else
                        {
                            dropdownlist_at += "<option value='" + drowss[j]["UserId"].ToString() + "'>" + drowss[j]["UserName"].ToString() + "</option>";
                        }
                    }


                    int MarkAtt = int.Parse(Ds.Tables[0].Rows[i]["isBlocked"].ToString());
                    str.Append("<tr " + (MarkAtt == 1 ? "class='clsHighlightrows'" : "") + " DSENodeId='" + Ds.Tables[0].Rows[i]["DSENodeId"].ToString() + "' DSENodeType='" + Ds.Tables[0].Rows[i]["DSENodeType"].ToString() + "' BranchNodeId='" + Ds.Tables[0].Rows[i]["BranchNodeId"].ToString() + "' BranchNodeType='" + Ds.Tables[0].Rows[i]["BranchNodeType"].ToString() + "'  TeleReasonId='" + Ds.Tables[0].Rows[i]["TeleReasonId"].ToString() + "'  gstno='2'>");
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
                        var attrIden = "";
                        if (Ds.Tables[0].Columns[j].ColumnName == "# Of Stores")
                        {
                            attrIden = "iden='1'";
                            noofstore = noofstore + Convert.ToInt16(sData);
                        }
                        if (Ds.Tables[0].Columns[j].ColumnName == "# Of Contact Number")
                        {
                            attrIden = "iden='2'";
                            noofcontact = noofcontact + Convert.ToInt16(sData);
                        }
                        if (Ds.Tables[0].Columns[j].ColumnName == "Branch/SUBD Name")
                        {
                            sData += " - " + Ds.Tables[0].Rows[i]["Branch/SUBD Code"].ToString();
                        }
                        //ss += "'";
                        str.Append("<td " + ss + "   " + flgSearchable + " " + attrIden + ">" + sData + "</td>");
                    }

                    str.Append("<td style='text-align:center'><select onchange='fnChangeTC(this)' " + (Ds.Tables[0].Rows[i]["isBlocked"].ToString() == "1" ? "disabled='disabled'" : "") + " UserId='" + Ds.Tables[0].Rows[i]["TeleUserId"].ToString() + "'> " + dropdownlist_at + "<select/></td>");
                    //str.Append("<td style='text-align:center'><a href='###' onclick='fnChangeSectorRoute(this)' style='display:none' title='Click To Change Route/Sector'><img src='../images/edit.jpg'/></a></td>");
                    str.Append("</tr>");
                }

                //--- start total
                str.Append("</tbody><tfoot><tr>");
                int totcolmn = Convert.ToInt16(Ds.Tables[0].Columns.Count + 1) - Convert.ToInt16(SkipColumn.Count());
                for (int td_i = 0; td_i < totcolmn; td_i++)
                {
                    str.Append("<td></td>");
                }
                str.Append("<td style='text-align:left;font-weight:bold;'>Total</td>");
                str.Append("<td style='text-align:center;font-weight:bold;'>" + Convert.ToString(noofstore) + "</td><td style='text-align:center;font-weight:bold;'>" + Convert.ToString(noofcontact) + "</td><td></td>");
                str.Append("</tr>");
                //------end total
                str.Append("</tfoot></table>");
                str.Append("<div style='margin:4px; text-align:center'><input type='button' value='Assign D+2 Calls To TC' class='btn btn-primary' onclick='fnSaveFinalData(3)' /></div>");
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



    [System.Web.Services.WebMethod()]
    public static string fnGetTeleCallerTodaysPlannedList(int LoginId)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        DataSet Ds1 = null;
        string stresponse = "";
        try
        {
            string storedProcName = "spGetTeleCallerTodaysPlannedList";
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
            /*
                        DataRow dr = Ds1.Tables[0].NewRow();
                        dr["UserId"] = "0";
                        dr["UserName"] = "---Select---";
                        dr["flgAbsentee"] = false;
                        dr["flgF1F2F4"] = true;
                        dr["flgD2"] = false;
                        dr["flgD0"] = false;
                        Ds1.Tables[0].Rows.InsertAt(dr, 0);
            */
            StringBuilder str = new StringBuilder();



            if (Ds.Tables[0].Rows.Count > 0)
            {
                string[] SkipColumn = new string[9];
                SkipColumn[0] = "DSENodeId";
                SkipColumn[1] = "DSENodeType";
                SkipColumn[2] = "BranchNodeId";
                SkipColumn[3] = "BranchNodeType";
                //SkipColumn[4] = "TeleReasonId";
                SkipColumn[4] = "TeleUserId";
                SkipColumn[5] = "RouteNodeId";
                SkipColumn[6] = "SectorId";
                SkipColumn[7] = "isBlocked";
                SkipColumn[8] = "Branch/SUBD Code";

                int isSubmitted = 0;// int.Parse(Ds.Tables[1].Rows[0]["isSubmitted"].ToString());
                //StartDate = DateTime.Parse(Ds.Tables[0].Rows[0]["StartDate"].ToString()).ToString("dd MMM");
                str.Append("<table id='tbldbrlistOne' class='clsdtTable' style='width:100%' isSubmitted=" + isSubmitted + " BranchNodeId='0' BranchNodeType='0'><thead><tr>");

                string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";

                str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:2%' >#</th>");
                for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                {
                    if (SkipColumn.Contains(Ds.Tables[0].Columns[j].ColumnName))
                    {
                        continue;
                    }
                    ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                    string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                    if (sColumnName == "# Of Stores" || sColumnName == "# Of Contact Number")
                    {
                        sColumnName = sColumnName == "# Of Contact Number" ? "# Of Contact" : sColumnName;
                        ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:8%'";
                    }
                    else if (sColumnName == "DSEName")
                    {
                        ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:20%'";
                    }
                    str.Append("<th " + ss + ">" + sColumnName + "</th>");
                }
                str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:5%'>Tele User</th>");
                //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:8%'>Action</th>");
                str.Append("</tr></thead><tbody>");

                ss = "";
                int noofstore = 0;
                int noofcontact = 0;
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {

                    string dropdownlist_at = "";

                    //dropdownlist_at += "<option value='0'>--Select---</option>";
                    DataRow[] drowss = Ds1.Tables[0].Select("flgF1F2F4=1");
                    dropdownlist_at += "<option value='0'>--Select---</option>";
                    for (var j = 0; j < drowss.Count(); j++)
                    {
                        if (Ds.Tables[0].Rows[i]["TeleUserId"].ToString() == drowss[j]["UserId"].ToString())
                        {
                            dropdownlist_at += "<option value='" + drowss[j]["UserId"].ToString() + "' selected>" + drowss[j]["UserName"].ToString() + "</option>";
                        }
                        else
                        {
                            dropdownlist_at += "<option value='" + drowss[j]["UserId"].ToString() + "'>" + drowss[j]["UserName"].ToString() + "</option>";
                        }
                    }



                    int MarkAtt = int.Parse(Ds.Tables[0].Rows[i]["isBlocked"].ToString());
                    str.Append("<tr " + (MarkAtt == 1 ? "class='clsHighlightrows'" : "") + " DSENodeId='" + Ds.Tables[0].Rows[i]["DSENodeId"].ToString() + "' DSENodeType='" + Ds.Tables[0].Rows[i]["DSENodeType"].ToString() + "' BranchNodeId='" + Ds.Tables[0].Rows[i]["BranchNodeId"].ToString() + "' BranchNodeType='" + Ds.Tables[0].Rows[i]["BranchNodeType"].ToString() + "' RouteNodeId='" + Ds.Tables[0].Rows[i]["RouteNodeId"].ToString() + "' RouteNodeType='150' SectorId='" + Ds.Tables[0].Rows[i]["SectorId"].ToString() + "'  gstno='2'>");
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

                        var attrIden = "";
                        if (Ds.Tables[0].Columns[j].ColumnName == "# Of Stores")
                        {
                            attrIden = "iden='1'";
                            noofstore = noofstore + Convert.ToInt16(sData);
                        }
                        if (Ds.Tables[0].Columns[j].ColumnName == "# Of Contact Number")
                        {
                            attrIden = "iden='2'";
                            noofcontact = noofcontact + Convert.ToInt16(sData);
                        }
                        if (Ds.Tables[0].Columns[j].ColumnName == "Branch/SUBD Name")
                        {
                            sData += " - " + Ds.Tables[0].Rows[i]["Branch/SUBD Code"].ToString();
                        }
                        str.Append("<td " + ss + "   " + flgSearchable + " " + attrIden + ">" + sData + "</td>");
                    }

                    str.Append("<td style='text-align:center'><select class='clsSelectTC' onchange='fnChangeTC(this)' " + (Ds.Tables[0].Rows[i]["isBlocked"].ToString() == "1" ? "disabled='disabled'" : "") + " UserId='" + Ds.Tables[0].Rows[i]["TeleUserId"].ToString() + "' > " + dropdownlist_at + "<select/></td>");
                    //str.Append("<td style='text-align:center'><a href='###' onclick='fnChangeSectorRoute(this)' style='display:none' title='Click To Change Route/Sector'><img src='../images/edit.jpg'/></a></td>");
                    str.Append("</tr>");
                }

                //--- start total
                str.Append("</tbody><tfoot><tr>");
                int totcolmn = Convert.ToInt16(Ds.Tables[0].Columns.Count + 1) - Convert.ToInt16(SkipColumn.Count() + 2);
                for (int td_i = 0; td_i < totcolmn; td_i++)
                {
                    str.Append("<td></td>");
                }
                str.Append("<td style='text-align:left;font-weight:bold;'>Total</td>");
                str.Append("<td style='text-align:center;font-weight:bold;'>" + Convert.ToString(noofstore) + "</td><td style='text-align:center;font-weight:bold;'>" + Convert.ToString(noofcontact) + "</td><td></td>");
                str.Append("</tr>");
                //------end total

                str.Append("</tfoot></table>");
                str.Append("<div style='margin:4px; text-align:center'><input type='button' value='Assign F1 / F2 / F4 Calls To TC' class='btn btn-primary' onclick='fnSaveFinalData(1)' /></div>");
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

    [System.Web.Services.WebMethod()]
    public static string fnGetTCUserListSummary(int LoginId)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        try
        {
            string storedProcName1 = "spGetTCUserListSummary";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@LoginId", LoginId),
                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName1, con, sp);

            StringBuilder str = new StringBuilder();

            if (Ds.Tables[0].Rows.Count > 0)
            {
                string[] SkipColumn = new string[5];
                SkipColumn[0] = "TeleCallerId";
                SkipColumn[1] = "UserId";
                SkipColumn[2] = "EmpName";
                SkipColumn[3] = "ContactNo";
                SkipColumn[4] = "FCMTokenNo";

                str.Append("<table id='tblTCList' style='width:100%' ><thead><tr>");

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
                    if (sColumnName == "# Of Stores" || sColumnName == "# of Contact Number")
                    {
                        sColumnName = sColumnName == "# of Contact Number" ? "# Of Contact" : sColumnName;
                    }

                    str.Append("<th " + ss + ">" + sColumnName + "</th>");
                }
                //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:8%'>Action</th>");
                str.Append("</tr></thead><tbody>");

                ss = "";
                int noofstore = 0;
                int noofcontact = 0;
                int noofPending = 0;
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {
                    str.Append("<tr  FCMTokenNo='" + Ds.Tables[0].Rows[i]["FCMTokenNo"].ToString() + "' userid='" + Ds.Tables[0].Rows[i]["userid"].ToString() + "' TeleCallerId='" + Ds.Tables[0].Rows[i]["TeleCallerId"].ToString() + "'>");
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

                        if (Ds.Tables[0].Columns[j].ColumnName == "# Of Stores")
                        {

                            noofstore = noofstore + Convert.ToInt16(sData);
                        }
                        if (Ds.Tables[0].Columns[j].ColumnName == "# of Contact Number")
                        {

                            noofcontact = noofcontact + Convert.ToInt16(sData);
                        }
                        if (Ds.Tables[0].Columns[j].ColumnName == "# Pending Calls")
                        {

                            noofPending = noofPending + Convert.ToInt16(sData);
                        }


                        //ss += "'";
                        str.Append("<td " + ss + "   " + flgSearchable + ">" + sData + "</td>");
                    }
                    str.Append("</tr>");
                }

                str.Append("</tbody>");
                str.Append("<tfoot>");
                str.Append("<tr>");
                str.Append("<td></td><td style='text-align:left;font-weight:bold;'>Total</td><td style='text-align:center;font-weight:bold;'>" + Convert.ToString(noofstore) + "</td><td style='text-align:center;font-weight:bold;'>" + Convert.ToString(noofcontact) + "</td><td style='text-align:center;font-weight:bold;'>" + Convert.ToString(noofPending) + "</td>");
                str.Append("</tr>");
                str.Append("</tfoot>");

                str.Append("</table>");
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
    public static string fnSubmitDSEAttendance(int LoginId, object MapTCUser, int flgTabNo)
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
            tblMapTCUser.TableName = "MapTCUser";

            //string strMappedTCUserList = JsonConvert.SerializeObject(MappedTCUserList, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
            //DataTable tblMappedTCUserList = JsonConvert.DeserializeObject<DataTable>(strMappedTCUserList);
            //tblMappedTCUserList.TableName = "tblMappedTCUserList";

            List<SqlParameter> sp = null;
            string storedProcName = "";
            if (flgTabNo == 2)
            {
                storedProcName = "spMapTeleCallerWithDSERoute";
                sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@MapTCUser", tblMapTCUser),
                   new SqlParameter("@LoginId", LoginId)
                };
            }
            else if (flgTabNo == 1)
            {
                storedProcName = "spMapTeleCallPlannedCallsWithTC";
                sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@TCPlannedCallsMapping", tblMapTCUser),
                   new SqlParameter("@SubmitDate", DateTime.Now.ToString("dd-MMM-yyyy")),
                   new SqlParameter("@LoginId", LoginId)
                };
            }
            else if (flgTabNo == 3)
            {
                storedProcName = "spMapTeleCallerWithDSERouteForOtherReason";
                sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@MapTCUserForOtherReason", tblMapTCUser),
                   new SqlParameter("@LoginId", LoginId)
                };
            }
            else
            {
                storedProcName = "spMapTeleCallerWithDSERoute";
                sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@MapTCUser", tblMapTCUser),
                   new SqlParameter("@LoginId", LoginId)
                };
            }

            DataSet Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, transaction, sp);
            transaction.Commit();
            foreach (DataRow drow in Ds.Tables[0].Rows)
            {
                string token = drow["FCMTokenNo"].ToString();
                string Msg = "";
                string flag = "101";
                string MobNo = "";
                string StoreId = "0";
                string StoreName = "";
                string strSucces = clsHttpRequest.SendNotification(token, Msg, flag, MobNo, StoreId, StoreName);
            }
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