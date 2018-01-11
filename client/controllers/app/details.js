angular.module('app').controller('app_details', app_details);
function app_details($scope, app) {
    'use strict';
    app.init($scope);
    
    app.data.tabs = [
        {
          name: "General",
          icon: "ion-ios-information",
          selected: true
        },
        {
          name: "Shipper",
          icon: "ion-ios-bell",
          selected: false
        },
        {
          name: "Recipient",
          icon: "ion-help-buoy",
          selected: false
        }
    ];
    
    var shipmentDetails = app.data.shipmentDetails.recordset[0];
    app.data.shipmentDetails = shipmentDetails;
}