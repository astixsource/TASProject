<%@ WebHandler Language="C#" Class="FileInitSBDUploadHandler" %>

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

public class FileInitSBDUploadHandler : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
        public static string strConn = "Server=tcp:pgdatafoundation.database.windows.net,1433;Initial Catalog=DataFoundation;Persist Security Info=False;User ID=astixadmin;Password=DFDWAdmin@13579;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
    public void ProcessRequest(HttpContext context)
    {

        if (context.Request.Files.Count > 0)
        {
            HttpFileCollection files = context.Request.Files;
            string LoginId = context.Request.Form["LoginId"].ToString();
            string msg = UploadExcel(files, LoginId);//postedFile
            context.Response.Write(msg);
        }

    }

    private string UploadExcel(HttpFileCollection files, string LoginId)//, string FileSetType HttpPostedFile File_Up
    {
        SqlConnection Scon = new SqlConnection(strConn);
        try
        {
            HttpPostedFile File_Up = files[0];

            string FileSetType = File_Up.FileName.Split('#')[1];

            string ErrorMsg = "";
            DataSet ds = new DataSet();

            SqlCommand Scmd = new SqlCommand();
            Scmd.Connection = Scon;
            Scmd.CommandText = "[spGetFileSetId]";
            Scmd.CommandType = CommandType.StoredProcedure;
            Scmd.Parameters.AddWithValue("@FileName", File_Up.FileName.Split('#')[0]);
            Scmd.Parameters.AddWithValue("@FileSetType", FileSetType);
            Scmd.Parameters.AddWithValue("@LoginId", LoginId);
            Scmd.Parameters.Add("@FileSetId", SqlDbType.VarChar, 30);
            Scmd.Parameters["@FileSetId"].Direction = ParameterDirection.Output;
            Scon.Open();
            Scmd.ExecuteNonQuery();

            string FileSetID = Scmd.Parameters["@FileSetId"].Value.ToString();
            string filename = FileSetID + "_" + Path.GetFileName(File_Up.FileName.Split('#')[0]);
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
                if (ds1.Tables[0].Rows.Count > 0)
                {
                    string strResp = UploadData(ds1.Tables[0], FileSetID, Convert.ToInt16(FileSetType), LoginId);

                    if (strResp.Split('|')[0] == "0")
                    {
                        //List<SqlParameter> sp = null;
                        //string storedProcName = "spImportSwingDRCPPlan";
                        //sp = new List<SqlParameter>()
                        //    {
                        //    new SqlParameter("@FileSetId", FileSetID),
                        //    new SqlParameter("@LoginId", LoginId)
                        //    };
                        //ds1 = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, Scon, sp);
                        //if (ds1.Tables.Count > 0)
                        //{
                        //    string str = "";
                        //    if (ds1.Tables[0].Rows.Count > 0)
                        //    {
                        //        str += "<a href='###' onclick='fndownload(this)' style='color:blue;text-decoration:underline' filesetid='" + FileSetID + "' filesettype='1' filetype='1'>Download Exception</a>";
                        //    }
                        //    else if (ds1.Tables[1].Rows.Count > 0)
                        //    {
                        //        str += "<a href='###' onclick='fndownload(this)' style='color:blue;text-decoration:underline' filesetid='" + FileSetID + "' filesettype='1' filetype='2'>Download Exception</a>";
                        //    }
                        //    return "2^" + str + "<div style='width:100%' id='divIframeReport'></div>";
                        //}
                        //else
                        //{
                        return "0^File Uploaded Successfully";
                        //}
                    }
                    else
                    {
                        return "1^Error-" + strResp.Split('|')[1];
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


    public static string UploadData(DataTable dtRecords, string FileSetId, int flgFileType, string loginid)
    {
        string strFile = "";
        try
        {
            string[] ArrMapping = null;
            if (flgFileType == 10)
            {
                strFile = "Branch Mapping";
                ArrMapping = new string[4];
                ArrMapping[0] = "SBD Name";
                ArrMapping[1] = "Branch Code";
                ArrMapping[2] = "Distributor Code";
                ArrMapping[3] = "FileSetId";
            }
            else if (flgFileType == 11)
            {
                strFile = "SBD Master";
                ArrMapping = new string[11];
                ArrMapping[0] = "SBD Name";
                ArrMapping[1] = "Channel Code";
                ArrMapping[2] = "Channel Name";
                ArrMapping[3] = "Group Code";
                ArrMapping[4] = "SBF Code";
                ArrMapping[5] = "SBF Name";
                ArrMapping[6] = "MOQ";
                ArrMapping[7] = "Effective From";
                ArrMapping[8] = "Effective To";
                ArrMapping[9] = "Is Base";
                ArrMapping[10] = "FileSetId";
            }
            
            //----filesettype 2
            //table tmpSBFPCodeMapping

            //dtRecords.Columns.Remove("Column9");

            DataColumn newColumn = new DataColumn("FileSetId", typeof(System.String));
            newColumn.DefaultValue = FileSetId;
            dtRecords.Columns.Add(newColumn);


            //dtRecords.Columns["LoginID"].DefaultValue = loginid;

            if (dtRecords != null && dtRecords.Rows.Count > 0)
            {
                //string strcon = System.Configuration.ConfigurationManager.AppSettings["strConn"];

                if (dtRecords.Columns.Count != ArrMapping.Length)
                {
                    return "1|Column count mis-match. It must be " + (ArrMapping.Length - 1) + " Columns in " + strFile + " . Please check sample file and correct it then upload again.";
                }

                for (int j = 0; j < dtRecords.Columns.Count; j++)
                {
                    if (!ArrMapping.Contains(dtRecords.Columns[j].ColumnName.ToString().Trim()))
                    {
                        return "1|" + dtRecords.Columns[j].ColumnName.ToString().Trim() + " column is not a valid defined column in " + strFile + " . Please check sample file and correct it then upload again.";
                    }
                }

                using (SqlBulkCopy bulkCopy = new SqlBulkCopy(strConn))
                {
                    bulkCopy.BatchSize = 1000;
                    bulkCopy.NotifyAfter = 1000;
                    if (flgFileType == 10)
                    {

                        bulkCopy.DestinationTableName = "tmpSBDBranchMapping";
                        

                        //bulkCopy.DestinationTableName = "TmpINITSBDBranchMapping";
                        bulkCopy.ColumnMappings.Add("[SBD Name]", "[SBDName]");
                        bulkCopy.ColumnMappings.Add("[Distributor Code]", "[DistributorCode]");
                        bulkCopy.ColumnMappings.Add("[Branch Code]", "[BranchCode]");
                        bulkCopy.ColumnMappings.Add("[FileSetId]", "[FileSetId]");

                    }
                    else if (flgFileType == 11)
                    {
                        bulkCopy.DestinationTableName = "tmpSBDFile";
                        //bulkCopy.DestinationTableName = "tmpINITSBDMaster";
                        bulkCopy.ColumnMappings.Add("[SBD Name]", "[SBD Name]");
                        bulkCopy.ColumnMappings.Add("[Channel Code]", "[Channel Code]");
                        bulkCopy.ColumnMappings.Add("[Channel Name]", "[Channel Name]");
                        bulkCopy.ColumnMappings.Add("[Group Code]", "[Group Code]");
                        bulkCopy.ColumnMappings.Add("[SBF Code]", "[SBF Code]");
                        bulkCopy.ColumnMappings.Add("[SBF Name]", "[SBF Name]");
                        bulkCopy.ColumnMappings.Add("[MOQ]", "[MOQ]");
                        bulkCopy.ColumnMappings.Add("[Effective From]", "[Effective From]");
                        bulkCopy.ColumnMappings.Add("[Effective To]", "[Effective To]");
                        bulkCopy.ColumnMappings.Add("[Is Base]", "[Is Base]");
                        bulkCopy.ColumnMappings.Add("[FileSetId]", "[FileSetId]");
                    }
                   
                    bulkCopy.BulkCopyTimeout = 0;
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