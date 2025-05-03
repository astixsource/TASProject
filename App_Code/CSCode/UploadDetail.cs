using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;

public class UploadDetail
{
    public bool IsReady { get; set; }
    public long ContentLength { get; set; }
    public long UploadedLength { get; set; }
    public string FileName { get; set; }
    public string NewFileName { get; set; }
    public string FileSetId { get; set; }
    public string FileSetType { get; set; }
    public int Updatetype { get; set; }
}
