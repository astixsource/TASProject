function fnUploadFile(sender) {
    //  debugger;
    var fileToUpload = getNameFromPath($(sender).val());
    var fileUpload = $(sender).get(0);
    var files = fileUpload.files;
    if (files.length == 0) {
        return "";
    }

    var totpic = files.length;
    var arrPhotoDetail = new Array();
    for (var i = 0; i < files.length; i++) {
        var fullname = files[i].name;
        var photoname = files[i].name.split(".")[0];
        var d = new Date();
        var PhotoDate = d.localeFormat("dd-MMM-yyyy");
        var extn = files[i].name.split(".")[1];
        var modflName = photoname + "_" + d.localeFormat("ddMMyyyy") + "." + extn;
        var modNameWithoutExt = photoname + "_" + d.localeFormat("ddMMyyyy");
        var divid = "divmod_" + modNameWithoutExt;

        fnDisplayPhtoName(fullname, modNameWithoutExt, extn, sender)
    }
    //Photo Uploading 
    var strPhotoDetail = "";
    var trIndex = $(sender).closest("table").find("tr").length - 1;
    strPhotoDetail = $($($(sender).closest("table").find("tr")[trIndex - 1]).find("td[iden='tdimg']")[0]).find("div");
    //  $($($(sender).closest("table").find("tr")[trIndex]).find("td[iden='tdimg']")[0]).html(' ');
    for (var j = 0; j < strPhotoDetail.length; j++) {
        var Modphotoname = $(strPhotoDetail[j]).attr("Modphotoname");
        var origName = $(strPhotoDetail[j]).attr("orignalname");
        var PhotoName = origName + "|" + Modphotoname;
        var flgDelete = $(strPhotoDetail[j]).is("[flgdelete]") ? $(strPhotoDetail[j]).attr("flgdelete") : 0;
        var flgNew = $(strPhotoDetail[j]).is("[flgNew]") ? $(strPhotoDetail[j]).attr("flgNew") : 0;
        var d = new Date();
        var PhotoDate = d.localeFormat("dd-MMM-yyyy");
        if (flgNew == 1) {

            var files = fileUpload.files;
            for (var f = 0; f < files.length; f++) {
                if (files[f].name == origName) {
                    var strData = files[f];
                    var PhotoDate = files[f].lastModifiedDate;
                    if (fnUploadPhoto(origName, Modphotoname.split(".")[0], Modphotoname.split(".")[1], strData, PhotoDate) == "Success") {
                        //var PhotoClickedOn = new Date().localeFormat("dd-MMM-yyyy");
                        //var arr = { PrdID: prdid, PhotoName: PhotoName, flgDelete: flgDelete, PhotoClickedOn: PhotoDate }
                        //arrPhotoDetail.push(arr);
                    }
                }
            }
        }
    }

    $(sender).closest("td").find("img").remove();
    $(sender).prop("disabled", false);
    return false;
}
function fnUploadPhoto(fullname, modNameWithoutExt, extn, strData, PhotoDate) {
    // debugger;
    var fileUpload; var strSuccess;
    var d = new Date(PhotoDate);
    //var extn = files[i].name.split(".")[1];
    var modflName = modNameWithoutExt + "." + extn;

    var data = new FormData();
    // for (var i = 0; i < files.length; i++) {

    data.append(modflName, strData);
    //}
    var filePath = "";
    data.append("FileName", modflName);
    data.append("OriFileName", fullname);
    $.ajax({
        url: "PhotoUploadDamage.ashx?path=ManufacturerAttachement&flg=1",
        type: "POST",
        data: data,
        async: false,
        contentType: false,
        processData: false,
        success: function (result) {
            //$("#tdimg").find("img").remove();
            if (result == "Success") {
                // fnDisplayPhtoName(result.split("|")[3], result.split("|")[4].split(".")[0], result.split("|")[3].split(".")[1], prdid)
                strSuccess = "Success";
            } else {
                strSuccess = result;
            }
        },
        error: function (err) {
            strSuccess = err.statusText;
            ///$(sender).closest("td").find("img").remove();
            //$(sender).prop("disabled", false);
        },
        failure: function (err) {
            strSuccess = err.statusText;
            // $(sender).closest("td").find("img").remove();
            //$(sender).prop("disabled", false);
        }
    });

    return strSuccess;
}
function getNameFromPath(strFilepath) {
    // debugger;
    var objRE = new RegExp(/([^\/\\]+)$/);
    var strName = objRE.exec(strFilepath);

    if (strName == null) {
        return null;
    }
    else {
        return strName[0];
    }
}

function fnDisplayPhtoName(photoname, Modphotoname, extn, sender,containerID) {
    // debugger;

    var divid = "divmod_" + Modphotoname;
    var photolnk = Modphotoname + "." + extn;
    var strHTML = "<div style='display:inline;float:right' Modphotoname='" + Modphotoname + "." + extn + "' orignalname='" + photoname + "' id='" + divid + "' flgNew='1'><a href='../ApplyReturnPhoto/" + photolnk + "' target='_blank' id='filehref' style='color:blue;text-decoration:underline'>" + photoname + "</a>" + "<img src='../images/close_iconNew.png' onclick='fnDeleteFile(this)'/></div>";
    //$(sender).closest('td').next().append(strHTML);
    $("#tdPhotoContainer").append(strHTML);

}
function fnDeleteFile(sender) {
    var aa = confirm("Are you  sure want to delete this File?");

    if (aa) {
        var modflName = $(sender).closest("div").attr("Modphotoname");
        var flgNew = $(sender).closest("div").attr("flgNew");
        if (flgNew == 1) {
            $(sender).closest("div").remove();
            return false
        }
        var filePath = "";
        $.ajax({
            url: "PhotoUploadDamage.ashx?path=ApplyReturnPhoto&flg=2&file=" + modflName,
            type: "POST",
            async: true,
            contentType: false,
            processData: false,
            success: function (result) {
                //$("#tdimg").find("img").remove();
                if (result == "Success") {
                    $(sender).closest("div").attr("flgdelete", "1");
                    $(sender).closest("div").hide();
                } else {
                    alert(result);
                }
                return false;
            },
            error: function (err) {
                alert(err.statusText)
                return false;
            },
            failure: function (err) {
                alert(err.statusText);
                return false;
            }
        });
    }
    return false;
}