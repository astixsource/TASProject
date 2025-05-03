function fnViewOrderList(OrderId, OrdPrcsId, divContainer, flgPrint, strOrderLen) {
    var strHTMLMain = "";
    $.ajax({
        url: "frmOrderPunching.aspx/fnViewOrderDetail",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{OrderId:' + OrderId + ',PrcsId:' + OrdPrcsId + '}',
        success: function (response) {
            //debugger;
            flgEditOrder = 1

            try {
                var str = response.d;
                if (str.substr(0, 1) == "2") {
                    $("#" + divContainer).html("Error - " + str.substr(2, str.length));
                    return false;
                }
                var result = $.parseJSON('[' + str.substr(2, str.length) + ']');
                resultViewData = [];
                resultViewData = result;
                //Order Master Deatails
                var strHTML = "<div style='height:550px;overflow-y:auto' id='divViewOrderMain'>";//Start Main Div
                strHTML += "<div class='block1' >";
                strHTML += "<div style='margin-bottom:15px;font-size:16px'><b><center>" + result[0].Table[0].OrdPrcsName + "</center></b></div>";
                strHTML += "<table>";
                strHTML += "<tr><td colspan='3' style='padding-bottom:5px'><b>Basic Detail</b></td></tr>";
                strHTML += "<tr>";
                strHTML += "<td><b>>>" + result[0].Table[0].OrderTypeDescr + "</b></td><td>";
                var OrdrCode = result[0].Table[0].OrderCode;
                var Customer = result[0].Table[0].Customer;
                strHTML += "<td><b>Order No -</b> " + OrdrCode + "</td>";
                var orderDate = result[0].Table[0].OrderDate;
                var TotDistVal = result[0].Table[0].TotLineLevelDisc;
                var TotOrderVal = result[0].Table[0].TotOrderVal;
                var TotOrderValWDisc = result[0].Table[0].TotOrderValWDisc;
                var TotTaxVal = result[0].Table[0].TotTaxVal;
                var NetOrderValue = result[0].Table[0].NetOrderValue;
                var ActAddDisc = result[0].Table[0].ActAddDisc;
                var flgInvoicePrinted = result[0].Table[0].flgInvoicePrinted;
                var OrderStatusID = result[0].Table[0].OrderStatusID;
                $("#cphRight_hdnflgInvoicePrinted").val(flgInvoicePrinted);
                var d = new Date(parseInt(result[0].Table[0].OrderDate.substr(6)));

                var gsttype = (result[0].Table[0].flgGST == undefined || result[0].Table[0].flgGST == null) ? "2" : result[0].Table[0].flgGST;
                strHTML += "<td><b>Order Date - </b>" + d.localeFormat("dd-MMM-yyyy") + "</td>";
                strHTML += "<td><b>Order Status -</b>" + result[0].Table[0].OrderStatusDescr + "</td>";
                strHTML += "<td><b>Order Process Name - </b>" + result[0].Table[0].OrdPrcsName + "</td>";
                strHTML += "</tr>";
                strHTML += "</table>";
                strHTML += "<table>";
                strHTML += "<tr>";
                if (result[0].Table[0].flgOffline == "3") {
                    strHTML += "<td><b>DSR Name</td><td>:</td><td>" + result[0].Table[0].Descr + "</td>";
                } else {
                    strHTML += "<td><b>Manufacturer Name</td><td>:</td><td>" + result[0].Table[0].Descr + "</td>";
                }
                strHTML += "<td><b>Store Name</td><td>:</td><td>" + Customer + "</td>";
                strHTML += "<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
                strHTML += "</tr>";
                strHTML += "<tr>";
                strHTML += "<td style='width:112px'><b>Delivery Scheduling</b></td><td>:</td><td>Single Location,Single Delivery Date</td>";
                strHTML += "<td style='width:110px'><b>Invoicing Location</b></td><td>:</td><td>Single Invoice Location</td>";
                strHTML += "<td style='width:110px' align='right'><b>Invoice Phasing</b></td><td>:</td><td>Invoice cum Delivery</td>";
                strHTML += "</tr>";
                strHTML += "</table></div>";




                //Delivery Detail
                var strHTMLD = "";
                var strDate = ""; var dlvry;
                if (result[0].Table3.length > 0) {
                    var d = new Date(parseInt(result[0].Table3[0].RequiredDeliveryDate.substr(6)));
                    dlvry = d;
                    strDate = d.localeFormat("dd-MMM-yyyy")
                } else {
                    strDate = "";
                }
                var strHTMLD = "";
                if (result[0].Table1.length > 0) {
                    strHTMLD = "<div><table>";
                    strHTMLD += "<tr><td colspan='3' style='padding-bottom:5px'><b>Delivery Detail</b></td></tr>";
                    strHTMLD += "<tr>";
                    strHTMLD += "<td style='width:122px'>Delivery Location</td><td>:</td><td>" + result[0].Table1[0].DelCompanyName + (result[0].Table1[0].DelCompanyCityName != null ? "(" + result[0].Table1[0].DelCompanyCityName + ")" : "") + "</td>";
                    strHTMLD += "</tr>";
                    strHTMLD += "<tr>";
                    strHTMLD += "<td>Contact Person</td><td>:</td><td>" + result[0].Table1[0].DelCompanyContactPerson + "," + result[0].Table1[0].DelCompanyTelNumber + "</td>";
                    strHTMLD += "</tr>";
                    strHTMLD += "<tr>";
                    strHTMLD += "<td>Delivery Address</td><td>:</td><td>" + result[0].Table1[0].DelCompanyAddress + "&nbsp;" + result[0].Table1[0].DelCompanyPinCode + "</td>";
                    strHTMLD += "</tr>";
                    strHTMLD += "<tr>";
                    strHTMLD += "<td>Email Address</td><td>:</td><td>" + result[0].Table1[0].DelCompanyEmailId + "</td>";
                    strHTMLD += "</tr>";
                    //Mukh
                    //if (result[0].Table10.length > 0) {
                    //    for (var dcnt = 0; dcnt < result[0].Table10.length; dcnt++) {
                    //        var stime = result[0].Table10[dcnt].DlvryStartTime;
                    //        var etime = result[0].Table10[dcnt].DlvryEndTime;
                    //        var st = new Date("00/00/0000 " + stime).localeFormat("hh:mm tt");
                    //        var et = new Date("00/00/0000 " + etime).localeFormat("hh:mm tt");
                    //        if (result[0].Table10[dcnt].DlvryTimeType == 1) {
                    //            strHTMLD += "<tr>";
                    //            strHTMLD += "<td>Prefered Delivery Time</td><td>:</td><td>" + st.split(" ")[0] + " " + st.split(" ")[1] + " Till : " + et.split(" ")[0] + " " + et.split(" ")[1] + "</td>";
                    //            strHTMLD += "</tr>";
                    //        }
                    //        if (result[0].Table10[dcnt].DlvryTimeType == 2) {
                    //            strHTMLD += "<tr>";
                    //            strHTMLD += "<td>Do not Deliver between</td><td>:</td><td>" + st.split(" ")[0] + " " + st.split(" ")[1] + " Till : " + et.split(" ")[0] + " " + et.split(" ")[1] + "</td>";
                    //            strHTMLD += "</tr>";
                    //        }
                    //    }
                    //}
                    strHTMLD += "<tr>";


                    strHTMLD += "<td>Required Delivery Date</td><td>:</td><td>" + strDate + "</td>";
                    strHTMLD += "</tr>";
                    strHTMLD += "</table></div>";

                    //Invoicing Detail
                    var strHTMLInv = "";
                    strHTMLInv = "<div><table>";
                    strHTMLInv += "<tr><td colspan='3' style='padding-bottom:5px'><b>Invoicing Detail</b></td></tr>";
                    strHTMLInv += "<tr>";
                    strHTMLInv += "<td style='width:122px'>Bill-to-Cutomer Name</td><td>:</td><td>" + result[0].Table1[0].BillCompanyName + (result[0].Table1[0].BillCompanyCityName != null ? "(" + result[0].Table1[0].BillCompanyCityName + ")" : "") + "</td>";
                    strHTMLInv += "</tr>";
                    strHTMLInv += "<tr>";
                    strHTMLInv += "<td>Contact Person</td><td>:</td><td>" + result[0].Table1[0].BillCompanyContactPerson + "," + result[0].Table1[0].BillCompanyTelNumber + "</td>";
                    strHTMLInv += "</tr>";
                    strHTMLInv += "<tr>";
                    strHTMLInv += "<td>Billing Address</td><td>:</td><td>" + result[0].Table1[0].BillCompanyAddress + "&nbsp;" + result[0].Table1[0].BillCompanyPinCode + "</td>";
                    strHTMLInv += "</tr>";
                    strHTMLInv += "<td>Email Address</td><td>:</td><td>" + result[0].Table1[0].BillCompanyEmailId + "</td>";
                    strHTMLInv += "</tr>";
                    strHTMLInv += "</table></div>";

                    strHTML += "<div class='block1'><table><tr>"
                    strHTML += "<td valign='top'>" + strHTMLD + "</td><td valign='top'>" + strHTMLInv + "</td>"
                    strHTML += "</tr></table></div>";
                }
                //Product Details
                var style = "border-bottom: 1px solid #A0A0A0; border-left: 1px solid #A0A0A0;";
                var style1 = "border-bottom: 1px solid #A0A0A0;";
                strHTML += "<div><table ><tr><td style='padding-bottom:5px'><b>Product Detail</b></td></tr></table>";
                strHTML += "<center><table style='border: 1px solid #A0A0A0;font-size: 8.1pt;width:98%' cellpadding='2' cellspacing='0'>";
                if (gsttype == 1) {
                    strHTML += "<tr><td rowspan='2' style='" + style1 + "' align='center'><b>SKU Code</b></td><td rowspan='2' style='" + style + "' align='center'><b>Product Description</b></td><td rowspan='2' style='" + style + "' align='center'><b>Order Qty</b></td><td rowspan='2' style='" + style + "' align='center'><b>UOM</b></td><td rowspan='2' style='" + style + "' align='center'><b>Cess</b></td><td colspan='2' style='" + style + "' align='center'><b>Rate Per</b></td><td rowspan='2' style='" + style + "' align='center'><b>Free Qty</b></td><td rowspan='2' style='" + style + "' align='center'><b>Disc Value</b></td><td rowspan='2' style='" + style + "' align='center'><b>Val. B.Tax</b></td><td rowspan='2' style='" + style + "' align='center'><b>GST</b></td><td rowspan='2' style='" + style + "' align='center'><b>IGST Amt.</b></td><td rowspan='2' style='" + style + "' align='center'><b>Val. A.Tax</b></td></tr>";
                    strHTML += "<tr><td style='" + style + "' align='center'><b>KG</b></td><td style='" + style + "' align='center'><b>Unit</b></td></tr>";
                } else {
                    strHTML += "<tr><td rowspan='2' style='" + style1 + "' align='center'><b>SKU Code</b></td><td rowspan='2' style='" + style + "' align='center'><b>Product Description</b></td><td rowspan='2' style='" + style + "' align='center'><b>Order Qty</b></td><td rowspan='2' style='" + style + "' align='center'><b>UOM</b></td><td rowspan='2' style='" + style + "' align='center'><b>Cess</b></td><td colspan='2' style='" + style + "' align='center'><b>Rate Per</b></td><td rowspan='2' style='" + style + "' align='center'><b>Free Qty</b></td><td rowspan='2' style='" + style + "' align='center'><b>Disc Value</b></td><td rowspan='2' style='" + style + "' align='center'><b>Val. B.Tax</b></td><td rowspan='2' style='" + style + "' align='center'><b>GST</b></td><td rowspan='2' style='" + style + "' align='center'><b>CGST Amt.</b></td><td rowspan='2' style='" + style + "' align='center'><b>SGST Amt.</b></td><td rowspan='2' style='" + style + "' align='center'><b>Val. A.Tax</b></td></tr>";
                    strHTML += "<tr><td style='" + style + "' align='center'><b>KG</b></td><td style='" + style + "' align='center'><b>Unit</b></td></tr>";
                }

                var othercharges = result[0].Table[0].TotOtherCharges;
                var oQty = 0;
                var fQty = 0;
                var TdistValue = 0;
                var TValueBeforeTax = 0;
                var tTaxValue = 0;
                var TValueAfterTax = 0;
                for (var rn in result[0].Table2) {
                    //debugger;
                    strHTML += "<tr>";
                    var rowIndex = parseInt(rn) + 1;
                    var ProductId = result[0].Table2[rn].SKUNodeIDPrdId;
                    var PrdName = result[0].Table2[rn].SKU;
                    var PrdShortName = result[0].Table2[rn].SKUShortDescr;
                    var skuCode = result[0].Table2[rn].PrdCode;
                    var OrderQty = result[0].Table2[rn].OrderQty;
                    var OrderDetailID = result[0].Table2[rn].OrderDetailID;
                    var scheTable = [];
                    if (resultViewData[0].Table11.length > 0) {
                        scheTable = jQuery.grep(resultViewData[0].Table11, function (element, index) {
                            return (element.OrderDetID == OrderDetailID);
                        });
                    }

                    oQty = oQty + parseInt(OrderQty);
                    var UOM = "Pcs";
                    var StandardRate = parseFloat(result[0].Table2[rn].ProductRate).toFixed(2);;
                    //var StandardRateBeforeTax = result[0].Table2[rn].StandardRateBeforeTax;
                    var flgCessApplied = result[0].Table2[rn].flgCessApplied;
                    var Tax = result[0].Table2[rn].Tax;
                    var StandardRateBeforeTax = parseFloat(StandardRate) / (1 + parseFloat(Tax) / 100);
                    var Grammage = result[0].Table2[rn].Grammage;
                    var FreeQuantity = result[0].Table2[rn].FreeQty;
                    fQty = fQty + parseInt(FreeQuantity);
                    var distValue = result[0].Table2[rn].TotLineDiscVal;
                    TdistValue = TdistValue + distValue;
                    var ValueBeforeTax = result[0].Table2[rn].LineOrderValWDisc;
                    TValueBeforeTax = TValueBeforeTax + ValueBeforeTax;
                    var TaxValue = result[0].Table2[rn].TotTaxValue;
                    tTaxValue = tTaxValue + TaxValue;
                    var ValueAfterTax = result[0].Table2[rn].NetLineOrderVal;
                    TValueAfterTax = TValueAfterTax + ValueAfterTax;
                    strHTML += "<td style='" + style1 + "'>" + skuCode + "</td>";
                    strHTML += "<td style='" + style + ";text-align:left' title='" + PrdName + "'>" + PrdShortName + "</td>";
                    strHTML += "<td style='" + style + "' align='center'>" + OrderQty + "</td>";
                    strHTML += "<td style='" + style + "' align='center'>" + UOM + "</td>";
                    strHTML += "<td style='" + style + "' align='center'>" + (flgCessApplied == 0 ? "No" : "Yes") + "</td>";
                    strHTML += "<td style='" + style + ";padding-right:8px' align='right'>" + parseFloat(parseFloat(StandardRateBeforeTax) / Grammage).toFixed(2) + "</td>";
                    strHTML += "<td style='" + style + ";padding-right:8px' align='right'>" + parseFloat(StandardRateBeforeTax).toFixed(2) + "</td>";
                    if (scheTable.length > 0) {
                        var SchemeName = scheTable[0].SchemeName;
                        var SlabDescrOrg = scheTable[0].SlabDescrOrg;
                        var BenifitDescrOrg = scheTable[0].BenifitDescrOrg;
                        if (scheTable[0].BenTypeId == 1 || scheTable[0].BenTypeId == 5) {
                            strHTML += "<td style='" + style + "' align='center'><a href='###' onclick=\"fnShowViewSchemeBenefit('" + encodeURI(SchemeName) + "','" + encodeURI(SlabDescrOrg) + "','" + encodeURI(BenifitDescrOrg) + "')\" style='color:blue;text-decoration:underline' title='click to view scheme'>" + FreeQuantity + "</a></td>";
                            strHTML += "<td style='" + style + ";padding-right:8px' align='right'>" + parseFloat(distValue).toFixed(2) + "</td>";
                        } else {
                            strHTML += "<td style='" + style + "' align='center'>" + FreeQuantity + "</td>";
                            strHTML += "<td style='" + style + ";padding-right:8px' align='right'><a href='###' onclick=\"fnShowViewSchemeBenefit('" + encodeURI(SchemeName) + "','" + encodeURI(SlabDescrOrg) + "','" + encodeURI(BenifitDescrOrg) + "')\" style='color:blue;text-decoration:underline' title='click to view scheme'>" + parseFloat(distValue).toFixed(2) + "</a></td>";
                        }
                    } else {
                        strHTML += "<td style='" + style + "' align='center'>" + FreeQuantity + "</td>";
                        strHTML += "<td style='" + style + ";padding-right:8px' align='right'>" + parseFloat(distValue).toFixed(2) + "</td>";
                    }
                    strHTML += "<td style='" + style + ";padding-right:8px' align='right'>" + parseFloat(ValueBeforeTax).toFixed(2) + "</td>";
                    strHTML += "<td style='" + style + ";padding-right:8px' align='right'>" + parseFloat(Tax).toFixed(2) + "</td>";
                    if (gsttype == 1) {
                        strHTML += "<td style='" + style + ";padding-right:8px' align='right'>" + parseFloat(TaxValue).toFixed(2) + "</td>";
                    } else {
                        strHTML += "<td style='" + style + ";padding-right:8px' align='right'>" + parseFloat(parseFloat(TaxValue) / 2).toFixed(2) + "</td>";
                        strHTML += "<td style='" + style + ";padding-right:8px' align='right'>" + parseFloat(parseFloat(TaxValue) / 2).toFixed(2) + "</td>";
                    }
                    strHTML += "<td style='" + style + ";padding-right:8px' align='right'>" + parseFloat(ValueAfterTax).toFixed(2) + "</td>";
                    strHTML += "</tr>";
                }

                strHTML += "<tr><td>&nbsp;</td><td align='right'><b>Total</b></td><td align='center'>" + oQty + "</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td align='center'>" + fQty + "</td><td align='right' style='padding-right:8px'><b>" + parseFloat(TdistValue).toFixed(2) + "</b></td>";
                var colspn = 5;
                if (gsttype == 1) {
                    strHTML += "<td align='right' style='padding-right:8px'><b>" + parseFloat(TValueBeforeTax).toFixed(2) + "</b></td><td>&nbsp;</td><td align='right' style='padding-right:8px'><b>" + parseFloat(tTaxValue).toFixed(2) + "</b></td><td align='right' style='padding-right:8px'><b>" + parseFloat(TValueAfterTax).toFixed(2) + "</b></td></tr>";
                } else {
                    colspn = 6;
                    strHTML += "<td align='right' style='padding-right:8px'><b>" + parseFloat(TValueBeforeTax).toFixed(2) + "</b></td><td>&nbsp;</td><td align='right' style='padding-right:8px'><b>" + parseFloat(parseFloat(tTaxValue) / 2).toFixed(2) + "</b></td><td align='right' style='padding-right:8px'><b>" + parseFloat(parseFloat(tTaxValue) / 2).toFixed(2) + "</b></td><td align='right' style='padding-right:8px'><b>" + parseFloat(TValueAfterTax).toFixed(2) + "</b></td></tr>";
                }

                strHTML += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
                strHTML += "<td colspan='" + colspn + "' align='right'><b>Order Value Before Tax</b></td><td align='right' style='padding-right:8px'>" + parseFloat(TotOrderVal).toFixed(2) + "</td></tr>";

                strHTML += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
                strHTML += "<td colspan='" + colspn + "' align='right'><b>Additional Discount</b></td><td align='right' style='padding-right:8px'>" + parseFloat(ActAddDisc).toFixed(2) + "</td></tr>";

                strHTML += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
                strHTML += "<td colspan='" + colspn + "' align='right'><b>Order Value After Additional Discount</b></td><td align='right' style='padding-right:8px'>" + parseFloat(TotOrderValWDisc).toFixed(2) + "</td></tr>";

                if (gsttype == 1) {
                    strHTML += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
                    strHTML += "<td colspan='" + colspn + "' align='right'><b>IGST Amount</b></td><td align='right' style='padding-right:8px'>" + parseFloat(TotTaxVal).toFixed(2) + "</td></tr>";
                } else {
                    strHTML += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
                    strHTML += "<td colspan='" + colspn + "' align='right'><b>CGST Amount</b></td><td align='right' style='padding-right:8px'>" + parseFloat(parseFloat(TotTaxVal) / 2).toFixed(2) + "</td></tr>";

                    strHTML += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
                    strHTML += "<td colspan='" + colspn + "' align='right'><b>SGST Amount</b></td><td align='right' style='padding-right:8px'>" + parseFloat(parseFloat(TotTaxVal) / 2).toFixed(2) + "</td></tr>";
                }
                strHTML += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
                strHTML += "<td colspan='" + colspn + "' align='right'><b>Order Value After Tax</b></td><td align='right' style='padding-right:8px'>" + parseFloat(NetOrderValue).toFixed(2) + "</td></tr>";

                strHTML += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
                strHTML += "<td colspan='" + colspn + "' align='right'><b>Additional Charges</b></td><td align='right' style='padding-right:8px'>" + parseFloat(othercharges).toFixed(2) + "</td></tr>";

                strHTML += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
                strHTML += "<td colspan='" + colspn + "' align='right'><b>Final Order Value</b></td><td align='right' style='padding-right:8px'>" + parseFloat(parseFloat(NetOrderValue) + parseFloat(othercharges)).toFixed(2) + "</td></tr>";

                strHTML += "</table></center></div>";
                strHTML += "</div>";//end Main Div
                
                var printdiv = "";
               
                strHTMLMain = strHTML;
                if ($("#" + divContainer).html() == "") {
                    $("#" + divContainer).append(strHTMLMain);
                } else {
                    $("#" + divContainer).append("<div style='page-break-after:always'><hr/></div>"+strHTMLMain);  
                }
                

                if (strOrderLen.split("_")[0] == strOrderLen.split("_")[1]) {
                    var ddDate = new Date();
                    var filename = "MultipleOrders_" + strOrderLen.split("_")[2].split("^")[0] + " to " + strOrderLen.split("_")[2].split("^")[1]+"_" + ddDate.localeFormat("dd") + ddDate.localeFormat("MMM") + ddDate.localeFormat("yy");
                    save(divContainer, filename, 1);
                    $("#fade_dark").css("display", "none");
                    $("#loader").css("display", "none");
                } 
            }
            catch (err) {
                $("#" + divContainer).html("Error - " + err);
                $("#fade_dark").css("display", "none");
                $("#loader").css("display", "none");
                return false;
            }

        },
        error: function (msg) {
            $("#" + divContainer).html("Error - " + msg.responseText);
            $("#fade_dark").css("display", "none");
            $("#loader").css("display", "none");
            return false;
        }
    });
}
function fnViewOrder(OrderId, OrdPrcsId, divContainer, flgPrint) {
    var strHTMLMain = "";
    $.ajax({
        url: "frmOrderPunching.aspx/fnViewOrderDetail",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{OrderId:' + OrderId + ',PrcsId:' + OrdPrcsId + '}',
        success: function (response) {
            //debugger;
            flgEditOrder = 1
            
            try {
                var str = response.d;
                if (str.substr(0, 1) == "2") {
                    $("#" + divContainer).html("Error - " + str.substr(2, str.length));
                    return false;
                }
                var result = $.parseJSON('[' + str.substr(2, str.length) + ']');
                resultViewData = [];
                resultViewData = result;
                //Order Master Deatails
                var strHTML = "<div style='height:550px;overflow-y:auto' id='divViewOrderMain'>";//Start Main Div
                strHTML += "<div class='block1' >";
                strHTML += "<div style='margin-bottom:15px;font-size:16px'><b><center>" + result[0].Table[0].OrdPrcsName + "</center></b></div>";
                strHTML += "<table>";
                strHTML += "<tr><td colspan='3' style='padding-bottom:5px'><b>Basic Detail</b></td></tr>";
                strHTML += "<tr>";
                strHTML += "<td><b>>>" + result[0].Table[0].OrderTypeDescr + "</b></td><td>";
                var OrdrCode = result[0].Table[0].OrderCode;
                var Customer = result[0].Table[0].Customer;
                strHTML += "<td><b>Order No -</b> " + OrdrCode + "</td>";
                var orderDate = result[0].Table[0].OrderDate;
                var TotDistVal = result[0].Table[0].TotLineLevelDisc;
                var TotOrderVal = result[0].Table[0].TotOrderVal;
                var TotOrderValWDisc = result[0].Table[0].TotOrderValWDisc;
                var TotTaxVal = result[0].Table[0].TotTaxVal;
                var NetOrderValue = result[0].Table[0].NetOrderValue;
                var ActAddDisc = result[0].Table[0].ActAddDisc;
                var flgInvoicePrinted = result[0].Table[0].flgInvoicePrinted;
                var OrderStatusID = result[0].Table[0].OrderStatusID;
                $("#cphRight_hdnflgInvoicePrinted").val(flgInvoicePrinted);
                var d = new Date(parseInt(result[0].Table[0].OrderDate.substr(6)));

                var gsttype = (result[0].Table[0].flgGST == undefined || result[0].Table[0].flgGST == null) ? "2" : result[0].Table[0].flgGST;
                strHTML += "<td><b>Order Date - </b>" + d.localeFormat("dd-MMM-yyyy") + "</td>";
                strHTML += "<td><b>Order Status -</b>" + result[0].Table[0].OrderStatusDescr + "</td>";
                strHTML += "<td><b>Order Process Name - </b>" + result[0].Table[0].OrdPrcsName + "</td>";
                strHTML += "</tr>";
                strHTML += "</table>";
                strHTML += "<table>";
                strHTML += "<tr>";
                if (result[0].Table[0].flgOffline == "3") {
                    strHTML += "<td><b>DSR Name</td><td>:</td><td>" + result[0].Table[0].Descr + "</td>";
                } else {
                    strHTML += "<td><b>Manufacturer Name</td><td>:</td><td>" + result[0].Table[0].Descr + "</td>";
                }
                strHTML += "<td><b>Store Name</td><td>:</td><td>" + Customer + "</td>";
                strHTML += "<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
                strHTML += "</tr>";
                strHTML += "<tr>";
                strHTML += "<td style='width:112px'><b>Delivery Scheduling</b></td><td>:</td><td>Single Location,Single Delivery Date</td>";
                strHTML += "<td style='width:110px'><b>Invoicing Location</b></td><td>:</td><td>Single Invoice Location</td>";
                strHTML += "<td style='width:110px' align='right'><b>Invoice Phasing</b></td><td>:</td><td>Invoice cum Delivery</td>";
                strHTML += "</tr>";
                strHTML += "</table></div>";




                //Delivery Detail
                var strHTMLD = "";
                var strDate = ""; var dlvry;
                if (result[0].Table3.length > 0) {
                    var d = new Date(parseInt(result[0].Table3[0].RequiredDeliveryDate.substr(6)));
                    dlvry = d;
                    strDate = d.localeFormat("dd-MMM-yyyy")
                } else {
                    strDate = "";
                }
                var strHTMLD = "";
                if (result[0].Table1.length > 0) {
                    strHTMLD = "<div><table>";
                    strHTMLD += "<tr><td colspan='3' style='padding-bottom:5px'><b>Delivery Detail</b></td></tr>";
                    strHTMLD += "<tr>";
                    strHTMLD += "<td style='width:122px'>Delivery Location</td><td>:</td><td>" + result[0].Table1[0].DelCompanyName + (result[0].Table1[0].DelCompanyCityName != null ? "(" + result[0].Table1[0].DelCompanyCityName + ")" : "") + "</td>";
                    strHTMLD += "</tr>";
                    strHTMLD += "<tr>";
                    strHTMLD += "<td>Contact Person</td><td>:</td><td>" + result[0].Table1[0].DelCompanyContactPerson + "," + result[0].Table1[0].DelCompanyTelNumber + "</td>";
                    strHTMLD += "</tr>";
                    strHTMLD += "<tr>";
                    strHTMLD += "<td>Delivery Address</td><td>:</td><td>" + result[0].Table1[0].DelCompanyAddress + "&nbsp;" + result[0].Table1[0].DelCompanyPinCode + "</td>";
                    strHTMLD += "</tr>";
                    strHTMLD += "<tr>";
                    strHTMLD += "<td>Email Address</td><td>:</td><td>" + result[0].Table1[0].DelCompanyEmailId + "</td>";
                    strHTMLD += "</tr>";
                    //Mukh
                    //if (result[0].Table10.length > 0) {
                    //    for (var dcnt = 0; dcnt < result[0].Table10.length; dcnt++) {
                    //        var stime = result[0].Table10[dcnt].DlvryStartTime;
                    //        var etime = result[0].Table10[dcnt].DlvryEndTime;
                    //        var st = new Date("00/00/0000 " + stime).localeFormat("hh:mm tt");
                    //        var et = new Date("00/00/0000 " + etime).localeFormat("hh:mm tt");
                    //        if (result[0].Table10[dcnt].DlvryTimeType == 1) {
                    //            strHTMLD += "<tr>";
                    //            strHTMLD += "<td>Prefered Delivery Time</td><td>:</td><td>" + st.split(" ")[0] + " " + st.split(" ")[1] + " Till : " + et.split(" ")[0] + " " + et.split(" ")[1] + "</td>";
                    //            strHTMLD += "</tr>";
                    //        }
                    //        if (result[0].Table10[dcnt].DlvryTimeType == 2) {
                    //            strHTMLD += "<tr>";
                    //            strHTMLD += "<td>Do not Deliver between</td><td>:</td><td>" + st.split(" ")[0] + " " + st.split(" ")[1] + " Till : " + et.split(" ")[0] + " " + et.split(" ")[1] + "</td>";
                    //            strHTMLD += "</tr>";
                    //        }
                    //    }
                    //}
                    strHTMLD += "<tr>";


                    strHTMLD += "<td>Required Delivery Date</td><td>:</td><td>" + strDate + "</td>";
                    strHTMLD += "</tr>";
                    strHTMLD += "</table></div>";

                    //Invoicing Detail
                    var strHTMLInv = "";
                    strHTMLInv = "<div><table>";
                    strHTMLInv += "<tr><td colspan='3' style='padding-bottom:5px'><b>Invoicing Detail</b></td></tr>";
                    strHTMLInv += "<tr>";
                    strHTMLInv += "<td style='width:122px'>Bill-to-Cutomer Name</td><td>:</td><td>" + result[0].Table1[0].BillCompanyName + (result[0].Table1[0].BillCompanyCityName != null ? "(" + result[0].Table1[0].BillCompanyCityName + ")" : "") + "</td>";
                    strHTMLInv += "</tr>";
                    strHTMLInv += "<tr>";
                    strHTMLInv += "<td>Contact Person</td><td>:</td><td>" + result[0].Table1[0].BillCompanyContactPerson + "," + result[0].Table1[0].BillCompanyTelNumber + "</td>";
                    strHTMLInv += "</tr>";
                    strHTMLInv += "<tr>";
                    strHTMLInv += "<td>Billing Address</td><td>:</td><td>" + result[0].Table1[0].BillCompanyAddress + "&nbsp;" + result[0].Table1[0].BillCompanyPinCode + "</td>";
                    strHTMLInv += "</tr>";
                    strHTMLInv += "<td>Email Address</td><td>:</td><td>" + result[0].Table1[0].BillCompanyEmailId + "</td>";
                    strHTMLInv += "</tr>";
                    strHTMLInv += "</table></div>";

                    strHTML += "<div class='block1'><table><tr>"
                    strHTML += "<td valign='top'>" + strHTMLD + "</td><td valign='top'>" + strHTMLInv + "</td>"
                    strHTML += "</tr></table></div>";
                }
                //Product Details
                var style = "border-bottom: 1px solid #A0A0A0; border-left: 1px solid #A0A0A0;";
                var style1 = "border-bottom: 1px solid #A0A0A0;";
                strHTML += "<div><table ><tr><td style='padding-bottom:5px'><b>Product Detail</b></td></tr></table>";
                strHTML += "<center><table style='border: 1px solid #A0A0A0;font-size: 8.1pt;width:98%' cellpadding='2' cellspacing='0'>";

                
                if (gsttype == 1) {
                    strHTML += "<tr><td rowspan='2' style='" + style1 + "' align='center'><b>SKU Code</b></td><td rowspan='2' style='" + style + "' align='center'><b>Product Description</b></td><td rowspan='2' style='" + style + "' align='center'><b>Order Qty</b></td><td rowspan='2' style='" + style + "' align='center'><b>UOM</b></td><td rowspan='2' style='" + style + "' align='center'><b>Cess</b></td><td colspan='2' style='" + style + "' align='center'><b>Rate Per</b></td><td rowspan='2' style='" + style + "' align='center'><b>Free Qty</b></td><td rowspan='2' style='" + style + "' align='center'><b>Disc Value</b></td><td rowspan='2' style='" + style + "' align='center'><b>Val. B.Tax</b></td><td rowspan='2' style='" + style + "' align='center'><b>GST</b></td><td rowspan='2' style='" + style + "' align='center'><b>IGST Amt.</b></td><td rowspan='2' style='" + style + "' align='center'><b>Val. A.Tax</b></td></tr>";
                    strHTML += "<tr><td style='" + style + "' align='center'><b>KG</b></td><td style='" + style + "' align='center'><b>Unit</b></td></tr>";
                } else {
                    strHTML += "<tr><td rowspan='2' style='" + style1 + "' align='center'><b>SKU Code</b></td><td rowspan='2' style='" + style + "' align='center'><b>Product Description</b></td><td rowspan='2' style='" + style + "' align='center'><b>Order Qty</b></td><td rowspan='2' style='" + style + "' align='center'><b>UOM</b></td><td rowspan='2' style='" + style + "' align='center'><b>Cess</b></td><td colspan='2' style='" + style + "' align='center'><b>Rate Per</b></td><td rowspan='2' style='" + style + "' align='center'><b>Free Qty</b></td><td rowspan='2' style='" + style + "' align='center'><b>Disc Value</b></td><td rowspan='2' style='" + style + "' align='center'><b>Val. B.Tax</b></td><td rowspan='2' style='" + style + "' align='center'><b>GST</b></td><td rowspan='2' style='" + style + "' align='center'><b>CGST Amt.</b></td><td rowspan='2' style='" + style + "' align='center'><b>SGST Amt.</b></td><td rowspan='2' style='" + style + "' align='center'><b>Val. A.Tax</b></td></tr>";
                    strHTML += "<tr><td style='" + style + "' align='center'><b>KG</b></td><td style='" + style + "' align='center'><b>Unit</b></td></tr>";
                }

                var othercharges = result[0].Table[0].TotOtherCharges;
                var oQty = 0;
                var fQty = 0;
                var TdistValue = 0;
                var TValueBeforeTax = 0;
                var tTaxValue = 0;
                var TValueAfterTax = 0;
                for (var rn in result[0].Table2) {
                    //debugger;
                    strHTML += "<tr>";
                    var rowIndex = parseInt(rn) + 1;
                    var ProductId = result[0].Table2[rn].SKUNodeIDPrdId;
                    var PrdName = result[0].Table2[rn].SKU;
                    var PrdShortName = result[0].Table2[rn].SKUShortDescr;
                    var skuCode = result[0].Table2[rn].PrdCode;
                    var OrderQty = result[0].Table2[rn].OrderQty;
                    var OrderDetailID = result[0].Table2[rn].OrderDetailID;
                    var scheTable = [];
                    if (resultViewData[0].Table11.length > 0) {
                        scheTable = jQuery.grep(resultViewData[0].Table11, function (element, index) {
                            return (element.OrderDetID == OrderDetailID);
                        });
                    }

                    oQty = oQty + parseInt(OrderQty);
                    var UOM = "Pcs";
                    var StandardRate = parseFloat(result[0].Table2[rn].ProductRate).toFixed(2);;
                    //var StandardRateBeforeTax = result[0].Table2[rn].StandardRateBeforeTax;
                    var flgCessApplied = result[0].Table2[rn].flgCessApplied;
                    var Tax = result[0].Table2[rn].Tax;
                    var StandardRateBeforeTax = parseFloat(StandardRate) / (1 + parseFloat(Tax) / 100);
                    var Grammage = result[0].Table2[rn].Grammage;
                    var FreeQuantity = result[0].Table2[rn].FreeQty;
                    fQty = fQty + parseInt(FreeQuantity);
                    var distValue = result[0].Table2[rn].TotLineDiscVal;
                    TdistValue = TdistValue + distValue;
                    var ValueBeforeTax = result[0].Table2[rn].LineOrderValWDisc;
                    TValueBeforeTax = TValueBeforeTax + ValueBeforeTax;
                    var TaxValue = result[0].Table2[rn].TotTaxValue;
                    tTaxValue = tTaxValue + TaxValue;
                    var ValueAfterTax = result[0].Table2[rn].NetLineOrderVal;
                    TValueAfterTax = TValueAfterTax + ValueAfterTax;
                    strHTML += "<td style='" + style1 + "'>" + skuCode + "</td>";
                    strHTML += "<td style='" + style + ";text-align:left' title='" + PrdName + "'>" + PrdShortName + "</td>";
                    strHTML += "<td style='" + style + "' align='center'>" + OrderQty + "</td>";
                    strHTML += "<td style='" + style + "' align='center'>" + UOM + "</td>";
                    strHTML += "<td style='" + style + "' align='center'>" + (flgCessApplied == 0 ? "No" : "Yes") + "</td>";
                    strHTML += "<td style='" + style + ";padding-right:8px' align='right'>" + parseFloat(parseFloat(StandardRateBeforeTax) / Grammage).toFixed(2) + "</td>";
                    strHTML += "<td style='" + style + ";padding-right:8px' align='right'>" + parseFloat(StandardRateBeforeTax).toFixed(2) + "</td>";
                    if (scheTable.length > 0) {
                        var SchemeName = scheTable[0].SchemeName;
                        var SlabDescrOrg = scheTable[0].SlabDescrOrg;
                        var BenifitDescrOrg = scheTable[0].BenifitDescrOrg;
                        if (scheTable[0].BenTypeId == 1 || scheTable[0].BenTypeId == 5) {
                            strHTML += "<td style='" + style + "' align='center'><a href='###' onclick=\"fnShowViewSchemeBenefit('" + encodeURI(SchemeName) + "','" + encodeURI(SlabDescrOrg) + "','" + encodeURI(BenifitDescrOrg) + "')\" style='color:blue;text-decoration:underline' title='click to view scheme'>" + FreeQuantity + "</a></td>";
                            strHTML += "<td style='" + style + ";padding-right:8px' align='right'>" + parseFloat(distValue).toFixed(2) + "</td>";
                        } else {
                            strHTML += "<td style='" + style + "' align='center'>" + FreeQuantity + "</td>";
                            strHTML += "<td style='" + style + ";padding-right:8px' align='right'><a href='###' onclick=\"fnShowViewSchemeBenefit('" + encodeURI(SchemeName) + "','" + encodeURI(SlabDescrOrg) + "','" + encodeURI(BenifitDescrOrg) + "')\" style='color:blue;text-decoration:underline' title='click to view scheme'>" + parseFloat(distValue).toFixed(2) + "</a></td>";
                        }
                    } else {
                        strHTML += "<td style='" + style + "' align='center'>" + FreeQuantity + "</td>";
                        strHTML += "<td style='" + style + ";padding-right:8px' align='right'>" + parseFloat(distValue).toFixed(2) + "</td>";
                    }
                    strHTML += "<td style='" + style + ";padding-right:8px' align='right'>" + parseFloat(ValueBeforeTax).toFixed(2) + "</td>";
                    strHTML += "<td style='" + style + ";padding-right:8px' align='right'>" + parseFloat(Tax).toFixed(2) + "</td>";
                    if (gsttype == 1) {
                        strHTML += "<td style='" + style + ";padding-right:8px' align='right'>" + parseFloat(TaxValue).toFixed(2) + "</td>";
                    } else {
                        strHTML += "<td style='" + style + ";padding-right:8px' align='right'>" + parseFloat(parseFloat(TaxValue) / 2).toFixed(2) + "</td>";
                        strHTML += "<td style='" + style + ";padding-right:8px' align='right'>" + parseFloat(parseFloat(TaxValue) / 2).toFixed(2) + "</td>";
                    }
                    strHTML += "<td style='" + style + ";padding-right:8px' align='right'>" + parseFloat(ValueAfterTax).toFixed(2) + "</td>";
                    strHTML += "</tr>";
                }

                strHTML += "<tr><td>&nbsp;</td><td align='right'><b>Total</b></td><td align='center'>" + oQty + "</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td align='center'>" + fQty + "</td><td align='right' style='padding-right:8px'><b>" + parseFloat(TdistValue).toFixed(2) + "</b></td>";
                var colspn = 5;
                if (gsttype == 1) {
                    strHTML += "<td align='right' style='padding-right:8px'><b>" + parseFloat(TValueBeforeTax).toFixed(2) + "</b></td><td>&nbsp;</td><td align='right' style='padding-right:8px'><b>" + parseFloat(tTaxValue).toFixed(2) + "</b></td><td align='right' style='padding-right:8px'><b>" + parseFloat(TValueAfterTax).toFixed(2) + "</b></td></tr>";
                } else {
                    colspn = 6;
                    strHTML += "<td align='right' style='padding-right:8px'><b>" + parseFloat(TValueBeforeTax).toFixed(2) + "</b></td><td>&nbsp;</td><td align='right' style='padding-right:8px'><b>" + parseFloat(parseFloat(tTaxValue) / 2).toFixed(2) + "</b></td><td align='right' style='padding-right:8px'><b>" + parseFloat(parseFloat(tTaxValue) / 2).toFixed(2) + "</b></td><td align='right' style='padding-right:8px'><b>" + parseFloat(TValueAfterTax).toFixed(2) + "</b></td></tr>";
                }

                strHTML += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
                strHTML += "<td colspan='" + colspn + "' align='right'><b>Order Value Before Tax</b></td><td align='right' style='padding-right:8px'>" + parseFloat(TotOrderVal).toFixed(2) + "</td></tr>";

                strHTML += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
                strHTML += "<td colspan='" + colspn + "' align='right'><b>Additional Discount</b></td><td align='right' style='padding-right:8px'>" + parseFloat(ActAddDisc).toFixed(2) + "</td></tr>";

                strHTML += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
                strHTML += "<td colspan='" + colspn + "' align='right'><b>Order Value After Additional Discount</b></td><td align='right' style='padding-right:8px'>" + parseFloat(TotOrderValWDisc).toFixed(2) + "</td></tr>";

                if (gsttype == 1) {
                    strHTML += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
                    strHTML += "<td colspan='" + colspn + "' align='right'><b>IGST Amount</b></td><td align='right' style='padding-right:8px'>" + parseFloat(TotTaxVal).toFixed(2) + "</td></tr>";
                } else {
                    strHTML += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
                    strHTML += "<td colspan='" + colspn + "' align='right'><b>CGST Amount</b></td><td align='right' style='padding-right:8px'>" + parseFloat(parseFloat(TotTaxVal) / 2).toFixed(2) + "</td></tr>";

                    strHTML += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
                    strHTML += "<td colspan='" + colspn + "' align='right'><b>SGST Amount</b></td><td align='right' style='padding-right:8px'>" + parseFloat(parseFloat(TotTaxVal) / 2).toFixed(2) + "</td></tr>";
                }
                strHTML += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
                strHTML += "<td colspan='" + colspn + "' align='right'><b>Order Value After Tax</b></td><td align='right' style='padding-right:8px'>" + parseFloat(NetOrderValue).toFixed(2) + "</td></tr>";

                strHTML += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
                strHTML += "<td colspan='" + colspn + "' align='right'><b>Additional Charges</b></td><td align='right' style='padding-right:8px'>" + parseFloat(othercharges).toFixed(2) + "</td></tr>";

                strHTML += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
                strHTML += "<td colspan='" + colspn + "' align='right'><b>Final Order Value</b></td><td align='right' style='padding-right:8px'>" + parseFloat(parseFloat(NetOrderValue) + parseFloat(othercharges)).toFixed(2) + "</td></tr>";


                strHTML += "</table></center></div>";
                strHTML += "</div>";//end Main Div
                var ddDate=new Date();
                var filename = (Customer.length > 20 ? Customer.substr(0, 20) : Customer).replace("-", "").trim() + "_" + OrdrCode.replace("-", " ") + "_" + ddDate.localeFormat("dd") + ddDate.localeFormat("MMM") + ddDate.localeFormat("yy");
                var printdiv = "";
                if (flgPrint > 0) {
                    printdiv = "<a href='###' class='icon-bnt' onclick=\"Print('divViewOrderMain')\"><span class='Print'></span><div>Print</div></a><a href='###' class='icon-bnt' onclick=\"save('divViewOrderMain','" + filename + "',1)\" ><span class='Save'></span><div>Save Locally</div></a>";

                    strHTML += "<div style='position:absolute; bottom:5pt; width:100%;'><center>" + printdiv + "<a href='###' class='icon-bnt' onclick='fnEditExistingOrder(" + OrderId + "," + OrderStatusID + "," + OrdPrcsId + ")' style='display:"+(flgPrint==1?"inline-block":"none")+"'><span class='Edit'></span><div>Edit</div></a><a href='###' class='icon-bnt' onclick='fnCloseExistingOrderPopup()' ><span class='Close'></span><div>Close</div></a></center></div>";
                }
                strHTMLMain = strHTML;
                
                if (flgPrint == 2) {
                    $("#" + divContainer).html(strHTMLMain);
                    Print('divViewOrderMain');
                } else if (flgPrint == 4) {
                    
                    $("#" + divContainer).html(strHTMLMain);
                    $("#" + divContainer).dialog('close');
                    save('divViewOrderMain',filename, 1);
                } else {
                    $("#" + divContainer).html(strHTMLMain);
                }
            }
            catch (err) {
                
                $("#"+divContainer).html("Error - " + err);
            }
            
        },
        error: function (msg) {
            
            $("#" + divContainer).html("Error - " + msg.responseText);
        }
    });
}