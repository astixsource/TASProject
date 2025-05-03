function fnAction(NodeId) {
    switch (NodeId) {
        case "1":
            parent.parent.window.location.href = "salesHierarchy/manageHierarchy.aspx?Id=" + NodeId;
            break;
        case "2":
            parent.parent.window.location.href = "../ManageOrder/frmRouteList_Telecaller.aspx?id=" + NodeId;
            break;
        case "3":
            parent.parent.window.location.href = "../ManageOrder/frmRouteList_Telecaller.aspx?id=" + NodeId;
            break;
        case "5":
            parent.parent.window.location.href = "ManageOrder/frmMarkAbsent.aspx?id=" + NodeId;
            break;
    }
    return false;

}