using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using ClosedXML.Excel;
using System.IO;
using System.Text.RegularExpressions;

public class SaveFile
{
    public string FileName { set; get; }
    public string FileExtension { set; get; }
    public byte[] FileContent { set; get; }

    public DataTable createUpload_tbl(DataTable dt, IXLWorksheet workSheet, string FileSetID, string FileSetType, string sFileName, UploadDetail Upload)
    {
        try
        {
            bool firstRow = true;
            string strDateTime = DateTime.Now.ToString();
            var firstCell = workSheet.FirstCellUsed();
            var lastCell = workSheet.LastCellUsed();
            var range = workSheet.Range(firstCell.Address, lastCell.Address);
            // var table = range.CreateTable();
            int i = 0, j = 0; ;

            Upload.Updatetype = 1;
            Upload.UploadedLength = 1;
            Upload.ContentLength = workSheet.RowsUsed().Count();

            foreach (var row in range.Rows())
            {
                i = 0; j = 0;
                if (firstRow)
                {
                    foreach (var cell in row.Cells())
                    {

                        dt.Columns.Add(cell.Value.ToString().Trim());
                        i++;
                    }
                    dt.Columns.Add("FileSetID", typeof(string));
                    firstRow = false;
                }
                else
                {
                    dt.Rows.Add();
                    foreach (var cell in row.Cells())
                    {
                        if ((i == 0 && cell.Value.ToString() == "") || (i == 1 && cell.Value.ToString() == ""))
                        {
                            j++;
                        }

                        dt.Rows[dt.Rows.Count - 1][i] = Convert.ToString(cell.Value);
                        i++;
                    }
                    dt.Rows[dt.Rows.Count - 1][dt.Columns.Count - 1] = FileSetID;
                }
                if (j == 2)
                {
                    dt.Rows.RemoveAt(dt.Rows.Count - 1);
                    break;
                }
                Upload.UploadedLength += 1;
            }
        }
        catch (Exception ex)
        {
            //clsSendLogMail.SendErrorMail("Error while Creating DataTable. \n : " + ex.Message, sFileName);
            throw ex;
        }
        return dt;
    }


    public DataTable createUpload_tblcsv(DataTable dt, StreamReader sr, string FileSetID, string FileSetType, string sFileName, UploadDetail Upload, string fullfilepath)
    {
        int lineno = 0;
        int maxcol = 0;
        try
        {

            System.Text.StringBuilder Fulltext = new System.Text.StringBuilder();

            // clsSendLogMail.FnWriteLogFile_Log("", " start csv reading");

            string[] headers = sr.ReadLine().Split(',');
            maxcol = headers.Count();
            for (int i = 0; i < headers.Count(); i++)
            {
                dt.Columns.Add(headers[i].Trim().Replace("\"", "").Replace("\r", ""));
            }
            dt.Columns.Add("FileSetID", typeof(string));

            while (!sr.EndOfStream)
            {
                lineno++;
                //string[] rows = sr.ReadLine().Split(',');

                string test = sr.ReadLine();
                string[] rows = Regex.Split(test, ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)").Select(x => x.Replace("\"", "")).ToArray();

                if (maxcol == rows.Count())
                {
                    DataRow dr = dt.NewRow();
                    for (int i = 0; i < rows.Count(); i++)
                    {
                        //lineno = i;
                        dr[i] = rows[i];
                    }
                    dr[rows.Count()] = FileSetID;
                    dt.Rows.Add(dr);
                }
            }

            /*
            while (!sr.EndOfStream)
                    {
                //var someoflines = File.ReadLines(fullfilepath).Select(line => int.Parse(line)).Sum();
                    //    Fulltext.Append(Convert.ToString(sr.ReadToEnd().ToString())); //read full file text  
                clsSendLogMail.FnWriteLogFile_Log("", " complete Fulltext");
                //string[] rows = Fulltext.ToString().Split('\n'); //split full file text into rows 

                string[] rows = sr.ReadLine().Split('\n');
                for (int i = 0; i < rows.Count() - 1; i++)
                        {
                            string[] rowValues = rows[i].Split(','); //split each row with comma to get individual values  
                            {
                                if (i == 0)
                                {
                            clsSendLogMail.FnWriteLogFile_Log("", " start column populate in datatable");
                            for (int j = 0; j < rowValues.Count(); j++)
                                    {
                                        dt.Columns.Add(rowValues[j].Trim().Replace("\"","").Replace("\r", "")); //add headers  
                                    }
                            dt.Columns.Add("FileSetID", typeof(string));
                        }
                                else
                                {
                            clsSendLogMail.FnWriteLogFile_Log("", " start data populate in datatable");
                            DataRow dr = dt.NewRow();
                                    for (int k = 0; k < rowValues.Count(); k++)
                                    {
                                        dr[k] = rowValues[k].ToString().Replace("\"", "");
                                    }
                               dr[rowValues.Count()] = FileSetID;
                            dt.Rows.Add(dr); //add other rows  
                                }
                            }
                        }
                    }

                */


        }
        catch (Exception ex)
        {
            //clsSendLogMail.SendErrorMail("Error while Creating DataTable. \n : " + ex.Message, sFileName);
            throw ex;
        }
        //clsSendLogMail.FnWriteLogFile_Log("", " complete  datatable");
        return dt;
    }

}