/* 
author: istockphp.com
*/
jQuery(function ($) {

    $(".clktopopup").click(function () {
       
        loading(); // loading
        setTimeout(function () { // then show popup, deley in .5 second
            loadPopup(); // function show popup 
        }, 50); // .5 second
        return false;
    });

    /* event for close the popup */
    //$("div.close").hover(
	//				function () {
	//				    $('span.ecs_tooltip').show();
	//				},
	//				function () {
	//				    $('span.ecs_tooltip').hide();
	//				}
	//			);

    $("div.close").click(function () {
        disablePopup();  // function close pop up
    });

    $("div.close1").click(function () {
        disablePopup1();  // function close pop up
    });

    $(this).keyup(function (event) {
        if (event.which == 27) { // 27 is 'Ecs' in the keyboard
            disablePopup();  // function close pop up
        }
    });

    $("div#backgroundPopup").click(function () {
        disablePopup();  // function close pop up
    });

    //$('a.livebox').click(function () {
    //    alert('Hello World!');
    //    return false;
    //});


    /************** start: functions. **************/
    function loading() {
        $("div.loader").show();
    }
    function closeloading() {
        $("div.loader").fadeOut('normal');
    }

    var popupStatus = 0; // set value

    function loadPopup() {
        if (popupStatus == 0) { // if value is 0, show popup
            closeloading(); // fadeout loading
           $("#txtOldPassword").val("");
           $("#txtNewPassword").val("");
           $("#txtConfirmPassword").val("");
            $(".toPopup-new").fadeIn(0500); // fadein popup div
            $("#backgroundPopup").css("opacity", "0.7"); // css opacity, supports IE7, IE8
            $("#backgroundPopup").fadeIn(0001);
            popupStatus = 1; // and set value to 1
        }
    }

    function disablePopup() {
        if (popupStatus == 1) { // if value is 1, close popup
            $(".toPopup-new").fadeOut("normal");
            $("#backgroundPopup").fadeOut("normal");
            popupStatus = 0;  // and set value to 0
        }
    }

    function disablePopup1() {
            $(".toPopup-new").fadeOut("normal");
            $("#backgroundPopup").fadeOut("normal");
            popupStatus = 0;  // and set value to 0
    }
    /************** end: functions. **************/

    function CheckPassword(inputtxt) {
        var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
        if (inputtxt.value.match(paswd)) {

            return true;
        }
        else {
            alert('Wrong Password Combination!!!,Kindly Enter Password As Per Guidance');
            return false;
        }
    }
    $("#ctl00_CancelBtn").click(function () {
        disablePopup(); // function close pop up
    });
    $("#ctl00_SubmitBtn").click(function () {
        fnChangePassword();  // function close pop up
    });
    function fnChangePassword() {
        var UserName = $("#txtUserName").val();
        var OldPassword = $("#txtOldPassword").val();
        var NewPassword = $("#txtNewPassword").val();
        var ConfirmPassword = $("#txtConfirmPassword").val();
        if (OldPassword == "" || NewPassword == "" || ConfirmPassword == "") {
            alert("Password can't be blank!!!")
            return false;
        }

        if (NewPassword != ConfirmPassword) {
            alert("Confirm Password Not Matched With New Passowrd!!!")
            return false;
        }
        if (CheckPassword($("#txtNewPassword")[0]) == false) {
            return false;
        }
        $.ajax({
            url: "dmswebservice.asmx/fnChangePassword",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: '{UserName:' + JSON.stringify(UserName) + ',OldPassword:' + JSON.stringify(OldPassword) + ',NewPassword:' + JSON.stringify(NewPassword) + '}',
            success: function (response) {
                var strRep = response.d;
                if (strRep.split("^")[0] == "2") {
                    alert("Error-" + strRep.split("^")[1]);
                } else {
                    var str = strRep.split("^")[1];
                    if (str == "1") {
                        alert("Password Changed Successfully!!");
                        fnlater();
                        $("#txtOldPassword").val("");
                        $("#txtNewPassword").val("");
                        $("#txtConfirmPassword").val("");
                    } else {
                        alert("Wrong Username & password!!");
                    }
                }
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        });
    }
}); // jQuery End