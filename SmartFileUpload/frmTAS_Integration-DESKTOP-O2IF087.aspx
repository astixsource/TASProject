<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" CodeFile="frmTAS_Integration.aspx.cs" EnableEventValidation="false" Inherits="SmartFileUpload_frmTAS_Integration" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="../scripts/jquery-3.6.0.js"></script>
    <link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />
    <script src="../scripts/jquery-ui.js"></script>
    <link href="../styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../StylesTreeViewOrder/js/custom-script.js" type="text/javascript"></script>
    <link href="../CSS/ThemeBlue.css" rel="Stylesheet" type="text/css" />
    <script>
        $(document).ready(function () {
$("#lnksbf").hide();
           
            if ($("#cphRight_hdnfilesettype").val() == "2") {
               
                    $("#lnksbf").show();
                
            }
            $('#fraLeft').load(function () {
                $("#fraLeft").contents().find("#DvMenu").find("li").removeClass("activemenu");
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='" + $("#cphRight_hdnMnId").val() + "']").addClass("activemenu");
                $("#fraLeft")[0].height = $(window).height() - ($("#dvBanner").height() + $(".footer").height());
            });
        });
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
            $("#cphRight_divRptFinelhead").html("");
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
                if (RoleId == "4" || RoleId == "5" || RoleId == "6") {
                    if (parseInt(SiteNodeId) == 0) {
                        alert("Kindly select site first before click on upload button!!");
                        $("#cphRight_ddlSite").focus();
                        return false;
                    }
                }
            }
            if (fileUpload.value.length > 0) {
                var selectedFile = fileUpload.value.split('\\');
                var sFilename = selectedFile[selectedFile.length - 1];
                var sysFilename = $("#cphRight_hdnFileName").val();
                var dtformat = "";
                var fExtention = sFilename.toLowerCase().split(".")[sFilename.toLowerCase().split(".").length - 1];
                if ($("#cphRight_hdnfilesettype").val() == "1") {
                    if (sFilename.split("_").length != 2) {
                        onComplete(MessageStatus.Warning, 'Invalid File Format,kindly upload correct file format as shown in sample file!!', '', '0 of 0 Bytes', '', '', '');
                        return false;
                    }
                    sysFilename = sysFilename.split(".")[0];
                    dtformat = sFilename.split("_")[1];
                    sFilename = sFilename.split("_")[0];
                }
                else if ($("#cphRight_hdnfilesettype").val() == "2" || $("#cphRight_hdnfilesettype").val() == "3" || $("#cphRight_hdnfilesettype").val() == "4" || $("#cphRight_hdnfilesettype").val() == "5") {
                    if (sFilename.split("_").length != 2) {
                        onComplete(MessageStatus.Warning, 'Invalid File Format,kindly upload correct file format as shown in sample file!!', '', '0 of 0 Bytes', '', '', '');
                        return false;
                    }
                    sysFilename = sysFilename.split(".")[0];
                    dtformat = sFilename.split("_")[1];
                    sFilename = sFilename.split("_")[0];
                }
               
                if (sFilename.toLowerCase() != sysFilename.toLowerCase()) {
                    onComplete(MessageStatus.Warning, 'Incorrect File Name,kindly upload correct file as shown in sample file!!', '', '0 of 0 Bytes', '', '', '');
                    return false;
                }
                if (fExtention != "csv") {
                    onComplete(MessageStatus.Warning, 'Incorrect file extension,kindly upload xlsx file only!!', '', '0 of 0 Bytes', '', '', '');
                    return false;
                }
                if (validatedate(dtformat) == false) {
                    onComplete(MessageStatus.Warning, 'Date Format Not Matched,kindly upload correct date format as shown in sample file!!', '', '0 of 0 Bytes', '', '', '');
                    return false;
                }
                var filename = fileExists();
                if (filename == '') {
                    //Update the message
                    updateMessage(MessageStatus.Information, 'File uploading,please wait ...', '', '0 of 0 Bytes');
                    //Submit the form containing the fileupload control
                    var $input = $("<input />").attr("type", "hidden")
                .attr("name", "SiteNodeId")
                .attr("value", SiteNodeId);
                    $(form).append($input);

                    var $input = $("<input />").attr("type", "hidden")
                .attr("name", "SiteNodeType")
                .attr("value", SiteNodeType);
                    $(form).append($input);

                    form.submit();
                    //Set transparancy 20% to the frame and upload button
                    Sys.UI.DomElement.addCssClass($get('dvUploader'), 'StartUpload');
                    //Initialize progressbar
                    setProgress(0);
                    //Start polling to check on the progress ...
                    startProgress();
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
                    }, 500);
                }
                else
                    onComplete(MessageStatus.Error, "File name '<b>" + filename + "'</b> already exists in the list.", '', '0 of 0 Bytes', '', '', '',0);
            }
            else
                onComplete(MessageStatus.Warning, 'You need to select a file.', '', '0 of 0 Bytes', '', '', '',0);
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
            }, 4000)
            $("#cphRight_hdnfilesetid").val($(sender).attr('filesetid'));
            $("#cphRight_hdnfilesettype").val($(sender).attr('filesettype'));
            $("#cphRight_btndownload").click();
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

    </script>


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphLeft" runat="Server">

    <iframe id="fraLeft" name="fraLeft" height="100%" width="100%" scrolling="yes" frameborder="0"
        src='../frmLeftMainTreeView.aspx'></iframe>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphRight" runat="Server">
    <table width="460px" cellpadding="5" cellspacing="5" border="0" style="margin: 20px auto">
        <tr style="display: none" id="trSite" runat="server">
            <td style="padding: 10px"><b style="font-size: 10pt">Site : </b>
                <asp:DropDownList runat="server" ID="ddlSite" Style="width: 230px"></asp:DropDownList>

                <a href="###" id="lnksbf" style="margin-left:8px;color:blue;text-decoration:underline" onclick="fnDownloadSBF()">Download Current SBF Data</a>
            </td>
        </tr>
        <tr>
            <td>
                <table class="ContainerWrapper" border="0" cellpadding="2" cellspacing="0" width="100%">
                    <tr class="ContainerHeader">
                        <td id="tdFilelbl" runat="server">File Upload For : -
                        </td>
                    </tr>
                    <tr>
                        <td class="ContainerMargin">
                            <table class="Container" cellpadding="0" cellspacing="4" width="100%" border="0">
                                 <tr>
            <td style="padding: 10px" id="tdNamecon1" runat="server">

            </td>
        </tr>
                                <tr>

                                    <td>
                                        <div id="dvUploader">
                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td style="width: 84%">
                                                        <iframe id="uploadFrame" frameborder="0" height="25" width="200" scrolling="no" src="frmTAS_Integration_Engine.aspx"></iframe>
                                                    </td>
                                                    <td>
                                                        <input id="upload" type="button" value="Upload" class="btn btn-primary" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">

                                                        <div id="divRptFinel" style="padding: 0 20px;">
                                                            <div id="divRptFinelhead" style="text-align: center; padding-bottom: 10px; font-size: 13px; color: #0000ff; width: 400px; margin: 0 auto;" runat="server"></div>
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
                                                                <div id="dvProgressContainer">
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
                                    <table class="Container" cellpadding="0" cellspacing="0" width="100%" border="0">
                                        <tr class="GridHeader">
                                            <td class="Separator" style="width: 5%;" align="right"></td>
                                            <td class="Separator" style="width: 69%">File
                                            </td>
                                            <td class="Separator" style="width: 18%;padding-right:30px" align="right">Size
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="5">
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
                                                                            <td style="width: 63%; padding-left: 2px;" align="left">
                                                                                <asp:LinkButton ToolTip='<%# String.Format("Download {0}",Eval("Name")) %>' runat="server"
                                                                                    ID="lbtnFiles" Text='<%#Eval("Name") %>' CommandArgument='<%#Eval("Name") %>'
                                                                                    CommandName="downloadFile"></asp:LinkButton>
                                                                            </td>
                                                                            <td style="width: 22%" align="right">
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

    <input type="hidden" runat="server" id="hdnfilesetid" value="" />
    <input type="hidden" runat="server" id="hdnfilesettype" value="" />
    <input type="hidden" runat="server" id="hdnFileName" value="" />
    <input type="hidden" runat="server" id="hdnRoleId" value="0" />
    <input type="hidden" runat="server" id="hdnNodeTypes" value="0" />
    <input type="hidden" runat="server" id="hdnMnId" value="0" />

    <asp:Button ID="btndownload" runat="server" OnClick="btnDownload_Click" Style="display: none" />
</asp:Content>

