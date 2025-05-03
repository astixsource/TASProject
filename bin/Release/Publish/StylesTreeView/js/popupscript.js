/* 
	author: istockphp.com
*/
jQuery(function ($) {

    $("input.topopup").click(function () {
        loading(); // loading
        var cntrl = this;
        setTimeout(function () { // then show popup, deley in .5 second
            loadPopup(cntrl); // function show popup 
        }, 500);
        return false;
    });

    /* event for close the popup */
    $("div.close").hover(
					function () {
					    $('span.ecs_tooltip').show();
					},
					function () {
					    $('span.ecs_tooltip').hide();
					}
				);

    $("div.close").click(function () {
        disablePopup();  // function close pop up
    });

    $(this).keyup(function (event) {
        if (event.which == 27) { // 27 is 'Ecs' in the keyboard
            disablePopup();  // function close pop up
        }
    });

    $("div#backgroundPopup").click(function () {
        //$("div#dvRight").click(function () {
        disablePopup();  // function close pop up 
    });

    //$('a.livebox').click(function() {
    //	alert('Hello World!');
    //return false;
    //});


    /************** start: functions. **************/
    function loading() {
        $("div.loader").show();
    }
    function closeloading() {
        $("div.loader").fadeOut('normal');
    }

    var popupStatus = 0; // set value

    var firstpopup = 0;

    function loadPopup(cntrl) {
        if (popupStatus == 0) { // if value is 0, show popup
            $(cntrl).closest("div").find("div[class='toPopup']").fadeIn(0500);
            firstpopup = $(cntrl).attr("popcntr");
            closeloading(); // fadeout loading
            //$(".toPopup").fadeIn(0500); // fadein popup div
            $("#backgroundPopup").css("opacity", "0.7"); // css opacity, supports IE7, IE8
            $("#backgroundPopup").fadeIn(0001);
            popupStatus = 1; // and set value to 1
            fnloadpopup(cntrl);
        }
    }

    function disablePopup() {
        if (popupStatus == 1) { // if value is 1, close popup
            //$(ctrl).next("div[class='toPopup']").fadeIn(0500);
            $(".toPopup").fadeOut("normal");
            $("#backgroundPopup").fadeOut("normal");
            popupStatus = 0;  // and set value to 0
            closeddl(firstpopup);
        }
    }
    /************** end: functions. **************/
}); // jQuery End