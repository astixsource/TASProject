/**
* DHTML date validation script. Courtesy of SmartWebby.com (http://www.smartwebby.com/dhtml/datevalidation.asp)
*/
// Declaring valid date character, minimum year and maximum year
var dtCh = "-";
var minYear = 1000;
var maxYear = 9999;

function ValidateForm(field) {
    //var dt = document.frmSample.txtDate
    // debugger;
    if (isDate(field.value) == false) {
        field.focus()
        return false
    }
    return true
}

function isInteger(s) {
    var i;
    for (i = 0; i < s.length; i++) {
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}

function stripCharsInBag(s, bag) {
    var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

function daysInFebruary(year) {
    // February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28);
}
function DaysArray(n) {
    for (var i = 1; i <= n; i++) {
        this[i] = 31
        if (i == 4 || i == 6 || i == 9 || i == 11) { this[i] = 30 }
        if (i == 2) { this[i] = 29 }
    }
    return this
}
function MonthsArray(mnth) {
    //debugger;
    var monthss = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (var i = 0; i < 12; i++) {
        if (monthss[i].toLowerCase() == mnth.toLowerCase()) {
            return parseInt(i) + 1;
        }
    }
    return 0;
}
function fnGetMonthInNumver(strMonth) {
    if (strMonth.toLowerCase() == "jan") {
        return 1;
    }
    else if (strMonth.toLowerCase() == "feb") {
        return 2;
    }
    else if (strMonth.toLowerCase() == "mar") {
        return 3;
    }
    else if (strMonth.toLowerCase() == "apr") {
        return 4;
    }
    else if (strMonth.toLowerCase() == "may") {
        return 5;
    }
    else if (strMonth.toLowerCase() == "jun") {
        return 6;
    }
    else if (strMonth.toLowerCase() == "jul") {
        return 7;
    }
    else if (strMonth.toLowerCase() == "aug") {
        return 8;
    }
    else if (strMonth.toLowerCase() == "sep") {
        return 9;
    }
    else if (strMonth.toLowerCase() == "oct") {
        return 10;
    }
    else if (strMonth.toLowerCase() == "nov") {
        return 11;
    }
    else if (strMonth.toLowerCase() == "dec") {
        return 12;
    }
    else {
        return 0;
    }
}
function isDate(dtStr) {
    //debugger;
    if (dtStr == '') {
        alert("Please enter date")
        return false;
    }
    //    if (dtStr.split(dtCh).length != 3) {
    //        alert("Please enter a valid date")
    //        return false;
    //    }
    var daysInMonth = DaysArray(12)
    var pos1 = dtStr.indexOf(dtCh)
    var pos2 = dtStr.indexOf(dtCh, pos1 + 1)
    var strDay = dtStr.substring(0, pos1)
    var strMonth1 = dtStr.substring(pos1 + 1, pos2)
    var strYear = dtStr.substring(pos2 + 1)
    strYr = strYear
    //var strMonth = fnGetMonthInNumver(strMonth1)
    if (strDay.charAt(0) == "0" && strDay.length > 1) strDay = strDay.substring(1)
    //            if (strMonth.charAt(0) == "0" && strMonth.length > 1)
    //             strMonth = strMonth.substring(1)
    for (var i = 1; i <= 3; i++) {
        if (strYr.charAt(0) == "0" && strYr.length > 1) strYr = strYr.substring(1)
    }


    month = parseInt(MonthsArray(strMonth1))
    day = parseInt(strDay)
    year = parseInt(strYr)
    if (pos1 == -1 || pos2 == -1) {
        alert("The date format should be :dd-MMM-yyyy\n  eg : 01-Jan-1900")
        return false
    }
    //if (strMonth.length < 1 || month < 1 || month > 12) {
    if (month == 0) {
        alert("Please enter a valid month")
        return false
    }
    if (strDay.length < 1 || day < 1 || day > 31 || (month == 2 && day > daysInFebruary(year)) || day > daysInMonth[month]) {
        alert("Please enter a valid day")
        return false
    }
    if (strYear.length != 4 || year == 0 || year < minYear || year > maxYear) {
        alert("Please enter a valid 4 digit year between " + minYear + " and " + maxYear)
        return false
    }
    dtStr = dtStr.replace(strMonth1, month)
    if (dtStr.indexOf(dtCh, pos2 + 1) != -1 || isInteger(stripCharsInBag(dtStr, dtCh)) == false) {
        alert("Please enter a valid date")
        return false
    }
    return dtStr;
}

function ValidateControl(event, validationType, maxLength, maxValue, decimalDigits) {
    /* For max length setting of the the textbox control for all validation types. */

    var charCode = (event.which) ? event.which : event.keyCode

    if (charCode == 8 || (charCode >= 37 && charCode <= 40)) {
        return true;
    }

    e = event.srcElement || event.target;
    eventValue = e.value;

    if (eventValue.length + 1 > maxLength) {
        return false;
    }

    /* For decimal and number validation. */

    if (validationType == "number") {
        if (charCode == 46) {
            return false;
        }
    }

    if (validationType == "decimal" || validationType == "number") {
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
            return false;

        var parts = eventValue.split('.');

        if (parts.length > 1 && charCode == 46)
            return false;

        var caratPos = getSelectionStart(e);
        var sVal = eventValue.substring(0, caratPos) + String.fromCharCode(charCode) + eventValue.substring(caratPos, eventValue.length);

        if (parts.length > 1 && caratPos > sVal.indexOf('.')) {
            if (String(parts[1]).length >= decimalDigits) {
                return false;
            }
        }
        else {
            var p = sVal.split('.');
            if (p.length > 1) {
                if (String(p[1]).length > decimalDigits) {
                    return false;
                }
            }
        }

        if (charCode != 46) {
            //var currVal = String.fromCharCode(charCode);
            //val = eventValue.toString() + currVal.toString();
            //val = parseFloat(val);
            val = parseFloat(sVal);

            if (val > maxValue) {
                return false;
            }
        }
    }

    return true;
}

function getSelectionStart(o) {
    if (document.getSelection) {
        if (o.createTextRange) {
            //var r = document.getSelection(); //IE11
            //r.moveEnd('character', o.value.length)
            //if (r.toString() == '') return o.value.length
            //return o.value.lastIndexOf(r.toString())
            return o.selectionStart
        } else return o.selectionStart
    }
    else {
        if (o.createTextRange) {
            var r = document.selection.createRange().duplicate()
            r.moveEnd('character', o.value.length)
            if (r.text == '') return o.value.length
            return o.value.lastIndexOf(r.text)
        } else return o.selectionStart
    }
}