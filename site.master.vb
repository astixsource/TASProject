Imports System.Data
Imports System.Data.SqlClient
Imports System.Configuration
Imports System.Web.Helpers
Imports System
Partial Class site
    Inherits System.Web.UI.MasterPage


    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If (Session("LoginID") = Nothing) Then
            Response.Redirect("~/frmLogout.aspx")
            Return
        End If
        spanUserName.InnerHtml = IIf(Convert.ToString(Session("RoleId")) = "10", Convert.ToString(Session("username")), Convert.ToString(Session("FullName")))
    End Sub

    Protected Sub lnkChangepassword_Click(sender As Object, e As EventArgs)
        Response.Redirect("~/others/frmChangepasswordfirsttime.aspx")
    End Sub

    'Private Sub site_Init(sender As Object, e As EventArgs) Handles Me.Init
    '    'Dim cookietoken As String
    '    'Dim formtoken As String
    '    'AntiForgery.GetTokens("", cookietoken, formtoken)
    '    'hdnantitoken.Value = cookietoken + ":" + formtoken
    '    'divAntiforgery.InnerHtml = AntiForgery.GetHtml().ToHtmlString()
    'End Sub
End Class

