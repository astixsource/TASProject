using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Default2 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void btn1_Click(object sender, EventArgs e)
    {
        WebClient webClient = new WebClient();
        webClient.DownloadFile(new Uri("http://localhost:50286/PNGApi/Test1"), Server.MapPath("~/Logs/abc.csv"));
    }
}