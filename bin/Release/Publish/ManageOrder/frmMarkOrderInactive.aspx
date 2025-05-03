<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" CodeFile="frmMarkOrderInactive.aspx.cs" Inherits="frmMarkOrderInactive" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">

    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <%--<link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />--%>
    <link rel="stylesheet" href="../css/bootstrap.min.css" />
    <link href="../styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../StylesTreeView/Css/jquery.dataTables.css" rel="stylesheet" />
    <%--<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet">--%>


    <script src="../scripts/jquery-3.6.0.js"></script>
    <script src="../scripts/jquery-ui.js"></script>
    <script src="../Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../StylesTreeViewOrder/js/custom-script.js" type="text/javascript"></script>
    <script src="../scripts/validation.js"></script>
    <script src="../StylesTreeView/js/jquery.dataTables.js" type="text/javascript"></script>
    <style>
        .dataTables_scrollBody{
            min-height:350px;
        }
         .ui-datepicker .ui-datepicker-title {
    margin: 0 2.3em;
    line-height: 1.8em;
    text-align: center;
    color: black;
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
            display:none;
        }
        tr.clsHighlightrowsChangeRoute td {
            background-color: #ffff79;
        }

        tr.clsHighlightrows td {
            background-color: #ffd5d5;
        }

        tr.clsHighlightrowsNoAbsent td {
            background-color: #c1ff84;
        }


        .mainpanel {
            padding: 0px !important;
            font-family: Arial Narrow;
        }

        div.dataTables_scrollBody {
            overflow-y: scroll !important;
        }

        .iframe-placeholder {
            background: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100% 100%"><text fill="%23FF0000" x="50%" y="50%" font-family="\'Lucida Grande\', sans-serif" font-size="24" text-anchor="middle">Page is being loaded , please wait..</text></svg>') 0px 0px no-repeat;
        }

        .inner-addon {
            position: relative;
        }

        .leftMenu-headding {
            width: 235px !important;
        }

        /* style glyph */
        .inner-addon .glyphicon {
            position: absolute;
            padding: 10px;
            pointer-events: none;
        }

        /* align glyph */
        .left-addon .glyphicon {
            left: 0px;
        }

        .right-addon .glyphicon {
            right: 0px;
        }

        /* add padding  */
        .left-addon input {
            padding-left: 30px;
        }

        .right-addon input {
            padding-right: 30px;
        }

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
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            padding-top: 10px;
            padding-left: 5px;
            margin-top: 0 !important;
            margin-bottom: 0 !important;
            text-shadow: 2px 2px 2px #333333;
            filter: progid:DXImageTransform.Microsoft.DropShadow(offX=2,offY=2,color=333333);
        }

        div.dataTables_scrollBody {
            overflow-x: hidden !important;
        }

        .dataTables_scroll {
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

        table.dataTable > tfoot > tr > th, table.dataTable > tfoot > tr > td {
            padding: 2px 4px 2px 4px !important;
        }

        table.dataTable > tbody > tr {
            background-color: none !important;
        }
    </style>
    <style>
        .custom-combobox {
            position: relative;
            display: inline-block;
            height: 35px;
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
            background: #fff;
            outline: none;
            width: 330px;
            height: 35px;
        }

        table.normaltbl {
            border-collapse: collapse;
            border-spacing: 0;
            border: 1px solid #dddddd;
            width: 100%;
        }

            table.normaltbl > thead > tr > th,
            table.normaltbl > tbody > tr > td {
                vertical-align: middle;
                text-align: center;
                border: 1px solid #dddddd;
            }

            table.normaltbl > thead > tr > th,
            table > thead > tr > th {
                background-color: #26a6e7;
                color: #ffffff;
            }
            .container {
                width:99%;
    padding-right: 8px !important;
    padding-left: 8px !important;
    margin-right: auto;
    margin-left: auto;
}
    </style>

    <script>
        (function ($) {
            $.widget("custom.combobox", {
                _create: function () {
                    this.wrapper = $("<span>")
                        .addClass("custom-combobox")
                        .insertAfter(this.element);

                    this.element.hide();
                    this._createAutocomplete();
                    this._createShowAllButton();
                },

                _createAutocomplete: function () {
                    var selected = this.element.children(":selected"),
                        value = selected.val() ? selected.text() : "";

                    this.input = $("<input>")
                        .appendTo(this.wrapper)
                        .val(value)
                        .attr("title", "")
                        .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
                        .autocomplete({
                            delay: 0,
                            minLength: 0,
                            source: $.proxy(this, "_source")
                        })
                        .tooltip({
                            tooltipClass: "ui-state-highlight"
                        });

                    this._on(this.input, {
                        autocompleteselect: function (event, ui) {
                            ui.item.option.selected = true;
                            this._trigger("select", event, {
                                item: ui.item.option
                            });
                            var DBNodeID = ui.item.option.value;
                            fnDBRChange(DBNodeID);
                        },

                        autocompletechange: "_removeIfInvalid"
                    });
                },

                _createShowAllButton: function () {
                    var input = this.input,
                        wasOpen = false;

                    $("<a>")
                        .attr("tabIndex", -1)
                        .attr("title", "Show All Items")
                        .tooltip()
                        .appendTo(this.wrapper)
                        .button({
                            icons: {
                                primary: "ui-icon-triangle-1-s"
                            },
                            text: false
                        })
                        .removeClass("ui-corner-all")
                        .addClass("custom-combobox-toggle ui-corner-right")
                        .mousedown(function () {
                            wasOpen = input.autocomplete("widget").is(":visible");
                        })
                        .click(function () {
                            input.focus();

                            // Close if already visible
                            if (wasOpen) {
                                return;
                            }

                            // Pass empty string as value to search for, displaying all results
                            input.autocomplete("search", "");
                        });
                },

                _source: function (request, response) {
                    var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                    response(this.element.children("option").map(function () {
                        var text = $(this).text();
                        if (this.value && (!request.term || matcher.test(text)))
                            return {
                                label: text,
                                value: text,
                                option: this
                            };
                    }));
                },

                _removeIfInvalid: function (event, ui) {

                    // Selected an item, nothing to do
                    if (ui.item) {
                        return;
                    }

                    // Search for a match (case-insensitive)
                    var value = this.input.val(),
                        valueLowerCase = value.toLowerCase(),
                        valid = false;
                    this.element.children("option").each(function () {
                        if ($(this).text().toLowerCase() === valueLowerCase) {
                            this.selected = valid = true;
                            return false;
                        }
                    });

                    // Found a match, nothing to do
                    if (valid) {
                        return;
                    }

                    // Remove invalid value
                    this.input
                        .val("")
                        .attr("title", value + " didn't match any item")
                        .tooltip("open");
                    this.element.val("");
                    this._delay(function () {
                        this.input.tooltip("close").attr("title", "");
                    }, 2500);
                    this.input.data("ui-autocomplete").term = "";
                    $("#cphRight_ddlRoute").html("<option value='0' routenodetype='0'>-------</option>");
                    $("#divdrmmain")[0].innerHTML = "";
                },

                _destroy: function () {
                    this.wrapper.remove();
                    this.element.show();
                }
            });
        })(jQuery);
    </script>
    <script>
        $.widget('custom.mcautocomplete', $.ui.autocomplete, {
            _create: function () {
                this._super();
                this.widget().menu("option", "items", "> :not(.ui-widget-header)");
            },
            _renderMenu: function (ul, items) {
                var self = this,
                    thead;
                if (this.options.showHeader) {
                    var strHTML = "";
                    var swd = 0;
                    $.each(this.options.columns, function (index, item) {
                        swd += parseInt(item.width);
                        strHTML += ('<span style="padding:0 4px;float:left;width:' + item.width + ';">' + item.name + '</span>');
                    });
                    swd += parseInt(50);
                    $(ul).css("width", swd + "px");
                    table = $('<div class="ui-widget-header" style="width:' + swd + 'px;position:fixed;margin-top:-2px"></div>');
                    table.append(strHTML);
                    table.append('<div style="clear: both;"></div>');
                    ul.append(table);
                }
                var cnt = 0;
                $.each(items, function (index, item) {
                    self._renderItem(ul, item, cnt);
                    cnt++;
                });
                $("#txtCustomer").removeClass("ui-autocomplete-loading");
            },
            _renderItem: function (ul, item, cnt) {
                var stylee = "";
                if (cnt == 0) {
                    stylee = "style='margin-top:10px'";
                }
                var t = '',
                    result = '';
                if (item.label != "No Record Found!!") {
                    $.each(this.options.columns, function (index, column) {
                        var strd = item[column.valueField ? column.valueField : index];
                        t += '<span style="padding:0 4px;float:left;width:' + column.width + ';">' + ((strd == "" || strd == null || strd == "null") ? "&nbsp;" : strd) + '</span>'
                    });
                    result = $('<li ' + stylee + '></li>')
                        .data('ui-autocomplete-item', item)
                        .append('<a class="mcacAnchor">' + t + '<div style="clear: both;"></div></a>')
                        .appendTo(ul);
                } else {
                    result = $('<li style="margin-top:15px"></li>')
                        .data('ui-autocomplete-item', item)
                        .append('<a class="mcacAnchor">' + item.label + '<div style="clear: both;"></div></a>')
                        .appendTo(ul);
                }

                return result;
            }
        });
    </script>
    <script>
        var StoreList = [];
        $(document).ready(function () {


            $('#fraLeft').load(function () {
                $("#fraLeft").contents().find("#DvMenu").find("li").removeClass("activemenu");
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='" + $("#cphRight_hdnMenuId").val() + "']").addClass("activemenu");
                $("#fraLeft")[0].height = $(window).height() - ($("#dvBanner").height() + $(".footer").height());
            });

            var d = new Date();
            $("#txtDate").val(d.localeFormat('dd-MMM-yyyy'))
            $("#txtDate").datepicker({
                maxDate: d,
                dateFormat: 'dd-M-yy',
                changeMonth: true,
                changeYear: true,
                showOn: "button",
                buttonImage: "../images/calender.jpg",
                buttonImageOnly: true,
                buttonText: "Select date",
            });

            $(document).data("BranchData", $("#cphRight_ddlBranch").clone());
            $("#cphRight_ddlBranch option").remove();
            $("#cphRight_ddlBranch").html("<option value='0-0'>------<option>");
            $("#cphRight_ddlBranch option").eq(1).remove();

            $(document).data("DSElist", $("#cphRight_ddlDSElist").clone());
            $("#cphRight_ddlDSElist option").remove();
            $("#cphRight_ddlDSElist").html("<option value='0-0-0-0'>------<option>");
            $("#cphRight_ddlDSElist option").eq(1).remove();

            if ($("#cphRight_ddlSite option").length == 1) {

                var val = $("#cphRight_ddlSite").val();
                var options = $(document).data("BranchData").clone();
                $("#cphRight_ddlBranch option").remove();
                $("#cphRight_ddlBranch").html("<option value='0-0'>------<option>");
                $(options).find("option[sitenodeid='" + val + "']").appendTo($("#cphRight_ddlBranch"));
                $("#cphRight_ddlBranch option").eq(1).remove();
                if ($("#cphRight_ddlBranch option").length == 2) {
                    $("#cphRight_ddlBranch option[value='0-0']").remove();
                    $("#cphRight_ddlBranch").change();
                }
            }

            
        });

        function detectmob() {
            var IsMobileDevice = "<%=Request.Browser.IsMobileDevice%>";
            if (IsMobileDevice != "False") {
                $("#divFilter").hide();
                $("#divHeadercont").css({
                    "position": "relative",
                    "width":"100%"
                });
                $("#divfixedHeader").css({
                    "position": "relative"
                });
                $("#divtblContain").css({
                    "padding-top": "0px"
                });
                $("#divbtn").css("width", "100%");
                $("#dvfromdt,#dvtodt,#dvsite,#dvview,#dvreason,#divbtn").removeAttr("style");

                $(".container").css({
                    "padding-left": "2px",
                    "padding-right": "2px"
                });
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

        function fnMarkAtt(sender) {
            if ($(sender).is(":checked")) {
                $(sender).closest("td").next().find("a:eq(0)").show();
                $(sender).closest("tr").removeClass("clsHighlightrowsNoAbsent");
                $(sender).attr("MarkAtt", "0");

            } else {
                $(sender).closest("tr").removeClass("clsHighlightrows");
                $(sender).closest("td").next().find("a:eq(0)").hide();
            }
            if ($("#tbldbrlist").find("input[type=checkbox]:checked").length > 0) {
                $("#anchorbtn2").find("div").html("Mark Absent");
            } else {
                $("#anchorbtn2").find("div").html("No Absent");
            }
        }
        function AddParameter(form, name, value) {
            var $input = $("<input />").attr("type", "hidden")
                .attr("name", name)
                .attr("value", value);
            form.append($input);
        }

        
        function fnShowOrderList() {
            if ($("#cphRight_ddlBranch").val() == "0-0") {
                alert("Kindly select Branch first!!");
                $("#cphRight_ddlBranch").focus();
                return false;
            }
            fnDSEList();
        }
        function fnChangeBranch(sender) {
            var val = $(sender).val();
            var options = $(document).data("DSElist").clone();
            $("#cphRight_ddlDSElist option").remove();
            $("#cphRight_ddlDSElist").html("<option value='0-0'>------<option>");
            $(options).find("option[branchnodeid='" + val + "']").appendTo($("#cphRight_ddlDSElist"));
            $("#cphRight_ddlDSElist option").eq(1).remove();

            fnDSEList();
           
        }
        function fnChangeSite(sender) {
            var val = $(sender).val();
            var options = $(document).data("BranchData").clone();
            $("#cphRight_ddlBranch option").remove();
            $("#cphRight_ddlBranch").html("<option value='0-0'>------<option>");
            $(options).find("option[sitenodeid='" + val + "']").appendTo($("#cphRight_ddlBranch"));
            $("#cphRight_ddlBranch option").eq(1).remove();
        }

        var arrRouteData = []; var arrSectorData = [];
        function fnDSEList() {
            $("input[name='srdo']").eq(0).prop("checked", true);
            var BranchVal = $("#cphRight_ddlBranch").val();
            var BranchNodeId = BranchVal.split("-")[0];
            var BranchNodeType = BranchVal.split("-")[1];

            var LoginId = $("#cphRight_hdnLoginId").val();
            var MId = $("#cphRight_hdnMenuId").val();
            var Orderdate = $("#txtDate").val();
            var DSEVal = $("#cphRight_ddlDSElist").val();
            var DSENodeId = DSEVal.split("-")[0];
            var DSENodeType = DSEVal.split("-")[1];
            $("#dvFadeForProcessing").show();
            PageMethods.fnDSEList(LoginId, BranchNodeId, BranchNodeType, DSENodeId, DSENodeType,Orderdate, function (result) {
                $("#dvFadeForProcessing").hide();
                $("#divBTNS").show();
                if (result.split("|")[0] == "2") {
                    alert("Error-" + result.split("|")[1]);
                } else if (result == "") {
                    $("#divdrmmain")[0].innerHTML = "No DSE Found!!!";
                }
                else {
                    $("#divBTNS").show();
                    $("#divdrmmain")[0].innerHTML = result.split("|")[0];
                    $("#anchorbtn2").show();
                    $("#anchorbtn2").find("div").html("Mark As Not Donwloaded");
                    if (window.matchMedia('(max-width: 767px)').matches) {
                        $("#tbldbrlist").addClass('normaltbl');
                        $("#divBTNS").css({ "position": "relative" });
                        $("#divdrmmain").addClass("table-responsive");
                        $("#divdrmmain").css("width","100%");
						$("#lnkChangepassword").hide();
						//alert("ji")
                    } else {
                        var sHeight = $(window).height() - ($("#dvBanner").height() + $("#h4header").height() + $("#tblhead").height() + $("#divBTNS").height()+80);//divBTNS
                        $("#tbldbrlist").DataTable({
                            //scrollY: "58vh", 
                            scrollY: sHeight + 'px',
                            scrollX: false,
                            scrollCollapse: true,
                            paging: false,
                            "ordering": false,
                            "info": false,
                            "bFilter": false,
                            "bSorting": false,
                            "searching": false,
                        });
                    }

                }
            },
                function (result) {
                    $("#dvFadeForProcessing").hide();
                    alert("Error-" + result._message);
                }
            )


        }
        
       

        function fnSaveFinalData() {
            if ($("#tbldbrlist").length == 0) {
                alert("Sorry,No data available for this action!!!")
                return false;
            }

            if ($("#tbldbrlist").find("input[type=checkbox]").length == 0) {
                alert("Sorry,No data available for this action!!!")
                return false;
            }
            var IsSubmitType = 1;
            if ($("#tbldbrlist").find("input[type=checkbox]").length > 0) {
                var tbl = $("#tbldbrlist").find("input[type=checkbox]:checked");
                if (tbl.length == 0) {
                    alert("Kindly Select atleast one Order for this Action!!!")
                    return false;
                }
                //$("#dvDialog")[0].innerHTML = "<div style='font-size:9.5pt;'>Are you sure to mark below action?</div><div style='font-size:9pt;margin-top:10px'><label style='margin-right:10px'><input type='radio' name='rdo1' value='2' > Cancel Order</label><label><input type='radio' name='rdo1' value='0' checked > Not Download Order</label></div>"
                $("#dvDialog")[0].innerHTML = "<div style='font-size:9.5pt;'>Are you sure to take this action for selected order?</div>";//<div style='font-size:9pt;margin-top:10px'><label style='margin-right:10px'><input type='radio' name='rdo1' value='2' > Cancel Order</label><label><input type='radio' name='rdo1' value='0' checked > Not Download Order</label></div>"
            }

            $("#dvDialog").dialog({
                modal: true,
                title: "Confirmation:",
                buttons: {
                    "Yes": function () {
                        $(this).dialog('close');
                        var arrDSENodeID = new Array();
                            for (var i = 0; i < tbl.length; i++) {
                                var OrderId = tbl.eq(i).closest("tr").attr("OrderId");
                                arrDSENodeID.push({ OrderId: OrderId});
                            }
                            if (arrDSENodeID.length == 0) {
                                alert("Kindly select atleast one Order!")
                                return false;
                            }
                            var statusid = $("input[name='srdo']:checked").val();
                            var IsSubmitType = 2
                            if(statusid==2){
                                IsSubmitType = 0;
                            } else if (statusid == 0) {
                                IsSubmitType = 2;
                            }
                           
                        var LoginId = $("#cphRight_hdnLoginId").val();
                        $("#dvFadeForProcessing").show();
                        PageMethods.fnSubmitDSEAttendance(LoginId, arrDSENodeID,IsSubmitType, function (result) {
                            $("#dvFadeForProcessing").hide();
                            if (result.split("|")[0] == "2") {
                                alert("Some Technical Error,Please contact to Technical Team Or Try again later!!")
                            } else {
                                fnDSEList();

                            }
                        },
                            function (result) {
                                $("#dvFadeForProcessing").hide();
                                alert(result._message)
                            }
                        )
                    },
                    "No": function () {
                        $(this).dialog('close');
                    }
                }
            });

        }

        function fnShowConcernData(sender) {
            var statusid = $(sender).val();

            $("#tbldbrlist tbody tr").hide();
            $("#tbldbrlist tbody tr[statusid='" + statusid + "']").show();
            $("#anchorbtn2").show();
            $("#chkAll").prop("checked", false);
            if (statusid == 0) {
                $("#anchorbtn2").find("div").html("Mark As Not Donwloaded");
            }else if (statusid ==2) {
                $("#anchorbtn2").find("div").html("Mark As Donwloadable");
            } else {
                $("#anchorbtn2").hide();
                $("#anchorbtn2").find("div").html("Mark As Not Donwloaded");
            }
        }

        function fnSelectAll(sender) {
            var statusid = $("input[name='srdo']:checked").val();
            if ($(sender).is(":checked")){
                $("#tbldbrlist tbody input[type='checkbox']").prop("checked", false);
                $("#tbldbrlist tbody tr[statusid='" + statusid + "']").find("input[type='checkbox']").prop("checked", true);
            } else {
                $("#tbldbrlist tbody input[type='checkbox']").prop("checked", false);
                $("#tbldbrlist tbody tr[statusid='" + statusid + "']").find("input[type='checkbox']").prop("checked", false);
            }
           
        }
    </script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphLeft" runat="Server">

    <iframe id="fraLeft" name="fraLeft" height="100%" width="100%" scrolling="yes" frameborder="0"
        src='../frmLeftMainTreeView.aspx'></iframe>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphRight" runat="Server">
    <div id="dvFadeForProcessing" align="center" class="clsloader">
            <img src="../NewImages/ajax-loader.gif" style="margin-top: 300px;" />
        </div>

    <h4 id="h4header">>>Mark Order Inactive</h4>

    <div  style="margin-top:10px;width:100%">
        <table id="tblhead" cellpadding="3" >

            <tr>
            <td>
                        <b>Order Date : </b>
                    </td>
                    <td style="width: 95px">
                        <input type="text" id="txtDate" style="width: 78px" readonly /></td>
 <td style="width:65px;padding-left:5px;"><b>Site List :</b></td>

                <td style="width:205px">
                    <asp:DropDownList runat="server" ID="ddlSite" onchange="fnChangeSite(this)" CssClass="form-control"  style="border:1px solid #bbbbbb;width:200px" >
                    </asp:DropDownList></td>
                <td> <b id="lblType" runat="server">Branch List:</b> </td>
                <td style="padding-left:10px;padding-right:10px">
                    <asp:DropDownList runat="server" ID="ddlBranch" onchange="fnChangeBranch(this)" CssClass="form-control"  style="border:1px solid #bbbbbb;width:100%" >
                    </asp:DropDownList></td>

                  <td><b>DSE List:</b> </td>
                <td style="padding-left:10px;padding-right:10px">
                    <asp:DropDownList runat="server" ID="ddlDSElist" onchange="fnDSEList(this)" CssClass="form-control"  style="border:1px solid #bbbbbb;width:230px" >
                    </asp:DropDownList></td>
                <td style="padding-left:20px;">
                    <input type="button" value="Show Order List" class="btn btn-primary" onclick="fnShowOrderList()" id="btnRefershStatus" />
                </td>
            </tr>
        </table>
    </div>
    <div style="margin: 5px; ">
        <label><input value="0" type="radio" name="srdo" onclick="fnShowConcernData(this)" checked /> Not Downloaded</label>
        <label style="margin-left:5px;margin-right:5px;"><input value="1" type="radio" name="srdo" onclick="fnShowConcernData(this)"  /> Downloaded</label>
        <label><input value="2" type="radio" name="srdo" onclick="fnShowConcernData(this)" /> Cancelled</label>
    </div>
    <div id="divdrmmain" style="margin-top: 5px; border: 1px solid #ccc;">
    </div>

    <div class="blockButtons" id="divBTNS" style="display: none;bottom: 0; position: fixed; padding-top: 1px; background-color: #cfcfcf; overflow-x: auto;">
        <table style="min-width: 405px;">
            <tr>
                <td>
                    <a href="###" class="icon-bnt" onclick="fnSaveFinalData()" id="anchorbtn2" style="width:170px"><span class="PostOrder"></span>
                        <div style="font-size: 7.8pt;line-height: 28px;padding-right:3px">Mark As Not Download</div>
                    </a>
                </td>
                
            </tr>
        </table>
    </div>
    <div id="dvDialog" style="display: none"></div>
    <div id="dvDialogMarkPresent" style="display: none"></div>
    <asp:HiddenField runat="server" ID="hdnLoginId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnMenuId" Value="0" />

</asp:Content>

