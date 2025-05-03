Imports System.Collections.Generic
Imports System.Linq
Imports System.Web

''' <summary>
''' Summary description for ClsMaster
''' </summary>
Public Class ClsMaster
    '
    ' TODO: Add constructor logic here
    '
    Public Sub New()
    End Sub
End Class
Public Class ClsTrackRecord
    Public PKey As String, Id As String
    Public DateTime As String, OtLati As String, OtLongi As String, LocProvider As String, Accuracy As String, OutStat As String, _
     Imei As String, BatteryStatus As String, DeviceSpeed As String, AvgSpeedDiff As String, ActVisitHour As String, ActVisitMin As String, CoordinateId As String
End Class
Public Class ClsVisitedCoordinateRecord

    Public CoordinateID As String, RouteId As String, VisitDate As String, VisitStatus As String, VisitTime As String, VisitHour As String, VisitMin As String
End Class

Public Class ClsAllQuadList

    Public QuadId As String, QuadName As String, DistributorId As String
End Class
Public Class Clsdsrdetails
Public name As String, mob As String, imei As String, straddress As String, postcode As String, w1 As String, w2 As String, w3 As String, w4 As String, w5 As String, d1 As String, d2 As String, d3 As String, d4 As String, d5 As String, d6 As String, d7 As String
End Class
Public Class ClsDetForTmp

    Public StoreType As String, StoreCount As String, FMCG_turnOver As String, Store_turnOver As String
End Class
Public Class ClsStoreDetForTmp

    Public StoreId As String
End Class
Public Class ClsStoreSummaryDetForTmp

    Public List As Object
End Class

Public Class ClsLatLngForindQuad

    Public Lat As String, Lon As String, QuadName As String, QuadId As String, NodeId As String, NodeType As String
End Class

Public Class ClsLatLngForUnmappedOutlet

    Public OtName As String, OtNodeId As String, Lat As String, Lon As String, CategoryName As String, CategoryId As String, Availability As String, QuadIdToCompare As String
End Class


Public Class ClsLatLngForFilteredOutlet

    Public OtName As String, OtNodeId As String, Lat As String, Lon As String, CategoryName As String, CategoryId As String, Availability As String, QuadIdToCompare As String, StoreTurnOver As String, FMCGTurnOver As String, BabyProductStocked As String, FlgCoveredOtherDBR As String, FlgNonCovered As String, FlgPlannedCovered As String, FlgAssignedButNotCovered As String, Dexolacgroup As String, Farexgroup As String, Farexcereal As String, Nusobeegroup As String, Esumegroup As String, lactogen As String, Cerelac As String, ActualDstrname As String, DBRIdCoverage As String, DBRAreaIdCoverage As String, DBRAreaIdMap As String
End Class
Public Class ClsAreaDetailOneLevelBelow

    Public ChildNodeId As String, ChileNodeName As String, ParentNodeName As String, PNodeId As String
End Class
Public Class ClsLatLngForFilteredDoctor

    Public DoctorName As String, DoctorId As String, Lat As String, Lon As String, flgForMCC As String, flgForFarex As String, flgForMCCCore As String, flgForFarexCore As String, flgCore As String, flgNonCore As String, flgPrescriber As String, flgNonPrescriber As String
End Class
Public Class ClsLatLngForHospitals

    Public HospitalName As String, HospitalId As String, Lat As String, Lon As String, DoctorName As String, Address As String, Patch As String
End Class
Public Class ClsDoctorsList

    Public DoctorName As String, DoctorId As String
End Class
Public Class ClsStoresListBasedOnDistanceFromDoctor

    Public DoctorName As String, DoctorId As String, StoreName As String, StoreId As String, Distance As String
End Class
Public Class ClsArrayOfStoreHCPList
    Public List As Object
End Class
Public Class ClslstPolygonArea
    Public Polyarea As String, Dist_Id As String
End Class
Public Class ClsQuadStorelst
    Public lati As String, longi As String, sequ As String, DBRId As String, DBRName As String
End Class
Public Class ClslstchkPolygonArea
    Public resPolyarea As String, are As String, dstr As String
End Class
Public Class clsListOfStoresForMapping
    Public List As Object
End Class
Public Class clsListOfDisplayedStoresForMapping
    Public StoreId As String, StoreName As String, StoreType As String, Dexolac As String, Farex As String, Lactogen As String, Cerelac As String, CurrentStatus As String, flgForOtherDBR As String, flgPlannedCoovered As String, StreetName As String, PostCode As String, HCPId As String, HCPName As String, HCPDistance As String
End Class
Public Class clsListOfNotDisplayedStoresForMapping
    Public StoreId As String, StoreName As String, StoreType As String, Dexolac As String, Farex As String, Lactogen As String, Cerelac As String, CurrentStatus As String, flgForOtherDBR As String, StreetName As String, PostCode As String, HCPId As String, HCPName As String, HCPDistance As String
End Class
Public Class clsDBRLatLon
    Public DBRId As String, DBRName As String, Lat As String, Lon As String
End Class
Public Class clsStoreWiseCovString
    Public StoreId As String, CovWeekStr As String, CovDayStr As String
End Class
Public Class clsDetailForStoreCovAssignment
    Public Id As String, Descr As String, LvlName As String
End Class

Public Class clsStoreDetails
    Public StoreId As String, StoreName As String, StoreCode As String, StoreType As String, Street As String, Farex As String, Dexolac As String, Lactogen As String, Cerelac As String, StoreLat As String, StoreLon As String
End Class

Public Class clsStoreParentDetails
    Public DBRId As String, DBRName As String, DSRId As String, DSRName As String, RouteId As String, RouteName As String
End Class
Public Class clsListOfMultpleLists
    Public List As Object
End Class
Public Class clsRouteHierarchy
    Public CountryId As Integer, CountryName As String, RegionId As Integer, RegionName As String, CityId As Integer, CityName As String, SOId As Integer, SOName As String, DBRId As Integer, DBRName As String, DSRId As Integer, DSRName As String
End Class
Public Class clsStoreDetailsForExcel
    Public StoreName As String, CategoryName As String, Status As String, DSR As String, Dexolac As String, Farex As String, FarexCereal As String, Nusobee As String, Esume As String, Lactogen As String, Cerelac As String, DistributorName As String
End Class
Public Class clsStoreDetailsOption2ForExcel
    Public StoreName As String, CategoryName As String, StoreStatus As String, DSR As String, Dexolac As String, Farex As String, FarexCereal As String, Nusobee As String, Esume As String, Lactogen As String, Cerelac As String, DistributorName As String, Distance As String, DoctorName As String, DoctorStatus As String
End Class
Public Class clsStoreDetailsOption4ForExcel
    Public DoctorName As String, DoctorStatus As String, Distance As String, StoreName As String, CategoryName As String, StoreStatus As String, DSR As String, Dexolac As String, Farex As String, FarexCereal As String, Nusobee As String, Esume As String, Lactogen As String, Cerelac As String, DistributorName As String
End Class