<%@ Page Language="C#" AutoEventWireup="true" CodeFile="frmPerformanceDashboard.aspx.cs" Inherits="frmPerformanceDashboard" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta http-equiv="refresh" content="300">
    <title>TAS</title>
    <style type="text/css">
        .loader_bg {
    z-index: 9910;
    min-height: 100%;
    width: 100%;
    height: auto;
    top: 0;
    left: 0;
    position: fixed;
    display: none;
    background: rgba(0, 0, 0, 0.1);
}

.loader {
    border: 10px solid #f3f3f3;
    border-radius: 50%;
    border-top: 10px solid #ff8000;
    width: 40px;
    height: 40px;
    left: 50%;
    top: 50%;
    position: absolute;
    margin-left: -15px;
    margin-top: -15px;
    -moz-animation: spin 1s linear infinite;
    -webkit-animation: spin 1s linear infinite;
    animation: spin 1s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
    0% {
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
    }

    100% {
        -moz-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
       
        nav.navbar-default {
            margin-bottom: 1rem;
            height: 60px;
            border-bottom: 1px solid #ddd;
            background: #fff;
        }

        .navbar-brand {
            position: relative;
        }

            .navbar-brand > img.logo {
                width: auto;
                height: 80px;
                left: 10px;
                position: absolute;
            }

        .container {
            margin: 0 auto !important;
        }

        fieldset {
            border: 1px solid #0094ff !important;
            position: relative;
        }

            fieldset > legend {
                background: #FFF;
                color: #000;
                padding: 0 10px !important;
                margin-top: -10px;
                margin-left: 10px;
                display: inline-block !important;
                width: auto !important;
                border: 1px solid #0094ff !important;
            }

        table#tbldbrlist1 > tbody > tr > td:first-child {
            width: 35%;
        }

        table#tbldbrlist1 > tbody > tr:nth-child(1) {
            background: #d6d6d6;
        }

        table#tbldbrlist1 > tbody > tr:nth-child(2) {
            background: #8ab96a;
        }

        table#tbldbrlist1 > tbody > tr:nth-child(3) {
            background: #562679;
            color: #FFF;
        }

        .font-lg {
            font-size: 1.3rem;
        }

        .font-md {
            font-size: 1rem;
        }

        .font-sm {
            font-size: 0.8rem;
        }

        .table td, .table th {
            padding: 0.30rem !important;
            vertical-align: top;
            border-top: 1px solid #dee2e6;
        }
    </style>
    <script src="../scripts/jquery-1.10.2.js"></script>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <script>
        var StoreList = []; var counter = 0; var refreshcounter = 60;
        $(document).ready(function () {
            $("#divRefresh").html("Dashboard Refreshed At - " + new Date().localeFormat("hh:mm tt"));
            fnShowReport();
        });

        // fnTimer1();
        function fnTimer1() {
            $(document).ready(function () {
                counter++;
                if (counter == refreshcounter) {//Auto Time Update
                    counter = 0;
                    fnShowTodayData();
                }
                setTimeout("fnTimer1()", 1000);
            });
        }

        function fnShowReport() {
            $("#dvFadeForProcessing").show();
            PageMethods.fnMTDYesterDayReport(function (result) {
                $("#dvFadeForProcessing").hide();
                if (result.split("^")[0] == "2") {
                    $("#divMeasure")[0].innerHTML = "";
                    $("#divMainData")[0].innerHTML = "Error : " + result.split("^")[1];

                } else {
                    var str = result.split("^")[1];
                    $("#divAll")[0].innerHTML = str.split("|")[0];
                    $("#divMainData")[0].innerHTML = str.split("|")[1];
                }

            }, function (result) {
                alert("Error-" + result._message);
                $("#dvFadeForProcessing").hide();
            });
        }

        function fnShowTodayData() {
            $("#divRefresh").html("Dashboard Refreshed At - " + new Date().localeFormat("hh:mm tt"));

            PageMethods.fnTodayData(function (result) {

                if (result != "") {

                    var arrData = $.parseJSON("[" + result + "]");
                    for (var i in arrData[0].Table) {
                        var MesureId = arrData[0].Table[i]["MeasureId"];
                        var MesureData = arrData[0].Table[i]["Today"];
                        $("#tbldbrlist1 tr[measureid='" + MesureId + "']").find("td").eq(1).html(MesureData);
                    }
                    for (var i in arrData[0].Table1) {
                        var MesureId = arrData[0].Table1[i]["MeasureId"];
                        var MesureData = arrData[0].Table1[i]["Today"];
                        $("#tbldbrlist2 tr[measureid='" + MesureId + "']").find("td").eq(3).html(MesureData);
                    }
                }
            }, function (result) {
            });

        }

    </script>

</head>
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="true">
        </asp:ScriptManager>
        <div id="dvFadeForProcessing" class="loader_bg">
        <div class="loader"></div>
    </div>
       
        <nav class="nav navbar-default">
            <div class="container" style="width: 100% !important; max-width: 100% !important;">
                <div class="navbar-brand">
                    <img src="../Img/astix_logo.png" class="logo" />
                </div>
                <div class="pull-right"></div>
            </div>
        </nav>
        <div class="container-fluid">
            <div class="container" style="width: 100% !important; max-width: 100% !important;">
                <div class="main_content">
                    <fieldset class="mb-4">
                        <legend>Activity Today</legend>
                        <div id="divAll">
                            <table id="tbldbrlist1" class="table mb-0 font-lg">
                                <tbody>
                                    <tr measureid="1">
                                        <td>Calls Planned</td>
                                        <td>0</td>
                                    </tr>
                                    <tr measureid="2">
                                        <td>Calls Made</td>
                                        <td>0</td>
                                    </tr>
                                    <tr measureid="3">
                                        <td>Calls Productive</td>
                                        <td>0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Performance</legend>
                        <div id="divMainData">
                            <table id="tbldbrlist2" class="table table-sm mb-0 font-md">
                                <thead>
                                    <tr>
                                        <th class="bg-info text-white">Measure</th>
                                        <th class="bg-info text-white" style="width: 15%; text-align: right; padding-right: 30px">MTD</th>
                                        <th class="bg-info text-white" style="width: 15%; text-align: right; padding-right: 30px">Yesterday</th>
                                        <th class="bg-info text-white" style="width: 15%; text-align: right; padding-right: 30px">Today</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr measureid="4">
                                        <td>Seller Throughput</td>
                                        <td style="text-align: right; padding-right: 30px">₹ 00000</td>
                                        <td style="text-align: right; padding-right: 30px">₹ 00000</td>
                                        <td style="text-align: right; padding-right: 30px">₹ 00000</td>
                                    </tr>
                                    <tr measureid="5">
                                        <td>Store Throughput</td>
                                        <td style="text-align: right; padding-right: 30px">₹ 00000</td>
                                        <td style="text-align: right; padding-right: 30px">₹ 00000</td>
                                        <td style="text-align: right; padding-right: 30px">₹ 00000</td>
                                    </tr>
                                    <tr measureid="6">
                                        <td>Value Ordered</td>
                                        <td style="text-align: right; padding-right: 30px">₹ 00000</td>
                                        <td style="text-align: right; padding-right: 30px">₹ 00000</td>
                                        <td style="text-align: right; padding-right: 30px">₹ 00000</td>
                                    </tr>
                                    <tr measureid="7">
                                        <td>Calls Conversion %</td>
                                        <td style="text-align: right; padding-right: 30px">0 %</td>
                                        <td style="text-align: right; padding-right: 30px">0 %</td>
                                        <td style="text-align: right; padding-right: 30px">0 %</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </fieldset>
                </div>

                <div class="float-right mt-2 p-2 font-md font-weight-bold d-inline-block bg-danger text-white" id="divRefresh">Dashboard Refreshed At - 07:21 PM</div>
            </div>
        </div>

    </form>
</body>
</html>
