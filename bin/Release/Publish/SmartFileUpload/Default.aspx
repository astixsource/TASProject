<%@ Page Title="" Language="C#" Async="true" MasterPageFile="~/site.master" AutoEventWireup="true" EnableEventValidation="false" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link rel="stylesheet" href="../css/bootstrap.min.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="../scripts/jquery-1.11.3.js"></script>
    <link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />
    <script src="../scripts/jquery-ui.js"></script>
    <link href="../styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../StylesTreeViewOrder/js/custom-script.js" type="text/javascript"></script>
    <link href="../CSS/ThemeBlue.css" rel="Stylesheet" type="text/css" />
    <style>
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
    </style>
    <script>
        $(document).ready(function () {
            $("#lnksbf").hide();
            $("#lnkRetailer").hide();
            $("#lnkActivesbf").hide();
            

            if ($("#cphRight_hdnfilesettype").val() == "1") {
                if ($("#cphRight_hdnflgDRCPUploadType").val() == "2") {
                    $("#cphRight_trDRCPType").css("display", "none");
                } else {
                    $("#cphRight_trDRCPType").css("display", "table-row");
                }
            }
            if ($("#cphRight_hdnfilesettype").val() == "2") {
                $("#lnksbf").show();
            }
            if ($("#cphRight_hdnfilesettype").val() == "4") {
                $("#lnkRetailer").show();
            }
            if ($("#cphRight_hdnfilesettype").val() == "5") {
                fnSetFileName();
            }
            if ($("#cphRight_hdnfilesettype").val() == "19") {
                $("#lnkActivesbf").show();
                $("#cphRight_ddlSite").closest("td").hide();
                $("#cphRight_ddlSite").closest("td").prev().hide();
            }
            $('#fraLeft').load(function () {
                $("#fraLeft").contents().find("#DvMenu").find("li").removeClass("activemenu");
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='" + $("#cphRight_hdnMnId").val() + "']").addClass("activemenu");
                $("#fraLeft")[0].height = $(window).height() - ($("#dvBanner").height() + $(".footer").height());
            });
        });
    </script>
    <script type="text/javascript">
        var validFilesTypes = ["xlsx"];
    function ValidateFile() {
        var path = fileUpload.value
        var ext = path.substring(path.lastIndexOf(".") + 1, path.length).toLowerCase();
        var isValidFile = false;
        for (var i = 0; i < validFilesTypes.length; i++) {
            if (ext == validFilesTypes[i]) {
                isValidFile = true;
                break;
            }
        }
        if (!isValidFile) {
            onComplete(MessageStatus.Warning, 'Incorrect file extension,kindly upload xlsx file only!!', '', '0 of 0 Bytes', '', '', '');
        }
        return isValidFile;
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
        function pageLoad() {
            $addHandler($get('upload'), 'click', onUploadClick);
        }

        //Register the form
        function register(form, fileUpload) {
            this.form = form;
            this.fileUpload = fileUpload;
        }

        //Start upload process
        function onUploadClick() {
            var flgType = $("#cphRight_hdnflg").val();
            $("#cphRight_divRptFinelhead").html("");
            var drcpType = $("input[name='rdodrcp']:checked").val();
            if ($("#cphRight_ddlSite option").length > 0) {
                var sval = $("#cphRight_ddlSite option:selected").val();
                SiteNodeId = sval.split("-")[0];
                SiteNodeType = sval.split("-")[1];
            } else {
                var strIds = $("#cphRight_hdnNodeTypes").val();
                SiteNodeId = strIds.split("|")[0];
                SiteNodeType = strIds.split("|")[1];
            }
            var RoleId = $("#cphRight_hdnRoleId").val();
            if ($("#cphRight_hdnfilesettype").val() != "3") {
                if (RoleId == "4" || RoleId == "5") {
                    if (parseInt(SiteNodeId) == 0) {
                        onComplete(MessageStatus.Error, 'Kindly select site first before click on upload button!!', '', '0 of 0 Bytes', '', '', '');
                        $("#cphRight_ddlSite").focus();
                        return false;
                    }
                }
                if ($("#cphRight_hdnfilesettype").val() == "1") {
                    $("#cphRight_hdndrcpType").val(drcpType);
                } if ($("#cphRight_hdnfilesettype").val() == "5") {
                    
                    drcpType = $("#cphRight_hdnflgDRCPUploadType").val();
                    $("#cphRight_hdndrcpType").val(drcpType);
                    
                }
            }
            if (fileUpload.value.length > 0) {
                var selectedFile = fileUpload.value.split('\\');
                var sFilename = selectedFile[selectedFile.length - 1];
                var sysFilename = $("#cphRight_hdnFileName").val();
                var dtformat = "";
                var fExtention = sFilename.toLowerCase().split(".")[sFilename.toLowerCase().split(".").length - 1];
                if ($("#cphRight_hdnfilesettype").val() == "1" || $("#cphRight_hdnfilesettype").val() == "4" || $("#cphRight_hdnfilesettype").val() == "5" || $("#cphRight_hdnfilesettype").val() == "6" || $("#cphRight_hdnfilesettype").val() == "17") {
                    var totlen = flgType == "1" ? 2 : 3;
                    if (sFilename.split("_").length != totlen) {
                        onComplete(MessageStatus.Warning, 'Invalid File naming convention,kindly upload correct file format as shown in sample file!!', '', '0 of 0 Bytes', '', '', '');
                        return false;
                    }
                    if (flgType == 1) {
                        sysFilename = sysFilename.split(".")[0];
                        dtformat = sFilename.split("_")[1];
                        sFilename = sFilename.split("_")[0];
                    } else {
                        sysFilename = sysFilename.split(".")[0];
                        sFilename = sFilename.split(".")[0];
                        dtformat = sFilename.split("_")[2];
                        sFilename = sFilename.split("_")[0] + "_" + sFilename.split("_")[1];
                    }
                }
                else if ($("#cphRight_hdnfilesettype").val() == "2" || $("#cphRight_hdnfilesettype").val() == "3" || $("#cphRight_hdnfilesettype").val() == "19") {
                    if (sFilename.split("_").length != 3) {
                        onComplete(MessageStatus.Warning, 'Invalid File naming convention,kindly upload correct file format as shown in sample file!!', '', '0 of 0 Bytes', '', '', '');
                        return false;
                    }
                    sysFilename = sysFilename.split(".")[0];
                    sFilename = sFilename.split(".")[0];
                    dtformat = sFilename.split("_")[2];
                    sFilename = sFilename.split("_")[0] + "_" + sFilename.split("_")[1];
                }

                if (sFilename.toLowerCase() != sysFilename.toLowerCase()) {
                    onComplete(MessageStatus.Warning, 'Invalid File naming convention,kindly upload correct file format as shown in sample file!!', '', '0 of 0 Bytes', '', '', '');
                    return false;
                }

                if (fExtention != "xlsx") {// && fExtention != "xls"
                    onComplete(MessageStatus.Warning, 'Incorrect file extension,kindly upload xlsx file only!!', '', '0 of 0 Bytes', '', '', '');
                    return false;
                }

                if (validatedate(dtformat) == false) {
                    onComplete(MessageStatus.Warning, 'Invalid File naming convention,kindly upload correct file format as shown in sample file!!', '', '0 of 0 Bytes', '', '', '');
                    return false;
                }
                var filename = fileExists();
                if (filename == '') {
                    //Update the message
                    updateMessage(MessageStatus.Information, 'File uploading,please wait ...', '', '0 of 0 Bytes');
                    //Submit the form containing the fileupload control
                    var $input = $("<input />").attr("type", "hidden")
                .attr("name", "SiteNodeId")
                .attr("id", "SiteNodeId")
                .attr("value", SiteNodeId);
                    $(form).find("input[id='SiteNodeId']").remove();
                    $(form).append($input);

                    var $input = $("<input />").attr("type", "hidden")
                .attr("name", "SiteNodeType")
                        .attr("id", "SiteNodeType")
                .attr("value", SiteNodeType);
                    $(form).find("input[id='SiteNodeType']").remove();
                    $(form).append($input);

                    var $input = $("<input />").attr("type", "hidden")
               .attr("name", "drcpType")
                         .attr("id", "drcpType")
               .attr("value", drcpType);
                    $(form).find("input[id='drcpType']").remove();
                    $(form).append($input);

                    var $input = $("<input />").attr("type", "hidden")
              .attr("name", "flgType")
                        .attr("id", "flgType")
              .attr("value", $("#cphRight_hdnflg").val());
                    $(form).find("input[id='flgType']").remove();
                    $(form).append($input);

                    form.submit();
                    //Set transparancy 20% to the frame and upload button
                    Sys.UI.DomElement.addCssClass($get('dvUploader'), 'StartUpload');
                    //Initialize progressbar
                    setProgress(0);
                    //Start polling to check on the progress ...
                   // startProgress();
                    intervalID = window.setInterval(function () {
                        PageMethods.GetUploadStatus(function (result) {
                            if (result) {
                                setProgress(result.percentComplete);
                                //Upadte the message every 500 milisecond
                                updateMessage(MessageStatus.Information, result.message, result.fileName, result.downloadBytes, result.Updatetype);
                                //if (result.percentComplete == 100 && result.) {
                                //    //clear the interval
                                //    window.clearInterval(intervalID);
                                //    clearTimeout(subintervalID);
                                //}
                            }
                        });
                    },200);
                }
                else
                    onComplete(MessageStatus.Error, "File name '<b>" + filename + "'</b> already exists in the list.", '', '0 of 0 Bytes', '', '', '', 0);
            }
            else
                onComplete(MessageStatus.Warning, 'You need to select a file.', '', '0 of 0 Bytes', '', '', '', 0);
        }

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
            refreshFileList('<%=hdRefereshGrid.ClientID %>');
        }

        //Update message based on status
        function updateMessage(type, message, filename, downloadBytes, Updatetype) {
            var _className = MessageCSS.Error;
            var _messageTemplate = $get('tblMessage');
            var _icon = $get('dvIcon');
            _icon.innerHTML = message;
            if (Updatetype == 0) {
                $($get('dvDownload')).closest("td").prev().html("Uploaded bytes");
            }
            else if (Updatetype == 1) {
                $($get('dvDownload')).closest("td").prev().html("Processed rows");
            }
            else {
                $($get('dvDownload')).closest("td").prev().html("Loaded rows");
            }
            $get('dvDownload').innerHTML = downloadBytes;
            $get('dvFileName').innerHTML = filename;
            switch (type) {
                case MessageStatus.Success:
                    _className = MessageCSS.Success;
                    break;
                case MessageStatus.Information:
                    _className = MessageCSS.Information;
                    break;
                case MessageStatus.Warning:
                    _className = MessageCSS.Warning;
                    break;
                default:
                    _className = MessageCSS.Error;
                    break;
            }
            _icon.className = '';
            _messageTemplate.className = '';
            Sys.UI.DomElement.addCssClass(_icon, _className);
            Sys.UI.DomElement.addCssClass(_messageTemplate, _className);
        }

        //Refresh uploaded file list when new file was uploaded successfully
        function refreshFileList(hiddenFieldID) {
            var hiddenField = $get(hiddenFieldID);
            if (hiddenField) {
                hiddenField.value = (new Date()).getTime();
                __doPostBack(hiddenFieldID, '');
            }
        }

        //Set progressbar based on completion value
        function setProgress(completed) {
            $get('dvProgressPrcent').innerHTML = completed + '%';
            $get('dvProgress').style.width = completed + '%';
        }

        //Display mouse over and out effect of file upload list
        function eventMouseOver(_this) {
            previousClass = _this.className;
            _this.className = 'GridHoverRow';
        }
        function eventMouseOut(_this) {
            _this.className = previousClass;
        }

        //This will call every 200 milisecnd and update the progress based on value
        function startProgress() {
            var increase = $get('dvProgressPrcent').innerHTML.replace('%', '');
            increase = Number(increase) + 1;
            if (increase <= 100) {
                setProgress(increase);
                subintervalID = setTimeout("startProgress()", 200);
            }
            else {
                window.clearInterval(subintervalID);
                clearTimeout(subintervalID);
            }
        }

        //This will check whether will was already exist on the server, 
        //if file was already exists it will return file name else empty string.
        function fileExists() {
            var selectedFile = fileUpload.value.split('\\');
            var file = $get('cphRight_gvNewFiles').getElementsByTagName('a');
            for (var f = 0; f < file.length; f++) {
                if (file[f].innerHTML == selectedFile[selectedFile.length - 1]) {
                    return file[f].innerHTML;
                }
            }
            return '';
        }

        function fndownload(sender) {

            //$("#loader").show();
            $("#divIframeReport")[0].innerHTML = "<div><img valign='middle' src='../Images/preloader_18.gif' alt='loading gif' />Please Wait</div>";
            setTimeout(function () {
                $("#divIframeReport")[0].innerHTML = ""
            }, 5000)
            $("#cphRight_hdnfilesetid").val($(sender).attr('filesetid'));
            $("#cphRight_hdnfilesettype").val($(sender).attr('filesettype'));
            if ($("#cphRight_hdnfilesettype").val() == "1") {
                var drcpType = $("input[name='rdodrcp']:checked").val();
                $("#cphRight_hdndrcpType").val(drcpType);
            } else{
                $("#cphRight_hdndrcpType").val("0");
            } 
            $("#cphRight_btndownload").click();
        }
        function fnSetFileName() {
            var sVal = $("#cphRight_hdnflgDRCPUploadType").val();
            var str = $("#lnksample").html();
            str = str.split(" ")[0];
            if (sVal == 1) {
                $("#lnksample").html(str + " <span style='color:black;text-decoration:underline'>(Swing)</span>");
            } else if (sVal == 2) {
                $("#lnksample").html(str + " <span style='color:black;text-decoration:underline'>(Leap)</span>");
            }
            
        }
        function fnDownloadSampleFile() {
            var drcpType = $("input[name='rdodrcp']:checked").val();
            var iURL = "SampleFile/" + $("#cphRight_hdnFileName").val().split('.')[0] + "_yyyyMMdd.xlsx";
            if ($("#cphRight_hdnfilesettype").val() == "1") {
                if (drcpType == 2) {
                    iURL = "SampleFile/OldDRCP/" + $("#cphRight_hdnFileName").val().split('.')[0] + "_yyyyMMdd.xlsx";
                }
            }
            else if ($("#cphRight_hdnfilesettype").val() == "6") {
                    iURL = "SampleFile/DRCP/SUBD/" + $("#cphRight_hdnFileName").val().split('.')[0] + "_yyyyMMdd.xlsx";
            }
            else if ($("#cphRight_hdnfilesettype").val() == "5") {
                var sVal = $("#cphRight_hdnflgDRCPUploadType").val();
                if (sVal == 2) {
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
        function fnDownloadSBF() {
            var sval = $("#cphRight_ddlSite option:selected").val();
            SiteNodeId = sval.split("-")[0];
            SiteNodeType = sval.split("-")[1];
            var SiteName = $("#cphRight_ddlSite option:selected").text();
            if (SiteNodeId == 0) {
                alert("Kindly select site first!!!");
                $("#cphRight_ddlSite").focus();
                return false;
            }
            window.open("../frmDownloadExcel.aspx?flg=6&SiteNodeId=" + SiteNodeId + "&SiteNodeType=" + SiteNodeType + "&SiteName=" + SiteName);
        }
        function fnDownloadActiveSBF() {
            
            var strIds = $("#cphRight_hdnNodeTypes").val();
            SiteNodeId = strIds.split("|")[0];
            SiteNodeType = strIds.split("|")[1];

            var SiteName = "";
            
            window.open("../frmDownloadExcel.aspx?flg=12&SiteNodeId=" + SiteNodeId + "&SiteNodeType=" + SiteNodeType + "&SiteName=" + SiteName);
        }

        function fnDownloadRetailer() {
            var brnId = 0;
            var brnType = 0;
            var SiteName = "";
            if ($("#cphRight_ddlSite option").length > 0) {
                var sval = $("#cphRight_ddlSite option:selected").val();
                brnId = sval.split("-")[0];
                brnType = sval.split("-")[1];
                SiteName = $("#cphRight_ddlSite option:selected").text();
            } else {
                var strIds = $("#cphRight_hdnNodeTypes").val();
                brnId = strIds.split("|")[0];
                brnType = strIds.split("|")[1];
            }
            var flgType = $("#cphRight_hdnflg").val();
            window.open("../frmDownloadExcel.aspx?flg=9&BranchNodeId=" + brnId + "&BranchNodeType=" + brnType + "&BranchCode=" + SiteName + "&flgType=" + flgType);
        }
        function fnChangeBranch() {
            fnSetFileName();
        }
        
    </script>


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphLeft" runat="Server">

    <iframe id="fraLeft" name="fraLeft" height="100%" width="100%" scrolling="yes" frameborder="0"
        src='../frmLeftMainTreeView.aspx'></iframe>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphRight" runat="Server">
    <div style="margin:8px 140px;border:1px solid #23aed8;min-height:510px">
        <div id="tdFilelbl" runat="server" style="width:100%;height:24px;padding-left:10px;line-height:23px;text-transform:uppercase;font-family:Verdana;color:#333333;font-size:15px" class="ContainerHeader">
            >> Upload Process
        </div>
        <div>
             <table width="680px" cellpadding="5" cellspacing="5" border="0" style="margin: 5px auto">
        <tr style="display: none" id="trSite" runat="server">
            <td>
                <table style="width:100%">
                    <tr>
                        <td style="padding: 8px 2px"><b style="font-size: 10pt">Site : </b>
                <asp:DropDownList runat="server" ID="ddlSite" Style="width: 190px"></asp:DropDownList>
            </td>
            <%-- <td style="padding: 8px 2px;display:none" id="tdBranch" runat="server"><b style="font-size: 10pt">Branch : </b>
                 <asp:DropDownList runat="server" ID="ddlBranch" onchange="fnChangeBranch()" Style="width: 190px"></asp:DropDownList>
             </td>--%>
            <td>
                <a href="###" id="lnkActivesbf" style="margin-left: 8px; color: blue; text-decoration: underline" onclick="fnDownloadActiveSBF()">Download Active SBF Data</a>
                <a href="###" id="lnksbf" style="margin-left: 8px; color: blue; text-decoration: underline" onclick="fnDownloadSBF()">Download Current SBF Data</a>
                <a href="###" id="lnkRetailer" style="margin-left: 8px; color: blue; text-decoration: underline" onclick="fnDownloadRetailer()">Download Retailer Contact Info</a>
            </td>
                    </tr>
                </table>
            </td>
            
        </tr>
        <tr style="display: none" id="trDRCPType" runat="server">
            <td style="padding: 5px; font-size: 9.5pt">
                <label style="margin-right: 10px">
                    <input type="radio" value="1" name="rdodrcp" />&nbsp;New DRCP Format (Frequency wise)
                </label>
                <label>
                    <input type="radio" value="2" name="rdodrcp" checked="checked" />&nbsp;Old DRCP Format (Daily route calendar)
                </label>

            </td>
        </tr>
        <tr>
            <td>
                <table class="ContainerWrapper" border="0" cellpadding="2" cellspacing="0" width="100%">
                    <tr>
                        <td class="ContainerMargin" style="border-top:1px solid #99bbe8;">
                            <table class="Container" cellpadding="0" cellspacing="4" width="100%" border="0">
                                <tr>
                                    <td style="padding: 10px" id="tdNamecon1" runat="server"></td>
                                </tr>
                                <tr>

                                    <td>
                                        <div id="dvUploader">
                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td style="width: 70%">
                                                        <iframe id="uploadFrame" frameborder="0" height="25" width="390" scrolling="no" src="UploadEngine.aspx"></iframe>
                                                    </td>
                                                    <td>
                                                        <input id="upload" type="button" value="Upload" class="btn btn-primary" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">

                                                        <div id="divRptFinel" style="padding: 0 2px;">
                                                            <div id="divRptFinelhead" style="text-align: center; padding-bottom: 10px; font-size: 13px; color: #0000ff; width: 100%; margin: 0 auto;" runat="server"></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table id="tblMessage" cellpadding="4" cellspacing="4" class="Information" border="0">
                                            <tr>
                                                <td style="text-align: left" colspan="2">
                                                    <div id="dvIcon" class="Information">
                                                        Please select a file to upload
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table cellpadding="0" cellspacing="2" width="100%" border="0">
                                            <tr>
                                                <td style="width: 100px; text-align: left">Progress
                                                </td>
                                                <td style="width: auto">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tr>
                                                            <td align="left">
                                                                <div id="dvProgressContainer" style="width: 470px">
                                                                    <div id="dvProgress">
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div id="dvProgressPrcent">
                                                                    0%
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: left">Uploaded bytes
                                                </td>
                                                <td align="right">
                                                    <div id="dvDownload">
                                                        Bytes
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: left">File Name
                                                </td>
                                                <td align="right">
                                                    <div id="dvFileName">
                                                        FileName
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <table class="ContainerWrapper" border="0" cellpadding="2" cellspacing="0" width="100%">
                    <tr class="ContainerHeader" >
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
                                            <td class="Separator" style="width: 20%;" align="right">Size
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="4">
                                                <div style="height: 140px; overflow: auto;">
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
                                                                            <td style="width: 20%" align="right">
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
                                                <div style="float: right">
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
            </td>

        </tr>
    </table>
        </div>
    </div>
   

    <input type="hidden" runat="server" id="hdnfilesetid" value="" />
    <input type="hidden" runat="server" id="hdnfilesettype" value="" />
    <input type="hidden" runat="server" id="hdnFileName" value="" />
    <input type="hidden" runat="server" id="hdnRoleId" value="0" />
    <input type="hidden" runat="server" id="hdnNodeTypes" value="0" />
    <input type="hidden" runat="server" id="hdnMnId" value="0" />
    <input type="hidden" runat="server" id="hdndrcpType" value="2" />
    <input type="hidden" runat="server" id="hdnflgDRCPUploadType" value="2" />
     <input type="hidden" runat="server" id="hdnflg" value="1" />

    <asp:Button ID="btndownload" runat="server" OnClick="btnDownload_Click" Style="display: none" />
</asp:Content>
