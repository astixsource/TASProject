<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" CodeFile="frmTAS_Upload.aspx.cs" Inherits="SmartFileUpload_frmTAS_Upload" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="../scripts/jquery-1.11.3.js"></script>
    <link href="../StylesTreeViewOrder/Css/main.css" rel="stylesheet" type="text/css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link href="../styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../StylesTreeViewOrder/js/custom-script.js" type="text/javascript"></script>
    <link href="../CSS/ThemeBlue.css" rel="Stylesheet" type="text/css" />       
    
     <link href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css" rel="stylesheet" />  
     <script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
     <script src="https://cdn.datatables.net/fixedcolumns/3.2.3/js/dataTables.fixedColumns.min.js"></script>

    <style>
        tr.clsHighlightrowsChangeRoute td {
            background-color:#ffff79;
        }

        tr.clsHighlightrows td{
            background-color:#ffd5d5;
        }
         tr.clsHighlightrowsNoAbsent td{
            background-color:#c1ff84;
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


    .btn {
    display: inline-block;
    padding: 2px 4px !important;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}

    #progressBar
{
	width:0px;
	height:5px;
	/*background-color:#F44336;
	position:fixed;
	top:0px;
	left:0px;*/
	display:none;
    background-image: url(../Images/Progressbar_Content.gif);
    height: 100%;
}

#progressBar.active
{
	display:block;
	/*transition: 3s linear width;
	-webkit-transition: 3s linear width;
	-moz-transition: 3s linear width;
	-o-transition: 3s linear width;
	-ms-transition: 3s linear width;*/
}

#dvProgressContainer {
    border-left: solid 1px #CFCFCF;
    border-right: solid 1px #CFCFCF;
     width: 100% !important; 
    height: 12px;
    background-image: url(../Images/Progressbar_Wrapper.gif);
}



a {
    
    text-decoration: underline!important;
}


</style>

    <style type="text/css">
       body { font-family: Arial Narrow; font-size: 10pt; }
        #dialog { height: 600px; overflow: auto; font-size: 10pt! important; font-weight: normal !important; background-color: #FFFFC1; margin: 10px; border: 1px solid #ff6a00; }
        #dialog div { margin-bottom: 15px; }/**/
    </style>

    <script type="text/javascript">

        
        $(document).ready(function () {

            $('#fraLeft').load(function () {
                $("#fraLeft").contents().find("#DvMenu").find("li").removeClass("activemenu");
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='24']").addClass("activemenu");
                $("#fraLeft")[0].height = $(window).height() - ($("#dvBanner").height() + $(".footer").height());
            });
            $("#loader").hide();
            //e.preventDefault();
            

            //alert(parseInt(branch.indexOf(']')));
            //alert(parseInt(branch.indexOf('[')));
            //alert(branch.substr(parseInt(branch.indexOf('[')), parseInt(branch.indexOf(']')) - (parseInt(branch.indexOf('[')) + 1)));

            
           
            $("#cphRight_btnUpload").click(function (evt) {

                var branch = $("#cphRight_ddlSite option:selected").text();
                var branchcode = 0;
                if ($("#cphRight_ddlSite option").length > 0) {
                    branchcode = branch.substr(parseInt(branch.indexOf('[')) + 1, parseInt(branch.indexOf(']')) - (parseInt(branch.indexOf('[')) + 1));
                   
                    if (isNaN(branchcode)) {
                        alert("Invalid branch code or not valid !!");
                        return false;
                    }
                }

                if (parseInt(branchcode) == 0) {
                    alert("Kindly select site first before click on upload button!!");
                    $("#cphRight_ddlSite").focus();
                    return false;
                }

                if (($("#cphRight_fupload1").get(0).files.length < 1) && ($("#cphRight_fupload3").get(0).files.length < 1) && ($("#cphRight_fupload4").get(0).files.length < 1)) {  ////&& ($("#cphRight_fupload2").get(0).files.length < 1) && ($("#cphRight_fupload5").get(0).files.length < 1)
                    alert("Please Select the File !");
                    return false;
                }


                

                var fileList = [];
                
                fileList.push($("#cphRight_fupload1").get(0));
                //fileList.push($("#cphRight_fupload2").get(0));
                fileList.push($("#cphRight_fupload3").get(0));
                fileList.push($("#cphRight_fupload4").get(0));
                //fileList.push($("#cphRight_fupload5").get(0));

                
                if ($("#cphRight_fupload1").get(0).files.length < 1) //Retailer
                {
                    $("#cphRight_fupload1").closest('tr').find('td:eq(4)').css("color", "#0000c6").text("Retailer master is compulsory to upload if you have new stores in your DRCP otherwise DRCP against the retailers who are not available in our db will be rejected.");
                }
                //if ($("#cphRight_fupload2").get(0).files.length < 1) // Product
                //{
                //    $("#cphRight_fupload2").closest('tr').find('td:eq(4)').css("color", "#0000c6").text("If Product master is not updated then products will not be displayed while booking the orders by telecaller, so it is compulsory to upload.");
                //}
                if ($("#cphRight_fupload3").get(0).files.length < 1) // AR
                {
                    $("#cphRight_fupload3").closest('tr').find('td:eq(4)').css("color", "#0000c6").text("If you have any outstanding then it is compulsory to upload.");
                }
                if ($("#cphRight_fupload4").get(0).files.length < 1) // PSR
                {
                    $("#cphRight_fupload4").closest('tr').find('td:eq(4)').css("color", "#0000c6").text("If you don't upload this file, it will not be reflected in daily sales execution reports.");
                }
                //if ($("#cphRight_fupload5").get(0).files.length < 1) // DRCP
                //{
                //    $("#cphRight_fupload5").closest('tr').find('td:eq(4)').css("color", "#0000c6").text("If you don't upload this file at daily basis then DSE route plan will not be displayed for absenteeism.");
                //}



                var IsValidFiles = true;
                var filenames = ["Retailer", "AR", "PSR"];

                for (var i = 0; i < fileList.length; i++) {
                    if ($("#" + fileList[i].id).get(0).files.length > 0) {
                        if (validatefile($("#" + fileList[i].id), filenames[i]) == false) {
                            IsValidFiles = false;
                        }
                    }
                }
               
                if (IsValidFiles == false)
                    return false;

                

                $("#cphRight_btnUpload").attr("disabled", true);
                $("#cphRight_btnUpload").val('Upload File in Progress...');


                $("#cphRight_divRptFinelhead").css("color", "blue");
                $("#cphRight_divRptFinelhead").html("<table id='tblstatus'></table>");//<tr><td>File is being uploading ...</td></tr>

                              

                var data = new FormData();
                for (var i = 0; i < fileList.length; i++) {
                   
                    var fileUpload_WS = $("#" + fileList[i].id).get(0);
                    if (fileUpload_WS.files.length > 0) {
                        var file1 = fileUpload_WS.files;
                        var filesettype= $(fileUpload_WS).siblings('input[type=hidden]').val();
                        data.append(file1[0].name, file1[0], file1[0].name + '#' + filesettype);
                    }
                }

                data.append("branchcode", branchcode);              

                uploaddata(data);
              
                evt.preventDefault();
            });
            // end of button btnUpload click

            //setInterval(function () { getdata(); }, 60000);
             getdata();

        });


        
        // End of Ready function


        function validatefile(fupload,sfile)
        {
            

            var filesettype = $(fupload).siblings('input[type=hidden]').val();

            var selectedFile = $(fupload).get(0).value.split('\\');
            var sFilename = selectedFile[selectedFile.length - 1];
            //var sysFilename = $("#cphRight_hdnFileName").val();
            var dtformat = sFilename.split("_")[1];


            var fExtention = sFilename.toLowerCase().split(".")[sFilename.toLowerCase().split(".").length - 1];

            if (sFilename.split("_").length != 2) {
                //onComplete(MessageStatus.Warning, 'Invalid File Format,kindly upload correct file format as shown in sample file!!', '', '0 of 0 Bytes', '', '', '');
                $(fupload).closest('tr').find('td:eq(4)').css("color", "#ff0000").text("Invalid File Name Format, kindly upload correct file format!!");
                return false;
            }
            if (fExtention != "csv") {
                $(fupload).closest('tr').find('td:eq(4)').css("color", "#ff0000").text("Incorrect file extension, kindly upload csv file only!!");
                return false;
            }
            if (sFilename.split('_')[0].toLowerCase() != sfile.toLowerCase()) {
                //onComplete(MessageStatus.Warning, 'Incorrect File Name,kindly upload correct file as shown in sample file!!', '', '0 of 0 Bytes', '', '', '');
                $(fupload).closest('tr').find('td:eq(4)').css("color", "#ff0000").text("Incorrect File Name, kindly upload correct file!!");
                return false;
            }
            if (validatedate(dtformat) == false) {
                //onComplete(MessageStatus.Warning, 'Date Format Not Matched,kindly upload correct date format as shown in sample file!!', '', '0 of 0 Bytes', '', '', '');
                $(fupload).closest('tr').find('td:eq(4)').css("color", "#ff0000").text("Date Format not corrent in file name, kindly upload correct date format!!");
                return false;
            }

            return true;
        }

       

        function validatedate(date) {
            date = date.match(/([12]\d{3}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01]))/);
            if (date === null) {
                return false; // if match failed
            }

            return true;
        }

        function uploaddata(data) {
            var pbar = $('#progressBar'), currentProgress = 0;
            $(pbar).width(0).addClass('active');

            $.ajax({
                url: "FileUploadHandler.ashx",
                type: "POST",
                data: data,
                
                xhr: function () {
                    // Custom XMLHttpRequest
                    var appXhr = $.ajaxSettings.xhr();

                    // Check if upload property exists, if "yes" then upload progress can be tracked otherwise "not"
                    if (appXhr.upload) {
                        // Attach a function to handle the progress of the upload
                        appXhr.upload.addEventListener('progress', trackUploadProgress, false);

                    }

                    return appXhr;
                },

                contentType: false,
                processData: false,
                success: function (result) {

                    if (result.split("^")[0] == "0") {
                        fnSuccess(result);
                    }
                    else {
                        //alert(result.split("^")[1])
                        $("#cphRight_divRptFinelhead").find("table[id='tblstatus']").append("<tr><td style='color:#ff0000;'>" + result.split("^")[1] + "</td></tr>");
                        $("#cphRight_btnUpload").removeAttr('disabled');
                        $("#cphRight_btnUpload").val('Upload File');
                        $("#divsaving")[0].innerHTML = "";
                    }
                },
                error: OnError
                //error: function (err) {
                //    $("#cphRight_divRptFinelhead").find("table[id='tblstatus']").append("<tr><td style='color:#ff0000;'>" + result + "</td></tr>");
                //}
                   
            });
        }


        


        function fnSuccess(res) {
                            
                $("#divsaving")[0].innerHTML = "";
                $("#cphRight_divRptFinelhead").css("color", "blue");
                $("#cphRight_divRptFinelhead").find("table[id='tblstatus']").append("<tr><td><div>" + res.split("^")[1] + "</div></td></tr>");

               

                $("#cphRight_fupload1").val('');
                //$("#cphRight_fupload2").val('');
                $("#cphRight_fupload3").val('');
                $("#cphRight_fupload4").val('');
                //$("#cphRight_fupload5").val('');

                $("#cphRight_fupload1").closest('tr').find('td:eq(3)').text('');
                //$("#cphRight_fupload2").closest('tr').find('td:eq(3)').text('');
                $("#cphRight_fupload3").closest('tr').find('td:eq(3)').text('');
                $("#cphRight_fupload4").closest('tr').find('td:eq(3)').text('');
                //$("#cphRight_fupload5").closest('tr').find('td:eq(3)').text('');

                $("#cphRight_btnUpload").removeAttr('disabled');
                $("#cphRight_btnUpload").val('Upload File');

                getdata();
            
        }


        function OnError(xhr, errorType, exception) {

            /*
            var responseText;
            $("#dialog").html("");
            try {
                responseText = jQuery.parseJSON(xhr.responseText);
                //responseText = $.parseJSON('[' + xhr.responseText + ']');

                $("#dialog").append("<div><b>" + errorType + " " + exception + "</b></div>");
                $("#dialog").append("<div><u>Exception</u>:<br /><br />" + responseText.ExceptionType + "</div>");
                //$("#dialog").append("<div><u>StackTrace</u>:<br /><br />" + responseText.StackTrace + "</div>");
                $("#dialog").append("<div><u>Message</u>:<br /><br />" + responseText.Message + "</div>");
            } catch (e) {
                responseText = xhr.responseText;
                $("#dialog").html(responseText);
            }
            $("#dialog").dialog({
                title: "Error in file uploading ",
                width: 700,
                buttons: {
                    Close: function () {
                        $(this).dialog('close');
                    }
                }
            });

            */
            $("#cphRight_divRptFinelhead").find("table[id='tblstatus']").append("<tr><td style='color:#ff0000;'>Error in uploading due to connection failure, please try again</td></tr>");
            $('#progressBar').css("display", "none");
            $('#dvProgressPrcent').html('0%');
            $("#cphRight_btnUpload").removeAttr('disabled');
            $("#cphRight_btnUpload").val('Upload File');
        }


        function fnFileSelect(ctrl) {            
            var obj = $(ctrl).val().split("\\");
            var filename = obj[obj.length - 1];
            $(ctrl).closest("tr").find('td:eq(3)').html(filename);
            $(ctrl).closest("tr").find('td:eq(4)').text('');            
        }


        function fnFileClear(ctrl)
        {
            $(ctrl).closest("tr").find('input[type=file]').val('');
            $(ctrl).closest("tr").find('td:eq(3)').html('');
            $(ctrl).closest("tr").find('td:eq(4)').text('');
        }


        function getdata() {

            var LoginId = $("#cphRight_hdnLoginId").val();
            
            //$("#loader").show();
            PageMethods.fnDSEList(LoginId, function (result) {
                //$("#loader").hide();
                //$("#divBTNS").find("a").hide();
                if (result.split("|")[0] == "2") {
                    alert("Error-" + result.split("|")[1]);
                } else if (result == "") {
                    $("#divmain")[0].innerHTML = "No Record(s) Found!!!";
                }
                else {
                   // $("#divBTNS").show();
                    $("#divmain")[0].innerHTML = result.split("|")[0];
                    //fntblFixedHeader();
                    var table = $('#tbldbrlist').DataTable({
                        scrollCollapse: true,
                        scrollY: "150px",
                        paging: false,
                        "ordering": false,
                        "info": false,
                        "bFilter": false,
                        fixedHeader: {
                            header: true
                        }
                    });

                    setInterval(function () { getdata(); }, 60000);
                }
            },
            function (result) {
                //$("#loader").hide();
                alert("Error-" + result._message);
            }
            )
        }


        //---------------progress bar
        
        function trackUploadProgress(e) {
            if (e.lengthComputable) {
                currentProgress = (e.loaded / e.total) * 100; // Amount uploaded in percent
                $('#progressBar').width(currentProgress + '%');
                $('#dvProgressPrcent').html(currentProgress.toFixed(2) + '%');//dvProgressPrcent
                if (currentProgress == 100) 
                    $("#divsaving")[0].innerHTML = "<div><img valign='middle' src='../Images/preloader_18.gif' alt='loading gif' />Saving Files...Please Wait</div>";
                //$('#progressBar').css("display", "none");               
                
            }
        }

    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphLeft" Runat="Server">
       <iframe id="fraLeft" name="fraLeft" height="100%" width="100%" scrolling="yes" frameborder="0"
            src='../frmLeftMainTreeView.aspx'></iframe>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphRight" Runat="Server">
    <div id="loader" style="position: fixed; z-index: 9; top: 0; bottom: 0; left: 0; right: 0; opacity: .80; -moz-opacity: 0.8; filter: alpha(opacity=80); background-color: #ccc; display: none;">
        <div id="Div2" runat="server" align="center" style="position: absolute; width: 150px; top: 30%; left: 45%;">
            <img alt="" title="Loading..." src="../Images/blue-loading.gif" />
        </div>
    </div>
     <div style="margin-left: 0px;padding-bottom:0px;z-index:1;width:100%;background-color:#ffffff" id="divHeadercont">
    <h4 id="h4header">>>TAS Upload</h4>
          <div class="help-block">
        <em style="font-size:14px">Please upload flat file(<strong>.csv</strong>) with file format(xxxxx_yyyyMMdd) <br />i.e for Retailer on dated 29-Sep-2019, then file name should be<strong> "Retailer_20190929.csv"</strong>. Download sample csv file(right side of every file upload row). 
        </em>
    </div>  
  
         <table width="460px" cellpadding="5" cellspacing="5" border="0" style="margin: 5px auto">
        <tr  id="trSite" runat="server">
            <td style="padding: 10px"><b style="font-size: 10pt">Site : </b>
                <asp:DropDownList runat="server" ID="ddlSite" Style="width: 230px"></asp:DropDownList>                
            </td>
        </tr>
             </table>
</div>
     <div style="padding-top:2px;margin: 0px auto" id="divtblContain">
      <div id="divdrmmain" style="margin-top:0px;border:1px solid #ccc;width:950px;margin:0px auto">
    
    <table class="dataTable" width="100%" cellpadding="5" cellspacing="5" border="0" style="margin: 0px auto">
        <tr>  
        <td style="width:15%;">Retailer </td> 
                
        <td style="text-align:right;width:80px;">  
            <asp:FileUpload ID="fupload1" runat="server" onchange="fnFileSelect(this);"  style="width:80px;" /><input type="hidden" value="7" /> </td>
             <td style="width:50px;"><input type="button" value="Clear" class="btn-default btn-xs" onclick="fnFileClear(this);" /></td>              
            <td></td> 
        <td></td> 
            <td style="width:12%;"><a href="SampleFile/Retailer_yyyyMMdd.csv" target="_blank" title="Download Sample Data">Download Sample</a></td> 
        </tr>  
        <%--<tr>  
        <td>Product </td>  
        <td style="text-align:right;width:80px;">  
            <asp:FileUpload ID="fupload2" runat="server" onchange="fnFileSelect(this);"  style="width:80px;"/><input type="hidden" value="2" /></td>  
       <td style="width:50px;"><input type="button" value="Clear" class="btn-default btn-xs" onclick="fnFileClear(this);" /></td> 
             <td></td> 
             <td style="color:#ff0000;"></td> 
        </tr>--%>
        <tr>  
        <td>AR </td>
             
        <td style="text-align:right;width:80px;">  
            <asp:FileUpload ID="fupload3" runat="server" onchange="fnFileSelect(this);"  style="width:80px;"/><input type="hidden" value="8" /></td>  
       <td style="width:50px;"><input type="button" value="Clear" class="btn-default btn-xs" onclick="fnFileClear(this);" /></td> 
              <td></td> 
              <td style="color:#ff0000;"></td> 
            <td><a href="SampleFile/AR_yyyyMMdd.csv" target="_blank" title="Download Sample Data">Download Sample</a></td> 
        </tr>
        <tr>  
        <td>PSR </td> 
                
        <td style="text-align:right;width:80px;">  
            <asp:FileUpload ID="fupload4" runat="server" onchange="fnFileSelect(this);"  style="width:80px;"/><input type="hidden" value="9" /></td>  
      <td style="width:50px;"><input type="button" value="Clear" class="btn-default btn-xs" onclick="fnFileClear(this);" /></td> 
              <td></td> 
             <td style="color:#ff0000;"></td> 
            <td><a href="SampleFile/PSR_yyyyMMdd.csv" target="_blank" title="Download Sample Data">Download Sample</a></td> 
        </tr>
        <%--<tr>  
        <td>DRCP </td>  
        <td style="text-align:right;width:80px;">  
            <asp:FileUpload ID="fupload5" runat="server" onchange="fnFileSelect(this);"  style="width:80px;"/><input type="hidden" value="5" /></td>  
             <td style="width:50px;"><input type="button" value="Clear" class="btn-default btn-xs" onclick="fnFileClear(this);" /></td> 
              <td></td> 
       <td style="color:#ff0000;"></td> 
        </tr>--%>
        <tr><td><asp:Button ID="btnUpload" runat="server" cssClass="btn btn-primary" Text="Upload File"  /></td>
          <td colspan="5">

              <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tr>
                                                            <td align="left" style="width:95%">
                                                                <div id="dvProgressContainer">
                                                                    <div id="progressBar">
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td style="width:5%">
                                                                <div id="dvProgressPrcent">
                                                                    0%
                                                                </div>
                                                            </td>
                                                        </tr>
                    <%--<tr><td><div id="uploadfilelist"></div></td></tr>--%>
                 </table>
          </td>  
        </tr>      
    </table>
         <div id="divRptFinel" style="padding: 0 5px; ">
             <div style="width:100%" id="divsaving"></div>
        <div id="divRptFinelhead" style="text-align: left; padding-bottom: 10px; font-size: 13px; color:#0000ff; width:100%;margin:0 auto;" runat="server"></div>
  </div> 
        
         </div>
         </div>

      <div style="padding-top:20px;margin: 0px auto" id="divtbllist">
          <%--<div id="divfixedHeader" style="margin-left: 0px; position:fixed;z-index:1"></div>--%>
          <div id="divmain"   style="margin-top:0px;border:1px solid #ccc;width:95%;margin: 0px auto">

          </div>
      </div>
    <div id="dialog" style="display: none"></div>
     <asp:HiddenField runat="server" ID="hdnLoginId" Value="0" />
     <asp:HiddenField runat="server" ID="hdnBranchcode" Value="0" />

</asp:Content>

