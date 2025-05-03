<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" EnableEventValidation="false" CodeFile="frmSUBDDRCPUpload.aspx.cs" Inherits="frmSUBDDRCPUpload" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">

    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="../scripts/jquery-1.11.3.js"></script>
    <link href="../CSS/ThemeBlue.css" rel="Stylesheet" type="text/css" />
    <link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/Multiselect/jquery-ui.css" rel="stylesheet" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <style>
        .table-sm > thead > tr > th, .table-sm > thead > tr > td {
            padding: 3px;
            vertical-align: middle;
            background: #26a6e7;
            color: #ffffff;
        }

        .table-sm > tbody > tr > td {
            padding: 3px;
            vertical-align: middle;
        }

        tr.clsHighlighted > td {
            background-color: #ffaaaa !important;
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

        tr.clsFileHighlighted {
            background-color: #b8d3b8;
        }
    </style>
    <script>
        function fntblFixedHeader() {
            if ($("#tbldbrlist").length > 0) {
                var thead = $("#tbldbrlist").find("thead").eq(0).html();
                $("#divfixedHeader").html("<table id='tbl_Status_fixedhead' cellspacing='0' style='font-size:8pt' class='table table-bordered table-sm'><thead>" + thead + "</thead><tbody></tbody></table>");
                for (i = 0; i < $("#tbldbrlist thead").find("th").length; i++) {
                    $("#tbl_Status_fixedhead").find("th").eq(i).css({
                        "width": $("#tbldbrlist thead").find("th")[i].offsetWidth
                    });
                    // $("#tbldbrlist thead").find("th").eq(i).css("width", $("#tbldbrlist thead").find("th")[i].offsetWidth);
                }

                $("#divHeaderOne").css("width", $("#divMain")[0].clientWidth - 1);
                $("#tdFilelbl").css("width", $("#divMain")[0].clientWidth);
                $("#divbtns").css("width", $("#divMain")[0].clientWidth + 4);

                // $("#divHeadercont").css("width", $("#divMainData")[0].clientWidth);
            }

        }
        $(document).ready(function () {
            $("#lnksbf").hide();
            $("#lnkRetailer").hide();
            //fntblFixedHeader();
            $('#fraLeft').load(function () {
                $("#fraLeft").contents().find("#DvMenu").find("li").removeClass("activemenu");
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='32']").addClass("activemenu");
                $("#fraLeft")[0].height = $(window).height() - ($("#dvBanner").height() + $(".footer").height());
            });

            $('input[type=file]').change(function () {
                $(this).closest("tr").removeClass("clsFileHighlighted");
                var selectedFile = $(this).val().toLowerCase(),
                    regex = new RegExp("(.*?)\.(xlsx|xlsb|xls)$");
                $(this).attr("flgUpload", "0");
                if ($(this).val() != "") {
                    if (!(regex.test(selectedFile))) {
                        $(this).val('');
                        alert("Incorrect file extension,kindly upload xls,xlsx,xlsb file only!");
                    }
                    selectedFile = selectedFile.split("\\");
                    selectedFile = selectedFile[selectedFile.length - 1];
                    var FileSetTypeId = $(this).attr("filesettype");
                    var sysFileName = "";
                    if (FileSetTypeId == 2) {
                        sysFileName = "SUBD_DRCP";
                    }
                    if (FileSetTypeId == 1) {
                        sysFileName = "SUBD_JourneyPlan";
                    }
                    if (selectedFile.split("_").length != 3) {
                        $(this).val('');
                        alert("Invalid File naming convention,kindly upload correct file format only like \"" + sysFileName + "_yyyyMMdd\"");
                        return false;
                    }


                    var sFilename = selectedFile.split(".")[0];
                    dtformat = sFilename.split("_")[2];
                    sFilename = sFilename.split("_")[0] + "_" + sFilename.split("_")[1];
                    if (sFilename.toLowerCase() != sysFileName.toLowerCase()) {
                        $(this).val('');
                        alert("Invalid File naming convention,kindly upload correct file format only like \"" + sysFileName + "_yyyyMMdd\"");
                        return false;
                    }

                    if (validatedate(selectedFile.split("_")[2].split(".")[0]) == false) {
                        $(this).val('');
                        alert("Invalid File naming convention,kindly upload correct file format only like \"" + sysFileName + "_yyyyMMdd\"");
                        return false;
                    }
                    if ($(this).val() != "") {
                        $(this).attr("flgUpload", "1");
                    }
                }
            });
        });
        var SiteNodeId = 0;
        var SiteNodeType = 0;
        function fnUploadFiles() {
            var files = $('input[type=file][flgUpload="1"]');
            if ($("#cphRight_ddlSite option").length > 0) {
                var sval = $("#cphRight_ddlSite option:selected").val();
                SiteNodeId = sval.split("-")[0];
                SiteNodeType = sval.split("-")[1];
            } else {
                var strIds = $("#cphRight_hdnNodeTypes").val();
                SiteNodeId = strIds.split("|")[0];
                SiteNodeType = strIds.split("|")[1];
            }
            if (files.length != 2) {
                alert("Kindly select both files first!!");
                return false
            }
            var LoginId = $("#cphRight_hdnLoginId").val();
            var formdata = new FormData();
            formdata.append("SiteNodeId", SiteNodeId);
            formdata.append("SiteNodeType", SiteNodeType);
            formdata.append("LoginId", LoginId);
            $("#tdStatus").html("Pending..");
            for (var i = 0; i < files.length ; i++) {
                var file = $("#" + files[i].id).get(0).files;
                var filesettype = $("#" + files[i].id).attr("filesettype");
                formdata.append(file[0].name, file[0], file[0].name + '#' + filesettype);
            }
            postFile(formdata);
        }
        function postFile(data) {
            // Make the Ajax call
            $.ajax({
                url: "FileSUBDUploadHandler.ashx",
                type: 'POST',
                data: data,
                contentType: false,
                processData: false,
                xhr: function () {
                    var req = $.ajaxSettings.xhr();
                    if (req.upload) {
                        // Setup event listener for any progress info
                        // returned from the Web API
                        req.upload.addEventListener('progress', function (e) {
                            if (e.lengthComputable) {
                                // Update the progress bar
                                updateProgressBar(e);
                            }
                        }, false);
                    }
                    return req;
                },
            }).done(function (response) {
                fnSuccess(response);
            }).fail(function (error) {
                fnError(error);
            });
        }
        function updateProgressBar(e, id) {
            // Calculate current percentage
            var percentage = (e.loaded * 100) / e.total;
            // Modify the progress bar
            $("#tdStatus").html(Math.round(percentage) + "% uploaded... please wait");

            // Are we done?
            if (percentage >= 100) {
                $("#tdStatus").html("Zip files 100 + % uploaded but wait for further data processing in DB..");
            }
        }
        function fnSuccess(response, id) {
            if (response.split("^")[0] == "0" || response.split("^")[0] == "2") {
                $("#tdStatus").html(response.split("^")[1]);
                $("#file1").val("");
                $("#file1").attr("flgUpload", "0");
                $("#file2").val("");
                $("#file2").attr("flgUpload", "0");
            } else {
                $("#file1").val("");
                $("#file1").attr("flgUpload", "0");
                $("#file2").val("");
                $("#file2").attr("flgUpload", "0");
                $("#tdStatus").html(response.split("^")[1]);
            }
            refreshFileList('<%=hdRefereshGrid.ClientID %>');
        }
        function fnError(response) {
            $("#file1").val("");
            $("#file1").attr("flgUpload", "0");
            $("#file2").val("");
            $("#file2").attr("flgUpload", "0");
            $("#tdStatus").html("Error-" + response);
            refreshFileList('<%=hdRefereshGrid.ClientID %>');
        }

        function refreshFileList(hiddenFieldID) {
            var hiddenField = $get(hiddenFieldID);
            if (hiddenField) {
                hiddenField.value = (new Date()).getTime();
                __doPostBack(hiddenFieldID, '');
            }
        }
        //Display mouse over and out effect of file upload list
        function eventMouseOver(_this) {
            previousClass = _this.className;
            _this.className = 'GridHoverRow';
        }
        function eventMouseOut(_this) {
            _this.className = previousClass;
        }
        function fnUpdateRouteNo(sender) {
            $("#divRoute")[0].innerHTML = "<br/>Please wait..."
            $("#divRoute").dialog({
                title: "Update Route Mapping",
                modal: true,
                width: "450",
                height: "470",
                open: function () {
                    $(".ui-dialog-titlebar-close").html("<span class='ui-button-icon ui-icon ui-icon-closethick'></span><span class='ui-button-icon-space'></span>");
                    var BranchNodeId = $(sender).closest("tr").attr("brnnodeid");
                    var BranchNodeType = $(sender).closest("tr").attr("brnnodetype");
                    PageMethods.fnBindRoute(BranchNodeId, BranchNodeType,
                        function (result) {
                            $("#divRoute")[0].innerHTML = result;
                        },
                        function (result) {
                            $("#divRoute")[0].innerHTML = "Error-" + result.message;
                        }
                        )
                },
                close: function () {
                    $(this).dialog('destroy');
                },
                buttons: {
                    "Update": {
                        "text": "Update",
                        "class": "btn btn-primary",
                        "click": function () {
                            var BranchNodeId = $(sender).closest("tr").attr("brnnodeid");
                            var BranchNodeType = $(sender).closest("tr").attr("brnnodetype");
                            var LoginId = $("#cphRight_hdnLoginId").val();
                            var $trs = $("#tblRouteno tr[flg=1]");
                            var BranchFrequencyMapping = [];
                            for (var i = 0; i < $trs.length; i++) {
                                if (fnChangeRoute($trs[i], 1)) {
                                    var FrqTypeId = $trs.eq(i).attr("FrqTypeId");
                                    var WeekNo = $trs.eq(i).attr("WeekNo");
                                    var MinRouteNo = $trs.eq(i).find("select").eq(0).val();
                                    var MaxRouteNo = $trs.eq(i).find("select").eq(1).val();
                                    BranchFrequencyMapping.push({
                                        FrqTypeId: FrqTypeId, WeekNo: WeekNo,
                                        MinRouteNo: MinRouteNo, MaxRouteNo: MaxRouteNo
                                    });
                                } else {
                                    return false;
                                }
                            }
                            if (BranchFrequencyMapping.length > 0) {
                                $("#dvFadeForProcessing").show();
                                PageMethods.fnSaveBranchFrequenceMapping(LoginId, BranchNodeId, BranchNodeType, BranchFrequencyMapping, function (result) {
                                    $("#dvFadeForProcessing").hide();
                                    if (result.split("|")[0] == "2") {
                                        alert("Error-" + result.split("|")[1]);
                                    } else {
                                        $("#divRoute").dialog('close');
                                    }

                                }, function (result) {
                                    $("#dvFadeForProcessing").hide();
                                    alert("Error-" + result._message);
                                })
                            }
                        }
                    },
                    "Cancel": {
                        "text": "Cancel",
                        "class": "btn btn-primary",
                        "click": function () {
                            $(this).dialog('close');
                        }
                    }
                }
            });
        }
        function fnChangeMonth(sender) {
            var BranchNodeId = $(sender).closest("tr").attr("brnnodeid");
            var BranchNodeType = $(sender).closest("tr").attr("brnnodetype");
            var RptMonthYear = $(sender).val();
            PageMethods.fnGetLastUploadStatusSwingDRCP(BranchNodeId, BranchNodeType, RptMonthYear,
                function (result) {
                    if (result != "") {
                        $(sender).closest("tr").find("td").eq(3).html(result);
                        $(sender).closest("tr").find("td").eq(5).html("<a href='###' style='font-size:9pt;color:blue;text-decoration:underline' onclick='fnDownloadRouteCalendar(this,1)'>Download<a>");
                    } else {
                        $(sender).closest("tr").find("td").eq(3).html("");
                        $(sender).closest("tr").find("td").eq(5).html("");
                    }
                },
                function (result) {
                    alert("Error-" + result._message);
                }
                )
        }
        function fnChangeRoute(sender, flg) {
            var NoOfWeek = $(sender).closest("tr").attr("NoOfWeek");
            var imax = NoOfWeek;
            var FrqTypeId = $(sender).closest("tr").attr("FrqTypeId");
            var trs = $("#tblRouteno tr[FrqTypeId='" + FrqTypeId + "'][flg=1]");
            $(trs).removeClass("clsHighlighted");
            var val = $(sender).val();
            var Oldval = $(sender).attr("oldval");
            for (var i = 0; i < trs.length; i++) {
                var val1 = trs.eq(i).find("select").eq(0).val();
                var val2 = trs.eq(i).find("select").eq(1).val();
                if (parseInt(val1) == 0 || parseInt(val2) == 0) {
                    alert("Kindly select Route No first!");
                    // $(sender).val(Oldval);
                    trs.eq(i).addClass("clsHighlighted");
                    return false;
                }
                if (parseInt(val1) > parseInt(val2)) {
                    alert("Start Route No can not be greather than End Route No");
                    // $(sender).val(Oldval);
                    trs.eq(i).addClass("clsHighlighted");
                    return false;
                }
                if (i < trs.length - 1) {
                    if (parseInt(val2) > parseInt(trs.eq(i + 1).find("select").eq(0).val())) {
                        alert("End Route No can not be greather than Next Week Start Route No");
                        // $(sender).val(Oldval);
                        trs.eq(i).addClass("clsHighlighted");
                        return false;
                    }
                }
            }
            return true;
        }
        function fnResetRtMapping(sender) {
            var confirms = confirm("Are you sure to reset mapping?");
            if (confirms) {
                var FrqTypeId = $(sender).closest("tr").attr("FrqTypeId");
                var trs = $("#tblRouteno tr[FrqTypeId='" + FrqTypeId + "'][flg=1]");
                $(trs).find("select option[value='0']").prop("selected", true);
            }
        }
        function fnDownloadRouteCalendar(ctrl, flg) {
            $("#cphRight_hdnDate").val($(ctrl).closest('tr').find("select").eq(0).val());
            $("#cphRight_hdnNodeId").val($(ctrl).closest('tr').attr('brnnodeid'));
            $("#cphRight_hdnNodeTypes").val($(ctrl).closest('tr').attr('brnnodetype'));
            $(ctrl)[0].innerHTML = "<img valign='middle' src='../Images/preloader_18.gif' alt='loading gif' />Wait..";
            setTimeout(function () {
                $(ctrl)[0].innerHTML = "Download";
            }, 9000)
            $("#cphRight_btnRouteCalenderDownload").click();
        }
    </script>

    <script type="text/javascript">
        //Enumeration for messages status
        var SiteNodeId = 0;
        var SiteNodeType = 0;
        MessageStatus = {
            Success: 1,
            Information: 2,
            Warning: 3,
            Error: 4
        }

        //Enumeration for messages status class
        MessageCSS = {
            Success: "Success",
            Information: "Information",
            Warning: "Warning",
            Error: "Error"
        }

        //Global variables
        var intervalID = 0;
        var subintervalID = 0;
        var fileUpload;
        var form;
        var previousClass = '';

        //Attach to the upload click event and grab a reference to the progress bar


        //Start upload process

        //Stop progrss when file was successfully uploaded
        function onComplete(type, msg, filename, downloadBytes, newFileName, FileSetId, FileSetType, Updatetype) {
            window.clearInterval(intervalID);
            clearTimeout(subintervalID);

            if (type == MessageStatus.Success) {
                setProgress(100);
                updateMessage(MessageStatus.Success, msg, filename, downloadBytes, Updatetype);
                Sys.UI.DomElement.removeCssClass($get('dvUploader'), 'StartUpload');
            }
            else {
                if (type == 5) {
                    setProgress(100);
                    $("#cphRight_divRptFinelhead").css("color", "blue");
                    $("#cphRight_divRptFinelhead").html("<table id='tblstatus'><tr><td></td></tr></table>");
                    updateMessage(MessageStatus.Error, msg, filename, downloadBytes, Updatetype);
                    $("#cphRight_divRptFinelhead").find("table[id='tblstatus']").append("<tr><td><a href='###' onclick='fndownload(this)' style='color:blue;text-decoration:underline' filesetid='" + FileSetId + "' filesettype='" + FileSetType + "'>Download Exception Report</a><div style='width:100%' id='divIframeReport'></div></td></tr>");
                } else {
                    $("#cphRight_divRptFinelhead").find("table[id='tblstatus']").append("<tr><td style='color:#ff0000;'>Error : " + msg + "</td></tr>");
                    updateMessage(type, msg, filename, downloadBytes, Updatetype);
                }
                Sys.UI.DomElement.removeCssClass($get('dvUploader'), 'StartUpload');
            }
            //Set transparancy 100% to the frame and upload button

            //Refresh uploaded files list.
        }



        function fndownload(sender) {

            //$("#loader").show();
            $("#divIframeReport")[0].innerHTML = "<div><img valign='middle' src='../Images/preloader_18.gif' alt='loading gif' />Please Wait</div>";
            setTimeout(function () {
                $("#divIframeReport")[0].innerHTML = ""
            }, 5000)
            $("#cphRight_hdnfilesetid").val($(sender).attr('filesetid'));
            $("#cphRight_hdnfilesettype").val($(sender).attr('filetype'));
            $("#cphRight_btndownload").click();
        }

        function fnDownloadSampleFile() {
            var drcpType = $("input[name='rdodrcp']:checked").val();
            var iURL = "SampleFile/" + $("#cphRight_hdnFileName").val().split('.')[0] + "_yyyyMMdd.xlsx";
            if ($("#cphRight_hdnfilesettype").val() == "1") {
                if (drcpType == 1) {
                    iURL = "SampleFile/DRCP/New/" + $("#cphRight_hdnFileName").val().split('.')[0] + "_yyyyMMdd.xlsx";
                }
                else if (drcpType == 2) {
                    iURL = "SampleFile/DRCP/Old/" + $("#cphRight_hdnFileName").val().split('.')[0] + "_yyyyMMdd.xlsx";
                } else {
                    iURL = "SampleFile/DRCP/Swing/" + $("#cphRight_hdnFileName").val().split('.')[0] + "_yyyyMMdd.xlsx";
                }
            } else if ($("#cphRight_hdnfilesettype").val() == "5") {
                var sVal = $("#cphRight_ddlBranch").val();
                if (sVal.split("-")[0] == 0) {
                    alert("Kindly Select Branch First!!");
                    $("#cphRight_ddlBranch").focus();
                    return false;
                }
                if (sVal.split("-")[2] == 2) {
                    iURL = "SampleFile/LeapCCR/" + $("#cphRight_hdnFileName").val().split('.')[0] + "_yyyyMMdd.xlsx";
                } else {
                    iURL = "SampleFile/SwingCCR/" + $("#cphRight_hdnFileName").val().split('.')[0] + "_yyyyMMdd.xlsx";
                }
            }

            window.open(iURL, "_blank");
        }
        function validatedate(date) {
            date = date.match(/([12]\d{3}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01]))/);
            if (date === null) {
                return false; // if match failed
            }

            return true;
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
    <div style="margin: 7px 100px; border: 1px solid #23aed8;" id="divMain">
        <div id="divHeaderOne" style="padding-bottom: 12px; background: #ffffff; margin-left: 0px; width: 100%;">
            <div id="tdFilelbl" style="width: 100%; padding-left: 10px; text-transform: uppercase; font-family: Verdana; color: #333333" class="ContainerHeader">
                <table style="width: 100%">
                    <tr>
                        <td runat="server" style="text-align: left; padding: 0px; font-size: 12.5pt;font-weight:bold" id="tdHeader">>> Upload Swing DRCP
                        </td>
                    </tr>
                </table>
            </div>
            <div style="padding: 5px;">
                <div style="display: inline-block; width: 49%">
                    <fieldset style="border: 1px solid #e5e5e5; padding: 5px">
                        <legend style="background: #fff; padding: 0 10px; margin-left: 20px; width: auto; border: 0; margin-bottom: 0px;font-size:18px">Journey Plan
                        </legend>
                        <table style="width: 100%">
                            <tr>
                                <td>File Naming Convention</td>
                                <td style="width: 2%">:</td>
                                <td>SUBD_JourneyPlan_yyyyMMdd.xls / .xlsx / .xlsb</td>
                            </tr>
                            <tr>
                                <td>Sample File</td>
                                <td>:</td>
                                <td><a href="SampleFile/SUBD/SUBD_JourneyPlan_yyyyMMdd.xlsx" target="_blank" style="color: blue; text-decoration: underline">SUBD_JourneyPlan_yyyyMMdd.xlsx</a></td>
                            </tr>

                        </table>
                    </fieldset>
                </div>
                <div style="display: inline-block; width: 49%">
                    <fieldset style="border: 1px solid #e5e5e5; padding: 5px">
                        <legend style="background: #fff; padding: 0 10px; margin-left: 20px; width: auto; border: 0; margin-bottom: 0px;font-size:18px">DRCP
                        </legend>
                        <table style="width: 100%">
                            <tr>
                                <td>File Naming Convention</td>
                                <td style="width: 2%">:</td>
                                <td>SUBD_DRCP_yyyyMMdd.xls / .xlsx / .xlsb</td>
                            </tr>
                            <tr>
                                <td>Sample File</td>
                                <td>:</td>
                                <td><a href="SampleFile/SUBD/SUBD_DRCP_yyyyMMdd.xlsx" target="_blank" style="color: blue; text-decoration: underline">SUBD_DRCP_yyyyMMdd.xlsx</a></td>
                            </tr>

                        </table>
                    </fieldset>
                </div>

            </div>
        </div>
        <div style="margin-top: 0px;">


            <div id="divDRCPPlanBrnWise" runat="server">
                <table style='width: 100%' class='table table-bordered table-sm'>
                    <tbody>
                        <tr style="display: none" id="trSite" runat="server">
                            <td>SITE</td>
                            <td style="text-align: center">:</td>
                            <td colspan="3">
                                <asp:DropDownList runat="server" ID="ddlSite" Style="width: 190px"></asp:DropDownList>
                            </td>
                        </tr>
                        <tr>
                            <td>Journey Plan</td>
                            <td style="text-align: center">:</td>
                            <td>
                                <input type="file" id="file1" name="file1" filesettype="1" />
                            </td>
                            <td rowspan="2" style="width: 50%" id="tdStatus"></td>
                            <td rowspan="2" style="padding: 6px; text-align: center">
                                <input type="button" value="Upload" onclick="fnUploadFiles()" class="btn btn-primary btn-lg" />
                            </td>
                        </tr>
                        <tr>
                            <td>DRCP</td>
                            <td style="text-align: center">:</td>
                            <td>
                                <input type="file" id="file2" name="file2" filesettype="2" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <table class="ContainerWrapper" border="0" cellpadding="2" cellspacing="0" width="100%">
                <tr class="ContainerHeader">
                    <td>List of uploaded files
                    </td>
                </tr>
                <tr>
                    <td class="ContainerMargin">
                        <asp:UpdatePanel runat="server" ID="upFiles" UpdateMode="Conditional">
                            <ContentTemplate>
                                <asp:HiddenField ID="hdRefereshGrid" runat="server" OnValueChanged="hdRefereshGrid_ValueChanged" />
                                <table class="Container" cellpadding="0" cellspacing="0" width="100%" border="0">
                                    <tr class="GridHeader">
                                        <td class="Separator" style="width: 5%;" align="right"></td>
                                        <td class="Separator" style="width: 55%">File
                                        </td>
                                        <td class="Separator" style="width: 20%" align="center">Uploaded Date
                                        </td>
                                        <td class="Separator" style="width: 20%;padding-right:40px" align="right">Size
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="4">
                                            <div style="height: 180px; overflow: auto;">
                                                <asp:GridView DataKeyNames="Name" ID="gvNewFiles" AllowPaging="false" runat="server"
                                                    PagerStyle-HorizontalAlign="Center" AutoGenerateColumns="false" Width="100%"
                                                    CellPadding="0" BorderWidth="0" GridLines="None" ShowHeader="false" OnRowCommand="gvNewFiles_RowCommand"
                                                    OnRowDataBound="gvNewFiles_RowDataBound">
                                                    <AlternatingRowStyle CssClass="GridAlternate" />
                                                    <RowStyle CssClass="GridNormalRow" />
                                                    <Columns>
                                                        <asp:TemplateField ItemStyle-HorizontalAlign="Right">
                                                            <ItemTemplate>
                                                                <table cellpadding="0" cellspacing="0" width="100%" border="0">
                                                                    <tr>
                                                                        <td class="GridNumberRow" style="width: 5%;" align="center">
                                                                            <%# string.Format("{0}",Container.DataItemIndex + 1 +".") %>
                                                                        </td>
                                                                        <td style="width: 55%; padding-left: 2px;" align="left">
                                                                            <asp:LinkButton ToolTip='<%# String.Format("Download {0}",Eval("Name")) %>' runat="server"
                                                                                ID="lbtnFiles" Text='<%#Eval("Name") %>' CommandArgument='<%#Eval("Name") %>'
                                                                                CommandName="downloadFile"></asp:LinkButton>
                                                                        </td>
                                                                        <td style="width: 20%" align="center">
                                                                            <%#Eval("UploadDate")%>
                                                                        </td>
                                                                        <td style="width: 20%;padding-right:20px" align="right">
                                                                            <%#Eval("ConvertedSize")%>
                                                                        </td>

                                                                    </tr>
                                                                </table>
                                                            </ItemTemplate>
                                                        </asp:TemplateField>
                                                    </Columns>
                                                    <EmptyDataRowStyle CssClass="GridEmptyRow" />
                                                    <EmptyDataTemplate>
                                                        <span>No file uploaded</span>
                                                    </EmptyDataTemplate>
                                                </asp:GridView>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="GridFooter">
                                        <td colspan="5">
                                            <div style="float: left">
                                                Total Files:
                                                    <%= gvNewFiles.Rows.Count  %>
                                            </div>
                                            <div style="float: right;padding-right:33px">
                                                Total Size:
                                                    <asp:Label runat="server" ID="lblTotalSize" Text="0 K"></asp:Label>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </ContentTemplate>
                            <Triggers>
                                <asp:PostBackTrigger ControlID="gvNewFiles" />
                            </Triggers>
                        </asp:UpdatePanel>
                    </td>
                </tr>
            </table>
        </div>

    </div>

    <div id="divRoute" style="display: none"></div>
    <input type="hidden" runat="server" id="hdnfilesetid" value="" />
    <input type="hidden" runat="server" id="hdnfilesettype" value="" />
    <input type="hidden" runat="server" id="hdnFileName" value="" />
    <input type="hidden" runat="server" id="hdnRoleId" value="0" />
    <input type="hidden" runat="server" id="hdnNodeId" value="0" />
    <input type="hidden" runat="server" id="hdnNodeTypes" value="0" />
    <input type="hidden" runat="server" id="hdnLoginId" value="0" />
    <input type="hidden" runat="server" id="hdnDate" value="0" />
    <asp:Button ID="btnRouteCalenderDownload" runat="server" OnClick="btnRouteCalenderDownload_Click" Style="visibility: hidden;" />
    <asp:Button ID="btndownload" runat="server" OnClick="btnDownload_Click" Style="display: none" />
</asp:Content>
