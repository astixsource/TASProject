<%@ WebHandler Language="C#" Class="FileSUBDUploadHandler" %>

using System;
using System.IO;
using System.Web;
using System.Data;
using System.Linq;
using System.Net.Mail;
using System.Data.SqlClient;
using System.Configuration;
using System.Text;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using System.Runtime.Serialization.Formatters.Binary;
using ExcelDataReader;
using ExcelDataReader.Core;
using System.Collections.Generic;

public class FileSUBDUploadHandler : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{

    public void ProcessRequest(HttpContext context)
    {

        if (context.Request.Files.Count > 0)
        {
            HttpFileCollection files = context.Request.Files;
            
            string LoginId = context.Request.Form["LoginId"].ToString();
            string SiteNodeId = context.Request.Form["SiteNodeId"].ToString();
            string SiteNodeType = context.Request.Form["SiteNodeType"].ToString();
            string msg = UploadExcel(files, LoginId, SiteNodeId, SiteNodeType);//postedFile
            context.Response.Write(msg);
        }

    }

    private string UploadExcel(HttpFileCollection files, string LoginId, string SiteNodeId, string SiteNodeType)//, string FileSetType HttpPostedFile File_Up
    {

        try
        {
            int isValid = 0;
            string FileSetID = "0";
            for (int i = 0; i < files.Count; i++)
            {
                HttpPostedFile File_Up = files[i];
                string filesettypeid = File_Up.FileName.Split('#')[1];
                string ErrorMsg = "";
                if (i == 0)
                {
                    SqlConnection Scon = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
                    SqlCommand Scmd = new SqlCommand();
                    Scmd.Connection = Scon;
                    Scmd.CommandText = "[spGetFileSetId]";
                    Scmd.CommandType = CommandType.StoredProcedure;
                    Scmd.Parameters.AddWithValue("@FileName", Path.GetFileName(File_Up.FileName.Split('#')[0]));
                    Scmd.Parameters.AddWithValue("@FileSetType", 6);
                    Scmd.Parameters.AddWithValue("@LoginId", LoginId);
                    Scmd.Parameters.Add("@FileSetId", SqlDbType.VarChar, 30);
                    Scmd.Parameters["@FileSetId"].Direction = ParameterDirection.Output;
                    Scon.Open();
                    Scmd.ExecuteNonQuery();
                    FileSetID = Scmd.Parameters["@FileSetId"].Value.ToString();
                    Scon.Close();
                }
                string filename = FileSetID + "_" + Path.GetFileNameWithoutExtension(File_Up.FileName.Split('#')[0]) + "_" + Convert.ToString(HttpContext.Current.Session["username"]).ToLower() + Path.GetExtension(File_Up.FileName.Split('#')[0]);
                string filePath = HttpContext.Current.Server.MapPath("Uploads/") + filename;
                File_Up.SaveAs(filePath);
                DataSet ds1 = new DataSet();
                using (FileStream oStream = File.Open(filePath, FileMode.Open, FileAccess.Read))
                {
                    IExcelDataReader iExcelDataReader = null;
                    string extension = Path.GetExtension(filePath);
                    var conf = new ExcelDataSetConfiguration
                    {
                        ConfigureDataTable = _ => new ExcelDataTableConfiguration
                        {
                            UseHeaderRow = true
                        }
                    };
                    if (extension == ".xls" || extension == ".xlsb")
                    {
                        iExcelDataReader = ExcelReaderFactory.CreateBinaryReader(oStream);
                    }
                    else if (extension == ".xlsx")
                    {
                        iExcelDataReader = ExcelReaderFactory.CreateOpenXmlReader(oStream);
                    }
                    ds1 = iExcelDataReader.AsDataSet(conf);
                }
                if (ds1.Tables.Count>0)
                {
                    if (ds1.Tables[0].Rows.Count > 0)
                    {
                        string strResp = UploadData(ds1.Tables[0], Convert.ToInt32(FileSetID), Convert.ToInt32(filesettypeid));
                        if (strResp.Split('|')[0] == "0")
                        {
                            isValid += 1;
                        }
                        else
                        {
                            return "1^No Data uploaded due to below error<br/> " + strResp.Split('|')[1];
                        }
                    }
                    else
                    {
                        return "1^No Data Available in the file!";
                    }
                }
                else
                {
                    return "1^No sheets available in the file !";
                }
            }

            if (isValid == 2)
            {
                SqlConnection Scon1 = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
                List<SqlParameter> sp = null;
                string storedProcName = "spImportSUBDDRCPPlan";
                sp = new List<SqlParameter>()
                            {
                           new SqlParameter("@FileSetId", FileSetID),
                                 new SqlParameter("@NodeId", SiteNodeId),
                                 new SqlParameter("@NodeType", SiteNodeType)
                            };
                DataSet ds1 = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, Scon1, sp);
                if (ds1.Tables.Count > 0)
                {
                    string str = "";
                    if (ds1.Tables[0].Rows.Count > 0)
                    {
                        str += "<a href='###' onclick='fndownload(this)' style='color:blue;text-decoration:underline' filesetid='" + FileSetID + "' filesettype='6' filetype='1'>Download Exception</a>";
                    }
                    else if (ds1.Tables[1].Rows.Count > 0)
                    {
                        str += "<a href='###' onclick='fndownload(this)' style='color:blue;text-decoration:underline' filesetid='" + FileSetID + "' filesettype='6' filetype='2'>Download Exception</a>";
                    }
                    return "2^" + str + "<div style='width:100%' id='divIframeReport'></div>";
                }
                else
                {
                    return "0^File Uploaded Successfully";
                }
            }
        }
        catch (Exception ex)
        {
            return "1^Error:" + ex.Message.ToString();
        }
        finally
        {
        }
        return "0^";
    }


    public static string UploadData(DataTable dtRecords, int FileSetId, int flgFileType)
    {
        string strFile = "";
        try
        {
            string[] ArrPrimaryData = null;
            if (flgFileType == 1)
            {
                strFile = "JourneyPlan";
                ArrPrimaryData = new string[18];
                ArrPrimaryData[0] = "DistributorCode";
                ArrPrimaryData[1] = "DRCPCODE";
                ArrPrimaryData[2] = "SubDCode";
                ArrPrimaryData[3] = "DSECode";
                ArrPrimaryData[4] = "RouterNo";
                ArrPrimaryData[5] = "Frequency";
                ArrPrimaryData[6] = "DayOfVisit";
                ArrPrimaryData[7] = "FromDate";
                ArrPrimaryData[8] = "ToDate";
                ArrPrimaryData[9] = "FootRoute";
                ArrPrimaryData[10] = "CustomerCode";
                ArrPrimaryData[11] = "CustomerName";
                ArrPrimaryData[12] = "ChannelCode";
                ArrPrimaryData[13] = "Address";
                ArrPrimaryData[14] = "CustomerType";
                ArrPrimaryData[15] = "ContactNo";
                ArrPrimaryData[16] = "GSTIN";
                ArrPrimaryData[17] = "FileSetID";
            }
            else {
                strFile = "DRCP";
                ArrPrimaryData = new string[11];
                ArrPrimaryData[0] = "SiteName";
                ArrPrimaryData[1] = "SubDCode";
                ArrPrimaryData[2] = "SubDName";
                ArrPrimaryData[3] = "BranchName";
                ArrPrimaryData[4] = "SellerCode";
                ArrPrimaryData[5] = "SellerName";
                ArrPrimaryData[6] = "RouteNo";
                ArrPrimaryData[7] = "DateOfVisit";
                ArrPrimaryData[8] = "DistributorCode";
                ArrPrimaryData[9] = "DistributorName";
                ArrPrimaryData[10] = "FileSetID";
            }

            //----filesettype 2
            //table tmpSBFPCodeMapping

            DataColumn newColumn = new DataColumn("FileSetID", typeof(System.Int32));
            newColumn.DefaultValue = FileSetId;
            dtRecords.Columns.Add(newColumn);
            if (dtRecords != null && dtRecords.Rows.Count > 0)
            {
                if (dtRecords.Columns.Count - 1 != ArrPrimaryData.Length - 1)
                {
                    return "1|Column count mis-match. It must be " + (ArrPrimaryData.Length - 1) + " Columns in " + strFile + " . Please check sample file and correct it then upload again.";
                }

                for (int j = 0; j < dtRecords.Columns.Count; j++)
                {
                    if (!ArrPrimaryData.Contains(dtRecords.Columns[j].ColumnName.ToString().Trim()))
                    {
                        return "1|" + dtRecords.Columns[j].ColumnName.ToString().Trim() + " column is not a valid defined column in " + strFile + " . Please check sample file and correct it then upload again.";
                    }
                }
                string strcon = System.Configuration.ConfigurationManager.AppSettings["strConn"];
                using (SqlBulkCopy bulkCopy = new SqlBulkCopy(strcon))
                {

                    bulkCopy.BatchSize = 1000;
                    bulkCopy.BulkCopyTimeout = 100;
                    //bulkCopy.NotifyAfter = 1000;
                    if (flgFileType == 1)
                    {
                        bulkCopy.DestinationTableName = "tmpRawDataSUBDDRCP";
                        bulkCopy.ColumnMappings.Add("[DistributorCode]", "[DistributorCode]");
                        bulkCopy.ColumnMappings.Add("[DRCPCODE]", "[DRCPCODE]");
                        bulkCopy.ColumnMappings.Add("[SubDCode]", "[SubDCode]");
                        bulkCopy.ColumnMappings.Add("[DSECode]", "[DSECode]");
                        bulkCopy.ColumnMappings.Add("[RouterNo]", "[RouterNo]");
                        bulkCopy.ColumnMappings.Add("[Frequency]", "[Frequency]");
                        bulkCopy.ColumnMappings.Add("[DayOfVisit]", "[DayOfVisit]");
                        bulkCopy.ColumnMappings.Add("[FromDate]", "[FromDate]");
                        bulkCopy.ColumnMappings.Add("[ToDate]", "[ToDate]");
                        bulkCopy.ColumnMappings.Add("[FootRoute]", "[FootRoute]");
                        bulkCopy.ColumnMappings.Add("[CustomerCode]", "[CustomerCode]");
                        bulkCopy.ColumnMappings.Add("[CustomerName]", "[CustomerName]");
                        bulkCopy.ColumnMappings.Add("[ChannelCode]", "[ChannelCode]");
                        bulkCopy.ColumnMappings.Add("[Address]", "[Address]");
                        bulkCopy.ColumnMappings.Add("[CustomerType]", "[CustomerType]");
                        bulkCopy.ColumnMappings.Add("[ContactNo]", "[ContactNo]");
                        bulkCopy.ColumnMappings.Add("[GSTIN]", "[GSTIN]");
                        bulkCopy.ColumnMappings.Add("[FileSetId]", "[FileSetId]");
                    }
                    else {
                        bulkCopy.DestinationTableName = "tmpRawDataSUBDDRCPPart2";
                        bulkCopy.ColumnMappings.Add("[SiteName]", "[SiteName]");
                        bulkCopy.ColumnMappings.Add("[SubDCode]", "[SubDCode]");
                        bulkCopy.ColumnMappings.Add("[SubDName]", "[SubDName]");
                        bulkCopy.ColumnMappings.Add("[BranchName]", "[BranchName]");
                        bulkCopy.ColumnMappings.Add("[SellerCode]", "[SellerCode]");
                        bulkCopy.ColumnMappings.Add("[SellerName]", "[SellerName]");
                        bulkCopy.ColumnMappings.Add("[RouteNo]", "[RouteNo]");
                        bulkCopy.ColumnMappings.Add("[DateOfVisit]", "[DateOfVisit]");
                        bulkCopy.ColumnMappings.Add("[DistributorCode]", "[DistributorCode]");
                        bulkCopy.ColumnMappings.Add("[DistributorName]", "[DistributorName]");
                        bulkCopy.ColumnMappings.Add("[FileSetId]", "[FileSetId]");
                    }
                    System.Data.SqlClient.SqlBulkCopyColumnMappingCollection sbcmc = bulkCopy.ColumnMappings;
                    bulkCopy.WriteToServer(dtRecords);
                }
            }
            return "0|";
        }
        catch (Exception ex)
        {
            //clsSendLogMail.SendErrorMail("Error while Updating Data in DB (UploadData-bulkCopy). \n Error : " + ex.Message, FileName);
            return "1|" + ex.Message + " while uploading Data of " + strFile;
        }
    }
    static bool validatefiledate(string date)
    {
        bool isValid = false;
        try
        {
            Regex regex = new Regex(@"^\d{4}((0\d)|(1[012]))(([012]\d)|3[01])$");///([12]\d{3}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01]))/

            //Verify whether date entered in dd/MM/yyyy format.
            isValid = regex.IsMatch(date.Trim());

            //Verify whether entered date is Valid date.
            //DateTime dt;
            //isValid = DateTime.TryParseExact(date, "dd/MM/yyyy", new System.Globalization.CultureInfo("en-GB"), System.Globalization.DateTimeStyles.None, out dt);
        }
        catch (Exception ex)
        {
            isValid = false;
        }

        return isValid;
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}