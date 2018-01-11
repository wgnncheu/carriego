angular.module('app').controller('app_details', app_details);
function app_details($scope, app) {
    'use strict';
   
    
    $scope.data.trackingNumber = app.detailsData.trackingNumber;
     app.init($scope);
    alert($scope.data.trackingNumber);
    //$scope.data = extraData;
}