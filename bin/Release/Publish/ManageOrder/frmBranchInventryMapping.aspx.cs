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

public partial class frmBranchInventryMapping : System.Web.UI.Page
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
                //hdnMenuId.Value = Request.QueryString["id"] == null ? "2" : Request.QueryString["id"].ToString();
                //fnBindSiteList();
                //fnBindDBRList();
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
        string stresponse = "";
        try
        {
            string storedProcName = "spGetBranchListInventoryBranchMapping";
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
                string[] SkipColumn = new string[8];
                SkipColumn[0] = "sitenodeid";
                SkipColumn[1] = "SiteNodeType";
                SkipColumn[2] = "BrnNodeId";
                SkipColumn[3] = "BrnNodeType";
                SkipColumn[4] = "HubNodeId";
                SkipColumn[5] = "HubNodeType";
                SkipColumn[6] = "flgUseSystemInventory";
                SkipColumn[7] = "flgUseSystemPrice";


                str.Append("<table id='tbldbrlist' style='width:100%' class='dataTable'><thead><tr style='height:25px;'>");

                string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";

                str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:5%' >SrNo</th>");
                for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                {
                    if (SkipColumn.Contains(Ds.Tables[0].Columns[j].ColumnName))
                    {
                        continue;
                    }
                    ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                    string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                    if (sColumnName == "BranchCode")
                    {
                        ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:12%'";
                    }
                    else if (sColumnName == "BranchName")
                    {
                        ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:27%'";
                    }
                    str.Append("<th " + ss + ">" + sColumnName + "</th>");
                }
                str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:9%'>Use System Inventory</th>");
                str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;'>Inventory From</th>");
                str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:9%'>Use System Price</th>");
                str.Append("</tr></thead><tbody>");

                ss = "";
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {

                    strOption.Append("<option value='"+ Ds.Tables[0].Rows[i]["brnnodeid"].ToString() + "' brnnodetype='" + Ds.Tables[0].Rows[i]["brnnodetype"].ToString() + "'>" + Ds.Tables[0].Rows[i]["BranchName"].ToString() + "-" + Ds.Tables[0].Rows[i]["BranchCode"].ToString() + "</option>");
                    int flgusesysteminventory = Convert.ToInt32(Ds.Tables[0].Rows[i]["flgUseSystemInventory"]);
                    int flgUseSystemPrice = Convert.ToInt32(Ds.Tables[0].Rows[i]["flgUseSystemPrice"]);
                    int HubNodeId = Convert.ToInt32(Ds.Tables[0].Rows[i]["HubNodeId"]);
                    str.Append("<tr sitenodeid='" + Ds.Tables[0].Rows[i]["sitenodeid"].ToString() + "' sitenodetype='" + Ds.Tables[0].Rows[i]["sitenodetype"].ToString() + "' brnnodeid='" + Ds.Tables[0].Rows[i]["brnnodeid"].ToString() + "' brnnodetype='" + Ds.Tables[0].Rows[i]["brnnodetype"].ToString() + "'  hubnodeid='" + Ds.Tables[0].Rows[i]["HubNodeId"].ToString() + "' hubnodetype='" + Ds.Tables[0].Rows[i]["HubNodeType"].ToString() + "'   flgusesysteminventory='" + Ds.Tables[0].Rows[i]["flgUseSystemInventory"].ToString() + "'   >");//MappingTypeId='" + Ds.Tables[0].Rows[i]["MappingTypeId"].ToString() + "'
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

                       

                        string flgSearchable = "Searchable='1'";
                       
                        str.Append("<td " + ss + "   " + flgSearchable + ">" + sData + "</td>");
                    }
                    str.Append("<td style='text-align:center'><input type='checkbox' flg='1' onchange='fnChangeUseSystemInventory(this)' "+ (flgusesysteminventory>0?"checked='checked'":"")+" ></td>");
                    str.Append("<td style='text-align:left'><label><input type='checkbox'  " + (flgusesysteminventory ==1 ? "checked='checked'" : "") + "   " + (flgusesysteminventory == 0 ? "disabled='disabled'" : "") + "> Branch</label><label  style='margin-left:10px'><input type='checkbox'  onchange='fnChangeHub(this)' " + (HubNodeId > 0 ? "checked='checked'" : "") + " " + (flgusesysteminventory == 0 ? "disabled='disabled'" : "") + "> Hub</label><select HubNodeId='" + HubNodeId + "' style='margin-left:10px;width:190px' " + (flgusesysteminventory == 0 ? "disabled='disabled'" : "") + "><option value='0'>--Select Branch----</option></select></td>");
                    str.Append("<td style='text-align:center'><input type='checkbox' flg='2' " + (flgUseSystemPrice > 0 ? "checked='checked'" : "") + "  " + (flgusesysteminventory >0 ? "" : "disabled='disabled'") + "></td>");
                    str.Append("</tr>");
                }
                str.Append("</tbody></table>");
            }
            else
            {
                str.Append("");
            }
            stresponse = str.ToString() + "|"+ strOption.ToString();
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

            string storedProcName = "spManageBranchInvMapping";//spBranchSwingLeapMapping
            List<SqlParameter> sp = new List<SqlParameter>()
                    {                  
                   new SqlParameter("@BrnInventoryMapping", tblBrnInventoryMapping),                  
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