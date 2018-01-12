angular.module('app').controller('app_details', app_details);
function app_details($scope, app) {
    'use strict';
    app.init($scope);
    
    app.data.tabs = [
        {
          name: "General",
          icon: "ion-ios-information",
          selected: true, 
          action: "changeSelection()"
        },
        {
          name: "Address",
          icon: "ion-help-buoy",
          selected: false,
          action: "changeSelection()"
        }
    ];
    
    var shipmentDetails = app.data.shipmentDetails.recordset[0];
    app.data.shipmentDetails = shipmentDetails;
    
    $scope.changeSelection = function (tab) {
      console.log("selection changed")   ;
    }
}