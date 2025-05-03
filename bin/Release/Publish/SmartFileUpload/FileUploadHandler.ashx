<%@ WebHandler Language="C#" Class="FileUploadHandler" %>

using System;
using System.IO;
using System.Web;
using System.Data;
using System.Linq;
using ClosedXML.Excel;
using System.Net.Mail;
using System.Data.SqlClient;
using System.Configuration;
using System.Text;
using System.Text.RegularExpressions;
using Newtonsoft.Json;

public class FileUploadHandler : IHttpHandler, System.Web.SessionState.IRequiresSessionState  {



    public void ProcessRequest (HttpContext context)
    {
        if (context.Request.Files.Count > 0)
        {

            HttpFileCollection files = context.Request.Files;
            string branchcode=context.Request.Form["branchcode"].ToString();
            string msg = UploadExcel(files,branchcode);//postedFile
            context.Response.Write(msg);

        }

    }




    private string UploadExcel(HttpFileCollection files, string branchcode)//, string FileSetType HttpPostedFile File_Up
    {
        try
        {
            for (int i = 0; i < files.Count; i++)
            {

                HttpPostedFile File_Up = files[i];
                string FileSetType = File_Up.FileName.Split('#')[1];


                string ErrorMsg = "";
                DataSet ds = new DataSet();
                SqlConnection Scon = new SqlConnection(ConfigurationManager.AppSettings["strConn"]);
                SqlCommand Scmd = new SqlCommand();
                Scmd.Connection = Scon;
                Scmd.CommandText = "[spGetFileSetId]";
                Scmd.CommandType = CommandType.StoredProcedure;
                Scmd.Parameters.AddWithValue("@FileName", Path.GetFileName(File_Up.FileName.Split('#')[0]));
                Scmd.Parameters.AddWithValue("@FileSetType", FileSetType);
                Scmd.Parameters.AddWithValue("@LoginId", HttpContext.Current.Session["LoginID"].ToString());
                Scmd.Parameters.Add("@FileSetId", SqlDbType.VarChar, 30);
                Scmd.Parameters["@FileSetId"].Direction = ParameterDirection.Output;
                Scon.Open();
                Scmd.ExecuteNonQuery();
                Scon.Close();

                string FileSetID = Scmd.Parameters["@FileSetId"].Value.ToString();

                
                string filename = FileSetID  + "_"+branchcode+"_"+Path.GetFileNameWithoutExtension(File_Up.FileName.Split('#')[0])  + Path.GetExtension(File_Up.FileName.Split('#')[0]);

                //Save the uploaded Excel file.
                string filePath = HttpContext.Current.Server.MapPath("TASFiles/") + filename;
                File_Up.SaveAs(filePath);

               
            }
            return "0^File Uploaded Successfully!";
        }
        catch (Exception ex)
        {
            return "1^"+ex.Message.ToString();
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