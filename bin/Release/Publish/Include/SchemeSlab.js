// JScript File
function fnAdd_Slab(flgLockStatus)
{
	var intRowPosition;
	var objOldRow= document.getElementById("tblSlab").rows[1];
	var objNewRow;   //  Used to insert new row in table
	intRowPosition = parseInt(document.getElementById("hdnRowCounter_Slab").value,10);
	objNewRow=document.getElementById("tblSlab").insertRow(intRowPosition-1);
	
	/*if (intRowPosition%2 == 0)
		objNewRow.style.backgroundColor="#FFFFFF"	;
	else
		objNewRow.style.backgroundColor="#E1DBF0"	;*/
		
	objNewRow.style.height="25px";
	objNewRow.style.display="table-row"
	objNewRow.id = "trSlab" + parseInt(intRowPosition,10)
	//alert(objNewRow.id)
	for(var cur_cell=0; cur_cell<objOldRow.cells.length; ++cur_cell)
	{
		fnSetFieldValue_Slab(intRowPosition,cur_cell,objNewRow,flgLockStatus);
	}
	document.getElementById("hdnRowCounter_Slab").value =parseInt(document.getElementById("hdnRowCounter_Slab").value,10) + 1;
	intAddNewRowPosition = document.getElementById("hdnRowCounter_Slab").value
	//fnDisplayRowNumbers('PBA',2)
}
function fnSetFieldValue_Slab(id,action,objNewRow,flgLockStatus)
{
	var objCell = objNewRow.insertCell(action);
	
	switch(action)
	{
		
		case 0:
					objCell.innerHTML = "<input type=hidden id='hdnJSRowID_Slab" + id + "' value='" + id + "'><input type=hidden id='hdnDBID_Slab" + id + "' value='0'>"								
					break;
				
		case 1:
				    objCell.className ="clsVrdn8"
				     if (flgLockStatus == 2)
				     {
				            objCell.innerHTML = "<input disabled id='txtFrom_Slab" + id + "' onkeypress='return onlyNumbers();'  type='text' size='10' name='txtFrom_Slab" + id + "'>"
				     }
				     else
				     {
				        objCell.innerHTML = "<input id='txtFrom_Slab" + id + "' onkeypress='return onlyNumbers();'  type='text' size='10' name='txtFrom_Slab" + id + "'>"
				     }
					break;
			
		case 2:
					objCell.className ="clsVrdn8"
				    //	alert(flgLockStatus)
					if (flgLockStatus == 2)
				     {
				        	objCell.innerHTML = "<input disabled id='txtDisQty_Slab" + id + "' onkeypress='return onlyNumbers();'  size='10'  type='text' name='txtDisQty_Slab" + id + "'>"
					 }
					 else
					 {
					    objCell.innerHTML = "<input  id='txtDisQty_Slab" + id + "' onkeypress='return onlyNumbers();'  size='10'  type='text' name='txtDisQty_Slab" + id + "'>"
					 }


					 break;
		case 3:
		            objCell.innerHTML = "<select class='clsVrdn8' id=ddlFreeProduct" + id + "></select>"
		            var iCnt

		            for (iCnt = 0; iCnt < document.getElementById("hdnFreeProduct").length; iCnt++) {
		                var oOption = document.createElement("OPTION");
		                document.getElementById("ddlFreeProduct" + id).options.add(oOption);
		                oOption.value = document.getElementById("hdnFreeProduct").options[iCnt].value;

		                oOption.innerHTML = document.getElementById("hdnFreeProduct").options[iCnt].text;
		            }
		            break;
		
		case 4:	    
		            objCell.className ="clsVrdn8"
		          //  alert(flgLockStatus)
		            if (flgLockStatus == 2)
		            {
		                
		                objCell.innerHTML ="<img disabled id='imgAddSlab" + id + "' style='CURSOR: hand' onclick='fnAdd_Slab(0);return false;' alt='Click to Add More' src='../NewImages/icoAdd.gif'>/<img style='CURSOR: hand' disabled onclick='fnDelete_Slab(" + id + ");return false;' alt='Click to Delete Row' src='../NewImages/icoMinus.gif'>"
		            }
		            else
		            {
		                 objCell.innerHTML ="<img  id='imgAddSlab" + id + "' style='CURSOR: hand' onclick='fnAdd_Slab(0);return false;' alt='Click to Add More' src='../NewImages/icoAdd.gif'>/<img style='CURSOR: hand' onclick='fnDelete_Slab(" + id + ");return false;' alt='Click to Delete Row' src='../NewImages/icoMinus.gif'>"
		            }
					break;
	}
}

function fnDelete_Slab(id)
{
	if (document.getElementById("txtFrom_Slab" + id).value !="")
	{
		if(window.confirm("Are you Sure You want to delete this Row "))
		{
			document.getElementById("trSlab" + id).style.display="none";
		//	fnDisplayRowNumbers('PBA',2)
		}
		else
		{
			return false;
		}
	}
	else
	{   
	    document.getElementById("trSlab" + id).style.display="none";
	   // fnDisplayRowNumbers('PBA',2)
	}
	
}


function Savestring_Slab()
{
    var IniRowNo=2;
    var RowCount=parseInt(document.getElementById("hdnRowCounter_Slab").value,10);
   // var RowsToSave=(RowCount-IniRowNo);
    var count=0;
    var savestring="";
    var JSrowID=0;
    var DBRowID=0;
    for(count=IniRowNo;count< RowCount;count++)
    {
        JSrowID=document.getElementById("hdnJSRowID_Slab" + count).value;
        DBRowID=document.getElementById("hdnDBID_Slab" + count).value;
         var tmpIndex=document.getElementById("ddlFreeProduct" + count).selectedIndex;
        if (DBRowID==0)
        {
            //if(document.getElementById("trSlab" + count).style.display=="block")
            //{
                if (document.getElementById("txtFrom_Slab" + count).value!="")
                {

                    if (savestring == "")
                                        
                        savestring = document.getElementById("txtFrom_Slab" + count).value
                                    + "^0^" + document.getElementById("txtDisQty_Slab" + count).value + "^" + document.getElementById("ddlFreeProduct" + count).options[tmpIndex].value + "^";
                     
                                    
                    else
                        savestring=savestring + "|" + document.getElementById("txtFrom_Slab" + count).value 
                                    + "^0^" + document.getElementById("txtDisQty_Slab" + count).value + "^" + document.getElementById("ddlFreeProduct" + count).options[tmpIndex].value + "^";
                       
                }                
            //}
        }
        else
        {
            //if(document.getElementById("trSlab" + count).style.display=="block")
            //{
            if (document.getElementById("txtFrom_Slab" + count).value != "") {
                if (savestring == "")

                    savestring = document.getElementById("txtFrom_Slab" + count).value
                                    + "^0^" + document.getElementById("txtDisQty_Slab" + count).value + "^" + document.getElementById("ddlFreeProduct" + count).options[tmpIndex].value + "^";
                else
                    savestring = savestring + "|" + document.getElementById("txtFrom_Slab" + count).value
                                    + "^0^" + document.getElementById("txtDisQty_Slab" + count).value + "^" + document.getElementById("ddlFreeProduct" + count).options[tmpIndex].value + "^";
            }
//            }
//            else
//            {
//                if (savestring=="")
////                
//                 savestring= document.getElementById("txtFrom_Slab" + count).value 
//                                     + "^0^" + document.getElementById("txtDisQty_Slab" + count).value + "^" + document.getElementById("ddlFreeProduct" + count).options[tmpIndex].value + "^";
//                else
//                    savestring=savestring + "|" + document.getElementById("txtFrom_Slab" + count).value
//                                   + "^0^" + document.getElementById("txtDisQty_Slab" + count).value + "^" + document.getElementById("ddlFreeProduct" + count).options[tmpIndex].value + "^";

//            }
        }
    }
    if (savestring!="")
        return savestring + "|";
    else
        return savestring ;
}
function LoadData_Slab(Data_Slab,flgLockStatus)
{
   
    if (Data_Slab !="")
    {
    var IniRowNo=2;
    var lastRow=0;
    var arr=new Array();
	arr=Data_Slab.split("|");
	var arrrowString="";
	var ArrData ="";
	
	for(var i=0;i<arr.length-1;i++)
	{
			if (i+IniRowNo!=IniRowNo)
				fnAdd_Slab(flgLockStatus);
			
//			    lastRow=parseInt(document.getElementById("hdnRowCounter_Slab").value,10) - 1;
//			    arrrowString=arr[i].split("@");
//			    document.getElementById("hdnJSRowID_Slab" + (IniRowNo + i)).value=arrrowString[0].split("^")[0];
//			    document.getElementById("hdnDBID_Slab" + (IniRowNo + i)).value=arrrowString[0].split("^")[1];
//			    ArrData=arrrowString[1].split("^");
//			    document.getElementById("txtFrom_Slab" + (IniRowNo + i)).value=ArrData[0];
//			    document.getElementById("txtTo_Slab" + (IniRowNo + i)).value=ArrData[1];
//			    document.getElementById("txtDisQty_Slab" + (IniRowNo + i)).value=ArrData[2];


                lastRow=parseInt(document.getElementById("hdnRowCounter_Slab").value,10) - 1;
			    ArrData=arr[i].split("^");
			//    alert(ArrData)
			    
			    document.getElementById("hdnJSRowID_Slab" + (IniRowNo + i)).value=0
			    document.getElementById("hdnDBID_Slab" + (IniRowNo + i)).value=0
			   
			    document.getElementById("txtFrom_Slab" + (IniRowNo + i)).value=ArrData[0];
			  //  document.getElementById("txtTo_Slab" + (IniRowNo + i)).value=ArrData[1];
			    document.getElementById("txtDisQty_Slab" + (IniRowNo + i)).value = ArrData[2];

			    for (var j = 0; j < document.getElementById("ddlFreeProduct" + (IniRowNo + i)).length; j++) {
			        if (document.getElementById("ddlFreeProduct" + (IniRowNo + i)).options[j].value == ArrData[3])
			            document.getElementById("ddlFreeProduct" + (IniRowNo + i)).options[j].selected = true;
			    }
			  
			    
			
			
	}
	}
	
}

function UpdateRowIDs_Slab(ID_Slab)
{
    var IniRowNo=2;
    var Arr=ID_Slab.split("@");
    for(var count=0;count<Arr.length;count++)
    {
        if (document.getElementById("hdnJSRowID_Slab" + (IniRowNo + count)).value==Arr[count].split("^")[0])
        {
            document.getElementById("hdnDBID_Slab" + (IniRowNo + count)).value=Arr[count].split("^")[1];
        }
        
    }
}