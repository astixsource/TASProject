<HTML>
	<HEAD>
		<TITLE>			
		</TITLE>
	</HEAD>	
<BODY leftMargin=0 topMargin=0>
<SCRIPT language=JScript>
var gMonths = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
var gdCtrl = new Object();
var gcGray = "#808080";
var gcToggle = "#ffff00";
var gcBG = "#cccccc";
var gdCurDate = new Date();
var giYear = gdCurDate.getFullYear();
var giMonth = gdCurDate.getMonth()+1;
var giDay = gdCurDate.getDate();
var VicPopCal = new Object();

//****************************************************************************
// Param: popCtrl is the widget beyond which you want this calendar to appear;
//        dateCtrl is the widget into which you want to put the selected date;
//        popCal is the widget to display the calendar;  
// i.e.: <input type="text" name="dc" style="text-align:center" readonly><INPUT type="button" value="V" onclick="fPopCalendar(dc,dc,popCal);return false">
//****************************************************************************

function fPopCalendar(popCtrl, dateCtrl, popCal){
//alert(igYear);
//alert(popCtrl);
//debugger
 var x ;
  var y ;
  x = parent.event.clientX ;
  y = parent.event.clientY ; 	
  parent.event.cancelBubble=true;
  VicPopCal = popCal;
  gdCtrl = dateCtrl;
  fSetYearMon(giYear, giMonth);
  var point = fGetXY(popCtrl);
  with (VicPopCal.style) {
  //	left = point.x;
	//top  = point.y + parseInt(popCtrl.offsetHeight,10) +1;
//	top = y ;
//	left = x ;
	visibility = 'visible';
  }
  //VicPopCal.focus();
  // in order to make compatible with IE4.x , here I cut two line below off.
  // VicPopCal.all("popFrame").width=document.all("popTable").offsetWidth;
  // VicPopCal.all("popFrame").height=document.all("popTable").offsetHeight;
  // if u only target on IE5.x, uncommented them and delete the width&height prop in <IFrame> tag
  // thus you will find the 3rd para in fDrawCal() now works perfectly.
}
/*'*******************************************************************************************************************
'*				Function Name	: fSetDate()																			*
'*				Description		: Puting values in input box 
'*				Parameters in	: iYear, iMonth, iDay																			*
'*				Return value	: None																	*
'*******************************************************************************************************************
*/
function fSetDate(iYear, iMonth, iDay){
  //gdCtrl.value = gMonths[iMonth - 1]+"/"+iDay+"/"+iYear; //Here, you could modify the locale as you need !!!!
 // gdCtrl.value = iDay+"/"+iMonth+"/"+iYear; //Here, you could modify the locale as you need !!!!
 gdCtrl.value = iDay +"-"+gMonths[iMonth - 1]+"-"+iYear; //Here, you could modify the locale as you need !!!!
 gdCtrl.focus();
  VicPopCal.style.visibility = "hidden";
  
}
/*'*******************************************************************************************************************
'*				Function Name	: fSetSelected()																			*
'*				Description		: Generating calender control
'*				Parameters in	: aCell																		*
'*				Return value	: None																	*
'*******************************************************************************************************************
*/
function fSetSelected(aCell){
  var iOffset = 0;
  var iYear = parseInt(tbSelYear.value);
  var iMonth = parseInt(tbSelMonth.value);

  aCell.bgColor = gcBG;
  with (aCell.children["cellText"]){
  	var iDay = parseInt(innerText);
  	if (color==gcGray)
		iOffset = (Victor<10)?-1:1;
	iMonth += iOffset;
	if (iMonth<1) {
		iYear--;
		iMonth = 12;
	}else if (iMonth>12){
		iYear++;
		iMonth = 1;
	}
  }
  fSetDate(iYear, iMonth, iDay);
}
/*'*******************************************************************************************************************
'*				Function Name	: Point()																			*
'*				Description		: setting x  and y coordinates of calender control 
'*				Parameters in	: iX, iY																	*
'*				Return value	: None																	*
'*******************************************************************************************************************
*/
function Point(iX, iY){
	this.x = iX;
	this.y = iY;
}
/*'*******************************************************************************************************************
'*				Function Name	: fBuildCal()																			*
'*				Description		: populating calender control
'*				Parameters in	: iYear, iMonth																	*
'*				Return value	: None																	*
'*******************************************************************************************************************
*/
function fBuildCal(iYear, iMonth) {
  var aMonth=new Array();
  for(i=1;i<7;i++)
  	aMonth[i]=new Array(i);
  var dCalDate=new Date(iYear, iMonth-1, 1);
  var iDayOfFirst=dCalDate.getDay();
  var iDaysInMonth=new Date(iYear, iMonth, 0).getDate();
  var iOffsetLast=new Date(iYear, iMonth-1, 0).getDate()-iDayOfFirst+1;
  var iDate = 1;
  var iNext = 1;
  for (d = 0; d < 7; d++)
	aMonth[1][d] = (d<iDayOfFirst)?-(iOffsetLast+d):iDate++;
  for (w = 2; w < 7; w++)
  	for (d = 0; d < 7; d++)
		aMonth[w][d] = (iDate<=iDaysInMonth)?iDate++:-(iNext++);
  return aMonth;
}
/*'*******************************************************************************************************************
'*				Function Name	: fBuildCal()																			*
'*				Description		: Defining size for calender 
'*				Parameters in	: iYear, iMonth, iCellWidth, iDateTextSize																*
'*				Return value	: None																	*
'*******************************************************************************************************************
*/
function fDrawCal(iYear, iMonth, iCellWidth, iDateTextSize) {
  var WeekDay = new Array("Su","Mo","Tu","We","Th","Fr","Sa");
  var styleTD = " bgcolor='"+gcBG+"' width='"+iCellWidth+"' bordercolor='"+gcBG+"' valign='middle' align='center'  style='font:bold "+iDateTextSize+" Courier;";            //Coded by Liming Weng(Victor Won)  email:victorwon@netease.com

  with (document) {
	write("<tr>");
	for(i=0; i<7; i++)
		write("<td "+styleTD+"color:#990099' >" + WeekDay[i] + "</td>");
	write("</tr>");

  	for (w = 1; w < 7; w++) {
		write("<tr>");
		for (d = 0; d < 7; d++) {
			write("<td id=calCell "+styleTD+"cursor:hand;' onMouseOver='this.bgColor=gcToggle' onMouseOut='this.bgColor=gcBG' onclick='fSetSelected(this)'>");
			write("<font id=cellText Victor='Liming Weng'> </font>");
			write("</td>")
		}
		write("</tr>");
	}
  }
}
/*'*******************************************************************************************************************
'*				Function Name	: fUpdateCal()																			*
'*				Description		: updating the calender based on selection 
'*				Parameters in	: iYear, iMonth																*
'*				Return value	: None																	*
'*******************************************************************************************************************
*/
function fUpdateCal(iYear, iMonth) {
  myMonth = fBuildCal(iYear, iMonth);
  var i = 0;
  for (w = 0; w < 6; w++)
	for (d = 0; d < 7; d++)
		with (cellText[(7*w)+d]) {
			Victor = i++;
			if (myMonth[w+1][d]<0) {
				color = gcGray;
				innerText = -myMonth[w+1][d];
			}else{
				color = ((d==0)||(d==6))?"red":"black";
				innerText = myMonth[w+1][d];
			}
		}
}
/*'*******************************************************************************************************************
'*				Function Name	: fSetYearMon()																			*
'*				Description		: updating the year in calender  
'*				Parameters in	: iYear, iMon															*
'*				Return value	: None																	*
'*******************************************************************************************************************
*/
function fSetYearMon(iYear, iMon){
  tbSelMonth.options[iMon-1].selected = true;
  for (i = 0; i < tbSelYear.length; i++)
	if (tbSelYear.options[i].value == iYear)
		tbSelYear.options[i].selected = true;
  fUpdateCal(iYear, iMon);
}
/*'*******************************************************************************************************************
'*				Function Name	: fPrevMonth()																			*
'*				Description		: updating the month in calender  
'*				Parameters in	: None 															*
'*				Return value	: None																	*
'*******************************************************************************************************************
*/
function fPrevMonth(){
  var iMon = tbSelMonth.value;
  var iYear = tbSelYear.value;

  if (--iMon<1) {
	  iMon = 12;
	  iYear--;
  }

  fSetYearMon(iYear, iMon);
}
/*'*******************************************************************************************************************
'*				Function Name	: fNextMonth()																			*
'*				Description		: updating the month in calender  
'*				Parameters in	: None 															*
'*				Return value	: None																	*
'*******************************************************************************************************************
*/
function fNextMonth(){
  var iMon = tbSelMonth.value;
  var iYear = tbSelYear.value;

  if (++iMon>12) {
	  iMon = 1;
	  iYear++;
  }

  fSetYearMon(iYear, iMon);
}

/*'*******************************************************************************************************************
'*				Function Name	: fGetXY()																			*
'*				Description		: updating X and Y coordinates  for calender control
'*				Parameters in	: aTag 															*
'*				Return value	: None																	*
'*******************************************************************************************************************
*/
function fGetXY(aTag){
  var oTmp = aTag;
  var pt = new Point(0,0);
  if(aTag.tagName != null)
  {
	do {
  		pt.x += aTag.offsetLeft;
  		pt.y += aTag.offsetTop;
  		aTag = aTag.offsetParent;
	} 
	while(aTag !=null);
	return pt;
	}	  
}



with (document) {
write("<table id='popTable' border='0' bgcolor='#6699cc'>");
write("<TR>");
write("<td valign='middle' align='center'><input type='button' name='PrevMonth' value='<' style='height:20;width:20;FONT:12 Fixedsys' onClick='fPrevMonth()'>");
write("&nbsp;<select name='tbSelMonth' onChange='fUpdateCal(tbSelYear.value, tbSelMonth.value)' Victor='Won'>");
for (i=0; i<12; i++)
	write("<option value='"+(i+1)+"'>"+gMonths[i]+"</option>");
write("</SELECT>");
write("&nbsp;<SELECT name='tbSelYear' onChange='fUpdateCal(tbSelYear.value, tbSelMonth.value)' Victor='Won'>");
for(i=1900;i<2050;i++)
	write("<OPTION value='"+i+"'>"+i+"</OPTION>");
write("</SELECT>");
write("&nbsp;<input type='button' name='PrevMonth' value='>' style='height:20;width:20;FONT:16 Fixedsys' onclick='fNextMonth()'>");
write("</td>");
write("</TR><TR>");
write("<td align='center'>");
write("<DIV style='background-color:teal;'><table width='100%' border='0' cellpadding='2'>");
fDrawCal(giYear, giMonth, 19, 12);
write("</table></DIV>");
write("</td>");
write("</TR><TR><TD align='center'>");
write("<font style='cursor:hand;font:12 Fixedsys' onclick='fSetDate(giYear,giMonth,giDay)' onMouseOver='this.style.color=gcToggle' onMouseOut='this.style.color=0'>Today:&nbsp;&nbsp;"+gMonths[giMonth-1]+"&nbsp;"+giDay+",&nbsp;"+giYear+"</font>");
write("</TD></TR>");write("</TD></TR>");
write("</TABLE>");
}
// End -- 
		</SCRIPT>
	</BODY>
</HTML>