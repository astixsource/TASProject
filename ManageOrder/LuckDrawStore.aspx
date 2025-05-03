<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" CodeFile="LuckDrawStore.aspx.cs" Inherits="ManageOrder_LuckDrawStore" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
     <meta name="viewport" content="width=device-width, initial-scale=1" />
     <script src="../scripts/jquery-3.6.0.js"></script>
    <link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />
     <link rel="stylesheet" href="../css/bootstrap.min.css" />
    <script src="../scripts/jquery-ui.js"></script>
    <link href="../styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../StylesTreeViewOrder/js/custom-script.js" type="text/javascript"></script>
    <script src="../scripts/validation.js"></script>
    <script src="../StylesTreeView/js/jquery.dataTables.js" type="text/javascript"></script>
    <link href="../StylesTreeView/Css/jquery.dataTables.css" rel="stylesheet" />
    <%--<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet">--%> 
    <style>
        tr.clsHighlightrowsChangeRoute td {
            background-color:#ffff79;
        }

        tr.clsHighlightrows td{
            background-color:#ffd5d5;
        }
         tr.clsHighlightrowsNoAbsent td{
            background-color:#c1ff84;
        }

        
        .mainpanel {
            padding:0px !important;
            font-family:Arial Narrow;
        }
        div.dataTables_scrollBody {
            overflow-y:scroll !important;
        }
        .iframe-placeholder
{
   background: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100% 100%"><text fill="%23FF0000" x="50%" y="50%" font-family="\'Lucida Grande\', sans-serif" font-size="24" text-anchor="middle">Page is being loaded , please wait..</text></svg>') 0px 0px no-repeat;
}
         .inner-addon {
  position: relative;
}
        .leftMenu-headding {
            width:235px !important;
        }

/* style glyph */
.inner-addon .glyphicon {
  position: absolute;
  padding: 10px;
  pointer-events: none;
}

/* align glyph */
.left-addon .glyphicon  { left:  0px;}
.right-addon .glyphicon { right: 0px;}

/* add padding  */
.left-addon input  { padding-left:  30px; }
.right-addon input { padding-right: 30px; }
        input[type=text]::-ms-clear {
            display: none;
        }

        .ui-autocomplete-loading {
            background: url('../images/preloader_18.gif') no-repeat right center;
        }

        .mcacAnchor span {
            font: normal 11px 'HelveticaLTStdRoman',Arial, Helvetica, sans-serif;
            color: Black;
        }
        a.icon-bnt {
            padding: 2pt 0;
            font-size: 10pt;
            text-align: center;
            cursor: pointer;
            margin: 0 1pt 0 0;
            display: inline-block;
            *display: inline;
            text-decoration: none;
            width: auto;
            color: #fff;
            background: #26A6E7 none;
            border: 0 none;
            border-radius: 1px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }
        a.icon-bnt span {
                height: 25px;
                width: 25px;
                float: left;
                padding: 0 1pt 0 0;
            }
         a.icon-bnt span.PostOrder {
                    background: url(../btnImg/PostOrder_Icon.png) center no-repeat;
                }
        h4 {
             font-size: 15px;
            padding: 0 0 8px 0; /*background-color: #f98a1f;*/
            background-color: #23aed8;
            color: White !important;
            font-weight: bold !important;
            font-family:Verdana, Geneva, Tahoma, sans-serif;
            padding-top: 10px;
            padding-left: 5px;
            margin-top: 0 !important;
            margin-bottom: 0 !important;
            text-shadow: 2px 2px 2px #333333;
            filter: progid:DXImageTransform.Microsoft.DropShadow(offX=2,offY=2,color=333333);
        }

        div.dataTables_scrollBody{
            overflow-x:hidden !important;
        }
     .dataTables_scroll{
     }
     .dataTables_wrapper.no-footer .dataTables_scrollBody {
    border-bottom: none !important;
}
    table.dataTable > tbody tr > td {
    padding: 2px 4px 2px 4px !important;
     vertical-align: middle;
     border-left: 1px solid #ccc !important;
    border-bottom: 1px solid #ccc !important;
}
    table.dataTable > thead > tr > th, table.dataTable > thead > tr > td {
    padding: 2px 4px 2px 4px !important;
     vertical-align: middle;
    border-left: 1px solid #ccc;
    border-top: none !important;
    border-bottom: none !important;
}
     table.dataTable > tfoot >tr > th, table.dataTable > tfoot > tr > td {
    padding: 2px 4px 2px 4px !important;
}
     table.dataTable > tbody > tr {
     background-color:none !important;
}
    </style>
    <style>
    .custom-combobox {
    position: relative;
    display: inline-block;
    height:35px;
    }
    .custom-combobox-toggle {
    position: absolute;
    top: 0;
    bottom: 0;
    margin-left: -1px;
    padding: 0;
    /* support: IE7 */
    *height: 1.7em;
    *top: 0.1em;
    }
    .custom-combobox-input {
    margin: 0;
    padding: 0.3em;
    background:#fff;
    outline:none;
    width:330px;
    height:35px;
    }


    #clsDetail {
            border-collapse: collapse;
        }

            #clsDetail th {
                font-size: 11px;
                border:1px solid #000;
            }

            #clsDetail td {
                font-size: 10px;
                padding: 4px 0 4px 5px;
                border:1px solid #000;
            }


              #clsDetail {
            border-collapse: collapse;
        }

            #clsDetail th {
                    padding: 2px;
                    color: #ffffff;
                    font-size: 11px;
                    font-weight: bold;
                    text-align: center;
                    box-sizing:border-box;
                    border: 1px solid #cccccc;
                    background-color: #0080C0;
                    min-width:100px;
                }
</style>
    <script>
        var StoreList = [];
        $(document).ready(function () {
            $('#fraLeft').load(function () {
                $("#fraLeft").contents().find("#DvMenu").find("li").removeClass("activemenu");
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='5']").addClass("activemenu");
                $("#fraLeft")[0].height = $(window).height() - ($("#dvBanner").height() + $(".footer").height());
            });

            
            fnDSEList();
            
              
            //$('#txtFindDbr').keyup(function () {
            //    var val = $(this).val().toUpperCase();
            //    $("#tbldbrlist").find("tbody").eq(0).find("tr").css("display", "none");

            //    var tbl = $("#tbldbrlist>tbody>tr");
            //    var tr;
            //    for (var i = 0; i < tbl.length; i++) {
            //        tr = $(tbl[i]);
            //        for (var j = 0; j < $(tr).find("td").length; j++) {
            //            if ($(tr).find("td").eq(j).attr("Searchable") == "1") {
            //                var tdText = $(tr).find("td").eq(j).html().toUpperCase();
            //                if (tdText.indexOf(val) > -1) {
            //                    $(tr).css("display", "table-row");
            //                }
            //            }
            //        }
            //    }
            //});
        });

        var tabledata = null;
        var arrRouteData = []; var arrSectorData = [];
        function fnDSEList() {
           

            var LoginId = $("#cphRight_hdnLoginId").val();
          
            $("#dvFadeForProcessing").show();
            PageMethods.fnDSEList(LoginId, function (result) {
                $("#dvFadeForProcessing").hide();
                $("#divBTNS").hide();
                if (result.split("|")[0] == "2") {
                    alert("Error-" + result.split("|")[1]);
                } else if (result == "") {
                    $("#divdrmmain")[0].innerHTML = "No Record(s) Found!!!";
                }
                else {
                    $("#divdrmmain")[0].innerHTML = result.split("|")[0];
                    tabledata = $.parseJSON('[' + result.split("|")[1] + ']');


                    $("#cphRight_hidExcel").val(result.split('|')[1]);
                        $("#divBTNS").show();
                    
                    $("#tbldbrlist").DataTable({
                        scrollY: "58vh",
                        scrollX: false,
                        scrollCollapse: true,
                        paging: false,
                        "ordering": false,
                        "info": false,
                        "bFilter": false,
                        "bSorting": false,
                        "searching": false,
                    })
                }
            },
            function (result) {
                $("#dvFadeForProcessing").hide();
                alert("Error-" + result._message);
            }
            )
        }


        function fnApply(ctrl)
        {
            var select = $(ctrl).closest("tr").find('select');
            if ($(select).val() == "0")
            {
                alert('Please select Voucher');
                $(select).focus();
                return false;
            }


            var LuckDrawId = $(ctrl).closest("tr").attr("luckdrawid");

            var tabledata1 = tabledata[0].filter(function (n, i) {
                return n.LuckDrawId == LuckDrawId;
            });

            
            var selected = select.children('option:selected').text()

            //alert($("#dropDownMenuKategorie")[0].selectedIndex);
            //selectedchildren('option:selected').index()

            var th_style = 'padding: 2px;color: #ffffff;font-size: 11px;font-weight: bold;text-align: center;box-sizing:border-box;border: 1px solid #cccccc;background-color: #0080C0;min-width:100px;';
            

            if (tabledata1.length > 0) {
                var table = "<table cellpadding='0' cellspacing='0' valign='middle' id='clsDetail' border='0' style='border-collapse:collapse;'><thead><tr><th style='" + th_style + "'>Draw Date</th><th style='" + th_style + "'>Branch/SUBD</th><th style='" + th_style + "'>DSE</th><th style='" + th_style + "'>Winner Store Code</th><th style='" + th_style + "'>Winner Store Name</th><th style='" + th_style + "'>Channel</th><th style='" + th_style + "'>Contact Person</th><th style='" + th_style + "'>Contact No</th><th style='" + th_style + "'>Voucher Chosen</th><th style='" + th_style + "'>Value</th></thead>  <tbody>";//<th class='clsth_2'>Collection Made</th>  <th class='clsth_2'>Username</th>
                for (var i = 0; i < tabledata1.length; i++) {
                    var row = "";
                    row = "<tr>";
                    row += '<td style="border:1px solid #000;">' + tabledata1[i]["Draw Date"] + '</td>';
                    row += '<td style="border:1px solid #000;" >' + tabledata1[i]["Branch/SUBD"] + '</td>';
                    row += '<td style="border:1px solid #000;">' + tabledata1[i]["DSE"] + '</td>';
                    row += '<td style="border:1px solid #000;">' + tabledata1[i]["Winner Store Code"] + '</td>';
                    row += '<td style="border:1px solid #000;">' + tabledata1[i]["Winner Store Name"] + '</td>';
                    row += '<td style="border:1px solid #000;">' + tabledata1[i]["Channel"] + '</td>';
                    row += '<td style="border:1px solid #000;">' + tabledata1[i]["ContactPerson"] + '</td>';
                    row += '<td style="border:1px solid #000;">' + tabledata1[i]["ContactNo"] + '</td>';
                    row += '<td style="border:1px solid #000;text-align:center">' + selected + '</td>';
                    row += '<td style="border:1px solid #000;text-align:center">' + tabledata1[i]["Value"] + '</td>';
                    row += '</tr>';
                    table += row;
                }
                table += '</tbody>';
                table += '</table>';
            }
            
            var LoginId = $("#cphRight_hdnLoginId").val();            
            var VoucherId = $(select).val();
            var EmailId = $(ctrl).closest("tr").attr("emailid");
            var mailbody = table;//$("#cphRight_hidExcel").val();



            $("#dvFadeForProcessing").show();
            PageMethods.ApplyVoucher(LuckDrawId, LoginId, VoucherId, EmailId,mailbody, save_success, fnfailed);
        }


        function save_success(result) {
            if (result == "1") {
                alert('Voucher Applied Successfully');
                $("#dvFadeForProcessing").hide();
            }
            else {
                alert('Error: Please contact technical team.');
                $("#dvFadeForProcessing").hide();
            }
            
        }
        function fnfailed(result) {
            alert(result._message);           
            $("#dvFadeForProcessing").hide();
        }




        </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphLeft" Runat="Server">
     <iframe id="fraLeft" name="fraLeft" height="100%" width="100%" scrolling="yes" frameborder="0"
            src='../frmLeftMainTreeView.aspx'></iframe>
    
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphRight" Runat="Server">
    <div id="dvFadeForProcessing" style="position: fixed; z-index: 9999999999999; display: none; top: 0; bottom: 0; left: 0; right: 0; opacity: .80; -moz-opacity: 0.8; filter: alpha(opacity=80); background-color: #ccc;">
        <div id="Div2" runat="server" align="center" style="position: absolute; width: 150px; top: 30%; left: 45%;">
            <img alt="" title="Loading..." src="../Images/blue-loading.gif" />
        </div>
    </div>
    <h4 id="h4header">>>Lucky Draw Store</h4>

     <div>
    
    <div id="divdrmmain"   style="margin-top:5px;border:1px solid #ccc;width:90%">
    </div>
   </div>
     <asp:HiddenField runat="server" ID="hdnLoginId" Value="0" />
     <asp:HiddenField runat="server" ID="hidExcel" Value="" />
</asp:Content>

