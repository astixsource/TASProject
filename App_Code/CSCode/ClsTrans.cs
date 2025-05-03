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

/// <summary>
/// Summary description for ClsTrans
/// </summary>
public class ClsTrans
{
    public string IMEIno, TransDate, StoreID, ProdID, Stock, OrderQty, OrderVal, FreeQty;
    public string DisVal, SchemeID, AppliedSlab, AppliedAbsVal, Sstat, SampleQuantity, FreeProdId, AppliedSchemeIds;
    public string ProdRate;
	public ClsTrans()
	{
		//
		// TODO: Add constructor logic here
		//
	}
}
