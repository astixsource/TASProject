<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" CodeFile="frmTASDayPlanning.aspx.cs" Inherits="frmTASDayPlanning" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
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
        
        .leftMenu-headding {
            width:235px !important;
        }

        .clstitleheader {
            font-size: 15px;
            background-color: #23aed8;
            color: White !important;
            font-weight: bold !important;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            padding-left: 5px;
            margin-top: 0 !important;
            margin-bottom: 0 !important;
            text-shadow: 2px 2px 2px #333333;
            filter: progid:DXImageTransform.Microsoft.DropShadow(offX=2,offY=2,color=333333);
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

     .clsheaderDividertd {
            width: .5%;
        }
        .clstd {
            width: 15%;
            border: 2px solid;
           height:28px;
           padding:7px !important;
        }
        .clstdMTD {
            width: 15%;
            border: 2px solid;
           height:28px;
           padding:6px !important;
           font-size:9.5pt !important;
        }
            .box1{
                background-color:#e5faff;
               
            }
            .box2 {
                background-color:#f2f2f2;
            }
            .box3 {
                background-color:#f7fde7;
            }
            .box4 {
                background-color:#f6f3e6;
            }
            .box5 {
                background-color:#ebf2f9;
            }
            .box6 {
                 width: 20%;
                background-color:#ebf2f9;
            }
            .clsheadertd{
                padding:4px 4px !important;
                color:#0070c0;
                font-weight:bold;
                font-size:10.5pt;
                text-align:center;
            }
        .clsPerTD {
            padding-right:3px;
            font-size:28pt;
            font-family:Arial;
            font-weight:500;
            width:35%;
            text-align:center;
        }
        .subbox1,.subbox2,.subbox3,.subbox4,.subbox5,.subbox6 {
            font-size:10.5pt;
            font-family:Calibri;
            font-style:normal;
            font-weight:bold;
        }
        .clstdStaticcolor {
            color:#1f4e78;
        }
        .C_header{
            display: inline;
    margin: 7px 27.5%;
    position: absolute;
    font-size: 24pt;
    color:#28669d;
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
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='13']").addClass("activemenu");
                $("#fraLeft")[0].height = $(window).height() - ($("#dvBanner").height() + $(".footer").height());
            });

            $("#divdrmmain").css("width", window.innerWidth-50);
            fnTelecallerList();
           
              
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

        function Focus(objname, waterMarkText) {
            obj = $(objname)[0];
            if (obj.value == waterMarkText) {
                obj.value = "";
                obj.style.color = "black";
            }
        }
        function Blur(objname, waterMarkText) {
            obj = $(objname)[0];
            if (obj.value == "") {
                obj.value = waterMarkText;
                obj.className = "WaterMarkedTextBox";
            }
            if (obj.value == waterMarkText) {
                obj.style.color = "gray";
            }
        }
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
        function fnChangeBranch(sender) {
            //if ($(sender).val() != "0") {
            fnTelecallerList();
            //}
        }
        
        var arrRouteData = []; var arrSectorData = [];
        function fnTelecallerList() {
            var UserId = $("#cphRight_hdnUserId").val();
            var TSVNodeType = $("#cphRight_hdnNodeType").val();
            var LoginId = $("#cphRight_hdnLoginId").val();
            var MId = $("#cphRight_hdnMenuId").val();
            var PlanDateId = $("input[name='rdoPlan']:checked").val();
            $("#dvFadeForProcessing").show();
            PageMethods.fnTelecallerList(LoginId, UserId, TSVNodeType, PlanDateId,function (result) {
                $("#dvFadeForProcessing").hide();
                //$("#divBTNS").hide();
                if (result.split("|")[0] == "2") {
                    alert("Error-" + result.split("|")[1]);
                } else if (result.split("|")[1] == "") {
                    $("#divdrmmain")[0].innerHTML = "No Data Found!";
                }
                else {
                    $("#divdrmmain")[0].innerHTML = result.split("|")[1];
                    var sData = $.parseJSON('[' + result.split("|")[2] + ']');
                    $("#spnach_1").html(sData[0][0]["TAS Month Ach"]);
                    $("#spnPlan_1").html(sData[0][0]["TAS Month Target"]);
                    $("#spnach_2").html(sData[0][0]["GP Ach"]);
                    $("#spnPlan_2").html(sData[0][0]["Total GP"]);
                    $("#spnach_3").html(sData[0][0]["FB Ach"]);
                    $("#spnPlan_3").html(sData[0][0]["TFB"]);
                    $("#tbldbrlist").DataTable({
                        scrollY: "53vh",
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


        function fnMarkPresent(sender) {

            //var istcuser = $(sender).closest("tr").attr("DCUserId")

            //if (istcuser == 0) {
            //    $("#dvDialogMarkPresent")[0].innerHTML = "Are you sure to mark as no absent for these selected Telecaller?"
            //}
            //else {
            //    $("#dvDialogMarkPresent")[0].innerHTML = "Telecaller is already mapped with this DSE, Are you still want to mark as no absent for this selected DSE?"
            //}
            
            $("#dvDialogMarkPresent")[0].innerHTML = "Are you sure to mark as no absent for these selected Telecaller?"


            $("#dvDialogMarkPresent").dialog({
                modal: true,
                title: "Confirmation:",
                buttons: {
                    "Yes": function () {
                        $(this).dialog('close');
                        var personIds = "";
                        var TSVNodeId = $("#cphRight_hdnNodeId").val();
                        var TSVNodeType = $("#cphRight_hdnNodeType").val();
                        var arrDSENodeID = new Array();
                        
                            flgAbsent = 0;
                            var TeleCallerId = $(sender).closest("tr").attr("TeleCallerId");
                            var NodeType = $(sender).closest("tr").attr("TeleNodeType");
                            arrDSENodeID.push({ DSENodeID: TeleCallerId, DSENodeType: NodeType, RouteNodeId: 0, RouteNodeType: 0, SectorId: 0, flgAbsent: flgAbsent, flgChangeRouteSector: 0 });
                       

                        var LoginId = $("#cphRight_hdnLoginId").val();
                        $("#dvFadeForProcessing").show();
                        PageMethods.fnSubmitTeleCallerAttendance(LoginId, arrDSENodeID, TSVNodeId, TSVNodeType, function (result) {
                            $("#dvFadeForProcessing").hide();
                            if (result.split("|")[0] == "2") {
                                alert("Some Technical Error,Please contact to Technical Team Or Try again later!!")
                            } else {
                                //var $checked = $("#tbldbrlist").find("input[type=checkbox]:checked");
                                $(sender).closest("tr").find("input[type=checkbox]:checked").prop("disabled", false);
                                $(sender).closest("tr").find("input[type=checkbox]:checked").closest("tr").removeClass("clsHighlightrows");
                                $(sender).closest("tr").find("input[type=checkbox]:checked").attr("MarkAtt", "0");
                                $(sender).closest("tr").find("input[type=checkbox]:checked").closest("tr").find("a").hide();
                                $(sender).closest("tr").find("input[type=checkbox]").prop("checked", false);
                                alert("Mark as present successfully!!");
                                //var totAbsentee = $("#tbldbrlist").find("input[type=checkbox]").length;
                                //var totAbsenteeMarked = $("#tbldbrlist").find("input[type=checkbox]:checked").length;
                                //if (totAbsentee == totAbsenteeMarked) {
                                //    $("#divBTNS").hide();
                                //    $("#tbldbrlist").find("input[type=checkbox]").prop("disabled", true);
                                //}

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
            var tbl = $("#tbldbrlist tbody tr");
            
            $("#dvDialog")[0].innerHTML = "Are you sure to submit?"
            $("#dvDialog").dialog({
                modal: true,
                title: "Confirmation:",
                buttons: {
                    "Yes": function () {
                        $(this).dialog('close');
                        var personIds = "";
                        var NodeId = $("#cphRight_hdnNodeId").val();
                        var TCUserId = $("#cphRight_hdnUserId").val();
                        var PlanDateId = $("input[name='rdoPlan']").val();
                        var arrDSENodeID = new Array();
                        for (var i = 0; i < tbl.length; i++) {
                            flgAbsent = 1;
                            var StoreID = tbl.eq(i).closest("tr").attr("storeid");
                            var ValuePlan = tbl.eq(i).closest("tr").find("input[sgtval=1]").val();
                            ValuePlan = ValuePlan == "" ? 0 : ValuePlan;
                            ValuePlan = parseFloat(ValuePlan).toFixed(4);
                            var ActualValuePlan = tbl.eq(i).closest("tr").attr("ActualValuePlan");
                            ActualValuePlan = ActualValuePlan == "" ? 0 : ActualValuePlan;
                            ActualValuePlan = parseFloat(ActualValuePlan).toFixed(4);
                            var ActualGPPlan = tbl.eq(i).closest("tr").attr("ActualGPPlan");
                            ActualGPPlan = ActualGPPlan == "" ? 0 : ActualGPPlan;
                            ActualGPPlan = parseInt(ActualGPPlan);
                            var GPPlan = tbl.eq(i).closest("tr").find("input[sgtval=2]").val();
                            GPPlan = GPPlan == "" ? 0 : GPPlan;
                            GPPlan = parseInt(GPPlan);
                            var ActualFBPlan = tbl.eq(i).closest("tr").attr("ActualFBPlan");
                            ActualFBPlan = ActualFBPlan == "" ? 0 : ActualFBPlan;
                            ActualFBPlan = parseInt(ActualFBPlan);
                            var FBPlan = tbl.eq(i).closest("tr").find("input[sgtval=3]").val();
                            FBPlan = FBPlan == "" ? 0 : FBPlan;
                            FBPlan = parseInt(FBPlan);
                            arrDSENodeID.push({ StoreID: StoreID, ActualValuePlan: ActualValuePlan, ValuePlan: ValuePlan, ActualGPPlan: ActualGPPlan, GPPlan: GPPlan, ActualFBPlan: ActualFBPlan, FBPlan: FBPlan });
                        }
                        
                        var LoginId = $("#cphRight_hdnLoginId").val();
                        $("#dvFadeForProcessing").show();
                        PageMethods.fnSubmitTeleCallerAttendance(LoginId, arrDSENodeID, NodeId, TCUserId, PlanDateId, function (result) {
                            $("#dvFadeForProcessing").hide();
                            if (result.split("|")[0] == "2") {
                                alert("Error-" + result.split("|")[1]);
                            } else {
                                $("#tdmsg").html("<span style='color:green'>Submitted Successfully!!</span>");
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

        function fnChangeVal(flg) {
            $("#tdmsg").html("");
            var $Inputs = $("#tbldbrlist input[sgtval='" + flg + "']");
            var totalval = 0;
            for (var i = 0; i < $Inputs.length; i++) {
                totalval += parseInt($Inputs.eq(i).val());
            }
            $("#spnPlan_" + flg).html(totalval);
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
    </script>
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
    <div style="width: 100%;" class="clstitleheader">
            <table id="tblhead1" style="width: 100%">
                <tr>
                    <td style="text-align: left;" id="h4header">
                      >>Plan For The Day
                    </td>
                    <td style="width:20%">
                        <div class="input-group" >
                            <input type="text" class="form-control" placeholder="Search Store" style="width: 100%; max-width: 100%;" id="txtFindDbr" />
                            <span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>
                        </div>
                    </td>
                    <td style="padding-left: 20px;width:15%;text-align:right;">
                        <button type="button" class="btn btn-primary" onclick="fnRefreshStatus()" id="btnRefershStatus">
                            <i class="glyphicon glyphicon-refresh"></i>
                            Refresh
                        </button>
                    </td>
                </tr>
            </table>
        </div>
    <div style="margin-top:10px;width:100%">
        <table cellpadding="4" cellspacing="2">
            <tr>
                <td style="padding:10px;font-size:12pt"><label><input type="radio" value="1" onclick="fnTelecallerList()" name="rdoPlan" checked /><b> Plan For Today</b> </label></td>
                <td style="padding:10px;font-size:12pt"><label><input type="radio" value="2" onclick="fnTelecallerList()" name="rdoPlan" /><b> Plan For Tomorrow</b></label></td>
            </tr>
        </table>
        <table id="tblhead" style="width:100%">
            <tr>
                <td>
                     <div class="col-12" id="divFiveStarContainer">
            <table  style="width:60%;margin-bottom:2px">
                <tr>
                    <td class="clsheadertd">Total Value</td>
                    <td class="clsheaderDividertd"></td>
                    <td class="clsheadertd">Total GP</td>
                    <td class="clsheaderDividertd"></td>
                    <td class="clsheadertd">Total FB</td>
                </tr>
                <tr>
                    <td class="clstd box1">
                        <table style="width:100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td id="tdMTDRanklbl" class="subbox1">Ach / Plan :</td>
                                <td id="tdMTDRankval" class="subbox1" style="text-align:center;"> <span id="spnach_1">0</span> / <span id="spnPlan_1">0</span></td>
                            </tr>
                        </table>
                    </td>
                   <td class="clsheaderDividertd"></td>
                    <td class="clstd box2">

                        <table style="width:100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td id="tdStarsEarnedlbl" class="subbox1">Ach / Plan :</td>
                                <td id="tdStarsEarnedval" class="subbox2" style="text-align:center;"> <span id="spnach_2">0</span> / <span id="spnPlan_2">0</span></td>
                            </tr>
                        </table>
                    </td>
                    <td class="clsheaderDividertd"></td>
                    <td class="clstd box3">
                         <table style="width:100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td id="tdProductivityPer" class="subbox1">Ach / Plan :</td>
                                <td id="tdProductivityCallsMadelbl" class="subbox2" style="text-align:center;"> <span id="spnach_3">0</span> / <span id="spnPlan_3">0</span></td>
                            </tr>
                               
                        </table>

                    </td>
                </tr>
            </table>
        </div>

      
                </td>
                <%--<td style="width:20%;vertical-align:middle;text-align:center">
                        Plan For The Day : <%=DateTime.Now.ToString("dd-MMM-yyyy") %>
                </td>--%>
            </tr>
        </table>
    </div>
    <div>
    
    <div id="divdrmmain"   style="margin-top:5px;border:1px solid #ccc;">
    </div>
   </div>
     <div class="blockButtons" id="divBTNS" style="width: 100%; bottom: 0; position: fixed; padding-top: 1px; background-color: #cfcfcf;">
        <table style="width:100%">
            <tr>
                <td style="width:15%">
                    <a href="###" class="icon-bnt" onclick="fnSaveFinalData()" id="anchorbtn2" ><span class="PostOrder"></span>
                        <div style="font-size: 7.8pt;width:100px;line-height:28px">Submit</div>
                    </a>
                   </td>
                <td id="tdmsg" style="text-align:left">
                   
                </td>
            </tr>
        </table>
    </div>
    <div id="dvDialog" style="display:none"></div>
     <div id="dvDialogMarkPresent" style="display:none"></div>
    <asp:HiddenField runat="server" ID="hdnLoginId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnMenuId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnNodeId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnUserId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnNodeType" Value="0" />
    
</asp:Content>

