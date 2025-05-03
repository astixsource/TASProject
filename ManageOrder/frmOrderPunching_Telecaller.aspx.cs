using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Text;
using Newtonsoft.Json;
using System.Web.Script.Serialization;
using System.Reflection;
using System.Web.Script.Services;
using System.Collections;

public partial class frmOrderPunching_Telecaller : System.Web.UI.Page
{
    SqlConnection con = null;
    SqlCommand cmd = null;
    SqlDataAdapter da = null;
    SqlDataReader dr;
    DataTable dt = null;
    DataSet ds = null;
    string strConn = ConfigurationManager.AppSettings["strConn"];

    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["LoginID"] == null || Session["IsFiveStarApplicable"] == null)
        {
            Response.Redirect("~/SessionExpiredpage.aspx");
            return;
        }
        if (!IsPostBack)
        {
            hdnCurrentDate.Value = DateTime.Now.ToString();
            hdnDlvryWeeklyOffDay.Value = Convert.ToString(Session["DlvryWeeklyOffDay"]);
            Session["flgOperationalLevel"] = "0";
            Session["flgBatchWiseTrns"] = "0";
            Session["flgOrderInvoicingDirectProcessing"] = "0";
            Session["flgCessApplicable"] = "0";
            hdnflgReleasingForTesting.Value = Session["flgReleasingForTesting"] == null ? "0" : Convert.ToString(Session["flgReleasingForTesting"]);

            hdnIsFiveStarApplicable.Value = Session["IsFiveStarApplicable"] == null ? "0" : Convert.ToString(Session["IsFiveStarApplicable"]);
            hdnLoginId.Value = Session["LoginID"].ToString();
            hdnRoleId.Value = Session["RoleId"].ToString();
            hdnTokenNo.Value = Convert.ToString(Session["TokenNo"]);
            //lblflgOffine.InnerHtml = ">>Tele Order";
            hdnflgOffline.Value = "7";

            //if (Request.QueryString["flgOffline"].ToString() == "7")
            //{
            //string str = "5526287^1849^140^30896538^9993545965^^1";// Not working
            //"7706213^1849^140^30896536^8817777079^^1" working
            string str = Request.QueryString["strNewStoreDetailTelecaller"] == null ? "0" : Request.QueryString["strNewStoreDetailTelecaller"].ToString();// "5^ABC^2^1";//StoreId^StoreName^flgApproved^flgGST
            hdnNewStoreDetail.Value = str;

            //}
        }

    }

    //Get Scheme And Product Detail Bases on Store
    [System.Web.Services.WebMethod()]
    public static object fnSchemeDetailByStore(int storeid, DateTime dt)
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        StringBuilder strHML = new StringBuilder();
        object strResult = "";
        try
        {
            string storedProcName = "spSchemeDetailByStore";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@storeid", storeid),
                   new SqlParameter("@Date", dt)
                };
            DataSet Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            strResult = JsonConvert.SerializeObject(Ds, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
        }
        catch (Exception ex)
        {
            strResult = "2|" + ex.Message;
        }
        finally
        {
            con.Dispose();
        }

        return strResult;
    }

    //Get Scheme And Product Detail Bases on Store
    [System.Web.Services.WebMethod()]
    public static object fnGetSchemeMasterPopupDetail(int SchemeId)
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        StringBuilder strHML = new StringBuilder();
        object strResult = "";
        try
        {
            string storedProcName = "spGetSchemeMasterPopupDetail";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@SchemeId", SchemeId)
                };
            DataSet Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            strResult = JsonConvert.SerializeObject(Ds, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
        }
        catch (Exception ex)
        {
            strResult = "2|" + ex.Message;
        }
        finally
        {
            con.Dispose();
        }

        return strResult;
    }



    //Get Order list  Bases on Store
    [System.Web.Services.WebMethod()]
    public static object fnGetLastOrders(int storeid, int TeleCallingId, int RoleId, int flgReleasingForTesting)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        StringBuilder strHML = new StringBuilder();
        object strResult = "";
        try
        {
            //storeid = 3895912;
            //TeleCallingId = 7468340;

            string storedProcName = RoleId == 10 ? "spGetOrderProductList_DSE" : (flgReleasingForTesting == 1 ? "spGetOrderProductList_ToBeImplement" : "spGetOrderProductList");
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@StoreId",storeid),
                   new SqlParameter("@TeleCallingId",TeleCallingId)
                };
            DataSet Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
            strResult = JsonConvert.SerializeObject(Ds, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
        }
        catch (Exception ex)
        {
            strResult = "2|" + ex.Message;
        }
        finally
        {
            con.Dispose();
        }

        return strResult;
    }




    //spViewOrderDetail
    [System.Web.Services.WebMethod()]
    public static object fnViewOrderDetail(int OrderId, int PrcsId)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        SqlCommand cmd = null;
        DataSet ds = null;
        SqlDataAdapter da;
        object ViewOrderDetail;
        try
        {
            cmd = new SqlCommand("spViewOrderDetail", con);
            cmd.Parameters.AddWithValue("@OrderId", OrderId);
            cmd.Parameters.AddWithValue("@PrcsId", PrcsId);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 0;
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds);
            ViewOrderDetail = "1~" + JsonConvert.SerializeObject(ds, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
        }
        catch (Exception ex)
        {
            ViewOrderDetail = "2~" + ex.Message;
            string ProjectTitle = ConfigurationManager.AppSettings["Title"];
            //clsSendLogMail.fnSendLogMail(ex.Message, ex.ToString(), "Order Punching", "spViewOrderDetail", "Error in Order Punching in " + ProjectTitle);
        }
        finally
        {
            cmd.Dispose();
            con.Dispose();
            con.Close();
        }
        return ViewOrderDetail;
    }


    //Get Order list  Bases on Store
    [System.Web.Services.WebMethod()]
    public static object fnUpdateAlternateNoForTeleCaller(string AlternateContactNo, int TeleCallingId, int LoginId)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        StringBuilder strHML = new StringBuilder();
        object strResult = "";
        try
        {
            con.Open();
            string storedProcName = "spUpdateAlternateNoForTeleCaller";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@TeleCallingId",TeleCallingId),
                   new SqlParameter("@AlternateContactNo",AlternateContactNo),
                   new SqlParameter("@LoginId",LoginId),
                };
            clsDbCommand.ExecuteQueryProcedure(storedProcName, con, sp);
        }
        catch (Exception ex)
        {
            strResult = "2|" + ex.Message;
        }
        finally
        {
            con.Dispose();
        }

        return strResult;
    }


    [System.Web.Services.WebMethod()]
    public static object fnUpdateLeapTaskStatus(int TaskId, int StatusId, int flgOrderSource, int TeleCallingId, int LoginId)
    {
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        StringBuilder strHML = new StringBuilder();
        object strResult = "";
        try
        {
            con.Open();
            string storedProcName = "spUpdateLeapTaskStatus";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   new SqlParameter("@TeleCallingId",TeleCallingId),
                   new SqlParameter("@flgOrderSource",flgOrderSource),
                   new SqlParameter("@TaskId",TaskId),
                    new SqlParameter("@StatusId",StatusId),
                   new SqlParameter("@LoginId",LoginId),
                };
            clsDbCommand.ExecuteQueryProcedure(storedProcName, con, sp);
        }
        catch (Exception ex)
        {
            strResult = "2|" + ex.Message;
        }
        finally
        {
            con.Dispose();
        }

        return strResult;
    }




    [System.Web.Services.WebMethod()]
    public static string fnspPopulateOrderDetail(object OrderMaster, object OrderDetail, object OrderSchemeDet, int flgProductive, int TeleCallID, int ReasonId, string ScheduleCall, string SalesNodeId, string SalesNodeType, string LoginID, object objStarsDet)
    {
        string ProjectTitle = ConfigurationManager.AppSettings["Title"];
        string orderDetail = "";

        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        SqlTransaction transaction;
        con.Open();
        transaction = con.BeginTransaction();
        try
        {
            string strOrderMaster = JsonConvert.SerializeObject(OrderMaster, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
            DataTable tblOrderMaster = JsonConvert.DeserializeObject<DataTable>(strOrderMaster);
            tblOrderMaster.TableName = "tblOrderMaster";

            List<SqlParameter> sp;
            string storedProcName = "";
            if (flgProductive == 0)
            {
                storedProcName = "spSubmitForNoOrder";
                DateTime dttime = DateTime.Now;
                sp = new List<SqlParameter>()
                    {
                    new SqlParameter("@TeleCallingId ", TeleCallID),
                    new SqlParameter("@ReasonId", ReasonId),
                    new SqlParameter("@ScheduleCall", ScheduleCall),
                    new SqlParameter("@Loginid", Convert.ToInt32(LoginID)),
                    new SqlParameter("@Remarks", tblOrderMaster.Rows[0]["Remarks"]),
                    new SqlParameter("@DSEComments", tblOrderMaster.Rows[0]["DSEComments"]),
                    new SqlParameter("@DSEIssueIds", tblOrderMaster.Rows[0]["DSEIssueIds"])
                };
                DataSet dstelecall = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, transaction, sp);
                orderDetail = "Call Done " + (ScheduleCall != "" ? "and scheduled " : "") + "Successfully!!!^1^" + TeleCallID;
                transaction.Commit();

                storedProcName = "spGetSMSDetailForTASOrder";
                sp = new List<SqlParameter>()
                    {
                    new SqlParameter("@ReasonId", ReasonId),
                    new SqlParameter("@TeleCallingId", TeleCallID),
                    new SqlParameter("@BranchNodeId", SalesNodeId),
                    new SqlParameter("@BranchNodeType", SalesNodeType)
                };
                DataSet dsList = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);
                string StoreName = tblOrderMaster.Rows[0]["ReasonText"].ToString();
                string StoreId = tblOrderMaster.Rows[0]["OrderByCustomerNodeId"].ToString();
                foreach (DataRow tcdr in dsList.Tables[0].Rows)
                {
                    string token = tcdr["FCMTokenNo"].ToString();
                    string Msg = tcdr["SMS"].ToString();
                    string flag = "102";
                    string MobNo = tcdr["MobNo"].ToString();
                    string strSucces = clsHttpRequest.SendNotification(token, Msg, flag, MobNo, StoreId, StoreName);
                }
            }
            else
            {
                DataTable tblOrderDetail;

                string strOrderDetail = JsonConvert.SerializeObject(OrderDetail, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
                tblOrderDetail = JsonConvert.DeserializeObject<DataTable>(strOrderDetail);
                tblOrderDetail.TableName = "tblOrderDetail";

                //string tblOrderSchemeDet=
                string strOrderSchemeDet = JsonConvert.SerializeObject(OrderSchemeDet, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
                DataTable tblOrderSchemeDet = JsonConvert.DeserializeObject<DataTable>(strOrderSchemeDet);
                tblOrderSchemeDet.TableName = "tblOrderSchemeDet";

                string strStarsDet = JsonConvert.SerializeObject(objStarsDet, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
                DataTable DTStarsDet = JsonConvert.DeserializeObject<DataTable>(strStarsDet);
                DTStarsDet.TableName = "tblStarsDet";
                if (DTStarsDet.Columns.Count == 0)
                {
                    DTStarsDet.Columns.Add(new DataColumn("ParametrId", typeof(Int32)));
                    DTStarsDet.Columns.Add(new DataColumn("IsAchieved", typeof(Int32)));
                }


                DataTable dtOrderSchemeDet = new DataTable();
                dtOrderSchemeDet.TableName = "tblOrderSchemeDet";
                dtOrderSchemeDet.Columns.Add(new DataColumn("PrdID", typeof(Int32)));
                dtOrderSchemeDet.Columns.Add(new DataColumn("SchemeSlabID", typeof(Int32)));
                dtOrderSchemeDet.Columns.Add(new DataColumn("SchemeSlabSubBucketType", typeof(Int32)));
                dtOrderSchemeDet.Columns.Add(new DataColumn("BenefitSubBucketType", typeof(float)));
                dtOrderSchemeDet.Columns.Add(new DataColumn("FreePrdID", typeof(Int32)));
                dtOrderSchemeDet.Columns.Add(new DataColumn("BenefitSubBucketVal", typeof(float)));
                dtOrderSchemeDet.Columns.Add(new DataColumn("BenefitAssignedVal", typeof(float)));
                dtOrderSchemeDet.Columns.Add(new DataColumn("BenefitDiscountApp", typeof(float)));
                dtOrderSchemeDet.Columns.Add(new DataColumn("BenefitCouponCode", typeof(string)));
                dtOrderSchemeDet.Columns.Add(new DataColumn("flgDiscOnTotAmt", typeof(Int32)));
                dtOrderSchemeDet.Columns.Add(new DataColumn("IsApply", typeof(Int32)));



                StringBuilder strBenifit = new StringBuilder();
                for (int i = 0; i < tblOrderSchemeDet.Rows.Count; i++)
                {
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["storeID"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["ProductID"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["schemeId"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["schemeSlabId"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["schemeSlabBcktId"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["schemeSlabSubBcktVal"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["schemeSubBucktValType"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["schemeSlabSubBucktType"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["benifitRowId"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["benSubBucketType"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["freeProductId"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["benifitSubBucketValue"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["benifitMaxValue"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["benifitAssignedVal"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["benifitAssignedValueType"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["benifitDiscountApplied"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["benifitCoupnCode"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["per"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["UOM"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["WhatFinallyApplied"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["schSlbRowId"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["SchTypeId"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["TotalWeightage"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["Prorata"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["exceptionvalue"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["withoutexceptionbenvalue"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["flgAddOnScheme"]);
                    strBenifit.Append("~");
                    strBenifit.Append(tblOrderSchemeDet.Rows[i]["flgAddOnBenefit"]);
                    strBenifit.Append("~");
                    strBenifit.Append(0);
                    strBenifit.Append("~");
                    strBenifit.Append(0);
                    strBenifit.Append("|");

                    DataRow dRow = dtOrderSchemeDet.NewRow();
                    dRow["PrdID"] = Convert.ToInt32(tblOrderSchemeDet.Rows[i]["ProductID"]);
                    dRow["SchemeSlabID"] = Convert.ToInt32(tblOrderSchemeDet.Rows[i]["schemeSlabId"]);
                    dRow["SchemeSlabSubBucketType"] = Convert.ToInt32(tblOrderSchemeDet.Rows[i]["schemeSlabSubBucktType"]);
                    dRow["BenefitSubBucketType"] = Convert.ToInt32(tblOrderSchemeDet.Rows[i]["benSubBucketType"]);
                    dRow["FreePrdID"] = Convert.ToInt32(tblOrderSchemeDet.Rows[i]["freeProductId"]);
                    dRow["BenefitSubBucketVal"] = Convert.ToDouble(tblOrderSchemeDet.Rows[i]["benifitSubBucketValue"]);
                    dRow["BenefitAssignedVal"] = Convert.ToDouble(tblOrderSchemeDet.Rows[i]["benifitAssignedVal"]);
                    dRow["BenefitDiscountApp"] = Convert.ToDouble(tblOrderSchemeDet.Rows[i]["benifitDiscountApplied"]);
                    dRow["BenefitCouponCode"] = Convert.ToString(tblOrderSchemeDet.Rows[i]["benifitCoupnCode"]);
                    dRow["flgDiscOnTotAmt"] = 0;
                    dRow["IsApply"] = 0;
                    dtOrderSchemeDet.Rows.Add(dRow);
                }


                storedProcName = "spPopulateOrder";
                sp = new List<SqlParameter>()
{
               new SqlParameter("@OrderId", Convert.ToInt32(tblOrderMaster.Rows[0]["OrderId"])),
                new SqlParameter("@OrderDate", Convert.ToDateTime(tblOrderMaster.Rows[0]["OrderDate"])),
                new SqlParameter("@OrderByCustomerNodeId", Convert.ToInt32(tblOrderMaster.Rows[0]["OrderByCustomerNodeId"])),
                new SqlParameter("@OrderByCustomerNodeType", Convert.ToInt32(tblOrderMaster.Rows[0]["OrderByCustomerNodeType"])),
                new SqlParameter("@CustomerPONo", "0"),
                new SqlParameter("@CustomerPODate", DateTime.Now),
                new SqlParameter("@Remarks", HttpUtility.HtmlEncode(tblOrderMaster.Rows[0]["Remarks"])),
                new SqlParameter("@NetOrderValue", tblOrderMaster.Rows[0]["NetOrderValue"]),
                new SqlParameter("@OrderStatusId", tblOrderMaster.Rows[0]["OrderStatusId"]),
                new SqlParameter("@flgOrderClosed", tblOrderMaster.Rows[0]["flgOrderClosed"]),
                new SqlParameter("@SalesPersonId", tblOrderMaster.Rows[0]["SalesPersonId"]),
                new SqlParameter("@SalesPersonNodeType", tblOrderMaster.Rows[0]["SalesPersonNodeType"]),
                new SqlParameter("@OrderSourceID", tblOrderMaster.Rows[0]["OrderSourceID"]),
                new SqlParameter("@Loginid", Convert.ToInt32(LoginID)),
                new SqlParameter("@strSchemeBenefit", strBenifit.ToString()),
                new SqlParameter("@flgOffline", tblOrderMaster.Rows[0]["flgOffline"]),
                new SqlParameter("@OrdPrcsId", tblOrderMaster.Rows[0]["OrdPrcsId"]),
                new SqlParameter("@ReasonId", tblOrderMaster.Rows[0]["ReasonId"]),
                new SqlParameter("@ReasonText", HttpUtility.HtmlEncode(tblOrderMaster.Rows[0]["ReasonText"])),
                new SqlParameter("@BranchNodeId", Convert.ToInt32(SalesNodeId)),
                new SqlParameter("@BranchNodeType", Convert.ToInt32(SalesNodeType)),
                new SqlParameter("@OrderDetail", tblOrderDetail),
                new SqlParameter("@TeleCallID", TeleCallID),
                new SqlParameter("@DeliveryDate", Convert.ToDateTime(tblOrderMaster.Rows[0]["DeliveryDate"])),
                new SqlParameter("@OrderSchemeDet", dtOrderSchemeDet),
                new SqlParameter("@TotOrderVal", tblOrderMaster.Rows[0]["TotOrderVal"]),
                new SqlParameter("@TotMRPValue", tblOrderMaster.Rows[0]["TotMRPValue"]),
                new SqlParameter("@TotLineLevelDisc", tblOrderMaster.Rows[0]["TotLineLevelDisc"]),
                new SqlParameter("@TotDiscVal", tblOrderMaster.Rows[0]["TotDiscVal"]),
                new SqlParameter("@GPValue", tblOrderMaster.Rows[0]["GPValue"]),
                new SqlParameter("@FocBndAlrAch", tblOrderMaster.Rows[0]["FocBndAlrAch"]),
                new SqlParameter("@FocBndNowAch", tblOrderMaster.Rows[0]["FocBndNowAch"]),
                new SqlParameter("@FocBndSBFOrd", tblOrderMaster.Rows[0]["FocBndSBFOrd"]),
                new SqlParameter("@FocBndSBFQtyOrd", tblOrderMaster.Rows[0]["FocBndSBFQtyOrd"]),
                new SqlParameter("@FocBndSBFValueOrd", tblOrderMaster.Rows[0]["FocBndSBFValueOrd"]),
                new SqlParameter("@SBDSBFOrd", tblOrderMaster.Rows[0]["SBDSBFOrd"]),
                new SqlParameter("@SBDTotalGap", tblOrderMaster.Rows[0]["SBDTotalGap"]),
                new SqlParameter("@NoOfLSSAct", tblOrderMaster.Rows[0]["NoOfLSSAct"]),
                new SqlParameter("@FiveStar", tblOrderMaster.Rows[0]["FiveStar"]),
                new SqlParameter("@StarsDet", DTStarsDet),
                new SqlParameter("@DSEComments", HttpUtility.HtmlEncode(tblOrderMaster.Rows[0]["DSEComments"])),
                new SqlParameter("@DSEIssueIds", tblOrderMaster.Rows[0]["DSEIssueIds"])

                    };
                DataSet ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, transaction, sp);
                string OrderId = ds.Tables[0].Rows[0][0].ToString();
                orderDetail = "Saved Successfully!!!^1^" + OrderId;
                transaction.Commit();
            }
        }
        catch (Exception ex)
        {
            orderDetail = ex.Message + "^2";
            transaction.Rollback();
        }
        finally
        {
            con.Close();
            con.Dispose();
        }

        return orderDetail;
    }


}