<%@ Page Title="" Language="C#" Async="true" MasterPageFile="~/site.master" AutoEventWireup="true" EnableEventValidation="false" CodeFile="Default_DSEAbsentEmailData.aspx.cs" Inherits="Default_DSEAbsentEmailData" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link rel="stylesheet" href="../CSS/bootstrap.min.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="../scripts/jquery-3.6.0.js"></script>
    <link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />
    <script src="../scripts/jquery-ui.js"></script>
    <link href="../styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../StylesTreeViewOrder/js/custom-script.js" type="text/javascript"></script>
    <link href="../CSS/ThemeBlue.css" rel="Stylesheet" type="text/css" />
    <style>
        #cphRight_gvNewFiles td {
            border-bottom: 1px solid #ccc;
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

        var intervalID1 = 0;
        var subintervalID1 = 0;

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
            $("#btnSendMail").hide();
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

                    var $input = $("<input />").attr("type", "hidden")
                        .attr("name", "flgCallFrom")
                        .attr("id", "flgCallFrom")
                        .attr("value", 1);
                    $(form).find("input[id='flgCallFrom']").remove();

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
                                refreshFileList('<%=hdRefereshGrid.ClientID %>');
                            }
                        });
                    }, 200);
                }
                else
                    onComplete(MessageStatus.Error, "File name '<b>" + filename + "'</b> already exists in the list.", '', '0 of 0 Bytes', '', '', '', 0);
            }
            else
                onComplete(MessageStatus.Warning, 'You need to select a file.', '', '0 of 0 Bytes', '', '', '', 0);
        }

        //Stop progrss when file was successfully uploaded
        function onComplete(type, msg, filename, downloadBytes, TotalBytes, newFileName, FileSetId, FileSetType, Updatetype) {
            window.clearInterval(intervalID);
            clearTimeout(subintervalID);
            if (type == MessageStatus.Success) {
                if (FileSetId != 0) {
                    $("#cphRight_hdnfilesetid").val(FileSetId);
                }
                setProgress(100);
                updateMessage(MessageStatus.Success, msg, filename, downloadBytes, Updatetype);
                Sys.UI.DomElement.removeCssClass($get('dvUploader'), 'StartUpload');
                $("#btnSendMail").show();
            }
            else {
                updateMessage(MessageStatus.Information, msg, filename, downloadBytes, Updatetype);
                Sys.UI.DomElement.removeCssClass($get('dvUploader'), 'StartUpload');
            }
            //Set transparancy 100% to the frame and upload button

            //Refresh uploaded files list.
            refreshFileList('<%=hdRefereshGrid.ClientID %>');
        }

        //Stop progrss when file was successfully uploaded
        function fnShowCompletition() {
            window.clearInterval(intervalID);
            clearTimeout(subintervalID);
            setProgress(100);
            updateMessage(MessageStatus.Success, "File Uploaded and Mails sent successfully", "", 0, 5);
            Sys.UI.DomElement.removeCssClass($get('dvUploader'), 'StartUpload');
            refreshFileList('<%=hdRefereshGrid.ClientID %>');
        }

        function fnSendMails() {
            $("#divOnTimeMail").dialog({
                title: "Confirmation:",
                width: "auto",
                height: "auto",
                close: function () {
                    $(this).dialog('destroy');
                },
                buttons: {
                    "Cancel": function () {
                        $(this).dialog('close');
                    },
                    "Continue": function () {
                        $(this).dialog('close');

                        Sys.UI.DomElement.addCssClass($get('dvUploader'), 'StartUpload');

                        var $input = $("<input />").attr("type", "hidden")
                            .attr("name", "FileSetID")
                            .attr("id", "FileSetID")
                            .attr("value", $("#cphRight_hdnfilesetid").val());
                        $(form).find("input[id='FileSetID']").remove();
                        $(form).append($input);

                        var $input = $("<input />").attr("type", "hidden")
                            .attr("name", "flgCallFrom")
                            .attr("id", "flgCallFrom")
                            .attr("value", 2);
                        $(form).find("input[id='flgCallFrom']").remove();

                        var $input = $("<input />").attr("type", "hidden")
                            .attr("name", "strOnTime")
                            .attr("id", "strOnTime")
                            .attr("value", $("input[name='rdotime']:checked").val());
                        $(form).find("input[id='strOnTime']").remove();

                        $(form).append($input);

                        form.submit();


                        intervalID = window.setInterval(function () {
                            PageMethods.GetUploadStatus(function (result) {
                                if (result) {
                                    // setProgress(result.percentComplete);
                                    //Upadte the message every 500 milisecond
                                    updateMessage(MessageStatus.Information, result.message, result.fileName, result.downloadBytes, 6);
                                    //if (result.percentComplete == 100 && result.) {
                                    //    //clear the interval
                                    //    window.clearInterval(intervalID);
                                    //    clearTimeout(subintervalID);
                                    //}
                                    refreshFileList('<%=hdRefereshGrid.ClientID %>');
                                }
                            });
                        }, 200);
                    }
                }
            })


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
            if (Updatetype != 6) {
                $get('dvDownload').innerHTML = downloadBytes;
                $get('dvFileName').innerHTML = filename;
            }
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


        function fnDownloadSampleFile() {
            var drcpType = $("input[name='rdodrcp']:checked").val();
            var iURL = "SampleFile/" + $("#cphRight_hdnFileName").val().split('.')[0] + "_yyyyMMddHHmm.xlsx";

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
    <div style="margin: 8px 140px; border: 1px solid #23aed8; min-height: 510px">
        <div id="tdFilelbl" runat="server" style="width: 100%; height: 24px; padding-left: 10px; line-height: 23px; text-transform: uppercase; font-family: Verdana; color: #333333; font-size: 15px" class="ContainerHeader">
            >> Upload Process
        </div>
        <div>
            <table width="100%" cellpadding="5" cellspacing="5" border="0" style="margin: 5px auto">

                <tr>
                    <td>
                        <table class="ContainerWrapper" border="0" cellpadding="2" cellspacing="0" width="100%">
                            <tr>
                                <td class="ContainerMargin" style="border-top: 1px solid #99bbe8;">
                                    <table class="Container" cellpadding="0" cellspacing="4" width="100%" border="0">
                                        <tr>
                                            <td style="padding: 10px" id="tdNamecon1" runat="server"></td>
                                        </tr>
                                        <tr>

                                            <td style="padding-bottom: 10px">
                                                <div id="dvUploader">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tr>
                                                            <td style="width: 70%">
                                                                <iframe id="uploadFrame" frameborder="0" height="25" width="390" scrolling="no" src="UploadEngine_DSEAbsentEmailData.aspx"></iframe>
                                                            </td>
                                                            <td>
                                                                <input id="upload" type="button" value="Upload" class="btn btn-primary" />
                                                                <input id="btnSendMail" style="margin-left: 10px;display:none" type="button" value="Send Mail" onclick="fnSendMails()" class="btn btn-primary" />
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
                                                                        <div id="dvProgressContainer" style="width: 770px">
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
                            <tr class="ContainerHeader">
                                <td>List of uploaded files
                                </td>
                            </tr>
                            <tr>
                                <td class="ContainerMargin">
                                    <asp:UpdatePanel runat="server" ID="upFiles" UpdateMode="Conditional">
                                        <ContentTemplate>
                                            <asp:HiddenField ID="hdRefereshGrid" runat="server" OnValueChanged="hdRefereshGrid_ValueChanged" />
                                            <asp:HiddenField ID="hdnSendmail" runat="server" OnValueChanged="hdnSendmail_ValueChanged" />
                                            <table class="Container" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tr class="GridHeader">
                                                    <td class="Separator" style="width: 10%">SiteCode
                                                    </td>
                                                    <td class="Separator" style="width: 20%" align="center">SiteName
                                                    </td>
                                                    <td class="Separator" style="width: 30%;" align="center">EmailIds
                                                    </td>
                                                    <td class="Separator" style="width: 40%;" align="center">MailStatus
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="4">
                                                        <div style="height: 220px; overflow: auto;">
                                                            <asp:GridView DataKeyNames="SiteCode" ID="gvNewFiles" AllowPaging="false" runat="server"
                                                                PagerStyle-HorizontalAlign="Center" AutoGenerateColumns="false" Width="100%"
                                                                CellPadding="0" BorderWidth="0" GridLines="None" ShowHeader="false" OnRowCommand="gvNewFiles_RowCommand"
                                                                OnRowDataBound="gvNewFiles_RowDataBound">
                                                                <AlternatingRowStyle />
                                                                <RowStyle />
                                                                <Columns>
                                                                    <asp:TemplateField ItemStyle-HorizontalAlign="Right">
                                                                        <ItemTemplate>
                                                                            <table cellpadding="0" cellspacing="0" width="100%" border="0">
                                                                                <tr>
                                                                                    <td style="width: 10%; padding-left: 2px;" align="left">
                                                                                        <%#Eval("SiteCode")%>
                                                                                    </td>
                                                                                    <td style="width: 20%" align="left">
                                                                                        <%#Eval("SiteName")%>
                                                                                    </td>
                                                                                    <td style="width: 30%" align="left">
                                                                                        <%#Eval("EmailIds")%>
                                                                                    </td>
                                                                                    <td style="width: 36%" align="left">
                                                                                        <%#Eval("MailStatus")%>
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

    <div style="display: none; padding: 15px" id="divOnTimeMail">
        <div style="margin: 10px 0px; font-weight: bold">Kindly select Data timing :</div>
        <div>
            <label>
                <input type="radio" value="10 AM" name="rdotime" checked />
                10 AM</label></div>
         <div>
            <label>
                <input type="radio" value="12:30 PM" name="rdotime" />
                12:30 PM</label></div>
        <div>
            <label>
                <input type="radio" value="4 PM" name="rdotime" />
                4 PM</label></div>
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
