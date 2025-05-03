Imports System.Data
Imports System.Data.SqlClient
Imports System.Configuration
Partial Class site
    Inherits System.Web.UI.MasterPage

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If (Session("LoginID") = Nothing) Then
            Response.Redirect("~/frmLogout.aspx")
            Return
        End If
        spanUserName.InnerHtml = Convert.ToString(Session("FullName"))
    End Sub

    Protected Sub lnkChangepassword_Click(sender As Object, e As EventArgs)
        Response.Redirect("~/frmChangepasswordfirsttime.aspx")
    End Sub
End Class

