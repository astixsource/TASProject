<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" CodeFile="frmGetTASListForDSEMappingForPlannedCalls.aspx.cs" Inherits="frmGetTASListForDSEMappingForPlannedCalls" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link rel="stylesheet" href="../css/bootstrap.min.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="../scripts/jquery-3.6.0.js"></script>
    <link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />
    <script src="../scripts/jquery-ui.js"></script>
    <link href="../styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/Multiselect/jquery.multiselect.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/Multiselect/jquery.multiselect.filter.css" rel="stylesheet" />
    <script src="../Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery.multiselectLatest.js" type="text/javascript"></script>
    <script src="../scripts/Multiselect/jquery.multiselect.filter.js" type="text/javascript"></script>
    <script src="../StylesTreeViewOrder/js/custom-script.js" type="text/javascript"></script>
    <script src="../scripts/validation.js"></script>
    <script src="../StylesTreeView/js/jquery.dataTables.js" type="text/javascript"></script>
    <link href="../StylesTreeView/Css/jquery.dataTables.css" rel="stylesheet" />
    <%--<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet">--%>
    <style>
        tr.clsHighlightrowsChangeRoute td {
            background-color: #ffff79;
        }

        tr.clsHighlightrows td {
            background-color: #ffd5d5;
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

        .leftMenu-headding {
            width: 235px !important;
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

        .ui-multiselect span.ui-icon {
            float: right;
            background-color: #F1F1F1;
            border: none !important;
            margin-top: -0.3px !important;
            margin-right: 1.3px !important;
            background-color: #ffffff;
        }

        button.ui-multiselect {
            width: 100% !important;
            height: 25px !important;
        }

        .ui-multiselect-menu, .ui-multiselect-single {
            width: auto !important;
        }

        .ui-multiselect-filter {
            float: none !important;
        }

            .ui-multiselect-filter input {
                color: black;
                height: 20px;
            }

        .ui-multiselect-checkboxes label input {
            margin-right: 10px;
        }
        td.clscellerrorhightlight {
            background-color:#ffd5d5;
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
        var StoreList = []; var cntcounter = 0;
        $(document).ready(function () {
            $('#fraLeft').load(function () {
                $("#fraLeft").contents().find("#DvMenu").find("li").removeClass("activemenu");
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='60']").addClass("activemenu");
                $("#fraLeft")[0].height = $(window).height() - ($("#dvBanner").height() + $(".footer").height());
            });
            $("#dvFadeForProcessing").show();
           

            $("#cphRight_ddlBranch").multiselect({
                header: true,
                showcheckall: true,
                multiple: true,
                noneSelectedText: '------',
            }).multiselectfilter();
            $("#cphRight_ddlBranch").closest("td").find("button").css("width", $("#cphRight_ddlBranch").closest("td").width());
            $("#cphRight_ddlBranch").closest("td").find("button").find("span[flgspan=1]").css("width", ($("#cphRight_ddlBranch").closest("td").find("button").width() - 20) + "px");
            $("#cphRight_ddlBranch").closest("td").find("button").find("span[flgspan=1]").css("white-space", "nowrap");
            cntcounter = 0;
            fnGetDSEListForTasMap();
            fnTelecallerList();
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

        function fnMarkAtt(sender) {
            //if ($(sender).is(":checked")) {
            //    $(sender).closest("td").next().find("a").show();
            //} else {
            //    $(sender).closest("td").next().find("a").hide();
            //}
        }
        function AddParameter(form, name, value) {
            var $input = $("<input />").attr("type", "hidden")
                .attr("name", name)
                .attr("value", value);
            form.append($input);
        }


        var flgValidUpdate = 0;

        function fnRefreshStatus() {

            fnTelecallerList();
        }
        function fnChangeMonth(sender) {
            //if ($(sender).val() != "0") {
            fnTelecallerList();
            //}
        }

        var arrDSEData = []; var arrSectorData = [];
        function fnGetDSEListForTasMap() {
            
            var LoginId = $("#cphRight_hdnLoginId").val();
            $("#dvFadeForProcessing").show();
            PageMethods.fnGetDSEListForTasMap(LoginId, function (result) {
                cntcounter += 1;
                if (cntcounter == 2) {
                    $("#dvFadeForProcessing").hide();
                }
                arrDSEData = $.parseJSON('[' + result + ']');
            },
                function (result) {
                    $("#dvFadeForProcessing").hide();
                    alert("Error-" + result._message);
                }
            )
        }

        var arrRouteData = []; var arrSectorData = [];
        function fnTelecallerList() {
            var LoginId = $("#cphRight_hdnLoginId").val();
            var Rptmonthyear = $("#cphRight_ddlYearMonth").val();
           
            PageMethods.fnTelecallerList(LoginId, Rptmonthyear, function (result) {
                cntcounter += 1;
                if (cntcounter == 2) {
                    $("#dvFadeForProcessing").hide();
                }
                $("#divBTNS").hide();
                if (result.split("|")[0] == "2") {
                    alert("Error-" + result.split("|")[1]);
                } else if (result == "") {
                    $("#divdrmmain")[0].innerHTML = "No Telecaller Found!!!";
                }
                else {
                    $("#divBTNS").show();
                    $("#divdrmmain")[0].innerHTML = result.split("|")[0];
                }
            },
                function (result) {
                    $("#dvFadeForProcessing").hide();
                    alert("Error-" + result._message);
                }
            )
        }


        function fnDeleteMapping(sender) {

            $("#dvDialogMarkPresent")[0].innerHTML = "Are you sure to delete mapping?"

            $("#dvDialogMarkPresent").dialog({
                modal: true,
                title: "Confirmation:",
                buttons: {
                    "Yes": function () {
                        $(this).dialog('close');
                        var personIds = "";
                        var TSVNodeId = $(sender).closest("tr").attr("nodeid");
                        var TSVNodeType = $(sender).closest("tr").attr("nodetype");
                        var Rptmonthyear = $("#cphRight_ddlYearMonth").val();
                        var LoginId = $("#cphRight_hdnLoginId").val();
                        $("#dvFadeForProcessing").show();
                        PageMethods.fnDeleteTASDSEMapForPlannedCalls(LoginId, TSVNodeId, TSVNodeType, Rptmonthyear, function (result) {
                            $("#dvFadeForProcessing").hide();
                            if (result.split("|")[0] == "2") {
                                alert("Error:" + result.split("|")[1])
                            } else {
                                $(sender).closest("tr").find("td.clsdseblock").attr("dsestr", "");
                                $(sender).closest("tr").find("td.clsdseblock").attr("strBranchIDs", "");
                                $(sender).closest("tr").find("td.clsdseblock").html("");
                                $(sender).closest("tr").find("td.clsactioncell").html("<a href='###' onclick='fnSHowDSEMapping(this,1)' class='btn btn-primary btn-sm' style='padding:2px 5px;margin-right:5px'  title='Click To Add'>Add Mapping</a>");
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
            var tbl = $("#tbldbrlist tbody tr.clstrmain");
            if (tbl.length == 0) {
                alert("No Data Found For This Action!");
                return false;
            }
            $("#dvDialog")[0].innerHTML = "Are you sure to submit?"
            $("#dvDialog").dialog({
                modal: true,
                title: "Confirmation:",
                buttons: {
                    "Yes": function () {
                        $(this).dialog('close');
                        var personIds = "";
                        var arrDSENodeID = new Array();
                        for (var i = 0; i < tbl.length; i++) {
                            flgAbsent = 1;
                            var TCNodeId = $(tbl[i]).attr("NodeId");
                            var TCNodeType = $(tbl[i]).attr("NodeType");
                            var dsestr = $(tbl[i]).find("td.clsdseblock").attr("dsestr");
                            dsestr = dsestr == undefined || dsestr == "0^0" ? "" : dsestr;
                            arrDSENodeID.push({ TCNodeId: TCNodeId, TCNodeType: TCNodeType, DSEIds: dsestr });
                        }
                        var Rptmonthyear = $("#cphRight_ddlYearMonth").val();
                        var LoginId = $("#cphRight_hdnLoginId").val();
                        $("#dvFadeForProcessing").show();
                        PageMethods.fnSubmitTeleCallerAttendance(LoginId, arrDSENodeID, Rptmonthyear, function (result) {
                            $("#dvFadeForProcessing").hide();
                            if (result.split("|")[0] == "2") {
                                alert("Some Technical Error,Please contact to Technical Team Or Try again later!!")
                            } else {
                                $("#divmsg").html("Submitted Successfully!!");
                                fnTelecallerList();
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

        function whichButton(event) {
            if (event.button == 2)//RIGHT CLICK
            {
                alert("Not Allow Right Click!");
            }
        }
        function noCTRL(e) {
            //alert(e);
            //e.preventDefault();

            var code = (document.all) ? event.keyCode : e.which;
            var msg = "Sorry, this functionality is disabled.";
            if (parseInt(code) == 17) //CTRL
            {
                alert(msg);
                window.event.returnValue = false;
            }
        }

        function isNumberKeyNotDecimal(evt) {
            //debugger;
            var charCode = (evt.which) ? evt.which : event.keyCode
            if (charCode > 31 && (charCode < 48 || charCode > 57))
                return false;


            return true;
        }

        function isNumericWithOneDecimal(evt) {
            var val1;
            if (!(evt.keyCode == 46 || (evt.keyCode >= 48 && evt.keyCode <= 57)))
                return false;
            var parts = evt.srcElement.value.split('.');
            if (parts.length > 2)
                return false;
            if (evt.keyCode == 46)
                return (parts.length == 1);
            if (evt.keyCode != 46) {
                var currVal = String.fromCharCode(evt.keyCode);
                val1 = parseFloat(String(parts[0]) + String(currVal));
                if (parts.length == 2)
                    val1 = parseFloat(String(parts[0]) + "." + String(currVal));
            }



            if ($(evt.srcElement).is("[crlt]")) {
                if (parseFloat(val1) > parseFloat($(evt.srcElement).data("creditLimit"))) {
                    alert("Value can not be greater than Credit Limit!!");
                    return false;
                }
                if (parts.length == 2 && parts[1].length >= 2) {
                    return false;
                }
            }

            return true;
        }

        function fnChangeTASPer(sender) {
            var tasper = $(sender).val();
            tasper = tasper == "" ? 0 : tasper;
            if (parseInt(tasper) > 100) {
                alert("TAS % can not be greater than 100!");
                $(sender).val("");
                tasper = 0;
            }
            tasper = tasper == "" ? 0 : tasper;
            var dseper = 100 - parseInt(tasper);
            $(sender).closest("td").next().html(dseper);
            if (parseInt(tasper) <= 0) {
                $(sender).closest("td").addClass("clscellerrorhightlight");
            } else {
                $(sender).closest("td").removeClass("clscellerrorhightlight");
            }
            
        }
        function fnChangeFrequency(sender) {
            if ($(sender).is(":checked")) {
                $(sender).closest("tr").find("input:text").prop("disabled", false);
            }
            else {
                $(sender).closest("tr").find("input:text").prop("disabled", true);
            }
            $(sender).closest("tr").find("input:text").val("");
            $(sender).closest("td").next().next().html("");
            $(sender).closest("td").next().removeClass("clscellerrorhightlight");
        }
        function fnShowDSEList() {
            var $Checked = $("input[name='multiselect_cphRight_ddlBranch']:checked");
           // var tcnodeid = 0;
            var str = "";
            var strFrequency = "<table style='width:100%' id='tblDSEBlock'>";
            var Table1 = arrDSEData[0].Table1;
            for (var i in Table1) {
                strFrequency += "<tr><td style='width:80px;border-right:1px solid #ddd;border-bottom:1px solid #ddd;text-align:center'><label><input type='checkbox' value='" + Table1[i]["FrqTypeId"] + "' onchange='fnChangeFrequency(this)' />  " + Table1[i]["FrqType"] + "</label></td>";
                strFrequency += "<td style='width:80px;border-right:1px solid #ddd;border-bottom:1px solid #ddd;text-align:center'><input type='text' value='' class='clstasper' style='width:90%;text-align:center;height:22px' disabled='disabled' onkeypress='return isNumberKeyNotDecimal(event)' onmousedown='whichButton(event)' onkeydown='return noCTRL(event)' autocomplete=\"off\" onchange='fnChangeTASPer(this)' /></td>";
                strFrequency += "<td style='width:80px;border-bottom:1px solid #ddd;text-align:center'></td>";
                strFrequency += "</tr>";
            }
            strFrequency += "</table>";
            selectedBranchIDs = "";
            for (var i = 0; i < $Checked.length; i++) {
                if (selectedBranchIDs == "") {
                    selectedBranchIDs = $Checked.eq(i).val();
                } else {
                    selectedBranchIDs +=","+ $Checked.eq(i).val();
                }
                if ($("#tblDSEList tbody tr[branchid='" + $Checked.eq(i).val() + "']").length > 0) {
                    continue;
                }
                // var Table = arrDSEData[0].Table;
                var Table = jQuery.grep(arrDSEData[0].Table, function (element, index) {
                    return (element.BrnNodeId == $Checked.eq(i).val().split("-")[0] && element.BrnNodeType == $Checked.eq(i).val().split("-")[1]);
                });
                for (var j in Table) {
                    str += "<tr class='clspar' tcnodeid='" + TCNodeID+"' branchid='" + $Checked.eq(i).val()+"' nodeid='" + Table[j]["NodeID"] + "' nodetype='" + Table[j]["NodeType"] + "'>";
                    str += "<td style='border-bottom:1px solid #ddd'>" + Table[j]["PersonCode"] + "</td>";
                    str += "<td colspan='3' class='clschildtd' style='padding:0px;border-bottom:1px solid #ddd' tcnodeid='" + TCNodeID +"' nodeid='" + Table[j]["NodeID"] + "' nodetype='" + Table[j]["NodeType"] + "'>" + strFrequency + "</td>";
                    str += "</tr>"
                }
            }
            $("#tblDSEList tbody").eq(0).append(str);
            i = 0;
            for (var i in arrdse) {
                var $obj = $("#tblDSEList tbody td[class='clschildtd'][nodeid='" + arrdse[i]["nodeid"] + "'][nodetype='" + arrdse[i]["nodetype"] + "']");
                if ($obj.length > 0) {
                    $obj.find("input[type='checkbox'][value='" + arrdse[i]["frequencyid"] + "']").prop("checked", true);
                    $obj.find("input[type='checkbox'][value='" + arrdse[i]["frequencyid"] + "']").closest("td").next().find("input:text").prop("disabled", false)
                    $obj.find("input[type='checkbox'][value='" + arrdse[i]["frequencyid"] + "']").closest("td").next().find("input:text").val(arrdse[i]["tastgt"]);
                    $obj.find("input[type='checkbox'][value='" + arrdse[i]["frequencyid"] + "']").closest("td").next().next().html(arrdse[i]["dsetgt"]);
                }
            }
            
            var tbl = $("table.clstablechild");
            for (var i = 0; i < tbl.length; i++) {
                var existingTCNodeId = tbl.eq(i).closest("tr.clstrmain").attr("NodeId");
                var $ChildRows = tbl.eq(i).find("tr.clsdschildrow");
                for (var j = 0; j < $ChildRows.length; j++) {
                    var dsenodeid = $ChildRows.eq(j).attr("dsenodeid");
                    var dsenodetype = $ChildRows.eq(j).attr("dsenodetype");
                    var frequencyid = $ChildRows.eq(j).find("td.clsfrequencychild").attr("frnyid");
                    if (TCNodeID != existingTCNodeId) {
                        var $obj = $("#tblDSEList tbody td[class='clschildtd'][nodeid='" + dsenodeid + "'][nodetype='" + dsenodetype + "']");
                        if ($obj.length > 0) {
                            $obj.find("input[type='checkbox'][value='" + frequencyid + "']").prop("checked", false);
                            $obj.find("input[type='checkbox'][value='" + frequencyid + "']").prop("disabled", true);
                            $obj.find("input[type='checkbox'][value='" + frequencyid + "']").closest("td").next().find("input:text").prop("disabled", true)
                        }
                    }
                }
            }
            
        }
        var selectedBranchIDs = ""; var arrdse = []; var TCNodeID = 0;
        function fnSHowDSEMapping(sender, flg) {
            $("#dvFadeForProcessing").show();
            TCNodeID = $(sender).closest("tr").attr("NodeId");
            var strBranchIDs = $(sender).closest("td").prev().attr("strBranchIDs");
            strBranchIDs = strBranchIDs == undefined ? "" : strBranchIDs;
            var dseval = $(sender).closest("td").prev().find("table.clstablechild").attr("dseval");
            dseval = dseval == undefined ? "" : dseval;
            arrdse = [];
            $("#tblDSEList tbody").html("");
            if (dseval != "") {
                for (var k = 0; k < dseval.split("$").length; k++) {
                    var fregstr = dseval.split("$")[k];
                    if (fregstr == "") {
                        continue;
                    }
                    for (var f = 0; f < fregstr.split("^")[2].split("!").length; f++) {
                        var fregstring = fregstr.split("^")[2].split("!")[f];
                        if (fregstring == "") {
                            continue;
                        }
                        arrdse.push({
                            nodeid: fregstr.split("^")[0], nodetype: fregstr.split("^")[1],
                            frequencyid: fregstring.split("~")[0],
                            tastgt: fregstring.split("~")[1],
                            dsetgt: fregstring.split("~")[2],
                        })
                    }
                }
            }

            $("#dvDSEDialog").dialog({
                modal: true,
                width: "45%",
                height: window.innerHeight - 50,
                title: "DSE Mapping:" + $(sender).closest("tr").find("td").eq(1).text(),
                open: function () {
                    $("#cphRight_ddlBranch option").prop("selected", false);
                    if (strBranchIDs != "") {
                        for (var b = 0; b < strBranchIDs.split(",").length; b++) {
                            $("#cphRight_ddlBranch option[value='" + strBranchIDs.split(",")[b]+"']").prop("selected", true);
                        }
                    }
                    $("#cphRight_ddlBranch").multiselect('refresh');
                    $("#cphRight_ddlBranch").closest("td").find("button").css("width", $("#cphRight_ddlBranch").closest("td").width());
                    $("#cphRight_ddlBranch").closest("td").find("button").find("span[flgspan=1]").css("width", ($("#cphRight_ddlBranch").closest("td").find("button").width() - 35) + "px");
                    $("#cphRight_ddlBranch").closest("td").find("button").find("span[flgspan=1]").css("white-space", "nowrap");
                    fnShowDSEList();
                    $("#dvFadeForProcessing").hide();

                },
                buttons: {
                    "Submit": function () {
                        var $tr = $("#tblDSEList tbody tr.clspar")
                        var strhtml = "";
                        var strValuestring = ""; var dsestr = "";
                        if ($("#tblDSEList tbody td.clscellerrorhightlight").length > 0) {
                            alert("Kindly enter correct TAS Tgt Percentage in hightlighted cells first!")
                            return false;
                        }
                        $("#dvFadeForProcessing").show();
                        for (var i = 0; i < $tr.length; i++) {
                            if ($tr.eq(i).find("input[type='checkbox']:checked").length > 0) {
                                var nodeid = $tr.eq(i).attr("nodeid");
                                var nodetype = $tr.eq(i).attr("nodetype");
                                
                                
                                strhtml += "<tr class='clsdschildrow' tcnodeid='" + TCNodeID +"' dsenodeid='" + nodeid + "' dsenodetype='" + nodetype +"'>";
                                strhtml += "<td rowspan='" + $tr.eq(i).find("input[type='checkbox']:checked").length+"' style='width:55%'>" + $tr[i].cells[0].innerHTML + "</td>";
                                var $Checked = $tr.eq(i).find("input[type='checkbox']:checked");
                                var dstr = "";
                                for (var j = 0; j < $Checked.length; j++) {
                                    if (j > 0) {
                                        strhtml += "<tr class='clsdschildrow' tcnodeid='" + TCNodeID+"' dsenodeid='" + nodeid + "' dsenodetype='" + nodetype +"'>";
                                    }
                                    var tastgt = $Checked.eq(j).closest("td").next().find("input:text").val();
                                    tastgt = tastgt == "" ? 0 : tastgt;
                                    if (parseInt(tastgt) <= 0) {
                                        $Checked.eq(j).closest("td").next().addClass("clscellerrorhightlight");
                                        continue;
                                    }
                                    if (dstr == "") {
                                        dstr = $Checked.eq(j).val() + "~" + tastgt + "~" + $Checked.eq(j).closest("td").next().next().text();
                                    } else {
                                        dstr += "!" + $Checked.eq(j).val() + "~" + tastgt + "~" + $Checked.eq(j).closest("td").next().next().text();
                                    }
                                    if (dsestr == "") {
                                        dsestr = nodeid + "^" + nodetype + "$" + $Checked.eq(j).val() + "%" + tastgt + "*" + $Checked.eq(j).closest("td").next().next().text();
                                    } else {
                                        dsestr += "," + nodeid + "^" + nodetype + "$" + $Checked.eq(j).val() + "%" + tastgt + "*" + $Checked.eq(j).closest("td").next().next().text();
                                    }
                                   
                                    
                                    strhtml += "<td class='clsfrequencychild'  frnyid='" + $Checked.eq(j).val() + "' style='text-align:center'>" + $Checked.eq(j).closest("label").text() + "</td>";
                                    strhtml += "<td style='text-align:center'>" + tastgt + "</td>";
                                    strhtml += "<td frnyid='" + $Checked.eq(j).val() + "' style='text-align:center'>" + $Checked.eq(j).closest("td").next().next().text() + "</td>";
                                    strhtml += "</tr>";
                                }
                                if (strValuestring == "") {
                                    strValuestring = nodeid + "^" + nodetype + "^" + dstr;
                                } else {
                                    strValuestring += "$" + nodeid + "^" + nodetype + "^" + dstr;
                                }
                            }
                        }
                        if (strhtml != "") {
                            $(sender).closest("tr").find("td.clsdseblock").attr("dsestr", dsestr);
                            $(sender).closest("tr").find("td.clsdseblock").attr("strBranchIDs", selectedBranchIDs);
                            $(sender).closest("tr").find("td.clsdseblock").html("<table style='width:100%;' class='clstablechild' dseval='" + strValuestring + "'><tr><td style='text-align:center;background-color:#f8f8f8'>DSE</td><td  style='text-align:center;background-color:#f8f8f8'>Frequency</td><td  style='text-align:center;background-color:#f8f8f8'>TAS Tgt %</td><td  style='text-align:center;background-color:#f8f8f8'>DSE Tgt %</td></tr>" + strhtml + "</table>");
                            $(sender).closest("tr").find("td.clsactioncell").html("<a href='###' onclick='fnSHowDSEMapping(this,2)' class='btn btn-primary btn-sm' style='padding:2px 5px;margin-right:5px'  title='Click To View'>View Mapping</a><a href='###' onclick='fnDeleteMapping(this)' class='btn btn-primary btn-sm' style='padding:2px 5px'  title='Click To Delete'>Delete</a>");
                        } else {
                            $(sender).closest("tr").find("td.clsdseblock").attr("dsestr", "");
                            $(sender).closest("tr").find("td.clsdseblock").attr("strBranchIDs", "");
                            $(sender).closest("tr").find("td.clsdseblock").html("");
                            $(sender).closest("tr").find("td.clsactioncell").html("<a href='###' onclick='fnSHowDSEMapping(this,1)' class='btn btn-primary btn-sm' style='padding:2px 5px;margin-right:5px'  title='Click To Add'>Add Mapping</a>");
                        }
                        $("#dvFadeForProcessing").hide();
                        if ($("#tblDSEList tbody td.clscellerrorhightlight").length > 0) {
                            alert("Kindly enter correct TAS Tgt Percentage in hightlighted cells first!")
                            return false;
                        }
                        $(this).dialog('close');


                        /*
                        var personIds = "";
                        var arrDSENodeID = new Array();
                        for (var i = 0; i < tbl.length; i++) {
                            flgAbsent = 1;
                            var TCNodeId = tbl.eq(i).attr("NodeId");
                            var TCNodeType = tbl.eq(i).attr("NodeType");
                            var DSEIds = "";
                            for (var j = 0; j < tbl.eq(i).find("select.clsdseselect option:selected").length; j++) {
                                if (DSEIds == "") {
                                    DSEIds = tbl.eq(i).find("select.clsdseselect option:selected").eq(j).val();
                                } else {
                                    DSEIds += "," + tbl.eq(i).find("select.clsdseselect option:selected").eq(j).val();
                                }
                            }
                            var FrqTypeId = tbl.eq(i).find("select.clsfrequency").val();
                            var TASTgtPerc = tbl.eq(i).find("input[type='text']").val();
                            TASTgtPerc = TASTgtPerc == "" ? 0 : TASTgtPerc;
                            var DSETgtPerc = tbl.eq(i).find("td").eq(5).text();
                            DSETgtPerc = DSETgtPerc == "" ? 0 : DSETgtPerc;
                            arrDSENodeID.push({ TCNodeId: TCNodeId, TCNodeType: TCNodeType, DSEIds: DSEIds, FrqTypeId: FrqTypeId, TASTgtPerc: TASTgtPerc, DSETgtPerc: DSETgtPerc });
                        }
                        var Rptmonthyear = $("#cphRight_ddlYearMonth").val();
                        var LoginId = $("#cphRight_hdnLoginId").val();
                        $("#dvFadeForProcessing").show();
                        PageMethods.fnSubmitTeleCallerAttendance(LoginId, arrDSENodeID, Rptmonthyear, function (result) {
                            $("#dvFadeForProcessing").hide();
                            if (result.split("|")[0] == "2") {
                                alert("Some Technical Error,Please contact to Technical Team Or Try again later!!")
                            } else {
                                $("#divmsg").html("Submitted Successfully!!");
                                fnTelecallerList();
                            }
                        },
                            function (result) {
                                $("#dvFadeForProcessing").hide();
                                alert(result._message)
                            }
                        )
                        */
                    },
                    "Cancel": function () {
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
    <div id="dvFadeForProcessing" style="position: fixed; z-index: 9999999999999; top: 0; bottom: 0; left: 0; right: 0; opacity: .80; -moz-opacity: 0.8; filter: alpha(opacity=80); background-color: #ccc;">
        <div id="Div2" runat="server" align="center" style="position: absolute; width: 150px; top: 30%; left: 45%;">
            <img alt="" title="Loading..." src="../Images/blue-loading.gif" />
        </div>
    </div>
    <h4 id="h4header">>>TAS DSE F1/F2/F4 Calls Mapping</h4>
    <div style="margin-top: 10px; width: 100%; display: none">
        <table id="tblhead" style="width: 65%">
            <tr>
                <td style="width: 30px"><b>Month Year :</b> </td>
                <td style="width: 205px">
                    <asp:DropDownList runat="server" ID="ddlYearMonth" onchange="fnChangeMonth(this)" CssClass="form-control" Style="border: 1px solid #bbbbbb; width: 200px">
                    </asp:DropDownList></td>
            </tr>
        </table>
    </div>
    <div>

        <div id="divdrmmain" style="margin-top: 5px; border: 1px solid #ccc; width: 95%">
        </div>
    </div>
    <div class="blockButtons" id="divBTNS" style="width: 100%; bottom: 0; position: fixed; padding-top: 1px; background-color: #cfcfcf;">
        <table style="width: 100%">
            <tr>
                <td style="width:15%">
                    <a href="###" class="icon-bnt" onclick="fnSaveFinalData()" id="anchorbtn2"><span class="PostOrder"></span>
                        <div style="font-size: 7.8pt; width: 80px; line-height: 28px">Submit</div>
                    </a>
                </td>
                <td id="divmsg"></td>
            </tr>
        </table>
    </div>
    <div id="dvDialog" style="display: none"></div>
    <div id="dvDialogMarkPresent" style="display: none"></div>

    <div id="dvDSEDialog" style="display: none">
        <div class="ui-accordion-header" style="margin:5px 0px">
            <table style="width:100%"><tr><td style="width:13%"><b>Branch :</b></td><td><asp:DropDownList CssClass="form-control" runat="server" ID="ddlBranch" multiple="true"></asp:DropDownList></td><td  style="width:10%;padding-left:5px"><input type="button" value="Show DSE" class="btn btn-primary" onclick="fnShowDSEList()" /></td></tr></table>
        </div>
        <div class="accordion-body">
            <table class="table table-bordered small" id="tblDSEList">
                <thead>
                    <tr>
                        <th>DSE Name
                        </th>
                        <th style="width:80px;text-align:center">Frequency
                        </th>
                        <th style="width:80px;text-align:center">TAS Tgt %</th>
                        <th style="width:80px;text-align:center">DSE Tgt %</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
    <asp:HiddenField runat="server" ID="hdnLoginId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnMenuId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnNodeId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnNodeType" Value="0" />

</asp:Content>

