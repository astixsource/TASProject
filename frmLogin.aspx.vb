Imports System.Web.Security
Imports System.Data.SqlClient
Imports System.Web.Helpers
Imports System.Data

Partial Class Login
    Inherits System.Web.UI.Page
    Dim arrPara(0, 1) As String
    Dim objdr As SqlDataReader
    Dim objADO As New clsConnection.clsConnection



    Private Sub Page_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        If (IsPostBack = False) Then
            ' Session.Abandon()
            'Session.Clear()
            'Session.RemoveAll()
            'Response.Cookies.Add(New HttpCookie("ASP.NET_SessionId", ""))
            Session("LoginID") = DBNull.Value
            Response.Cache.SetCacheability(HttpCacheability.NoCache)
            Response.Cache.SetExpires(DateTime.UtcNow.AddMinutes(-1))
            Response.Cache.SetNoStore()
            'Dim cookietoken As String
            'Dim formtoken As String
            'AntiForgery.GetTokens("", cookietoken, formtoken)
            'mydivant.InnerHtml = cookietoken & ":" & formtoken
            Dim csrfToken = Guid.NewGuid().ToString()
            Session("CsrfToken") = csrfToken
            ' Dim antiForgeryCookie As New HttpCookie("__RequestVerificationToken", csrfToken)
            'With {
            '    .HttpOnly = True,
            '    .Secure = Request.IsSecureConnection
            '}
            ' Response.Cookies.Add(antiForgeryCookie)

            hiddenCsrfToken.Value = csrfToken
            Try
                dvMaintenancediv.Style.Add("display", "none")
                dvlogindiv.Style.Add("display", "none")

                Dim Scon As New SqlConnection(System.Configuration.ConfigurationManager.AppSettings("strConn"))
                Dim Scmd As New SqlCommand("[spCheckSystemMaintenance]", Scon)
                Scmd.CommandType = CommandType.StoredProcedure
                Scmd.CommandTimeout = 0
                Dim Sdap As New SqlDataAdapter(Scmd)
                Dim dt As New DataTable()
                Sdap.Fill(dt)
                If (dt.Rows.Count > 0) Then
                    If dt.Rows(0)(0).ToString() = "1" Then
                        dvmaintenancetext.InnerHtml = dt.Rows(0)(1).ToString() ' "The TAS system is currently unavailable for usage on account of system maintenance. We will send a communication when it will be available. Thank you for your patience." ' dt.Rows(0)(1).ToString()
                        dvMaintenancediv.Style.Add("display", "inline-block")
                        dvlogindiv.Style.Add("display", "none")
                    Else
                        dvMaintenancediv.Style.Add("display", "none")
                        dvlogindiv.Style.Add("display", "block")
                    End If
                Else
                    dvMaintenancediv.Style.Add("display", "none")
                    dvlogindiv.Style.Add("display", "block")
                End If
                dt.Dispose()
                Sdap.Dispose()
                Scmd.Dispose()
                Scon.Dispose()
            Catch ex As Exception
                dvMaintenancediv.Style.Add("display", "none")
                dvlogindiv.Style.Add("display", "block")
            End Try

        End If

    End Sub


    <System.Web.Services.WebMethod()>
    Public Shared Function fnLoginFromDB(ByVal UserName As String, ByVal Password As String) As String
        Dim Objcon2 As New SqlConnection(System.Configuration.ConfigurationManager.AppSettings("strConn"))
        Dim objCom2 As New SqlCommand("spSecUserLogin", Objcon2)
        Dim strResponse As String = ""
        Try

            Dim csrfTokenFromHeader = HttpContext.Current.Request.Headers("X-CSRF-Token")
            Dim csrfTokenFromSession = Convert.ToString(HttpContext.Current.Session("CsrfToken"))
            If (String.IsNullOrEmpty(csrfTokenFromHeader) Or csrfTokenFromHeader <> csrfTokenFromSession) Then
                strResponse = "2|Error : Invalid CSRF Token !!!"
                Return strResponse
            End If

            ' Dim strTokens = mydivant.InnerHtml
            'AntiForgery.Validate(strTokens.Split(":")(0), strTokens.Split(":")(1))
            'AntiForgery.Validate()
            Dim strTicket As String
            Dim roleID As String
            Dim PassChangeFirst As String = "0"
            Dim flgAgreementsigned As String = "0"
            Dim MsgForDisplay As String = ""
            Dim chkRoleID As String = "0"
            Dim arrPara(5, 1)
            Dim varAuthenticate As Boolean = False

            objCom2.Parameters.AddWithValue("@UserName", ReplaceQuotes(Trim(HttpUtility.HtmlEncode(UserName))))
            objCom2.Parameters.AddWithValue("@UserPwd", ReplaceQuotes(Trim(HttpUtility.HtmlEncode(Password))))
            objCom2.Parameters.AddWithValue("@SessionIdNw", HttpContext.Current.Session.SessionID)
            objCom2.Parameters.AddWithValue("@IPAddress", HttpContext.Current.Request.ServerVariables("REMOTE_ADDR"))
            objCom2.Parameters.AddWithValue("@BrwsrVer", HttpContext.Current.Request.Browser.Type)
            objCom2.Parameters.AddWithValue("@ScrRsltn", "")
            objCom2.CommandType = CommandType.StoredProcedure
            objCom2.CommandTimeout = 0
            Dim objdr As SqlDataReader
            Dim cycleName As String = ""
            Dim cycleDate As DateTime
            Dim strReturn As String


            Objcon2.Open()
            objdr = objCom2.ExecuteReader
            If (objdr.HasRows) Then
                'strResponse = "5|The TAS system is currently unavailable for your usage as the data loading process is still in-progress. We will send a communication when it will be available. Thank you for your patience. "
                strResponse = "3|Please check if you are already logged-in at another tab/browser/device. In that case, please logout from your running session before you try to relogin.</br>In case you had lost internet connectivity, please wait for 2 minutes before you can relogin."
                'Page.ClientScript.RegisterStartupScript(Page.GetType(), "Dialog", "<script language='javascript'>ShowRunningAssesments();</script>")
            Else
                objdr.NextResult()

                If objdr.HasRows Then
                    objdr.Read()
                    If (objdr("LoginResult") = 1) Then
                        strResponse = "2|Error : Invalid Username or Password !!!"
                    ElseIf (objdr("flgAllowAccess") = 1) Then
                        strResponse = "5|" + objdr("BackOnTime")
                        'strResponse = "5|The TAS system is currently unavailable for your usage as the data loading process is still in-progress. We will send a communication when it will be available. Thank you for your patience. "

                    ElseIf (objdr("LoginResult") = 2 Or objdr("LoginResult") = 3) Then
                        flgAgreementsigned = objdr("flgAgreementsigned")
                        MsgForDisplay = objdr("MsgForDisplay")
                        HttpContext.Current.Session("clsMenuHTML") = Nothing
                        HttpContext.Current.Session("LoginID") = objdr("LoginID")
                        HttpContext.Current.Session("UserID") = objdr("UserID")
                        HttpContext.Current.Session("RoleId") = objdr("RoleId")
                        chkRoleID = objdr("RoleId")
                        HttpContext.Current.Session("NodeType") = objdr("NodeType")
                        HttpContext.Current.Session("NodeId") = objdr("NodeId")

                        HttpContext.Current.Session("SalesNodeId") = objdr("NodeId")
                        HttpContext.Current.Session("SalesNodeType") = objdr("NodeType")
                        HttpContext.Current.Session("FYID") = objdr("FYID")
                        HttpContext.Current.Session("IsDistributor") = objdr("IsDistributor")

                        HttpContext.Current.Session("username") = objdr("UserName")
                        HttpContext.Current.Session("FullName") = objdr("UserFullName")
                        HttpContext.Current.Session("EmailId") = objdr("EmailId")
                        HttpContext.Current.Session("TokenNo") = objdr("TokenNo")
                        HttpContext.Current.Session("flgDRCPUploadType") = objdr("flgDRCPUploadType")
                        strTicket = objdr("LoginID")
                        PassChangeFirst = objdr("flgPasswordChange")
                        HttpContext.Current.Session("IsFiveStarApplicable") = objdr("IsFiveStarApplicable")
                        HttpContext.Current.Session("IsLuckyDraw") = objdr("IsLuckyDraw")
                        HttpContext.Current.Session("flgReleasingForTesting") = objdr("flgReleasingForTesting")
                        'makeTicket(strTicket)
                        varAuthenticate = True
                    End If
                End If

                objdr.NextResult()

                If objdr.HasRows Then
                    objdr.Read()
                    HttpContext.Current.Session("RptInvpath") = objdr("RptInvKey").ToString()
                    HttpContext.Current.Session("DlvryWeeklyOffDay") = objdr("DlvryWeeklyOffDay")
                    HttpContext.Current.Session("flgOrderInvoicingDirectProcessing") = objdr("flgOrderInvoicingDirectProcessing")
                    HttpContext.Current.Session("flgBatchWiseTrns") = objdr("flgBatchWiseTrns")
                    HttpContext.Current.Session("flgOperationalLevel") = objdr("flgOperationalLevel")
                    HttpContext.Current.Session("flgWillGenerateInvOnlyAfterPicklist") = objdr("flgWillGenerateInvOnlyAfterPicklist")
                    HttpContext.Current.Session("flgWillGenerateInvOnlyBeforePicklist") = objdr("flgWillGenerateInvOnlyBeforePicklist")
                    HttpContext.Current.Session("flgSingleVehicleOperation") = objdr("flgSingleVehicleOperation")
                    HttpContext.Current.Session("flgCessApplicable") = objdr("flgCessApplicable")
                    HttpContext.Current.Session("FullName") = objdr("DBRName")
                End If
                objdr.NextResult()

                If objdr.HasRows Then
                    Dim dtDistHolidayList As New System.Data.DataTable
                    dtDistHolidayList.Load(objdr)
                    HttpContext.Current.Session("DistHolidayList") = dtDistHolidayList
                End If

                If varAuthenticate Then
                    If (PassChangeFirst = "1") Then

                        If (flgAgreementsigned = "1" Or flgAgreementsigned = "2") And MsgForDisplay <> "" Then
                            If flgAgreementsigned = "2" Then
                                HttpContext.Current.Session.Abandon()
                                HttpContext.Current.Session.Clear()
                                HttpContext.Current.Session.RemoveAll()
                                HttpContext.Current.Response.Cookies.Add(New HttpCookie("ASP.NET_SessionId", ""))
                            End If
                            strResponse = "4|" & MsgForDisplay & "|" + flgAgreementsigned & "|" & HttpContext.Current.Session("RoleId").ToString() ' "Your payments are long overdue. Kindly settle all overdue payment immediately or services will be terminated. Details have already been shared and in case of any clarifications or duplicate invoices, please contact <a href='mailto:accounts@astix.in'>accounts@astix.in</a>."
                            ' Page.ClientScript.RegisterStartupScript(Page.GetType(), "Dialog", "<script language='javascript'>ShowAgreementWarningMsg('" + flgAgreementsigned + "','" + Convert.ToString(Session("RoleId")) + "');</script>")
                        Else
                            If (Convert.ToInt32(HttpContext.Current.Session("RoleId")) = 3 Or Convert.ToInt32(HttpContext.Current.Session("RoleId")) = 10) Then
                                HttpContext.Current.Session("IsDistributor") = "1"
                                If (HttpContext.Current.Request.Browser.IsMobileDevice = True) Then
                                    'Response.Write("<script language=javascript>window.location.href='ManageOrder/frmRouteList_PDA.aspx';</script>")
                                    strResponse = "1|ManageOrder/frmRouteList_PDA.aspx"
                                Else
                                    If (Convert.ToInt32(HttpContext.Current.Session("IsLuckyDraw")) > 0) Then
                                        '    Response.Write("<script language=javascript>window.location.href='ManageOrder/LuckDrawStore.aspx';</script>")
                                        strResponse = "1|ManageOrder/LuckDrawStore.aspx"
                                    Else
                                        strResponse = "1|ManageOrder/frmRouteList_Telecaller.aspx"
                                        'Response.Write("<script language=javascript>window.location.href='ManageOrder/frmRouteList_Telecaller.aspx';</script>")
                                    End If
                                End If
                            ElseIf (Convert.ToInt32(HttpContext.Current.Session("RoleId")) = 2 Or Convert.ToInt32(HttpContext.Current.Session("RoleId")) = 4) Then
                                HttpContext.Current.Session("IsDistributor") = "0"
                                strResponse = "1|ManageOrder/frmMarkAbsent.aspx"
                                'Response.Write("<script language=javascript>window.location.href='ManageOrder/frmMarkAbsent.aspx';</script>")
                            ElseIf (Convert.ToInt32(HttpContext.Current.Session("RoleId")) = 4) Then
                                HttpContext.Current.Session("IsDistributor") = "0"
                                strResponse = "1|ManageOrder/frmMarkAbsent.aspx"
                                'Response.Write("<script language=javascript>window.location.href='ManageOrder/frmMarkAbsent.aspx';</script>")
                            ElseIf (Convert.ToInt32(HttpContext.Current.Session("RoleId")) = 8) Then
                                HttpContext.Current.Session("IsDistributor") = "0"
                                'Response.Write("<script language=javascript>window.location.href='ManageOrder/frmMarkAbsent.aspx?id=33&flg=2';</script>")
                                strResponse = "1|ManageOrder/frmMarkAbsent.aspx"
                            ElseIf (Convert.ToInt32(HttpContext.Current.Session("RoleId")) = 5) Then
                                HttpContext.Current.Session("IsDistributor") = "0"
                                'Response.Write("<script language=javascript>window.location.href='ManageOrder/frmMarkTeleCallerAbsent.aspx';</script>")
                                strResponse = "1|ManageOrder/frmMarkTeleCallerAbsent.aspx"
                            ElseIf (Convert.ToInt32(HttpContext.Current.Session("RoleId")) = 7 Or Convert.ToInt32(HttpContext.Current.Session("RoleId")) = 8 Or Convert.ToInt32(HttpContext.Current.Session("RoleId")) = 11) Then
                                HttpContext.Current.Session("IsDistributor") = "0"
                                'Response.Write("<script language=javascript>window.location.href='ManageOrder/frmDailyPerformanceReport.aspx';</script>")
                                strResponse = "1|ManageOrder/frmDailyPerformanceReport.aspx"
                            ElseIf (Convert.ToInt32(HttpContext.Current.Session("RoleId")) = 6) Then
                                HttpContext.Current.Session("IsDistributor") = "0"
                                ' Response.Write("<script language=javascript>window.location.href='ManageOrder/frmDailyPerformanceReport_GP.aspx';</script>")
                                strResponse = "1|ManageOrder/frmDailyPerformanceReport_GP.aspx"
                            Else
                                HttpContext.Current.Session("IsDistributor") = "0"
                                ' Response.Write("<script language=javascript>window.location.href='others/default.aspx';</script>")
                                strResponse = "1|others/default.aspx"
                            End If
                        End If
                    Else
                        strResponse = "1|Others/frmChangepasswordfirsttime.aspx"
                        'HttpContext.Current.Response.Write("<script language=javascript>window.location.href='Others/frmChangepasswordfirsttime.aspx';</script>")
                    End If
                End If
            End If

            objdr = Nothing
            ' dvMain.InnerHtml = strTable.ToString()
        Catch ex As Exception
            strResponse = "2|Error : " & ex.Message
        Finally
            objCom2.Dispose()
            Objcon2.Close()
            Objcon2.Dispose()
        End Try

        Return strResponse
    End Function

    'Protected Sub btnSubmit_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles btnSubmit.Click
    '    Try
    '        ' Dim strTokens = mydivant.InnerHtml
    '        ' AntiForgery.Validate(strTokens.Split(":")(0), strTokens.Split(":")(1))
    '        'AntiForgery.Validate()
    '        Dim strTicket As String
    '        Dim roleID As String
    '        Dim PassChangeFirst As String = "0"
    '        Dim flgAgreementsigned As String = "0"
    '        Dim MsgForDisplay As String = ""
    '        Dim chkRoleID As String = "0"
    '        ReDim arrPara(5, 1)
    '        Dim varAuthenticate As Boolean = False
    '        arrPara(0, 0) = ReplaceQuotes(Trim(HttpUtility.HtmlEncode(txtUserName.Value)))
    '        arrPara(0, 1) = "1"

    '        arrPara(1, 0) = ReplaceQuotes(Trim(HttpUtility.HtmlEncode(txtPassword.Value)))
    '        arrPara(1, 1) = "1"

    '        arrPara(2, 0) = Session.SessionID
    '        arrPara(2, 1) = "1"

    '        arrPara(3, 0) = Request.ServerVariables("REMOTE_ADDR")
    '        arrPara(3, 1) = "1"

    '        arrPara(4, 0) = Request.Browser.Type
    '        arrPara(4, 1) = "1"

    '        arrPara(5, 0) = HttpUtility.HtmlEncode(hdnRes.Value)
    '        arrPara(5, 1) = "1"

    '        Dim objCon As New SqlConnection
    '        Dim objCom As New SqlCommand

    '        objCom.CommandTimeout = 0
    '        objdr = objADO.RunSP("spSecUserLogin", arrPara, 0, objCon, objCom)

    '        If (objdr.HasRows) Then
    '            dvAlertDialog.InnerHtml = "Please check if you are already logged-in at another tab/browser/device. In that case, please logout from your running session before you try to relogin.</br>In case you had lost internet connectivity, please wait for 2 minutes before you can relogin."
    '            Page.ClientScript.RegisterStartupScript(Page.GetType(), "Dialog", "<script language='javascript'>ShowRunningAssesments();</script>")
    '            Return
    '        End If
    '        objdr.NextResult()

    '        If objdr.HasRows Then
    '            objdr.Read()
    '            If (objdr("LoginResult") = 1) Then
    '                dvMessage.InnerText = "Invalid Username or Password !!!"
    '                txtUserName.Value = ""
    '                txtPassword.Value = ""
    '                ' Dim attemptsLeft = 5 - Convert.ToInt32(objdr("NoOfInCorrectPasswordAttempts"))
    '                dvMessage.InnerHtml = "Invalid Username or Password." '<br />After " + attemptsLeft.ToString() + " more unsuccessfull attempt" + IIf(attemptsLeft > 1, "s", "") + " your account will be locked."
    '            ElseIf (objdr("LoginResult") = 2 Or objdr("LoginResult") = 3) Then
    '                flgAgreementsigned = objdr("flgAgreementsigned")
    '                MsgForDisplay = objdr("MsgForDisplay")
    '                Session("clsMenuHTML") = Nothing
    '                Session("LoginID") = objdr("LoginID")
    '                Session("UserID") = objdr("UserID")
    '                Session("RoleId") = objdr("RoleId")
    '                chkRoleID = objdr("RoleId")
    '                Session("NodeType") = objdr("NodeType")
    '                Session("NodeId") = objdr("NodeId")

    '                Session("SalesNodeId") = objdr("NodeId")
    '                Session("SalesNodeType") = objdr("NodeType")
    '                Session("FYID") = objdr("FYID")
    '                Session("IsDistributor") = objdr("IsDistributor")

    '                Session("username") = objdr("UserName")
    '                Session("FullName") = objdr("UserFullName")
    '                Session("EmailId") = objdr("EmailId")
    '                Session("TokenNo") = objdr("TokenNo")
    '                Session("flgDRCPUploadType") = objdr("flgDRCPUploadType")
    '                strTicket = objdr("LoginID")
    '                PassChangeFirst = objdr("flgPasswordChange")
    '                Session("IsFiveStarApplicable") = objdr("IsFiveStarApplicable")
    '                Session("IsLuckyDraw") = objdr("IsLuckyDraw")
    '                Session("flgReleasingForTesting") = objdr("flgReleasingForTesting")
    '                makeTicket(strTicket)
    '                varAuthenticate = True
    '            End If
    '        End If

    '        objdr.NextResult()

    '        If objdr.HasRows Then
    '            objdr.Read()
    '            Session("RptInvpath") = objdr("RptInvKey").ToString()
    '            Session("DlvryWeeklyOffDay") = objdr("DlvryWeeklyOffDay")
    '            Session("flgOrderInvoicingDirectProcessing") = objdr("flgOrderInvoicingDirectProcessing")
    '            Session("flgBatchWiseTrns") = objdr("flgBatchWiseTrns")
    '            Session("flgOperationalLevel") = objdr("flgOperationalLevel")
    '            Session("flgWillGenerateInvOnlyAfterPicklist") = objdr("flgWillGenerateInvOnlyAfterPicklist")
    '            Session("flgWillGenerateInvOnlyBeforePicklist") = objdr("flgWillGenerateInvOnlyBeforePicklist")
    '            Session("flgSingleVehicleOperation") = objdr("flgSingleVehicleOperation")
    '            Session("flgCessApplicable") = objdr("flgCessApplicable")
    '            Session("FullName") = objdr("DBRName")
    '        End If
    '        objdr.NextResult()

    '        If objdr.HasRows Then
    '            Dim dtDistHolidayList As New System.Data.DataTable
    '            dtDistHolidayList.Load(objdr)
    '            Session("DistHolidayList") = dtDistHolidayList
    '        End If

    '        objADO.CloseConnection(objCon, objCom, objdr)
    '        If varAuthenticate Then
    '            If (PassChangeFirst = "1") Then

    '                If (flgAgreementsigned = "1" Or flgAgreementsigned = "2") And MsgForDisplay <> "" Then
    '                    If flgAgreementsigned = "2" Then
    '                        Session.Abandon()
    '                        Session.Clear()
    '                        Session.RemoveAll()
    '                        Response.Cookies.Add(New HttpCookie("ASP.NET_SessionId", ""))
    '                    End If
    '                    dvAlertDialog.InnerHtml = MsgForDisplay ' "Your payments are long overdue. Kindly settle all overdue payment immediately or services will be terminated. Details have already been shared and in case of any clarifications or duplicate invoices, please contact <a href='mailto:accounts@astix.in'>accounts@astix.in</a>."
    '                    Page.ClientScript.RegisterStartupScript(Page.GetType(), "Dialog", "<script language='javascript'>ShowAgreementWarningMsg('" + flgAgreementsigned + "','" + Convert.ToString(Session("RoleId")) + "');</script>")
    '                    Return
    '                End If

    '                If (Convert.ToInt32(Session("RoleId")) = 3 Or Convert.ToInt32(Session("RoleId")) = 10) Then
    '                    Session("IsDistributor") = "1"
    '                    If (Request.Browser.IsMobileDevice = True) Then
    '                        Response.Write("<script language=javascript>window.location.href='ManageOrder/frmRouteList_PDA.aspx';</script>")
    '                    Else
    '                        If (Convert.ToInt32(Session("IsLuckyDraw")) > 0) Then
    '                            Response.Write("<script language=javascript>window.location.href='ManageOrder/LuckDrawStore.aspx';</script>")
    '                        Else
    '                            Response.Write("<script language=javascript>window.location.href='ManageOrder/frmRouteList_Telecaller.aspx';</script>")
    '                        End If
    '                    End If
    '                ElseIf (Convert.ToInt32(Session("RoleId")) = 2 Or Convert.ToInt32(Session("RoleId")) = 4) Then
    '                    Session("IsDistributor") = "0"
    '                    Response.Write("<script language=javascript>window.location.href='ManageOrder/frmMarkAbsent.aspx';</script>")
    '                ElseIf (Convert.ToInt32(Session("RoleId")) = 4) Then
    '                    Session("IsDistributor") = "0"
    '                    Response.Write("<script language=javascript>window.location.href='ManageOrder/frmMarkAbsent.aspx';</script>")
    '                ElseIf (Convert.ToInt32(Session("RoleId")) = 8) Then
    '                    Session("IsDistributor") = "0"
    '                    Response.Write("<script language=javascript>window.location.href='ManageOrder/frmMarkAbsent.aspx?id=33&flg=2';</script>")
    '                ElseIf (Convert.ToInt32(Session("RoleId")) = 5) Then
    '                    Session("IsDistributor") = "0"
    '                    Response.Write("<script language=javascript>window.location.href='ManageOrder/frmMarkTeleCallerAbsent.aspx';</script>")

    '                ElseIf (Convert.ToInt32(Session("RoleId")) = 7 Or Convert.ToInt32(Session("RoleId")) = 8 Or Convert.ToInt32(Session("RoleId")) = 11) Then
    '                    Session("IsDistributor") = "0"
    '                    Response.Write("<script language=javascript>window.location.href='ManageOrder/frmDailyPerformanceReport.aspx';</script>")
    '                ElseIf (Convert.ToInt32(Session("RoleId")) = 6) Then
    '                    Session("IsDistributor") = "0"
    '                    Response.Write("<script language=javascript>window.location.href='ManageOrder/frmDailyPerformanceReport_GP.aspx';</script>")

    '                Else
    '                    Session("IsDistributor") = "0"
    '                    Response.Write("<script language=javascript>window.location.href='others/default.aspx';</script>")
    '                End If
    '            Else
    '                Response.Write("<script language=javascript>window.location.href='Others/frmChangepasswordfirsttime.aspx';</script>")
    '            End If
    '        End If
    '    Catch ex As Exception
    '        dvMessage.InnerText = "Error:" + ex.Message
    '        txtUserName.Value = ""
    '        txtPassword.Value = ""
    '    End Try
    'End Sub


    Private Sub makeTicket(ByVal strTicket As String)
        'Dim objTicket As FormsAuthenticationTicket
        'Dim authCookie As HttpCookie
        'Dim sessionLength As Integer = ConfigurationSettings.AppSettings("sessionDuration")

        'objTicket = New FormsAuthenticationTicket(1, txtUserName.Value, Date.Now, Date.Now.AddMinutes(sessionLength), False, strTicket)

        'authCookie = New HttpCookie(".aspxauth")
        'authCookie.Value = FormsAuthentication.Encrypt(objTicket)

        'Response.Cookies.Add(authCookie)


    End Sub
    Public Function MakeDate(ByVal DateText As Date) As String
        Return Format(DateText, "dd-MMM-yyyy")
    End Function
    Public Shared Function ReplaceQuotes(ByVal str As String) As String
        Return Replace(str, "'", "''")
    End Function

    'Private Sub Login_Init(sender As Object, e As EventArgs) Handles Me.Init
    '    mydivant.InnerHtml = AntiForgery.GetHtml().ToHtmlString()
    'End Sub
End Class
