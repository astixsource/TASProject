<%@ WebHandler Language="C#" Class="FileInitUploadHandler" %>

using System;
using System.IO;
using System.IO.Compression;
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

public class FileInitUploadHandler : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{

    public void ProcessRequest(HttpContext context)
    {

        if (context.Request.Files.Count > 0)
        {

            HttpFileCollection files = context.Request.Files;
            string ID = context.Request.QueryString["id"].ToString();
            string LoginId = context.Request.Form["LoginId"].ToString();
            string msg = UploadExcel(files, LoginId, ID);//postedFile
            context.Response.Write(msg);
        }

    }

    private string UploadExcel(HttpFileCollection files, string LoginId, string ID)//, string FileSetType HttpPostedFile File_Up
    {
        SqlConnection Scon = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        try
        {
            string strResponse = "";
            for (int i = 0; i < files.Count; i++)
            {
                HttpPostedFile File_Up = files[i];
                string FileSetType = File_Up.FileName.Split('#')[1];
                string ErrorMsg = "";
                DataSet ds = new DataSet();
                SqlCommand Scmd = new SqlCommand();
                Scmd.Connection = Scon;
                Scmd.CommandText = "[spGetFileSetId]";
                Scmd.CommandType = CommandType.StoredProcedure;
                Scmd.Parameters.AddWithValue("@FileName", Path.GetFileName(File_Up.FileName.Split('#')[0]));
                Scmd.Parameters.AddWithValue("@FileSetType", FileSetType);
                Scmd.Parameters.AddWithValue("@LoginId", LoginId);
                Scmd.Parameters.Add("@FileSetId", SqlDbType.VarChar, 30);
                Scmd.Parameters["@FileSetId"].Direction = ParameterDirection.Output;
                Scon.Open();
                Scmd.ExecuteNonQuery();
                Scon.Close();
                string FileSetID = Convert.ToString(Scmd.Parameters["@FileSetId"].Value);
                string filename = FileSetID + "_" + DateTime.Now.ToString("yyyyMMddHHss") + "_" + Path.GetFileName(File_Up.FileName.Split('#')[0]);// + ".zip";
                string filePath = HttpContext.Current.Server.MapPath("Uploads/") + filename;

                File_Up.SaveAs(filePath);

                string csvfilename = Path.GetFileNameWithoutExtension(filename) + ".csv";
                string destinationPath = Path.GetFullPath(Path.Combine(HttpContext.Current.Server.MapPath("Uploads/"), csvfilename));

                using (ZipArchive archive = ZipFile.OpenRead(filePath))
                {
                    foreach (ZipArchiveEntry entry in archive.Entries)
                    {
                        if (entry.FullName.EndsWith(".csv", StringComparison.OrdinalIgnoreCase))
                        {
                            // Gets the full path to ensure that relative segments are removed.


                            // Ordinal match is safest, case-sensitive volumes can be mounted within volumes that
                            // are case-insensitive.
                            //if (destinationPath.StartsWith(extractPath, StringComparison.Ordinal))
                            entry.ExtractToFile(destinationPath);
                        }
                    }
                }



                DataSet ds1 = new DataSet();
                if (FileSetType == "16")
                {
                    DataTable dt = new DataTable();

                    //    dt.Columns.AddRange(new DataColumn[3] { new DataColumn("Id", typeof(int)),
                    //new DataColumn("Name", typeof(string)),
                    //new DataColumn("Country",typeof(string)) });

                    StringBuilder sb = new StringBuilder();
                    int IsHeaderColumn = 0;
                    int Istruncatehastodone = 0;
                    using (FileStream fs = File.Open(destinationPath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                    using (BufferedStream bs = new BufferedStream(fs))
                    using (StreamReader sr = new StreamReader(bs))
                    {
                        string line;
                        while ((line = sr.ReadLine()) != null)
                        {
                            if (IsHeaderColumn == 0)
                            {
                                foreach (string cell in line.Split(','))
                                {
                                    dt.Columns.Add(new DataColumn(cell.Trim(), typeof(string)));
                                }

                                DataColumn newColumnLogin = new DataColumn("LoginID", typeof(string));
                                newColumnLogin.DefaultValue = LoginId;
                                dt.Columns.Add(newColumnLogin);

                                DataColumn newColumn = new DataColumn("FileSetId", typeof(string));
                                newColumn.DefaultValue = FileSetID;
                                dt.Columns.Add(newColumn);
                                IsHeaderColumn = 1;
                            }
                            else
                            {
                                dt.Rows.Add();
                                int j = 0;
                                foreach (string cell in line.Split(','))
                                {
                                    dt.Rows[dt.Rows.Count - 1][j] = cell;
                                    j++;
                                }

                                if (dt.Rows.Count == 1000)
                                {
                                    string strResp = UploadData(dt, Convert.ToInt32(FileSetID), Convert.ToInt16(FileSetType), LoginId, Istruncatehastodone);
                                    Istruncatehastodone = 1;
                                    dt.Rows.Clear();
                                }
                            }
                        }
                    }
                    if (dt.Rows.Count > 0)
                    {
                        string strResp = UploadData(dt, Convert.ToInt32(FileSetID), Convert.ToInt16(FileSetType), LoginId, Istruncatehastodone);
                        Istruncatehastodone = 1;
                        dt.Rows.Clear();
                    }
                }
                else
                {

                    using (FileStream oStream = File.Open(destinationPath, FileMode.Open, FileAccess.Read))
                    {
                        IExcelDataReader iExcelDataReader = null;
                        string extension = Path.GetExtension(destinationPath);
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
                        else if (extension == ".csv")
                        {
                            iExcelDataReader = ExcelReaderFactory.CreateCsvReader(oStream);
                        }
                        ds1 = iExcelDataReader.AsDataSet(conf);
                    }
                    if (ds1.Tables.Count > 0)
                    {
                        if (ds1.Tables[0].Rows.Count > 0)
                        {
                            string strResp = UploadData(ds1.Tables[0], Convert.ToInt32(FileSetID), Convert.ToInt16(FileSetType), LoginId, 0);
                            if (strResp.Split('|')[0] == "0")
                            {
                                strResponse += "<div>File" + (i + 1).ToString() + "-File Uploaded Successfully</div>";
                            }
                            else
                            {
                                return "1^<div>File" + (i + 1).ToString() + "-No Data uploaded due to below error<br/> " + strResp.Split('|')[1] + "</div>";

                            }
                        }
                        else
                        {
                            return "1^<div>File" + (i + 1).ToString() + "-No Data Available in the file</div>";
                        }
                    }
                    else
                    {
                        return "1^<div>File" + (i + 1).ToString() + "-No sheets available in the file</div>";
                    }
                }
            }

        }
        catch (Exception ex)
        {
            return "1^Error:" + ex.Message.ToString() + "_aa^" + ID;
        }
        finally
        {
            Scon.Dispose();
        }
        return "0^^" + ID;
    }


    public static string UploadData(DataTable dtRecords, int FileSetId, int flgFileType, string loginid, int Istruncatehastodone)
    {
        string strFile = "";
        try
        {
            string[] ArrMapping = null;
            if (flgFileType == 15)
            {
                strFile = "Scheme Master";
                ArrMapping = new string[31];
                ArrMapping[0] = "Scheme_Code";
                ArrMapping[1] = "Description";
                ArrMapping[2] = "Short_Description";
                ArrMapping[3] = "Scheme_Type";
                ArrMapping[4] = "Valid_From";
                ArrMapping[5] = "Valid_To";
                ArrMapping[6] = "Scheme_Buy_Logic";
                ArrMapping[7] = "Is_Accumulation";
                ArrMapping[8] = "Scheme_Process_Type";
                ArrMapping[9] = "Retailer Apply Count";// coming space
                ArrMapping[10] = "Promotion_Group_Name";
                ArrMapping[11] = "Level_Type";
                ArrMapping[12] = "Level_Desc";//Level_Code
                ArrMapping[13] = "Promotion_Group_Logic";
                ArrMapping[14] = "Promotion_Get_Type";
                ArrMapping[15] = "Promotion_Slab_Description";
                ArrMapping[16] = "Promotion_Slab_Buy_Min";//Promotion_Slab_Buy_Min_Qty
                ArrMapping[17] = "Promotion_Slab_Buy_Max";//Promotion_Slab_Buy_Max_Qty
                ArrMapping[18] = "Promotion_Slab_Get_Discount";
                ArrMapping[19] = "Promotion_Slab_Buy_UOM";
                ArrMapping[20] = "Promotion_Slab_Get_ForEvery_Qty";
                ArrMapping[21] = "Promotion_Slab_Get_ForEvery_Qty_UOM";
                ArrMapping[22] = "Promotion_Slab_Get_For_Every_Value";
                ArrMapping[23] = "Slab_Max_Limit";
                ArrMapping[24] = "Free_Product_Desc";
                ArrMapping[25] = "Free_Product_UOM";
                ArrMapping[26] = "Free_Product_Qty";
                ArrMapping[27] = "Variance";
                ArrMapping[28] = "Scheme_Source_MappingCode";
                ArrMapping[29] = "LoginID";
                ArrMapping[30] = "FileSetId";
                DataColumn newColumnLogin = new DataColumn("LoginID", typeof(string));
                newColumnLogin.DefaultValue = loginid;
                dtRecords.Columns.Add(newColumnLogin);

                DataColumn newColumn = new DataColumn("FileSetId", typeof(string));
                newColumn.DefaultValue = FileSetId;
                dtRecords.Columns.Add(newColumn);
            }
            else if (flgFileType == 16)
            {
                strFile = "Scheme Criteria Mapping";
                ArrMapping = new string[11];
                ArrMapping[0] = "Scheme_Code";
                ArrMapping[1] = "Group_Name";
                ArrMapping[2] = "Channel_Name";
                ArrMapping[3] = "Type_Name";
                ArrMapping[4] = "Distributor_Code";
                ArrMapping[5] = "Branch_code";
                ArrMapping[6] = "Siebel_Number";
                ArrMapping[7] = "Retailer_Code";
                ArrMapping[8] = "Account_Name";
                ArrMapping[9] = "LoginID";
                ArrMapping[10] = "FileSetId";


            }

            //----filesettype 2
            //table tmpSBFPCodeMapping

            //dtRecords.Columns.Remove("Column9");
            //if (Istruncatehastodone == 0)
            //{

            //}

            //dtRecords.Columns["LoginID"].DefaultValue = loginid;

            if (dtRecords != null && dtRecords.Rows.Count > 0)
            {
                string strcon = System.Configuration.ConfigurationManager.AppSettings["strConn"];

                if (dtRecords.Columns.Count != ArrMapping.Length)
                {
                    return "1|Column count mis-match. It must be " + (ArrMapping.Length - 2) + " Columns in " + strFile + " . Please check sample file and correct it then upload again.";
                }

                for (int j = 0; j < dtRecords.Columns.Count; j++)
                {
                    if (!ArrMapping.Contains(dtRecords.Columns[j].ColumnName.ToString().Trim()))
                    {
                        return "1|" + dtRecords.Columns[j].ColumnName.ToString().Trim() + " column is not a valid defined column in " + strFile + " . Please check sample file and correct it then upload again.";
                    }
                }

                using (SqlBulkCopy bulkCopy = new SqlBulkCopy(strcon))
                {
                    bulkCopy.BatchSize = 1000;
                    bulkCopy.NotifyAfter = 1000;
                    if (flgFileType == 15)
                    {
                        bulkCopy.DestinationTableName = "TmpINITSchemeMain";//TmpINITClusterLogic
                        if (Istruncatehastodone == 0)
                        {
                            using (SqlConnection connection = new SqlConnection(strcon))
                            {
                                connection.Open();
                                // Delete old entries
                                SqlCommand truncate = new SqlCommand("SpTruncateTables", connection);
                                truncate.Parameters.AddWithValue("FileType", 15);
                                truncate.CommandType = CommandType.StoredProcedure;
                                truncate.ExecuteNonQuery();
                            }
                        }

                        bulkCopy.ColumnMappings.Add("[Scheme_Code]", "[Scheme_Code]");
                        bulkCopy.ColumnMappings.Add("[Description]", "[Description]");
                        bulkCopy.ColumnMappings.Add("[Short_Description]", "[Short_Description]");
                        bulkCopy.ColumnMappings.Add("[Scheme_Type]", "[Scheme_Type]");
                        bulkCopy.ColumnMappings.Add("[Valid_From]", "[Valid_From]");
                        bulkCopy.ColumnMappings.Add("[Valid_To]", "[Valid_To]");
                        bulkCopy.ColumnMappings.Add("[Scheme_Buy_Logic]", "[Scheme_Buy_Logic]");
                        bulkCopy.ColumnMappings.Add("[Is_Accumulation]", "[Is_Accumulation]");
                        bulkCopy.ColumnMappings.Add("[Scheme_Process_Type]", "[Scheme_Process_Type]");
                        bulkCopy.ColumnMappings.Add("[Retailer Apply Count]", "[Retailer Apply Count]");
                        bulkCopy.ColumnMappings.Add("[Promotion_Group_Name]", "[Promotion_Group_Name]");
                        bulkCopy.ColumnMappings.Add("[Level_Type]", "[Level_Type]");
                        bulkCopy.ColumnMappings.Add("[Level_Desc]", "[Level_Code]");
                        bulkCopy.ColumnMappings.Add("[Promotion_Group_Logic]", "[Promotion_Group_Logic]");
                        bulkCopy.ColumnMappings.Add("[Promotion_Get_Type]", "[Promotion_Get_Type]");
                        bulkCopy.ColumnMappings.Add("[Promotion_Slab_Description]", "[Promotion_Slab_Description]");
                        bulkCopy.ColumnMappings.Add("[Promotion_Slab_Buy_Min]", "[Promotion_Slab_Buy_Min_Qty]");
                        bulkCopy.ColumnMappings.Add("[Promotion_Slab_Buy_Max]", "[Promotion_Slab_Buy_Max_Qty]");
                        bulkCopy.ColumnMappings.Add("[Promotion_Slab_Get_Discount]", "[Promotion_Slab_Get_Discount]");
                        bulkCopy.ColumnMappings.Add("[Promotion_Slab_Buy_UOM]", "[Promotion_Slab_Buy_UOM]");
                        bulkCopy.ColumnMappings.Add("[Promotion_Slab_Get_ForEvery_Qty]", "[Promotion_Slab_Get_ForEvery_Qty]");
                        bulkCopy.ColumnMappings.Add("[Promotion_Slab_Get_ForEvery_Qty_UOM]", "[Promotion_Slab_Get_ForEvery_Qty_UOM]");
                        bulkCopy.ColumnMappings.Add("[Promotion_Slab_Get_For_Every_Value]", "[Promotion_Slab_Get_For_Every_Value]");
                        bulkCopy.ColumnMappings.Add("[Slab_Max_Limit]", "[Slab_Max_Limit]");
                        bulkCopy.ColumnMappings.Add("[Free_Product_Desc]", "[Free_Product_Desc]");
                        bulkCopy.ColumnMappings.Add("[Free_Product_UOM]", "[Free_Product_UOM]");
                        bulkCopy.ColumnMappings.Add("[Free_Product_Qty]", "[Free_Product_Qty]");
                        bulkCopy.ColumnMappings.Add("[Variance]", "[Variance]");
                        bulkCopy.ColumnMappings.Add("[Scheme_Source_MappingCode]", "[Scheme_Source_MappingCode]");
                        bulkCopy.ColumnMappings.Add("[LoginID]", "[LoginID]");
                        bulkCopy.ColumnMappings.Add("[FileSetId]", "[FileSetId]");
                        //bulkCopy.ColumnMappings.Add("[LoginID]", "[LoginID]");
                        //bulkCopy.ColumnMappings.Add("[FileSetId]", "[FileSetId]");
                    }
                    else if (flgFileType == 16)
                    {
                        bulkCopy.DestinationTableName = "tmpINITSchemeMapping";//TmpINITFBClusterSchemes
                        if (Istruncatehastodone == 0)
                        {
                            using (SqlConnection connection = new SqlConnection(strcon))
                            {
                                connection.Open();
                                // Delete old entries
                                 SqlCommand truncate = new SqlCommand("SpTruncateTables", connection);
                                truncate.Parameters.AddWithValue("FileType", 16);
                                truncate.CommandType = CommandType.StoredProcedure;
                                truncate.ExecuteNonQuery();
                            }
                        }
                        //bulkCopy.DestinationTableName = "TmpINITFBClusterSchemes";
                        bulkCopy.ColumnMappings.Add("[Scheme_Code]", "[Scheme_Code]");
                        bulkCopy.ColumnMappings.Add("[Group_Name]", "[Group_Name]");
                        bulkCopy.ColumnMappings.Add("[Channel_Name]", "[Channel_Name]");
                        bulkCopy.ColumnMappings.Add("[Type_Name]", "[Type_Name]");
                        bulkCopy.ColumnMappings.Add("[Distributor_Code]", "[Distributor_Code]");
                        bulkCopy.ColumnMappings.Add("[Branch_code]", "[Branch_Code]");
                        bulkCopy.ColumnMappings.Add("[Siebel_Number]", "[Siebel_Number]");
                        bulkCopy.ColumnMappings.Add("[Retailer_Code]", "[Retailer_Code]");
                        bulkCopy.ColumnMappings.Add("[Account_Name]", "[Account-Name]");
                        bulkCopy.ColumnMappings.Add("[LoginID]", "[LoginID]");
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