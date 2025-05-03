
var lfetClickoldVal = 0;
function FnLeftMenuClickNew(value) {
//alert(value)
    if (document.getElementById("hdnLeftMenuSelectedItem").value == "") {
        lfetClickoldVal = 0;
    }
    else {
        lfetClickoldVal = parseInt(document.getElementById("hdnLeftMenuSelectedItem").value, 10);
    }
        document.getElementById("hdnLeftMenuSelectedItem").value = value;
        var id = document.getElementById("hdnTopMenuSelectedItem").value;
     
        FnLeftMenuClickCheck(value, id);
 
}


function FnLeftMenuClick(value) {
    var lfetSelectedHId = document.getElementById("hdnLeftMenuSelectedItem").value;
   
    FnLeftMenuClickCheck(lfetSelectedHId, value);
 }
 function FnLeftMenuClickCheck(lfetSelectedHId, id) 
 {

     if (parseInt(lfetSelectedHId, 10) == 6)
      {
        // alert("Please select one of the option below. ");
         return false;
      }

      if (id == 1) {
          window.open("../graphlayout/FrmGraphDashboardClientSide.aspx?value=" + id + "&lfetSelectedHId=" + lfetSelectedHId, "_self");
      }
      //  else if (id == 2 && parseInt(lfetSelectedHId, 10) !=7) {
      else if (id == 2 && parseInt(lfetSelectedHId, 10) == 5) {
          window.open("../graphlayout/FrmScoreCard_BIR.aspx?value=" + id + "&Pagecode=3" + "&lfetSelectedHId=" + lfetSelectedHId, "_self");
      }

      else if (id == 2 && parseInt(lfetSelectedHId, 10) == 7) {

          window.open("../graphlayout/FrmScoreCardPOIRCreation.aspx?value=" + id + "&Pagecode=3" + "&lfetSelectedHId=" + lfetSelectedHId, "_self");
      }

      else if (id == 2 && parseInt(lfetSelectedHId, 10) == 8) {
          window.open("../graphlayout/FrmScoreCardPR2POCreation.aspx?value=" + id + "&Pagecode=3" + "&lfetSelectedHId=" + lfetSelectedHId, "_self");
      }

      else if (id == 2 && parseInt(lfetSelectedHId, 10) == 9) {

          window.open("../graphlayout/FrmScoreCard_L2.aspx?value=" + id + "&Pagecode=3" + "&lfetSelectedHId=" + lfetSelectedHId, "_self");
      }

      //    else if (id == 3) 
      //    {
      //        window.open("../graphlayout/FrmDownloadRawData.aspx?value=" + id + "&Pagecode=2" + "&lfetSelectedHId=" + lfetSelectedHId, "_self");
      //    }

      else if (id == 3 && parseInt(lfetSelectedHId, 10) != 9) {
          window.open("../graphlayout/FrmDownloadRawData.aspx?value=" + id + "&Pagecode=2" + "&lfetSelectedHId=" + lfetSelectedHId, "_self");
      }
      else if (id == 3 && parseInt(lfetSelectedHId, 10) == 9) {
          window.open("../graphlayout/FrmDownloadRawData_L2.aspx?value=" + id + "&Pagecode=2" + "&lfetSelectedHId=" + lfetSelectedHId, "_self");
      }

//      else if (id == 4) {
//          //window.open("../graphlayout/FrmManageDefineMenuLink.aspx?value=" + value, "_self");
//          window.open("../graphlayout/FrmTrackCaseID.aspx?value=" + id + "&lfetSelectedHId=" + lfetSelectedHId, "_self");
      //      }

      else if (id == 4 && parseInt(lfetSelectedHId, 10) != 9) {
          window.open("../graphlayout/FrmTrackCaseID.aspx?value=" + id + "&lfetSelectedHId=" + lfetSelectedHId, "_self");
      }
      else if (id == 4 && parseInt(lfetSelectedHId, 10) == 9) {
          window.open("../graphlayout/FrmTrackCaseID_L2.aspx?value=" + id + "&lfetSelectedHId=" + lfetSelectedHId, "_self");
      }
   
    

}
function FnClickNoAction(ssddsdsd) {
}
function FnVisibleMenu(RoleId) {
    if (RoleId == 2) {
         
    }
}

