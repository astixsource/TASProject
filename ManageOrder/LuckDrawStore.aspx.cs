using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net.Mail;
using System.Net;
public partial class ManageOrder_LuckDrawStore : System.Web.UI.Page
{
    DataTable _dt;
    protected void Page_Load(object sender, EventArgs e)
    {

    }


    //Get Scheme And Product Detail Bases on Store
    [System.Web.Services.WebMethod()]
    public static string fnDSEList(int LoginId)
    {
        StringBuilder sbExcel = new StringBuilder();
        SqlConnection con = null;
        con = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
        DataSet Ds = null;
        DataSet Ds1 = null;
        string stresponse = "";
        try
        {
            string storedProcName = "spGetLuckyDrawList";
            List<SqlParameter> sp = new List<SqlParameter>()
                    {
                   //new SqlParameter("@SiteNodeId", SiteNodeId),
                   //new SqlParameter("@SiteNodeType", SiteNodeType),
                   //new SqlParameter("@BranchNodeId", BranchNodeId),
                   //new SqlParameter("@BranchNodeType", BranchNodeType),
                   new SqlParameter("@LoginId", "23038")//,
                   //new SqlParameter("@AttndDate", DateTime.Now.ToString("dd-MMM-yyyy"))
                };
            Ds = clsDbCommand.ExecuteQueryReturnDataSet(storedProcName, con, sp);




            DataRow dr = Ds.Tables[1].NewRow();
            dr["VoucherId"] = "0";
            dr["VoucherName"] = "---Select---";
            Ds.Tables[1].Rows.InsertAt(dr, 0);

            StringBuilder str = new StringBuilder();



            if (Ds.Tables[0].Rows.Count > 0)
            {
                string[] SkipColumn = new string[2];
                SkipColumn[0] = "EmailId";
                SkipColumn[1] = "LuckDrawId";
                

                int isSubmitted = 0;// int.Parse(Ds.Tables[1].Rows[0]["isSubmitted"].ToString());
                //StartDate = DateTime.Parse(Ds.Tables[0].Rows[0]["StartDate"].ToString()).ToString("dd MMM");
                str.Append("<table id='tbldbrlist' style='width:100%' isSubmitted=" + isSubmitted + " BranchNodeId='0' BranchNodeType='0'><thead><tr>");

                string ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";

                str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:4%' >SrNo</th>");
                for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                {
                    if (SkipColumn.Contains(Ds.Tables[0].Columns[j].ColumnName))
                    {
                        continue;
                    }
                    ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center'";
                    string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                    if (sColumnName == "Route Name")
                    {
                        ss = "style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:35%'";
                    }
                    str.Append("<th " + ss + ">" + sColumnName + "</th>");
                }
                //str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:8%'>Voucher</th>");
                str.Append("<th style='background-color:#26a6e7;color:#ffffff;vertical-align:middle;text-align:center;width:8%'>Action</th>");
                str.Append("</tr></thead><tbody>");

                ss = "";
                for (int i = 0; i < Ds.Tables[0].Rows.Count; i++)
                {

                    string dropdownlist_at = "";

                    //dropdownlist_at += "<option value='0'>--Select---</option>";
                    for (var j = 0; j < Ds.Tables[1].Rows.Count; j++)
                    {
                        //if (Ds.Tables[0].Rows[i]["TeleUserId"].ToString() == Ds1.Tables[0].Rows[j]["UserId"].ToString())
                        //{
                        //    dropdownlist_at += "<option value='" + Ds1.Tables[0].Rows[j]["UserId"].ToString() + "' selected>" + Ds1.Tables[0].Rows[j]["UserName"].ToString() + "</option>";
                        //}
                        //else
                        {
                            dropdownlist_at += "<option value='" + Ds.Tables[1].Rows[j]["VoucherId"].ToString() + "'>" + Ds.Tables[1].Rows[j]["VoucherName"].ToString() + "</option>";
                        }


                    }


                    //int MarkAtt = 0;//int.Parse(Ds.Tables[0].Rows[i]["flgAbsent"].ToString());
                    str.Append("<tr emailid='" + Ds.Tables[0].Rows[i]["emailid"].ToString() + "'  luckdrawid='" + Ds.Tables[0].Rows[i]["LuckDrawId"].ToString() + "'>"); //DSENodeId='" + Ds.Tables[0].Rows[i]["DSENodeId"].ToString() + "' DSENodeType='" + Ds.Tables[0].Rows[i]["DSENodeType"].ToString() + "' BranchNodeId='" + Ds.Tables[0].Rows[i]["BranchNodeId"].ToString() + "' BranchNodeType='" + Ds.Tables[0].Rows[i]["BranchNodeType"].ToString() + "' TeleReasonId='" + Ds.Tables[0].Rows[i]["TeleReasonId"].ToString() + "' gstno='2'
                    str.Append("<td style='text-align:center'>" + (i + 1) + "</td>");
                    for (int j = 0; j < Ds.Tables[0].Columns.Count; j++)
                    {
                        string sColumnName = Ds.Tables[0].Columns[j].ColumnName;
                        if (SkipColumn.Contains(sColumnName))
                        {
                            continue;
                        }
                        var sData = Ds.Tables[0].Rows[i][j];
                        ss = "style='text-align:left'";
                        if (sData.GetType() == typeof(int))
                        {
                            ss = "style='text-align:center'";
                        }

                        string flgSearchable = "Searchable='0'";
                        if (Ds.Tables[0].Columns[j].ColumnName == "DSECode" || Ds.Tables[0].Columns[j].ColumnName == "DSE")
                        {
                            flgSearchable = "Searchable='1'";
                        }



                        //ss += "'";
                        if (Ds.Tables[0].Columns[j].ColumnName.ToLower() == "voucher chosen")
                        {
                            str.Append("<td " + ss + "   " + flgSearchable + "><select> " + dropdownlist_at + "<select/></td>");
                        }
                        else
                        {
                            str.Append("<td " + ss + "   " + flgSearchable + ">" + sData + "</td>");
                        }

                    }

                    //str.Append("<td style='text-align:center'></td>");
                    str.Append("<td style='text-align:center'><a href='#' onclick='fnApply(this)' title='Click To Apply'>Apply</a></td>");
                    str.Append("</tr>");
                }
                str.Append("</tbody></table>");
            }
            else
            {
                str.Append("");
            }

            //sbExcel.Append("<table cellpadding='0' cellspacing='0' valign='middle' id='tblStoreCheck' border='1' rules='all'>");
            //sbExcel.Append("<thead>");
            //sbExcel.Append("<tr style=\"text-align: left; height:20px;\">");
            //sbExcel.Append(ConvertDataTableToHTMLHeader(Ds.Tables[0]));
            //sbExcel.Append("</tr></thead><tbody>");

            //sbExcel.Append(ConvertDataTableToHTML(Ds.Tables[0]));
            //sbExcel.Append("</tbody>");
            //sbExcel.Append("</table>");
            stresponse = str.ToString() + "|"+ JsonConvert.SerializeObject(Ds.Tables[0], Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });//+ "|" + JsonConvert.SerializeObject(Ds.Tables[1], Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore }) + "|" + JsonConvert.SerializeObject(Ds.Tables[2], Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore })
                       

        }
        catch (Exception ex)
        {
            stresponse = "2|" + ex.Message;
        }
        finally
        {
            con.Dispose();
        }

        return stresponse;
    }


    public static string ConvertDataTableToHTML(DataTable dt1)
    {
        DataTable dt = dt1.Copy();

        dt.Columns.Remove("CovAreaId");
        dt.Columns.Remove("CovAreaNodeType");
        dt.Columns.Remove("EntryPersonNodeID");

        string html = "";
        //add rows
        for (int i = 0; i < dt.Rows.Count; i++)
        {
            double total = 0;
            if (i % 2 == 0)
            {
                html += "<tr >";
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    if (j > 3)
                    {
                        html += "<td style=\"text-align: center;background-color: #ffffff; height:20px;\">" + dt.Rows[i][j].ToString() + "</td>";
                    }
                    else
                    {
                        html += "<td style=\"text-align: left;background-color: #ffffff; height:20px;\">" + dt.Rows[i][j].ToString() + "</td>";
                    }



                }

                html += "</tr>";
            }
            else
            {
                html += "<tr >";
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    if (j > 3)
                    {
                        html += "<td style=\"text-align: center;background-color: #f5f5f5; height:20px;\">" + dt.Rows[i][j].ToString() + "</td>";
                    }
                    else
                    {
                        html += "<td style=\"text-align: left;background-color: #f5f5f5; height:20px;\">" + dt.Rows[i][j].ToString() + "</td>";
                    }



                }
                html += "</tr>";
            }

        }

        return html;
    }

    public static string ConvertDataTableToHTMLHeader(DataTable dt1)
    {
        DataTable dt = dt1.Copy();
        dt.Columns.Remove("CovAreaId");
        dt.Columns.Remove("CovAreaNodeType");
        dt.Columns.Remove("EntryPersonNodeID");

        string html = "";
        //add header row
        html += "";
        for (int i = 0; i < dt.Columns.Count; i++)
            html += "<th style=\"background-color: #337ab7;color:#fff;\" >" + dt.Columns[i].ColumnName + "</th>";
        html += "";
        //add rows            
        return html;
    }


    [System.Web.Services.WebMethod()]
    public static string ApplyVoucher(string LuckDrawId, string LoginId, string VoucherId, string EmailId,string mailbody)
    {
        string finalresult = "0";
        try
        {
            SendMail(EmailId, "", "", "Lucky Draw Store", mailbody);

            
            string strConn = System.Configuration.ConfigurationManager.AppSettings["strConn"].ToString();
            using (SqlConnection Scon = new SqlConnection(strConn))
            {
                using (SqlCommand Scmd = new SqlCommand())
                {
                    Scmd.Connection = Scon;
                    Scmd.CommandText = "spAssignVoucherAgainstLuckDrawStore";
                    Scmd.CommandType = CommandType.StoredProcedure;
                    Scmd.Parameters.AddWithValue("@LuckDrawId", LuckDrawId);
                    Scmd.Parameters.AddWithValue("@LoginId", LoginId);
                    Scmd.Parameters.AddWithValue("@VoucherId", VoucherId);
                    Scmd.Parameters.AddWithValue("@EmailId", EmailId);
                   

                    Scmd.CommandTimeout = 0;
                    DataSet DsNew = new DataSet();
                    using (SqlDataAdapter Sdap = new SqlDataAdapter(Scmd))
                    {
                        Sdap.Fill(DsNew);
                    }
                   
                }
            }

            /**/
            finalresult = "1";
        }
        catch (Exception ex)
        {
            finalresult = "0";
            //FnWriteLogFile_Log(ex.ToString());
        }
        return finalresult;
    }



    public static void SendMail(string Mail_TO, string Mail_CC, string Mail_BCC, string Mail_Sub, string Mail_Body)//
    {
        try
        {
            SmtpClient _smtpClient = new SmtpClient();
            MailMessage _mailMessage = new MailMessage();
            NetworkCredential _loingInfo = new NetworkCredential();
            //_mailMessage.From = new MailAddress("Astixsolutions<support@astixsolutions.com>");
            _mailMessage.From = new MailAddress("TAS<tas-support@astixsolutions.com>");
            //_loingInfo.UserName = "Mails_Jyoti";
            //_loingInfo.Password = "JS@123456";
            _loingInfo.UserName = "tas-support@astixsolutions.com";
            _loingInfo.Password = "tas@1234";
            //_smtpClient.Host = "smtp.sendgrid.net";
            _smtpClient.Host = "smtp.gmail.com";
            _smtpClient.Port = 587;
            _smtpClient.UseDefaultCredentials = false;
            _smtpClient.Credentials = _loingInfo;
            //_smtpClient.EnableSsl = false;
            _smtpClient.EnableSsl = true;
            _mailMessage.To.Add(Mail_TO);

            if (Mail_CC != "")
            {
                _mailMessage.CC.Add(Mail_CC);
            }
            if (Mail_BCC != "")
            {
                _mailMessage.Bcc.Add(Mail_BCC);
            }

            _mailMessage.Subject = Mail_Sub;
            //_mailMessage.Body = "<font style='COLOR: #000080; FONT-FAMILY: Arial' size=2><table><tr><td>Hi ,</td></tr><tr><td>&nbsp;</td></tr><tr><td>Kindly find below GSK E-Learning Modules & Test Status-.</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td></td></tr></tr><tr><td>&nbsp;</td></tr><tr><td>Warm Regards,<br>Support</td></tr></table></font>";

            StringBuilder MailBody = new StringBuilder();
            MailBody.Append("<font style='color: #1f4e79;FONT-FAMILY:Arial,Verdana,sans-serif' size=2>");
            MailBody.Append("<p>Hi, </p>");
            MailBody.Append("<p>");
            MailBody.Append(Mail_Body);
            MailBody.Append("</p>");

            MailBody.Append("<p>Warm Regards,<br>");
            MailBody.Append("TAS Support Team</p>");
            MailBody.Append("</font>");
            //MailBody.Append("<p><span style='font-size:7.5pt; color:red'>*This is system generated email.</span></p>");

            _mailMessage.Body = MailBody.ToString();
            //foreach (string FileName in FileNames)
            //{
            //Attachment _attachMent = new Attachment(FileName);
            //_mailMessage.Attachments.Add(_attachMent);
            //}
            _mailMessage.IsBodyHtml = true;
            _smtpClient.Send(_mailMessage);
            _mailMessage.Dispose();

        }
        catch (Exception ex)
        {
            throw ex;
        }
    }



   
}