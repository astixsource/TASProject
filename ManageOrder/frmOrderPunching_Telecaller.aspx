<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/ManageOrder/MasterTelecaller.master" CodeFile="frmOrderPunching_Telecaller.aspx.cs" Inherits="frmOrderPunching_Telecaller" EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="../scripts/jquery-3.6.0.js"></script>
    <link href="../StylesTreeView/Css/main.css" rel="stylesheet" type="text/css" />
    
    <script src="../Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>
    <link href="../Styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/FontIcon.js" crossorigin='anonymous'></script>
    <script src="../Scripts/OrderpunchingScript_V5.js"></script>
    <style type="text/css">

        .clsDivSBIcon{
            display:inline;
            width:18px;
            height:18px;
            border:2px solid #00B0F0;
            border-radius:60%; 
            cursor:default;
            padding:1px;
            font-weight:bold;
            font-size:5pt;
        }
        div#divSchemeAchievementTemp {
            overflow-x: hidden;
        }

        .clsDialogWithzeroPadding {
            padding: 0px !important;
        }

        body.clsOverflowhide {
            overflow-y: hidden !important;
        }

        .main-sidebox {
            position: fixed;
            right: 0;
            top: 5px;
            z-index: 99;
        }

        .click-side {
            float: left;
            padding: 12px;
            background: #008C31;
            color: #FFF;
            cursor: pointer;
            width: 6px;
            text-align: center;
            word-break: break-all;
            word-wrap: break-word;
            text-wrap: normal;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
            -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
            -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
        }

        .slidable {
            float: right;
            height: 385px;
            background: #FFF;
            width: 375px;
            border: 1px solid #0046AD;
            box-sizing: border-box;
            padding: 10px 0 0 5px;
            overflow-y: auto;
            word-wrap: normal;
            word-break: normal;
        }

        fieldset {
            border: 1px solid #ddd !important;
            margin: 0;
            min-width: 0;
            padding: 0px;
            position: relative;
            border-radius: 4px;
            background-color: #f5f5f5;
        }

        legend {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 0px;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 5px 5px 5px 10px;
            background-color: #ffffff;
        }

        .table-condensed > tbody > tr > td, .table-condensed > tbody > tr > th, .table-condensed > tfoot > tr > td, .table-condensed > tfoot > tr > th, .table-condensed > thead > tr > td, .table-condensed > thead > tr > th {
            padding: 2px !important;
        }

        div.clsloader {
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            height: 100%;
            z-index: 200;
            background-color: white;
            opacity: 0.8;
        }

        .ui-datepicker select.ui-datepicker-month, .ui-datepicker select.ui-datepicker-year {
            width: 49%;
            color: black !important;
        }

        html {
            border-right: 1px solid #bbbbbb;
        }

        .clsbody {
            overflow: hidden !important;
            overflow-y: scroll !important;
        }

        .bodyScrollHidden {
            overflow: hidden !important;
            overflow-y: hidden !important;
        }

        input[type=text]::-ms-clear {
            display: none;
        }

        .ui-autocomplete-loading {
            background: url('../images/preloader_18.gif') no-repeat right center;
        }

        .activeCell {
            background: #a8e1a8;
        }

        tr.trHightlightSBD td {
            background: #bcf8a3 !important;
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

            a.icon-bnt:hover {
                background: #486066 none;
                border: 0 none;
                border-radius: 1px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
            }

            a.icon-bnt span {
                height: 27px;
                width: 32px;
                float: left;
                padding: 0 1pt 0 0;
            }

                a.icon-bnt span.Delete {
                    background: url(../btnImg/close_icons.png) center no-repeat;
                }

                a.icon-bnt span.Save {
                    background: url(../btnImg/cart_icon.png) center no-repeat;
                    background-size: contain;
                }

                a.icon-bnt span.NewOrder {
                    background: url(../btnImg/NewOrder_Icon.png) center no-repeat;
                }

                a.icon-bnt span.PostOrder {
                    background: url(../btnImg/PostOrder_Icon.png) center no-repeat;
                }

                a.icon-bnt span.PickList {
                    background: url(../btnImg/Picklist_Icon.png) center no-repeat;
                }

                a.icon-bnt span.Print {
                    background: url(../btnImg/Print_Icon.png) center no-repeat;
                }

                a.icon-bnt span.Route {
                    background: url(../btnImg/Route_Icon.png) center no-repeat;
                }

                a.icon-bnt span.Search {
                    background: url(../btnImg/Search_Icon.png) center no-repeat;
                }

                a.icon-bnt span.Search_Small {
                    background: url(../btnImg/Search_Icon_small.png) center no-repeat;
                }

                a.icon-bnt span.Close {
                    background: url(../btnImg/close_icons.png) center no-repeat;
                }

                a.icon-bnt span.Preview {
                    background: url(../btnImg/PrintPreview_icons.png) center no-repeat;
                }

            a.icon-bnt div {
                float: left;
                line-height: 25px;
                padding: 0 3pt 0 0;
            }

        .nav > li > a {
            position: relative;
            padding: 1px 10px !important;
        }
    </style>
    <style type="text/css">
        body {
            width: 100%;
            margin: 0px;
            padding: 0px;
            background: url(Images/bg-body.gif);
            font: normal 11px 'arialnarrow';
            color: #3F3F3F !important;
            max-height: 100%;
        }

        #tblStarEarnedSummary tr.clsbgRed td, #tblStarEarnedSummaryPop tr.clsbgRed td {
            background-color: #ffb0b0;
        }

        #tblStarEarnedSummary tr.clsbgGrey td, #tblStarEarnedSummaryPop tr.clsbgGrey td {
            background-color: #dbdbdb;
        }

        #tblStarEarnedSummary td, #tblStarEarnedSummaryPop td {
            vertical-align: middle;
        }

        input[type=text] {
            font: normal 8pt 'HelveticaLTStdRoman',Arial, Helvetica, sans-serif;
            border: 1px solid #A0A0A0;
            vertical-align: middle;
            padding: 2px;
        }

        textarea {
            font: normal 11px 'HelveticaLTStdRoman',Arial, Helvetica, sans-serif;
            border: 1px solid #A0A0A0;
        }


        .mcacAnchor span {
            font: normal 11px 'HelveticaLTStdRoman',Arial, Helvetica, sans-serif;
            color: Black;
        }

        select {
            font: normal 8.5pt 'HelveticaLTStdRoman',Arial, Helvetica, sans-serif;
            height: 17px;
        }

        #tblPrdItemsMain select {
            font: normal 8.5pt 'HelveticaLTStdRoman',Arial, Helvetica, sans-serif;
            height: 16px;
            border-style: none;
        }

        a {
            text-decoration: none;
        }

        .button {
            padding: 5px 15px;
            font-size: 11px;
            font-style: italic;
            font-weight: bold;
            color: #fff;
            background: #6C0000;
            border-bottom: 5px solid #FE4225 !important;
            border: none;
            cursor: pointer;
            margin: 10px 6px 0 0;
            display: inline-block;
            *display: inline;
            text-decoration: none;
        }

            .button:hover {
                background: #009726;
                border-bottom: 5px solid #034623 !important;
            }

        .dvMain {
            width: 100%;
            margin-bottom: 5px;
        }

        .dvHead {
            background-color: #A6C0F7;
            vertical-align: middle;
        }

        tr.normal td {
            color: black;
            background-color: white;
        }

        tr.highlighted td {
            color: black;
            background-color: lightgreen;
        }

        tr.clsSchhighlighted td {
            color: black;
            background-color: #ffffaa;
            font-weight: bold;
        }

        .highlightedProduct {
            background-color: #eafc85 !important;
        }

        .highlightedDate {
            background-color: #ff8000;
        }

        .highlightedWeekOffDate {
            background-color: #faadcc;
        }

        .highlightedDelTrueDate {
            background-color: #faff24;
        }

        tr.highlightedRowInChecked td {
        }

        td.clsSelectOne {
            background-color: #eafc85;
        }

        tr.clsOrangeBg td {
            background-color: #ff9d3c;
        }

        tr.clsGreenBg td {
            background-color: #92f367;
        }

         td.clsCellOrangeBg  {
            background-color: #ff9d3c;
        }

        td.clsCellGreenBg {
            background-color: #92f367;
        }

        tr.clsGrayBg td {
            background-color: #b4b4b4;
        }

        .WaterMarkedTextBox {
            color: gray;
        }

        .NormalTextBox {
        }
    </style>
    <style type="text/css">
        *, ::after, ::before {
            box-sizing: border-box;
        }

        .title-head {
            background: #DEEBF7;
            padding: .4rem 1.25rem;
            margin-bottom: 1rem;
            font-weight: bold;
        }

        .table-small {
            width: 100%;
            margin-bottom: 1rem;
            border-collapse: collapse;
            border-spacing: 0;
            color: #212529;
            font-size: 1.0rem;
        }

            .table-small > thead > tr > th {
                vertical-align: bottom;
                text-align: inherit;
                border-bottom: 2px solid #d2d2d2 !important;
                background: #4472C4;
                color: #FFF;
                line-height: 1.9;
            }

            .table-small > thead > tr > th,
            .table-small > tbody > tr > td,
            .table-small > tfoot > tr > td {
                padding: 0.2rem 0.3rem;
                vertical-align: middle;
                border: 1px solid #d2d2d2;
                line-height: 1.9;
                text-align: left;
            }

            .table-small.striped tbody tr:nth-of-type(odd) {
                background-color: #CFD5EA;
            }

            .table-small.striped tbody tr:nth-of-type(even) {
                background-color: #E9EBF5;
            }

            .table-small > thead > tr.head th {
                background: #D9D9D9 !important;
                color: #212529 !important;
            }

            .table-small > tfoot > tr.foot {
                background: #FFC000 !important;
                font-weight: bold;
            }

        .th-td-gray {
            background: #cfd5ea !important;
            font-weight: bold;
            color: #212529 !important;
        }

        .th-td-green {
            background: #00b050 !important;
            font-weight: bold;
            text-transform: uppercase;
            color: #FFF;
        }

        .th-td-lightgreen {
            background: #c5e0b4 !important;
            font-weight: bold;
        }

        .th-td-black {
            background: #44546a !important;
            font-weight: bold;
            text-transform: uppercase;
            color: #ffffff;
            text-align: left;
        }

        .table-small > tbody > tr > td.td-img {
            text-align: center;
            width: 100px;
        }

            .table-small > tbody > tr > td.td-img > img {
                width: auto;
                max-width: 100%;
                height: 40px;
            }

        .ui-dialog .ui-dialog-content {
            position: relative;
            border: 0;
            padding: 0em !important;
            background: none;
            overflow: auto;
        }
    </style>
   
    <style>
        .nav-tabs > li > a.active {
            background: #4472c4;
            color: #ffffff;
        }

        div.example input[type=text] {
            font-size: 14px;
            border: 1px solid grey;
            float: left;
            width: 80%;
            height: 100%;
            background: #f1f1f1;
            border-radius: 0;
        }

        div.example button {
            float: left;
            width: 20%;
            height: 100%;
            background: #2196F3;
            color: white;
            font-size: 17px;
            border: 1px solid grey;
            border-left: none;
            cursor: default !important;
        }

            div.example button:hover {
                background: #0b7dda;
                cursor: default !important;
            }

        div.example::after {
            content: "";
            clear: both;
            display: table;
        }
    </style>
    
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="cphRight" runat="Server">
   <div id="dvFadeForProcessing" align="center" class="clsloader">
            <img src="../NewImages/ajax-loader.gif" style="margin-top: 150px;" />
        </div>
  
    <div style="width:100%">
        <div style="margin-top: 0px; display: block; width: 73%; font-size: 8.5pt; float: left;border-right:1px solid #bbbbbb" id="dvMainMaster">
            <div style="width:73%;position:fixed;background-color:#ffffff;z-index:1;height:43px;">
                <table style="width:99.8%;margin-left:0px">
                    <tr>
                        <td style="border:1px solid #a0a0a0;width:18%;padding:0px 2px">
                            <table style="width:100%">
                                <tr>
                                    <td>Contact #</td><td style="width:6px;font-weight:bold">:</td><td id="tdContactNo"></td>
                                </tr>
                                <tr >
                                    <td>Alternate #</td><td style="width:6px;font-weight:bold">:</td><td id="tdAltContactNo"></td>
                                </tr>
                            </table>
                        </td>
                         <td style="border:1px solid #a0a0a0;width:20%;padding:0px 2px">
                             <table style="width:100%">
                                  <tr>
                                    <td><b>Channel</b></td><td style="width:6px;font-weight:bold">:</td><td id="tdStoreChannel"></td>
                                </tr>
                                <tr>
                                    <td><b>Customer Type</b></td><td style="width:6px;font-weight:bold">:</td><td id="tdStoreSubChannel"></td>
                                </tr>
                               
                            </table>
                        </td>
                         <td style="border:1px solid #a0a0a0;width:15%;padding:0px 2px">
                              <table style="width:100%">
                                  <tr>
                                    <td><b>Sector</b></td><td style="width:6px;font-weight:bold">:</td><td id="tdSector"></td>
                                </tr>
                               <%-- <tr>
                                    <td><b>Cust Type</b></td><td style="width:6px;font-weight:bold">:</td><td id="tdCustType"></td>
                                </tr>
                                <tr>
                                    <td><b>Cust Segment</b></td><td style="width:6px;font-weight:bold">:</td><td id="tdCustSegment"></td>
                                </tr>--%>
                            </table>
                        </td>
                         <td style="border:1px solid #a0a0a0;width:15%;padding:0px 2px">
                              <table style="width:100%">
                                <tr>
                                    <td><b>Call Reason</b></td><td style="width:6px;font-weight:bold">:</td><td id="tdCallType"></td>
                                </tr>
                               <%-- <tr>
                                    <td><b>Reason</b></td><td style="width:6px;font-weight:bold">:</td><td id="tdReason"></td>
                                </tr>--%>
                            </table>
                        </td>
                         <td style="border:1px solid #a0a0a0;width:13%;padding:0px 2px;display:none">
                             <table style="width:100%">
                                <tr>
                                    <td><b>Order Date</b></td><td style="width:6px;font-weight:bold">:</td><td><input type="text" id="txtOrderDate" style="width: 80px; margin-right: 2px;font-size:8pt;border:none;" tabindex="1" disabled="disabled" /></td>
                                </tr>
                                <tr>
                                    <td><b>Dlvry Date</b></td><td style="width:6px;font-weight:bold">:</td><td><input type="text" id="txtRequiredDlvryDate"  class="dtp" style="width: 75px; margin-right: 2px;font-size:8pt;border:none;" tabindex="1" disabled="disabled" /></td>
                                </tr>
                            </table>
                        </td>
                        <td  style="text-align:center;padding:2px;width:15%;padding:0px 2px">

                            <div class="example" style="height:33px">
    <input type="text"  id="txtSearchproduct" class="form-control" placeholder="Search Product">
      <button  type="button" style="background-color:#4d6082">
        <i class="glyphicon glyphicon-search"></i>
      </button>
  </div>
                           
                        </td>
                    </tr>
                    
                   
                </table>
            </div>

            <div style="margin-left: 0px; display: block; width: 99.8%;margin-bottom:69px;margin-top:40px;" id="dvtabcontainer">
                <div id="divfixedHeader" style="margin-left: 0px; position:fixed;z-index:1"></div>
                <div id="divtblMain">
                    <table cellspacing="0" style="font-size: 8.5pt;width:100%" id="tblPrdItemsMain">
                               
                            </table>
                </div>
                <div id="divFixedFooter" style="padding:4px 0px;margin-left: 0px; bottom: 36px; position:fixed;z-index:1;background-color:#408080;color:#ffffff"></div>           

                 </div>
           
            </div>

        <div style="margin-top:0px; width: 27%; position: fixed; margin-left: 0px; right: 0;" flg="1"" id="divRightContainer">
             <div style="margin-top: 0px;width: 100%;  border: 1px solid #A0A0A0;border-bottom:3px solid #a2acc8; font-size: 7.5pt">
                 <div style="display:none;padding:2px;background-color:#000080;color:#ffffff;font-size:8.5pt;font-weight:bold;text-align:center;font-size: 8pt">
                     Recomandation
                 </div>
                <div id="divRecomandation" style="display:none;overflow-y: auto;background-color:#000080;color:#ffffff;font-size:8pt; overflow-x: hidden; height: 30px; padding: 3px;font-size:8pt;">
                    
                </div> 
                 <div style="padding:2px;background-color:#e8d2d2;font-weight:bold;font-size:8.2pt;text-align:center">
                    GP Achievement
                </div>
                <div  style="height:36px;text-align:center">
                    <table class="table table-bordered" id="tblSBDOrdered" >
                        <thead bgcolor="#f8efef">
                            <th style="padding:1px;width:31%;text-align:center">
                                GAPS To Be Filled
                            </th>
                            <th style="padding:1px;width:30%;text-align:center">
                                Filled In Order
                            </th>
                            <th style="padding:1px;text-align:center">
                                Balance
                            </th>
                        </thead>
                        <tbody style="font-size:8pt">
                            <td style="padding:1px;vertical-align:middle">
                            </td>
                            <td style="padding:1px;vertical-align:middle" id="tdsbdCount" gpvalue="0">
                            </td>
                            <td style="padding:1px;vertical-align:middle" >
                            </td>
                        </tbody>
                    </table>
                </div>
            </div>
             <div style="margin-top: 0px;width: 100%;  border: 1px solid #A0A0A0;border-bottom:3px solid #a2acc8;font-size: 7.5pt;">
                  <div style="display:none;padding:2px;background-color:#1f497d;font-weight:bold;font-size:8.2pt;color:#ffffff;text-align:center">
                    FOCUS BRAND
                </div>
                <div id="divFocusBrandData" style="overflow-y: auto; overflow-x: hidden; height: 120px; padding: 0px;">
                    <table class="table-small table-bordered" id="tblFocusBrandMain" style="font-size:7.5pt" cellspacing="0" cellpadding="0">
                    <thead>
                      <tr>
                        <th  style="line-height:1.4;">Focus Brand</th>
                        <th style="text-align:center;line-height:1.4;width:22%">Ach/Tar</th>
                        <th style="text-align:center;line-height:1.4;width:14%">GAP</th>
                          <th style="text-align:left;line-height:1.4;width:20%">In Order</th>
                      </tr>
                      </thead>
                      <tbody>
                      </tbody>
                </table>
                </div>
            </div>
             
            
             <div style="margin-top: 0px;width: 100%;border: 1px solid #A0A0A0;border-bottom:3px solid #a2acc8; font-size: 7.5pt" >
                <div style="display:none;padding:2px;background-color:#1f497d;font-weight:bold;font-size:8.3pt;color:#ffffff;text-align:center">
                    Intitiative Applicable
                </div>
                 <div style="padding:2px;background-color:#1f497d;color:#ffffff;font-weight:bold;text-align:center;font-size: 8pt">
                    Intitiative Corporate Plan
                 </div>
                 <div id="divCorporatePlan" style="overflow-y: auto; overflow-x: hidden; height:100px; padding: 0px;">
                    
                </div>
                 <div style="padding:2px;background-color:#1f497d;color:#ffffff;font-weight:bold;text-align:center;font-size: 8pt">
                     Intitiative Achievement
                 </div>
                <div id="divSchemeAppliedSectionAchievement" style="overflow-y: auto; overflow-x: hidden; height: 70px; padding: 0px;">
                    
                </div>
                 
            </div>
             <div style="margin-top: 0px;width: 100%;border: 1px solid #A0A0A0; font-size: 7.5pt">
                 <ul class="nav nav-tabs" id="myTab" role="tablist">
 
  <li class="nav-item" style="display:none">
    <a class="nav-link " id="divStarEarned-tab" data-toggle="tab" href="#divStarEarned" role="tab" aria-controls="divStarEarned" aria-selected="false">Star Earned</a>
  </li>
                      <li class="nav-item">
    <a class="nav-link active" id="divSchemeAppliedSectionSub-tab" data-toggle="tab" href="#divSchemeAppliedSectionSub" role="tab" aria-controls="divSchemeAppliedSectionSub" aria-selected="true">Key Order Information</a>
  </li>
</ul>
                <div class="tab-content" id="myTabContent">
 

                    <div id="divStarEarned"  role="tabpanel" aria-labelledby="divStarEarned-tab" class="tab-pane" style="overflow-y: auto; overflow-x: hidden; height: 156px; padding: 0px;">
                    <table style="width:100%;margin:0px;font-size:7.5pt" id="tblStarEarnedSummary" class='table table-bordered table-condensed'>
                        <thead><tr class="bg-primary text-white"><td>Key Parameters</td><td style="text-align:right"></td><td style="text-align:center" flg="2">Balance</td> </tr></thead>
                        <tbody>
                            <tr data-achieved="0">
                            <td class="text-left" >Call Conversion</td><td style="text-align:center;width:10%" ><img src="../images/blackstar.png" style="width:20px;height:18px" /></td><td flg="2" style="text-align:center;" id="tdCallConBal"></td>
                            </tr>
                            <tr data-achieved="0">
                            <td class="text-left">Productivity</td><td style="text-align:center;width:10%" ><img src="../images/blackstar.png" style="width:20px;height:18px" /></td><td flg="2" style="text-align:center;" id="tdProductivityBal"></td>
                            </tr>
                            <tr data-achieved="0">
                            <td class="text-left">Golden Points</td><td style="text-align:center;width:10%" ><img src="../images/blackstar.png" style="width:20px;height:18px" /></td><td flg="2" style="text-align:center;" id="tdGPBal"></td>
                            </tr>
                            <tr data-achieved="0">
                            <td class="text-left">Focus Brand</td><td style="text-align:center;width:10%" ><img src="../images/blackstar.png" style="width:20px;height:18px" /></td><td flg="2"  style="text-align:center;" id="tdFBBal"></td>
                            </tr>
                             <tr data-achieved="0">
                            <td class="text-left">Store Target Hit</td><td style="text-align:center;width:10%" ><img src="../images/blackstar.png" style="width:20px;height:18px" /></td><td  flg="2" style="text-align:center;" id="tdSHTBal"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                     <div id="divSchemeAppliedSectionSub"  role="tabpanel" aria-labelledby="divSchemeAppliedSectionSub-tab" class="tab-pane show active" style="overflow-y: auto; overflow-x: hidden; height: 156px; padding: 0px;">
                    <table style="width:100%;margin:0px;font-size:7.5pt" id="tblInvSummary" class='table table-bordered table-condensed'>
                        <thead><tr class="bg-primary text-white"><td>Key Parameters</td><td style="text-align:right">Value</td><td style="text-align:center">%</td> </tr></thead>
                        <tbody>
                            <tr>
                            <td class="text-left">MRP Value</td><td style="text-align:right;width:30%" id="tdInvMRP">0.00</td><td  style="text-align:center;width:15%"></td>
                            </tr>
                             <tr>
                            <td class="text-left">Bill without discount</td><td style="text-align:right" id="tdInvValue">0.00</td><td  style="text-align:center"></td>
                            </tr>
                             <tr class="text-primary">
                            <td class="text-left"><a href="###" style="color:blue;text-decoration:underline" onclick="fnProductLineInitiative(this)" >Discount On Product</a></td><td style="text-align:right" id="tdLineSchemeDiscount">0.00</td><td  style="text-align:center">0</td>
                            </tr>
                            <tr class="text-primary" >
                            <td class="text-left">Discount On Overall Bill Value</td><td style="text-align:right" id="tdOverallInvSchemeDiscount">0.00</td><td  style="text-align:center">0</td>
                            </tr>
                            <tr class="text-primary">
                            <td class="text-left">Total Discount</td><td style="text-align:right" id="tdInvSchemeDiscount">0.00</td><td  style="text-align:center">0</td>
                            </tr>
                            <tr>
                                <td class="text-left">Net Invoice value</td><td style="text-align:right" id="tdNettInvValue">0.00</td><td style="text-align:center"></td>
                            </tr>
                             <tr class="text-primary" style="display:none">
                            <td class="text-left">Reg. Brand Margin</td><td style="text-align:right" id="tdBranMargin">0.00</td><td  style="text-align:center">0</td>
                            </tr>
                            <tr class="text-primary" >
                            <td class="text-left" >Margin Earned</td><td style="text-align:right" id="tdTotalBranMargin">0.00</td><td style="text-align:center">0</td>
                            </tr>
                           
                        </tbody>
                    </table>
                </div>

  
</div>
                
            </div>
           
        </div>

    </div>
    <div class="blockButtons" style="width: 73%; bottom: 0; position: fixed; padding-top: 1px; background-color: #cfcfcf;">
        <table style="width:100%">
            <tr>
                <td style="width:12.5%">
                    <a href="###" class="icon-bnt" onclick="fnSaveFinalData(2)" id="anchorbtn2" ><span class="Save"></span>
                        <div style="font-size: 8.8pt;width:80px">Review Order</div>
                    </a>
                   </td>
                
                <td style="width:87.5%">
                    <table id="tblbtnsLegends">
                        <tr>

                             <td style="display:none;width:20px;padding-left:4px;display:none" class="clsnewrelease">
                        <div style="width:28px;height:28px;border:3px solid #FE4225;border-radius:48%;cursor:pointer;padding:4px 1px 1px 2px;font-weight:bold" onclick="fnFilterPrioritySBFBasedOnLegend(5)">SB</div>
                             </td>
                        <td style="width:95px;display:none;padding: 0px 1px 0px 1px;font-weight:bold;font-size:7.5pt;color:blue;text-decoration:underline;cursor:pointer;display:none" class="clsnewrelease" onclick="fnFilterSBFBasedOnLegend(5)">Smart Basket</td>

                        <td style="width:20px;background-color:#b0b0ff;padding-left:8px;height:20px" class="clsSelectOne">
                        </td>


                        <td class="clsSelectOne" style="padding: 0px 1px 0px 1px;font-weight:bold;font-size:7.5pt;color:blue;text-decoration:underline;cursor:pointer" onclick="fnFilterSBFBasedOnLegend(1)">Replenish</td>

                        
                            
                        <td style="width:25px;padding-left:4px">
                             <img src='../btnImg/fb-icon.png' style="cursor:pointer" onclick="fnFilterSBFBasedOnLegend(3)" />
                            
                        </td>
                        <td style="padding: 0px 1px 0px 2px;font-weight:bold;font-size:7.5pt;color:blue;text-decoration:underline;cursor:pointer" onclick="fnFilterSBFBasedOnLegend(3)">FB Product</td>

                            <td style="width:25px;padding-left:4px">
                            <img src='../btnImg/sbd_icon.png' style="cursor:pointer" onclick="fnFilterSBFBasedOnLegend(2)" />
                        </td>
                        <td style="padding: 0px 10px 0px 4px;font-weight:bold;font-size:7.5pt;color:blue;text-decoration:underline;cursor:pointer" onclick="fnFilterSBFBasedOnLegend(2)">All GP Product</td>


                             <td style="width:25px;padding-left:4px">
                            <img src='../btnImg/offers-icon.png' style="cursor:pointer" onclick="fnFilterSBFBasedOnLegend(4)" />
                        </td>
                        <td style="padding: 0px 1px 0px 2px;font-weight:bold;font-size:7.5pt;color:blue;text-decoration:underline;cursor:pointer" onclick="fnFilterSBFBasedOnLegend(4)">Initiative</td>
                        
                        <td style="width:20px;background-color:#ffffc4;padding-left:4px">
                        </td>
                        <td style="padding: 0px 1px 0px 1px;font-weight:bold;font-size:7.5pt">Newly Added Product</td>
                             <td style="padding:0 2px;font-weight:bold;font-size:7.5pt"><b><a href="###" style="text-decoration:underline;color:blue" onclick="fnShowStoreInitiative()" >Store Initiatives</a></b></td>
                        <td style="padding:0 2px;display:none"><b><a href="###" id="btnDSERemarks" class="btn btn-primary btn-sm" onclick="fnShowRemarksToDSR()" >Remarks To DSE</a></b></td>
                            <td style="padding:0 5px;display:none"><b><a href="###" id="btnTaskList"  class="btn btn-danger btn-sm" onclick="fnShowTaskList()" >Task List</a></b></td>  
                        </tr>
                    </table>

                </td>
                <td id="tdCustStatus">
                </td>
            </tr>
        </table>
    </div>
    <div id="dvOrderViewDetail" style="display: none; font-size: 8.5pt" title="Order Detail">
    </div>
   
   
     <div id="dvContextFinishedPrd" style="background-color: #F0F0F0; cursor: pointer; display: none; width: 100%;overflow: hidden;">
        <div style="padding-bottom: 5px">
            <table style="width: 100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="width: 98px; padding-left: 5px">Find Product :
                    </td>
                    <td style="width: 240px; padding-top: 5px; padding-right: 5px">
                        <input type="text" style="width: 100%; height: 22px" id="txtFindPrdCode" />
                    </td>
                    <td>
                        <b>Eg. : </b>fem,ultr,soft,55
                    </td>
                    <td align="right" valign="top">
                        <img src="../Images/button_cancel.png" title="click to close popup" onclick="fnHideDv()" />
                    </td>
                </tr>
            </table>
        </div>
        <div style="height: 380px;">
            <div class="ui-widget-header" style="height: 18px">
                <table cellpadding="3" cellspacing="0">
                    <tr>
                        <td style="font-weight: bold; color: white; width: 60px;text-align:center">SNo
                        </td>
                        <td style="font-weight: bold; color: white; width: 250px;">Product Name
                        </td>
                        <td style="font-weight: bold; color: white; width: 150px;">Brand
                        </td>
                        <td style="font-weight: bold; color: white; width: 200px;">BrandForm
                        </td>
                        <td style="font-weight: bold; color: white; width: 130px;">Category
                        </td>
                        <td style="font-weight: bold; color: white; text-align: center; width: 80px;">MRP
                        </td>
                         <td style="font-weight: bold; color: white; text-align: center; width: 80px;">RLP
                        </td>
                    </tr>
                </table>
            </div>
            <div style="height: 335px; overflow-y: auto; background-color: white" id="dvPrdContainer">
            </div>

        </div>
    </div>
    <div style="display: none; text-align: center;" id="dvIsreturn">
    </div>
    <div style="display: none; text-align: center;" id="dvReason" title="Reason">
    </div>
    <div style="display: none; text-align: center;padding:8px !important" id="dvSchemeDescr" title="Schemes Description">
    </div>
     <div class="main-sidebox">
            <div class="click-side">STORE&nbsp;HISTORY</div>
            <div class="slidable" id="divslidable">
                
            
            </div>
        </div>
        
     <div style="display: none; text-align: center;" id="dvRestorecheck">
         <div class="container" style="padding:2px !important">
	<div class="row">
   	  <div class="col-md-6">
           	    <table class="table-small  table-bordered col-md-6" id="tblStoreInfo" cellspacing="0" cellpadding="0">
              <thead>
                  <tr>
                    <th>Store Name </th>
                    <th id="tdRStoreName" style="padding-left:8px"></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Owner Name</td>
                   <td id="tdROwnerName"></td>
                  </tr>
                      <tr>
                    <td>Channel</td>
                   <td id="tdRChannelName"></td>
                  </tr>
                      <tr>
                    <td>Customer Type</td>
                   <td id="tdRCustType"></td>
                  </tr>
                      <tr>
                    <td>Calling Reason</td>
                   <td id="tdRCallingReason"></td>
                  </tr>
                      <tr style="display:none">
                    <td>Calling Remarks</td>
                   <td id="tdRCallingRemarks"></td>
                  </tr>
                  </tbody>
                </table>
                
                <div class="no-gutters">
                    <div class="col-12">
        	<div id="divPlannedCall" style="width:100%">

                 <table class="table-small  table-bordered col-md-6" id="tblTarget_PlannedCall" cellspacing="0" cellpadding="0">
                   <thead>
                        <tr>
                            <th colspan="8" class="th-td-black  text-center">For Planned Call</th>
                        </tr>
                       <tr>
                           <th rowspan="2">Particular</th>
                       <th colspan="3" style="text-align:center">Month Target</th>
                           <th colspan="3" style="text-align:center">MTD Achievement</th>
                           <th  rowspan="2" style="text-align:center">Call Target</th>
                           </tr>
                      <tr>
                        <th style="text-align:center">TAS</th>
                        <th style="text-align:center">DSE</th>
                        <th style="text-align:center">Total</th>
                          <th style="text-align:center">TAS</th>
                        <th style="text-align:center">DSE</th>
                        <th style="text-align:center">Total</th>
                      </tr>
                      </thead>
                      <tbody>
                           <tr>
                        <td style="font-weight:bold">Value</td>
                        <td style="text-align:center">0</td>
                        <td style="text-align:center">0</td>
                        <td style="text-align:center">0</td>
                               <td style="text-align:center">0</td>
                               <td style="text-align:center">0</td>
                               <td style="text-align:center">0</td>
                               <td style="text-align:center">0</td>
                      </tr>
                      <tr>
                        <td style="font-weight:bold">GP</td>
                        <td style="text-align:center">0</td>
                        <td style="text-align:center">0</td>
                        <td style="text-align:center">0</td>
                               <td style="text-align:center">0</td>
                               <td style="text-align:center">0</td>
                               <td style="text-align:center">0</td>
                               <td style="text-align:center">0</td>
                      </tr>
                      </tbody>
                </table>
                <table class="table-small  table-bordered col-md-6" id="tblTarget_OtherCall" cellspacing="0" cellpadding="0">
                   <thead>
                        <tr>
                            <th colspan="4" class="th-td-black  text-center">For Other Call</th>
                        </tr>
                       <tr>
                           <th>Particular</th>
                       <th style="text-align:center">Month Target</th>
                           <th  style="text-align:center">MTD Achievement</th>
                           <th  style="text-align:center">Call Target</th>
                           </tr>
                      </thead>
                      <tbody>
                          
                      </tbody>
                </table>
                 <table class="table-small  table-bordered col-6" id="tblTarget0" style="display:none" cellspacing="0" cellpadding="0">
                   <thead>
                      <tr>
                        <th></th>
                        <th style="text-align:center;">Month Target</th>
                        <th style="text-align:center">Call Target</th>
                      </tr>
                      </thead>
                      <tbody>
                           <tr>
                        <td style="font-weight:bold">Value</td>
                        <td style="text-align:center">0</td>
                        <td style="text-align:center">0</td>
                      </tr>
                      
                      </tbody>
                </table>
                <table class="table-small  table-bordered col-6" id="tblTarget1"  style="display:none" cellspacing="0" cellpadding="0">
                   <thead>
                      <tr>
                        <th></th>
                        <th style="text-align:center;">Total GAP</th>
                        <th style="text-align:center">Call Target</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td style="font-weight:bold">GP</td>
                        <td style="text-align:center">&nbsp;</td>
                        <td style="text-align:center">&nbsp;</td>
                      </tr>
                      </tbody>
                </table>
                 <table class="table-small  table-bordered col-6" id="tblTarget2"  style="display:none" cellspacing="0" cellpadding="0">
                   <thead>
                      <tr>
                        <th></th>
                        <th style="text-align:center">Call Target</th>
                      </tr>
                      </thead>
                      <tbody>
                          <tr>
                        <td style="font-weight:bold">Focus Brand</td>
                        <td style="text-align:center">&nbsp;</td>
                      </tr>
                      </tbody>
                </table>
                           
        </div>
                   
                          <table class="table-small  table-bordered col-5" id="tblRFocusDelivered" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr>
                    <td class="th-td-lightgreen" style="border-right-style:none">Focus Brands Delivered :</td>
                    <td class="th-td-lightgreen" style="border-left-style:none" id="tdTotFocusDelivered"></td>
                  </tr>
                </tbody>
                </table>
			 <table class="table-small  table-bordered" id="tblFocusBrand" cellspacing="0" cellpadding="0">
                    <thead>
                      <tr>
                        <th>Focus Brand</th>
                          <th style="text-align:center">Target</th>
                        <th style="text-align:center">Achvmt</th>
                        <th style="text-align:center">GAP</th>
                         <%-- <th style="text-align:center;">In Order</th>--%>
                      </tr>
                      </thead>
                      <tbody>
                      </tbody>
                </table>
                        </div>
        </div>
      </div>
        <div class="col-md-6">
            <table class="table-small striped col-3" >
                <thead>
                    <tr>
                        <th style="border-right-style:none">Wish for Birthday – </th>
                        <th id="tdRStoreDOB" style="border-left-style:none"></th>
                    </tr>
                </thead>
                </table>
            	<table class="table-small  table-bordered" id="tblStoreLastVisit" cellspacing="0" cellpadding="0">
                    <thead>
                     <tr>
                            <th colspan="4" class="th-td-black  text-center">STORE VISIT HISTORY</th>
                        </tr>
                        <tr>
                            <th>Particular</th>
                            <th>Last Ordered</th>
                            <th>Last Visit</th>
                            <th>Last  TAS Call</th>
                        </tr>
                        </thead>
                    <tbody>
                      
                      </tbody>
                </table>
                <table class="table-small  table-bordered" id="tblInvStoreOutstading" cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                        <th colspan="4" class="th-td-black text-center">STORE INVOICE HISTORY (Last 10 invoices in past 3 months)</th>
                    </tr>
                    <tr>
                        <th colspan="3">Total Outstanding amount</th>
                        <th id="tdRTotOustamt" style="padding-left:15px">0.00</th>
                    </tr>
                    <tr>
                        <th colspan="4" class="text-uppercase th-td-gray " style="font-weight:bold;text-align:center">Past Invoices</th>
                    </tr>
                    <tr class="head">
                        <th>Inv. #</th>
                        <th style="text-align:center">Date</th>
                        <th style="text-align:right">Value</th>
                        <th style="text-align:right">Outstanding Amt.</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
                
        </div>
        
    </div>
             <div class="row">
                 <div class="col-md-12">
                     <table class="table-small  table-bordered" id="tblTaskList" cellspacing="0" cellpadding="0">
                   
                </table>
        </div>
             </div>
</div>
    </div>

    <div id="divUOMDetail" style="display:none">
        <table class="table table-bordered striped" id="tblUOMDescr" style="margin-bottom:0px">
            <thead>
            <tr class="success">
                <th rowspan="2" style="padding:2px;vertical-align:middle">
                    Particulars
                </th>
                <th colspan="2" style="padding:2px;text-align:center">Quantity</th>
                </tr>
                <tr bgcolor="#eef7ea">
                <th style="width:25%;padding:2px;text-align:center" >
                    Case
                </th>
                    <th style="width:25%;padding:2px;text-align:center" >
                    PCS
                </th>
            </tr>
                </thead>
            <tbody>
                <tr>
                    <td style="padding:2px">
                        Order Qty
                    </td>
                    <td style="padding:2px"><input type="text" style="width:100%;text-align:center"  onfocus="Focus(this,'0')" onkeypress="return isNumberKeyNotDecimal(event)" onmousedown="whichButton(event)" onkeydown="return noCTRL(event)" onblur="Blur(this,'0')" onchange="fnChangePcInCase(this,2)" autocomplete="off" /></td>
                    <td style="padding:2px" ><input type="text" style="width:100%;text-align:center"  onfocus="Focus(this,'0')" onkeypress="return isNumberKeyNotDecimal(event)" onmousedown="whichButton(event)" onkeydown="return noCTRL(event)" onblur="Blur(this,'0')" onchange="fnChangePcInCase(this,1)" autocomplete="off" /></td>
                </tr>
                
                <tr>
                    <td style="padding:2px">Suggessted Qty</td>
                    <td style="padding:2px;text-align:center">0</td>
                    <td style="padding:2px;text-align:center">0</td>
                </tr>
                 <tr>
                    <td style="padding:2px">Rate</td>
                    <td style="padding:2px;text-align:center">0.00</td>
                    <td style="padding:2px;text-align:center">0.00</td>
                </tr>
                <tr>
                    <td style="padding:2px">
                        Order Value
                    </td>
                    <td colspan="2" id="tdTotUOMLineValue" style="text-align:center;font-weight:bold;padding:2px">0.00</td>
                </tr>
            </tbody>
            
        </table>
    </div>

    <div id="divAlternateContactDetail" style="display:none;padding:8px !important">
            <table>
             <tr>
                    <td style="padding:2px;font-weight:bold">
                        Contact No
                    </td>
                 <td style="padding:2px">:</td>
                    <td style="padding:2px" ><input type="text" class="form-control" id="txtAlternateContactNo" style="width:100%;text-align:center;font-size:15px;" maxlength="10"  onkeypress="return isNumberKeyNotDecimal(event)" onmousedown="whichButton(event)" onkeydown="return noCTRL(event)"  autocomplete="off" /></td>
                 <td style="padding:2px">
                        <input type="button" class="btn-sm btn-primary"  value="Save" onclick="fnUpdateAlternateNoForTeleCaller()" />
                    </td>
                </tr>
                </table>
        <table class="table table-bordered striped" id="tblAlternateContact" style="margin-bottom:0px;display:none">
            <thead>
            <tr class="success">
                <th style="padding:2px;vertical-align:middle;width:20%">
                    SrNo
                </th>
                <th  style="padding:2px;text-align:center;vertical-align:middle">ContactNo</th>
            </tr>
                </thead>
            <tbody>
                
            </tbody>
           
        </table>
    </div>

     <div id="divRemarksToDSR" style="display:none;padding:10px">
        <div id="divConnectedReason"></div>
        <div style="margin-top:10px">
            <textarea rows="6" style="width:99%" id="txtRemarksToDsr" placeholder="Remarks If Any"></textarea>
        </div>
    </div>
    <div id="dvConfirationSchemeApplied" style="display:none;padding:25px !important"></div>

    <div id="divTasksList" style="display:none;padding:10px">
    </div>

     <div id="divSchemeAchievementTemp" style="display:none;padding:10px">
    </div>

    <input type="hidden" id="hdnCase" value="0" />
    <input type="hidden" id="hdnrowIndex" value="0" />

    <input type="hidden" id="hdnLoginId" value="0" runat="server" />
    <input type="hidden" id="hdnNodeID" value="0" />
    <input type="hidden" id="hdnNodeType" value="0" />
    <input type="hidden" id="hdnOrderID" value="0" runat="server" />
    <input type="hidden" id="hdnStoreID" value="0" />
    <input type="hidden" id="hdnRoleId" value="0" runat="server" />
    <input type="hidden" id="hdnPrdId" value="" runat="server" />
    <input type="hidden" id="hdnOrderDate" value="" runat="server" />
    <input type="hidden" id="hdnCurrentDate" value="" runat="server" />
     <input type="hidden" id="hdnDlvryWeeklyOffDay" value="" runat="server" />
    
    <input type="hidden" id="hdnSalesNodeType" value="0" runat="server" />
    <input type="hidden" id="hdnSalesNodeId" value="0" runat="server" />
    <input type="hidden" id="hdnTelecallingId" value="0" runat="server" />
    <input type="hidden" id="hdnOrderStatusID" value="1" runat="server" />
    <input type="hidden" id="hdnOrdPrcsId" value="6" runat="server" />
    <input type="hidden" id="hdnflgOffline" value="1" runat="server" />
    <input type="hidden" id="hdnMenuflg" value="0" runat="server" />
    <input type="hidden" id="hdnflgOperationalLevel" value="0" runat="server" />
    <input type="hidden" id="hdnGSTType" value="2" /><%--1 For IGST 2 for CGST AND SGST--%>
    <input type="hidden" id="hdnNewStoreDetail" value="0" runat="server" />
     <input type="hidden" id="hdnTokenNo" value="0" runat="server" />
     <input type="hidden" id="hdnIsFiveStarApplicable" value="0" runat="server" />
     <input type="hidden" id="hdnflgReleasingForTesting" value="0" runat="server" />
    
</asp:Content>
