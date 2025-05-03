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

public partial class frmTAS_Integration_Engine : System.Web.UI.Page
{
    #region Web Methods

    private static void BulkCopy_SqlRowsCopied(object sender, SqlRowsCopiedEventArgs e)
    {
        UploadDetail Upload = (UploadDetail)HttpContext.Current.Session["UploadDetail"];
        Upload.UploadedLength = Convert.ToInt32(e.RowsCopied);
    }
    public static string UploadData(DataTable dtRecords, string ws_name, string FileSetType, string FileName, UploadDetail Upload)
    {
        try
        {
            

            string[] ArrProduct = new string[18];

            ArrProduct[0] = "branch_code";
            ArrProduct[1] = "branch_location";
            ArrProduct[2] = "company";
            ArrProduct[3] = "category";
            ArrProduct[4] = "brand";
            ArrProduct[5] = "brand_form";
            ArrProduct[6] = "sub_brand_form";
            ArrProduct[7] = "sku_code";
            ArrProduct[8] = "sku_name";
            ArrProduct[9] = "product_batch";
            ArrProduct[10] = "mrp";
            ArrProduct[11] = "slp";
            ArrProduct[12] = "srp";
            ArrProduct[13] = "upc";
            ArrProduct[14] = "msu";
            ArrProduct[15] = "hsn_code";
            ArrProduct[16] = "status";
            ArrProduct[17] = "FileSetID";



            string[] ArrPSR = new string[51];
            ArrPSR[0] = "document_no";
            ArrPSR[1] = "apply_to_doc";
            ArrPSR[2] = "document_date";
            ArrPSR[3] = "transaction_type";
            ArrPSR[4] = "subbrandform_name";
            ArrPSR[5] = "prod_name";
            ArrPSR[6] = "customer_name";
            ArrPSR[7] = "customer_code";
            ArrPSR[8] = "channel_description";
            ArrPSR[9] = "dse";
            ArrPSR[10] = "pcode";
            ArrPSR[11] = "customer_type";
            ArrPSR[12] = "hsn_code";
            ArrPSR[13] = "category";
            ArrPSR[14] = "brand";
            ArrPSR[15] = "brandform";
            ArrPSR[16] = "quantity";
            ArrPSR[17] = "gross_value";
            ArrPSR[18] = "discount";
            ArrPSR[19] = "taxable_scheme";
            ArrPSR[20] = "cgsttax";
            ArrPSR[21] = "sgsttax";
            ArrPSR[22] = "igsttax";
            ArrPSR[23] = "cesstax";
            ArrPSR[24] = "mracc_code";
            ArrPSR[25] = "mracc_desc";
            ArrPSR[26] = "vendor";
            ArrPSR[27] = "net_amount";
            ArrPSR[28] = "tax_on_discount";
            ArrPSR[29] = "tax_on_scheme";
            ArrPSR[30] = "tax_in_rlp";
            ArrPSR[31] = "retailing";
            ArrPSR[32] = "gross_in_slp";
            ArrPSR[33] = "po_no";
            ArrPSR[34] = "dse_code";
            ArrPSR[35] = "msu";
            ArrPSR[36] = "reason";
            ArrPSR[37] = "dist_gstinno";
            ArrPSR[38] = "ret_gstinno";
            ArrPSR[39] = "srn_ref_no";
            ArrPSR[40] = "composite";
            ArrPSR[41] = "cgsttax_rate";
            ArrPSR[42] = "sgsttax_rate";
            ArrPSR[43] = "igsttax_rate";
            ArrPSR[44] = "cesstax_rate";
            ArrPSR[45] = "branch_code";
            ArrPSR[46] = "branch_name";
            ArrPSR[47] = "order_mode";
            ArrPSR[48] = "tc_code";
            ArrPSR[49] = "tc_name";
            ArrPSR[50] = "FileSetID";


            string[] ArrRetailer = new string[37];
            ArrRetailer[0] = "branch_code";
            ArrRetailer[1] = "branch_location";
            ArrRetailer[2] = "retailer_code";
            ArrRetailer[3] = "retailer_name";
            ArrRetailer[4] = "address_1";
            ArrRetailer[5] = "address_2";
            ArrRetailer[6] = "pin_number";
            ArrRetailer[7] = "area";
            ArrRetailer[8] = "town";
            ArrRetailer[9] = "town_class";
            ArrRetailer[10] = "city";
            ArrRetailer[11] = "state";
            ArrRetailer[12] = "mobile_number";
            ArrRetailer[13] = "phone_number";
            ArrRetailer[14] = "contact_person";
            ArrRetailer[15] = "stl_name";
            ArrRetailer[16] = "dse_name";
            ArrRetailer[17] = "frequency";
            ArrRetailer[18] = "distance";
            ArrRetailer[19] = "class";
            ArrRetailer[20] = "channel";
            ArrRetailer[21] = "subchannel";
            ArrRetailer[22] = "credit_limit";
            ArrRetailer[23] = "credit_period";
            ArrRetailer[24] = "invoice_limit";
            ArrRetailer[25] = "gst_number";
            ArrRetailer[26] = "dl_number";
            ArrRetailer[27] = "dl_expiry_date";
            ArrRetailer[28] = "email";
            ArrRetailer[29] = "dob";
            ArrRetailer[30] = "doa";
            ArrRetailer[31] = "status";
            ArrRetailer[32] = "default_warehouse";
            ArrRetailer[33] = "restricted_orderswap_status";
            ArrRetailer[34] = "lattitude";
            ArrRetailer[35] = "longitude";
            ArrRetailer[36] = "FileSetID";

            string[] ArrAR = new string[16];
            ArrAR[0] = "branch_code";
            ArrAR[1] = "branch_location";
            ArrAR[2] = "dse_code";
            ArrAR[3] = "dse_name";
            ArrAR[4] = "retailer_code";
            ArrAR[5] = "retailer_name";
            ArrAR[6] = "sales_invoice_no";
            ArrAR[7] = "sales_invoice_date";
            ArrAR[8] = "aging_days";
            ArrAR[9] = "net_amount";
            ArrAR[10] = "paid_amount";
            ArrAR[11] = "balance_amount";
            ArrAR[12] = "credit_amount";
            ArrAR[13] = "channel_code";
            ArrAR[14] = "channel_name";
            ArrAR[15] = "FileSetID";

            string[] ArrDRCP = new string[18];
            ArrDRCP[0] = "branchcode";
            ArrDRCP[1] = "branchname";
            ArrDRCP[2] = "retailercode";
            ArrDRCP[3] = "retailername";
            ArrDRCP[4] = "retaileraddress";
            ArrDRCP[5] = "retailercontact";
            ArrDRCP[6] = "stlname";
            ArrDRCP[7] = "dsecode";
            ArrDRCP[8] = "dsename";
            ArrDRCP[9] = "channel";
            ArrDRCP[10] = "channeltype";
            ArrDRCP[11] = "channeldescription";
            ArrDRCP[12] = "routecode";
            ArrDRCP[13] = "routename";
            ArrDRCP[14] = "sectorname";
            ArrDRCP[15] = "latitude";
            ArrDRCP[16] = "longitude";
            ArrDRCP[17] = "FileSetID";


            clsSendLogMail.FnWriteLogFile_Log("", "start datatable error checking for valid data");
            clsSendLogMail.FnWriteLogFile_Log("", "start bulkcopy process");
            Upload.ContentLength = dtRecords.Rows.Count;
            Upload.UploadedLength = 0;
            Upload.Updatetype = 2;
            if (dtRecords != null && dtRecords.Rows.Count > 0)
            {
                string strcon = System.Configuration.ConfigurationManager.AppSettings["strConn"];


                switch (FileSetType)
                {
                    case "1":

                        if (dtRecords.Columns.Count - 1 != 36)
                        {
                            clsSendLogMail.SendErrorMail("<span style='font-weight:bold;'>Error while Updating Data in DB.</span><br/><br/><span style='font-weight:bold;'>File Name : </span>" + FileName + "<br/><span style='font-weight:bold;'>Date & Time : </span>" + DateTime.Now.ToString("dd-MMM-yyyy hh:mm tt") + "<br/><span style='font-weight:bold;'>Error : </span>Column count mis-match. It must be 36 Columns.", FileName);
                            return "1|Column count mis-match. It must be 36 Columns.";
                        }

                        for (int j = 0; j < dtRecords.Columns.Count; j++)
                        {
                            if (!ArrRetailer.Contains(dtRecords.Columns[j].ColumnName.ToString().Trim()))
                            {
                                clsSendLogMail.SendErrorMail("<span style='font-weight:bold;'>Error while Updating Data in DB.</span><br/><br/><span style='font-weight:bold;'>File Name : </span>" + FileName + "<br/><span style='font-weight:bold;'>Date & Time : </span>" + DateTime.Now.ToString("dd-MMM-yyyy hh:mm tt") + "<br/><span style='font-weight:bold;'>Error : </span>" + dtRecords.Columns[j].ColumnName.ToString().Trim() + " column is not a valid defined column. Please check ..", FileName);
                                return "1|" + dtRecords.Columns[j].ColumnName.ToString().Trim() + " column is not a valid defined column. Please check ..";
                            }
                        }
                        break;

                    case "2":

                        if (dtRecords.Columns.Count - 1 != 17)
                        {
                            clsSendLogMail.SendErrorMail("<span style='font-weight:bold;'>Error while Updating Data in DB.</span><br/><br/><span style='font-weight:bold;'>File Name : </span>" + FileName + "<br/><span style='font-weight:bold;'>Date & Time : </span>" + DateTime.Now.ToString("dd-MMM-yyyy hh:mm tt") + "<br/><span style='font-weight:bold;'>Error : </span>Column count mis-match. It must be 17 Columns.", FileName);
                            return "1|Column count mis-match. It must be 17 Columns.";
                        }

                        for (int j = 0; j < dtRecords.Columns.Count; j++)
                        {
                            if (!ArrProduct.Contains(dtRecords.Columns[j].ColumnName.ToString().Trim()))
                            {
                                clsSendLogMail.SendErrorMail("<span style='font-weight:bold;'>Error while Updating Data in DB.</span><br/><br/><span style='font-weight:bold;'>File Name : </span>" + FileName + "<br/><span style='font-weight:bold;'>Date & Time : </span>" + DateTime.Now.ToString("dd-MMM-yyyy hh:mm tt") + "<br/><span style='font-weight:bold;'>Error : </span>" + dtRecords.Columns[j].ColumnName.ToString().Trim() + " column is not a valid defined column. Please check ..", FileName);
                                return "1|" + dtRecords.Columns[j].ColumnName.ToString().Trim() + " column is not a valid defined column. Please check ..";
                            }
                        }

                        break;

                    case "3":

                        if (dtRecords.Columns.Count - 1 != 15)
                        {
                            clsSendLogMail.SendErrorMail("<span style='font-weight:bold;'>Error while Updating Data in DB.</span><br/><br/><span style='font-weight:bold;'>File Name : </span>" + FileName + "<br/><span style='font-weight:bold;'>Date & Time : </span>" + DateTime.Now.ToString("dd-MMM-yyyy hh:mm tt") + "<br/><span style='font-weight:bold;'>Error : </span>Column count mis-match. It must be 15 Columns.", FileName);
                            return "1|Column count mis-match. It must be 15 Columns.";
                        }

                        for (int j = 0; j < dtRecords.Columns.Count; j++)
                        {
                            if (!ArrAR.Contains(dtRecords.Columns[j].ColumnName.ToString().Trim()))
                            {
                                clsSendLogMail.SendErrorMail("<span style='font-weight:bold;'>Error while Updating Data in DB.</span><br/><br/><span style='font-weight:bold;'>File Name : </span>" + FileName + "<br/><span style='font-weight:bold;'>Date & Time : </span>" + DateTime.Now.ToString("dd-MMM-yyyy hh:mm tt") + "<br/><span style='font-weight:bold;'>Error : </span>" + dtRecords.Columns[j].ColumnName.ToString().Trim() + " column is not a valid defined column. Please check ..", FileName);
                                return "1|" + dtRecords.Columns[j].ColumnName.ToString().Trim() + " column is not a valid defined column. Please check ..";
                            }
                        }
                        break;
                    case "4":

                        if (dtRecords.Columns.Count - 1 != 50)
                        {
                            clsSendLogMail.SendErrorMail("<span style='font-weight:bold;'>Error while Updating Data in DB.</span><br/><br/><span style='font-weight:bold;'>File Name : </span>" + FileName + "<br/><span style='font-weight:bold;'>Date & Time : </span>" + DateTime.Now.ToString("dd-MMM-yyyy hh:mm tt") + "<br/><span style='font-weight:bold;'>Error : </span>Column count mis-match. It must be 50 Columns.", FileName);
                            return "1|Column count mis-match. It must be 50 Columns.";
                        }

                        for (int j = 0; j < dtRecords.Columns.Count; j++)
                        {
                            if (!ArrPSR.Contains(dtRecords.Columns[j].ColumnName.ToString().Trim()))
                            {
                                clsSendLogMail.SendErrorMail("<span style='font-weight:bold;'>Error while Updating Data in DB.</span><br/><br/><span style='font-weight:bold;'>File Name : </span>" + FileName + "<br/><span style='font-weight:bold;'>Date & Time : </span>" + DateTime.Now.ToString("dd-MMM-yyyy hh:mm tt") + "<br/><span style='font-weight:bold;'>Error : </span>" + dtRecords.Columns[j].ColumnName.ToString().Trim() + " column is not a valid defined column. Please check ..", FileName);
                                return "1|" + dtRecords.Columns[j].ColumnName.ToString().Trim() + " column is not a valid defined column. Please check ..";
                            }
                        }
                        break;

                    case "5":

                        if (dtRecords.Columns.Count - 1 != 17)
                        {
                            clsSendLogMail.SendErrorMail("<span style='font-weight:bold;'>Error while Updating Data in DB.</span><br/><br/><span style='font-weight:bold;'>File Name : </span>" + FileName + "<br/><span style='font-weight:bold;'>Date & Time : </span>" + DateTime.Now.ToString("dd-MMM-yyyy hh:mm tt") + "<br/><span style='font-weight:bold;'>Error : </span>Column count mis-match. It must be 17 Columns.", FileName);
                            return "1|Column count mis-match. It must be 17 Columns.";
                        }

                        for (int j = 0; j < dtRecords.Columns.Count; j++)
                        {
                            if (!ArrDRCP.Contains(dtRecords.Columns[j].ColumnName.ToString().Trim()))
                            {
                                clsSendLogMail.SendErrorMail("<span style='font-weight:bold;'>Error while Updating Data in DB.</span><br/><br/><span style='font-weight:bold;'>File Name : </span>" + FileName + "<br/><span style='font-weight:bold;'>Date & Time : </span>" + DateTime.Now.ToString("dd-MMM-yyyy hh:mm tt") + "<br/><span style='font-weight:bold;'>Error : </span>" + dtRecords.Columns[j].ColumnName.ToString().Trim() + " column is not a valid defined column. Please check ..", FileName);
                                return "1|" + dtRecords.Columns[j].ColumnName.ToString().Trim() + " column is not a valid defined column. Please check ..";
                            }
                        }
                        break;
                }


                using (SqlBulkCopy bulkCopy = new SqlBulkCopy(strcon))
                {
                    bulkCopy.BatchSize = 10000;
                    bulkCopy.NotifyAfter = 10000;

                    if (FileSetType == "1")
                    {
                        bulkCopy.DestinationTableName = "tmpRetailerLeap";


                        bulkCopy.ColumnMappings.Add("[branch_code]", "[branch_code]");
                        bulkCopy.ColumnMappings.Add("[branch_location]", "[branch_location]");
                        bulkCopy.ColumnMappings.Add("[retailer_code]", "[retailer_code]");
                        bulkCopy.ColumnMappings.Add("[retailer_name]", "[retailer_name]");
                        bulkCopy.ColumnMappings.Add("[address_1]", "[address_1]");
                        bulkCopy.ColumnMappings.Add("[address_2]", "[address_2]");
                        bulkCopy.ColumnMappings.Add("[pin_number]", "[pin_number]");
                        bulkCopy.ColumnMappings.Add("[area]", "[area]");
                        bulkCopy.ColumnMappings.Add("[town]", "[town]");
                        bulkCopy.ColumnMappings.Add("[town_class]", "[town_class]");
                        bulkCopy.ColumnMappings.Add("[city]", "[city]");
                        bulkCopy.ColumnMappings.Add("[state]", "[state]");
                        bulkCopy.ColumnMappings.Add("[mobile_number]", "[mobile_number]");
                        bulkCopy.ColumnMappings.Add("[phone_number]", "[phone_number]");
                        bulkCopy.ColumnMappings.Add("[contact_person]", "[contact_person]");
                        bulkCopy.ColumnMappings.Add("[stl_name]", "[stl_name]");
                        bulkCopy.ColumnMappings.Add("[dse_name]", "[dse_name]");
                        bulkCopy.ColumnMappings.Add("[frequency]", "[frequency]");
                        bulkCopy.ColumnMappings.Add("[distance]", "[distance]");
                        bulkCopy.ColumnMappings.Add("[class]", "[class]");
                        bulkCopy.ColumnMappings.Add("[channel]", "[channel]");
                        bulkCopy.ColumnMappings.Add("[subchannel]", "[subchannel]");
                        bulkCopy.ColumnMappings.Add("[credit_limit]", "[credit_limit]");
                        bulkCopy.ColumnMappings.Add("[credit_period]", "[credit_period]");
                        bulkCopy.ColumnMappings.Add("[invoice_limit]", "[invoice_limit]");
                        bulkCopy.ColumnMappings.Add("[gst_number]", "[gst_number]");
                        bulkCopy.ColumnMappings.Add("[dl_number]", "[dl_number]");
                        bulkCopy.ColumnMappings.Add("[dl_expiry_date]", "[dl_expiry_date]");
                        bulkCopy.ColumnMappings.Add("[email]", "[email]");
                        bulkCopy.ColumnMappings.Add("[dob]", "[dob]");
                        bulkCopy.ColumnMappings.Add("[doa]", "[doa]");
                        bulkCopy.ColumnMappings.Add("[status]", "[status]");
                        bulkCopy.ColumnMappings.Add("[default_warehouse]", "[default_warehouse]");
                        bulkCopy.ColumnMappings.Add("[restricted_orderswap_status]", "[restricted_orderswap_status]");
                        bulkCopy.ColumnMappings.Add("[lattitude]", "[lattitude]");
                        bulkCopy.ColumnMappings.Add("[longitude]", "[longitude]");
                        bulkCopy.ColumnMappings.Add("[FileSetId]", "[FileSetId]");

                    }
                    else if (FileSetType == "2")
                    {
                        bulkCopy.DestinationTableName = "tmpProduct_ncmaster"; //DONE


                        //foreach (var column in dtRecords.Columns)
                        //{
                        //    bulkCopy.ColumnMappings.Add(column.ToString(), column.ToString());
                        //}


                        bulkCopy.ColumnMappings.Add("[branch_code]", "[branch_code]");
                        bulkCopy.ColumnMappings.Add("[branch_location]", "[branch_location]");
                        bulkCopy.ColumnMappings.Add("[company]", "[company]");
                        bulkCopy.ColumnMappings.Add("[category]", "[category]");
                        bulkCopy.ColumnMappings.Add("[brand]", "[brand]");
                        bulkCopy.ColumnMappings.Add("[brand_form]", "[brand_form]");
                        bulkCopy.ColumnMappings.Add("[Sub_Brand_Form]", "[Sub_Brand_Form]");
                        bulkCopy.ColumnMappings.Add("[sku_code]", "[sku_code]");
                        bulkCopy.ColumnMappings.Add("[sku_name]", "[sku_name]");
                        bulkCopy.ColumnMappings.Add("[product_batch]", "[product_batch]");
                        bulkCopy.ColumnMappings.Add("[mrp]", "[MRP]");
                        bulkCopy.ColumnMappings.Add("[slp]", "[SLP]");
                        bulkCopy.ColumnMappings.Add("[srp]", "[srp]");
                        bulkCopy.ColumnMappings.Add("[upc]", "[UPC]");
                        bulkCopy.ColumnMappings.Add("[msu]", "[msu]");
                        bulkCopy.ColumnMappings.Add("[HSN_Code]", "[HSN_Code]");
                        bulkCopy.ColumnMappings.Add("[status]", "[Status]");
                        bulkCopy.ColumnMappings.Add("[FileSetId]", "[FileSetId]");

                    }
                    else if (FileSetType == "3")
                    {
                        bulkCopy.DestinationTableName = "tmpARLeap";

                        bulkCopy.ColumnMappings.Add("[branch_code]", "[branch_code]");
                        bulkCopy.ColumnMappings.Add("[branch_location]", "[branch_location]");
                        bulkCopy.ColumnMappings.Add("[dse_code]", "[dse_code]");
                        bulkCopy.ColumnMappings.Add("[dse_name]", "[dse_name]");
                        bulkCopy.ColumnMappings.Add("[retailer_code]", "[retailer_code]");
                        bulkCopy.ColumnMappings.Add("[retailer_name]", "[retailer_name]");
                        bulkCopy.ColumnMappings.Add("[sales_invoice_no]", "[sales_invoice_no]");
                        bulkCopy.ColumnMappings.Add("[sales_invoice_date]", "[sales_invoice_date]");
                        bulkCopy.ColumnMappings.Add("[aging_days]", "[aging_days]");
                        bulkCopy.ColumnMappings.Add("[net_amount]", "[net_amount]");
                        bulkCopy.ColumnMappings.Add("[paid_amount]", "[paid_amount]");
                        bulkCopy.ColumnMappings.Add("[balance_amount]", "[balance_amount]");
                        bulkCopy.ColumnMappings.Add("[credit_amount]", "[credit_amount]");
                        bulkCopy.ColumnMappings.Add("[channel_code]", "[channel_code]");
                        bulkCopy.ColumnMappings.Add("[channel_name]", "[channel_name]");
                        bulkCopy.ColumnMappings.Add("[FileSetId]", "[FileSetId]");

                    }


                    else if (FileSetType == "4")
                    {
                        bulkCopy.DestinationTableName = "tmpSalesSRNLeapData"; //DONE
                        bulkCopy.BulkCopyTimeout = 0;

                        bulkCopy.ColumnMappings.Add("[document_no]", "[document_no]");
                        bulkCopy.ColumnMappings.Add("[apply_to_doc]", "[apply_to_doc]");
                        bulkCopy.ColumnMappings.Add("[document_date]", "[document_date]");
                        bulkCopy.ColumnMappings.Add("[transaction_type]", "[transaction_type]");
                        bulkCopy.ColumnMappings.Add("[subbrandform_name]", "[subbrandform_name]");
                        bulkCopy.ColumnMappings.Add("[prod_name]", "[prod_name]");
                        bulkCopy.ColumnMappings.Add("[customer_name]", "[customer_name]");
                        bulkCopy.ColumnMappings.Add("[customer_code]", "[customer_code]");
                        bulkCopy.ColumnMappings.Add("[channel_description]", "[channel_description]");
                        bulkCopy.ColumnMappings.Add("[dse]", "[dse]");
                        bulkCopy.ColumnMappings.Add("[pcode]", "[pcode]");
                        bulkCopy.ColumnMappings.Add("[customer_type]", "[customer_type]");
                        bulkCopy.ColumnMappings.Add("[hsn_code]", "[hsn_code]");
                        bulkCopy.ColumnMappings.Add("[category]", "[category]");
                        bulkCopy.ColumnMappings.Add("[brand]", "[brand]");
                        bulkCopy.ColumnMappings.Add("[brandform]", "[brandform]");
                        bulkCopy.ColumnMappings.Add("[quantity]", "[quantity]");
                        bulkCopy.ColumnMappings.Add("[gross_value]", "[gross_value]");
                        bulkCopy.ColumnMappings.Add("[discount]", "[discount]");
                        bulkCopy.ColumnMappings.Add("[taxable_scheme]", "[taxable_scheme]");
                        bulkCopy.ColumnMappings.Add("[cgsttax]", "[cgsttax]");
                        bulkCopy.ColumnMappings.Add("[sgsttax]", "[sgsttax]");
                        bulkCopy.ColumnMappings.Add("[igsttax]", "[igsttax]");
                        bulkCopy.ColumnMappings.Add("[cesstax]", "[cesstax]");
                        bulkCopy.ColumnMappings.Add("[mracc_code]", "[mracc_code]");
                        bulkCopy.ColumnMappings.Add("[mracc_desc]", "[mracc_desc]");
                        bulkCopy.ColumnMappings.Add("[vendor]", "[vendor]");
                        bulkCopy.ColumnMappings.Add("[net_amount]", "[net_amount]");
                        bulkCopy.ColumnMappings.Add("[tax_on_discount]", "[tax_on_discount]");
                        bulkCopy.ColumnMappings.Add("[tax_on_scheme]", "[tax_on_scheme]");
                        bulkCopy.ColumnMappings.Add("[tax_in_rlp]", "[tax_in_rlp]");
                        bulkCopy.ColumnMappings.Add("[retailing]", "[retailing]");
                        bulkCopy.ColumnMappings.Add("[gross_in_slp]", "[gross_in_slp]");
                        bulkCopy.ColumnMappings.Add("[po_no]", "[po_no]");
                        bulkCopy.ColumnMappings.Add("[dse_code]", "[dse_code]");
                        bulkCopy.ColumnMappings.Add("[msu]", "[msu]");
                        bulkCopy.ColumnMappings.Add("[reason]", "[reason]");
                        bulkCopy.ColumnMappings.Add("[dist_gstinno]", "[dist_gstinno]");
                        bulkCopy.ColumnMappings.Add("[ret_gstinno]", "[ret_gstinno]");
                        bulkCopy.ColumnMappings.Add("[srn_ref_no]", "[srn_ref_no]");
                        bulkCopy.ColumnMappings.Add("[composite]", "[composite]");
                        bulkCopy.ColumnMappings.Add("[cgsttax_rate]", "[cgsttax_rate]");
                        bulkCopy.ColumnMappings.Add("[sgsttax_rate]", "[sgsttax_rate]");
                        bulkCopy.ColumnMappings.Add("[igsttax_rate]", "[igsttax_rate]");
                        bulkCopy.ColumnMappings.Add("[cesstax_rate]", "[cesstax_rate]");
                        bulkCopy.ColumnMappings.Add("[branch_code]", "[branch_code]");
                        bulkCopy.ColumnMappings.Add("[branch_name]", "[branch_name]");
                        bulkCopy.ColumnMappings.Add("[order_mode]", "[order_mode]");
                        bulkCopy.ColumnMappings.Add("[tc_code]", "[tc_code]");
                        bulkCopy.ColumnMappings.Add("[tc_name]", "[tc_name]");
                        bulkCopy.ColumnMappings.Add("[FileSetId]", "[FileSetId]");

                    }

                    else if (FileSetType == "5")
                    {
                        bulkCopy.DestinationTableName = "tmpDRCPLeap"; //DONE

                        bulkCopy.ColumnMappings.Add("[branchcode]", "[branchcode]");
                        bulkCopy.ColumnMappings.Add("[branchname]", "[branchname]");
                        bulkCopy.ColumnMappings.Add("[retailercode]", "[retailercode]");
                        bulkCopy.ColumnMappings.Add("[retailername]", "[retailername]");
                        bulkCopy.ColumnMappings.Add("[retaileraddress]", "[retaileraddress]");
                        bulkCopy.ColumnMappings.Add("[retailercontact]", "[retailercontact]");
                        bulkCopy.ColumnMappings.Add("[stlname]", "[stlname]");
                        bulkCopy.ColumnMappings.Add("[dsecode]", "[dsecode]");
                        bulkCopy.ColumnMappings.Add("[dsename]", "[dsename]");
                        bulkCopy.ColumnMappings.Add("[channel]", "[channel]");
                        bulkCopy.ColumnMappings.Add("[channeltype]", "[channeltype]");
                        bulkCopy.ColumnMappings.Add("[channeldescription]", "[channeldescription]");
                        bulkCopy.ColumnMappings.Add("[routecode]", "[routecode]");
                        bulkCopy.ColumnMappings.Add("[routename]", "[routename]");
                        bulkCopy.ColumnMappings.Add("[sectorname]", "[sectorname]");
                        bulkCopy.ColumnMappings.Add("[latitude]", "[latitude]");
                        bulkCopy.ColumnMappings.Add("[longitude]", "[longitude]");
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
                Upload.IsReady = true;


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

                    //using (XLWorkbook workBook = new XLWorkbook(Uploadfullfilepath))
                    //{
                    using (StreamReader sr = new StreamReader(Uploadfullfilepath))
                    {
                        //if (workBook.Worksheets.Count > 0)
                        //{
                            Upload.IsReady = true;
                            int flg = 0;

                        //IXLWorksheet workSheet = workBook.Worksheet(1);// csv

                            SaveFile clsSave = new SaveFile();
                            //Create a new DataTable.
                            DataTable dt = new DataTable();
                            clsSendLogMail.FnWriteLogFile_Log("", " reading excel file for datatable");

                            dt = clsSave.createUpload_tblcsv(dt, sr, FileSetID, FileSetType, newfilename, Upload, Uploadfullfilepath);

                            clsSendLogMail.FnWriteLogFile_Log("", " datatable loading complete");

                            long dtcount = 0;
                            if (dt.Rows.Count > 0 && flg == 0)
                            {
                                dtcount = dt.Rows.Count;
                                Upload.ContentLength = 0;
                                Upload.UploadedLength = 0;
                                Upload.Updatetype = 2;
                                SaveFile clsObj = new SaveFile();
                                string strUpload = UploadData(dt, "", FileSetType, newfilename, Upload);
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
                                Upload.UploadedLength = dtcount;
                                Upload.Updatetype = 3;
                                DataSet ds1 = new DataSet();
                                SqlConnection Scon1 = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
                                List<SqlParameter> sp = null;
                                string spName = "";

                            //    if (FileSetType == "1")
                            //    {
                            //        spName = "spImportDRCPPlan2";
                            //        clsSendLogMail.FnWriteLogFile_Log("", " executing " + spName);
                            //        sp = new List<SqlParameter>()
                            //{
                            //new SqlParameter("@FileSetId", FileSetID),
                            //new SqlParameter("@NodeId", SiteNodeId),
                            //new SqlParameter("@NodeType", SiteNodeType)
                            //};
                            //    }
                            //    else if (FileSetType == "2")
                            //    {
                            //        spName = "spImportSBFPCodeMapping";
                            //        clsSendLogMail.FnWriteLogFile_Log("", " executing " + spName);
                            //        sp = new List<SqlParameter>()
                            //{
                            //new SqlParameter("@FileSetId", FileSetID),
                            //new SqlParameter("@SiteNodeId", SiteNodeId),
                            //new SqlParameter("@SiteNodeType", SiteNodeType)
                            //};
                            //    }
                            //    else if (FileSetType == "3")
                            //    {
                            //        spName = "spImportCentralSBF";
                            //        clsSendLogMail.FnWriteLogFile_Log("", " executing " + spName);
                            //        sp = new List<SqlParameter>()
                            //  {
                            //     new SqlParameter("@FileSetId", FileSetID)
                            //  };
                            //    }
                            //    string storedProcName = spName;
                            //    ds1 = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, Scon1, sp);
                                clsSendLogMail.FnWriteLogFile_Log("", " complete " + spName);
                                string sresponses = "0^File uploaded successfully";

                                if (Convert.ToInt32(ds1.Tables[0].Rows[0][0]) > 0)
                                {

                                    string js3 = "window.parent.onComplete(5,'File uploaded successfully but some data have been rejected,please check and upload again after correction.','{0}','{1} of {2} rows','{3}','{4}','{5}','{6}');";
                                    ScriptManager.RegisterStartupScript(this, typeof(frmTAS_Integration_Engine), "progress", string.Format(js3, fileName, Upload.UploadedLength, Upload.ContentLength, newfilename, FileSetID, FileSetType, 4), true);
                                }
                                else
                                {
                                    string js2 = "window.parent.onComplete(1,'File uploaded successfully','{0}','{1} of {2} rows','{3}','{4}','{5}','{6}');";
                                    ScriptManager.RegisterStartupScript(this, typeof(frmTAS_Integration_Engine), "progress", string.Format(js2, fileName, Upload.UploadedLength, Upload.ContentLength, newfilename, FileSetID, FileSetType, 5), true);
                                }
                            }
                            else
                            {
                                string js1 = "window.parent.onComplete(4,'" + ErrorMsg.Replace("'", "") + "','{0}','{1} of {2} rows','{3}','{4}','{5}','{6}');";
                                ScriptManager.RegisterStartupScript(this, typeof(frmTAS_Integration_Engine), "progress", string.Format(js1, fileName, Upload.UploadedLength, Upload.ContentLength, newfilename, FileSetID, FileSetType, 5), true);
                            }

                        /**/
                        //}
                        //else
                        //{
                        //    string js5 = "window.parent.onComplete(4,'No Worksheet found !','{0}','{1} of {2} rows','{3}','{4}','{5}','{6}');";
                        //    ScriptManager.RegisterStartupScript(this, typeof(frmTAS_Integration_Engine), "progress", string.Format(js5, fileName, Upload.UploadedLength, Upload.ContentLength, newfilename, FileSetID, FileSetType, 0), true);
                        //}
                    }
                }
                catch (Exception ex)
                {
                    string js = "window.parent.onComplete(4, '" + ex.Message.Replace("'", "") + "','','0 of 0 Bytes','','','',0);";
                    ScriptManager.RegisterStartupScript(this, typeof(frmTAS_Integration_Engine), "progress", js, true);
                }

            }
            else
            {
                //Call parent page know we have processed the uplaod
                const string js = "window.parent.onComplete(4, 'There was a problem with the file.','','0 of 0 Bytes','','','');";
                ScriptManager.RegisterStartupScript(this, typeof(frmTAS_Integration_Engine), "progress", js, true);
            }
            //Let webservie know that we are not yet ready
            Upload.IsReady = false;
        }
    }
    #endregion

}