// JScript File
function fnAdd_SubProduct() {
    var intRowPosition;
    var objOldRow = document.getElementById("tblSubProduct").rows[2];
    var objNewRow;   //  Used to insert new row in table
    intRowPosition = parseInt(document.getElementById("hdnRowCounter_SubProduct").value, 10);
    objNewRow = document.getElementById("tblSubProduct").insertRow(intRowPosition);

    /*if (intRowPosition%2 == 0)
    objNewRow.style.backgroundColor="#FFFFFF"	;
    else
    objNewRow.style.backgroundColor="#E1DBF0"	;*/

    objNewRow.style.height = "25px";
    objNewRow.style.display = "block"
    objNewRow.id = "trSubProduct" + parseInt(intRowPosition, 10)
    //alert(objNewRow.id)
    for (var cur_cell = 0; cur_cell < objOldRow.cells.length; ++cur_cell) {
        fnSetFieldValue_SubProduct(intRowPosition, cur_cell, objNewRow);
    }
    document.getElementById("hdnRowCounter_SubProduct").value = parseInt(document.getElementById("hdnRowCounter_SubProduct").value, 10) + 1;
    fnLoadProductName("ddlSubProduct" + (intRowPosition));
    intAddNewRowPosition = document.getElementById("hdnRowCounter_SubProduct").value
    //fnDisplayRowNumbers('PBA',2)
}
function fnSetFieldValue_SubProduct(id, action, objNewRow) {
    var objCell = objNewRow.insertCell(action);

    switch (action) {

        case 0:
            objCell.innerHTML = "&nbsp;&nbsp;&nbsp;<input type=hidden id='hdnJSRowID_SubProduct" + id + "' value='" + id + "'><input type=hidden id='hdnDBID_SubProduct" + id + "' value='0'>"
            break;
     
        case 1:
            objCell.className = "clsVrdn8"

            objCell.innerHTML = "<select class='clsVrdn8' id='ddlSubProduct" + id + "'></select>"
           
            break;

        case 2:
             objCell.align="center"
            objCell.className = "clsVrdn8"
            //	alert(flgLockStatus)

            objCell.innerHTML = "<input type='checkbox' id='chkPayable" + id + "'>"
            break;

        case 3:
            objCell.className = "clsVrdn8"

            objCell.innerHTML = "<img  id='imgAddProduct" + id + "' style='CURSOR: hand' onclick='fnAdd_SubProduct();return false;' alt='Click to Add More' src='../NewImages/icoAdd.gif'>/<img style='CURSOR: hand' onclick='fnDelete_SubProduct(" + id + ");return false;' alt='Click to Delete Row' src='../NewImages/icoMinus.gif'>"
           
            break;
    }
}

function fnDelete_SubProduct(id) {
    var dropdownval1 = document.getElementById("ddlSubProduct" + id).options[document.getElementById("ddlSubProduct" + id).selectedIndex].value
    if (dropdownval1 != 0) {
        if (window.confirm("Are you Sure You want to delete this Row ")) {
            document.getElementById("trSubProduct" + id).style.display = "none";
           
            //	fnDisplayRowNumbers('PBA',2)
        }
        else {
            return false;
        }
    }
    else {
        document.getElementById("trSubProduct" + id).style.display = "none";
        
        // fnDisplayRowNumbers('PBA',2)
    }

}


function Savestring_SubProduct() {
 //   alert("in save")
    var IniRowNo = 2;
    var RowCount = parseInt(document.getElementById("hdnRowCounter_SubProduct").value, 10);
 //   alert(RowCount)
    // var RowsToSave=(RowCount-IniRowNo);
    var count = 0;
    var savestring = "";
    var JSrowID = 0;
    var DBRowID = 0;
    var chkPayableID = 0;
    var dropdownval = 0;
    var strdropdownval = "";
    var chkFlag = 0;
    for (count = IniRowNo; count < RowCount; count++)
    
     {
            JSrowID = document.getElementById("hdnJSRowID_SubProduct" + count).value;
            DBRowID = document.getElementById("hdnDBID_SubProduct" + count).value;
            if (document.getElementById("chkPayable" + count).checked == true) {
                chkPayableID = 1;
            }
            else {
                chkPayableID = 0;
            }
            
            if (document.getElementById("trSubProduct" + count).style.display == "block") {
                dropdownval = document.getElementById("ddlSubProduct" + count).options[document.getElementById("ddlSubProduct" + count).selectedIndex].value

                if (strdropdownval == "") {
                    strdropdownval = dropdownval + "$";
                }
                else {
                    strdropdownval = strdropdownval + dropdownval + "$";
                }
            }
          /*  else {
                if (strdropdownval == "") {
                    strdropdownval = "-111$";
                }
                else {
                    strdropdownval = strdropdownval + "-111$";
                }
                    
            }
          */
           

        
             if (DBRowID == 0)
             {
                 if (document.getElementById("trSubProduct" + count).style.display == "block")
                 {
                    if (dropdownval != 0)
                     {
                        if (savestring == "")
                            savestring = dropdownval + "^" + chkPayableID + "^";
                        else
                            savestring = savestring + "|" + dropdownval + "^" + chkPayableID + "^";
                    }
                }
            }
            else
             {
                    if (document.getElementById("trSlab" + count).style.display == "block")
                     {
                        if (savestring == "")
                            savestring = dropdownval + "^" + chkPayableID + "^";
                        else
                            savestring = savestring + "|" + dropdownval + "^" + chkPayableID + "^";
                    }
                    else
                    {
                            if (savestring == "")
                                savestring = dropdownval + "^" + chkPayableID + "^";
                            else
                                savestring = savestring + "|" + dropdownval + "^" + chkPayableID + "^";

                    }
            }
        }


      //  alert("strdropdownval=" + strdropdownval)
      //  alert("savestring=" + savestring);

    var strSplit = strdropdownval.split("$")
   
    for (var intCnt = 0; intCnt < strSplit.length; intCnt++) {
        for (var i = intCnt + 1; i < strSplit.length; i++) {
            if (strSplit[intCnt] == strSplit[i]) {
              
                chkFlag = 1;
                savestring = "duplicate";
            }
        }
    }
   

    if (savestring == "duplicate") {
        return savestring;
    }
    else if (savestring != "")
        return savestring + "|";
    else
        return savestring;
}
function LoadData_SubProduct(Data_SubProduct) {

    if (Data_SubProduct != "") {
        var IniRowNo = 2;
        var lastRow = 0;
        var arr = new Array();
        arr = Data_SubProduct.split("|");
        var arrrowString = "";
        var ArrData = "";

        for (var i = 0; i < arr.length - 1; i++) {
            if (i + IniRowNo != IniRowNo)
                fnAdd_SubProduct();

            lastRow = parseInt(document.getElementById("hdnRowCounter_SubProduct").value, 10) - 1;
            ArrData = arr[i].split("^");
            //    alert(ArrData)

            document.getElementById("hdnJSRowID_SubProduct" + (IniRowNo + i)).value = 0
            document.getElementById("hdnDBID_SubProduct" + (IniRowNo + i)).value = 0

            document.getElementById("ddlSubProduct" + (IniRowNo + i)).value = ArrData[0];           
            if (ArrData[1] == 1) {

                document.getElementById("chkPayable" + (IniRowNo + i)).checked = true;
            }
            


        }
    }

}

function UpdateRowIDs_Slab(ID_Slab) {
    var IniRowNo = 2;
    var Arr = ID_Slab.split("@");
    for (var count = 0; count < Arr.length; count++) {
        if (document.getElementById("hdnJSRowID_Slab" + (IniRowNo + count)).value == Arr[count].split("^")[0]) {
            document.getElementById("hdnDBID_Slab" + (IniRowNo + count)).value = Arr[count].split("^")[1];
        }

    }
}