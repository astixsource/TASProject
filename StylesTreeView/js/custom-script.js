// JavaScript Document

jQuery(document).ready(function () {
    //--------- For leftpanel slide ------------//	
    // Menu Toggle	
   /* $(".menutoggle").click(function () {
        $('.menutoggle').toggleClass("menutoggle2");
        $('.leftpanel').toggleClass("leftpanel2").animate('slow');
        $('.mainpanel').toggleClass("mainpanel2").animate('slow');
        $('.leftpanel-menu').toggle();
        $("#dvLeft").toggle();
    });*/


    // TAB CLASS DEFINITION
    // ====================
    //Default Action
    $(".tab_content").hide();
    $(".tab_content:first").show();

    $("ul.tabs li").click(function () {
        if (fntabswitching(this)) {
            $("ul.tabs li").removeClass("active");
            $(this).addClass("active");
            $(".tab_content").hide();
            var activeTab = $(this).attr("rel");
            $("#" + activeTab).fadeIn();
        }
        return false;
    });

    //// End Tab Function ////
    //--------- For Collapse JS------------//
    //Set default open/close settings
    var firsts = $('ul.accordion-body');
    //var firsts = $('ul.accordion-body-parent').hide();

    $('ul li>a').click(function () {
        try {
            if ($(this).hasClass("active") && $(this).next().queue().length === 0) {
                $(this).next().slideUp();
                $(this).toggleClass('active')
            }
            else if (!$(this).hasClass("active") && $(this).next().queue().length === 0) {
                $(this).next().slideDown();
                $(this).toggleClass('active')
            }
        }
        catch (err) {

        }
    });

    //--------- For Browser ------------//
    //Check if browser is IE or not
    if (navigator.appName == "Microsoft Internet Explorer") {
        $("input.submit").css("padding", "8pt 5pt");       
    }
    else {
        // If another browser
        $("input.submit").css("padding", "7.4pt 5pt")
        return false;
    }


});



$(window).on('load resize', function () {
    if ($(window).width() < 678) {
        //alert('Less than 1280');
        $('.leftpanel').removeClass();
        $('.mainpanel').removeClass();
        $('.appreport').css("display", "none");
        $('.menutoggle').css("top", "8px", "bottom", "0");              
        $(".menutoggle").click(function () {
            $('.leftpanel-menu').toggle();
            $(".appreport").toggle();
        });
    }
    else {
        //alert('More than 1280');

        //--------- For leftpanel slide ------------//	
        // Menu Toggle	
        $(".menutoggle").click(function () {
	 $('.menutoggle').toggleClass("menutoggle2");
            $('.leftpanel').toggleClass("leftpanel2").animate('slow');
            $('.mainpanel').toggleClass("mainpanel2").animate('slow');
            $('.leftpanel-menu').toggle();
            $("#dvLeft").toggle();
            $(".appreport").toggle();
        });
    }

});









