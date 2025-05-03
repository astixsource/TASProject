<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" CodeFile="frmMarkAbsentBasedOnCCR.aspx.cs" Inherits="frmMarkAbsentBasedOnCCR" %>

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
                    fnDSEList();
                }
            }

            $('#txtFindDbr').keyup(function () {
                var val = $(this).val().toUpperCase();
                $("#tbldbrlist").find("tbody").eq(0).find("tr").css("display", "none");

                var tbl = $("#tbldbrlist>tbody>tr");
                var tr;
                for (var i = 0; i < tbl.length; i++) {
                    tr = $(tbl[i]);
                    for (var j = 0; j < $(tr).find("td").length; j++) {
                        if ($(tr).find("td").eq(j).attr("Searchable") == "1") {
                            var tdText = $(tr).find("td").eq(j).html().toUpperCase();
                            if (tdText.indexOf(val) > -1) {
                                $(tr).css("display", "table-row");
                            }
                        }
                    }
                }
            });
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

        function fnEditOrder(sender) {
            var StoreId = $(sender).closest("tr").attr("storeid");
            var TeleCallingId = $(sender).closest("tr").attr("TeleCallingId");
            var StoreName = $(sender).closest("tr").find("a").eq(1).html();
            var gstno = "";
            gstno = gstno == "" ? 2 : gstno;
            var LastCallDate = "";
            var LastOrderDate = "";
            var RouteId = $("#cphRight_ddlRoute").val();
            var flgDefault = $("#cphRight_ddlRoute option:selected").attr("flgDefault");
            var flgOnRoute = flgDefault;// $("#cphRight_ddlRoute option:selected").attr("flgOnRoute");
            var SalesNodeId = $(sender).closest("tr").attr("BranchNodeId");
            var SalesNodeType = $(sender).closest("tr").attr("BranchNodeType");
            var Branch = $(sender).closest("tr").find("td").eq(1).html();
            var strStoreName = StoreId + "^" + StoreName.replace("&", "") + "^1^" + gstno + "^" + LastCallDate + "^" + LastOrderDate + "^" + RouteId + "^" + flgDefault + "^" + flgOnRoute + "^" + SalesNodeId + "^" + SalesNodeType + "^" + TeleCallingId + "^" + Branch;
            fnShowOrderBookingForm(strStoreName);
        }
        function fnClosedvOrderPop() {
            try {
                $("#InvReportDialog").dialog('close');
                //$("#IframeInvRpt")[0].src = "about:blank";
                //$("#InvReportDialog").dialog('destroy');
            } catch (err) { }
        }
        function fnRemoveClass() {
            $("#IframeInvRpt").removeClass("iframe-placeholder");
        }
        var flgValidUpdate = 0;
        function fnShowOrderBookingForm(strStoreName) {
            $("#IframeInvRpt").addClass("iframe-placeholder");
            $("#IframeInvRpt")[0].src = "about:blank";
            $("#InvReportDialog").dialog({
                modal: true,
                title: "Telecaller Order booking Form : " + $("#cphRight_ddlDistribor option:selected").text(),
                width: $(document).width(),
                height: $(document).height(),
                close: function (event, ui) {
                    $("#IframeInvRpt").removeClass("iframe-placeholder");
                    // Clear the URL so Chrome/Firefox don't refresh the iframe when it's hidden.
                    $("#IframeInvRpt").prop("src", "about:blank");
                },
                open: function (event, ui) {
                    $("#IframeInvRpt").prop("src", "frmOrderPunching_Telecaller.aspx?flgOffline=7&strNewStoreDetailTelecaller=" + strStoreName);
                }
            });
        }

        function fnUpdateLastCallOrderDate(StoreId, LastCallDate, LastOrderDate, Status) {
            $("#tbldbrlist").find("tbody").find("tr[storeid=" + StoreId + "]").find("td").eq(6).html(Status);
            $("#tbldbrlist").find("tbody").find("tr[storeid=" + StoreId + "]").find("td").eq(9).html(LastCallDate);

        }
        function fnRefreshStatus() {

            fnDSEList();
        }
        function fnChangeBranch(sender) {
            //if ($(sender).val() != "0") {
            fnDSEList();
            //}
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
            var BranchVal = $("#cphRight_ddlBranch").val();
            var BranchNodeId = BranchVal.split("-")[0];
            var BranchNodeType = BranchVal.split("-")[1];

            var LoginId = $("#cphRight_hdnLoginId").val();
            var MId = $("#cphRight_hdnMenuId").val();
            $("#dvFadeForProcessing").show();
            PageMethods.fnDSEList(LoginId, BranchNodeId, BranchNodeType, function (result) {
                $("#dvFadeForProcessing").hide();
                //$("#divBTNS").find("a").hide();
                if (result.split("|")[0] == "2") {
                    alert("Error-" + result.split("|")[1]);
                } else if (result.split("|")[0] == "") {
                    $("#divdrmmain")[0].innerHTML = "No DSE Found!!!";
                }
                else {
                    $("#divBTNS").show();
                    $("#divdrmmain")[0].innerHTML = result.split("|")[0];
                    if (result.split("|")[1] == "1") {
                        $("#tdStatus").html("<b> Last refreshed time :</b>" + result.split("|")[2]);
                    }

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



                    if ($("#tbldbrlist").find("input[type=checkbox]:checked").length > 0) {
                        $("#anchorbtn2").find("div").html("Mark Absent");
                    } else {
                        $("#anchorbtn2").find("div").html("No Absent");
                    }
                }
            },
                function (result) {
                    $("#dvFadeForProcessing").hide();
                    alert("Error-" + result._message);
                }
            )


        }
        function fnDBRChange(DBNodeID) {
            $("#divdrmmain")[0].innerHTML = "";
            if (DBNodeID == "0") {
                $("#cphRight_ddlRoute").html("<option value='0' routenodetype='0'>-------</option>");
                $("#divdrmmain")[0].innerHTML = "";
                return false;
            }
            //alert($("#cphRight_ddlDistribor option:selected").va())
            var LoginId = $("#cphRight_hdnLoginId").val();
            $("#dvFadeForProcessing").show();
            PageMethods.fnBindRouteList(DBNodeID, LoginId, function (result) {
                $("#dvFadeForProcessing").hide();
                if (result == "2") {
                    alert("Some Technical Error,Please contact to Technical Team Or Try again later!!")
                } else {
                    $("#cphRight_ddlRoute").html(result);
                }
            },
                function (result) {
                    $("#dvFadeForProcessing").hide();
                    alert(result._message)
                }
            )
        }

        function fnSHowData(sender) {
            var DSENodeId = $(sender).closest("tr").attr("DSENodeId");
            var DSENodeType = $(sender).closest("tr").attr("DSENodeType");

            $("#dvDialog")[0].innerHTML = "<br/><img src='../images/loader.gif'/>"
            $("#dvDialog").dialog({
                title: "Channel Details",
                width: "900",
                height: "550",
                modal: true,
                close: function () {
                    $("#dvDialog").dialog('destroy');
                },
                buttons: {
                    "OK": function () {
                        $(this).dialog('close');
                    }
                },
                open: function () {
                    PageMethods.fnDSEChannelList(DSENodeId, DSENodeType, function (result) {
                        $("#dvFadeForProcessing").hide();
                        if (result.split("|")[0] == "2") {
                            $("#dvDialog")[0].innerHTML=("Error-" + result.split("|")[1]);
                        } else if (result == "") {
                            $("#dvDialog")[0].innerHTML = "No DSE Found!!!";
                        }
                        else {
                            $("#dvDialog")[0].innerHTML = result.split("|")[1];
                        }
                    },
                        function (result) {
                            $("#dvFadeForProcessing").hide();
                            $("#dvDialog")[0].innerHTML =("Error-" + result._message);
                        }
                    )
                  
                }

            })


        }
        function fnSaveNoAbsent() {
            if ($("#tbldbrlist").length == 0) {
                alert("Sorry,No data available for this action!!!")
                return false;
            }
            $("#dvDialog")[0].innerHTML = "Are you sure to mark as no absent for these DSE?"
            $("#dvDialog").dialog({
                modal: true,
                title: "Confirmation:",
                buttons: {
                    "Yes": function () {
                        $(this).dialog('close');
                        var personIds = "";
                        var arrDSENodeID = new Array();

                        var BranchNodeId = $("#tbldbrlist").attr("BranchNodeId");
                        var BranchNodeType = $("#tbldbrlist").attr("BranchNodeType");
                        var LoginId = $("#cphRight_hdnLoginId").val();
                        $("#dvFadeForProcessing").show();
                        PageMethods.fnSubmitDSEAttendance(LoginId, arrDSENodeID, BranchNodeId, BranchNodeType, 2, function (result) {
                            $("#dvFadeForProcessing").hide();
                            if (result.split("|")[0] == "2") {
                                alert("Some Technical Error,Please contact to Technical Team Or Try again later!!")
                            } else {
                                $("#tbldbrlist").find("input[type=checkbox]").prop("disabled", true);
                                $("#tbldbrlist").find("input[type=checkbox]").closest("tr").addClass("clsHighlightrowsNoAbsent");
                                $("#tbldbrlist").find("input[type=checkbox]").attr("MarkAtt", "1");
                                $("#tbldbrlist").find("input[type=checkbox]").closest("tr").find("a").hide();
                                alert("Marked as no absent successfully!!");
                                $("#divBTNS").find("a").hide();
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


        function fnMarkPresent(sender) {
            if ($("#tbldbrlist").length == 0) {
                alert("Sorry,No data available for this action!!!")
                return false;
            }
            var istcuser = $(sender).closest("tr").attr("TCUserId")

            if (istcuser == 0) {
                $("#dvDialogMarkPresent")[0].innerHTML = "Are you sure to mark as no absent for this selected DSE?"
            }
            else {
                $("#dvDialogMarkPresent")[0].innerHTML = "Telecaller is already mapped with this DSE, Are you still want to mark as no absent for this selected DSE?"
            }
            //debugger;


            var IsSubmitType = 2;


            $("#dvDialogMarkPresent").dialog({
                modal: true,
                title: "Confirmation:",
                buttons: {
                    "Yes": function () {
                        $(this).dialog('close');
                        var personIds = "";
                        var arrDSENodeID = new Array();
                        if (IsSubmitType == 2) {

                            var DSENodeId = $(sender).closest("tr").attr("DSENodeId");
                            var DSENodeType = $(sender).closest("tr").attr("DSENodeType");
                            var OldSectorId = $(sender).closest("tr").attr("OldSectorId");
                            var SectorId = $(sender).closest("tr").attr("SectorId");
                            var RouteNodeType = $(sender).closest("tr").attr("RouteNodeType");
                            var RouteNodeId = $(sender).closest("tr").attr("RouteNodeId");
                            var OldRouteNodeId = $(sender).closest("tr").attr("OldRouteNodeId");
                            var flgRouteSectorChange = $(sender).closest("tr").attr("flgRouteSectorChange");
                            var flgChangeRouteSector = 0;
                            if (parseInt(SectorId) != parseInt(OldSectorId) || parseInt(RouteNodeId) != parseInt(OldRouteNodeId)) {
                                flgChangeRouteSector = 1;
                            } else {
                                flgChangeRouteSector = flgChangeRouteSector;
                            }
                            flgAbsent = 0;
                            arrDSENodeID.push({ DSENodeID: DSENodeId, DSENodeType: DSENodeType, RouteNodeId: RouteNodeId, RouteNodeType: RouteNodeType, SectorId: SectorId, flgAbsent: flgAbsent, flgChangeRouteSector: flgChangeRouteSector });

                        }
                        //alert('hi1');
                        var BranchNodeId = $("#tbldbrlist").attr("BranchNodeId");
                        var BranchNodeType = $("#tbldbrlist").attr("BranchNodeType");
                        var LoginId = $("#cphRight_hdnLoginId").val();
                        $("#dvFadeForProcessing").show();
                        PageMethods.fnSubmitDSEAttendance(LoginId, arrDSENodeID, BranchNodeId, BranchNodeType, IsSubmitType, function (result) {
                            $("#dvFadeForProcessing").hide();
                            if (result.split("|")[0] == "2") {
                                alert("Some Technical Error,Please contact to Technical Team Or Try again later!!")
                            } else {
                                if (IsSubmitType == 2) {
                                    $(sender).closest("tr").find("input[type=checkbox]:checked").prop("disabled", false);
                                    //$(sender).closest("tr").addClass("clsHighlightrowsNoAbsent");
                                    $(sender).closest("tr").removeClass("clsHighlightrows");
                                    $(sender).closest("tr").find("input[type=checkbox]").attr("MarkAtt", "0");
                                    $(sender).closest("tr").attr("MarkAtt", "0");
                                    $(sender).closest("tr").find("a:eq(0)").hide();
                                    $(sender).closest("tr").find("a:eq(1)").hide();
                                    $(sender).closest("tr").find("input[type=checkbox]").prop("checked", false);
                                    alert("Marked as no absent successfully!!");
                                    //$("#divBTNS").find("a").hide();

                                    if ($("#tbldbrlist").find("input[type=checkbox]:checked").length > 0) {
                                        $("#anchorbtn2").find("div").html("Mark Absent");
                                    } else {
                                        $("#anchorbtn2").find("div").html("No Absent");
                                    }
                                }

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

        function fnSaveFinalData() {
            if ($("#tbldbrlist").length == 0) {
                alert("Sorry,No data available for this action!!!")
                return false;
            }


            var IsSubmitType = 1;
            if ($("#tbldbrlist").find("input[type=checkbox]:checked").length > 0) {
                var tbl = $("#tbldbrlist").find("input[type=checkbox][MarkAtt=0]:checked");
                if (tbl.length == 0) {
                    alert("Kindly Select atleast one DSE for this Action!!!")
                    return false;
                }
                $("#dvDialog")[0].innerHTML = "Are you sure to mark as absent for these selected DSE?"
            } else {
                IsSubmitType = 2;
                $("#dvDialog")[0].innerHTML = "Are you sure to mark as no absent for this branch?"
            }

            $("#dvDialog").dialog({
                modal: true,
                title: "Confirmation:",
                buttons: {
                    "Yes": function () {
                        $(this).dialog('close');
                        var personIds = "";
                        var arrDSENodeID = new Array();
                        if (IsSubmitType == 1) {
                            for (var i = 0; i < tbl.length; i++) {
                                var DSENodeId = tbl.eq(i).closest("tr").attr("DSENodeId");
                                var DSENodeType = tbl.eq(i).closest("tr").attr("DSENodeType");
                                var OldSectorId = tbl.eq(i).closest("tr").attr("OldSectorId");
                                var SectorId = tbl.eq(i).closest("tr").attr("SectorId");
                                var RouteNodeType = tbl.eq(i).closest("tr").attr("RouteNodeType");
                                var RouteNodeId = tbl.eq(i).closest("tr").attr("RouteNodeId");
                                var OldRouteNodeId = tbl.eq(i).closest("tr").attr("OldRouteNodeId");
                                var flgChangeRouteSector = 0;
                                if (parseInt(SectorId) != parseInt(OldSectorId) || parseInt(RouteNodeId) != parseInt(OldRouteNodeId)) {
                                    flgChangeRouteSector = 1;
                                }
                                flgAbsent = tbl.eq(i).is(":checked") ? 1 : 0;
                                arrDSENodeID.push({ DSENodeID: DSENodeId, DSENodeType: DSENodeType, RouteNodeId: RouteNodeId, RouteNodeType: RouteNodeType, SectorId: SectorId, flgAbsent: flgAbsent, flgChangeRouteSector: flgChangeRouteSector });
                            }
                        }
                        var BranchNodeId = $("#tbldbrlist").attr("BranchNodeId");
                        var BranchNodeType = $("#tbldbrlist").attr("BranchNodeType");
                        var LoginId = $("#cphRight_hdnLoginId").val();
                        $("#dvFadeForProcessing").show();
                        PageMethods.fnSubmitDSEAttendance(LoginId, arrDSENodeID, BranchNodeId, BranchNodeType, IsSubmitType, function (result) {
                            $("#dvFadeForProcessing").hide();
                            if (result.split("|")[0] == "2") {
                                alert("Some Technical Error,Please contact to Technical Team Or Try again later!!")
                            } else {
                                if (IsSubmitType == 1) {
                                   // $("#tdStatus").html("<b>Attendance Status : </b> Marked As Absent");
                                    var $checked = $("#tbldbrlist").find("input[type=checkbox]:checked");
                                    $("#tbldbrlist").find("input[type=checkbox]:checked").prop("disabled", true);
                                    $("#tbldbrlist").find("input[type=checkbox]:checked").closest("tr").addClass("clsHighlightrows");
                                    $("#tbldbrlist").find("input[type=checkbox]:checked").attr("MarkAtt", "1");
                                    //$("#tbldbrlist").find("input[type=checkbox]:checked").closest("tr").find("a").hide();
                                    $("#tbldbrlist").find("input[type=checkbox]:checked").closest("tr").find("a:eq(0)").hide();
                                    $("#tbldbrlist").find("input[type=checkbox]:checked").closest("tr").find("a:eq(1)").show();

                                    alert("Absent Marked Successfully!!");
                                    var totAbsentee = $("#tbldbrlist").find("input[type=checkbox]").length;
                                    var totAbsenteeMarked = $("#tbldbrlist").find("input[type=checkbox]:checked").length;
                                } else {
                                    //$("#tdStatus").html("<b>Attendance Status : </b> Marked As No Absent");
                                    //$("#tbldbrlist").find("input[type=checkbox]").prop("disabled", true);
                                    $("#tbldbrlist").find("input[type=checkbox]").closest("tr").addClass("clsHighlightrowsNoAbsent");
                                    $("#tbldbrlist").find("input[type=checkbox]").attr("MarkAtt", "0");
                                    //$("#tbldbrlist").find("input[type=checkbox]").closest("tr").find("a").hide();
                                    $("#tbldbrlist").find("input[type=checkbox]").closest("tr").find("a:eq(0)").hide();
                                    alert("Marked as no absent successfully!!");
                                    // $("#divBTNS").find("a").hide();
                                }

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

    <h4 id="h4header">>>Mark DSE Absent Based On CCR</h4>

    <div class="form-inline" id="tblhead" style="margin-top: 10px;">
        <div class="form-group">
            <label for="">Site List :</label>
            <asp:DropDownList runat="server" ID="ddlSite" onchange="fnChangeSite(this)" CssClass="form-control"></asp:DropDownList>
        </div>
        <div class="form-group">
            <label for="" runat="server" id="lblType">Branch List :</label>
            <asp:DropDownList runat="server" ID="ddlBranch" onchange="fnChangeBranch(this)" CssClass="form-control"></asp:DropDownList>
        </div>
        <div class="input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>
            <input type="text" class="form-control"  placeholder="Search" name="search" id="txtFindDbr">
        </div>
        <div class="input-group">
            <div class="pull-left" style="padding-right:5px" id="tdStatus">
            </div>
           
        </div>
    </div>

    <div id="divdrmmain" style="margin-top: 5px; border: 1px solid #ccc; width:1000px">
    </div>

    <div class="blockButtons" id="divBTNS" style="display: none; bottom: 0; position: fixed; padding-top: 1px; background-color: #cfcfcf; overflow-x: auto;">
        <table style="min-width: 405px;">
            <tr>
                <td>
                    <a href="###" class="icon-bnt" onclick="fnSaveFinalData()" id="anchorbtn2"><span class="PostOrder"></span>
                        <div style="font-size: 7.8pt; width: 100px; line-height: 28px">Mark Absent</div>
                    </a>
                </td>
                <%--<td style="padding-right: 5px"><b>Legends: </b></td>
                <td style="width: 30px; background-color: #ffd5d5"></td>
                <td style="padding-left: 5px; padding-right: 20px">Marked Absent</td>

                <td style="width: 30px; background-color: #c1ff84"></td>
                <td style="padding-left: 5px; padding-right: 20px">No Absent</td>

                <td style="width: 30px; background-color: #ffff79"></td>
                <td style="padding-left: 5px; padding-right: 20px">Changed Sector / Route</td>--%>
            </tr>
        </table>
    </div>
    <div id="dvDialog" style="display: none"></div>
    <div id="dvDialogMarkPresent" style="display: none"></div>
    <asp:HiddenField runat="server" ID="hdnLoginId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnMenuId" Value="0" />

</asp:Content>

