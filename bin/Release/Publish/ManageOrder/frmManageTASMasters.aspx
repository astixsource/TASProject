<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true" CodeFile="frmManageTASMasters.aspx.cs" Inherits="ManageOrder_frmManageTASMasters" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
    <link href="../styles/Multiselect/jquery-ui.css" rel="stylesheet" type="text/css" />
    <%--<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet">--%>
    <script src="../scripts/jquery-3.6.0.js"></script>
    <script src="../scripts/jquery-ui.js"></script>
    <script src="../Scripts/MultiSelect/jquery.js" type="text/javascript"></script>
    <script src="../Scripts/MultiSelect/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../scripts/validation.js"></script>
    <style type="text/css">
        .switch
        {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 24px;
        }
         
        .switch input
        {
            opacity: 0;
        }
         
        .slider
        {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: .4s;
            transition: .4s;
        }
         
        .slider:before
        {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
        }
         
        input:checked + .slider
        {
            background-color: #2196F3;
        }
         
        input:focus + .slider
        {
            box-shadow: 0 0 1px #2196F3;
        }
         
        input:checked + .slider:before
        {
            -webkit-transform: translateX(26px);
            -ms-transform: translateX(26px);
            transform: translateX(26px);
        }
         
        /* Rounded sliders */
        .slider.round
        {
            border-radius: 34px;
        }
         
        .slider.round:before
        {
            border-radius: 50%;
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
        .loader_bg {
    z-index: 9910;
    min-height: 100%;
    width: 100%;
    height: auto;
    top: 0;
    left: 0;
    position: fixed;
    display: none;
    background: rgba(0, 0, 0, 0.1);
}

.loader {
    border: 10px solid #f3f3f3;
    border-radius: 50%;
    border-top: 10px solid #ff8000;
    width: 40px;
    height: 40px;
    left: 50%;
    top: 50%;
    position: absolute;
    margin-left: -15px;
    margin-top: -15px;
    -moz-animation: spin 1s linear infinite;
    -webkit-animation: spin 1s linear infinite;
    animation: spin 1s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
    0% {
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
    }

    100% {
        -moz-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

    </style>
    <script>
        $(document).ready(function () {
            $('#fraLeft').load(function () {
                $("#fraLeft").contents().find("#DvMenu").find("li").removeClass("activemenu");
                $("#fraLeft").contents().find("#DvMenu").find("li[nid='" + $("#cphRight_hdnMenuId").val() + "']").addClass("activemenu");
                $("#fraLeft")[0].height = $(window).height() - ($("#dvBanner").height() + $(".footer").height());
            });
        });

        function fnINITSBDSitePopulateGaps() {
            $("#dvDialog")[0].innerHTML = "<center><b>Are you sure to submit?</b></center>";
            $("#dvDialog").dialog({
                modal: true,
                title: "Confirmation:",
                buttons: {
                    "Yes": function () {
                        $(this).dialog('close');
                        var SiteNodeId = $("#cphRight_hdnSiteNodeId").val();
                        var flgStartStop = $("#chkSBD").is(":checked") ? 1 : 0;
                        $("#dvFadeForProcessing").show();
                        PageMethods.fnINITSBDSitePopulateGaps(SiteNodeId, flgStartStop, function (result) {
                            $("#dvFadeForProcessing").hide();
                            if (result.split("|")[0] == "2") {
                                alert("Some Technical Error,Please contact to Technical Team Or Try again later!!")
                            } else {
                                alert("Action taken successfully!!");
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
     <iframe id="fraLeft" name="fraLeft" height="100%" width="100%" scrolling="yes" frameborder="0"
            src='../frmLeftMainTreeView.aspx'></iframe>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphRight" Runat="Server">
     <div id="dvFadeForProcessing" class="loader_bg">
        <div class="loader"></div>
    </div>
    <div class="container-fluid" style="width:80%">
    
  <div style="margin-left: 0px;  width: 100%; background-color: #ffffff" id="divHeadercont">
        <h4 id="h4header">>>Manage Masters</h4>
      </div>
            <div id="divMain" runat="server" style="width:60%;margin:5px auto">
    </div>
    
    </div>
    <div id="dvDialog" style="display: none;padding-top:10px"></div>
     <asp:HiddenField runat="server" ID="hdnLoginId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnSiteNodeId" Value="0" />
    <asp:HiddenField runat="server" ID="hdnSiteNodeType" Value="0" />
    <asp:HiddenField runat="server" ID="hdnMenuId" Value="0" />
</asp:Content>

