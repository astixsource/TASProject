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

public partial class frmGetTASListForDSEMappingForPlannedCalls : System.Web.UI.Page
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
                hdnNodeId.Value = Session["SalesNodeId"].ToString();
                hdnNodeType.Value = Session["SalesNodeType"].ToString();
                hdnMenuId.Value = Request.QueryString["id"] == null ? "2" : Request.QueryString["id"].ToString();
                fnBindSiteList();
                fnBindDBRList();
            }
        }
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
        foreach (DataRow dr in dt.Rows)
        {
            ListItem itm = new ListItem();
            itm.Text = dr["BranchName"].ToString();
            //itm.Attributes.Add("sitenodeid", dr["sitenodeid"].ToString() + "-" + dr["SiteNodeType"].ToString());
            itm.Value = dr["BrnNodeId"].ToString() + "-" + dr["BrnNodeType"].ToString();
            ddlBranch.Items.Add(itm);
        }
    }

    private void fnBindSiteList()
    {

        SqlConnection Scon = new SqlConnection(ConfigurationManager.ConnectionStrings["strConn"].ConnectionString);
        SqlCommand Scmd = new SqlCommand();
        Scmd.Connection = Scon;
        Scmd.CommandText = "spGetMonthYearForTASDSEMap";
        // Scmd.Parameters.AddWithValue("@LoginId", Session["LoginId"].ToString());
        Scmd.CommandType = CommandType.StoredProcedure;
        Scmd.CommandTimeout = 0;
        SqlDataAdapter Sdap = new SqlDataAdapter(Scmd);
        DataTable dt = new DataTable();
        Sdap.Fill(dt);

        ListItem itm = new ListItem();
        //if (dt.Rows.Count > 1)
        //{
        //    itm.Text = "--------";
        //    itm.Value = "0-0";
        //    ddlYearMonth.Items.Add(itm);
        //}
        foreach (DataRow dr in dt.Rows)
        {
            itm = new ListItem();
            itm.Text = dr["MonthYearN"].ToString();
            itm.Value = dr["Rptmonthyear"].ToString();
            ddlYearMonth.Items.Add(itm);
        }
    }

    [System.Web.Services.WebMethod()]
    public static object fnGetDSEListForTasMap(string LoginId)
    {
        SqlConnection Scon = new SqlConnection(ConfigurationManager.ConnectionStrings["strConn"].ConnectionString);
        SqlCommand Scmd = new SqlCommand();
        Scmd.Connection = Scon;
        Scmd.CommandText = "spGetDSEListForTasMap";
        Scmd.Parameters.AddWithValue("@LoginId", LoginId);
        Scmd.CommandType = CommandType.StoredProcedure;
        Scmd.CommandTimeout = 0;
        SqlDataAdapter Sdap = new SqlDataAdapter(Scmd);
        DataSet dt = new DataSet();
        Sdap.Fill(dt);

        object strobjAttendance = JsonConvert.SerializeObject(dt, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
        //StringBuilder str = new StringBuilder();

        //foreach (DataRow dr in dt.Tables[0].Rows)
        //{
        //    str.Append("<option value='"+ dr["nodeid"].ToString() + "^" + dr["nodetype"].ToString() + "'>"+ dr["PersonCode"].ToString() + "</option>");
        //}

        //StringBuilder str1 = new StringBuilder();
        //str1.Append("<option value='0'>------</option>");
        //foreach (DataRow dr in dt.Tables[1].Rows)
        //{
        //    str1.Append("<div><label><input type='checkbox' value='" + dr["FrqTypeId"].ToString() + "'/>" + dr["FrqType"].ToString() + "</label></div>");
        //}

        return strobjAttendance;
    }




    //Get Scheme And Product Detail Bases on Store
    [System.Web.Services.WebMethod()]
    public static string fnTelecallerList(int LoginId, string Rptmonthyear)
    {
        Rptmonthyear = DateTime.Now.ToString("yyyyMM");
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        try
        {
            string storedProcName = "spGetTASListForDSEMappingForPlannedCalls";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@LoginId", LoginId),
                   new SqlParameter("@Rptmonthyear", Rptmonthyear)
                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            StringBuilder str = new StringBuilder();
            if (Ds.Tables[0].Rows.Count > 0)
            {
                string strDSEList = "";// fnGetDSEListForTasMap();
                string[] SkipColumn = new string[6];
                SkipColumn[0] = "NodeId";
                SkipColumn[1] = "NodeType";
                SkipColumn[2] = "FrqTypeId";
                SkipColumn[3] = "TAS Tgt %";
                SkipColumn[4] = "DSE Tgt %";
                SkipColumn[5] = "Frequency";

                str.Append("<table id='tbldbrlist' class='dataTable' style='width:100%' ><thead><tr>");

                string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";

                //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:4%' >SrNo</th>");
                DataTable dt = Ds.Tables[0].DefaultView.ToTable(true, "NodeId", "NodeType", "TeleCallerCode", "TeleCallerName");
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    if (SkipColumn.Contains(dt.Columns[j].ColumnName))
                    {
                        continue;
                    }
                    ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";

                    string sColumnName = dt.Columns[j].ColumnName;
                    if (sColumnName == "DSEIds")
                    {
                        sColumnName = "DSE Mapping";
                        ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:45%'";
                    }
                    else if (sColumnName == "TeleCallerCode")
                    {
                        ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:8%'";
                    }
                    else if (sColumnName == "TeleCallerName")
                    {
                        ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:20%'";
                    }
                    str.Append("<th " + ss + ">" + sColumnName + "</th>");
                }
                str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:45%'>DSE Mapping</th>");
                str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:13%'></th>");
                //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:8%'>Action</th>");
                str.Append("</tr></thead><tbody>");

                ss = "";
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    str.Append("<tr class='clstrmain' NodeId='" + dt.Rows[i]["NodeId"].ToString() + "' NodeType='" + dt.Rows[i]["NodeType"].ToString() + "' >");
                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        string sColumnName = dt.Columns[j].ColumnName;
                        if (SkipColumn.Contains(sColumnName))
                        {
                            continue;
                        }
                        var sData = dt.Rows[i][j];
                        ss = "style='text-align:left'";
                        if (sData.GetType() == typeof(int))
                        {
                            ss = "style='text-align:center'";
                        }

                        string flgSearchable = "Searchable='0'";
                        str.Append("<td " + ss + "   " + flgSearchable + ">" + sData + "</td>");
                    }
                    DataRow[] drows = Ds.Tables[0].Select("NodeId=" + dt.Rows[i]["NodeId"].ToString());

                    string strValuestring = ""; StringBuilder strchild = new StringBuilder();
                    string dsestr = ""; string str1 = ""; string strBranchIDs = "";
                    int IsExist = 0;
                    if (drows.Length > 0)
                    {

                        if (Convert.ToString(drows[0]["dsenodeid"]) != "")
                        {
                            IsExist = 1;
                            DataTable drowBranch = drows.CopyToDataTable().DefaultView.ToTable(true, "BrnNodeId", "BrnNodeType");
                            for (int b = 0; b < drowBranch.Rows.Count; b++)
                            {
                                if (strBranchIDs == "")
                                {
                                    strBranchIDs = drowBranch.Rows[b]["BrnNodeId"].ToString()+"-"+ drowBranch.Rows[b]["BrnNodeType"].ToString();
                                }
                                else
                                {
                                    strBranchIDs = "," + drowBranch.Rows[b]["BrnNodeId"].ToString() + "-" + drowBranch.Rows[b]["BrnNodeType"].ToString();
                                }
                            }
                            for (int k = 0; k < drows.Length; k++)
                            {
                                string dsenodeid = drows[k]["dsenodeid"].ToString();
                                string dsenodetyppe = drows[k]["dsenodetype"].ToString();
                                DataRow[] drowdse = drows.CopyToDataTable().Select("DSENodeId=" + dsenodeid);
                                strchild.Append("<tr class='clsdschildrow' tcnodeid='"+ dt.Rows[i]["NodeId"].ToString() + "' branchid='"+ drows[k]["BrnNodeId"].ToString()+"' dsenodeid='" + dsenodeid + "' dsenodetype='" + dsenodetyppe + "'>");
                                strchild.Append("<td rowspan='" + drowdse.Length + "' style='width:55%'>" + drows[k]["PersonCode"].ToString() + "</td>");
                                string dstr = "";
                                for (int d = 0; d < drowdse.Length; d++)
                                {
                                    if (d > 0)
                                    {
                                        strchild.Append("<tr class='clsdschildrow' tcnodeid='" + dt.Rows[i]["NodeId"].ToString() + "' branchid='" + drows[k]["BrnNodeId"].ToString() + "' dsenodeid='" + dsenodeid + "' dsenodetype='" + dsenodetyppe + "'>");
                                    }
                                    if (dstr == "")
                                    {
                                        dstr = drowdse[d]["FrqTypeId"].ToString() + "~" + drowdse[d]["TAS Tgt %"].ToString().Split('.')[0] + "~" + drowdse[d]["DSE Tgt %"].ToString().Split('.')[0];
                                    }
                                    else
                                    {
                                        dstr += "!" + drowdse[d]["FrqTypeId"].ToString() + "~" + drowdse[d]["TAS Tgt %"].ToString().Split('.')[0] + "~" + drowdse[d]["DSE Tgt %"].ToString().Split('.')[0];
                                    }
                                    if (dsestr == "")
                                    {
                                        dsestr = dsenodeid + "^" + dsenodetyppe + "$" + drowdse[d]["FrqTypeId"].ToString() + "%" + drowdse[d]["TAS Tgt %"].ToString().Split('.')[0] + "*" + drowdse[d]["DSE Tgt %"].ToString().Split('.')[0];
                                    }
                                    else
                                    {
                                        dsestr += "," + dsenodeid + "^" + dsenodetyppe + "$" + drowdse[d]["FrqTypeId"].ToString() + "%" + drowdse[d]["TAS Tgt %"].ToString().Split('.')[0] + "*" + drowdse[d]["DSE Tgt %"].ToString().Split('.')[0];
                                    }

                                    strchild.Append("<td class='clsfrequencychild' frnyid='" + drowdse[d]["FrqTypeId"].ToString() + "' style='text-align:center'>" + drowdse[d]["Frequency"].ToString() + "</td>");
                                    strchild.Append("<td style='text-align:center'>" + drowdse[d]["TAS Tgt %"].ToString().Split('.')[0] + "</td>");
                                    strchild.Append("<td  style='text-align:center'>" + drowdse[d]["DSE Tgt %"].ToString().Split('.')[0] + "</td>");
                                    strchild.Append("</tr>");
                                }
                                if (strValuestring == "")
                                {
                                    strValuestring = dsenodeid + "^" + dsenodetyppe + "^" + dstr;
                                }
                                else
                                {
                                    strValuestring += "$" + dsenodeid + "^" + dsenodetyppe + "^" + dstr;
                                }
                                k += drowdse.Length - 1;
                            }
                            str1 = "<table style='width:100%;' class='clstablechild' dseval='" + strValuestring + "'><tr><td style='text-align:center;background-color:#f8f8f8'>DSE</td><td  style='text-align:center;background-color:#f8f8f8'>Frequency</td><td  style='text-align:center;background-color:#f8f8f8'>TAS Tgt %</td><td  style='text-align:center;background-color:#f8f8f8'>DSE Tgt %</td></tr>" + strchild.ToString() + "</table>";
                        }
                    }
                    str.Append("<td  class='clsdseblock' style='padding:0px !important' dsestr='" + dsestr + "' strBranchIDs='"+ strBranchIDs + "'>" + str1 + "</td>");
                    if (IsExist==1)
                    {
                        str.Append("<td style='text-align:center' class='clsactioncell'><a href='###' onclick='fnSHowDSEMapping(this,2)' class='btn btn-primary btn-sm' style='padding:2px 5px;margin-right:5px'  title='Click To View'>View Mapping</a><a href='###' onclick='fnDeleteMapping(this)' class='btn btn-primary btn-sm' style='padding:2px 5px'  title='Click To Delete'>Delete</a></td>");
                    }
                    else
                    {
                        str.Append("<td style='text-align:center'  class='clsactioncell'><a href='###' onclick='fnSHowDSEMapping(this,1)' class='btn btn-primary btn-sm' style='padding:2px 5px'  title='Click To Add'>Add Mapping</a></td>");
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
    public static string fnSubmitTeleCallerAttendance(int LoginId, object objAttendance, string ApplicableMonthYear)
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
            ApplicableMonthYear = DateTime.Now.ToString("yyyyMM");
            string storedProcName = "spPopulateTASDSEMapForPlannedCalls";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@TASDSEPlannedCallMap", tblOtherChargesDetail),
                   new SqlParameter("@ApplicableMonthYear", ApplicableMonthYear),
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

    [System.Web.Services.WebMethod()]
    public static string fnDeleteTASDSEMapForPlannedCalls(int LoginId, int TCNodeId, int TCNodeType, string ApplicableMonthYear)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        string stresponse = "";
        SqlTransaction transaction;
        con.Open();
        transaction = con.BeginTransaction();
        try
        {
            ApplicableMonthYear = DateTime.Now.ToString("yyyyMM");
            string storedProcName = "spDeleteTASDSEMapForPlannedCalls";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@TCNodeId", TCNodeId),
                   new SqlParameter("@TCNodeType", TCNodeType),
                   new SqlParameter("@ApplicableMonthYear", ApplicableMonthYear),
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