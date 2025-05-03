var setup = 0;
var finalViewById = "";
var noofmeasure = "";
var isLoad = false;
var QuestionFlg = "";
function GetHireType() {
    $.ajax({
        type: "POST",
        async: true,
        url: "Dashboard.aspx/GetHireType",
        data: '',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var jsdata = JSON.parse(data.d);
            $('#ddlGroupBy').empty();
            $.each(jsdata, function (key, value) {
                $('#ddlGroupBy').append($("<option></option>").val(
                        value.NodeType).html(value.NodeDesc));
                //}
            });
        },
        error: function (data) {
            alert(data.d);
        }
    });
}
$(document).ready(function () {

    // Bind Hire Type for Slip Tab
    GetHireType();
    // End Hire Type

    // Open Popup on panel click
    $('.panel-default').click(function () {
        $('#hdSeqId').val($(this).attr('id'));
        $("#myModal").modal();
    });
    // end here

    // Question List Click handle
    $('#cphRight_rdQuestionList').click(function () {
        noofmeasure = $('#cphRight_rdQuestionList input:checked').parent().attr("title");
        QuestionFlg = $('#cphRight_rdQuestionList input:checked').parent().attr("flg");
        var question = $('#cphRight_rdQuestionList input:checked').next().text();
        $("label[for='DisplayQuestion']").text(replaceAll(question, "_", " ")).css("text-align", "center");
        if (noofmeasure > 1) {
            $("#cphRight_hdnServicefilter").val("");
            $("#cphRight_hdnGeographyfilter").val("");
        }
        if (noofmeasure > 1 && $('#rdTrend').is(":checked")) {
            $('#litab3').hide();
            $("#ddlGroupBy").val("0").trigger("change");
        }
        else {
            $('#litab3').show();
            if ($('#hdTabValue').val() != "1") {
                $('#litab2 a').addClass("disable");
                $('#litab3 a').addClass("disable");
                $('#litab4 a').addClass("disable");
                $('#litab5 a').addClass("disable");
            }
        }
        if (QuestionFlg == 0) {
            $(".dayClass").hide();

            if ($("#rdDay").is(":checked") == true) {
                $("#tblStartingViewValue").css("display", "none");
                $("#cphRight_txtTreandValue").val("");
            }
            if ($("#rdTCdtd").is(":checked") == true) {
                $("#tblTrendCurrentValue1").css("display", "none");
                $("#cphRight_txtTrendValue1").val("");
            }
            if ($("#rdSDay").is(":checked") == true) {
                $("#tblSnapshotAsOn1").css("display", "none");
            }
            $("#rdDay").attr("checked", false);
            $("#rdTCdtd").attr("checked", false);
            $("#rdSDay").attr("checked", false);
            $("#rdSCDTD").attr("checked", false);
        }
        else {
            $(".dayClass").show();
        }
    });
    //end Question


    //Next Button Event For Creating Graph 
    $('#btnNext').click(function () {
        var nextSetup = true;
        if (setup == 0 && nextSetup == true) {
            var measuerId = $('#cphRight_rdQuestionList input:checked').val();
            noofmeasure = $('#cphRight_rdQuestionList input:checked').parent().attr("title");
            if (measuerId == undefined) {
                alert("Please select one measuer question");
            }
            else {
                setup++;
                $('#litab1').removeClass("active");
                $('#mtab1').hide().removeClass("tab active");
                $('#litab2').addClass("active");
                $('#litab2 a').removeClass("disable");
                $('#mtab2').show().addClass("tab active");
                $('#btnAddGraph').css("display", "none");
                $('#btnNext').css("display", "inline");
                nextSetup = false;
            }
        }
        if (setup == 1 && nextSetup) {
            var isValid = false;
            if ($('#rdTrend').is(":checked") == false && $('#rdSnapshot').is(":checked") == false)
            { alert("Please select atleast one option"); return false; }

            if ($('#rdTrend').is(":checked")) {
                if ($('#rdTrendStarting').is(":checked") == false && $('#rdTrendCurrent').is(":checked") == false)
                    alert("Please select one view type Option");
                if ($('#rdTrendStarting').is(":checked")) {
                    if ($("[name=tSView]").is(":checked") == false) {
                        alert("Please select Time Period");
                    }
                    if ($("[name=tSView]").is(":checked")) {
                        var title = $("#cphRight_ddlTimeLevel").val();
                        if (title == "0")
                            alert("Please select correct option");
                        else if (document.getElementById('cphRight_txtTreandValue').value == "")
                            alert("Please enter for past value");
                        else if (document.getElementById('cphRight_txtTreandValue').value == "0")
                            alert("Please enter for past value");
                        else
                            isValid = true;
                    }
                }
                if ($('#rdTrendCurrent').is(":checked")) {
                    if ($("[name=tCView]").is(":checked") == false)
                        alert("Please select any one option");
                    else if ($("#txtTrendValue1").val() == "")
                        alert("Please enter correct value in the box");
                    else
                        isValid = true;
                }
            }
            if ($('#rdSnapshot').is(":checked")) {

                if ($("[name=rdSOn]").is(":checked") == false)
                    alert("Please select one option");
                if ($("#rdAsOn").is(":checked")) {
                    if (!$("[name=rdSViewType]").is(":checked"))
                        alert("Please select one view type Option");

                    if ($("[name=rdSViewType]").is(":checked")) {
                        var title = $("#cphRight_ddlSnapShotValue").val();
                        if (title == "0")
                            alert("Please select correct value");
                        else
                            isValid = true;
                    }
                }
                if ($("#rdSnapCurrent").is(":checked")) {
                    if (!$("[name=rdSCCurrentType]").is(":checked")) {
                        alert("Please select atleast one option");
                    }
                    else
                        isValid = true;
                }
            }
            if (isValid) {
                setup++;
                fnMakeFilterSeries();
                //alert($("#hdnTimefilter").val());
                if (noofmeasure > 1 && $('#rdTrend').is(":checked")) {
                    setup++;
                    $("#ddlGroupBy").val("0").trigger("change");
                    fnHideFilterOnFilterTab();
                    $('#litab2').removeClass("active");
                    $('#mtab2').hide().removeClass("tab active");
                    $('#litab3').removeClass("active");
                    $('#litab3').hide();
                    $('#mtab3').hide().removeClass("tab active");
                    $('#litab4').addClass("active");
                    $('#litab4 a').removeClass("disable");
                    $('#mtab4').show().addClass("tab active");
                    $('#btnAddGraph').css("display", "none");
                    $('#btnNext').css("display", "inline");
                    //nextSetup = false;
                }
                else {
                    $('#litab2').removeClass("active");
                    $('#mtab2').hide().removeClass("tab active");
                    $('#litab3').show();
                    $('#litab3').addClass("active");
                    $('#litab3 a').removeClass("disable");
                    $('#mtab3').show().addClass("tab active");
                    $('#btnAddGraph').css("display", "none");
                    $('#btnNext').css("display", "inline");
                }
                nextSetup = false;
            }
        }
        if (setup == 2 && nextSetup == true) {
            var isValid = true;
            if (isValid) {
                setup++;
                fnHideFilterOnFilterTab();
                $('#litab3').show();
                $('#litab3').removeClass("active");
                $('#mtab3').hide().removeClass("tab active");
                $('#litab4').addClass("active");
                $('#litab4 a').removeClass("disable");
                $('#mtab4').show().addClass("tab active");
                $('#btnAddGraph').css("display", "none");
                $('#btnNext').css("display", "inline");
                nextSetup = false;
            }
        }
        if (setup == 3 && nextSetup == true) {
            setup = 0;
            CheckingPopupAdditionalFilter();
            $('#litab4').removeClass("active");
            $('#mtab4').hide().removeClass("tab active");
            $('#litab5').addClass("active");
            $('#litab5 a').removeClass("disable");
            $('#mtab5').show().addClass("tab active");
            nextSetup = false;
            fnTopMenuClick($("#cphRight_hdnTopMenuId").val());
            $('#btnAddGraph').css("display", "inline-table");
            $('#btnNext').css("display", "none");
            $('#btnPrevious').css("display", "none");
            $('#hdTabValue').val(1);
        }
    });
    // End here next button Event

    // Previous Button Event Start From Here
    $('#btnPrevious').click(function () {
        var previousSetup = true;
        switch (setup - 1) {
            case 0:
                $('#litab1').addClass("active");
                $('#mtab1').show().addClass("tab active");
                $('#litab2').removeClass("active");
                $('#mtab2').hide().removeClass("tab active");
                $('#btnAddGraph').css("display", "none");
                $('#btnNext').css("display", "inline");
                setup = setup - 1;
                break;
            case 1:
                $('#litab2').addClass("active");
                $('#mtab2').show().addClass("tab active");
                $('#litab3').show();
                $('#litab3').removeClass("active");
                $('#mtab3').hide().removeClass("tab active");
                $('#btnAddGraph').css("display", "none");
                $('#btnNext').css("display", "inline");
                setup = setup - 1;
                break;
            case 2:
                if (noofmeasure > 1 && $('#rdTrend').is(":checked")) {
                    $('#litab2').addClass("active");
                    $('#mtab2').show().removeClass("tab active");
                    $('#litab3').removeClass("active");
                    $('#litab3').hide();
                    $('#mtab3').hide().removeClass("tab active");
                    $('#litab4').removeClass("active");
                    $('#mtab4').hide().addClass("tab active");
                    $('#btnAddGraph').css("display", "none");
                    $('#btnNext').css("display", "inline");
                    setup = setup - 2;
                }
                else {
                    $('#litab3').show();
                    $('#litab3').addClass("active");
                    $('#mtab3').show().addClass("tab active");
                    $('#litab4').removeClass("active");
                    $('#mtab4').hide().removeClass("tab active");
                    $('#btnAddGraph').css("display", "none");
                    $('#btnNext').css("display", "inline");
                    setup = setup - 1;
                }
                break;
        }

    });
    //End Previous Buutton Event


    // Tab Click Event 
    $('#litab1').click(function () {
        // if ($('#hdTabValue').val() == "1" || setup == 1) {
        if (setup >= 1 || $('#hdTabValue').val() == "1") {
            $('#litab1').addClass("active");
            $('#mtab1').show().addClass("tab active");
            $('#litab1.active').siblings().removeClass("active");
            $('#mtab1.active').siblings().removeClass("active").hide();
            $('#btnAddGraph').css("display", "none");
            $('#btnNext').css("display", "inline");
            $('#btnPrevious').css("display", "inline");
            setup = 0;
        }
        //}
    });
    $('#litab2').click(function () {
        //if ($('#hdTabValue').val() == "1" || setup == 2) {
        if (setup >= 2 || $('#hdTabValue').val() == "1") {
            $('#litab2').addClass("active");
            $('#litab2.active').siblings().removeClass("active");
            $('#mtab2').show().addClass("tab active");
            $('#mtab2.active').siblings().removeClass("active").hide();
            $('#btnAddGraph').css("display", "none");
            $('#btnNext').css("display", "inline");
            $('#btnPrevious').css("display", "inline");
            setup = 1;
        }
        //}
    });
    $('#litab3').click(function () {
        if ($('#hdTabValue').val() == "1" || setup == 3) {
            if (noofmeasure > 1 && $('#rdTrend').is(":checked")) {
                $('#litab3').hide();
                $("#ddlGroupBy").val("0").trigger("change");
                //                        fnGetUnSalesSelection(); fnGetUnProductSelection();

            }
            else {
                $('#litab3').show();
                $('#litab3').addClass("active");
                $('#litab3.active').siblings().removeClass("active");
                $('#mtab3').show().addClass("tab active");
                $('#mtab3.active').siblings().removeClass("active").hide();
                $('#btnAddGraph').css("display", "none");
                $('#btnNext').css("display", "inline");
                $('#btnPrevious').css("display", "inline");
                setup = 2;
            }
        }
    });
    $('#litab4').click(function () {
        fnHideFilterOnFilterTab();
        if ($('#hdTabValue').val() == "1" || setup == 4) {
            fnHideFilterOnFilterTab();
            $('#litab4').addClass("active");
            $('#litab4.active').siblings().removeClass("active");
            $('#mtab4').show().addClass("tab active");
            $('#mtab4.active').siblings().removeClass("active").hide();
            $('#btnAddGraph').css("display", "none");
            $('#btnNext').css("display", "inline");
            $('#btnPrevious').css("display", "inline");
            setup = 3;
        }
    });
    $('#litab5').click(function () {
        if ($('#hdTabValue').val() == "1") {
            if (noofmeasure > 1 && $('#rdTrend').is(":checked")) {
                $('#litab3').hide();
                $("#ddlGroupBy").val("0").trigger("change");
            }
            else {
                $('#litab3').show();
            }
            $('#litab5').addClass("active");
            $('#litab5.active').siblings().removeClass("active");
            $('#mtab5').show().addClass("tab active");
            $('#mtab5.active').siblings().removeClass("active").hide();
            $('#btnAddGraph').css("display", "inline");
            $('#btnNext').css("display", "none");
            fnMakeFilterSeries();
            isValid = true;
            var tabId = 0;
            if ($('#rdTrend').is(":checked")) {
                isValid = false;
                if ($('#rdTrendStarting').is(":checked") == false && $('#rdTrendCurrent').is(":checked") == false)
                    alert("Please select one view type Option");
                if ($('#rdTrendStarting').is(":checked")) {
                    if ($("[name=tSView]").is(":checked") == false) {
                        alert("Please select Time Period");
                    }
                    if ($("[name=tSView]").is(":checked")) {
                        var title = $("#cphRight_ddlTimeLevel").val();
                        if (title == "0")
                            alert("Please select correct option");
                        else if (document.getElementById('cphRight_txtTreandValue').value == "")
                            alert("Please enter for past value");
                        else if (document.getElementById('cphRight_txtTreandValue').value == "0")
                            alert("Please enter for past value");
                        else
                            isValid = true;
                    }
                }
                if ($('#rdTrendCurrent').is(":checked")) {
                    if ($("[name=tCView]").is(":checked") == false)
                        alert("Please select any one option");
                    else
                        isValid = true;
                }
                if (!isValid)
                    tabId = 2;
            }
            if ($('#rdSnapshot').is(":checked")) {
                isValid = false;
                if ($("[name=rdSOn]").is(":checked") == false)
                    alert("Please select one option");
                if ($("#rdAsOn").is(":checked")) {
                    if (!$("[name=rdSViewType]").is(":checked"))
                        alert("Please select one view type Option");

                    if ($("[name=rdSViewType]").is(":checked")) {
                        var title = $("#cphRight_ddlSnapShotValue").val();
                        if (title == "<--Select-->")
                            alert("Please select correct value");
                        else
                            isValid = true;
                    }
                }
                if ($("#rdSnapCurrent").is(":checked")) {
                    if (!$("[name=rdSCCurrentType]").is(":checked")) {
                        alert("Please select atleast one option");
                    }
                    else
                        isValid = true;
                }
                if (!isValid)
                    tabId = 2;
            }
            setup = 4;
            if (tabId == 2) {
                if ($('#hdTabValue').val() == "1") {
                    $('#litab2').addClass("active");
                    $('#litab2.active').siblings().removeClass("active");
                    $('#mtab2').show().addClass("tab active");
                    $('#mtab2.active').siblings().removeClass("active").hide();
                    $('#btnAddGraph').css("display", "none");
                    $('#btnNext').css("display", "inline");
                    setup = 1;
                }
            }
            if (isValid) {
                CheckingPopupAdditionalFilter();
                CreateSingleOneGraph();
            }
        }
    });
    // End Tab Click Event


    //Trend Click Event Fire and Siblings
    $('#rdTrend').click(function () {
        var radioArray1 = $("#tdSnapShotViewRecord").find(":radio");
        $.each(radioArray1, function (index, rd) {
            $(rd).prop("checked", false);
        });
        $("#trSnapshotView").css("display", "none");
        $("#tblSnapShotCurrent").css("display", "none");
        $("#tblSnapshotAsOn1").css("display", "none");
        $("#tblSnapshotAsOn").css("display", "none");
        $("#trTrendView").css("display", "table-row");
        $("label[for='TrendSnapType']").text("View " + $('#rdTrend').val());
    });

    $('[name=tViewType]').click(function () {
        var idVal = $(this).attr("id");
        if ($("#" + idVal).val() == "Ending") {
            $("#tblTrendViewStarting").css("display", "table");
            $("#tblCurrentTrendView").css("display", "none");
            $("#tblTrendCurrentValue1").css("display", "none");
            if ($('[name=tSView]').is(":checked"))
                $("#tblStartingViewValue").css("display", "table");
            else
                $("#tblStartingViewValue").css("display", "none");
        }
        if ($("#" + idVal).val() == "Current") {
            $("#tblCurrentTrendView").css("display", "table");
            $("#tblTrendViewStarting").css("display", "none");
            $("#tblStartingViewValue").css("display", "none");
            if ($('[name=tCView]').is(":checked"))
                $("#tblTrendCurrentValue1").css("display", "table");
            else
                $("#tblTrendCurrentValue1").css("display", "none");
        }
    });

    $('[name=tSView]').click(function () {
        var idVal = $(this).attr("id");
        $("label[for='lblTypeValue']").text($("#" + idVal).attr("title"));
        $("label[for='lblTypeValue1']").text($("#" + idVal).attr("title"));
        $("#imgmtab2").css("display", "block");
        $("#tblStartingViewValue").css("display", "table");

        if ($("#" + idVal).attr("title") == "Month")
            GetTimeLevel(2);
        if ($("#" + idVal).attr("title") == "Year")
            GetTimeLevel(1);
        if ($("#" + idVal).attr("title") == "Week")
            GetTimeLevel(3);
        if ($("#" + idVal).attr("title") == "Day")
            GetTimeLevel(4);

    });
    $('[name=tCView]').click(function () {
        var idval = $(this).attr("id");
        $("#tblTrendCurrentValue1").css("display", "table");
        $("label[for='lblTypeValue2']").text($("#" + idval).attr("title"));
    });

    //End Ehere

    //Snapshot Click Event Fire and Sibling
    $('#rdSnapshot').click(function () {
        var radioArray = $("#tdTrendViewRecord").find(":radio");
        $.each(radioArray, function (index, rd) {
            $(rd).prop("checked", false);
        });
        $("#trSnapshotView").css("display", "table-row");
        $("#trTrendView").css("display", "none");
        $("#tblTrendViewStarting").css("display", "none");
        $("#tblCurrentTrendView").css("display", "none");
        $("#tblTrendCurrentValue1").css("display", "none");
        $("#tblStartingViewValue").css("display", "none");
        $("label[for='TrendSnapType']").text("View " + $('#rdSnapshot').val());
    });

    $('[name=rdSViewType]').click(function () {
        var idVal = $(this).attr("id");
        $("#tblSnapshotAsOn1").css("display", "table");
        $("label[for='SValueAsOn']").text($("#" + idVal).attr("title"));
        $("#imgmtab2").css("display", "block");
        if ($("#" + idVal).attr("title") == "Month")
            GetTimeLevelForSnapShot(2);
        if ($("#" + idVal).attr("title") == "Year")
            GetTimeLevelForSnapShot(1);
        if ($("#" + idVal).attr("title") == "Week")
            GetTimeLevelForSnapShot(3);
        if ($("#" + idVal).attr("title") == "Day")
            GetTimeLevelForSnapShot(4);
    });
    $('[name=rdSOn]').click(function () {
        var idVal = $(this).attr("id");
        if ($("#" + idVal).val() == "As On") {
            $("#tblSnapshotAsOn").css("display", "table");
            if ($('[name=rdSViewType]').is(":checked"))
                $("#tblSnapshotAsOn1").css("display", "table");
            else
                $("#tblSnapshotAsOn1").css("display", "none")
            $("#tblSnapShotCurrent").css("display", "none");
        }
        if ($("#" + idVal).val() == "Current") {
            $("#tblSnapShotCurrent").css("display", "table");
            $("#tblSnapshotAsOn1").css("display", "none");
            $("#tblSnapshotAsOn").css("display", "none");
        }
    });
    // End Here

    // Get Time For Trend Work

    function GetTimeLevel(id, async) {
        async = async || true;
        $.ajax({
            type: "POST",
            async: async,
            url: "Dashboard.aspx/GetTimeLevel",
            data: '{"typeId":' + id + '}',
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var jsdata = JSON.parse(data.d);
                $('#cphRight_ddlTimeLevel').empty();
                $.each(jsdata, function (key, value) {
                    $('#cphRight_ddlTimeLevel').append($("<option title='" + value.NodeId + "'></option>").val(
                        value.NodeType).html(value.NodeDesc));
                    //}
                });
                isLoad = true;
                $("#imgmtab2").css("display", "none");
            },
            error: function (data) {
                alert(data.d);
                $("#imgmtab2").css("display", "none");
            }
        });
    }

    //End Here

    // Get Time For Snapshot 
    function GetTimeLevelForSnapShot(id, async) {
        async = async || true;
        $.ajax({
            type: "POST",
            async: async,
            url: "Dashboard.aspx/GetTimeLevel",
            data: '{"typeId":' + id + '}',
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var jsdata = JSON.parse(data.d);
                $('#cphRight_ddlSnapShotValue').empty();
                $.each(jsdata, function (key, value) {
                    $('#cphRight_ddlSnapShotValue').append($("<option title='" + value.NodeId + "'></option>").val(
                        value.NodeType).html(value.NodeDesc));

                });
                isLoad = true;
                $("#imgmtab2").css("display", "none");
            },
            error: function (data) {
                alert(data.d);
                $("#imgmtab2").css("display", "none");
            }
        });
    }
    //End 

    //Change Effect on Group Option
    $('#ddlGroupBy').change(function () {
        if ($('#ddlGroupBy').val() == "0") {
            $("label[for='subLevel']").css("display", "none");
            $("#cphRight_ddlSubGroupOption").css("display", "none");
        }
        else {
            $("label[for='subLevel']").css("display", "block");
            $("#cphRight_ddlSubGroupOption").css("display", "block");
        }
        $("#imgLoader").css("display", "block");
        $('#cphRight_ddlSubGroupOption').empty();
        $("#cphRight_TreeviewProduct").css("display", "none");
        $("#cphRight_TreeviewBusinessUnit").css("display", "none");
        $("#cphRight_TreeviewSales").css("display", "none");
        $("#cphRight_TreeviewTime1").css("display", "none");
        $("#cphRight_TreeviewDistributer").css("display", "none");        

        fnGetUnProductSelection();
        fnGetUnSalesSelection();
        $.ajax({
            type: "POST",
            url: "Dashboard.aspx/GetGroupByOption",
            data: '{"groupById":' + $('#ddlGroupBy').val() + '}',
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var jsdata = JSON.parse(data.d);
                $.each(jsdata, function (key, value) {
                    $('#cphRight_ddlSubGroupOption').append($("<option title=" + value.NodeId + " lang=" + value.PositionId + "></option>").val(value.NodeType).html(value.NodeDesc));
                });
                $("#imgLoader").css("display", "none");
            },
            error: function (data) {
                alert(data.d);
                $("#imgLoader").css("display", "none");
            }
        });
    });
    //end
});

// Making Series on bases of Trend and Snapshot for Next Option to Display With Question


function fnMakeFilterSeries() {
    var trendSnapshotDetails = "";
    var timeFilter = "";
    if ($('#rdTrend').is(":checked")) {
        trendSnapshotDetails = "1";
        if ($('#rdTrendStarting').is(":checked") == true)
            trendSnapshotDetails += "^1";
        if ($('#rdTrendCurrent').is(":checked") == true)
            trendSnapshotDetails += "^2";
        if ($('#rdTrendStarting').is(":checked")) {
            if ($("[name=tSView]").is(":checked") == true) {
                var idVal = "";
                if ($("[name=tSView]")[0].checked)
                    idVal = $("[name=tSView]")[0].id;
                else if ($("[name=tSView]")[1].checked)
                    idVal = $("[name=tSView]")[1].id;
                else if ($("[name=tSView]")[2].checked)
                    idVal = $("[name=tSView]")[2].id;
                else if ($("[name=tSView]")[2].checked)
                    idVal = $("[name=tSView]")[3].id;

                timeFilter = $("#cphRight_ddlTimeLevel").val();
                var title = $("#cphRight_ddlTimeLevel option:selected").attr('title');
                timeFilter += "^" + title + "^|";
                if ($("#" + idVal).attr("title") == "Week") {
                    trendSnapshotDetails += "^2";
                    //timeFilter += "^2|";
                    $("#cphRight_hdnFinaViewById").val("2");
                }
                else if ($("#" + idVal).attr("title") == "Month") {
                    trendSnapshotDetails += "^3";
                    //timeFilter += "^3|";
                    $("#cphRight_hdnFinaViewById").val("3");
                }
                else if ($("#" + idVal).attr("title") == "Year") {
                    trendSnapshotDetails += "^4";
                    //timeFilter += "^4|";
                    $("#cphRight_hdnFinaViewById").val("4");
                }
                else if ($("#" + idVal).attr("title") == "Day") {
                    trendSnapshotDetails += "^1";
                    //timeFilter += "^4|";
                    $("#cphRight_hdnFinaViewById").val("1");
                }
            }
            if ($("[name=tSView]").is(":checked")) {
                trendSnapshotDetails += "^" + document.getElementById('cphRight_txtTreandValue').value
            }

        }
        if ($('#rdTrendCurrent').is(":checked")) {
            if ($("[name=tCView]").is(":checked")) {
                var idVal = "";
                if ($("[name=tCView]")[0].checked)
                    idVal = $("[name=tCView]")[0].id;
                else if ($("[name=tCView]")[1].checked)
                    idVal = $("[name=tCView]")[1].id;
                else if ($("[name=tCView]")[2].checked)
                    idVal = $("[name=tCView]")[2].id;
                else if ($("[name=tCView]")[3].checked)
                    idVal = $("[name=tCView]")[3].id;
                //$("[name=tCView]").attr("id");
                if ($("#" + idVal).attr("title") == "WTD") {
                    trendSnapshotDetails += "^2";
                    $("#cphRight_hdnFinaViewById").val("2");
                }
                else if ($("#" + idVal).attr("title") == "MTD") {
                    trendSnapshotDetails += "^3";
                    $("#cphRight_hdnFinaViewById").val("3");
                }
                else if ($("#" + idVal).attr("title") == "YTD") {
                    trendSnapshotDetails += "^4";
                    $("#cphRight_hdnFinaViewById").val("4");
                }
                else if ($("#" + idVal).attr("title") == "DTD") {
                    trendSnapshotDetails += "^1";
                    $("#cphRight_hdnFinaViewById").val("1");
                }
            }
            trendSnapshotDetails += "^" + document.getElementById('cphRight_txtTrendValue1').value
        }
    }

    if ($('#rdSnapshot').is(":checked")) {
        trendSnapshotDetails += "2";
        if ($("#rdAsOn").is(":checked")) {
            trendSnapshotDetails += "^1";
            timeFilter += $("#cphRight_ddlSnapShotValue").val();
            var title = $("#cphRight_ddlSnapShotValue option:selected").attr('title');
            timeFilter += "^" + title + "^|";
            if ($("[name=rdSViewType]").is(":checked")) {
                var idVal = "";
                if ($("[name=rdSViewType]")[0].checked)
                    idVal = $("[name=rdSViewType]")[0].id;
                else if ($("[name=rdSViewType]")[1].checked)
                    idVal = $("[name=rdSViewType]")[1].id;
                else if ($("[name=rdSViewType]")[2].checked)
                    idVal = $("[name=rdSViewType]")[2].id;
                else if ($("[name=rdSViewType]")[3].checked)
                    idVal = $("[name=rdSViewType]")[3].id;
                // $("[name=rdSViewType]").attr("id");
                if ($("#" + idVal).attr("title") == "Week") {
                    trendSnapshotDetails += "^2";
                    //   timeFilter += "^2|";
                    $("#cphRight_hdnFinaViewById").val("2");
                }
                else if ($("#" + idVal).attr("title") == "Month") {
                    trendSnapshotDetails += "^3";
                    // timeFilter += "^3|";
                    $("#cphRight_hdnFinaViewById").val("3");
                }
                else if ($("#" + idVal).attr("title") == "Year") {
                    trendSnapshotDetails += "^4";
                    // timeFilter += "^4|";
                    $("#cphRight_hdnFinaViewById").val("4");
                }
                else if ($("#" + idVal).attr("title") == "Day") {
                    trendSnapshotDetails += "^1";
                    // timeFilter += "^4|";
                    $("#cphRight_hdnFinaViewById").val("1");
                }
            }
        }
        if ($("#rdSnapCurrent").is(":checked")) {
            trendSnapshotDetails += "^2";
            if ($("[name=rdSCCurrentType]").is(":checked")) {
                var idVal = "";
                if ($("[name=rdSCCurrentType]")[0].checked)
                    idVal = $("[name=rdSCCurrentType]")[0].id;
                else if ($("[name=rdSCCurrentType]")[1].checked)
                    idVal = $("[name=rdSCCurrentType]")[1].id;
                else if ($("[name=rdSCCurrentType]")[2].checked)
                    idVal = $("[name=rdSCCurrentType]")[2].id;
                else if ($("[name=rdSCCurrentType]")[3].checked)
                    idVal = $("[name=rdSCCurrentType]")[3].id;
                //$("[name=rdSCCurrentType]").attr("id");

                if ($("#" + idVal).attr("title") == "WTD") {
                    trendSnapshotDetails += "^2";
                    $("#cphRight_hdnFinaViewById").val("2");
                }
                else if ($("#" + idVal).attr("title") == "MTD") {
                    trendSnapshotDetails += "^3";
                    $("#cphRight_hdnFinaViewById").val("3");
                }
                else if ($("#" + idVal).attr("title") == "YTD") {
                    trendSnapshotDetails += "^4";
                    $("#cphRight_hdnFinaViewById").val("4");
                }
                else if ($("#" + idVal).attr("title") == "DTD") {
                    trendSnapshotDetails += "^1";
                    $("#cphRight_hdnFinaViewById").val("1");
                }
            }
        }
        trendSnapshotDetails += "^0";
    }
    $("#cphRight_hdTrendSnapshotString").val((trendSnapshotDetails + "^"));
    $("#cphRight_hdnTimefilter").val(timeFilter);
}
// End

// UnProduct Salection And Product Selection 

function fnGetUnProductSelection() {
    var childEle1 = $("div[activeflag='6']");
    for (var j = 0; j < childEle1.length; j++) {
        if ($(childEle1[j]).children("input[type='checkbox']").parent("div").attr("flg") == 5) {
            $(childEle1[j]).children("input[type='checkbox']").prop("checked", false);
            $(childEle1[j]).children("input[type='checkbox']").parent("div").attr("flg", "3")
            $("#cphRight_hdnServicefilter").val('');
        }
    }
}
function fnGetUnSalesSelection() {
    var childEle1 = $("div[activeflag='4']");
    for (var j = 0; j < childEle1.length; j++) {
        if ($(childEle1[j]).children("input[type='checkbox']").parent("div").attr("flg") == 6) {
            $(childEle1[j]).children("input[type='checkbox']").prop("checked", false);
            $(childEle1[j]).children("input[type='checkbox']").parent("div").attr("flg", "4")
            $("#cphRight_hdnGeographyfilter").val('');
        }
    }
}

// Hide TreeView Node Base on Selection
function GetNodeTypeForGroup(ele) {
    var lvl = $("#" + ele.id).val();
    var id = ele.id;
    var pos = $("#" + ele.id + " option:selected").attr('lang');
    var flg = $("#" + ele.id + " option:selected").attr('title');
    var MainLevel = $("#ddlGroupBy").val();
    var filterid = 0;
    if (lvl != 0)
    {
        $("div[activeflag='" + 6 + "']").each(function () {
            $(this).children("input[type='checkbox']").css("display", "inline");
            $(this).children("input[type='checkbox']").parent("div").attr("flg", "3");
        });
        $("div[activeflag='" + 4 + "']").each(function () {
            $(this).children("input[type='checkbox']").css("display", "inline");
            $(this).children("input[type='checkbox']").parent("div").attr("flg", "4");
        });
        $("div[activeflag='" + 10 + "']").each(function () {
            $(this).children("input[type='checkbox']").css("display", "inline");
            $(this).children("input[type='checkbox']").parent("div").attr("flg", "11");
        });
    }
    if (MainLevel == 1) {
        filterid = 6;
        if (lvl == "32") {
            $("#cphRight_TreeviewBusinessUnit").css("display", "block");
            $("#cphRight_TreeviewProduct").css("display", "none");
        }
        else {
            $("#cphRight_TreeviewBusinessUnit").css("display", "none");
            $("#cphRight_TreeviewProduct").css("display", "block");
        }
        $("#cphRight_TreeviewSales").css("display", "none");
        $("#cphRight_TreeviewDistributer").css("display", "none");
    }
    else if (MainLevel == 2) {
        filterid = 4;
        $("#cphRight_TreeviewSales").css("display", "block");
        $("#cphRight_TreeviewProduct").css("display", "none");
        $("#cphRight_TreeviewBusinessUnit").css("display", "none");
        $("#cphRight_TreeviewDistributer").css("display", "none");
    }
    else if (MainLevel == 3) {
        filterid = 5;
        $("#cphRight_TreeviewSales").css("display", "none");
        $("#cphRight_TreeviewProduct").css("display", "none");
        $("#cphRight_TreeviewBusinessUnit").css("display", "none");
        $("#cphRight_TreeviewDistributer").css("display", "none");
    }
    else if (MainLevel == 5) {
        filterid = 10;
        $("#cphRight_TreeviewDistributer").css("display", "block");
        $("#cphRight_TreeviewProduct").css("display", "none");
        $("#cphRight_TreeviewBusinessUnit").css("display", "none");
        $("#cphRight_TreeviewSales").css("display", "none");
    }
    if (lvl != 0) {
        $("#cphRight_hdnGeographyfilter").val("");
        $("#cphRight_hdnDistributerfilter").val("");
        $("#cphRight_hdnServicefilter").val("");
        var newlvl = 0
        newlvl = parseInt(lvl) + 1;
        $("div[activeflag='" + filterid + "']").each(function () {
            $(this).children("input[type='checkbox']").css("display", "inline");
            if (MainLevel == 1)
                $(this).children("input[type='checkbox']").parent("div").attr("flg", "3");
            else if (MainLevel == 5)
                $(this).children("input[type='checkbox']").parent("div").attr("flg", "11");
            else
                $(this).children("input[type='checkbox']").parent("div").attr("flg", "4");
        });
        $("div[activeflag='" + filterid + "']").each(function () {
            $(this).children("input[type='checkbox']").prop("checked", false);
        });
        $("div[activeflag='" + filterid + "']").each(function () {
            $(this).closest("table").css("display", "block");
        });
        $("div[activeflag='" + filterid + "']").each(function () {
            $(this).closest("table").find("img").css("display", "inline");
        });
        
        if (MainLevel == 1) {
            
            // To Hide Complete Div
            $("div[activeflag='" + filterid + "'][lvlId='" + newlvl + "']").each(function () {
                $(this).closest("table").css("display", "none");
            });
            // To Hide CheckBoxes
            for (var i = 0; i < parseInt(pos); i++) {
                var val = document.getElementById('' + id + '').options[i].value;
                var childEle = $("div[activeflag='" + filterid + "'][lvlId='" + (val) + "']");
                for (var j = 0; j < childEle.length; j++) {
                    $(childEle[j]).children("input[type='checkbox']").css("display", "none");
                }
            }
            // To Hide Close table
            var childEle = $("div[activeflag='" + filterid + "'][lvlId='" + (newlvl + 1) + "']");
            for (var i = 0; i < childEle.length; i++) {
                $(childEle[i]).closest("table").css("display", "none");
            }

            // Hide Image of expend on select level
            var val1 = document.getElementById('' + id + '').options[pos].value;
            var childEle1 = $("div[activeflag='" + filterid + "'][lvlId='" + (val1) + "']");
            for (var j = 0; j < childEle1.length; j++) {
                $(childEle1[j]).closest("table").find("img").css("display", "none");
               // $(childEle1[j]).children("input[type='checkbox']").prop("checked", true);
                //$(childEle1[j]).children("input[type='checkbox']").parent("div").attr("flg", "5");
            }
            // bind click event on checkbox for reset
            $("#hdpopSplitSelection").val(id + "^" + pos + "^" + filterid);
            fntreechkboxdisableForPopup("cphRight_TreeviewProduct", 6, 5, 3);
            fntreechkboxdisableForPopup("cphRight_TreeviewBusinessUnit", 6, 5, 3);
        }
        else if (MainLevel == 2) {
            //
            if (pos == undefined) {
                pos = 1;
            }
            if (flg == "lang=1")
                flg = -1;
            if (flg == -1) {
                var childEle1 = $("div[activeflag='" + filterid + "'][lvlId='" + (lvl) + "']");
                for (var j = 0; j < childEle1.length; j++) {
                    $(childEle1[j]).closest("table").find("img").css("display", "none");
                    $(childEle1[j]).children("input[type='checkbox']").prop("checked", true);
                    $(childEle1[j]).children("input[type='checkbox']").parent("div").attr("flg", "6");
                    var chkBox = $(childEle1[j]).children("input[type='checkbox']").attr("id");
                    var table = $("#" + chkBox).closest("table");
                    if (table.next().length > 0 && table.next()[0].tagName == "DIV") {
                        var childDiv = table.next();
                        var isChecked = $(this).is(":checked");
                        $("input[type=checkbox]", childDiv).each(function () {
                            $(this).closest("table").css("display", "none");
                        });
                    }
                }
                return;
            }
            if (flg == 1) {
                var childEle1 = $("div[activeflag='" + filterid + "'][lvlId='" + (10) + "'][inputid=2]");
                for (var j = 0; j < childEle1.length; j++) {
                    $(childEle1[j]).closest("table").css("display", "none");
                    var chkBox = $(childEle1[j]).children("input[type='checkbox']").attr("id");
                    var table = $("#" + chkBox).closest("table");
                    if (table.next().length > 0 && table.next()[0].tagName == "DIV") {
                        var childDiv = table.next();
                        var isChecked = $(this).is(":checked");
                        $("input[type=checkbox]", childDiv).each(function () {
                            $(this).closest("table").css("display", "none");
                        });
                    }
                }

                $("div[activeflag='" + filterid + "']").each(function () {
                    $(this).children("input[type='checkbox']").css("display", "none");
                });

                $("#hdpopSplitSelection").val(id + "^" + lvl + "^" + filterid);
                var childEle = $("div[activeflag='" + filterid + "'][lvlId='" + lvl + "']");
                for (var j = 0; j < childEle.length; j++) {
                    $(childEle[j]).closest("table").find("img").css("display", "none");
                    $(childEle[j]).children("input[type='checkbox']").css("display", "inline");
                    //$(childEle[j]).children("input[type='checkbox']").prop("checked", true);
                    //$(childEle[j]).children("input[type='checkbox']").parent("div").attr("flg", "6");
                }


                var childEle2 = $("div[activeflag='" + filterid + "'][lvlId='" + 10 + "']");
                for (var j = 0; j < childEle2.length; j++) {
                    $(childEle2[j]).children("input[type='checkbox']").css("display", "none");
                }
                var lvlNew = parseInt(lvl) + 1;
                var childEle1 = $("div[activeflag='" + filterid + "'][lvlId='" + lvlNew + "']");
                for (var j = 0; j < childEle1.length; j++) {
                    $(childEle1[j]).closest("table").css("display", "none");
                    var chkBox = $(childEle1[j]).children("input[type='checkbox']").attr("id");
                    var table = $("#" + chkBox).closest("table");
                    if (table.next().length > 0 && table.next()[0].tagName == "DIV") {
                        var childDiv = table.next();
                        var isChecked = $(this).is(":checked");
                        $("input[type=checkbox]", childDiv).each(function () {
                            $(this).closest("table").css("display", "none");
                        });
                    }
                }
            }
            if (flg == 2) {
                var childEle1 = $("div[activeflag='" + filterid + "'][lvlId='" + (10) + "'][inputid=1]");
                for (var j = 0; j < childEle1.length; j++) {
                    $(childEle1[j]).closest("table").css("display", "none");
                    var chkBox = $(childEle1[j]).children("input[type='checkbox']").attr("id");
                    var table = $("#" + chkBox).closest("table");
                    if (table.next().length > 0 && table.next()[0].tagName == "DIV") {
                        var childDiv = table.next();
                        var isChecked = $(this).is(":checked");
                        $("input[type=checkbox]", childDiv).each(function () {
                            $(this).closest("table").css("display", "none");
                        });
                    }
                }


                $("div[activeflag='" + filterid + "']").each(function () {
                    $(this).children("input[type='checkbox']").css("display", "none");
                });
                $("#hdpopSplitSelection").val(id + "^" + lvl + "^" + filterid);
                var childEle = $("div[activeflag='" + filterid + "'][lvlId='" + lvl + "']");
                for (var j = 0; j < childEle.length; j++) {
                    $(childEle[j]).closest("table").find("img").css("display", "none");
                    $(childEle[j]).children("input[type='checkbox']").css("display", "inline");
                    //$(childEle[j]).children("input[type='checkbox']").prop("checked", true);
                    //$(childEle[j]).children("input[type='checkbox']").parent("div").attr("flg", "6");
                }


                var childEle2 = $("div[activeflag='" + filterid + "'][lvlId='" + 10 + "']");
                for (var j = 0; j < childEle2.length; j++) {
                    $(childEle2[j]).children("input[type='checkbox']").css("display", "none");
                }
                var lvlNew = parseInt(lvl) + 1;
                var childEle1 = $("div[activeflag='" + filterid + "'][lvlId='" + lvlNew + "']");
                for (var j = 0; j < childEle1.length; j++) {
                    $(childEle1[j]).closest("table").css("display", "none");
                    var chkBox = $(childEle1[j]).children("input[type='checkbox']").attr("id");
                    var table = $("#" + chkBox).closest("table");
                    if (table.next().length > 0 && table.next()[0].tagName == "DIV") {
                        var childDiv = table.next();
                        var isChecked = $(this).is(":checked");
                        $("input[type=checkbox]", childDiv).each(function () {
                            $(this).closest("table").css("display", "none");
                        });
                    }
                }
            }
            fntreechkboxdisableForPopup("cphRight_TreeviewSales", 4, 6, 4);
        }
        else if (MainLevel == 5) {
            // To Hide Complete Div
            
            $("div[activeflag='" + filterid + "'][lvlId='" + newlvl + "']").each(function () {
                $(this).closest("table").css("display", "none");
            });

            // To Hide CheckBoxes
            
            for (var i = 0; i < parseInt(lvl); i++) {
                var val=i;
              
                if (val != undefined && val!=lvl && val!="") {
                    var childEle = $("div[activeflag='" + filterid + "'][lvlId='" + (val) + "']");
                    for (var j = 0; j < childEle.length; j++) {
                        $(childEle[j]).children("input[type='checkbox']").css("display", "none");
                    }
                }
            }
            // To Hide Close table
            var childEle = $("div[activeflag='" + filterid + "'][lvlId='" + (newlvl + 1) + "']");
            for (var i = 0; i < childEle.length; i++) {
                $(childEle[i]).closest("table").css("display", "none");
            }
            $("#hdpopSplitSelection").val(id + "^" + pos + "^" + filterid);
            // Hide Image of expend on select level
            var val1 = document.getElementById('' + id + '').options[pos].value;
            var childEle1 = $("div[activeflag='" + filterid + "'][lvlId='" + (val1) + "']");
            for (var j = 0; j < childEle1.length; j++) {
                $(childEle1[j]).closest("table").find("img").css("display", "none");
               // $(childEle1[j]).children("input[type='checkbox']").prop("checked", true);
              //  $(childEle1[j]).children("input[type='checkbox']").parent("div").attr("flg", "9");
            }
            // bind click event on checkbox for reset
            fntreechkboxdisableForPopup("cphRight_TreeviewDistributer", 9, 10, 11);
        }
        else {
            $("div[activeflag='" + filterid + "']").each(function () {
                $(this).closest("table").css("display", "none");
            });
        }
    }
    else {
        $("#cphRight_hdnGeographyfilter").val("");
        $("#cphRight_hdnServicefilter").val("");
        $("#cphRight_hdnDistributerfilter").val("");
        $("div[activeflag='" + filterid + "']").each(function () {
            $(this).children("input[type='checkbox']").css("display", "inline");
            if (MainLevel == 1)
                $(this).children("input[type='checkbox']").parent("div").attr("flg", "3");
            else if (MainLevel == 5)
                $(this).children("input[type='checkbox']").parent("div").attr("flg", "11");
            else
                $(this).children("input[type='checkbox']").parent("div").attr("flg", "4");
        });
        $("div[activeflag='" + filterid + "']").each(function () {
            $(this).children("input[type='checkbox']").prop("checked", false);
        });
        $("div[activeflag='" + filterid + "']").each(function () {
            $(this).closest("table").css("display", "block");
        });
        $("div[activeflag='" + filterid + "']").each(function () {
            $(this).closest("table").find("img").css("display", "inline");
        });
        $("div[activeflag='" + filterid + "']").each(function () {
            $(this).closest("table").css("display", "none");
        });
    }
}
function fnPoupSplitFilterSelection(selType)
{
    var MainLevel = $("#ddlGroupBy").val();
    if (selType == 1) {

        if (MainLevel == 1) {
            var val1 = document.getElementById('' + $("#hdpopSplitSelection").val().split("^")[0] + '').options[$("#hdpopSplitSelection").val().split("^")[1]].value;
            var childEle1 = $("div[activeflag='" + $("#hdpopSplitSelection").val().split("^")[2] + "'][lvlId='" + (val1) + "']");
            for (var j = 0; j < childEle1.length; j++) {
                $(childEle1[j]).closest("table").find("img").css("display", "none");
                $(childEle1[j]).children("input[type='checkbox']").prop("checked", true);
                $(childEle1[j]).children("input[type='checkbox']").parent("div").attr("flg", "5");
            }
        }
        if(MainLevel==2)
        {
            var childEle = $("div[activeflag='" + $("#hdpopSplitSelection").val().split("^")[2] + "'][lvlId='" + $("#hdpopSplitSelection").val().split("^")[1] + "']");
            for (var j = 0; j < childEle.length; j++) {
                $(childEle[j]).closest("table").find("img").css("display", "none");
                $(childEle[j]).children("input[type='checkbox']").css("display", "inline");
                $(childEle[j]).children("input[type='checkbox']").prop("checked", true);
                $(childEle[j]).children("input[type='checkbox']").parent("div").attr("flg", "6");
            }

            var childEle1 = $("div[activeflag='" + $("#hdpopSplitSelection").val().split("^")[2] + "'][lvlId='" + $("#hdpopSplitSelection").val().split("^")[1] + "']");
            for (var j = 0; j < childEle1.length; j++) {
                $(childEle1[j]).closest("table").find("img").css("display", "none");
                $(childEle1[j]).children("input[type='checkbox']").css("display", "inline");
                $(childEle1[j]).children("input[type='checkbox']").prop("checked", true);
                $(childEle1[j]).children("input[type='checkbox']").parent("div").attr("flg", "6");
            }


        }
        if (MainLevel == 5)
        {
            var val1 = document.getElementById('' + $("#hdpopSplitSelection").val().split("^")[0] + '').options[$("#hdpopSplitSelection").val().split("^")[1]].value;
            var childEle1 = $("div[activeflag='" + $("#hdpopSplitSelection").val().split("^")[2] + "'][lvlId='" + (val1) + "']");
            for (var j = 0; j < childEle1.length; j++) {
                $(childEle1[j]).closest("table").find("img").css("display", "none");
                $(childEle1[j]).children("input[type='checkbox']").prop("checked", true);
                $(childEle1[j]).children("input[type='checkbox']").parent("div").attr("flg", "9");
            }
        }
    }
    if (selType == 2)
    {
       
        $("div[activeflag='" + $("#hdpopSplitSelection").val().split("^")[2] + "']").each(function () {
            //$(this).children("input[type='checkbox']").css("display", "inline");
            if (MainLevel == 1)
                $(this).children("input[type='checkbox']").parent("div").attr("flg", "3");
            else if (MainLevel == 5)
                $(this).children("input[type='checkbox']").parent("div").attr("flg", "11");
            else
                $(this).children("input[type='checkbox']").parent("div").attr("flg", "4");
        });
        $("div[activeflag='" + $("#hdpopSplitSelection").val().split("^")[2] + "']").each(function () {
            $(this).children("input[type='checkbox']").prop("checked", false);
        });
    }
}

function fnHideFilterOnFilterTab() {
    fnGetProductSelection();
    fnGetSalesSelection();
    fnGetDistributerSelection();

    if ($("#ddlGroupBy").val() == 1 && $("#cphRight_hdnServicefilter").val() != "") {
        $("#dv_tab_3").hide();
        $("#dv_tab_1").show();
        $("#dv_tab_2").show();
        $("#dv_tab_4").show();
    }
    if (($("#ddlGroupBy").val() != 1 || $("#ddlGroupBy").val() == 1) && $("#cphRight_hdnServicefilter").val() == "") {
        $("#dv_tab_3").show();
    }

    if ($("#ddlGroupBy").val() == 2 && $("#cphRight_hdnGeographyfilter").val() != "") {
        $("#dv_tab_1").hide();
        $("#dv_tab_2").show();
        $("#dv_tab_3").show();
        $("#dv_tab_4").show();
    }
    if (($("#ddlGroupBy").val() != 2 || $("#ddlGroupBy").val() == 2)  && $("#cphRight_hdnGeographyfilter").val() == "") {
        $("#dv_tab_1").show();
    }


    if ($("#ddlGroupBy").val() == 5 && $("#cphRight_hdnDistributerfilter").val() != "") {
        $("#dv_tab_4").hide();
        $("#dv_tab_1").show();
        $("#dv_tab_3").show();
    }
    if (($("#ddlGroupBy").val() != 5 || $("#ddlGroupBy").val() == 5) && $("#cphRight_hdnDistributerfilter").val() == "") {
        $("#dv_tab_4").show();
    }

    if ($("#ddlGroupBy").val() == 0) {
        $("#dv_tab_2").hide();
        $("#dv_tab_3").show();
        $("#dv_tab_1").show();
        $("#dv_tab_4").show();
    }
}
function CheckingPopupAdditionalFilter() {
    if ($("#cphRight_hdnCallFrom").val() == "0" && $("#ddlGroupBy").val() == "1") {
        if ($("#cphRight_ddlSubGroupOption").val() == null || $("#cphRight_ddlSubGroupOption").val() == "" || $("#cphRight_ddlSubGroupOption").val() == "0") {
            btnServiceByOK_onclick();
            btngeographyByOK_onclick();
            btnGetDistributerTree_onClick();
        }
        else {
            btngeographyByOK_onclick();
            btnGetDistributerTree_onClick();
            fnGetProductSelection();
        }
    }
    else if ($("#hdnCallFrom").val() == "0" && $("#ddlGroupBy").val() == "2") {
        if ($("#ddlSubGroupOption").val() == null || $("#ddlSubGroupOption").val() == "" || $("#ddlSubGroupOption").val() == "0") {
            btnServiceByOK_onclick();
            btngeographyByOK_onclick();
            btnGetDistributerTree_onClick();
        }
        else {
            btnServiceByOK_onclick();
            btnGetDistributerTree_onClick();
            fnGetSalesSelection();
        }
    }
    else if ($("#hdnCallFrom").val() == "0" && $("#ddlGroupBy").val() == "5") {
        if ($("#ddlSubGroupOption").val() == null || $("#ddlSubGroupOption").val() == "" || $("#ddlSubGroupOption").val() == "0") {
            btnServiceByOK_onclick();
            btngeographyByOK_onclick();
            btnGetDistributerTree_onClick();
        }
        else {
            btnServiceByOK_onclick();
            btngeographyByOK_onclick();
            fnGetDistributerSelection();
        }
    }
    else if ($("#hdnCallFrom").val() == "0" && $("#ddlGroupBy").val() == "0") {
        btnServiceByOK_onclick();
        btngeographyByOK_onclick();
        btnGetDistributerTree_onClick();
    }
}
function fnGetProductSelection() {
    $("#cphRight_hdnServicefilter").val('');
    $("div[activeflag='6']").each(function () {
        if ($(this).attr("flg") == 5) {
            var val = ((this.id).toString().substring(4)).split('_');
            $("#cphRight_hdnServicefilter").val($("#cphRight_hdnServicefilter").val() + val[0] + "^" + val[1] + "^|");
            if ($('#hdProductNodeText').val() == "")
                $('#hdProductNodeText').val($(this).text());
            else
                $('#hdProductNodeText').val($('#hdProductNodeText').val() + "," + $(this).text());
        }
    });
    fnClosefilter();
    return false;
}
function fnGetUnProductSelection() {
    var childEle1 = $("div[activeflag='6']");
    for (var j = 0; j < childEle1.length; j++) {
        if ($(childEle1[j]).children("input[type='checkbox']").parent("div").attr("flg") == 5) {
            $(childEle1[j]).children("input[type='checkbox']").prop("checked", false);
            $(childEle1[j]).children("input[type='checkbox']").parent("div").attr("flg", "3")
            $("#cphRight_hdnServicefilter").val('');
        }
    }
}
function fnGetUnSalesSelection() {
    var childEle1 = $("div[activeflag='4']");
    for (var j = 0; j < childEle1.length; j++) {
        if ($(childEle1[j]).children("input[type='checkbox']").parent("div").attr("flg") == 6) {
            $(childEle1[j]).children("input[type='checkbox']").prop("checked", false);
            $(childEle1[j]).children("input[type='checkbox']").parent("div").attr("flg", "4")
            $("#cphRight_hdnGeographyfilter").val('');
        }
    }
}
function fnGetUnDistributerSelection() {
    var childEle1 = $("div[activeflag='10']");
    for (var j = 0; j < childEle1.length; j++) {
        if ($(childEle1[j]).children("input[type='checkbox']").parent("div").attr("flg") == 9) {
            $(childEle1[j]).children("input[type='checkbox']").prop("checked", false);
            $(childEle1[j]).children("input[type='checkbox']").parent("div").attr("flg", "11")
            $("#cphRight_hdnGeographyfilter").val('');
        }
    }
}
// End Here

// Treeview Selection on Popup
function fnGetSalesSelection() {
    $("#cphRight_hdnGeographyfilter").val('');
    $("div[activeflag='4']").each(function () {
        if ($(this).attr("flg") == 6) {
            var val = ((this.id).toString().substring(4)).split('_');
            $("#cphRight_hdnGeographyfilter").val($("#cphRight_hdnGeographyfilter").val() + $(this).attr("ppnodeid") + "^" + $(this).attr("ppnodetype") + "^" + $(this).attr("pnodeid") + "^" + $(this).attr("pnodetype") + "^" + val[0] + "^" + val[1] + "^|");
            $('#hdSalesNodeText').val($(this).text());
        }
    });
    //$("#hdnTopMenuId").val();
    fnClosefilter();
    return false;
}
// end Treeview 


// Treeview Distributer Selection on Popup
function fnGetDistributerSelection() {
    $("#cphRight_hdnDistributerfilter").val('');
    $("div[activeflag='10']").each(function () {
        if ($(this).attr("flg") == 9) {
            var val = ((this.id).toString().substring(4)).split('_');
            $("#cphRight_hdnDistributerfilter").val($("#cphRight_hdnDistributerfilter").val() + $(this).attr("ppnodeid") + "^" + $(this).attr("ppnodetype") + "^" + $(this).attr("pnodeid") + "^" + $(this).attr("pnodetype") + "^" + val[0] + "^" + val[1] + "^|");
            $('#hdDistributerText').val($(this).text());
        }
    });
    //$("#hdnTopMenuId").val();
    //alert($("#cphRight_hdnDistributerfilter").val());
    fnClosefilter();
    return false;
}
// end Treeview


function fndsplyfilter(tabid, sender, callFrom) {
    document.getElementById("tab1").style.display = "none";
    document.getElementById("tab2").style.display = "none";
    document.getElementById("tab3").style.display = "none";
    document.getElementById("tab4").style.display = "none";
    document.getElementById("tab8").style.display = "none";
    var x_val = sender.clientX;
    var y_val = sender.clientY;
    if (callFrom == 1) {
        $("body").append($("#dt_tax"));
        $("#dt_tax").css("position", "absolute");
        //$('.tax_css').css('top', screen.height / 4.7);
        $('.tax_css').css('top', "170.404px");
        //$('.tax_css').css('left', $(document).width() / 4);
        if ($(".leftpanel2").css("width")!="36px")
            $('.tax_css').css('left', "280.25px");
        else
            $('.tax_css').css('left', "56.25px");
        //$('.tax_css').css('height', screen.availHeight - 340);
        $('.tax_css').css('height', "auto");
        document.getElementById("tab" + tabid).style.height = "auto";
        //document.getElementById("tbl" + tabid).style.marginTop = "-1px";
        document.getElementById("tbl" + tabid).style.display = "block";
        document.getElementById("tab" + tabid + "_inner").style.height = "320px";
    }
    else {

        $("#mtab4").append($("#dt_tax"));
        $("#dt_tax").css("position", "relative");
        $("#dt_tax").css("top", "-5px");
        if ($("#dv_tab_1").is("none"))
            $("#dt_tax").css("left", "-333px");
        else
            $("#dt_tax").css("left", "-200px");
        if ((screen.width <= 1024) && (screen.height <= 768))
            $("#dt_tax").css("left", "-162px");
        $('.tax_css').css('height', "320px");
        document.getElementById("tab" + tabid).style.height = "250px";
        document.getElementById("tbl" + tabid).style.marginTop = "-1px";
        document.getElementById("tbl" + tabid).style.display = "block";
        document.getElementById("tab" + tabid + "_inner").style.height = "241px";
        document.getElementById("tab" + tabid + "_inner").style.paddingTop = "0px";
    }
    $('.tax_css').css('margin', 'auto');
    document.getElementById("dt_tax").style.display = "block";
    document.getElementById("tab" + tabid).style.display = "block";
    document.getElementById("hdnSelectedTab").value = tabid;
    var fid = 0;
    if (tabid == 1)
        fld = 4;
    if (tabid == 3)
        fld = 6;
    if (tabid == 4)
        fld = 8;
    if (tabid == 8)
        fld = 12;
    if (callFrom == 0 && $("#cphRight_hdnCallFrom").val() == "1") {
        $("#cphRight_hdnServicefilter").val("");
        $("#cphRight_hdnGeographyfilter").val("");
        $("#cphRight_hdnTimefilter").val("");
        $("#cphRight_hdnDistributerfilter").val("");
        $("#cphRight_hdnChannel").val("");

        $("div[pmenuflg='" + fld + "']").each(function () {
            $(this).children("input[type='checkbox']").css("display", "inline");
            $(this).children("input[type='checkbox']").parent("div").attr("flg", "0");
        });

        $("div[pmenuflg='" + fld + "']").each(function () {
            $(this).children("input[type='checkbox']").prop("checked", false);
            $(this).children("input[type='checkbox']").removeAttr("disabled");
        });

        $("div[pmenuflg='" + fld + "']").each(function () {
            $(this).closest("table").css("display", "block");
        });

        $("div[pmenuflg='" + fld + "']").each(function () {
            $(this).closest("table").find("img").css("display", "inline");
        });

    }
    $("#cphRight_hdnCallFrom").val(callFrom);
}

function fnTopMenuClick(menuid) {
    if (menuid == -1)
        document.getElementById("cphRight_hdnTopMenuId").value = 1;
    else
        document.getElementById("cphRight_hdnTopMenuId").value = menuid;
    $("a[menuflg='2']").removeClass("active");
    $("#dv_top_" + menuid).addClass("active");
    if (menuid == -1)
        $("#cphRight_hdnTopMenuId").val(1);
    else
        $("#cphRight_hdnTopMenuId").val(menuid);
    if (menuid == 1) {
        $("#dvFilterSection").show();
        $("#dvScoreCardContainer").hide();
        $("#dvRawData").hide();
        $("#dvTrackID").hide();
        $("#dvGCParent").show();
        CreateSingleOneGraph();
    }
    else if (menuid == -1) {
        $("#dvFilterSection").show();
        $("#dvScoreCardContainer").hide();
        $("#dvRawData").hide();
        $("#dvTrackID").hide();
        $("#dvGCParent").show();
        fnSetParametersForUserChartDemo();
    }

}

function fnSetParametersForUserChartDemo() {
    
    $("#dvLoader").show();
    var MenuId = $("#cphRight_hdnLeftMenuId").val();
    var UserID = $("#cphRight_HdnUserId").val();
    document.getElementById("cphRight_hdnIDDetailsOfGraphs").value = "";
    document.getElementById("cphRight_hdnOtherDetails").value = "";
    try {
        if ($("#cphRight_hdnGraphJSONDetails").val() == "") {
            PageMethods.FnSetParametersForUserChartDemo(parseInt(MenuId), $("#cphRight_hdngraphid").val(), $("#cphRight_hdngroupid").val(), $("#cphRight_hdnviewid").val(), $("#cphRight_HdnUserId").val(), FnSetParametersForUserChartDemo_Success, fnFailed);
        }
        {
            var result = $("#cphRight_hdnGraphJSONDetails").val();
            FnSetParametersForUserChartDemo_Success(result);
        }
    }
    catch (err) {
        $('.modalBackground').css('display', 'none');
        $("#GraphLayoutLoader").css("display", 'none');
    }
}
function fnFailed(err) {
    alert(err);
}
function FnSetParametersForUserChartDemo_Success(result) {
    $("#cphRight_hdnGraphJSONDetails").val(result);
    var dtItems = $.parseJSON('[' + result + ']');
    if (dtItems.length <= 0) {
        fnEndLoading();
        return;
    }
    if (dtItems[0].Table.length == 0) {
        fnEndLoading();
        return;
    }
    $("#dvFadeForProcessing").css("display", "block");
    var strServiceLine = $("#cphRight_hdnServicefilter").val();
    var strGeoGraphy = $("#cphRight_hdnGeographyfilter").val();
    var strTime = $("#cphRight_hdnTimefilter").val();
    var strChannel = $("#cphRight_hdnChannel").val();
    var strDBSales = $("#cphRight_hdnDistributerfilter").val();
    var strProcessStatus = "";
    var strChannelText = ""
    var strCustomerText = "";
    var strTimeText = "";
    var strNewFilter = "";
    var strNewFilterText = "";
    var strFilter1 = "";
    var strFilter2 = "";
    var strRange = "";
    var section = 0;
    var dt2Length = 0;
    var dt1Length = 0;
    for (var Dr2 in dtItems[0].Table1) {
        if ((dtItems[0].Table1[Dr2].LayoutId != null && dtItems[0].Table1[Dr2].LayoutId != "")) {
            if ((dtItems[0].Table1[Dr2].LayoutId != $("#cphRight_hdnLayoutView").val()) && $("#cphRight_hdnLayoutView").val() == 0)
                $("#cphRight_hdnLayoutView").val(dtItems[0].Table1[Dr2].LayoutId);
        }
        else if (($("#cphRight_hdnLayoutView").val() == "" || $("#cphRight_hdnLayoutView").val() == "0") && (dtItems[0].Table1[Dr2].LayoutId == null && dtItems[0].Table1[Dr2].LayoutId == ""))
            $("#cphRight_hdnLayoutView").val(1);
        dt2Length++;
    }
    var ChartCellIdCount = 1;
    _Row = parseInt(((parseFloat(dt2Length) / 2) + 1));
    var IsComplete = false;
    var cWidth = (screen.width - 50 - 200);
    //var cHeight = (screen.height - 650);
    var cHeight = 168;
    if (dt1Length == 2 || dt1Length == 1) {
        cWidth = parseInt((cWidth - 50) / 2);
    }
    else if (dt1Length > 2) {
        cWidth = parseInt((cWidth - 50) / 2);
    }
    ChartCellIdCount = 1;
    var cnt = 0;
    var cntmkval = 0;
    var GraphCount = 0;
    var blockCount = 0;
    var isPosition = false;
    $("#cphRight_hdnTotalGraph").val(dtItems[0].Table.length);
    for (var Dr1 in dtItems[0].Table) {
        GraphCount++;
        var ChartCellId = "";
        var GraphId = dtItems[0].Table[Dr1].GraphId, Name = "", Title = "", SpName = "",
                    ViewName = dtItems[0].Table[Dr1].ViewBy, GroupByName = dtItems[0].Table[Dr1].DrillDownLevel,
                     ViewId = dtItems[0].Table[Dr1].ViewId, GroupById = dtItems[0].Table[Dr1].GroupById,

                     GraphTypeId = dtItems[0].Table[Dr1].GraphTypeID,
                     GraphSPName = (dtItems[0].Table[Dr1].SPName == null) ? "spGraphTotalOverdue" : dtItems[0].Table[Dr1].SPName;
        var MainQuestionText = dtItems[0].Table[Dr1].MainQuestionText;
        var Seq = 0;
        var validPosition = 0;
        var treandValue = 0;
        var treandType = 0;
        try {
            var strViewBy = dtItems[0].Table[Dr1].strViewBy;
        }
        catch (err)
                { }
        Seq = GraphCount; // dtItems[0].Table[Dr1].Seq;
        blockCount = dtItems[0].Table[Dr1].Seq;
        var IsPercentage = parseInt(dtItems[0].Table[Dr1].IsPercentage), Section = parseInt(dtItems[0].Table[Dr1].Section);
        var MainQuestionId = parseInt(dtItems[0].Table[Dr1].MainQuestionID);
        var QstText = dtItems[0].Table[Dr1].MainQuestionText;
        var Tc = "";
        try {
            if ($("#cphRight_hdnCallFrom").val() != 1) {
                strTime = dtItems[0].Table2[Dr1].TimeHieNodeId;
                strServiceLine = dtItems[0].Table2[Dr1].ProductHieNodeId;
                strGeoGraphy = dtItems[0].Table2[Dr1].CompSalesHieNodeId;
                strDBSales = dtItems[0].Table2[Dr1].DBRSalesHieNodeId;
                strChannel = dtItems[0].Table2[Dr1].ChannelNodeId;
            }
            if ($("#cphRight_hdnCallFrom").val() == 1) {
                strServiceLine = $("#cphRight_hdnServicefilter").val();
                strGeoGraphy = $("#cphRight_hdnGeographyfilter").val();
                strTime = $("#cphRight_hdnTimefilter").val();
                strDBSales = $("#cphRight_hdnDistributerfilter").val();
                strChannel = $("#cphRight_hdnChannel").val();
                if (strTime == "")
                    strTime = dtItems[0].Table2[Dr1].TimeHieNodeId;
                if (strServiceLine == "")
                    strServiceLine = dtItems[0].Table2[Dr1].ProductHieNodeId;
                if (strGeoGraphy == "")
                    strGeoGraphy = dtItems[0].Table2[Dr1].CompSalesHieNodeId;
                if(strDBSales=="")
                    strDBSales = dtItems[0].Table2[Dr1].DBRSalesHieNodeId;
                if (strDBSales == null)
                    strDBSales = "";
                if(strChannel == "")
                    strChannel = dtItems[0].Table2[Dr1].ChannelNodeId;
            }
        }
        catch (err)
                { }
        if (Seq > 1 && $("#cphRight_hdnLoadFirstTimeGraph").val() == 0) {
            MakeDivOnCall(Seq, 300);
        }

        Tc = $('#default' + Seq + '');
        $(Tc)
        var divBlock = "";
        if ($("#cphRight_hdnCallFrom").val() == 1) {
            var notsure = $(Tc).children(".panel-heading");
            $(Tc).empty();
            $(Tc).append(notsure);
            divBlock = "<div class='panel-body' id='block" + Seq + "'></div>";
        }
        if ($("#cphRight_hdnLayoutView").val() != "" && $("#cphRight_hdnLayoutView").val() != "0" && $("#cphRight_hdnCallFrom").val() == 0) {
            var notsure = $(Tc).children(".panel-heading");
            $(Tc).empty();
            $(Tc).append(notsure);
            divBlock = "<div class='panel-body' id='block" + Seq + "'></div>";
        }
        $(Tc).find("p").css("margin-top", "0");
        $(Tc).find("p").css("display", "none");
        $(Tc).find("p").text("");
        $(Tc).off();
        var result = replaceAll(MainQuestionText, " ", "_");
        if ($("#cphRight_hdnCallFrom").val() != 1) {
            $(Tc).find(".icons").empty();
            //$(Tc).find(".icons").append("<div style='display: inline-block; width:auto; border-left: 1px solid #e9e9e9;padding:10px 15px;'><img id='editimg" + Seq + "' src='images/edit.png' alt='Edit Graph' width='16px' height='16px' onclick=EditGraph('" + result + "','" + strViewBy + "','" + strTime + "','" + strGeoGraphy + "','" + strServiceLine + "','" + GroupById + "'," + MainQuestionId + ")></div>");
            $(Tc).find(".icons").append("<div style='display: inline-block; width:auto; border-left: 1px solid #e9e9e9;padding:4px 6px;'><img id='rawimg" + Seq + "' src='images/excel.gif' alt='View Filter' width='16px' height='16px' onclick=fnGetRawDataDownload('" + strViewBy + "','" + strGeoGraphy + "','" + strServiceLine + "','" + strTime + "','"+strDBSales+"'," + MainQuestionId + "," + GroupById + ")></div>");
            $(Tc).find(".icons").append("<div style='display: inline-block; width:auto; border-left: 1px solid #e9e9e9;padding:4px 6px;'><img id='img" + Seq + "' src='images/flicon.png' alt='View Filter' width='16px' height='16px' onmouseover='DisplayfilterPopup(this,event);' onmouseout='HidefilterPopup(this)'><div class='filter' style='display:none'>" + fnDisplayFilter(strViewBy, strGeoGraphy, strServiceLine, strTime, strDBSales, strChannel) + "</div></div>");
            $(Tc).find(".icons").append("<div style='display: inline-block; width:auto; border-left: 1px solid #e9e9e9;padding:4px 6px;'><img src='images/close_iconNew.png' alt='Close' width='16px' height='16px' title='Delete Graph' onclick='fnDeleteGraphFromDB(" + dtItems[0].Table[Dr1].UserGraphId + "," + Seq + ")'></div>");
        }
        if ($("#cphRight_hdnCallFrom").val() == 1) {
            $(Tc).find(".icons").empty();
            //$(Tc).find(".icons").append("<div style='display: inline-block; width:auto; border-left: 1px solid #e9e9e9;padding:10px 15px;'><img id='editimg" + Seq + "' src='images/edit.png' alt='Edit Graph' width='16px' height='16px' onclick=EditGraph('" + MainQuestionId + "')/></div>");
            $(Tc).find(".icons").append("<div style='display: inline-block; width:auto; border-left: 1px solid #e9e9e9;padding:4px 6px;'><img id='rawimg" + Seq + "' src='images/excel.gif' alt='Raw Data' width='16px' height='16px' onclick=fnGetRawDataDownload('" + strViewBy + "','" + strGeoGraphy + "','" + strServiceLine + "','" + strTime + "','" + strDBSales + "'," + MainQuestionId + "," + GroupById + ")></div>");
            $(Tc).find(".icons").append("<div style='display: inline-block; width:auto; border-left: 1px solid #e9e9e9;padding:4px 6px;'><img id='img" + Seq + "' src='images/flicon.png' alt='View Filter' width='16px' height='16px' onmouseover='DisplayfilterPopup(this,event);' onmouseout='HidefilterPopup(this)'><div class='filter' style='display:none'>" + fnDisplayFilter(strViewBy, strGeoGraphy, strServiceLine, strTime, strDBSales, strChannel) + "</div></div>");
            $(Tc).find(".icons").append("<div style='display: inline-block; width:auto; border-left: 1px solid #e9e9e9;padding:4px 6px;'><img src='images/close_iconNew.png' alt='Close' width='16px' height='16px' title='Delete Graph' onclick='fnDeleteGraphFromDB(" + dtItems[0].Table[Dr1].UserGraphId + "," + Seq + ")'></div>");
        }
        $(Tc).find(".panel-heading").find("span").text(MainQuestionText);
        //$(Tc).find(".panel-heading").find("span").css("width","65%");
        var divNew = "<div style='width:" + 100 + "%;height:" + cHeight + "px; margin:2px auto 0 auto; ' id='divgraph_2_" + Seq + "' />";
        var IDDetailsOfGraphs = "";
        if ($("#cphRight_hdnIDDetailsOfGraphs").val() == "") {
            IDDetailsOfGraphs = "divgraph_2_" + Seq;
            $("#cphRight_hdnIDDetailsOfGraphs").val(IDDetailsOfGraphs);
        }
        else {
            IDDetailsOfGraphs = $("#cphRight_hdnIDDetailsOfGraphs").val();
            IDDetailsOfGraphs += "$" + "divgraph_2_" + Seq;
            $("#cphRight_hdnIDDetailsOfGraphs").val(IDDetailsOfGraphs);
        }
        var OtherDetails = "";
        if ($("#cphRight_hdnOtherDetails").val() == "") {
            //OtherDetails = ViewId + "~" + GroupById + "~" + GraphId + "~" + GraphSPName + "_V5" + "~" + MainQuestionId + "~" + GraphTypeId + "~" + IsPercentage + "~" + $("#HdnUserId").val() + "~" + strGeoGraphy + "~" + strTime + "~" + strServiceLine + "~" + strNewFilter + "~" + strFilter1 + "~" + strFilter2 + "~" + strRange + "~" + treandType + "~" + treandValue + "~" + strViewBy + "~" + cntmkval;
            OtherDetails = ViewId + "~" + GroupById + "~" + GraphId + "~" + GraphSPName + "~" + MainQuestionId + "~" + GraphTypeId + "~" + IsPercentage + "~" + $("#cphRight_HdnUserId").val() + "~" + strGeoGraphy + "~" + strTime + "~" + strServiceLine + "~" + strDBSales + "~" + strFilter1 + "~" + strFilter2 + "~" + strRange + "~" + treandType + "~" + treandValue + "~" + strViewBy + "~" + cntmkval + "~" + strChannel;
            $("#cphRight_hdnOtherDetails").val(OtherDetails);
        }
        else {
            OtherDetails = $("#cphRight_hdnOtherDetails").val();
            //OtherDetails += "#" + ViewId + "~" + GroupById + "~" + GraphId + "~" + GraphSPName + "_V5" + "~" + MainQuestionId + "~" + GraphTypeId + "~" + IsPercentage + "~" + $("#HdnUserId").val() + "~" + strGeoGraphy + "~" + strTime + "~" + strServiceLine + "~" + strNewFilter + "~" + strFilter1 + "~" + strFilter2 + "~" + strRange + "~" + treandType + "~" + treandValue + "~" + strViewBy + "~" + cntmkval;
            OtherDetails += "#" + ViewId + "~" + GroupById + "~" + GraphId + "~" + GraphSPName + "~" + MainQuestionId + "~" + GraphTypeId + "~" + IsPercentage + "~" + $("#cphRight_HdnUserId").val() + "~" + strGeoGraphy + "~" + strTime + "~" + strServiceLine + "~" + strDBSales + "~" + strFilter1 + "~" + strFilter2 + "~" + strRange + "~" + treandType + "~" + treandValue + "~" + strViewBy + "~" + cntmkval + "~" + strChannel;
            $("#cphRight_hdnOtherDetails").val(OtherDetails);
        }
        cntmkval++;
        if ($("#cphRight_hdnCallFrom").val() == 1) {
            $(Tc).append(divBlock);
        }
        if ($("#cphRight_hdnLayoutView").val() != "" && $("#cphRight_hdnLayoutView").val() != "0" && $("#cphRight_hdnCallFrom").val() == 0)
            $(Tc).append(divBlock);

        $(Tc).children('#block' + Seq + '').append(divNew);
        if ($("#cphRight_hdnLayoutView").val() != "" && $("#cphRight_hdnLayoutView").val() != "0") {
            //$(Tc).attr("style", "cursor:pointer;width:" + graphWidth + "%;float:left;");
            $(Tc).removeAttr("style");
            $(Tc).removeClass("panel-default");
            $(Tc).removeClass("panel-default two");
            $(Tc).removeClass("panel-default three");
            if ($("#cphRight_hdnLayoutView").val() == 3)
                $(Tc).addClass("panel-default three");
            if ($("#cphRight_hdnLayoutView").val() == 5) {
                if (GraphCount <= 4) {
                    $(Tc).addClass("panel-default two");
                }
                else
                    $(Tc).addClass("panel-default");
            }
            if ($("#cphRight_hdnLayoutView").val() == 4) {
                if (GraphCount <= 2) {
                    $(Tc).addClass("panel-default two");
                }
                else
                    $(Tc).addClass("panel-default");
            }
            else if ($("#cphRight_hdnLayoutView").val() == 2)
                $(Tc).addClass("panel-default two");
            else
                $(Tc).addClass("panel-default");
            if (GraphCount % 2 == 0 && $("#cphRight_hdnLayoutView").val() == 2)
                $("#cphRight_hdnCallFromAgain").val(1);
            else if ($("#cphRight_hdnCallFromAgain").val() == "1" && $("#cphRight_hdnLayoutView").val() == 2) {
                $(Tc).attr("style", "cursor:pointer;clear:both;");
                $("#cphRight_hdnCallFromAgain").val(0)
            }
            else if (GraphCount % 2 != 0 && $("#cphRight_hdnLayoutView").val() == 5)
                $(Tc).attr("style", "cursor:pointer;clear:both;");
            else if (parseFloat(GraphCount % 3) == 0 && $("#cphRight_hdnLayoutView").val() == 3) {
                if ($("#cphRight_hdnCallFromAgain").val() == "0") {
                    $(Tc).attr("style", "cursor:pointer;");
                    $("#cphRight_hdnCallFromAgain").val(1);
                }
            }
            else if ($("#cphRight_hdnCallFromAgain").val() == "1" && $("#cphRight_hdnLayoutView").val() == 3) {
                $(Tc).attr("style", "cursor:pointer;clear:both;");
                $("#cphRight_hdnCallFromAgain").val(0)
            }
            else
                $(Tc).attr("style", "cursor:pointer;");
        }
        else {
            $(Tc).attr("style", "cursor:pointer;");
        }
        cnt++;
    }
    if ($("#cphRight_hdnLayoutView").val() != "" && $("#cphRight_hdnLayoutView").val() != "0") {

        var max = 1;
        if ($("#cphRight_hdnLayoutView").val() == 3) {
            max = 3 * (parseInt(GraphCount / 3) + 1);
            var addBlankGraph = max - GraphCount;
            var lenDiv = $(".panel-default").length;
            for (var j = (GraphCount + 1); j <= lenDiv; j++) {
                $("#default" + j).remove();
            }
            for (var i = 0; i < addBlankGraph; i++) {
                GraphCount = GraphCount + 1;
                $("#default" + GraphCount).remove();
                MakeDivOnCall(GraphCount, 230);
                $("#default" + GraphCount).removeClass("panel-default");
                $("#default" + GraphCount).removeClass("panel-default two");
                $("#default" + GraphCount).addClass("panel-default three");
                if ($("#cphRight_hdnCallFromAgain").val() == 1) {
                    $("#default" + GraphCount).attr("style", "cursor:pointer;clear:both;");
                    $("#cphRight_hdnCallFromAgain").val(0)
                }
            }
        }
        else if ($("#cphRight_hdnLayoutView").val() == 2) {
            max = 2 * (parseInt(GraphCount / 2) + 1);
            var addBlankGraph = max - GraphCount;
            var lenDiv = $(".panel-default").length;
            for (var j = (GraphCount + 1); j <= lenDiv; j++) {
                $("#cphRight_default" + j).remove();
            }
            for (var i = 0; i < addBlankGraph; i++) {
                GraphCount = GraphCount + 1;
                $("#default" + GraphCount).remove();
                MakeDivOnCall(GraphCount, 230);
                $("#default" + GraphCount).removeClass("panel-default");
                $("#default" + GraphCount).removeClass("panel-default three");
                $("#default" + GraphCount).addClass("panel-default two");
                if ($("#cphRight_hdnCallFromAgain").val() == 1) {
                    $("#default" + GraphCount).attr("style", "cursor:pointer;clear:both;");
                    $("#cphRight_hdnCallFromAgain").val(0)
                }
            }
        }
        else if (($("#cphRight_hdnLayoutView").val() == 4) && GraphCount == 1) {
            max = 1 * (parseInt(GraphCount / 1) + 1);
            var addBlankGraph = max - GraphCount;
            var lenDiv = $(".panel-default").length;
            for (var j = (GraphCount + 1); j <= lenDiv; j++) {
                $("#default" + j).remove();
            }
            for (var i = 0; i < addBlankGraph; i++) {
                GraphCount = GraphCount + 1;
                $("#default" + GraphCount).remove();
                MakeDivOnCall(GraphCount, 230);
                $("#default" + GraphCount).removeClass("panel-default");
                $("#default" + GraphCount).removeClass("panel-default three");
                $("#default" + GraphCount).addClass("panel-default two");
            }
            for (var i = 0; i < 1; i++) {
                GraphCount = GraphCount + 1;
                $("#default" + GraphCount).remove();
                MakeDivOnCall(GraphCount, 230);
            }
        }
        else if (($("#cphRight_hdnLayoutView").val() == 5) && GraphCount == 3) {
            max = 1 * (parseInt(GraphCount / 1) + 1);
            var addBlankGraph = max - GraphCount;
            var lenDiv = $(".panel-default").length;
            for (var j = (GraphCount + 1); j <= lenDiv; j++) {
                $("#default" + j).remove();
            }
            for (var i = 0; i < addBlankGraph; i++) {
                GraphCount = GraphCount + 1;
                $("#default" + GraphCount).remove();
                MakeDivOnCall(GraphCount, 230);
                $("#default" + GraphCount).removeClass("panel-default");
                $("#default" + GraphCount).removeClass("panel-default three");
                $("#default" + GraphCount).addClass("panel-default two");
            }
            for (var i = 0; i < 1; i++) {
                GraphCount = GraphCount + 1;
                $("#default" + GraphCount).remove();
                MakeDivOnCall(GraphCount, 230);
            }
        }
        else {
            max = 1 * (parseInt(GraphCount / 1) + 1);
            var addBlankGraph = max - GraphCount;
            var lenDiv = $(".panel-default").length;
            for (var j = (GraphCount + 1); j <= lenDiv; j++) {
                $("#default" + j).remove();
            }
            for (var i = 0; i < addBlankGraph; i++) {
                GraphCount = GraphCount + 1;
                $("#default" + GraphCount).remove();
                MakeDivOnCall(GraphCount, 230);
            }
        }
    }
    else {
        max = 1 * (parseInt(GraphCount / 1) + 1);
        var addBlankGraph = max - GraphCount;
        var lenDiv = $(".panel-default").length;
        for (var j = (GraphCount + 1); j <= lenDiv; j++) {
            $("#default" + j).remove();
        }
        for (var i = 0; i < addBlankGraph; i++) {
            GraphCount = GraphCount + 1;
            $("#default" + GraphCount).remove();
            MakeDivOnCall(GraphCount, 230);
        }
    }
    $("#cphRight_hdnLoadFirstTimeGraph").val(1)
    try {
        var strGraphCellID = document.getElementById("cphRight_hdnIDDetailsOfGraphs").value;
        var strGraphOtherDetails = document.getElementById("cphRight_hdnOtherDetails").value;
        if (document.getElementById("cphRight_hdnIDDetailsOfGraphs").value != "" && document.getElementById("cphRight_hdnIDDetailsOfGraphs").value != null) {
            fnCreateCharts(strGraphCellID, strGraphOtherDetails);
        }
        else {
            $('.modalBackground').css('display', 'none');
            $("#GraphLayoutLoader").css("display", 'none');
            $("#dvFadeForProcessing").css("display", "none");
        }
    }
    catch (err)
            { alert(err); $("#dvFadeForProcessing").css("display", "none"); }
}

function CreateSingleOneGraph() {
    FnGraphLoader(1);
    var OtherDetails = "";
    var ViewId = "";
    var GroupById = "";
    var GraphId = "";
    var GraphSPName = "";
    var MainQuestionId = "";
    var GraphTypeId = "";
    var IsPercentage = "";
    var strServiceLine = $("#cphRight_hdnServicefilter").val();
    var strGeoGraphy = $("#cphRight_hdnGeographyfilter").val();
    var strTime = $("#cphRight_hdnTimefilter").val();
    var strChannel = $("#cphRight_hdnChannel").val();
    var strDBSales = $("#cphRight_hdnDistributerfilter").val();
    var cntmkval = 0;
    var strProcessStatus = "";
    var strChannelText = ""
    var strCustomerText = "";
    var strTimeText = "";
    var strNewFilter = "";
    var strNewFilterText = "";
    var strFilter1 = "";
    var strFilter2 = "";
    var strRange = "";
    var TreandType = 0;
    var TreandValue = 0;
    ViewId = 2;
    if ($('#cphRight_ddlSubGroupOption').val() == null)
        GroupById = 0;
    else
        GroupById = $('#cphRight_ddlSubGroupOption').val();

    GraphId = 1;
    //GraphSPName = "SpMDXQuery_QuestionBasedReport_V5";
    GraphSPName = "SpMDXQuery_QuestionBasedReport";
    MainQuestionId = $('#cphRight_rdQuestionList input:checked').val();
    GraphTypeId = $('#cphRight_rdQuestionList input:checked').parent().attr("title");

    if (GraphTypeId > 1 && $('#rdTrend').is(":checked")) {
        GroupById = 0;
        strServiceLine = "";
        strGeoGraphy = "";
        strDBSales = "";
        btnServiceByOK_onclick();
        btngeographyByOK_onclick();
        btnGetDistributerTree_onClick();
        strServiceLine = $("#cphRight_hdnServicefilter").val();
        strGeoGraphy = $("#cphRight_hdnGeographyfilter").val();
        strDBSales = $("#cphRight_hdnDistributerfilter").val();
    }
    IsPercentage = 0;
    var finalTrendSnapShot = $("#cphRight_hdTrendSnapshotString").val();
    // fnGetGraphTypeId($("#hdnFinaViewById").val(), GroupById, GraphTypeId);
    var finalGraphTypeId = "";  //$("#hdnFinalGraphTypeId").val();
    if ($('#rdTrend').is(":checked"))
        finalGraphTypeId = 1;
    else
        finalGraphTypeId = 2;
    OtherDetails = ViewId + "~" + GroupById + "~" + GraphId + "~" + GraphSPName + "~" + MainQuestionId + "~" + finalGraphTypeId + "~" + IsPercentage + "~" + $("#cphRight_HdnUserId").val() + "~" + strGeoGraphy + "~" + strTime + "~" + strServiceLine + "~" + strDBSales + "~" + strFilter1 + "~" + strFilter2 + "~" + strRange + "~" + TreandType + "~" + TreandValue + "~" + finalTrendSnapShot + "~" + cntmkval + "~" + strChannel;
    $("#cphRight_hdnOtherDetails").val(OtherDetails);
    document.getElementById("cphRight_hdnIDDetailsOfGraphs").value = 'divgraph_1_1';
    if ((screen.width <= 1024) && (screen.height <= 768))
        $("#divgraph_1_1").css("width", "700px");
    var strGraphCellID = document.getElementById("cphRight_hdnIDDetailsOfGraphs").value;
    var strGraphOtherDetails = document.getElementById("cphRight_hdnOtherDetails").value;
    try {
        if (document.getElementById("cphRight_hdnIDDetailsOfGraphs").value != "" && document.getElementById("cphRight_hdnIDDetailsOfGraphs").value != null) {
            fnCreateCharts(strGraphCellID, strGraphOtherDetails, "1");
        }
    }
    catch (err) {
        alert(err);
    }
}

function dsplhidefilter_first(MenuId) {
    fntreechkboxdisableForGroupByProduct("cphRight_TreeviewGeography", 4, 1);
    fntreechkboxdisableForGroupByProduct("cphRight_TreeviewService", 6, 1);
    fntreechkboxdisableForGroupByProduct("cphRight_trvDistributor", 8, 1);
    fntreechkboxdisableForGroupByProduct("cphRight_TreeviewTime", 5, 1);
    fntreechkboxdisableForGroupByProduct("cphRight_TreeViewChannel", 12, 1);
}
var salesTreelvlId = "", productTreelvlId = "", distributerTreelvlId = "", timeTreelvlId = ""; ChannelTreelvlId = "";
function fntreechkboxdisableForGroupByProduct(treeview, menuflg, flg) {

    $("[id*=" + treeview + "] img").attr("alt", "Expand");
    $("[id*=" + treeview + "] input[type='checkbox']").bind("click", function () {
        if ($(this).is(":checked")) {

            if (treeview == "cphRight_TreeviewGeography") {
                if (salesTreelvlId != "" && salesTreelvlId != $(this).attr("lvlid")) {
                    $(this).attr("checked", false);
                    alert("Please Make your selection on same level !");
                    return;
                }
            }
            else if (treeview == "cphRight_TreeviewService") {
                if (productTreelvlId != "" && productTreelvlId != $(this).attr("lvlid")) {
                    $(this).attr("checked", false);
                    alert("Please Make your selection on same level !");
                    return;
                }
            }
            else if (treeview == "cphRight_trvDistributor") {
                if (distributerTreelvlId != "" && distributerTreelvlId != $(this).attr("lvlid")) {
                    $(this).attr("checked", false);
                    alert("Please Make your selection on same level !");
                    return;
                }
            }
            else if (treeview == "cphRight_TreeviewTime") {
                if (timeTreelvlId != "" && timeTreelvlId != $(this).attr("lvlid")) {
                    $(this).attr("checked", false);
                    alert("Please Make your selection on same level !");
                    return;
                }
            }
            else if (treeview == "cphRight_TreeViewChannel") {
                if (ChannelTreelvlId != "" && ChannelTreelvlId != $(this).attr("lvlid")) {
                    $(this).attr("checked", false);
                    alert("Please Make your selection on same level !");
                    return;
                }
            }

            $(this).parent("div").attr("flg", flg);
            var lvlId = $(this).attr("lvlid");
            if (treeview == "cphRight_TreeviewGeography")
                salesTreelvlId = lvlId;
            else if (treeview == "cphRight_TreeviewService")
                productTreelvlId = lvlId;
            else if (treeview == "cphRight_trvDistributor")
                distributerTreelvlId = lvlId;
            else if (treeview == "cphRight_TreeviewTime")
                timeTreelvlId = lvlId;
            else if (treeview == "cphRight_TreeViewChannel")
                ChannelTreelvlId = lvlId;
            var id = $(this).attr("id");
            var table = $(this).closest("table");
            if (table.next().length > 0 && table.next()[0].tagName == "DIV") {
                var childDiv = table.next();
                var isChecked = $(this).is(":checked");
                $("input[type=checkbox]", childDiv).each(function () {
                    if (isChecked) {
                        $(this).attr("checked", false);
                        $(this).parent("div").attr("flg", "0");
                        $(this).attr("disabled", "true");
                    } else {
                        $(this).removeAttr("disabled");
                    }
                });
            }
        }
        else {
            $(this).parent("div").attr("flg", "0");
            var lvlId = $(this).attr("lvlid");
            var table = $(this).closest("table");
            if (table.next().length > 0 && table.next()[0].tagName == "DIV") {
                var childDiv = table.next();
                var isChecked = $(this).is(":checked");
                $("input[type=checkbox]", childDiv).each(function () {
                    $(this).parent("div").attr("flg", "0");
                    $(this).removeAttr("disabled");
                });
            }
        }
    });
}

function MakeDivOnCall(id, removeHeight) {
    $('<div class="panel-default" id=default' + id + '><div class="panel-heading"><span id=spn' + id + '>Area Chart</span><div class="icons"></div><div class="clear"></div></div><div class="panel-body" id=block' + id + '><p>Click To Add Graph</p></div></div>').click(function () {
        fnClosefilter();
        $("#cphRight_hdnCallFrom").val(0);
        $('#hdSeqId').val($(this).attr('id'));
        $("#myModal").modal();
    }).appendTo('.mainpanel').insertBefore("#lasthr");
}
function fnGetFilterName(filtertype, strparameter) {
    try {
        $.ajax({
            type: "POST",
            async: false,
            url: "Dashboard.aspx/GetFilterName",
            data: JSON.stringify({ filtertype: filtertype, strparameter: strparameter }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $("#hdFilterDetails").val(msg.d);
            }
        });

    }
    catch (err) {
        alert(err);
    }
}
function fnDisplayFilter(strviewBy, salesDetails, productDetails, timeDetails, dbSalesDetails, strChannel) {
    var strview = "";
    if (strviewBy != null)
        strview = strviewBy.split("^");
    var trendsnapshotfilter = "";
    if (strview[0] == "1") {
        trendsnapshotfilter += "Trend "
        if (strview[1] == "1") {
            var text = "";
            trendsnapshotfilter += "--> Ending"
            if (strview[2] == "2") {
                trendsnapshotfilter += "--> Week";
                text = "Week";
            }
            if (strview[2] == "3") {
                trendsnapshotfilter += "--> Month";
                text = "Month";
            }
            if (strview[2] == "4") {
                trendsnapshotfilter += "--> Year";
                text = "Year";
            }
            if (strview[2] == "1") {
                trendsnapshotfilter += "--> Day";
                text = "Day";
            }
            trendsnapshotfilter += " For Past :" + strview[3] + " " + text;
        }
        else {
            trendsnapshotfilter += "--> Current"
            var text = "";
            if (strview[2] == "2") {
                trendsnapshotfilter += "--> WTD";
                text = "WTD";
            }
            if (strview[2] == "3") {
                trendsnapshotfilter += "--> MTD";
                text = "MTD";
            }
            if (strview[2] == "4") {
                trendsnapshotfilter += "--> YTD";
                text = "YTD";
            }
            if (strview[2] == "1") {
                trendsnapshotfilter += "--> Day";
                text = "Day";
            }
            trendsnapshotfilter += "--> For Past :" + strview[3] + " " + text;
        }
    }
    else {
        trendsnapshotfilter += "Snapshot "
        if (strview[1] == "1") {
            trendsnapshotfilter += "--> As On"
            if (strview[2] == "2") {
                trendsnapshotfilter += "--> Week Ending";
            }
            if (strview[2] == "3") {
                trendsnapshotfilter += "--> Month Ending";
            }
            if (strview[2] == "4") {
                trendsnapshotfilter += "--> Year Ending";
            }
            if (strview[2] == "1") {
                trendsnapshotfilter += "--> Day";
            }

            //fnGetFilterName(3, timeDetails);

            // trendsnapshotfilter += "--> " + $("#hdFilterDetails").val().replace("-->", "");
        }
        else {
            trendsnapshotfilter += "--> Current"
            if (strview[2] == "2") {
                trendsnapshotfilter += "--> WTD";
            }
            if (strview[2] == "3") {
                trendsnapshotfilter += "--> MTD";
            }
            if (strview[2] == "4") {
                trendsnapshotfilter += "--> YTD";
            }
            if (strview[2] == "1") {
                trendsnapshotfilter += "--> Day";
            }
        }
    }
    fnGetFilterName(3, timeDetails);
    var str = $("#hdFilterDetails").val();
    trendsnapshotfilter += "<br/>";
    trendsnapshotfilter += "<hr/>";
    if (str != "" && str != null) {
        trendsnapshotfilter += "<u>Time Filter</u><br/>";
        trendsnapshotfilter += str.replace("-->", "");
        trendsnapshotfilter += "<hr/>";
    }
    if (salesDetails != "" && salesDetails != null) {
        fnGetFilterName(1, salesDetails);
        str = $("#hdFilterDetails").val();
        trendsnapshotfilter += "<u>Sales Filter</u><br/>";
        trendsnapshotfilter += str.substring(0, (str.length - 3));
        trendsnapshotfilter += "<hr/>";
    }
    else
        $("#hdFilterDetails").val("");
    if (strChannel != "" && strChannel != null) {
        fnGetFilterName(8, strChannel);
        str = $("#hdFilterDetails").val();
        trendsnapshotfilter += "<u>Channel Filter</u><br/>";
        trendsnapshotfilter += str.substring(0, (str.length - 3));
        trendsnapshotfilter += "<hr/>";
    }
    else
        $("#hdFilterDetails").val("");
    if (productDetails != "" && productDetails != null) {
        trendsnapshotfilter += "<u>Product Filter</u><br/>";
        fnGetFilterName(2, productDetails);
        str = $("#hdFilterDetails").val();
        trendsnapshotfilter += str.substring(0, (str.length - 3));
        trendsnapshotfilter += "<hr/>";
    }
    else if (dbSalesDetails != "" && dbSalesDetails != null)
    {
        trendsnapshotfilter += "<u>Distributer Filter</u><br/>";
        fnGetFilterName(4, dbSalesDetails);
        str = $("#hdFilterDetails").val();
        trendsnapshotfilter += str.substring(0, (str.length - 3));
        trendsnapshotfilter += "<hr/>";
    }
    else
        $("#hdFilterDetails").val("");

    return trendsnapshotfilter;
}
function DisplayfilterPopup(ele, event) {
    $("#" + ele.id).siblings('div').css("display", "block");
    var offset = $("#" + ele.id).siblings('div').offset();
    if (getBrowser() == "Chrome") {
        $("#" + ele.id).siblings('div').css('left', (event.pageX - 601) + "px");
        $("#" + ele.id).siblings('div').css('top', (event.pageY - 150) + "px");
    }
    else {
        $("#" + ele.id).siblings('div').css('left', (event.pageX - 571) + "px");
        $("#" + ele.id).siblings('div').css('top', (event.pageY - 90) + "px");
    }
}
function HidefilterPopup(ele) {
    $("#" + ele.id).siblings('div').hide();
}
function getBrowser() {
    if (navigator.userAgent.indexOf("Chrome") != -1) {
        return "Chrome";
    } else if (navigator.userAgent.indexOf("Opera") != -1) {
        return "Opera";
    } else if (navigator.userAgent.indexOf("MSIE") != -1) {
        return "IE";
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return "Firefox";
    } else {
        return "unknown";
    }
}

function fnSaveGraphInDB() {
    var OtherDetails = "";
    var ViewId = "";
    var GroupById = "";
    var GraphId = "";
    var GraphSPName = "";
    var MainQuestionId = "";
    var GraphTypeId = "";
    var IsPercentage = "";
    var strServiceLine = $("#cphRight_hdnServicefilter").val();
    var strGeoGraphy = $("#cphRight_hdnGeographyfilter").val();
    var strTime = $("#cphRight_hdnTimefilter").val();
    var strDBSales = $("#cphRight_hdnDistributerfilter").val();
    var strChannel = $("#cphRight_hdnChannel").val();
    var strFilter1 = "";
    var TreandType = 0;
    var TreandValue = 0;
    var strTimeText = $('#hdTimeNodeText').val();
    var strProductText = $('#hdProductNodeText').val();
    var strSalesText = $('#hdSalesNodeText').val();
    var strDBSalesText = $("#hdDistributerText").val();
    var strChannelText = $("#hdChannelText").val();
    var StrProcessFilter = "";
    var StrScopeFilter = "";
    ViewId = 0;
    TreandValue = 0;
    TreandType = 0;
    if ($('#cphRight_ddlSubGroupOption').val() == null)
        GroupById = 0;
    else
        GroupById = $('#cphRight_ddlSubGroupOption').val();
    GraphId = 1;
    var seqId = $('#hdSeqId').val();
    var blockId = seqId.replace("default", "");
    MainQuestionId = $('#cphRight_rdQuestionList input:checked').val();
    GraphTypeId = $('#cphRight_rdQuestionList input:checked').parent().attr("title"); ;
    if (GraphTypeId > 1 && $('#rdTrend').is(":checked")) {
        GroupById = 0;
        strServiceLine = "";
        strGeoGraphy = "";
        strDBSales = "";
        btnServiceByOK_onclick();
        btngeographyByOK_onclick();
        btnGetDistributerTree_onClick();
        strServiceLine = $("#cphRight_hdnServicefilter").val();
        strGeoGraphy = $("#cphRight_hdnGeographyfilter").val();
        strDBSales = $("#cphRight_hdnDistributerfilter").val();
        strProductText = $('#hdProductNodeText').val();
        strSalesText = $('#hdSalesNodeText').val();
        strDBSalesText = $("#hdDistributerText").val();
    }
    IsPercentage = 0;
    var UserGraphID = 0;
    //var finalGraphTypeId = $("#hdnFinalGraphTypeId").val();
    var finalGraphTypeId = "";  //$("#hdnFinalGraphTypeId").val();
    if ($('#rdTrend').is(":checked"))
        finalGraphTypeId = 1;
    else
        finalGraphTypeId = 2;
    var strViewBy = $("#cphRight_hdTrendSnapshotString").val();
    try {
        PageMethods.SaveGraphInDB(strServiceLine, strProductText, strTime, strTimeText, strChannel, strChannelText, strGeoGraphy, strSalesText, strDBSales, strDBSalesText, parseInt(blockId), parseInt(ViewId), parseInt(GroupById), parseInt(MainQuestionId), parseInt(finalGraphTypeId), parseInt(TreandType), parseInt(TreandValue), strViewBy, parseInt(UserGraphID), fnSaveGraphInDB_Success, fnSaveGraphInDB_Fail);
    }
    catch (err) {
        alert(err);
    }
}
function fnSaveGraphInDB_Success(res) {
    alert(res);
    $("#cphRight_hdnGraphJSONDetails").val('');
    CloseGraph();
    fnTopMenuClick(-1);
    $('#myModal').modal('hide')
}
function fnSaveGraphInDB_Fail(res) {
    alert(res._message);
}
function fnDeleteGraphFromDB(userGraphId, blockId) {
    try {
        if (confirm("Are your sure want to delete the graph")) {
            PageMethods.DeleteGraphFromDB(parseInt(userGraphId), fnDeleteGraphFromDB_Success, fnDeleteGraphFromDB_Fail);
            $("#default" + blockId).hide();
        }
    }
    catch (err) {
        alert(err);
    }
}
function fnDeleteGraphFromDB_Success(res) {
    alert(res);

}
function fnDeleteGraphFromDB_Fail(res) {
    alert(res);
}
function fnGetRawDataDownload(strviewBy, salesDetails, productDetails, timeDetails,dbSalesDetails, questionId, GroupBy) {
    try {
        $("#cphRight_hdnstrTimeRaw").val(timeDetails);
        $("#cphRight_hdnstrSalesRaw").val(salesDetails);
        $("#cphRight_hdnstrProductRaw").val(productDetails);
        $("#cphRight_hdnstrDBSalesRaw").val(dbSalesDetails);
        $("#cphRight_hdnQuestionRaw").val(questionId);
        $("#cphRight_hdnViewByRaw").val(strviewBy);
        $("#cphRight_hdnGroupByRaw").val(GroupBy);
        document.getElementById("cphRight_btnExcel").click(); return false;
    }
    catch (err) {
        alert(err);
    }
}

// Closing Filter && Graph //

function fnCloseDetails() {
    document.getElementById("dvDataDetails").style.display = "none";
    document.getElementById("dvDataDetailsImage").style.display = "none";
    document.getElementById("dvDataDetails").innerHTML = "";
    $('.modalBackground').css('display', 'none');

}

function CloseGraph() {
    $('.modalBackground').css('display', 'none');
    $('#litab1').addClass("active");
    $('#litab1.active').siblings().removeClass("active");
    $('#mtab1').show().addClass("tab active");
    $('#mtab1.active').siblings().removeClass("active").hide();
    $('#btnAddGraph').css("display", "none");
    $('#btnNext').css("display", "block");
    $('#hdTabValue').val(0);
    $('#litab3').show();
    $('#litab2 a').addClass("disable");
    $('#litab3 a').addClass("disable");
    $('#litab4 a').addClass("disable");
    $('#litab5 a').addClass("disable");
    $("#rdSnapshot").prop("checked", false);
    $("#rdTrend").prop("checked", false);

    var radioArray = $("#tdTrendViewRecord").find(":radio");
    $.each(radioArray, function (index, rd) {
        $(rd).prop("checked", false);
    });
    var radioArray1 = $("#tdSnapShotViewRecord").find(":radio");
    $.each(radioArray1, function (index, rd) {
        $(rd).prop("checked", false);
    });

    $("#trTrendView").css("display", "none");
    $("#trSnapshotView").css("display", "none");
    $("label[for='TrendSnapType']").text('');
    $('#cphRight_rdQuestionList input:radio').prop("checked", false);
    $("#ddlGroupBy").val(0);
    $('#cphRight_ddlSubGroupOption').val(0);
    $("#cphRight_TreeviewProduct").css("display", "none");
    $("#cphRight_TreeviewBusinessUnit").css("display", "none");
    $("#cphRight_TreeviewSales").css("display", "none");
    $("#cphRight_TreeviewTime1").css("display", "none");

    $("label[for='subLevel']").css("display", "none");
    $("#cphRight_ddlSubGroupOption").css("display", "none");

    $("#trSnapshotView").css("display", "none");
    $("#tblSnapShotCurrent").css("display", "none");
    $("#tblSnapshotAsOn1").css("display", "none");
    $("#tblSnapshotAsOn").css("display", "none");
    $("#trTrendView").css("display", "none");


    $("#trSnapshotView").css("display", "none");
    $("#trTrendView").css("display", "none");
    $("#tblTrendViewStarting").css("display", "none");
    $("#tblCurrentTrendView").css("display", "none");
    $("#tblTrendCurrentValue1").css("display", "none");
    $("#tblStartingViewValue").css("display", "none");
    document.getElementById('cphRight_txtTrendValue1').value = "";
    document.getElementById('cphRight_txtTreandValue').value = "";
    $("label[for='EditQuestion']").text("");
    noofmeasure = "";
    fnClearfilter();
    setup = 0;
}
//#end Closing Graph and Filter


// Change Layout 
function FnChangeLayout(layout) {
    fnStartLoading();
    $("#cphRight_hdnLayoutView").val(layout);
    fnTopMenuClick(-1);
}
function FnSaveGraphLayout() {
    fnStartLoading();
    PageMethods.SaveGraphLayout($("#cphRight_hdnLayoutView").val(), SaveGraphLayout_Pass, SaveGraphLayout_fail);
}
function SaveGraphLayout_Pass(res) {
    alert(res);
    fnEndLoading();
}
function SaveGraphLayout_fail() {
    alert("Due to some technical reasons, we are unable to process your request !");
    fnEndLoading();
}
function fnStartLoading() {
    $("#dvFadeForProcessing").css("display", "block");
}
function fnEndLoading() {
    $("#dvFadeForProcessing").css("display", "none");
}
//End Layout

// TreeView Enable disable Child 
function fntreechkboxdisableForPopup(treeview, menuflg, flg, unflag) {
    $("[id*=" + treeview + "] img").attr("alt", "Expand");
    $("[id*=" + treeview + "] input[type='checkbox']").bind("click", function () {
        if ($(this).is(":checked")) {
            $(this).parent("div").attr("flg", flg);
            var lvlId = $(this).attr("lvlid");
            var id = $(this).attr("id");
        }
        else {
            $(this).parent("div").attr("flg", unflag);
            var lvlId = $(this).attr("lvlid");
        }
    });
}
//End treeview

// Clear Filter Using Popup Filter Command
function fnClearfilter(callFrom) {
    callFrom = callFrom || 0;
    if (callFrom == 0) {
        $("#cphRight_hdnGeographyfilter").val('');
        $("#cphRight_hdnTimefilter").val('');
        $("#cphRight_hdnServicefilter").val('');
        $("#cphRight_hdnTeamfilter").val('');
        $("#hdProductNodeText").val('');
        $("#hdSalesNodeText").val('');
        $("#hdTimeNodeText").val('');
        $("#cphRight_hdnDistributerfilter").val('');
        $("#hdDistributerText").val('');
        $("#cphRight_hdnChannel").val('');
        $('#hdChannelText').val('');

        fnInitialstatefilter("4");
        fnInitialstatefilter("5");
        fnInitialstatefilter("6");
        fnInitialstatefilter("8");
        fnInitialstatefilter("12");

        $("input[menuflg='8']").attr("flg", "0");
        $("input[menuflg='8']").prop("checked", false);

        $("input[menuflg='9']").attr("flg", "0");
        $("input[menuflg='9']").prop("checked", false);

        if ($("#cphRight_hdnCallFrom").val() == 1) {
            $("#cphRight_hdnCallFrom").val(0);
            fnTopMenuClick(-1);
        }
    }
    else if (callFrom == 1) {
        if ($("#cphRight_hdnCallFrom").val() == "0" && $("#ddlGroupBy").val() == "1") {
            if ($("#cphRight_ddlSubGroupOption").val() == null || $("#cphRight_ddlSubGroupOption").val() == "" || $("#cphRight_ddlSubGroupOption").val() == "0") {
                $("#cphRight_hdnGeographyfilter").val('');
                $("#cphRight_hdnServicefilter").val('');
                $("#cphRight_hdnDistributerfilter").val('');
                $("#cphRight_hdnChannel").val('');
            }
            else
                $("#cphRight_hdnGeographyfilter").val('');
        }
        else if ($("#cphRight_hdnCallFrom").val() == "0" && $("#ddlGroupBy").val() == "2") {
            if ($("#cphRight_ddlSubGroupOption").val() == null || $("#cphRight_ddlSubGroupOption").val() == "" || $("#cphRight_ddlSubGroupOption").val() == "0") {
                $("#cphRight_hdnGeographyfilter").val('');
                $("#cphRight_hdnServicefilter").val('');
                $("#cphRight_hdnDistributerfilter").val('');
                $("#cphRight_hdnChannel").val('');
            }
            else {
                $("#cphRight_hdnServicefilter").val('');
            }
        }
        else if ($("#cphRight_hdnCallFrom").val() == "0" && $("#ddlGroupBy").val() == "5") {
            if ($("#cphRight_ddlSubGroupOption").val() == null || $("#cphRight_ddlSubGroupOption").val() == "" || $("#cphRight_ddlSubGroupOption").val() == "0") {
                $("#cphRight_hdnGeographyfilter").val('');
                $("#cphRight_hdnServicefilter").val('');
                $("#cphRight_hdnDistributerfilter").val('');
                $("#cphRight_hdnChannel").val('');
            }
            else {
                $("#cphRight_hdnDistributerfilter").val('');
            }
        }
        else if ($("#cphRight_hdnCallFrom").val() == "0" && $("#ddlGroupBy").val() == "0") {
            $("#cphRight_hdnGeographyfilter").val('');
            $("#cphRight_hdnServicefilter").val('');
            $("#cphRight_hdnDistributerfilter").val('');
            $("#cphRight_hdnChannel").val('');
        }
        fnInitialstatefilter("4");
        fnInitialstatefilter("5");
        fnInitialstatefilter("6");
        fnInitialstatefilter("8");
        fnInitialstatefilter("12");

        $("input[menuflg='8']").attr("flg", "0");
        $("input[menuflg='8']").prop("checked", false);

        $("input[menuflg='9']").attr("flg", "0");
        $("input[menuflg='9']").prop("checked", false);

        if ($("#cphRight_hdnCallFrom").val() == 1) {
            $("#cphRight_hdnCallFrom").val(0);
            fnTopMenuClick(-1);
        }
    }
    fnClosefilter();
}

function fnInitialstatefilter(filterid) {
    $("div[pmenuflg='" + filterid + "']").attr("flg", "0");
    $("div[pmenuflg='" + filterid + "']").children('input').removeAttr("disabled");
    $("div[pmenuflg='" + filterid + "']").children('input').removeAttr("checked");
    $("div[pmenuflg='" + filterid + "']").children('input').prop("checked", false);
    $("div[pmenuflg='" + filterid + "']").find("a").removeClass("highlight");
}
//end Here

// Treeview Click Button Event
function btngeographyByOK_onclick() {
    $("#cphRight_hdnGeographyfilter").val('');
    $("div[pmenuflg='4']").each(function () {
        if ($(this).attr("flg") == 1) {
            var val = ((this.id).toString().substring(4)).split('_');
            $("#cphRight_hdnGeographyfilter").val($("#cphRight_hdnGeographyfilter").val() + $(this).attr("ppnodeid") + "^" + $(this).attr("ppnodetype") + "^" + $(this).attr("pnodeid") + "^" + $(this).attr("pnodetype") + "^" + val[0] + "^" + val[1] + "^|");
            if ($('#hdSalesNodeText').val()=="")
                $('#hdSalesNodeText').val($(this).text());
            else
                $('#hdSalesNodeText').val($('#hdSalesNodeText').val() + "," + $(this).text());
        }
    });
    if ($("#cphRight_hdnCallFrom").val() == 1) {
        fnTopMenuClick(-1);
    }
    FnShowSelectedFilter(1);
    fnClosefilter();
    return false;
}

// Treeview Distributer Click Button Event
function btnGetDistributerTree_onClick() {
    $("#cphRight_hdnDistributerfilter").val('');
    $("div[pmenuflg='8']").each(function () {
        if ($(this).attr("flg") == 1) {
            var val = ((this.id).toString().substring(4)).split('_');
            $("#cphRight_hdnDistributerfilter").val($("#cphRight_hdnDistributerfilter").val() + $(this).attr("ppnodeid") + "^" + $(this).attr("ppnodetype") + "^" + $(this).attr("pnodeid") + "^" + $(this).attr("pnodetype") + "^" + val[0] + "^" + val[1] + "^|");
            if ($('#hdDistributerText').val()=="")
                $('#hdDistributerText').val($(this).text());
            else
                $('#hdDistributerText').val($('#hdDistributerText').val() + "," + $(this).text());
        }
    });
    if ($("#cphRight_hdnCallFrom").val() == 1) {
        fnTopMenuClick(-1);
    }
    FnShowSelectedFilter(1);
    fnClosefilter();
    return false;
}
function fnSelectChannel() {
    $("#cphRight_hdnChannel").val('');
    $('#hdChannelText').val('');
    $("div[pmenuflg='12']").each(function () {
        if ($(this).attr("flg") == 1) {
            var val = ((this.id).toString().substring(4)).split('_');
            $("#cphRight_hdnChannel").val($("#cphRight_hdnChannel").val() + val[0] + "^" + val[1] + "^|");
            if ($('#hdChannelText').val() == "")
                $('#hdChannelText').val($(this).text());
            else
                $('#hdChannelText').val($('#hdChannelText').val() + "," + $(this).text());
        }
    });
    if ($("#cphRight_hdnCallFrom").val() == 1) {
        fnTopMenuClick(-1);
    }
    FnShowSelectedFilter(1);
    fnClosefilter();
    return false;
}
// Treeview Distributer Click Button Event
function btnGetTimeTree_onClick() {
    $("#cphRight_hdnTimefilter").val('');
    $("div[pmenuflg='5']").each(function () {
        if ($(this).attr("flg") == 1) {
            var val = ((this.id).toString().substring(4)).split('_');
            // $("#cphRight_hdnTimefilter").val($("#cphRight_hdnTimefilter").val() + $(this).attr("ppnodeid") + "^" + $(this).attr("ppnodetype") + "^" + $(this).attr("pnodeid") + "^" + $(this).attr("pnodetype") + "^" + val[0] + "^" + val[1] + "^|");
            $("#cphRight_hdnTimefilter").val($("#cphRight_hdnTimefilter").val() + val[0] + "^" + val[1] + "^|");
            if ($('#hdTimeNodeText').val()=="")
                $('#hdTimeNodeText').val($(this).text());
            else
                $('#hdTimeNodeText').val($('#hdTimeNodeText').val() + "," + $(this).text());
        }
    });
    if ($("#cphRight_hdnCallFrom").val() == 1) {
        fnTopMenuClick(-1);
    }
    FnShowSelectedFilter(1);
    fnClosefilter();
    return false;
}

function btnServiceByOK_onclick() {
    $("#cphRight_hdnServicefilter").val('');
    $("div[pmenuflg='6']").each(function () {
        if ($(this).attr("flg") == 1) {
            var val = ((this.id).toString().substring(4)).split('_');
            $("#cphRight_hdnServicefilter").val($("#cphRight_hdnServicefilter").val() + val[0] + "^" + val[1] + "^|");
            if ($('#hdProductNodeText').val()=="")
                $('#hdProductNodeText').val($(this).text());
            else
                $('#hdProductNodeText').val($('#hdProductNodeText').val() + "," + $(this).text());
        }
    });
    if ($("#cphRight_hdnCallFrom").val() == 1) {
        fnTopMenuClick(-1);
    }
    FnShowSelectedFilter(1);
    fnClosefilter();
    return false;
}

function fnfilterID(filterid, hid, lvl, txt) {

    if (filterid == 4) {
        if ($("#chkSales").is(":checked")) {
            // alert("unable to make single selection in multi select mode.");
            return;
        }
    }
    if (filterid == 5) {
        if ($("#chkTreeview").is(":checked")) {
            //  alert("unable to make single selection in multi select mode.");
            return;
        }
    }
    if (filterid == 6) {
        if ($("#chkProduct").is(":checked")) {
            // alert("unable to make single selection in multi select mode.");
            return;
        }
    }
    if (filterid == 8) {
        if ($("#chkDistributer").is(":checked")) {
            // alert("unable to make single selection in multi select mode.");
            return;
        }
    }


    fnInitialstatefilter(filterid);
    var chkid = '';
    switch (filterid) {
        case 4:
            $("input[type='checkbox'][pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").prop("checked", true);
            //$("#cphRight_hdnGeographyfilter").val(hid + "^" + lvl + "|");
            var ppnodeId = "", ppnodetype = "", pnodeid = "", pnodetype = "";
            ppnodeId = $("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").attr("ppnodeid");
            ppnodetype = $("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").attr("ppnodetype");
            pnodeid = $("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").attr("pnodeid");
            pnodetype = $("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").attr("pnodetype");
            $("#cphRight_hdnGeographyfilter").val(ppnodeId + "^" + ppnodetype + "^" + pnodeid + "^" + pnodetype + "^" + hid + "^" + lvl + "^|");
            $("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").attr("flg", "1");
            //$('#hdSalesNodeText').val($('#div_' + hid + '_' + lvl + '_2').children('a').text());
            $("div[pmenuflg='" + filterid + "']").find("a").removeClass("highlight");
            $("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "'] a").addClass("highlight");
            $('#hdSalesNodeText').val($("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").children('a').text());
            FnShowSelectedFilter(1);
            break;
        case 5:
            $("input[type='checkbox'][pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").prop("checked", true);
            $("#cphRight_hdnTimefilter").val($(txt).attr('inputid') + "^" + lvl + "^|");
            $("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").attr("flg", "1");
            $('#hdTimeNodeText').val($("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").children('a').text());
            $("div[pmenuflg='" + filterid + "']").find("a").removeClass("highlight");
            $("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "'] a").addClass("highlight");
            FnShowSelectedFilter(1);
            break;
        case 6:
            $("input[type='checkbox'][pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").prop("checked", true);
            $("#cphRight_hdnServicefilter").val(hid + "^" + lvl + "^|");
            $("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").attr("flg", "1");
            $('#hdProductNodeText').val($("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").children('a').text());
            $("div[pmenuflg='" + filterid + "']").find("a").removeClass("highlight");
            $("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "'] a").addClass("highlight");
            FnShowSelectedFilter(1);
            break;
        case 8:
            $("input[type='checkbox'][pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").prop("checked", true);
            var ppnodeId = "", ppnodetype = "", pnodeid = "", pnodetype = "";
            ppnodeId = $("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").attr("ppnodeid");
            ppnodetype = $("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").attr("ppnodetype");
            pnodeid = $("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").attr("pnodeid");
            pnodetype = $("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").attr("pnodetype");

            $("#cphRight_hdnDistributerfilter").val(ppnodeId + "^" + ppnodetype + "^" + pnodeid + "^" + pnodetype + "^" + hid + "^" + lvl + "^|");
            //$("#cphRight_hdnDistributerfilter").val(hid + "^" + lvl + "|");
            $("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").attr("flg", "1");
            $('#hdDistributerText').val($("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").children('a').text());
            $("div[pmenuflg='" + filterid + "']").find("a").removeClass("highlight");
            $("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "'] a").addClass("highlight");
            FnShowSelectedFilter(1);
            break;
        case 12:
            $("input[type='checkbox'][pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").prop("checked", true);
            $("#cphRight_hdnChannel").val(hid + "^" + lvl + "^|");
            $("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").attr("flg", "1");
            $("div[pmenuflg='" + filterid + "']").find("a").removeClass("highlight");
            $("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "'] a").addClass("highlight");
            $('#hdChannelText').val($("div[pmenuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']").children('a').text());
            FnShowSelectedFilter(1);
            break;
    }
    chklst = $("input[type='checkbox'][menuflg='" + filterid + "'][lvlId='" + lvl + "'][inputid='" + hid + "']");
    for (z = 0; z < chklst.length; z++) {
        var table = $("#" + chklst[z].id).closest("table");
        if (table.next().length > 0 && table.next()[0].tagName == "DIV") {
            var childDiv = table.next();
            $("input[type=checkbox]", childDiv).each(function () {
                $(this).attr("disabled", "true");
                $(this).closest("div").attr("flg", "0");
                $(this).removeAttr("checked");
            });
        }
    }

    if ($("#cphRight_hdnCallFrom").val() == 1) {
        fnTopMenuClick(-1);
    }
    fnClosefilter();
}
//End Treeview

// Graph Popup Loader
function FnGraphLoader(loadingFrom) {
    loadingFrom = loadingFrom || 0;
    if (loadingFrom == 1) {
        $("#mtabImg").css("display", 'block');
        $("#divgraph_1_1").css("display", "none");
    }
}
function FnGraphUnLoader(loadingFrom) {
    loadingFrom = loadingFrom || 0;
    if (loadingFrom == 1) {
        $("#mtabImg").css("display", 'none');
    }
}
//end Graph Popup Loader

// Enable/Disable MultiSelection
function FnEnableDisableMultiSelection(treeType, ctrl) {
    var treeview = "";
    if (treeType == "1")
        treeview = "cphRight_TreeviewGeography";
    else if (treeType == "2")
        treeview = "cphRight_trvDistributor";
    else if (treeType == "3")
        treeview = "cphRight_TreeviewService";
    else if (treeType == "4")
        treeview = "cphRight_TreeviewTime";
    else if (treeType == "8")
        treeview = "cphRight_TreeViewChannel";
    if ($("#"+ctrl).is(":checked")) {
        $("[id*=" + treeview + "] img").attr("alt", "Expand");
        $("[id*=" + treeview + "] input[type='checkbox']").css("display", "inline");
    }
    else {
        $("[id*=" + treeview + "] img").attr("alt", "Expand");
        $("[id*=" + treeview + "] input[type='checkbox']").css("display", "none");
    }
}
// End MultiSelection

// Clear Selected filter 
function ClearSelectedFilter(id) {
    if (id == 6) {
        $("#cphRight_hdnServicefilter").val("");
        $("#hdProductNodeText").val('');
        productTreelvlId = "";
    }
    else if (id == 4) {
        $("#cphRight_hdnGeographyfilter").val("");
        $("#hdSalesNodeText").val('');
        salesTreelvlId = "";
    }
    else if (id == 5) {
        $("#cphRight_hdnTimefilter").val("");
        $("#hdTimeNodeText").val('');
        timeTreelvlId = "";
    }
    else if (id == 8) {
        $("#cphRight_hdnDistributerfilter").val("");
        $("#hdDistributerText").val('');
        distributerTreelvlId = "";
    }
    else if (id == 12) {
        $("#cphRight_hdnChannel").val("");
        $("#hdChannelText").val('');
        ChannelTreeLvlId = "";
    }

    fnInitialstatefilter(id);
    FnShowSelectedFilter(0);
    if ($("#cphRight_hdnCallFrom").val() == 1) {
        fnTopMenuClick(-1);
    }
    fnClosefilter();
}
// End Here