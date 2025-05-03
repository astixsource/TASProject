<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" CodeFile="frmTCNotcallingRpt.aspx.cs" Inherits="frmTCNotcallingRpt" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="../scripts/jquery-3.6.0.js"></script>
    <link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />
    <link href="../styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/Multiselect/jquery.multiselect.css" rel="stylesheet" />
    <link href="../Styles/Multiselect/jquery.multiselect.filter.css" rel="stylesheet" />
    <script src="../Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../scripts/jquery-ui.js"></script>
    <script src="../scripts/Multiselect/jquery.multiselect.js"></script>
    <script src="../scripts/Multiselect/jquery.multiselect.filter.js"></script>

    <script src="../scripts/highcharts.js" type="text/javascript"></script>
    <script src="../scripts/highcharts-3d.js" type="text/javascript"></script>
    <script src="../scripts/highcharts-more.js" type="text/javascript"></script>
    <script src="../scripts/solid-gauge.js" type="text/javascript"></script>

    <style>
        .ui-datepicker select.ui-datepicker-month, .ui-datepicker select.ui-datepicker-year {
            width: 49%;
            color: black !important;
        }

        img {
            vertical-align: middle;
        }

        .mainpanel {
            padding: 0px !important;
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
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            padding-top: 10px;
            padding-left: 5px;
            margin-top: 0 !important;
            margin-bottom: 0 !important;
            text-shadow: 2px 2px 2px #333333;
            filter: progid:DXImageTransform.Microsoft.DropShadow(offX=2,offY=2,color=333333);
        }

        .ui-multiselect span.ui-icon {
            float: right;
            background-color: #F1F1F1;
            border: none !important;
            margin-top: -0.3px !important;
            margin-right: 1.3px !important;
        }
        /*button {
            height:22px !important;
        }*/
        label {
            font-weight: normal !important;
            font-size: 8pt !important;
        }

        input[type=text] {
            height: 21px;
            font-size: 8.5pt;
        }

        .ui-multiselect-filter input {
            color: #000000;
        }
    </style>
    <script>
        var StoreList = [];
        $(document).ready(function () {
            $('#fraLeft').load(function () {
                $("#fraLeft").contents().find("#DvMenu").find("li").removeClass("activemenu");
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='22']").addClass("activemenu");
                $("#fraLeft")[0].height = $(window).height() - ($("#dvBanner").height() + $(".footer").height());
            });
            $("#divbtns").hide();
            detectmob();
            $("#cphRight_ddlSite").multiselect().multiselectfilter();
            $("#cphRight_ddlReason").multiselect();

            //$(document).data("BranchData", $("#cphRight_ddlBranch").clone());
            //$("#cphRight_ddlBranch option").remove();
            //$("#cphRight_ddlBranch").html("<option value='0-0'>------<option>");
            //$("#cphRight_ddlBranch option").eq(1).remove();

            //if ($("#cphRight_ddlSite option").length == 1) {
            //    var val = $("#cphRight_ddlSite").val();
            //    var options = $(document).data("BranchData").clone();
            //    $("#cphRight_ddlBranch option").remove();
            //    $("#cphRight_ddlBranch").html("<option value='0-0'>------<option>");
            //    $(options).find("option[sitenodeid='" + val + "']").appendTo($("#cphRight_ddlBranch"));
            //    $("#cphRight_ddlBranch option").eq(1).remove();
            //    if ($("#cphRight_ddlBranch option").length == 2) {
            //        $("#cphRight_ddlBranch option[value='0-0']").remove();
            //        fnStoreList();
            //        fnRefreshDownloadedList();
            //    }
            //}
            $("#txtDate").val(new Date().localeFormat('dd-MMM-yyyy'))
            $("#txtDate").datepicker({
                dateFormat: 'dd-M-yy',
                changeMonth: true,
                changeYear: true,
                showOn: "button",
                buttonImage: "../images/calender.jpg",
                buttonImageOnly: true,
                buttonText: "Select date",
                onClose: function (selectedDate) {
                    $("#txtToDate").datepicker("option", "minDate", selectedDate);
                }
            });
            $("#txtToDate").val(new Date().localeFormat('dd-MMM-yyyy'))
            $("#txtToDate").datepicker({
                dateFormat: 'dd-M-yy',
                minDate: $("#txtDate").val(),
                changeMonth: true,
                changeYear: true,
                showOn: "button",
                buttonImage: "../images/calender.jpg",
                buttonImageOnly: true,
                buttonText: "Select date",
            });

            fnShowReport(0);


        });

        function detectmob() {

            var IsMobileDevice = "<%=Request.Browser.IsMobileDevice%>";
            if ((window.innerWidth <= 400 && window.innerHeight <= 640) || (window.innerWidth <= 640 && window.innerHeight <= 400) || IsMobileDevice != "False") {
                $("#divFilter").hide();
                return true;
            } else {
                $("#divFilterbtn").hide();
$("#divFilter button.ui-multiselect").eq(0).css({
                    width: "210px"
                });
                $("#divFilter button.ui-multiselect").eq(1).css({
                    width: "198px"
                });
                return false;
            }
        }
        function fn3DPieChart1(container, seriesval, title) {
            var jsonseriesval = $.parseJSON(seriesval);
            Highcharts.chart(container, {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    },
                    events: {
                        click: function () {
                            //
                        }
                    }
                },
                title: {
                    align: 'center',
                    text: title,
                    y: detectmob() == false ? -25 : 0,
                    floating: true,
                    verticalAlign: detectmob() == false ? 'bottom' : "top",
                    style: {
                        color: '#000',
                        "fontSize": "11px",
                        "fontWeight": "bold"
                    }
                },
                credits: {
                    enabled: false
                },
                legend: {
                    itemStyle: {
                        color: 'gray',
                        "fontSize": "9px",
                        "fontWeight": "bold"
                    }
                    //labelFormatter: function () { return this.name + ' : <b>' + this.y + '%</b>' },
                },
                tooltip: {
                    pointFormat: 'Total : <b>{point.y}</b><br/>Percentage : <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            distance: 10,
                            enabled: true,
                            format: '{point.percentage:.1f}%',
                        },
                        showInLegend: true
                    }
                },
                series: jsonseriesval
            });
        }

        function fn3DPieChart2(container, seriesval, title) {
            var height = detectmob() == false ? "170px" : "230px";
            $("#divChart2").css("height", height);
            var jsonseriesval = $.parseJSON(seriesval);
            Highcharts.chart(container, {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    },
                    events: {
                        click: function () {
                            //
                        }
                    }
                },
                title: {
                    align: 'center',
                    text: title,
                    verticalAlign:detectmob() == false ? 'bottom' : "top",
                    y: detectmob() == false ? 20 : 0,
                    x: detectmob() == false ? -140 : 0,
                    floating: true,
                    style: {
                        color: '#000',
                        "fontSize": "11px",
                        "fontWeight": "bold"
                    }
                },
                credits: {
                    enabled: false
                },
                legend: {
                    itemStyle: {
                        color: 'gray',
                        "fontSize": "9px",
                        "fontWeight": "bold"
                    },
                    align: detectmob() == false ? 'right' : 'center',
                    verticalAlign: detectmob() == false ? 'top' : 'bottom',
                    layout: detectmob() == false ? 'vertical' : 'horizontal',
                    x: detectmob() == false ? -20 : 0,
                    //y: detectmob() == false ? 40 : 0,
                    //labelFormatter: function () { return this.name + ' : <b>' + this.y + '%</b>' },
                },
                tooltip: {
                    pointFormat: 'Total : <b>{point.y}</b><br/>Percentage : <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            distance: 5,
                            enabled: true,
                            format: '{point.percentage:.1f}%',
                        },
                        showInLegend: true
                    }
                },
                series: jsonseriesval
            });
        }

        function fn3DPieChart3(container, seriesval, title) {
            var height = detectmob() == false ? "170px" : "230px";
            $("#divChart3").css("height",height);
            var jsonseriesval = $.parseJSON(seriesval);
            Highcharts.chart(container, {
                chart: {
                    size:300,
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    },
                    events: {
                        click: function () {
                            //
                        }
                    }
                },
                title: {
                    align: 'center',
                    text: title,
                    verticalAlign: detectmob() == false ? 'bottom' : "top",
                    y: detectmob() == false ? 20 : 0,
                    x:detectmob() == false ? -130 : 0,
                    floating: true,
                    style: {
                        color: '#000',
                        "fontSize": "11px",
                        "fontWeight": "bold"
                    }
                },
                credits: {
                    enabled: false
                },
                legend: {
                    itemStyle: {
                        color: 'gray',
                        "fontSize": "9px",
                        "fontWeight": "bold"
                    },
                    align: detectmob() == false ? 'right' : 'center',
                    verticalAlign: detectmob() == false ? 'top' : 'bottom',
                    layout: detectmob() == false ? 'vertical' : 'horizontal',
                    x: detectmob() == false ? -125 : 0,
                   // y: detectmob() == false ? 30 : 0,
                    //labelFormatter: function () { return this.name + ' : <b>' + this.y + '%</b>' },
                },
                tooltip: {
                    pointFormat: 'Total : <b>{point.y}</b><br/>Percentage : <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            distance: 10,
                            enabled: true,
                            format: '{point.percentage:.1f}%',
                        },
                        showInLegend: true
                    }
                },
                series: jsonseriesval
            });
        }




        function fnDownloadReport() {
            var sDate = $("#txtDate").val();
            var eDate = $("#txtToDate").val();
            window.open("../frmDownloadExcel.aspx?flg=5&sDate=" + sDate + "&eDate=" + eDate);
        }

        function fnShowReport(flgExcel) {
            var sDate = $("#txtDate").val();
            var eDate = $("#txtToDate").val();
            var LoginId = $("#cphRight_hdnLoginId").val();

            var SiteNodeIds = ""
            var ReasonIds = "";
            var $checkedSite = $("input[name='multiselect_cphRight_ddlSite']:checked");
            for (var i = 0; i < $checkedSite.length; i++) {
                if (SiteNodeIds == "") {
                    SiteNodeIds = $checkedSite.eq(i).val().split('-')[0];
                } else {
                    SiteNodeIds += "|" + $checkedSite.eq(i).val().split('-')[0];
                }
            }

            var $checkedReason = $("input[name='multiselect_cphRight_ddlReason']:checked");
            for (var i = 0; i < $checkedReason.length; i++) {
                if (ReasonIds == "") {
                    ReasonIds = $checkedReason.eq(i).val();
                } else {
                    ReasonIds += "|" + $checkedReason.eq(i).val();
                }
            }

            $("#dvFadeForProcessing").show();
            PageMethods.fnDailyOrderStatusReport(LoginId, sDate, eDate, SiteNodeIds, ReasonIds, flgExcel, function (result) {
                $("#dvFadeForProcessing").hide();
                if (result.split("^")[0] == "2") {
                    //$("#divMeasure")[0].innerHTML = "";
                    $("#divMainData")[0].innerHTML = "Error : " + result.split("^")[1];

                } else {
                    var str = result.split("^")[1];
                    fn3DPieChart1("divChart1", str.split("|~|")[0].split("|*|")[0], str.split("|~|")[0].split("|*|")[1]);
                    fn3DPieChart2("divChart2", str.split("|~|")[1].split("|*|")[0], str.split("|~|")[1].split("|*|")[1]);
                    fn3DPieChart3("divChart3", str.split("|~|")[2].split("|*|")[0], str.split("|~|")[2].split("|*|")[1]);
                    $("#divMainData")[0].innerHTML = str.split("|~|")[3];
                    //$("#divMeasure")[0].innerHTML = str.split("|~|")[1];
                    //fntblFixedHeader();
                }

            }, function (result) {
                alert("Error-" + result._message);
                $("#dvFadeForProcessing").hide();
            });
        }

        function fnColapse(ctrl) {
            var nid = $(ctrl).closest("tr").attr("nodeid");
            var ntype = $(ctrl).closest("tr").attr("nodetype");
            var pnid = $(ctrl).closest("tr").attr("pnodeid");
            var pntype = $(ctrl).closest("tr").attr("pnodetype");
            var lvl = $(ctrl).closest("tr").attr("lvl");
            if ($(ctrl)[0].src.indexOf("icoAdd") > -1) {
                $(ctrl)[0].src = "../Images/icoMinus.gif";
                $("#tbldbrlist tbody").find("tr[pnodeid='" + nid + "'][pnodetype='" + ntype + "']").css("display", "table-row");
            } else {
                $(ctrl)[0].src = "../Images/icoAdd.gif";
                if (lvl == 0) {
                    $("#tbldbrlist tbody").find("tr[lvl='1']").find("img").attr("src", "../Images/icoAdd.gif")
                    $("#tbldbrlist tbody").find("tr[lvl='1']").css("display", "none");
                } else {
                    $("#tbldbrlist tbody").find("tr[pnodeid='" + nid + "'][pnodetype='" + ntype + "']").css("display", "none");
                }
            }
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
        function fnShowhidediv() {
            $("#divFilter").toggle();
        }
		
		 function fnDownloadSiteDetails(ctrl) {
            var nid = $(ctrl).closest("tr").attr("nodeid");
            var ntype = $(ctrl).closest("tr").attr("nodetype");
            var pnid = $(ctrl).closest("tr").attr("pnodeid");
            var pntype = $(ctrl).closest("tr").attr("pnodetype");
            if (nid != 0 && pnid == 0) {
                pnid = nid;
                pntype = ntype;
                nid = 0;
                ntype = 0;
            }
            var sitebranchname = $(ctrl).closest("tr").find("td").eq(0).text();
            var LoginId = $("#cphRight_hdnLoginId").val();
            var sDate = $("#txtDate").val();
            var eDate = $("#txtToDate").val();
            var $checkedReason = $("input[name='multiselect_cphRight_ddlReason']:checked");
            var ReasonIds = "";
            for (var i = 0; i < $checkedReason.length; i++) {
                if (ReasonIds == "") {
                    ReasonIds = $checkedReason.eq(i).val();
                } else {
                    ReasonIds += "|" + $checkedReason.eq(i).val();
                }
            }
            window.open("../frmDownloadExcel.aspx?flg=8&sDate=" + sDate + "&eDate=" + eDate + "&BranchNodeId=" + nid + "&BranchNodeType=" + ntype + "&TasSiteNodeId=" + pnid + "&TasSiteNodeType=" + pntype + "&TeleReasonIds=" + ReasonIds + "&sitebranchname=" + sitebranchname + "&LoginId=" + LoginId);
        }

        
    </script>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphLeft" runat="Server">

    <iframe id="fraLeft" name="fraLeft" height="100%" width="100%" scrolling="yes" frameborder="0"
        src='../frmLeftMainTreeView.aspx'></iframe>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphRight" runat="Server">
    <div id="dvFadeForProcessing" style="position: fixed; z-index: 9999999999999; display: none; top: 0; bottom: 0; left: 0; right: 0; opacity: .80; -moz-opacity: 0.8; filter: alpha(opacity=80); background-color: #ccc;">
        <div id="Div2" runat="server" align="center" style="position: absolute; width: 150px; top: 30%; left: 45%;">
            <img alt="" title="Loading..." src="../Images/blue-loading.gif" />
        </div>
    </div>
    <div style="margin-left: 0px; padding-bottom: 10px; z-index: 1; width: 100%; background-color: #ffffff" id="divHeadercont">
        <h4 id="h4header">>>Calling Efficiency Report</h4>
        <div style="margin-top: 2px;">
            <div style="display:block" id="divFilterbtn"><a href="#" onclick="fnShowhidediv()" class="btn btn-info btn-lg" style="padding:4px 5px;font-size:14px">
          <span class="glyphicon glyphicon-filter"></span> Filter 
        </a></div>
            <div class="row" id="divFilter">
                <div class="col-md-2">
                    <table >
                        <tr>
                            <td style="width:67px">
                                <b>From Date</b>
                            </td>
                            <td style="width:10px">
                                :
                            </td>
                            <td>
                                <input type="text" id="txtDate" style="width: 72px" readonly />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-2">
                    <table >
                        <tr>
                            <td style="width:67px">
                                <b>To Date</b>
                            </td>
                            <td style="width:10px">
                                :
                            </td>
                            <td>
                                <input type="text" id="txtToDate" style="width: 72px" readonly />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-3">
                    <table >
                        <tr>
                            <td style="width:80px">
                                <b>Site List</b>
                            </td>
                            <td style="width:10px">
                                :
                            </td>
                            <td>
                                <asp:DropDownList runat="server" ID="ddlSite" Style="border: 1px solid #bbbbbb; width: 180px" multiple="true">
                        </asp:DropDownList>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-3">
                     <table >
                        <tr>
                            <td style="width:80px">
                                <b>Call Type</b>
                            </td>
                            <td style="width:10px">
                                :
                            </td>
                            <td>
                                <asp:DropDownList runat="server" ID="ddlReason" Style="border: 1px solid #bbbbbb; width: 180px" multiple="true">
                        </asp:DropDownList>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-2 text-center" style="padding-top:2px">
                    <input type="button" value="Show Report" class="btn btn-primary" onclick="fnShowReport(0)" id="btnShow" />
                </div>
            </div>
        </div>
        <div style="margin-top: 0px;" id="divChartContainer">
            <div class="row">
                <div class="col-md-6">
                    <div class="block" id="divChart1" style="height: 300px;padding-top:8px">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-12 block" style="height: 170px;padding-top:8px" id="divChart2">
                        </div>
                        <div class="col-12" style="height: 170px;padding-top:8px" id="divChart3">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div style="margin-top: 5px">
        <%--<div id="divfixedHeader" style="margin-left: 0px; position: fixed; z-index: 1"></div>--%>
        <div id="divMainData" style="margin-top: 0px; width: 100%">
        </div>
    </div>

    <asp:HiddenField runat="server" ID="hdnLoginId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnMenuId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnBranchCode" Value="0" />

</asp:Content>

