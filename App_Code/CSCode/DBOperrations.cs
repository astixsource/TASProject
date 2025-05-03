using System;
using System.Collections;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
/// <summary>
/// Summary description for DBOperrations
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[System.Web.Script.Services.ScriptService]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
public class DBOperrations : System.Web.Services.WebService {
    string strConn = ConfigurationManager.AppSettings["strConn"];
    SqlConnection SqlConn; SqlCommand SqlCmd; DataSet Ds; DataTable Dt;
    public DBOperrations () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod()]
    [System.Web.Script.Services.ScriptMethod()]
    public string[] HelloWorld() {
        string[] arr = new string[2];
        arr[0] = "a"; arr[1] = "b";
        return arr;
        //return "Hello World";
    }
    [WebMethod]
    [System.Web.Script.Services.ScriptMethod()]
    public DataTable FnGetRouteDetails(int RouteId)
    {
        string strConn = ConfigurationManager.AppSettings["strConn"];
        DataTable Dt = new DataTable();
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("spFillcombo");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.Parameters.AddWithValue("@TypeId", 6);
        SqlCmd.Parameters.AddWithValue("@ID", RouteId);
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        SqlDa.Fill(Dt);
        return Dt;
    }
    [WebMethod]
    [System.Web.Script.Services.ScriptMethod()]
    public DataTable FnGetRouteMapDet1(string Date, string RouteId)
    {
        string strConn = ConfigurationManager.AppSettings["strConn"];
        DataTable Dt = new DataTable();
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("[spGetRouteDetailForMap]");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.Parameters.AddWithValue("@Date", Date);
        SqlCmd.Parameters.AddWithValue("@RouteID", Convert.ToInt32(RouteId));
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        SqlDa.Fill(Dt);
        return Dt;
    }
    [WebMethod]
    [System.Web.Script.Services.ScriptMethod()]
    public string FnGetRouteMapDet2(string Date, string RouteId)
    {
        string strConn = ConfigurationManager.AppSettings["strConn"];
        DataTable Dt = new DataTable();
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("[spGetRouteDetailForMap]");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.Parameters.AddWithValue("@Date", Date);
        SqlCmd.Parameters.AddWithValue("@RouteID", Convert.ToInt32(RouteId));
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        SqlDa.Fill(Dt);
        string result = "";
        foreach (DataRow dr in Dt.Rows)
        {
            result = result + Convert.ToString(dr["RetailerName"]) + "^" + Convert.ToString(dr["OwnerName"]) + "^" + Convert.ToString(dr["Address"]) + "^";
            result = result + Convert.ToString(dr["Lat"]) + "^" + Convert.ToString(dr["Lon"]) + "^" + Convert.ToString(dr["StoreTypeId"]) + "|";
        }
        if (result.Length > 0)
        {
            result = result.Substring(0, result.Length - 1);
        }
        return result;
    }
    [WebMethod]
    [System.Web.Script.Services.ScriptMethod()]
    public string[] FnGetRouteMapDet(string Date, string RouteId, int chkActiveStore)
    {
        string strConn = ConfigurationManager.AppSettings["strConn"];
        DataSet Ds = new DataSet();
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("[spGetRouteDetailForMapTemp2]");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.CommandTimeout = 0;
        SqlCmd.Parameters.AddWithValue("@Date", Convert.ToDateTime(Date).ToString("dd-MMM-yyyy"));
        SqlCmd.Parameters.AddWithValue("@RouteID", Convert.ToInt32(RouteId));
        SqlCmd.Parameters.AddWithValue("@IsActive", chkActiveStore);
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        SqlDa.Fill(Ds);
        string result = ""; 
        string[] arrResult = new string[4];
        foreach (DataRow dr in Ds.Tables[0].Rows)
        {
            result = result + Convert.ToString(dr["RetailerName"]) + "^" + Convert.ToString(dr["OwnerName"]) + "^" + Convert.ToString(dr["Address"]) + "^";
            result = result + Convert.ToString(dr["Lat"]) + "^" + Convert.ToString(dr["Lon"]) + "^" + Convert.ToString(dr["StoreTypeId"]) + "^" + Convert.ToString(dr["RetailerId"]) + "|";
        }
        if (result.Length > 0)
            result = result.Substring(0, result.Length - 1);
        arrResult[0] = result;
        //arrResult[0] = "a";

        result = "";
        foreach (DataRow dr in Ds.Tables[1].Rows)
        {
            if (Convert.ToString(dr["Lat"]).Length > 0)
            {
                //result = result + Convert.ToString(dr["RetailerName"]) + "^" + Convert.ToString(dr["OwnerName"]) + "^" + Convert.ToString(dr["Address"]) + "^";
                //result = result + Convert.ToString(dr["Lat"]) + "^" + Convert.ToString(dr["Lon"]) + "^" + Convert.ToString(dr["StoreTypeId"]) + "^" + DateTime.ParseExact(Convert.ToDateTime(dr["VisitStartTS"]).ToString("HH:MM"), "HH:mm", null).ToString("hh:mm tt") + "^" + Convert.ToString(dr["RetailerId"]) + "^" + DateTime.ParseExact(Convert.ToDateTime(dr["VisitEndTS"]).ToString("HH:MM"), "HH:mm", null).ToString("hh:mm tt") + "^";
                //result = result + Convert.ToString(dr["NetOrderVal"]) + "|";
                result = result + Convert.ToString(dr["RetailerName"]) + "^" + Convert.ToString(dr["OwnerName"]) + "^" + Convert.ToString(dr["Address"]) + "^";
                result = result + Convert.ToString(dr["Lat"]) + "^" + Convert.ToString(dr["Lon"]) + "^" + Convert.ToString(dr["StoreTypeId"]) + "^" + DateTime.ParseExact(Convert.ToDateTime(dr["VisitStartTS"].ToString().Split(' ')[1]).ToString("HH:mm"), "HH:mm", null).ToString("hh:mm tt") + "^" + Convert.ToString(dr["RetailerId"]) + "^" + DateTime.ParseExact(Convert.ToDateTime(dr["VisitEndTS"].ToString().Split(' ')[1]).ToString("HH:mm"), "HH:mm", null).ToString("hh:mm tt") + "^";
                result = result + Convert.ToString(dr["NetOrderVal"]) + "|";
            }
        }
        if (result.Length > 0)
            result = result.Substring(0, result.Length - 1);

        arrResult[1] = result;
        //arrResult[1] = "b";

        result = "";
        foreach (DataRow dr in Ds.Tables[2].Rows)
        {
            result = result + Convert.ToString(dr["RetailerId"]) + "^" + Convert.ToString(dr["RetailerName"]) + "^" + Convert.ToString(dr["OwnerName"]) + "^" + Convert.ToString(dr["Address"]) + "^";
            result = result + Convert.ToString(dr["StoreType"]) + "^" + Convert.ToString(dr["TotalBeforeTaxDis"]) + "^" + Convert.ToString(dr["TaxAmt"]) + "^";
            result += Convert.ToString(dr["TotalDis"]) + "^" + Convert.ToString(dr["InvoiceVal"]) + "^" + Convert.ToString(dr["FreeTotal"]) + "^" + Convert.ToString(dr["InvAfterDis"]) + "^" + Convert.ToString(dr["AddDis"]) + "|";
        }
        if (result.Length > 0)
            result = result.Substring(0, result.Length - 1);
        arrResult[2] = result; 
        //arrResult[2] = "c";

        result = "";
        foreach (DataRow dr in Ds.Tables[3].Rows)
        {
            result = result + Convert.ToString(dr["RetailerId"]) + "^" + Convert.ToString(dr["TransDate"]) + "^" + Convert.ToString(dr["ProdID"]) + "^" + Convert.ToString(dr["SKUCode"]) + "^";
            result = result + Convert.ToString(dr["SKUName"]) + "^" + Convert.ToString(dr["Stock"]) + "^" + Convert.ToString(dr["OrderQty"]) + "^" + Convert.ToString(dr["OrderVal"]) + "^";
            result += Convert.ToString(dr["FreeQty"]) + "^" + Convert.ToString(dr["DisVal"]) + "^" + Convert.ToString(dr["SchemeID"]) +  "^" + Convert.ToString(dr["AppliedSlab"]) + "^";
            //result += Convert.ToString(dr["SampleQuantity"]) + "^" + Convert.ToString(dr["TargetQty"]) + "|";
	    result += Convert.ToString(dr["SampleQuantity"]) + "^" + dr["TargetQty"] + "^" + dr["ClosingStock"] + "|";
        }
        if (result.Length > 0)
            result = result.Substring(0, result.Length - 1);
        arrResult[3] = result;         
        return arrResult;
    }
    [WebMethod]
    [System.Web.Script.Services.ScriptMethod()]
    public string[] FnGetRoleHierar(string NodeID, string NodeType, string Text)
    {
        string strConn = ConfigurationManager.AppSettings["strConn"];
        DataSet Ds = new DataSet();
        SqlConnection SqlConn = new SqlConnection(strConn);
        SqlCommand SqlCmd = new SqlCommand("[spGetChildLevelForGraph]");
        SqlCmd.Connection = SqlConn; SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlCmd.Parameters.AddWithValue("@NodeType", NodeType);
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        SqlDa.Fill(Ds);
        string[] result = new string[4];
        foreach (DataRow dr in Ds.Tables[0].Rows)
        {
            result[3] = result[3] + Convert.ToString(dr["NodeType"]) + "^" + Convert.ToString(dr["NodeTypeDesc"]) + "|";
        }
        result[0] = NodeID; result[1] = NodeType; result[2] = Text;
        return result;
    }
}

