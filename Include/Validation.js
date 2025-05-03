	function fnUpperCase(str)
	{
		if(str.length <= 1)
		{
			return(str);
		}
		var fLetter = str.substring(0,1).toUpperCase();
		var Rstring = str.substring(1);
		str = fLetter + Rstring;
		return str;
	}

	function repAmp(str)
	{
		var a=/'/g
		var repStr=str.replace(a,"`")
		var b=/&/g
		repStr=repStr.replace(b,"&#38;")
		var c=/</g
		repStr=repStr.replace(c,"&#60;")
		var d=/>/g
		return repStr.replace(d,"&#62;")
				
	}
		

	function validateTF(objectName,nullFlag,numericFlag,maxLenFlag,maxLenVal,emailFlag)
	{
		var objectVal=trim(eval(objectName).value)
		if(nullFlag==1)
		{
			if(isEmpty(objectVal))
			{
				alert("Text Field Can't be blank...")
				eval(objectName).select()
				eval(objectName).focus()
				return false
			}
		}
		
		if(numericFlag==1)
		{
			if(isNumber(objectVal)==false)	
			{
				alert("Please Enter Numeric Value..")
				eval(objectName).select()
				eval(objectName).focus()
				return false
			}
		}
		
		if(maxLenFlag==1)
		{
			if(objectVal.length>maxLenVal)
			{
				alert("Field Length Can't be greater than " + maxLenVal + " Character")
				eval(objectName).select()
				eval(objectName).focus()
				return false
			}
		}
		
		if(emailFlag==1)
		{
			if(isEmpty(objectVal)==false)
			{
				if(checkmailadd(objectVal)==false)
				{
					alert("E-Mail Require . and @ .....")
					eval(objectName).select()
					eval(objectName).focus()
					return false
				}
			}
		}
		
	}

	function trim(b){
	var i=0;
	while(b.charAt(i)==" ")
	{
	i++;
	}
	b=b.substring(i,b.length);
	len=b.length-1;
	while(b.charAt(len)==" "){
	len--;
	}
	b=b.substring(0,len+1);
	return b;
	}


function isEmpty(s)
{
		  s=trim(s);
		  return ((s == null) || (s.length == 0))
}
/*function isFloat(s)
  {
    if (isCharsInBag (s, "-0123456789.") == false)
    {
		alert("Please Enter the Digit Number")
        return false;
    }
    return true;
 }
*/


function isNumber(s)
  {
    if (isCharsInBag (s, "0123456789") == false)
    {
		alert("Please Enter the Digit Number")
        return false;
    }
    return true;
 }
 function isFloat1(s)
  {
    if (isCharsInBag (s, "0123456789.") == false)
    {
		alert("Please Enter the Digit Number")
        return false;
    }
    return true;
 }
  function isFloat(id1)
  {
	var s=document.getElementById(id1).value;
    if (isCharsInBag (s, "-0123456789.") == false)
    {
		alert("Please Enter the Digit Number")
		document.getElementById(id1).value=""
        return false;
    }
    if(s.length>10)
    {
		alert("Please enter the value less than 10 Digit")
		document.getElementById(id1).value=s.substring(0,10)
		return false;
    }
    return true;
 }
function isCharsInBag (s, bag)
  {
    var i;
    // Search through string's characters one by one.
    // If character is in bag, append to returnString.

    for (i = 0; i < s.length; i++)
    {
        // Check that current character isn't whitespace.
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) return false;
    }
    return true;
 }
 function isValidEmail(str) 
	{
		return (str.indexOf(".") > 2) && (str.indexOf("@") > 0);
	}
 
 function replaceAmp(str)
	{
		var a=/'/g
		var repStr=str.replace(a,"`")
		var b=/&/g
		repStr=repStr.replace(b,"&#38;")
		var c=/</g
		repStr=repStr.replace(c,"&#60;")
		var d=/>/g
		return repStr.replace(d,"&#62;")
	}
			//***************************For Email****************************
			//***************************************************************
				function isEmail(emailStr) {
					/* The following pattern is used to check if the entered e-mail address
					fits the user@domain format.  It also is used to separate the username
					from the domain. */
					var emailPattern=/^(.+)@(.+)$/;
					/* The following string represents the pattern for matching all special
					characters.  We don't want to allow special characters in the address. 
					These characters include ( ) < > @ , ; : \ " . [ ]    */
					var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]"
					/* The following string represents the range of characters allowed in a 
					username or domainname.  It really states which chars aren't allowed. */
					var validChars="\[^\\s" + specialChars + "\]"
					/* The following pattern applies if the "user" is a quoted string (in
					which case, there are no rules about which characters are allowed
					and which aren't; anything goes).  E.g. "jiminy cricket"@disney.com
					is a legal e-mail address. */
					var quotedUser="(\"[^\"]*\")"
					/* The following pattern applies for domains that are IP addresses,
					rather than symbolic names.  E.g. joe@[123.124.233.4] is a legal
					e-mail address. NOTE: The square brackets are required. */
					var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/
					/* The following string represents an atom (basically a series of
					non-special characters.) */
					var atom=validChars + '+'
					/* The following string represents one word in the typical username.
					For example, in john.doe@somewhere.com, john and doe are words.
					Basically, a word is either an atom or quoted string. */
					var word="(" + atom + "|" + quotedUser + ")"
					// The following pattern describes the structure of the user
					var userPat=new RegExp("^" + word + "(\\." + word + ")*$")
					/* The following pattern describes the structure of a normal symbolic
					domain, as opp sed to ipDomainPat, shown above. */
					var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$")
					/* Finally, let's start trying to figure out if the supplied address is
					valid. */

					/* Begin with the coarse pattern to simply break up user@domain into
					different pieces that are easy to analyze. */
					   
					var matchArray=emailStr.match(emailPattern);
					// Check for the Email start with number.
					if ('0123456789'.indexOf(emailStr.charAt(0)) >= 0) 
					{
					return false; 	
					}
					if ('!%&\\(\\)<>@,;:\\\\\\\"\\.\\[\\]'.indexOf(emailStr.charAt(0)) >= 0) 
					{
					return false; 	
					}

					if (matchArray==null) {
					/* Too many/few @'s or something; basically, this address doesn't
						even fit the general mould of a valid e-mail address. */
						//alert("Email address seems incorrect (check @ and .'s)")
						return false
					}
					user=matchArray[1]
					var domain=matchArray[2]

					// See if "user" is valid 
					if (user.match(userPat)==null) {
						// user is not valid
						//alert("The username doesn't seem to be valid.")
						return false
					}

					/* if the e-mail address is at an IP address (as opposed to a symbolic
					host name) make sure the IP address is valid. */
					var IPArray=domain.match(ipDomainPat)
					if (IPArray!=null) {
						// this is an IP address
						for (var i=1;i<=4;i++) {
							if (IPArray[i]>255) {
						//      alert("Destination IP address is invalid!")
							return false
							}
						}
						return true
					}

					// Domain is symbolic name
					var domainArray=domain.match(domainPat)
					if (domainArray==null) {
						//alert("The domain name doesn't seem to be valid.")
						return false
					}

					/* domain name seems valid, but now make sure that it ends in a
					three-letter word (like com, edu, gov) or a two-letter word,
					representing country (uk, nl), and that there's a hostname preceding 
					the domain or country. */

					/* Now we need to break up the domain to get a count of how many atoms
					it consists of. */
					var atomPat=new RegExp(atom,"g")
					var domArr=domain.match(atomPat)
					var len=domArr.length
					if (domArr[domArr.length-1].length<2 || 
						domArr[domArr.length-1].length>3) {
					// the address must end in a two letter or three letter word.
					//alert("The address must end in a three-letter domain, or two letter country.")
					return false
					}

					// Make sure there's a host name preceding the domain.
					if (len<2) {
					//var errStr="This address is missing a hostname!"
					//alert(errStr)
					return false
					}

					// If we've gotten this far, everything's valid!
					return true;
					}
				//*****************************Email Ends Here****************************************
				

				
		
		var opopup=window.createPopup()
		function showPop(left,top,x,y,data)
	{
		opopup.document.body.innerHTML="<table cellspacing=0 cellpadding=0 width=100% height=100% border=1 bgcolor=beige><tr><td align=center style=FONT-FAMILY:Garamond;color: midnightblue;font-size: 6pt;>" + data + "</td></tr><tr><td align=center><img src='../NewImages/OLAPReports/wait.gif'></td></tr></table>";
		opopup.show(left,top,x, y);
		document.body.disabled=true;
	}
	
		function hidePop()
		{
			opopup.hide();
			document.body.disabled=false;
		}
	
	function replaceAll(OldString,FindString,ReplaceString) 
	{
		var SearchIndex = 0;
		var NewString = ""; 
		while (OldString.indexOf(FindString,SearchIndex) != -1)
		{
			NewString += OldString.substring(SearchIndex,OldString.indexOf(FindString,SearchIndex));
			NewString += ReplaceString;
			SearchIndex = (OldString.indexOf(FindString,SearchIndex) + FindString.length); 
		}
		NewString += OldString.substring(SearchIndex,OldString.length);
		return NewString;
	}
	//*************************for Backgrouncolor*********************
		function fnErrorColor(obj)
		{
			obj.style.backgroundColor = "#ffffcc";
		}
		function fnOriginalColor(obj)
		{
			obj.style.backgroundColor = "white";			
		}		
	//********************************************************
function fnRemoveChar()
{
	//alert(window.event.keyCode)
	if(window.event.keyCode==33||window.event.keyCode==35||window.event.keyCode==36 || window.event.keyCode==37 || window.event.keyCode==92 || window.event.keyCode==94 || window.event.keyCode==95 || window.event.keyCode==38 || window.event.keyCode==42 || window.event.keyCode==124 || window.event.keyCode==59 ||window.event.keyCode==60 || window.event.keyCode==62 || window.event.keyCode==63 || window.event.keyCode==39 || window.event.keyCode==43 || window.event.keyCode==45)
	{
		event.returnValue=false;
	}	
}
function AllowInteger(objectName)  // IN this function You enter the Id of the text box then it will allow only valid number.
{			
	var objectVal=trim(eval(objectName).value)							 // This Function is to be called "onkeypress"	 of the control.
		if(event.keyCode<48 || event.keyCode >57)
		{
			alert("Please Enter valid number");
			event.returnValue=false;
		}	
		if(objectVal.length>4)
		{
			alert("Field Length Can't be greater than " + 4 + " Character")
			eval(objectName).select()
			eval(objectName).focus()
			return false
		}
}


	           
           function onlyNumbers(evt)
             {
                var e = event || evt; // for trans-browser compatibility
                var charCode = e.which || e.keyCode;

                if (charCode > 31 && (charCode < 48 || charCode > 57))
                    return false;

                return true;

             }
