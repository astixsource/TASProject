Imports System.Data
Imports System.Data.SqlClient
Partial Class frmLeftMainTreeView
    Inherits System.Web.UI.Page
    Dim objAdo As New clsConnection.clsConnection
    Dim arrPara(0, 1) As String
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If (Session("LoginID") = Nothing) Then
            Response.Write("<script>parent.parent.window.location.href='frmLogin.aspx'</script>")
        Else
            If (Request.Browser.IsMobileDevice = True) Then
                hdnIsMobile.Value = "1"
            End If
            If Not IsPostBack Then
                'fnGetMenuHierarchy()
                If Session("clsMenuHTML") Is Nothing Then
                    Session("clsMenuHTML") = ClsMenuItem.PopulateProductTree(Session("LoginID").ToString())
                    DvMenu.InnerHtml = Session("clsMenuHTML").ToString()
                Else
                    DvMenu.InnerHtml = Session("clsMenuHTML").ToString()
                End If

            End If
        End If
    End Sub


End Class
