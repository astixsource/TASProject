<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" CodeFile="frmInit_SBDUpload.aspx.cs" Inherits="frmInit_SBDUpload" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">

    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="../scripts/jquery-1.11.3.js"></script>
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <link href="../CSS/ThemeBlue.css" rel="Stylesheet" type="text/css" />
    <link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/Multiselect/jquery-ui.css" rel="stylesheet" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <style>

         .ui-datepicker .ui-datepicker-title {
    margin: 0 2.3em;
    line-height: 1.8em;
    text-align: center;
    color: black;
}
         .ui-datepicker-calendar {
    display: none;
    }
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
        tr.clsHighlighted > td{
            background-color:#ffaaaa !important;
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
        .progress {
    height: 20px;
    margin-bottom: 5px;
    overflow: hidden;
    background-color: #f5f5f5;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 2px rgb(0 0 0 / 10%);
    box-shadow: inset 0 1px 2px rgb(0 0 0 / 10%);
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

                $("#divHeaderOne").css("width", $("#divMain")[0].clientWidth-1);
                $("#tdFilelbl").css("width", $("#divMain")[0].clientWidth);
                $("#divbtns").css("width", $("#divMain")[0].clientWidth + 4);

                // $("#divHeadercont").css("width", $("#divMainData")[0].clientWidth);
            }

        }
        $(document).ready(function () {
            $("#lnksbf").hide();
            $("#lnkRetailer").hide();

            var d = new Date();
            $("#txtMonth").val(d.localeFormat('yyyyMM'));
            d.setMonth(d.getMonth() - 2);
            $("#txtMonth").datepicker({
                minDate: d,
                changeMonth: true,
                changeYear: true,
                showButtonPanel: true,
                dateFormat: 'yymm',
                onClose: function (dateText, inst) {
                    $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
                }
            })
           fntblFixedHeader();
            $('#fraLeft').load(function () {
                $("#fraLeft").contents().find("#DvMenu").find("li").removeClass("activemenu");
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='30']").addClass("activemenu");
                $("#fraLeft")[0].height = $(window).height() - ($("#dvBanner").height() + $(".footer").height());
            });
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
                fntblFixedHeader();
            });
            $('input[type=file]').bind("change", function () {
             
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

                    //if (selectedFile.split("_").length != 2) {
                    //    $(this).val('');
                    //    alert("Invalid File Name Format, kindly upload correct file format!!");
                    //    return false;
                    //}

                    //if (selectedFile.split("_")[0].toLowerCase() != $(this).closest('td').prev('td').text().toLowerCase().replace(" ", "")) {
                    //    $(this).val('');
                    //    alert("Invalid File name, kindly upload correct file name");
                    //    return false;
                    //}

                    //var branchcode = $(this).closest("tr").find("td").eq(1).html().split("[")[1].replace("]", "");
                    //if (branchcode != selectedFile.split("_")[1]) {
                    //    $(this).val('');
                    //    alert("Incorrect Branch DRCP file,kindly upload correct branch DRCP only!");
                    //    return false;
                    //}
                    //if (validatedate(selectedFile.split("_")[1].split(".")[0]) == false) {
                    //    $(this).val('');
                    //    alert("Date Format not corrent in file name, kindly upload correct date format!!");
                    //    return false;
                    //}
                    if ($(this).val() != "") {
                        $(this).attr("flgUpload", "0");
                    }

                    if (!this.files) return;

                    var strFiles = "";
                    $(this).closest("td").next().html("");
                    var files = this.files;
                    for (var i = 0; i < files.length; i++) {
                        var f = files[i];

                        strFiles += f.name + "<br/>";

                    }
                    $(this).closest("td").find("div#divSelectedFiles").html(strFiles);
                }
            });
        });
        function progressHandler(event) {
            $("#loaded_n_total").html("Uploaded " + event.loaded + " bytes of " + event.total);
            var percent = (event.loaded / event.total) * 100;
            $("#progressBar").val(Math.round(percent));
            $("#status").html(Math.round(percent) + "% uploaded... please wait");
        }

        function completeHandler(event) {
            counter++
            $("#status").html(counter + " " + event.target.responseText);
        }

        function errorHandler(event) {
            $("#status").html("Upload Failed");
        }

        function abortHandler(event) {
            $("#status").html("Upload Aborted");
        }
        function OnError(xhr, errorType, exception) {
            //$("#cphRight_divRptFinelhead").find("table[id='tblstatus']").append("<tr><td style='color:#ff0000;'>Error in uploading due to connection failure, please try again</td></tr>");
            $('#progressBar').css("display", "none");
            //$('#dvProgressPrcent').html('0%');
            //$("#cphRight_btnUpload").removeAttr('disabled');
            //$("#cphRight_btnUpload").val('Upload File');
        }
        function trackUploadProgress(e) {
            if (e.lengthComputable) {
                currentProgress = (e.loaded / e.total) * 100; // Amount uploaded in percent
                $('#progressBar').width(currentProgress + '%');
                $('#dvProgressPrcent').html(currentProgress.toFixed(2) + '%');//dvProgressPrcent
                //if (currentProgress == 100)
                // $("#divsaving")[0].innerHTML = "<div><img valign='middle' src='../Images/preloader_18.gif' alt='loading gif' />Saving Files...Please Wait</div>";
            }
        }

        var successAll = true; var SuccessCount = 0; var TotalFileCount = 0; var groupids = ""; var ProcessCount = 0;
        function fnUploadFiles() {
            var files = $('input[type=file][flgUpload="0"]');
            if (files.length == 0) {
                alert("Kindly select file first!!");
                return false
            }

            var sconfirm = confirm("Are you sure want to upload selected file for selected month (" + $("#txtMonth").val() + ")");
            if (sconfirm == false) {
                return false;
            }
            $("#dvFadeForProcessing").show();
            PageMethods.fnTruncateSBDTempTables(function (result) {
                $("#dvFadeForProcessing").hide();
                if (result.split("^")[0] != -1) {
                    var IsValidFiles = true;
                    successAll = false;
                    $(files).each(function () {

                        var ele_name = $(this).attr('name');
                        var files_name = $('input[type=file][name="' + ele_name + '"]');
                        $(this).closest("td").next().html("");
                        $(files_name).each(function () {
                            $(this).closest("td").next().css("color", "");
                            if ($(this).val() == "") {
                                $(this).closest("td").next().css("color", "#ff0000").text("File is mandatory to upload, if atleast one selected in a group");
                                IsValidFiles = false;
                            }
                        });

                        TotalFileCount += $(this).get(0).files.length;
                        /* */
                        // $('input[type=file][flgUpload="1"]');
                    });

                    if (IsValidFiles == false)
                        return false;

                    $("#cphRight_divRptFinelhead").css("color", "blue");
                    $("#cphRight_divRptFinelhead").html("<table id='tblstatus' style='width:100%;text-align:center;'></table>");
                    $("#btnSave").prop("disabled", true);
                    SuccessCount = 0;
                    ProcessCount = 0;
                    for (var i = 0; i < files.length; i++) {
                        if ($("#" + files[i].id).val() == "") {
                            continue;
                        }
                        groupids += $("#" + files[i].id).closest("tr").attr("groupid") + ",";
                        $("#" + files[i].id).closest("td").next().html("");
                        var sfiles = $("#" + files[i].id).get(0).files;
                        var LoginId = $("#cphRight_hdnLoginId").val();
                        var filesettype = $("#" + files[i].id).siblings('input[type=hidden]').val();
                        for (var f = 0; f < sfiles.length; f++) {
                            var formdata = new FormData();
                            formdata.append("file1", sfiles[f], sfiles[f].name + '#' + filesettype);
                            formdata.append("LoginId", LoginId);
                            $("#" + files[i].id).closest("td").next().append('<div class="progress"><div class="progress-bar progress-bar-warning" role="progressbar" id="progressbar' + f + '" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="text-align:left">' + sfiles[f].name + ' </div></div>');
                            postFile(formdata, files[i].id, f, sfiles[f].name);
                        }
                    }    
                } else {
                    alert("Error-" + result.split("^")[1]);
                }
            }, function (result) {
                    $("#dvFadeForProcessing").hide();
                    alert("Error-" + result._message);
            });
        }


        function finalupload()
        {
            var sconfirm = confirm("Are you sure want to process?");
            if (sconfirm == false) {
                return false;
            }
            $("#dvFadeForProcessing").show();
           //<tr><td>File is being uploading ...</td></tr>
            var YearMonth = $("#txtMonth").val();
           // $("#divsaving")[0].innerHTML = "<div><img valign='middle' src='../Images/preloader_18.gif' alt='loading gif' />Processing Data...Please Wait</div>";
            PageMethods.fnFinalSaving(YearMonth, finalsuccess, finalfalied);
        }

        function finalsuccess(res) {
            $("#dvFadeForProcessing").hide();
            if (res.split("^")[0] == "0") {
                alert(res.split("^")[1]);
                $("#btnSubmit").hide();
                $("#divsaving")[0].innerHTML = "<div>" + res.split("^")[1] + "</div>";
                $("#btnSave").prop("disabled", false);
                var files = $('input[type=file][flgUpload="0"]');
                $(files).each(function () {
                    $(this).closest("td").next().html("");
                });
            } else {
                alert("Error-" + res.split("^")[1]);
            }
        }

        function finalfalied(res) {
            $("#dvFadeForProcessing").hide();
            alert("Error-" + res_.message);
            //var files = $('input[type=file][flgUpload="1"]');
            //$(files).each(function () {
            //    $(this).closest("td").next().html("");
            //});
            //$("#btnSave").prop("disabled", false);
            //$("#divsaving")[0].innerHTML = "<div style='color:#ff0000;'>Error in uploading due to connection failure, please try again</div>";
        }


        function postFile(data, id, file_count,filename) {

            // Make the Ajax call
            $.ajax({
                url: "FileInitSBDUploadHandler.ashx",
                type: 'POST',
                data: data,
                contentType: false,
                processData: false,
                xhr: function () {
                    var req = $.ajaxSettings.xhr();
                    if (req.upload) {
                        // Setup event listener for any progress info
                        // returned from the Web API
                        var percent = 0;
                        req.upload.addEventListener('progress', function (e) {
                            if (e.lengthComputable) {
                                // Update the progress bar
                                percent = Math.ceil(event.loaded / event.total * 100);
                                //updateProgressBar(e, id);
                            }
                            
                            $("#" + id).closest("td").next().find('#progressbar' + file_count).text(filename + ' ' + percent + '% , please wait..');
                            $("#" + id).closest("td").next().find('#progressbar' + file_count).attr('aria-valuenow', percent);
                            $("#" + id).closest("td").next().find('#progressbar' + file_count).css("width", percent + "%");
                        }, false);
                    }
                    return req;
                },
                success: function (res, status) {
                    if (status == 'success') {
                        percent = 0;
                        $("#" + id).closest("td").next().find('#progressbar' + file_count).removeClass("progress-bar-warning");
                        $("#" + id).closest("td").next().find('#progressbar' + file_count).addClass("progress-bar-success");
                    }
                },
                error: function (res) {

                    $("#" + id).closest("td").next().find('#progressbar' + file_count).removeClass("progress-bar-warning");
                    $("#" + id).closest("td").next().find('#progressbar' + file_count).addClass("progress-bar-danger");
                }    
            }).done(function (response) {
                fnSuccess(response, id, file_count);
            }).fail(function (error) {
                fnError(response, id, file_count);
            });
        }
        function updateProgressBar(e, id) {
            // Calculate current percentage
            var percentage = (e.loaded * 100) / e.total;

            // Modify the progress bar
            $("#" + id).closest("td").next().html(Math.round(percentage) + "% uploaded... please wait");

            // Are we done?
            if (percentage >= 100) {
                $("#" + id).closest("td").next().html(100 + "% uploaded but wait for further process..");
            }
        }
        function fnSuccess(response, id, file_count) {
            ProcessCount++;
            if (response.split("^")[0] == "0" || response.split("^")[0] == "2") {
                SuccessCount++;
                //$("#" + id).closest("td").next().find('#progressbar' + file_count).html(response.split("^")[1]);
                var text = $("#" + id).closest("td").next().find('#progressbar' + file_count).text();
                text =text.replace(", please wait..", " uploaded successfully");
                $("#" + id).closest("td").next().find('#progressbar' + file_count).text(text);
                $("#" + id).closest("td").next().find('#progressbar' + file_count).removeClass("progress-bar-warning");
                $("#" + id).closest("td").next().find('#progressbar' + file_count).addClass("progress-bar-success");
               // $("#" + id).attr("flgUpload", "0");
              //  var d = new Date('<%=DateTime.Now%>');
              //  $("#" + id).closest("tr").find("td[iden='clslastupd']").html(d.localeFormat("dd-MMM-yy hh:mm tt"));
               // $("#" + id).closest("tr").closest("tr").find("td").eq(4).html("<a href='###' style='font-size:9pt;color:blue;text-decoration:underline' onclick='fnDownloadRouteCalendar(this,1)'>Download<a>");
            } else {
                //$("#" + id).attr("flgUpload", "0");
               //$("#" + id).val("");
                $("#" + id).closest("td").next().find('#progressbar' + file_count).html(response.split("^")[1]);
                $("#" + id).closest("td").next().find('#progressbar' + file_count).removeClass("progress-bar-warning");
                $("#" + id).closest("td").next().find('#progressbar' + file_count).addClass("progress-bar-danger");
            }

            if (ProcessCount >= TotalFileCount) {
               $("#btnSave").prop("disabled", false);
            }
            $("#divsaving").html("SuccessCount=" + SuccessCount + " TotalFileCount=" + TotalFileCount);
            if (SuccessCount == TotalFileCount)
            {

                $("#btnSubmit").show();
            }
        }
        function fnError(response, id, file_count) {
            //$("#" + id).val("");
            $("#" + id).closest("td").next().html("Error-" + response);

            $("#" + id).closest("td").next().find('#progressbar' + file_count).html("Error-" + response);
            $("#" + id).closest("td").next().find('#progressbar' + file_count).removeClass("progress-bar-warning");
            $("#" + id).closest("td").next().find('#progressbar' + file_count).addClass("progress-bar-danger");
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
                if (parseInt(val1) ==0 || parseInt(val2)==0) {
                    alert("Kindly select Route No first!");
                    // $(sender).val(Oldval);
                    trs.eq(i).addClass("clsHighlighted");
                    return false;
                }
                if (parseInt(val1) >parseInt(val2)) {
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


       

        function handleFileSelect(e) {
            if (!e.files) return;

           var strFiles = "";
            $(e).closest("td").next().html("");
            var files = e.files;
            for (var i = 0; i < files.length; i++) {
                var f = files[i];

                strFiles += f.name + "<br/>";

            }
            $(e).closest("td").find("div#divSelectedFiles").html(strFiles);
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
    <div style="margin: 7px 80px; border: 1px solid #23aed8;" id="divMain">
        <div id="divHeaderOne" style="padding-bottom:12px;background:#ffffff;margin-left: 0px; position: fixed; z-index: 1; width: 83%;">
            <div id="tdFilelbl" style="width: 100%; padding-left: 10px; text-transform: uppercase; font-family: Verdana; color: #333333" class="ContainerHeader">
                <table style="width: 100%">
                    <tr>
                        <td runat="server" style="text-align: left; padding: 0px; font-size: 15px" id="tdHeader">>> Upload Swing DRCP
                        </td>
                        <td style="text-align: right; width: 25%; padding: 0px;display:none">
                            <div class="input-group" style="height: 20px">
                                <span class="input-group-addon" style="padding: 5px 8px;font-size:8pt"><i class="glyphicon glyphicon-search"></i></span>
                                <input type="text" style="height: 23px" class="form-control" placeholder="Search" name="search" id="txtFindDbr">
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div style="margin:10px 5px">
                Select Month : <input type="text" id="txtMonth" readonly="readonly" />
            </div>
            <div class="help-block" style="margin:0px 5px">
        <em style="font-size:14px">Please upload excel document(.xlsx) format only for selected month.</em>                
    </div>   
        </div>
        <div style="margin-top: 90px;">
        <div id="divfixedHeader" style="height:39px;margin-top: 2px; margin-left: 0px; position: fixed; z-index: 1"></div>
        <div id="divDRCPPlanBrnWise" runat="server" style="margin-top: 0px">
        </div>
            </div>

    </div>
     <div id="divRptFinel" style="padding: 0 5px; " class="text-center">
            
        <div id="divRptFinelhead" style="padding-bottom: 10px; font-size: 13px; color:#0000ff; width:100%;margin:0 auto;" runat="server"></div>
  </div> 
    <div id="divbtns" style="bottom: 0px; position: fixed; margin: 0px 80px; width: 100%; background-color: lightgray; padding: 3px" class="text-center">
        <table style="width:100%">
            <tr>
                <td style="width:20%">
                    <input type="button" value="Upload" id="btnSave" onclick="fnUploadFiles()" class="btn btn-primary" />
                    <input type="button" value="Process" id="btnSubmit" onclick="finalupload()" class="btn btn-primary" style="display:none;margin-left:10px" />
                </td><td>
                     <div style="width:100%" id="divsaving"></div>
                     </td>
            </tr>
        </table>
        
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

