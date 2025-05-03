using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ClsMenuItem
/// </summary>
public class ClsMenuItem
{
	public ClsMenuItem()
	{
        
    }

    public static string PopulateProductTree(string loginValue)
    {
        string[,] arrPara = new string[2, 2];
        arrPara[0, 0] = "0";
        arrPara[0, 1] = "0";
        arrPara[1, 0] = loginValue;
        arrPara[1, 1] = "0";

        SqlConnection objCon = new SqlConnection();
        SqlCommand objCom = new SqlCommand();
        objCom.CommandTimeout = 0;

        DataSet ds = new DataSet();
        clsConnection.clsConnection objAdo = new clsConnection.clsConnection();
        ds = objAdo.RunSPDS("spMakeTreeMenu", arrPara);

        ds.Relations.Add("rsParentChild", ds.Tables[0].Columns["HierID"], ds.Tables[0].Columns["PHierID"], false);
        int i = 0;
        //string lstlvl = ds.Tables[0].AsEnumerable().Max(tr => (Int32)tr["LstLevel"]).ToString();

        string strproduct = "";
        if (ds.Tables.Count > 0)
        {
            int marginleft = 10;
            strproduct += "<ul class='accordion-title'>";
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                if (dr["PHierID"].ToString() == "0" && dr["IndexNumP"].ToString() == "0")
                {
                    if (dr["IsLastLevel"].ToString() == "10")
                    {
                        strproduct += "<li><a class='active' href='javascript:void(0)'><span id='" + dr["HierID"].ToString() + "^" + dr["IsLastLevel"].ToString() + "'>" + dr["Descr"].ToString() + "</span><div class='marker'></div></a>";
                    }
                    else
                    {
                        strproduct += "<li nid='" + dr["HierID"].ToString() + "' onclick=\"fnAction('" + dr["HierID"].ToString() + "')\"><a href='javascript:void(0)' style='padding-left:" + (marginleft + 5) + "px'><span id='" + dr["HierID"].ToString() + "^" + dr["IsLastLevel"].ToString() + "'>" + dr["Descr"].ToString() + "</span></a>";
                    }
                    if (dr.GetChildRows("rsParentChild").Length > 0)
                    {
                        strproduct += PopulateProductChildTree(dr, marginleft);
                    }
                    strproduct += "</li>";
                }
                i = i + 1;
            }
            strproduct += "</ul>";
        }
        objAdo.CloseConnection(ref objCon, ref objCom);

        return strproduct;
    }
    private static string PopulateProductChildTree(DataRow dr, int marginleft)
    {
        string strproduct = "<ul class='accordion-body-parent'>";
        foreach (DataRow cRow in dr.GetChildRows("rsParentChild"))
        {
            if (cRow["IsLastLevel"].ToString() == "10")
            {
                strproduct += "<li><a class='active' href='javascript:void(0)' style='padding-left:" + (marginleft + 5) + "px'><span id='" + cRow["HierID"].ToString() + "^" + cRow["IsLastLevel"].ToString() + "'>" + cRow["Descr"].ToString() + "</span><div class='marker'></div></a>";
            }
            else
            {
                strproduct += "<li   nid='" + cRow["HierID"].ToString() + "' onclick=\"fnAction('" + cRow["HierID"].ToString() + "')\"><a href='javascript:void(0)' style='padding-left:" + (marginleft + 5) + "px'><span id='" + cRow["HierID"].ToString() + "^" + cRow["IsLastLevel"].ToString() + "'>" + cRow["Descr"].ToString() + "</span></a>";
            }
            if (cRow.GetChildRows("rsParentChild").Length > 0)
            {
                int marginleftt = marginleft + 8;
                strproduct += PopulateProductChildTree(cRow, marginleftt);
            }
            strproduct += "</li>";
        }
        strproduct += "</ul>";
        return strproduct;
    }
}