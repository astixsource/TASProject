using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using Newtonsoft.Json;
using System.Text;

/// <summary>
/// Summary description for dmswebservice
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class dmswebservice : System.Web.Services.WebService
{

    public dmswebservice()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld()
    {
        return "Hello World";
    }

    [WebMethod(EnableSession = true)]
    public string fnResetPassword(string UserId, string NewPassword)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        SqlCommand cmd = null;
        cmd = new SqlCommand("spReSetPassword_EPathshala", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.CommandTimeout = 0;
        cmd.Parameters.AddWithValue("@UserId", UserId);
        cmd.Parameters.AddWithValue("@NewPassword", HttpUtility.HtmlEncode(NewPassword));
        string intRep = "";
        try
        {
            con.Open();
            string intRep1 = "0";
            DataTable dt = new DataTable();
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                intRep1 = dt.Rows[0]["flgPasswordUpdated"].ToString() + "-" + dt.Rows[0]["flgPrevUsedPass"].ToString();
            }
            intRep = "1^" + intRep1.ToString();
        }
        catch (Exception ex)
        {
            intRep = "2^" + ex.Message;
        }
        finally
        {
            cmd.Dispose();
            con.Close();
            con.Dispose();
        }


        return intRep;
    }

    [WebMethod(EnableSession = true)]
    public string fnGetUserdetailForResetLink(string UserName)
    {
        string result = "";

        using (SqlConnection con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]))
        {
            using (SqlCommand cmd = new SqlCommand("spGetUserDetailsBasedOnUserName", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 0;
                cmd.Parameters.AddWithValue("@UserName", UserName);
                try
                {
                    DataSet ds = new DataSet();
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(ds);
                    }

                    if (ds.Tables[0].Rows[0][0].ToString() == "1")
                    {
                        string emailId = ds.Tables[1].Rows[0]["EmailId"].ToString();
                        //emailId = "harit@astixsolutions.com";

                        if (ds.Tables[1].Rows[0]["IsBlocked"].ToString() == "1")
                        {
                            result = "4^Your account is locked. Please contact support to unlock it.";
                        }
                        else if (string.IsNullOrWhiteSpace(emailId))
                        {
                            result = "5^Email id does not exist for your account. Please contact support.";
                        }
                        else
                        {
                            string resetLink = ConfigurationManager.AppSettings["TestURL"] + "/frmForgotPassword.aspx?u=" + Base64Encode(ds.Tables[1].Rows[0]["UserId"].ToString() + ";" + UserName + ";" + ds.Tables[1].Rows[0]["Password"].ToString()) + "&t=" + Base64Encode(DateTime.Now.ToString("ddMMyyyHHmmss"));
                            string mailResponse = "0^1";// clsMail.fnSendmail(emailId, "", "TAS - Password Reset Link", "Please click <a href=" + resetLink + ">here</a> to reset your password.", "");
                            if (mailResponse.Split('^')[1] == "1")
                            {
                                result = "1^Password reset link sent successfully.";
                            }
                            else
                            {
                                result = "6^Email sending failed. Please try again. Message: " + mailResponse.Split('^')[0];
                            }
                        }
                    }
                    else
                    {
                        result = "3^Username does not exist.";
                    }
                }
                catch (Exception ex)
                {
                    result = "2^Some technical error: " + ex.Message;
                }
            }
        }

        return result;
    }

    private static string Base64Encode(string plainText)
    {
        var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
        return HttpUtility.UrlEncode(System.Convert.ToBase64String(plainTextBytes));
    }

    [WebMethod(EnableSession = true)]
    public string fnChangePassword(string UserName, string OldPassword, string NewPassword)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        SqlCommand cmd = null;
        cmd = new SqlCommand("SpChangePassword", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.CommandTimeout = 0;
        cmd.Parameters.AddWithValue("@LoginID", Session["LoginID"].ToString());
        cmd.Parameters.AddWithValue("@UserName", UserName);
        cmd.Parameters.AddWithValue("@OldPassword", OldPassword);
        cmd.Parameters.AddWithValue("@NewPassword", NewPassword);
        string intRep = "";
        try
        {
            con.Open();
            int intRep1 = 0;
            intRep1 = cmd.ExecuteNonQuery();
            intRep = "1^" + intRep1.ToString();
        }
        catch (Exception ex)
        {
            intRep = "2^" + ex.Message;
        }
        finally
        {
            cmd.Dispose();
            con.Close();
            con.Dispose();
        }


        return intRep;
    }



    [System.Web.Services.WebMethod(EnableSession = true)]
    public object fnGetBankBranchList(string searchText)
    {

        object jsonData;
        if ((HttpContext.Current.Session["dtBankList"] != null))
        {
            DataTable dt = null;
            try
            {
                dt = (DataTable)HttpContext.Current.Session["dtBankList"];
                if (dt.Rows.Count > 0)
                {
                    string strsearchfield = "IFSCCode LIKE '" + searchText + "%' OR BankName LIKE '" + searchText + "%' OR BankBranchName LIKE '%" + searchText + "%' OR MICRCode LIKE '%" + searchText + "%' OR CITY LIKE '%" + searchText + "%'";
                    if (dt.Select(strsearchfield).Length > 0)
                    {
                        DataTable dtMain = dt.Select(strsearchfield).Take(40).CopyToDataTable();
                        jsonData = JsonConvert.SerializeObject(dtMain, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
                        jsonData = "1|" + jsonData;
                        dtMain.Dispose();
                    }
                    else
                    {
                        jsonData = "3|No Record Found,Please enter correct text for search!";
                    }
                }
                else
                {
                    jsonData = "3|No Record Found,Please enter correct text for search!";
                }
            }
            catch (Exception ex)
            {
                jsonData = "2|" + ex.Message;
            }
            finally
            {
                dt.Dispose();
            }
        }
        else
        {
            jsonData = "4^Session Expired,Please re-login";
        }
        return jsonData;
    }
    [WebMethod(EnableSession = true)]


    public string fnGetSeqNumber(string TableUnqTag, string TableName, string ColumnName)
    {
        string SeqNumber = "";
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        SqlCommand cmd = null;
        try
        {
            cmd = new SqlCommand("spGetSeqNumber", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 0;
            cmd.Parameters.AddWithValue("@SalesNodeId", HttpContext.Current.Session["SalesNodeId"]);
            cmd.Parameters.AddWithValue("@SalesNodeType", HttpContext.Current.Session["SalesNodeType"]);
            cmd.Parameters.AddWithValue("@Fyid", HttpContext.Current.Session["FYID"]);
            cmd.Parameters.AddWithValue("@TableUnqTag", TableUnqTag);
            cmd.Parameters.AddWithValue("@TableName", TableName);
            cmd.Parameters.AddWithValue("@ColumnName", ColumnName);

            con.Open();
            SeqNumber = Convert.ToString(cmd.ExecuteScalar());
            HttpContext.Current.Session["SeqNumber"] = SeqNumber;
        }
        catch (Exception ex)
        {
            SeqNumber = ex.Message;
        }
        finally
        {
            cmd.Dispose();
            con.Close();
            con.Dispose();
        }
        return SeqNumber;
    }

    [WebMethod(EnableSession = true)]
    public object fnGetOrderReturnStepsBySingleproduct(string OrderReturnDetailId, string flgReqFrom)
    {
        string strConn = ConfigurationManager.ConnectionStrings["strConn"].ConnectionString;
        using (SqlConnection Scon = new SqlConnection(strConn))
        {
            using (SqlCommand Scmd = new SqlCommand())
            {
                Scmd.Connection = Scon;

                Scmd.CommandText = "[spGetOrderReturnStepsBySingleProduct]";
                Scmd.Parameters.AddWithValue("@OrderReturnDetailId", OrderReturnDetailId);
                Scmd.CommandType = CommandType.StoredProcedure;
                Scmd.CommandTimeout = 0;

                using (SqlDataAdapter Sdap = new SqlDataAdapter(Scmd))
                {
                    DataSet Ds = new DataSet();
                    Sdap.Fill(Ds);

                    object sss = JsonConvert.SerializeObject(Ds, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
                    Ds.Dispose();
                    return sss;
                }
            }
        }
    }

    [WebMethod(EnableSession = true)]
    public string fnPopulateOrderReturnSteps(object OrderReturnSteps, object OrderReturnSponsorMapping, int StoreId, int flg)
    {
        string orderDetail = "";
        if ((HttpContext.Current.Session["LoginID"] != null))
        {
            SqlConnection con = null;
            con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
            SqlTransaction transaction;
            SqlCommand cmd = null;

            con.Open();
            transaction = con.BeginTransaction();
            try
            {
                DataTable tblOrderReturnSteps;

                string strOrderReturnSteps = JsonConvert.SerializeObject(OrderReturnSteps, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
                tblOrderReturnSteps = JsonConvert.DeserializeObject<DataTable>(strOrderReturnSteps);
                tblOrderReturnSteps.TableName = "tblOrderReturnSteps";
                if (tblOrderReturnSteps.Rows.Count == 0)
                {
                    tblOrderReturnSteps.Columns.Add(new DataColumn("OrderReturnStepsId", typeof(Int32)));
                    tblOrderReturnSteps.Columns.Add(new DataColumn("OrderReturnDetailID", typeof(Int32)));
                    tblOrderReturnSteps.Columns.Add(new DataColumn("RowNo", typeof(Int32)));
                    tblOrderReturnSteps.Columns.Add(new DataColumn("OrderReturnActionId", typeof(Int32)));
                    tblOrderReturnSteps.Columns.Add(new DataColumn("Qty", typeof(Int32)));
                    tblOrderReturnSteps.Columns.Add(new DataColumn("ReplacementString", typeof(string)));
                    tblOrderReturnSteps.Columns.Add(new DataColumn("PrdId", typeof(Int32)));
                    tblOrderReturnSteps.Columns.Add(new DataColumn("ReturnAction", typeof(string)));
                    tblOrderReturnSteps.Columns.Add(new DataColumn("Resolution", typeof(string)));
                    tblOrderReturnSteps.Columns.Add(new DataColumn("ResolutionWhen", typeof(string)));
                    tblOrderReturnSteps.Columns.Add(new DataColumn("IsApproved", typeof(Int32)));
                    tblOrderReturnSteps.Columns.Add(new DataColumn("OrderReturnSubActionId", typeof(Int32)));
                    tblOrderReturnSteps.Columns.Add(new DataColumn("Reason", typeof(string)));
                }
                else
                {
                    if (flg == 2)
                    {
                        int indx = tblOrderReturnSteps.Rows.Count - 1;
                        for (int i = 0; i < tblOrderReturnSteps.Rows.Count; i++)
                        {
                            tblOrderReturnSteps.Rows[i]["ReturnAction"] = tblOrderReturnSteps.Rows[indx]["ReturnAction"].ToString();
                            tblOrderReturnSteps.Rows[i]["Resolution"] = tblOrderReturnSteps.Rows[indx]["Resolution"].ToString();
                            tblOrderReturnSteps.Rows[i]["ResolutionWhen"] = tblOrderReturnSteps.Rows[indx]["ResolutionWhen"].ToString();
                            tblOrderReturnSteps.AcceptChanges();
                        }
                    }
                }

                string strOrderReturnSponsorMapping = JsonConvert.SerializeObject(OrderReturnSponsorMapping, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
                var tblOrderReturnSponsorMapping = JsonConvert.DeserializeObject<DataTable>(strOrderReturnSponsorMapping);
                tblOrderReturnSponsorMapping.TableName = "tblOrderReturnSponsorMapping";
                if (tblOrderReturnSponsorMapping.Rows.Count == 0)
                {
                    tblOrderReturnSponsorMapping.Columns.Add(new DataColumn("OrderReturnDetailId", typeof(Int32)));
                    tblOrderReturnSponsorMapping.Columns.Add(new DataColumn("SponsorId", typeof(Int32)));
                    tblOrderReturnSponsorMapping.Columns.Add(new DataColumn("Percentage", typeof(Int32)));
                    tblOrderReturnSponsorMapping.Columns.Add(new DataColumn("TotalAmount", typeof(float)));
                }
                cmd = new SqlCommand("spPopulateOrderReturnSteps", con, transaction);
                cmd.Parameters.AddWithValue("@OrderReturnSteps", tblOrderReturnSteps);
                cmd.Parameters.AddWithValue("@OrderReturnSponsorMapping", tblOrderReturnSponsorMapping);
                cmd.Parameters.AddWithValue("@LoginId", Convert.ToInt32(HttpContext.Current.Session["LoginID"]));
                cmd.Parameters.AddWithValue("@StoreId", StoreId);


                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 0;
                cmd.ExecuteNonQuery();
                orderDetail = "Saved Successfully^1";

                transaction.Commit();
            }
            catch (Exception ex)
            {
                orderDetail = ex.Message + "^2";
                transaction.Rollback();
                string ProjectTitle = ConfigurationManager.AppSettings["Title"];
                string ReferalUrl = Convert.ToString(HttpContext.Current.Request.UrlReferrer);
                //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), ReferalUrl, "spPopulateOrderReturnSteps", "Error in " + ProjectTitle);
            }
            finally
            {
                cmd.Dispose();
                con.Close();
                con.Dispose();
            }
        }
        else
        {
            orderDetail = "Session Expired,Please relogin^4^";
        }
        return orderDetail;
    }

    [System.Web.Services.WebMethod(EnableSession = true)]
    public string fnSendMailToManufacturer(string mailto, string mailcc, string mailsub, string mailbody, string attachfile)
    {
        string strRep = "";
        try
        {
            //passing parameter to Email Method


            strRep = "";// classSendMail.fnSendmail(mailto, mailcc, mailsub, mailbody, attachfile);
        }
        catch (Exception ex)
        {
            strRep = ex.Message;
        }
        return strRep;
    }


    [System.Web.Services.WebMethod(EnableSession = true)]
    public string fnGetListDebitNote(DateTime FromDate, DateTime ToDate, object objCustomer)
    {
        string orderDetail = "";
        if (HttpContext.Current.Session["LoginID"] != null)
        {
            string strDebNoteTypeId = JsonConvert.SerializeObject(objCustomer, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
            DataTable DtDSRList = JsonConvert.DeserializeObject<DataTable>(strDebNoteTypeId);
            DtDSRList.TableName = "DtDSRList";
            if (DtDSRList.Columns.Count == 0)
            {
                DtDSRList.Columns.Add(new DataColumn("NodeID", typeof(Int32)));
                DtDSRList.Columns.Add(new DataColumn("NodeType", typeof(Int32)));
            }
            SqlConnection Scon = new SqlConnection(ConfigurationManager.ConnectionStrings["strConn"].ConnectionString);
            SqlCommand Scmd = new SqlCommand();
            Scmd.Connection = Scon;
            Scmd.CommandText = "[spGetListDebitNote]";
            Scmd.CommandType = CommandType.StoredProcedure;
            Scmd.CommandTimeout = 0;
            Scmd.Parameters.AddWithValue("@Fromdate", FromDate);
            Scmd.Parameters.AddWithValue("@Todate", ToDate);
            Scmd.Parameters.AddWithValue("@SalesNodeId", HttpContext.Current.Session["SalesNodeId"].ToString());
            Scmd.Parameters.AddWithValue("@SalesNodeType", HttpContext.Current.Session["SalesNodeType"].ToString());
            Scmd.Parameters.AddWithValue("@Customer", DtDSRList);
            SqlDataAdapter Sdap = new SqlDataAdapter(Scmd);
            DataSet Ds = new DataSet();
            Sdap.Fill(Ds);

            StringBuilder str = new StringBuilder();

            if (Ds.Tables[0].Rows.Count > 0)
            {
                str.Append("<table cellpadding='0' cellspacing= '0' style='width:100%; border-bottom:1px solid gray;text-align:left' id='tblBasicDetailsInfo' ><tr>");
                str.Append("<th></th>");
                for (int j = 1; j < Ds.Tables[0].Columns.Count - 1; j++)
                {

                    str.Append("<th class='th_" + j + "'>" + Ds.Tables[0].Columns[j].ColumnName + "</th>");

                }

                str.Append("</tr>");
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {
                    str.Append("<tr DebNoteId='" + Ds.Tables[0].Rows[i]["DebNoteId"].ToString() + "' >");
                    int j = 1;
                    str.Append("<td><input type='checkbox' /></td>");
                    for (j = 1; j < Ds.Tables[0].Columns.Count - 1; j++)
                    {
                        if (j == 3)
                        {
                            str.Append("<td class='td_" + j + "' style='text-align:right'>" + Ds.Tables[0].Rows[i][j].ToString() + "</td>");
                        }
                        else
                        {
                            str.Append("<td class='td_" + j + "' style='text-align:left'>" + Ds.Tables[0].Rows[i][j].ToString() + "</td>");
                        }

                    }


                    str.Append("</tr>");
                }
                str.Append("</table>");
            }
            Ds.Dispose();
        }
        else
        {
            orderDetail = "Session Expired!!!^3";
        }
        return orderDetail.ToString();
    }

    [System.Web.Services.WebMethod(EnableSession = true)]
    public string GetOrderReturnInvDetail(string OrderReturnDetId, string StoreId, DateTime OrdRetDate, string PrdIds, int OrderReturnTypeId)
    {
        SqlConnection Scon = new SqlConnection(ConfigurationManager.ConnectionStrings["strConn"].ConnectionString);
        SqlCommand Scmd = new SqlCommand();
        Scmd.Connection = Scon;
        Scmd.CommandText = "[spGetOrderReturnInvDetail]";
        Scmd.CommandType = CommandType.StoredProcedure;
        Scmd.CommandTimeout = 0;
        Scmd.Parameters.AddWithValue("@OrderReturnDetId", OrderReturnDetId);
        Scmd.Parameters.AddWithValue("@StoreId", StoreId);
        Scmd.Parameters.AddWithValue("@OrdRetDate", OrdRetDate);
        Scmd.Parameters.AddWithValue("@PrdIds", PrdIds);
        Scmd.Parameters.AddWithValue("@OrderReturnTypeId", OrderReturnTypeId);

        SqlDataAdapter Sdap = new SqlDataAdapter(Scmd);
        DataSet Ds = new DataSet();
        Sdap.Fill(Ds);

        StringBuilder str = new StringBuilder();
        if (Ds.Tables.Count > 0)
        {
            if (Ds.Tables[0].Rows.Count > 0)
            {
                if (Ds.Tables[1].Rows.Count > 0)
                {
                    str.Append("<table id='tblMainSkuWise' style='width:100%;'>");
                    int j = 1;
                    foreach (DataRow drow1 in Ds.Tables[1].Rows)
                    {
                        string WeightAvgRate = Convert.ToString(drow1["WeightAvgRate"]);
                        WeightAvgRate = WeightAvgRate == "" ? "0" : WeightAvgRate;
                        string stylee = "";

                        str.Append("<tr flg='1' prdid='" + drow1["prdid"] + "' >");
                        str.Append("<td>");
                        str.Append("<table style='width:100%;font-size:8.2pt' cellpadding='3' cellspacing= '0'>");
                        str.Append("<tr>");
                        str.Append("<td style='width:15%'><b>SKU Code</b></td>");
                        str.Append("<td style='width:2%'>:</td>");
                        str.Append("<td style='width:25%' id='skucode" + drow1["prdid"] + "'>" + drow1["skucode"] + "</td>");

                        str.Append("<td align='right' style='width:13%'><b>SKU Name</b> </td>");
                        str.Append("<td>:</td>");
                        str.Append("<td id='skuname" + drow1["prdid"] + "'>" + drow1["sku"] + "</td>");
                        str.Append("</tr>");

                        str.Append("<tr>");
                        str.Append("<td><b>Total Return Qty</b></td>");
                        str.Append("<td>:</td>");
                        str.Append("<td><input style=\"width: 55px; text-align: center;margin-right:2px\" type=\"text\" value=" + drow1["TotRetQty"] + "  onkeypress=\"return isNumberKeyNotDecimal(event)\" onmousedown=\"whichButton(event)\" onkeydown=\"return noCTRL(event)\" onfocus=\"Focus(this,'0')\" onblur=\"fnSetWeightRate(this, 3)\" id='txtRet" + drow1["prdid"] + "' /><a href='###' onclick='fnApplyAgainstLastInvoices(this," + drow1["prdid"] + ")' style='color:blue;text-decoration:underline;font-size:11px' />Apply Against Last Invoices</a></td>");
                        str.Append("<td align='right'><b>Stock Type</b></td>");
                        str.Append("<td>:</td>");
                        str.Append("<td><select style='width:120px' id='ddlstocktype" + drow1["prdid"] + "'>");
                        foreach (DataRow drst in Ds.Tables[2].Rows)
                        {
                            if (Convert.ToInt32(drow1["StockStatusId"]) == Convert.ToInt32(drst["StockStatusId"]))
                            {
                                str.Append("<option value='" + drst["StockStatusId"].ToString() + "' selected='selected' >");
                            }
                            else
                            {
                                str.Append("<option value='" + drst["StockStatusId"].ToString() + "' >");
                            }

                            str.Append(drst["StockStatus"].ToString());
                            str.Append("</option>");
                        }

                        str.Append("</select></td>");

                        str.Append("</tr>");

                        str.Append("<tr>");
                        str.Append("<td><b>Weighted Avg. Rate</b></td>");
                        str.Append("<td>:</td>");
                        str.Append("<td id='tdWeightRate" + drow1["prdid"] + "' WeightAvgRate=" + drow1["WeightAvgRate"] + " ><input type='text' placeholder='0.00' value=' " + Convert.ToDouble(drow1["WeightAvgRate"]).ToString("F") + "' onkeypress=\"return isNumericWithOneDecimal(event)\" onmousedown=\"whichButton(event)\" onkeydown=\"return noCTRL(event)\" style='text-align:center;width:100px;' onfocus=\"Focus(this,'0.00')\" onchange='fnApplyRateAgainstLastInvoices(this," + drow1["prdid"] + ")' /></td>");
                        str.Append("<td align='right'><b>Net Return Value</b></td>");
                        str.Append("<td>:</td>");
                        str.Append("<td  NetValueRet=" + drow1["NetValueRet"] + " id='tdNetValueRet" + drow1["prdid"] + "'>" + Convert.ToDouble(drow1["NetValueRet"]).ToString("F") + "</td>");
                        str.Append("</tr>");

                        str.Append("</table>");
                        str.Append("<br/>");
                        DataRow[] drow2 = Ds.Tables[0].Select("PrdId=" + drow1["prdid"]);
                        if (drow2.Length > 0)
                        {
                            str.Append("<table cellpadding='2' cellspacing= '0' style='width:100%;;font-size:8.2pt;margin-bottom:4px;'  id='tblInvDetailsInfo" + drow1["prdid"] + "' align='left' class='clstableInv' >");
                            str.Append("<tr bgcolor='23aed8' style='color:white'>");
                            str.Append("<th>Inv Code</th>");
                            str.Append("<th>Inv Date</th>");
                            str.Append("<th>Order Date</th>");
                            str.Append("<th>Dlvry Date</th>");
                            string batNumber = Convert.ToString((drow2[0]).ItemArray[13]);
                            if (batNumber != "")
                            {
                                str.Append("<th>Batch</th>");
                            }
                            else
                            {
                                str.Append("<th style='display:none'>Batch</th>");
                            }

                            str.Append("<th>Inv Qty</ th>");
                            str.Append("<th style='width:50px'>Already Return Qty</th>");
                            str.Append("<th style='width:50px'>Actual Qty To Be Adjusted</th>");
                            str.Append("<th style='width:50px'>Adj Return Qty</th>");
                            str.Append("<th>Rate</ th>");
                            str.Append("<th style='width:50px'>Effective Rate</th>");
                            str.Append("<th>Scheme Applied</th>");
                            str.Append("</tr>");
                            int i = 1;
                            string OldInvID = "";

                            foreach (DataRow dsubrow1 in drow2)
                            {
                                string NewInvId = dsubrow1["InvID"].ToString();
                                Ds.Tables[0].Select("PrdId=" + drow1["prdid"] + " and InvID=" + NewInvId);
                                int batchlength = Ds.Tables[0].Select("PrdId=" + drow1["prdid"] + " and InvID=" + NewInvId).Length;
                                string style = "";
                                int NeedToBeAdjsted = Convert.ToInt32(dsubrow1["TotInvQty"]) - Convert.ToInt32(dsubrow1["AlreadyAdj"]);
                                NeedToBeAdjsted = NeedToBeAdjsted < 0 ? 0 : NeedToBeAdjsted;

                                string PrdBatchId = dsubrow1["PrdBatchId"].ToString();
                                i++;
                                if (OldInvID != NewInvId)
                                {
                                    str.Append("<tr " + style + " flg='2' EffRate='" + dsubrow1["EffectiveRate"] + "' InvRate='" + dsubrow1["InvRate"] + "' invcode='" + dsubrow1["InvCode"].ToString() + "' InvDetailID='" + dsubrow1["InvDetailID"].ToString() + "' InvID='" + dsubrow1["InvID"].ToString() + "' PrdBatchId='" + PrdBatchId + "' >");
                                    str.Append("<td rowspan=" + batchlength + ">" + dsubrow1["InvCode"].ToString() + "</td>");
                                    str.Append("<td rowspan=" + batchlength + ">" + Convert.ToDateTime(dsubrow1["InvDate"]).ToString("dd-MMM-yyyy") + " </td>");
                                    str.Append("<td rowspan=" + batchlength + ">" + Convert.ToDateTime(dsubrow1["OrderDate"]).ToString("dd-MMM-yyyy") + "</td>");
                                    str.Append("<td rowspan=" + batchlength + ">" + Convert.ToDateTime(dsubrow1["InvDate"]).ToString("dd-MMM-yyyy") + "</td>");

                                    if (batNumber != "")
                                    {
                                        str.Append("<td align='center'>" + dsubrow1["BatchNumber"] + "</td>");
                                    }
                                    else
                                    {
                                        str.Append("<td align='center' style='display:none'>" + dsubrow1["BatchNumber"] + "</td>");
                                    }

                                    str.Append("<td align='center'>" + dsubrow1["TotInvQty"] + "</td>");
                                    str.Append("<td align='center'>" + dsubrow1["AlreadyAdj"] + "</td>");
                                    str.Append("<td align='center'>" + NeedToBeAdjsted.ToString() + "</td>");
                                    str.Append("<td align='center'><input style=\"width: 55px; text-align: center\" type=\"text\" flg='2' value='" + dsubrow1["AdjRetQty"] + "'  onkeypress=\"return isNumberKeyNotDecimal(event)\" onmousedown=\"whichButton(event)\" onkeydown=\"return noCTRL(event)\" onfocus=\"Focus(this,'0')\" onblur=\"fnSetWeightRate(this,1)\" /></td>");
                                    str.Append("<td align='right' >" + Convert.ToDouble(dsubrow1["InvRate"]).ToString("F") + "</td>");
                                    str.Append("<td align='center' EffectiveRate='" + dsubrow1["EffectiveRate"] + "' >" + Convert.ToDouble(dsubrow1["EffectiveRate"]).ToString("F") + "</td>");
                                    str.Append("<td rowspan=" + batchlength + "></td>");
                                    str.Append("</tr>");
                                }
                                else
                                {
                                    str.Append("<tr " + style + " EffRate='" + dsubrow1["EffectiveRate"] + "' InvRate='" + dsubrow1["InvRate"] + "' flg='2' invcode='" + dsubrow1["InvCode"].ToString() + "' InvDetailID='" + dsubrow1["InvDetailID"].ToString() + "' InvID='" + dsubrow1["InvID"].ToString() + "' PrdBatchId='" + PrdBatchId + "'  >");
                                    str.Append("<td align='center'>" + dsubrow1["BatchNumber"] + "</td>");
                                    str.Append("<td align='center'>" + dsubrow1["TotInvQty"] + "</td>");
                                    str.Append("<td align='center'>" + dsubrow1["AlreadyAdj"] + "</td>");
                                    str.Append("<td align='center'>" + NeedToBeAdjsted.ToString() + "</td>");
                                    str.Append("<td align='center'><input style=\"width: 55px; text-align: center\" type=\"text\" flg='2' value='" + dsubrow1["AdjRetQty"] + "'  onkeypress=\"return isNumberKeyNotDecimal(event)\" onmousedown=\"whichButton(event)\" onkeydown=\"return noCTRL(event)\" onfocus=\"Focus(this,'0')\" onblur=\"fnSetWeightRate(this,1)\" /></td>");
                                    str.Append("<td align='right' >" + Convert.ToDouble(dsubrow1["InvRate"]).ToString("F") + "</td>");
                                    str.Append("<td align='center' EffectiveRate='" + dsubrow1["EffectiveRate"] + "' >" + Convert.ToDouble(dsubrow1["EffectiveRate"]).ToString("F") + "</td>");
                                    str.Append("</tr>");
                                }

                                OldInvID = dsubrow1["InvID"].ToString();
                            }
                            str.Append("<tr>");
                            if (batNumber != "")
                            {
                                str.Append("<td style='padding-top:8px;text-algin:right' colspan='8' align='right'><b>UnAdjusted Against Invoice :</b></td>");
                            }
                            else
                            {
                                str.Append("<td style='padding-top:8px;text-algin:right' colspan='7' align='right'><b>UnAdjusted Against Invoice :</b></td>");
                            }
                            str.Append("<td style='padding-top:8px;text-algin:center' align='center'><input style=\"width: 55px; text-align: center\" type=\"text\" value=\"0\"  onkeypress=\"return isNumberKeyNotDecimal(event)\" onmousedown=\"whichButton(event)\" onkeydown=\"return noCTRL(event)\" onfocus=\"Focus(this,'0')\" onblur=\"Blur(this,'0')\" id='txtUA" + drow1["prdid"] + "' /></td>");
                            str.Append("<td style='padding-top:8px'colspan='3' ></td>");
                            str.Append("</tr>");

                            str.Append("</table>");
                        }
                        else
                        {
                            str.Append("<div>No Invoice Found!!</div>");
                        }
                        str.Append("<hr/>");
                        str.Append("</td>");
                        str.Append("</tr>");
                    }
                    str.Append("</table>");
                }
            }
            else
            {
                str.Append("");
            }
        }
        return str.ToString();
    }

    [System.Web.Services.WebMethod(EnableSession = true)]
    public string fnPopulateOrderReturnInvMap(int OrderReturnDetId, string InvMapDetail)
    {
        string orderDetail = "";
        if ((HttpContext.Current.Session["LoginID"] != null))
        {
            SqlConnection con = null;
            con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
            SqlTransaction transaction;
            SqlCommand cmd = null;

            con.Open();
            transaction = con.BeginTransaction();
            try
            {
                cmd = new SqlCommand("spPopulateOrderReturnInvMap", con, transaction);
                cmd.Parameters.AddWithValue("@OrderReturnDetId", OrderReturnDetId);
                cmd.Parameters.AddWithValue("@InvMapDetail", InvMapDetail);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 0;
                cmd.ExecuteNonQuery();
                orderDetail = "Saved Successfully^1";

                transaction.Commit();
            }
            catch (Exception ex)
            {
                orderDetail = ex.Message + "^2";
                transaction.Rollback();
                string ProjectTitle = ConfigurationManager.AppSettings["Title"];
                string ReferalUrl = Convert.ToString(HttpContext.Current.Request.UrlReferrer);
                //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), ReferalUrl, "spPopulateOrderReturnInvMap", "Error in " + ProjectTitle);
            }
            finally
            {
                cmd.Dispose();
                con.Close();
                con.Dispose();
            }
        }
        else
        {
            orderDetail = "Session Expired,Please relogin^4^";
        }
        return orderDetail;
    }


    [System.Web.Services.WebMethod(EnableSession = true)]
    public object fnGetSalesOrderStoreList(string SearchText, DateTime OrderDate, int DSRNodeId, int DSRNodeType)
    {
        object sss = "";
        using (SqlConnection con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]))
        {
            using (SqlCommand cmd = new SqlCommand("spGetSalesOrderStoreListOnline", con))
            {
                DataSet ds = null;
                SqlDataAdapter da;
                cmd.Parameters.AddWithValue("@DSRNodeId", DSRNodeId);
                cmd.Parameters.AddWithValue("@DSRNodeType", DSRNodeType);
                cmd.Parameters.AddWithValue("@SearchText", SearchText);
                cmd.Parameters.AddWithValue("@SalesNodeId", Convert.ToInt32(HttpContext.Current.Session["SalesNodeId"]));
                cmd.Parameters.AddWithValue("@SalesNodeType", Convert.ToInt32(HttpContext.Current.Session["SalesNodeType"]));
                cmd.Parameters.AddWithValue("@OrderDate", OrderDate);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 0;
                da = new SqlDataAdapter(cmd);
                ds = new DataSet();
                da.Fill(ds);
                sss = JsonConvert.SerializeObject(ds, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
                ds.Dispose();
            }
        }

        return sss;
    }


    //Get Scheme And Product Detail Bases on Store
    [System.Web.Services.WebMethod(EnableSession = true)]
    public string fnProductMasterList(string searchText, DateTime OrderDate)
    {
        //DataTable dt = ds.Tables[0].Select("Name LIKE 'Rob%'").CopyToDataTable();
        //Convert.ToString(Request.UrlReferrer)
        Session["ProductMasterList"] = null;
        string jsonData = "";
        if ((HttpContext.Current.Session["SalesNodeId"] != null))
        {
            DataTable dt = new DataTable();
            SqlConnection con = null;
            con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            try
            {
                cmd = new SqlCommand("spGetOrderMastersForWeb", con);
                cmd.Parameters.AddWithValue("@searchText", searchText);
                cmd.Parameters.AddWithValue("@SalesNodeId", Convert.ToInt32(HttpContext.Current.Session["SalesNodeId"]));
                cmd.Parameters.AddWithValue("@SalesNodeType", Convert.ToInt32(HttpContext.Current.Session["SalesNodeType"]));
                cmd.Parameters.AddWithValue("@Fyid", Convert.ToInt32(HttpContext.Current.Session["FYID"]));
                cmd.Parameters.AddWithValue("@OrderDate", OrderDate);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 0;
                da = new SqlDataAdapter(cmd);
                //dt = clsProductMaster.fnGetProductMaster();
                //dtMain = dt.Select("sku LIKE '%" + searchText + "%' or SKUCode like '%" + searchText + "%' or category like '%" + searchText + "%'").Take(40).CopyToDataTable();
                da.Fill(dt);
                Session["ProductMasterList"] = dt;
            }
            catch (Exception ex)
            {

                jsonData = "2^" + ex.Message;
                string ProjectTitle = ConfigurationManager.AppSettings["Title"];
                string ReferalUrl = Convert.ToString(HttpContext.Current.Request.UrlReferrer.AbsoluteUri);
                string aa = HttpContext.Current.Request.Path;
                //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), ReferalUrl, "spGetOrderMastersForWeb", "Error in " + ProjectTitle);
            }
            finally
            {
                cmd.Dispose();
                con.Dispose();
            }
        }
        else
        {
            jsonData = "4^Session Expired,Please re-login";
        }
        return jsonData;
    }

    //Get Scheme And Product Detail Bases on Store
    [System.Web.Services.WebMethod(EnableSession = true)]
    public object fnGetProductMasterListPOReq(string searchText, int IsStaple)
    {
        object jsonData;
        if ((HttpContext.Current.Session["ProductMasterListPOReq"] != null))
        {
            DataTable dt = null;
            try
            {
                dt = (DataTable)HttpContext.Current.Session["ProductMasterListPOReq"];
                if (dt.Rows.Count > 0)
                {
                    string[] filterArray = searchText.Split(',');

                    string strsearchfield = "IsStaple=" + IsStaple + " and Searchfield LIKE '%" + filterArray[0] + "%'";
                    for (int i = 1; i < filterArray.Length; i++)
                    {
                        strsearchfield += " and Searchfield LIKE '%" + filterArray[i] + "%'";
                    }
                    if (dt.Select(strsearchfield).Length > 0)
                    {
                        DataTable dtMain = dt.Select(strsearchfield).Take(10).CopyToDataTable();
                        jsonData = JsonConvert.SerializeObject(dtMain, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
                        jsonData = "1^" + jsonData;
                        dtMain.Dispose();
                    }
                    else
                    {
                        jsonData = "3^No Record Found,Please enter correct text for search!";
                    }
                }
                else
                {
                    jsonData = "3^No Record Found,Please enter correct text for search!";
                }
            }
            catch (Exception ex)
            {
                jsonData = "2^" + ex.Message;
            }
            finally
            {
                dt.Dispose();
            }
        }
        else
        {
            jsonData = "4^Session Expired,Please re-login";
        }
        return jsonData;
    }

    //Get Scheme And Product Detail Bases on Store
    [System.Web.Services.WebMethod(EnableSession = true)]
    public string fnGetPurchaseReqProductMasters_PDA(string searchText, DateTime OrderDate, string SalesNodeId, string SalesNodeType)
    {
        string jsonData = ""; ;
        if ((HttpContext.Current.Session["SalesNodeId"] != null))
        {
            DataTable dt = new DataTable();
            SqlConnection con = null;
            con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            try
            {
                cmd = new SqlCommand("spGetPurchaseReqProductMasters", con);
                cmd.Parameters.AddWithValue("@searchText", searchText);
                cmd.Parameters.AddWithValue("@SalesNodeId", Convert.ToInt32(SalesNodeId));
                cmd.Parameters.AddWithValue("@SalesNodeType", Convert.ToInt32(SalesNodeType));
                cmd.Parameters.AddWithValue("@Fyid", Convert.ToInt32(HttpContext.Current.Session["FYID"]));
                //cmd.Parameters.AddWithValue("@PoType", Convert.ToInt32(PoType));
                //cmd.Parameters.AddWithValue("@OrderDate", OrderDate);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 0;
                da = new SqlDataAdapter(cmd);
                da.Fill(dt);
                Session["ProductMasterListPOReq"] = dt;
            }
            catch (Exception ex)
            {
                jsonData = "2^" + ex.Message;
                string ProjectTitle = ConfigurationManager.AppSettings["Title"];
                string ReferalUrl = Convert.ToString(HttpContext.Current.Request.UrlReferrer);
                // clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), ReferalUrl, "spGetPurchaseReqProductMasters", "Error in " + ProjectTitle);
            }
            finally
            {
                cmd.Dispose();
                con.Dispose();
            }
        }
        else
        {
            jsonData = "4^Session Expired,Please re-login";
        }
        return jsonData;
    }

    //Get Scheme And Product Detail Bases on Store
    [System.Web.Services.WebMethod(EnableSession = true)]
    public string fnGetPurchaseReqProductMasters(string searchText, DateTime OrderDate)
    {
        //DataTable dt = ds.Tables[0].Select("Name LIKE 'Rob%'").CopyToDataTable();
        //Convert.ToString(Request.UrlReferrer)

        string jsonData = ""; ;
        if ((HttpContext.Current.Session["SalesNodeId"] != null))
        {
            DataTable dt = new DataTable();
            SqlConnection con = null;
            con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            try
            {
                cmd = new SqlCommand("spGetPurchaseReqProductMasters", con);
                cmd.Parameters.AddWithValue("@searchText", searchText);
                cmd.Parameters.AddWithValue("@SalesNodeId", Convert.ToInt32(HttpContext.Current.Session["SalesNodeId"]));
                cmd.Parameters.AddWithValue("@SalesNodeType", Convert.ToInt32(HttpContext.Current.Session["SalesNodeType"]));
                cmd.Parameters.AddWithValue("@Fyid", Convert.ToInt32(HttpContext.Current.Session["FYID"]));
                //cmd.Parameters.AddWithValue("@OrderDate", OrderDate);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 0;
                da = new SqlDataAdapter(cmd);
                //dt = clsProductMaster.fnGetProductMaster();
                //dtMain = dt.Select("sku LIKE '%" + searchText + "%' or SKUCode like '%" + searchText + "%' or category like '%" + searchText + "%'").Take(40).CopyToDataTable();
                da.Fill(dt);
                Session["ProductMasterList"] = dt;
            }
            catch (Exception ex)
            {

                jsonData = "2^" + ex.Message;
                string ProjectTitle = ConfigurationManager.AppSettings["Title"];
                string ReferalUrl = Convert.ToString(HttpContext.Current.Request.UrlReferrer);
                //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), ReferalUrl, "spGetPurchaseReqProductMasters", "Error in " + ProjectTitle);
            }
            finally
            {
                cmd.Dispose();
                con.Dispose();
            }
        }
        else
        {
            jsonData = "4^Session Expired,Please re-login";
        }
        return jsonData;
    }

    //Get Scheme And Product Detail Bases on Store
    [System.Web.Services.WebMethod(EnableSession = true)]
    public object fnGetProductMasterList(string searchText)
    {

        object jsonData;
        if ((HttpContext.Current.Session["ProductMasterList"] != null))
        {
            DataTable dt = null;
            try
            {
                dt = (DataTable)HttpContext.Current.Session["ProductMasterList"];
                if (dt.Rows.Count > 0)
                {
                    string[] filterArray = searchText.Split(',');

                    string strsearchfield = "Searchfield LIKE '%" + filterArray[0] + "%'";
                    for (int i = 1; i < filterArray.Length; i++)
                    {
                        strsearchfield += " and Searchfield LIKE '%" + filterArray[i] + "%'";
                    }
                    if (dt.Select(strsearchfield).Length > 0)
                    {
                        DataTable dtMain = dt.Select(strsearchfield).Take(40).CopyToDataTable();
                        jsonData = JsonConvert.SerializeObject(dtMain, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
                        jsonData = "1^" + jsonData;
                        dtMain.Dispose();
                    }
                    else
                    {
                        jsonData = "3^No Record Found,Please enter correct text for search!";
                    }
                }
                else
                {
                    jsonData = "3^No Record Found,Please enter correct text for search!";
                }
            }
            catch (Exception ex)
            {
                jsonData = "2^" + ex.Message;
            }
            finally
            {
                dt.Dispose();
            }
        }
        else
        {
            jsonData = "4^Session Expired,Please re-login";
        }
        return jsonData;
    }

    [System.Web.Services.WebMethod(EnableSession = true)]
    public string ProductMaster(string searchText, DateTime OrderDate, DateTime DlvryDate, string CustomerNodeId, string CustomerNodeType)
    {
        //DataTable dt = ds.Tables[0].Select("Name LIKE 'Rob%'").CopyToDataTable();
        //int cnt = Convert.ToInt32(ConfigurationManager.AppSettings["PrdCnt"]);
        string jsonData = "";
        if ((HttpContext.Current.Session["SalesNodeId"] != null))
        {
            DataTable dt = new DataTable();
            SqlConnection con = null;
            con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            try
            {
                cmd = new SqlCommand("spGetProductListForOrderMastersN", con);
                cmd.Parameters.AddWithValue("@searchText", searchText);
                cmd.Parameters.AddWithValue("@SalesNodeId", Convert.ToInt32(HttpContext.Current.Session["SalesNodeId"]));
                cmd.Parameters.AddWithValue("@SalesNodeType", Convert.ToInt32(HttpContext.Current.Session["SalesNodeType"]));
                cmd.Parameters.AddWithValue("@Fyid", Convert.ToInt32(HttpContext.Current.Session["FYID"]));
                cmd.Parameters.AddWithValue("@OrderDate", OrderDate);
                cmd.Parameters.AddWithValue("@DlvryDate", DlvryDate);
                cmd.Parameters.AddWithValue("@CustomerNodeId", CustomerNodeId);
                cmd.Parameters.AddWithValue("@CustomerNodeType", CustomerNodeType);
                cmd.Parameters.AddWithValue("@Cnt", 0);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 0;
                da = new SqlDataAdapter(cmd);
                //dt = clsProductMaster.fnGetProductMaster();
                //dtMain = dt.Select("sku LIKE '%" + searchText + "%' or SKUCode like '%" + searchText + "%' or category like '%" + searchText + "%'").Take(40).CopyToDataTable();
                da.Fill(dt);
                Session["ProductMasterList"] = dt;
            }
            catch (Exception ex)
            {
                jsonData = "2^" + ex.Message;
                string ProjectTitle = ConfigurationManager.AppSettings["Title"];
                string ReferalUrl = Convert.ToString(HttpContext.Current.Request.UrlReferrer);
                //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), ReferalUrl, "spGetProductListForOrderMasters", "Error in " + ProjectTitle);
            }
            finally
            {
                cmd.Dispose();
                con.Dispose();
            }
        }
        else
        {
            jsonData = "4^Session Expired,Please re-login";
        }
        return jsonData;
    }

    [System.Web.Services.WebMethod(EnableSession = true)]
    public string fnGetProductListForOrderMastersNew(string searchText, DateTime OrderDate, DateTime DlvryDate, string CustomerNodeId, string CustomerNodeType)
    {
        //DataTable dt = ds.Tables[0].Select("Name LIKE 'Rob%'").CopyToDataTable();
        int cnt = Convert.ToInt32(ConfigurationManager.AppSettings["PrdCnt"]);
        string jsonData = "";
        if ((HttpContext.Current.Session["SalesNodeId"] != null))
        {
            DataTable dt = new DataTable();
            SqlConnection con = null;
            con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            try
            {
                cmd = new SqlCommand("spGetProductListForOrderMastersN", con);
                cmd.Parameters.AddWithValue("@searchText", searchText);
                cmd.Parameters.AddWithValue("@SalesNodeId", Convert.ToInt32(HttpContext.Current.Session["SalesNodeId"]));
                cmd.Parameters.AddWithValue("@SalesNodeType", Convert.ToInt32(HttpContext.Current.Session["SalesNodeType"]));
                cmd.Parameters.AddWithValue("@Fyid", Convert.ToInt32(HttpContext.Current.Session["FYID"]));
                cmd.Parameters.AddWithValue("@OrderDate", OrderDate);
                cmd.Parameters.AddWithValue("@DlvryDate", DlvryDate);
                cmd.Parameters.AddWithValue("@CustomerNodeId", CustomerNodeId);
                cmd.Parameters.AddWithValue("@CustomerNodeType", CustomerNodeType);
                cmd.Parameters.AddWithValue("@Cnt", cnt);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 0;
                da = new SqlDataAdapter(cmd);
                //dt = clsProductMaster.fnGetProductMaster();
                //dtMain = dt.Select("sku LIKE '%" + searchText + "%' or SKUCode like '%" + searchText + "%' or category like '%" + searchText + "%'").Take(40).CopyToDataTable();
                da.Fill(dt);
                Session["ProductMasterList"] = dt;
                //if (ds.Tables[0].Rows.Count > 0)
                //{
                //    jsonData = JsonConvert.SerializeObject(ds, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
                //    jsonData = "1^" + jsonData;
                //}
                //else
                //{
                //    jsonData = "3^No Record Found,Please enter correct text for search!";
                //}
            }
            catch (Exception ex)
            {
                jsonData = "2^" + ex.Message;
                string ProjectTitle = ConfigurationManager.AppSettings["Title"];
                //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), "Order Punching", "spGetProductListForOrderMasters", "Error in Order Punching in " + ProjectTitle);
            }
            finally
            {
                cmd.Dispose();
                con.Dispose();
            }
        }
        else
        {
            jsonData = "4^Session Expired,Please re-login";
        }
        return jsonData;
    }

    [System.Web.Services.WebMethod(EnableSession = true)]
    public object fnGetProductListForOrderMasters(string searchText, DateTime OrderDate, DateTime DlvryDate, string CustomerNodeId, string CustomerNodeType)
    {
        //DataTable dt = ds.Tables[0].Select("Name LIKE 'Rob%'").CopyToDataTable();

        object jsonData;
        if ((HttpContext.Current.Session["SalesNodeId"] != null))
        {
            DataTable dt = new DataTable();
            SqlConnection con = null;
            con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            try
            {
                cmd = new SqlCommand("spGetProductListForOrderMasters", con);
                cmd.Parameters.AddWithValue("@searchText", searchText);
                cmd.Parameters.AddWithValue("@SalesNodeId", Convert.ToInt32(HttpContext.Current.Session["SalesNodeId"]));
                cmd.Parameters.AddWithValue("@SalesNodeType", Convert.ToInt32(HttpContext.Current.Session["SalesNodeType"]));
                cmd.Parameters.AddWithValue("@Fyid", Convert.ToInt32(HttpContext.Current.Session["FYID"]));
                cmd.Parameters.AddWithValue("@OrderDate", OrderDate);
                cmd.Parameters.AddWithValue("@DlvryDate", DlvryDate);
                cmd.Parameters.AddWithValue("@CustomerNodeId", CustomerNodeId);
                cmd.Parameters.AddWithValue("@CustomerNodeType", CustomerNodeType);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 0;
                da = new SqlDataAdapter(cmd);
                //dt = clsProductMaster.fnGetProductMaster();
                //dtMain = dt.Select("sku LIKE '%" + searchText + "%' or SKUCode like '%" + searchText + "%' or category like '%" + searchText + "%'").Take(40).CopyToDataTable();
                da.Fill(dt);
                Session["ProductMasterList"] = dt;
                //if (ds.Tables[0].Rows.Count > 0)
                //{
                //    jsonData = JsonConvert.SerializeObject(ds, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
                //    jsonData = "1^" + jsonData;
                //}
                //else
                //{
                //    jsonData = "3^No Record Found,Please enter correct text for search!";
                //}
            }
            catch (Exception ex)
            {
                jsonData = "2^" + ex.Message;
                string ProjectTitle = ConfigurationManager.AppSettings["Title"];
                string ReferalUrl = Convert.ToString(HttpContext.Current.Request.UrlReferrer);
                //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), ReferalUrl, "spGetProductListForOrderMasters", "Error in " + ProjectTitle);
            }
            finally
            {
                cmd.Dispose();
                con.Dispose();
            }
        }
        else
        {
            jsonData = "4^Session Expired,Please re-login";
        }
        return "0";
    }

    [System.Web.Services.WebMethod(EnableSession = true)]
    public string fnGenerateOrderReturnPickList(string OrdrRetIds)
    {
        //DataTable dt = ds.Tables[0].Select("Name LIKE 'Rob%'").CopyToDataTable();

        string strRsp;
        if ((HttpContext.Current.Session["SalesNodeId"] != null))
        {
            DataSet ds = new DataSet();
            SqlConnection con = null;
            con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            SqlTransaction transaction;
            con.Open();
            transaction = con.BeginTransaction();
            try
            {

                cmd = new SqlCommand("spGenerateOrderReturnPickList", con, transaction);
                cmd.Parameters.AddWithValue("@PickListId", 0);
                cmd.Parameters.AddWithValue("@GenerationDate", DateTime.Now.ToString("d MMM yyyy"));
                cmd.Parameters.AddWithValue("@SalesNodeId", Convert.ToInt32(HttpContext.Current.Session["SalesNodeId"]));
                cmd.Parameters.AddWithValue("@SalesNodeType", Convert.ToInt32(HttpContext.Current.Session["SalesNodeType"]));
                cmd.Parameters.AddWithValue("@Fyid", Convert.ToInt32(HttpContext.Current.Session["FYID"]));
                cmd.Parameters.AddWithValue("@LoginId", HttpContext.Current.Session["LoginID"].ToString());
                cmd.Parameters.AddWithValue("@OrdrRetIds", OrdrRetIds);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 0;
                da = new SqlDataAdapter(cmd);
                da.Fill(ds);
                transaction.Commit();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    strRsp = "1^" + ds.Tables[0].Rows[0][0].ToString();
                }
                else
                {
                    strRsp = "3^No Record Found!";
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                strRsp = "2^" + ex.Message;
                string ProjectTitle = ConfigurationManager.AppSettings["Title"];
                string ReferalUrl = Convert.ToString(HttpContext.Current.Request.UrlReferrer);
                //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), ReferalUrl, "spGenerateOrderReturnPickList", "Error in " + ProjectTitle);
            }
            finally
            {
                ds.Dispose();
                cmd.Dispose();
                con.Dispose();

            }
        }
        else
        {
            strRsp = "4^Session Expired,Please re-login";
        }
        return strRsp;
    }

    [WebMethod(EnableSession = true)]
    public object fnGetPurchaseDocNoByPrdId(int PrdBatchId, int FromStockStatusId, int StkMovId)
    {
        string strConn = ConfigurationManager.ConnectionStrings["strConn"].ConnectionString;
        using (SqlConnection Scon = new SqlConnection(strConn))
        {
            using (SqlCommand Scmd = new SqlCommand())
            {
                Scmd.Connection = Scon;
                Scmd.CommandText = "[spGetPurchaseDocNoByPrdId]";
                Scmd.Parameters.AddWithValue("@SalesNodeId", Convert.ToInt32(HttpContext.Current.Session["SalesNodeId"]));
                Scmd.Parameters.AddWithValue("@SalesNodeType", Convert.ToInt32(HttpContext.Current.Session["SalesNodeType"]));
                Scmd.Parameters.AddWithValue("@PrdBatchId", PrdBatchId);
                Scmd.Parameters.AddWithValue("@FromStockStatusId", FromStockStatusId);
                Scmd.Parameters.AddWithValue("@StkMovId", StkMovId);
                Scmd.CommandType = CommandType.StoredProcedure;
                Scmd.CommandTimeout = 0;

                using (SqlDataAdapter Sdap = new SqlDataAdapter(Scmd))
                {
                    DataSet Ds = new DataSet();
                    Sdap.Fill(Ds);

                    object sss = JsonConvert.SerializeObject(Ds, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
                    Ds.Dispose();
                    return sss;
                }
            }
        }
    }


}
