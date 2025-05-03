function Print(divId) {
   
    var printContent = $("#" + divId).find("title,meta,script,head,body").remove().end().html();

    ////var printContent = document.getElementById(divId);
    var frame1 = document.createElement('iframe');
    frame1.name = "frameprintpage";
    frame1.id = "frameprintpage";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    
    var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
    frameDoc.document.open();
    frameDoc.document.write('<html><head><title></title>');
    frameDoc.document.write('<meta charset="UTF-8">');
    frameDoc.document.write('<link href="../CSS/printcss.css" rel="stylesheet" />');
    frameDoc.document.write('</head><body>');
    frameDoc.document.write(printContent);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();

    var browserName = navigator.userAgent.toLowerCase();
    if (browserName.indexOf("msie") != -1) {
        window.document.getElementById('frameprintpage').focus();
        window.document.getElementById('frameprintpage').print();
        document.body.removeChild(frame1);
    } else if (browserName.indexOf("trident") != -1) { //IE 11
        window.document.getElementById('frameprintpage').contentWindow.document.execCommand('print', false, null);
        document.body.removeChild(frame1);
    } else {
        setTimeout(function () {
            window.frames["frameprintpage"].focus();
            window.frames["frameprintpage"].print();
            document.body.removeChild(frame1);
        }, 500);
    }
    
    return false;
}
function save(dvContents,filename,flg) {
    var $form = $("<form/>").attr("id", "data_form")
                            .attr("action", "../frmDownloadpage.aspx")
                            .attr("method", "post")
    //.attr("target", "_self");
    $("body").append($form);
    //Append the values to be send
    if (flg == 1) {
        dvContents = document.getElementById(dvContents).innerHTML;
    } else {
        dvContents = $("<div/>").html(dvContents).find("title,meta,script,head,body").remove().end().html();
    }
    AddParameter($form, "divData", dvContents);
    AddParameter($form, "fileName", filename);
    $form[0].submit()

    return false;
}
function AddParameter(form, name, value) {
    var $input = $("<input />").attr("type", "hidden")
                        .attr("name", name)
                        .attr("value", value);
    form.append($input);
}