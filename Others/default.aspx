<%@ Page Title="" Language="C#" MasterPageFile="~/site.master" AutoEventWireup="true"
    CodeFile="default.aspx.cs" Inherits="_default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
<script src="../scripts/jquery-1.11.3.js"></script>
    <script type="text/javascript" language="javascript">
        $(document).ready(function () {
            $("#dvLeft")[0].height = $(window).height() - 20 - ($("#dvBanner").height() + $(".footer").height());
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphLeft" runat="Server">
    
        <iframe id="dvLeft" name="fraLeft" height="100%" width="100%" scrolling="yes" frameborder="0"
            src='../frmLeftMainTreeView.aspx'></iframe>
    
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphRight" runat="Server">
    
</asp:Content>
