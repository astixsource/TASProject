

var hide = "0";
function fnCreateCharts(GDivIds, gOtherDetailss, hideFrom) {
    hideFrom = hideFrom || "0";
    hide = hideFrom;
    var LeftMenuSelectedItem = document.getElementById("cphRight_hdnLeftMenuId").value;
    PageMethods.FnCreateGraph(GDivIds, gOtherDetailss, parseInt(LeftMenuSelectedItem, 10), $("#cphRight_hdnLeftMenuHierId").val(), $("#cphRight_hdnBIRProcessfilter").val(), "", "", "", FnCreateGraph_Success, fnFailed);
}

var graph_val = "";

function FnCreateGraph_Success(result) {
    graph_val = result;
    var fontSize = "11px";
    if ($("#cphRight_hdnLayoutView").val() == "2") {
        fontSize = "9px";
    }
    if ($("#cphRight_hdnLayoutView").val() == "4") {
        fontSize = "9px";
    }
    if ($("#cphRight_hdnLayoutView").val() == "5") {
        fontSize = "9px";
    }
    if ($("#cphRight_hdnLayoutView").val() == "3") {
        fontSize = "8px";
        $(".panel-heading").find("span").css("width", "70%");
    }

    if ($("#cphRight_hdnTopMenuId").val() == "1") {
        var chart;
        $("#dvGCParent").show();
        $("#dvLoader").hide();

        if (result.length > 0) {
            for (var jnk = 0; jnk < result.length; jnk++) {
                $("#" + result[jnk][1]).parent().parent("div").find("img").css("display", "block");
                yAxis = {
                    'dollars': function () {

                        //alert(result[jnk][6][3].split("^")[2]);
                        if (typeof result[jnk][6][3].split("^")[3] !== 'undefined') {

                            var yAxis = [{ // Primary yAxis
                                min: parseInt(result[jnk][6][3].split("^")[5], 10),
                                max: parseInt(result[jnk][6][3].split("^")[3], 10),
                                tickInterval: parseInt(result[jnk][6][3].split("^")[4], 10),

                                endOnTick: false,
                                labels: {
                                    format: '{value} ' + result[jnk][6][4],
                                    style: {
                                        color: Highcharts.getOptions().colors[1]
                                    }
                                },
                                title: {
                                    text: result[jnk][6][6],
                                    style: {
                                        color: Highcharts.getOptions().colors[1]
                                    }
                                },
                                opposite: true

                            }
                                , { // Secondary yAxis
                                    min: parseInt(result[jnk][6][3].split("^")[2], 10),
                                    max: parseInt(result[jnk][6][3].split("^")[0], 10),
                                    tickInterval: parseInt(result[jnk][6][3].split("^")[1], 10),

                                    endOnTick: false,
                                    title: {
                                        text: result[jnk][6][6],
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    labels: {
                                        format: '{value} ' + result[jnk][6][4],
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    }


                                }
                            ];
                        }
                        else {

                            var yAxis = [{ // Primary yAxis

                                // max: 100,
                                min: parseInt(result[jnk][6][3].split("^")[2], 10),
                                max: parseInt(result[jnk][6][3].split("^")[0], 10),
                                tickInterval: parseInt(result[jnk][6][3].split("^")[1], 10),

                                endOnTick: false,
                                labels: {
                                    format: '{value} ' + result[jnk][6][4],
                                    style: {
                                        color: Highcharts.getOptions().colors[0]
                                    }
                                },
                                title: {
                                    text: result[jnk][6][6],
                                    style: {
                                        color: Highcharts.getOptions().colors[0]
                                    }
                                },

                            }]
                        }

                        return yAxis;
                    }
                };




                try {
                    document.getElementById(result[jnk][1]).innerHTML = "";
                }
                catch (err)
                { }

                if (result[jnk][6][5] != "") {

                    if (parseInt(result[jnk][0], 10) == 1) {//graph type id

                        var bb = [];
                        bb = $.parseJSON(result[jnk][6][2].substr(1, result[jnk][6][2].length - 2)); //result[jnk][6][2].substr(1, result[jnk][6][2].length - 2).split(",");
                        var sss = $.parseJSON(result[jnk][6][5].substr(1, result[jnk][6][5].length - 2)); // $.parseJSON(result[jnk][6][5]);
                        // alert(result[jnk][6][5].substr(1, result[jnk][6][5].length - 2));
                        var lblAlignment = result[jnk][6][7];

                        chart = new Highcharts.Chart({
                            chart: {
                                marginTop: 20,
                                renderTo: result[jnk][1],//grid id
                                events: {
                                    click: function (e) {
                                        sad(e)
                                    }
                                }
                            },
                            title: {
                                text: "",//result[jnk][6][0],
                                style: {
                                    color: 'black',
                                    fontSize: '11px'
                                },
                                x: -40 //center
                            },
                            subtitle: {
                                text: result[jnk][6][1],
                                style: {
                                    color: 'black',
                                    fontSize: '10px'
                                },
                                x: 0,
                                y: -3
                            },
                            legend: {
                                itemStyle: {
                                    fontSize: fontSize,
                                    fontWeight: 'normal'
                                },
                                y: 10
                            },
                            xAxis: {
                                categories: bb,    //.replace(/["|]/g, '')
                                labels: {
                                    style: {
                                        color: 'black',
                                        fontSize: '8px'
                                    }
                                }
                            },
                            yAxis: yAxis.dollars(),
                            tooltip: {
                                valueSuffix: result[jnk][6][4]
                            },

                            plotOptions: {
                                line: {
                                    dataLabels: {
                                        enabled: true,
                                        format: '{y}' + result[jnk][6][4],
                                        style: {
                                            //textShadow: '0 0 3px black, 0 0 3px black'
                                            color: 'black',
                                            fontSize: '8px'
                                        }

                                    },
                                    enableMouseTracking: true

                                }
                            },
                            //                                    series: sss, //result[jnk][6][5] //.replace(/["|]/g, '')
                            //                                    navigation: {
                            //                                        buttonOptions: {
                            //                                            verticalAlign: 'bottom',
                            //                                            y: 2
                            //                                        }
                            //                                    }

                            //                                });
                            series: sss,
                            navigation: {
                                buttonOptions: {
                                    verticalAlign: 'bottom',
                                    y: 2
                                }
                            }
                        }, function (chart) {
                            var arrlblAlignment = new Array();
                            //  alert(lblAlignment);
                            arrlblAlignment = lblAlignment.split("^");
                            for (var kl = 0; kl < chart.series.length; kl++) {
                                // alert(kl % 2);
                                if (arrlblAlignment[kl] == 1) {
                                    $.each(chart.series[kl].data, function (i, point) {

                                        point.dataLabel.attr({ y: point.dataLabel.y + 20 });

                                    });
                                }
                                else {
                                    $.each(chart.series[kl].data, function (i, point) {
                                        point.dataLabel.attr({ y: point.dataLabel.y - 5 });

                                    });
                                }

                            }
                        }
                        );
                        chart.redraw();
                    }

                    if (parseInt(result[jnk][0], 10) == 2) {
                        var bb = [];
                        bb = JSON.parse(result[jnk][6][2].substr(1, result[jnk][6][2].length - 2)); //result[jnk][6][2].substr(1, result[jnk][6][2].length - 2).split(",");
                        var sss = JSON.parse(result[jnk][6][5].substr(1, result[jnk][6][5].length - 2)); // $.parseJSON(result[jnk][6][5]);
                        var lblAlignment = result[jnk][6][7];
                        chart = new Highcharts.Chart({
                            chart: {
                                marginTop: 20,
                                renderTo: result[jnk][1],
                                type: 'column',

                                events: {
                                    click: function (e) {
                                        sad(e)
                                    }
                                }
                            },
                            title: {
                                text: "",//result[jnk][6][0],
                                style: {
                                    color: 'black',
                                    fontSize: '11px'
                                },
                                x: -20 //center
                            },
                            legend: {
                                itemStyle: {
                                    fontSize: fontSize,
                                    fontWeight: 'normal'
                                },
                                y: 10
                            },
                            subtitle: {
                                text: result[jnk][6][1],
                                style: {
                                    color: 'black',
                                    fontSize: '10px'
                                },
                                x: 0,
                                y: -3
                            },
                            xAxis: {
                                categories: bb,    //.replace(/["|]/g, '')
                                labels: {
                                    style: {
                                        color: 'black',
                                        fontSize: '8px'
                                    }
                                }
                            },
                            yAxis: yAxis.dollars(),

                            //                            tooltip: {
                            //                                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ' + result[jnk][6][4] + '<br/>',
                            //                                shared: true
                            //                            },
                            plotOptions: {
                                column: {
                                    dataLabels: {
                                        enabled: true,
                                        format: '{y}' + result[jnk][6][4],
                                        color: 'black',
                                        style: {
                                            fontSize: fontSize
                                        }
                                    }
                                }
                            },
                            series: sss,
                            navigation: {
                                buttonOptions: {
                                    verticalAlign: 'bottom',
                                    y: 2
                                }
                            }
                        }, function (chart) {
                            var arrlblAlignment = new Array();
                            //  alert(lblAlignment);
                            arrlblAlignment = lblAlignment.split("^");
                            for (var kl = 0; kl < chart.series.length; kl++) {
                                // alert(kl % 2);
                                if (arrlblAlignment[kl] == 1) {
                                    $.each(chart.series[kl].data, function (i, point) {

                                        point.dataLabel.attr({ y: point.dataLabel.y - 5 });

                                    });
                                }
                                else {
                                    $.each(chart.series[kl].data, function (i, point) {
                                        point.dataLabel.attr({ y: point.dataLabel.y + 20 });

                                    });
                                }

                            }
                        }
                        );


                        chart.redraw();
                    }
                    if (parseInt(result[jnk][0], 10) == 3) {





                        var bb = [];
                        bb = JSON.parse(result[jnk][6][2].substr(1, result[jnk][6][2].length - 2)); //result[jnk][6][2].substr(1, result[jnk][6][2].length - 2).split(",");
                        var sss = JSON.parse(result[jnk][6][5].substr(1, result[jnk][6][5].length - 2)); // $.parseJSON(result[jnk][6][5]);

                        var lblAlignment = result[jnk][6][7];

                        var XAxisLineCategory = JSON.parse(result[jnk][6][8].substr(1, result[jnk][6][8].length - 2));


                        chart = new Highcharts.Chart({
                            // $('#container').highcharts({
                            chart: {
                                marginTop: 20,
                                renderTo: result[jnk][1],

                                events: {

                                    click: function (e) {
                                        sad(e)
                                    }
                                }
                            },
                            plotOptions: {
                                column: {
                                    dataLabels: {
                                        enabled: true,
                                        format: '{y}' + result[jnk][6][4],
                                        color: 'black',
                                        fontSize: '8px'

                                    }
                                }
                            },
                            title: {
                                text: "",// result[jnk][6][0],
                                style: {
                                    color: 'black',
                                    fontSize: '11px'
                                },
                                x: -20 //center
                            },
                            legend: {
                                itemStyle: {
                                    fontSize: fontSize,
                                    fontWeight: 'normal'
                                },
                                y: 10
                            },
                            subtitle: {
                                text: result[jnk][6][1],
                                style: {
                                    color: 'black',
                                    fontSize: '10px'
                                },
                                x: 0,
                                y: -3
                            },
                            xAxis: [{
                                categories: bb,
                                gridLineWidth: 0
                            }, {
                                categories: XAxisLineCategory,

                                labels: {
                                    enabled: false
                                }
                            }],


                            yAxis: yAxis.dollars(),


                            tooltip: {
                                formatter: function () {
                                    var s;
                                    if (this.point.name) { // the pie chart
                                        s = '' + this.point.name + ': ' + this.y;
                                    } else {
                                        s = '' + this.x + ': ' + this.y;
                                    }
                                    return s;
                                }
                            },


                            series: sss,
                            navigation: {
                                buttonOptions: {
                                    verticalAlign: 'bottom',
                                    y: 2
                                }
                            }
                        }
                        );


                        chart.redraw();
                    }

                }
                else {
                    document.getElementById(result[jnk][1]).innerHTML = "No Graph for this Selection";
                }
            }

        }
    }
    $("#dvFadeForProcessing").css("display", "none");
    if (hide == "0") {
        $('.modalBackground').css('display', 'none');
        $("#GraphLayoutLoader").css("display", 'none');
    }
    else {
        $("#mtabImg").css("display", 'none');
        $("#divgraph_1_1").css("display", "block");
    }
}

function FnCreateGraphpopup(result, graphid, filter) {
    yAxis = {
        'dollars': function () {
            if (typeof result[graphid][6][3].split("^")[3] !== 'undefined') {

                var yAxis = [{ // Primary yAxis
                    min: parseInt(result[graphid][6][3].split("^")[5], 10),
                    // max: 100,
                    max: parseInt(result[graphid][6][3].split("^")[3], 10),
                    tickInterval: parseInt(result[graphid][6][3].split("^")[4], 10),
                    endOnTick: false,
                    labels: {
                        format: '{value} ' + result[graphid][6][4],
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    title: {
                        text: result[graphid][6][6],
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    opposite: true

                }
                    , { // Secondary yAxis
                        min: parseInt(result[graphid][6][3].split("^")[2], 10),
                        // max: 100,
                        max: parseInt(result[graphid][6][3].split("^")[0], 10),
                        tickInterval: parseInt(result[graphid][6][3].split("^")[1], 10),
                        endOnTick: false,
                        title: {
                            text: result[graphid][6][6],
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        labels: {
                            format: '{value} ' + result[graphid][6][4],
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        }


                    }
                ];
            }
            else {


                var yAxis = [{ // Primary yAxis
                    min: parseInt(result[graphid][6][3].split("^")[2], 10),
                    // max: 100,
                    max: parseInt(result[graphid][6][3].split("^")[0], 10),
                    tickInterval: parseInt(result[graphid][6][3].split("^")[1], 10),
                    endOnTick: false,
                    labels: {
                        format: '{value} ' + result[graphid][6][4],
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    title: {
                        text: result[graphid][6][6],
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },

                }]
            }

            return yAxis;
        }
    };

    var chart;
    $("#dvGCParent").show();
    $("#dvLoader").hide();
    if (result.length > 0) {
        document.getElementById("dvDataDetails").innerHTML = "";
        if (result[graphid][6][5] != "") {
            if (parseInt(result[graphid][0], 10) == 1) {

                var bb = [];
                bb = $.parseJSON(result[graphid][6][2].substr(1, result[graphid][6][2].length - 2)); //result[graphid][6][2].substr(1, result[graphid][6][2].length - 2).split(",");
                var sss = $.parseJSON(result[graphid][6][5].substr(1, result[graphid][6][5].length - 2)); // $.parseJSON(result[graphid][6][5]);
                var lblAlignment = result[graphid][6][7];
                $("#fltitle").html(result[graphid][6][0]);
                $("#flfilter").html(filter);
                chart = new Highcharts.Chart({
                    chart: {

                        renderTo: "dvDataDetails",
                        events: {
                            click: function (e) {
                                sad(e)
                            }
                        }
                    },
                    title: {
                        text: "",// result[graphid][6][0],
                        style: {
                            color: 'black',
                            fontSize: '11px'
                        },
                        x: -20 //center
                    },
                    subtitle: {
                        text: result[graphid][6][1],
                        style: {
                            color: 'black',
                            fontSize: '10px'
                        },
                        x: -20
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    xAxis: {
                        categories: bb,    //.replace(/["|]/g, '')
                        labels: {
                            style: {
                                color: 'black',
                                fontSize: '8px'
                            }
                        }
                    },
                    yAxis: yAxis.dollars(),
                    series: sss,
                    navigation: {
                        buttonOptions: {
                            verticalAlign: 'bottom',
                            y: 2
                        }
                    }
                },
                function (chart) {
                    var arrlblAlignment = new Array();
                    //alert(lblAlignment);
                    arrlblAlignment = lblAlignment.split("^");
                    for (var kl = 0; kl < chart.series.length; kl++) {
                        // alert(kl % 2);
                        if (arrlblAlignment[kl] == 1) {
                            $.each(chart.series[kl].data, function (i, point) {
                                point.dataLabel.attr({ y: point.dataLabel.y + 10 });

                            });
                        }
                        else {
                            $.each(chart.series[kl].data, function (i, point) {
                                //point.dataLabel.attr({ y: point.dataLabel.y + 20 });
                                //point.dataLabel.attr({ y: point.dataLabel.y -10 });
                            });
                        }

                    }
                }
                );


                chart.redraw();
            }

            if (parseInt(result[graphid][0], 10) == 2) {
                var bb = [];
                bb = JSON.parse(result[graphid][6][2].substr(1, result[graphid][6][2].length - 2)); //result[graphid][6][2].substr(1, result[graphid][6][2].length - 2).split(",");
                var sss = JSON.parse(result[graphid][6][5].substr(1, result[graphid][6][5].length - 2)); // $.parseJSON(result[graphid][6][5]);
                var lblAlignment = result[graphid][6][7];
                $("#fltitle").html(result[graphid][6][0]);
                $("#flfilter").html(filter);
                chart = new Highcharts.Chart({
                    chart: {
                        renderTo: "dvDataDetails",
                        type: 'column',

                        events: {
                            click: function (e) {
                                sad(e)
                            }
                        }
                    },
                    title: {
                        text: "",// result[graphid][6][0],
                        style: {
                            color: 'black',
                            fontSize: '11px'
                        },
                        x: -20 //center
                    },
                    subtitle: {
                        text: result[graphid][6][1],
                        style: {
                            color: 'black',
                            fontSize: '10px'
                        },
                        x: -20
                    },
                    plotOptions: {
                        column: {
                            dataLabels: {
                                enabled: true
                                //format: '{y}' + result[jnk][6][4],
                                //color: 'black'

                            }
                        }
                    },
                    xAxis: {
                        categories: bb,    //.replace(/["|]/g, '')
                        labels: {
                            style: {
                                color: 'black',
                                fontSize: '8px'
                            }
                        }
                    },
                    yAxis: yAxis.dollars(),
                    series: sss,
                    navigation: {
                        buttonOptions: {
                            verticalAlign: 'bottom',
                            y: 2
                        }
                    }
                }, function (chart) {
                    var arrlblAlignment = new Array();
                    //  alert(lblAlignment);
                    arrlblAlignment = lblAlignment.split("^");
                    for (var kl = 0; kl < chart.series.length; kl++) {
                        // alert(kl % 2);
                        if (arrlblAlignment[kl] == 1) {
                            $.each(chart.series[kl].data, function (i, point) {

                                //point.dataLabel.attr({ y: point.dataLabel.y - 5 });
                                point.dataLabel.attr({ y: point.dataLabel.y - 15 });
                                //point.dataLabel.attr({ y: point.dataLabel.y -15});

                            });
                        }
                        else {
                            $.each(chart.series[kl].data, function (i, point) {
                                //  point.dataLabel.attr({ y: point.dataLabel.y + 20 });
                                //point.dataLabel.attr({ y: point.dataLabel.y + 20 });
                                point.dataLabel.attr({ y: point.dataLabel.y - 2 });

                            });
                        }

                    }
                }
                );


                chart.redraw();
            }
            if (parseInt(result[graphid][0], 10) == 3) {

                var bb = [];
                bb = JSON.parse(result[graphid][6][2].substr(1, result[graphid][6][2].length - 2)); //result[graphid][6][2].substr(1, result[graphid][6][2].length - 2).split(",");
                var sss = JSON.parse(result[graphid][6][5].substr(1, result[graphid][6][5].length - 2)); // $.parseJSON(result[graphid][6][5]);

                var lblAlignment = result[graphid][6][7];
                $("#fltitle").html(result[graphid][6][0]);
                $("#flfilter").html(filter);
                var lblGrouplabel = result[graphid][6][9];
                var XAxisLineCategory = JSON.parse(result[graphid][6][8].substr(1, result[graphid][6][8].length - 2));

                chart = new Highcharts.Chart({
                    // $('#container').highcharts({
                    chart: {
                        renderTo: "dvDataDetails",

                        events: {
                            load: function () {
                                var label = this.renderer.label(lblGrouplabel + "  :")
                                .css({
                                    width: '450px',
                                    color: '#222',
                                    fontSize: '13px'

                                })
                                .attr({

                                    'padding': 50,

                                })
                                .add();

                                label.align(Highcharts.extend(label.getBBox(), {
                                    align: 'left',
                                    x: 0, // offset
                                    verticalAlign: 'bottom',
                                    y: 50 // offset
                                }), null, 'spacingBox');

                            },
                            height: 895,
                            spacingBottom: 100,
                            click: function (e) {
                                sad(e)
                            }
                        }
                    },
                    plotOptions: {
                        column: {
                            dataLabels: {
                                enabled: true,
                                format: '{y}' + result[graphid][6][4],
                                color: 'black'

                            }
                        }
                    },
                    title: {
                        text: "",// result[graphid][6][0],
                        style: {
                            color: 'black',
                            fontSize: '11px'
                        },
                        x: -20 //center
                    },
                    subtitle: {
                        text: result[graphid][6][1],
                        style: {
                            color: 'black',
                            fontSize: '10px'
                        },
                        x: -20
                    },
                    xAxis: [{
                        categories: bb,
                        gridLineWidth: 0
                    }, {
                        categories: XAxisLineCategory,
                        labels: {
                            enabled: false
                        }
                    }],


                    yAxis: yAxis.dollars(),


                    tooltip: {
                        formatter: function () {
                            var s;
                            if (this.point.name) { // the pie chart
                                s = '' + this.point.name + ': ' + this.y;
                            } else {
                                s = '' + this.x + ': ' + this.y;
                            }
                            return s;
                        }
                    },


                    series: sss,
                    navigation: {
                        buttonOptions: {
                            verticalAlign: 'bottom',
                            y: 2
                        }
                    }
                }
                );


                chart.redraw();
            }

        }
        else {
            document.getElementById("dvDataDetails").innerHTML = "No Graph for this Selection";
        }
    }
}

function sad(sfs) {
    if (hide == 0) {
        var clikedGraphDivId = sfs.delegateTarget.container.parentElement.id;
        var filter = $(sfs.delegateTarget.container.parentElement).parent().prev().find("div.filter").eq(0).html();
        var arrGraphCellID = document.getElementById("cphRight_hdnIDDetailsOfGraphs").value.split("$");
        var arrGraphOtherDetails = document.getElementById("cphRight_hdnOtherDetails").value.split("#");
        for (var kl = 0; kl < arrGraphCellID.length; kl++) {
            if (clikedGraphDivId == arrGraphCellID[kl]) {
                $("#myModalForPopup").modal();
                document.getElementById("dvDataDetails").style.display = "block";

                FnCreateGraphpopup(graph_val, (parseInt(clikedGraphDivId.substring(clikedGraphDivId.length - 1)) - 1), filter);
                break;
            }
        }
    }
}

function fnFailed(result) {
    alert(result.get_message());
}