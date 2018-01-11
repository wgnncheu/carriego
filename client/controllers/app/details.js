angular.module('app').controller('app_details', app_details);
function app_details($scope, app) {
    'use strict';
    app.init($scope);
    
    var shipmentDetails = app.data.shipmentDetails.recordset[0];
    
   // $scope.data.shipmentDetails = app.data.shipmentDetails.recordset[0];
    app.data.shipmentDetails = shipmentDetails;
    
    //$scope.data.shipmentDetails = app.shipmentDetails;
    //console.log($scope.data.shipmentDetails.trackingNumber);
        
     /*   
    setTimeout(function () {
        $scope.data.shipmentDetails = app.shipmentDetails;
        console.log($scope.data.shipmentDetails.trackingNumber);
    }, 1000);
    */
}