angular.module('app').controller('app_barcode', app_barcode);
function app_barcode($scope, app) {
    'use strict';
    app.init($scope);
    $scope.reset = function () {
        $scope.data = {};
    };
    $scope.scan = function () {
        cordova.plugins.barcodeScanner.scan(function (result) {
            setTimeout(function () {
                $scope.data.format = result.format;
                $scope.data.trackingNumber = result.text;
                $scope.$digest();
            }, 0);
        }, function (error) {
        }, {
            'preferFrontCamera': false,
            'showFlipCameraButton': true,
            'showTorchButton': true,
            'orientation': 'landscape'
        });
    };
    $scope.submit = function () {
        $scope.data.errorMessage = "";
        var trackingNumber = $scope.data.trackingNumber;
        if (trackingNumber === undefined || trackingNumber.length === 0) {
            $scope.data.errorMessage = 'Please enter a tracking number';
            return;
        }
        
        $scope.app.showLoading('Searching for tracking number: ' + trackingNumber);
        
        // TODO implement DB call with trackingNumber
        
        var shipmentDetails = {
            trackingNumber: trackingNumber
        };
        
        app.shipmentDetails = shipmentDetails;
        app.go('app.details');
    };
    
    $scope.getShipmentDetails = function (trackingNumber) {
      
        const sql = require('mssql')
 
        async () => {
            try {
                const pool = await sql.connect('mssql://username:password@localhost/database')
                const result = await sql.query`select * from mytable where id = ${value}`
                console.dir(result)
            } catch (err) {
                // ... error checks
            }
        }  
    };
    
}