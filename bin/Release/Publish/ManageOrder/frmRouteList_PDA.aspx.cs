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

public partial class ManageOrder_frmRouteList_PDA : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["LoginID"] == null)
        {
            Response.Redirect("~/SessionExpiredpage.aspx");
        }
        else {
            if (!IsPostBack)
            {
                hdnTokenNo.Value = Convert.ToString(Session["TokenNo"]); //"dnHdiDQLrHQ:APA91bE7gI0Ls6Wx3TpuG3fGIVZp9S_yJIqUtlkf5yhWaSUQ4YjPL1Tc9xk6ZxYm80XwiRsA1O_iveRIpthF18143vNGQWHcmBvY7eVikQ5R1d1QhX60q8ShEJRxo6cNNeDkvHOc0jYY4";// 
                hdnLoginId.Value = Session["LoginID"].ToString();
                hdnMenuId.Value = Request.QueryString["id"] == null ? "2" : Request.QueryString["id"].ToString();
                hdnNodeType.Value= Session["SalesNodeType"].ToString();
            }
        }
    }

    private void fnBindDBRList()
    {

        SqlConnection Scon = new SqlConnection(ConfigurationManager.ConnectionStrings["strConn"].ConnectionString);
        SqlCommand Scmd = new SqlCommand();
        Scmd.Connection = Scon;
        Scmd.CommandText = "spVCTGetDistributorList";
        Scmd.Parameters.AddWithValue("@LoginId", Session["LoginId"].ToString());
        Scmd.CommandType = CommandType.StoredProcedure;
        Scmd.CommandTimeout = 0;
        SqlDataAdapter Sdap = new SqlDataAdapter(Scmd);
        DataTable dt = new DataTable();
        Sdap.Fill(dt);

        ListItem itm = new ListItem();
        itm.Text = "--------";
        itm.Value = "0";
        //ddlDistribor.Items.Add(itm);
        foreach (DataRow dr in dt.Rows)
        {
            itm = new ListItem();
            itm.Text = dr["Descr"].ToString() + " - " + dr["DistributorCode"].ToString();
            itm.Value = dr["NodeID"].ToString();
            //ddlDistribor.Items.Add(itm);
        }
    }

   

    private static string multilvlPopuptbl(DataTable dt, int col_ind, int row_ind)
    {
        int cntr = 1;
        string str = dt.Columns[col_ind].ColumnName.ToString().Split('|')[0].Split('^')[row_ind];
        string flgcolor = "style='background-color:#26a6e7;color:#ffffff;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px'";
        if (row_ind == 1)
        {
            string str1 = dt.Columns[col_ind].ColumnName.ToString().Split('^')[0];
            string str2 = dt.Columns[col_ind].ColumnName.ToString().Split('^')[1];
            if (str1 == "Store Details")
            {
                if (str2 == "Store Name")
                {
                    flgcolor = "style='background-color:#ffffb7;color:black;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px;width:30%'";
                }
                else
                {
                    flgcolor = "style='background-color:#ffffb7;color:black;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px'";
                }
            }else if (str1 == "Tele Call")
            {

                if (str2 == "Reason")
                {
                    flgcolor = "style='color:#ffffff;background-color:#26a6e7;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px;width:6%'";
                }
            }
            else if (str1 == "TeleReason")
            {
                flgcolor = "style='background-color:#26a6e7;color:#ffffff;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px'";
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

        if (str == "Store Details")
        {
            flgcolor = "style='background-color:#ffff88;color:black;text-align:center;border-bottom:1px solid #bbbbbb !important'";
        }
        else if (str == "TeleReason")
        {
            flgcolor = "style='background-color:#26a6e7;color:#ffffff;text-align:center'";
        }
        else if (str == "Calling Status")
        {
            flgcolor = "style='background-color:#00a452;color:#ffffff;text-align:center;border-bottom:1px solid #bbbbbb !important'";
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
            sscolspan = "colspan='" + (cntr) + "'";
        }
       



            return " <th " + flgcolor + " class='clspopuptblhead_" + row_ind + "_" + col_ind + " cls" + dt.Columns[col_ind].ColumnName.ToString().Split('^')[0].Split(' ')[0] + "' "+ sscolspan + "> " + str + " </th>|" + cntr;
    }


    //Get Scheme And Product Detail Bases on Store
    [System.Web.Services.WebMethod()]
    public static string fnStoreList(int LoginId, int MenuId,int SaleNodeType)
    {
        string StrTokenNo = Convert.ToString(HttpContext.Current.Session["TokenNo"]);
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        string stresponse = "";
        try
        {
            string storedProcName = SaleNodeType==200? "spGetStoreListForOrders_DSE" : "spGetStoreListForOrders"; ;
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@LoginId", LoginId),
                   new SqlParameter("@MenuId", MenuId)

                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            StringBuilder str = new StringBuilder();
            if (Ds.Tables[0].Rows.Count > 0)
            {
                string[] SkipColumn = new string[21];
                SkipColumn[0] = "StoreId";
                SkipColumn[1] = "StoreChannelID";
                SkipColumn[2] = "TeleCallingId";
                SkipColumn[3] = "BranchNodeId";
                SkipColumn[4] = "BranchNodeType";
                SkipColumn[5] = "flgColorStatus";
                SkipColumn[7] = "Store Details^Store Code";
                SkipColumn[8] = "Store Details^Branch\\SUBD";
                SkipColumn[9] = "Store Details^DSE";
                SkipColumn[10] = "Tele Call^Reason";
                SkipColumn[11] = "Calling Status^Status";
                SkipColumn[12] = "Calling Status^Schedule";
                SkipColumn[13] = "Calling Status^Call Attempt";

                SkipColumn[14] = "Last Call Date^";
                SkipColumn[15] = "Language^";
                SkipColumn[16] = "Tele Call^Sector";
                SkipColumn[17] = "Calling Status^Reason";
                SkipColumn[18] = "On Route^flgOnRoute";
                SkipColumn[19] = "DBRName";
                SkipColumn[20] = "flgRecording";


                //StartDate = DateTime.Parse(Ds.Tables[0].Rows[0]["StartDate"].ToString()).ToString("dd MMM");
                str.Append("<table id='tbldbrlist' style='width:100%;border-top:1px solid #bbbbbb;font-size:8pt' ><thead><tr>");

                string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px'";
                int cntt = 0;

                string[] Collength = Ds.Tables[0].Columns[5].ColumnName.ToString().Split('^');
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
                                    str.Append("<th " + ss + " rowspan='" + ColSpliter.Length + "' >" + Ds.Tables[0].Columns[j].ColumnName.ToString().Split('^')[0] + "</th>");
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

                    //str.Append("<th rowspan='" + (Collength.Length + 1) + "' >Action</th>");

                    str.Append("</tr>");
                }

                str.Append("</thead><tbody>");

                ss = "style='border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px'";
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {
                    string strBackcolor = "";
                    string flgRecording = Ds.Tables[0].Rows[i]["flgRecording"].ToString();
                    int flgOnRoute = SaleNodeType==200? Convert.ToInt32(Ds.Tables[0].Rows[i]["On Route^flgOnRoute"].ToString()):1;
                    int flgOrderStatus = 0;
                    if (MenuId == 3)
                    {
                        flgOrderStatus = int.Parse(Ds.Tables[0].Rows[i]["flgColorStatus"].ToString());
                        if (flgOrderStatus == 2)
                        {
                            strBackcolor = ";background-color:#cbfecd;";
                        }else if (flgOrderStatus == 1)
                        {
                            strBackcolor = ";background-color:#ffd2d2;";
                        }
                        else if (flgOrderStatus > 2)
                        {
                            strBackcolor = ";background-color:#d6d6d6;";
                        }
                    }
                    str.Append("<tr   style='" + (flgOnRoute!=1?"display:none":"") + "'  flgonroute='" + flgOnRoute + "'  " + (flgOrderStatus > 2?"title='Order has been downloaded'":"") +"  storeid='" + Ds.Tables[0].Rows[i]["storeid"].ToString() + "' TeleCallingId='" + Ds.Tables[0].Rows[i]["TeleCallingId"].ToString() + "'  branchnodeid='" + Ds.Tables[0].Rows[i]["branchnodeid"].ToString() + "' branchnodetype='" + Ds.Tables[0].Rows[i]["branchnodetype"].ToString() + "'  flgRecording='" + flgRecording + "'  gstno='2'>");
                    for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                    {
                        ss = "style='border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px"+ strBackcolor + "'";
                        string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                        if (SkipColumn.Contains(sColumnName))
                        {
                            continue;
                        }
                        var sdata = Ds.Tables[0].Rows[i][j];
                        if (sdata.GetType() == typeof(int))
                        {
                            ss = "style='text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px" + strBackcolor + "'";
                        }else if (sdata.GetType() == typeof(decimal))
                        {
                            ss = "style='text-align:right;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px" + strBackcolor + "'";
                        }
                        if (sColumnName == "Calling Status^Call Attempt")
                        {
                            ss = "style='text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;padding:2px" + strBackcolor + "'";
                        }else if (sColumnName == "Language^")
                        {
                            ss = "style='padding:2px;text-align:center;border-left:1px solid #bbbbbb;border-bottom:1px solid #bbbbbb;" + strBackcolor + "'";
                        }
                        

                        if (flgOrderStatus <3)
                        {
                            sdata = sColumnName == "Store Details^Store Name" ? "<a href = '###' onclick='fnEditOrder(this)' style = 'color:blue;text-decoration:underline;' title='Click to book order' >" + Ds.Tables[0].Rows[i][j].ToString()+" - "+ Ds.Tables[0].Rows[i]["Store Details^Store Code"].ToString() + "</a>" : Ds.Tables[0].Rows[i][j].ToString();
//string sdatass = Convert.ToString(Ds.Tables[0].Rows[i]["Store Details^Contact No"]).Length > 7 ? "<a href ='###'onclick ='fnEditOrder(this)' style = 'color:blue;text-decoration:underline;' title='Click to book order' >" + Ds.Tables[0].Rows[i][j].ToString() + " - " + Ds.Tables[0].Rows[i]["Store Details^Store Code"].ToString() + "</a>" : Ds.Tables[0].Rows[i][j].ToString() + " - " + Ds.Tables[0].Rows[i]["Store Details^Store Code"].ToString();
                           //sdata = sColumnName == "Store Details^Store Name" ? sdatass : Ds.Tables[0].Rows[i][j].ToString();
                        }
                        else
                        {
                            //sdata = sColumnName == "Store Details^Store Name" ? Ds.Tables[0].Rows[i][j].ToString() + " - " + Ds.Tables[0].Rows[i]["Store Details^Store Code"].ToString() : Ds.Tables[0].Rows[i][j].ToString();
                            sdata = sColumnName == "Store Details^Store Name" ? "<a href = '###' onclick = 'fnEditOrder(this)' style = 'color:blue;text-decoration:underline;' title='Click to book order' >" + Ds.Tables[0].Rows[i][j].ToString() + " - " + Ds.Tables[0].Rows[i]["Store Details^Store Code"].ToString() + "</a>" : Ds.Tables[0].Rows[i][j].ToString();
                        }
                        if(sColumnName == "Store Details^Contact No")
                        {
                            string strContact = Convert.ToString(Ds.Tables[0].Rows[i][j]);
                            if (strContact.Length > 7)
                            {
                                if (strContact.Split('/').Length == 2)
                                {
                                        string strLink = "";
                                    if (StrTokenNo == "")
                                    {
                                        strLink += strContact.Split('/')[0].Trim().Length > 7 ? "<a href='tel:" + strContact.Split('/')[0].Trim() + "' flg='1'  style = 'color:blue !important;text-decoration:underline !important;' title='Click to make call' >" + strContact.Split('/')[0].Trim() + "</a>" : Convert.ToString(strContact.Split('/')[0]).Trim();
                                        strLink += strContact.Split('/')[1].Trim().Length > 7 ? "<br/><a href='tel:" + strContact.Split('/')[1].Trim() + "' flg='1' style = 'color:blue !important;text-decoration:underline !important;' title='Click to make call' >" + strContact.Split('/')[1].Trim() + "</a>" : "<br/>" + Convert.ToString(strContact.Split('/')[1]).Trim();
                                    }
                                    else
                                    {
                                        strLink += strContact.Split('/')[0].Trim().Length > 7 ? "<a href ='###' flg='1' onclick = 'fnSentNotification(this)' style = 'color:blue !important;text-decoration:underline !important;' title='Click to make call' >" + strContact.Split('/')[0].Trim() + "</a>" : Convert.ToString(strContact.Split('/')[0]).Trim();
                                        strLink += strContact.Split('/')[1].Trim().Length > 7 ? "<br/><a href ='###' flg='1' onclick = 'fnSentNotification(this)' style = 'color:blue !important;text-decoration:underline !important;' title='Click to make call' >" + strContact.Split('/')[1].Trim() + "</a>" : "<br/>" + Convert.ToString(strContact.Split('/')[1]).Trim();
                                    }
                                    sdata = strLink;
                                }
                                else
                                {
                                    if (StrTokenNo == "")
                                    {
                                        sdata = strContact.Trim().Length > 7 ? "<a href='tel:" + strContact.Trim() + "' flg='1'  style = 'color:blue !important;text-decoration:underline !important;' title='Click to make call' >" + strContact.Trim() + "</a>" : strContact.Trim();
                                    }
                                    else
                                    {
                                        sdata = strContact.Trim().Length > 7 ? "<a href ='###' flg='1' onclick = 'fnSentNotification(this)' style = 'color:blue !important;text-decoration:underline !important;' title='Click to make call' >" + strContact.Trim() + "</a>" : strContact.Trim();
                                    }
                                }
                            }
                            else
                            {
                                sdata = strContact.Trim();
                            }
                        }

                        string flgSearchable = "Searchable='0'";
                        if (sColumnName =="Store Details^Channel" || sColumnName =="Store Details^DSE" || sColumnName =="Store Details^Branch" || sColumnName == "Store Details^Store Code" || sColumnName == "Store Details^Store Name" || sColumnName == "Store Details^Contact No")
                        {
                            flgSearchable = "Searchable='1'";
                        }
                        //ss += "'";
                        str.Append("<td " + ss + "   " + flgSearchable + ">" + sdata + "</td>");
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
            //if (MenuId == 3)
            //{
                StringBuilder strTotstring = new StringBuilder();
                strTotstring.Append("<table>");
                foreach (DataRow dorw in Ds.Tables[1].Rows)
                {
                    strTotstring.Append("<tr><td style='padding:4px'><b>" + dorw["StatusText"].ToString() + "</b></td><td style='padding:4px'><b>:</b></td><td style='padding:4px'>" + dorw["StatusVal"].ToString() + "</td></tr>");
                }
                strTotstring.Append("</table>");
                stresponse += "|" + strTotstring.ToString();
            //}
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
    public static string fnSentNotification(string MobileNo, string TokenNo, string StoreId, string TeleCallingId, string flgRecording)
    {
        string strResp = "1^";//Success;
        try {


            string createSaleReturnUrl = "http://52.230.25.135/TeleCallingDataAPI/api/Default/SendNotification_TAS?PersonId=0&Token=" + TokenNo + "&Msg=" + MobileNo + "&flg=0&StoreId=" + StoreId + "&TeleCallingId=" + TeleCallingId + "&flgRecording=" + flgRecording;
            HttpWebResponse response = clsHttpRequest.POST(createSaleReturnUrl);
            if (response == null)
            {
                strResp = "2^";
                return strResp;
            }
            if (response.StatusCode != HttpStatusCode.OK)
            {
                strResp = "2^" + response.StatusDescription;
                return strResp;
            }
            using (var streamReader = new StreamReader(response.GetResponseStream()))
            {
                    var responseResult = streamReader.ReadToEnd();
                    var data = new JavaScriptSerializer().Deserialize<dynamic>(responseResult);
                    string errorMessage = data.ToString();
                    strResp = errorMessage;
            }
        }catch(Exception ex)
        {
            strResp = "2^" + ex.Message;
        }
        return strResp;
    }
}