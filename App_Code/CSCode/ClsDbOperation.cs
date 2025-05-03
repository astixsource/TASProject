using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Data.SqlClient;
/// <summary>
/// Summary description for DbOperation
/// </summary>
public class ClsDbOperation
{
    string strConn = ConfigurationManager.AppSettings["strConn"];
    DataTable dtmnth;

    public ClsDbOperation()
    {

    }
    public DataTable FnGetRouteOfDistr(int DistrId)
    {
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spFillcombo");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.Parameters.AddWithValue("@TypeId", 10);
        SqlCmd.Parameters.AddWithValue("@ID", DistrId);
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }
    public DataTable FnGetStoreOfDistr(int DistrId)
    {
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spFillcombo");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.Parameters.AddWithValue("@TypeId", 11);
        SqlCmd.Parameters.AddWithValue("@ID", DistrId);
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }
    public DataTable FnGetDistributor(int DistrId)
    {
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spFillcombo");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.Parameters.AddWithValue("@TypeId", 9);
        SqlCmd.Parameters.AddWithValue("@ID", DistrId);
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }

    public DataTable FnGetStoreOfRoute(int RouteId, String TxtDate)
    {
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spGetRouteStorePhotosDetailsForDdl");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.Parameters.AddWithValue("@RouteID", RouteId);

        SqlCmd.Parameters.AddWithValue("@PhotoDate", TxtDate);
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }
    public DataTable FnGetStoreOfRouteForDiffDate(int RouteId, String FromDate, String ToDate)
    {
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spGetRouteStorePhotosDetailsForDdlDateRangeWise");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.Parameters.AddWithValue("@RouteID", RouteId);
        SqlCmd.Parameters.AddWithValue("@PhotoStartDate", FromDate);
        SqlCmd.Parameters.AddWithValue("@PhotoEndDate", ToDate);
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }
    public DataSet FnGetRetailerPurchase(int RouteId, String TxtFromDate, String TxtEndDate)
    {
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spRptPruchaseByRetailers");
        SqlCmd.CommandTimeout = 0;
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.Parameters.AddWithValue("@FromDate", TxtFromDate);
        SqlCmd.Parameters.AddWithValue("@EndDate", TxtEndDate);
        SqlCmd.Parameters.AddWithValue("@RouteID", RouteId);
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataSet Dt = new DataSet();
        SqlDa.Fill(Dt);
        return Dt;
    }
    public DataTable GetNodesFromParentNodeForGraph(string PNodeType, string PNodeId, string NodeType)
    {
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spGetNodesFromParentNodeForGraph");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.Parameters.AddWithValue("@PNodeType", PNodeType);
        SqlCmd.Parameters.AddWithValue("@PNodeId", PNodeId);
        SqlCmd.Parameters.AddWithValue("@NodeType", NodeType);
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }

    public DataTable FnGetCategory(string TxtDate)
    {
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spGetCategory");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.Parameters.AddWithValue("@WeekID", TxtDate.ToString());
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }

    public DataTable FnGetMeasure()
    {
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("SpGetMeasureNames");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        // SqlCmd.Parameters.AddWithValue("@WeekID", TxtDate.ToString());
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }
    public DataTable FnGetGraphTypeCombination()
    {
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("SpGetGraphTypeCombination");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        // SqlCmd.Parameters.AddWithValue("@WeekID", TxtDate.ToString());
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }
    public DataTable FnGetGroupByOption(int GroupById)
    {

        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("SpGetGroupByLvlOnHierType");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.Parameters.AddWithValue("@HierTypeID", GroupById);
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        if (Dt.Rows.Count > 0)
        {
            DataRow drw = Dt.NewRow();
            drw["NodeType"] = "0";
            drw["NodeTypeDesc"] = "<--Select-->";
            if (GroupById == 2)
                drw["flgBusinessType"] = "0";
            Dt.Rows.InsertAt(drw, 0);
        }
        return Dt;
    }
    public DataTable FnGetTimeLevel(int typeId)
    {

        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spGetTimeLevels");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataSet Ds = new DataSet();
        SqlDa.Fill(Ds);
        if (Ds.Tables.Count > 0)
        {
            if (typeId == 2)
            {
                DataRow drw = Ds.Tables[1].NewRow();
                drw["Month"] = "<--Select-->";
                drw["HireId"] = "0";
                Ds.Tables[1].Rows.InsertAt(drw, 0);
            }
            if (typeId == 3)
            {
                DataRow drw = Ds.Tables[2].NewRow();
                drw["WeekEnding"] = "<--Select-->";
                drw["HireId"] = "0";
                Ds.Tables[2].Rows.InsertAt(drw, 0);
            }
        }
        if (typeId == 1)
            return Ds.Tables[0];
        else if (typeId == 2)
            return Ds.Tables[1];
        else if (typeId == 3)
            return Ds.Tables[2];
        else
            return Ds.Tables[0];
    }
    public DataTable FnGetFilterName(int filterType, string strParameter)
    {

        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spGetFilterName");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.Parameters.AddWithValue("@FilterType", filterType);
        SqlCmd.Parameters.AddWithValue("@strParameter", strParameter);
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }
    public DataSet FnGetInvListByStore(int storeId)
    {
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spGetPendingInvoiceDetailByCustomer");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.Parameters.AddWithValue("@CustomerId", storeId);
        SqlCmd.Parameters.AddWithValue("@CreNoteId", 0);
        SqlCmd.CommandTimeout = 0;
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataSet Dt = new DataSet();
        SqlDa.Fill(Dt);
        return Dt;
    }

    public DataSet FnGetDownloadRawData(string strTime, string strChannel, string strSalesFilter, string strProductFilter, string strDBSalesFilter, int questionId, string strView, int groupBy)
    {

        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("SpGetRawData");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.CommandTimeout = 0;
        SqlCmd.Parameters.AddWithValue("@strCompanySales", strSalesFilter);
        SqlCmd.Parameters.AddWithValue("@strDBRSales", strDBSalesFilter);
        SqlCmd.Parameters.AddWithValue("@StrProduct", strProductFilter);
        SqlCmd.Parameters.AddWithValue("@strTime", strTime);
        SqlCmd.Parameters.AddWithValue("@QuestionID", questionId);
        SqlCmd.Parameters.AddWithValue("@strViewBy", strView);
        SqlCmd.Parameters.AddWithValue("@GroupBy", groupBy);
        SqlCmd.Parameters.AddWithValue("@StrChannel", strChannel);
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataSet Dt = new DataSet();
        SqlDa.Fill(Dt);
        return Dt;
    }
	public DataSet FnGetSyncStoreDetails(int NodeID, int NodeType)
    {
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("SpGet_SyncStoreDetails");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.CommandTimeout = 0;
        SqlCmd.Parameters.AddWithValue("@NodeID", NodeID);
        SqlCmd.Parameters.AddWithValue("@NodeType", NodeType);
        SqlCmd.Parameters.AddWithValue("@strStoreCategory","");
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataSet Dt = new DataSet();
        SqlDa.Fill(Dt);
        return Dt;
    }
	public DataTable FnGetStorePotential()
    {

        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spGetStorePotentialTypeMstr");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.CommandTimeout = 0;
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }
    public DataTable FnGetStoreAccountType()
    {

        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spGetStoreAccountTypeMstr");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.CommandTimeout = 0;
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }
	public DataTable FnGetTradeChannel()
    {

        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spStoreAttr_GetTradeChannel");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.CommandTimeout = 0;
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }
	public DataTable FnGetStoreType()
    {

        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("SpGetStoreTypeMstr");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.CommandTimeout = 0;
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }
	 public DataTable FnGetRouteMaster(int nodeId,int nodeType)
    {

        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spGetRouteMaster");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.CommandTimeout = 0;
        SqlCmd.Parameters.AddWithValue("@NodeId", nodeId);
        SqlCmd.Parameters.AddWithValue("@NodeType", nodeType);
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }
	public DataTable FnGetStoreAccountTypeStoreDetails()
    {

        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("SpStoreAttr_Get_StoreAcTypeMstr");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.CommandTimeout = 0;
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }
    public DataSet FnGetStoreDetails(int NodeId, int NodeType, string strStoreType, string strTradeChannel, string strAccountType, string strPotentialType)
    {

        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spRptStoreDetails");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.CommandTimeout = 0;
        SqlCmd.Parameters.AddWithValue("@strStoreType", strStoreType);
        SqlCmd.Parameters.AddWithValue("@strTradeChannel", strTradeChannel);
        SqlCmd.Parameters.AddWithValue("@strAccountType", strAccountType);
        SqlCmd.Parameters.AddWithValue("@strPotentialType", strPotentialType);
        SqlCmd.Parameters.AddWithValue("@NodeId", NodeId);
        SqlCmd.Parameters.AddWithValue("@NodeType", NodeType);
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataSet Dt = new DataSet();
        SqlDa.Fill(Dt);
        return Dt;
    }
	 public DataSet FnGetDSRRouteDetails(int NodeId, int NodeType, string strweek, int showtype)
    {

        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spRptRouteDetails");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.CommandTimeout = 0;     
        SqlCmd.Parameters.AddWithValue("@NodeId", NodeId);
        SqlCmd.Parameters.AddWithValue("@NodeType", NodeType);
        SqlCmd.Parameters.AddWithValue("@Week", strweek);
        SqlCmd.Parameters.AddWithValue("@ShowOption", showtype);
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataSet Dt = new DataSet();
        SqlDa.Fill(Dt);
        return Dt;
    }
	   public DataTable FnGetHireType()
    {

        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spDashboardGetHierType");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        if (Dt.Rows.Count > 0)
        {
            DataRow drw = Dt.NewRow();
            drw["HierTypeId"] = "0";
            drw["HierTypeDescr"] = "<--Select-->";
            Dt.Rows.InsertAt(drw, 0);
        }
        return Dt;
    }
    public DataTable FnGetSalesHierarchyLevel()
    {

        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spGetSalesHierarchyLevel");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        if (Dt.Rows.Count > 0)
        {
            DataRow drw = Dt.NewRow();
            drw["NodeType"] = "0";
            drw["Descr"] = "<--Select-->";
            Dt.Rows.InsertAt(drw, 0);
        }
        return Dt;
    }
    public DataTable FnGetProductHierarchyLevel()
    {

        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spGetProductHierarchyLevel");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        if (Dt.Rows.Count > 0)
        {
            DataRow drw = Dt.NewRow();
            drw["NodeType"] = "0";
            drw["Descr"] = "<--Select-->";
            Dt.Rows.InsertAt(drw, 0);
        }
        return Dt;
    }
	 public DataTable FnGetProductLevel()
    {
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spRptGetProductLevel");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.CommandTimeout = 0;
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }
	public DataSet FnGetDistributionReportWithFDP(string time, int valueType, int businesslineId, int noofDays, string strCompanySales, string strDBRSales, string strProduct, int loginId, string acStore, string hasStore, string channel)
    {
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("SpMDXQuery_DistributionReportBasedonNoOfDays");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.CommandTimeout = 0;
        SqlCmd.Parameters.AddWithValue("@ReportDate", time);
        SqlCmd.Parameters.AddWithValue("@ValType", valueType);
        SqlCmd.Parameters.AddWithValue("@ProductLevelId", businesslineId);
        SqlCmd.Parameters.AddWithValue("@NoOfDays", noofDays);
        SqlCmd.Parameters.AddWithValue("@strCompanySales", strCompanySales);
        SqlCmd.Parameters.AddWithValue("@strDBRSales", strDBRSales);
        SqlCmd.Parameters.AddWithValue("@strProduct", strProduct);
        SqlCmd.Parameters.AddWithValue("@LoginId", loginId);
        //SqlCmd.Parameters.AddWithValue("@StrACStore", acStore);
        //SqlCmd.Parameters.AddWithValue("@StrHasRefrig", hasStore);
        SqlCmd.Parameters.AddWithValue("@StrChannel", channel);
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataSet Dt = new DataSet();
        SqlDa.Fill(Dt);
        return Dt;
    }
	public DataSet FnGetDistributionWithGraphReport(int routeId, int personId)
    {
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("SpMDXQuery_DistributionReport_WorkingOutlets");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.CommandTimeout = 0;
        SqlCmd.Parameters.AddWithValue("@ASMAreaNodeId", routeId);
        SqlCmd.Parameters.AddWithValue("@ASMAreaNodeType", personId);
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataSet Dt = new DataSet();
        SqlDa.Fill(Dt);
        return Dt;
    }
	  public DataSet FnGetDistributionWorkingSKUs(int productNodeId, int productNodeType)
    {
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("SpMDXQuery_DistributionReport_WorkingSKUs");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.CommandTimeout = 0;
        SqlCmd.Parameters.AddWithValue("@PrdNodeId", productNodeId);
        SqlCmd.Parameters.AddWithValue("@PrdNodeType", productNodeType);
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataSet Dt = new DataSet();
        SqlDa.Fill(Dt);
        return Dt;
    }
	 public DataTable FnGetWorkingSKUProductName()
    {
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spGetFDPProductListForDistributionReport");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }
	public DataTable FnGetCityMaster()
    {

        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("SpGetCityList");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.CommandTimeout = 0;
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }
    public DataTable FnGetStoreCategoryMaster()
    {
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("SpGetOutletCategory");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.CommandTimeout = 0;
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }
    public DataTable FnGetMejiInputStoreDisplay()
    {

        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("SpGetStoreDisplay");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.CommandTimeout = 0;
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }
public DataSet FnGetStoreList(int storeId)
    {
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spGetReceiptInvoice");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.Parameters.AddWithValue("@StoreId", storeId);
        SqlCmd.Parameters.AddWithValue("@RcptId", 0);
        SqlCmd.CommandTimeout = 0;
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataSet Dt = new DataSet();
        SqlDa.Fill(Dt);
        return Dt;
    }
public DataSet FnGetBankList()
    {
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spGetBankDetail");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.CommandTimeout = 0;
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataSet Dt = new DataSet();
        SqlDa.Fill(Dt);
        return Dt;
    }
}

public class getstocklst
{
    public string MonthName;
    public string ClosingQty;
}
public class getNDlst
{
    public string DistributorID;
    public string ProductID;
    public string ClosingStock;
    public string ND;
    public string Pkey;
}