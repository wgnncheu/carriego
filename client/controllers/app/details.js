angular.module('app').controller('app_details', app_details);
function app_details($scope, app) {
    'use strict';
    app.init($scope);
    
    var shipmentDetails = app.data.shipmentDetails.recordset[0];
    
    app.data.shipmentDetails = shipmentDetails;
}