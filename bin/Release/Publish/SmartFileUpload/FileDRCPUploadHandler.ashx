<%@ WebHandler Language="C#" Class="FileDRCPUploadHandler" %>

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

public class FileDRCPUploadHandler : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{

    public void ProcessRequest(HttpContext context)
    {

        if (context.Request.Files.Count > 0)
        {
            HttpFileCollection files = context.Request.Files;
            string branchcode = context.Request.Form["branchcode"].ToString();
            string branchnodeid = context.Request.Form["branchnodeid"].ToString();
            string branchnodetype = context.Request.Form["branchnodetype"].ToString();
            string RptMonthYear = context.Request.Form["RptMonthYear"].ToString();
            string LoginId = context.Request.Form["LoginId"].ToString();
            string msg = UploadExcel(files, branchcode, branchnodeid, branchnodetype, RptMonthYear, LoginId);//postedFile
            context.Response.Write(msg);
        }

    }

    private string UploadExcel(HttpFileCollection files, string branchcode, string branchnodeid, string branchnodetype, string RptMonthYear, string LoginId)//, string FileSetType HttpPostedFile File_Up
    {
        SqlConnection Scon = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        try
        {
            HttpPostedFile File_Up = files[0];
            string ErrorMsg = "";
            DataSet ds = new DataSet();

            SqlCommand Scmd = new SqlCommand();
            Scmd.Connection = Scon;
            Scmd.CommandText = "[spGetFileSetId]";
            Scmd.CommandType = CommandType.StoredProcedure;
            Scmd.Parameters.AddWithValue("@FileName", Path.GetFileName(File_Up.FileName));
            Scmd.Parameters.AddWithValue("@FileSetType", 1);
            Scmd.Parameters.AddWithValue("@LoginId", LoginId);
            Scmd.Parameters.Add("@FileSetId", SqlDbType.VarChar, 30);
            Scmd.Parameters["@FileSetId"].Direction = ParameterDirection.Output;
            Scon.Open();
            Scmd.ExecuteNonQuery();
            
            string FileSetID = Scmd.Parameters["@FileSetId"].Value.ToString();
            string filename = FileSetID + "_" + Path.GetFileName(File_Up.FileName);
            string filePath = HttpContext.Current.Server.MapPath("Uploads/") + filename;
            File_Up.SaveAs(filePath);
            DataTable dt = null;
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
            if (ds1.Tables.Count > 0)
            {
                if (ds1.Tables[0].Rows.Count > 0 && ds1.Tables[1].Rows.Count > 0)
                {
                    string strResp1 = UploadData(ds1.Tables[1], Convert.ToInt32(FileSetID), 2);
                    string strResp = strResp1.Split('|')[0] == "0" ? UploadData(ds1.Tables[0], Convert.ToInt32(FileSetID), 1) : strResp1;
                    if (strResp.Split('|')[0] == "0" && strResp1.Split('|')[0] == "0")
                    {
                        List<SqlParameter> sp = null;
                        string storedProcName = "spImportSwingDRCPPlan";
                        sp = new List<SqlParameter>()
                            {
                            new SqlParameter("@FileSetId", FileSetID),
                            new SqlParameter("@BranchNodeid", branchnodeid),
                            new SqlParameter("@BranchNodeType", branchnodetype),
                            new SqlParameter("@RptMonthYear", RptMonthYear),
                            new SqlParameter("@LoginId", LoginId)
                            };
                        ds1 = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, Scon, sp);
                        if (ds1.Tables.Count > 0)
                        {
                            string str = "";
                            if (ds1.Tables[0].Rows.Count > 0)
                            {
                                str += "<a href='###' onclick='fndownload(this)' style='color:blue;text-decoration:underline' filesetid='" + FileSetID + "' filesettype='1' filetype='1'>Download Exception</a>";
                            }
                            else if (ds1.Tables[1].Rows.Count > 0)
                            {
                                str += "<a href='###' onclick='fndownload(this)' style='color:blue;text-decoration:underline' filesetid='" + FileSetID + "' filesettype='1' filetype='2'>Download Exception</a>";
                            }
                            return "2^" + str + "<div style='width:100%' id='divIframeReport'></div>";
                        }
                        else
                        {
                            return "0^File Uploaded Successfully";
                        }
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
        catch (Exception ex)
        {
            return "1^Error:" + ex.Message.ToString();
        }
        finally
        {
                Scon.Dispose();
        }
        return "0^";
    }


    public static string UploadData(DataTable dtRecords, int FileSetId, int flgFileType)
    {
        string strFile = "";
        try
        {
            string[] ArrPrimaryData = null;
            if (flgFileType == 2)
            {
                strFile = "DSE Master";
                ArrPrimaryData = new string[12];
                ArrPrimaryData[0] = "DSE ID";
                ArrPrimaryData[1] = "DSE Code";
                ArrPrimaryData[2] = "DSE Name";
                ArrPrimaryData[3] = "Address 1";
                ArrPrimaryData[4] = "Address2";
                ArrPrimaryData[5] = "SRPSts";
                ArrPrimaryData[6] = "STL ID";
                ArrPrimaryData[7] = "STL CODE";
                ArrPrimaryData[8] = "STL Name";
                ArrPrimaryData[9] = "LAST SHIPDATE";
                ArrPrimaryData[10] = "LAST BILLNO";
                ArrPrimaryData[11] = "FileSetID";
            }
            else {
                strFile = "DRCP";
                ArrPrimaryData = new string[33];
                ArrPrimaryData[0] = "Retailer ID";
                ArrPrimaryData[1] = "Retailer Code";
                ArrPrimaryData[2] = "address";
                ArrPrimaryData[3] = "RetailerContact";
                ArrPrimaryData[4] = "Retailer Name";
                ArrPrimaryData[5] = "Retailer DOB";
                ArrPrimaryData[6] = "Retailer Anniversary";
                ArrPrimaryData[7] = "Retailer Sequence";
                ArrPrimaryData[8] = "stlid";
                ArrPrimaryData[9] = "stlnm";
                ArrPrimaryData[10] = "DSE ID";
                ArrPrimaryData[11] = "DSE";
                ArrPrimaryData[12] = "salesamt";
                ArrPrimaryData[13] = "Initiative Spend";
                ArrPrimaryData[14] = "ctgtypid";
                ArrPrimaryData[15] = "ctgtypcde";
                ArrPrimaryData[16] = "ctgtypdsc";
                ArrPrimaryData[17] = "Channel ID";
                ArrPrimaryData[18] = "Channel Code";
                ArrPrimaryData[19] = "Channel Description";
                ArrPrimaryData[20] = "Route";
                ArrPrimaryData[21] = "mktnm";
                ArrPrimaryData[22] = "townid";
                ArrPrimaryData[23] = "towndesc";
                ArrPrimaryData[24] = "Daycovered";
                ArrPrimaryData[25] = "Coveragefreq";
                ArrPrimaryData[26] = "CoverageMode";
                ArrPrimaryData[27] = "OHD";
                ArrPrimaryData[28] = "Gstore";
                ArrPrimaryData[29] = "Latitude";
                ArrPrimaryData[30] = "Longitude";
                ArrPrimaryData[31] = "SectorName";
                ArrPrimaryData[32] = "FileSetID";
            }

            //----filesettype 2
            //table tmpSBFPCodeMapping

            DataColumn newColumn = new DataColumn("FileSetID", typeof(System.Int32));
            newColumn.DefaultValue = FileSetId;
            dtRecords.Columns.Add(newColumn);
            if (dtRecords != null && dtRecords.Rows.Count > 0)
            {
                string strcon = System.Configuration.ConfigurationManager.AppSettings["strConn"];

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

                using (SqlBulkCopy bulkCopy = new SqlBulkCopy(strcon))
                {
                    bulkCopy.BatchSize = 1000;
                    bulkCopy.NotifyAfter = 1000;
                    if (flgFileType == 2)
                    {
                        bulkCopy.DestinationTableName = "tmpRawDataDSEMaster";
                        bulkCopy.ColumnMappings.Add("[DSE ID]", "[DSE ID]");
                        bulkCopy.ColumnMappings.Add("[DSE Code]", "[DSE Code]");
                        bulkCopy.ColumnMappings.Add("[DSE Name]", "[DSE Name]");
                        bulkCopy.ColumnMappings.Add("[Address 1]", "[Address 1]");
                        bulkCopy.ColumnMappings.Add("[Address2]", "[Address2]");
                        bulkCopy.ColumnMappings.Add("[SRPSts]", "[SRPSts]");
                        bulkCopy.ColumnMappings.Add("[STL ID]", "[STL ID]");
                        bulkCopy.ColumnMappings.Add("[STL CODE]", "[STL CODE]");
                        bulkCopy.ColumnMappings.Add("[STL Name]", "[STL Name]");
                        bulkCopy.ColumnMappings.Add("[LAST SHIPDATE]", "[LAST SHIPDATE]");
                        bulkCopy.ColumnMappings.Add("[LAST BILLNO]", "[LAST BILLNO]");
                        bulkCopy.ColumnMappings.Add("[FileSetId]", "[FileSetId]");
                    }
                    else {
                        bulkCopy.DestinationTableName = "tmpRawDataSwingDRCPPlan";
                        bulkCopy.ColumnMappings.Add("[Retailer ID]", "[Retailer ID]");
                        bulkCopy.ColumnMappings.Add("[Retailer Code]", "[Retailer Code]");
                        bulkCopy.ColumnMappings.Add("[address]", "[address]");
                        bulkCopy.ColumnMappings.Add("[RetailerContact]", "[RetailerContact]");
                        bulkCopy.ColumnMappings.Add("[Retailer Name]", "[Retailer Name]");
                        bulkCopy.ColumnMappings.Add("[Retailer DOB]", "[Retailer DOB]");
                        bulkCopy.ColumnMappings.Add("[stlid]", "[stlid]");
                        bulkCopy.ColumnMappings.Add("[stlnm]", "[stlnm]");
                        bulkCopy.ColumnMappings.Add("[DSE ID]", "[DSE ID]");
                        bulkCopy.ColumnMappings.Add("[DSE]", "[DSE]");
                        bulkCopy.ColumnMappings.Add("[salesamt]", "[salesamt]");
                        bulkCopy.ColumnMappings.Add("[Initiative Spend]", "[Initiative Spend]");
                        bulkCopy.ColumnMappings.Add("[ctgtypid]", "[ctgtypid]");
                        bulkCopy.ColumnMappings.Add("[ctgtypcde]", "[ctgtypcde]");
                        bulkCopy.ColumnMappings.Add("[ctgtypdsc]", "[ctgtypdsc]");
                        bulkCopy.ColumnMappings.Add("[Channel ID]", "[Channel ID]");
                        bulkCopy.ColumnMappings.Add("[Channel Code]", "[Channel Code]");
                        bulkCopy.ColumnMappings.Add("[Channel Description]", "[Channel Description]");
                        bulkCopy.ColumnMappings.Add("[Route]", "[Route]");
                        bulkCopy.ColumnMappings.Add("[mktnm]", "[mktnm]");
                        bulkCopy.ColumnMappings.Add("[townid]", "[townid]");
                        bulkCopy.ColumnMappings.Add("[towndesc]", "[towndesc]");
                        bulkCopy.ColumnMappings.Add("[Daycovered]", "[Daycovered]");
                        bulkCopy.ColumnMappings.Add("[Coveragefreq]", "[Coveragefreq]");
                        bulkCopy.ColumnMappings.Add("[CoverageMode]", "[CoverageMode]");
                        bulkCopy.ColumnMappings.Add("[OHD]", "[OHD]");
                        bulkCopy.ColumnMappings.Add("[Gstore]", "[Gstore]");
                        bulkCopy.ColumnMappings.Add("[Latitude]", "[Latitude]");
                        bulkCopy.ColumnMappings.Add("[Longitude]", "[Longitude]");
                        bulkCopy.ColumnMappings.Add("[SectorName]", "[SectorName]");
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