<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" CodeFile="MapTeleCallerOtherReason.aspx.cs" Inherits="ManageOrder_MapTeleCallerOtherReason" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
      <link rel="stylesheet" href="../css/bootstrap.min.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
     <script src="../scripts/jquery-3.6.0.js"></script>
    <link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />
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
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='26']").addClass("activemenu");
                $("#fraLeft")[0].height = $(window).height() - ($("#dvBanner").height() + $(".footer").height());

                
            });

            //$(document).data("BranchData", $("#cphRight_ddlBranch").clone());
            //$("#cphRight_ddlBranch option").remove();
            //$("#cphRight_ddlBranch").html("<option value='0-0'>------<option>");
            //$("#cphRight_ddlBranch option").eq(1).remove();
            //if ($("#cphRight_ddlBranch option").length = 1) {

            //   // fnDSEList();
            //}
            fnDSEList();
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

        function fnMarkAtt(sender) {
            if ($(sender).is(":checked")) {
                $(sender).closest("td").next().find("a").show();
            } else {
                $(sender).closest("td").next().find("a").hide();
            }
        }
        function AddParameter(form, name, value) {
            var $input = $("<input />").attr("type", "hidden")
                                .attr("name", name)
                                .attr("value", value);
            form.append($input);
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
        
        
        var arrRouteData = []; var arrSectorData = [];
        function fnDSEList() {
            var BranchVal = $("#cphRight_ddlBranch").val();
            var BranchNodeId = 0;// BranchVal.split("-")[0];
            var BranchNodeType = 0;// BranchVal.split("-")[1];
            var SiteNodeId = 0;// BranchVal.split("-")[2];
            var SiteNodeType = 0;// BranchVal.split("-")[3];

            var LoginId = $("#cphRight_hdnLoginId").val();
            var MId = $("#cphRight_hdnMenuId").val();
            $("#dvFadeForProcessing").show();
            PageMethods.fnDSEList(LoginId, function (result) {
                $("#dvFadeForProcessing").hide();
                $("#divBTNS").hide();
                if (result.split("|")[0] == "2") {
                    alert("Error-" + result.split("|")[1]);
                } else if (result == "") {
                    $("#divdrmmain")[0].innerHTML = "No DSE Found!!!";
                }
                else {
                    $("#divdrmmain")[0].innerHTML = result.split("|")[0];
                    //arrRouteData = $.parseJSON('[' + result.split("|")[1] + ']');
                    //arrSectorData = $.parseJSON('[' + result.split("|")[2] + ']');
                    //var totAbsentee = $("#tbldbrlist").find("input[type=checkbox]").length;
                    //var totAbsenteeMarked = $("#tbldbrlist").find("input[type=checkbox]:checked").length;
                    //if (totAbsentee == totAbsenteeMarked) {
                    //    $("#divBTNS").hide();
                    //    $("#tbldbrlist").find("input[type=checkbox]").prop("disabled", true);
                    //} else
                    {
                        $("#divBTNS").show();
                    }
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


        function fnSaveFinalData() {
            var tbl = $("#tbldbrlist").find('select');
            if (tbl.length == 0) {
                alert("Kindly Select person to mark absent first!!!")
                return false;
            }
            $("#dvDialog")[0].innerHTML="Are you sure to map tele caller for these DSE?"
            $("#dvDialog").dialog({
                modal: true,
                title: "Confirmation:",
                buttons: {
                    "Yes": function () {
                        $(this).dialog('close');
                        var personIds = "";
                        var arrDSENodeID = new Array();
                        for (var i = 0; i < tbl.length; i++) {
                            if (tbl.eq(i).closest("tr").find("select option:selected").val() != "0")
                            {
                                var BranchNodeId = tbl.eq(i).closest("tr").attr("BranchNodeId");
                                var BranchNodeType = tbl.eq(i).closest("tr").attr("BranchNodeType");
                                var DSENodeId = tbl.eq(i).closest("tr").attr("DSENodeId");
                                var DSENodeType = tbl.eq(i).closest("tr").attr("DSENodeType");
                                var TeleReasonId = tbl.eq(i).closest("tr").attr("TeleReasonId");
                                var UserId = tbl.eq(i).closest("tr").find("select option:selected").val();//("TCUserId");
                                
                                flgAbsent = 1;
                                arrDSENodeID.push({ BranchNodeId: BranchNodeId, BranchNodeType: BranchNodeType, DSENodeId: DSENodeId, DSENodeType: DSENodeType, TeleReasonId: TeleReasonId, UserId: UserId });

                            }
                        }

                    
                        var LoginId = $("#cphRight_hdnLoginId").val();
                        $("#dvFadeForProcessing").show();
                        PageMethods.fnSubmitDSEAttendance(LoginId, arrDSENodeID,function (result) {
                            $("#dvFadeForProcessing").hide();
                            if (result.split("|")[0] == "2") {
                                alert("Some Technical Error,Please contact to Technical Team Or Try again later!!")
                            } else {
                                //var $checked = $("#tbldbrlist").find("input[type=checkbox]:checked");
                                //$("#tbldbrlist").find("input[type=checkbox]:checked").prop("disabled", true);
                                //$("#tbldbrlist").find("input[type=checkbox]:checked").closest("tr").addClass("clsHighlightrows");
                                //$("#tbldbrlist").find("input[type=checkbox]:checked").attr("MarkAtt", "1");
                                //$("#tbldbrlist").find("input[type=checkbox]:checked").closest("tr").find("a").hide();
                                alert("Mapped Successfully!!");
                                //var totAbsentee = $("#tbldbrlist").find("input[type=checkbox]").length;
                                //var totAbsenteeMarked = $("#tbldbrlist").find("input[type=checkbox]:checked").length;
                                //if (totAbsentee == totAbsenteeMarked) {
                                //    $("#divBTNS").hide();
                                //    $("#tbldbrlist").find("input[type=checkbox]").prop("disabled", true);
                                //}
                                //$("#divBTNS").hide();
                                
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
<asp:Content ID="Content2" ContentPlaceHolderID="cphLeft" Runat="Server">
   <iframe id="fraLeft" name="fraLeft" height="100%" width="100%" scrolling="yes" frameborder="0" src='../frmLeftMainTreeView.aspx'></iframe>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphRight" Runat="Server">
     <div id="dvFadeForProcessing" style="position: fixed; z-index: 9999999999999; display: none; top: 0; bottom: 0; left: 0; right: 0; opacity: .80; -moz-opacity: 0.8; filter: alpha(opacity=80); background-color: #ccc;">
        <div id="Div2" runat="server" align="center" style="position: absolute; width: 150px; top: 30%; left: 45%;">
            <img alt="" title="Loading..." src="../Images/blue-loading.gif" />
        </div>
    </div>
    <h4 id="h4header">>>Map Tele Caller With O2 Data</h4>
    <div style="margin-top:10px;width:40%">
        <table id="tblhead" style="width:100%">
            <tr>
               
                <td>
                    <div class="input-group">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>
      <input type="text" class="form-control" placeholder="Search" name="search" id="txtFindDbr">
      
    </div>
                   
                </td>
                
            </tr>
        </table>
    </div>
    <div>
    
    <div id="divdrmmain"   style="margin-top:5px;border:1px solid #ccc;width:1050px">
    </div>
   </div>
     <div class="blockButtons" id="divBTNS" style="display:none;width: 100%;bottom: 0; position: fixed; padding-top: 1px; background-color: #cfcfcf;">
        <table style="width:100%">
            <tr>
                <td>
                    <a href="###" class="icon-bnt" onclick="fnSaveFinalData()" id="anchorbtn2" ><span class="PostOrder"></span>
                        <div style="font-size: 7.8pt;width:100px;line-height:28px">Save Mapping</div>
                    </a>
                   </td>
                <td>
                  
                </td>
            </tr>
        </table>
    </div>
    <div id="dvDialog" style="display:none"></div>
    <asp:HiddenField runat="server" ID="hdnLoginId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnMenuId" Value="0" />
</asp:Content>

