using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Data;
using ClosedXML.Excel;
using System.Net.Mail;
using System.Data.SqlClient;
using System.Configuration;
using System.Runtime.Serialization.Formatters.Binary;

public partial class UploadEngine : System.Web.UI.Page
{
    #region Web Methods

    private static void BulkCopy_SqlRowsCopied(object sender, SqlRowsCopiedEventArgs e)
    {
        UploadDetail Upload = (UploadDetail)HttpContext.Current.Session["UploadDetail"];
        Upload.UploadedLength = Convert.ToInt32(e.RowsCopied);
    }
    public static string UploadData(DataTable dtRecords, string ws_name, string FileSetType, string FileName, UploadDetail Upload, int drcpType,int flgType)
    {
        try
        {
            string[] ArrPrimaryData = null;
            if (FileSetType == "1")
            {
                if (drcpType == 1)
                {
                    ArrPrimaryData = new string[9];
                    ArrPrimaryData[0] = "BranchCode";
                    ArrPrimaryData[1] = "DSECode";
                    ArrPrimaryData[2] = "DSEName";
                    ArrPrimaryData[3] = "MarketNo";
                    ArrPrimaryData[4] = "MarketName";
                    ArrPrimaryData[5] = "SectorCode";
                    ArrPrimaryData[6] = "StoreCode";
                    ArrPrimaryData[7] = "Frequency";
                    ArrPrimaryData[8] = "FileSetID";
                }
                else
                {
                    ArrPrimaryData = new string[9];
                    ArrPrimaryData[0] = "BranchCode";
                    ArrPrimaryData[1] = "DSECode";
                    ArrPrimaryData[2] = "DSEName";
                    ArrPrimaryData[3] = "RouteName";
                    ArrPrimaryData[4] = "SectorCode";
                    ArrPrimaryData[5] = "StoreCode";
                    ArrPrimaryData[6] = "NextVisitDate";
                    ArrPrimaryData[7] = "Frequency";
                    ArrPrimaryData[8] = "FileSetID";
                }
            }




            //----filesettype 2
            //table tmpSBFPCodeMapping

            if (FileSetType == "2")
            {
                ArrPrimaryData = new string[9];
                ArrPrimaryData[0] = "SiteCode";
                ArrPrimaryData[1] = "SBFName";
                ArrPrimaryData[2] = "Product Code";
                ArrPrimaryData[3] = "MRP";
                ArrPrimaryData[4] = "RLP";
                ArrPrimaryData[5] = "UPC";
                ArrPrimaryData[6] = "AvailableInSearch";
                ArrPrimaryData[7] = "AvailableForNewStore";
                ArrPrimaryData[8] = "FileSetID";
            }


            //----filesettype 3

            if (FileSetType == "3")
            {
                ArrPrimaryData = new string[4];
                ArrPrimaryData[0] = "SBFName";
                ArrPrimaryData[1] = "flgNewStore";
                ArrPrimaryData[2] = "flgSearch";
                ArrPrimaryData[3] = "FileSetID";
            }


            if (FileSetType == "4")
            {
                //filesettype 4
                ArrPrimaryData = new string[6];
                ArrPrimaryData[0] = flgType==1?"BranchCode":"SUBDCode";
                ArrPrimaryData[1] = "StoreCode";
                ArrPrimaryData[2] = "CustomerName";
                ArrPrimaryData[3] = "PhoneNo";
                ArrPrimaryData[4] = "OwnerName";
                ArrPrimaryData[5] = "FileSetID";
            }

            if (FileSetType == "5")
            {
                //filesettype 4
                if (drcpType == 1)//SwingCCR
                {
                    ArrPrimaryData = new string[23];
                    ArrPrimaryData[0] = "DomainCode";
                    ArrPrimaryData[1] = "SiteName";
                    ArrPrimaryData[2] = "BranchName";
                    ArrPrimaryData[3] = "DSE Code";
                    ArrPrimaryData[4] = "DSE Name";
                    ArrPrimaryData[5] = "Store Code";
                    ArrPrimaryData[6] = "Store Name";
                    ArrPrimaryData[7] = "Contact Number";
                    ArrPrimaryData[8] = "Channel";
                    ArrPrimaryData[9] = "channel Class";
                    ArrPrimaryData[10] = "Channel Type";
                    ArrPrimaryData[11] = "Order Value";
                    ArrPrimaryData[12] = "VisitDate";
                    ArrPrimaryData[13] = "TimeSpent(Sec)";
                    ArrPrimaryData[14] = "StartTime";
                    ArrPrimaryData[15] = "EndTime";
                    ArrPrimaryData[16] = "Distance(Mts)";
                    ArrPrimaryData[17] = "GPS Latitude";
                    ArrPrimaryData[18] = "GPS Longitude";
                    ArrPrimaryData[19] = "Accuracy(Mts)";
                    ArrPrimaryData[20] = "Call Compliance";
                    ArrPrimaryData[21] = "Reason Code";
                    ArrPrimaryData[22] = "FileSetID";
                }
                else//LeapCCR
                {
                    ArrPrimaryData = new string[26];
                    ArrPrimaryData[0] = "branch_code";
                    ArrPrimaryData[1] = "branch_location";
                    ArrPrimaryData[2] = "dse_code";
                    ArrPrimaryData[3] = "dse_name";
                    ArrPrimaryData[4] = "date";
                    ArrPrimaryData[5] = "route_name";
                    ArrPrimaryData[6] = "retailer_code";
                    ArrPrimaryData[7] = "retailer_name";
                    ArrPrimaryData[8] = "contact_number_1";
                    ArrPrimaryData[9] = "contact_number_2";
                    ArrPrimaryData[10] = "channel_name";
                    ArrPrimaryData[11] = "sub_channel_name";
                    ArrPrimaryData[12] = "start_time";
                    ArrPrimaryData[13] = "end_time";
                    ArrPrimaryData[14] = "intime";
                    ArrPrimaryData[15] = "order_value";
                    ArrPrimaryData[16] = "productivity";
                    ArrPrimaryData[17] = "reason";
                    ArrPrimaryData[18] = "visit_latitude";
                    ArrPrimaryData[19] = "visit_longitude";
                    ArrPrimaryData[20] = "deviation_in_meter";
                    ArrPrimaryData[21] = "deviation";
                    ArrPrimaryData[22] = "reason_for_deviation";
                    ArrPrimaryData[23] = "on_route";
                    ArrPrimaryData[24] = "remarks";
                    ArrPrimaryData[25] = "FileSetID";
                }
            }

            //----filesettype 6
            //table tmpRawDataSUBDDRCP
            //SubD DRCP

            if (FileSetType == "6")
            {
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

            if (FileSetType == "17")
            {
                ArrPrimaryData = new string[14];
                ArrPrimaryData[0] = "Date";
                ArrPrimaryData[1] = "DistributorCode";
                ArrPrimaryData[2] = "DistributorName";
                ArrPrimaryData[3] = "BranchName";
                ArrPrimaryData[4] = "BranchCode";
                ArrPrimaryData[5] = "TotalNoofDSEs";
                ArrPrimaryData[6] = "NoofDSEsTakingOrder";
                ArrPrimaryData[7] = "NoOfOrders";
                ArrPrimaryData[8] = "OrderAmount";
                ArrPrimaryData[9] = "NoOfInvoicesProcessed";
                ArrPrimaryData[10] = "InvoiceNetAmount";
                ArrPrimaryData[11] = "NOCallsPlanned";
                ArrPrimaryData[12] = "NoOfCallsMade";
                ArrPrimaryData[13] = "FileSetID";
            }

            if (FileSetType == "19")
            {
                ArrPrimaryData = new string[3];
                ArrPrimaryData[0] = "BranchCode";
                ArrPrimaryData[1] = "SBF";
                ArrPrimaryData[2] = "FileSetID";
            }
            clsSendLogMail.FnWriteLogFile_Log("", "start datatable error checking for valid data");
            clsSendLogMail.FnWriteLogFile_Log("", "start bulkcopy process");
            Upload.ContentLength = dtRecords.Rows.Count;
            Upload.UploadedLength = 0;
            Upload.Updatetype = 2;
            if (dtRecords != null && dtRecords.Rows.Count > 0)
            {
                string strcon = System.Configuration.ConfigurationManager.AppSettings["strConn"];

                if (dtRecords.Columns.Count - 1 != ArrPrimaryData.Length - 1)
                {
                    return "1|Column count mis-match. It must be " + (ArrPrimaryData.Length - 1) + " Columns.";
                }

                for (int j = 0; j < dtRecords.Columns.Count; j++)
                {
                    if (!ArrPrimaryData.Contains(dtRecords.Columns[j].ColumnName.ToString().Trim()))
                    {
                        return "1|" + dtRecords.Columns[j].ColumnName.ToString().Trim() + " column is not a valid defined column. Please check ..";
                    }
                }

                using (SqlBulkCopy bulkCopy = new SqlBulkCopy(strcon))
                {
                    bulkCopy.BatchSize = 1000;
                    bulkCopy.NotifyAfter = 1000;

                    if (FileSetType == "1")
                    {
                        if (drcpType == 1)
                        {
                            bulkCopy.DestinationTableName = "tmpRawDataDRCPPlan";
                            bulkCopy.ColumnMappings.Add("[BranchCode]", "[BranchCode]");
                            bulkCopy.ColumnMappings.Add("[DSECode]", "[DSECode]");
                            bulkCopy.ColumnMappings.Add("[DSEName]", "[DSEName]");
                            bulkCopy.ColumnMappings.Add("[MarketNo]", "[MarketNo]");
                            bulkCopy.ColumnMappings.Add("[MarketName]", "[MarketName]");
                            bulkCopy.ColumnMappings.Add("[SectorCode]", "[SectorCode]");
                            bulkCopy.ColumnMappings.Add("[StoreCode]", "[StoreCode]");
                            bulkCopy.ColumnMappings.Add("[Frequency]", "[Frequency]");
                            bulkCopy.ColumnMappings.Add("[FileSetId]", "[FileSetId]");
                        }
                        else
                        {
                            bulkCopy.DestinationTableName = "tmpRawDataDRCPPlan2";
                            bulkCopy.ColumnMappings.Add("[BranchCode]", "[BranchCode]");
                            bulkCopy.ColumnMappings.Add("[DSECode]", "[DSECode]");
                            bulkCopy.ColumnMappings.Add("[DSEName]", "[DSEName]");
                            bulkCopy.ColumnMappings.Add("[RouteName]", "[RouteName]");
                            bulkCopy.ColumnMappings.Add("[SectorCode]", "[SectorCode]");
                            bulkCopy.ColumnMappings.Add("[StoreCode]", "[StoreCode]");
                            bulkCopy.ColumnMappings.Add("[NextVisitDate]", "[NextVisitDate]");
                            bulkCopy.ColumnMappings.Add("[Frequency]", "[Frequency]");
                            bulkCopy.ColumnMappings.Add("[FileSetId]", "[FileSetId]");
                        }
                    }
                    else if (FileSetType == "2")
                    {
                        bulkCopy.DestinationTableName = "tmpSBFPCodeMapping";
                        bulkCopy.ColumnMappings.Add("[SiteCode]", "[SiteCode]");
                        bulkCopy.ColumnMappings.Add("[SBFName]", "[SBFName]");
                        bulkCopy.ColumnMappings.Add("[Product Code]", "[ProductCode]");
                        bulkCopy.ColumnMappings.Add("[MRP]", "[MRP]");
                        bulkCopy.ColumnMappings.Add("[RLP]", "[RLP]");
                        bulkCopy.ColumnMappings.Add("[UPC]", "[UPC]");
                        bulkCopy.ColumnMappings.Add("[AvailableInSearch]", "[flgSearch]");
                        bulkCopy.ColumnMappings.Add("[AvailableForNewStore]", "[flgNewStore]");
                        bulkCopy.ColumnMappings.Add("[FileSetId]", "[FileSetId]");
                    }
                    else if (FileSetType == "3")
                    {
                        bulkCopy.DestinationTableName = "tmpCentralSBFData";
                        bulkCopy.ColumnMappings.Add("[SBFName]", "[SBFName]");
                        bulkCopy.ColumnMappings.Add("[flgNewStore]", "[flgNewStore]");
                        bulkCopy.ColumnMappings.Add("[flgSearch]", "[flgSearch]");
                        bulkCopy.ColumnMappings.Add("[FileSetId]", "[FileSetId]");
                    }
                    else if (FileSetType == "4")
                    {
                        bulkCopy.DestinationTableName = "tmpRawDataStoreContactDetail";
                        bulkCopy.ColumnMappings.Add(0, "[BranchCode]");
                        bulkCopy.ColumnMappings.Add(1, "[StoreCode]");
                        bulkCopy.ColumnMappings.Add(2, "[Customer Name]");
                        bulkCopy.ColumnMappings.Add(3, "[Phone_No]");
                        bulkCopy.ColumnMappings.Add(4, "[Owner Name]");
                        bulkCopy.ColumnMappings.Add(5, "[FileSetId]");
                    }
                    else if (FileSetType == "5")
                    {
                        if (drcpType == 1)
                        {
                            bulkCopy.DestinationTableName = "tmpRawDataSwingCCR";
                            bulkCopy.ColumnMappings.Add("[DomainCode]", "[DomainCode]");
                            bulkCopy.ColumnMappings.Add("[SiteName]", "[SiteName]");
                            bulkCopy.ColumnMappings.Add("[BranchName]", "[BranchName]");
                            bulkCopy.ColumnMappings.Add("[DSE Code]", "[DSE Code]");
                            bulkCopy.ColumnMappings.Add("[DSE Name]", "[DSE Name]");
                            bulkCopy.ColumnMappings.Add("[Store Code]", "[Store Code]");
                            bulkCopy.ColumnMappings.Add("[Store Name]", "[Store Name]");
                            bulkCopy.ColumnMappings.Add("[Contact Number]", "[Contact Number]");
                            bulkCopy.ColumnMappings.Add("[Channel]", "[Channel]");
                            bulkCopy.ColumnMappings.Add("[channel Class]", "[channel Class]");
                            bulkCopy.ColumnMappings.Add("[Channel Type]", "[Channel Type]");
                            bulkCopy.ColumnMappings.Add("[Order Value]", "[Order Value ]");
                            bulkCopy.ColumnMappings.Add("[VisitDate]", "[VisitDate]");
                            bulkCopy.ColumnMappings.Add("[TimeSpent(Sec)]", "[TimeSpent(Sec)]");
                            bulkCopy.ColumnMappings.Add("[StartTime]", "[StartTime]");
                            bulkCopy.ColumnMappings.Add("[EndTime]", "[EndTime ]");
                            bulkCopy.ColumnMappings.Add("[Distance(Mts)]", "[Distance(Mts)]");
                            bulkCopy.ColumnMappings.Add("[GPS Latitude]", "[GPS Latitude]");
                            bulkCopy.ColumnMappings.Add("[GPS Longitude]", "[GPS Longitude ]");
                            bulkCopy.ColumnMappings.Add("[Accuracy(Mts)]", "[Accuracy(Mts)]");
                            bulkCopy.ColumnMappings.Add("[Call Compliance]", "[Call Compliance]");
                            bulkCopy.ColumnMappings.Add("[Reason Code]", "[Reason Code]");
                            bulkCopy.ColumnMappings.Add("[FileSetId]", "[FileSetId]");
                        }
                        else
                        {
                            bulkCopy.DestinationTableName = "tmpRawDataLeapCCR";
                            bulkCopy.ColumnMappings.Add("[branch_code]", "[branch_code]");
                            bulkCopy.ColumnMappings.Add("[branch_location]", "[branch_location]");
                            bulkCopy.ColumnMappings.Add("[dse_code]", "[dse_code]");
                            bulkCopy.ColumnMappings.Add("[dse_name]", "[dse_name]");
                            bulkCopy.ColumnMappings.Add("[date]", "[date]");
                            bulkCopy.ColumnMappings.Add("[route_name]", "[route_name]");
                            bulkCopy.ColumnMappings.Add("[retailer_code]", "[retailer_code]");
                            bulkCopy.ColumnMappings.Add("[retailer_name]", "[retailer_name]");
                            bulkCopy.ColumnMappings.Add("[contact_number_1]", "[contact_number_1]");
                            bulkCopy.ColumnMappings.Add("[contact_number_2]", "[contact_number_2]");
                            bulkCopy.ColumnMappings.Add("[channel_name]", "[channel_name]");
                            bulkCopy.ColumnMappings.Add("[sub_channel_name]", "[sub_channel_name]");
                            bulkCopy.ColumnMappings.Add("[start_time]", "[start_time]");
                            bulkCopy.ColumnMappings.Add("[end_time]", "[end_time]");
                            bulkCopy.ColumnMappings.Add("[intime]", "[intime]");
                            bulkCopy.ColumnMappings.Add("[order_value]", "[order_value]");
                            bulkCopy.ColumnMappings.Add("[productivity]", "[productivity]");
                            bulkCopy.ColumnMappings.Add("[reason]", "[reason]");
                            bulkCopy.ColumnMappings.Add("[visit_latitude]", "[visit_latitude]");
                            bulkCopy.ColumnMappings.Add("[visit_longitude]", "[visit_longitude]");
                            bulkCopy.ColumnMappings.Add("[deviation_in_meter]", "[deviation_in_meter]");
                            bulkCopy.ColumnMappings.Add("[deviation]", "[deviation]");
                            bulkCopy.ColumnMappings.Add("[reason_for_deviation]", "[reason_for_deviation]");
                            bulkCopy.ColumnMappings.Add("[on_route]", "[on_route]");
                            bulkCopy.ColumnMappings.Add("[remarks]", "[remarks]");
                            bulkCopy.ColumnMappings.Add("[FileSetId]", "[FileSetId]");
                        }
                    }
                    else if (FileSetType == "6")
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
                    else if (FileSetType == "17")
                    {
                        bulkCopy.DestinationTableName = "tmpLeapDSECallingData";
                        bulkCopy.ColumnMappings.Add("[Date]", "[Date]");
                        bulkCopy.ColumnMappings.Add("[DistributorCode]", "[DistributorCode]");
                        bulkCopy.ColumnMappings.Add("[DistributorName]", "[DistributorName]");
                        bulkCopy.ColumnMappings.Add("[BranchName]", "[BranchName]");
                        bulkCopy.ColumnMappings.Add("[BranchCode]", "[BranchCode]");
                        bulkCopy.ColumnMappings.Add("[TotalNoofDSEs]", "[TotalNoofDSEs]");
                        bulkCopy.ColumnMappings.Add("[NoofDSEsTakingOrder]", "[NoofDSEsTakingOrder]");
                        bulkCopy.ColumnMappings.Add("[NoOfOrders]", "[NoOfOrders]");
                        bulkCopy.ColumnMappings.Add("[OrderAmount]", "[OrderAmount]");
                        bulkCopy.ColumnMappings.Add("[NoOfInvoicesProcessed]", "[NoOfInvoicesProcessed]");
                        bulkCopy.ColumnMappings.Add("[InvoiceNetAmount]", "[InvoiceNetAmount]");
                        bulkCopy.ColumnMappings.Add("[NOCallsPlanned]", "[NOCallsPlanned]");
                        bulkCopy.ColumnMappings.Add("[NoOfCallsMade]", "[NoOfCallsMade]");
                        bulkCopy.ColumnMappings.Add("[FileSetId]", "[FileSetId]");
                    }
                    else if (FileSetType == "19")
                    {
                        bulkCopy.DestinationTableName = "tmpActiveSBFList";
                        bulkCopy.ColumnMappings.Add("[BranchCode]", "[SiteCode]");
                        bulkCopy.ColumnMappings.Add("[SBF]", "[SBFName]");
                        bulkCopy.ColumnMappings.Add("[FileSetId]", "[FileSetId]");
                    }
                    System.Data.SqlClient.SqlBulkCopyColumnMappingCollection sbcmc = bulkCopy.ColumnMappings;
                    bulkCopy.SqlRowsCopied += BulkCopy_SqlRowsCopied;
                    bulkCopy.WriteToServer(dtRecords);

                    clsSendLogMail.FnWriteLogFile_Log("", "end bulkcopy process");
                }
            }
            return "0|";
        }
        catch (Exception ex)
        {
            //clsSendLogMail.SendErrorMail("Error while Updating Data in DB (UploadData-bulkCopy). \n Error : " + ex.Message, FileName);
            return "1|" + ex.Message;
        }
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["LoginID"] == null)
        {
            Response.Redirect("~/SessionExpiredpage.aspx");
            return;
        }
        if (this.IsPostBack)
        {
            int SiteNodeType = Convert.ToInt32(Request.Form["SiteNodeType"]);
            int SiteNodeId = Convert.ToInt32(Request.Form["SiteNodeId"]);
            int drcpType = Convert.ToInt32(Request.Form["drcpType"]);
            int flgType = Convert.ToInt32(Request.Form["flgType"]);
            UploadDetail Upload = (UploadDetail)this.Session["UploadDetail"];
            //Let the webservie know that we are not yet ready
            Upload.IsReady = false;
            if (this.fileUpload.PostedFile != null && this.fileUpload.PostedFile.ContentLength > 0)
            {
                Upload.IsReady = true;
                //build the local path where upload all the files
                string path = this.Server.MapPath(@"Uploads");
                string fileName = Path.GetFileName(this.fileUpload.PostedFile.FileName);
                string fileNameWithoutExt = Path.GetFileNameWithoutExtension(this.fileUpload.PostedFile.FileName);

                Upload.ContentLength = this.fileUpload.PostedFile.ContentLength;
                Upload.FileName = fileName;
                Upload.UploadedLength = 0;
                Upload.Updatetype = 0;
                //--------start astix code 



                string FileSetType = Session["FileSetType"].ToString();

                SqlConnection Scon = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
                SqlCommand Scmd = new SqlCommand();
                Scmd.Connection = Scon;
                Scmd.CommandText = "[spGetFileSetId]";
                Scmd.CommandType = CommandType.StoredProcedure;
                Scmd.Parameters.AddWithValue("@FileName", fileNameWithoutExt + "_" + Convert.ToString(Session["username"]).ToLower());
                Scmd.Parameters.AddWithValue("@FileSetType", FileSetType);
                Scmd.Parameters.AddWithValue("@LoginId", Session["LoginID"].ToString());
                Scmd.Parameters.Add("@FileSetId", SqlDbType.VarChar, 30);
                Scmd.Parameters["@FileSetId"].Direction = ParameterDirection.Output;
                Scon.Open();
                Scmd.ExecuteNonQuery();
                Scon.Close();
                clsSendLogMail.FnWriteLogFile_Log("", "sp spGetFileSetId completed");
                string FileSetID = Scmd.Parameters["@FileSetId"].Value.ToString();

                string newfilename = Path.GetFileNameWithoutExtension(this.fileUpload.FileName) + "_" + FileSetID + "_" + Convert.ToString(Session["username"]).ToLower() + Path.GetExtension(this.fileUpload.FileName);

                //-------- end astix code

                //Build the strucutre and stuff it into session

                Upload.NewFileName = Path.Combine(path, newfilename);
                Upload.FileSetId = FileSetID;
                Upload.FileSetType = FileSetType;
                //Let the polling process know that we are done initializing ...


                //set the buffer size to something larger.
                //the smaller the buffer the longer it will take to download, 
                //but the more precise your progress bar will be.
                int bufferSize = 1;
                byte[] buffer = new byte[bufferSize];




                //Writing the byte to disk
                using (FileStream fs = new FileStream(Path.Combine(path, newfilename), FileMode.Create)) //Path.Combine(path, fileName) raju
                {
                    //Aslong was we haven't written everything ...
                    while (Upload.UploadedLength < Upload.ContentLength)
                    {
                        //Fill the buffer from the input stream
                        int bytes = this.fileUpload.PostedFile.InputStream.Read(buffer, 0, bufferSize);
                        //Writing the bytes to the file stream
                        fs.Write(buffer, 0, bytes);
                        //Update the number the webservice is polling on to the session
                        Upload.UploadedLength += bytes;
                    }
                }
                //Call parent page know we have processed the uplaod
                try
                {
                    Upload.IsReady = false;
                    Upload.Updatetype = 1;
                    string Uploadfullfilepath = HttpContext.Current.Server.MapPath(@"Uploads/" + newfilename);
                    string ErrorMsg = "";

                    clsSendLogMail.FnWriteLogFile_Log("", "file opening started.. ");
                    //FileStream oStream = File.Open(Uploadfullfilepath, FileMode.Open,FileAccess.Read);
                    //if (dsUnUpdated == null)
                    //{
                    //    IExcelDataReader iExcelDataReader = ExcelReaderFactory.CreateBinaryReader(oStream);
                    //    while (iExcelDataReader.Read())
                    //    {

                    //    }
                    //    iExcelDataReader.IsFirstRowAsColumnNames = true;

                    //    dsUnUpdated = iExcelDataReader.AsDataSet();

                    //    iExcelDataReader.Close();
                    //}
                    using (XLWorkbook workBook = new XLWorkbook(Uploadfullfilepath))
                    {
                        if (workBook.Worksheets.Count > 0)
                        {
                            Upload.IsReady = true;
                            int flg = 0;
                            IXLWorksheet workSheet = workBook.Worksheet(1);

                            SaveFile clsSave = new SaveFile();
                            //Create a new DataTable.
                            DataTable dt = new DataTable();
                            clsSendLogMail.FnWriteLogFile_Log("", " reading excel file for datatable");

                            dt = clsSave.createUpload_tbl(dt, workSheet, FileSetID, FileSetType, newfilename, Upload);

                            clsSendLogMail.FnWriteLogFile_Log("", " datatable loading complete");

                            long dtcount = 0;
                            if (dt.Rows.Count > 0 && flg == 0)
                            {
                                dtcount = dt.Rows.Count;
                                Upload.ContentLength = 0;
                                Upload.UploadedLength = 0;
                                Upload.Updatetype = 2;
                                string strUpload = UploadData(dt, workSheet.Name, FileSetType, newfilename, Upload, drcpType, flgType);
                                if (strUpload.Split('|')[0] == "1")
                                {
                                    flg = 1;
                                    ErrorMsg = strUpload.Split('|')[1];
                                }

                                dt.Dispose();
                            }
                            else
                            {
                                flg = 1;
                                ErrorMsg = "No data found in " + Path.GetFileName(Uploadfullfilepath) + " File.";
                                dt.Dispose();
                            }


                            if (flg == 0)
                            {
                                Upload.ContentLength = dtcount;
                                Upload.UploadedLength = dtcount;
                                Upload.Updatetype = 3;
                                DataSet ds1 = new DataSet();
                                SqlConnection Scon1 = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
                                List<SqlParameter> sp = null;
                                string spName = "";
                                if (FileSetType == "1")
                                {
                                    spName = drcpType == 1 ? "spImportDRCPPlan" : "spImportDRCPPlan2";
                                    clsSendLogMail.FnWriteLogFile_Log("", " executing " + spName);
                                    sp = new List<SqlParameter>()
                            {
                            new SqlParameter("@FileSetId", FileSetID),
                            new SqlParameter("@NodeId", SiteNodeId),
                            new SqlParameter("@NodeType", SiteNodeType)
                            };
                                }
                                else if (FileSetType == "2")
                                {
                                    spName = "spImportSBFPCodeMapping";
                                    clsSendLogMail.FnWriteLogFile_Log("", " executing " + spName);
                                    sp = new List<SqlParameter>()
                            {
                            new SqlParameter("@FileSetId", FileSetID),
                            new SqlParameter("@SiteNodeId", SiteNodeId),
                            new SqlParameter("@SiteNodeType", SiteNodeType)
                            };
                                }
                                else if (FileSetType == "3")
                                {
                                    spName = "spImportCentralSBF";
                                    clsSendLogMail.FnWriteLogFile_Log("", " executing " + spName);
                                    sp = new List<SqlParameter>()
                              {
                                 new SqlParameter("@FileSetId", FileSetID)
                              };
                                }
                                else if (FileSetType == "4")
                                {
                                    spName = "spImportStoreContactDetail";
                                    clsSendLogMail.FnWriteLogFile_Log("", " executing " + spName);
                                    sp = new List<SqlParameter>()
                              {
                                 new SqlParameter("@FileSetId", FileSetID),
                                 new SqlParameter("@NodeId", SiteNodeId),
                                 new SqlParameter("@NodeType", SiteNodeType),
                                 new SqlParameter("@flgType", flgType)
                              };
                                }
                                else if (FileSetType == "5")
                                {
                                    spName = drcpType == 1 ? "spImportSwingCCR" : "spImportLeapCCR";
                                    clsSendLogMail.FnWriteLogFile_Log("", " executing " + spName);
                                    sp = new List<SqlParameter>()
                              {
                                 new SqlParameter("@FileSetId", FileSetID),
                                 new SqlParameter("@NodeId", SiteNodeId),
                                 new SqlParameter("@NodeType", SiteNodeType)
                              };
                                }
                                else if (FileSetType == "6")
                                {
                                    spName = "spImportSUBDDRCPPlan";
                                    clsSendLogMail.FnWriteLogFile_Log("", " executing " + spName);
                                    sp = new List<SqlParameter>()
                              {
                                 new SqlParameter("@FileSetId", FileSetID),
                                 new SqlParameter("@NodeId", SiteNodeId),
                                 new SqlParameter("@NodeType", SiteNodeType)
                              };
                                }
                                else if (FileSetType == "17")
                                {
                                    spName = "spDataLoadLeapDSECallingData";
                                    clsSendLogMail.FnWriteLogFile_Log("", " executing " + spName);
                                    sp = new List<SqlParameter>()
                              {
                                 new SqlParameter("@FileSetId", FileSetID)
                                 //new SqlParameter("@NodeId", SiteNodeId),
                                 //new SqlParameter("@NodeType", SiteNodeType)
                              };
                                }
                                else if (FileSetType == "19")
                                {
                                    spName = "spImportActiveSBFList";
                                    clsSendLogMail.FnWriteLogFile_Log("", " executing " + spName);
                                    sp = new List<SqlParameter>()
                            {
                            new SqlParameter("@FileSetId", FileSetID),
                            new SqlParameter("@SiteNodeId", SiteNodeId),
                            new SqlParameter("@SiteNodeType", SiteNodeType)
                            };
                                }
                                string storedProcName = spName;
                                ds1 = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, Scon1, sp);
                                clsSendLogMail.FnWriteLogFile_Log("", " complete " + spName);
                                string sresponses = "0^File uploaded successfully";

                                if (Convert.ToInt32(ds1.Tables[0].Rows[0][0]) > 0)
                                {

                                    string js3 = "window.parent.onComplete(5,'File uploaded successfully but some data have been rejected,please check and upload again after correction.','{0}','{1} of {2} rows','{3}','{4}','{5}','{6}');";
                                    ScriptManager.RegisterStartupScript(this, typeof(UploadEngine), "progress", string.Format(js3, fileName, Upload.UploadedLength, Upload.ContentLength, newfilename, FileSetID, FileSetType, 4), true);
                                }
                                else
                                {
                                    string js2 = "window.parent.onComplete(1,'File uploaded successfully','{0}','{1} of {2} rows','{3}','{4}','{5}','{6}');";
                                    ScriptManager.RegisterStartupScript(this, typeof(UploadEngine), "progress", string.Format(js2, fileName, Upload.UploadedLength, Upload.ContentLength, newfilename, FileSetID, FileSetType, 5), true);
                                }
                            }
                            else
                            {
                                string js1 = "window.parent.onComplete(4,'" + ErrorMsg.Replace("'", "") + "','{0}','{1} of {2} rows','{3}','{4}','{5}','{6}');";
                                ScriptManager.RegisterStartupScript(this, typeof(UploadEngine), "progress", string.Format(js1, fileName, Upload.UploadedLength, Upload.ContentLength, newfilename, FileSetID, FileSetType, 5), true);
                            }
                        }
                        else
                        {
                            string js5 = "window.parent.onComplete(4,'No Worksheet found !','{0}','{1} of {2} rows','{3}','{4}','{5}','{6}');";
                            ScriptManager.RegisterStartupScript(this, typeof(UploadEngine), "progress", string.Format(js5, fileName, Upload.UploadedLength, Upload.ContentLength, newfilename, FileSetID, FileSetType, 0), true);
                        }
                    }
                }
                catch (Exception ex)
                {
                    var error = ex.Message.Replace("'", "");
                    error = error.Replace(System.Environment.NewLine, "");
                    string js = "window.parent.onComplete(4, '" + error + "','','0 of 0 Bytes','','','',0);";
                    ScriptManager.RegisterStartupScript(this, typeof(UploadEngine), "progress", js, true);
                }

            }
            else
            {
                //Call parent page know we have processed the uplaod
                const string js = "window.parent.onComplete(4, 'There was a problem with the file.','','0 of 0 Bytes','','','');";
                ScriptManager.RegisterStartupScript(this, typeof(UploadEngine), "progress", js, true);
            }
            //Let webservie know that we are not yet ready
            Upload.IsReady = false;
        }
    }
    #endregion












}
