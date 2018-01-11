angular.module('app').controller('app_details', app_details);
function app_details($scope, app) {
    'use strict';
   
    app.init($scope);
    $scope.data.trackingNumber = app.detailsData.trackingNumber;
  
    $scope.$digest();
  
    alert($scope.data.trackingNumber);
    //$scope.data = extraData;
}