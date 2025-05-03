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

public partial class frmBranchDzeroMapping : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //Session["LoginId"] = "0";
        if (Session["LoginID"] == null)
        {
            Response.Redirect("~/SessionExpiredpage.aspx");
        }
        else
        {
            if (!IsPostBack)
            {
                hdnLoginId.Value = Session["LoginID"].ToString();
                //hdnMenuId.Value = Request.QueryString["id"] == null ? "2" : Request.QueryString["id"].ToString();
                //fnBindSiteList();
                //fnBindDBRList();
            }
        }
    }

    private static string multilvlPopuptbl(DataTable dt, int col_ind, int row_ind)
    {
        int cntr = 1;
        string str = dt.Columns[col_ind].ColumnName.ToString().Split('|')[0].Split('^')[row_ind];
        string flgcolor = "style='background-color:#26a6e7;color:#ffffff;text-align:center;'";
        if (row_ind == 1)
        {
            string str1 = dt.Columns[col_ind].ColumnName.ToString().Split('^')[0];
            string str2 = dt.Columns[col_ind].ColumnName.ToString().Split('^')[1];
            if (str1 == "Store Not Found/Store Closed/Owner not available")
            {

                flgcolor = "style='background-color:#ffffb7;color:black;text-align:center;width:14%'";

            }
            else if (str1 == "Tele Call")
            {
                flgcolor = "style='color:black;background-color:#26a6e7;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px;width:6%'";
            }
            else if (str1 == "Not Visited")
            {
                flgcolor = "style='background-color:#ffdfdf;color:black;text-align:center;width:14%'";
            }
            else if (str1 == "Calling Status")
            {
                if (str2 == "Status")
                {
                    flgcolor = "style='background-color:#00ca65;color:#ffffff;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px;width:6%'";
                }
                else
                {
                    flgcolor = "style='background-color:#00ca65;color:#ffffff;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px'";
                }

            }
        }

        if (str == "Store Not Found/Store Closed/Owner not available")
        {
            flgcolor = "style='background-color:#ffff88;color:black;text-align:center;'";
        }
        else if (str == "Not Visited")
        {
            flgcolor = "style='background-color:#ffc1c1;color:black;text-align:center'";
        }
        else if (str == "Calling Status")
        {
            flgcolor = "style='background-color:#00a452;color:#ffffff;text-align:center;'";
        }


        //#728cd4
        for (int i = col_ind + 1; i < dt.Columns.Count; i++)
        {
            if (str == dt.Columns[i].ColumnName.ToString().Split('|')[0].Split('^')[row_ind])
            {
                cntr++;
            }
            else
            {
                break;
            }
        }
        string sscolspan = "colspan='" + cntr + "'";
        if (str == "Store Details")
        {
            sscolspan = "colspan='" + (cntr - 1) + "'";
        }




        return " <th " + flgcolor + " class='clspopuptblhead_" + row_ind + "_" + col_ind + " cls" + dt.Columns[col_ind].ColumnName.ToString().Split('^')[0].Split(' ')[0] + "' " + sscolspan + "> " + str + " </th>|" + cntr;
    }


    //Get Scheme And Product Detail Bases on Store
    [System.Web.Services.WebMethod()]
    public static string fnDSEList(int LoginId)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        try
        {
            string storedProcName = "spGetBranchListForDZeroCalling";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@LoginId", LoginId)//,
                   //new SqlParameter("@BranchNodeId", BranchNodeId),
                   //new SqlParameter("@BranchNodeType", BranchNodeType),
                   //new SqlParameter("@AttDate", DateTime.Now.ToString("dd-MMM-yyyy"))

                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            StringBuilder str = new StringBuilder();

            StringBuilder strOption = new StringBuilder();

            if (Ds.Tables[0].Rows.Count > 0)
            {
                StringBuilder sbchannels = new StringBuilder();
                foreach (DataRow drow in Ds.Tables[1].Rows)
                {
                    sbchannels.Append("<option value=" + drow["ChannelId"].ToString() + " channeltype=" + drow["channeltype"].ToString() + " >" + drow["ChannelName"].ToString() + "</option>");
                }
                string[] SkipColumn = new string[2];
                SkipColumn[0] = "NodeID";
                SkipColumn[1] = "NodeType";

                str.Append("<table id='tbldbrlist' class='table table-bordered mb-0' ><thead><tr>");
                int cntt = 0;
                string ss = "style='background-color:#26a6e7;color:#ffffff;text-align:center;'";
                string[] Collength = Ds.Tables[0].Columns[2].ColumnName.ToString().Split('^');
                StringBuilder strFooter = new StringBuilder();
                for (int k = 0; k < Collength.Length; k++)
                {
                    str.Append("<tr>");

                    for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                    {
                        if (!SkipColumn.Contains(Ds.Tables[0].Columns[j].ColumnName.ToString().Trim()))
                        {
                            string[] ColSpliter = Ds.Tables[0].Columns[j].ColumnName.ToString().Split('^');
                            if (ColSpliter[k] != "")
                            {
                                if (string.Join("", ColSpliter) == ColSpliter[k])
                                {
                                    str.Append("<th rowspan='" + ColSpliter.Length + "' " + ss + ">" + Ds.Tables[0].Columns[j].ColumnName.ToString().Split('^')[0] + "</th>");
                                }
                                else
                                {
                                    string strrowspan = multilvlPopuptbl(Ds.Tables[0], j, k);
                                    str.Append(strrowspan.Split('|')[0]);
                                    j = j + Convert.ToInt32(strrowspan.Split('|')[1]) - 1;
                                }
                            }
                        }
                    }
                    if (cntt == 0)
                    {
                        str.Append("<th rowspan='" + (Collength.Length) + "' " + ss + "></th>");
                    }
                    cntt++;
                    str.Append("</tr>");
                }

                str.Append("</thead><tbody>");

                ss = "";
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {
                    str.Append("<tr NodeID='" + Ds.Tables[0].Rows[i]["NodeID"].ToString() + "' NodeType='" + Ds.Tables[0].Rows[i]["NodeType"].ToString() + "' >");//MappingTypeId='" + Ds.Tables[0].Rows[i]["MappingTypeId"].ToString() + "'
                    for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                    {
                        string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                        if (SkipColumn.Contains(sColumnName))
                        {
                            continue;
                        }
                        var sData = Ds.Tables[0].Rows[i][j];
                        ss = "style='text-align:left;'";
                        if (sData.GetType() == typeof(int))
                        {
                            ss = "style='text-align:center'";
                        }
                        string flgSearchable = "Searchable='1'";
                        if (sColumnName != "BranchCode^" && sColumnName != "BranchName^" && sColumnName != "Channel^")
                        {
                            if (sColumnName == "Store Not Found/Store Closed/Owner not available^Role Over Next Day")
                            {
                                string sDisabled = "";
                                int IsDisabled = 0;
                                if (Ds.Tables[0].Rows[i]["Store Not Found/Store Closed/Owner not available^Apply on Same Day"].ToString() == "2" || Ds.Tables[0].Rows[i]["Store Not Found/Store Closed/Owner not available^Apply on Same Day"].ToString() == "0")
                                {
                                    IsDisabled = 1;
                                    sDisabled = "disabled='disabled'";
                                }
                                sData = "<label><input type='radio' name='rdoname_" + j.ToString() + "_" + Ds.Tables[0].Rows[i]["NodeID"].ToString() + "' value='1'  " + sDisabled + "  " + (sData.ToString() == "1" && IsDisabled == 0 ? "checked='checked'" : "") + "> Yes</label><label style='margin-left:10px'><input type='radio' name='rdoname_" + j.ToString() + "_" + Ds.Tables[0].Rows[i]["NodeID"].ToString() + "' value='0' " + sDisabled + " " + (sData.ToString() == "2" && IsDisabled == 0 ? "checked='checked'" : "") + " > No</label>";
                            }
                            else if (sColumnName == "Not Visited^Role Over Next Day")
                            {
                                string sDisabled = "";
                                int IsDisabled = 0;
                                if (Ds.Tables[0].Rows[i]["Not Visited^Apply 6 O'Clock Extract(Same Day)"].ToString() == "0" || Ds.Tables[0].Rows[i]["Not Visited^Apply 6 O'Clock Extract(Same Day)"].ToString() == "2")
                                {
                                    IsDisabled = 1;
                                    sDisabled = "disabled='disabled'";
                                }
                                sData = "<label><input type='radio' name='rdoname_" + j.ToString() + "_" + Ds.Tables[0].Rows[i]["NodeID"].ToString() + "' value='1' " + sDisabled + "  " + (sData.ToString() == "1" && IsDisabled == 0 ? "checked='checked'" : "") + "> Yes</label><label style='margin-left:10px'><input type='radio' name='rdoname_" + j.ToString() + "_" + Ds.Tables[0].Rows[i]["NodeID"].ToString() + "' value='0' " + sDisabled + "  " + (sData.ToString() == "2" && IsDisabled == 0 ? "checked='checked'" : "") + " > No</label>";
                            }
                            else if (sColumnName == "Not Visited^Apply 10 O'Clock Extract(Next Day)")
                            {
                                string sDisabled = "disabled='disabled'";
                                int IsDisabled = 1;
                                if (Ds.Tables[0].Rows[i]["Not Visited^Apply 6 O'Clock Extract(Same Day)"].ToString() == "0" || Ds.Tables[0].Rows[i]["Not Visited^Apply 6 O'Clock Extract(Same Day)"].ToString() == "2")
                                {
                                    IsDisabled = 0;
                                    sDisabled = "";
                                }
                                sData = "<label><input type='radio' name='rdoname_" + j.ToString() + "_" + Ds.Tables[0].Rows[i]["NodeID"].ToString() + "' value='1' " + (sData.ToString() == "0"? "disabled='disabled'" : "") + "  " + (sData.ToString() == "1" ? "checked='checked'" : "") + "> Yes</label><label style='margin-left:10px'><input type='radio' name='rdoname_" + j.ToString() + "_" + Ds.Tables[0].Rows[i]["NodeID"].ToString() + "' value='0'  " + (sData.ToString() == "0" ? "disabled='disabled'" : "") + " " + (sData.ToString() == "2" ? "checked='checked'" : "") + " > No</label>";
                            }
                            else if (sColumnName == "Store Not Found/Store Closed/Owner not available^Apply on Same Day")
                            {
                                sData = "<label><input type='radio' name='rdoname_" + j.ToString() + "_" + Ds.Tables[0].Rows[i]["NodeID"].ToString() + "' value='1' onclick='fnDisabledRadio(this,1)'   " + (sData.ToString() == "1" ? "checked='checked'" : "") + "> Yes</label><label style='margin-left:10px'><input type='radio' name='rdoname_" + j.ToString() + "_" + Ds.Tables[0].Rows[i]["NodeID"].ToString() + "' value='0' " + (sData.ToString() == "2" ? "checked='checked'" : "") + "  onclick='fnDisabledRadio(this,1)' /> No</label>";
                            }
                            else if (sColumnName == "Not Visited^Apply 6 O'Clock Extract(Same Day)")
                            {
                                sData = "<label><input type='radio' name='rdoname_" + j.ToString() + "_" + Ds.Tables[0].Rows[i]["NodeID"].ToString() + "' value='1' onclick='fnDisabledRadio(this,2)'   " + (sData.ToString() == "1" ? "checked='checked'" : "") + "> Yes</label><label style='margin-left:10px'><input type='radio' name='rdoname_" + j.ToString() + "_" + Ds.Tables[0].Rows[i]["NodeID"].ToString() + "' value='0' " + (sData.ToString() == "2" ? "checked='checked'" : "") + "  onclick='fnDisabledRadio(this,2)' /> No</label>";
                            }
                            else
                            {
                                sData = "<label><input type='radio' name='rdoname_" + j.ToString() + "_" + Ds.Tables[0].Rows[i]["NodeID"].ToString() + "' value='1' " + (sData.ToString() == "1" ? "checked='checked'" : "") + " > Yes</label><label style='margin-left:10px'><input type='radio' name='rdoname_" + j.ToString() + "_" + Ds.Tables[0].Rows[i]["NodeID"].ToString() + "' " + (sData.ToString() == "2" ? "checked='checked'" : "") + " value='0' > No</label>";
                            }
                        }
                        else if (sColumnName == "Channel^")
                        {
                            sData = "<select multiple='true' class='clsChannels' channelids='"+Convert.ToString(Ds.Tables[0].Rows[i]["Channel^"]) + "'>"+ sbchannels + "</select>";
                        }
                            str.Append("<td " + ss + "   " + flgSearchable + ">" + sData + "</td>");
                    }
                    str.Append("<td style='text-align:center'><input type='button' value='Reset' onclick='fnResetRow(this)' class='btn btn-primary btn-sm' style='padding:2px 10px' ></td>");
                    str.Append("</tr>");
                }
                str.Append("</tbody></table>");
            }
            else
            {
                str.Append("");
            }
            stresponse = str.ToString() + "|";
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
    public static string fnManageBranchInvMapping(int LoginId, object objAttendance)
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
            DataTable tblBrnInventoryMapping = JsonConvert.DeserializeObject<DataTable>(strobjAttendance);
            tblBrnInventoryMapping.TableName = "BrnLeapSwingMapping";

            string storedProcName = "spManageBranchD0Mapping";//spBranchSwingLeapMapping
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@BrnD0Mapping", tblBrnInventoryMapping),
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