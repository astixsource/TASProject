// JavaScript Document


//--------- For Collapse ------------//
jQuery(document).ready(function ($) {
    //Set default open/close settings
    //     var divs=$('.box>ul').show(); //Hide/close all containers
    //$('.box>ul:first').slideToggle();
    if (document.getElementById('hdnLeftMenuSelectedItem') != null) {
        if (document.getElementById('hdnLeftMenuSelectedItem').value == "") {
            document.getElementById('hdnLeftMenuSelectedItem').value = 5;
        }
       
        $('.box>.title_bgNew#dvLeftMenu_' + document.getElementById('hdnLeftMenuSelectedItem').value).toggleClass('active');
    }

    var s = $('.box>.title_bgNew').click(function () {
        if (parseInt(document.getElementById('hdnLeftMenuSelectedItem').value, 10) == 6) {
            alert("Please select one of the option below "+ document.getElementById("dvLeftMenu_6").innerHTML + ".");
            return false;
        }
//        if (parseInt(document.getElementById('hdnLeftMenuSelectedItem').value, 10) == 7 && topClickoldVal!=2) {
//            document.getElementById("hdnLeftMenuSelectedItem").value = lfetClickoldVal;
//            //alert("Please select one of the option below " + document.getElementById("dvLeftMenu_6").innerHTML + ".");
//            return false;
//        }
        s.not(this).removeClass('active')
        $(this).toggleClass('active')
        //        divs.not($(this).next()).slideUp()
        //        $(this).next().slideToggle()
        return false; //Prevent the browser jump to the link anchor

    });

});

//--------- For Tabs ------------//

$(document).ready(function() {

	//Default Action
	$(".tab_content").hide(); //Hide all content
	//$(".tabs li:first").addClass("active").show(); //Activate first tab
	//$(".tab_content:first").show(); //Show first tab content
	
	//On Click Event
	$(".tabs li").click(function() {
		$(".tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tab_content").hide(); //Hide all tab content

		 //Find the rel attribute value to identify the active tab + content
		var activeTab = $(this).find("a").attr("href");
		$(activeTab).fadeIn(); //Fade in the active content
		//$(activeTab).animate({ width: 'toggle' }, 350);

		return false;
    });

//$(".hide1").click(function () {
//        $(".tabs li").removeClass("active");
//        $(".tab_content").hide(); 
//    });

});

//--------- For PopUp ------------//

//document.getElementById('fade').style.display='block';
//document.getElementById('light1').style.display='block';


//--------- For Side Slide ------------//

jQuery(document).ready(function ($) {
    $("#side").click(function () {
        $('#slidable').animate({ width: 'toggle' }, 500 );
    });
})

jQuery(document).ready(function ($) {
    $("#side1").click(function () {
        $('#slidable1').animate({ width: 'toggle' }, 10 );
        $('#right_content').toggleClass("right_content1");
        $('.left_content').toggleClass("left_content1");
        //$('#right_content').addClass("right_content1");
    });
})


jQuery(document).ready(function($) {
$("#content .left-panel li").click(function() {
        //$('#slidable1').animate({ width: 'toggle' }, 10);
        $('class2').toggleClass("class1");
        
    });
})

