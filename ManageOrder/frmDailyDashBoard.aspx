<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" CodeFile="frmDailyDashBoard.aspx.cs" Inherits="frmDailyDashBoard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
     <script src="../scripts/jquery-3.6.0.js"></script>
    <link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />
     <link rel="stylesheet" href="../CSS/bootstrap.min.css" />
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
        .ui-datepicker select.ui-datepicker-month, .ui-datepicker select.ui-datepicker-year {
    width: 49%;
    color: black !important;
}
        .mainpanel {
            padding:0px !important;
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


        .highlight { background-color:lightsteelblue!important; }

    </style>
   

   
    <script>
        var StoreList = [];
        $(document).ready(function () {
            $('#fraLeft').load(function () {
                $("#fraLeft").contents().find("#DvMenu").find("li").removeClass("activemenu");
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='11']").addClass("activemenu");
                $("#fraLeft")[0].height = $(window).height() - ($("#dvBanner").height() + $(".footer").height());
            });
            $("#divbtns").hide();
            $("#txtDate").val(new Date().localeFormat('dd-MMM-yyyy'))
            $(document).data("BranchData", $("#cphRight_ddlBranch").clone());
            $("#cphRight_ddlBranch option").remove();
            $("#cphRight_ddlBranch").html("<option value='0-0'>------<option>");
            $("#cphRight_ddlBranch option").eq(1).remove();

            if ($("#cphRight_ddlSite option").length == 1) {
                var val = $("#cphRight_ddlSite").val();
                var options = $(document).data("BranchData").clone();
                $("#cphRight_ddlBranch option").remove();
                $("#cphRight_ddlBranch").html("<option value='0-0'>------<option>");
                $(options).find("option[sitenodeid='" + val + "']").appendTo($("#cphRight_ddlBranch"));
                $("#cphRight_ddlBranch option").eq(1).remove();
                if ($("#cphRight_ddlBranch option").length == 2) {
                    $("#cphRight_ddlBranch option[value='0-0']").remove();
                    fnShowReport();
                }
            }else{
            fnShowReport();}
            fnChangeSite($("#cphRight_ddlSite")[0]);
            $("#txtDate").datepicker({
                dateFormat: 'dd-M-yy',
            changeMonth: true,
            changeYear: true,
            showOn: "button",
            buttonImage: "../images/calender.jpg",
            buttonImageOnly: true,
            buttonText: "Select date",
            })
             
        });


        function fnDownloadReport() {
            var sDate = $("#txtDate").val();
            var LoginId = $("#cphRight_hdnLoginId").val();
            window.open("../frmDownloadExcel.aspx?flg=3&LoginId=" + LoginId + "&DownloadDate=" + sDate);
        }
        function fntblFixedHeader() {
            var thead = $("#tbldbrlist").find("thead").eq(0).html();
            $("#divfixedHeader").html("<table id='tbl_Status_fixedhead' cellspacing='0' style='font-size:8pt'><thead>" + thead + "</thead><tbody></tbody></table>");
            for (i = 0; i < $("#tbldbrlist thead").find("th").length; i++) {
                $("#tbl_Status_fixedhead").find("th").eq(i).css("width", $("#tbldbrlist thead").find("th")[i].offsetWidth);
                // $("#tbldbrlist thead").find("th").eq(i).css("width", $("#tbldbrlist thead").find("th")[i].offsetWidth);
            }

            $("#divfixedHeader").css("width", $("#divMainData")[0].clientWidth);
            $("#divMainData").css("width", $("#divMainData")[0].clientWidth);
            $("#divHeadercont").css("width", $("#divMainData")[0].clientWidth);

        }
        function fnChangeBranch(sender) {
            //if ($(sender).val() != "0") {
            fnShowReport();
            //}
        }
        function fnChangeSite(sender) {
            var val = $(sender).val();
            var options = $(document).data("BranchData").clone();
            $("#cphRight_ddlBranch option").remove();
            $("#cphRight_ddlBranch").html("<option value='0-0'>------<option>");
            $(options).find("option[sitenodeid='" + val + "']").appendTo($("#cphRight_ddlBranch"));
            $("#cphRight_ddlBranch option").eq(1).remove();
            fnShowReport();
        }
        function fnShowReport() {
            var sDate = $("#txtDate").val();
            var LoginId = $("#cphRight_hdnLoginId").val();
            var BrnchNode=$("#cphRight_ddlBranch").val();
            var SiteNode=$("#cphRight_ddlSite").val();
            var NodeId = BrnchNode.split("-")[0] == 0 ? SiteNode.split("-")[0] : BrnchNode.split("-")[0];
            var NodeType = BrnchNode.split("-")[0] == 0 ? SiteNode.split("-")[1] : BrnchNode.split("-")[1];
            $("#dvFadeForProcessing").show();
            PageMethods.fnDailyOrderStatusReport(LoginId, sDate,NodeId,NodeType, function (result) {
                $("#dvFadeForProcessing").hide();
                $("#divMainData")[0].innerHTML = result;
                fntblFixedHeader();
            }, function (result) {
                alert("Error-" + result._message);
                $("#dvFadeForProcessing").hide();
            });
        }
    </script>
    <script>
        $(document).ready(function () {
            $('#txtFindDbr').keyup(function () {
                var val = $(this).val().toUpperCase();
                $("#tbldbrlist").find("tbody").eq(0).find("tr").css("display", "none");

                var tbl = $("#tbldbrlist>tbody>tr");
                var tr;
                for (var i = 0; i < tbl.length; i++) {
                    tr = $(tbl[i]);
                    for (var j = 0; j < $(tr).find("td").length; j++) {
                        //if ($(tr).find("td").eq(j).attr("Searchable") == "1") {
                        var tdText = $(tr).find("td").eq(j).html().toUpperCase();
                        if (tdText.indexOf(val) > -1) {
                            $(tr).css("display", "table-row");
                        }
                        //}
                    }
                }
                fntblFixedHeader();
            });
        });

        function fnClick(ctrl) {
           
            var dsenodeid = $(ctrl).closest("tr").attr('dsenodeid');
            var dsenodetype = $(ctrl).closest("tr").attr('dsenodetype');
            var date = $("#txtDate").val();

            var selected = $(ctrl).closest("tr").hasClass("highlight");
            $("#tbldbrlist tr").removeClass("highlight");
            if (!selected)
                $(ctrl).closest("tr").addClass("highlight");

            //$("#divIframeReport")[0].innerHTML = "<div><img valign='middle' src='../Images/preloader_18.gif' alt='loading gif' />Please Wait</div>";

            PageMethods.fndetail(dsenodeid,dsenodetype,date, fnSuccess, fnfail);
        }

        function fnSuccess(res) {
            $("#divlist").html(res);

            var width = $(window).width();

            $("#dialog1").dialog({
                width: width - (width * 0.2),
                modal: true,
                position: {
                    my: "left+5% top+10px",
                    at: "left+5% top+10px",
                    //at: "right+1% top+10px",
                    of: window,
                    collision: "none"
                }

            });

            $("#divdetail1").show();
        }

        function fnfail(res) {
            //$("#divlist").html(res);          
            alert('Error in server')
        }

    </script>
   <style> 
       .form-control {
  padding-right: 30px;
}

.form-control + .glyphicon {
  position: absolute;
  right: 0;
  padding: 8px 27px;
}
    </style> 
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphLeft" runat="Server">
    
        <iframe id="fraLeft" name="fraLeft" height="100%" width="100%" scrolling="yes" frameborder="0"
            src='../frmLeftMainTreeView.aspx'></iframe>
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphRight" runat="Server" >
    <div id="dvFadeForProcessing" style="position: fixed; z-index: 9999999999999; display: none; top: 0; bottom: 0; left: 0; right: 0; opacity: .80; -moz-opacity: 0.8; filter: alpha(opacity=80); background-color: #ccc;">
        <div id="Div2" runat="server" align="center" style="position: absolute; width: 150px; top: 30%; left: 45%;">
            <img alt="" title="Loading..." src="../Images/blue-loading.gif" />
        </div>
    </div>
     <div style="margin-left: 0px; position:fixed;z-index:1;width:100%;background-color:#ffffff" id="divHeadercont">
    <h4 id="h4header">>>Daily DSE Data Sync Status</h4>
    <div style="margin-top:10px;">
        <table id="tblhead" >

            <tr>
            
 <td style="width:60px"><b>Site List :</b> </td>
                <td style="width:205px">
                    <asp:DropDownList runat="server" ID="ddlSite" onchange="fnChangeSite(this)" CssClass="form-control"  style="border:1px solid #bbbbbb;width:200px" >
                    </asp:DropDownList></td>
                <td><b>Branch List :</b> </td>
                <td style="padding-left:10px;padding-right:10px">
                    <asp:DropDownList runat="server" ID="ddlBranch" onchange="fnChangeBranch(this)" CssClass="form-control"  style="border:1px solid #bbbbbb;width:100%" >
                    </asp:DropDownList></td>
                <td>
                    <b>Date : </b>
                </td>
                 <td style="width:110px"><input type="text" id="txtDate" style="width:90px" readonly /></td>
                <td style="padding-left:20px;">
                    <input type="button" value="Refresh Data"  class="btn btn-primary" onclick="fnShowReport()" id="btnShow" />
                    <input type="button" style="display:none" value="Download Report"  class="btn btn-primary" onclick="fnDownloadReport()" id="btnRefershStatus" />
                </td>
                <td>
                    <div class="col-md-4" style="width:100%">
  <input class="form-control" type="search" placeholder="Search" style="width:100%;border:1px solid #808080" id="txtFindDbr" />
  <span class="glyphicon glyphicon-search"></span>
</div>
                </td>
            </tr>
        </table>
    </div>
         </div>
      <div style="padding-top:79px;width:95%">
    <div id="divfixedHeader" style="margin-left: 0px; position:fixed;z-index:1"></div>
    <div id="divMainData" style="margin-top:0px">
    </div>
   </div>
  <div id="dialog1" title="View Report">
         <div id="divdetail1" style="display:none;float:none">         
         <div id="divlist"></div>   
         </div>
     </div>
    <asp:HiddenField runat="server" ID="hdnLoginId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnMenuId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnBranchCode" Value="0" />
    
</asp:Content>

