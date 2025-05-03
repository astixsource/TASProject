	var opopup=window.createPopup()
	function showPop(left,top,x,y,data)
	{
		opopup.document.body.innerHTML="<table cellspacing=0 cellpadding=0 width=100% height=100% border=1 bgcolor=beige><tr><td align=center style=FONT-FAMILY:Garamond;color: midnightblue;font-size: 6pt;>" + data + "</td></tr><tr><td align=center><img src='..\\\\wait.gif'></td></tr></table>";
		opopup.show(left,top,x, y);
		document.body.disabled=true;
	}
	function hidePop()
	{
		opopup.hide();
		document.body.disabled=false;
	}
	
	function enableInput(txtCtrl,cboPutinTo,cboputinFrom)
	{
		eval(txtCtrl).disabled = false;
		eval(txtCtrl).select()
		eval(txtCtrl).focus()
		//document.all.cboCtrlDiv.style.display = "block";
		//eval(cboCtrl).style.display = "block";//hidden div which contains list of departments.
		eval(cboPutinTo).style.display = "none";
		//if (trim(eval(txtCtrl).value) != "")			
		//{
		//	putCombo(cboPutinTo,cboputinFrom, eval(txtCtrl).value)
		//}	
	}

	function CheckKcode(cboPutinTo,cboPutinFrom,txtCtrl)
	{
		
		if(eval(txtCtrl).value != "")
		{
			putCombo(cboPutinTo,cboPutinFrom,eval(txtCtrl).value)
		}
	}	

	function putCombo(obj,oFrom, strText)
	{
			
		var iLoopCounter = 0 ;				
		var oPro = eval(obj);
		iLoopCounter = oPro.length;		
		var str1 = new String() ;
		var str2 = new String();
		str1 = strText ;
		addCombo(obj,oFrom,str1.substr(0,str1.length).toLowerCase());
		if(strText.indexOf("%")==0)
		{
			str1 = str1.substr(1,str1.length) ;
		}
		var iSelectedIndex ;		
		try 
		{			
			for(i = 0; i != iLoopCounter ;i++)
			{
				str2 = oPro.options[i].text;						
				if (str2.substr(0,str1.length).toLowerCase() == str1.toLowerCase())
				{						
					oPro.options[i].selected = true ;	
					break;															
				}								
			}									 
		}
		catch (e)
		{
		}	
	}
	
	function addCombo(obj,oFrom,strText)
	{
		
		deleteCombo(obj,strText);//didn't get it!!
		var oPro = eval(oFrom);
		var iLoopCounter = oPro.length;	
		var strTmp = new String();
	
	
		if(strText=="%")
		{
			for(i = 0; i != iLoopCounter ;i++)
			{
					var oOption = document.createElement("OPTION");
					eval(obj).options.add(oOption);
					oOption.innerText = oPro.options[i].text;
					oOption.Value = oPro.options[i].value;		
					eval(obj).style.display = "block";
			}		
		}
	else
	{
		for(i = 0; i != iLoopCounter ;i++)
			{
				strTmp =  oPro.options[i].text;	
				if(strText.indexOf("%")!=-1 && strText.indexOf("%")==0)
					{
						var varText=strText.substr(1,strText.length)
						strText=strText.substr(0,strText.indexOf("%")+1)+varText.replace("%","")
						var strPos=strTmp.toLowerCase().indexOf(strText.substr(1,strText.length).toLowerCase())
						//alert(strTmp.substr(strPos,parseInt(strText.length)-1).toLowerCase())
						if(strTmp.substr(strPos,parseInt(strText.length)-1).toLowerCase() == strText.substr(1,strText.length).toLowerCase())
							{
								var oOption = document.createElement("OPTION");
								eval(obj).options.add(oOption);
								oOption.innerText = oPro.options[i].text;
								oOption.Value = oPro.options[i].value;	
							}//end if
					}//end if
				else
					{
						strText=strText.replace("%","")
						if (strTmp.substr(0,strText.length).toLowerCase() == strText.toLowerCase())
							{
								eval(obj).style.display = "block";
								var oOption = document.createElement("OPTION");
								eval(obj).options.add(oOption);
								oOption.innerText = oPro.options[i].text;
								oOption.Value = oPro.options[i].value;	
							}	
					}//else end
			}//For End	
		}//End if		
	}//function end
	
	

			
	function disableInput(txtCtrl,cboPutinFrom,hdnVal,hdnCntCode,hdnAreaCode)
	{
		var obj = new Object();
		obj = eval(cboPutinFrom);
		eval(txtCtrl).value  = obj.options[obj.selectedIndex].text;
		
		var strCity=obj.options[obj.selectedIndex].Value;
		
		//eval(hdnVal).value = strCity.split("|")[0];
		eval(hdnVal).value = strCity;
		
		if(eval(hdnCntCode)!=null)
		{
			eval(hdnVal).value = strCity.split("|")[0];
			eval(hdnCntCode).value = strCity.split("|")[1];
			eval(hdnAreaCode).value = strCity.split("|")[2];
		}
		
		//eval(hdnVal).value = obj.options[obj.selectedIndex].Value;
		//alert(obj.options[obj.selectedIndex].Value)
		
		
		eval(cboPutinFrom).style.display = "none";
		
		eval(txtCtrl).disabled = true;			
		//eval(txtCtrl).disabled = true;			
	}		
			


/*function Chk_Char(strText)
{
for(i=0;i<strText.length;i++)
{
var m=strText.charAt(i);
if((m<"a" && m>"z")||(m<"A" && m>"Z"))
{
alert("You have Entered Invalid Character")
break;
}
}
}*/
function comapreValue(ControlType,ControlName,ControlNameChk)
		{	
		var errFlag = false ;		
		switch(ControlType)
			{
			
				case 1: // case text box
					
					var str = new String();
					str = trim(ControlName.value);	
					var iCnt = parseInt(str.length,10);					
					if (iCnt == 0)
						{
							errFlag = true ;							
						}	
						
					break ;
				case 2: //Date
					break ;
					case 3: // check box						
						errFlag = chkValidation(ControlNameChk) ;						
						break ;	
					break ;
					case 4: //select box
					if (trim(ControlName.value) == "0")
						{
							errFlag = true ;
						}			
						break ;
						
						
			}
			
			return errFlag ;
	}
function RequiredControlToValid()
	{
	var bRequiredFlag = false;
	var strO = new Array();
	var strN = new Array();
	var strArrID = new Array(); // to store control name and id 
	var strRvalue ;	
	strRvalue = "" ;
	if (trim(strControlId ) != "" )	
	{
			strO = strControlName.split(",");
			strArrID = strControlId.split(",");
			var odoc ;			
			for (var iCtr = 0 ; iCtr != strO.length; iCtr++)
				{
					
					odoc = eval("document.forms[0]." + strO[iCtr]);							
					strN = strFieldArray[strArrID[iCtr]].split("~");						
					
					if (comapreValue(parseInt(trim(strN[1])),odoc,strO[iCtr]))
								{
						
										switch (parseInt(trim(strN[3])))
											{	
												case 2: // not required		
													break ;
												case 1: //  required 										
															bRequiredFlag = true ;
															strRvalue = strN[2];
															//alert(eval("document.forms[0]." + strO[iCtr]).value)	
															break;
												
												case 0: // optional
														
													break ;			
											}
						
							}
							else
								{
								if (parseInt(trim(strN[1]),10) != 3)
									{									
											switch (parseInt(trim(strN[0])))
													{	
														case 1: // Text														
														if (IsSpecialChar(trim(odoc.value)))
															{
																	bRequiredFlag = true ;
																	strRvalue = strN[2];										
															}
															break;
														case 2: //  Numeric
															if (IsNumber(trim(odoc.value)))
																{
																	bRequiredFlag = true ;
																	strRvalue = strN[2];	
																}	
															break;
														case 3: // Date
																
															break;
														}
										}				
								}
					
					if (bRequiredFlag)			
								{
									break ;
								}
				}
	} // if value name control  is empty
		return strRvalue ;

}	


function optionalControlToValid()
	{
var bRequiredFlag = false;
var strO = new Array();
	var strN = new Array();
	var strArrID = new Array(); // to store control name and id 
	var strRvalue ;	
	strRvalue = "" ;
	if (trim(strControlId ) != "" )	
	{
			strO = strControlName.split(",");
			strArrID = strControlId.split(",");
			var odoc ;			
			for (var iCtr = 0 ; iCtr != strO.length; iCtr++)
				{
				
					odoc = eval("document.forms[0]." + strO[iCtr]);		
					strN = strFieldArray[strArrID[iCtr]].split("~");	
					
				if (comapreValue(parseInt(trim(strN[1])),odoc,strO[iCtr]))
							{								
								switch (parseInt(trim(strN[3])))
											{	
												case 2: // not required		
													break
												case 1: //  required 																						
													break;		
												
												case 0: // optional
														bRequiredFlag = true ;
														strRvalue += strN[2];
													break;
											}
						
							}							
					
					
				}
	} // if value name control  is empty
		return strRvalue ;


}	


	function chkValidation(strVal)
	{
			var bfalg = true ;
			var strControl = new String() ;
			var str = new String();
			strControl = strVal
			for (var iCounter = 0 ; iCounter != parseInt(document.forms[0].length); iCounter++)
					{
					
					
						if(document.forms[0].elements[iCounter].type == "checkbox")
							{
							str = document.forms[0].elements[iCounter].name ;
							
								if (str.indexOf(strControl) >= 0 )
										{
												if (document.forms[0].elements[iCounter].checked)
													{
															bfalg = false ;	
													}
										}
							}
					}
				
			return bfalg ;
	}

function showCheck()
	{
		var strMessage = "" ;
		strMessage = optionalControlToValid()
		if (trim(strMessage) != "")
			{
				alert(strMessage)
			}
		strMessage = RequiredControlToValid();
		if (trim(strMessage) != "")
			{
				alert(strMessage);
				return false ;
		}
	
	}


function trim(fieldValue) {
	var s = new String(fieldValue);
	var str = ""
	var strSpace = " ";
	var i,j,intCount;
	
	//to replace the enter pressed with space
	for(intCount=0;intCount<s.length;intCount++)
	{
		if (!((s.charCodeAt(intCount)!=13) && (s.charCodeAt(intCount)!=10)))
			s=s.replace(s.charAt(intCount)," ");
	}
	
	for (i=0;i<s.length && s.charAt(i) == strSpace;i++);
	for (j=s.length; j>=0 && s.charAt(j - 1) == strSpace; j--);

	for (;i<j;i++)
		str = str + s.charAt(i);
	return (str)		
}


function IsSpecialChar(fieldValue)
{
	var i;
	var strToCheck = new String(trim(fieldValue));
	for( i=0;i<strToCheck.length;i++)
	{
		if(!((strToCheck.charCodeAt(i) == 32) || (strToCheck.charCodeAt(i) >=48 && strToCheck.charCodeAt(i) <=57) || (strToCheck.charCodeAt(i) >=65 && strToCheck.charCodeAt(i) <=90) || (strToCheck.charCodeAt(i) >=97 && strToCheck.charCodeAt(i) <=122)))
			return true;
	}
	return false;
}
function chkNumber(obj)
	{
		if(isNaN(eval(obj).value))
		{
			alert("Enter Numeric Quantity")
			eval(obj).focus();
			return false;
			
		}
	}
function IsNumber(fieldValue)
{
	var num = '0123456789';
	var i,j,found;
	found = false;
	for(i=0;i<fieldValue.length;i++)
	{
		for(j=0;j<num.length;j++)
		{
			if(fieldValue.charAt(i) == num.charAt(j))
			{found = true; break;}
		}
		if(found == false) {return false;}
		if(found == true) {found=false;}
	}
	return true;
}
/*
' Code for adding dynamic lis box in page 
'Author : Pardeep Sachdeva
'Date	: 02-May-2003

*/

function getKey(strText)
	{
	var key,s ;
	s = "";
	for (key in ctrArray) 
		{
			//s += key + "****";
			if (strText == ctrArray[key])
				{
				alert(key);
				}
		}

	}
	//end key

	function deleteCombo(obj,strText)
	{
	var oPro = eval(obj);
	var str = new String();	
	var iLoopCounter = oPro.length;	
	if (iLoopCounter == 0)
		{
		 return ;
		}
	str = oPro.options[0].text;
	if (str == strText)//	
		{
		return ;//don't delete if there is a match in combo's text and textbox's text.
		}
	for(i = 0; i != iLoopCounter ;i++)
		{
		oPro.options[0] = null;//oPro.options[0] = null;
		}		
	}//function end
	
	
	function repAmp(str)
	{
		var a=/'/g
		var repStr=str.replace(a,"`")
		var b=/&/g
		repStr=repStr.replace(b,"&#38;")
		var c=/</g
		repStr=repStr.replace(c,"&#60;")
		var d=/>/g
		repStr=repStr.replace(d,"&#62;")
		var e=/-/g
		return repStr.replace(e,"&#45;")
		//return repStr.replace(d,"&#62;")
		
	}
	
function fnRemoveChar()
	{
			//	alert(window.event.keyCode)
		if(window.event.keyCode ==33||window.event.keyCode ==58 || window.event.keyCode ==64||window.event.keyCode == 35||window.event.keyCode ==36 || window.event.keyCode ==37 || window.event.keyCode ==94 || window.event.keyCode ==38 || window.event.keyCode ==42 || window.event.keyCode ==124 || window.event.keyCode ==59 ||window.event.keyCode ==60 || window.event.keyCode ==62 || window.event.keyCode ==63 || window.event.keyCode ==39)
			{
				event.returnValue=false;
			}
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